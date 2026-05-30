"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Star, Info, Heart, ArrowRight, ExternalLink } from 'lucide-react';
import { MadeWithDyad } from '@/components/made-with-dyad';
import { showSuccess } from '@/utils/toast';

interface StoreItem {
  id: string;
  name: string;
  price: string;
  description: string;
  category: string;
  image: string; // Emoji fallback or actual Image URL
  badge?: string;
  rating: number;
  isRedbubble?: boolean;
  redbubbleUrl?: string;
  isLiveSynced?: boolean;
}

const DEFAULT_STORE_ITEMS: StoreItem[] = [
  {
    id: 's1',
    name: '“Overcome the World” Heavyweight Tee',
    price: '$35.00',
    description: 'Ultra-heavy 240GSM cotton t-shirt with signature high-density print of John 16:33 on the back.',
    category: 'Apparel',
    image: '👕',
    badge: 'Redbubble Merch',
    rating: 5,
    isRedbubble: true,
    redbubbleUrl: 'https://www.redbubble.com/shop/ap/145000000'
  },
  {
    id: 's2',
    name: 'Street Sanctuary Premium Hoodie',
    price: '$65.00',
    description: 'Over-sized fit, loopback terry fabric with custom typographic scripture back print.',
    category: 'Apparel',
    badge: 'Redbubble Merch',
    image: '🧥',
    rating: 5,
    isRedbubble: true,
    redbubbleUrl: 'https://www.redbubble.com/shop/ap/145000001'
  },
  {
    id: 's3',
    name: 'Pavement Discernment Matte Sticker',
    price: '$4.50',
    description: 'Vivid high-quality vinyl matte die-cut sticker. Water-resistant, perfect for laptops and bottles.',
    category: 'Accessories',
    image: '🏷️',
    badge: 'Redbubble Best Seller',
    rating: 4.9,
    isRedbubble: true,
    redbubbleUrl: 'https://www.redbubble.com/shop/ap/145000002'
  },
  {
    id: 's4',
    name: '“Lamp unto my Feet” iPhone Case',
    price: '$26.00',
    description: 'Double-layer tough protection shell case featuring original Street Words typographic design.',
    category: 'Accessories',
    image: '📱',
    badge: 'Redbubble Merch',
    rating: 4.8,
    isRedbubble: true,
    redbubbleUrl: 'https://www.redbubble.com/shop/ap/145000003'
  },
  {
    id: 's5',
    name: 'Yeshua (Jesus) Overcame Tote Bag',
    price: '$22.00',
    description: 'Durable 100% cotton canvas bag with heavy-duty shoulder straps and vibrant double-sided print.',
    category: 'Accessories',
    image: '👜',
    badge: 'Redbubble Merch',
    rating: 4.7,
    isRedbubble: true,
    redbubbleUrl: 'https://www.redbubble.com/shop/ap/145000004'
  }
];

