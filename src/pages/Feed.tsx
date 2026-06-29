"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CategoryPills from '@/components/CategoryPills';
import VerseCard from '@/components/VerseCard';
import { Category, VersePost } from '@/types';
import { Sparkles, X, ArrowRight, BookOpen, Search, Quote, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CreatePostModal from '@/components/CreatePostModal';
import { supabaseService } from '@/utils/supabaseService';
import { INITIAL_POSTS } from '@/utils/posts';
import { getDailyVerseForToday } from '@/utils/dailyVerses';

const Feed = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') as Category | null;
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>(categoryParam || 'All');
  const [allPosts, setAllPosts] = useState<VersePost[]>(INITIAL_POSTS);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  
  // Interactive Daily Word Reveal states
  const [isRevealed, setIsRevealed] = useState(false);
  const dailyVerse = getDailyVerseForToday();

  const loadPosts = async () => {
    const posts = await supabaseService.getPosts();
    setAllPosts(posts);
  };

  useEffect(() => {
    loadPosts();
    // Re-load whenever local storage changes or window gets focus (for multi-client live sync)
    window.addEventListener('storage', loadPosts);
    window.addEventListener('focus', loadPosts);
    return () => {
      window.removeEventListener('storage', loadPosts);
      window.removeEventListener('focus', loadPosts);
    };
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

  // Find the generated dynamic post object that matches today's daily verse reference
  const matchingDailyPost = allPosts.find(
    p => p.reference.toLowerCase() === dailyVerse.reference.toLowerCase()
  );

  // Combine Category filter + Active Search Query filter
  const filteredPosts = allPosts.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = searchQuery.trim() === "" || 
      p.verse.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.reference.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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

      <main className="container max-w-4xl py-12 md:py-20">
        
        {/* Interactive Daily Promise Reveal Card Widget */}
        <div className="mb-16">
          <div 
            onClick={() => setIsRevealed(!isRevealed)}
            className="group relative cursor-pointer overflow-hidden p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-br from-[#a855f7] to-[#ec4899] text-white shadow-2xl transition-all duration-500 hover:scale-[1.01] hover:shadow-pink-500/20"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 opacity-10 rounded-bl-full pointer-events-none" />
            <Quote className="absolute -top-10 -left-10 h-40 w-40 text-white/5 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8 text-left">
              <div className="space-y-3 flex-1">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/20 text-[9px] font-black uppercase tracking-widest text-white backdrop-blur-md">
                  <Sparkles className="h-3 w-3 text-amber-300 animate-pulse" /> Daily Promise Card
                </span>
                
                {!isRevealed ? (
                  <div className="space-y-1.5 pt-2">
                    <h3 className="text-3xl font-black tracking-tight leading-none">Your Daily Promise is Ready</h3>
                    <p className="text-sm text-white/80 font-medium">Click this beautiful banner to flip and reveal today's sanctuary encouragement.</p>
                  </div>
                ) : (
                  <div className="space-y-4 pt-2 animate-in fade-in duration-500">
                    <p className="text-2xl md:text-3xl font-serif italic text-white leading-tight">
                      "{dailyVerse.verse}"
                    </p>
                    <p className="font-black text-xs uppercase tracking-[0.2em] text-white/70 text-right">
                      — {dailyVerse.reference}
                    </p>
                    <div className="mt-4 p-4 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md">
                      <p className="text-xs font-semibold leading-relaxed text-white/90">
                        {dailyVerse.discernment}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="shrink-0 flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                {!isRevealed ? (
                  <Button 
                    onClick={() => setIsRevealed(true)}
                    className="rounded-full h-14 px-6 bg-white hover:bg-white/95 text-primary font-black uppercase tracking-widest text-xs shadow-lg gap-2"
                  >
                    Tap to Open <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-3">
                    {matchingDailyPost && (
                      <Button 
                        onClick={() => navigate(`/post/${matchingDailyPost.id}`)}
                        className="rounded-full h-14 px-6 bg-white hover:bg-white/95 text-primary font-black uppercase tracking-widest text-xs shadow-lg gap-2"
                      >
                        <MessageSquare className="h-4 w-4" /> Discussion Thread
                      </Button>
                    )}
                    <Button 
                      variant="ghost"
                      onClick={() => setIsRevealed(false)}
                      className="rounded-full h-14 px-6 text-white hover:bg-white/10 font-black uppercase tracking-widest text-xs gap-2"
                    >
                      Hide
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Real-Time Filter Search & Categories Section */}
        <div className="mb-16 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2">
            <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
              <BookOpen className="h-6 w-6 text-primary" />
              {selectedCategory === 'All' ? 'Latest Feed' : `${selectedCategory} Verses`}
            </h2>
            
            {/* Functional Search Bar */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
              <Input
                placeholder="Search scripture or author..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-full h-11 pl-11 pr-10 bg-white/50 dark:bg-zinc-900/60 border border-primary/10 backdrop-blur-sm text-xs font-semibold focus-visible:ring-primary/20"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 h-5 w-5 bg-muted/40 hover:bg-muted/80 rounded-full flex items-center justify-center text-muted-foreground transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>

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
                No verses shared matching your query. <br /> Be the first to bring the light!
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

      <Footer />
    </div>
  );
};

export default Feed;