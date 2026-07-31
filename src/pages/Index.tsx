"use client";

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { 
  Sparkles, ArrowRight, BookOpen, Users, 
  Quote, Compass, Heart, MessageSquare, Shield,
  ExternalLink, CheckCircle, ChevronRight, Bookmark
} from 'lucide-react';

const Landing = () => {
  const [activeTab, setActiveTab] = useState<'faith' | 'hope' | 'love'>('faith');

  const interactiveVerses = {
    faith: {
      verse: "Now faith is the assurance of things hoped for, the conviction of things not seen.",
      ref: "Hebrews 11:1",
      discernment: "Amidst the concrete grind, faith isn't a passive feeling—it is active, stubborn confidence in the Creator's unseen plan.",
      likes: 124,
      author: "UrbanPilgrim"
    },
    hope: {
      verse: "For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope.",
      ref: "Jeremiah 29:11",
      discernment: "The lanes look crowded and the paths look broken, but your path is anchored. Walk with absolute security.",
      likes: 98,
      author: "StreetWords"
    },
    love: {
      verse: "Love is patient and kind; love does not envy or boast; it is not arrogant or rude.",
      ref: "1 Corinthians 13:4",
      discernment: "In a fast-paced city where self-reliance is praised, radical kindness is the ultimate counter-culture movement.",
      likes: 142,
      author: "GraceSeeker"
    }
  };

  return (
    <div className="min-h-screen urban-pattern bg-background/50 overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-20 md:pt-32 md:pb-36">
        <div className="container max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Hero Column */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/25 rounded-full px-5 py-2 text-primary text-xs font-black uppercase tracking-[0.25em] animate-in fade-in slide-in-from-bottom-4 duration-500 shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-amber-500 animate-pulse" />
                He has overcome the world — John 16:33
              </div>
              
              <div className="space-y-6">
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-foreground leading-[0.85] select-none animate-title-glow">
                  STREET<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#ec4899] to-primary bg-[length:200%_auto] animate-shimmer-text">WORDS</span>
                </h1>
                
                <p className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed max-w-xl">
                  Sharing hope together in a broken world with timeless truth, grounded in the Biblical revelation fulfilled by our Creator’s only begotten Son — our Savior Yeshua (Jesus).
                </p>
              </div>

              {/* Dynamic Interactive Tab Switcher inside Hero */}
              <div className="bg-white/40 dark:bg-zinc-900/60 backdrop-blur-md p-2 rounded-full border border-primary/10 inline-flex gap-1.5 shadow-sm max-w-full overflow-x-auto">
                {(['faith', 'hope', 'love'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`rounded-full px-6 py-2.5 text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                      activeTab === tab
                        ? 'bg-primary text-white shadow-md shadow-primary/20 scale-105'
                        : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-5 pt-4">
                <Link to="/feed">
                  <Button className="rounded-full h-16 px-10 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-xs shadow-[0_20px_50px_-12px_rgba(168,85,247,0.4)] group transition-all hover:scale-105">
                    Walk the Street <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1.5 transition-transform" />
                  </Button>
                </Link>
                <Link to="/categories">
                  <Button variant="outline" className="rounded-full h-16 px-10 border-primary/15 hover:bg-primary/5 font-black uppercase tracking-widest text-xs backdrop-blur-sm bg-white/20">
                    Explore Categories
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Hero Column - Beautiful Scripture Mockup Card */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary to-[#ec4899] rounded-[3.5rem] opacity-20 blur-3xl pointer-events-none" />
              
              <div className="relative overflow-hidden border border-white/80 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-900/80 backdrop-blur-md shadow-2xl rounded-[3rem] p-8 md:p-10 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(168,85,247,0.3)] hover:-translate-y-1">
                {/* Floating tags */}
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-primary to-[#ec4899] p-[1.5px] shadow-sm">
                      <div className="h-full w-full rounded-[14px] bg-white dark:bg-zinc-950 flex items-center justify-center font-black text-primary text-sm">
                        {interactiveVerses[activeTab].author[0]}
                      </div>
                    </div>
                    <div>
                      <p className="font-black text-sm text-foreground leading-none">{interactiveVerses[activeTab].author}</p>
                      <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-black mt-1">Live Disciple</p>
                    </div>
                  </div>
                  <span className="bg-primary/10 text-primary border-none px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest">
                    {activeTab}
                  </span>
                </div>

                {/* Main Quote block */}
                <div className="relative mb-8">
                  <Quote className="absolute -top-6 -left-4 h-16 w-16 text-primary/10 pointer-events-none" />
                  <p className="relative z-10 text-2xl font-serif italic text-primary leading-tight font-medium text-left">
                    "{interactiveVerses[activeTab].verse}"
                  </p>
                  <p className="text-right font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-4">
                    — {interactiveVerses[activeTab].ref}
                  </p>
                </div>

                {/* Application Area */}
                <div className="bg-primary/5 dark:bg-zinc-950/40 rounded-2xl p-5 border border-primary/5 text-left mb-6">
                  <p className="text-[9px] font-black uppercase tracking-wider text-primary mb-1">Discernment</p>
                  <p className="text-xs text-foreground/80 leading-relaxed font-semibold italic">
                    {interactiveVerses[activeTab].discernment}
                  </p>
                </div>

                {/* Footer Controls */}
                <div className="flex justify-between items-center pt-4 border-t border-primary/5">
                  <div className="flex gap-4">
                    <span className="flex items-center gap-1.5 text-xs font-black text-muted-foreground">
                      <Heart className="h-4 w-4 text-[#ec4899] fill-[#ec4899]" />
                      {interactiveVerses[activeTab].likes}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-black text-muted-foreground">
                      <MessageSquare className="h-4 w-4 text-primary" />
                      14
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="p-2 bg-amber-500/10 text-amber-500 rounded-xl">
                      <Bookmark className="h-3.5 w-3.5 fill-amber-500" />
                    </span>
                    <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60 p-2 bg-muted/40 rounded-xl">
                      Interactive Card
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none animate-pulse" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#ec4899]/5 rounded-full blur-[140px] pointer-events-none animate-pulse delay-700" />
      </section>

      {/* Scripture Highlight / Mood Setter Section with high contrast image backing */}
      <section className="py-24 relative overflow-hidden">
        <div className="container max-w-6xl">
          <div className="relative rounded-[4rem] overflow-hidden bg-zinc-900 text-white shadow-2xl border border-zinc-800">
            {/* Background Image with dramatic street lighting overlay */}
            <div 
              className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30 pointer-events-none"
              style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&q=80&w=1200")' }} 
            />
            {/* Smooth dark overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-zinc-950/80 to-transparent pointer-events-none" />
            
            <div className="relative z-10 px-8 py-20 md:p-24 flex flex-col md:flex-row items-center gap-12 justify-between">
              <div className="text-left space-y-4 max-w-xl">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-[9px] font-black uppercase tracking-widest text-white backdrop-blur-md">
                  <Shield className="h-3.5 w-3.5 text-amber-400" /> Walk in Truth
                </span>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-none">
                  Illuminate Your Daily Path.
                </h2>
                <p className="text-sm md:text-base text-zinc-300 font-medium leading-relaxed">
                  Transform busy subway cars, crowded walkways, and loud street corridors into quiet moments of sanctuary. Street Words connects ancient biblical wisdom with our modern urban realities.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs font-bold">
                    <CheckCircle className="h-4 w-4 text-primary" /> Daily encouragement
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs font-bold">
                    <CheckCircle className="h-4 w-4 text-primary" /> Live interactions
                  </div>
                </div>
              </div>

              <div className="shrink-0">
                <Link to="/feed">
                  <Button className="rounded-full h-16 px-10 bg-white hover:bg-white/90 text-zinc-950 font-black uppercase tracking-widest text-xs shadow-xl flex items-center gap-2">
                    Enter the Sanctuary <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid with fully molded capsules */}
      <section className="py-24 bg-white/10 dark:bg-black/10 backdrop-blur-md border-y border-primary/5">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: Ancient Wisdom */}
            <div className="relative overflow-hidden space-y-6 p-10 rounded-[3rem] bg-white/70 dark:bg-zinc-900/60 border border-white/80 dark:border-zinc-800/60 shadow-xl hover:shadow-2xl hover:border-primary/30 transition-all duration-300 group hover:-translate-y-2 text-left">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-500" />
              <div className="relative w-16 h-16 rounded-2xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <BookOpen className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">Ancient Wisdom</h3>
              <p className="text-zinc-600 dark:text-zinc-300 font-medium leading-relaxed text-sm">
                Source biblical verses from thousands of years of tradition, dynamically curated for today's urban context and deep spiritual hunger.
              </p>
            </div>

            {/* Card 2: Communal Discernment */}
            <div className="relative overflow-hidden space-y-6 p-10 rounded-[3rem] bg-white/70 dark:bg-zinc-900/60 border border-white/80 dark:border-zinc-800/60 shadow-xl hover:shadow-2xl hover:border-pink-500/30 transition-all duration-300 group hover:-translate-y-2 text-left">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#ec4899]/10 to-transparent rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-500" />
              <div className="relative w-16 h-16 rounded-2xl bg-rose-500/10 dark:bg-rose-500/20 flex items-center justify-center text-rose-500 group-hover:scale-110 group-hover:bg-[#ec4899] group-hover:text-white transition-all duration-300">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">Communal Discernment</h3>
              <p className="text-zinc-600 dark:text-zinc-300 font-medium leading-relaxed text-sm">
                Don't walk alone. Engage in raw, honest reflections and navigate life's complexities through shared collective insight.
              </p>
            </div>

            {/* Card 3: Pavement Sanctuary */}
            <div className="relative overflow-hidden space-y-6 p-10 rounded-[3rem] bg-white/70 dark:bg-zinc-900/60 border border-white/80 dark:border-zinc-800/60 shadow-xl hover:shadow-2xl hover:border-amber-500/30 transition-all duration-300 group hover:-translate-y-2 text-left">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-500/10 to-transparent rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-500" />
              <div className="relative w-16 h-16 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 flex items-center justify-center text-amber-500 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
                <Compass className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">Pavement Sanctuary</h3>
              <p className="text-zinc-600 dark:text-zinc-300 font-medium leading-relaxed text-sm">
                Transform chaotic commutes and cold concrete sidewalks into personal tabernacles of devotion, discovering holy moments in the urban rush.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive CTA Banner section with scriptures */}
      <section className="py-24 text-center space-y-12">
        <div className="container max-w-3xl space-y-8 animate-in fade-in duration-1000">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[1.1] text-foreground">
            "Thy word is a lamp unto my feet, and a light unto my path."
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-serif italic max-w-2xl mx-auto">
            — Psalm 119:105
          </p>
          <p className="text-base md:text-lg text-foreground font-medium max-w-xl mx-auto leading-relaxed">
            Walk with us in the eternal light of the Lord's holy scriptures.
          </p>
          <div className="pt-6">
            <Link to="/feed">
              <Button size="lg" className="rounded-full h-20 px-16 bg-primary hover:bg-primary/95 text-white font-black uppercase tracking-widest text-base shadow-[0_20px_50px_-12px_rgba(168,85,247,0.4)] transition-transform hover:scale-105">
                Walk in His Light
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;