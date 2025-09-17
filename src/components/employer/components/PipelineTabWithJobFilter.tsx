import React, { useState, type ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Progress } from "../../ui/progress";
import { Input } from "../../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../ui/collapsible";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../ui/tooltip";
import { Checkbox } from "../../ui/checkbox";
import { 
  Users,
  Clock,
  AlertTriangle,
  CheckCircle,
  Settings,
  RefreshCw,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  MessageSquare,
  Calendar,
  ArrowRight,
  GripVertical,
  Plus,
  X,
  UserPlus,
  Send,
  Archive,
  FileText,
  UserCheck,
  Video,
  Trophy,
  ChevronDown,
  ChevronUp,
  Zap,
  Target,
  Info,
  TrendingUp,
  TrendingDown,
  Timer,
  Brain,
  XCircle,
  PlayCircle,
  Pause,
  RotateCcw,
  ExternalLink,
  Star,
  AlertCircle,
  CheckSquare,
  ArrowUp,
  ArrowDown,
  SortAsc,
  SortDesc,
  Briefcase,
  MapPin,
  DollarSign,
  Clipboard,
  Handshake
} from "lucide-react";

// Mock job postings data
interface JobPosting {
  id: string;
  title: string;
  location: string;
  status: 'Draft' | 'Published' | 'Closed';
  applications: number;
  department: string;
  postedDate: string;
}

const mockJobPostings: JobPosting[] = [
  {
    id: 'JOB-001',
    title: 'Senior Frontend Developer',
    location: 'San Francisco, CA',
    status: 'Published',
    applications: 47,
    department: 'Engineering',
    postedDate: '2025-01-10'
  },
  {
    id: 'JOB-002',
    title: 'Product Manager',
    location: 'Remote',
    status: 'Published',
    applications: 32,
    department: 'Product',
    postedDate: '2025-01-12'
  },
  {
    id: 'JOB-003',
    title: 'UX Designer',
    location: 'New York, NY',
    status: 'Draft',
    applications: 0,
    department: 'Design',
    postedDate: '2025-01-15'
  },
  {
    id: 'JOB-004',
    title: 'Data Scientist',
    location: 'Seattle, WA',
    status: 'Published',
    applications: 18,
    department: 'Data',
    postedDate: '2025-01-08'
  },
  {
    id: 'JOB-005',
    title: 'Backend Engineer',
    location: 'Austin, TX',
    status: 'Published',
    applications: 23,
    department: 'Engineering',
    postedDate: '2025-01-11'
  }
];

interface PipelineStage {
  id: string;
  name: string;
  description: string;
  count: number;
  avgTime: string;
  status: 'healthy' | 'warning' | 'critical';
  candidates: Candidate[];
  icon: ReactNode;
  color: string;
  requiresFeedback: boolean;
  aiSupported: boolean;
}

interface Candidate {
  id: string;
  name: string;
  avatar: string;
  position: string;
  jobId: string;
  timeInStage: string;
  isOverdue: boolean;
  score?: number;
  nextAction?: string;
  priority: 'low' | 'medium' | 'high';
  tags: string[];
  hasNotes: boolean;
  needsFeedback: boolean;
}

interface PipelineMetrics {
  totalCandidates: number;
  avgDaysPerStage: number;
  dropOffRate: number;
  bottleneckStage: string;
  activeInterviews: number;
  pendingFeedback: number;
}

