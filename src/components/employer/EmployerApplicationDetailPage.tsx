import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Progress } from "../ui/progress";
import { Textarea } from "../ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { 
  ArrowLeft,
  CheckCircle,
  Clock,
  Calendar,
  MapPin,
  FileText,
  User,
  MessageSquare,
  Edit,
  Download,
  XCircle,
  CircleDot,
  DollarSign,
  Briefcase,
  Star,
  Send,
  CalendarPlus,
  Mail,
  Phone,
  ThumbsUp,
  ThumbsDown,
  Award,
  Save,
  Eye
} from "lucide-react";

interface CandidateApplication {
  id: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;
  candidateAvatar?: string;
  candidateLocation: string;
  jobTitle: string;
  appliedDate: string;
  status: 'applied' | 'qualified' | 'interview' | 'final-review' | 'offer' | 'hired' | 'rejected' | 'withdrawn';
  priority: 'low' | 'medium' | 'high';
  employerNotes?: string;
  skills?: string[];
  experience: string;
  expectedSalary?: string;
  workType: 'remote' | 'hybrid' | 'onsite';
  source: string;
  lastActivity: string;
  attachments?: Array<{
    name: string;
    url: string;
    type: string;
    uploadDate: string;
  }>;
  interviews?: Array<{
    id: string;
    type: string;
    date: string;
    time: string;
    duration: string;
    interviewer: string;
    interviewerRole: string;
    status: 'scheduled' | 'completed';
    location?: string;
    notes?: string;
    rating?: number;
  }>;
  stages?: Array<{
    id: number;
    name: string;
    status: 'completed' | 'active' | 'pending';
    date?: string;
    description: string;
    employerNotes?: string;
  }>;
}

interface EmployerApplicationDetailPageProps {
  application?: CandidateApplication;
  onBack: () => void;
}

const mockApplication: CandidateApplication = {
  id: 'app-001',
  candidateName: 'Alex Johnson',
  candidateEmail: 'alex.johnson@example.com',
  candidatePhone: '+1 (555) 123-4567',
  candidateAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
  candidateLocation: 'San Francisco, CA',
  jobTitle: 'Senior Frontend Developer',
  appliedDate: '2024-01-15',
  status: 'interview',
  priority: 'high',
  employerNotes: 'Strong technical background. Excellent portfolio.',
  skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS'],
  experience: '6+ years',
  expectedSalary: '$160k',
  workType: 'hybrid',
  source: 'LinkedIn',
  lastActivity: '2024-01-25',
  attachments: [
    { name: 'Resume_Alex_Johnson.pdf', url: '#', type: 'PDF', uploadDate: '2024-01-15' },
    { name: 'Cover_Letter.pdf', url: '#', type: 'PDF', uploadDate: '2024-01-15' }
  ],
  interviews: [
    {
      id: 'int-001',
      type: 'Initial Screening',
      date: '2024-01-18',
      time: '2:00 PM',
      duration: '30 minutes',
      interviewer: 'Sarah Chen',
      interviewerRole: 'HR Manager',
      status: 'completed',
      location: 'Video Call',
      notes: 'Great cultural fit. Strong communication skills.',
      rating: 4
    },
    {
      id: 'int-002',
      type: 'Technical Interview',
      date: '2024-01-22',
      time: '10:00 AM',
      duration: '90 minutes',
      interviewer: 'Mike Rodriguez',
      interviewerRole: 'Senior Engineering Manager',
      status: 'completed',
      location: 'Video Call',
      notes: 'Excellent technical skills. Great problem-solving approach.',
      rating: 5
    }
  ],
  stages: [
    {
      id: 1,
      name: 'Applied',
      status: 'completed',
      date: '2024-01-15',
      description: 'Application received and reviewed'
    },
    {
      id: 2,
      name: 'Qualified',
      status: 'completed',
      date: '2024-01-16',
      description: 'Initial screening passed',
      employerNotes: 'Resume looks great. Skills match requirements perfectly.'
    },
    {
      id: 3,
      name: 'Interview',
      status: 'active',
      date: '2024-01-18',
      description: 'Interview process ongoing'
    },
    {
      id: 4,
      name: 'Final Review',
      status: 'pending',
      description: 'Final evaluation and decision'
    }
  ]
};

