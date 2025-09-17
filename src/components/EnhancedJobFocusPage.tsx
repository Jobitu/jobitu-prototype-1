import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Switch } from "./ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { Checkbox } from "./ui/checkbox";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { toast } from "sonner@2.0.3";
import { motion, AnimatePresence } from "motion/react";
import { 
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  Building,
  Star,
  Heart,
  Edit,
  X,
  Plus,
  Eye,
  Filter,
  Users,
  TrendingUp,
  TrendingDown,
  Target,
  CheckCircle,
  Bell,
  BellRing,
  Settings,
  Search,
  BookOpen,
  AlertCircle,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Play,
  Pause,
  Archive,
  BarChart3,
  Calendar,
  Bookmark,
  Trash2,
  Copy,
  RefreshCw,
  Activity,
  Zap,
  Award,
  HelpCircle,
  ArrowUp,
  ArrowDown,
  FileText,
  PieChart,
  LineChart,
  Lightbulb,
  Check,
  Mail
} from "lucide-react";

interface JobFocus {
  id: string;
  title: string;
  active: boolean;
  notifications: boolean;
  recommendations: number;
  newJobs: number;
  matchingJobs: number;
  appliedJobs: number;
  successRate: number;
  trendDirection: 'up' | 'down' | 'stable';
  criteria: {
    location: string[];
    salaryMin: number;
    salaryMax: number;
    jobType: string[];
    experience: string;
    skills: string[];
    benefits: string[];
  };
  alerts: {
    newJobs: boolean;
    salaryAbove: number;
    highMatch: boolean;
  };
  createdDate: string;
  lastUpdated: string;
  matchPercentage: number;
}

interface JobAlert {
  id: string;
  focusId: string;
  type: 'new_job' | 'high_match' | 'salary_alert' | 'application_deadline';
  title: string;
  description: string;
  job?: {
    title: string;
    company: string;
    salary: string;
    matchPercentage: number;
  };
  timestamp: string;
  read: boolean;
}

interface SavedSearch {
  id: string;
  name: string;
  query: string;
  filters: {
    location?: string[];
    experience?: string;
    salary?: number[];
    jobType?: string[];
  };
  alertEnabled: boolean;
  resultCount: number;
  previousResultCount: number;
  lastRun: string;
  createdDate: string;
}

const mockJobFocuses: JobFocus[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    active: true,
    notifications: true,
    recommendations: 12,
    newJobs: 3,
    matchingJobs: 8,
    appliedJobs: 2,
    successRate: 85,
    trendDirection: 'up',
    criteria: {
      location: ['San Francisco', 'Remote', 'New York'],
      salaryMin: 140000,
      salaryMax: 200000,
      jobType: ['Full-time'],
      experience: 'Senior (5-10 years)',
      skills: ['React', 'TypeScript', 'Next.js', 'GraphQL'],
      benefits: ['Remote Work', 'Health Insurance', '401k Match']
    },
    alerts: {
      newJobs: true,
      salaryAbove: 160000,
      highMatch: true
    },
    createdDate: '2024-01-15',
    lastUpdated: '2024-01-20',
    matchPercentage: 92
  },
  {
    id: '2',
    title: 'Product Manager',
    active: true,
    notifications: false,
    recommendations: 6,
    newJobs: 1,
    matchingJobs: 4,
    appliedJobs: 1,
    successRate: 78,
    trendDirection: 'stable',
    criteria: {
      location: ['San Francisco', 'Austin', 'Seattle'],
      salaryMin: 150000,
      salaryMax: 250000,
      jobType: ['Full-time'],
      experience: 'Senior (5-10 years)',
      skills: ['Product Strategy', 'Analytics', 'User Research', 'Roadmapping'],
      benefits: ['Stock Options', 'Health Insurance']
    },
    alerts: {
      newJobs: false,
      salaryAbove: 200000,
      highMatch: true
    },
    createdDate: '2024-01-10',
    lastUpdated: '2024-01-18',
    matchPercentage: 88
  },
  {
    id: '3',
    title: 'UX Designer',
    active: false,
    notifications: false,
    recommendations: 4,
    newJobs: 0,
    matchingJobs: 3,
    appliedJobs: 0,
    successRate: 65,
    trendDirection: 'down',
    criteria: {
      location: ['Los Angeles', 'Remote'],
      salaryMin: 110000,
      salaryMax: 160000,
      jobType: ['Full-time', 'Contract'],
      experience: 'Mid (3-5 years)',
      skills: ['Figma', 'Design Systems', 'User Research', 'Prototyping'],
      benefits: ['Creative Budget', 'Flexible Hours']
    },
    alerts: {
      newJobs: false,
      salaryAbove: 140000,
      highMatch: false
    },
    createdDate: '2024-01-05',
    lastUpdated: '2024-01-12',
    matchPercentage: 73
  }
];

