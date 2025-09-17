// Phase 2: Assessment & Testing Mock Data for Jobitu
export interface AssessmentQuestion {
  id: string;
  type: 'multiple-choice' | 'coding' | 'essay' | 'file-upload';
  question: string;
  options?: string[];
  correctAnswer?: string | number;
  points: number;
  timeLimit?: number; // in minutes
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface CandidateAssessment {
  // Add missing properties for compatibility
  companyName?: string;
  passingScore?: number;
  timeTaken?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  expiresAt?: string;
  completedAt?: string;
  id: string;
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  jobId: string;
  jobTitle: string;
  assessmentType: 'technical' | 'behavioral' | 'case-study' | 'mixed';
  status: 'not-started' | 'in-progress' | 'completed' | 'submitted' | 'under-review' | 'graded';
  startedAt?: string;
  submittedAt?: string;
  timeSpent?: number; // in minutes
  totalTimeAllowed: number; // in minutes
  
  // Assessment Details
  questions: AssessmentQuestion[];
  answers?: Record<string, any>;
  score?: number;
  maxScore: number;
  percentage?: number;
  
  // Anti-cheat & Monitoring
  suspiciousActivity: {
    tabSwitches: number;
    copyPasteAttempts: number;
    rightClickAttempts: number;
    fullscreenExits: number;
    unusualTypingPatterns: boolean;
    multipleIpAddresses: string[];
    timeAnomalies: boolean;
  };
  
  // AI Detection Results
  aiDetection?: {
    plagiarismScore: number; // 0-100
    aiGeneratedProbability: number; // 0-100
    similarSubmissions: string[];
    flaggedSections: Array<{
      section: string;
      confidence: number;
      reason: string;
    }>;
  };
  
  // Feedback & Review
  feedback?: {
    overall: string;
    strengths: string[];
    improvements: string[];
    detailedScores: Record<string, number>;
  };
  
  reviewedBy?: string;
  reviewedAt?: string;
}

export interface CaseStudySubmission {
  id: string;
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  jobId: string;
  jobTitle: string;
  caseStudyTitle: string;
  description: string;
  
  status: 'assigned' | 'in-progress' | 'submitted' | 'under-review' | 'graded';
  assignedAt: string;
  dueDate: string;
  submittedAt?: string;
  
  // Submission Files
  files: Array<{
    name: string;
    url: string;
    type: string;
    size: number;
    uploadedAt: string;
  }>;
  
  // Written Response
  writtenResponse?: string;
  
  // Scoring
  score?: number;
  maxScore: number;
  criteria: Array<{
    name: string;
    score?: number;
    maxScore: number;
    feedback?: string;
  }>;
  
  // AI Analysis
  aiAnalysis?: {
    originalityScore: number;
    complexityScore: number;
    qualityScore: number;
    plagiarismFlags: Array<{
      source: string;
      similarity: number;
      section: string;
    }>;
    aiGeneratedContent: Array<{
      section: string;
      probability: number;
      reasoning: string;
    }>;
  };
  
