export interface Insight {
  id: string;
  category: 'psychology' | 'academic' | 'relationships' | 'sports' | 'faith' | 'everyday';
  categoryLabel: string;
  title: string;
  simpleExplanation: string;
  realLifeExample: string;
  actionStep: string;
  reflectionQuestion: string;
  quote?: string;
  author?: string;
}

export interface BookSummary {
  id: string;
  title: string;
  author: string;
  coverColor: string;
  category: string;
  oneSentence: string;
  summary: string;
  lessons: {
    title: string;
    description: string;
  }[];
  favoriteQuotes: string[];
  takeaways: string[];
  recommendation: string;
}

export interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

export interface Coach {
  id: 'general' | 'goal' | 'study' | 'relationship' | 'habit';
  name: string;
  title: string;
  avatar: string;
  role: string;
  prompt: string;
  greeting: string;
  bgColor: string;
  borderColor: string;
}

export interface UserStats {
  streak: number;
  lastActiveDate: string;
  growthScore: number;
  completedInsights: string[]; // List of insight IDs
  savedInsights: string[]; // List of insight IDs
  savedBooks: string[]; // List of book IDs
  completedBooks: string[]; // List of book IDs completed
  badges: {
    id: string;
    title: string;
    description: string;
    icon: string;
    unlockedAt?: string;
    category: string;
  }[];
  weeklyChallenges: {
    id: string;
    title: string;
    description: string;
    points: number;
    completed: boolean;
    category: string;
  }[];
  categoryScores: {
    psychology: number;
    academic: number;
    relationships: number;
    sports: number;
    faith: number;
    everyday: number;
  };
}