const stageDefinitions: PipelineStage[] = [
  {
    id: 'applied',
    name: 'Applied',
    description: 'Candidates who applied but are still in process. Initial application submitted and being processed through screening.',
    count: 18,
    avgTime: '2.1 days',
    status: 'warning',
    icon: <Clipboard className="h-5 w-5" />,
    color: 'border-purple-500',
    requiresFeedback: false,
    aiSupported: false,
    candidates: [
      {
        id: '1',
        name: 'Alex Johnson',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
        position: 'Frontend Engineer',
        jobId: 'JOB-001',
        timeInStage: '3 days',
        isOverdue: true,
        nextAction: 'Complete assessment',
        priority: 'high',
        tags: ['React', 'TypeScript'],
        hasNotes: false,
        needsFeedback: false
      },
      {
        id: '2',
        name: 'Maria Garcia',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
        position: 'Data Scientist',
        jobId: 'JOB-004',
        timeInStage: '1 day',
        isOverdue: false,
        nextAction: 'Upload portfolio',
        priority: 'medium',
        tags: ['Python', 'ML'],
        hasNotes: true,
        needsFeedback: false
      },
      {
        id: '3',
        name: 'John Smith',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
        position: 'Backend Developer',
        jobId: 'JOB-005',
        timeInStage: '2 days',
        isOverdue: false,
        nextAction: 'Complete case study',
        priority: 'low',
        tags: ['Node.js', 'API'],
        hasNotes: false,
        needsFeedback: false
      }
    ]
  },
  {
    id: 'qualified',
    name: 'Qualified',
    description: 'Candidates who passed all requirements and are ready for employer review. They have successfully completed pre-screening.',
    count: 12,
    avgTime: '3.2 days',
    status: 'healthy',
    icon: <CheckSquare className="h-5 w-5" />,
    color: 'border-blue-500',
    requiresFeedback: false,
    aiSupported: true,
    candidates: [
      {
        id: '4',
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop',
        position: 'Frontend Engineer',
        jobId: 'JOB-001',
        timeInStage: '4 days',
        isOverdue: true,
        score: 85,
        nextAction: 'Awaiting employer review',
        priority: 'high',
        tags: ['React', 'Vue.js'],
        hasNotes: true,
        needsFeedback: false
      },
      {
        id: '5',
        name: 'David Kim',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
        position: 'UX Designer',
        jobId: 'JOB-003',
        timeInStage: '2 days',
        isOverdue: false,
        score: 92,
        nextAction: 'Portfolio review pending',
        priority: 'medium',
        tags: ['Figma', 'Prototyping'],
        hasNotes: false,
        needsFeedback: false
      }
    ]
  },
  {
    id: 'interview',
    name: 'Interview',
    description: 'Candidates invited to interviews. They are scheduled for or completing technical, panel, and culture fit interviews.',
    count: 8,
    avgTime: '5.1 days',
    status: 'healthy',
    icon: <Handshake className="h-5 w-5" />,
    color: 'border-green-500',
    requiresFeedback: true,
    aiSupported: true,
    candidates: [
      {
        id: '6',
        name: 'Emily Watson',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
        position: 'Product Manager',
        jobId: 'JOB-002',
        timeInStage: '3 days',
        isOverdue: false,
        score: 78,
        nextAction: 'Panel interview scheduled',
        priority: 'high',
        tags: ['Strategy', 'Analytics'],
        hasNotes: true,
        needsFeedback: false
      },
      {
        id: '7',
        name: 'Michael Brown',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
        position: 'Data Engineer',
        jobId: 'JOB-004',
        timeInStage: '2 days',
        isOverdue: false,
        score: 88,
        nextAction: 'Technical interview completed',
        priority: 'medium',
        tags: ['Python', 'SQL'],
        hasNotes: false,
        needsFeedback: false
      }
    ]
  },
  {
    id: 'finalReview',
    name: 'Final Review',
    description: 'Candidates in the last evaluation before decision. Final assessments and reference checks are being completed.',
    count: 6,
    avgTime: '2.8 days',
    status: 'warning',
    icon: <Briefcase className="h-5 w-5" />,
    color: 'border-orange-500',
    requiresFeedback: true,
    aiSupported: true,
    candidates: [
      {
        id: '8',
        name: 'Lisa Anderson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop',
        position: 'Marketing Manager',
        jobId: 'JOB-002',  
        timeInStage: '3 days',
        isOverdue: false,
        score: 91,
        nextAction: 'Final decision pending',
        priority: 'high',
        tags: ['Digital Marketing', 'Growth'],
        hasNotes: true,
        needsFeedback: true
      },
      {
        id: '9',
        name: 'Robert Wilson',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
        position: 'DevOps Engineer',
        jobId: 'JOB-005',
        timeInStage: '1 day',
        isOverdue: false,
        score: 95,
        nextAction: 'Reference check completed',
        priority: 'medium',
        tags: ['AWS', 'Kubernetes'],
        hasNotes: false,
        needsFeedback: false
      }
    ]
  },
  {
    id: 'passed',
    name: 'Passed',
    description: 'Candidates who successfully completed Jobitu\'s pre-screening and move to employer\'s internal hiring process.',
    count: 4,
    avgTime: '1.5 days',
    status: 'healthy',
    icon: <Trophy className="h-5 w-5" />,
    color: 'border-emerald-500',
    requiresFeedback: false,
    aiSupported: false,
    candidates: [
      {
        id: '10',
        name: 'Jennifer Lee',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop',
        position: 'Full Stack Developer',
        jobId: 'JOB-001',
        timeInStage: '1 day',
        isOverdue: false,
        score: 96,
        nextAction: 'Transferred to employer',
        priority: 'high',
        tags: ['React', 'Node.js'],
        hasNotes: true,
        needsFeedback: false
      },
      {
        id: '11',
        name: 'Thomas Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
        position: 'AI Engineer',
        jobId: 'JOB-004',
        timeInStage: '2 days',
        isOverdue: false,
        score: 94,
        nextAction: 'Employer review complete',
        priority: 'medium',
        tags: ['Python', 'TensorFlow'],
        hasNotes: false,
        needsFeedback: false
      }
    ]
  }
];

