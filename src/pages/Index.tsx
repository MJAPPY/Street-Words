"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import CategoryPills from '@/components/CategoryPills';
import VerseCard from '@/components/VerseCard';
import { Category, VersePost } from '@/types';
import { MadeWithDyad } from '@/components/made-with-dyad';
import { Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MOCK_POSTS: VersePost[] = [
  {
    id: '1',
    verse: 'Now faith is the assurance of things hoped for, the conviction of things not seen.',
    reference: 'Hebrews 11:1',
    relevance: 'In a world that demands proof for everything, faith is our anchor. It allows us to walk confidently into the unknown because we trust the One who holds the future.',
    category: 'Faith',
    author: 'TruthSeeker',
    createdAt: '2 hours ago',
    likes: 24,
    comments: [
      { id: 'c1', author: 'Hopeful', content: 'This is exactly what I needed today. Discernment starts with trust.', createdAt: '1 hour ago' }
    ]
  },
  {
    id: '2',
    verse: 'Love is patient and kind; love does not envy or boast; it is not arrogant or rude.',
    reference: '1 Corinthians 13:4',
    relevance: 'Street life can be hard and cold. Practicing this kind of love is the ultimate counter-culture movement. It is how we show the truth of the Gospel.',
    category: 'Love',
    author: 'StreetApostle',
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
    author: 'GraceFindsMe',
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
    author: 'SageStreet',
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
    <div className="min-h-screen urban-pattern bg-background/50">
      <Navbar />
      
      <main className="container max-w-4xl py-12 md:py-20">
        <header className="mb-16 text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-primary/5 border border-primary/10 rounded-full px-4 py-1.5 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-4">
            <Sparkles className="h-3 w-3" />
            Word on the Street
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground leading-[0.9]">
            {selectedCategory === 'All' ? (
              <>Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#ec4899]">Feed</span></>
            ) : (
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#ec4899]">{selectedCategory}</span>
            )}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto font-medium">
            {selectedCategory === 'All' 
              ? "Exploring ancient wisdom for modern streets through communal discernment."
              : `Verses and reflections centered on the theme of ${selectedCategory}.`
            }
          </p>
        </header>

        <section className="sticky top-[65px] z-40 bg-background/50 backdrop-blur-md pt-4 pb-6 mb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex items-center justify-between gap-4">
            <CategoryPills 
              selectedCategory={selectedCategory} 
              onSelect={handleSelectCategory} 
            />
            {selectedCategory !== 'All' && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleSelectCategory('All')}
                className="rounded-full h-8 px-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary"
              >
                Clear <X className="ml-1.5 h-3 w-3" />
              </Button>
            )}
          </div>
        </section>

        <section className="space-y-10">
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <VerseCard key={post.id} post={post} />
            ))
          ) : (
            <div className="text-center py-32 border-2 border-dashed border-primary/10 rounded-[2.5rem] bg-white/30">
              <p className="text-muted-foreground font-bold italic">No verses shared in this category yet. <br /> Be the first to bring the light!</p>
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