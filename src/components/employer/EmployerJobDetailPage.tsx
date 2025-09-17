import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import {
  ArrowLeft,
  Edit,
  Copy,
  Share2,
  FileText,
  Target,
  MessageSquare,
  CheckCircle,
  TrendingUp,
  XCircle,
  Activity,
} from "lucide-react";
import { EmployerJobCreationPage } from "./EmployerJobCreationPage";

// Types
interface JobDetailPageProps {
  jobId: string;
  onBack: () => void;
  onEdit?: (jobId: string) => void;
  onViewApplicants?: (jobTitle: string) => void; // ✅ yeni prop
}

interface JobData {
  id: string;
  title: string;
  department: string;
  location: string;
  locationType: "remote" | "onsite" | "hybrid";
  employmentType: string;
  experienceLevel: string;
  salaryRange: {
    min: string;
    max: string;
    currency: string;
  };
  description: string;
  responsibilities: string[];
  requirements: string[];
  skills: string[];
  status: "active" | "paused" | "closed" | "draft";
  publishedAt: string;
  applicationsDeadline: string;
  processSteps: Array<{
    id: string;
    name: string;
    description: string;
    required: boolean;
    icon: React.ReactNode;
  }>;
  estimatedTimeToHire: string;
}

interface JobStats {
  totalApplications: number;
  activeApplications: number;
  completedApplications: number;
  rejectedApplications: number;
  applicationTrend: number;
  viewCount: number;
  conversionRate: number;
  avgTimeToComplete: string;
  stageBreakdown: Array<{
    stage: string;
    count: number;
    percentage: number;
  }>;
}

interface RecentActivity {
  id: string;
  type: "application" | "advancement" | "rejection" | "completion";
  candidateName: string;
  candidateAvatar: string;
  action: string;
  timestamp: string;
}

// Mock Data
const mockJobData: JobData = {
  id: "job-001",
  title: "Senior Frontend Developer",
  department: "Engineering",
  location: "San Francisco, CA",
  locationType: "hybrid",
  employmentType: "Full-time",
  experienceLevel: "Senior Level",
  salaryRange: {
    min: "120000",
    max: "160000",
    currency: "USD",
  },
  description:
    "We are looking for a Senior Frontend Developer to join our growing team. You will be responsible for building and maintaining user-facing applications using React, TypeScript, and modern web technologies.",
  responsibilities: [
    "Develop and maintain frontend applications using React and TypeScript",
    "Collaborate with design and backend teams to implement new features",
    "Optimize application performance and user experience",
    "Mentor junior developers and contribute to technical decisions",
  ],
  requirements: [
    "5+ years of frontend development experience",
    "Expert knowledge of React and TypeScript",
    "Experience with modern build tools and testing frameworks",
    "Strong understanding of web performance optimization",
  ],
  skills: [
    "React",
    "TypeScript",
    "JavaScript",
    "CSS",
    "HTML",
    "Git",
    "Testing",
  ],
  status: "active",
  publishedAt: "2025-01-15",
  applicationsDeadline: "2025-02-15",
  processSteps: [
    {
      id: "application",
      name: "Application Submission",
      description: "Basic application form with resume and cover letter",
      required: true,
      icon: <FileText className="h-4 w-4" />,
    },
    {
      id: "assessment",
      name: "Technical Assessment",
      description: "Skills-based technical evaluation",
      required: true,
      icon: <Target className="h-4 w-4" />,
    },
    {
      id: "interviews",
      name: "Interview Rounds",
      description: "Technical and cultural fit interviews",
      required: true,
      icon: <MessageSquare className="h-4 w-4" />,
    },
    {
      id: "final",
      name: "Final Evaluation",
      description: "Final decision and offer preparation",
      required: true,
      icon: <CheckCircle className="h-4 w-4" />,
    },
  ],
  estimatedTimeToHire: "2-3 weeks",
};

