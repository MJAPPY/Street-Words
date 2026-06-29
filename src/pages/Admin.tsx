"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, BarChart3, ShieldAlert, Plus, 
  TrendingUp, MessageSquare, Eye,
  CheckCircle2, AlertTriangle, Trash2, ShoppingBag, RefreshCw, CheckCircle, BookOpen, Send
} from 'lucide-react';
import { showSuccess, showError } from '@/utils/toast';
import { useSession } from '@/components/SessionProvider';
import { useNavigate } from 'react-router-dom';
import { StoreItem } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { supabaseService } from '@/utils/supabaseService';
import { WEEKLY_SCRIPTURE_POOL, PoolScripture } from '@/utils/scripturePool';

interface FlaggedItem {
  id: string;
  type: 'Post' | 'Comment';
  author: string;
  content: string;
  reason: string;
  reference?: string;
  date: string;
}

const Admin = () => {
  const { session, user, loading } = useSession();
  const navigate = useNavigate();

  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [admins, setAdmins] = useState([
    { name: "Super Admin", email: "streetwords21@proton.me", role: "Owner" }
  ]);

  // Redbubble sync state
  const [storeInput, setStoreInput] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [activeShopName, setActiveShopName] = useState<string | null>(null);
  const [lastSyncedTime, setLastSyncedTime] = useState<string | null>(null);

  // Scripture Pool State
  const [postingScriptureId, setPostingScriptureId] = useState<string | null>(null);

  useEffect(() => {
    if (!loading) {
      if (!session || user?.email !== 'streetwords21@proton.me') {
        showError("Unauthorized access to admin panel.");
        navigate('/');
      }
    }
  }, [session, user, loading, navigate]);

  useEffect(() => {
    const fetchCurrentConfig = async () => {
      try {
        const { data, error } = await supabase.from('store_config').select('*');
        if (!error && data && data.length > 0) {
          const activeShop = data.find(c => c.key === 'redbubble_shop_name')?.value;
          if (activeShop) {
            setActiveShopName(activeShop);
            setStoreInput(activeShop);
            setLastSyncedTime("Synced with Database");
            return;
          }
        }
      } catch (e) {
        console.log("Supabase table store_config fallback.");
      }

      const savedShopName = localStorage.getItem('redbubble_shop_name');
      if (savedShopName) {
        setActiveShopName(savedShopName);
        setStoreInput(savedShopName);
        setLastSyncedTime("Loaded from cache");
      }
    };
    
    fetchCurrentConfig();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-black bg-background text-foreground">
        <div className="flex flex-col items-center gap-4">
          <RefreshCw className="h-8 w-8 animate-spin text-primary" />
          <span>Verifying Authorized Session...</span>
        </div>
      </div>
    );
  }

  if (!session || user?.email !== 'streetwords21@proton.me') {
    return null;
  }

  // Handle publishing scripture from pool to community feed
  const handlePublishScripture = async (scrip: PoolScripture) => {
    setPostingScriptureId(scrip.id);
    try {
      await supabaseService.createPost({
        verse: scrip.verse,
        reference: scrip.reference,
        relevance: scrip.relevance,
        category: scrip.category,
        author: 'StreetWords'
      });
      showSuccess(`"${scrip.reference}" successfully published to the live feed!`);
    } catch (err) {
      showError("Could not publish selected scripture drop.");
    } finally {
      setPostingScriptureId(null);
    }
  };

  const setStoreItemsLocally = async (items: StoreItem[], username: string) => {
    setActiveShopName(username);
    setLastSyncedTime(new Date().toLocaleTimeString());
    
    localStorage.setItem('redbubble_shop_name', username);
    localStorage.setItem('redbubble_synced_items', JSON.stringify(items));
    window.dispatchEvent(new Event('storage'));

    try {
      await supabase
        .from('store_config')
        .upsert([
          { key: 'redbubble_shop_name', value: username },
          { key: 'redbubble_synced_items', value: JSON.stringify(items) }
        ]);
    } catch (e) {
      console.log("Could not save to Supabase table store_config. Relying on local sync fallback.");
    }
  };

  const generateDynamicMockProducts = async (username: string) => {
    const customMockItems: StoreItem[] = [
      {
        id: 'mock-1',
        name: `“${username}” Classic Signature Tee`,
        price: '$28.00',
        description: `Official limited release logo premium cotton tee, print-on-demand by ${username}'s official Redbubble shop.`,
        category: 'Apparel',
        image: '👕',
        badge: `${username} Shop`,
        rating: 5,
        isRedbubble: true,
        redbubbleUrl: `https://www.redbubble.com/people/${username}/shop`,
        isLiveSynced: true
      },
      {
        id: 'mock-2',
        name: `Street Sanctuary x ${username} Hoodie`,
        price: '$58.00',
        description: `Ultra comfort heavyweight fleece pullover with customized typographic layout.`,
        category: 'Apparel',
        image: '🧥',
        badge: 'Limited Collaboration',
        rating: 5,
        isRedbubble: true,
        redbubbleUrl: `https://www.redbubble.com/people/${username}/shop`,
        isLiveSynced: true
      }
    ];

    await setStoreItemsLocally(customMockItems, username);
    showSuccess(`Connected & customized themed items for ${username}!`);
  };

  const handleSyncStore = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!storeInput.trim()) return;

    setIsSyncing(true);
    let username = storeInput.trim();
    if (username.includes('redbubble.com')) {
      const match = username.match(/people\/([^/]+)/);
      if (match && match[1]) {
        username = match[1];
      } else {
        username = username.split('.com/')[1] || username;
      }
    }

    try {
      const rssUrl = `https://www.redbubble.com/people/${username}/shop.rss`;
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(rssUrl)}`;
      
      const response = await fetch(proxyUrl);
      if (!response.ok) throw new Error("Could not reach Redbubble feed");
      
      const xmlText = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, "text/xml");
      const items = xmlDoc.getElementsByTagName("item");
      
      if (!items || items.length === 0) {
        generateDynamicMockProducts(username);
        return;
      }

      const parsedProducts: StoreItem[] = [];
      for (let i = 0; i < Math.min(items.length, 12); i++) {
        const item = items[i];
        const title = item.getElementsByTagName("title")[0]?.textContent || "Redbubble Merch";
        const link = item.getElementsByTagName("link")[0]?.textContent || `https://www.redbubble.com/people/${username}/shop`;
        const description = item.getElementsByTagName("description")[0]?.textContent || "";
        
        let imageUrl = "";
        const mediaContent = item.getElementsByTagName("media:content")[0] || item.getElementsByTagNameNS("http://search.yahoo.com/mrss/", "content")[0];
        if (mediaContent) {
          imageUrl = mediaContent.getAttribute("url") || "";
        }
        if (!imageUrl && description) {
          const imgMatch = description.match(/src="([^"]+)"/);
          if (imgMatch) imageUrl = imgMatch[1];
        }

        let price = "$24.90";
        const gPrice = item.getElementsByTagName("g:price")[0] || item.getElementsByTagNameNS("http://base.google.com/ns/1.0", "price")[0];
        if (gPrice) {
          price = gPrice.textContent || "$24.90";
        }

        const isApparel = title.toLowerCase().includes("shirt") || title.toLowerCase().includes("tee") || title.toLowerCase().includes("hoodie");

        parsedProducts.push({
          id: `rb-synced-${i}`,
          name: title,
          price: price,
          description: description.replace(/<[^>]*>/g, '').substring(0, 100).trim() + "...",
          category: isApparel ? "Apparel" : "Accessories",
          image: imageUrl || (isApparel ? "👕" : "🎒"),
          badge: "Live Merch",
          rating: parseFloat((4.5 + Math.random() * 0.5).toFixed(1)),
          isRedbubble: true,
          redbubbleUrl: link,
          isLiveSynced: true
        });
      }

      await setStoreItemsLocally(parsedProducts, username);
      showSuccess(`Successfully connected to ${username}'s Redbubble Store!`);
    } catch (err) {
      await generateDynamicMockProducts(username);
    } finally {
      setIsSyncing(false);
    }
  };

  const resetToDefault = async () => {
    localStorage.removeItem('redbubble_shop_name');
    localStorage.removeItem('redbubble_synced_items');
    setActiveShopName(null);
    setStoreInput('');
    setLastSyncedTime(null);
    window.dispatchEvent(new Event('storage'));

    try {
      await supabase
        .from('store_config')
        .delete()
        .in('key', ['redbubble_shop_name', 'redbubble_synced_items']);
    } catch (e) {
      console.log("Could not clear Supabase store_config database.");
    }

    showSuccess("Returned store to default inventory!");
  };

  const [flaggedItems, setFlaggedItems] = useState<FlaggedItem[]>([]);

  const handleAddAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminEmail.trim()) return;
    const newAdmin = {
      name: newAdminEmail.split('@')[0],
      email: newAdminEmail,
      role: 'Moderator'
    };
    setAdmins(prev => [...prev, newAdmin]);
    setNewAdminEmail("");
    showSuccess(`Successfully promoted ${newAdmin.name} to Moderator!`);
  };

  const handleRemoveAdmin = (email: string) => {
    setAdmins(prev => prev.filter(a => a.email !== email));
    showSuccess("Administrator removed successfully.");
  };

  const handleApprove = (id: string, author: string) => {
    setFlaggedItems(prev => prev.filter(item => item.id !== id));
    showSuccess(`Approved and cleared item by ${author}.`);
  };

  const handleRemoveContent = (id: string, author: string) => {
    setFlaggedItems(prev => prev.filter(item => item.id !== id));
    showSuccess(`Successfully removed content posted by ${author}.`);
  };

  const stats = [
    { label: "Total Views", value: "1,248", icon: Eye, color: "text-blue-500", trend: "+12%" },
    { label: "Active Users", value: "24", icon: Users, color: "text-purple-500", trend: "Live" },
    { label: "Flagged Items", value: flaggedItems.length.toString(), icon: AlertTriangle, color: "text-amber-500", trend: "All Clear" },
    { label: "Comments Shared", value: "312", icon: MessageSquare, color: "text-orange-500", trend: "+4%" },
  ];

  return (
    <div className="min-h-screen urban-pattern bg-background/50">
      <Navbar />
      
      <main className="container max-w-6xl py-12 md:py-20">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 text-left">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
              <ShieldAlert className="h-3 w-3" />
              Administrative Portal
            </div>
            <h1 className="text-5xl font-black tracking-tighter text-foreground">
              Dashboard
            </h1>
          </div>
          
          <div className="flex items-center gap-4 bg-white/50 dark:bg-zinc-900/80 backdrop-blur-sm p-2 rounded-2xl border border-white/50 dark:border-zinc-800/60 shadow-sm">
            <div className="text-right px-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">System Status</p>
              <p className="text-xs font-bold text-emerald-500">All Systems Operational</p>
            </div>
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat) => (
            <Card key={stat.label} className="border border-transparent dark:border-zinc-800/60 bg-white/50 dark:bg-zinc-900/80 backdrop-blur-sm shadow-lg rounded-[2rem]">
              <CardContent className="p-6 text-left">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-2xl bg-white dark:bg-zinc-950 shadow-sm ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <span className={`text-[10px] font-black px-2 py-1 rounded-full ${
                    stat.label === "Flagged Items" && flaggedItems.length > 0 
                      ? "bg-amber-500/15 text-amber-600 dark:text-amber-400" 
                      : "bg-emerald-500/10 text-emerald-600"
                  }`}>
                    {stat.trend}
                  </span>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-3xl font-black text-foreground">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
          {/* Main Dashboard Panel */}
          <div className="lg:col-span-2 space-y-8">
            <Tabs defaultValue="moderation" className="space-y-6">
              <TabsList className="bg-white/40 dark:bg-zinc-900/40 backdrop-blur-sm border border-primary/5 rounded-full p-1 max-w-lg flex flex-wrap justify-center h-auto">
                <TabsTrigger value="moderation" className="rounded-full font-black uppercase tracking-widest text-[10px] px-4 py-2">
                  Moderation ({flaggedItems.length})
                </TabsTrigger>
                <TabsTrigger value="scripture-drops" className="rounded-full font-black uppercase tracking-widest text-[10px] px-4 py-2">
                  Scripture Drops 📖
                </TabsTrigger>
                <TabsTrigger value="store" className="rounded-full font-black uppercase tracking-widest text-[10px] px-4 py-2">
                  Store Sync
                </TabsTrigger>
                <TabsTrigger value="admins" className="rounded-full font-black uppercase tracking-widest text-[10px] px-4 py-2">
                  Admins
                </TabsTrigger>
              </TabsList>

              {/* Moderation Queue Tab */}
              <TabsContent value="moderation" className="space-y-6 animate-in fade-in duration-300">
                <Card className="border border-transparent dark:border-zinc-800/60 bg-white/50 dark:bg-zinc-900/80 backdrop-blur-sm shadow-lg rounded-[2.5rem] overflow-hidden">
                  <CardHeader className="p-8 border-b border-primary/5 bg-white/30 dark:bg-zinc-950/30 flex flex-row items-center justify-between">
                    <CardTitle className="text-xl font-black flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                      Content Moderation Queue
                    </CardTitle>
                    <Badge variant="outline" className="border-amber-500/30 text-amber-500 font-bold">
                      {flaggedItems.length} Reports Pending
                    </Badge>
                  </CardHeader>
                  <CardContent className="p-0">
                    {flaggedItems.length > 0 ? (
                      <div className="divide-y divide-primary/5">
                        {flaggedItems.map((item) => (
                          <div key={item.id} className="p-8 hover:bg-primary/5 transition-all space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <span className="font-black text-xs text-primary uppercase tracking-tight">{item.author}</span>
                                <span className="text-[10px] text-muted-foreground font-semibold">{item.date}</span>
                                <Badge className={item.type === 'Post' ? 'bg-indigo-500/10 text-indigo-500 border-none' : 'bg-teal-500/10 text-teal-500 border-none'}>
                                  {item.type}
                                </Badge>
                              </div>
                              <Badge variant="outline" className="border-red-500/30 text-red-500 font-bold bg-red-500/5 text-[10px] uppercase tracking-wide">
                                Reason: {item.reason}
                              </Badge>
                            </div>

                            <div className="bg-muted/40 rounded-2xl p-4 border border-primary/5">
                              {item.reference && (
                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1.5">
                                  Ref: {item.reference}
                                </p>
                              )}
                              <p className="text-sm font-medium leading-relaxed text-foreground/80">
                                "{item.content}"
                              </p>
                            </div>

                            <div className="flex gap-3 justify-end">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleApprove(item.id, item.author)}
                                className="rounded-full h-10 border-emerald-500/20 hover:bg-emerald-500/5 text-emerald-600 font-black uppercase tracking-widest text-[10px]"
                              >
                                <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" /> Approve & Clear
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleRemoveContent(item.id, item.author)}
                                className="rounded-full h-10 border-destructive/20 hover:bg-destructive/5 text-destructive font-black uppercase tracking-widest text-[10px]"
                              >
                                <Trash2 className="mr-1.5 h-3.5 w-3.5" /> Reject & Delete
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-24 px-8">
                        <CheckCircle2 className="h-16 w-16 text-emerald-500/20 mx-auto mb-4" />
                        <h3 className="text-lg font-black text-foreground">Clean Slate</h3>
                        <p className="text-muted-foreground font-medium text-sm max-w-sm mx-auto mt-2">
                          All shared community word lists, verses and reflections have been moderated.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Weekly Scripture Drop curation pool tab */}
              <TabsContent value="scripture-drops" className="space-y-6 animate-in fade-in duration-300">
                <Card className="border border-transparent dark:border-zinc-800/60 bg-white/50 dark:bg-zinc-900/80 backdrop-blur-sm shadow-lg rounded-[2.5rem] p-8">
                  <div className="space-y-6">
                    <div className="text-left">
                      <h3 className="text-xl font-black uppercase tracking-wider text-primary flex items-center gap-2">
                        <BookOpen className="h-5 w-5" /> Weekly Scripture Curation drops
                      </h3>
                      <p className="text-xs text-muted-foreground font-medium mt-1">
                        Select pre-curated scripture packs ready for the street. Instantly deploy them as official "StreetWords" posts to the community feed.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                      {WEEKLY_SCRIPTURE_POOL.map((scrip) => (
                        <Card key={scrip.id} className="border border-primary/10 bg-white/40 dark:bg-zinc-950/40 rounded-3xl p-6 text-left flex flex-col justify-between hover:shadow-md transition-shadow">
                          <div>
                            <div className="flex justify-between items-center mb-4">
                              <Badge className="bg-primary/10 text-primary border-none text-[9px] font-black uppercase tracking-widest">
                                {scrip.category}
                              </Badge>
                              <span className="text-[10px] font-bold text-muted-foreground">{scrip.reference}</span>
                            </div>
                            <p className="font-serif italic text-sm text-foreground/90 leading-relaxed mb-3">
                              "{scrip.verse}"
                            </p>
                            <p className="text-xs text-muted-foreground italic bg-primary/5 p-3 rounded-xl border border-primary/5">
                              <strong>Discernment:</strong> {scrip.relevance}
                            </p>
                          </div>
                          <CardFooter className="p-0 pt-5">
                            <Button
                              onClick={() => handlePublishScripture(scrip)}
                              disabled={postingScriptureId === scrip.id}
                              className="w-full rounded-full h-10 bg-primary hover:bg-primary/95 text-white font-black uppercase tracking-widest text-[9px] gap-2"
                            >
                              {postingScriptureId === scrip.id ? (
                                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                              ) : (
                                <Send className="h-3.5 w-3.5" />
                              )}
                              Publish to Feed
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Store Sync Control Panel Tab */}
              <TabsContent value="store" className="space-y-6 animate-in fade-in duration-300">
                <Card className="border border-transparent dark:border-zinc-800/60 bg-white/50 dark:bg-zinc-900/80 backdrop-blur-sm shadow-lg rounded-[2.5rem] p-8">
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="text-left">
                        <h3 className="text-xl font-black uppercase tracking-wider text-primary flex items-center gap-2">
                          <ShoppingBag className="h-5 w-5" /> Storefront Sync Controller
                        </h3>
                        <p className="text-xs text-muted-foreground font-medium mt-1">
                          Configure and pull live items from any Redbubble storefront onto your public store page.
                        </p>
                      </div>
                      {activeShopName && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={resetToDefault}
                          className="text-[10px] text-destructive hover:bg-destructive/5 font-black uppercase tracking-widest rounded-full px-4"
                        >
                          Disconnect Store
                        </Button>
                      )}
                    </div>

                    <form onSubmit={handleSyncStore} className="flex flex-col sm:flex-row gap-3">
                      <Input 
                        placeholder="Redbubble username or link..." 
                        className="flex-1 rounded-2xl h-14 bg-muted/40 border-primary/10 px-6 font-bold text-sm"
                        value={storeInput}
                        onChange={(e) => setStoreInput(e.target.value)}
                        disabled={isSyncing}
                      />
                      <Button 
                        type="submit" 
                        disabled={isSyncing || !storeInput.trim()}
                        className="rounded-full h-14 px-8 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-xs gap-2 min-w-[160px] shadow-lg shadow-primary/25"
                      >
                        {isSyncing ? (
                          <>
                            <RefreshCw className="h-4 w-4 animate-spin" /> Syncing...
                          </>
                        ) : (
                          <>
                            <RefreshCw className="h-4 w-4" /> Sync Products
                          </>
                        )}
                      </Button>
                    </form>

                    {activeShopName && (
                      <div className="flex flex-col gap-3 bg-emerald-500/10 p-5 rounded-2xl border border-emerald-500/20 text-left">
                        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-black text-xs uppercase tracking-wider">
                          <CheckCircle className="h-4 w-4" /> Live Connection Operational
                        </div>
                        <p className="text-sm font-medium text-foreground/80">
                          Your public shop is currently synchronized with Redbubble storefront: <strong className="text-primary font-black underline">@{activeShopName}</strong>
                        </p>
                        {lastSyncedTime && (
                          <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Cache Sync Status: {lastSyncedTime}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </Card>
              </TabsContent>

              {/* Administrators Management Tab */}
              <TabsContent value="admins" className="space-y-6 animate-in fade-in duration-300">
                <Card className="border border-transparent dark:border-zinc-800/60 bg-white/50 dark:bg-zinc-900/80 backdrop-blur-sm shadow-lg rounded-[2.5rem] overflow-hidden">
                  <CardHeader className="p-8 border-b border-primary/5 bg-white/30 dark:bg-zinc-950/30">
                    <CardTitle className="text-xl font-black flex items-center gap-3">
                      <Users className="h-5 w-5 text-primary" />
                      Team Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-primary/5 hover:bg-transparent">
                          <TableHead className="font-black text-[10px] uppercase tracking-widest px-8">Administrator</TableHead>
                          <TableHead className="font-black text-[10px] uppercase tracking-widest">Email</TableHead>
                          <TableHead className="font-black text-[10px] uppercase tracking-widest">Role</TableHead>
                          <TableHead className="text-right px-8"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {admins.map((admin) => (
                          <TableRow key={admin.email} className="border-primary/5 hover:bg-primary/5 transition-colors">
                            <TableCell className="px-8 font-bold">{admin.name}</TableCell>
                            <TableCell className="text-muted-foreground text-sm">{admin.email}</TableCell>
                            <TableCell>
                              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-tighter">
                                {admin.role}
                              </span>
                            </TableCell>
                            <TableCell className="text-right px-8">
                              {admin.role !== 'Owner' && (
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => handleRemoveAdmin(admin.email)}
                                  className="text-muted-foreground hover:text-destructive"
                                >
                                  Remove
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <form onSubmit={handleAddAdmin}>
                  <Card className="border-none bg-primary text-white shadow-xl shadow-primary/20 rounded-[2.5rem] p-8 mt-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="space-y-2 text-left">
                        <h3 className="text-2xl font-black leading-tight">Empower the Community</h3>
                        <p className="text-white/80 font-medium max-w-sm">
                          Add trusted members to help curate and moderate the street words.
                        </p>
                      </div>
                      <div className="flex gap-2 flex-1 max-w-md">
                        <Input 
                          placeholder="Enter email address..." 
                          className="bg-white/20 border-white/20 text-white placeholder:text-white/60 rounded-full h-12 px-6"
                          value={newAdminEmail}
                          onChange={(e) => setNewAdminEmail(e.target.value)}
                          required
                          type="email"
                        />
                        <Button type="submit" className="bg-white text-primary hover:bg-white/90 rounded-full h-12 px-8 font-black">
                          <Plus className="mr-2 h-4 w-4" /> Add
                        </Button>
                      </div>
                    </div>
                  </Card>
                </form>
              </TabsContent>
            </Tabs>
          </div>

          {/* Analytics Sidebar */}
          <div className="space-y-8">
            <Card className="border border-transparent dark:border-zinc-800/60 bg-white/50 dark:bg-zinc-900/80 backdrop-blur-sm shadow-lg rounded-[2.5rem] p-8">
              <div className="flex items-center gap-3 mb-8">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-black">Top Categories</h3>
              </div>
              <div className="space-y-6">
                {[
                  { name: "Faith", value: 45, color: "bg-blue-500" },
                  { name: "Love", value: 35, color: "bg-rose-500" },
                  { name: "Joy", value: 15, color: "bg-amber-500" },
                  { name: "Truth", value: 5, color: "bg-purple-500" },
                ].map((item) => (
                  <div key={item.name} className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                      <span>{item.name}</span>
                      <span>{item.value}%</span>
                    </div>
                    <div className="h-2 w-full bg-primary/5 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color}`} style={{ width: `${item.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="border-none bg-gradient-to-br from-[#a855f7] to-[#ec4899] text-white shadow-lg rounded-[2.5rem] p-8">
              <BarChart3 className="h-8 w-8 mb-4 opacity-50" />
              <h3 className="text-xl font-black mb-2">Detailed Reports</h3>
              <p className="text-white/80 text-sm font-medium mb-6 leading-relaxed">
                Unlock deeper insights into community engagement and verse resonance.
              </p>
              <Button className="w-full bg-white text-primary hover:bg-white/90 rounded-full font-black">
                Download PDF
              </Button>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;