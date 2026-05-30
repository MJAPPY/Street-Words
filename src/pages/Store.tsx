"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Sparkles, Star, Tag, Info, Heart, ArrowRight } from 'lucide-react';
import { MadeWithDyad } from '@/components/made-with-dyad';
import { showSuccess } from '@/utils/toast';

interface StoreItem {
  id: string;
  name: string;
  price: string;
  description: string;
  category: string;
  image: string;
  badge?: string;
  rating: number;
}

const STORE_ITEMS: StoreItem[] = [
  {
    id: 's1',
    name: '“Overcome the World” Heavyweight Tee',
    price: '$35.00',
    description: 'Ultra-heavy 240GSM cotton t-shirt with signature high-density print of John 16:33 on the back.',
    category: 'Apparel',
    image: '👕',
    badge: 'Best Seller',
    rating: 5
  },
  {
    id: 's2',
    name: 'Street Sanctuary Premium Hoodie',
    price: '$65.00',
    description: 'Over-sized fit, 400GSM loopback terry fabric with embroidered Hebrew cross emblem on chest.',
    category: 'Apparel',
    badge: 'Limited',
    image: '🧥',
    rating: 5
  },
  {
    id: 's3',
    name: 'Pavement Devotional Journal',
    price: '$24.00',
    description: 'Faux-leather custom journal with 160 dotted pages, designed to track daily street discernment.',
    category: 'Accessories',
    image: '📖',
    rating: 4.8
  },
  {
    id: 's4',
    name: 'Ancient Words Heavy Sticker Pack',
    price: '$12.00',
    description: 'Set of 12 weather-proof, heavy-duty vinyl stickers featuring bold typographic scripture verses.',
    category: 'Accessories',
    image: '🏷️',
    badge: 'Popular',
    rating: 4.9
  },
  {
    id: 's5',
    name: '“Lamp unto my Feet” Cap',
    price: '$28.00',
    description: 'Unstructured vintage-washed canvas 6-panel cap with custom text embroidery.',
    category: 'Apparel',
    image: '🧢',
    rating: 4.7
  }
];

const Store = () => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Apparel' | 'Accessories'>('All');
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = (name: string) => {
    setCartCount(prev => prev + 1);
    showSuccess(`Added "${name}" to bag!`);
  };

  const filteredItems = selectedCategory === 'All' 
    ? STORE_ITEMS 
    : STORE_ITEMS.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen urban-pattern bg-background/50">
      <Navbar />
      
      <main className="container max-w-6xl py-12 md:py-20">
        {/* Store Header */}
        <header className="mb-16 text-center space-y-6 relative">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-2">
            <ShoppingBag className="h-3.5 w-3.5" />
            Official Sanctuary Merch
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground leading-[0.85]">
            THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#ec4899]">STORE</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
            Wear the word. High-quality urban apparel and tools designed to carry ancient wisdom onto the modern pavement.
          </p>

          <div className="flex justify-center gap-4 pt-4">
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
        </header>

        {/* Store Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <Card key={item.id} className="group relative overflow-hidden h-full border border-transparent dark:border-zinc-800/60 bg-white/50 dark:bg-zinc-900/80 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 rounded-[2.5rem] flex flex-col justify-between">
              <div className="p-8 space-y-6">
                {/* Image Placeholder with high aesthetic styling */}
                <div className="relative h-64 rounded-3xl bg-gradient-to-tr from-primary/10 to-[#ec4899]/15 flex items-center justify-center border border-primary/5 shadow-inner overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                  <div className="text-7xl select-none group-hover:scale-110 transition-transform duration-500">
                    {item.image}
                  </div>
                  {item.badge && (
                    <Badge className="absolute top-4 left-4 bg-primary text-white border-none text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                      {item.badge}
                    </Badge>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="text-xl font-black tracking-tight group-hover:text-primary transition-colors leading-tight">
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

                  <p className="text-muted-foreground font-medium text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <CardFooter className="px-8 pb-8 pt-0 flex gap-3">
                <Button 
                  onClick={() => handleAddToCart(item.name)}
                  className="flex-1 rounded-full h-12 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20"
                >
                  Add to Bag
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-12 w-12 rounded-full border-primary/10 hover:bg-primary/5 text-muted-foreground hover:text-primary"
                  onClick={() => showSuccess("Added to wish list!")}
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