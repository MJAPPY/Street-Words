"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { 
  Sparkles, ArrowRight, BookOpen, Users, 
  ShieldCheck, MessageSquare, Heart, Quote 
} from 'lucide-react';
import { MadeWithDyad } from '@/components/made-with-dyad';

const Landing = () => {
  return (
    <div className="min-h-screen urban-pattern bg-background/50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-32 overflow-hidden">
        <div className="container max-w-6xl relative z-10">
          <div className="flex flex-col items-center text-center space-y-10">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-5 py-2 text-primary text-xs font-black uppercase tracking-[0.2em] animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Sparkles className="h-3.5 w-3.5" />
              The Ancient Future is Here
            </div>
            
            <div className="space-y-6 max-w-4xl">
              <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-foreground leading-[0.8] animate-in fade-in slide-in-from-bottom-8 duration-700">
                STREET<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#ec4899] to-primary bg-[length:200%_auto] animate-gradient">WORDS</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000">
                We're sharing hope in the city streets with timeless truth, grounded in the Biblical truth completed by our Creator's only begotten Son — our Saviour Yeshua (Jesus). A community for urban souls to share, discern, and live out ancient wisdom.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-6 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-300">
              <Link to="/feed">
                <Button className="rounded-full h-16 px-10 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-sm shadow-2xl shadow-primary/30 group">
                  Enter Community <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="outline" className="rounded-full h-16 px-10 border-primary/20 hover:bg-primary/5 font-black uppercase tracking-widest text-sm backdrop-blur-sm bg-white/30">
                Watch the Vision
              </Button>
            </div>
          </div>
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-[#ec4899]/20 rounded-full blur-[120px] pointer-events-none animate-pulse delay-700" />
      </section>

      {/* Feature Grid */}
      <section className="py-24 bg-white/20 backdrop-blur-md border-y border-primary/5">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4 p-8 rounded-[2.5rem] bg-white/40 border border-white/50 hover:shadow-xl transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <BookOpen className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-black tracking-tight">Ancient Wisdom</h3>
              <p className="text-muted-foreground font-medium leading-relaxed">
                Source verses from thousands of years of tradition, filtered for today's urban context and spiritual hunger.
              </p>
            </div>

            <div className="space-y-4 p-8 rounded-[2.5rem] bg-white/40 border border-white/50 hover:shadow-xl transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-500 group-hover:scale-110 transition-transform">
                <Users className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-black tracking-tight">Communal Discernment</h3>
              <p className="text-muted-foreground font-medium leading-relaxed">
                Don't walk alone. Engage in deep reflections and navigate life's complexities through shared collective insight.
              </p>
            </div>

            <div className="space-y-4 p-8 rounded-[2.5rem] bg-white/40 border border-white/50 hover:shadow-xl transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                <ShieldCheck className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-black tracking-tight">Member Identity</h3>
              <p className="text-muted-foreground font-medium leading-relaxed">
                Build your legacy of truth. Track your contributions, save favorite words, and grow your influence in the community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Proof/Testimonial Section */}
      <section className="py-32">
        <div className="container max-w-5xl">
          <div className="relative p-12 md:p-20 rounded-[3rem] bg-gradient-to-br from-primary to-[#ec4899] text-white shadow-3xl overflow-hidden">
            <Quote className="absolute -top-10 -left-10 h-64 w-64 text-white/5 pointer-events-none" />
            
            <div className="relative z-10 space-y-10 text-center">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight">
                "Street Words changed how I view my commute. It's no longer just concrete; it's a sanctuary for truth."
              </h2>
              <div className="flex flex-col items-center gap-4">
                <div className="h-16 w-16 rounded-full border-2 border-white/30 p-1">
                  <div className="h-full w-full rounded-full bg-white flex items-center justify-center text-primary font-black text-xl">
                    M
                  </div>
                </div>
                <div>
                  <p className="font-black text-lg">Marcus J.</p>
                  <p className="text-white/60 font-bold text-xs uppercase tracking-widest">Early Adopter</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 text-center space-y-12">
        <div className="container max-w-3xl space-y-6">
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter">Ready to join the movement?</h2>
          <p className="text-xl text-muted-foreground font-medium">
            Join thousands of others illuminating the pavement with ancient truth.
          </p>
          <div className="pt-6">
            <Link to="/feed">
              <Button size="lg" className="rounded-full h-16 px-12 bg-foreground text-background hover:bg-foreground/90 font-black uppercase tracking-widest text-sm shadow-xl">
                Get Started Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-primary/5">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="bg-primary h-8 w-8 rounded-lg flex items-center justify-center text-white font-black">S</div>
            <span className="font-black tracking-tighter text-xl">STREETWORDS</span>
          </div>
          <div className="flex gap-8 text-xs font-black uppercase tracking-widest text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Twitter</a>
            <a href="#" className="hover:text-primary transition-colors">Instagram</a>
            <a href="#" className="hover:text-primary transition-colors">Discord</a>
          </div>
          <MadeWithDyad />
        </div>
      </footer>
    </div>
  );
};

export default Landing;