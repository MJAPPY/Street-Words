import { supabase } from '@/integrations/supabase/client';
import { VersePost, Comment, Category } from '@/types';
import { INITIAL_POSTS } from './posts';

// Helper to convert db row to VersePost type
const mapDbPostToVersePost = (row: any, commentsList: any[] = []): VersePost => {
  // Recursively build comment tree
  const buildCommentTree = (list: any[], parentId: string | null = null): Comment[] => {
    return list
      .filter(c => c.parent_id === parentId)
      .map(c => ({
        id: c.id,
        author: c.author,
        content: c.content,
        createdAt: new Date(c.created_at).toLocaleDateString() || 'Just now',
        replies: buildCommentTree(list, c.id)
      }));
  };

  const postComments = buildCommentTree(commentsList);

  return {
    id: row.id,
    verse: row.verse,
    reference: row.reference,
    relevance: row.relevance,
    category: row.category as Category,
    author: row.author,
    createdAt: new Date(row.created_at).toLocaleDateString() || 'Just now',
    likes: row.likes || 0,
    comments: postComments
  };
};

export const supabaseService = {
  // Fetch all posts from Supabase (with automatic fallback to localStorage)
  async getPosts(): Promise<VersePost[]> {
    try {
      // 1. Fetch posts
      const { data: postsData, error: postsError } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (postsError) throw postsError;

      if (!postsData || postsData.length === 0) {
        return this.getLocalPosts();
      }

      // 2. Fetch comments
      const { data: commentsData, error: commentsError } = await supabase
        .from('comments')
        .select('*')
        .order('created_at', { ascending: true });

      const allComments = commentsError ? [] : (commentsData || []);

      const parsedPosts = postsData.map(post => {
        const postComments = allComments.filter(c => c.post_id === post.id);
        return mapDbPostToVersePost(post, postComments);
      });

      // Combine with initial default posts
      const initialIds = INITIAL_POSTS.map(p => p.id);
      const uniqueParsed = parsedPosts.filter(p => !initialIds.includes(p.id));
      return [...uniqueParsed, ...INITIAL_POSTS];
    } catch (err) {
      console.warn("Supabase fetch failed (tables might not exist yet). Falling back to LocalStorage.", err);
      return this.getLocalPosts();
    }
  },

  // Fallback to local storage posts
  getLocalPosts(): VersePost[] {
    try {
      const stored = localStorage.getItem('streetwords_posts');
      if (stored) {
        const parsed = JSON.parse(stored) as VersePost[];
        // Filter out duplicates of INITIAL_POSTS
        const initialIds = INITIAL_POSTS.map(p => p.id);
        const filteredParsed = parsed.filter(p => !initialIds.includes(p.id));
        return [...filteredParsed, ...INITIAL_POSTS];
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_POSTS;
  },

  // Create a new post
  async createPost(post: Omit<VersePost, 'id' | 'createdAt' | 'likes' | 'comments'>): Promise<VersePost> {
    const tempId = Date.now().toString();
    const newPost: VersePost = {
      ...post,
      id: tempId,
      createdAt: 'Just now',
      likes: 0,
      comments: []
    };

    // 1. Always save to LocalStorage first (instant responsiveness)
    try {
      const stored = localStorage.getItem('streetwords_posts');
      const postsList = stored ? JSON.parse(stored) : [];
      postsList.unshift(newPost);
      localStorage.setItem('streetwords_posts', JSON.stringify(postsList));
    } catch (err) {
      console.error(err);
    }

    // 2. Save to Supabase database
    try {
      const { data, error } = await supabase
        .from('posts')
        .insert([{
          verse: post.verse,
          reference: post.reference,
          relevance: post.relevance,
          category: post.category,
          author: post.author
        }])
        .select();

      if (error) throw error;
      if (data && data[0]) {
        return mapDbPostToVersePost(data[0]);
      }
    } catch (err) {
      console.warn("Could not save to Supabase database. Post remains synced locally.", err);
    }

    return newPost;
  },

  // Like or Unlike a post
  async toggleLike(postId: string, currentLikes: number, isLiked: boolean): Promise<number> {
    const nextLikes = isLiked ? currentLikes - 1 : currentLikes + 1;

    // Local update
    try {
      const stored = localStorage.getItem('streetwords_posts');
      if (stored) {
        const parsed = JSON.parse(stored) as VersePost[];
        const updated = parsed.map(p => p.id === postId ? { ...p, likes: nextLikes } : p);
        localStorage.setItem('streetwords_posts', JSON.stringify(updated));
      }
    } catch (e) {
      console.error(e);
    }

    // Supabase update
    try {
      const { error } = await supabase
        .from('posts')
        .update({ likes: nextLikes })
        .eq('id', postId);

      if (error) throw error;
    } catch (err) {
      console.warn("Could not sync like to Supabase.", err);
    }

    return nextLikes;
  },

  // Add a comment or reply
  async addComment(postId: string, author: string, content: string, parentId: string | null = null): Promise<Comment> {
    const tempId = Date.now().toString();
    const newComment: Comment = {
      id: tempId,
      author,
      content,
      createdAt: 'Just now',
      replies: []
    };

    // Update locally
    try {
      const stored = localStorage.getItem('streetwords_posts');
      if (stored) {
        const parsed = JSON.parse(stored) as VersePost[];
        
        const addReplyToComments = (comments: Comment[]): Comment[] => {
          return comments.map(c => {
            if (c.id === parentId) {
              return {
                ...c,
                replies: [...(c.replies || []), newComment]
              };
            }
            if (c.replies && c.replies.length > 0) {
              return { ...c, replies: addReplyToComments(c.replies) };
            }
            return c;
          });
        };

        const updated = parsed.map(p => {
          if (p.id === postId) {
            if (!parentId) {
              return { ...p, comments: [newComment, ...p.comments] };
            } else {
              return { ...p, comments: addReplyToComments(p.comments) };
            }
          }
          return p;
        });

        localStorage.setItem('streetwords_posts', JSON.stringify(updated));
      }
    } catch (e) {
      console.error(e);
    }

    // Update globally in Supabase
    try {
      const { data, error } = await supabase
        .from('comments')
        .insert([{
          post_id: postId,
          author,
          content,
          parent_id: parentId
        }])
        .select();

      if (error) throw error;
      if (data && data[0]) {
        return {
          id: data[0].id,
          author: data[0].author,
          content: data[0].content,
          createdAt: new Date(data[0].created_at).toLocaleDateString() || 'Just now',
          replies: []
        };
      }
    } catch (err) {
      console.warn("Could not save comment to Supabase.", err);
    }

    return newComment;
  }
};