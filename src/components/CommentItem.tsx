"use client";

import React, { useState } from 'react';
import { Comment } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, Send, UserPlus, Mail, CornerDownRight, Edit2, Trash2, X, Check } from 'lucide-react';
import { showSuccess, showError } from '@/utils/toast';
import { useSession } from '@/components/SessionProvider';

interface CommentItemProps {
  comment: Comment;
  isReply?: boolean;
  onReply: (parentId: string, content: string) => void;
  onEdit?: (commentId: string, newContent: string) => void;
  onDelete?: (commentId: string) => void;
}

const CommentItem = ({ comment, isReply = false, onReply, onEdit, onDelete }: CommentItemProps) => {
  const { session, user } = useSession();
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");
  
  // Editing state
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.content);

  // Determine current user handle
  const currentUserHandle = user?.email === 'streetwords21@proton.me' 
    ? 'StreetWords' 
    : (user?.email?.split('@')[0] || '');

  const isCommentAuthor = session && currentUserHandle && currentUserHandle.toLowerCase() === comment.author.toLowerCase();

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

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editText.trim()) return;
    if (onEdit) {
      onEdit(comment.id, editText);
      setIsEditing(false);
      showSuccess("Comment updated!");
    }
  };

  const handleDelete = () => {
    if (onDelete && window.confirm("Are you sure you want to delete this comment?")) {
      onDelete(comment.id);
      showSuccess("Comment deleted.");
    }
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
            {isCommentAuthor ? (
              <>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/5"
                  onClick={() => {
                    setIsEditing(!isEditing);
                    setEditText(comment.content);
                  }}
                  title="Edit Comment"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7 rounded-full text-muted-foreground hover:text-red-500 hover:bg-red-500/5"
                  onClick={handleDelete}
                  title="Delete Comment"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
        
        {isEditing ? (
          <form onSubmit={handleSaveEdit} className="flex gap-2 items-center my-2">
            <Input 
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="h-9 px-3 rounded-xl bg-white border-primary/20 text-xs font-medium"
              autoFocus
            />
            <Button type="submit" size="icon" className="h-9 w-9 bg-primary hover:bg-primary/90 text-white rounded-xl shrink-0">
              <Check className="h-4 w-4" />
            </Button>
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsEditing(false)}
              className="h-9 w-9 rounded-xl shrink-0 text-muted-foreground hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </Button>
          </form>
        ) : (
          <p className="text-sm font-medium leading-relaxed text-foreground/80 mb-3 text-left">
            {comment.content}
          </p>
        )}

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
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;