import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { 
  ArrowLeft,
  Calendar,
  Clock,
  Video,
  Phone,
  MapPin,
  ExternalLink,
  Bell,
  FileText,
  User,
  Building,
  Star,
  MessageSquare,
  Download,
  Users,
  Camera,
  Mic,
  Settings,
  Eye,
  Link,
  PlayCircle,
  CheckSquare,
  Square,
  Lightbulb,
  Target,
  Globe,
  Mail,
  Linkedin,
  BookOpen,
  Code,
  Briefcase,
  AlertTriangle
} from "lucide-react";

interface UpcomingInterviewDetailPageProps {
  interviewId: string;
  onBack: () => void;
}

// Mock data for the interview detail
const mockInterviewDetail = {
  id: '1',
  jobTitle: 'Senior Frontend Developer',
  company: 'TechFlow Inc.',
  companyLogo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=150&h=150&fit=crop',
  date: '2024-01-25',
  time: '14:00',
  duration: 135,
  type: 'video' as const,
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
    },
    { 
      name: 'Mike Chen', 
      role: 'Senior Developer', 
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
      linkedin: 'https://linkedin.com/in/mikechen',
      email: 'mike.chen@techflow.com'
    }
  ],
  status: 'scheduled' as const,
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
    },
    {
      name: 'React Best Practices',
      type: 'article',
      url: '#',
      description: 'Our internal guide to React development'
    }
  ],
  rounds: [
    { 
      name: 'Technical Discussion', 
      duration: 45, 
      description: 'Discussion about your experience and technical approach',
      tips: [
        'Be ready to discuss your recent projects in detail',
        'Prepare examples of challenging problems you\'ve solved',
        'Review system design fundamentals'
      ]
    },
    { 
      name: 'Live Coding', 
      duration: 60, 
      description: 'Live coding session with React and TypeScript',
      tips: [
        'Practice coding in a shared editor environment',
        'Think out loud while coding',
        'Ask clarifying questions',
        'Focus on clean, readable code'
      ]
    },
    { 
      name: 'Culture Fit', 
      duration: 30, 
      description: 'Team culture and values discussion',
      tips: [
        'Prepare questions about team dynamics',
        'Share examples of collaboration',
        'Discuss what motivates you'
      ]
    }
  ],
  checklist: [
    { item: 'Test camera and microphone', completed: false },
    { item: 'Review job description and requirements', completed: true },
    { item: 'Prepare questions for interviewers', completed: false },
    { item: 'Review company culture guide', completed: false },
    { item: 'Practice coding problems', completed: true },
    { item: 'Set up quiet interview space', completed: false }
  ],
  attachedFiles: [
    { name: 'Portfolio_Examples.pdf', type: 'pdf', url: '#' },
    { name: 'Code_Samples.zip', type: 'archive', url: '#' }
  ]
};

