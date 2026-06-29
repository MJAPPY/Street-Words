"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, Sparkles, HeartHandshake, Check, ShieldCheck, 
  MapPin, Coffee, Shirt, Truck, Eye, Share2, Clipboard, ArrowRight, Info
} from 'lucide-react';
import { showSuccess } from '@/utils/toast';

interface Tier {
  name: string;
  price: string;
  description: string;
  badgeColor: string;
  iconColor: string;
  benefits: string[];
  popular?: boolean;
}

const Sponsors = () => {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const handleInquiry = (tierName: string) => {
    setSelectedTier(tierName);
    showSuccess(`Inquiry requested for the ${tierName} Partnership. Our outreach team will reach out within 24 hours!`);
  };

  const tiers: Tier[] = [
    {
      name: "Bronze Outreach Partner",
      price: billingCycle === 'monthly' ? "$150" : "$125",
      description: "Ideal for small independent local shops looking to show community solidarity.",
      badgeColor: "bg-amber-600/10 text-amber-700 dark:text-amber-500",
      iconColor: "text-amber-600",
      benefits: [
        "Small Vinyl Sticker on our outreach gear",
        "Business logo & link listed on our Partner Directory",
        "Quarterly digital impact summary report",
        "Official 'Proudly Supporting StreetWords' digital web badge"
      ]
    },
    {
      name: "Silver Community Leader",
      price: billingCycle === 'monthly' ? "$350" : "$295",
      description: "Perfect for growing teams aiming to foster real tangible change on our city blocks.",
      badgeColor: "bg-slate-300 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300",
      iconColor: "text-slate-400",
      popular: true,
      benefits: [
        "Large Vinyl Sticker & recognition on our main street gear",
        "Social media shoutout & highlight every 3 months",
        "Physical 'Proudly Supporting' vinyl badge for your store door",
        "High-res street photo of your brand sticker in action",
        "Monthly direct impact transparency report"
      ]
    },
    {
      name: "Gold Street Pillar",
      price: billingCycle === 'monthly' ? "$750" : "$625",
      description: "For established businesses looking to play a structural, anchor role in street outreach.",
      badgeColor: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
      iconColor: "text-yellow-500",
      benefits: [
        "All benefits of Bronze & Silver tiers",
        "Primary featured sponsor logo in all outreach videos",
        "Co-branded custom voucher printing with your store logo",
        "Dedicated permanent bio feature on our main portal",
        "1-on-1 impact strategy consultation call with leadership"
      ]
    }
  ];

  return (
    <div className="min-h-screen urban-pattern bg-background/50">
      <Navbar />

      <main className="container max-w-6xl py-12 md:py-24">
        
        {/* Page Header Hero */}
        <header className="mb-20 text-center space-y-6 relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-2">
            <Building2 className="h-3.5 w-3.5" />
            Empower Local Commerce & Compassion
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground leading-[0.85]">
            SUPPORT Outreach, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#ec4899] to-primary animate-shimmer-text">SHOW YOUR SPIRIT</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed">
            Join a growing group of local independent businesses making a visible, real difference on our city's pavement. Your sponsorship directly funds vouchers, meals, clean clothes, and practical help.
          </p>

          <div className="flex justify-center pt-6">
            <div className="bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md p-1.5 rounded-full border border-primary/10 flex gap-2">
              <button 
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${billingCycle === 'monthly' ? 'bg-primary text-white shadow-lg' : 'text-muted-foreground'}`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${billingCycle === 'yearly' ? 'bg-primary text-white shadow-lg' : 'text-muted-foreground'}`}
              >
                Yearly (Save 15%)
              </button>
            </div>
          </div>
        </header>

        {/* Sponsorship Tiers Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          {tiers.map((tier) => (
            <Card 
              key={tier.name} 
              className={`relative overflow-hidden border bg-white/60 dark:bg-zinc-900/80 backdrop-blur-md shadow-2xl rounded-[3rem] transition-all duration-300 flex flex-col justify-between ${
                tier.popular 
                  ? 'border-primary shadow-[0_20px_50px_-12px_rgba(168,85,247,0.3)] scale-[1.02] lg:-translate-y-2' 
                  : 'border-white/60 dark:border-zinc-800/60 hover:-translate-y-1'
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-primary text-white font-black uppercase tracking-widest text-[8px] px-8 py-2 rotate-45 translate-x-7 translate-y-4">
                    POPULAR
                  </div>
                </div>
              )}

              <div className="p-8 md:p-10 space-y-6 text-left">
                <Badge className={`${tier.badgeColor} border-none rounded-full px-4 py-1.5 text-[9px] font-black uppercase tracking-widest`}>
                  {tier.name.split(" ")[0]} TIER
                </Badge>
                
                <div className="space-y-1">
                  <h3 className="text-2xl font-black tracking-tight text-foreground">{tier.name}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed font-semibold">{tier.description}</p>
                </div>

                <div className="pt-2 flex items-baseline gap-2">
                  <span className="text-5xl font-black text-foreground">{tier.price}</span>
                  <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">/ month</span>
                </div>

                <div className="h-px bg-primary/5 pt-2" />

                <div className="space-y-4 pt-2">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Sponsor Benefits</h4>
                  <ul className="space-y-3">
                    {tier.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="h-5 w-5 rounded-full bg-primary/5 flex items-center justify-center text-primary shrink-0 mt-0.5">
                          <Check className="h-3 w-3" />
                        </div>
                        <span className="text-xs font-semibold text-foreground/80 leading-snug">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <CardFooter className="px-8 md:px-10 pb-10 pt-0">
                <Button 
                  onClick={() => handleInquiry(tier.name)}
                  className={`w-full h-14 rounded-full font-black uppercase tracking-widest text-xs shadow-lg gap-2 ${
                    tier.popular 
                      ? 'bg-primary hover:bg-primary/90 text-white shadow-primary/20' 
                      : 'bg-primary/5 hover:bg-primary text-primary hover:text-white border border-primary/10'
                  }`}
                >
                  Apply to Sponsor <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </section>

        {/* Deliverables Showcase Section */}
        <section className="bg-white/20 dark:bg-black/10 backdrop-blur-md rounded-[4rem] border border-primary/5 p-12 md:p-16 mb-24 text-left">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-foreground mb-4">
              What Businesses Actually Receive
            </h2>
            <p className="text-sm md:text-base font-semibold text-muted-foreground leading-relaxed">
              We understand you are running a business. Here is the concrete return you receive as a direct testimony to your customers and team of your commitment to local street sanctuary initiatives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-3 p-6 bg-white/40 dark:bg-zinc-900/40 rounded-3xl border border-primary/5">
              <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="font-black text-sm uppercase tracking-wider text-foreground">Outreach Sticker</h3>
              <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                A weather-resistant vinyl decal displayed directly on our mobile outreach gears and supply packs.
              </p>
            </div>

            <div className="space-y-3 p-6 bg-white/40 dark:bg-zinc-900/40 rounded-3xl border border-primary/5">
              <div className="h-10 w-10 rounded-2xl bg-[#ec4899]/10 flex items-center justify-center text-[#ec4899] mb-4">
                <Share2 className="h-5 w-5" />
              </div>
              <h3 className="font-black text-sm uppercase tracking-wider text-foreground">Outreach Action Photo</h3>
              <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                An actual action photograph of your business logo on our equipment taken on-site on the streets for social media.
              </p>
            </div>

            <div className="space-y-3 p-6 bg-white/40 dark:bg-zinc-900/40 rounded-3xl border border-primary/5">
              <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-4">
                <Clipboard className="h-5 w-5" />
              </div>
              <h3 className="font-black text-sm uppercase tracking-wider text-foreground">Impact Reporting</h3>
              <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                A direct breakdown report illustrating exactly how many hot vouchers, clothing bundles, or sleeping bags your funds provided.
              </p>
            </div>

            <div className="space-y-3 p-6 bg-white/40 dark:bg-zinc-900/40 rounded-3xl border border-primary/5">
              <div className="h-10 w-10 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 mb-4">
                <Building2 className="h-5 w-5" />
              </div>
              <h3 className="font-black text-sm uppercase tracking-wider text-foreground">Website Integration</h3>
              <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                Dedicated directory display of your business name, logo, and active link, showcasing local commerce to our user community.
              </p>
            </div>
          </div>
        </section>

        {/* What Your Funds Achieve */}
        <section className="mb-24 text-left grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-foreground leading-[1.05]">
              Direct Help, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#ec4899]">No Middleman.</span>
            </h2>
            <p className="text-sm md:text-base font-semibold text-muted-foreground leading-relaxed">
              Every single dollar contributed to the business outreach fund goes directly to procurement and distribution on the pavements. No bureaucratic admin fees, no delay.
            </p>
            
            <div className="flex gap-4 p-4 rounded-3xl bg-primary/5 border border-primary/10 max-w-md">
              <Info className="h-6 w-6 text-primary shrink-0" />
              <p className="text-[11px] text-muted-foreground font-semibold leading-relaxed">
                <strong>Why vouchers work:</strong> Handing over custom, non-liquid partner vouchers gives recipients warmth, dignity, and a positive local store location to walk into safely.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white/60 dark:bg-zinc-900/80 p-8 rounded-[2.5rem] border border-primary/5 text-center space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
                <Coffee className="h-6 w-6" />
              </div>
              <h3 className="text-base font-black uppercase tracking-wider text-foreground">$10–$20</h3>
              <p className="text-xs text-muted-foreground font-medium leading-normal">
                Coffee, warm meals, or snack grocery partner vouchers distributed directly.
              </p>
            </div>

            <div className="bg-white/60 dark:bg-zinc-900/80 p-8 rounded-[2.5rem] border border-primary/5 text-center space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center mx-auto">
                <Shirt className="h-6 w-6" />
              </div>
              <h3 className="text-base font-black uppercase tracking-wider text-foreground">Warm Clothing</h3>
              <p className="text-xs text-muted-foreground font-medium leading-normal">
                Socks, dry beanies, thermal hygiene packs, and phone credit topups.
              </p>
            </div>

            <div className="bg-white/60 dark:bg-zinc-900/80 p-8 rounded-[2.5rem] border border-primary/5 text-center space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto">
                <Truck className="h-6 w-6" />
              </div>
              <h3 className="text-base font-black uppercase tracking-wider text-foreground">Direct Access</h3>
              <p className="text-xs text-muted-foreground font-medium leading-normal">
                Immediate local bus passes and transport tokens to safely reach shelters.
              </p>
            </div>
          </div>
        </section>

        {/* Impact Transparency / Live Tracker Metrics */}
        <section className="mb-24 p-12 md:p-16 rounded-[4rem] bg-gradient-to-br from-primary to-[#ec4899] text-white shadow-3xl text-center space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 opacity-5 rounded-bl-full pointer-events-none" />
          
          <div className="max-w-2xl mx-auto space-y-4">
            <Badge className="bg-white/20 text-white border-none rounded-full px-4 py-1 text-[9px] font-black uppercase tracking-widest">
              MONTHLY IMPACT REPORT: ACTIVE SYNC
            </Badge>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter">180 Vouchers Handed Out</h2>
            <p className="text-white/80 font-medium leading-relaxed max-w-lg mx-auto text-sm md:text-base">
              Thanks to our business community, we distributed shelter supplies, meal credits, and warm winter garments this past month directly onto city corridors.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/10">
              <p className="text-xs text-white/60 font-bold uppercase tracking-wider">Vouchers Distributed</p>
              <p className="text-4xl font-black mt-2">180</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/10">
              <p className="text-xs text-white/60 font-bold uppercase tracking-wider">Hygiene Kits</p>
              <p className="text-4xl font-black mt-2">45</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/10">
              <p className="text-xs text-white/60 font-bold uppercase tracking-wider">Warm Beanies</p>
              <p className="text-4xl font-black mt-2">92</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/10">
              <p className="text-xs text-white/60 font-bold uppercase tracking-wider">Direct Transit Tokens</p>
              <p className="text-4xl font-black mt-2">120</p>
            </div>
          </div>
        </section>

        {/* Public Donation Options (Non-Business) */}
        <section className="bg-white/60 dark:bg-zinc-900/80 backdrop-blur-md border border-white/60 dark:border-zinc-800/60 rounded-[3rem] p-10 md:p-14 text-left flex flex-col md:flex-row items-center gap-10 max-w-4xl mx-auto">
          <div className="space-y-4 flex-1">
            <h3 className="text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" /> Individual Support
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground font-semibold leading-relaxed">
              Not a business but still want to play a part? We welcome any individual contributions to sustain StreetWords outreach. All proceeds go 100% to shelter gear, street-curated Bible sticker print packs, and warming vouchers.
            </p>
          </div>
          <div className="shrink-0">
            <Button 
              onClick={() => showSuccess("Direct payment options opening soon! Thank you for your support.")}
              className="rounded-full h-14 px-8 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-xs shadow-lg shadow-primary/25"
            >
              Public Donation Options
            </Button>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default Sponsors;