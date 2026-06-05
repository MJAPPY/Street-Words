"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Info, ArrowRight, ExternalLink, Sparkles, Shirt, Laptop, Smartphone, Home, Image } from 'lucide-react';
import { MadeWithDyad } from '@/components/made-with-dyad';
import { showSuccess } from '@/utils/toast';
import { supabase } from '@/integrations/supabase/client';

interface Department {
  name: string;
  description: string;
  icon: any;
  iaCode: string; // Redbubble category code parameter
  color: string;
}

const Store = () => {
  const [activeShopName, setActiveShopName] = useState<string | null>(null);

  // Sync active shop config by consuming Supabase config, falling back to local storage
  const loadConfig = async () => {
    try {
      const { data: configData, error: configError } = await supabase
        .from('store_config')
        .select('*');

      if (!configError && configData && configData.length > 0) {
        const activeShop = configData.find(c => c.key === 'redbubble_shop_name')?.value;
        if (activeShop) {
          setActiveShopName(activeShop);
          return;
        }
      }
    } catch (e) {
      console.log("Supabase table store_config fallback.");
    }

    const savedShopName = localStorage.getItem('redbubble_shop_name');
    if (savedShopName) {
      setActiveShopName(savedShopName);
    } else {
      setActiveShopName(null);
    }
  };

  useEffect(() => {
    loadConfig();
    window.addEventListener('storage', loadConfig);
    return () => window.removeEventListener('storage', loadConfig);
  }, []);

  const getRedbubbleDepartmentUrl = (iaCode: string) => {
    const shop = activeShopName || "streetwords";
    return `https://www.redbubble.com/people/${shop}/shop?iaCode=${iaCode}`;
  };

  const handleDepartmentClick = (iaCode: string, name: string) => {
    showSuccess(`Opening ${name} collection on Redbubble...`);
    window.open(getRedbubbleDepartmentUrl(iaCode), '_blank', 'noopener,noreferrer');
  };

  const departments: Department[] = [
    { 
      name: 'Apparel & T-Shirts', 
      description: 'Discipleship graphics screen-printed on heavy cotton streetwear, activewear, and hoodies.', 
      icon: Shirt, 
      iaCode: 'u-clothing',
      color: 'from-blue-500 to-indigo-600'
    },
    { 
      name: 'Stickers & Decals', 
      description: 'Die-cut high-durability waterproof matte vinyl sticker packs to customize gear.', 
      icon: Laptop, 
      iaCode: 'u-stationery',
      color: 'from-pink-500 to-rose-600'
    },
    { 
      name: 'Device & Phone Cases', 
      description: 'Heavy duty, double layer shockproof tough phone cases with typographic prints.', 
      icon: Smartphone, 
      iaCode: 'u-phone-cases',
      color: 'from-violet-500 to-purple-600'
    },
    { 
      name: 'Wall Art & Posters', 
      description: 'Premium photographic prints, canvases, and framed posters to light up your environment.', 
      icon: Image, 
      iaCode: 'u-prints',
      color: 'from-amber-400 to-orange-500'
    },
    { 
      name: 'Home & Living Decor', 
      description: 'Cozy throw pillows, ceramic mugs, and custom shower curtains decorated with timeless scripture.', 
      icon: Home, 
      iaCode: 'u-home-living',
      color: 'from-emerald-400 to-teal-500'
    },
  ];

  return (
    <div className="min-h-screen urban-pattern bg-background/50">
      <Navbar />
      
      <main className="container max-w-6xl py-12 md:py-20">
        {/* Store Header */}
        <header className="mb-16 text-center space-y-6 relative">
          <div className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 rounded-full px-4 py-1.5 text-rose-600 dark:text-rose-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">
            <ShoppingBag className="h-3.5 w-3.5" />
            Redbubble Department Directory
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground leading-[0.85]">
            THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#ec4899]">STORE</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
            {activeShopName ? (
              <span>
                Browse official departments dynamically synced with Redbubble storefront: <strong className="text-primary font-black underline">@{activeShopName}</strong>. Select any department to shop directly.
              </span>
            ) : (
              <span>
                Premium apparel and home decor designed to share scripture in a fun way—whether it be custom stickers or a shower curtain! Designed in-house and delivered securely through Redbubble.
              </span>
            )}
          </p>
        </header>

        {/* Dynamic Department / Category Navigator Section */}
        <section className="mb-20 space-y-8">
          <div className="text-left max-w-xl mx-auto md:mx-0">
            <h2 className="text-2xl font-black tracking-tight flex items-center gap-2.5">
              <Sparkles className="h-5 w-5 text-primary" />
              Shop by Department on Redbubble
            </h2>
            <p className="text-sm text-muted-foreground font-semibold mt-1">
              Select an official category below to view and filter complete collections directly inside our print-on-demand store.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept) => {
              const IconComponent = dept.icon;
              return (
                <Card 
                  key={dept.name} 
                  className="group relative overflow-hidden border border-white/60 dark:border-zinc-800/60 bg-white/60 dark:bg-zinc-900/80 backdrop-blur-md shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-[2rem] flex flex-col justify-between"
                >
                  <div className="p-8 space-y-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${dept.color} flex items-center justify-center text-white shadow-lg`}>
                      <IconComponent className="h-7 w-7" />
                    </div>
                    <div className="space-y-2 text-left">
                      <h3 className="text-xl font-black tracking-tight group-hover:text-primary transition-colors">
                        {dept.name}
                      </h3>
                      <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                        {dept.description}
                      </p>
                    </div>
                  </div>
                  
                  <CardFooter className="px-8 pb-8 pt-0">
                    <Button 
                      onClick={() => handleDepartmentClick(dept.iaCode, dept.name)}
                      className="w-full rounded-full h-11 bg-primary/5 hover:bg-primary text-primary hover:text-white font-black uppercase tracking-widest text-[9px] gap-2 border border-primary/10 transition-all"
                    >
                      Browse Department <ExternalLink className="h-3 w-3" />
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Informative Banner */}
        <div className="bg-primary/5 dark:bg-zinc-900/60 border border-primary/10 rounded-[2rem] p-6 mb-12 flex flex-col md:flex-row items-center gap-6 justify-between max-w-5xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Info className="h-6 w-6" />
            </div>
            <div className="text-left">
              <h4 className="text-sm font-black uppercase tracking-wider text-primary">Global Secure Delivery</h4>
              <p className="text-xs text-muted-foreground font-medium">
                Payments, production, and worldwide shipping are securely handled directly through Redbubble.
              </p>
            </div>
          </div>
          <Button 
            onClick={() => window.open(activeShopName ? `https://www.redbubble.com/people/${activeShopName}/shop` : 'https://www.redbubble.com', '_blank')}
            variant="outline" 
            className="rounded-full font-black uppercase tracking-widest text-[9px] border-primary/20 hover:bg-primary/5 shrink-0 gap-2 h-10 px-6"
          >
            Open Store Profile <ExternalLink className="h-3 w-3" />
          </Button>
        </div>

        {/* Bottom Banner */}
        <section className="mt-24 p-12 md:p-16 rounded-[4rem] bg-gradient-to-r from-primary to-[#ec4899] text-white shadow-2xl relative overflow-hidden text-center space-y-6">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 opacity-5 rounded-bl-full pointer-events-none" />
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter">Support the Mission</h2>
          <p className="text-white/80 font-medium max-w-xl mx-auto leading-relaxed">
            100% of proceeds are invested in funding local street discipleship groups, community resources, and public Bible prints.
          </p>
          <div className="pt-2">
            <Button variant="secondary" className="rounded-full h-14 px-8 font-black uppercase tracking-widest text-xs gap-2">
              Learn More <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </section>
      </main>

      <footer className="mt-32 border-t border-primary/5 py-12">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-6">
          <Button 
            onClick={() => handleDepartmentClick('u-stationery', 'Stickers')}
            variant="outline" 
            className="rounded-full border-primary/20 text-primary hover:bg-primary/5 font-black text-xs uppercase tracking-widest h-11 px-6 gap-2 shadow-sm"
          >
            Shop Stickers 🏷️
          </Button>
          <MadeWithDyad />
        </div>
      </footer>
    </div>
  );
};

export default Store;