const mockMetrics: PipelineMetrics = {
  totalCandidates: 48,
  avgDaysPerStage: 2.9,
  dropOffRate: 18,
  bottleneckStage: 'Qualified',
  activeInterviews: 8,
  pendingFeedback: 6
};

export default function PipelineTab() {
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showStageDefinitions, setShowStageDefinitions] = useState(false);
  
  // Job filter states
  const [showJobFilter, setShowJobFilter] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string>('all');
  const [jobSearchQuery, setJobSearchQuery] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-muted';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800';
      default: return 'bg-muted text-foreground border-border';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-border bg-muted';
    }
  };

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      default: return 'bg-muted text-foreground';
    }
  };

  // Filter jobs for the selector
  const filteredJobs = mockJobPostings.filter(job =>
    job.title.toLowerCase().includes(jobSearchQuery.toLowerCase()) ||
    job.location.toLowerCase().includes(jobSearchQuery.toLowerCase())
  );

  // Get selected job info
  const selectedJob = selectedJobId !== 'all' ? mockJobPostings.find(job => job.id === selectedJobId) : null;

  // Filter stages and candidates based on selected job
  const getFilteredStages = () => {
    if (selectedJobId === 'all') {
      return stageDefinitions;
    }

    return stageDefinitions.map(stage => ({
      ...stage,
      candidates: stage.candidates.filter(candidate => candidate.jobId === selectedJobId),
      count: stage.candidates.filter(candidate => candidate.jobId === selectedJobId).length
    }));
  };

  const filteredStages = getFilteredStages();

  // Update metrics based on filtered data
  const getFilteredMetrics = (): PipelineMetrics => {
    if (selectedJobId === 'all') {
      return mockMetrics;
    }

    const filteredCandidates = stageDefinitions.flatMap(stage => 
      stage.candidates.filter(candidate => candidate.jobId === selectedJobId)
    );

    return {
      totalCandidates: filteredCandidates.length,
      avgDaysPerStage: mockMetrics.avgDaysPerStage,
      dropOffRate: mockMetrics.dropOffRate,
      bottleneckStage: mockMetrics.bottleneckStage,
      activeInterviews: filteredCandidates.filter(c => c.nextAction?.includes('interview')).length,
      pendingFeedback: filteredCandidates.filter(c => c.needsFeedback).length
    };
  };

  const currentMetrics = getFilteredMetrics();

  const handleJobFilterApply = () => {
    setShowJobFilter(false);
  };

  const clearJobFilter = () => {
    setSelectedJobId('all');
  };

  const selectedStageData = selectedStage ? filteredStages.find(s => s.id === selectedStage) : null;

  return (
    <TooltipProvider>
      <div className="p-8 space-y-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Pipeline Workflow</h1>
            <p className="text-lg text-muted-foreground mt-1">
              Visual workflow management with intelligent candidate tracking
            </p>
            {/* Active Filter Indicator */}
            {selectedJob && (
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800">
                  Filtering: {selectedJob.title}
                  <button
                    onClick={clearJobFilter}
                    className="ml-2 hover:bg-blue-200 dark:hover:bg-blue-800/40 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant={selectedJobId !== 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setShowJobFilter(true)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter by Job
            </Button>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowStageDefinitions(!showStageDefinitions)}
                >
                  <Info className="h-4 w-4 mr-2" />
                  Stage Guide
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-sm">
                <div className="space-y-2 text-sm">
                  <div className="font-medium">Pipeline Stages:</div>
                  <div><span className="font-medium text-purple-600">Applied:</span> Not yet evaluated</div>
                  <div><span className="font-medium text-blue-600">Qualified:</span> Ready for employer review</div>
                  <div><span className="font-medium text-green-600">Interview:</span> Candidate invited to interview</div>
                  <div><span className="font-medium text-orange-600">Final Review:</span> In last evaluation phase</div>
                  <div><span className="font-medium text-emerald-600">Passed:</span> Pre-screened and handed to employer process</div>
                </div>
              </TooltipContent>
            </Tooltip>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Configure
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Job Posting Filter Modal */}
        <Dialog open={showJobFilter} onOpenChange={setShowJobFilter}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Select Job Posting</DialogTitle>
              <DialogDescription>
                View pipeline for all jobs or focus on a specific posting.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search job titles..."
                  value={jobSearchQuery}
                  onChange={(e) => setJobSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Job List */}
              <div className="max-h-80 overflow-y-auto space-y-2">
                {/* All Jobs Option */}
                <div 
                  className={`p-3 rounded-lg border cursor-pointer transition-all hover:bg-muted ${
                    selectedJobId === 'all' ? 'border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20' : 'border-border'
                  }`}
                  onClick={() => setSelectedJobId('all')}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                      <Briefcase className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">All Job Postings</div>
                      <div className="text-sm text-muted-foreground">
                        {mockJobPostings.reduce((total, job) => total + job.applications, 0)} total applications
                      </div>
                    </div>
                    {selectedJobId === 'all' && (
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                    )}
                  </div>
                </div>

                {/* Individual Jobs */}
                {filteredJobs.map((job) => (
                  <div 
                    key={job.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all hover:bg-muted ${
                      selectedJobId === job.id ? 'border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20' : 'border-border'
                    }`}
                    onClick={() => setSelectedJobId(job.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                        <Briefcase className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{job.title}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                          <MapPin className="h-3 w-3" />
                          {job.location}
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${
                              job.status === 'Published' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                              job.status === 'Draft' ? 'bg-muted text-foreground' :
                              'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                            }`}
                          >
                            {job.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {job.applications} applications
                        </div>
                      </div>
                      {selectedJobId === job.id && (
                        <CheckCircle className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setShowJobFilter(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleJobFilterApply} className="flex-1">
                  Apply Filter
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Stage Definitions Panel */}
        <Collapsible open={showStageDefinitions} onOpenChange={setShowStageDefinitions}>
          <CollapsibleContent>
            <Card className="bg-muted border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Pipeline Stage Definitions
                </CardTitle>
                <CardDescription>
                  Understanding each stage of your hiring workflow
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {stageDefinitions.map((stage) => (
                  <div key={stage.id} className="flex items-start gap-4 p-4 bg-card rounded-lg border border-border">
                    <div className={`w-12 h-12 rounded-full border-2 ${stage.color} bg-card flex items-center justify-center`}>
                      {stage.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium">{stage.name}</h3>
                        {stage.requiresFeedback && (
                          <Badge variant="outline" className="bg-orange-100 text-orange-800">
                            Feedback Required
                          </Badge>
                        )}
                        {stage.aiSupported && (
                          <Badge variant="outline" className="bg-purple-100 text-purple-800">
                            <Brain className="h-3 w-3 mr-1" />
                            AI Supported
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{stage.description}</p>
                    </div>
                    <div className="text-right text-sm">
                      <div className="font-medium">{stage.count} candidates</div>
                      <div className="text-muted-foreground">Avg: {stage.avgTime}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>

        {/* Pipeline Metrics Bar */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 dark:from-blue-950/40 dark:to-indigo-950/40 dark:border-blue-900">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-900 dark:text-blue-300">{currentMetrics.totalCandidates}</div>
                <div className="text-sm text-blue-700 dark:text-blue-400">Total in Pipeline</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-900 dark:text-blue-300">{currentMetrics.avgDaysPerStage}d</div>
                <div className="text-sm text-blue-700 dark:text-blue-400">Avg. Days/Stage</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">{currentMetrics.dropOffRate}%</div>
                <div className="text-sm text-red-700 dark:text-red-300">Drop-off Rate</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-orange-700 dark:text-orange-300">Bottleneck:</div>
                <div className="text-sm text-orange-600 dark:text-orange-400">{currentMetrics.bottleneckStage}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">{currentMetrics.activeInterviews}</div>
                <div className="text-sm text-green-700 dark:text-green-300">Active Interviews</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{currentMetrics.pendingFeedback}</div>
                <div className="text-sm text-purple-700 dark:text-purple-300">Pending Feedback</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timeline Workflow Visual */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Workflow Timeline
              {selectedJob && (
                <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                  {selectedJob.title}
                </Badge>
              )}
            </CardTitle>
            <CardDescription>
              Interactive pipeline stages with real-time status indicators
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute top-12 left-16 right-16 h-0.5 bg-border z-0"></div>
              
              <div className="flex justify-between items-start relative z-10">
                {filteredStages.map((stage, index) => (
                  <div 
                    key={stage.id} 
                    className="flex flex-col items-center cursor-pointer group"
                    onClick={() => setSelectedStage(selectedStage === stage.id ? null : stage.id)}
                  >
                    {/* Stage Circle */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div 
                          className={`relative w-24 h-24 rounded-full border-4 ${stage.color} bg-card flex items-center justify-center shadow-lg transition-all duration-200 group-hover:scale-110 ${
                            selectedStage === stage.id ? 'scale-110 ring-4 ring-blue-200 dark:ring-blue-900/50' : ''
                          }`}
                        >
                          {stage.icon}
                          {/* Status Indicator */}
                          <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full ${getStatusColor(stage.status)} border-2 border-border`}></div>
                          {/* Count Badge */}
                          <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium">
                            {stage.count}
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-xs">
                        <div className="text-center">
                          <div className="font-medium">{stage.name}</div>
                          <div className="text-sm text-muted-foreground mt-1">{stage.description}</div>
                          <div className="text-sm mt-2">
                            <span className="font-medium">{stage.count} candidates</span> • 
                            <span className="ml-1">Avg: {stage.avgTime}</span>
                          </div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                    
                    {/* Stage Info */}
                    <div className="mt-4 text-center min-w-[120px]">
                      <h3 className="font-medium text-sm leading-tight">{stage.name}</h3>
                      <div className="mt-2 flex items-center justify-center gap-2">
                        <Badge variant="outline" className={getStatusBadgeColor(stage.status)}>
                          {stage.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{stage.avgTime}</span>
                      </div>
                    </div>
                    
                    {/* Arrow */}
                    {index < filteredStages.length - 1 && (
                      <div className="absolute top-12 left-full w-8 flex justify-center">
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stage Overview Cards */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Stage Overview</h2>
            <div className="flex items-center gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter stages" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stages</SelectItem>
                  <SelectItem value="critical">Critical Only</SelectItem>
                  <SelectItem value="overdue">Has Overdue</SelectItem>
                  <SelectItem value="feedback">Needs Feedback</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 gap-6">
            {filteredStages.map((stage) => (
              <Card 
                key={stage.id} 
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 ${
                  selectedStage === stage.id ? 'ring-2 ring-blue-500 dark:ring-blue-400 shadow-lg' : ''
                }`}
                onClick={() => setSelectedStage(selectedStage === stage.id ? null : stage.id)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full border-2 ${stage.color} bg-card flex items-center justify-center`}>
                        {stage.icon}
                      </div>
                      <div>
                        <CardTitle className="text-base leading-tight">{stage.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className={`text-xs ${getStatusBadgeColor(stage.status)}`}>
                            {stage.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{stage.avgTime}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{stage.count}</div>
                      <div className="text-xs text-muted-foreground">candidates</div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  {stage.candidates.slice(0, 3).map((candidate) => (
                    <div key={candidate.id} className={`p-3 rounded-lg border-l-4 ${getPriorityColor(candidate.priority)} transition-all hover:shadow-sm`}>
                      <div className="flex items-center gap-3 mb-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={candidate.avatar} />
                          <AvatarFallback className="text-xs">{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-sm truncate">{candidate.name}</p>
                            <Badge variant="outline" className={`text-xs ${getPriorityBadgeColor(candidate.priority)}`}>
                              {candidate.priority}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground truncate">{candidate.position}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">{candidate.timeInStage}</span>
                          {candidate.hasNotes && <FileText className="h-3 w-3 text-blue-500" />}
                          {candidate.needsFeedback && <MessageSquare className="h-3 w-3 text-orange-500" />}
                        </div>
                        <div className="flex items-center gap-1">
                          {candidate.isOverdue && <AlertTriangle className="h-3 w-3 text-red-500" />}
                          {candidate.score && (
                            <span className="text-green-600 font-medium">{candidate.score}%</span>
                          )}
                        </div>
                      </div>
                      
                      {candidate.nextAction && (
                        <p className="text-xs text-blue-600 mt-2 font-medium">{candidate.nextAction}</p>
                      )}
                    </div>
                  ))}
                  
                  {stage.candidates.length > 3 && (
                    <Button variant="ghost" size="sm" className="w-full text-xs">
                      <Plus className="h-3 w-3 mr-1" />
                      View {stage.candidates.length - 3} more candidates
                    </Button>
                  )}
                  
                  {stage.candidates.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No candidates in this stage</p>
                      {selectedJob && (
                        <p className="text-xs mt-1">for {selectedJob.title}</p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}