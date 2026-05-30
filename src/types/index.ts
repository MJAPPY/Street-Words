export type Category = 
  | 'Faith' | 'Love' | 'Despair' | 'Anger' | 'Hope' | 'Wisdom' | 'Truth'
  | 'Joy' | 'Peace' | 'Fear' | 'Guilt' | 'Justice' | 'Mercy'
  | 'Kindness' | 'Longsuffering' | 'Patience' | 'Goodness' | 'Faithfulness'
  | 'Perseverance' | 'Grief' | 'Pain' | 'Humble';

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