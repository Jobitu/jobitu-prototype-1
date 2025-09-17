import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Progress } from "../../ui/progress";
import { Input } from "../../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../ui/collapsible";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../ui/tooltip";
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
  Clipboard,
  Briefcase,
  Handshake
} from "lucide-react";

interface PipelineStage {
  id: string;
  name: string;
  description: string;
  count: number;
  avgTime: string;
  status: 'healthy' | 'warning' | 'critical';
  candidates: Candidate[];
  icon: React.ReactNode;
  color: string;
  requiresFeedback: boolean;
  aiSupported: boolean;
}

interface Candidate {
  id: string;
  name: string;
  avatar: string;
  position: string;
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-800 border-green-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const toggleCandidateSelection = (candidateId: string) => {
    setSelectedCandidates(prev => 
      prev.includes(candidateId) 
        ? prev.filter(id => id !== candidateId)
        : [...prev, candidateId]
    );
  };

  const selectedStageData = selectedStage ? stageDefinitions.find(s => s.id === selectedStage) : null;

  const sortedCandidates = selectedStageData?.candidates.sort((a, b) => {
    const direction = sortOrder === 'asc' ? 1 : -1;
    switch (sortBy) {
      case 'name':
        return direction * a.name.localeCompare(b.name);
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return direction * (priorityOrder[a.priority] - priorityOrder[b.priority]);
      case 'timeInStage':
        return direction * (parseInt(a.timeInStage) - parseInt(b.timeInStage));
      case 'score':
        return direction * ((a.score || 0) - (b.score || 0));
      default:
        return 0;
    }
  });

