"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Heart, Shield, Compass, Quote, Anchor, CheckCircle2 } from 'lucide-react';

const Mission = () => {
  return (
    <div className="min-h-screen urban-pattern bg-background/50">
      <Navbar />

      <main className="container max-w-4xl py-12 md:py-20">
        {/* Page Header */}
        <header className="mb-16 text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/40 rounded-full px-4 py-1.5 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            Our Core Statement
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground leading-[0.85]">
            OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#ec4899]">MISSION</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
            Sharing hope, truth, and love in a broken world through the timeless truth of God’s Word.
          </p>
        </header>

        {/* Introduction Section */}
        <div className="space-y-12">
          <Card className="border border-white/60 dark:border-zinc-800/60 bg-white/60 dark:bg-zinc-900/80 backdrop-blur-md shadow-2xl rounded-[3rem] overflow-hidden p-8 md:p-12 text-left">
            <CardContent className="space-y-6 p-0">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-primary/10 text-primary">
                  <Heart className="h-6 w-6" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">
                  Sharing Hope in a Broken World
                </h2>
              </div>
              
              <p className="text-lg font-bold text-foreground/90 leading-relaxed">
                Street Words exists to share the hope, truth, and love of God’s Word with a broken and searching world.
              </p>
              
              <div className="space-y-4 text-muted-foreground font-medium leading-relaxed text-base md:text-lg">
                <p>
                  We believe every person is created by God, made with purpose, and has a value that cannot be measured by the standards, achievements, opinions, or expectations of the world.
                </p>
                <p>
                  Our worth is not determined by what we own, what we achieve, our past mistakes, or how others see us. Our true value comes from the Lord who created us, knows us, and loves us.
                </p>
                <p>
                  Every person is made in the image of God and carries a dignity that the world cannot give and cannot take away.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Hope We Share Section */}
          <Card className="border border-white/60 dark:border-zinc-800/60 bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur-md shadow-xl rounded-[3rem] p-8 md:p-12 text-left relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/15 opacity-30 rounded-bl-full pointer-events-none" />
            <CardContent className="space-y-6 p-0">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-primary/10 text-primary">
                  <Shield className="h-6 w-6" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">
                  The Hope We Share
                </h2>
              </div>

              <div className="space-y-4 text-foreground/95 font-medium leading-relaxed text-base md:text-lg">
                <p>
                  The greatest expression of God’s love is revealed through His only begotten Son, <strong className="text-primary font-black">Yeshua (Jesus)</strong> — God made flesh, who came into the world to bring salvation, forgiveness, and hope.
                </p>
                <p>
                  Jesus overcame the world not through earthly power or status, but through love and sacrifice. He willingly gave His life on the cross for the forgiveness of sins, taking upon Himself the weight of humanity’s brokenness.
                </p>

                <div className="py-4 my-2 border-l-4 border-primary/40 pl-6 bg-primary/5 rounded-r-2xl">
                  <p className="font-serif italic text-xl md:text-2xl text-primary leading-tight">
                    But death did not have the final word.
                  </p>
                </div>

                <p>
                  On the third day, Jesus rose again, defeating sin and death and revealing the promise of eternal life to all who place their trust in Him.
                </p>
                <p>
                  Through His sacrifice and resurrection, Jesus shows us that darkness can be overcome, brokenness can be restored, and hope can be found.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Our Purpose Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border border-white/60 dark:border-zinc-800/60 bg-white/60 dark:bg-zinc-900/80 backdrop-blur-md shadow-xl rounded-[2.5rem] p-8 text-left">
              <CardContent className="space-y-6 p-0">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-primary/10 text-primary">
                    <Compass className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-black tracking-tight text-foreground">Our Purpose</h3>
                </div>
                
                <ul className="space-y-3.5">
                  {[
                    "Encourage those who are hurting.",
                    "Strengthen those who are searching.",
                    "Remind people that their lives have meaning and purpose.",
                    "Share the truth of God’s love and grace.",
                    "Point people toward Yeshua (Jesus), our Lord and Savior."
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm md:text-base font-semibold text-foreground/80">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                
                <p className="text-xs font-black uppercase tracking-wider text-primary/70 border-t border-primary/5 pt-4">
                  We believe that even a single word of truth can plant a seed of hope.
                </p>
              </CardContent>
            </Card>

            {/* Loving Our Neighbour */}
            <Card className="border border-white/60 dark:border-zinc-800/60 bg-white/60 dark:bg-zinc-900/80 backdrop-blur-md shadow-xl rounded-[2.5rem] p-8 text-left flex flex-col justify-between">
              <CardContent className="space-y-6 p-0">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-primary/10 text-primary">
                    <Heart className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-black tracking-tight text-foreground">Loving Our Neighbour</h3>
                </div>
                
                <p className="text-sm md:text-base text-muted-foreground font-medium leading-relaxed">
                  Jesus taught us to love our neighbour — not only those who are close to us, but every person we encounter. Our neighbour is the stranger, the lonely, the overlooked, the hurting, and anyone searching for hope.
                </p>

                <div className="bg-gradient-to-tr from-primary/10 to-rose-500/10 rounded-2xl p-5 border border-primary/5 text-center space-y-1.5 shadow-inner">
                  <p className="text-xs font-black uppercase tracking-widest text-primary">You are seen.</p>
                  <p className="text-xs font-black uppercase tracking-widest text-primary">You are valued.</p>
                  <p className="text-xs font-black uppercase tracking-widest text-primary">You are created with purpose.</p>
                  <p className="text-xs font-black uppercase tracking-widest text-primary">You are loved by the One who made you.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Anchor / Foundation Section */}
          <div className="p-8 md:p-12 rounded-[3rem] bg-gradient-to-r from-primary to-[#ec4899] text-white shadow-2xl relative overflow-hidden group">
            <Quote className="absolute -top-10 -left-10 h-48 w-48 text-white/5 pointer-events-none" />
            <div className="relative z-10 space-y-8 text-center">
              <div className="flex justify-center">
                <div className="p-3 rounded-full bg-white/20 backdrop-blur-md">
                  <Anchor className="h-8 w-8 text-amber-300" />
                </div>
              </div>
              <div className="space-y-4 max-w-2xl mx-auto">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-amber-300">Our Foundation</h3>
                <blockquote className="text-2xl md:text-3xl font-serif italic text-white leading-tight">
                  “In this world you will have trouble. But take heart! I have overcome the world.”
                </blockquote>
                <cite className="block font-black text-xs uppercase tracking-[0.2em] text-white/80">
                  — John 16:33
                </cite>
              </div>
              
              <p className="text-sm md:text-base text-white/90 font-medium max-w-xl mx-auto leading-relaxed pt-2 border-t border-white/10">
                The world may bring uncertainty, suffering, and challenges, but our hope is not built on changing circumstances. Our hope is built on the One who has already overcome.
                <br />
                <strong className="text-white block mt-3 font-black text-lg">Yeshua (Jesus) — our Lord, our Savior, and our hope.</strong>
              </p>
            </div>
          </div>

          {/* Bottom Brand Summary */}
          <div className="text-center space-y-4 pt-10">
            <div className="flex justify-center">
              <img src="/logo.png" alt="Street Words Logo" className="h-16 w-16 object-contain" />
            </div>
            <h3 className="text-2xl font-black text-foreground">Street Words</h3>
            <p className="text-sm uppercase tracking-[0.2em] font-black text-muted-foreground">
              Sharing hope together in a broken world through the timeless truth of God’s Word.
            </p>
            <p className="text-xs font-bold text-primary italic">
              One message. One moment. One life changed.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Mission;