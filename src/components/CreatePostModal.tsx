"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Category, CATEGORY_DATA, VersePost } from '@/types';
import { showSuccess } from '@/utils/toast';
import { PenSquare, Loader2, Quote, Sparkles } from 'lucide-react';

interface CreatePostModalProps {
  trigger?: React.ReactNode;
  onPostCreated?: () => void;
}

const CreatePostModal = ({ trigger, onPostCreated }: CreatePostModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    verse: "",
    reference: "",
    relevance: "",
    category: "Truth" as Category
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.verse || !formData.reference) return;

    setIsLoading(true);
    
    // Simulate API call and persist locally so dynamic counts are completely accurate in real-time
    setTimeout(() => {
      const newPost: VersePost = {
        id: Date.now().toString(),
        verse: formData.verse,
        reference: formData.reference,
        relevance: formData.relevance,
        category: formData.category,
        author: 'TruthSeeker',
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

      showSuccess("Verse shared with the community!");
      setIsLoading(false);
      setIsOpen(false);
      setFormData({
        verse: "",
        reference: "",
        relevance: "",
        category: "Truth"
      });

      if (onPostCreated) {
        onPostCreated();
      } else {
        // Trigger page refresh to update feed and category count dynamically
        window.dispatchEvent(new Event('storage'));
        window.location.reload();
      }
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 rounded-full px-6 gap-2 text-[10px] font-black uppercase tracking-widest h-9">
            <PenSquare className="h-3.5 w-3.5" />
            Post Verse
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto rounded-[2.5rem] border-none shadow-2xl p-8 md:p-10">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <PenSquare className="h-5 w-5" />
            </div>
            <DialogTitle className="text-2xl font-black tracking-tight">Share a Word</DialogTitle>
          </div>
          <p className="text-muted-foreground text-sm font-medium">Illuminate the pavement with ancient truth.</p>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-8 py-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="verse" className="text-xs font-black uppercase tracking-widest px-1 flex items-center gap-2">
                <Quote className="h-3 w-3 text-primary" /> The Scripture
              </Label>
              <Textarea
                id="verse"
                required
                placeholder="Enter the verse text here..."
                value={formData.verse}
                onChange={(e) => setFormData(prev => ({ ...prev, verse: e.target.value }))}
                className="rounded-2xl min-h-[120px] bg-muted/30 border-transparent focus:bg-white transition-all font-serif italic text-lg p-6"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="reference" className="text-xs font-black uppercase tracking-widest px-1">Reference</Label>
                <Input
                  id="reference"
                  required
                  placeholder="e.g. John 3:16"
                  value={formData.reference}
                  onChange={(e) => setFormData(prev => ({ ...prev, reference: e.target.value }))}
                  className="rounded-2xl h-12 bg-muted/30 border-transparent focus:bg-white transition-all font-bold"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-xs font-black uppercase tracking-widest px-1">Category</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(val) => setFormData(prev => ({ ...prev, category: val as Category }))}
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
              <Label htmlFor="relevance" className="text-xs font-black uppercase tracking-widest px-1 flex items-center gap-2">
                <Sparkles className="h-3 w-3 text-primary" /> Your Discernment
              </Label>
              <Textarea
                id="relevance"
                placeholder="How does this truth apply to the streets today?"
                value={formData.relevance}
                onChange={(e) => setFormData(prev => ({ ...prev, relevance: e.target.value }))}
                className="rounded-2xl min-h-[100px] bg-muted/30 border-transparent focus:bg-white transition-all font-medium"
              />
              <p className="text-[9px] text-muted-foreground font-bold px-1 italic">Shared reflections help our community navigate life's complexities.</p>
            </div>
          </div>

          <div className="pt-4 flex gap-4">
            <Button 
              type="button" 
              variant="ghost" 
              onClick={() => setIsOpen(false)}
              className="flex-1 h-14 rounded-full font-black uppercase tracking-widest text-xs"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading || !formData.verse || !formData.reference}
              className="flex-[2] h-14 rounded-full bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95"
            >
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Share with Community"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostModal;