"use client";

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, User, Menu, Settings, LogIn, PenSquare } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import CreatePostModal from './CreatePostModal';

const Navbar = () => {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-5 group">
            <div className="relative flex items-center justify-center">
              {/* Enhanced Glow Effect */}
              <div className="absolute -inset-3 bg-gradient-to-r from-primary/40 to-[#ec4899]/40 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition duration-700" />
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-[#ec4899] rounded-[1.75rem] blur-sm opacity-30 group-hover:opacity-60 transition duration-500" />
              
              {/* Larger Logo Container */}
              <div className="relative h-14 w-14 overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-[#a855f7] to-[#ec4899] p-[2px] shadow-2xl shadow-primary/20 transition-all group-hover:scale-105 duration-500">
                <div className="h-full w-full rounded-[1.35rem] flex items-center justify-center overflow-hidden bg-background/10 backdrop-blur-sm">
                  <img src="/logo.png" alt="Street Words" className="h-full w-full object-cover" />
                </div>
              </div>
            </div>
            
            <span className="font-black text-3xl tracking-tighter text-primary">
              STREET<span className="text-muted-foreground font-light">WORDS</span>
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6 text-sm font-bold text-muted-foreground uppercase tracking-widest text-[10px]">
            <Link to="/feed" className="transition-colors hover:text-primary">Feed</Link>
            <Link to="/categories" className="transition-colors hover:text-primary">Categories</Link>
            {!isLanding && (
              <Link to="/admin" className="transition-colors hover:text-primary flex items-center gap-1.5">
                <Settings className="h-3.5 w-3.5" /> Admin
              </Link>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {isLanding ? (
            <Link to="/feed">
              <Button className="rounded-full bg-primary hover:bg-primary/90 px-8 gap-2 text-[11px] font-black uppercase tracking-widest h-12 shadow-xl shadow-primary/20 transition-all hover:scale-105">
                <LogIn className="h-4 w-4" />
                Join Community
              </Button>
            </Link>
          ) : (
            <>
              <Button variant="ghost" size="icon" className="hidden sm:flex hover:bg-primary/5 h-12 w-12 rounded-2xl">
                <Search className="h-5 w-5" />
              </Button>
              
              <CreatePostModal />

              <Link to="/profile">
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/5 h-12 w-12">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            </>
          )}

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-12 w-12">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col gap-6 mt-12">
                  <Link to="/" className="text-2xl font-black tracking-tighter">Landing</Link>
                  <Link to="/feed" className="text-2xl font-black tracking-tighter">Feed</Link>
                  <Link to="/categories" className="text-2xl font-black tracking-tighter">Categories</Link>
                  <Link to="/profile" className="text-2xl font-black tracking-tighter">My Profile</Link>
                  <hr className="border-primary/5" />
                  <CreatePostModal 
                    trigger={
                      <Button className="w-full justify-start gap-3 rounded-2xl h-14 font-black">
                        <PenSquare className="h-5 w-5" />
                        Post Verse
                      </Button>
                    }
                  />
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