import { PipelineApplication, PipelineStats } from '../types/pipeline';

export const mockPipelineApplications: PipelineApplication[] = [
  // APPLIED STAGE - Tests assigned but not completed
  {
    id: 'app-001',
    candidateName: 'Sarah Chen',
    candidateEmail: 'sarah.chen@email.com',
    candidatePhone: '+1 (555) 123-4567',
    candidateAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop',
    candidateLocation: 'San Francisco, CA',
    candidateSkills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS'],
    candidateSummary: 'Experienced frontend developer with 5+ years building scalable web applications.',
    jobTitle: 'Senior Frontend Developer',
    jobId: 'job-001',
    applicationDate: '2025-08-20',
    lastActivity: '2025-08-20',
    stage: 'applied',
    source: 'smart_match',
    matchScore: 94,
    assignedRecruiter: 'Alex Johnson',
    stageData: {
      applied: {
        hasAssignedTests: true,
        assignedTests: ['React Technical Assessment', 'System Design Challenge'],
        assignedCaseStudies: ['E-commerce Frontend Redesign']
      }
    },
    timeline: [
      {
        id: 'timeline-001',
        stage: 'applied',
        date: '2025-08-20',
        description: 'Application submitted via Smart Match recommendation',
        user: 'System',
        automated: true
      },
      {
        id: 'timeline-002',
        stage: 'applied',
        date: '2025-08-20',
        description: 'Technical assessments and case study automatically assigned',
        user: 'System',
        automated: true
      }
    ]
  },
  
  {
    id: 'app-002',
    candidateName: 'Marcus Rodriguez',
    candidateEmail: 'marcus.rodriguez@email.com',
    candidateAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    candidateLocation: 'Austin, TX',
    candidateSkills: ['Python', 'Django', 'PostgreSQL', 'Docker', 'AWS'],
    candidateSummary: 'Backend engineer with expertise in scalable API development and microservices.',
    jobTitle: 'Senior Backend Engineer',
    jobId: 'job-002',
    applicationDate: '2025-08-21',
    lastActivity: '2025-08-21',
    stage: 'applied',
    source: 'job_board',
    matchScore: 87,
    stageData: {
      applied: {
        hasAssignedTests: true,
        assignedTests: ['Python Backend Assessment', 'Database Design Challenge'],
        assignedCaseStudies: ['API Architecture Case Study']
      }
    },
    timeline: [
      {
        id: 'timeline-003',
        stage: 'applied',
        date: '2025-08-21',
        description: 'Application submitted via job board',
        user: 'System',
        automated: true
      }
    ]
  },

  // QUALIFIED STAGE - Tests completed, awaiting employer review
  {
    id: 'app-003',
    candidateName: 'Emily Johnson',
    candidateEmail: 'emily.johnson@email.com',
    candidateAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    candidateLocation: 'New York, NY',
    candidateSkills: ['UX Design', 'Figma', 'User Research', 'Prototyping', 'Design Systems'],
    candidateSummary: 'Senior UX Designer with expertise in user-centered design and design systems.',
    jobTitle: 'Senior UX Designer',
    jobId: 'job-003',
    applicationDate: '2025-08-18',
    lastActivity: '2025-08-19',
    stage: 'qualified',
    source: 'referral',
    matchScore: 91,
    assignedRecruiter: 'Jessica Park',
    stageData: {
      applied: {
        hasAssignedTests: true,
        assignedTests: ['UX Design Assessment', 'Design Thinking Challenge'],
        assignedCaseStudies: ['Mobile App Redesign Case Study']
      },
      qualified: {
        testsCompleted: true,
        testScores: [
          { testName: 'UX Design Assessment', score: 88, maxScore: 100 },
          { testName: 'Design Thinking Challenge', score: 92, maxScore: 100 }
        ],
        caseStudySubmitted: true,
        qualificationDate: '2025-08-19'
      }
    },
    timeline: [
      {
        id: 'timeline-004',
        stage: 'applied',
        date: '2025-08-18',
        description: 'Application submitted via employee referral',
        user: 'System',
        automated: true
      },
      {
        id: 'timeline-005',
        stage: 'qualified',
        date: '2025-08-19',
        description: 'All assessments completed successfully. Auto-qualified for employer review.',
        user: 'System',
        automated: true
      }
    ]
  },

  {
    id: 'app-004',
    candidateName: 'David Kim',
    candidateEmail: 'david.kim@email.com',
    candidateAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    candidateLocation: 'Seattle, WA',
    candidateSkills: ['Product Management', 'Data Analysis', 'Agile', 'User Research', 'SQL'],
    candidateSummary: 'Product Manager with 6+ years experience leading cross-functional teams.',
    jobTitle: 'Senior Product Manager',
    jobId: 'job-004',
    applicationDate: '2025-08-17',
    lastActivity: '2025-08-18',
    stage: 'qualified',
    source: 'smart_match',
    matchScore: 89,
    assignedRecruiter: 'Michael Chen',
    stageData: {
      applied: {
        hasAssignedTests: true,
        assignedTests: ['Product Strategy Assessment', 'Data Analysis Challenge'],
        assignedCaseStudies: ['Product Roadmap Case Study']
      },
      qualified: {
        testsCompleted: true,
        testScores: [
          { testName: 'Product Strategy Assessment', score: 85, maxScore: 100 },
          { testName: 'Data Analysis Challenge', score: 90, maxScore: 100 }
        ],
        caseStudySubmitted: true,
        qualificationDate: '2025-08-18'
      }
    },
    timeline: [
      {
        id: 'timeline-006',
        stage: 'applied',
        date: '2025-08-17',
        description: 'Application submitted via Smart Match',
        user: 'System',
        automated: true
      },
      {
        id: 'timeline-007',
        stage: 'qualified',
        date: '2025-08-18',
        description: 'Qualified after completing all required assessments',
        user: 'System',
        automated: true
      }
    ]
  },

  // INTERVIEW STAGE - Interview scheduled/completed
  {
    id: 'app-005',
    candidateName: 'Lisa Wang',
    candidateEmail: 'lisa.wang@email.com',
    candidateAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop',
    candidateLocation: 'Los Angeles, CA',
    candidateSkills: ['Marketing Strategy', 'Digital Marketing', 'Analytics', 'Content Strategy'],
    candidateSummary: 'Marketing professional with expertise in growth marketing and digital strategy.',
    jobTitle: 'Marketing Manager',
    jobId: 'job-005',
    applicationDate: '2025-08-15',
    lastActivity: '2025-08-22',
    stage: 'interview',
    source: 'job_board',
    matchScore: 86,
    assignedRecruiter: 'Sarah Thompson',
    stageData: {
      applied: {
        hasAssignedTests: true,
        assignedTests: ['Marketing Strategy Assessment'],
        assignedCaseStudies: ['Growth Marketing Case Study']
      },
      qualified: {
        testsCompleted: true,
        testScores: [
          { testName: 'Marketing Strategy Assessment', score: 82, maxScore: 100 }
        ],
        caseStudySubmitted: true,
        qualificationDate: '2025-08-16'
      },
      interview: {
        interviewScheduled: true,
        interviewDate: '2025-08-25',
        interviewTime: '2:00 PM',
        interviewType: 'video',
        interviewer: 'Sarah Thompson',
        interviewCompleted: false
      }
    },
    timeline: [
      {
        id: 'timeline-008',
        stage: 'applied',
        date: '2025-08-15',
        description: 'Application submitted',
        user: 'System',
        automated: true
      },
      {
        id: 'timeline-009',
        stage: 'qualified',
        date: '2025-08-16',
        description: 'Qualified after assessment completion',
        user: 'System',
        automated: true
      },
      {
        id: 'timeline-010',
        stage: 'interview',
        date: '2025-08-22',
        description: 'Advanced to interview stage. Video interview scheduled for Aug 25.',
        user: 'Sarah Thompson'
      }
    ]
  },

  // FINAL REVIEW STAGE - Post-interview evaluation
  {
    id: 'app-006',
    candidateName: 'Alex Thompson',
    candidateEmail: 'alex.thompson@email.com',
    candidateAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    candidateLocation: 'Chicago, IL',
    candidateSkills: ['DevOps', 'Kubernetes', 'AWS', 'Terraform', 'CI/CD'],
    candidateSummary: 'DevOps Engineer with expertise in cloud infrastructure and automation.',
    jobTitle: 'Senior DevOps Engineer',
    jobId: 'job-006',
    applicationDate: '2025-08-12',
    lastActivity: '2025-08-23',
    stage: 'final_review',
    source: 'referral',
    matchScore: 93,
    assignedRecruiter: 'Tom Wilson',
    stageData: {
      applied: {
        hasAssignedTests: true,
        assignedTests: ['DevOps Technical Assessment', 'Infrastructure Design'],
        assignedCaseStudies: ['Cloud Migration Case Study']
      },
      qualified: {
        testsCompleted: true,
        testScores: [
          { testName: 'DevOps Technical Assessment', score: 94, maxScore: 100 },
          { testName: 'Infrastructure Design', score: 91, maxScore: 100 }
        ],
        caseStudySubmitted: true,
        qualificationDate: '2025-08-13'
      },
      interview: {
        interviewScheduled: true,
        interviewDate: '2025-08-20',
        interviewTime: '10:00 AM',
        interviewType: 'video',
        interviewer: 'Tom Wilson',
        interviewCompleted: true,
        interviewNotes: 'Strong technical knowledge, excellent communication skills, great cultural fit.'
      },
      final_review: {
        reviewStartDate: '2025-08-21',
        reviewerNotes: [
          'Exceptional technical assessment scores (94/100, 91/100)',
          'Interview went very well - strong problem-solving approach',
          'Case study showed excellent cloud architecture understanding',
          'Team fit assessment: Highly recommended by technical team'
        ],
        finalScore: 92
      }
    },
    timeline: [
      {
        id: 'timeline-011',
        stage: 'applied',
        date: '2025-08-12',
        description: 'Application submitted via referral',
        user: 'System',
        automated: true
      },
      {
        id: 'timeline-012',
        stage: 'qualified',
        date: '2025-08-13',
        description: 'Qualified with excellent assessment scores',
        user: 'System',
        automated: true
      },
      {
        id: 'timeline-013',
        stage: 'interview',
        date: '2025-08-18',
        description: 'Advanced to interview stage',
        user: 'Tom Wilson'
      },
      {
        id: 'timeline-014',
        stage: 'interview',
        date: '2025-08-20',
        description: 'Interview completed successfully',
        user: 'Tom Wilson'
      },
      {
        id: 'timeline-015',
        stage: 'final_review',
        date: '2025-08-21',
        description: 'Moved to final review stage for comprehensive evaluation',
        user: 'Tom Wilson'
      }
    ]
  },

  // PASSED STAGE - Ready for company handover
  {
    id: 'app-007',
    candidateName: 'Maya Patel',
    candidateEmail: 'maya.patel@email.com',
    candidateAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop',
    candidateLocation: 'Boston, MA',
    candidateSkills: ['Data Science', 'Machine Learning', 'Python', 'TensorFlow', 'SQL'],
    candidateSummary: 'Data Scientist with expertise in machine learning and predictive analytics.',
    jobTitle: 'Senior Data Scientist',
    jobId: 'job-007',
    applicationDate: '2025-08-08',
    lastActivity: '2025-08-24',
    stage: 'passed',
    source: 'smart_match',
    matchScore: 96,
    assignedRecruiter: 'Jennifer Lee',
    stageData: {
      applied: {
        hasAssignedTests: true,
        assignedTests: ['Data Science Assessment', 'ML Algorithm Challenge'],
        assignedCaseStudies: ['Predictive Analytics Case Study']
      },
      qualified: {
        testsCompleted: true,
        testScores: [
          { testName: 'Data Science Assessment', score: 96, maxScore: 100 },
          { testName: 'ML Algorithm Challenge', score: 94, maxScore: 100 }
        ],
        caseStudySubmitted: true,
        qualificationDate: '2025-08-09'
      },
      interview: {
        interviewScheduled: true,
        interviewDate: '2025-08-15',
        interviewTime: '3:00 PM',
        interviewType: 'video',
        interviewer: 'Jennifer Lee',
        interviewCompleted: true,
        interviewNotes: 'Outstanding candidate - exceptional technical skills and communication.'
      },
      final_review: {
        reviewStartDate: '2025-08-16',
        reviewerNotes: [
          'Top-tier assessment performance (96/100, 94/100)',
          'Excellent interview - demonstrated deep ML expertise',
          'Case study was exceptional - innovative approach to problem-solving',
          'Unanimous recommendation from technical panel'
        ],
        finalScore: 95,
        recommendation: 'advance'
      },
      passed: {
        passedDate: '2025-08-24',
        handoverStatus: 'pending',
        companyContact: 'Dr. Robert Chen - Head of Data Science',
        nextSteps: [
          'Technical deep-dive with data science team',
          'Meet with department head',
          'Salary negotiation and offer preparation',
          'Background check and reference verification'
        ]
      }
    },
    timeline: [
      {
        id: 'timeline-016',
        stage: 'applied',
        date: '2025-08-08',
        description: 'Application submitted via Smart Match (96% compatibility)',
        user: 'System',
        automated: true
      },
      {
        id: 'timeline-017',
        stage: 'qualified',
        date: '2025-08-09',
        description: 'Auto-qualified with exceptional assessment scores',
        user: 'System',
        automated: true
      },
      {
        id: 'timeline-018',
        stage: 'interview',
        date: '2025-08-12',
        description: 'Fast-tracked to interview due to outstanding qualifications',
        user: 'Jennifer Lee'
      },
      {
        id: 'timeline-019',
        stage: 'final_review',
        date: '2025-08-16',
        description: 'Moved to final review after excellent interview',
        user: 'Jennifer Lee'
      },
      {
        id: 'timeline-020',
        stage: 'passed',
        date: '2025-08-24',
        description: 'Passed Jobitu pre-screening! Ready for company handover.',
        user: 'Jennifer Lee'
      }
    ]
  },

  // REJECTED APPLICATIONS - Examples of rejections at different stages
  {
    id: 'app-008',
    candidateName: 'James Wilson',
    candidateEmail: 'james.wilson@email.com',
    candidateAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop',
    candidateLocation: 'Denver, CO',
    candidateSkills: ['JavaScript', 'React', 'CSS', 'HTML'],
    candidateSummary: 'Frontend developer with 2 years of experience in web development.',
    jobTitle: 'Senior Frontend Developer',
    jobId: 'job-001',
    applicationDate: '2025-08-19',
    lastActivity: '2025-08-20',
    stage: 'rejected',
    source: 'job_board',
    matchScore: 65,
    stageData: {
      applied: {
        hasAssignedTests: true,
        assignedTests: ['React Technical Assessment', 'System Design Challenge'],
        assignedCaseStudies: ['E-commerce Frontend Redesign']
      },
      qualified: {
        testsCompleted: true,
        testScores: [
          { testName: 'React Technical Assessment', score: 58, maxScore: 100 },
          { testName: 'System Design Challenge', score: 45, maxScore: 100 }
        ],
        caseStudySubmitted: true,
        qualificationDate: '2025-08-20'
      }
    },
    rejection: {
      rejectedAt: 'qualified',
      rejectedDate: '2025-08-20',
      reason: 'Assessment scores below qualification threshold',
      feedback: 'Thank you for your interest in the Senior Frontend Developer position. After reviewing your technical assessments, we found that your current skill level doesn\'t quite match our requirements for this senior-level role. We encourage you to continue developing your React and system design skills, particularly in areas like component architecture, state management, and scalable frontend design patterns. We\'d be happy to consider your application for future opportunities as you grow in your career.',
      rejectedBy: 'System'
    },
    timeline: [
      {
        id: 'timeline-021',
        stage: 'applied',
        date: '2025-08-19',
        description: 'Application submitted',
        user: 'System',
        automated: true
      },
      {
        id: 'timeline-022',
        stage: 'rejected',
        date: '2025-08-20',
        description: 'Application rejected after assessment review - scores below qualification threshold',
        user: 'System',
        automated: true
      }
    ]
  }
];

export const mockPipelineStats: PipelineStats = {
  totalApplications: 8,
  byStage: {
    applied: 2,
    qualified: 2,
    interview: 1,
    final_review: 1,
    passed: 1,
    rejected: 1
  },
  conversionRates: {
    appliedToQualified: 75, // 6 out of 8 made it past applied
    qualifiedToInterview: 67, // 4 out of 6 made it to interview
    interviewToFinalReview: 75, // 3 out of 4 made it to final review
    finalReviewToPassed: 50 // 1 out of 2 made it to passed
  },
  averageTimeInStage: {
    applied: 1.2, // days
    qualified: 2.1,
    interview: 3.5,
    final_review: 2.8
  }
};
