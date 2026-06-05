export const MadeWithDyad = () => {
  return (
    <div className="flex flex-col items-center gap-3 py-4">
      <p className="text-xs md:text-sm font-serif italic text-muted-foreground/80 max-w-lg text-center leading-relaxed">
        “Verily, verily, I say unto you, He that believeth on me hath everlasting life.” — John 6:47
      </p>
      <a
        href="https://www.dyad.sh/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[9px] uppercase tracking-[0.2em] font-black text-muted-foreground/40 hover:text-primary transition-colors"
      >
        Made with Dyad
      </a>
    </div>
  );
};