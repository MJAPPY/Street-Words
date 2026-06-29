"use client";

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { VersePost, Comment } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Send, Heart, MessageSquare, Share2, Quote, Loader2 } from 'lucide-react';
import { MadeWithDyad } from '@/components/made-with-dyad';
import { showSuccess } from '@/utils/toast';
import CommentItem from '@/components/CommentItem';
import { useSession } from '@/components/SessionProvider';
import { supabaseService } from '@/utils/supabaseService';

const PostDetail = () => {
  const { id } = useParams();
  const { session, user } = useSession();
  const navigate = useNavigate();
  const [post, setPost] = useState<VersePost | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);

  const fetchPostDetails = async () => {
    setLoading(true);
    const posts = await supabaseService.getPosts();
    const found = posts.find(p => p.id === id);
    if (found) {
      setPost(found);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPostDetails();
  }, [id]);

  const handleLike = async () => {
    if (!session) {
      showSuccess("Join the sanctuary to like posts!");
      navigate('/login');
      return;
    }
    if (!post) return;
    
    const nextLiked = !isLiked;
    setIsLiked(nextLiked);
    const updatedLikes = await supabaseService.toggleLike(post.id, post.likes, isLiked);
    setPost(prev => prev ? { ...prev, likes: updatedLikes } : prev);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showSuccess("Link copied to clipboard!");
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !session || !post) return;

    const authorName = user?.email === 'streetwords21@proton.me' 
      ? 'StreetWords' 
      : (user?.email?.split('@')[0] || 'You');

    const comment = await supabaseService.addComment(post.id, authorName, newComment);

    setPost({
      ...post,
      comments: [comment, ...post.comments]
    });
    setNewComment("");
    showSuccess("Comment shared!");
  };

  const handleReply = async (parentId: string, content: string) => {
    if (!session || !post) {
      navigate('/login');
      return;
    }
    const authorName = user?.email === 'streetwords21@proton.me' 
      ? 'StreetWords' 
      : (user?.email?.split('@')[0] || 'You');

    const comment = await supabaseService.addComment(post.id, authorName, content, parentId);

    const addReplyToComments = (comments: Comment[]): Comment[] => {
      return comments.map(c => {
        if (c.id === parentId) {
          return {
            ...c,
            replies: [...(c.replies || []), comment]
          };
        }
        if (c.replies && c.replies.length > 0) {
          return { ...c, replies: addReplyToComments(c.replies) };
        }
        return c;
      });
    };

    setPost({
      ...post,
      comments: addReplyToComments(post.comments)
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen urban-pattern bg-background/50">
        <Navbar />
        <div className="container max-w-3xl py-32 text-center flex flex-col items-center justify-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="font-bold text-sm text-muted-foreground">Opening sanctuary details...</p>
        </div>
      </div>
    );
  }

  if (!post) return <div className="p-20 text-center font-black">Verse not found</div>;

  return (
    <div className="min-h-screen urban-pattern bg-background/50">
      <Navbar />
      
      <main className="container max-w-3xl py-12">
        <Link to="/feed" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 font-black text-xs uppercase tracking-widest transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Feed
        </Link>

        <div className="space-y-8">
          <div className="bg-white/50 dark:bg-zinc-900/80 backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-white/50 dark:border-zinc-800/60">
            <div className="flex justify-between items-center mb-10">
              <Link to={`/profile/${post.author}`} className="flex items-center gap-4 group/author hover:opacity-90">
                <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-[#a855f7] to-[#ec4899] p-[2px] transition-transform group-hover/author:scale-105 duration-350">
                  <div className="h-full w-full rounded-full bg-white dark:bg-zinc-950 flex items-center justify-center font-bold text-primary">
                    {post.author[0]}
                  </div>
                </div>
                <div>
                  <p className="font-black text-sm group-hover/author:text-primary transition-colors underline-offset-4 group-hover/author:underline decoration-primary decoration-2">{post.author}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">{post.createdAt}</p>
                </div>
              </Link>
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

            <div className="bg-muted/30 dark:bg-zinc-950/40 rounded-3xl p-8 border border-white/40 dark:border-zinc-800/40 mb-8">
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
            <h3 className="text-xl font-black tracking-tight px-4">Community Discussion ({post.comments.length})</h3>
            
            {session ? (
              <form onSubmit={handleAddComment} className="relative group">
                <Input 
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your perspective on this verse..." 
                  className="h-16 pl-6 pr-16 rounded-full bg-white/50 dark:bg-zinc-900/80 backdrop-blur-sm border border-white/50 dark:border-zinc-800/60 shadow-sm focus:ring-primary/20 text-base font-medium placeholder:text-muted-foreground/50"
                />
                <Button 
                  type="submit"
                  size="icon" 
                  className="absolute right-2 top-2 h-12 w-12 rounded-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </form>
            ) : (
              <div className="bg-white/50 dark:bg-zinc-900/80 backdrop-blur-sm rounded-[2.5rem] p-8 text-center border border-white/50 dark:border-zinc-800/60 shadow-md space-y-4">
                <p className="text-muted-foreground font-bold text-sm max-w-md mx-auto">
                  Join our pavement sanctuary to post verses and share reflections in community discussions.
                </p>
                <Button 
                  onClick={() => navigate('/login')}
                  className="rounded-full bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-xs h-12 px-8 shadow-lg shadow-primary/25"
                >
                  Sign In / Sign Up
                </Button>
              </div>
            )}

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