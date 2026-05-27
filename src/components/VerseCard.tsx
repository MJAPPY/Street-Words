"use client";

import React from 'react';
import { VersePost } from '@/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageSquare, Heart, Share2, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';

interface VerseCardProps {
  post: VersePost;
}

const VerseCard = ({ post }: VerseCardProps) => {
  return (
    <Card className="overflow-hidden border-2 hover:border-[#a855f7]/50 transition-all duration-300 shadow-sm hover:shadow-md">
      <CardHeader className="space-y-1 bg-muted/30 pb-4">
        <div className="flex justify-between items-center">
          <Badge className="bg-[#ec4899] hover:bg-[#db2777]">
            {post.category}
          </Badge>
          <span className="text-xs text-muted-foreground">{post.createdAt}</span>
        </div>
        <div className="flex items-center gap-2 pt-2">
          <div className="h-8 w-8 rounded-full bg-[#a855f7]/20 flex items-center justify-center text-[#a855f7] font-bold">
            {post.author[0]}
          </div>
          <span className="text-sm font-semibold">{post.author}</span>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="relative">
          <Quote className="absolute -top-2 -left-2 h-8 w-8 text-muted/20 rotate-180" />
          <p className="text-xl font-serif italic text-primary leading-relaxed px-4">
            "{post.verse}"
          </p>
          <p className="text-right font-bold text-sm mt-2 text-muted-foreground">
            — {post.reference}
          </p>
        </div>
        
        <div className="pt-4 border-t border-dashed">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Relevance & Reflection</h4>
          <p className="text-sm text-foreground/80 leading-relaxed">
            {post.relevance}
          </p>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/10 border-t flex justify-between p-2">
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" className="gap-2 hover:text-[#ec4899]">
            <Heart className="h-4 w-4" />
            <span className="text-xs">{post.likes}</span>
          </Button>
          <Link to={`/post/${post.id}`}>
            <Button variant="ghost" size="sm" className="gap-2 hover:text-[#a855f7]">
              <MessageSquare className="h-4 w-4" />
              <span className="text-xs">{post.comments.length}</span>
            </Button>
          </Link>
        </div>
        <Button variant="ghost" size="sm">
          <Share2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VerseCard;