export function EmployerApplicationDetailPage({
  application,
  onBack
}: EmployerApplicationDetailPageProps) {
  const app = application || mockApplication;
  const [employerNotes, setEmployerNotes] = useState(app.employerNotes || '');
  const [isEditingNotes, setIsEditingNotes] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      applied: 'bg-blue-100 text-blue-800',
      qualified: 'bg-green-100 text-green-800',
      interview: 'bg-yellow-100 text-yellow-800',
      'final-review': 'bg-purple-100 text-purple-800',
      offer: 'bg-emerald-100 text-emerald-800',
      hired: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      withdrawn: 'bg-gray-100 text-gray-800'
    };

    const statusLabels = {
      applied: 'Applied',
      qualified: 'Qualified', 
      interview: 'Interview',
      'final-review': 'Final Review',
      offer: 'Offer Sent',
      hired: 'Hired',
      rejected: 'Rejected',
      withdrawn: 'Withdrawn'
    };

    const style = (statusStyles as any)[status] || statusStyles.applied;
    const label = (statusLabels as any)[status] || 'Applied';
    
    return <Badge className={`${style} border-0`}>{label}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const priorityStyles = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800'
    };

    const priorityLabels = {
      low: 'Low Priority',
      medium: 'Medium Priority',
      high: 'High Priority'
    };

    const style = (priorityStyles as any)[priority] || priorityStyles.medium;
    const label = (priorityLabels as any)[priority] || 'Medium Priority';
    
    return <Badge className={`${style} border-0`}>{label}</Badge>;
  };

  const getStageIcon = (status: string) => {
    if (status === 'completed') {
      return <CheckCircle className="h-6 w-6 text-green-600" />;
    } else if (status === 'active') {
      return <CircleDot className="h-6 w-6 text-blue-600" />;
    } else {
      return <Clock className="h-6 w-6 text-gray-400" />;
    }
  };

  const getProgressPercentage = () => {
    const stages = app.stages || [];
    if (stages.length === 0) return 0;
    const completed = stages.filter(stage => stage.status === 'completed').length;
    return (completed / stages.length) * 100;
  };

  const renderStarRating = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={i <= rating ? 'h-4 w-4 text-yellow-400 fill-current' : 'h-4 w-4 text-gray-300'}
        />
      );
    }
    return <div className="flex items-center space-x-1">{stars}</div>;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack} className="p-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-semibold">Candidate Application</h1>
                <p className="text-gray-600">Review and manage candidate application details</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {getStatusBadge(app.status)}
              {getPriorityBadge(app.priority)}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Candidate Summary */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={app.candidateAvatar} alt={app.candidateName} />
                    <AvatarFallback className="text-lg">
                      {app.candidateName.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold mb-2">{app.candidateName}</h2>
                    <p className="text-xl text-gray-600 mb-3">Applied for {app.jobTitle}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        {app.candidateLocation}
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        {app.candidateEmail}
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2" />
                        {app.candidatePhone}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        Applied {formatDate(app.appliedDate)}
                      </div>
                    </div>
                    <div className="mt-4 flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Award className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm">Experience: {app.experience}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Expected: {app.expectedSalary}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Briefcase className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">{app.workType}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Button variant="outline" size="sm">
                      <User className="h-4 w-4 mr-2" />
                      View Profile
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress Timeline */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Application Progress</CardTitle>
                  <div className="text-sm text-gray-600">
                    {getProgressPercentage().toFixed(0)}% Complete
                  </div>
                </div>
                <Progress value={getProgressPercentage()} className="h-2 mt-2" />
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {(app.stages || []).map((stage, index) => (
                    <div key={stage.id} className="relative">
                      {index < (app.stages?.length || 0) - 1 && (
                        <div className="absolute left-3 top-8 w-0.5 h-12 bg-gray-200"></div>
                      )}
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          {getStageIcon(stage.status)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-900">{stage.name}</h4>
                            {stage.date && (
                              <span className="text-sm text-gray-500">{formatDate(stage.date)}</span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{stage.description}</p>
                          {stage.employerNotes && (
                            <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                              <h5 className="font-medium text-blue-900 mb-1">Employer Notes</h5>
                              <p className="text-sm text-blue-800">{stage.employerNotes}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tabbed Content */}
            <Tabs defaultValue="notes" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="interviews">Interviews</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>

              <TabsContent value="notes" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Employer Notes</CardTitle>
                      {!isEditingNotes && (
                        <Button size="sm" onClick={() => setIsEditingNotes(true)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Notes
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    {isEditingNotes ? (
                      <div className="space-y-4">
                        <Textarea
                          value={employerNotes}
                          onChange={(e) => setEmployerNotes(e.target.value)}
                          placeholder="Add your notes about this candidate..."
                          className="min-h-[200px]"
                        />
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setIsEditingNotes(false)}>
                            Cancel
                          </Button>
                          <Button onClick={() => setIsEditingNotes(false)}>
                            <Save className="h-4 w-4 mr-2" />
                            Save Notes
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="min-h-[200px]">
                        {employerNotes ? (
                          <p className="text-gray-700 whitespace-pre-wrap">{employerNotes}</p>
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            <MessageSquare className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                            <p>No notes added yet</p>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="mt-2"
                              onClick={() => setIsEditingNotes(true)}
                            >
                              Add Your First Note
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="interviews" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Interview History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {(app.interviews || []).map((interview) => (
                        <div key={interview.id} className="p-4 border rounded-lg">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-medium">{interview.type}</h4>
                              <p className="text-sm text-gray-600">
                                {formatDate(interview.date)} at {interview.time} ({interview.duration})
                              </p>
                            </div>
                            <Badge variant={interview.status === 'completed' ? 'default' : 'secondary'}>
                              {interview.status === 'completed' ? 'Completed' : 'Scheduled'}
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center text-sm text-gray-600">
                              <User className="h-4 w-4 mr-2" />
                              {interview.interviewer} - {interview.interviewerRole}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <MapPin className="h-4 w-4 mr-2" />
                              {interview.location}
                            </div>
                            {interview.rating && (
                              <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-600">Rating:</span>
                                {renderStarRating(interview.rating)}
                              </div>
                            )}
                          </div>
                          {interview.notes && (
                            <div className="mt-3 p-3 bg-gray-50 rounded">
                              <h5 className="font-medium mb-1">Interview Notes</h5>
                              <p className="text-sm text-gray-700">{interview.notes}</p>
                            </div>
                          )}
                        </div>
                      ))}
                      {(!app.interviews || app.interviews.length === 0) && (
                        <div className="text-center py-8 text-gray-500">
                          <Calendar className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                          <p>No interviews scheduled yet</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Application Documents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {(app.attachments || []).map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-gray-400" />
                            <div>
                              <p className="font-medium">{doc.name}</p>
                              <p className="text-sm text-gray-500">
                                {doc.type} • Uploaded {formatDate(doc.uploadDate)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  Approve Candidate
                </Button>
                <Button className="w-full" variant="outline">
                  <Send className="h-4 w-4 mr-2" />
                  Make Offer
                </Button>
                <Button className="w-full text-red-600 hover:text-red-700" variant="outline">
                  <ThumbsDown className="h-4 w-4 mr-2" />
                  Reject Candidate
                </Button>
                <Button className="w-full" variant="outline">
                  <CalendarPlus className="h-4 w-4 mr-2" />
                  Schedule Interview
                </Button>
              </CardContent>
            </Card>

            {/* Application Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Application Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Source</span>
                  <Badge variant="outline">{app.source}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Work Type</span>
                  <Badge variant="outline">{app.workType}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Last Activity</span>
                  <span className="text-sm">{formatDate(app.lastActivity)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            {app.skills && app.skills.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Required Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {app.skills.map((skill, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <Badge variant="secondary">{skill}</Badge>
                        <Star className="h-4 w-4 text-yellow-500" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}