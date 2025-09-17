import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Switch } from "./ui/switch";
import { Progress } from "./ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { toast } from "sonner@2.0.3";
import { motion, AnimatePresence } from "motion/react";
import { JobFocusDetailPage } from "./JobFocusDetailPage";
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
  Target,
  CheckCircle,
  Play,
  Pause,
  Calendar,
  Share,
  EyeOff,
  Info,
  ChevronDown,
  ChevronRight,
  Layers,
  Activity,
  BarChart3,
  ExternalLink,
  BookmarkPlus,
  HelpCircle
} from "lucide-react";

interface JobFocus {
  id: string;
  title: string;
  active: boolean;
  recommendations: number;
  closeCriteria: number;
  ongoingTasks: number;
  group: string;
  createdDate: string;
  duration: number; // in weeks
  progress: number; // 0-100
}

interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  salary: string;
  matchPercentage: number;
  skills: string[];
  postedDate: string;
  jobType: string;
  applied?: boolean;
  saved?: boolean;
  matchReason: string;
  description: string;
  benefits?: string[];
  companySize?: string;
  workMode?: string;
}

const mockJobFocuses: JobFocus[] = [
  { 
    id: '1', 
    title: 'Senior UX Designer', 
    active: true, 
    recommendations: 6, 
    closeCriteria: 2, 
    ongoingTasks: 1,
    group: 'Design Roles',
    createdDate: '2024-01-15',
    duration: 8,
    progress: 62
  },
  { 
    id: '2', 
    title: 'UX Researcher', 
    active: false, 
    recommendations: 4, 
    closeCriteria: 1, 
    ongoingTasks: 0,
    group: 'Design Roles',
    createdDate: '2024-01-10',
    duration: 6,
    progress: 25
  },
  { 
    id: '3', 
    title: 'Frontend Developer', 
    active: true, 
    recommendations: 12, 
    closeCriteria: 3, 
    ongoingTasks: 2,
    group: 'Engineering Roles',
    createdDate: '2024-01-08',
    duration: 10,
    progress: 75
  },
  { 
    id: '4', 
    title: 'Product Manager', 
    active: true, 
    recommendations: 8, 
    closeCriteria: 1, 
    ongoingTasks: 1,
    group: 'Product Roles',
    createdDate: '2024-01-12',
    duration: 12,
    progress: 45
  }
];

const mockFocusJobs: Job[] = [
  {
    id: '1',
    title: 'Senior UX Designer',
    company: 'DesignFirst',
    companyLogo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=150&h=150&fit=crop',
    location: 'Los Angeles, CA',
    salary: '$110k - $140k',
    matchPercentage: 95,
    skills: ['Figma', 'Design Systems', 'User Research', 'Prototyping'],
    postedDate: '2024-01-20',
    jobType: 'Full-time',
    matchReason: 'Perfect match for your UX design skills and experience level',
    description: 'Lead UX design for our consumer products, working closely with product managers and engineers...',
    benefits: ['Health Insurance', 'Creative Budget', 'Flexible Hours', 'Design Tools'],
    companySize: '201-1000',
    workMode: 'Hybrid'
  },
  {
    id: '2',
    title: 'UX/UI Designer',
    company: 'TechFlow Inc.',
    companyLogo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=150&h=150&fit=crop',
    location: 'San Francisco, CA',
    salary: '$125k - $155k',
    matchPercentage: 92,
    skills: ['Figma', 'Sketch', 'User Testing', 'Wireframing'],
    postedDate: '2024-01-19',
    jobType: 'Full-time',
    matchReason: 'Strong alignment with your design tool expertise and portfolio',
    description: 'Shape the visual and interaction design of our B2B platform...',
    benefits: ['Equity', 'Health Insurance', 'Learning Budget', 'Remote Work'],
    companySize: '51-200',
    workMode: 'Remote'
  },
  {
    id: '3',
    title: 'Product Designer',
    company: 'InnovateLab',
    companyLogo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=150&h=150&fit=crop',
    location: 'Remote',
    salary: '$115k - $145k',
    matchPercentage: 88,
    skills: ['Design Systems', 'User Research', 'A/B Testing', 'Analytics'],
    postedDate: '2024-01-18',
    jobType: 'Full-time',
    applied: true,
    matchReason: 'Matches your product thinking and research methodology',
    description: 'Drive product design decisions through user research and data analysis...',
    benefits: ['Stock Options', 'Home Office Setup', 'Conference Budget', 'Flexible PTO'],
    companySize: '1000+',
    workMode: 'Hybrid'
  }
];

