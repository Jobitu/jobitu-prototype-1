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
  FileText,
  User,
  Building,
  Star,
  MessageSquare,
  Download,
  Users,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Award,
  Mail,
  Linkedin,
  BookOpen,
  Target,
  BarChart3,
  ThumbsUp,
  ThumbsDown
} from "lucide-react";

interface PastInterviewDetailPageProps {
  interviewId: string;
  onBack: () => void;
}

// Mock data for the past interview detail
const mockPastInterviewDetail = {
  id: '4',
  jobTitle: 'Frontend Developer',
  company: 'DesignCorp',
  companyLogo: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=150&h=150&fit=crop',
  date: '2024-01-12',
  time: '11:00',
  duration: 120,
  type: 'video' as const,
  platform: 'Zoom',
  stage: 'Technical + Culture',
  applicationId: '4',
  interviewers: [
    { name: 'Emily Davis', role: 'Design Lead', email: 'emily@designcorp.com' },
    { name: 'Tom Wilson', role: 'Frontend Architect', email: 'tom@designcorp.com' }
  ],
  status: 'completed' as const,
  result: 'passed' as const,
  outcome: 'Offer extended - Starting Feb 1st',
  notes: 'Great team and company culture. Technical discussion went very well. Received offer!',
  feedback: 'Excellent technical skills and great cultural fit. The team was impressed with your portfolio and problem-solving approach. Your attention to detail and design sensibility make you a perfect fit for our team. We were particularly impressed with your React component architecture and CSS skills.',
  overallRating: 9,
  ratings: [
    { 
      category: 'Technical Skills', 
      score: 9, 
      maxScore: 10,
      feedback: 'Excellent React and CSS knowledge. Strong understanding of component architecture and modern development practices.' 
    },
    { 
      category: 'Portfolio Quality', 
      score: 10, 
      maxScore: 10,
      feedback: 'Outstanding portfolio showcasing diverse projects. Great attention to design and user experience.' 
    },
    { 
      category: 'Problem Solving', 
      score: 8, 
      maxScore: 10,
      feedback: 'Good approach to technical challenges. Clear thinking process and well-structured solutions.' 
    },
    { 
      category: 'Cultural Fit', 
      score: 9, 
      maxScore: 10,
      feedback: 'Perfect fit with our design-focused culture. Strong collaboration skills and shared values.' 
    },
    {
      category: 'Communication',
      score: 8,
      maxScore: 10,
      feedback: 'Clear and articulate communication. Good at explaining technical concepts.'
    }
  ],
  rounds: [
    { 
      name: 'Portfolio Review', 
      duration: 30, 
      description: 'Discussion of past projects and design decisions',
      completed: true,
      feedback: 'Excellent portfolio presentation. Projects show strong technical and design skills.'
    },
    { 
      name: 'Technical Challenge', 
      duration: 60, 
      description: 'CSS and JavaScript problem solving',
      completed: true,
      feedback: 'Solved the challenge efficiently with clean, well-structured code.'
    },
    { 
      name: 'Team Culture', 
      duration: 30, 
      description: 'Values and collaboration discussion',
      completed: true,
      feedback: 'Great cultural alignment. Shared values and collaborative approach.'
    }
  ],
  strengths: [
    'Strong technical skills in React and TypeScript',
    'Excellent portfolio with diverse projects',
    'Great attention to design and UX details',
    'Clear communication and problem-solving approach',
    'Strong cultural fit with team values'
  ],
  areasForImprovement: [
    'Could expand backend knowledge for full-stack opportunities',
    'Consider adding more complex system design experience'
  ],
  nextSteps: [
    'Offer extended with competitive package',
    'Start date scheduled for February 1st, 2024',
    'Onboarding materials will be sent next week'
  ],
  interviewerNotes: [
    {
      interviewer: 'Emily Davis',
      role: 'Design Lead',
      note: 'Impressed with the candidate\'s design sensibility and attention to user experience. The portfolio projects show real understanding of modern web design principles.'
    },
    {
      interviewer: 'Tom Wilson', 
      role: 'Frontend Architect',
      note: 'Strong technical foundation. Code quality is excellent and shows understanding of React best practices. Would fit well into our development team.'
    }
  ]
};

