import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { Textarea } from "./ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { CandidateApplicationTracker } from "./CandidateApplicationTracker";
import { PipelineProgress } from "./PipelineProgress";
import { ApplicationCard } from "./ApplicationCard";
import { CandidateAssessmentDashboard } from "./CandidateAssessmentDashboard";
import { CandidateAssessmentInterface } from "./CandidateAssessmentInterface";
import { CandidateCaseStudyInterface } from "./CandidateCaseStudyInterface";
import { CandidateAssessmentResults } from "./CandidateAssessmentResults";
import { mockPipelineApplications } from "../data/pipelineMockData";
import { candidateAssessments, candidateCaseStudies } from "../data/assessmentMockData";
import type { PipelineApplication } from "../types/pipeline";
import { 
  CheckCircle,
  Clock,
  X,
  Calendar,
  Building,
  MapPin,
  ExternalLink,
  FileText,
  User,
  MessageSquare,
  Video,
  ChevronRight,
  Filter,
  Search,
  MoreHorizontal,
  Eye,
  ArrowLeft,
  Download,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  CircleDot,
  Heart,
  Archive,
  RotateCcw,
  DollarSign,
  TrendingUp,
  Briefcase,
  Star,
  Plus,
  Grid3X3,
  List,
  Move,
  Send,
  Bell,
  Trash2,
  TrendingDown,
  Users,
  Mail,
  ArrowUpDown,
  SortAsc,
  SortDesc,
  CheckSquare,
  FolderOpen,
  Tag,
  Columns3,
  Code,
  Target,
  Brain
} from "lucide-react";

 type SortKey = 'date-newest' | 'date-oldest' | 'company-az' | 'role-az' | 'status' | 'progress';

interface Application {
  id: string;
  jobTitle: string;
  company: string;
  companyLogo: string;
  location: string;
  appliedDate: string;
  currentStage: number;
  stages: ApplicationStage[];
  notes: string;
  jobType: string;
  salary?: string;
  jobId?: string;
  status: 'in-progress' | 'offer-received' | 'not-selected' | 'withdrawn' | 'passed';
  skills?: string[];
  closingDate?: string;
  savedDate?: string;
  archived?: boolean;
  priority?: boolean;
  lastActivity?: string;
  nextStep?: string;
  tags?: string[];
  workType?: 'remote' | 'hybrid' | 'onsite';
  offerDetails?: {
    value: string;
    expiryDate: string;
    status: 'awaiting' | 'counteroffer' | 'accepted' | 'declined';
    benefits?: string[];
  };
}

interface ApplicationStage {
  id: number;
  name: string;
  status: 'completed' | 'active' | 'rejected' | 'pending';
  date?: string;
  duration?: string;
  description: string;
  details?: string;
  feedback?: string;
  attachments?: Array<{ name: string; url: string; type: string }>;
  nextSteps?: string;
  requirements?: string[];
}

