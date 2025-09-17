export interface Application {
  id: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone?: string;
  candidateAvatar: string;
  candidateLocation?: string;
  candidateSkills: string[];
  candidateSummary: string;
  jobTitle: string;
  jobId: string;
  applicationDate: string;
  status: 'new' | 'screening' | 'assessment' | 'interview' | 'offer' | 'hired' | 'rejected' | 'withdrawn';
  source: 'job_board' | 'direct' | 'referral' | 'talent_search';
  matchScore?: number;
  lastActivity: string;
  assignedRecruiter?: string;
  
  // Assessment data
  assessmentResults?: {
    score: number;
    maxScore: number;
    completedDate: string;
    status: 'completed' | 'in-progress' | 'not-started';
  };
  
  // Artifacts
  artifacts: Array<{
    id: string;
    name: string;
    type: 'resume' | 'test' | 'case_study' | 'screening_questions' | 'portfolio';
    status: 'pending' | 'submitted' | 'scored';
    score?: number;
    url?: string;
    submittedDate?: string;
  }>;
  
  // Interview data
  interviews: Array<{
    id: string;
    date: string;
    time: string;
    type: 'phone' | 'video' | 'in_person';
    interviewer: string;
    status: 'scheduled' | 'completed' | 'cancelled';
    feedback?: string;
  }>;
  
  // Internal evaluation
  internalRating?: number;
  internalNotes?: string;
  
  // Timeline
  timeline: Array<{
    id: string;
    stage: string;
    date: string;
    description: string;
    user: string;
  }>;
}

export interface EmployerApplicationsPageProps {
  onViewFullProfile?: (applicationId: string) => void;
}

export interface TabProps {
  applications: Application[];
  onViewApplication: (application: Application) => void;
  formatDate?: (dateStr: string) => string;
  getStatusBadge?: (status: string) => JSX.Element;
  getSourceBadge?: (source: string) => JSX.Element | null;
  selectedApplications?: string[];
  onSelectApplication?: (id: string, selected: boolean) => void;
  onSelectAll?: (selected: boolean) => void;
}