"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { 
  Heart, Gift, ShieldCheck, Landmark, Flame, 
  Sparkles, HelpCircle, ArrowRight, Loader2, Quote, CheckCircle2 
} from 'lucide-react';
import { showSuccess, showError } from '@/utils/toast';

interface VoucherLevel {
  amount: number;
  impact: string;
  popular?: boolean;
  color: string;
}

const VOUCHER_LEVELS: VoucherLevel[] = [
  { amount: 10, impact: "Provides a hot meal and coffee at a local partner diner.", color: "from-blue-500/20 to-indigo-500/10 text-blue-500 border-blue-500/20" },
  { amount: 20, impact: "Provides a warm winter meal kit plus clean drinking water.", color: "from-teal-500/20 to-emerald-500/10 text-teal-500 border-teal-500/20" },
  { amount: 30, impact: "Sponsors a complete fresh groceries voucher for a small family.", color: "from-pink-500/20 to-rose-500/10 text-pink-500 border-pink-500/20" },
  { amount: 40, impact: "Provides a warm sweater, meal, and personal hygiene pack.", color: "from-purple-500/20 to-indigo-500/10 text-purple-500 border-purple-500/20" },
  { amount: 50, impact: "Sponsors a local shelter overnight voucher & dynamic hot dinner.", popular: true, color: "from-amber-500/25 via-primary/10 to-[#ec4899]/10 text-primary border-primary/30" },
  { amount: 100, impact: "Delivers essential cold-weather apparel and multi-day meal cards.", color: "from-emerald-500/20 to-teal-500/10 text-emerald-500 border-emerald-500/20" },
  { amount: 200, impact: "Full community pantry replenishment for several neighborhoods in need.", color: "from-rose-500/20 to-pink-500/10 text-rose-500 border-rose-500/20" },
  { amount: 500, impact: "Sponsors complete critical support pathways, temporary housing, and clothing.", color: "from-violet-500/20 to-purple-500/10 text-purple-500 border-violet-500/20" },
];

