"use client";

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, User, Menu, Settings, LogIn, PenSquare, Sun, Moon, LogOut } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useTheme } from 'next-themes';
import CreatePostModal from './CreatePostModal';
import { useSession } from './SessionProvider';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const { session, user, signOut } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const isAdmin = user?.email === 'streetwords21@proton.me';

  const isLinkActive = (path: string) => {
    return location.pathname === path;
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-20 sm:h-24 items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-4 sm:gap-10">
          <Link to="/" className="flex items-center gap-2 sm:gap-5 group">
            <div className="relative flex items-center justify-center h-10 w-10 sm:h-16 sm:w-16 shrink-0">
              {/* Vibrant Logo Glow Effects */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-[#ec4899] to-primary rounded-full blur-lg opacity-70 group-hover:opacity-100 group-hover:scale-110 transition duration-500" />
              <div className="absolute inset-1 bg-gradient-to-r from-primary to-[#ec4899] rounded-full blur-md opacity-50 group-hover:opacity-80 transition duration-500" />
              
              {/* Logo Image directly standing out */}
              <img 
                src="/logo.png" 
                alt="Street Words" 
                className="relative z-10 h-8 w-8 sm:h-14 sm:w-14 object-contain filter drop-shadow-[0_0_15px_rgba(168,85,247,0.65)] group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
            
            <div className="flex flex-col -space-y-1 sm:-space-y-2 text-left">
              <span className="font-black text-xl sm:text-4xl tracking-tighter text-foreground group-hover:text-primary transition-colors duration-300">
                STREET
              </span>
              <span className="font-light text-xs sm:text-2xl tracking-[0.3em] text-muted-foreground">
                WORDS
              </span>
            </div>
          </Link>
          
          <div className="hidden lg:flex items-center gap-8 text-[11px] font-black uppercase tracking-[0.2em]">
            <Link 
              to="/feed" 
              className={cn(
                "transition-all hover:text-primary hover:tracking-[0.4em]",
                isLinkActive('/feed') ? "text-primary font-black" : "text-muted-foreground/70"
              )}
            >
              Feed
            </Link>
            <Link 
              to="/categories" 
              className={cn(
                "transition-all hover:text-primary hover:tracking-[0.4em]",
                isLinkActive('/categories') ? "text-primary font-black" : "text-muted-foreground/70"
              )}
            >
              Categories
            </Link>
            <Link 
              to="/store" 
              className={cn(
                "transition-all hover:text-primary hover:tracking-[0.4em]",
                isLinkActive('/store') ? "text-primary font-black" : "text-muted-foreground/70"
              )}
            >
              Store
            </Link>
            <Link 
              to="/mission" 
              className={cn(
                "transition-all hover:text-primary hover:tracking-[0.4em] flex items-center gap-1.5",
                isLinkActive('/mission') ? "text-primary font-black" : "text-muted-foreground/70"
              )}
            >
              Mission
            </Link>
            {isAdmin && (
              <Link 
                to="/admin" 
                className={cn(
                  "transition-all hover:text-primary hover:tracking-[0.4em] flex items-center gap-2",
                  isLinkActive('/admin') ? "text-primary font-black" : "text-muted-foreground/70"
                )}
              >
                <Settings className="h-4 w-4" /> Admin
              </Link>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-1.5 sm:gap-4">
          {/* Animated Theme Switcher Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-none hover:bg-primary/5 h-10 w-10 sm:h-14 sm:w-14 border border-transparent hover:border-primary/20 transition-all duration-300"
            title="Toggle Theme"
          >
            <Sun className="h-5 w-5 sm:h-6 sm:w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-500" />
            <Moon className="absolute h-5 w-5 sm:h-6 sm:w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-primary" />
          </Button>

          {!session ? (
            <Link to="/login">
              <Button className="rounded-none bg-primary hover:bg-primary/90 px-3 sm:px-8 gap-1.5 sm:gap-3 text-[10px] sm:text-xs font-black uppercase tracking-[0.1em] sm:tracking-[0.2em] h-10 sm:h-14 shadow-2xl shadow-primary/20 transition-all hover:translate-x-1">
                <LogIn className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Login</span>
              </Button>
            </Link>
          ) : (
            <>
              <Button variant="ghost" size="icon" className="hidden sm:flex hover:bg-primary/5 h-14 w-14 rounded-none border border-transparent hover:border-primary/20">
                <Search className="h-6 w-6" />
              </Button>
              
              <div className="hidden sm:block">
                <CreatePostModal />
              </div>

              <Link to="/profile">
                <Button variant="ghost" size="icon" className={cn("rounded-none hover:bg-primary/5 h-10 w-10 sm:h-14 sm:w-14 border border-transparent hover:border-primary/20", isLinkActive('/profile') && "text-primary")}>
                  <User className="h-5 w-5 sm:h-6 sm:w-6" />
                </Button>
              </Link>

              <Button 
                variant="ghost" 
                size="icon" 
                onClick={signOut}
                className="rounded-none hover:bg-red-500/5 hover:text-red-500 h-10 w-10 sm:h-14 sm:w-14 border border-transparent"
                title="Sign Out"
              >
                <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </>
          )}

          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10 sm:h-14 sm:w-14 rounded-none">
                  <Menu className="h-6 w-6 sm:h-8 sm:w-8" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background/95 backdrop-blur-xl border-l-primary/10">
                <div className="flex flex-col gap-6 sm:gap-8 mt-16 text-left">
                  <Link to="/" onClick={closeMenu} className={cn("text-3xl sm:text-4xl font-black tracking-tighter hover:text-primary transition-colors", isLinkActive('/') ? "text-primary" : "text-foreground")}>Home</Link>
                  <Link to="/feed" onClick={closeMenu} className={cn("text-3xl sm:text-4xl font-black tracking-tighter hover:text-primary transition-colors", isLinkActive('/feed') ? "text-primary" : "text-foreground")}>Feed</Link>
                  <Link to="/categories" onClick={closeMenu} className={cn("text-3xl sm:text-4xl font-black tracking-tighter hover:text-primary transition-colors", isLinkActive('/categories') ? "text-primary" : "text-foreground")}>Categories</Link>
                  <Link to="/store" onClick={closeMenu} className={cn("text-3xl sm:text-4xl font-black tracking-tighter hover:text-primary transition-colors", isLinkActive('/store') ? "text-primary" : "text-foreground")}>Store</Link>
                  <Link to="/mission" onClick={closeMenu} className={cn("text-3xl sm:text-4xl font-black tracking-tighter hover:text-primary transition-colors", isLinkActive('/mission') ? "text-primary" : "text-foreground")}>Mission</Link>
                  {isAdmin && (
                    <Link to="/admin" onClick={closeMenu} className={cn("text-3xl sm:text-4xl font-black tracking-tighter hover:text-primary transition-colors", isLinkActive('/admin') ? "text-primary" : "text-foreground")}>Admin</Link>
                  )}
                  {session ? (
                    <>
                      <Link to="/profile" onClick={closeMenu} className={cn("text-3xl sm:text-4xl font-black tracking-tighter hover:text-primary transition-colors", isLinkActive('/profile') ? "text-primary" : "text-foreground")}>My Profile</Link>
                      <button onClick={() => { signOut(); closeMenu(); }} className="text-left text-3xl sm:text-4xl font-black tracking-tighter hover:text-red-500 transition-colors">Sign Out</button>
                    </>
                  ) : (
                    <Link to="/login" onClick={closeMenu} className={cn("text-3xl sm:text-4xl font-black tracking-tighter hover:text-primary transition-colors", isLinkActive('/login') ? "text-primary" : "text-foreground")}>Login / Join</Link>
                  )}
                  <div className="h-px bg-gradient-to-r from-primary/20 to-transparent" />
                  {session && (
                    <CreatePostModal 
                      onPostCreated={closeMenu}
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