const mockJobAlerts: JobAlert[] = [
  {
    id: '1',
    focusId: '1',
    type: 'new_job',
    title: 'New high-match job available',
    description: 'A new Senior Frontend Developer position matches your criteria',
    job: {
      title: 'Senior Frontend Developer',
      company: 'TechFlow Inc.',
      salary: '$160k - $190k',
      matchPercentage: 94
    },
    timestamp: '2024-01-20T10:30:00Z',
    read: false
  },
  {
    id: '2',
    focusId: '1',
    type: 'salary_alert',
    title: 'High salary opportunity',
    description: 'New job exceeds your salary threshold',
    job: {
      title: 'Lead Frontend Engineer',
      company: 'BigTech Corp',
      salary: '$180k - $220k',
      matchPercentage: 89
    },
    timestamp: '2024-01-19T15:45:00Z',
    read: true
  },
  {
    id: '3',
    focusId: '2',
    type: 'high_match',
    title: '95% match found',
    description: 'Excellent Product Manager opportunity',
    job: {
      title: 'Senior Product Manager',
      company: 'InnovateCorp',
      salary: '$170k - $210k',
      matchPercentage: 95
    },
    timestamp: '2024-01-19T09:15:00Z',
    read: false
  },
  {
    id: '4',
    focusId: '1',
    type: 'application_deadline',
    title: 'Application deadline approaching',
    description: 'Applications close in 2 days for saved job',
    job: {
      title: 'React Developer',
      company: 'StartupCorp',
      salary: '$145k - $165k',
      matchPercentage: 87
    },
    timestamp: '2024-01-18T14:20:00Z',
    read: false
  }
];

const mockSavedSearches: SavedSearch[] = [
  {
    id: '1',
    name: 'React Developer Remote',
    query: 'React Developer',
    filters: { location: ['Remote'], experience: 'Senior' },
    alertEnabled: true,
    resultCount: 27,
    previousResultCount: 24,
    lastRun: '2024-01-20T08:00:00Z',
    createdDate: '2024-01-10T10:00:00Z'
  },
  {
    id: '2',
    name: 'Product Manager Bay Area',
    query: 'Product Manager',
    filters: { location: ['San Francisco', 'Palo Alto'], salary: [150000, 250000] },
    alertEnabled: false,
    resultCount: 15,
    previousResultCount: 18,
    lastRun: '2024-01-19T12:00:00Z',
    createdDate: '2024-01-08T15:30:00Z'
  },
  {
    id: '3',
    name: 'UX Designer Contract',
    query: 'UX Designer',
    filters: { jobType: ['Contract', 'Freelance'], experience: 'Mid' },
    alertEnabled: true,
    resultCount: 12,
    previousResultCount: 12,
    lastRun: '2024-01-20T07:15:00Z',
    createdDate: '2024-01-12T09:45:00Z'
  }
];

interface EnhancedJobFocusPageProps {
  activeSubTab?: string;
}

