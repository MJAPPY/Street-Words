export type Category = 'Faith' | 'Love' | 'Despair' | 'Anger' | 'Hope' | 'Wisdom' | 'Truth';

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

export const CATEGORY_DATA: CategoryInfo[] = [
  { name: 'Faith', description: 'Assurance in the unseen and trust in the divine.', count: 124, color: 'from-blue-500 to-indigo-600', icon: 'Shield' },
  { name: 'Love', description: 'The greatest commandment and the heart of grace.', count: 89, color: 'from-rose-400 to-pink-600', icon: 'Heart' },
  { name: 'Despair', description: 'Finding light in the darkest valleys and heavy hearts.', count: 56, color: 'from-slate-600 to-slate-900', icon: 'CloudRain' },
  { name: 'Anger', description: 'Righteous indignation and processing intense emotion.', count: 34, color: 'from-orange-600 to-red-700', icon: 'Flame' },
  { name: 'Hope', description: 'The anchor for the soul and expectations of goodness.', count: 112, color: 'from-amber-300 to-orange-500', icon: 'Sun' },
  { name: 'Wisdom', description: 'Prudent discernment and the path of understanding.', count: 78, color: 'from-emerald-500 to-teal-700', icon: 'Compass' },
  { name: 'Truth', description: 'Unwavering reality and the word that sets us free.', count: 95, color: 'from-violet-500 to-purple-700', icon: 'Key' },
];