const mockApplications: Application[] = [
  {
    id: '1',
    jobTitle: 'Senior Frontend Developer',
    company: 'TechFlow Inc.',
    companyLogo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=150&h=150&fit=crop',
    location: 'San Francisco, CA',
    salary: '$140k - $180k',
    appliedDate: '2024-01-15',
    currentStage: 3,
    status: 'in-progress',
    notes: 'Really excited about this opportunity. Tech stack aligns perfectly with my skills.',
    jobType: 'Full-time',
    jobId: 'tf-001',
    skills: ['React', 'TypeScript', 'Node.js'],
    workType: 'hybrid',
    priority: true,
    lastActivity: '2024-01-25',
    nextStep: 'Interview round ongoing',
    tags: ['high-priority', 'tech-stack-match'],
    closingDate: '2024-02-15',
    stages: [
      {
        id: 1,
        name: 'Applied',
        status: 'completed',
        date: '2024-01-15',
        description: 'Application submitted'
      },
      {
        id: 2,
        name: 'Qualified',
        status: 'completed',
        date: '2024-01-17',
        description: 'Tests and case study successfully completed'
      },
      {
        id: 3,
        name: 'Interview',
        status: 'active',
        date: '2024-01-20',
        description: 'First interview process ongoing'
      },
      {
        id: 4,
        name: 'Final Review',
        status: 'pending',
        description: 'Employer will conduct detailed review'
      },
      {
        id: 5,
        name: 'Passed',
        status: 'pending',
        description: 'Candidate will be handed over to employer pipeline'
      }
    ]
  },
  {
    id: '2',
    jobTitle: 'UX Designer',
    company: 'DesignFirst',
    companyLogo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=150&h=150&fit=crop',
    location: 'Los Angeles, CA',
    salary: '$110k - $140k',
    appliedDate: '2024-01-20',
    currentStage: 5,
    status: 'passed',
    notes: 'Amazing design team and portfolio. Dream job opportunity.',
    jobType: 'Full-time',
    jobId: 'df-004',
    skills: ['Figma', 'Design Systems', 'User Research'],
    workType: 'remote',
    lastActivity: '2024-02-02',
    nextStep: 'Candidate moved to company pipeline',
    tags: ['dream-job', 'passed'],
    stages: [
      {
        id: 1,
        name: 'Applied',
        status: 'completed',
        date: '2024-01-20',
        description: 'Application submitted'
      },
      {
        id: 2,
        name: 'Qualified',
        status: 'completed',
        date: '2024-01-22',
        description: 'Tests and case study successfully completed'
      },
      {
        id: 3,
        name: 'Interview',
        status: 'completed',
        date: '2024-01-26',
        description: 'Interview conducted with employer'
      },
      {
        id: 4,
        name: 'Final Review',
        status: 'completed',
        date: '2024-01-30',
        description: 'Employer completed detailed review'
      },
      {
        id: 5,
        name: 'Passed',
        status: 'completed',
        date: '2024-02-02',
        description: 'Candidate handed over to employer pipeline'
      }
    ]
  },
  {
    id: '3',
    jobTitle: 'Product Manager',
    company: 'StartupX',
    companyLogo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop',
    location: 'New York, NY',
    salary: '$120k - $150k',
    appliedDate: '2024-01-10',
    currentStage: 2,
    status: 'not-selected',
    notes: 'Interested in the product strategy role. Could be a good transition opportunity.',
    jobType: 'Full-time',
    jobId: 'sx-002',
    skills: ['Product Strategy', 'Analytics', 'Roadmapping'],
    workType: 'onsite',
    lastActivity: '2024-01-18',
    nextStep: 'Application closed',
    tags: ['transition', 'not-selected'],
    stages: [
      {
        id: 1,
        name: 'Applied',
        status: 'completed',
        date: '2024-01-10',
        description: 'Application submitted'
      },
      {
        id: 2,
        name: 'Qualified',
        status: 'rejected',
        date: '2024-01-18',
        description: 'Candidate was not advanced',
        feedback: 'Thank you for your interest. We decided to move forward with candidates who have more direct PM experience.'
      }
    ]
  }
];

