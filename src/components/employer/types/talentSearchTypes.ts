export interface Candidate {
  id: string;
  name: string;
  title: string;
  location: string;
  avatar: string;
  skills: string[];
  experience: string;
  education: string;
  availability: 'Immediately' | 'Within 2 weeks' | 'Within a month' | 'Not actively looking';
  matchPercentage: number;
  isBookmarked: boolean;
  lastActive: string;
  portfolio?: string;
  github?: string;
  linkedin?: string;
  email: string;
  phone?: string;
  bio: string;
  salaryRange: {
    min: number;
    max: number;
    currency: string;
  };
  remotePreference: 'Remote only' | 'Hybrid' | 'On-site' | 'Flexible';
  languages: string[];
  certifications: string[];
  source: string;
  stage?: 'Applied' | 'Screened' | 'Phone Screen' | 'Interview' | 'Offer' | 'Hired' | 'Rejected';
  flagged?: boolean;
  flagReason?: string;
  notes?: string;
  dateAdded: string;
}

export interface Shortlist {
  id: string;
  name: string;
  description: string;
  candidateCount: number;
  lastUpdated: string;
  isShared: boolean;
  owner: string;
  candidates: string[]; // candidate IDs
}

export interface Campaign {
  id: string;
  name: string;
  description: string;
  status: 'Draft' | 'Running' | 'Paused' | 'Completed';
  recipients: number;
  openRate: number;
  replyRate: number;
  startDate: string;
  endDate?: string;
  messageTemplate: string;
  targetList: string; // shortlist ID
  schedule?: {
    frequency: 'Immediate' | 'Daily' | 'Weekly';
    maxPerDay?: number;
  };
}

export interface Assessment {
  id: string;
  name: string;
  type: 'Coding' | 'MCQ' | 'Case Study' | 'Behavioral';
  duration: number;
  passThreshold: number;
  description: string;
  questions: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  passRate: number;
  totalAttempts: number;
}

export interface PipelineStage {
  id: string;
  name: string;
  color: string;
  candidates: Candidate[];
}