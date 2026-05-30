"use client";

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, User, Menu, Settings, LogIn, PenSquare, Sun, Moon, LogOut } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useTheme } from 'next-themes';
import CreatePostModal from './CreatePostModal';
import { useSession } from './SessionProvider';

const Navbar = () => {
  const location = useLocation();
  const isLanding = location.pathname === '/';
  const { theme, setTheme } = useTheme();
  const { session, signOut } = useSession();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-24 items-center justify-between">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-6 group">
            <div className="relative flex items-center justify-center">
              {/* Sharp Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 via-[#ec4899]/30 to-primary/30 blur-2xl opacity-0 group-hover:opacity-100 transition duration-700" />
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-[#ec4899] opacity-40 group-hover:opacity-80 transition duration-500" />
              
              {/* Square Logo Container */}
              <div className="relative h-16 w-16 overflow-hidden bg-gradient-to-br from-[#a855f7] to-[#ec4899] p-[2px] shadow-[0_0_30px_-5px_rgba(168,85,247,0.3)] transition-all group-hover:scale-105 duration-500">
                <div className="h-full w-full flex items-center justify-center overflow-hidden bg-background/20 backdrop-blur-md">
                  <img src="/logo.png" alt="Street Words" className="h-full w-full object-cover" />
                </div>
              </div>
            </div>
            
            <div className="flex flex-col -space-y-2">
              <span className="font-black text-4xl tracking-tighter text-foreground group-hover:text-primary transition-colors duration-300">
                STREET
              </span>
              <span className="font-light text-2xl tracking-[0.3em] text-muted-foreground">
                WORDS
              </span>
            </div>
          </Link>
          
          <div className="hidden lg:flex items-center gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground/70">
            <Link to="/feed" className="transition-all hover:text-primary hover:tracking-[0.4em]">Feed</Link>
            <Link to="/categories" className="transition-all hover:text-primary hover:tracking-[0.4em]">Categories</Link>
            {session && (
              <Link to="/admin" className="transition-all hover:text-primary hover:tracking-[0.4em] flex items-center gap-2">
                <Settings className="h-4 w-4" /> Admin
              </Link>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Animated Theme Switcher Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-none hover:bg-primary/5 h-14 w-14 border border-transparent hover:border-primary/20 transition-all duration-300"
            title="Toggle Theme"
          >
            <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-500" />
            <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-primary" />
          </Button>

          {!session ? (
            <Link to="/login">
              <Button className="rounded-none bg-primary hover:bg-primary/90 px-10 gap-3 text-xs font-black uppercase tracking-[0.2em] h-14 shadow-2xl shadow-primary/20 transition-all hover:translate-x-1">
                <LogIn className="h-5 w-5" />
                Join
              </Button>
            </Link>
          ) : (
            <>
              <Button variant="ghost" size="icon" className="hidden sm:flex hover:bg-primary/5 h-14 w-14 rounded-none border border-transparent hover:border-primary/20">
                <Search className="h-6 w-6" />
              </Button>
              
              <CreatePostModal />

              <Link to="/profile">
                <Button variant="ghost" size="icon" className="rounded-none hover:bg-primary/5 h-14 w-14 border border-transparent hover:border-primary/20">
                  <User className="h-6 w-6" />
                </Button>
              </Link>

              <Button 
                variant="ghost" 
                size="icon" 
                onClick={signOut}
                className="rounded-none hover:bg-red-500/5 hover:text-red-500 h-14 w-14 border border-transparent"
                title="Sign Out"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          )}

          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-14 w-14 rounded-none">
                  <Menu className="h-8 w-8" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background/95 backdrop-blur-xl border-l-primary/10">
                <div className="flex flex-col gap-8 mt-16">
                  <Link to="/" className="text-4xl font-black tracking-tighter hover:text-primary transition-colors">Landing</Link>
                  <Link to="/feed" className="text-4xl font-black tracking-tighter hover:text-primary transition-colors">Feed</Link>
                  <Link to="/categories" className="text-4xl font-black tracking-tighter hover:text-primary transition-colors">Categories</Link>
                  {session ? (
                    <>
                      <Link to="/profile" className="text-4xl font-black tracking-tighter hover:text-primary transition-colors">My Profile</Link>
                      <button onClick={signOut} className="text-left text-4xl font-black tracking-tighter hover:text-red-500 transition-colors">Sign Out</button>
                    </>
                  ) : (
                    <Link to="/login" className="text-4xl font-black tracking-tighter hover:text-primary transition-colors">Join Street Sanctuary</Link>
                  )}
                  <div className="h-px bg-gradient-to-r from-primary/20 to-transparent" />
                  {session && (
                    <CreatePostModal 
                      trigger={
                        <Button className="w-full justify-between rounded-none h-16 px-6 font-black text-lg uppercase tracking-widest bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all">
                          Post Verse
                          <PenSquare className="h-6 w-6" />
                        </Button>
                      }
                    />
                  )}
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