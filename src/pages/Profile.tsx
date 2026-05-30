"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { UserProfile, VersePost } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useParams } from 'react-router-dom';
import { MapPin, Calendar, BookOpen, MessageSquare, Quote, Sparkles, Globe, Video, Link2, UserPlus, Send } from 'lucide-react';
import VerseCard from '@/components/VerseCard';
import { MadeWithDyad } from '@/components/made-with-dyad';
import EditProfileModal from '@/components/EditProfileModal';
import SettingsModal from '@/components/SettingsModal';
import { showSuccess } from '@/utils/toast';

const MOCK_CURRENT_USER: UserProfile = {
  id: 'u1',
  name: 'TruthSeeker',
  handle: '@truth_seeker',
  bio: 'Walking the city streets with ancient wisdom. Looking for the light in every corner. 🕊️',
  avatar: 'T',
  joinedDate: 'Joined March 2024',
  location: 'Urban Sanctuary',
  favoriteVerse: 'Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.',
  favoriteReference: 'Joshua 1:9',
  stats: {
    verses: 12,
    likes: 452,
    reflections: 89
  }
};

const MOCK_OTHER_PROFILES: Record<string, UserProfile> = {
  'streetwords': {
    id: 'u2',
    name: 'StreetWords',
    handle: '@streetwords_official',
    bio: 'Curating the pavement. Sharing hope together in a broken world with timeless truth, grounded in the Biblical revelation.',
    avatar: 'S',
    joinedDate: 'Joined January 2024',
    location: 'Concrete Vault',
    favoriteVerse: 'The light shines in the darkness, and the darkness has not overcome it.',
    favoriteReference: 'John 1:5',
    websiteLink: 'https://streetwords.sh',
    stats: {
      verses: 142,
      likes: 9342,
      reflections: 541
    }
  },
  'hopeful': {
    id: 'u3',
    name: 'Hopeful',
    handle: '@hopeful_spirit',
    bio: 'Seeking grace in the urban jungle. Lover of wisdom and community reflection. Let’s converse!',
    avatar: 'H',
    joinedDate: 'Joined February 2024',
    location: 'Metropolis Core',
    favoriteVerse: 'Now faith is the assurance of things hoped for, the conviction of things not seen.',
    favoriteReference: 'Hebrews 11:1',
    stats: {
      verses: 5,
      likes: 112,
      reflections: 24
    }
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

const MOCK_OTHER_POSTS: Record<string, VersePost[]> = {
  'streetwords': [
    {
      id: '2',
      verse: 'Love is patient and kind; love does not envy or boast; it is not arrogant or rude.',
      reference: '1 Corinthians 13:4',
      relevance: 'Street life can be hard and cold. Practicing this kind of love is the ultimate counter-culture movement.',
      category: 'Love',
      author: 'StreetWords',
      createdAt: '5 hours ago',
      likes: 42,
      comments: []
    },
    {
      id: '3',
      verse: 'The Lord is near to the brokenhearted and saves the crushed in spirit.',
      reference: 'Psalm 34:18',
      relevance: 'When you feel like the walls are closing in, remember that He is closest in the cracks of our despair.',
      category: 'Despair',
      author: 'StreetWords',
      createdAt: '1 day ago',
      likes: 156,
      comments: []
    }
  ]
};

const Profile = () => {
  const { username } = useParams<{ username?: string }>();
  
  // Decide whether viewing own profile or another member
  const isOwnProfile = !username || username.toLowerCase() === 'truthseeker';
  const profileKey = username?.toLowerCase() || '';
  
  // Resolve active profile details
  const [user, setUser] = useState<UserProfile>(() => {
    if (isOwnProfile) return MOCK_CURRENT_USER;
    return MOCK_OTHER_PROFILES[profileKey] || {
      id: 'temp',
      name: username || 'Street Disciple',
      handle: `@${username?.toLowerCase() || 'disciple'}`,
      bio: 'Searching for grace and shared Collective wisdom on Street Words.',
      avatar: (username ? username[0].toUpperCase() : 'D'),
      joinedDate: 'Joined recently',
      location: 'The Sidewalks',
      stats: { verses: 3, likes: 14, reflections: 2 }
    };
  });

  const handleUpdateUser = (updatedData: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...updatedData }));
  };

  const handleFollow = () => {
    showSuccess(`You are now following ${user.name}!`);
  };

  const handleMessage = () => {
    showSuccess(`Message request sent to ${user.name}`);
  };

  // Resolve posts to render
  const postsToRender = isOwnProfile 
    ? MOCK_MY_POSTS 
    : (MOCK_OTHER_POSTS[profileKey] || []);

  return (
    <div className="min-h-screen urban-pattern bg-background/80">
      <Navbar />
      
      <main className="container max-w-4xl py-12">
        {/* Profile Header Card */}
        <Card className="border border-transparent dark:border-zinc-800/60 bg-white/60 dark:bg-zinc-900/80 backdrop-blur-md shadow-2xl rounded-[3rem] overflow-hidden mb-12">
          <div className="h-40 bg-gradient-to-r from-primary/30 via-primary/10 to-accent/30" />
          <CardContent className="px-10 pb-10 -mt-14">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-10">
              <div className="flex items-end gap-6">
                <div className="h-32 w-32 rounded-[2.5rem] bg-gradient-to-tr from-primary to-[#ec4899] p-1 shadow-2xl overflow-hidden">
                  {user.avatar.length > 2 ? (
                    <img src={user.avatar} alt={user.name} className="h-full w-full object-cover rounded-[2.3rem]" />
                  ) : (
                    <div className="h-full w-full rounded-[2.3rem] bg-white dark:bg-zinc-950 flex items-center justify-center text-5xl font-black text-primary">
                      {user.avatar}
                    </div>
                  )}
                </div>
                <div className="pb-2">
                  <h1 className="text-4xl font-black tracking-tighter text-foreground leading-none mb-2">{user.name}</h1>
                  <p className="text-primary font-bold text-base">{user.handle}</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                {isOwnProfile ? (
                  <>
                    <EditProfileModal user={user} onUpdate={handleUpdateUser} />
                    <SettingsModal />
                  </>
                ) : (
                  <>
                    <Button 
                      onClick={handleFollow} 
                      className="rounded-full bg-primary hover:bg-primary/90 text-white gap-2 font-black text-xs uppercase tracking-widest h-11 px-6 shadow-lg shadow-primary/20"
                    >
                      <UserPlus className="h-4 w-4" /> Follow
                    </Button>
                    <Button 
                      onClick={handleMessage} 
                      variant="outline" 
                      className="rounded-full border-primary/20 hover:bg-primary/5 gap-2 font-black text-xs uppercase tracking-widest h-11 px-6"
                    >
                      <Send className="h-4 w-4" /> Message
                    </Button>
                  </>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-10 border-t border-primary/10">
              <div className="md:col-span-2 space-y-6">
                <p className="text-foreground/90 text-lg font-medium leading-relaxed">
                  {user.bio}
                </p>
                
                {/* Meta details & Custom User links */}
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-6 text-xs font-black text-muted-foreground uppercase tracking-[0.2em]">
                    {user.location && (
                      <span className="flex items-center gap-2 bg-primary/5 dark:bg-zinc-950/40 px-4 py-2 rounded-full">
                        <MapPin className="h-4 w-4" /> {user.location}
                      </span>
                    )}
                    <span className="flex items-center gap-2 bg-primary/5 dark:bg-zinc-950/40 px-4 py-2 rounded-full">
                      <Calendar className="h-4 w-4" /> {user.joinedDate}
                    </span>
                  </div>

                  {(user.websiteLink || user.videoLink || user.socialLink) && (
                    <div className="flex flex-wrap gap-3 pt-2">
                      {user.websiteLink && (
                        <a 
                          href={user.websiteLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full transition-all"
                        >
                          <Globe className="h-3.5 w-3.5" /> Website
                        </a>
                      )}
                      {user.videoLink && (
                        <a 
                          href={user.videoLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full transition-all"
                        >
                          <Video className="h-3.5 w-3.5" /> Video Channel
                        </a>
                      )}
                      {user.socialLink && (
                        <a 
                          href={user.socialLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full transition-all"
                        >
                          <Link2 className="h-3.5 w-3.5" /> Social Profile
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-3 md:grid-cols-1 gap-4">
                <div className="text-center md:text-left bg-primary/5 dark:bg-zinc-950/40 rounded-[2rem] p-5 border border-primary/5">
                  <p className="text-[10px] font-black text-primary/60 uppercase tracking-widest mb-1">Verses</p>
                  <p className="text-2xl font-black">{user.stats.verses}</p>
                </div>
                <div className="text-center md:text-left bg-primary/5 dark:bg-zinc-950/40 rounded-[2rem] p-5 border border-primary/5">
                  <p className="text-[10px] font-black text-primary/60 uppercase tracking-widest mb-1">Likes</p>
                  <p className="text-2xl font-black">{user.stats.likes}</p>
                </div>
                <div className="text-center md:text-left bg-primary/5 dark:bg-zinc-950/40 rounded-[2rem] p-5 border border-primary/5">
                  <p className="text-[10px] font-black text-primary/60 uppercase tracking-widest mb-1">Reflections</p>
                  <p className="text-2xl font-black">{user.stats.reflections}</p>
                </div>
              </div>
            </div>

            {/* Favorite Verse Section */}
            {user.favoriteVerse && (
              <div className="mt-12 p-8 md:p-10 rounded-[2.5rem] bg-gradient-to-br from-primary/10 via-white/50 dark:via-zinc-900/40 to-primary/5 border border-primary/10 dark:border-zinc-800/60 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote className="h-24 w-24 text-primary" />
                </div>
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Life Verse</h4>
                  </div>
                  <p className="text-2xl md:text-3xl font-serif italic text-primary leading-tight">
                    "{user.favoriteVerse}"
                  </p>
                  <p className="font-black text-xs uppercase tracking-[0.2em] text-muted-foreground text-right">
                    — {user.favoriteReference}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Content Tabs */}
        <Tabs defaultValue="verses" className="space-y-12">
          <TabsList className="w-full justify-start bg-transparent h-auto p-0 space-x-12 border-b border-primary/10 rounded-none">
            <TabsTrigger 
              value="verses" 
              className="px-0 py-6 bg-transparent border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none h-auto font-black text-sm uppercase tracking-[0.2em] transition-all text-muted-foreground data-[state=active]:text-primary"
            >
              {isOwnProfile ? "My Verses" : `${user.name}'s Verses`}
            </TabsTrigger>
            <TabsTrigger 
              value="saved" 
              className="px-0 py-6 bg-transparent border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none h-auto font-black text-sm uppercase tracking-[0.2em] transition-all text-muted-foreground data-[state=active]:text-primary"
            >
              Saved Words
            </TabsTrigger>
            <TabsTrigger 
              value="reflections" 
              className="px-0 py-6 bg-transparent border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none h-auto font-black text-sm uppercase tracking-[0.2em] transition-all text-muted-foreground data-[state=active]:text-primary"
            >
              Reflections
            </TabsTrigger>
          </TabsList>

          <TabsContent value="verses" className="space-y-12 animate-in fade-in duration-700">
            {postsToRender.length > 0 ? (
              postsToRender.map(post => (
                <VerseCard key={post.id} post={post} />
              ))
            ) : (
              <div className="bg-white/40 dark:bg-zinc-900/80 backdrop-blur-sm rounded-[3rem] p-16 border-2 border-dashed border-primary/20 text-center">
                <BookOpen className="h-16 w-16 text-primary/20 mx-auto mb-6" />
                <p className="text-muted-foreground font-bold italic text-lg">{user.name} hasn't posted any verses yet.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="saved" className="text-center py-32 animate-in fade-in duration-700">
            <div className="bg-white/40 dark:bg-zinc-900/80 backdrop-blur-sm rounded-[3rem] p-16 border-2 border-dashed border-primary/20">
              <BookOpen className="h-16 w-16 text-primary/20 mx-auto mb-6" />
              <p className="text-muted-foreground font-bold italic text-lg">No saved verses yet.</p>
            </div>
          </TabsContent>

          <TabsContent value="reflections" className="space-y-12 animate-in fade-in duration-700">
             <div className="bg-white/40 dark:bg-zinc-900/80 backdrop-blur-sm rounded-[3rem] p-16 border-2 border-dashed border-primary/20 text-center">
              <MessageSquare className="h-16 w-16 text-primary/20 mx-auto mb-6" />
              <p className="text-muted-foreground font-bold italic text-lg">Journey of discernment will appear here.</p>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="mt-32 py-16">
        <div className="container text-center">
          <MadeWithDyad />
        </div>
      </footer>
    </div>
  );
};

export default Profile;