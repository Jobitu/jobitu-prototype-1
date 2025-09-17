import { CandidateFocus } from './types';

export const mockCandidateFocus: CandidateFocus[] = [
  {
    id: 'CF-001',
    name: 'Senior React Developers',
    description: 'Experienced React developers with 3+ years, preferring remote work',
    criteria: {
      skills: ['React', 'TypeScript', 'JavaScript'],
      experience: ['3+ years', '4+ years', '5+ years'],
      locations: ['San Francisco, CA', 'New York, NY', 'Remote'],
      remotePreference: ['Remote only', 'Hybrid'],
      availability: ['Immediately', 'Within 2 weeks'],
      languages: ['English']
    },
    matchedCandidates: 23,
    newCandidates: 3,
    lastUpdated: '2 hours ago',
    isActive: true
  },
  {
    id: 'CF-002',
    name: 'Full Stack Engineers - EU',
    description: 'Full stack developers in European time zones with Node.js experience',
    criteria: {
      skills: ['JavaScript', 'Node.js', 'React', 'Python'],
      experience: ['4+ years', '5+ years', '6+ years'],
      locations: ['London', 'Berlin', 'Amsterdam', 'Remote'],
      remotePreference: ['Remote only', 'Hybrid', 'Flexible'],
      availability: ['Immediately', 'Within a month'],
      languages: ['English']
    },
    matchedCandidates: 18,
    newCandidates: 1,
    lastUpdated: '1 day ago',
    isActive: true
  },
  {
    id: 'CF-003',
    name: 'DevOps Specialists',
    description: 'DevOps engineers with AWS and Kubernetes experience',
    criteria: {
      skills: ['AWS', 'Kubernetes', 'Docker', 'Python', 'Terraform'],
      experience: ['3+ years', '4+ years', '5+ years'],
      locations: ['Seattle, WA', 'Denver, CO', 'Remote'],
      remotePreference: ['Remote only', 'On-site', 'Flexible'],
      availability: ['Immediately', 'Within 2 weeks'],
      languages: ['English']
    },
    matchedCandidates: 12,
    newCandidates: 0,
    lastUpdated: '3 days ago',
    isActive: false
  }
];

export const initialFocusState = {
  name: '',
  description: '',
  criteria: {
    skills: [] as string[],
    experience: [] as string[],
    locations: [] as string[],
    remotePreference: [] as string[],
    availability: [] as string[],
    languages: [] as string[]
  }
};