export function ApplicationsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState<'list' | 'card' | 'kanban' | 'pipeline' | 'assessments'>('list');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [isDetailSheetOpen, setIsDetailSheetOpen] = useState(false);
  const [isWithdrawDialogOpen, setIsWithdrawDialogOpen] = useState(false);
  const [withdrawReason, setWithdrawReason] = useState('');
  const [sortBy, setSortBy] = useState<SortKey>('date-newest');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedApplications, setSelectedApplications] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCompany, setFilterCompany] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  
  // Assessment state
  const [assessmentView, setAssessmentView] = useState<'dashboard' | 'taking' | 'results'>('dashboard');
  const [currentAssessment, setCurrentAssessment] = useState<any>(null);
  const [currentCaseStudy, setCurrentCaseStudy] = useState<any>(null);

  const getFilteredApplications = () => {
    let filtered = mockApplications;
    
    // Filter by sub-tab
    switch (activeTab) {
      case 'all':
        filtered = mockApplications;
        break;
      case 'in-progress':
        filtered = mockApplications.filter(app => app.status === 'in-progress');
        break;
      case 'offers':
        filtered = mockApplications.filter(app => app.status === 'offer-received');
        break;
      case 'rejected':
        filtered = mockApplications.filter(app => app.status === 'not-selected');
        break;
      case 'archived':
        filtered = mockApplications.filter(app => app.archived);
        break;
      default:
        filtered = mockApplications;
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(app => 
        app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.skills?.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date-newest':
          return new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime();
        case 'date-oldest':
          return new Date(a.appliedDate).getTime() - new Date(b.appliedDate).getTime();
        case 'company-az':
          return a.company.localeCompare(b.company);
        case 'role-az':
          return a.jobTitle.localeCompare(b.jobTitle);
        case 'status':
          return a.status.localeCompare(b.status);
        case 'progress':
          const aProgress = a.stages.filter(s => s.status === 'completed').length / a.stages.length;
          const bProgress = b.stages.filter(s => s.status === 'completed').length / b.stages.length;
          return bProgress - aProgress;
        default:
          return 0;
      }
    });

    return filtered;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'offer-received':
        return <Badge className="bg-green-100 text-green-800">Offer Received</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>;
      case 'not-selected':
        return <Badge className="bg-red-100 text-red-800">Not Selected</Badge>;
      case 'withdrawn':
        return <Badge className="bg-gray-100 text-gray-800">Withdrawn</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getProgressInfo = (app: Application) => {
    const completedStages = app.stages.filter(stage => stage.status === 'completed').length;
    const totalStages = app.stages.length;
    return { completed: completedStages, total: totalStages, percentage: (completedStages / totalStages) * 100 };
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const stats = {
    total: mockApplications.length,
    active: mockApplications.filter(app => app.status === 'in-progress').length,
    offers: mockApplications.filter(app => app.status === 'offer-received').length,
    rejected: mockApplications.filter(app => app.status === 'not-selected').length,
    timeToOffer: '18', // Mock data - median days
    followUpsDue: 2 // Mock data
  };

  const handleViewApplication = (app: Application) => {
    setSelectedApplication(app);
  };

  const handleSelectApplication = (appId: string, selected: boolean) => {
    if (selected) {
      setSelectedApplications([...selectedApplications, appId]);
    } else {
      setSelectedApplications(selectedApplications.filter(id => id !== appId));
    }
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedApplications(getFilteredApplications().map(app => app.id));
    } else {
      setSelectedApplications([]);
    }
  };

  const renderEmptyState = () => {
    const emptyStateConfig = {
      'all': {
        title: 'No applications yet',
        message: 'Start applying to jobs to track your applications here!',
        icon: FolderOpen,
        action: 'Browse Jobs'
      },
      'in-progress': {
        title: 'No applications in progress',
        message: 'Your active applications will appear here once you apply to jobs.',
        icon: CircleDot,
        action: 'Browse Jobs'
      },
      'offers': {
        title: 'No offers received yet',
        message: 'Keep applying! Your job offers and negotiations will appear here.',
        icon: Star,
        action: 'View All Applications'
      },
      'rejected': {
        title: 'No rejected applications',
        message: 'Applications that are not selected or closed will appear here.',
        icon: XCircle,
        action: 'View All Applications'
      },
      'saved': {
        title: 'No saved applications',
        message: 'Applications you save for later review will appear here.',
        icon: Heart,
        action: 'Browse Jobs'
      },
      'archived': {
        title: 'No archived applications',
        message: 'Applications you archive will appear here.',
        icon: Archive,
        action: 'View All Applications'
      }
    };

    const config = emptyStateConfig[activeTab as keyof typeof emptyStateConfig] || emptyStateConfig.all;
    const IconComponent = config.icon;

    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <IconComponent className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2">{config.title}</h3>
          <p className="text-muted-foreground mb-4">{config.message}</p>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            {config.action}
          </Button>
        </CardContent>
      </Card>
    );
  };

  const renderListView = (applications: Application[]) => (
    <Card>
      <CardHeader>
        <CardTitle>Applications ({applications.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {applications.map((application) => (
            <div
              key={application.id}
              className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => handleViewApplication(application)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={selectedApplications.includes(application.id)}
                      onCheckedChange={(checked) => handleSelectApplication(application.id, checked as boolean)}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={application.companyLogo} alt={application.company} />
                      <AvatarFallback>{application.company.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <h3 className="font-semibold">{application.jobTitle}</h3>
                    <p className="text-muted-foreground">{application.company}</p>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                      <span><MapPin className="h-4 w-4 inline mr-1" />{application.location}</span>
                      {application.salary && (
                        <span><DollarSign className="h-4 w-4 inline mr-1" />{application.salary}</span>
                      )}
                      <span><Calendar className="h-4 w-4 inline mr-1" />Applied {formatDate(application.appliedDate)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Progress</div>
                    <div className="flex items-center space-x-2">
                      <Progress value={getProgressInfo(application).percentage} className="w-24" />
                      <span className="text-sm">{getProgressInfo(application).completed}/{getProgressInfo(application).total}</span>
                    </div>
                  </div>
                  {getStatusBadge(application.status)}
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderCardView = (applications: Application[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {applications.map((application) => (
        <Card key={application.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleViewApplication(application)}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Checkbox
                  checked={selectedApplications.includes(application.id)}
                  onCheckedChange={(checked) => handleSelectApplication(application.id, checked as boolean)}
                  onClick={(e) => e.stopPropagation()}
                />
                <Avatar className="w-10 h-10">
                  <AvatarImage src={application.companyLogo} alt={application.company} />
                  <AvatarFallback>{application.company.substring(0, 2)}</AvatarFallback>
                </Avatar>
              </div>
              {getStatusBadge(application.status)}
            </div>
            <h3 className="font-semibold mb-1">{application.jobTitle}</h3>
            <p className="text-muted-foreground mb-2">{application.company}</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div><MapPin className="h-4 w-4 inline mr-1" />{application.location}</div>
              {application.salary && (
                <div><DollarSign className="h-4 w-4 inline mr-1" />{application.salary}</div>
              )}
              <div><Calendar className="h-4 w-4 inline mr-1" />Applied {formatDate(application.appliedDate)}</div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span>Progress</span>
                <span>{getProgressInfo(application).completed}/{getProgressInfo(application).total}</span>
              </div>
              <Progress value={getProgressInfo(application).percentage} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderKanbanView = (applications: Application[]) => {
    const columns = [
      { id: 'in-progress', title: 'In Progress', status: 'in-progress' as const },
      { id: 'offers', title: 'Offers', status: 'offer-received' as const },
      { id: 'rejected', title: 'Not Selected', status: 'not-selected' as const },
      { id: 'withdrawn', title: 'Withdrawn', status: 'withdrawn' as const }
    ];

    return (
      <div className="grid grid-cols-4 gap-4">
        {columns.map((column) => {
          const columnApplications = applications.filter(app => app.status === column.status);
          return (
            <Card key={column.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">{column.title}</CardTitle>
                  <Badge variant="secondary">{columnApplications.length}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {columnApplications.map((application) => (
                  <Card key={application.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleViewApplication(application)}>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={application.companyLogo} alt={application.company} />
                          <AvatarFallback>{application.company.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{application.jobTitle}</h4>
                          <p className="text-xs text-muted-foreground truncate">{application.company}</p>
                        </div>
                      </div>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <div><Calendar className="h-3 w-3 inline mr-1" />{formatDate(application.appliedDate)}</div>
                      </div>
                      <div className="mt-3">
                        <Progress value={getProgressInfo(application).percentage} className="h-1" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {columnApplications.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    No applications
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  };

  const renderPipelineView = () => {
    return (
      <div className="space-y-6">
        <CandidateApplicationTracker 
          candidateEmail="sarah.chen@email.com"
          onViewJobDetail={(jobId) => console.log('View job detail:', jobId)}
          onTakeAssessment={(testName) => console.log('Take assessment:', testName)}
          onViewFeedback={(applicationId) => console.log('View feedback:', applicationId)}
        />
      </div>
    );
  };

  const renderAssessmentView = () => {
    if (assessmentView === 'taking' && currentAssessment) {
      return (
        <CandidateAssessmentInterface
          assessment={currentAssessment}
          onSubmit={(answers) => {
            console.log('Assessment submitted:', answers);
            setAssessmentView('results');
          }}
          onSave={(answers) => {
            console.log('Assessment saved:', answers);
          }}
          onExit={() => {
            setAssessmentView('dashboard');
            setCurrentAssessment(null);
          }}
        />
      );
    }
    
    if (assessmentView === 'taking' && currentCaseStudy) {
      return (
        <CandidateCaseStudyInterface
          caseStudy={currentCaseStudy}
          onSubmit={(submission) => {
            console.log('Case study submitted:', submission);
            setAssessmentView('results');
          }}
          onSave={(submission) => {
            console.log('Case study saved:', submission);
          }}
          onExit={() => {
            setAssessmentView('dashboard');
            setCurrentCaseStudy(null);
          }}
        />
      );
    }
    
    if (assessmentView === 'results') {
      return (
        <CandidateAssessmentResults
          assessment={currentAssessment}
          caseStudy={currentCaseStudy}
          onBack={() => {
            setAssessmentView('dashboard');
            setCurrentAssessment(null);
            setCurrentCaseStudy(null);
          }}
          onDownloadReport={() => {
            console.log('Download report');
          }}
          onShareResults={() => {
            console.log('Share results');
          }}
        />
      );
    }
    
    return (
      <CandidateAssessmentDashboard
        candidateEmail="sarah.chen@email.com"
        onStartAssessment={(assessmentId) => {
          const assessment = candidateAssessments.find(a => a.id === assessmentId);
          if (assessment) {
            setCurrentAssessment(assessment);
            setAssessmentView('taking');
          }
        }}
        onStartCaseStudy={(caseStudyId) => {
          const caseStudy = candidateCaseStudies.find(cs => cs.id === caseStudyId);
          if (caseStudy) {
            setCurrentCaseStudy(caseStudy);
            setAssessmentView('taking');
          }
        }}
        onViewResults={(type, id) => {
          if (type === 'assessment') {
            const assessment = candidateAssessments.find(a => a.id === id);
            if (assessment) {
              setCurrentAssessment(assessment);
              setAssessmentView('results');
            }
          } else {
            const caseStudy = candidateCaseStudies.find(cs => cs.id === id);
            if (caseStudy) {
              setCurrentCaseStudy(caseStudy);
              setAssessmentView('results');
            }
          }
        }}
      />
    );
  };

  const renderApplicationContent = (applications: Application[]) => {
    if (viewMode === 'kanban') {
      return renderKanbanView(applications);
    } else if (viewMode === 'card') {
      return renderCardView(applications);
    } else if (viewMode === 'pipeline') {
      return renderPipelineView();
    } else if (viewMode === 'assessments') {
      return renderAssessmentView();
    } else {
      return renderListView(applications);
    }
  };

  // Render content based on active sub-tab
  const renderTabContent = () => {
    const filteredApps = getFilteredApplications();
    
    if (filteredApps.length === 0) {
      return renderEmptyState();
    }

    return renderApplicationContent(filteredApps);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Applications</h1>
            <p className="text-muted-foreground mt-1">Track and manage your job applications</p>
          </div>
          
          {/* Header Controls */}
          <div className="flex items-center space-x-3">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search applications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
            </div>
            
            {/* Filters Button */}
            <Sheet open={showFilters} onOpenChange={setShowFilters}>
              <SheetTrigger asChild>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Applications</SheetTitle>
                </SheetHeader>
                <div className="space-y-4 mt-6">
                  <div>
                    <label className="text-sm font-medium">Company</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="All companies" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All companies</SelectItem>
                        <SelectItem value="techflow">TechFlow Inc.</SelectItem>
                        <SelectItem value="designfirst">DesignFirst</SelectItem>
                        <SelectItem value="startupx">StartupX</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Job Type</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="All types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All types</SelectItem>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Work Type</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="All work types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All work types</SelectItem>
                        <SelectItem value="remote">Remote</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                        <SelectItem value="onsite">On-site</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Salary Range</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="All ranges" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All ranges</SelectItem>
                        <SelectItem value="under-100k">Under $100k</SelectItem>
                        <SelectItem value="100k-150k">$100k - $150k</SelectItem>
                        <SelectItem value="over-150k">Over $150k</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex justify-between pt-4">
                    <Button variant="outline">Clear</Button>
                    <Button>Apply Filters</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            
            {/* Sort Dropdown */}
            <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortKey)}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-newest">Applied Date (Newest)</SelectItem>
                <SelectItem value="date-oldest">Applied Date (Oldest)</SelectItem>
                <SelectItem value="company-az">Company A–Z</SelectItem>
                <SelectItem value="role-az">Role A–Z</SelectItem>
                <SelectItem value="status">Status</SelectItem>
                <SelectItem value="progress">Progress</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-6 gap-4 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="text-2xl font-semibold">{stats.total}</p>
                    <div className="flex items-center text-xs text-green-600 mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +2 this week
                    </div>
                  </div>
                  <Briefcase className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active</p>
                    <p className="text-2xl font-semibold text-blue-600">{stats.active}</p>
                    <div className="flex items-center text-xs text-blue-600 mt-1">
                      <CircleDot className="h-3 w-3 mr-1" />
                      In progress
                    </div>
                  </div>
                  <CircleDot className="h-8 w-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Offers</p>
                    <p className="text-2xl font-semibold text-green-600">{stats.offers}</p>
                    <div className="flex items-center text-xs text-green-600 mt-1">
                      <Star className="h-3 w-3 mr-1" />
                      Success rate
                    </div>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Rejected</p>
                    <p className="text-2xl font-semibold text-red-600">{stats.rejected}</p>
                    <div className="flex items-center text-xs text-red-600 mt-1">
                      <XCircle className="h-3 w-3 mr-1" />
                      Learning ops
                    </div>
                  </div>
                  <XCircle className="h-8 w-8 text-red-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Time to Offer</p>
                    <p className="text-2xl font-semibold">{stats.timeToOffer}d</p>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      Median time
                    </div>
                  </div>
                  <Clock className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Follow-ups Due</p>
                    <p className="text-2xl font-semibold text-orange-600">{stats.followUpsDue}</p>
                    <div className="flex items-center text-xs text-orange-600 mt-1">
                      <Bell className="h-3 w-3 mr-1" />
                      Action needed
                    </div>
                  </div>
                  <Bell className="h-8 w-8 text-orange-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* View Mode Controls */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <Button 
                variant={viewMode === 'list' ? "default" : "ghost"} 
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4 mr-2" />
                List
              </Button>
              <Button 
                variant={viewMode === 'card' ? "default" : "ghost"} 
                size="sm"
                onClick={() => setViewMode('card')}
              >
                <Grid3X3 className="h-4 w-4 mr-2" />
                Cards
              </Button>
              <Button 
                variant={viewMode === 'kanban' ? "default" : "ghost"} 
                size="sm"
                onClick={() => setViewMode('kanban')}
              >
                <Columns3 className="h-4 w-4 mr-2" />
                Kanban
              </Button>
              <Button 
                variant={viewMode === 'pipeline' ? "default" : "ghost"} 
                size="sm"
                onClick={() => setViewMode('pipeline')}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Pipeline
              </Button>
              <Button 
                variant={viewMode === 'assessments' ? "default" : "ghost"} 
                size="sm"
                onClick={() => setViewMode('assessments')}
              >
                <Brain className="h-4 w-4 mr-2" />
                Assessments
              </Button>
            </div>
            
            {selectedApplications.length > 0 && (
              <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-lg">
                <span className="text-sm text-blue-700">{selectedApplications.length} selected</span>
                <Button size="sm" variant="outline">
                  <Archive className="h-4 w-4 mr-1" />
                  Archive
                </Button>
                <Button size="sm" variant="outline">
                  <Tag className="h-4 w-4 mr-1" />
                  Add Tag
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </Button>
              </div>
            )}
          </div>

          {/* Tab-specific Content */}
          {renderTabContent()}
        </div>
      </div>

      {/* Application Detail Modal */}
      <Dialog open={!!selectedApplication} onOpenChange={() => setSelectedApplication(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
            <DialogDescription>
              View detailed information about your job application
            </DialogDescription>
          </DialogHeader>
          {selectedApplication && (
            <div className="space-y-6 mt-6">
              {/* Application Header */}
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={selectedApplication.companyLogo} alt={selectedApplication.company} />
                  <AvatarFallback>{selectedApplication.company.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">{selectedApplication.jobTitle}</h2>
                  <p className="text-muted-foreground">{selectedApplication.company}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                    <span><MapPin className="h-4 w-4 inline mr-1" />{selectedApplication.location}</span>
                    <span><DollarSign className="h-4 w-4 inline mr-1" />{selectedApplication.salary}</span>
                    <span><Calendar className="h-4 w-4 inline mr-1" />Applied {formatDate(selectedApplication.appliedDate)}</span>
                  </div>
                </div>
                <div className="text-right">
                  {getStatusBadge(selectedApplication.status)}
                </div>
              </div>

              {/* Application Progress */}
              <Card>
                <CardHeader>
                  <CardTitle>Application Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedApplication.stages.map((stage, index) => (
                      <div key={stage.id} className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          stage.status === 'completed' ? 'bg-green-100 text-green-600' :
                          stage.status === 'active' ? 'bg-blue-100 text-blue-600' :
                          stage.status === 'rejected' ? 'bg-red-100 text-red-600' :
                          'bg-gray-100 text-gray-400'
                        }`}>
                          {stage.status === 'completed' ? <CheckCircle className="h-5 w-5" /> :
                           stage.status === 'active' ? <Clock className="h-5 w-5" /> :
                           stage.status === 'rejected' ? <X className="h-5 w-5" /> :
                           <div className="w-3 h-3 rounded-full bg-current" />}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{stage.name}</h4>
                          <p className="text-sm text-muted-foreground">{stage.description}</p>
                          {stage.date && <p className="text-xs text-muted-foreground">{formatDate(stage.date)}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Notes */}
              {selectedApplication.notes && (
                <Card>
                  <CardHeader>
                    <CardTitle>Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{selectedApplication.notes}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}