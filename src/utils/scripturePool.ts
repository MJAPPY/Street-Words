import { Category } from '@/types';

export interface PoolScripture {
  id: string;
  verse: string;
  reference: string;
  relevance: string;
  category: Category;
}

export const WEEKLY_SCRIPTURE_POOL: PoolScripture[] = [
  {
    id: 'pool-1',
    verse: "Come to me, all who labor and are heavy laden, and I will give you rest. Take my yoke upon you, and learn from me, for I am gentle and lowly in heart, and you will find rest for your souls.",
    reference: "Matthew 11:28-29",
    relevance: "The street never stops moving, but Yeshua offers a supernatural speed limit. Exchange your exhaustion for His gentle peace today.",
    category: "Peace"
  },
  {
    id: 'pool-2',
    verse: "The light shines in the darkness, and the darkness has not overcome it.",
    reference: "John 1:5",
    relevance: "No matter how dark the alleyways or how bleak the circumstances appear, the Light of the World cannot be snuffed out. Walk in confidence.",
    category: "Truth"
  },
  {
    id: 'pool-3',
    verse: "Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me; your rod and your staff, they comfort me.",
    reference: "Psalm 23:4",
    relevance: "Grief and danger are real features of the concrete jungle, but they are only shadows. The Shepherd is walking right beside you on the pavement.",
    category: "Grief"
  },
  {
    id: 'pool-4',
    verse: "But those who wait for the Lord shall renew their strength; they shall mount up with wings like eagles; they shall run and not be weary; they shall walk and not faint.",
    reference: "Isaiah 40:31",
    relevance: "Waiting feels like wasted time in a city built on instant gratification. But waiting on the Lord is where your spiritual power is recharged.",
    category: "Patience"
  },
  {
    id: 'pool-5',
    verse: "Be kind to one another, tenderhearted, forgiving one another, as God in Christ forgave you.",
    reference: "Ephesians 4:32",
    relevance: "On these tough streets, tenderheartedness is often mistaken for weakness. In reality, forgiveness is the ultimate spiritual superpower.",
    category: "Forgiveness"
  },
  {
    id: 'pool-6',
    verse: "He has told you, O man, what is good; and what does the Lord require of you but to do justice, and to love kindness, and to walk humbly with your God?",
    reference: "Micah 6:8",
    relevance: "Simplifying the walk. True discipleship is simple: fight for equity, extend unwarranted mercy, and keep your ego small before the Creator.",
    category: "Humble"
  },
  {
    id: 'pool-7',
    verse: "Fear not, for I am with you; be not dismayed, for I am your God; I will strengthen you, I will help you, I will uphold you with my righteous right hand.",
    reference: "Isaiah 41:10",
    relevance: "You are never walking these blocks alone. When your strength runs dry, His grip holds you steady.",
    category: "Faith"
  }
];