interface FindJobsJobFocusPageProps {
  activeSubTab?: string;
  onViewJobDetail?: (job: Job) => void;
}

export function FindJobsJobFocusPage({ 
  activeSubTab = 'job-focus',
  onViewJobDetail
}: FindJobsJobFocusPageProps) {
  const [selectedFocus, setSelectedFocus] = useState<JobFocus | null>(mockJobFocuses[0]);
  const [searchStatus, setSearchStatus] = useState('Open To Work');
  const [searchDuration, setSearchDuration] = useState('2 weeks');
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['Design Roles', 'Engineering Roles', 'Product Roles']));
  const [showDetailView, setShowDetailView] = useState(false);
  const [detailFocusId, setDetailFocusId] = useState<string | null>(null);
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState({
    location: 'all',
    experienceLevel: 'all',
    industry: 'all'
  });
  const [showOnboarding, setShowOnboarding] = useState(true);

  // Group focuses by category
  const groupedFocuses = mockJobFocuses.reduce((acc, focus) => {
    if (!acc[focus.group]) {
      acc[focus.group] = [];
    }
    acc[focus.group].push(focus);
    return acc;
  }, {} as Record<string, JobFocus[]>);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-100 text-green-800 border-green-200';
    if (percentage >= 80) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (percentage >= 70) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const toggleGroupExpansion = (group: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(group)) {
      newExpanded.delete(group);
    } else {
      newExpanded.add(group);
    }
    setExpandedGroups(newExpanded);
  };

  const handleToggleFocusStatus = (focus: JobFocus) => {
    const action = focus.active ? 'paused' : 'resumed';
    toast.success(`Job focus ${action} successfully`);
  };

  const handleExtendDuration = () => {
    toast.success('Search duration extended');
  };

  const handleViewDetails = (focusId: string) => {
    setDetailFocusId(focusId);
    setShowDetailView(true);
  };

  const handleSaveJob = (jobId: string) => {
    const newSaved = new Set(savedJobs);
    if (newSaved.has(jobId)) {
      newSaved.delete(jobId);
      toast.success("Job removed from saved list");
    } else {
      newSaved.add(jobId);
      toast.success("Job saved to your list");
    }
    setSavedJobs(newSaved);
  };

  const handleShareJob = (jobId: string) => {
    toast.success("Job link copied to clipboard");
  };

  const handleHideJob = (jobId: string) => {
    toast.success("Job hidden from recommendations");
  };

  const clearAllFilters = () => {
    setFilters({ location: 'all', experienceLevel: 'all', industry: 'all' });
    toast.success("All filters cleared");
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 75) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 25) return 'bg-yellow-500';
    return 'bg-gray-400';
  };

  // Onboarding tooltips
  const OnboardingTooltip = ({ step, children }: { step: number; children: React.ReactNode }) => {
    if (!showOnboarding) return <>{children}</>;
    
    const tooltipContent = [
      "Set your job search status and track your progress",
      "Organize your job focuses by category",
      "View personalized job recommendations",
      "Use filters to refine your search results"
    ];

    return (
      <Tooltip open={showOnboarding}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side="right" className="max-w-xs">
          <div className="space-y-2">
            <p className="font-medium">Step {step} of 4</p>
            <p>{tooltipContent[step - 1]}</p>
            <div className="flex justify-between">
              <Button size="sm" variant="ghost" onClick={() => setShowOnboarding(false)}>
                Skip
              </Button>
              <Button size="sm" onClick={() => step === 4 ? setShowOnboarding(false) : null}>
                {step === 4 ? 'Got it!' : 'Next'}
              </Button>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    );
  };

  if (showDetailView && detailFocusId) {
    return (
      <JobFocusDetailPage
        focusId={detailFocusId}
        onBack={() => setShowDetailView(false)}
        onEditFocus={() => console.log('Edit focus')}
      />
    );
  }

  const JobCard = ({ job }: { job: Job }) => (
    <Card className="border border-gray-200 hover:shadow-md transition-all duration-200 hover:translate-y-[-1px]">
      <CardContent className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3 flex-1">
            <Avatar className="w-12 h-12">
              <AvatarImage src={job.companyLogo} alt={job.company} />
              <AvatarFallback>{job.company.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-lg">{job.title}</h3>
              <p className="text-sm text-muted-foreground">{job.company}</p>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <Badge className={`text-lg px-3 py-1 border-2 ${getMatchColor(job.matchPercentage)}`}>
              <Star className="h-4 w-4 mr-2" />
              {job.matchPercentage}%
            </Badge>
            
            {/* Company Insight Pill */}
            {job.companySize && (
              <div className="text-xs text-muted-foreground bg-gray-100 px-2 py-1 rounded-full">
                {job.companySize} employees • {job.workMode} culture
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Match Reason */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4 mb-4">
          <div className="flex items-start space-x-3">
            <div className="bg-purple-100 p-2 rounded-lg">
              <Target className="h-5 w-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-purple-900 mb-1">Why this is a strong match</h4>
              <p className="text-sm text-purple-800">{job.matchReason}</p>
            </div>
          </div>
        </div>
        
        {/* Job Details Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            {job.location}
          </div>
          <div className="flex items-center">
            <DollarSign className="h-4 w-4 mr-2" />
            {job.salary}
          </div>
          <div className="flex items-center">
            <Building className="h-4 w-4 mr-2" />
            {job.jobType}
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            {formatDate(job.postedDate)}
          </div>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {job.skills.slice(0, 4).map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-xs">{skill}</Badge>
          ))}
          {job.skills.length > 4 && (
            <Badge variant="outline" className="text-xs">+{job.skills.length - 4} more</Badge>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {job.description}
        </p>

        {/* Inline Action Bar */}
        <div className="flex items-center justify-between border-t pt-4">
          <div className="flex items-center space-x-3">
            {job.applied ? (
              <Badge className="bg-green-100 text-green-800 px-4 py-2">
                Applied
              </Badge>
            ) : (
              <Button className="bg-blue-600 hover:bg-blue-700">
                Apply Now
              </Button>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleSaveJob(job.id)}
                    className="p-2"
                  >
                    <BookmarkPlus className={`h-4 w-4 ${savedJobs.has(job.id) ? 'fill-blue-500 text-blue-500' : 'text-gray-400 hover:text-blue-500'}`} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Save Job</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleShareJob(job.id)}
                    className="p-2"
                  >
                    <Share className="h-4 w-4 text-gray-400 hover:text-blue-500" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Share Job</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleHideJob(job.id)}
                    className="p-2"
                  >
                    <EyeOff className="h-4 w-4 text-gray-400 hover:text-red-500" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Hide Job</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onViewJobDetail?.(job)}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const EmptyState = () => (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center max-w-md">
        <Target className="h-16 w-16 mx-auto text-gray-400 mb-6" />
        <h3 className="text-xl font-semibold mb-4">No Focus Selected</h3>
        <p className="text-muted-foreground mb-6">
          Set a job focus from the sidebar to see personalized matches and recommendations
        </p>
        <Button onClick={() => console.log('Create new focus')}>
          <Plus className="h-4 w-4 mr-2" />
          Create Your First Focus
        </Button>
      </div>
    </div>
  );

  return (
    <TooltipProvider>
      <div className="flex h-full bg-gray-50">
        {/* Left Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          {/* Enhanced Search Status */}
          <div className="p-6 border-b border-gray-200">
            <OnboardingTooltip step={1}>
              <Card className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium">Job Search Status</span>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="font-medium">{searchStatus}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleExtendDuration}
                        className="text-xs"
                      >
                        Extend
                      </Button>
                    </div>
                    
                    {/* Progress Indicator */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Search Progress</span>
                        <span>5 weeks active</span>
                      </div>
                      <Progress value={65} className="h-2" />
                      <p className="text-xs text-muted-foreground">{searchDuration} planned duration</p>
                    </div>
                    
                    {/* Quick Toggle */}
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1 text-xs">
                        <Pause className="h-3 w-3 mr-1" />
                        Pause Search
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </OnboardingTooltip>
          </div>

          {/* Job Focus Tabs */}
          <div className="flex border-b border-gray-200">
            <Button 
              variant="ghost" 
              className="flex-1 rounded-none border-b-2 border-blue-500 text-blue-600"
            >
              Active
            </Button>
            <Button 
              variant="ghost" 
              className="flex-1 rounded-none border-b-2 border-transparent text-muted-foreground"
            >
              Completed
            </Button>
          </div>

          {/* Enhanced Job Focus List */}
          <div className="flex-1 overflow-y-auto p-4">
            <OnboardingTooltip step={2}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Job Focuses</h3>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New Focus
                </Button>
              </div>
            </OnboardingTooltip>
            
            {/* Grouped Focus List */}
            <div className="space-y-4">
              {Object.entries(groupedFocuses).map(([group, focuses]) => (
                <div key={group}>
                  <button
                    onClick={() => toggleGroupExpansion(group)}
                    className="flex items-center justify-between w-full p-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-2">
                      <Layers className="h-4 w-4" />
                      <span>{group}</span>
                      <Badge variant="secondary" className="text-xs">
                        {focuses.filter(f => f.active).length}
                      </Badge>
                    </div>
                    {expandedGroups.has(group) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                  
                  <AnimatePresence>
                    {expandedGroups.has(group) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="ml-4 space-y-2"
                      >
                        {focuses.map((focus) => (
                          <div
                            key={focus.id}
                            onClick={() => setSelectedFocus(focus)}
                            className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                              selectedFocus?.id === focus.id 
                                ? 'bg-blue-50 border-2 border-blue-200 shadow-sm' 
                                : 'hover:bg-gray-50 border-2 border-transparent'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                  <span className={`font-medium ${focus.active ? 'text-gray-900' : 'text-muted-foreground'}`}>
                                    {focus.title}
                                  </span>
                                  {!focus.active && (
                                    <Badge variant="outline" className="text-xs">Paused</Badge>
                                  )}
                                </div>
                                
                                {focus.active && (
                                  <div className="mt-2 space-y-1">
                                    <div className="text-xs text-muted-foreground">
                                      {focus.recommendations} Matches • {focus.closeCriteria} Close to Criteria
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Progress 
                                        value={focus.progress} 
                                        className="h-1 flex-1" 
                                      />
                                      <span className="text-xs text-muted-foreground">
                                        {focus.progress}%
                                      </span>
                                    </div>
                                  </div>
                                )}
                              </div>
                              
                              <div className="flex items-center space-x-1 ml-2">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-6 w-6 p-0"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleViewDetails(focus.id);
                                        }}
                                      >
                                        <Eye className="h-3 w-3" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>View Details</TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                                
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-6 w-6 p-0"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleToggleFocusStatus(focus);
                                        }}
                                      >
                                        {focus.active ? (
                                          <Pause className="h-3 w-3" />
                                        ) : (
                                          <Play className="h-3 w-3" />
                                        )}
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      {focus.active ? 'Pause Focus' : 'Resume Focus'}
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Enhanced Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <OnboardingTooltip step={3}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div>
                    <div className="flex items-center space-x-3">
                      <h1 className="text-xl font-semibold">
                        {selectedFocus?.title || 'Select a Job Focus'}
                      </h1>
                      {selectedFocus && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-4 w-4 text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                              <p>Recommendations are based on your profile, preferences, and market trends. 
                              Jobs "close to criteria" match most but not all of your requirements.</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                    {selectedFocus && (
                      <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Activity className="h-4 w-4" />
                          <span>{selectedFocus.recommendations} Recommendations</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Target className="h-4 w-4" />
                          <span>{selectedFocus.closeCriteria} Close to Criteria</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{selectedFocus.ongoingTasks} Ongoing Tasks</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {selectedFocus && (
                  <Button
                    variant="outline"
                    onClick={() => handleViewDetails(selectedFocus.id)}
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Focus Details
                  </Button>
                )}
              </div>
            </OnboardingTooltip>
          </div>

          {/* Enhanced Filters */}
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
            <OnboardingTooltip step={4}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Select
                    value={filters.location}
                    onValueChange={(value) => setFilters({...filters, location: value})}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                      <SelectItem value="onsite">On-site</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={filters.experienceLevel}
                    onValueChange={(value) => setFilters({...filters, experienceLevel: value})}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="junior">Junior</SelectItem>
                      <SelectItem value="mid">Mid-level</SelectItem>
                      <SelectItem value="senior">Senior</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={filters.industry}
                    onValueChange={(value) => setFilters({...filters, industry: value})}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Industries</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                    </SelectContent>
                  </Select>

                  {(filters.location !== 'all' || filters.experienceLevel !== 'all' || filters.industry !== 'all') && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAllFilters}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Clear Filters
                    </Button>
                  )}
                </div>
                
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Advanced Filters
                </Button>
              </div>
            </OnboardingTooltip>
          </div>

          {/* Job Recommendations */}
          <div className="flex-1 overflow-y-auto p-6">
            {selectedFocus ? (
              <div className="max-w-4xl mx-auto">
                <div className="space-y-6">
                  {mockFocusJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              </div>
            ) : (
              <EmptyState />
            )}
          </div>
        </div>

        {/* Guided Onboarding Help Button */}
        {!showOnboarding && (
          <Button
            className="fixed bottom-6 right-6 rounded-full w-12 h-12 shadow-lg"
            onClick={() => setShowOnboarding(true)}
          >
            <HelpCircle className="h-5 w-5" />
          </Button>
        )}
      </div>
    </TooltipProvider>
  );
}