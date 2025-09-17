import { Feedback, FeedbackTemplate, PendingCandidate, FeedbackAnalytics, SkillGap } from './types';

export const mockPendingCandidates: PendingCandidate[] = [
  {
    id: 'PC-001',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop',
    jobTitle: 'Frontend Developer',
    jobId: 'JOB-001',
    rejectedAt: '2025-01-22',
    rejectedBy: 'Arda Kara',
    applicationId: 'APP-001',
    assessmentScore: 65,
    interviewScore: 70,
    hasExistingFeedback: false,
    priority: 'high'
  },
  {
    id: 'PC-002',
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    jobTitle: 'Data Scientist',
    jobId: 'JOB-002',
    rejectedAt: '2025-01-21',
    rejectedBy: 'Sarah Miller',
    applicationId: 'APP-002',
    assessmentScore: 58,
    hasExistingFeedback: false,
    priority: 'medium'
  },
  {
    id: 'PC-003',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@email.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    jobTitle: 'Backend Developer',
    jobId: 'JOB-003',
    rejectedAt: '2025-01-20',
    rejectedBy: 'Alex Johnson',
    applicationId: 'APP-003',
    assessmentScore: 72,
    interviewScore: 68,
    hasExistingFeedback: true,
    priority: 'low'
  }
];

export const mockFeedbacks: Feedback[] = [
  {
    id: 'FB-001',
    candidateName: 'Jane Doe',
    candidateEmail: 'jane.doe@email.com',
    jobTitle: 'Frontend Engineer',
    jobId: 'JOB-001',
    status: 'draft',
    type: 'detailed',
    content: 'Thank you for your interest in the Frontend Engineer position. While your application showed promise, we identified some areas where your experience doesn\'t fully align with our current requirements...',
    skillRatings: [
      {
        skillId: 'react',
        skillName: 'React Development',
        category: 'technical',
        rating: 3,
        comment: 'Good understanding of basics, but lacks advanced patterns',
        isRequired: true
      },
      {
        skillId: 'communication',
        skillName: 'Communication',
        category: 'communication',
        rating: 4,
        comment: 'Clear and articulate during interviews',
        isRequired: true
      }
    ],
    aiSuggested: true,
    aiSuggestionText: 'Based on the assessment results, consider highlighting specific areas for improvement in React state management and component optimization.',
    language: 'EN',
    owner: 'Burak',
    createdAt: '2025-01-22',
    lastEditedAt: '2025-01-22',
    rejectionReason: 'skill_gaps',
    growthCenterExported: false,
    notes: 'Candidate showed strong potential, consider for future opportunities'
  },
  {
    id: 'FB-002',
    candidateName: 'Michael Chen',
    candidateEmail: 'michael.chen@email.com',
    jobTitle: 'Data Scientist',
    jobId: 'JOB-002',
    status: 'ready',
    type: 'detailed',
    content: 'We appreciate your application for the Data Scientist position. After careful review of your background and assessment results...',
    skillRatings: [
      {
        skillId: 'python',
        skillName: 'Python Programming',
        category: 'technical',
        rating: 4,
        comment: 'Strong programming skills demonstrated',
        isRequired: true
      },
      {
        skillId: 'ml',
        skillName: 'Machine Learning',
        category: 'technical',
        rating: 2,
        comment: 'Basic understanding, needs more practical experience',
        isRequired: true
      }
    ],
    aiSuggested: true,
    language: 'EN',
    owner: 'Arda',
    createdAt: '2025-01-21',
    lastEditedAt: '2025-01-21',
    rejectionReason: 'experience_level',
    growthCenterExported: true,
    exportedSkills: ['Machine Learning', 'Statistical Analysis']
  },
  {
    id: 'FB-003',
    candidateName: 'John Smith',
    candidateEmail: 'john.smith@email.com',
    jobTitle: 'Product Manager',
    jobId: 'JOB-004',
    status: 'sent',
    type: 'quick',
    content: 'Thank you for your interest in our Product Manager role. While we were impressed with your experience...',
    skillRatings: [
      {
        skillId: 'strategy',
        skillName: 'Strategic Thinking',
        category: 'leadership',
        rating: 3,
        comment: 'Shows potential but needs more experience',
        isRequired: true
      }
    ],
    aiSuggested: false,
    language: 'EN',
    owner: 'Sarah Miller',
    createdAt: '2025-01-18',
    lastEditedAt: '2025-01-18',
    sentAt: '2025-01-19',
    rejectionReason: 'cultural_fit',
    growthCenterExported: true,
    exportedSkills: ['Strategic Planning', 'Team Leadership']
  }
];

