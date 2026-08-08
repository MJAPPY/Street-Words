"use client";

import React, { useState, useEffect, useRef } from 'react';
import { VersePost, Comment, Category, CATEGORY_DATA } from '@/types';
import { Card, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  MessageSquare, Heart, Share2, Quote, Send, ArrowUpRight, 
  ArrowRight, Flag, Bookmark, Download, Loader2, Edit3, 
  PenSquare, Sparkles 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { showSuccess, showError } from '@/utils/toast';
import CommentItem from './CommentItem';
import { useSession } from '@/components/SessionProvider';
import { supabaseService } from '@/utils/supabaseService';
import { useTheme } from 'next-themes';
import html2canvas from 'html2canvas';

interface VerseCardProps {
  post: VersePost;
}

const VerseCard = ({ post: initialPost }: VerseCardProps) => {
  const { session, user } = useSession();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [post, setPost] = useState(initialPost);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);

  // Edit form state
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isUpdatingPost, setIsUpdatingPost] = useState(false);
  const [editFormData, setEditFormData] = useState({
    verse: post.verse,
    reference: post.reference,
    relevance: post.relevance,
    category: post.category
  });

  const captureRef = useRef<HTMLDivElement>(null);

  // Sync state if initialPost changes
  useEffect(() => {
    setPost(initialPost);
    setEditFormData({
      verse: initialPost.verse,
      reference: initialPost.reference,
      relevance: initialPost.relevance,
      category: initialPost.category
    });
  }, [initialPost]);

  useEffect(() => {
    // Check saved status on load
    const savedIds = supabaseService.getSavedPostIds();
    setIsSaved(savedIds.includes(post.id));

    // Check liked status on load
    const likedIds = supabaseService.getLikedPostIds();
    setIsLiked(likedIds.includes(post.id));
  }, [post.id]);

  // Check if the current user is the author of this post
  const currentUserHandle = user?.email === 'streetwords21@proton.me' 
    ? 'StreetWords' 
    : (user?.email?.split('@')[0] || '');
  const isAuthor = session && currentUserHandle && currentUserHandle.toLowerCase() === post.author.toLowerCase();

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!session) {
      showSuccess("Join the sanctuary to like posts!");
      navigate('/login');
      return;
    }

    const nextLiked = supabaseService.toggleLikedPostId(post.id);
    setIsLiked(nextLiked);
    
    // Toggle actual counts (db toggle uses current isLiked to determine the delta)
    const updatedLikesCount = await supabaseService.toggleLike(post.id, post.likes, !nextLiked);
    setPost(prev => ({ ...prev, likes: updatedLikesCount }));
  };

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const nowSaved = supabaseService.toggleSavePost(post.id);
    setIsSaved(nowSaved);
    if (nowSaved) {
      showSuccess("Verse saved to your profile!");
    } else {
      showSuccess("Removed from saved verses.");
    }
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const postUrl = `${window.location.origin}/post/${post.id}`;

    // Try native share sheet first
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Street Words',
          text: `"${post.verse}" - ${post.reference}`,
          url: postUrl,
        });
        showSuccess("Shared successfully!");
        return;
      } catch (err) {
        // Fall through to clipboard copying if native share sheet is dismissed or fails
      }
    }

    // Try modern Clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(postUrl);
        showSuccess("Link copied to clipboard!");
        return;
      } catch (err) {
        // Fall through to traditional legacy copy method
      }
    }

    // Bulletproof fallback copy method for environments like dev iframes
    try {
      const tempTextArea = document.createElement("textarea");
      tempTextArea.value = postUrl;
      // Prevent scrolling to bottom of page when appending
      tempTextArea.style.top = "0";
      tempTextArea.style.left = "0";
      tempTextArea.style.position = "fixed";
      document.body.appendChild(tempTextArea);
      tempTextArea.focus();
      tempTextArea.select();
      
      const success = document.execCommand("copy");
      document.body.removeChild(tempTextArea);
      
      if (success) {
        showSuccess("Link copied to clipboard!");
      } else {
        throw new Error("Unable to copy");
      }
    } catch (fallbackErr) {
      showError("Could not copy link automatically. Please copy the URL from your address bar.");
    }
  };

  const handleDownloadPNG = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!captureRef.current) return;
    setIsDownloading(true);

    try {
      // Small pause to guarantee smooth canvas mounting
      await new Promise((resolve) => setTimeout(resolve, 150));
      
      const canvas = await html2canvas(captureRef.current, {
        useCORS: true,
        scale: 3, // Highly crisp 3x resolution for beautiful prints/retina screens
        backgroundColor: theme === 'dark' ? '#18122B' : '#F3F4F6', // Perfect color fill to match context themes
        logging: false,
        borderRadius: 48,
      });

      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `streetwords-${post.reference.replace(/\s+/g, '-').replace(/:/g, '-').toLowerCase()}.png`;
      link.href = image;
      link.click();
      showSuccess("PNG downloaded! Ready to share or print.");
    } catch (err) {
      console.error(err);
      showError("Could not generate image card.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleReport = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!session) {
      showSuccess("Join the sanctuary to report posts!");
      navigate('/login');
      return;
    }
    showSuccess("Post reported successfully. Moderation team is reviewing it.");
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editFormData.verse.trim() || !editFormData.reference.trim()) return;

    setIsUpdatingPost(true);
    try {
      await supabaseService.updatePost(post.id, editFormData);
      setPost(prev => ({
        ...prev,
        verse: editFormData.verse,
        reference: editFormData.reference,
        relevance: editFormData.relevance,
        category: editFormData.category
      }));
      setIsEditDialogOpen(false);
      showSuccess("Your post has been updated!");
    } catch (err) {
      showError("Could not update post.");
    } finally {
      setIsUpdatingPost(false);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !session) return;

    const authorName = user?.email === 'streetwords21@proton.me' 
      ? 'StreetWords' 
      : (user?.email?.split('@')[0] || 'You');

    const comment = await supabaseService.addComment(post.id, authorName, newComment);

    setPost(prev => ({
      ...prev,
      comments: [comment, ...prev.comments]
    }));
    setNewComment("");
    showSuccess("Comment shared!");
  };

  const handleReply = async (parentId: string, content: string) => {
    if (!session) {
      navigate('/login');
      return;
    }
    const authorName = user?.email === 'streetwords21@proton.me' 
      ? 'StreetWords' 
      : (user?.email?.split('@')[0] || 'You');

    const comment = await supabaseService.addComment(post.id, authorName, content, parentId);

    const addReplyToComments = (commentsList: Comment[]): Comment[] => {
      return commentsList.map(c => {
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

    setPost(prev => ({
      ...prev,
      comments: addReplyToComments(prev.comments)
    }));
  };

  const handleEditComment = async (commentId: string, newContent: string) => {
    await supabaseService.updateComment(commentId, newContent);

    const updateInComments = (commentsList: Comment[]): Comment[] => {
      return commentsList.map(c => {
        if (c.id === commentId) {
          return { ...c, content: newContent };
        }
        if (c.replies && c.replies.length > 0) {
          return { ...c, replies: updateInComments(c.replies) };
        }
        return c;
      });
    };

    setPost(prev => ({
      ...prev,
      comments: updateInComments(prev.comments)
    }));
  };

  const handleDeleteComment = async (commentId: string) => {
    await supabaseService.deleteComment(commentId);

    const deleteFromComments = (commentsList: Comment[]): Comment[] => {
      return commentsList
        .filter(c => c.id !== commentId)
        .map(c => {
          if (c.replies && c.replies.length > 0) {
            return { ...c, replies: deleteFromComments(c.replies) };
          }
          return c;
        });
    };

    setPost(prev => ({
      ...prev,
      comments: deleteFromComments(prev.comments)
    }));
  };

  return (
    <Card className="group relative overflow-hidden border border-white/60 dark:border-zinc-800/60 bg-white/60 dark:bg-zinc-900/80 backdrop-blur-md shadow-lg hover:shadow-[0_20px_50px_-12px_rgba(168,85,247,0.25)] hover:-translate-y-1 transition-all duration-500 rounded-[3rem]">
      {/* Target capture zone for printing & socials */}
      <div ref={captureRef} className="p-8 md:p-12 bg-transparent">
        <div className="flex justify-between items-center mb-10">
          <Link to={`/profile/${post.author}`} className="flex items-center gap-4 group/author hover:opacity-90">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-primary to-[#ec4899] p-[2px] shadow-lg shadow-primary/20 transition-transform group-hover/author:scale-105 duration-350">
              <div className="h-full w-full rounded-[14px] bg-white dark:bg-zinc-950 flex items-center justify-center font-black text-primary text-lg">
                {post.author[0]}
              </div>
            </div>
            <div>
              <p className="font-black text-base text-foreground tracking-tight group-hover/author:text-primary transition-colors underline-offset-4 group-hover/author:underline decoration-primary decoration-2">{post.author}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-black">{post.createdAt}</p>
            </div>
          </Link>
          <Badge variant="secondary" className="bg-primary/10 text-primary border-none px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
            {post.category}
          </Badge>
        </div>

        <Link to={`/post/${post.id}`} className="block relative mb-10 group/quote">
          <Quote className="absolute -top-10 -left-6 h-20 w-20 text-primary/5 pointer-events-none group-hover/quote:text-primary/10 transition-colors" />
          <blockquote className="relative z-10">
            <p className="text-3xl md:text-4xl font-serif italic text-primary leading-tight tracking-tight mb-6 group-hover:translate-x-2 transition-transform duration-500">
              "{post.verse}"
            </p>
            <div className="flex items-center justify-end gap-2 text-muted-foreground/80">
              <span className="h-[1px] w-8 bg-muted-foreground/20" />
              <cite className="not-italic font-black text-xs uppercase tracking-[0.2em]">
                {post.reference}
              </cite>
            </div>
          </blockquote>
        </Link>
        
        <div className="bg-primary/5 dark:bg-zinc-950/40 rounded-[2rem] p-8 md:p-10 border border-primary/5 shadow-inner">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Author's Discernment</h4>
          </div>
          <p className="text-base md:text-lg text-foreground font-medium leading-relaxed italic opacity-90 text-left">
            {post.relevance}
          </p>
        </div>

        {/* Brand watermark included in PNG downloads */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-primary/5 text-[9px] font-black uppercase tracking-[0.25em] text-muted-foreground/40">
          <span>Shared via Street Words</span>
          <span>streetwords.sh</span>
        </div>
      </div>

      <CardFooter className="bg-white/40 dark:bg-zinc-950/40 border-t border-white/60 dark:border-zinc-800/60 flex flex-col px-8 py-0">
        <div className="flex justify-between w-full py-6">
          <div className="flex gap-8">
            <button 
              onClick={handleLike}
              className={`flex items-center gap-2.5 transition-all group/btn ${isLiked ? 'text-[#ec4899] scale-110' : 'text-muted-foreground hover:text-[#ec4899]'}`}
            >
              <div className={`p-2.5 rounded-2xl transition-colors ${isLiked ? 'bg-[#ec4899]/10' : 'bg-transparent group-hover/btn:bg-[#ec4899]/10'}`}>
                <Heart className={`h-6 w-6 ${isLiked ? 'fill-[#ec4899]' : ''}`} />
              </div>
              <span className="text-sm font-black">{post.likes}</span>
            </button>
            
            <button 
              onClick={() => setShowComments(!showComments)}
              className={`flex items-center gap-2.5 transition-colors group/btn ${showComments ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
            >
              <div className={`p-2.5 rounded-2xl transition-colors ${showComments ? 'bg-primary/10' : 'bg-transparent group-hover/btn:bg-primary/10'}`}>
                <MessageSquare className="h-6 w-6" />
              </div>
              <span className="text-sm font-black">{post.comments.length}</span>
            </button>
          </div>
          
          <div className="flex gap-2">
            {isAuthor && (
              <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-12 w-12 rounded-2xl hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors" 
                    title="Edit Post"
                  >
                    <Edit3 className="h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto rounded-[2.5rem] border-none shadow-2xl p-8 md:p-10">
                  <DialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-xl bg-primary/10 text-primary">
                        <PenSquare className="h-5 w-5" />
                      </div>
                      <DialogTitle className="text-2xl font-black tracking-tight">Edit Your Word</DialogTitle>
                    </div>
                    <p className="text-muted-foreground text-sm font-medium">Keep the community guided with accurate truth.</p>
                  </DialogHeader>
                  
                  <form onSubmit={handleEditSubmit} className="space-y-8 py-6">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="edit-verse" className="text-xs font-black uppercase tracking-widest px-1 flex items-center gap-2">
                          <Quote className="h-3 w-3 text-primary" /> The Scripture
                        </Label>
                        <Textarea
                          id="edit-verse"
                          required
                          value={editFormData.verse}
                          onChange={(e) => setEditFormData(prev => ({ ...prev, verse: e.target.value }))}
                          className="rounded-2xl min-h-[120px] bg-muted/30 border-transparent focus:bg-white transition-all font-serif italic text-lg p-6"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="edit-reference" className="text-xs font-black uppercase tracking-widest px-1">Reference</Label>
                          <Input
                            id="edit-reference"
                            required
                            value={editFormData.reference}
                            onChange={(e) => setEditFormData(prev => ({ ...prev, reference: e.target.value }))}
                            className="rounded-2xl h-12 bg-muted/30 border-transparent focus:bg-white transition-all font-bold"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="edit-category" className="text-xs font-black uppercase tracking-widest px-1">Category</Label>
                          <Select 
                            value={editFormData.category} 
                            onValueChange={(val) => setEditFormData(prev => ({ ...prev, category: val as Category }))}
                          >
                            <SelectTrigger className="rounded-2xl h-12 bg-muted/30 border-transparent focus:bg-white transition-all font-black uppercase tracking-widest text-[10px]">
                              <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent className="rounded-2xl border-none shadow-xl">
                              {CATEGORY_DATA.map(cat => (
                                <SelectItem key={cat.name} value={cat.name} className="font-black uppercase tracking-widest text-[10px] focus:bg-primary/5">
                                  {cat.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2 pt-2">
                        <Label htmlFor="edit-relevance" className="text-xs font-black uppercase tracking-widest px-1 flex items-center gap-2">
                          <Sparkles className="h-3 w-3 text-primary" /> Your Discernment
                        </Label>
                        <Textarea
                          id="edit-relevance"
                          value={editFormData.relevance}
                          onChange={(e) => setEditFormData(prev => ({ ...prev, relevance: e.target.value }))}
                          className="rounded-2xl min-h-[100px] bg-muted/30 border-transparent focus:bg-white transition-all font-medium"
                        />
                      </div>
                    </div>

                    <div className="pt-4 flex gap-4">
                      <Button 
                        type="button" 
                        variant="ghost" 
                        onClick={() => setIsEditDialogOpen(false)}
                        className="flex-1 h-14 rounded-full font-black uppercase tracking-widest text-xs"
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="submit" 
                        disabled={isUpdatingPost || !editFormData.verse || !editFormData.reference}
                        className="flex-[2] h-14 rounded-full bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95"
                      >
                        {isUpdatingPost ? <Loader2 className="h-5 w-5 animate-spin" /> : "Save Changes"}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            )}

            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleDownloadPNG} 
              disabled={isDownloading}
              className="h-12 w-12 rounded-2xl hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors" 
              title="Download PNG Card"
            >
              {isDownloading ? <Loader2 className="h-5 w-5 animate-spin text-primary" /> : <Download className="h-5 w-5" />}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleSave} 
              className={`h-12 w-12 rounded-2xl hover:bg-amber-500/10 transition-colors ${isSaved ? 'text-amber-500' : 'text-muted-foreground hover:text-amber-500'}`} 
              title="Save Post"
            >
              <Bookmark className={`h-5 w-5 ${isSaved ? 'fill-amber-500' : ''}`} />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleReport} className="h-12 w-12 rounded-2xl hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-colors" title="Report Post">
              <Flag className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleShare} className="h-12 w-12 rounded-2xl hover:bg-primary/10 text-muted-foreground hover:text-primary" title="Share & Copy Link">
              <Share2 className="h-6 w-6" />
            </Button>
            <Link to={`/post/${post.id}`}>
              <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl hover:bg-primary/10 text-muted-foreground hover:text-primary">
                <ArrowUpRight className="h-6 w-6" />
              </Button>
            </Link>
          </div>
        </div>

        {showComments && (
          <div className="w-full pb-10 pt-4 space-y-8 border-t border-primary/5 animate-in slide-in-from-top-4 duration-500">
            {session ? (
              <form onSubmit={handleAddComment} className="relative">
                <Input 
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your perspective on this verse..." 
                  className="h-14 pl-6 pr-14 rounded-2xl bg-white dark:bg-zinc-950 border-white dark:border-zinc-800 shadow-sm text-sm font-medium focus-visible:ring-primary/20"
                />
                <Button type="submit" size="icon" variant="ghost" className="absolute right-2 top-2 h-10 w-10 text-primary hover:bg-primary/5 rounded-xl">
                  <Send className="h-5 w-5" />
                </Button>
              </form>
            ) : (
              <div className="bg-primary/5 rounded-[2rem] p-6 text-center border border-primary/10 max-w-xl mx-auto space-y-3">
                <p className="text-sm font-bold text-muted-foreground">
                  Join the street sanctuary to share your reflections on this scripture.
                </p>
                <Button 
                  onClick={() => navigate('/login')} 
                  className="rounded-full bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-xs h-10 px-6"
                >
                  Sign In to Comment
                </Button>
              </div>
            )}

            <div className="space-y-6 max-h-[500px] overflow-y-auto px-1 scrollbar-hide">
              {post.comments.map((comment) => (
                <CommentItem 
                  key={comment.id} 
                  comment={comment} 
                  onReply={handleReply}
                  onEdit={handleEditComment}
                  onDelete={handleDeleteComment}
                />
              ))}
            </div>
            
            <Link to={`/post/${post.id}`} className="flex items-center justify-center gap-2 group/all text-[11px] font-black uppercase tracking-[0.2em] text-primary">
              View Discussion Thread <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default VerseCard;