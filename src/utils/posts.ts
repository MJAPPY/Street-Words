import { VersePost } from '@/types';

export const INITIAL_POSTS: VersePost[] = [
  {
    id: '1',
    verse: 'Now faith is the assurance of things hoped for, the conviction of things not seen.',
    reference: 'Hebrews 11:1',
    relevance: 'In a world that demands proof for everything, faith is our anchor. It allows us to walk confidently into the unknown because we trust the One who holds the future.',
    category: 'Faith',
    author: 'StreetWords',
    createdAt: 'Just now',
    likes: 0,
    comments: []
  },
  {
    id: '2',
    verse: 'Love is patient and kind; love does not envy or boast; it is not arrogant or rude.',
    reference: '1 Corinthians 13:4',
    relevance: 'Street life can be hard and cold. Practicing this kind of love is the ultimate counter-culture movement. It is how we show the truth of the Gospel.',
    category: 'Love',
    author: 'StreetWords',
    createdAt: 'Just now',
    likes: 0,
    comments: []
  },
  {
    id: '3',
    verse: 'The Lord is near to the brokenhearted and saves the crushed in spirit.',
    reference: 'Psalm 34:18',
    relevance: 'When you feel like the walls are closing in, remember that He is closest in the cracks of our despair. Brokenness is the entry point for grace.',
    category: 'Despair',
    author: 'StreetWords',
    createdAt: 'Just now',
    likes: 0,
    comments: []
  },
  {
    id: '4',
    verse: 'The soul of the sluggard craves and gets nothing, while the soul of the diligent is richly supplied.',
    reference: 'Proverbs 13:4',
    relevance: 'Street wisdom often talks about the grind, but biblical diligence is about character and faithfulness in the small things.',
    category: 'Wisdom',
    author: 'StreetWords',
    createdAt: 'Just now',
    likes: 0,
    comments: []
  }
];

// Helper function to get actual live count of posts for a category
export const getCategoryCount = (categoryName: string, userPosts: VersePost[] = []): number => {
  const defaultCount = INITIAL_POSTS.filter(p => p.category === categoryName).length;
  const customCount = userPosts.filter(p => p.category === categoryName).length;
  return defaultCount + customCount;
};