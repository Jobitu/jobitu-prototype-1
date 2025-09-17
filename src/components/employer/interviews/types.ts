export interface Interview {
  id: string;
  candidateName: string;
  candidateEmail: string;
  candidateAvatar: string;
  candidatePhone?: string;
  jobTitle: string;
  jobId: string;
  date: string;
  time: string;
  duration: number;
  type: 'online' | 'in-person' | 'phone';
  status: 'scheduled' | 'completed' | 'cancelled';
  meetingLink?: string;
  location?: string;
  interviewers: Array<{
    name: string;
    role: string;
    avatar?: string;
    email?: string;
  }>;
  outcome?: 'hired' | 'rejected' | 'pending';
  feedback?: {
    rating: number;
    notes: string;
    recommendation: 'hire' | 'reject' | 'pending';
  };
  preparationMaterials?: Array<{
    name: string;
    type: 'pdf' | 'video' | 'link' | 'article';
    url: string;
    description: string;
  }>;
  agenda?: string;
  suggestedQuestions?: string[];
}

export interface PreparationResource {
  id: string;
  name: string;
  type: 'template' | 'checklist' | 'guideline';
  description: string;
  content: string;
  category: string;
}