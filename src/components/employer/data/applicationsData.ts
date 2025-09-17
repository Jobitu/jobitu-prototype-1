import { Application } from "../types/applicationTypes";

export const mockApplications: Application[] = [
  {
    id: '1',
    candidateName: 'Sarah Chen',
    candidateEmail: 'sarah.chen@email.com',
    candidatePhone: '+1 (555) 123-4567',
    candidateAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop',
    candidateLocation: 'San Francisco, CA',
    candidateSkills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS'],
    candidateSummary: 'Experienced frontend developer with 5+ years building scalable web applications.',
    jobTitle: 'Senior Frontend Developer',
    jobId: 'job-1',
    applicationDate: '2025-08-10',
    lastActivity: '2025-08-12',
    status: 'assessment',
    source: 'job_board',
    matchScore: 85,
    assignedRecruiter: 'Alex Johnson',
    assessmentResults: {
      score: 85,
      maxScore: 100,
      completedDate: '2025-08-12',
      status: 'completed'
    },
    artifacts: [
      {
        id: 'art-1',
        name: 'Sarah_Chen_Resume.pdf',
        type: 'resume',
        status: 'submitted',
        submittedDate: '2025-08-10'
      },
      {
        id: 'art-2',
        name: 'Technical Assessment',
        type: 'test',
        status: 'scored',
        score: 85,
        submittedDate: '2025-08-12'
      }
    ],
    interviews: [],
    timeline: [
      {
        id: 'timeline-1',
        stage: 'Applied',
        date: '2025-08-10',
        description: 'Application submitted via job board',
        user: 'System'
      },
      {
        id: 'timeline-2',
        stage: 'Assessment',
        date: '2025-08-12',
        description: 'Technical assessment completed (85/100)',
        user: 'System'
      }
    ]
  },
  {
    id: '2',
    candidateName: 'Michael Rodriguez',
    candidateEmail: 'michael.rodriguez@email.com',
    candidateAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    candidateLocation: 'Austin, TX',
    candidateSkills: ['Product Management', 'Data Analysis', 'Agile', 'User Research'],
    candidateSummary: 'Senior Product Manager with 7+ years experience leading cross-functional teams.',
    jobTitle: 'Product Manager',
    jobId: 'job-2',
    applicationDate: '2025-08-08',
    lastActivity: '2025-08-14',
    status: 'interview',
    source: 'referral',
    matchScore: 92,
    assignedRecruiter: 'Emily Davis',
    artifacts: [
      {
        id: 'art-3',
        name: 'Michael_Rodriguez_Resume.pdf',
        type: 'resume',
        status: 'submitted',
        submittedDate: '2025-08-08'
      }
    ],
    interviews: [
      {
        id: 'int-1',
        date: '2025-08-15',
        time: '2:00 PM',
        type: 'video',
        interviewer: 'Emily Davis',
        status: 'scheduled'
      }
    ],
    timeline: [
      {
        id: 'timeline-3',
        stage: 'Applied',
        date: '2025-08-08',
        description: 'Application submitted via referral',
        user: 'System'
      },
      {
        id: 'timeline-4',
        stage: 'Interview',
        date: '2025-08-14',
        description: 'Scheduled for final interview',
        user: 'Emily Davis'
      }
    ]
  },
  {
    id: '3',
    candidateName: 'Emily Johnson',
    candidateEmail: 'emily.johnson@email.com',
    candidateAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    candidateLocation: 'New York, NY',
    candidateSkills: ['UX Design', 'Figma', 'User Research', 'Prototyping'],
    candidateSummary: 'Creative UX designer with expertise in user-centered design and design systems.',
    jobTitle: 'UX Designer',
    jobId: 'job-3',
    applicationDate: '2025-08-05',
    lastActivity: '2025-08-05',
    status: 'new',
    source: 'job_board',
    matchScore: 78,
    artifacts: [
      {
        id: 'art-4',
        name: 'Emily_Johnson_Resume.pdf',
        type: 'resume',
        status: 'submitted',
        submittedDate: '2025-08-05'
      },
      {
        id: 'art-5',
        name: 'Design Portfolio',
        type: 'portfolio',
        status: 'pending'
      }
    ],
    interviews: [],
    timeline: [
      {
        id: 'timeline-5',
        stage: 'Applied',
        date: '2025-08-05',
        description: 'Application submitted',
        user: 'System'
      }
    ]
  },
  {
    id: '4',
    candidateName: 'David Kim',
    candidateEmail: 'david.kim@email.com',
    candidateAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    candidateLocation: 'Seattle, WA',
    candidateSkills: ['Backend Development', 'Python', 'Django', 'PostgreSQL'],
    candidateSummary: 'Backend engineer with strong database design skills and API development experience.',
    jobTitle: 'Backend Engineer',
    jobId: 'job-4',
    applicationDate: '2025-08-03',
    lastActivity: '2025-08-05',
    status: 'rejected',
    source: 'direct',
    matchScore: 62,
    artifacts: [
      {
        id: 'art-6',
        name: 'David_Kim_Resume.pdf',
        type: 'resume',
        status: 'submitted',
        submittedDate: '2025-08-03'
      }
    ],
    interviews: [],
    internalRating: 2,
    internalNotes: 'Technical skills not quite at required level.',
    timeline: [
      {
        id: 'timeline-6',
        stage: 'Applied',
        date: '2025-08-03',
        description: 'Application submitted directly',
        user: 'System'
      },
      {
        id: 'timeline-7',
        stage: 'Rejected',
        date: '2025-08-05',
        description: 'Application rejected after technical review',
        user: 'Technical Team'
      }
    ]
  }
];