const mockJobStats: JobStats = {
  totalApplications: 47,
  activeApplications: 32,
  completedApplications: 8,
  rejectedApplications: 7,
  applicationTrend: 15,
  viewCount: 1247,
  conversionRate: 17,
  avgTimeToComplete: "18 days",
  stageBreakdown: [
    { stage: "Applied", count: 47, percentage: 100 },
    { stage: "Assessment", count: 32, percentage: 68 },
    { stage: "Interviews", count: 15, percentage: 32 },
    { stage: "Final Review", count: 8, percentage: 17 },
  ],
};

const mockRecentActivity: RecentActivity[] = [
  {
    id: "1",
    type: "application",
    candidateName: "Sarah Chen",
    candidateAvatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop",
    action: "Applied for position",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    type: "advancement",
    candidateName: "Michael Brown",
    candidateAvatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    action: "Advanced to interview stage",
    timestamp: "4 hours ago",
  },
  {
    id: "3",
    type: "completion",
    candidateName: "Emily Watson",
    candidateAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    action: "Completed technical assessment",
    timestamp: "6 hours ago",
  },
  {
    id: "4",
    type: "rejection",
    candidateName: "David Kim",
    candidateAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    action: "Application rejected - Skills gap",
    timestamp: "1 day ago",
  },
];

// Component
export function EmployerJobDetailPage({
  jobId,
  onBack,
  onEdit,
  onViewApplicants,
}: JobDetailPageProps) {
  const [jobData] = useState<JobData>(mockJobData);
  const [jobStats] = useState<JobStats>(mockJobStats);
  const [recentActivity] = useState<RecentActivity[]>(mockRecentActivity);
  const [isEditMode, setIsEditMode] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "paused":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "closed":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "draft":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "application":
        return <FileText className="h-4 w-4 text-blue-600" />;
      case "advancement":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "rejection":
        return <XCircle className="h-4 w-4 text-red-600" />;
      case "completion":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      default:
        return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://jobitu.com/jobs/${jobId}`);
  };

  const handleEdit = () => {
    if (onEdit) onEdit(jobId);
    else setIsEditMode(true);
  };

  if (isEditMode) {
    return (
      <EmployerJobCreationPage
        onBack={() => setIsEditMode(false)}
        onSave={() => setIsEditMode(false)}
        editingJob={jobData}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-semibold">{jobData.title}</h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge
                  variant="outline"
                  className={getStatusColor(jobData.status)}
                >
                  {jobData.status}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Published {new Date(jobData.publishedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleCopyLink}>
              <Copy className="h-4 w-4 mr-2" />
              Copy Link
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" onClick={handleEdit}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Job Description */}
        <Card>
          <CardHeader>
            <CardTitle>About the Job</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>{jobData.description}</p>
            <div className="flex flex-wrap gap-2">
              {jobData.skills.map((s, i) => (
                <Badge key={i} variant="secondary">
                  {s}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Metrics + Applicants Button */}
        <Card>
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Key Metrics</CardTitle>
            <Button
              variant="default"
              size="sm"
              onClick={() => onViewApplicants?.(jobData.title)}
            >
              View Applicants
            </Button>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold">
                {jobStats.totalApplications}
              </p>
              <p className="text-sm">Total Apps</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-700">
                {jobStats.activeApplications}
              </p>
              <p className="text-sm">Active</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{jobStats.viewCount}</p>
              <p className="text-sm">Views</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">
                {jobStats.conversionRate}%
              </p>
              <p className="text-sm">Conversion</p>
            </div>
          </CardContent>
        </Card>

        {/* Process Steps */}
        <Card>
          <CardHeader>
            <CardTitle>Hiring Process</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {jobData.processSteps.map((step) => (
              <div
                key={step.id}
                className="flex items-start gap-3 border rounded-lg p-3"
              >
                {step.icon}
                <div>
                  <p className="font-medium">{step.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
