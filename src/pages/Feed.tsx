"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import CategoryPills from '@/components/CategoryPills';
import VerseCard from '@/components/VerseCard';
import { Category, VersePost } from '@/types';
import { MadeWithDyad } from '@/components/made-with-dyad';
import { Sparkles, X, ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CreatePostModal from '@/components/CreatePostModal';
import { INITIAL_POSTS } from '@/utils/posts';

const Feed = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') as Category | null;
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>(categoryParam || 'All');
  const [allPosts, setAllPosts] = useState<VersePost[]>(INITIAL_POSTS);

  const loadPosts = () => {
    try {
      const stored = localStorage.getItem('streetwords_posts');
      if (stored) {
        const parsed = JSON.parse(stored);
        setAllPosts([...parsed, ...INITIAL_POSTS]);
      } else {
        setAllPosts(INITIAL_POSTS);
      }
    } catch (e) {
      setAllPosts(INITIAL_POSTS);
    }
  };

  useEffect(() => {
    loadPosts();
    // Re-load whenever storage changes
    window.addEventListener('storage', loadPosts);
    return () => window.removeEventListener('storage', loadPosts);
  }, []);

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
    ? allPosts 
    : allPosts.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen urban-pattern bg-background/30">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden border-b border-primary/5">
        <div className="container max-w-6xl relative z-10">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 text-primary text-[10px] font-black uppercase tracking-[0.2em] animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Sparkles className="h-3 w-3" />
              He has overcome the world — John 16:33
            </div>
            
            <div className="space-y-4">
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-foreground leading-[0.85] hero-glow animate-in fade-in slide-in-from-bottom-8 duration-700">
                STREET<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#ec4899] to-primary bg-[length:200%_auto] animate-gradient">WORDS</span>
              </h1>
              <div className="space-y-4 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000">
                <p className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed">
                  Sharing hope together in a broken world with timeless truth, grounded in the Biblical revelation fulfilled by our Creator’s only begotten Son — our Savior Yeshua (Jesus).
                </p>
                <div className="inline-block py-2 px-6 rounded-3xl bg-primary/5 border border-primary/10 backdrop-blur-sm animate-title-glow">
                  <p className="text-sm md:text-base font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#ec4899] to-primary animate-shimmer-text">
                    “For where two or three are gathered in my name, there am I among them.” — Matthew 18:20
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-300">
              <CreatePostModal 
                onPostCreated={loadPosts}
                trigger={
                  <Button className="rounded-full h-14 px-8 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/25 group transition-all hover:scale-105">
                    Post a Verse <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                }
              />
              <Link to="/categories">
                <Button variant="outline" className="rounded-full h-14 px-8 border-primary/20 hover:bg-primary/5 font-black uppercase tracking-widest text-xs backdrop-blur-sm bg-white/20">
                  Explore Truth
                </Button>
              </Link>
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
          
          <div className="bg-white/80 dark:bg-card/90 backdrop-blur-md border border-white/80 dark:border-border/60 rounded-[2.5rem] p-4 md:p-6 shadow-xl transition-all duration-350">
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
              <CreatePostModal 
                onPostCreated={loadPosts}
                trigger={
                  <Button className="mt-8 rounded-full h-12 px-6 bg-primary/10 hover:bg-primary/20 text-primary border-none font-black uppercase tracking-widest text-[10px]">
                    Create First Post
                  </Button>
                }
              />
            </div>
          )}
        </section>
      </main>

      <footer className="mt-32 border-t border-primary/5 py-12">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link to="/store">
            <Button variant="outline" className="rounded-full border-primary/20 text-primary hover:bg-primary/5 font-black text-xs uppercase tracking-widest h-11 px-6 gap-2 shadow-sm">
              Shop Stickers 🏷️
            </Button>
          </Link>
          <MadeWithDyad />
        </div>
      </footer>
    </div>
  );
};

export default Feed;