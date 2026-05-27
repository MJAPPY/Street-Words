"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PenSquare, Search, User, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#a855f7] to-[#ec4899] p-[2px]">
              <div className="bg-white rounded-[10px] p-1">
                <img src="/logo.png" alt="Street Words" className="h-8 w-8 object-contain" />
              </div>
            </div>
            <span className="font-black text-xl tracking-tighter text-primary">
              STREET<span className="text-muted-foreground font-light">WORDS</span>
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-primary text-primary">Feed</Link>
            <Link to="/categories" className="transition-colors hover:text-primary">Categories</Link>
            <Link to="/about" className="transition-colors hover:text-primary">About</Link>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="hidden sm:flex hover:bg-primary/5">
            <Search className="h-5 w-5" />
          </Button>
          
          <Button className="hidden sm:flex bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 rounded-full px-6 gap-2">
            <PenSquare className="h-4 w-4" />
            Post Verse
          </Button>

          <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/5">
            <User className="h-5 w-5" />
          </Button>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col gap-4 mt-8">
                  <Link to="/" className="text-lg font-bold">Feed</Link>
                  <Link to="/categories" className="text-lg font-bold">Categories</Link>
                  <Link to="/about" className="text-lg font-bold">About</Link>
                  <hr />
                  <Button className="w-full justify-start gap-2">
                    <PenSquare className="h-4 w-4" />
                    Post Verse
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;