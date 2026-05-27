"use client";

import React, { useState } from 'react';
import { Comment } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, Send, UserPlus, Mail, CornerDownRight } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

interface CommentItemProps {
  comment: Comment;
  isReply?: boolean;
  onReply: (parentId: string, content: string) => void;
}

const CommentItem = ({ comment, isReply = false, onReply }: CommentItemProps) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleContact = (author: string) => {
    showSuccess(`Message request sent to ${author}`);
  };

  const submitReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    onReply(comment.id, replyText);
    setReplyText("");
    setShowReplyInput(false);
    showSuccess("Reply shared!");
  };

  return (
    <div className={`group space-y-3 ${isReply ? 'ml-6 md:ml-10 mt-4 border-l-2 border-primary/10 pl-4' : ''}`}>
      <div className="bg-white/40 backdrop-blur-sm p-5 rounded-3xl border border-white/50 shadow-sm transition-all hover:shadow-md hover:bg-white/60">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            {isReply && <CornerDownRight className="h-3 w-3 text-primary/40" />}
            <span className="font-black text-xs text-primary uppercase tracking-tight">{comment.author}</span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/30" />
            <span className="text-[9px] text-muted-foreground font-bold">{comment.createdAt}</span>
          </div>
          
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/5"
              onClick={() => handleContact(comment.author)}
              title="Contact Member"
            >
              <Mail className="h-3.5 w-3.5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/5"
              title="Add Friend"
              onClick={() => showSuccess(`Followed ${comment.author}`)}
            >
              <UserPlus className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
        
        <p className="text-sm font-medium leading-relaxed text-foreground/80 mb-3">
          {comment.content}
        </p>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowReplyInput(!showReplyInput)}
            className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary flex items-center gap-1.5 transition-colors"
          >
            <MessageSquare className="h-3 w-3" /> Reply
          </button>
        </div>
      </div>

      {showReplyInput && (
        <form onSubmit={submitReply} className="relative ml-4 animate-in slide-in-from-top-1 duration-200">
          <Input 
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder={`Reply to ${comment.author}...`} 
            className="h-10 pl-4 pr-10 rounded-2xl bg-white/80 border-primary/20 text-xs font-medium"
            autoFocus
          />
          <Button type="submit" size="icon" variant="ghost" className="absolute right-1 top-1 h-8 w-8 text-primary hover:bg-primary/5">
            <Send className="h-3.5 w-3.5" />
          </Button>
        </form>
      )}

      {comment.replies && comment.replies.length > 0 && (
        <div className="space-y-3">
          {comment.replies.map((reply) => (
            <CommentItem 
              key={reply.id} 
              comment={reply} 
              isReply={true} 
              onReply={onReply}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;