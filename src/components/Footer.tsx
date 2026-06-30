"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Twitter, ShoppingBag, ArrowUpRight, BookOpen, ExternalLink, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full mt-24 border-t border-primary/10 bg-background/50 backdrop-blur-xl">
      <div className="container max-w-6xl py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start">
          
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-6 text-left">
            <Link to="/" className="flex items-center gap-4 group inline-flex">
              <div className="relative flex items-center justify-center h-12 w-12 shrink-0">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-[#ec4899] rounded-full blur-md opacity-40 group-hover:opacity-75 transition duration-300" />
                <img 
                  src="/logo.png" 
                  alt="Street Words" 
                  className="relative z-10 h-10 w-10 object-contain filter drop-shadow-[0_0_8px_rgba(168,85,247,0.5)] transition-transform group-hover:scale-105 duration-300" 
                />
              </div>
              <div className="flex flex-col -space-y-1 text-left">
                <span className="font-black text-2xl tracking-tighter text-foreground group-hover:text-primary transition-colors">
                  STREET
                </span>
                <span className="font-light text-sm tracking-[0.3em] text-muted-foreground">
                  WORDS
                </span>
              </div>
            </Link>
            
            <p className="text-sm text-muted-foreground font-medium leading-relaxed max-w-sm">
              An urban sanctuary grounded in Biblical revelation fulfilled by our Savior Yeshua (Jesus). Bringing timeless truth to chaotic concrete pavements.
            </p>

            <div className="pt-2 border-l-2 border-primary/20 pl-4">
              <p className="text-xs font-serif italic text-muted-foreground">
                “Verily, verily, I say unto you, He that believeth on me hath everlasting life.” — John 6:47
              </p>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 space-y-4 text-left">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Sitemap</h4>
            <ul className="space-y-3 text-xs font-bold uppercase tracking-widest text-muted-foreground/80">
              <li>
                <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  Home <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100" />
                </Link>
              </li>
              <li>
                <Link to="/feed" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  Walk Feed
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/store" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  Storefront
                </Link>
              </li>
            </ul>
          </div>

          {/* Action Column */}
          <div className="md:col-span-4 space-y-6 text-left">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Support & Connect</h4>
            
            <div className="flex flex-col gap-3">
              <a
                href="https://x.com/StreetWords21"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between gap-2 bg-primary/5 hover:bg-primary/10 border border-primary/10 text-foreground text-xs font-black uppercase tracking-widest px-5 py-3 rounded-2xl transition-all w-full"
              >
                <span className="flex items-center gap-2">
                  <Twitter className="h-4 w-4 text-sky-500 fill-sky-500" />
                  Follow @StreetWords21
                </span>
                <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
              </a>

              <Link to="/store">
                <Button 
                  variant="outline" 
                  className="w-full justify-between rounded-2xl h-12 px-5 border-primary/10 hover:bg-primary/5 font-black text-xs uppercase tracking-widest text-foreground gap-2"
                >
                  <span className="flex items-center gap-2">
                    <ShoppingBag className="h-4 w-4 text-rose-500" />
                    Shop Stickers & Merch
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-primary/5 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-[10px] uppercase tracking-widest font-black text-muted-foreground/60 flex items-center gap-1">
            &copy; {new Date().getFullYear()} Street Words. Made with <Heart className="h-3 w-3 text-rose-500 fill-rose-500" /> in faith.
          </p>
          
          <a
            href="https://www.dyad.sh/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] uppercase tracking-[0.2em] font-black text-muted-foreground/50 hover:text-primary transition-colors"
          >
            Powered by Dyad
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;