const Store = () => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Apparel' | 'Accessories'>('All');
  const [storeItems, setStoreItems] = useState<StoreItem[]>(DEFAULT_STORE_ITEMS);
  const [activeShopName, setActiveShopName] = useState<string | null>(null);

  // Sync products dynamically by consuming cached configuration set in Admin dashboard
  const loadSyncedProducts = () => {
    const savedShopName = localStorage.getItem('redbubble_shop_name');
    const savedItems = localStorage.getItem('redbubble_synced_items');
    
    if (savedShopName && savedItems) {
      try {
        setStoreItems(JSON.parse(savedItems));
        setActiveShopName(savedShopName);
      } catch (e) {
        setStoreItems(DEFAULT_STORE_ITEMS);
        setActiveShopName(null);
      }
    } else {
      setStoreItems(DEFAULT_STORE_ITEMS);
      setActiveShopName(null);
    }
  };

  useEffect(() => {
    loadSyncedProducts();
    // Re-check live updates if admin updates configuration in other tabs
    window.addEventListener('storage', loadSyncedProducts);
    return () => window.removeEventListener('storage', loadSyncedProducts);
  }, []);

  const handleExternalClick = (item: StoreItem) => {
    showSuccess(`Opening Redbubble checkout portal...`);
    window.open(item.redbubbleUrl, '_blank', 'noopener,noreferrer');
  };

  const filteredItems = selectedCategory === 'All' 
    ? storeItems 
    : storeItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen urban-pattern bg-background/50">
      <Navbar />
      
      <main className="container max-w-6xl py-12 md:py-20">
        {/* Store Header */}
        <header className="mb-16 text-center space-y-6 relative">
          <div className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 rounded-full px-4 py-1.5 text-rose-600 dark:text-rose-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">
            <ShoppingBag className="h-3.5 w-3.5" />
            Redbubble Merchandise
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground leading-[0.85]">
            THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#ec4899]">STORE</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
            {activeShopName ? (
              <span>
                Share scripture in a fun way—whether it be stickers or a shower curtain! Currently showing items dynamically synchronized live with our Redbubble storefront: <strong>@{activeShopName}</strong>.
              </span>
            ) : (
              <span>
                Premium apparel and home decor designed to share scripture in a fun way—whether it be custom stickers or a shower curtain! Designed in-house and delivered securely through Redbubble.
              </span>
            )}
          </p>
        </header>

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

        {/* Filter Navigation */}
        <div className="flex justify-center gap-4 pb-12">
          <Button 
            variant={selectedCategory === 'All' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('All')}
            className="rounded-full font-black uppercase tracking-widest text-[10px] h-10 px-6"
          >
            All
          </Button>
          <Button 
            variant={selectedCategory === 'Apparel' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('Apparel')}
            className="rounded-full font-black uppercase tracking-widest text-[10px] h-10 px-6"
          >
            Apparel
          </Button>
          <Button 
            variant={selectedCategory === 'Accessories' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('Accessories')}
            className="rounded-full font-black uppercase tracking-widest text-[10px] h-10 px-6"
          >
            Accessories
          </Button>
        </div>

        {/* Store Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <Card key={item.id} className="group relative overflow-hidden h-full border border-transparent dark:border-zinc-800/60 bg-white/50 dark:bg-zinc-900/80 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 rounded-[2.5rem] flex flex-col justify-between">
              <div className="p-8 space-y-6">
                {/* Image Container */}
                <div className="relative h-64 rounded-3xl bg-gradient-to-tr from-primary/10 to-[#ec4899]/15 flex items-center justify-center border border-primary/5 shadow-inner overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                  {item.image.startsWith('http') ? (
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover rounded-3xl" />
                  ) : (
                    <div className="text-7xl select-none group-hover:scale-110 transition-transform duration-500">
                      {item.image}
                    </div>
                  )}

                  {/* Pulsing Live indicator badge */}
                  {(item.isLiveSynced || activeShopName) && (
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-emerald-500/90 text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow-md backdrop-blur-sm z-10">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                      </span>
                      Live
                    </div>
                  )}

                  {item.badge && (
                    <Badge className="absolute top-4 left-4 bg-primary text-white border-none text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                      {item.badge}
                    </Badge>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="text-xl font-black tracking-tight group-hover:text-primary transition-colors leading-tight text-left">
                      {item.name}
                    </h3>
                    <span className="text-lg font-black text-primary whitespace-nowrap">
                      {item.price}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-amber-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-3.5 w-3.5 ${i < Math.floor(item.rating) ? 'fill-current' : 'opacity-30'}`} />
                    ))}
                    <span className="text-[10px] font-black text-muted-foreground ml-1">{item.rating}</span>
                  </div>

                  <p className="text-muted-foreground font-medium text-sm leading-relaxed text-left line-clamp-3">
                    {item.description}
                  </p>
                </div>
              </div>

              <CardFooter className="px-8 pb-8 pt-0 flex gap-3">
                <Button 
                  onClick={() => handleExternalClick(item)}
                  className="flex-1 rounded-full h-12 bg-[#ec4899] hover:bg-[#ec4899]/95 text-white font-black uppercase tracking-widest text-[10px] shadow-lg shadow-[#ec4899]/20 gap-2"
                >
                  Buy on Redbubble <ExternalLink className="h-3.5 w-3.5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-12 w-12 rounded-full border-primary/10 hover:bg-primary/5 text-muted-foreground hover:text-[#ec4899]"
                  onClick={() => showSuccess("Saved to wish list!")}
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
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
        <div className="container text-center">
          <MadeWithDyad />
        </div>
      </footer>
    </div>
  );
};

export default Store;