export const mockFeedbackTemplates: FeedbackTemplate[] = [
  {
    id: 'TPL-001',
    name: 'Rejection — Skill Gaps',
    description: 'Company default, formal tone, EN.',
    content: 'Thank you for your interest in the {jobTitle} position at {companyName}. After careful review of your application and assessment results, we have decided to move forward with other candidates whose experience more closely aligns with our current requirements.\n\nSpecifically, we identified gaps in the following areas:\n{skillGaps}\n\nWe encourage you to continue developing these skills and consider applying for future opportunities that match your growing expertise.\n\nBest regards,\n{recruiterName}',
    language: 'EN',
    tone: 'formal',
    category: 'rejection',
    isDefault: true,
    createdBy: 'System',
    createdAt: '2025-01-01',
    usageCount: 45,
    skillCategories: ['technical', 'communication']
  },
  {
    id: 'TPL-002',
    name: 'Rejection — Experience Level',
    description: 'For candidates with insufficient experience, professional tone, EN.',
    content: 'Thank you for your application to the {jobTitle} role. We were impressed by your enthusiasm and potential, however, this particular position requires {experienceYears}+ years of experience in {specificArea}.\n\nWe encourage you to gain more experience in:\n{developmentAreas}\n\nPlease consider applying for our junior or mid-level positions that better match your current experience level.\n\nWishing you success in your career journey,\n{recruiterName}',
    language: 'EN',
    tone: 'professional',
    category: 'rejection',
    isDefault: false,
    createdBy: 'Arda Kara',
    createdAt: '2025-01-05',
    usageCount: 23,
    skillCategories: ['technical']
  },
  {
    id: 'TPL-003',
    name: 'Rejection — Cultural Fit',
    description: 'For cultural alignment concerns, friendly tone, EN.',
    content: 'Thank you for taking the time to interview with us for the {jobTitle} position. We enjoyed getting to know you and learning about your background.\n\nAfter careful consideration, we believe that while you have strong technical skills, there may be better alignment opportunities elsewhere that match your working style and values.\n\nWe appreciate your interest in {companyName} and wish you the best in finding the right opportunity.\n\nWarm regards,\n{recruiterName}',
    language: 'EN',
    tone: 'friendly',
    category: 'rejection',
    isDefault: false,
    createdBy: 'Sarah Miller',
    createdAt: '2025-01-08',
    usageCount: 12,
    skillCategories: ['cultural_fit', 'teamwork']
  }
];

export const mockFeedbackAnalytics: FeedbackAnalytics = {
  totalFeedbacks: 156,
  averageRatings: {
    'Technical Skills': 2.8,
    'Communication': 3.2,
    'Problem Solving': 2.9,
    'Leadership': 2.5,
    'Time Management': 3.0,
    'Teamwork': 3.4,
    'Adaptability': 3.1,
    'Cultural Fit': 2.7
  },
  commonSkillGaps: [
    {
      skillName: 'System Design',
      category: 'technical',
      percentage: 68,
      trend: 'increasing',
      companyAverage: 2.3,
      marketAverage: 2.8
    },
    {
      skillName: 'Leadership Experience',
      category: 'leadership',
      percentage: 45,
      trend: 'stable',
      companyAverage: 2.1,
      marketAverage: 2.5
    },
    {
      skillName: 'Advanced React Patterns',
      category: 'technical',
      percentage: 52,
      trend: 'decreasing',
      companyAverage: 2.5,
      marketAverage: 3.0
    },
    {
      skillName: 'Cross-functional Collaboration',
      category: 'teamwork',
      percentage: 38,
      trend: 'stable',
      companyAverage: 3.1,
      marketAverage: 3.3
    }
  ],
  feedbackDepthRatio: {
    detailed: 75,
    quick: 25
  },
  languageDistribution: {
    'EN': 85,
    'TR': 15
  },
  monthlyTrends: [
    {
      month: 'Jan 2025',
      feedbackCount: 45,
      averageRating: 2.8,
      topSkillGaps: ['System Design', 'Leadership', 'React']
    },
    {
      month: 'Dec 2024',
      feedbackCount: 52,
      averageRating: 2.9,
      topSkillGaps: ['System Design', 'Communication', 'Testing']
    },
    {
      month: 'Nov 2024',
      feedbackCount: 38,
      averageRating: 2.7,
      topSkillGaps: ['Leadership', 'System Design', 'DevOps']
    }
  ],
  benchmarkData: {
    companySize: '51-200 employees',
    industry: 'Technology',
    region: 'Europe',
    averageRatings: {
      'Technical Skills': 3.1,
      'Communication': 3.4,
      'Problem Solving': 3.2,
      'Leadership': 2.8,
      'Time Management': 3.3,
      'Teamwork': 3.6,
      'Adaptability': 3.4,
      'Cultural Fit': 3.0
    },
    commonSkillGaps: ['System Design', 'Leadership', 'Communication'],
    feedbackResponseRate: 78
  }
};

export const mockAISuggestions = [
  {
    id: 'AIS-001',
    candidateName: 'Alex Thompson',
    jobTitle: 'Frontend Developer',
    suggestionText: 'Based on the candidate\'s assessment performance, consider highlighting their strong JavaScript fundamentals while noting areas for improvement in React state management and component optimization. Their problem-solving approach shows promise but would benefit from more systematic debugging practices.',
    confidence: 85,
    skillsAnalyzed: ['JavaScript', 'React', 'Problem Solving', 'Debugging'],
    suggestedRatings: {
      'JavaScript': 4,
      'React': 2,
      'Problem Solving': 3,
      'Debugging': 2
    },
    evidencePoints: [
      'Completed 80% of JavaScript fundamentals correctly',
      'Struggled with advanced React hooks implementation',
      'Good logical thinking but inconsistent testing approach'
    ],
    generatedAt: '2025-01-22T10:30:00Z'
  },
  {
    id: 'AIS-002',
    candidateName: 'Maria Garcia',
    jobTitle: 'Data Scientist',
    suggestionText: 'The candidate demonstrates solid statistical knowledge and Python programming skills. However, their machine learning implementation lacks depth, particularly in feature engineering and model validation. Consider emphasizing their analytical thinking while suggesting focused improvement in practical ML applications.',
    confidence: 92,
    skillsAnalyzed: ['Python', 'Statistics', 'Machine Learning', 'Data Analysis'],
    suggestedRatings: {
      'Python': 4,
      'Statistics': 4,
      'Machine Learning': 2,
      'Data Analysis': 3
    },
    evidencePoints: [
      'Excellent statistical analysis in case study',
      'Clean, well-documented Python code',
      'Limited understanding of advanced ML algorithms',
      'Good data visualization skills'
    ],
    generatedAt: '2025-01-22T09:15:00Z'
  }
];