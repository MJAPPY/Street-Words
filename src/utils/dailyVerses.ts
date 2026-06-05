import { Category } from '@/types';

export interface DailyScripture {
  verse: string;
  reference: string;
  discernment: string;
  category: Category;
}

export const DAILY_SCRIPTURES: DailyScripture[] = [
  {
    verse: "For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope.",
    reference: "Jeremiah 29:11",
    discernment: "Amidst the urban rush and noisy concrete lanes, His plans are sovereign, calculated, and filled with deep security. Take a breath—your future is anchored.",
    category: "Hope"
  },
  {
    verse: "The Lord is my light and my salvation; whom shall I fear? The Lord is the stronghold of my life; of whom shall I be afraid?",
    reference: "Psalm 27:1",
    discernment: "When the alleyways look dark and fears press in, remember who holds the master switch. Walk with your head high—you are fully protected.",
    category: "Fear"
  },
  {
    verse: "And let us not grow weary of doing good, for in due season we will reap, if we do not give up.",
    reference: "Galatians 6:9",
    discernment: "The daily grind can wear down your spirit. But every small act of kindness on these streets is a seed. Keep sowing, the harvest is guaranteed.",
    category: "Perseverance"
  },
  {
    verse: "Trust in the Lord with all your heart, and do not lean on your own understanding.",
    reference: "Proverbs 3:5",
    discernment: "Human street smarts only get us so far. True direction comes when we lay down our maps and trust His compass.",
    category: "Trust"
  },
  {
    verse: "Do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God.",
    reference: "Philippians 4:6",
    discernment: "Instead of carrying the weight of the city on your shoulders, trade your worries for prayers. Let His peace guard your mind.",
    category: "Peace"
  },
  {
    verse: "Fear not, for I am with you; be not dismayed, for I am your God; I will strengthen you, I will help you, I will uphold you with my righteous right hand.",
    reference: "Isaiah 41:10",
    discernment: "You are never walking these blocks alone. When your strength runs dry, His grip holds you steady.",
    category: "Faith"
  },
  {
    verse: "But the fruit of the Spirit is love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control.",
    reference: "Galatians 5:22-23",
    discernment: "True character isn't built on toughness or pride. It shines through quiet kindness, supernatural patience, and love on the cold pavement.",
    category: "Goodness"
  }
];

export const getDailyVerseForToday = (): DailyScripture => {
  const dayOfYear = new Date().getDate(); // Rotates cleanly every day of the month
  const index = dayOfYear % DAILY_SCRIPTURES.length;
  return DAILY_SCRIPTURES[index];
};