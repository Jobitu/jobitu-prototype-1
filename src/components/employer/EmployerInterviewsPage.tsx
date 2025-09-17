import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Textarea } from "../ui/textarea";
import { Calendar } from "../ui/calendar";
import { Progress } from "../ui/progress";
import { Separator } from "../ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { 
  Search,
  Calendar as CalendarIcon,
  Clock,
  Video,
  Phone,
  MapPin,
  ExternalLink,
  Plus,
  Bell,
  FileText,
  User,
  Building,
  Star,
  MessageSquare,
  Download,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  BookOpen,
  CheckCircle,
  AlertCircle,
  Users,
  Camera,
  Mic,
  Settings,
  Eye,
  Link,
  PlayCircle,
  Filter,
  MoreHorizontal,
  CheckSquare,
  Square,
  Lightbulb,
  Target,
  Globe,
  Mail,
  Linkedin,
  Edit,
  Trash2,
  Copy,
  Briefcase,
  GraduationCap
} from "lucide-react";

interface Interview {
  id: string;
  candidateName: string;
  candidateEmail: string;
  candidateAvatar: string;
  candidatePhone?: string;
  candidateLocation?: string;
  candidateExperience?: string;
  candidateEducation?: string;
  jobTitle: string;
  jobId: string;
  date: string;
  time: string;
  duration: number; // minutes
  type: 'video' | 'phone' | 'in-person';
  platform?: string;
  meetingLink?: string;
  location?: string;
  interviewers: Array<{
    name: string;
    role: string;
    avatar?: string;
    linkedin?: string;
    email?: string;
  }>;
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled' | 'no-show';
  result?: 'pending' | 'passed' | 'failed';
  notes?: string;
  feedback?: {
    rating: number;
    notes: string;
    decision: 'advance' | 'reject' | 'wait';
    tags: string[];
    strengths?: string[];
    concerns?: string[];
  };
  preparationMaterials?: Array<{
    name: string;
    type: 'pdf' | 'video' | 'link' | 'article';
    url: string;
    description?: string;
  }>;
  rounds: Array<{
    name: string;
    duration: number;
    description: string;
    tips?: string[];
  }>;
  stage?: string;
  applicationId?: string;
  checklist?: Array<{
    item: string;
    completed: boolean;
  }>;
  techStack?: string[];
  jobDescription?: string;
  roleRequirements?: string[];
  attachedFiles?: Array<{
    name: string;
    type: string;
    url: string;
  }>;
  outcome?: string;
  ratings?: Array<{
    category: string;
    score: number;
    feedback: string;
  }>;
}

interface InterviewTemplate {
  id: string;
  name: string;
  type: 'technical' | 'behavioral' | 'cultural' | 'case-study';
  duration: number;
  description: string;
  questions: Array<{
    question: string;
    category: string;
    difficulty: 'easy' | 'medium' | 'hard';
    tips?: string[];
  }>;
  evaluationCriteria: Array<{
    category: string;
    weight: number;
    description: string;
  }>;
  agenda: Array<{
    timeSlot: string;
    activity: string;
    duration: number;
  }>;
  materials: Array<{
    name: string;
    type: string;
    url: string;
  }>;
}