export function EnhancedJobFocusPage({ 
  activeSubTab = 'job-focus'
}: EnhancedJobFocusPageProps) {
  const [selectedFocuses, setSelectedFocuses] = useState<Set<string>>(new Set());
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [activeTab, setActiveTab] = useState<'focuses' | 'alerts' | 'searches'>('focuses');
  const [alertFilters, setAlertFilters] = useState({
    unreadOnly: false,
    newJobsOnly: false,
    salaryAlertsOnly: false
  });
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [currentOnboardingStep, setCurrentOnboardingStep] = useState(1);
  const [expandedCriteria, setExpandedCriteria] = useState<Set<string>>(new Set());
  const [newFocus, setNewFocus] = useState<Partial<JobFocus>>({
    title: '',
    active: true,
    notifications: true,
    criteria: {
      location: [],
      salaryMin: 80000,
      salaryMax: 200000,
      jobType: [],
      experience: '',
      skills: [],
      benefits: []
    },
    alerts: {
      newJobs: true,
      salaryAbove: 150000,
      highMatch: true
    }
  });

  // Stats calculations
  const stats = {
    activeFocuses: mockJobFocuses.filter(f => f.active).length,
    totalFocuses: mockJobFocuses.length,
    unreadAlerts: mockJobAlerts.filter(a => !a.read).length,
    totalAlerts: mockJobAlerts.length,
    savedSearches: mockSavedSearches.length,
    enabledSearchAlerts: mockSavedSearches.filter(s => s.alertEnabled).length
  };

  const toggleFocusActive = (focusId: string) => {
    toast.success("Focus status updated");
  };

  const toggleNotifications = (focusId: string) => {
    toast.success("Notification settings updated");
  };

  const handleBulkAction = (action: 'pause' | 'resume' | 'delete') => {
    if (selectedFocuses.size === 0) return;
    
    switch (action) {
      case 'pause':
        toast.success(`${selectedFocuses.size} focuses paused`);
        break;
      case 'resume':
        toast.success(`${selectedFocuses.size} focuses resumed`);
        break;
      case 'delete':
        toast.success(`${selectedFocuses.size} focuses deleted`);
        break;
    }
    setSelectedFocuses(new Set());
  };

  const markAlertAsRead = (alertId: string) => {
    toast.success("Alert marked as read");
  };

  const markAllAlertsAsRead = () => {
    toast.success("All alerts marked as read");
  };

  const saveJob = (alertId: string) => {
    toast.success("Job saved to your list");
  };

  const duplicateSearch = (searchId: string) => {
    toast.success("Search duplicated");
  };

  const createJobFocus = () => {
    console.log('Creating job focus:', newFocus);
    toast.success("Job focus created successfully");
    setShowCreateDialog(false);
    setNewFocus({
      title: '',
      active: true,
      notifications: true,
      criteria: {
        location: [],
        salaryMin: 80000,
        salaryMax: 200000,
        jobType: [],
        experience: '',
        skills: [],
        benefits: []
      },
      alerts: {
        newJobs: true,
        salaryAbove: 150000,
        highMatch: true
      }
    });
  };

  const filteredAlerts = mockJobAlerts.filter(alert => {
    if (alertFilters.unreadOnly && alert.read) return false;
    if (alertFilters.newJobsOnly && alert.type !== 'new_job') return false;
    if (alertFilters.salaryAlertsOnly && alert.type !== 'salary_alert') return false;
    return true;
  });

  const getJobTypeDistribution = () => {
    const distribution: Record<string, number> = {};
    mockJobFocuses.forEach(focus => {
      focus.criteria.jobType.forEach(type => {
        distribution[type] = (distribution[type] || 0) + 1;
      });
    });
    return distribution;
  };

  const getIndustryDistribution = () => {
    // Mock industry data based on job titles
    return {
      Technology: 2,
      Design: 1,
      Product: 1
    };
  };

  // Onboarding Steps Component
  const OnboardingTooltip = ({ step, children }: { step: number; children: React.ReactNode }) => {
    if (!showOnboarding || currentOnboardingStep !== step) return <>{children}</>;
    
    const tooltipContent = [
      "Create your first Job Focus to track specific roles and get personalized alerts",
      "Check your alerts regularly for new job recommendations and updates",
      "Save frequent searches to quickly access them later and set up alerts"
    ];

    return (
      <TooltipProvider>
        <Tooltip open={showOnboarding && currentOnboardingStep === step}>
          <TooltipTrigger asChild>{children}</TooltipTrigger>
          <TooltipContent side="bottom" className="max-w-xs">
            <div className="space-y-3">
              <p className="font-medium">Step {step} of 3</p>
              <p>{tooltipContent[step - 1]}</p>
              <div className="flex justify-between">
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => setShowOnboarding(false)}
                >
                  Skip Tour
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => {
                    if (step === 3) {
                      setShowOnboarding(false);
                    } else {
                      setCurrentOnboardingStep(step + 1);
                    }
                  }}
                >
                  {step === 3 ? 'Got it!' : 'Next'}
                </Button>
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  const FocusCard = ({ focus }: { focus: JobFocus }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      <Card className={`border transition-all duration-200 hover:shadow-lg cursor-pointer ${
        selectedFocuses.has(focus.id) ? 'ring-2 ring-blue-500 bg-blue-50' : 
        focus.active ? 'border-gray-200 hover:border-blue-300' : 'border-gray-200 bg-gray-50'
      }`}>
        <CardContent className="p-5">
          {/* Selection checkbox */}
          <div className="absolute top-3 left-3">
            <Checkbox
              checked={selectedFocuses.has(focus.id)}
              onCheckedChange={(checked) => {
                const newSelected = new Set(selectedFocuses);
                if (checked) {
                  newSelected.add(focus.id);
                } else {
                  newSelected.delete(focus.id);
                }
                setSelectedFocuses(newSelected);
              }}
            />
          </div>

          {/* Header */}
          <div className="flex items-start justify-between mb-4 pl-6">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-semibold text-lg">{focus.title}</h3>
                <Badge 
                  className={`text-lg px-3 py-1 ${
                    focus.matchPercentage >= 90 ? 'bg-green-100 text-green-800' :
                    focus.matchPercentage >= 80 ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {focus.matchPercentage}%
                </Badge>
              </div>
              <div className="flex items-center space-x-3">
                <div className={`flex items-center space-x-1 ${focus.active ? 'text-green-600' : 'text-gray-400'}`}>
                  <div className={`w-2 h-2 rounded-full ${focus.active ? 'bg-green-500' : 'bg-gray-400'}`} />
                  <span className="text-sm">{focus.active ? 'Active' : 'Paused'}</span>
                </div>
                {focus.notifications && focus.active && (
                  <div className="flex items-center space-x-1 text-blue-600">
                    <BellRing className="h-3 w-3" />
                    <span className="text-sm">Alerts On</span>
                  </div>
                )}
                <div className="flex items-center space-x-1 text-gray-600">
                  {focus.trendDirection === 'up' && <TrendingUp className="h-3 w-3 text-green-500" />}
                  {focus.trendDirection === 'down' && <TrendingDown className="h-3 w-3 text-red-500" />}
                  {focus.trendDirection === 'stable' && <Activity className="h-3 w-3 text-gray-400" />}
                  <span className="text-sm">{focus.successRate}% success</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowEditDialog(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Edit Focus</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFocusActive(focus.id);
                      }}
                    >
                      {focus.active ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{focus.active ? 'Pause' : 'Resume'}</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        toast.success("Focus deleted");
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Delete Focus</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Success Rate Trend</span>
              <span className="text-sm font-medium">{focus.successRate}%</span>
            </div>
            <Progress value={focus.successRate} className="h-2" />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">New Jobs</span>
                <Badge variant={focus.newJobs > 0 ? "default" : "secondary"} className="text-xs">
                  {focus.newJobs}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Matches</span>
                <span className="font-medium">{focus.matchingJobs}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Applied</span>
                <Badge variant="outline" className="text-xs text-green-600">
                  {focus.appliedJobs}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Response Rate</span>
                <span className="font-medium">
                  {focus.appliedJobs > 0 ? Math.round((focus.appliedJobs / focus.matchingJobs) * 100) : 0}%
                </span>
              </div>
            </div>
          </div>

          {/* Criteria Summary - Collapsible */}
          <Collapsible>
            <CollapsibleTrigger asChild>
              <Button 
                variant="ghost" 
                className="w-full justify-between p-0 h-auto"
                onClick={() => {
                  const newExpanded = new Set(expandedCriteria);
                  if (newExpanded.has(focus.id)) {
                    newExpanded.delete(focus.id);
                  } else {
                    newExpanded.add(focus.id);
                  }
                  setExpandedCriteria(newExpanded);
                }}
              >
                <span className="text-sm font-medium">Criteria Summary</span>
                {expandedCriteria.has(focus.id) ? 
                  <ChevronUp className="h-4 w-4" /> : 
                  <ChevronDown className="h-4 w-4" />
                }
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 pt-3">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-600">Salary:</span>
                  <p className="font-medium">
                    ${(focus.criteria.salaryMin / 1000).toFixed(0)}k - ${(focus.criteria.salaryMax / 1000).toFixed(0)}k
                  </p>
                </div>
                <div>
                  <span className="text-gray-600">Experience:</span>
                  <p className="font-medium">{focus.criteria.experience}</p>
                </div>
              </div>
              <div>
                <span className="text-gray-600 text-sm">Locations:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {focus.criteria.location.slice(0, 3).map((location, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {location}
                    </Badge>
                  ))}
                  {focus.criteria.location.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{focus.criteria.location.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
              <div>
                <span className="text-gray-600 text-sm">Skills:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {focus.criteria.skills.slice(0, 4).map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {focus.criteria.skills.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{focus.criteria.skills.length - 4} more
                    </Badge>
                  )}
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Footer */}
          <div className="mt-4 pt-3 border-t border-gray-200">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Updated {new Date(focus.lastUpdated).toLocaleDateString()}</span>
              <div className="flex items-center space-x-2">
                {focus.criteria.jobType.map((type, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {type}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const AlertCard = ({ alert }: { alert: JobAlert }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <Card className={`border transition-all duration-200 hover:shadow-md ${
        alert.read ? 'bg-white border-gray-200' : 'bg-blue-50 border-blue-200 shadow-sm'
      }`}>
        <CardContent className="p-5">
          <div className="flex items-start space-x-4">
            <div className={`p-3 rounded-xl flex-shrink-0 ${
              alert.type === 'new_job' ? 'bg-blue-100 text-blue-600' :
              alert.type === 'high_match' ? 'bg-green-100 text-green-600' :
              alert.type === 'salary_alert' ? 'bg-yellow-100 text-yellow-600' :
              'bg-red-100 text-red-600'
            }`}>
              {alert.type === 'new_job' && <Briefcase className="h-5 w-5" />}
              {alert.type === 'high_match' && <Star className="h-5 w-5" />}
              {alert.type === 'salary_alert' && <DollarSign className="h-5 w-5" />}
              {alert.type === 'application_deadline' && <Clock className="h-5 w-5" />}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-base">{alert.title}</h4>
                  {!alert.read && (
                    <Badge className="bg-blue-100 text-blue-800 text-xs mt-1">New</Badge>
                  )}
                </div>
                <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                  {new Date(alert.timestamp).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{alert.description}</p>
              
              {alert.job && (
                <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{alert.job.title}</span>
                    <Badge 
                      className={`text-sm ${
                        alert.job.matchPercentage >= 90 ? 'bg-green-100 text-green-800' :
                        alert.job.matchPercentage >= 80 ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {alert.job.matchPercentage}% match
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    <span>{alert.job.company}</span>
                    <span className="mx-2">•</span>
                    <span>{alert.job.salary}</span>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-3">
                {!alert.read && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => markAlertAsRead(alert.id)}
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Mark as Read
                  </Button>
                )}
                {alert.job && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => saveJob(alert.id)}
                  >
                    <Bookmark className="h-4 w-4 mr-1" />
                    Save Job
                  </Button>
                )}
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const SavedSearchCard = ({ search }: { search: SavedSearch }) => {
    const trendDirection = search.resultCount > search.previousResultCount ? 'up' : 
                          search.resultCount < search.previousResultCount ? 'down' : 'stable';
    const resultDiff = Math.abs(search.resultCount - search.previousResultCount);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="border border-gray-200 hover:shadow-md transition-all duration-200">
          <CardContent className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-semibold text-base mb-1">{search.name}</h4>
                <p className="text-sm text-gray-600 mb-2">"{search.query}"</p>
                
                {/* Filters Summary */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {search.filters.location && (
                    <Badge variant="secondary" className="text-xs">
                      {search.filters.location.join(', ')}
                    </Badge>
                  )}
                  {search.filters.experience && (
                    <Badge variant="secondary" className="text-xs">
                      {search.filters.experience}
                    </Badge>
                  )}
                  {search.filters.jobType && (
                    <Badge variant="secondary" className="text-xs">
                      {search.filters.jobType.join(', ')}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center">
                        <Switch 
                          checked={search.alertEnabled} 
                          onCheckedChange={() => toast.success("Alert settings updated")}
                          size="sm"
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      {search.alertEnabled ? 'Alerts enabled' : 'Alerts disabled'}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => duplicateSearch(search.id)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Duplicate Search</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Edit Search</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                        onClick={() => toast.success("Search deleted")}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Delete Search</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">Results:</span>
                  <span className="font-semibold">{search.resultCount}</span>
                  {trendDirection !== 'stable' && (
                    <div className="flex items-center space-x-1">
                      {trendDirection === 'up' ? (
                        <ArrowUp className="h-3 w-3 text-green-500" />
                      ) : (
                        <ArrowDown className="h-3 w-3 text-red-500" />
                      )}
                      <span className={`text-xs ${
                        trendDirection === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {resultDiff}
                      </span>
                    </div>
                  )}
                </div>
                <span className="text-gray-500">
                  Last run: {new Date(search.lastRun).toLocaleDateString()}
                </span>
              </div>
              <Button 
                size="sm" 
                variant="outline"
                className="flex items-center space-x-1"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Run Again</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  // Empty States
  const EmptyFocuses = () => (
    <div className="text-center py-16">
      <Target className="h-16 w-16 mx-auto text-gray-400 mb-4" />
      <h3 className="text-xl font-semibold mb-2">No Job Focuses Yet</h3>
      <p className="text-gray-600 mb-6">Create your first job focus to start tracking specific roles and getting personalized alerts.</p>
      <Button onClick={() => setShowCreateDialog(true)}>
        <Plus className="h-4 w-4 mr-2" />
        Create Your First Focus
      </Button>
    </div>
  );

  const EmptyAlerts = () => (
    <div className="text-center py-16">
      <Bell className="h-16 w-16 mx-auto text-gray-400 mb-4" />
      <h3 className="text-xl font-semibold mb-2">No Alerts</h3>
      <p className="text-gray-600">You'll see job alerts and notifications here once you set up job focuses.</p>
    </div>
  );

  const EmptySearches = () => (
    <div className="text-center py-16">
      <BookOpen className="h-16 w-16 mx-auto text-gray-400 mb-4" />
      <h3 className="text-xl font-semibold mb-2">No Saved Searches</h3>
      <p className="text-gray-600 mb-6">Save your frequent searches to quickly access them later and set up alerts.</p>
      <Button variant="outline">
        <Plus className="h-4 w-4 mr-2" />
        Save Current Search
      </Button>
    </div>
  );

  return (
    <TooltipProvider>
      <div className="flex flex-col h-full bg-gray-50">
        {/* Header with Summary Dashboard */}
        <div className="bg-white border-b border-gray-200 px-6 py-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-semibold">Job Focus Center</h1>
                <p className="text-muted-foreground mt-1">
                  Manage your focused searches, alerts, and saved searches in one place
                </p>
              </div>
              
              <OnboardingTooltip step={1}>
                <Button onClick={() => setShowCreateDialog(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Job Focus
                </Button>
              </OnboardingTooltip>
            </div>

            {/* Summary Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab('focuses')}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <Target className="h-6 w-6 text-blue-600" />
                        <h3 className="font-semibold">Active Focuses</h3>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl font-bold text-blue-600">{stats.activeFocuses}</span>
                        <div className="flex items-center text-green-600">
                          <TrendingUp className="h-4 w-4 mr-1" />
                          <span className="text-sm">+2 this week</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {stats.totalFocuses} total focuses
                      </p>
                    </div>
                    <div className="text-right">
                      <PieChart className="h-8 w-8 text-gray-400 mb-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <OnboardingTooltip step={2}>
                <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab('alerts')}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Bell className="h-6 w-6 text-orange-600" />
                          <h3 className="font-semibold">Unread Alerts</h3>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-3xl font-bold text-orange-600">{stats.unreadAlerts}</span>
                          {stats.unreadAlerts > 0 && (
                            <Badge className="bg-red-100 text-red-800 text-xs">New</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {stats.totalAlerts} total alerts
                        </p>
                      </div>
                      <div className="text-right">
                        <Activity className="h-8 w-8 text-gray-400 mb-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </OnboardingTooltip>

              <OnboardingTooltip step={3}>
                <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab('searches')}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <BookOpen className="h-6 w-6 text-purple-600" />
                          <h3 className="font-semibold">Saved Searches</h3>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-3xl font-bold text-purple-600">{stats.savedSearches}</span>
                          <div className="flex items-center text-blue-600">
                            <Mail className="h-4 w-4 mr-1" />
                            <span className="text-sm">{stats.enabledSearchAlerts} alerts</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Active search monitoring
                        </p>
                      </div>
                      <div className="text-right">
                        <LineChart className="h-8 w-8 text-gray-400 mb-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </OnboardingTooltip>
            </div>

            {/* Enhanced Tabs */}
            <Tabs value={activeTab} onValueChange={(value: any) => setActiveTab(value)}>
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="focuses" className="flex items-center space-x-2">
                  <Target className="h-4 w-4" />
                  <span>Job Focuses</span>
                  <Badge variant="secondary" className="text-xs">
                    {mockJobFocuses.filter(f => f.active).length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="alerts" className="flex items-center space-x-2">
                  <Bell className="h-4 w-4" />
                  <span>Alerts</span>
                  {stats.unreadAlerts > 0 && (
                    <Badge className="bg-red-100 text-red-800 text-xs">
                      {stats.unreadAlerts}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="searches" className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Saved Searches</span>
                  <Badge variant="secondary" className="text-xs">
                    {stats.savedSearches}
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <Tabs value={activeTab} onValueChange={() => {}}>
              <TabsContent value="focuses">
                <div className="space-y-6">
                  {/* Bulk Actions */}
                  <AnimatePresence>
                    {selectedFocuses.size > 0 && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-blue-50 border border-blue-200 rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">
                            {selectedFocuses.size} focus{selectedFocuses.size > 1 ? 'es' : ''} selected
                          </span>
                          <div className="flex items-center space-x-3">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleBulkAction('pause')}
                            >
                              <Pause className="h-4 w-4 mr-1" />
                              Pause All
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleBulkAction('resume')}
                            >
                              <Play className="h-4 w-4 mr-1" />
                              Resume All
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleBulkAction('delete')}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Delete Selected
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {mockJobFocuses.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                      {mockJobFocuses.map((focus) => (
                        <FocusCard key={focus.id} focus={focus} />
                      ))}
                    </div>
                  ) : (
                    <EmptyFocuses />
                  )}

                  {/* Optional Insights Panel */}
                  {mockJobFocuses.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Lightbulb className="h-5 w-5" />
                          <span>Focus Insights</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div>
                            <h4 className="font-medium mb-3">Industry Distribution</h4>
                            <div className="space-y-2">
                              {Object.entries(getIndustryDistribution()).map(([industry, count]) => (
                                <div key={industry} className="flex justify-between">
                                  <span className="text-sm">{industry}</span>
                                  <Badge variant="secondary" className="text-xs">{count}</Badge>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium mb-3">Job Type Preferences</h4>
                            <div className="space-y-2">
                              {Object.entries(getJobTypeDistribution()).map(([type, count]) => (
                                <div key={type} className="flex justify-between">
                                  <span className="text-sm">{type}</span>
                                  <Badge variant="secondary" className="text-xs">{count}</Badge>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium mb-3">AI Suggestion</h4>
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                              <p className="text-sm text-blue-800">
                                Add "React.js" to your skills to increase matches by 25%
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="alerts">
                <div className="space-y-6">
                  {/* Alert Filters */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <h3 className="font-semibold">Recent Alerts</h3>
                      <div className="flex items-center space-x-3">
                        <Button
                          variant={alertFilters.unreadOnly ? "default" : "outline"}
                          size="sm"
                          onClick={() => setAlertFilters({...alertFilters, unreadOnly: !alertFilters.unreadOnly})}
                        >
                          Unread Only
                        </Button>
                        <Button
                          variant={alertFilters.newJobsOnly ? "default" : "outline"}
                          size="sm"
                          onClick={() => setAlertFilters({...alertFilters, newJobsOnly: !alertFilters.newJobsOnly})}
                        >
                          New Jobs Only
                        </Button>
                        <Button
                          variant={alertFilters.salaryAlertsOnly ? "default" : "outline"}
                          size="sm"
                          onClick={() => setAlertFilters({...alertFilters, salaryAlertsOnly: !alertFilters.salaryAlertsOnly})}
                        >
                          Salary Alerts Only
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Button variant="outline" size="sm" onClick={markAllAlertsAsRead}>
                        <Check className="h-4 w-4 mr-1" />
                        Mark All as Read
                      </Button>
                      <Button variant="outline" size="sm">
                        <X className="h-4 w-4 mr-1" />
                        Clear All
                      </Button>
                    </div>
                  </div>

                  {filteredAlerts.length > 0 ? (
                    <div className="space-y-4">
                      {filteredAlerts.map((alert) => (
                        <AlertCard key={alert.id} alert={alert} />
                      ))}
                    </div>
                  ) : (
                    <EmptyAlerts />
                  )}
                </div>
              </TabsContent>

              <TabsContent value="searches">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Saved Searches</h3>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Save Current Search
                    </Button>
                  </div>

                  {mockSavedSearches.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {mockSavedSearches.map((search) => (
                        <SavedSearchCard key={search.id} search={search} />
                      ))}
                    </div>
                  ) : (
                    <EmptySearches />
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Enhanced Create Job Focus Dialog */}
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Job Focus</DialogTitle>
              <DialogDescription>
                Set up a focused job search with specific criteria and get personalized alerts.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Form - Left Side */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Job Focus Title *
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="inline h-3 w-3 ml-1 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Give your job focus a descriptive name that represents the role you're targeting</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </label>
                  <Input 
                    placeholder="e.g. Senior Frontend Developer"
                    value={newFocus.title || ''}
                    onChange={(e) => setNewFocus({ ...newFocus, title: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Minimum Salary</label>
                    <Input 
                      type="number"
                      placeholder="80000"
                      value={newFocus.criteria?.salaryMin || ''}
                      onChange={(e) => setNewFocus({ 
                        ...newFocus, 
                        criteria: { 
                          ...newFocus.criteria!, 
                          salaryMin: parseInt(e.target.value) || 0 
                        }
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Maximum Salary</label>
                    <Input 
                      type="number"
                      placeholder="200000"
                      value={newFocus.criteria?.salaryMax || ''}
                      onChange={(e) => setNewFocus({ 
                        ...newFocus, 
                        criteria: { 
                          ...newFocus.criteria!, 
                          salaryMax: parseInt(e.target.value) || 0 
                        }
                      })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Experience Level</label>
                  <Select 
                    value={newFocus.criteria?.experience || ''}
                    onValueChange={(value) => setNewFocus({ 
                      ...newFocus, 
                      criteria: { ...newFocus.criteria!, experience: value }
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Entry Level (0-2 years)">Entry Level (0-2 years)</SelectItem>
                      <SelectItem value="Mid (3-5 years)">Mid Level (3-5 years)</SelectItem>
                      <SelectItem value="Senior (5-10 years)">Senior (5-10 years)</SelectItem>
                      <SelectItem value="Lead (10+ years)">Lead/Principal (10+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Skills Multi-select */}
                <div>
                  <label className="block text-sm font-medium mb-2">Required Skills</label>
                  <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto border rounded-lg p-3">
                    {['React', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 'GraphQL', 'Next.js', 'Vue.js'].map((skill) => (
                      <label key={skill} className="flex items-center space-x-2">
                        <Checkbox
                          checked={newFocus.criteria?.skills?.includes(skill) || false}
                          onCheckedChange={(checked) => {
                            const currentSkills = newFocus.criteria?.skills || [];
                            const newSkills = checked 
                              ? [...currentSkills, skill]
                              : currentSkills.filter(s => s !== skill);
                            setNewFocus({
                              ...newFocus,
                              criteria: { ...newFocus.criteria!, skills: newSkills }
                            });
                          }}
                        />
                        <span className="text-sm">{skill}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div>
                  <label className="block text-sm font-medium mb-2">Preferred Benefits</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Remote Work', 'Health Insurance', '401k Match', 'Stock Options', 'Flexible Hours', 'Unlimited PTO'].map((benefit) => (
                      <label key={benefit} className="flex items-center space-x-2">
                        <Checkbox
                          checked={newFocus.criteria?.benefits?.includes(benefit) || false}
                          onCheckedChange={(checked) => {
                            const currentBenefits = newFocus.criteria?.benefits || [];
                            const newBenefits = checked 
                              ? [...currentBenefits, benefit]
                              : currentBenefits.filter(b => b !== benefit);
                            setNewFocus({
                              ...newFocus,
                              criteria: { ...newFocus.criteria!, benefits: newBenefits }
                            });
                          }}
                        />
                        <span className="text-sm">{benefit}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Location Multi-select */}
                <div>
                  <label className="block text-sm font-medium mb-2">Preferred Locations</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Remote', 'Hybrid', 'San Francisco', 'New York', 'Los Angeles', 'Seattle', 'Austin', 'Boston'].map((location) => (
                      <label key={location} className="flex items-center space-x-2">
                        <Checkbox
                          checked={newFocus.criteria?.location?.includes(location) || false}
                          onCheckedChange={(checked) => {
                            const currentLocations = newFocus.criteria?.location || [];
                            const newLocations = checked 
                              ? [...currentLocations, location]
                              : currentLocations.filter(l => l !== location);
                            setNewFocus({
                              ...newFocus,
                              criteria: { ...newFocus.criteria!, location: newLocations }
                            });
                          }}
                        />
                        <span className="text-sm">{location}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Job Type */}
                <div>
                  <label className="block text-sm font-medium mb-2">Job Type</label>
                  <div className="flex flex-wrap gap-3">
                    {['Full-time', 'Part-time', 'Contract', 'Freelance'].map((type) => (
                      <label key={type} className="flex items-center space-x-2">
                        <Checkbox
                          checked={newFocus.criteria?.jobType?.includes(type) || false}
                          onCheckedChange={(checked) => {
                            const currentTypes = newFocus.criteria?.jobType || [];
                            const newTypes = checked 
                              ? [...currentTypes, type]
                              : currentTypes.filter(t => t !== type);
                            setNewFocus({
                              ...newFocus,
                              criteria: { ...newFocus.criteria!, jobType: newTypes }
                            });
                          }}
                        />
                        <span className="text-sm">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Alert Settings */}
                <div>
                  <label className="block text-sm font-medium mb-2">Alert Settings</label>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-2">
                      <Checkbox 
                        checked={newFocus.alerts?.newJobs || false}
                        onCheckedChange={(checked) => setNewFocus({
                          ...newFocus,
                          alerts: { ...newFocus.alerts!, newJobs: checked as boolean }
                        })}
                      />
                      <span className="text-sm">Notify me of new matching jobs</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <Checkbox 
                        checked={newFocus.alerts?.highMatch || false}
                        onCheckedChange={(checked) => setNewFocus({
                          ...newFocus,
                          alerts: { ...newFocus.alerts!, highMatch: checked as boolean }
                        })}
                      />
                      <span className="text-sm">Notify me of high-match jobs (90%+)</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Live Preview Panel - Right Side */}
              <div className="lg:col-span-1">
                <Card className="sticky top-0">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Eye className="h-5 w-5" />
                      <span>Live Preview</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Estimated Matches</h4>
                      <div className="text-3xl font-bold text-blue-600">24</div>
                      <p className="text-sm text-gray-600">jobs match your criteria</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Focus Health Score</h4>
                      <div className="flex items-center space-x-2">
                        <Progress value={85} className="flex-1" />
                        <span className="text-sm font-medium">85%</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Excellent criteria balance</p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Alerts Enabled</h4>
                      <div className="space-y-2">
                        {newFocus.alerts?.newJobs && (
                          <Badge className="bg-blue-100 text-blue-800 text-xs">New Jobs</Badge>
                        )}
                        {newFocus.alerts?.highMatch && (
                          <Badge className="bg-green-100 text-green-800 text-xs">High Match</Badge>
                        )}
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="font-medium mb-2">Summary</h4>
                      <div className="text-sm space-y-1">
                        {newFocus.title && <p>• Title: {newFocus.title}</p>}
                        {newFocus.criteria?.skills && newFocus.criteria.skills.length > 0 && (
                          <p>• Skills: {newFocus.criteria.skills.length} selected</p>
                        )}
                        {newFocus.criteria?.location && newFocus.criteria.location.length > 0 && (
                          <p>• Locations: {newFocus.criteria.location.length} selected</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-6 border-t">
              <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                Cancel
              </Button>
              <Button onClick={createJobFocus} disabled={!newFocus.title}>
                Create Job Focus
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Onboarding Help Button */}
        {!showOnboarding && (
          <Button
            className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg"
            onClick={() => {
              setShowOnboarding(true);
              setCurrentOnboardingStep(1);
            }}
          >
            <HelpCircle className="h-6 w-6" />
          </Button>
        )}
      </div>
    </TooltipProvider>
  );
}