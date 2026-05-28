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
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-4 group">
            <div className="relative flex items-center justify-center">
              {/* Glow Effect */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-primary to-[#ec4899] rounded-2xl blur-md opacity-25 group-hover:opacity-50 transition duration-500" />
              
              {/* Logo Container */}
              <div className="relative h-11 w-11 overflow-hidden rounded-2xl bg-gradient-to-br from-[#a855f7] to-[#ec4899] p-[1.5px] transition-transform group-hover:scale-110 duration-300">
                <div className="h-full w-full rounded-[14px] flex items-center justify-center overflow-hidden">
                  <img src="/logo.png" alt="Street Words" className="h-full w-full object-cover" />
                </div>
              </div>
            </div>
            
            <span className="font-black text-2xl tracking-tighter text-primary">
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
              <Button className="rounded-full bg-primary hover:bg-primary/90 px-6 gap-2 text-[10px] font-black uppercase tracking-widest h-9 shadow-lg shadow-primary/20">
                <LogIn className="h-3.5 w-3.5" />
                Join Community
              </Button>
            </Link>
          ) : (
            <>
              <Button variant="ghost" size="icon" className="hidden sm:flex hover:bg-primary/5">
                <Search className="h-5 w-5" />
              </Button>
              
              <CreatePostModal />

              <Link to="/profile">
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/5">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            </>
          )}

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
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