const mockUpcomingInterviews: Interview[] = [
  {
    id: '1',
    candidateName: 'Sarah Chen',
    candidateEmail: 'sarah.chen@email.com',
    candidateAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop',
    candidatePhone: '+1 (555) 123-4567',
    candidateLocation: 'San Francisco, CA',
    candidateExperience: '5+ years',
    candidateEducation: 'Stanford University - CS',
    jobTitle: 'Senior Frontend Developer',
    jobId: 'job-1',
    date: '2025-08-15',
    time: '14:00',
    duration: 135,
    type: 'video',
    platform: 'Google Meet',
    meetingLink: 'https://meet.google.com/xyz-abc-def',
    stage: 'Technical Interview',
    applicationId: '1',
    interviewers: [
      { 
        name: 'Alex Johnson', 
        role: 'Engineering Manager', 
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
        linkedin: 'https://linkedin.com/in/alexjohnson',
        email: 'alex.johnson@company.com'
      },
      { 
        name: 'Sarah Wilson', 
        role: 'Senior Developer', 
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop',
        linkedin: 'https://linkedin.com/in/sarahwilson',
        email: 'sarah.wilson@company.com'
      }
    ],
    status: 'scheduled',
    techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    roleRequirements: [
      '5+ years of React experience',
      'Strong TypeScript knowledge',
      'Experience with state management',
      'Understanding of modern build tools',
      'Knowledge of testing frameworks'
    ],
    preparationMaterials: [
      { 
        name: 'Company Engineering Culture Guide', 
        type: 'pdf', 
        url: '#',
        description: 'Learn about our engineering practices and team culture'
      },
      { 
        name: 'Technical Interview Guidelines', 
        type: 'pdf', 
        url: '#',
        description: 'What to expect in the technical discussion'
      },
      { 
        name: 'Product Demo Video', 
        type: 'video', 
        url: '#',
        description: '10-minute overview of our main product'
      }
    ],
    rounds: [
      { 
        name: 'Technical Discussion', 
        duration: 45, 
        description: 'Discussion about experience and technical approach',
        tips: [
          'Review candidate portfolio in detail',
          'Prepare system design questions',
          'Focus on problem-solving approach'
        ]
      },
      { 
        name: 'Live Coding', 
        duration: 60, 
        description: 'Live coding session with React and TypeScript',
        tips: [
          'Use shared coding environment',
          'Start with simple problems',
          'Observe communication style',
          'Focus on clean, readable code'
        ]
      },
      { 
        name: 'Culture Fit', 
        duration: 30, 
        description: 'Team culture and values discussion',
        tips: [
          'Ask about collaboration examples',
          'Discuss team dynamics',
          'Understand career motivations'
        ]
      }
    ],
    checklist: [
      { item: 'Send meeting link to candidate', completed: true },
      { item: 'Review candidate portfolio', completed: false },
      { item: 'Prepare technical questions', completed: false },
      { item: 'Set up coding environment', completed: false },
      { item: 'Brief interview panel', completed: true },
      { item: 'Prepare evaluation rubric', completed: false }
    ],
    attachedFiles: [
      { name: 'Sarah_Chen_Resume.pdf', type: 'pdf', url: '#' },
      { name: 'Technical_Assessment.pdf', type: 'pdf', url: '#' }
    ]
  },
  {
    id: '2',
    candidateName: 'Michael Rodriguez',
    candidateEmail: 'michael.rodriguez@email.com',
    candidateAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    candidatePhone: '+1 (555) 234-5678',
    candidateLocation: 'Austin, TX',
    candidateExperience: '7+ years',
    candidateEducation: 'UT Austin - Engineering',
    jobTitle: 'Product Manager',
    jobId: 'job-2',
    date: '2025-08-16',
    time: '10:00',
    duration: 90,
    type: 'video',
    platform: 'Zoom',
    meetingLink: 'https://zoom.us/j/123456789',
    stage: 'Final Round',
    applicationId: '2',
    interviewers: [
      { 
        name: 'Emily Davis', 
        role: 'Head of Product',
        email: 'emily.davis@company.com'
      }
    ],
    status: 'scheduled',
    notes: 'Product strategy and case study discussion. Focus on growth initiatives.',
    rounds: [
      { 
        name: 'Product Strategy', 
        duration: 45, 
        description: 'Discussion about product vision and strategy'
      },
      { 
        name: 'Case Study', 
        duration: 45, 
        description: 'Product improvement case study exercise'
      }
    ],
    attachedFiles: [
      { name: 'Michael_Rodriguez_Resume.pdf', type: 'pdf', url: '#' },
      { name: 'Product_Case_Study.pdf', type: 'pdf', url: '#' }
    ]
  }
];

