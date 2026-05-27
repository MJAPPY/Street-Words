"use client";

import React from 'react';
import { VersePost } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageSquare, Heart, Share2, Quote, MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';

interface VerseCardProps {
  post: VersePost;
}

const VerseCard = ({ post }: VerseCardProps) => {
  return (
    <Card className="group overflow-hidden border-none bg-white/50 backdrop-blur-sm shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_-4px_rgba(168,85,247,0.15)] transition-all duration-500 rounded-3xl">
      <div className="p-6 md:p-8">
        <div className="flex justify-between items-start mb-6">
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
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-none px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
              {post.category}
            </Badge>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
        </div>

        <div className="relative mb-8">
          <Quote className="absolute -top-6 -left-4 h-12 w-12 text-primary/5 pointer-events-none" />
          <blockquote className="relative z-10">
            <p className="text-2xl md:text-3xl font-serif italic text-primary leading-tight tracking-tight mb-4">
              "{post.verse}"
            </p>
            <cite className="block text-right not-italic font-black text-xs uppercase tracking-widest text-muted-foreground/60">
              — {post.reference}
            </cite>
          </blockquote>
        </div>
        
        <div className="bg-muted/30 rounded-2xl p-4 md:p-6 border border-white/40 shadow-inner">
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/40 mb-3">Community Reflection</h4>
          <p className="text-sm md:text-base text-foreground/80 leading-relaxed font-medium">
            {post.relevance}
          </p>
        </div>
      </div>

      <CardFooter className="bg-muted/20 border-t border-white/50 flex justify-between px-6 py-4">
        <div className="flex gap-4">
          <button className="flex items-center gap-1.5 text-muted-foreground hover:text-[#ec4899] transition-colors group/btn">
            <div className="p-2 rounded-full group-hover/btn:bg-[#ec4899]/10 transition-colors">
              <Heart className="h-5 w-5 group-hover/btn:fill-[#ec4899]" />
            </div>
            <span className="text-xs font-bold">{post.likes}</span>
          </button>
          
          <Link to={`/post/${post.id}`} className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors group/btn">
            <div className="p-2 rounded-full group-hover/btn:bg-primary/10 transition-colors">
              <MessageSquare className="h-5 w-5" />
            </div>
            <span className="text-xs font-bold">{post.comments.length}</span>
          </Link>
        </div>
        
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 text-muted-foreground hover:text-primary">
          <Share2 className="h-5 w-5" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VerseCard;