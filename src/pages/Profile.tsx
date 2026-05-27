"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import { UserProfile, VersePost } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Edit3, MapPin, Calendar, BookOpen, Heart, MessageSquare, Settings, Share2 } from 'lucide-react';
import VerseCard from '@/components/VerseCard';
import { MadeWithDyad } from '@/components/made-with-dyad';

const MOCK_USER: UserProfile = {
  id: 'u1',
  name: 'TruthSeeker',
  handle: '@truth_seeker',
  bio: 'Walking the city streets with ancient wisdom. Looking for the light in every corner. 🕊️',
  avatar: 'T',
  joinedDate: 'Joined March 2024',
  stats: {
    verses: 12,
    likes: 452,
    reflections: 89
  }
};

const MOCK_MY_POSTS: VersePost[] = [
  {
    id: '1',
    verse: 'Now faith is the assurance of things hoped for, the conviction of things not seen.',
    reference: 'Hebrews 11:1',
    relevance: 'In a world that demands proof for everything, faith is our anchor.',
    category: 'Faith',
    author: 'TruthSeeker',
    createdAt: '2 days ago',
    likes: 24,
    comments: []
  },
  {
    id: '4',
    verse: 'The soul of the sluggard craves and gets nothing, while the soul of the diligent is richly supplied.',
    reference: 'Proverbs 13:4',
    relevance: 'Street wisdom often talks about the grind, but biblical diligence is about character.',
    category: 'Wisdom',
    author: 'TruthSeeker',
    createdAt: '1 week ago',
    likes: 88,
    comments: []
  }
];

const Profile = () => {
  return (
    <div className="min-h-screen urban-pattern bg-background/50">
      <Navbar />
      
      <main className="container max-w-4xl py-12">
        {/* Profile Header Card */}
        <Card className="border-none bg-white/50 backdrop-blur-md shadow-xl rounded-[2.5rem] overflow-hidden mb-12">
          <div className="h-32 bg-gradient-to-r from-primary/20 via-primary/5 to-accent/20" />
          <CardContent className="px-8 pb-8 -mt-12">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
              <div className="flex items-end gap-6">
                <div className="h-28 w-28 rounded-[2rem] bg-gradient-to-tr from-primary to-[#ec4899] p-1 shadow-2xl">
                  <div className="h-full w-full rounded-[1.8rem] bg-white flex items-center justify-center text-4xl font-black text-primary">
                    {MOCK_USER.avatar}
                  </div>
                </div>
                <div className="pb-2">
                  <h1 className="text-3xl font-black tracking-tighter text-foreground">{MOCK_USER.name}</h1>
                  <p className="text-primary font-bold text-sm">{MOCK_USER.handle}</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button variant="outline" className="rounded-full border-primary/20 hover:bg-primary/5 gap-2 font-black text-xs uppercase tracking-widest">
                  <Edit3 className="h-4 w-4" /> Edit Profile
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/5">
                  <Settings className="h-5 w-5 text-muted-foreground" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-primary/5">
              <div className="md:col-span-2 space-y-4">
                <p className="text-foreground/80 font-medium leading-relaxed">
                  {MOCK_USER.bio}
                </p>
                <div className="flex flex-wrap gap-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> Urban Sanctuary</span>
                  <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {MOCK_USER.joinedDate}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 md:grid-cols-1 gap-4">
                <div className="text-center md:text-left bg-primary/5 rounded-2xl p-3">
                  <p className="text-[10px] font-black text-primary/60 uppercase tracking-widest mb-1">Verses</p>
                  <p className="text-xl font-black">{MOCK_USER.stats.verses}</p>
                </div>
                <div className="text-center md:text-left bg-primary/5 rounded-2xl p-3">
                  <p className="text-[10px] font-black text-primary/60 uppercase tracking-widest mb-1">Likes</p>
                  <p className="text-xl font-black">{MOCK_USER.stats.likes}</p>
                </div>
                <div className="text-center md:text-left bg-primary/5 rounded-2xl p-3">
                  <p className="text-[10px] font-black text-primary/60 uppercase tracking-widest mb-1">Reflections</p>
                  <p className="text-xl font-black">{MOCK_USER.stats.reflections}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Tabs */}
        <Tabs defaultValue="verses" className="space-y-8">
          <TabsList className="w-full justify-start bg-transparent h-auto p-0 space-x-8 border-b border-primary/5 rounded-none">
            <TabsTrigger 
              value="verses" 
              className="px-0 py-4 bg-transparent border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none h-auto font-black text-xs uppercase tracking-[0.2em] transition-all"
            >
              My Verses
            </TabsTrigger>
            <TabsTrigger 
              value="saved" 
              className="px-0 py-4 bg-transparent border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none h-auto font-black text-xs uppercase tracking-[0.2em] transition-all"
            >
              Saved Words
            </TabsTrigger>
            <TabsTrigger 
              value="reflections" 
              className="px-0 py-4 bg-transparent border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none h-auto font-black text-xs uppercase tracking-[0.2em] transition-all"
            >
              Reflections
            </TabsTrigger>
          </TabsList>

          <TabsContent value="verses" className="space-y-8 animate-in fade-in duration-500">
            {MOCK_MY_POSTS.map(post => (
              <VerseCard key={post.id} post={post} />
            ))}
          </TabsContent>

          <TabsContent value="saved" className="text-center py-20 animate-in fade-in duration-500">
            <div className="bg-white/30 rounded-[2rem] p-12 border-2 border-dashed border-primary/10">
              <BookOpen className="h-12 w-12 text-primary/20 mx-auto mb-4" />
              <p className="text-muted-foreground font-bold italic">No saved verses yet. Browse the feed to find inspiration!</p>
              <Button variant="link" className="text-primary font-black uppercase tracking-widest text-[10px] mt-4">Go to Feed</Button>
            </div>
          </TabsContent>

          <TabsContent value="reflections" className="space-y-6 animate-in fade-in duration-500">
             <div className="bg-white/30 rounded-[2rem] p-12 border-2 border-dashed border-primary/10 text-center">
              <MessageSquare className="h-12 w-12 text-primary/20 mx-auto mb-4" />
              <p className="text-muted-foreground font-bold italic">Your journey of discernment will appear here.</p>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="mt-32 py-12">
        <div className="container text-center">
          <MadeWithDyad />
        </div>
      </footer>
    </div>
  );
};

export default Profile;