const mockPastInterviews: Interview[] = [
  {
    id: '3',
    candidateName: 'Emily Davis',
    candidateEmail: 'emily.davis@email.com',
    candidateAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    candidatePhone: '+1 (555) 345-6789',
    candidateLocation: 'Seattle, WA',
    candidateExperience: '4+ years',
    candidateEducation: 'UW - Design',
    jobTitle: 'UX Designer',
    jobId: 'job-3',
    date: '2025-08-10',
    time: '15:00',
    duration: 90,
    type: 'video',
    platform: 'Google Meet',
    stage: 'Design Challenge',
    applicationId: '3',
    interviewers: [
      { name: 'David Kim', role: 'Design Lead', email: 'david.kim@company.com' },
      { name: 'Lisa Zhang', role: 'Senior Designer', email: 'lisa.zhang@company.com' }
    ],
    status: 'completed',
    result: 'passed',
    outcome: 'Advanced to final round - strong design thinking',
    notes: 'Portfolio review and design challenge. Asked to redesign checkout flow.',
    feedback: {
      rating: 4,
      notes: 'Strong portfolio and design thinking. Good cultural fit. Recommended for next round.',
      decision: 'advance',
      tags: ['Strong Portfolio', 'Culture Fit', 'Design Thinking'],
      strengths: ['Creative problem solving', 'User-centered design approach', 'Strong communication'],
      concerns: ['Limited experience with design systems', 'Needs more enterprise software experience']
    },
    ratings: [
      { category: 'Design Skills', score: 9, feedback: 'Excellent design portfolio and problem-solving approach' },
      { category: 'Communication', score: 8, feedback: 'Clear articulation of design decisions' },
      { category: 'Cultural Fit', score: 9, feedback: 'Great fit with our design-focused culture' },
      { category: 'Technical Understanding', score: 7, feedback: 'Good understanding of frontend constraints' }
    ],
    rounds: [
      { name: 'Portfolio Review', duration: 30, description: 'Discussion of past projects and design decisions' },
      { name: 'Design Challenge', duration: 60, description: 'Live design exercise with checkout flow' }
    ]
  },
  {
    id: '4',
    candidateName: 'David Kim',
    candidateEmail: 'david.kim@email.com',
    candidateAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    candidatePhone: '+1 (555) 456-7890',
    candidateLocation: 'Los Angeles, CA',
    candidateExperience: '3+ years',
    candidateEducation: 'UCLA - CS',
    jobTitle: 'Backend Engineer',
    jobId: 'job-4',
    date: '2025-08-08',
    time: '11:00',
    duration: 75,
    type: 'phone',
    stage: 'Technical Screen',
    applicationId: '4',
    interviewers: [
      { name: 'Mike Chen', role: 'Senior Engineer', email: 'mike.chen@company.com' }
    ],
    status: 'completed',
    result: 'failed',
    outcome: 'Not selected - technical skills below expectations',
    notes: 'Initial technical screening call',
    feedback: {
      rating: 2,
      notes: 'Technical skills not quite at senior level. Lacks experience with complex systems.',
      decision: 'reject',
      tags: ['Junior Level', 'Technical Gaps']
    },
    ratings: [
      { category: 'Technical Skills', score: 5, feedback: 'Basic understanding but lacks depth' },
      { category: 'Problem Solving', score: 6, feedback: 'Decent approach but struggled with complexity' },
      { category: 'Communication', score: 7, feedback: 'Good communication skills' }
    ],
    rounds: [
      { name: 'Technical Discussion', duration: 75, description: 'System design and coding questions' }
    ]
  }
];

interface EmployerInterviewsPageProps {
  activeSubTab?: string;
  onOpenUpcomingDetail?: (interviewId: string) => void;
  onOpenPastDetail?: (interviewId: string) => void;
}

