"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Category, CATEGORY_DATA } from '@/types';
import { showSuccess, showError } from '@/utils/toast';
import { PenSquare, Loader2, Quote, Sparkles, Check } from 'lucide-react';
import { useSession } from '@/components/SessionProvider';
import { useNavigate } from 'react-router-dom';
import { supabaseService } from '@/utils/supabaseService';
import { cn } from '@/lib/utils';

interface CreatePostModalProps {
  trigger?: React.ReactNode;
  onPostCreated?: () => void;
}

const CreatePostModal = ({ trigger, onPostCreated }: CreatePostModalProps) => {
  const { session, user } = useSession();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    verse: "",
    reference: "",
    relevance: "",
    categories: ["Truth"] as Category[]
  });

  const handleTriggerClick = (e: React.MouseEvent) => {
    if (!session) {
      e.preventDefault();
      e.stopPropagation();
      navigate('/login');
    }
  };

  const toggleCategory = (catName: Category) => {
    setFormData(prev => {
      const active = [...prev.categories];
      if (active.includes(catName)) {
        if (active.length === 1) {
          showError("Select at least 1 category for this word.");
          return prev;
        }
        return { ...prev, categories: active.filter(c => c !== catName) };
      } else {
        return { ...prev, categories: [...active, catName] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.verse || !formData.reference || formData.categories.length === 0) return;

    setIsLoading(true);
    const authorName = user?.email === 'streetwords21@proton.me' 
      ? 'StreetWords' 
      : (user?.email?.split('@')[0] || 'TruthSeeker');

    try {
      await supabaseService.createPost({
        verse: formData.verse,
        reference: formData.reference,
        relevance: formData.relevance,
        category: formData.categories.join(', ') as Category, // Comma separated list matches schema Text constraints cleanly
        author: authorName
      });

      showSuccess("Verse shared with the community!");
      setIsOpen(false);
      setFormData({
        verse: "",
        reference: "",
        relevance: "",
        categories: ["Truth"]
      });

      if (onPostCreated) {
        onPostCreated();
      } else {
        window.dispatchEvent(new Event('storage'));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const renderTrigger = () => {
    if (trigger) {
      return (
        <div onClick={handleTriggerClick} className="cursor-pointer">
          {trigger}
        </div>
      );
    }

    return (
      <Button 
        onClick={handleTriggerClick}
        className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 rounded-full px-6 gap-2 text-[10px] font-black uppercase tracking-widest h-9"
      >
        <PenSquare className="h-3.5 w-3.5" />
        Post Verse
      </Button>
    );
  };

  if (!session) {
    return renderTrigger();
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {renderTrigger()}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto rounded-[2.5rem] border-none shadow-2xl p-6 md:p-10">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <PenSquare className="h-5 w-5" />
            </div>
            <DialogTitle className="text-2xl font-black tracking-tight">Share a Word</DialogTitle>
          </div>
          <p className="text-muted-foreground text-sm font-medium">Illuminate the pavement with ancient truth.</p>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-5">
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
                className="rounded-2xl min-h-[100px] bg-muted/30 border-transparent focus:bg-white dark:focus:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 transition-all font-serif italic text-lg p-6"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reference" className="text-xs font-black uppercase tracking-widest px-1">Reference</Label>
              <Input
                id="reference"
                required
                placeholder="e.g. John 3:16"
                value={formData.reference}
                onChange={(e) => setFormData(prev => ({ ...prev, reference: e.target.value }))}
                className="rounded-2xl h-12 bg-muted/30 border-transparent focus:bg-white dark:focus:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 transition-all font-bold"
              />
            </div>

            {/* Custom Multi-Select Tag UI */}
            <div className="space-y-2">
              <Label className="text-xs font-black uppercase tracking-widest px-1 flex items-center justify-between">
                <span>Select Categories (Select Multiple)</span>
                <span className="text-[10px] text-primary">{formData.categories.length} Selected</span>
              </Label>
              <div className="flex flex-wrap gap-2 p-4 bg-muted/30 rounded-[1.5rem] max-h-[160px] overflow-y-auto border border-primary/5">
                {CATEGORY_DATA.map((cat) => {
                  const isSelected = formData.categories.includes(cat.name);
                  return (
                    <button
                      type="button"
                      key={cat.name}
                      onClick={() => toggleCategory(cat.name)}
                      className={cn(
                        "rounded-full px-3.5 py-1.5 text-[9px] font-black uppercase tracking-widest transition-all duration-200 border flex items-center gap-1.5",
                        isSelected 
                          ? "bg-primary text-white border-primary shadow-sm" 
                          : "bg-white/80 dark:bg-zinc-900/60 text-muted-foreground border-transparent hover:border-primary/20 hover:text-primary"
                      )}
                    >
                      {isSelected && <Check className="h-3 w-3" />}
                      {cat.name}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <Label htmlFor="relevance" className="text-xs font-black uppercase tracking-widest px-1 flex items-center gap-2">
                <Sparkles className="h-3 w-3 text-primary" /> Your Discernment
              </Label>
              <Textarea
                id="relevance"
                placeholder="How does this truth apply to the streets today?"
                value={formData.relevance}
                onChange={(e) => setFormData(prev => ({ ...prev, relevance: e.target.value }))}
                className="rounded-2xl min-h-[90px] bg-muted/30 border-transparent focus:bg-white dark:focus:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 transition-all font-medium"
              />
            </div>
          </div>

          <div className="pt-2 flex gap-4">
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