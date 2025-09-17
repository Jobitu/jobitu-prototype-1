import { SkillCategory } from './types';

export const SKILL_CATEGORIES: Record<SkillCategory, { name: string; description: string; icon: string }> = {
  technical: {
    name: 'Technical Skills',
    description: 'Programming, tools, and domain expertise',
    icon: '💻'
  },
  communication: {
    name: 'Communication',
    description: 'Verbal, written, and presentation skills',
    icon: '💬'
  },
  problem_solving: {
    name: 'Problem Solving',
    description: 'Analytical thinking and solution design',
    icon: '🧩'
  },
  leadership: {
    name: 'Leadership',
    description: 'Team management and guidance abilities',
    icon: '👑'
  },
  time_management: {
    name: 'Time Management',
    description: 'Organization and deadline adherence',
    icon: '⏰'
  },
  teamwork: {
    name: 'Teamwork',
    description: 'Collaboration and interpersonal skills',
    icon: '🤝'
  },
  adaptability: {
    name: 'Adaptability',
    description: 'Flexibility and change management',
    icon: '🔄'
  },
  cultural_fit: {
    name: 'Cultural Fit',
    description: 'Alignment with company values',
    icon: '🏢'
  }
};

export const DEFAULT_SKILLS_BY_CATEGORY: Record<SkillCategory, string[]> = {
  technical: [
    'Programming Languages',
    'System Design',
    'Database Management',
    'Testing & QA',
    'DevOps & CI/CD',
    'Cloud Technologies',
    'Security Best Practices'
  ],
  communication: [
    'Written Communication',
    'Verbal Communication',
    'Presentation Skills',
    'Active Listening',
    'Documentation',
    'Cross-functional Collaboration'
  ],
  problem_solving: [
    'Analytical Thinking',
    'Creative Problem Solving',
    'Debugging & Troubleshooting',
    'Research Skills',
    'Critical Analysis',
    'Solution Architecture'
  ],
  leadership: [
    'Team Leadership',
    'Mentoring',
    'Decision Making',
    'Strategic Thinking',
    'Conflict Resolution',
    'Vision & Direction'
  ],
  time_management: [
    'Task Prioritization',
    'Deadline Management',
    'Project Planning',
    'Multitasking',
    'Efficiency',
    'Work-Life Balance'
  ],
  teamwork: [
    'Collaboration',
    'Interpersonal Skills',
    'Empathy',
    'Support & Assistance',
    'Knowledge Sharing',
    'Team Dynamics'
  ],
  adaptability: [
    'Learning Agility',
    'Change Management',
    'Flexibility',
    'Resilience',
    'Innovation',
    'Growth Mindset'
  ],
  cultural_fit: [
    'Company Values Alignment',
    'Work Style Compatibility',
    'Team Dynamics',
    'Mission Alignment',
    'Attitude & Mindset',
    'Professional Behavior'
  ]
};

export const REJECTION_REASONS = {
  skill_gaps: {
    label: 'Skill Gaps',
    description: 'Missing required technical or soft skills',
    color: 'bg-red-100 text-red-800 border-red-200'
  },
  experience_level: {
    label: 'Experience Level',
    description: 'Insufficient experience for the role',
    color: 'bg-orange-100 text-orange-800 border-orange-200'
  },
  cultural_fit: {
    label: 'Cultural Fit',
    description: 'Not aligned with company culture',
    color: 'bg-purple-100 text-purple-800 border-purple-200'
  },
  assessment_performance: {
    label: 'Assessment Performance',
    description: 'Did not meet assessment benchmarks',
    color: 'bg-blue-100 text-blue-800 border-blue-200'
  },
  other: {
    label: 'Other',
    description: 'Other reasons not categorized',
    color: 'bg-gray-100 text-gray-800 border-gray-200'
  }
};

export const FEEDBACK_STATUS = {
  pending: {
    label: 'Pending',
    description: 'Waiting for feedback to be created',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200'
  },
  draft: {
    label: 'Draft',
    description: 'Feedback created but not reviewed',
    color: 'bg-blue-100 text-blue-800 border-blue-200'
  },
  ready: {
    label: 'Ready to Send',
    description: 'Reviewed and ready for sending',
    color: 'bg-green-100 text-green-800 border-green-200'
  },
  sent: {
    label: 'Sent',
    description: 'Feedback sent to candidate',
    color: 'bg-gray-100 text-gray-800 border-gray-200'
  }
};

export const LANGUAGES = {
  EN: { label: 'English', flag: '🇺🇸' },
  TR: { label: 'Turkish', flag: '🇹🇷' },
  AUTO: { label: 'Auto-detect', flag: '🌐' }
};

export const FEEDBACK_TONES = {
  professional: {
    label: 'Professional',
    description: 'Formal, business-oriented tone'
  },
  friendly: {
    label: 'Friendly',
    description: 'Warm, approachable tone'
  },
  formal: {
    label: 'Formal',
    description: 'Structured, official tone'
  }
};

export const AI_SUGGESTION_STYLES = {
  constructive: {
    label: 'Constructive',
    description: 'Focus on growth opportunities and specific improvements'
  },
  direct: {
    label: 'Direct',
    description: 'Clear, straightforward feedback'
  },
  encouraging: {
    label: 'Encouraging',
    description: 'Supportive tone that motivates future growth'
  }
};

export const RATING_SCALE = {
  1: { label: 'Needs Improvement', color: 'text-red-600', description: 'Significant gaps identified' },
  2: { label: 'Below Average', color: 'text-orange-600', description: 'Some improvement needed' },
  3: { label: 'Average', color: 'text-yellow-600', description: 'Meets basic expectations' },
  4: { label: 'Above Average', color: 'text-blue-600', description: 'Exceeds expectations' },
  5: { label: 'Excellent', color: 'text-green-600', description: 'Outstanding performance' }
};

export const CHART_COLORS = {
  primary: '#030213',
  secondary: '#6366f1',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
  gray: '#6b7280'
};

export const BENCHMARK_INDUSTRIES = [
  'Technology',
  'Finance',
  'Healthcare',
  'E-commerce',
  'Consulting',
  'Education',
  'Manufacturing',
  'Startup'
];

export const COMPANY_SIZES = [
  '1-10 employees',
  '11-50 employees',
  '51-200 employees',
  '201-1000 employees',
  '1000+ employees'
];