export function EmployerInterviewsPage({ 
  activeSubTab = 'upcoming',
  onOpenUpcomingDetail,
  onOpenPastDetail
}: EmployerInterviewsPageProps) {
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);
  const [calendarDate, setCalendarDate] = useState<Date | undefined>(new Date());
  const [notes, setNotes] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [checklist, setChecklist] = useState<Array<{item: string; completed: boolean}>>([]);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [calendarView, setCalendarView] = useState<'month' | 'week' | 'day'>('month');

  const handleInterviewClick = (interview: Interview) => {
    if (interview.status === 'completed') {
      onOpenPastDetail?.(interview.id);
    } else {
      onOpenUpcomingDetail?.(interview.id);
    }
  };

  const handleChecklistToggle = (index: number) => {
    const updatedChecklist = [...checklist];
    updatedChecklist[index].completed = !updatedChecklist[index].completed;
    setChecklist(updatedChecklist);
  };

  // Utility functions
  const getStatusBadge = (status: string, result?: string) => {
    if (status === 'completed') {
      if (result === 'passed') return <Badge className="bg-green-100 text-green-800 border-green-200">Passed</Badge>;
      if (result === 'failed') return <Badge className="bg-red-100 text-red-800 border-red-200">Not Selected</Badge>;
      return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending Result</Badge>;
    }
    if (status === 'cancelled') return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Cancelled</Badge>;
    if (status === 'rescheduled') return <Badge className="bg-orange-100 text-orange-800 border-orange-200">Rescheduled</Badge>;
    if (status === 'no-show') return <Badge className="bg-red-100 text-red-800 border-red-200">No Show</Badge>;
    return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Scheduled</Badge>;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'phone':
        return <Phone className="h-4 w-4" />;
      case 'in-person':
        return <MapPin className="h-4 w-4" />;
      default:
        return <CalendarIcon className="h-4 w-4" />;
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const isToday = (dateStr: string) => {
    const today = new Date();
    const interviewDate = new Date(dateStr);
    return today.toDateString() === interviewDate.toDateString();
  };

  const isTomorrow = (dateStr: string) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const interviewDate = new Date(dateStr);
    return tomorrow.toDateString() === interviewDate.toDateString();
  };

  const getDateLabel = (dateStr: string) => {
    if (isToday(dateStr)) return 'Today';
    if (isTomorrow(dateStr)) return 'Tomorrow';
    return formatDate(dateStr);
  };

  const upcomingStats = {
    total: mockUpcomingInterviews.length,
    thisWeek: mockUpcomingInterviews.filter(interview => {
      const interviewDate = new Date(interview.date);
      const today = new Date();
      const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      return interviewDate >= today && interviewDate <= weekFromNow;
    }).length,
    today: mockUpcomingInterviews.filter(interview => isToday(interview.date)).length
  };

  const pastStats = {
    total: mockPastInterviews.length,
    passed: mockPastInterviews.filter(interview => interview.result === 'passed').length,
    failed: mockPastInterviews.filter(interview => interview.result === 'failed').length
  };

  // Get interviews for a specific date
  const getInterviewsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return mockUpcomingInterviews.filter(interview => 
      interview.date === dateStr
    );
  };

  // Content rendering based on active sub-tab
  const renderContent = () => {
    switch (activeSubTab) {
      case 'upcoming':
        return renderUpcomingInterviews();
      case 'past':
        return renderPastInterviews();
      case 'calendar':
        return renderCalendarView();
      case 'templates':
        return renderInterviewTemplates();
      default:
        return renderUpcomingInterviews();
    }
  };

  const renderUpcomingInterviews = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700 font-medium">Total Upcoming</p>
                <p className="text-3xl font-semibold text-blue-900">{upcomingStats.total}</p>
              </div>
              <CalendarIcon className="h-10 w-10 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-700 font-medium">This Week</p>
                <p className="text-3xl font-semibold text-orange-900">{upcomingStats.thisWeek}</p>
              </div>
              <Clock className="h-10 w-10 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700 font-medium">Today</p>
                <p className="text-3xl font-semibold text-green-900">{upcomingStats.today}</p>
              </div>
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interview List */}
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">Upcoming Interviews</CardTitle>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search interviews..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Schedule Interview
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockUpcomingInterviews.map((interview) => (
              <div key={interview.id} className="p-6 border rounded-xl hover:shadow-md transition-all duration-200 bg-white">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-14 w-14">
                      <AvatarImage src={interview.candidateAvatar} alt={interview.candidateName} />
                      <AvatarFallback className="text-lg">
                        {interview.candidateName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{interview.candidateName}</h3>
                        {getStatusBadge(interview.status, interview.result)}
                        <Badge variant="outline" className="text-xs">
                          {interview.stage}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-2">{interview.jobTitle}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-2" />
                          {getDateLabel(interview.date)}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          {formatTime(interview.time)} ({interview.duration}m)
                        </div>
                        <div className="flex items-center">
                          {getTypeIcon(interview.type)}
                          <span className="ml-2">{interview.platform}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          {interview.interviewers.length} interviewer{interview.interviewers.length > 1 ? 's' : ''}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Copy className="h-4 w-4 mr-2" />
                          Copy Link
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <CalendarIcon className="h-4 w-4 mr-2" />
                          Reschedule
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Cancel
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPastInterviews = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-700 font-medium">Total Completed</p>
                <p className="text-3xl font-semibold text-slate-900">{pastStats.total}</p>
              </div>
              <CheckCircle className="h-10 w-10 text-slate-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700 font-medium">Passed</p>
                <p className="text-3xl font-semibold text-green-900">{pastStats.passed}</p>
              </div>
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-700 font-medium">Not Selected</p>
                <p className="text-3xl font-semibold text-red-900">{pastStats.failed}</p>
              </div>
              <AlertCircle className="h-10 w-10 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Past Interview List */}
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">Interview History</CardTitle>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search past interviews..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockPastInterviews.map((interview) => (
              <div key={interview.id} className="p-6 border rounded-xl hover:shadow-md transition-all duration-200 bg-white">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-14 w-14">
                      <AvatarImage src={interview.candidateAvatar} alt={interview.candidateName} />
                      <AvatarFallback className="text-lg">
                        {interview.candidateName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{interview.candidateName}</h3>
                        {getStatusBadge(interview.status, interview.result)}
                        <Badge variant="outline" className="text-xs">
                          {interview.stage}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-2">{interview.jobTitle}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-2" />
                          {formatDate(interview.date)}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          {formatTime(interview.time)} ({interview.duration}m)
                        </div>
                        <div className="flex items-center">
                          {getTypeIcon(interview.type)}
                          <span className="ml-2">{interview.platform || 'Phone'}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          {interview.interviewers.length} interviewer{interview.interviewers.length > 1 ? 's' : ''}
                        </div>
                      </div>
                      {interview.outcome && (
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-700">{interview.outcome}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <Button variant="outline" size="sm" onClick={() => handleInterviewClick(interview)}>
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCalendarView = () => (
    <div className="space-y-6">
      {/* Calendar Header */}
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Interview Calendar</CardTitle>
              <p className="text-gray-600 mt-1">Schedule and manage all interviews in one place</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex border rounded-lg">
                <Button
                  variant={calendarView === 'month' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setCalendarView('month')}
                  className="rounded-r-none"
                >
                  Month
                </Button>
                <Button
                  variant={calendarView === 'week' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setCalendarView('week')}
                  className="rounded-none"
                >
                  Week
                </Button>
                <Button
                  variant={calendarView === 'day' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setCalendarView('day')}
                  className="rounded-l-none"
                >
                  Day
                </Button>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Schedule Interview
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">
                  {selectedDate.toLocaleDateString('en-US', { 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </h3>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      const newDate = new Date(selectedDate);
                      newDate.setMonth(newDate.getMonth() - 1);
                      setSelectedDate(newDate);
                    }}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedDate(new Date())}
                  >
                    Today
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      const newDate = new Date(selectedDate);
                      newDate.setMonth(newDate.getMonth() + 1);
                      setSelectedDate(newDate);
                    }}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Calendar
                mode="single"
                selected={calendarDate}
                onSelect={setCalendarDate}
                className="rounded-md border"
                components={{
                  Day: ({ date, ...props }) => {
                    const hasInterviews = getInterviewsForDate(date).length > 0;
                    return (
                      <div className="relative">
                        <button {...props} className={`${props.className} relative`}>
                          {date.getDate()}
                          {hasInterviews && (
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-600 rounded-full"></div>
                          )}
                        </button>
                      </div>
                    );
                  }
                }}
              />
            </CardContent>
          </Card>
        </div>

        {/* Selected Date Info */}
        <div className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">
                {calendarDate ? formatDate(calendarDate.toISOString().split('T')[0]) : 'Select a date'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {calendarDate ? (
                <div className="space-y-4">
                  {getInterviewsForDate(calendarDate).length > 0 ? (
                    getInterviewsForDate(calendarDate).map((interview) => (
                      <div key={interview.id} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                        <div className="flex items-start space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={interview.candidateAvatar} alt={interview.candidateName} />
                            <AvatarFallback className="text-sm">
                              {interview.candidateName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm">{interview.candidateName}</p>
                            <p className="text-xs text-gray-600 mb-1">{interview.jobTitle}</p>
                            <div className="flex items-center text-xs text-gray-500">
                              <Clock className="h-3 w-3 mr-1" />
                              {formatTime(interview.time)} ({interview.duration}m)
                            </div>
                            <div className="flex items-center text-xs text-gray-500 mt-1">
                              {getTypeIcon(interview.type)}
                              <span className="ml-1">{interview.platform}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2 mt-3">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Video className="h-3 w-3 mr-1" />
                            Join
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <CalendarIcon className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                      <p className="text-sm">No interviews scheduled</p>
                      <p className="text-xs text-gray-400">Click "Schedule Interview" to add one</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <CalendarIcon className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">Select a date to view interviews</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Scheduled</span>
                  <Badge variant="outline">{upcomingStats.thisWeek}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Today</span>
                  <Badge variant="outline">{upcomingStats.today}</Badge>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Completion Rate</span>
                  <span className="text-sm font-semibold">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderInterviewTemplates = () => (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Interview Templates</CardTitle>
              <p className="text-gray-600 mt-1">Standardized interview formats for consistent evaluation</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Template
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-gray-500">
            <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium mb-2">Interview Templates</p>
            <p className="text-sm mb-4">Create standardized interview templates for consistent candidate evaluation</p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create First Template
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      {renderContent()}
    </div>
  );
}