  const filteredCandidates = sortedCandidates?.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         candidate.position.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'overdue' && candidate.isOverdue) ||
                         (filterStatus === 'priority' && candidate.priority === 'high') ||
                         (filterStatus === 'feedback' && candidate.needsFeedback);
    return matchesSearch && matchesFilter;
  });

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
          </div>
          <div className="flex items-center gap-3">
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

        {/* Pipeline Metrics Bar */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-900">{mockMetrics.totalCandidates}</div>
                <div className="text-sm text-blue-700">Total in Pipeline</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-900">{mockMetrics.avgDaysPerStage}d</div>
                <div className="text-sm text-blue-700">Avg. Days/Stage</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{mockMetrics.dropOffRate}%</div>
                <div className="text-sm text-red-700">Drop-off Rate</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-orange-700">Bottleneck:</div>
                <div className="text-sm text-orange-600">{mockMetrics.bottleneckStage}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{mockMetrics.activeInterviews}</div>
                <div className="text-sm text-green-700">Active Interviews</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{mockMetrics.pendingFeedback}</div>
                <div className="text-sm text-purple-700">Pending Feedback</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stage Definitions Panel */}
        <Collapsible open={showStageDefinitions} onOpenChange={setShowStageDefinitions}>
          <CollapsibleContent>
            <Card className="bg-slate-50 border-slate-200">
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
                  <div key={stage.id} className="flex items-start gap-4 p-4 bg-white rounded-lg border">
                    <div className={`w-12 h-12 rounded-full border-2 ${stage.color} bg-white flex items-center justify-center`}>
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

        {/* Timeline Workflow Visual */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Workflow Timeline
            </CardTitle>
            <CardDescription>
              Interactive pipeline stages with real-time status indicators
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute top-12 left-16 right-16 h-0.5 bg-gray-300 z-0"></div>
              
              <div className="flex justify-between items-start relative z-10">
                {stageDefinitions.map((stage, index) => (
                  <div 
                    key={stage.id} 
                    className="flex flex-col items-center cursor-pointer group"
                    onClick={() => setSelectedStage(selectedStage === stage.id ? null : stage.id)}
                  >
                    {/* Stage Circle */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div 
                          className={`relative w-24 h-24 rounded-full border-4 ${stage.color} bg-white flex items-center justify-center shadow-lg transition-all duration-200 group-hover:scale-110 ${
                            selectedStage === stage.id ? 'scale-110 ring-4 ring-blue-200' : ''
                          }`}
                        >
                          {stage.icon}
                          {/* Status Indicator */}
                          <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full ${getStatusColor(stage.status)} border-2 border-white`}></div>
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
                      
                      {/* Feedback Indicators */}
                      {stage.requiresFeedback && (
                        <div className="mt-2 flex justify-center gap-1">
                          <Badge variant="outline" className="text-xs bg-orange-100 text-orange-800">
                            Feedback Stage
                          </Badge>
                          {stage.aiSupported && (
                            <Badge variant="outline" className="text-xs bg-purple-100 text-purple-800">
                              <Brain className="h-3 w-3" />
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                    
                    {/* Arrow */}
                    {index < stageDefinitions.length - 1 && (
                      <div className="absolute top-12 left-full w-8 flex justify-center">
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Pipeline Overview */}
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
              <Button variant="outline" size="sm">
                <SortAsc className="h-4 w-4 mr-2" />
                Sort
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 gap-6">
            {stageDefinitions.map((stage) => (
              <Card 
                key={stage.id} 
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 ${
                  selectedStage === stage.id ? 'ring-2 ring-blue-500 shadow-lg' : ''
                }`}
                onClick={() => setSelectedStage(selectedStage === stage.id ? null : stage.id)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full border-2 ${stage.color} bg-white flex items-center justify-center`}>
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
                  {/* Enhanced Candidate Previews */}
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
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Enhanced Stage Details */}
        {selectedStageData && (
          <Card className="border-2 border-blue-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full border-2 ${selectedStageData.color} bg-white flex items-center justify-center`}>
                      {selectedStageData.icon}
                    </div>
                    {selectedStageData.name} - Detailed View
                  </CardTitle>
                  <CardDescription className="mt-2">
                    {selectedStageData.description}
                  </CardDescription>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedStage(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Stage Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-900">{selectedStageData.count}</div>
                  <div className="text-sm text-blue-700">Total Candidates</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-900">{selectedStageData.avgTime}</div>
                  <div className="text-sm text-green-700">Average Time</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-orange-900">
                    {selectedStageData.candidates.filter(c => c.isOverdue).length}
                  </div>
                  <div className="text-sm text-orange-700">Overdue</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-900">
                    {selectedStageData.candidates.filter(c => c.priority === 'high').length}
                  </div>
                  <div className="text-sm text-purple-700">High Priority</div>
                </div>
              </div>

              {/* Search and Filter Controls */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search candidates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="priority">Priority</SelectItem>
                      <SelectItem value="timeInStage">Time in Stage</SelectItem>
                      <SelectItem value="score">Score</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  >
                    {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Candidates List */}
              <div className="space-y-3">
                {filteredCandidates?.map((candidate) => (
                  <div 
                    key={candidate.id} 
                    className={`p-4 border rounded-lg transition-all hover:shadow-md cursor-pointer border-l-4 ${getPriorityColor(candidate.priority)} ${
                      selectedCandidates.includes(candidate.id) ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => toggleCandidateSelection(candidate.id)}
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={candidate.avatar} />
                        <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-medium">{candidate.name}</h3>
                          <Badge variant="outline" className={getPriorityBadgeColor(candidate.priority)}>
                            {candidate.priority} priority
                          </Badge>
                          {candidate.isOverdue && (
                            <Badge variant="outline" className="bg-red-100 text-red-800">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Overdue
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{candidate.position}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {candidate.timeInStage}
                          </span>
                          {candidate.score && (
                            <span className="flex items-center gap-1 text-green-600">
                              <Trophy className="h-3 w-3" />
                              {candidate.score}%
                            </span>
                          )}
                          <div className="flex gap-1">
                            {candidate.tags.slice(0, 3).map(tag => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        {candidate.nextAction && (
                          <p className="text-sm text-blue-600 mt-2 font-medium">{candidate.nextAction}</p>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {candidate.hasNotes && (
                          <Tooltip>
                            <TooltipTrigger>
                              <FileText className="h-4 w-4 text-blue-500" />
                            </TooltipTrigger>
                            <TooltipContent>Has notes</TooltipContent>
                          </Tooltip>
                        )}
                        {candidate.needsFeedback && (
                          <Tooltip>
                            <TooltipTrigger>
                              <MessageSquare className="h-4 w-4 text-orange-500" />
                            </TooltipTrigger>
                            <TooltipContent>Needs feedback</TooltipContent>
                          </Tooltip>
                        )}
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bulk Actions */}
              {selectedCandidates.length > 0 && (
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {selectedCandidates.length} candidate(s) selected
                    </span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Send className="h-4 w-4 mr-2" />
                        Move to Next Stage
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Send Message
                      </Button>
                      <Button variant="outline" size="sm">
                        <Archive className="h-4 w-4 mr-2" />
                        Archive
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </TooltipProvider>
  );
}