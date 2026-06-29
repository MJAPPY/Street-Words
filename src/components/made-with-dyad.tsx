import { Twitter } from 'lucide-react';

export const MadeWithDyad = () => {
  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <p className="text-xs md:text-sm font-serif italic text-muted-foreground/80 max-w-lg text-center leading-relaxed">
        “Verily, verily, I say unto you, He that believeth on me hath everlasting life.” — John 6:47
      </p>
      
      <div className="flex items-center gap-4">
        <a
          href="https://x.com/StreetWords21"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 text-foreground text-[10px] font-black uppercase tracking-widest px-4.5 py-2 rounded-full transition-all"
        >
          <Twitter className="h-3.5 w-3.5 text-sky-500 fill-sky-500" />
          Follow @StreetWords21
        </a>
        
        <span className="text-muted-foreground/30 font-light">|</span>
        
        <a
          href="https://www.dyad.sh/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[9px] uppercase tracking-[0.2em] font-black text-muted-foreground/40 hover:text-primary transition-colors"
        >
          Made with Dyad
        </a>
      </div>
    </div>
  );
};