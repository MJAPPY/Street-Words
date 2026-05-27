export type Category = 'Faith' | 'Love' | 'Despair' | 'Anger' | 'Hope' | 'Wisdom' | 'Truth';

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