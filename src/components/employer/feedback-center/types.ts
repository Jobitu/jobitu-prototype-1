export interface Feedback {
  id: string;
  candidateName: string;
  candidateEmail: string;
  candidateAvatar?: string;
  jobTitle: string;
  jobId: string;
  status: 'pending' | 'draft' | 'ready' | 'sent';
  type: 'quick' | 'detailed';
  content: string;
  skillRatings: SkillRating[];
  aiSuggested: boolean;
  aiSuggestionText?: string;
  language: 'EN' | 'TR' | 'AUTO';
  owner: string;
  createdAt: string;
  lastEditedAt: string;
  sentAt?: string;
  rejectionReason: 'skill_gaps' | 'experience_level' | 'cultural_fit' | 'assessment_performance' | 'other';
  growthCenterExported: boolean;
  exportedSkills?: string[];
  notes?: string;
  template?: string;
}

export interface SkillRating {
  skillId: string;
  skillName: string;
  category: SkillCategory;
  rating: number; // 1-5 scale
  comment?: string;
  isRequired: boolean;
}

export type SkillCategory = 
  | 'technical' 
  | 'communication' 
  | 'problem_solving' 
  | 'leadership' 
  | 'time_management' 
  | 'teamwork' 
  | 'adaptability' 
  | 'cultural_fit';

export interface FeedbackTemplate {
  id: string;
  name: string;
  description: string;
  content: string;
  language: 'EN' | 'TR';
  tone: 'professional' | 'friendly' | 'formal';
  category: 'rejection' | 'positive' | 'constructive';
  isDefault: boolean;
  createdBy: string;
  createdAt: string;
  usageCount: number;
  skillCategories: SkillCategory[];
}

export interface FeedbackAnalytics {
  totalFeedbacks: number;
  averageRatings: Record<string, number>;
  commonSkillGaps: SkillGap[];
  feedbackDepthRatio: {
    detailed: number;
    quick: number;
  };
  languageDistribution: Record<string, number>;
  monthlyTrends: MonthlyFeedbackData[];
  benchmarkData?: BenchmarkData;
}

export interface SkillGap {
  skillName: string;
  category: SkillCategory;
  percentage: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  companyAverage: number;
  marketAverage?: number;
}

export interface MonthlyFeedbackData {
  month: string;
  feedbackCount: number;
  averageRating: number;
  topSkillGaps: string[];
}

export interface BenchmarkData {
  companySize: string;
  industry: string;
  region: string;
  averageRatings: Record<string, number>;
  commonSkillGaps: string[];
  feedbackResponseRate: number;
}

export interface AISettings {
  autoGenerateEnabled: boolean;
  suggestionStyle: 'constructive' | 'direct' | 'encouraging';
  includeSpecificExamples: boolean;
  minimumFeedbackLength: number;
  language: 'EN' | 'TR' | 'AUTO';
  tone: 'professional' | 'friendly' | 'formal';
}

export interface FeedbackFilters {
  search: string;
  jobId: string;
  status: string;
  language: string;
  dateRange: {
    start?: string;
    end?: string;
  };
  owner: string;
  rejectionReason: string;
}

export interface PendingCandidate {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  jobTitle: string;
  jobId: string;
  rejectedAt: string;
  rejectedBy: string;
  applicationId: string;
  assessmentScore?: number;
  interviewScore?: number;
  hasExistingFeedback: boolean;
  priority: 'high' | 'medium' | 'low';
}