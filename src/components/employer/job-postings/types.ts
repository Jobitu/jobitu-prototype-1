// Enhanced Interfaces for Job Postings
export interface JobPosting {
  id: string;
  title: string;
  shortId: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Freelance';
  status: 'Live' | 'Draft' | 'Paused' | 'Scheduled' | 'Expired' | 'Closed';
  applications: number;
  avgMatch: number;
  views: number;
  postedDate: string;
  expiryDate?: string;
  hiringStage: string;
  owner: string;
  department: string;
  tags: string[];
  description: string;
  requirements: string[];
  benefits: string[];
  salaryRange: {
    min: number;
    max: number;
    currency: string;
  };
  remote: boolean;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  avatar: string;
  jobId: string;
  jobTitle: string;
  stage: 'Applied' | 'Screened' | 'Phone' | 'Interview' | 'Offer' | 'Hired' | 'Rejected';
  matchScore: number;
  appliedDate: string;
  source: string;
  flagged?: boolean;
  flagReason?: string;
  notes?: string;
  resumeUrl?: string;
  portfolioUrl?: string;
}

export interface Campaign {
  id: string;
  name: string;
  jobId: string;
  jobTitle: string;
  budget: number;
  spend: number;
  impressions: number;
  clicks: number;
  applications: number;
  cpc: number;
  status: 'Active' | 'Paused' | 'Completed' | 'Draft';
  channels: string[];
  startDate: string;
  endDate: string;
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
}

export interface Template {
  id: string;
  name: string;
  description: string;
  type: 'Job Description' | 'Campaign' | 'Email';
  content: string;
  category: string;
  usageCount: number;
  lastUsed: string;
  isPublic: boolean;
}

export interface Channel {
  id: string;
  name: string;
  type: 'Job Board' | 'Social' | 'Company' | 'Referral';
  connected: boolean;
  lastPosted?: string;
  impressions: number;
  applyRate: number;
  cost: number;
  logo: string;
}

export interface JobPostingsProps {
  onViewJob?: (jobId: string) => void;
  onEditJob?: (jobId: string) => void;
}
</parameter>
</invoke