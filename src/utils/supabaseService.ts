import { supabase } from '@/integrations/supabase/client';
import { VersePost, Comment, Category, UserProfile } from '@/types';
import { INITIAL_POSTS } from './posts';
import { getDailyVerseForToday } from './dailyVerses';

// Helper to convert db row to VersePost type
const mapDbPostToVersePost = (row: any, commentsList: any[] = []): VersePost => {
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
      // 1. Get current user session to see if we can do background auto-provisioning
      const { data: { session } } = await supabase.auth.getSession();

      // 2. Query posts from database
      const { data: postsData, error: postsError } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (postsError) throw postsError;

      let finalPostsData = postsData || [];

      // 3. Automated Daily Verse background check & creation
      const daily = getDailyVerseForToday();
      const hasDailyPost = finalPostsData.some(
        p => p.reference.toLowerCase() === daily.reference.toLowerCase() && p.author === 'StreetWords'
      );

      // If today's verse isn't in Supabase yet, and we have a logged-in session, let's auto-post it!
      if (!hasDailyPost && session) {
        try {
          const { data: insertedPost, error: insertError } = await supabase
            .from('posts')
            .insert([{
              verse: daily.verse,
              reference: daily.reference,
              relevance: daily.discernment,
              category: daily.category,
              author: 'StreetWords'
            }])
            .select();

          if (!insertError && insertedPost && insertedPost[0]) {
            finalPostsData = [insertedPost[0], ...finalPostsData];
          }
        } catch (e) {
          console.warn("Background auto-posting of Daily Verse failed.", e);
        }
      }

      if (finalPostsData.length === 0) {
        return this.getLocalPosts();
      }

      // 4. Fetch all comments for posts
      const { data: commentsData, error: commentsError } = await supabase
        .from('comments')
        .select('*')
        .order('created_at', { ascending: true });

      const allComments = commentsError ? [] : (commentsData || []);

      const parsedPosts = finalPostsData.map(post => {
        const postComments = allComments.filter(c => c.post_id === post.id);
        return mapDbPostToVersePost(post, postComments);
      });

      const initialIds = INITIAL_POSTS.map(p => p.id);
      const uniqueParsed = parsedPosts.filter(p => !initialIds.includes(p.id));
      return [...uniqueParsed, ...INITIAL_POSTS];
    } catch (err) {
      console.warn("Supabase fetch failed (tables might not exist yet). Falling back to LocalStorage.", err);
      return this.getLocalPosts();
    }
  },

  getLocalPosts(): VersePost[] {
    try {
      const stored = localStorage.getItem('streetwords_posts');
      if (stored) {
        const parsed = JSON.parse(stored) as VersePost[];
        const initialIds = INITIAL_POSTS.map(p => p.id);
        const filteredParsed = parsed.filter(p => !initialIds.includes(p.id));
        return [...filteredParsed, ...INITIAL_POSTS];
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_POSTS;
  },

  async createPost(post: Omit<VersePost, 'id' | 'createdAt' | 'likes' | 'comments'>): Promise<VersePost> {
    const tempId = Date.now().toString();
    const newPost: VersePost = {
      ...post,
      id: tempId,
      createdAt: 'Just now',
      likes: 0,
      comments: []
    };

    try {
      const stored = localStorage.getItem('streetwords_posts');
      const postsList = stored ? JSON.parse(stored) : [];
      postsList.unshift(newPost);
      localStorage.setItem('streetwords_posts', JSON.stringify(postsList));
    } catch (err) {
      console.error(err);
    }

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

  async toggleLike(postId: string, currentLikes: number, isLiked: boolean): Promise<number> {
    const nextLikes = isLiked ? currentLikes - 1 : currentLikes + 1;

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

  async addComment(postId: string, author: string, content: string, parentId: string | null = null): Promise<Comment> {
    const tempId = Date.now().toString();
    const newComment: Comment = {
      id: tempId,
      author,
      content,
      createdAt: 'Just now',
      replies: []
    };

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
  },

  // GET user profile from Supabase with dynamic stat calculations
  async getProfile(userId: string, email: string): Promise<UserProfile> {
    const defaultName = email.split('@')[0];
    const defaultProfile: UserProfile = {
      id: userId,
      name: defaultName,
      handle: `@${defaultName.toLowerCase()}`,
      bio: 'Walking the city streets with ancient wisdom. Looking for the light in every corner. 🕊️',
      avatar: defaultName[0].toUpperCase(),
      joinedDate: 'Joined recently',
      location: 'Urban Sanctuary',
      stats: {
        verses: 0,
        likes: 0,
        reflections: 0
      }
    };

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      let profile = defaultProfile;
      if (data) {
        profile = {
          id: data.id,
          name: data.name || defaultName,
          handle: data.handle || `@${defaultName.toLowerCase()}`,
          bio: data.bio || defaultProfile.bio,
          avatar: data.avatar || defaultProfile.avatar,
          joinedDate: 'Joined recently',
          favoriteVerse: data.favorite_verse || undefined,
          favoriteReference: data.favorite_reference || undefined,
          socialLink: data.social_link || undefined,
          videoLink: data.video_link || undefined,
          websiteLink: data.website_link || undefined,
          location: data.location || undefined,
          stats: defaultProfile.stats
        };
      }

      // Calculate stats live
      const posts = await this.getPosts();
      const userPosts = posts.filter(p => p.author.toLowerCase() === defaultName.toLowerCase());
      const userPostCount = userPosts.length;
      
      let totalLikes = 0;
      userPosts.forEach(p => { totalLikes += (p.likes || 0); });

      let commentCount = 0;
      posts.forEach(p => {
        p.comments.forEach(c => {
          if (c.author.toLowerCase() === defaultName.toLowerCase()) {
            commentCount++;
          }
          c.replies?.forEach(r => {
            if (r.author.toLowerCase() === defaultName.toLowerCase()) {
              commentCount++;
            }
          });
        });
      });

      profile.stats = {
        verses: userPostCount,
        likes: totalLikes,
        reflections: commentCount
      };

      return profile;
    } catch (err) {
      console.warn("Could not load profile from Supabase. Falling back to local values.", err);
      return defaultProfile;
    }
  },

  // UPDATE user profile in Supabase & LocalStorage
  async updateProfile(userId: string, profile: Partial<UserProfile>): Promise<void> {
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: userId,
          name: profile.name,
          bio: profile.bio,
          avatar: profile.avatar,
          location: profile.location,
          favorite_verse: profile.favoriteVerse,
          favorite_reference: profile.favoriteReference,
          social_link: profile.socialLink,
          video_link: profile.videoLink,
          website_link: profile.websiteLink,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
    } catch (err) {
      console.error("Could not sync profile update to database.", err);
    }
  },

  // Get list of bookmarked/saved post IDs
  getSavedPostIds(): string[] {
    try {
      const stored = localStorage.getItem('streetwords_saved_posts');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  },

  // Toggle bookmarked status of a post
  toggleSavePost(postId: string): boolean {
    try {
      const current = this.getSavedPostIds();
      const index = current.indexOf(postId);
      let isSaved = false;
      if (index > -1) {
        current.splice(index, 1);
      } else {
        current.push(postId);
        isSaved = true;
      }
      localStorage.setItem('streetwords_saved_posts', JSON.stringify(current));
      window.dispatchEvent(new Event('storage'));
      return isSaved;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
};