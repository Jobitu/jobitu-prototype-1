import { Badge } from "../../ui/badge";
import { 
  Code,
  Brain,
  TrendingUp,
  Palette,
  CheckCircle
} from "lucide-react";

export interface Assessment {
  id: string;
  title: string;
  type: 'coding' | 'case-study' | 'marketing' | 'design' | 'multiple-choice';
  description: string;
  duration: number;
  totalPoints: number;
  questions: number;
  candidatesCompleted: number;
  averageScore: number;
  passRate: number;
  status: 'ongoing' | 'completed' | 'published' | 'draft';
  createdDate: string;
  skillTags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  lastUpdated: string;
  owner: string;
}

export interface MarketplaceItem {
  id: string;
  title: string;
  type: 'coding' | 'case-study' | 'design' | 'multiple-choice';
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  rating: number;
  reviewCount: number;
  price: number;
  currency: string;
  seller: {
    name: string;
    avatar: string;
    organization: string;
  };
  skillTags: string[];
  description: string;
  sampleQuestions: number;
  licenseType: 'per-candidate' | 'unlimited' | 'time-based';
}

export interface LibraryItem {
  id: string;
  title: string;
  type: 'coding' | 'case-study' | 'design' | 'multiple-choice';
  skillTags: string[];
  licenseInfo: string;
  purchaseDate: string;
  seller: {
    name: string;
    organization: string;
  };
  usageCount: number;
  maxUsage?: number;
}

// Mock data
export const mockAssessments: Assessment[] = [
  {
    id: '1',
    title: 'Frontend Developer Assessment',
    type: 'coding',
    description: 'Comprehensive evaluation of React, JavaScript, and CSS skills',
    duration: 120,
    totalPoints: 100,
    questions: 8,
    candidatesCompleted: 24,
    averageScore: 78,
    passRate: 83,
    status: 'ongoing',
    createdDate: '2024-01-15',
    lastUpdated: '2024-01-24',
    owner: 'Sarah Miller',
    skillTags: ['React', 'JavaScript', 'CSS', 'HTML'],
    difficulty: 'intermediate'
  },
  {
    id: '2',
    title: 'Product Strategy Case Study',
    type: 'case-study',
    description: 'Analyze market conditions and propose product strategy',
    duration: 180,
    totalPoints: 150,
    questions: 5,
    candidatesCompleted: 42,
    averageScore: 85,
    passRate: 92,
    status: 'completed',
    createdDate: '2024-01-12',
    lastUpdated: '2024-01-20',
    owner: 'Mike Chen',
    skillTags: ['Strategy', 'Analytics', 'Market Research'],
    difficulty: 'advanced'
  },
  {
    id: '3',
    title: 'UX Design Challenge',
    type: 'design',
    description: 'Design a mobile app interface for a given user scenario',
    duration: 240,
    totalPoints: 120,
    questions: 4,
    candidatesCompleted: 0,
    averageScore: 0,
    passRate: 0,
    status: 'draft',
    createdDate: '2024-01-25',
    lastUpdated: '2024-01-25',
    owner: 'Lisa Park',
    skillTags: ['UI/UX', 'Figma', 'User Research'],
    difficulty: 'intermediate'
  }
];

export const mockMarketplaceItems: MarketplaceItem[] = [
  {
    id: '1',
    title: 'Advanced React Coding Assessment',
    type: 'coding',
    duration: 180,
    difficulty: 'advanced',
    rating: 4.8,
    reviewCount: 156,
    price: 89,
    currency: 'USD',
    seller: {
      name: 'TechExpert Solutions',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
      organization: 'TechExpert Solutions Inc.'
    },
    skillTags: ['React', 'TypeScript', 'Redux', 'Testing'],
    description: 'Comprehensive React assessment with real-world scenarios and advanced patterns',
    sampleQuestions: 3,
    licenseType: 'per-candidate'
  },
  {
    id: '2',
    title: 'Product Management Case Study',
    type: 'case-study',
    duration: 240,
    difficulty: 'intermediate',
    rating: 4.6,
    reviewCount: 89,
    price: 149,
    currency: 'USD',
    seller: {
      name: 'PM Academy',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop',
      organization: 'PM Academy Ltd.'
    },
    skillTags: ['Product Strategy', 'Analytics', 'User Research', 'Roadmapping'],
    description: 'Real-world product management scenarios and strategic thinking challenges',
    sampleQuestions: 2,
    licenseType: 'unlimited'
  }
];

export const mockLibraryItems: LibraryItem[] = [
  {
    id: '1',
    title: 'JavaScript Fundamentals Test',
    type: 'coding',
    skillTags: ['JavaScript', 'ES6', 'DOM'],
    licenseInfo: 'Unlimited use until Jan 2025',
    purchaseDate: '2024-01-15',
    seller: {
      name: 'CodeMaster',
      organization: 'CodeMaster Inc.'
    },
    usageCount: 12,
    maxUsage: undefined
  }
];

export const typeIcons = {
  coding: <Code className="h-4 w-4" />,
  'case-study': <Brain className="h-4 w-4" />,
  marketing: <TrendingUp className="h-4 w-4" />,
  design: <Palette className="h-4 w-4" />,
  'multiple-choice': <CheckCircle className="h-4 w-4" />
};

export const difficultyColors = {
  beginner: 'bg-green-100 text-green-800 border-green-200',
  intermediate: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  advanced: 'bg-red-100 text-red-800 border-red-200'
};

export const getStatusBadge = (status: string) => {
  const statusConfig = {
    ongoing: { color: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Ongoing' },
    completed: { color: 'bg-green-100 text-green-800 border-green-200', label: 'Completed' },
    published: { color: 'bg-green-100 text-green-800 border-green-200', label: 'Published' },
    draft: { color: 'bg-gray-100 text-gray-800 border-gray-200', label: 'Draft' }
  };
  
  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
  return (
    <Badge className={config.color} variant="outline">
      {config.label}
    </Badge>
  );
};