  // Review
  reviewedBy?: string;
  reviewedAt?: string;
  feedback?: string;
}

// Mock Assessment Questions
export const mockTechnicalQuestions: AssessmentQuestion[] = [
  {
    id: 'q1',
    type: 'multiple-choice',
    question: 'Which of the following is NOT a JavaScript primitive type?',
    options: ['string', 'number', 'array', 'boolean'],
    correctAnswer: 2,
    points: 5,
    difficulty: 'easy'
  },
  {
    id: 'q2',
    type: 'coding',
    question: 'Write a function that returns the factorial of a given number.',
    points: 15,
    timeLimit: 20,
    difficulty: 'medium'
  },
  {
    id: 'q3',
    type: 'multiple-choice',
    question: 'What is the time complexity of binary search?',
    options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
    correctAnswer: 1,
    points: 10,
    difficulty: 'medium'
  },
  {
    id: 'q4',
    type: 'coding',
    question: 'Implement a function to reverse a linked list.',
    points: 25,
    timeLimit: 30,
    difficulty: 'hard'
  }
];

// Mock Candidate Assessments with Various Scenarios
export const mockCandidateAssessments: CandidateAssessment[] = [
  // Scenario 1: Not Started
  {
    id: 'assess-001',
    candidateId: 'cand-001',
    candidateName: 'Sarah Chen',
    candidateEmail: 'sarah.chen@email.com',
    jobId: 'job-001',
    jobTitle: 'Senior Frontend Developer',
    assessmentType: 'technical',
    status: 'not-started',
    totalTimeAllowed: 90,
    questions: mockTechnicalQuestions,
    answers: {},
    maxScore: 55,
    suspiciousActivity: {
      tabSwitches: 0,
      copyPasteAttempts: 0,
      rightClickAttempts: 0,
      fullscreenExits: 0,
      unusualTypingPatterns: false,
      multipleIpAddresses: [],
      timeAnomalies: false
    }
  },
  
  // Scenario 2: Completed Successfully
  {
    id: 'assess-002',
    candidateId: 'cand-002',
    candidateName: 'Marcus Johnson',
    candidateEmail: 'marcus.johnson@email.com',
    jobId: 'job-001',
    jobTitle: 'Senior Frontend Developer',
    assessmentType: 'technical',
    status: 'graded',
    startedAt: '2024-01-20T09:00:00Z',
    submittedAt: '2024-01-20T10:15:00Z',
    timeSpent: 75,
    totalTimeAllowed: 90,
    questions: mockTechnicalQuestions,
    answers: {
      'q1': 2,
      'q2': 'function factorial(n) { return n <= 1 ? 1 : n * factorial(n - 1); }',
      'q3': 1,
      'q4': 'function reverseList(head) { let prev = null; let current = head; while (current) { let next = current.next; current.next = prev; prev = current; current = next; } return prev; }'
    },
    score: 50,
    maxScore: 55,
    percentage: 91,
    suspiciousActivity: {
      tabSwitches: 2,
      copyPasteAttempts: 0,
      rightClickAttempts: 1,
      fullscreenExits: 0,
      unusualTypingPatterns: false,
      multipleIpAddresses: ['192.168.1.100'],
      timeAnomalies: false
    },
    feedback: {
      overall: 'Excellent performance with strong problem-solving skills and clean code implementation.',
      strengths: ['Efficient algorithms', 'Clean code structure', 'Good time management'],
      improvements: ['Could add more edge case handling', 'Consider code comments'],
      detailedScores: {
        'Problem Solving': 9,
        'Code Quality': 8,
        'Efficiency': 9,
        'Best Practices': 8
      }
    },
    reviewedBy: 'John Smith',
    reviewedAt: '2024-01-20T14:30:00Z'
  },
  
  // Scenario 3: Suspicious Cheating Behavior
  {
    id: 'assess-003',
    candidateId: 'cand-003',
    candidateName: 'Alex Rodriguez',
    candidateEmail: 'alex.rodriguez@email.com',
    jobId: 'job-002',
    jobTitle: 'Full Stack Developer',
    assessmentType: 'technical',
    status: 'under-review',
    startedAt: '2024-01-21T14:00:00Z',
    submittedAt: '2024-01-21T15:45:00Z',
    timeSpent: 105,
    totalTimeAllowed: 120,
    questions: mockTechnicalQuestions,
    answers: {
      'q1': 2,
      'q2': 'function factorial(n) { if (n === 0 || n === 1) return 1; return n * factorial(n - 1); }',
      'q3': 1,
      'q4': 'class ListNode { constructor(val) { this.val = val; this.next = null; } } function reverseList(head) { let prev = null; let curr = head; while (curr !== null) { let nextTemp = curr.next; curr.next = prev; prev = curr; curr = nextTemp; } return prev; }'
    },
    score: 48,
    maxScore: 55,
    percentage: 87,
    suspiciousActivity: {
      tabSwitches: 47,
      copyPasteAttempts: 23,
      rightClickAttempts: 15,
      fullscreenExits: 8,
      unusualTypingPatterns: true,
      multipleIpAddresses: ['192.168.1.50', '10.0.0.15'],
      timeAnomalies: true
    },
    feedback: {
      overall: 'High suspicious activity detected. Manual review required before final scoring.',
      strengths: ['Correct solutions provided'],
      improvements: ['Integrity concerns due to suspicious behavior patterns'],
      detailedScores: {
        'Technical Score': 8,
        'Integrity Score': 2,
        'Overall': 5
      }
    },
    reviewedBy: 'Jane Doe',
    reviewedAt: '2024-01-21T16:00:00Z'
  },
  
  // Scenario 4: In Progress
  {
    id: 'assess-004',
    candidateId: 'cand-004',
    candidateName: 'Emily Davis',
    candidateEmail: 'emily.davis@email.com',
    jobId: 'job-003',
    jobTitle: 'Backend Developer',
    assessmentType: 'technical',
    status: 'in-progress',
    startedAt: '2024-01-22T10:30:00Z',
    timeSpent: 45,
    totalTimeAllowed: 90,
    questions: mockTechnicalQuestions,
    answers: {
      'q1': 2,
      'q2': 'function factorial(n) { // Working on this...'
    },
    maxScore: 55,
    suspiciousActivity: {
      tabSwitches: 3,
      copyPasteAttempts: 0,
      rightClickAttempts: 0,
      fullscreenExits: 1,
      unusualTypingPatterns: false,
      multipleIpAddresses: ['192.168.1.75'],
      timeAnomalies: false
    }
  }
];

// Mock Case Study Submissions
export const mockCaseStudySubmissions: CaseStudySubmission[] = [
  // Scenario 1: High Quality Submission
  {
    id: 'case-001',
    candidateId: 'cand-002',
    candidateName: 'Marcus Johnson',
    candidateEmail: 'marcus.johnson@email.com',
    jobId: 'job-001',
    jobTitle: 'Senior Frontend Developer',
    caseStudyTitle: 'E-commerce Dashboard Design',
    description: 'Design and implement a responsive e-commerce dashboard with real-time analytics.',
    status: 'graded',
    assignedAt: '2024-01-20T10:30:00Z',
    dueDate: '2024-01-23T23:59:59Z',
    submittedAt: '2024-01-22T18:45:00Z',
    files: [
      {
        name: 'dashboard-design.figma',
        url: '/files/dashboard-design.figma',
        type: 'application/figma',
        size: 2048000,
        uploadedAt: '2024-01-22T18:40:00Z'
      },
      {
        name: 'implementation.zip',
        url: '/files/implementation.zip',
        type: 'application/zip',
        size: 5120000,
        uploadedAt: '2024-01-22T18:45:00Z'
      }
    ],
    writtenResponse: 'I approached this case study by first analyzing the user requirements and creating user personas. The dashboard focuses on providing clear insights while maintaining excellent UX. I used React with TypeScript for the implementation, ensuring scalability and maintainability.',
    score: 92,
    maxScore: 100,
    criteria: [
      { name: 'Design Quality', score: 95, maxScore: 100, feedback: 'Excellent visual hierarchy and user experience' },
      { name: 'Technical Implementation', score: 90, maxScore: 100, feedback: 'Clean code with good architecture' },
      { name: 'Innovation', score: 88, maxScore: 100, feedback: 'Creative solutions to complex problems' },
      { name: 'Documentation', score: 95, maxScore: 100, feedback: 'Comprehensive and clear documentation' }
    ],
    aiAnalysis: {
      originalityScore: 95,
      complexityScore: 88,
      qualityScore: 92,
      plagiarismFlags: [],
      aiGeneratedContent: []
    },
    reviewedBy: 'Sarah Wilson',
    reviewedAt: '2024-01-23T09:15:00Z',
    feedback: 'Outstanding work! The candidate demonstrated excellent design thinking and technical skills. The solution is both innovative and practical.'
  },
  
  // Scenario 2: AI-Detected Plagiarism
  {
    id: 'case-002',
    candidateId: 'cand-005',
    candidateName: 'David Kim',
    candidateEmail: 'david.kim@email.com',
    jobId: 'job-002',
    jobTitle: 'Full Stack Developer',
    caseStudyTitle: 'Social Media Analytics Platform',
    description: 'Build a platform for analyzing social media engagement and trends.',
    status: 'under-review',
    assignedAt: '2024-01-21T09:00:00Z',
    dueDate: '2024-01-24T23:59:59Z',
    submittedAt: '2024-01-23T22:30:00Z',
    files: [
      {
        name: 'analytics-platform.zip',
        url: '/files/analytics-platform.zip',
        type: 'application/zip',
        size: 3072000,
        uploadedAt: '2024-01-23T22:30:00Z'
      }
    ],
    writtenResponse: 'For this social media analytics platform, I implemented a comprehensive solution using modern web technologies. The platform provides real-time data processing and visualization capabilities with an intuitive user interface.',
    score: 0, // Pending due to plagiarism
    maxScore: 100,
    criteria: [
      { name: 'Originality', score: 0, maxScore: 100, feedback: 'Significant plagiarism detected' },
      { name: 'Technical Implementation', maxScore: 100, feedback: 'Under review due to integrity concerns' },
      { name: 'Problem Solving', maxScore: 100, feedback: 'Under review due to integrity concerns' }
    ],
    aiAnalysis: {
      originalityScore: 15,
      complexityScore: 75,
      qualityScore: 45,
      plagiarismFlags: [
        {
          source: 'GitHub Repository: social-analytics-dashboard',
          similarity: 87,
          section: 'Main component structure and API integration'
        },
        {
          source: 'Tutorial: Building Analytics Dashboards',
          similarity: 92,
          section: 'Data visualization components'
        }
      ],
      aiGeneratedContent: [
        {
          section: 'Written response',
          probability: 89,
          reasoning: 'Generic language patterns typical of AI-generated content'
        },
        {
          section: 'Code comments',
          probability: 76,
          reasoning: 'Inconsistent commenting style suggesting AI assistance'
        }
      ]
    },
    reviewedBy: 'Michael Brown',
    reviewedAt: '2024-01-24T08:00:00Z',
    feedback: 'Significant integrity concerns. Multiple instances of plagiarism detected from online sources. Requires further investigation.'
  },
  
  // Scenario 3: Not Yet Submitted
  {
    id: 'case-003',
    candidateId: 'cand-001',
    candidateName: 'Sarah Chen',
    candidateEmail: 'sarah.chen@email.com',
    jobId: 'job-001',
    jobTitle: 'Senior Frontend Developer',
    caseStudyTitle: 'Mobile App Redesign Challenge',
    description: 'Redesign a mobile banking app to improve user experience and accessibility.',
    status: 'assigned',
    assignedAt: '2024-01-22T14:00:00Z',
    dueDate: '2024-01-25T23:59:59Z',
    files: [],
    maxScore: 100,
    criteria: [
      { name: 'User Experience Design', maxScore: 100 },
      { name: 'Accessibility Compliance', maxScore: 100 },
      { name: 'Visual Design', maxScore: 100 },
      { name: 'Presentation Quality', maxScore: 100 }
    ]
  }
];

// Assessment Templates for Different Job Types
export const assessmentTemplates = {
  'frontend-developer': {
    technical: {
      duration: 90,
      questions: [
        'JavaScript fundamentals',
        'React/Vue component design',
        'CSS layout challenges',
        'Performance optimization'
      ]
    },
    caseStudy: {
      title: 'Interactive Dashboard Design',
      duration: '3 days',
      description: 'Design and implement a responsive dashboard with data visualization'
    }
  },
  'backend-developer': {
    technical: {
      duration: 120,
      questions: [
        'Algorithm design',
        'Database optimization',
        'API architecture',
        'System design'
      ]
    },
    caseStudy: {
      title: 'Scalable API Design',
      duration: '3 days',
      description: 'Design a RESTful API for a high-traffic application'
    }
  },
  'fullstack-developer': {
    technical: {
      duration: 150,
      questions: [
        'Full-stack architecture',
        'Database design',
        'Frontend frameworks',
        'DevOps basics'
      ]
    },
    caseStudy: {
      title: 'End-to-End Application',
      duration: '5 days',
      description: 'Build a complete web application with frontend and backend'
    }
  }
};

// Export the main data arrays
export const candidateAssessments = mockCandidateAssessments;
export const candidateCaseStudies = mockCaseStudySubmissions;

export const assessmentStats = {
  totalAssessments: mockCandidateAssessments.length,
  completedAssessments: mockCandidateAssessments.filter(a => a.status === 'graded').length,
  inProgressAssessments: mockCandidateAssessments.filter(a => a.status === 'in-progress').length,
  suspiciousSubmissions: mockCandidateAssessments.filter(a => 
    a.suspiciousActivity.tabSwitches > 20 || 
    a.suspiciousActivity.copyPasteAttempts > 10
  ).length,
  averageScore: mockCandidateAssessments
    .filter(a => a.score !== undefined)
    .reduce((sum, a) => sum + (a.percentage || 0), 0) / 
    mockCandidateAssessments.filter(a => a.score !== undefined).length,
  
  caseStudyStats: {
    totalSubmissions: mockCaseStudySubmissions.length,
    gradedSubmissions: mockCaseStudySubmissions.filter(c => c.status === 'graded').length,
    plagiarismDetected: mockCaseStudySubmissions.filter(c => 
      c.aiAnalysis && c.aiAnalysis.originalityScore < 50
    ).length,
    averageScore: mockCaseStudySubmissions
      .filter(c => c.score !== undefined && c.score > 0)
      .reduce((sum, c) => sum + c.score!, 0) / 
      mockCaseStudySubmissions.filter(c => c.score !== undefined && c.score > 0).length
  }
};
