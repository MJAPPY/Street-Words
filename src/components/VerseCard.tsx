"use client";

import React, { useState } from 'react';
import { VersePost, Comment } from '@/types';
import { Card, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageSquare, Heart, Share2, Quote, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { showSuccess } from '@/utils/toast';
import { Input } from '@/components/ui/input';
import CommentItem from './CommentItem';

interface VerseCardProps {
  post: VersePost;
}

const VerseCard = ({ post: initialPost }: VerseCardProps) => {
  const [post, setPost] = useState(initialPost);
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
    setPost(prev => ({
      ...prev,
      likes: isLiked ? prev.likes - 1 : prev.likes + 1
    }));
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.share({
        title: 'Street Words',
        text: `"${post.verse}" - ${post.reference}`,
        url: `${window.location.origin}/post/${post.id}`,
      });
    } catch (err) {
      showSuccess("Link copied to clipboard!");
      navigator.clipboard.writeText(`${window.location.origin}/post/${post.id}`);
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

    setPost(prev => ({
      ...prev,
      comments: [comment, ...prev.comments]
    }));
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

    setPost(prev => ({
      ...prev,
      comments: addReplyToComments(prev.comments)
    }));
  };

  return (
    <Card className="group overflow-hidden border-none bg-white/50 backdrop-blur-sm shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_-4px_rgba(168,85,247,0.15)] transition-all duration-500 rounded-[2.5rem]">
      <div className="p-6 md:p-10">
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-[#a855f7] to-[#ec4899] p-[2px]">
              <div className="h-full w-full rounded-full bg-white flex items-center justify-center font-bold text-primary text-sm">
                {post.author[0]}
              </div>
            </div>
            <div>
              <p className="font-bold text-sm text-foreground">{post.author}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">{post.createdAt}</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-primary/10 text-primary border-none px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
            {post.category}
          </Badge>
        </div>

        <Link to={`/post/${post.id}`} className="block relative mb-8 group/quote">
          <Quote className="absolute -top-8 -left-4 h-16 w-16 text-primary/5 pointer-events-none group-hover/quote:text-primary/10 transition-colors" />
          <blockquote className="relative z-10">
            <p className="text-2xl md:text-3xl font-serif italic text-primary leading-tight tracking-tight mb-4 group-hover:translate-x-1 transition-transform">
              "{post.verse}"
            </p>
            <cite className="block text-right not-italic font-black text-xs uppercase tracking-widest text-muted-foreground/60">
              — {post.reference}
            </cite>
          </blockquote>
        </Link>
        
        <div className="bg-muted/30 rounded-3xl p-6 md:p-8 border border-white/40 shadow-inner">
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/40 mb-3">Community Reflection</h4>
          <p className="text-sm md:text-base text-foreground/80 leading-relaxed font-medium">
            {post.relevance}
          </p>
        </div>
      </div>

      <CardFooter className="bg-muted/20 border-t border-white/50 flex flex-col px-6 py-0">
        <div className="flex justify-between w-full py-4 px-2">
          <div className="flex gap-6">
            <button 
              onClick={handleLike}
              className={`flex items-center gap-2 transition-all ${isLiked ? 'text-[#ec4899] scale-110' : 'text-muted-foreground hover:text-[#ec4899]'}`}
            >
              <Heart className={`h-5 w-5 ${isLiked ? 'fill-[#ec4899]' : ''}`} />
              <span className="text-xs font-black">{post.likes}</span>
            </button>
            
            <button 
              onClick={() => setShowComments(!showComments)}
              className={`flex items-center gap-2 transition-colors ${showComments ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
            >
              <MessageSquare className="h-5 w-5" />
              <span className="text-xs font-black">{post.comments.length}</span>
            </button>
          </div>
          
          <Button variant="ghost" size="icon" onClick={handleShare} className="rounded-full hover:bg-primary/10 text-muted-foreground hover:text-primary">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>

        {showComments && (
          <div className="w-full pb-8 pt-4 space-y-6 border-t border-primary/5 animate-in slide-in-from-top-2 duration-300">
            <form onSubmit={handleAddComment} className="relative px-2">
              <Input 
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add your reflection..." 
                className="h-12 pl-4 pr-12 rounded-2xl bg-white/50 border-white/50 text-sm font-medium"
              />
              <Button type="submit" size="icon" variant="ghost" className="absolute right-3 top-1 text-primary hover:bg-primary/5">
                <Send className="h-4 w-4" />
              </Button>
            </form>

            <div className="space-y-4 max-h-96 overflow-y-auto px-2 scrollbar-hide">
              {post.comments.map((comment) => (
                <CommentItem 
                  key={comment.id} 
                  comment={comment} 
                  onReply={handleReply}
                />
              ))}
              {post.comments.length === 0 && (
                <p className="text-center py-4 text-xs font-bold text-muted-foreground italic">No reflections yet. Be the first!</p>
              )}
            </div>
            
            <Link to={`/post/${post.id}`} className="block text-center text-[10px] font-black uppercase tracking-widest text-primary hover:underline">
              View All Reflections
            </Link>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default VerseCard;