"use client";

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, User, Menu, Settings, LogIn, PenSquare, Sun, Moon, LogOut, Heart } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useTheme } from 'next-themes';
import CreatePostModal from './CreatePostModal';
import { useSession } from './SessionProvider';

const Navbar = () => {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const { session, user, signOut } = useSession();

  const isAdmin = user?.email === 'streetwords21@proton.me';

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-24 items-center justify-between">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-5 group">
            <div className="relative flex items-center justify-center h-16 w-16">
              {/* Vibrant Logo Glow Effects */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-[#ec4899] to-primary rounded-full blur-xl opacity-70 group-hover:opacity-100 group-hover:scale-110 transition duration-500" />
              <div className="absolute inset-1 bg-gradient-to-r from-primary to-[#ec4899] rounded-full blur-md opacity-50 group-hover:opacity-80 transition duration-500" />
              
              {/* Logo Image directly standing out */}
              <img 
                src="/logo.png" 
                alt="Street Words" 
                className="relative z-10 h-14 w-14 object-contain filter drop-shadow-[0_0_15px_rgba(168,85,247,0.65)] group-hover:scale-105 transition-transform duration-500" 
              />
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
            <Link to="/feed" className="transition-all hover:text-primary hover:tracking-[0.4em]">Latest Feed</Link>
            <Link to="/categories" className="transition-all hover:text-primary hover:tracking-[0.4em]">Categories</Link>
            <Link to="/store" className="transition-all hover:text-primary hover:tracking-[0.4em]">Store</Link>
            <Link to="/sponsors" className="transition-all hover:text-primary hover:tracking-[0.4em] text-rose-500 dark:text-rose-400 font-black flex items-center gap-1"><Heart className="h-3 w-3 fill-rose-500" /> Sponsor</Link>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Theme Switcher Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-2xl h-11 w-11 border border-primary/5 hover:bg-primary/5 hidden sm:flex"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-500" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-primary" />
          </Button>

          {!session ? (
            <Link to="/login">
              <Button className="rounded-full bg-primary hover:bg-primary/90 px-6 gap-2.5 text-xs font-black uppercase tracking-[0.15em] h-12 shadow-xl shadow-primary/10 transition-transform hover:scale-105 active:scale-95">
                <LogIn className="h-4.5 w-4.5" />
                Login / Join
              </Button>
            </Link>
          ) : (
            <>
              <CreatePostModal />

              <Link to="/profile">
                <Button variant="ghost" size="icon" className="rounded-2xl hover:bg-primary/5 h-11 w-11 border border-primary/5">
                  <User className="h-5 w-5" />
                </Button>
              </Link>

              <Button 
                variant="ghost" 
                size="icon" 
                onClick={signOut}
                className="rounded-2xl hover:bg-red-500/5 hover:text-red-500 h-11 w-11 border border-primary/5"
                title="Sign Out"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          )}

          {/* Mobile Sheet Sidebar menu */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-11 w-11 rounded-xl">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background/95 backdrop-blur-xl border-l-primary/10">
                <div className="flex flex-col gap-8 mt-16 text-left">
                  <Link to="/" className="text-3xl font-black tracking-tighter hover:text-primary transition-colors">Home</Link>
                  <Link to="/feed" className="text-3xl font-black tracking-tighter hover:text-primary transition-colors">Walk Feed</Link>
                  <Link to="/categories" className="text-3xl font-black tracking-tighter hover:text-primary transition-colors">Categories</Link>
                  <Link to="/store" className="text-3xl font-black tracking-tighter hover:text-primary transition-colors">Store</Link>
                  <Link to="/sponsors" className="text-3xl font-black tracking-tighter text-rose-500 hover:text-rose-600 transition-colors flex items-center gap-1.5"><Heart className="h-6 w-6 fill-rose-500" /> Sponsor</Link>
                  
                  {isAdmin && (
                    <Link to="/admin" className="text-3xl font-black tracking-tighter hover:text-primary transition-colors">Admin panel</Link>
                  )}
                  {session ? (
                    <>
                      <Link to="/profile" className="text-3xl font-black tracking-tighter hover:text-primary transition-colors">My Profile</Link>
                      <button onClick={signOut} className="text-left text-3xl font-black tracking-tighter hover:text-red-500 transition-colors">Sign Out</button>
                    </>
                  ) : (
                    <Link to="/login" className="text-3xl font-black tracking-tighter hover:text-primary transition-colors">Login / Join</Link>
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