"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import CategoryPills from '@/components/CategoryPills';
import VerseCard from '@/components/VerseCard';
import { Category, VersePost } from '@/types';
import { MadeWithDyad } from '@/components/made-with-dyad';
import { Sparkles } from 'lucide-react';

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
  }
];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');

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
            Join the community of discernment
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground leading-[0.9]">
            Word on the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] via-[#ec4899] to-[#a855f7] bg-[length:200%_auto] animate-gradient">
              Street
            </span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto font-medium leading-relaxed">
            Finding truth in every verse. A sanctuary for scripture, urban reflection, and communal wisdom.
          </p>
        </header>

        <section className="sticky top-[65px] z-40 bg-background/50 backdrop-blur-md pt-4 pb-6 mb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
          <CategoryPills 
            selectedCategory={selectedCategory} 
            onSelect={setSelectedCategory} 
          />
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

      <footer className="mt-32 border-t border-primary/5 bg-white/30 backdrop-blur-sm py-16">
        <div className="container text-center max-w-xl">
          <div className="flex justify-center mb-8">
            <div className="rounded-2xl bg-gradient-to-br from-[#a855f7] to-[#ec4899] p-[2px]">
              <div className="bg-white rounded-[14px] p-2">
                <img src="/logo.png" alt="Street Words" className="h-10 w-10" />
              </div>
            </div>
          </div>
          <h3 className="font-black tracking-tighter text-xl mb-4">STREET WORDS</h3>
          <p className="text-sm text-muted-foreground font-medium mb-8 leading-relaxed px-4">
            A digital corner where ancient wisdom meets modern streets. Dedicated to truth, discernment, and the community.
          </p>
          <div className="pt-8 border-t border-primary/5">
            <MadeWithDyad />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;