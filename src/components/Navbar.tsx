"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PenSquare, Search, User } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/logo.png" alt="Street Words Logo" className="h-10 w-10 rounded-md" />
          <span className="hidden font-bold text-xl sm:inline-block text-primary">
            STREET WORDS
          </span>
        </Link>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link to="/" className="transition-colors hover:text-primary">Feed</Link>
            <Link to="/categories" className="transition-colors hover:text-primary">Categories</Link>
            <Link to="/about" className="transition-colors hover:text-primary">About</Link>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="default" className="bg-[#a855f7] hover:bg-[#9333ea] gap-2">
              <PenSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Post Verse</span>
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;