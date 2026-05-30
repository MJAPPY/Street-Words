export type Category = 
  | 'Faith' | 'Love' | 'Despair' | 'Anger' | 'Hope' | 'Wisdom' | 'Truth'
  | 'Joy' | 'Peace' | 'Fear' | 'Guilt' | 'Justice' | 'Mercy'
  | 'Kindness' | 'Longsuffering' | 'Patience' | 'Goodness' | 'Faithfulness'
  | 'Perseverance';

export interface CategoryInfo {
  name: Category;
  description: string;
  count: number;
  color: string;
  icon: string;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
  replies?: Comment[];
}

export interface VersePost {
  id: string;
  verse: string;
  reference: string;
  relevance: string;
  category: Category;
  author: string;
  createdAt: string;
  likes: number;
  comments: Comment[];
}

export interface UserProfile {
  id: string;
  name: string;
  handle: string;
  bio: string;
  avatar: string;
  joinedDate: string;
  favoriteVerse?: string;
  favoriteReference?: string;
  socialLink?: string;
  videoLink?: string;
  websiteLink?: string;
  stats: {
    verses: number;
    likes: number;
    reflections: number;
  };
}

export const CATEGORY_DATA: CategoryInfo[] = [
  { name: 'Faith', description: 'Assurance in the unseen and trust in the divine.', count: 124, color: 'from-blue-500 to-indigo-600', icon: 'Shield' },
  { name: 'Love', description: 'The greatest commandment and the heart of grace.', count: 89, color: 'from-rose-400 to-pink-600', icon: 'Heart' },
  { name: 'Despair', description: 'Finding light in the darkest valleys and heavy hearts.', count: 56, color: 'from-slate-600 to-slate-900', icon: 'CloudRain' },
  { name: 'Anger', description: 'Righteous indignation and processing intense emotion.', count: 34, color: 'from-orange-600 to-red-700', icon: 'Flame' },
  { name: 'Hope', description: 'The anchor for the soul and expectations of goodness.', count: 112, color: 'from-amber-300 to-orange-500', icon: 'Sun' },
  { name: 'Wisdom', description: 'Prudent discernment and the path of understanding.', count: 78, color: 'from-emerald-500 to-teal-700', icon: 'Compass' },
  { name: 'Truth', description: 'Unwavering reality and the word that sets us free.', count: 95, color: 'from-violet-500 to-purple-700', icon: 'Key' },
  { name: 'Joy', description: 'Strength found in celebration and eternal gladness.', count: 67, color: 'from-yellow-400 to-amber-600', icon: 'Smile' },
  { name: 'Peace', description: 'The stillness that surpasses all human understanding.', count: 82, color: 'from-cyan-400 to-blue-500', icon: 'Wind' },
  { name: 'Fear', description: 'Confronting anxieties with the presence of the Spirit.', count: 45, color: 'from-indigo-800 to-purple-950', icon: 'EyeOff' },
  { name: 'Guilt', description: 'Navigating conviction towards the path of repentance.', count: 29, color: 'from-zinc-500 to-zinc-800', icon: 'History' },
  { name: 'Justice', description: 'The righteous pursuit of equity and divine order.', count: 41, color: 'from-red-800 to-stone-900', icon: 'Scale' },
  { name: 'Mercy', description: 'The kindness that triumphs over judgment and law.', count: 73, color: 'from-emerald-300 to-teal-500', icon: 'HandHeart' },
  { name: 'Kindness', description: 'Friendly, generous, and considerate actions.', count: 52, color: 'from-pink-300 to-rose-400', icon: 'Sparkles' },
  { name: 'Longsuffering', description: 'Enduring trials with a steady heart and spirit.', count: 21, color: 'from-slate-400 to-slate-600', icon: 'Anchor' },
  { name: 'Patience', description: 'Calm endurance under pressure or delay.', count: 64, color: 'from-amber-200 to-yellow-500', icon: 'Clock' },
  { name: 'Goodness', description: 'Moral excellence and virtue in daily living.', count: 48, color: 'from-lime-400 to-emerald-600', icon: 'CheckCircle2' },
  { name: 'Faithfulness', description: 'Reliability and steadfast loyalty to the truth.', count: 39, color: 'from-indigo-400 to-blue-700', icon: 'ShieldCheck' },
  { name: 'Perseverance', description: 'Steadfast endurance and pressing on through trials.', count: 47, color: 'from-orange-500 to-yellow-600', icon: 'Anchor' },
];