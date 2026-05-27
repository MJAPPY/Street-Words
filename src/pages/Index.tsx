"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import CategoryPills from '@/components/CategoryPills';
import VerseCard from '@/components/VerseCard';
import { Category, VersePost } from '@/types';
import { MadeWithDyad } from '@/components/made-with-dyad';

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
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container max-w-4xl py-8">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-primary">
            Word on the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#ec4899]">Street</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A community dedicated to discernment in truth through scripture, reflection, and shared wisdom.
          </p>
        </header>

        <section className="sticky top-16 z-40 bg-background/80 backdrop-blur-sm pt-2 mb-8">
          <CategoryPills 
            selectedCategory={selectedCategory} 
            onSelect={setSelectedCategory} 
          />
        </section>

        <section className="grid gap-8">
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <VerseCard key={post.id} post={post} />
            ))
          ) : (
            <div className="text-center py-20 border-2 border-dashed rounded-xl">
              <p className="text-muted-foreground">No verses shared in this category yet. Be the first!</p>
            </div>
          )}
        </section>
      </main>

      <footer className="mt-20 border-t py-12">
        <div className="container text-center">
          <div className="flex justify-center mb-6">
            <img src="/logo.png" alt="Street Words" className="h-12 w-12" />
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            © 2024 Street Words. Finding truth in every verse.
          </p>
          <MadeWithDyad />
        </div>
      </footer>
    </div>
  );
};

export default Index;