"use client";

import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { VersePost, Comment } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Send, Heart, MessageSquare, Share2, Quote } from 'lucide-react';
import { MadeWithDyad } from '@/components/made-with-dyad';
import { showSuccess } from '@/utils/toast';
import CommentItem from '@/components/CommentItem';

const MOCK_POSTS: VersePost[] = [
  {
    id: '1',
    verse: 'Now faith is the assurance of things hoped for, the conviction of things not seen.',
    reference: 'Hebrews 11:1',
    relevance: 'In a world that demands proof for everything, faith is our anchor. It allows us to walk confidently into the unknown because we trust the One who holds the future.',
    category: 'Faith',
    author: 'StreetWords',
    createdAt: '2 hours ago',
    likes: 24,
    comments: [
      { id: 'c1', author: 'Hopeful', content: 'This is exactly what I needed today. Discernment starts with trust.', createdAt: '1 hour ago', replies: [] }
    ]
  },
  {
    id: '2',
    verse: 'Love is patient and kind; love does not envy or boast; it is not arrogant or rude.',
    reference: '1 Corinthians 13:4',
    relevance: 'Street life can be hard and cold. Practicing this kind of love is the ultimate counter-culture movement. It is how we show the truth of the Gospel.',
    category: 'Love',
    author: 'StreetWords',
    createdAt: '5 hours ago',
    likes: 42,
    comments: []
  },
  {
    id: '3',
    verse: 'The Lord is near to the brokenhearted and saves the crushed in spirit.',
    reference: 'Psalm 34:18',
    relevance: 'When you feel like the walls are closing in, remember that He is closest in the cracks of our despair. Brokenness is the entry point for grace.',
    category: 'Despair',
    author: 'StreetWords',
    createdAt: '1 day ago',
    likes: 156,
    comments: []
  },
  {
    id: '4',
    verse: 'The soul of the sluggard craves and gets nothing, while the soul of the diligent is richly supplied.',
    reference: 'Proverbs 13:4',
    relevance: 'Street wisdom often talks about the grind, but biblical diligence is about character and faithfulness in the small things.',
    category: 'Wisdom',
    author: 'StreetWords',
    createdAt: '2 days ago',
    likes: 88,
    comments: []
  }
];

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState<VersePost | undefined>(MOCK_POSTS.find(p => p.id === id));
  const [newComment, setNewComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);

  if (!post) return <div className="p-20 text-center font-black">Verse not found</div>;

  const handleLike = () => {
    setIsLiked(!isLiked);
    setPost(prev => prev ? { ...prev, likes: isLiked ? prev.likes - 1 : prev.likes + 1 } : prev);
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'Street Words',
        text: `"${post.verse}" - ${post.reference}`,
        url: window.location.href,
      });
    } catch (err) {
      showSuccess("Link copied to clipboard!");
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: 'You',
      content: newComment,
      createdAt: 'Just now',
      replies: []
    };

    setPost({
      ...post,
      comments: [comment, ...post.comments]
    });
    setNewComment("");
    showSuccess("Reflection shared!");
  };

  const handleReply = (parentId: string, content: string) => {
    const addReplyToComments = (comments: Comment[]): Comment[] => {
      return comments.map(c => {
        if (c.id === parentId) {
          return {
            ...c,
            replies: [...(c.replies || []), {
              id: Date.now().toString(),
              author: 'You',
              content: content,
              createdAt: 'Just now',
              replies: []
            }]
          };
        }
        if (c.replies && c.replies.length > 0) {
          return { ...c, replies: addReplyToComments(c.replies) };
        }
        return c;
      });
    };

    if (post) {
      setPost({
        ...post,
        comments: addReplyToComments(post.comments)
      });
    }
  };

  return (
    <div className="min-h-screen urban-pattern bg-background/50">
      <Navbar />
      
      <main className="container max-w-3xl py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 font-black text-xs uppercase tracking-widest transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Feed
        </Link>

        <div className="space-y-8">
          <div className="bg-white/50 backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-white/50">
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-[#a855f7] to-[#ec4899] p-[2px]">
                  <div className="h-full w-full rounded-full bg-white flex items-center justify-center font-bold text-primary">
                    {post.author[0]}
                  </div>
                </div>
                <div>
                  <p className="font-black text-sm">{post.author}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">{post.createdAt}</p>
                </div>
              </div>
              <div className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
                {post.category}
              </div>
            </div>

            <div className="relative mb-10">
              <Quote className="absolute -top-10 -left-6 h-20 w-20 text-primary/5 pointer-events-none" />
              <p className="text-3xl md:text-4xl font-serif italic text-primary leading-tight mb-6">
                "{post.verse}"
              </p>
              <p className="text-right font-black text-xs uppercase tracking-[0.2em] text-muted-foreground">
                — {post.reference}
              </p>
            </div>

            <div className="bg-muted/30 rounded-3xl p-8 border border-white/40 mb-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/40 mb-4">Street Discernment</h4>
              <p className="text-lg text-foreground/80 leading-relaxed font-medium italic">
                {post.relevance}
              </p>
            </div>

            <div className="flex items-center justify-between pt-8 border-t border-primary/5">
              <div className="flex gap-6">
                <button 
                  onClick={handleLike}
                  className={`flex items-center gap-2 font-black text-sm transition-all ${isLiked ? 'text-[#ec4899] scale-110' : 'text-muted-foreground hover:text-[#ec4899]'}`}
                >
                  <Heart className={`h-6 w-6 ${isLiked ? 'fill-[#ec4899]' : ''}`} />
                  {post.likes}
                </button>
                <div className="flex items-center gap-2 text-muted-foreground font-black text-sm">
                  <MessageSquare className="h-6 w-6" />
                  {post.comments.length}
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={handleShare} className="rounded-full hover:bg-primary/10">
                <Share2 className="h-6 w-6 text-muted-foreground" />
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-black tracking-tight px-4">Reflections ({post.comments.length})</h3>
            
            <form onSubmit={handleAddComment} className="relative group">
              <Input 
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add your reflection..." 
                className="h-16 pl-6 pr-16 rounded-full bg-white/50 backdrop-blur-sm border-white/50 shadow-sm focus:ring-primary/20 text-base font-medium placeholder:text-muted-foreground/50"
              />
              <Button 
                type="submit"
                size="icon" 
                className="absolute right-2 top-2 h-12 w-12 rounded-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
              >
                <Send className="h-5 w-5" />
              </Button>
            </form>

            <div className="space-y-6">
              {post.comments.map((comment) => (
                <CommentItem 
                  key={comment.id} 
                  comment={comment} 
                  onReply={handleReply}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="py-12">
        <MadeWithDyad />
      </footer>
    </div>
  );
};

export default PostDetail;