const Sponsors = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [encouragement, setEncouragement] = useState<string>("");
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Form fields
  const [sponsorName, setSponsorName] = useState("");
  const [sponsorEmail, setSponsorEmail] = useState("");

  const activeAmount = selectedAmount !== null ? selectedAmount : (parseFloat(customAmount) || 0);

  const handleSelectLevel = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "" || /^[0-9]*\.?[0-9]*$/.test(val)) {
      setCustomAmount(val);
      setSelectedAmount(null);
    }
  };

  const handleInitiateSponsorship = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeAmount <= 0) {
      showError("Please select or enter a valid voucher amount.");
      return;
    }
    setIsCheckoutOpen(true);
  };

  const handleCompletePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sponsorName.trim() || !sponsorEmail.trim()) {
      showError("Please complete your name and email address.");
      return;
    }

    setIsProcessing(true);
    // Simulate secure checkout gateway
    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);
      showSuccess(`Thank you, ${sponsorName}! Voucher has been successfully generated.`);
    }, 1800);
  };

  const handleCloseDialog = () => {
    setIsCheckoutOpen(false);
    // Reset state if successfully sponsored
    if (isCompleted) {
      setEncouragement("");
      setSponsorName("");
      setSponsorEmail("");
      setCustomAmount("");
      setSelectedAmount(50);
      setIsCompleted(false);
    }
  };

  return (
    <div className="min-h-screen urban-pattern bg-background/50">
      <Navbar />

      <main className="container max-w-5xl py-12 md:py-20 text-left">
        {/* Header */}
        <header className="mb-16 text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-5 py-2 text-primary text-xs font-black uppercase tracking-[0.2em]">
            <Heart className="h-4 w-4 fill-primary animate-pulse" />
            Share Your Grace Today
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground leading-[0.85]">
            SPONSOR A <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#ec4899]">VOUCHER</span>
          </h1>
          <p className="text-lg text-muted-foreground font-medium leading-relaxed">
            Directly help someone on the street today. Buy a food or care voucher that is distributed securely by our team and partner diners directly to street communities and shelter paths.
          </p>
        </header>

        {/* Curation Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          
          {/* Main selection column */}
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                <Gift className="h-6 w-6 text-primary" />
                Select Voucher Level
              </h2>
              <p className="text-sm text-muted-foreground font-semibold">
                Tap to pick a pre-set contribution or input a custom amount below.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {VOUCHER_LEVELS.map((level) => {
                const isSelected = selectedAmount === level.amount;
                return (
                  <button
                    key={level.amount}
                    type="button"
                    onClick={() => handleSelectLevel(level.amount)}
                    className={`relative rounded-3xl p-6 text-left border transition-all duration-350 flex flex-col justify-between min-h-[140px] ${
                      isSelected 
                        ? 'bg-primary text-white border-primary shadow-xl shadow-primary/25 scale-[1.03]' 
                        : 'bg-white/60 dark:bg-zinc-900/60 hover:bg-white/80 dark:hover:bg-zinc-900/90 border-white/60 dark:border-zinc-800/60 hover:border-primary/20 shadow-sm'
                    }`}
                  >
                    {level.popular && (
                      <span className={`absolute -top-2.5 right-4 px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider ${
                        isSelected ? 'bg-white text-primary' : 'bg-primary text-white'
                      }`}>
                        Popular Choice
                      </span>
                    )}
                    
                    <span className="text-3xl font-black tracking-tighter">
                      ${level.amount}
                    </span>
                    
                    <p className={`text-[10px] font-semibold leading-relaxed line-clamp-3 mt-4 ${
                      isSelected ? 'text-white/90' : 'text-muted-foreground'
                    }`}>
                      {level.impact}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Custom Amount Form Field */}
            <div className="bg-white/40 dark:bg-zinc-900/40 p-6 rounded-[2rem] border border-primary/5 space-y-4">
              <Label htmlFor="custom-amount" className="text-xs font-black uppercase tracking-widest text-primary">Or Enter Custom Sponsor Amount ($)</Label>
              <div className="relative max-w-xs">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-lg text-muted-foreground/80">$</span>
                <Input
                  id="custom-amount"
                  placeholder="Other amount..."
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  className="rounded-2xl h-14 pl-10 pr-6 font-black text-lg bg-white dark:bg-zinc-950 border-white/60 dark:border-zinc-800/60"
                />
              </div>
            </div>
          </div>

          {/* Checkout review Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <Card className="border border-white/60 dark:border-zinc-800/60 bg-white/60 dark:bg-zinc-900/80 backdrop-blur-md shadow-xl rounded-[2.5rem] p-8 space-y-8">
              <div className="space-y-2">
                <h3 className="text-xl font-black tracking-tight">Voucher Impact</h3>
                <p className="text-xs text-muted-foreground font-semibold">Verify the power of your selected street blessing:</p>
              </div>

              <div className="p-6 rounded-2xl bg-primary/5 border border-primary/5 space-y-4 text-left">
                <div className="flex justify-between items-baseline">
                  <span className="text-[10px] font-black text-primary/60 uppercase tracking-widest">Active Contribution</span>
                  <span className="text-4xl font-black tracking-tight text-primary">${activeAmount}</span>
                </div>
                
                <p className="text-sm font-medium leading-relaxed italic text-foreground/80">
                  {selectedAmount !== null 
                    ? VOUCHER_LEVELS.find(l => level => l.amount === selectedAmount)?.impact || "Provides direct customized shelter or nourishment support paths."
                    : "Your custom contribution supplies critical meals, clean water, and emergency shelter space for neighbors on the sidewalks."
                  }
                </p>
              </div>

              {/* Encouragement note */}
              <form onSubmit={handleInitiateSponsorship} className="space-y-6">
                <div className="space-y-2 text-left">
                  <Label htmlFor="message" className="text-xs font-black uppercase tracking-widest flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-primary" /> Recipient encouragement
                  </Label>
                  <Textarea
                    id="message"
                    maxLength={160}
                    placeholder="E.g. Hang in there, you are loved! Yeshua has a beautiful plan for your life. (Max 160 characters)"
                    value={encouragement}
                    onChange={(e) => setEncouragement(e.target.value)}
                    className="rounded-2xl min-h-[100px] bg-white dark:bg-zinc-950 border-white/60 dark:border-zinc-800/60 text-xs font-medium focus-visible:ring-primary/20 leading-relaxed"
                  />
                  <p className="text-[9px] text-muted-foreground font-bold italic">This encouraging message will be directly printed on physical cards distributed with the voucher.</p>
                </div>

                <Button
                  type="submit"
                  disabled={activeAmount <= 0}
                  className="w-full h-14 rounded-full bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest shadow-xl shadow-primary/25 transition-transform hover:scale-105 active:scale-95"
                >
                  Sponsor Voucher Today <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </Card>

            <div className="flex items-center gap-4 px-4">
              <ShieldCheck className="h-10 w-10 text-primary shrink-0" />
              <p className="text-[10px] text-muted-foreground font-semibold leading-relaxed">
                We partner only with verified local diners and relief centers to ensure every single dollar turns into genuine physical goods for people who need them.
              </p>
            </div>
          </div>
        </div>

        {/* Stories / Testimonials */}
        <section className="border-t border-primary/10 pt-16 space-y-12">
          <div className="text-center space-y-2">
            <h3 className="text-3xl font-black tracking-tight">Recent Impacts on the Street</h3>
            <p className="text-muted-foreground font-medium">Read testimonies of hope supported by sponsors like you</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border border-white/50 bg-white/40 dark:border-zinc-800/40 dark:bg-zinc-900/40 rounded-[2.5rem] p-8 relative overflow-hidden group">
              <Quote className="absolute -top-6 -left-6 h-24 w-24 text-primary/5 pointer-events-none" />
              <div className="space-y-6 relative z-10">
                <p className="font-serif italic text-lg leading-relaxed text-foreground/80">
                  "I was having the coldest evening of my year when a local volunteer handed me a dinner voucher sponsored by someone named Sarah. The hot soup at the corner diner saved my body, but the message of hope on the paper saved my spirit."
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center font-black text-primary text-sm">
                    JD
                  </div>
                  <div>
                    <h5 className="font-bold text-sm">John D.</h5>
                    <p className="text-[10px] text-muted-foreground font-black uppercase tracking-wider">Voucher Recipient, NYC</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="border border-white/50 bg-white/40 dark:border-zinc-800/40 dark:bg-zinc-900/40 rounded-[2.5rem] p-8 relative overflow-hidden group">
              <Quote className="absolute -top-6 -left-6 h-24 w-24 text-primary/5 pointer-events-none" />
              <div className="space-y-6 relative z-10">
                <p className="font-serif italic text-lg leading-relaxed text-foreground/80">
                  "Seeing people walk in with these printed encouragement slips is the favorite part of our day. Their faces light up knowing some stranger miles away is looking out for them. We are proud to fulfill these meals."
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center font-black text-emerald-500 text-sm">
                    BM
                  </div>
                  <div>
                    <h5 className="font-bold text-sm">Broadway Diner Team</h5>
                    <p className="text-[10px] text-muted-foreground font-black uppercase tracking-wider">Partner Restaurant, Broadway</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>

      {/* Checkout Simulator Modal */}
      <Dialog open={isCheckoutOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-[480px] rounded-[2.5rem] border-none shadow-2xl p-8">
          {!isCompleted ? (
            <form onSubmit={handleCompletePayment} className="space-y-6 text-left">
              <DialogHeader>
                <DialogTitle className="text-2xl font-black tracking-tight">Complete Sponsorship</DialogTitle>
                <DialogDescription className="text-muted-foreground text-sm font-semibold">
                  You are sponsoring a <strong className="text-primary font-black">${activeAmount}</strong> street voucher. Please provide sponsor credentials below:
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sponsor-name" className="text-xs font-black uppercase tracking-widest px-1">Your Name</Label>
                  <Input
                    id="sponsor-name"
                    required
                    placeholder="Enter name or 'Anonymous'..."
                    value={sponsorName}
                    onChange={(e) => setSponsorName(e.target.value)}
                    className="rounded-2xl h-12 bg-muted/40 border-transparent focus:bg-white transition-all font-bold text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sponsor-email" className="text-xs font-black uppercase tracking-widest px-1">Email Address</Label>
                  <Input
                    id="sponsor-email"
                    required
                    type="email"
                    placeholder="E.g. disciple@example.com"
                    value={sponsorEmail}
                    onChange={(e) => setSponsorEmail(e.target.value)}
                    className="rounded-2xl h-12 bg-muted/40 border-transparent focus:bg-white transition-all font-bold text-sm"
                  />
                </div>

                {/* Simulated Payment card credentials */}
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest px-1">Simulated Card Details</Label>
                  <Input
                    placeholder="4111 •••• •••• ••••"
                    disabled
                    className="rounded-2xl h-12 bg-muted/20 border-transparent text-sm italic"
                    value="4111 2222 3333 4444 (Test Mode Sandbox)"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={handleCloseDialog}
                  className="flex-1 rounded-full font-black uppercase tracking-widest text-[10px] h-12"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isProcessing}
                  className="flex-2 rounded-full bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-[10px] h-12 shadow-lg shadow-primary/25"
                >
                  {isProcessing ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : `Bless with $${activeAmount}`}
                </Button>
              </div>
            </form>
          ) : (
            <div className="text-center py-8 space-y-6">
              <div className="h-16 w-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto text-emerald-500">
                <CheckCircle2 className="h-10 w-10 animate-bounce" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-black tracking-tight text-foreground">Voucher Generated Successfully</h3>
                <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                  Thank you for your generous street sanctuary donation. Our team will hand delivery this printed blessing card with your encouragement text to our street partners.
                </p>
              </div>

              {encouragement && (
                <div className="bg-primary/5 p-5 rounded-2xl border border-primary/5 max-w-sm mx-auto">
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary/60 mb-2">Encouragement Printed</p>
                  <p className="text-xs font-semibold leading-relaxed text-foreground/80 italic">
                    "{encouragement}"
                  </p>
                </div>
              )}

              <Button
                onClick={handleCloseDialog}
                className="rounded-full h-12 px-8 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-xs"
              >
                Glorify Him
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Sponsors;