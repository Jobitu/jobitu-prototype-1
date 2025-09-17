export interface JobPosting {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  status: "active" | "paused" | "draft" | "closed";
  applicants: number;
  views: number;
  postedDays: number;
  matchScore: number;
}

export interface Candidate {
  id: number;
  name: string;
  title: string;
  avatar: string;
  matchScore: number;
  status: "applied" | "reviewed" | "interviewed" | "offered" | "hired";
  appliedRole: string;
  lastActivity: string;
}

export const mockJobPostings: JobPosting[] = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Full-Time",
    status: "active",
    applicants: 24,
    views: 156,
    postedDays: 5,
    matchScore: 87
  },
  {
    id: 2,
    title: "Product Manager",
    department: "Product",
    location: "Remote",
    type: "Full-Time",
    status: "active",
    applicants: 18,
    views: 203,
    postedDays: 3,
    matchScore: 92
  },
  {
    id: 3,
    title: "UX Designer",
    department: "Design",
    location: "New York, NY",
    type: "Contract",
    status: "paused",
    applicants: 12,
    views: 89,
    postedDays: 10,
    matchScore: 78
  }
];

export const mockCandidates: Candidate[] = [
  {
    id: 1,
    name: "Alex Chen",
    title: "Frontend Developer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    matchScore: 94,
    status: "interviewed",
    appliedRole: "Senior Frontend Developer",
    lastActivity: "2 hours ago"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    title: "Product Manager",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop",
    matchScore: 89,
    status: "reviewed",
    appliedRole: "Product Manager",
    lastActivity: "1 day ago"
  },
  {
    id: 3,
    name: "Mike Rodriguez",
    title: "UX Designer",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    matchScore: 82,
    status: "applied",
    appliedRole: "UX Designer",
    lastActivity: "3 hours ago"
  }
];