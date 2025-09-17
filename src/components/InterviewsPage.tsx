import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Calendar } from "./ui/calendar";
import { 
  Calendar as CalendarIcon,
  Clock,
  Video,
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
  Phone,
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
  Search,
  MoreHorizontal,
  CheckSquare,
  Square,
  Lightbulb,
  Target,
  Globe,
  Mail,
  Linkedin
} from "lucide-react";

interface Interview {
  id: string;
  jobTitle: string;
  company: string;
  companyLogo: string;
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
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  result?: 'pending' | 'passed' | 'failed';
  notes?: string;
  feedback?: string;
  stage?: string;
  applicationId?: string;
  outcome?: string;
  ratings?: Array<{
    category: string;
    score: number;
    feedback: string;
  }>;
  rounds: Array<{
    name: string;
    duration: number;
    description: string;
    tips?: string[];
  }>;
}

const mockUpcomingInterviews: Interview[] = [
  {
    id: '1',
    jobTitle: 'Senior Frontend Developer',
    company: 'TechFlow Inc.',
    companyLogo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=150&h=150&fit=crop',
    date: '2024-01-25',
    time: '14:00',
    duration: 135,
    type: 'video',
    platform: 'Google Meet',
    meetingLink: 'https://meet.google.com/xyz-abc-def',
    stage: 'Technical Interview',
    applicationId: '1',
    interviewers: [
      { 
        name: 'Sarah Wilson', 
        role: 'Engineering Manager', 
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop',
        linkedin: 'https://linkedin.com/in/sarahwilson',
        email: 'sarah.wilson@techflow.com'
      }
    ],
    status: 'scheduled',
    rounds: [
      { 
        name: 'Technical Discussion', 
        duration: 45, 
        description: 'Discussion about your experience and technical approach'
      }
    ]
  }
];

const mockPastInterviews: Interview[] = [
  {
    id: '3',
    jobTitle: 'Product Manager',
    company: 'StartupX',
    companyLogo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop',
    date: '2024-01-18',
    time: '15:00',
    duration: 60,
    type: 'video',
    platform: 'Google Meet',
    stage: 'Product Interview',
    applicationId: '2',
    interviewers: [
      { name: 'Michael Rodriguez', role: 'Head of Product', email: 'michael@startupx.com' }
    ],
    status: 'completed',
    result: 'failed',
    outcome: 'Not selected - looking for more PM experience',
    notes: 'Good discussion about product strategy, but they were looking for more PM experience.',
    feedback: 'Strong technical background but lacks direct product management experience.',
    ratings: [
      { category: 'Product Thinking', score: 6, feedback: 'Good analytical approach but limited PM experience showed' },
      { category: 'Communication', score: 8, feedback: 'Excellent communication and presentation skills' }
    ],
    rounds: [
      { name: 'Product Strategy Discussion', duration: 60, description: 'Case study and product thinking' }
    ]
  }
];

const enhancedInterviewPreparationResources = [
  {
    category: 'Technical Interview Prep',
    description: 'Master the technical aspects of your interviews',
    resources: [
      { 
        name: 'System Design Primer', 
        type: 'article', 
        url: '#', 
        description: 'Comprehensive guide to system design interviews',
        duration: '45 min read',
        difficulty: 'Advanced'
      },
      { 
        name: 'JavaScript Algorithms & Data Structures', 
        type: 'link', 
        url: '#', 
        description: 'Common coding problems and optimized solutions',
        duration: '2-3 hours',
        difficulty: 'Intermediate'
      }
    ]
  }
];

interface InterviewsPageProps {
  activeSubTab?: string;
  onOpenUpcomingDetail?: (interviewId: string) => void;
  onOpenPastDetail?: (interviewId: string) => void;
}