export function UpcomingInterviewDetailPage({ interviewId, onBack }: UpcomingInterviewDetailPageProps) {
  const [checklist, setChecklist] = useState(mockInterviewDetail.checklist);
  const [activeTab, setActiveTab] = useState('overview');

  const handleChecklistToggle = (index: number) => {
    const updatedChecklist = [...checklist];
    updatedChecklist[index].completed = !updatedChecklist[index].completed;
    setChecklist(updatedChecklist);
  };

  const completedItems = checklist.filter(item => item.completed).length;
  const completionPercentage = Math.round((completedItems / checklist.length) * 100);

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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-5 w-5" />;
      case 'phone':
        return <Phone className="h-5 w-5" />;
      case 'in-person':
        return <MapPin className="h-5 w-5" />;
      default:
        return <Calendar className="h-5 w-5" />;
    }
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

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center space-x-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={mockInterviewDetail.companyLogo} alt={mockInterviewDetail.company} />
              <AvatarFallback>{mockInterviewDetail.company.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl">{mockInterviewDetail.jobTitle}</h1>
              <p className="text-sm text-muted-foreground">{mockInterviewDetail.company} • {mockInterviewDetail.stage}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Set Reminder
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Add to Calendar
          </Button>
          {mockInterviewDetail.meetingLink && (
            <Button>
              <ExternalLink className="h-4 w-4 mr-2" />
              Join Meeting
            </Button>
          )}
        </div>
      </div>

      {/* Interview Info Card */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date & Time</p>
                <p className="font-medium">{getDateLabel(mockInterviewDetail.date)}</p>
                <p className="text-sm text-muted-foreground">{formatTime(mockInterviewDetail.time)}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Clock className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="font-medium">{mockInterviewDetail.duration} minutes</p>
                <p className="text-sm text-muted-foreground">{Math.floor(mockInterviewDetail.duration / 60)}h {mockInterviewDetail.duration % 60}m</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                {getTypeIcon(mockInterviewDetail.type)}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Interview Type</p>
                <p className="font-medium">{mockInterviewDetail.platform || 'Video Call'}</p>
                <p className="text-sm text-muted-foreground">{mockInterviewDetail.type}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Users className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Interviewers</p>
                <p className="font-medium">{mockInterviewDetail.interviewers.length} people</p>
                <p className="text-sm text-muted-foreground">See details below</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preparation Progress */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Interview Preparation</h3>
            <Badge variant={completionPercentage === 100 ? "default" : "secondary"}>
              {completedItems}/{checklist.length} completed
            </Badge>
          </div>
          <Progress value={completionPercentage} className="mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {checklist.map((item, index) => (
              <div 
                key={index}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => handleChecklistToggle(index)}
              >
                {item.completed ? (
                  <CheckSquare className="h-5 w-5 text-green-600" />
                ) : (
                  <Square className="h-5 w-5 text-gray-400" />
                )}
                <span className={item.completed ? 'text-gray-500 line-through' : ''}>{item.item}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="border-b">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'interviewers', label: 'Interviewers' },
              { id: 'preparation', label: 'Preparation' },
              { id: 'requirements', label: 'Requirements' }
            ].map((tab) => (
              <button
                key={tab.id}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Interview Rounds */}
          <Card>
            <CardHeader>
              <CardTitle>Interview Structure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockInterviewDetail.rounds.map((round, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{round.name}</h4>
                      <Badge variant="outline">{round.duration} min</Badge>
                    </div>
                    <p className="text-muted-foreground mb-3">{round.description}</p>
                    {round.tips && (
                      <div>
                        <p className="text-sm font-medium text-green-700 mb-2 flex items-center">
                          <Lightbulb className="h-4 w-4 mr-1" />
                          Preparation Tips:
                        </p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {round.tips.map((tip, tipIndex) => (
                            <li key={tipIndex} className="flex items-start">
                              <span className="text-green-600 mr-2">•</span>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Attached Files */}
          <Card>
            <CardHeader>
              <CardTitle>Attached Files</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockInterviewDetail.attachedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-muted-foreground">{file.type.toUpperCase()}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'interviewers' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockInterviewDetail.interviewers.map((interviewer, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={interviewer.avatar} alt={interviewer.name} />
                    <AvatarFallback>{interviewer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{interviewer.name}</h3>
                    <p className="text-muted-foreground">{interviewer.role}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a href={`mailto:${interviewer.email}`} className="text-sm hover:underline">
                      {interviewer.email}
                    </a>
                  </div>
                  {interviewer.linkedin && (
                    <div className="flex items-center space-x-2">
                      <Linkedin className="h-4 w-4 text-blue-600" />
                      <a href={interviewer.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">
                        LinkedIn Profile
                      </a>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'preparation' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Preparation Materials</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockInterviewDetail.preparationMaterials.map((material, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getResourceIcon(material.type)}
                      <div>
                        <p className="font-medium">{material.name}</p>
                        <p className="text-sm text-muted-foreground">{material.description}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tech Stack Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {mockInterviewDetail.techStack.map((tech, index) => (
                  <Badge key={index} variant="secondary" className="px-3 py-1">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'requirements' && (
        <Card>
          <CardHeader>
            <CardTitle>Role Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockInterviewDetail.roleRequirements.map((requirement, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Target className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>{requirement}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}