"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { UserProfile, VersePost } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, BookOpen, MessageSquare, Quote, Sparkles, Globe, Video, Link2, UserPlus, Send, Loader2, Bookmark } from 'lucide-react';
import VerseCard from '@/components/VerseCard';
import { MadeWithDyad } from '@/components/made-with-dyad';
import EditProfileModal from '@/components/EditProfileModal';
import SettingsModal from '@/components/SettingsModal';
import { showSuccess } from '@/utils/toast';
import { useSession } from '@/components/SessionProvider';
import { supabaseService } from '@/utils/supabaseService';

const MOCK_OTHER_PROFILES: Record<string, UserProfile> = {
  'streetwords': {
    id: 'u2',
    name: 'StreetWords',
    handle: '@streetwords',
    bio: 'Curating the pavement. Sharing hope together in a broken world with timeless truth, grounded in the Biblical revelation.',
    avatar: 'S',
    joinedDate: 'Joined January 2024',
    location: 'Concrete Vault',
    favoriteVerse: 'The light shines in the darkness, and the darkness has not overcome it.',
    favoriteReference: 'John 1:5',
    websiteLink: 'https://streetwords.sh',
    stats: {
      verses: 0,
      likes: 0,
      reflections: 0
    }
  }
};

const Profile = () => {
  const { username } = useParams<{ username?: string }>();
  const { session, user: authUser, loading: authLoading } = useSession();
  const navigate = useNavigate();
  
  const isAdminOwner = authUser?.email === 'streetwords21@proton.me';
  const profileKey = username?.toLowerCase() || '';
  
  // Resolve whether this is the logged-in user's profile view
  const isOwnProfile = !username || 
    (session && authUser && (
      username.toLowerCase() === authUser.email?.split('@')[0].toLowerCase() ||
      (isAdminOwner && (username.toLowerCase() === 'streetwords' || username.toLowerCase() === 'streetwords21'))
    ));

  const [user, setUser] = useState<UserProfile | null>(null);
  const [myPosts, setMyPosts] = useState<VersePost[]>([]);
  const [savedPosts, setSavedPosts] = useState<VersePost[]>([]);
  const [loadingProfile, setLoadingProfile] = useState(true);

  // Redirect to login if user attempts to view personal profile page while logged out
  useEffect(() => {
    if (!authLoading && !session && !username) {
      navigate('/login');
    }
  }, [session, authLoading, username, navigate]);

  const fetchProfileDetails = async () => {
    setLoadingProfile(true);
    
    // Load all general community posts
    const allPosts = await supabaseService.getPosts();

    // Load bookmarked/saved posts
    const savedIds = supabaseService.getSavedPostIds();
    const filteredSaved = allPosts.filter(p => savedIds.includes(p.id));
    setSavedPosts(filteredSaved);

    let activeProfile: UserProfile;

    if (isOwnProfile && session && authUser) {
      activeProfile = await supabaseService.getProfile(authUser.id, authUser.email || '');
    } else {
      const selectedProfile = MOCK_OTHER_PROFILES[profileKey] || {
        id: 'temp',
        name: username || 'Street Disciple',
        handle: `@${username?.toLowerCase() || 'disciple'}`,
        bio: 'Searching for grace and shared Collective wisdom on Street Words.',
        avatar: (username ? username[0].toUpperCase() : 'D'),
        joinedDate: 'Joined recently',
        location: 'The Sidewalks',
        stats: { verses: 0, likes: 0, reflections: 0 }
      };
      activeProfile = { ...selectedProfile };
    }

    // Load actual dynamic live posts associated with this user
    const filteredMy = allPosts.filter(p => p.author.toLowerCase() === activeProfile.name.toLowerCase());
    setMyPosts(filteredMy);

    // Dynamically calculate user statistics in real-time
    const postCount = filteredMy.length;
    
    let totalLikes = 0;
    filteredMy.forEach(p => { totalLikes += (p.likes || 0); });

    let commentCount = 0;
    allPosts.forEach(p => {
      p.comments.forEach(c => {
        if (c.author.toLowerCase() === activeProfile.name.toLowerCase()) {
          commentCount++;
        }
        c.replies?.forEach(r => {
          if (r.author.toLowerCase() === activeProfile.name.toLowerCase()) {
            commentCount++;
          }
        });
      });
    });

    activeProfile.stats = {
      verses: postCount,
      likes: totalLikes,
      reflections: commentCount
    };

    setUser(activeProfile);
    setLoadingProfile(false);
  };

  useEffect(() => {
    if (!authLoading && (session || username)) {
      fetchProfileDetails();
    }
  }, [isOwnProfile, authUser, authLoading, profileKey, username, session]);

  const handleUpdateUser = async (updatedData: Partial<UserProfile>) => {
    if (user) {
      const nextUser = { ...user, ...updatedData };
      setUser(nextUser);
      if (session && authUser) {
        await supabaseService.updateProfile(authUser.id, nextUser);
        fetchProfileDetails();
      }
    }
  };

  const handleFollow = () => {
    showSuccess(`You are now following ${user?.name || 'User'}!`);
  };

  const handleMessage = () => {
    showSuccess(`Message request sent to ${user?.name || 'User'}`);
  };

  if (authLoading || loadingProfile || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center font-black bg-background text-foreground">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span>Syncing Profile data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen urban-pattern bg-background/80">
      <Navbar />
      
      <main className="container max-w-4xl py-12">
        <Card className="border border-transparent dark:border-zinc-800/60 bg-white/60 dark:bg-zinc-900/80 backdrop-blur-md shadow-2xl rounded-[3rem] overflow-hidden mb-12">
          <div className="h-40 bg-gradient-to-r from-primary/30 via-primary/10 to-accent/30" />
          <CardContent className="px-10 pb-10 -mt-14">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-10">
              <div className="flex items-end gap-6">
                <div className="h-32 w-32 rounded-[2.5rem] bg-gradient-to-tr from-primary to-[#ec4899] p-1 shadow-2xl overflow-hidden">
                  {user.avatar.length > 2 ? (
                    <img src={user.avatar} alt={user.name} className="h-full w-full object-cover rounded-2xl" />
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
                  <p className="text-[10px] font-black text-primary/60 uppercase tracking-widest mb-1">Comments</p>
                  <p className="text-2xl font-black">{user.stats.reflections}</p>
                </div>
              </div>
            </div>

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
              Saved Words ({savedPosts.length})
            </TabsTrigger>
            <TabsTrigger 
              value="reflections" 
              className="px-0 py-6 bg-transparent border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none h-auto font-black text-sm uppercase tracking-[0.2em] transition-all text-muted-foreground data-[state=active]:text-primary"
            >
              Comments
            </TabsTrigger>
          </TabsList>

          <TabsContent value="verses" className="space-y-12 animate-in fade-in duration-700">
            {myPosts.length > 0 ? (
              myPosts.map(post => (
                <VerseCard key={post.id} post={post} />
              ))
            ) : (
              <div className="bg-white/40 dark:bg-zinc-900/80 backdrop-blur-sm rounded-[3rem] p-16 border-2 border-dashed border-primary/20 text-center">
                <BookOpen className="h-16 w-16 text-primary/20 mx-auto mb-6" />
                <p className="text-muted-foreground font-bold italic text-lg">{user.name} hasn't posted any verses yet.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="saved" className="space-y-12 animate-in fade-in duration-700">
            {savedPosts.length > 0 ? (
              savedPosts.map(post => (
                <VerseCard key={post.id} post={post} />
              ))
            ) : (
              <div className="bg-white/40 dark:bg-zinc-900/80 backdrop-blur-sm rounded-[3rem] p-16 border-2 border-dashed border-primary/20 text-center">
                <Bookmark className="h-16 w-16 text-primary/20 mx-auto mb-6" />
                <p className="text-muted-foreground font-bold italic text-lg">No saved verses yet. Browse the Feed to bookmark wisdom!</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="reflections" className="space-y-12 animate-in fade-in duration-700">
             <div className="bg-white/40 dark:bg-zinc-900/80 backdrop-blur-sm rounded-[3rem] p-16 border-2 border-dashed border-primary/20 text-center">
              <MessageSquare className="h-16 w-16 text-primary/20 mx-auto mb-6" />
              <p className="text-muted-foreground font-bold italic text-lg">Your community discussion replies will appear here.</p>
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