export function InterviewsPage({ 
  activeSubTab = 'upcoming',
  onOpenUpcomingDetail,
  onOpenPastDetail
}: InterviewsPageProps) {
  const [calendarDate, setCalendarDate] = useState<Date | undefined>(new Date());
  const [searchQuery, setSearchQuery] = useState('');

  const handleInterviewClick = (interview: Interview) => {
    if (interview.status === 'completed') {
      onOpenPastDetail?.(interview.id);
    } else {
      onOpenUpcomingDetail?.(interview.id);
    }
  };

  const getStatusBadge = (status: string, result?: string) => {
    if (status === 'completed') {
      if (result === 'passed') return <Badge className="bg-green-100 text-green-800">Passed</Badge>;
      if (result === 'failed') return <Badge className="bg-red-100 text-red-800">Not Selected</Badge>;
      return <Badge className="bg-yellow-100 text-yellow-800">Pending Result</Badge>;
    }
    if (status === 'cancelled') return <Badge className="bg-gray-100 text-gray-800">Cancelled</Badge>;
    if (status === 'rescheduled') return <Badge className="bg-orange-100 text-orange-800">Rescheduled</Badge>;
    return <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>;
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

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-4 w-4 text-red-500" />;
      case 'video':
        return <PlayCircle className="h-4 w-4 text-blue-500" />;
      case 'link':
        return <Link className="h-4 w-4 text-green-500" />;
      case 'article':
        return <BookOpen className="h-4 w-4 text-purple-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const getDifficultyBadge = (difficulty: string) => {
    const colors = {
      'Beginner': 'bg-green-100 text-green-800',
      'Intermediate': 'bg-yellow-100 text-yellow-800', 
      'Advanced': 'bg-red-100 text-red-800',
      'All levels': 'bg-blue-100 text-blue-800'
    };
    return (
      <Badge className={colors[difficulty as keyof typeof colors] || colors['All levels']}>
        {difficulty}
      </Badge>
    );
  };

  const renderUpcomingInterviews = () => (
    <div className="space-y-6">
      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="border-blue-200 bg-gradient-to-br from-blue-50/50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Upcoming</p>
                <p className="text-3xl font-bold text-blue-600">{upcomingStats.total}</p>
                <p className="text-xs text-blue-600 mt-1">Interviews scheduled</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <CalendarIcon className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-orange-200 bg-gradient-to-br from-orange-50/50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Week</p>
                <p className="text-3xl font-bold text-orange-600">{upcomingStats.thisWeek}</p>
                <p className="text-xs text-orange-600 mt-1">Requires preparation</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-green-200 bg-gradient-to-br from-green-50/50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Today</p>
                <p className="text-3xl font-bold text-green-600">{upcomingStats.today}</p>
                <p className="text-xs text-green-600 mt-1">Ready to go</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interview List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Upcoming Interviews</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search interviews..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {mockUpcomingInterviews.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <CalendarIcon className="h-12 w-12 text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No upcoming interviews scheduled</h3>
              <p className="text-muted-foreground mb-4">Keep applying to jobs to land your next interview! 🚀</p>
              <Button>Browse Jobs</Button>
            </div>
          ) : (
            <div className="space-y-4">
              {mockUpcomingInterviews.map((interview) => {
                const isTodayInterview = isToday(interview.date);
                return (
                  <div
                    key={interview.id}
                    className={`border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                      isTodayInterview ? 'border-l-4 border-l-green-500 bg-green-50/30' : ''
                    }`}
                    onClick={() => handleInterviewClick(interview)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={interview.companyLogo} alt={interview.company} />
                          <AvatarFallback>{interview.company.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{interview.jobTitle}</h3>
                          <p className="text-muted-foreground">{interview.company}</p>
                          <div className="flex items-center space-x-4 mt-1">
                            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                              {getTypeIcon(interview.type)}
                              <span>{interview.platform || interview.type}</span>
                            </div>
                            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                              <CalendarIcon className="h-4 w-4" />
                              <span>{getDateLabel(interview.date)} at {formatTime(interview.time)}</span>
                            </div>
                            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              <span>{interview.duration} min</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge variant="secondary">{interview.stage}</Badge>
                        {getStatusBadge(interview.status)}
                        
                        <div className="flex items-center space-x-2">
                          {isTodayInterview ? (
                            <Button 
                              size="sm" 
                              className="bg-green-600 hover:bg-green-700"
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(interview.meetingLink, '_blank');
                              }}
                            >
                              <Video className="h-4 w-4 mr-1" />
                              Join Meeting
                            </Button>
                          ) : (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                            >
                              <BookOpen className="h-4 w-4 mr-1" />
                              Prepare
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderPastInterviews = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <Card className="border-purple-200 bg-gradient-to-br from-purple-50/50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Past</p>
                <p className="text-3xl font-bold text-purple-600">{pastStats.total}</p>
                <p className="text-xs text-purple-600 mt-1">Interviews completed</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <CheckCircle className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-green-200 bg-gradient-to-br from-green-50/50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Successful</p>
                <p className="text-3xl font-bold text-green-600">{pastStats.passed}</p>
                <p className="text-xs text-green-600 mt-1">Offers received</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Star className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-red-200 bg-gradient-to-br from-red-50/50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Learning</p>
                <p className="text-3xl font-bold text-red-600">{pastStats.failed}</p>
                <p className="text-xs text-red-600 mt-1">Growth opportunities</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <Lightbulb className="h-8 w-8 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Past Interviews</CardTitle>
        </CardHeader>
        <CardContent>
          {mockPastInterviews.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-24 h-24 bg-purple-50 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-12 w-12 text-purple-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No past interviews yet</h3>
              <p className="text-muted-foreground mb-4">Your completed interviews will appear here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {mockPastInterviews.map((interview) => (
                <div
                  key={interview.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => handleInterviewClick(interview)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={interview.companyLogo} alt={interview.company} />
                        <AvatarFallback>{interview.company.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{interview.jobTitle}</h3>
                        <p className="text-muted-foreground">{interview.company}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                            <CalendarIcon className="h-4 w-4" />
                            <span>{formatDate(interview.date)} at {formatTime(interview.time)}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{interview.duration} min</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant="secondary">{interview.stage}</Badge>
                      {getStatusBadge(interview.status, interview.result)}
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderCalendarView = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Interview Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <Calendar
                mode="single"
                selected={calendarDate}
                onSelect={setCalendarDate}
                className="rounded-md border"
              />
            </div>
            <div>
              <h4 className="font-medium mb-4">
                {calendarDate ? `Interviews on ${formatDate(calendarDate.toISOString())}` : 'Select a date'}
              </h4>
              <div className="space-y-2">
                {mockUpcomingInterviews.map(interview => (
                  <div key={interview.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{interview.jobTitle}</p>
                        <p className="text-sm text-muted-foreground">{interview.company}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">{formatTime(interview.time)}</p>
                        <p className="text-xs text-muted-foreground">{interview.duration} min</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPreparationResources = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Interview Preparation Resources</h2>
        <p className="text-muted-foreground">Master your interviews with our comprehensive preparation materials</p>
      </div>

      {enhancedInterviewPreparationResources.map((category, categoryIndex) => (
        <Card key={categoryIndex}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>{category.category}</span>
            </CardTitle>
            <p className="text-sm text-muted-foreground">{category.description}</p>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {category.resources.map((resource, resourceIndex) => (
                <div key={resourceIndex} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      {getResourceIcon(resource.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium">{resource.name}</h4>
                        {getDifficultyBadge(resource.difficulty)}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{resource.description}</p>
                      <div className="flex items-center space-x-4 mt-3">
                        <span className="text-xs text-muted-foreground">{resource.duration}</span>
                        <Button size="sm" variant="outline">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Access
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderTabContent = () => {
    switch (activeSubTab) {
      case 'upcoming':
        return renderUpcomingInterviews();
      case 'past':
        return renderPastInterviews();
      case 'calendar':
        return renderCalendarView();
      case 'prep':
        return renderPreparationResources();
      default:
        return renderUpcomingInterviews();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}