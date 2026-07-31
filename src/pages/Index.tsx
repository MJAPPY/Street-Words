"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { 
  Sparkles, ArrowRight, BookOpen, Users, 
  Quote, Compass 
} from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen urban-pattern bg-background/50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-32 overflow-hidden">
        <div className="container max-w-6xl relative z-10">
          <div className="flex flex-col items-center text-center space-y-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-5 py-2 text-primary text-xs font-black uppercase tracking-[0.2em] animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Sparkles className="h-3.5 w-3.5" />
              He has overcome the world — John 16:33
            </div>
            
            <div className="space-y-6 max-w-5xl">
              <h1 className="text-7xl md:text-[11rem] font-black tracking-tighter text-foreground leading-[0.75] animate-in fade-in slide-in-from-bottom-8 duration-700 select-none animate-title-glow">
                STREET<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#ec4899] to-primary animate-shimmer-text">WORDS</span>
              </h1>
              <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000">
                <p className="text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed">
                  Sharing hope together in a broken world with timeless truth, grounded in the Biblical revelation fulfilled by our Creator’s only begotten Son — our Savior Yeshua (Jesus).
                </p>
                <div className="inline-block py-2.5 px-8 rounded-3xl bg-primary/5 border border-primary/10 backdrop-blur-sm animate-title-glow">
                  <p className="text-sm md:text-lg font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#ec4899] to-primary animate-shimmer-text">
                    “For where two or three are gathered in my name, there am I among them.” — Matthew 18:20
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-8 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-300">
              <Link to="/feed">
                <Button className="rounded-full h-16 px-12 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-sm shadow-[0_20px_50px_-12px_rgba(168,85,247,0.4)] group transition-all hover:scale-105">
                  Walk the Street <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none animate-pulse" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#ec4899]/10 rounded-full blur-[140px] pointer-events-none animate-pulse delay-700" />
      </section>

      {/* Feature Grid */}
      <section className="py-24 bg-white/20 dark:bg-black/20 backdrop-blur-md border-y border-primary/5">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: Ancient Wisdom */}
            <div className="relative overflow-hidden space-y-5 p-10 rounded-[3rem] bg-white/70 dark:bg-zinc-900/60 border border-white/80 dark:border-zinc-800/60 shadow-xl hover:shadow-2xl hover:border-primary/30 transition-all duration-300 group hover:-translate-y-2">
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
            <div className="relative overflow-hidden space-y-5 p-10 rounded-[3rem] bg-white/70 dark:bg-zinc-900/60 border border-white/80 dark:border-zinc-800/60 shadow-xl hover:shadow-2xl hover:border-pink-500/30 transition-all duration-300 group hover:-translate-y-2">
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
            <div className="relative overflow-hidden space-y-5 p-10 rounded-[3rem] bg-white/70 dark:bg-zinc-900/60 border border-white/80 dark:border-zinc-800/60 shadow-xl hover:shadow-2xl hover:border-amber-500/30 transition-all duration-300 group hover:-translate-y-2">
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

      {/* Proof/Testimonial Section */}
      <section className="py-32">
        <div className="container max-w-5xl">
          <div className="relative p-12 md:p-20 rounded-[4rem] bg-gradient-to-br from-primary to-[#ec4899] text-white shadow-[0_30px_60px_-15px_rgba(168,85,247,0.5)] overflow-hidden">
            <Quote className="absolute -top-10 -left-10 h-64 w-64 text-white/5 pointer-events-none" />
            
            <div className="relative z-10 space-y-10 text-center">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight">
                "Street Words changed how I view my commute. It's no longer just concrete; it's a sanctuary for truth."
              </h2>
              <div className="flex flex-col items-center gap-4">
                <div className="h-20 w-20 rounded-full border-2 border-white/30 p-1">
                  <div className="h-full w-full rounded-full bg-white flex items-center justify-center text-primary font-black text-2xl">
                    M
                  </div>
                </div>
                <div>
                  <p className="font-black text-xl">Marcus J.</p>
                  <p className="text-white/60 font-bold text-xs uppercase tracking-widest">Early Adopter</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 text-center space-y-12">
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