export function PastInterviewDetailPage({ interviewId, onBack }: PastInterviewDetailPageProps) {
  const [activeTab, setActiveTab] = useState('overview');

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

  const getResultIcon = (result: string) => {
    switch (result) {
      case 'passed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
    }
  };

  const getResultBadge = (result: string) => {
    switch (result) {
      case 'passed':
        return <Badge className="bg-green-100 text-green-800">Passed</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800">Not Selected</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    }
  };

  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 70) return 'text-blue-600';
    if (percentage >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 90) return 'bg-green-100';
    if (percentage >= 70) return 'bg-blue-100';
    if (percentage >= 50) return 'bg-yellow-100';
    return 'bg-red-100';
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
              <AvatarImage src={mockPastInterviewDetail.companyLogo} alt={mockPastInterviewDetail.company} />
              <AvatarFallback>{mockPastInterviewDetail.company.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl">{mockPastInterviewDetail.jobTitle}</h1>
              <p className="text-sm text-muted-foreground">{mockPastInterviewDetail.company} • {mockPastInterviewDetail.stage}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {getResultIcon(mockPastInterviewDetail.result)}
          {getResultBadge(mockPastInterviewDetail.result)}
        </div>
      </div>

      {/* Interview Summary Card */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Interview Date</p>
                <p className="font-medium">{formatDate(mockPastInterviewDetail.date)}</p>
                <p className="text-sm text-muted-foreground">{formatTime(mockPastInterviewDetail.time)}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Clock className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="font-medium">{mockPastInterviewDetail.duration} minutes</p>
                <p className="text-sm text-muted-foreground">{Math.floor(mockPastInterviewDetail.duration / 60)}h {mockPastInterviewDetail.duration % 60}m</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Video className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Platform</p>
                <p className="font-medium">{mockPastInterviewDetail.platform}</p>
                <p className="text-sm text-muted-foreground">{mockPastInterviewDetail.type}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${getScoreBgColor(mockPastInterviewDetail.overallRating, 10)}`}>
                <BarChart3 className={`h-5 w-5 ${getScoreColor(mockPastInterviewDetail.overallRating, 10)}`} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Overall Rating</p>
                <p className="font-medium">{mockPastInterviewDetail.overallRating}/10</p>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={`h-3 w-3 ${star <= Math.round(mockPastInterviewDetail.overallRating / 2) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Outcome Card */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            {mockPastInterviewDetail.result === 'passed' ? (
              <div className="p-2 bg-green-100 rounded-lg">
                <ThumbsUp className="h-5 w-5 text-green-600" />
              </div>
            ) : (
              <div className="p-2 bg-red-100 rounded-lg">
                <ThumbsDown className="h-5 w-5 text-red-600" />
              </div>
            )}
            <div className="flex-1">
              <h3 className="font-medium mb-2">Interview Outcome</h3>
              <p className="text-muted-foreground mb-3">{mockPastInterviewDetail.outcome}</p>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="italic">"{mockPastInterviewDetail.feedback}"</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="border-b">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'feedback', label: 'Detailed Feedback' },
              { id: 'ratings', label: 'Ratings' },
              { id: 'notes', label: 'Notes' }
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
              <CardTitle>Interview Rounds</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockPastInterviewDetail.rounds.map((round, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <h4 className="font-medium">{round.name}</h4>
                      </div>
                      <Badge variant="outline">{round.duration} min</Badge>
                    </div>
                    <p className="text-muted-foreground mb-3">{round.description}</p>
                    <div className="bg-green-50 rounded-lg p-3">
                      <p className="text-sm"><strong>Feedback:</strong> {round.feedback}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Key Strengths and Areas for Improvement */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <span>Strengths</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {mockPastInterviewDetail.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-sm">{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  <span>Areas for Growth</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {mockPastInterviewDetail.areasForImprovement.map((area, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <AlertCircle className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
                      <span className="text-sm">{area}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {mockPastInterviewDetail.nextSteps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-xs font-medium text-blue-600">{index + 1}</span>
                    </div>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'feedback' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Overall Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-lg leading-relaxed">{mockPastInterviewDetail.feedback}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Interviewer Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockPastInterviewDetail.interviewerNotes.map((note, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{note.interviewer}</span>
                      <span className="text-sm text-muted-foreground">• {note.role}</span>
                    </div>
                    <p className="text-muted-foreground">{note.note}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'ratings' && (
        <Card>
          <CardHeader>
            <CardTitle>Performance Ratings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {mockPastInterviewDetail.ratings.map((rating, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{rating.category}</h4>
                    <span className={`font-bold ${getScoreColor(rating.score, rating.maxScore)}`}>
                      {rating.score}/{rating.maxScore}
                    </span>
                  </div>
                  <Progress 
                    value={(rating.score / rating.maxScore) * 100} 
                    className="h-2"
                  />
                  <p className="text-sm text-muted-foreground">{rating.feedback}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'notes' && (
        <Card>
          <CardHeader>
            <CardTitle>Personal Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-muted-foreground italic">
                {mockPastInterviewDetail.notes || "No personal notes recorded for this interview."}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}