"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import { CATEGORY_DATA } from '@/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Shield, Heart, CloudRain, Flame, Sun, Compass, Key, 
  ArrowRight, Smile, Wind, EyeOff, History, Scale, HandHeart,
  Sparkles, Anchor, Clock, CheckCircle2, ShieldCheck
} from 'lucide-react';
import { MadeWithDyad } from '@/components/made-with-dyad';

const iconMap: Record<string, any> = {
  Shield, Heart, CloudRain, Flame, Sun, Compass, Key,
  Smile, Wind, EyeOff, History, Scale, HandHeart,
  Sparkles, Anchor, Clock, CheckCircle2, ShieldCheck
};

const Categories = () => {
  return (
    <div className="min-h-screen urban-pattern bg-background/50">
      <Navbar />
      
      <main className="container max-w-6xl py-12 md:py-20">
        <header className="mb-16 text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-foreground">
            Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#ec4899]">Truth</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
            Browse verses by the spiritual state or theme that resonates with your journey today.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORY_DATA.map((cat) => {
            const Icon = iconMap[cat.icon] || Shield;
            return (
              <Link key={cat.name} to={`/feed?category=${cat.name}`}>
                <Card className="group relative overflow-hidden h-full border border-transparent dark:border-zinc-800/60 bg-white/50 dark:bg-zinc-900/80 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 rounded-[2rem] p-8">
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${cat.color} opacity-5 group-hover:opacity-10 transition-opacity rounded-bl-full`} />
                  
                  <div className="relative z-10 space-y-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white shadow-lg`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-black tracking-tight mb-2 group-hover:text-primary transition-colors">{cat.name}</h3>
                      <p className="text-muted-foreground font-medium text-sm leading-relaxed">
                        {cat.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-primary/5">
                      <span className="text-xs font-black uppercase tracking-widest text-muted-foreground/60">
                        {cat.count} Verses
                      </span>
                      <Button variant="ghost" size="sm" className="rounded-full group-hover:translate-x-1 transition-transform h-8">
                        Explore <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </main>

      <footer className="mt-32 border-t border-primary/5 py-12">
        <div className="container text-center">
          <MadeWithDyad />
        </div>
      </footer>
    </div>
  );
};

export default Categories;