"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, BarChart3, ShieldAlert, Plus, 
  TrendingUp, MessageSquare, Heart, Eye,
  CheckCircle2, AlertTriangle, Trash2, Mail
} from 'lucide-react';
import { MadeWithDyad } from '@/components/made-with-dyad';
import { showSuccess } from '@/utils/toast';

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
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [admins, setAdmins] = useState([
    { name: "Super Admin", email: "admin@streetwords.com", role: "Owner" },
    { name: "TruthSeeker", email: "mod@streetwords.com", role: "Moderator" },
  ]);

  // Interactive Flagged Items State for Moderation
  const [flaggedItems, setFlaggedItems] = useState<FlaggedItem[]>([
    { 
      id: 'f1', 
      type: 'Post', 
      author: 'StreetGamer', 
      content: 'Click this external link for free game keys to level up your spiritual journey fast! http://scamlink.xyz', 
      reason: 'Unapproved Link / Spam', 
      reference: 'Proverbs 11:1',
      date: '10m ago' 
    },
    { 
      id: 'f2', 
      type: 'Comment', 
      author: 'Skeptic99', 
      content: 'This comment section is full of gullible people who believe anything.', 
      reason: 'Harassment / Incivil Tone', 
      date: '1h ago' 
    },
    { 
      id: 'f3', 
      type: 'Post', 
      author: 'LostInConcrete', 
      content: 'I have lost all hope of finding light in this city. Every street is empty of love.', 
      reason: 'Needs Support Reachout / Heavy Despair', 
      reference: 'Psalm 13:1',
      date: '3h ago' 
    }
  ]);

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
    { label: "Total Views", value: "12.4k", icon: Eye, color: "text-blue-500", trend: "+12%" },
    { label: "Active Users", value: "1,204", icon: Users, color: "text-purple-500", trend: "+5%" },
    { label: "Flagged Items", value: flaggedItems.length.toString(), icon: AlertTriangle, color: "text-amber-500", trend: "Needs review" },
    { label: "Comments", value: "892", icon: MessageSquare, color: "text-orange-500", trend: "+2%" },
  ];

  return (
    <div className="min-h-screen urban-pattern bg-background/50">
      <Navbar />
      
      <main className="container max-w-6xl py-12 md:py-20">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
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
              <CardContent className="p-6">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Dashboard Panel */}
          <div className="lg:col-span-2 space-y-8">
            <Tabs defaultValue="moderation" className="space-y-6">
              <TabsList className="bg-white/40 dark:bg-zinc-900/40 backdrop-blur-sm border border-primary/5 rounded-full p-1 max-w-sm">
                <TabsTrigger value="moderation" className="rounded-full font-black uppercase tracking-widest text-[10px] px-6">
                  Moderation ({flaggedItems.length})
                </TabsTrigger>
                <TabsTrigger value="admins" className="rounded-full font-black uppercase tracking-widest text-[10px] px-6">
                  Administrators
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
                  <Card className="border-none bg-primary text-white shadow-xl shadow-primary/20 rounded-[2.5rem] p-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="space-y-2">
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
                  { name: "Faith", value: 85, color: "bg-blue-500" },
                  { name: "Love", value: 72, color: "bg-rose-500" },
                  { name: "Joy", value: 64, color: "bg-amber-500" },
                  { name: "Truth", value: 58, color: "bg-purple-500" },
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

      <footer className="mt-32 border-t border-primary/5 py-12">
        <div className="container text-center">
          <MadeWithDyad />
        </div>
      </footer>
    </div>
  );
};

export default Admin;