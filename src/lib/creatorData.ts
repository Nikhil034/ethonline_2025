// lib/creatorData.ts - Creator Content and Profile Data

export interface Creator {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  bio: string;
  totalTips: number;
  rating: number;
  contentCount: number;
  followers: number;
  verified: boolean;
  categories: string[];
}

export interface Content {
  id: string;
  creatorId: string;
  type: 'post' | 'tweet' | 'article' | 'video' | 'image';
  title: string;
  content: string;
  timestamp: number;
  likes: number;
  tips: number;
  aiScore: number;
  tags: string[];
  mediaUrl?: string;
}

export const MOCK_CREATORS: Creator[] = [
  {
    id: 'creator_1',
    name: 'Alice Johnson',
    handle: '@alice.eth',
    avatar: '👩‍🎨',
    bio: 'Digital artist & NFT creator. Sharing my journey in the crypto art world.',
    totalTips: 245.50,
    rating: 9.2,
    contentCount: 127,
    followers: 15420,
    verified: true,
    categories: ['Art', 'NFT', 'Crypto']
  },
  {
    id: 'creator_2',
    name: 'Bob Chen',
    handle: '@bob.eth',
    avatar: '👨‍💻',
    bio: 'Web3 developer building the future. Tutorials, tips, and insights.',
    totalTips: 189.75,
    rating: 8.8,
    contentCount: 89,
    followers: 8920,
    verified: true,
    categories: ['Tech', 'Web3', 'Development']
  },
  {
    id: 'creator_3',
    name: 'Charlie Rodriguez',
    handle: '@charlie.eth',
    avatar: '👨‍🚀',
    bio: 'DeFi researcher and educator. Making complex concepts simple.',
    totalTips: 156.25,
    rating: 9.0,
    contentCount: 203,
    followers: 12300,
    verified: true,
    categories: ['DeFi', 'Education', 'Research']
  },
  {
    id: 'creator_4',
    name: 'Diana Park',
    handle: '@diana.eth',
    avatar: '👩‍🔬',
    bio: 'Blockchain researcher & educator. Breaking down complex protocols.',
    totalTips: 98.40,
    rating: 8.5,
    contentCount: 156,
    followers: 6780,
    verified: false,
    categories: ['Blockchain', 'Research', 'Education']
  },
  {
    id: 'creator_5',
    name: 'Eve Thompson',
    handle: '@eve.eth',
    avatar: '👩‍💼',
    bio: 'Crypto investor & analyst. Market insights and investment strategies.',
    totalTips: 312.80,
    rating: 9.4,
    contentCount: 94,
    followers: 18900,
    verified: true,
    categories: ['Investment', 'Analysis', 'Trading']
  }
];

export const MOCK_CONTENT: Content[] = [
  {
    id: 'content_1',
    creatorId: 'creator_1',
    type: 'post',
    title: 'My latest NFT collection is live! 🎨',
    content: 'Just dropped my new "Digital Dreams" collection on OpenSea! Each piece represents a different emotion in the digital age. The response has been incredible - thank you to everyone who supported this project! 🙏',
    timestamp: Date.now() - 3600000, // 1 hour ago
    likes: 234,
    tips: 45.50,
    aiScore: 9.2,
    tags: ['NFT', 'Art', 'Collection'],
    mediaUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500'
  },
  {
    id: 'content_2',
    creatorId: 'creator_2',
    type: 'tweet',
    title: 'Web3 Development Tip 💡',
    content: 'Just learned something amazing about smart contract gas optimization! You can save up to 30% on gas costs by using assembly language for simple operations. Here\'s how...',
    timestamp: Date.now() - 7200000, // 2 hours ago
    likes: 189,
    tips: 23.75,
    aiScore: 8.8,
    tags: ['Web3', 'Development', 'Gas Optimization']
  },
  {
    id: 'content_3',
    creatorId: 'creator_3',
    type: 'article',
    title: 'Understanding DeFi Yield Farming',
    content: 'Yield farming can be complex, but I\'ll break it down simply. Think of it as putting your crypto to work earning rewards. The key is understanding the risks and rewards...',
    timestamp: Date.now() - 10800000, // 3 hours ago
    likes: 156,
    tips: 67.25,
    aiScore: 9.0,
    tags: ['DeFi', 'Yield Farming', 'Education']
  },
  {
    id: 'content_4',
    creatorId: 'creator_4',
    type: 'post',
    title: 'Blockchain Consensus Mechanisms Explained',
    content: 'From Proof of Work to Proof of Stake, understanding consensus mechanisms is crucial for anyone in crypto. Let me explain the differences and why they matter...',
    timestamp: Date.now() - 14400000, // 4 hours ago
    likes: 98,
    tips: 34.60,
    aiScore: 8.5,
    tags: ['Blockchain', 'Consensus', 'Education']
  },
  {
    id: 'content_5',
    creatorId: 'creator_5',
    type: 'tweet',
    title: 'Market Analysis: BTC vs ETH',
    content: 'Interesting correlation patterns between BTC and ETH this week. While BTC shows strength, ETH is showing some interesting DeFi activity. My analysis...',
    timestamp: Date.now() - 18000000, // 5 hours ago
    likes: 312,
    tips: 89.40,
    aiScore: 9.4,
    tags: ['Analysis', 'BTC', 'ETH', 'Trading']
  },
  {
    id: 'content_6',
    creatorId: 'creator_1',
    type: 'image',
    title: 'Behind the scenes of my art process',
    content: 'Sharing my creative process for the "Digital Dreams" collection. From initial sketches to final digital rendering, here\'s how I bring my ideas to life...',
    timestamp: Date.now() - 21600000, // 6 hours ago
    likes: 178,
    tips: 56.80,
    aiScore: 8.9,
    tags: ['Art', 'Process', 'Behind the Scenes'],
    mediaUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500'
  }
];

// Get creator by ID
export const getCreatorById = (id: string): Creator | undefined => {
  return MOCK_CREATORS.find(creator => creator.id === id);
};

// Get content by creator ID
export const getContentByCreator = (creatorId: string): Content[] => {
  return MOCK_CONTENT.filter(content => content.creatorId === creatorId);
};

// Get all content sorted by timestamp
export const getAllContent = (): Content[] => {
  return MOCK_CONTENT.sort((a, b) => b.timestamp - a.timestamp);
};

// Get top creators by tips
export const getTopCreators = (limit: number = 10): Creator[] => {
  return MOCK_CREATORS
    .sort((a, b) => b.totalTips - a.totalTips)
    .slice(0, limit);
};

// Get top creators by rating
export const getTopRatedCreators = (limit: number = 10): Creator[] => {
  return MOCK_CREATORS
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
};

