"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import CategoryPills from '@/components/CategoryPills';
import VerseCard from '@/components/VerseCard';
import { Category, VersePost } from '@/types';
import { MadeWithDyad } from '@/components/made-with-dyad';
import { Sparkles, X, ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') as Category | null;
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>(categoryParam || 'All');

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory('All');
    }
  }, [categoryParam]);

  const handleSelectCategory = (cat: Category | 'All') => {
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
    setSelectedCategory(cat);
  };

  const filteredPosts = selectedCategory === 'All' 
    ? MOCK_POSTS 
    : MOCK_POSTS.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen urban-pattern bg-background/30">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden border-b border-primary/5">
        <div className="container max-w-6xl relative z-10">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 text-primary text-[10px] font-black uppercase tracking-[0.2em] animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Sparkles className="h-3 w-3" />
              Illuminating the pavement
            </div>
            
            <div className="space-y-4">
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-foreground leading-[0.85] hero-glow animate-in fade-in slide-in-from-bottom-8 duration-700">
                STREET<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#ec4899] to-primary bg-[length:200%_auto] animate-gradient">WORDS</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000">
                Ancient wisdom for modern streets. Join a community sharing verses that speak to the urban soul and navigating life through communal discernment.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-300">
              <Button className="rounded-full h-14 px-8 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/25 group">
                Post a Verse <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" className="rounded-full h-14 px-8 border-primary/20 hover:bg-primary/5 font-black uppercase tracking-widest text-xs">
                Explore Truth
              </Button>
            </div>
          </div>
        </div>
        
        {/* Background Decorative Elements */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-[#ec4899]/10 rounded-full blur-[100px] pointer-events-none" />
      </section>

      <main className="container max-w-4xl py-16 md:py-24">
        {/* Filters Section */}
        <div className="mb-16 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
              <BookOpen className="h-6 w-6 text-primary" />
              {selectedCategory === 'All' ? 'Latest Feed' : `${selectedCategory} Verses`}
            </h2>
            {selectedCategory !== 'All' && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleSelectCategory('All')}
                className="h-8 px-3 text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/10 rounded-full"
              >
                Clear Filter <X className="ml-1 h-3 w-3" />
              </Button>
            )}
          </div>
          
          <div className="bg-white/40 backdrop-blur-md border border-white/60 rounded-[2.5rem] p-4 md:p-6 shadow-sm">
            <CategoryPills 
              selectedCategory={selectedCategory} 
              onSelect={handleSelectCategory} 
            />
          </div>
        </div>

        {/* Posts Grid */}
        <section className="space-y-12">
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <VerseCard key={post.id} post={post} />
            ))
          ) : (
            <div className="text-center py-32 border-2 border-dashed border-primary/10 rounded-[3rem] bg-white/20 backdrop-blur-sm">
              <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="h-8 w-8 text-primary/20" />
              </div>
              <p className="text-muted-foreground font-bold italic text-lg">
                No verses shared in this category yet. <br /> Be the first to bring the light!
              </p>
              <Button className="mt-8 rounded-full h-12 px-6 bg-primary/10 hover:bg-primary/20 text-primary border-none font-black uppercase tracking-widest text-[10px]">
                Create First Post
              </Button>
            </div>
          )}
        </section>
      </main>

      <footer className="mt-32 border-t border-primary/5 py-12">
        <div className="container text-center">
          <MadeWithDyad />
        </div>
      </footer>
    </div>
  );
};

export default Index;