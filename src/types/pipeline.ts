// 5-Stage Pipeline Types for Jobitu
export type ApplicationStage = 'applied' | 'qualified' | 'interview' | 'final_review' | 'passed' | 'rejected';

export interface PipelineApplication {
  id: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone?: string;
  candidateAvatar?: string;
  candidateLocation: string;
  candidateSkills: string[];
  candidateSummary: string;
  jobTitle: string;
  jobId: string;
  applicationDate: string;
  lastActivity: string;
  stage: ApplicationStage;
  source: 'job_board' | 'referral' | 'direct' | 'smart_match';
  matchScore: number;
  assignedRecruiter?: string;
  
  // Stage-specific data
  stageData: {
    applied?: {
      hasAssignedTests: boolean;
      assignedTests: string[];
      assignedCaseStudies: string[];
    };
    qualified?: {
      testsCompleted: boolean;
      testScores: { testName: string; score: number; maxScore: number }[];
      caseStudySubmitted: boolean;
      qualificationDate: string;
    };
    interview?: {
      interviewScheduled: boolean;
      interviewDate?: string;
      interviewTime?: string;
      interviewType: 'video' | 'phone' | 'in_person';
      interviewer?: string;
      interviewCompleted?: boolean;
      interviewNotes?: string;
    };
    final_review?: {
      reviewStartDate: string;
      reviewerNotes: string[];
      finalScore?: number;
      recommendation?: 'advance' | 'reject';
    };
    passed?: {
      passedDate: string;
      handoverStatus: 'pending' | 'completed';
      companyContact?: string;
      nextSteps: string[];
    };
  };
  
  // Timeline tracking
  timeline: Array<{
    id: string;
    stage: ApplicationStage;
    date: string;
    description: string;
    user: string;
    automated?: boolean;
  }>;
  
  // Rejection data (if applicable)
  rejection?: {
    rejectedAt: ApplicationStage;
    rejectedDate: string;
    reason: string;
    feedback: string;
    rejectedBy: string;
  };
}

export interface PipelineStats {
  totalApplications: number;
  byStage: {
    applied: number;
    qualified: number;
    interview: number;
    final_review: number;
    passed: number;
    rejected: number;
  };
  conversionRates: {
    appliedToQualified: number;
    qualifiedToInterview: number;
    interviewToFinalReview: number;
    finalReviewToPassed: number;
  };
  averageTimeInStage: {
    applied: number; // days
    qualified: number;
    interview: number;
    final_review: number;
  };
}
