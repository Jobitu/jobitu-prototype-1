import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { Textarea } from "./ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  ArrowLeft,
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
  Edit,
  Download,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  CircleDot,
  Heart,
  DollarSign,
  Briefcase,
  Star,
  Send,
  Bell,
  Archive,
  RotateCcw,
  Eye,
  Phone,
  Linkedin
} from "lucide-react";

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
  status: 'in-progress' | 'offer-received' | 'not-selected' | 'withdrawn';
  skills?: string[];
  closingDate?: string;
  savedDate?: string;
  archived?: boolean;
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

interface ApplicationDetailPageProps {
  application: Application;
  onBack: () => void;
}

// Mock data for demonstration
const mockInterviews = [
  {
    id: '1',
    type: 'Technical Interview',
    date: '2024-01-20',
    time: '2:00 PM',
    duration: '60 minutes',
    interviewer: 'John Smith',
    role: 'Senior Engineering Manager',
    status: 'completed',
    notes: 'Discussed React architecture and system design. Went well overall.',
    feedback: 'Strong technical skills, good communication. Impressed with portfolio projects.'
  },
  {
    id: '2',
    type: 'Final Round',
    date: '2024-01-25',
    time: '10:00 AM',
    duration: '45 minutes',
    interviewer: 'Sarah Johnson',
    role: 'VP of Engineering',
    status: 'scheduled',
    notes: '',
    feedback: ''
  }
];

const mockDocuments = [
  { name: 'Resume_Updated.pdf', type: 'PDF', size: '245 KB', uploadDate: '2024-01-15' },
  { name: 'Cover_Letter.pdf', type: 'PDF', size: '156 KB', uploadDate: '2024-01-15' },
  { name: 'Portfolio_Link.txt', type: 'Text', size: '1 KB', uploadDate: '2024-01-15' }
];

export function ApplicationDetailPage({ application, onBack }: ApplicationDetailPageProps) {
  const [personalNotes, setPersonalNotes] = useState(application.notes);
  const [isEditingNotes, setIsEditingNotes] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'offer-received':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Offer Received</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">In Progress</Badge>;
      case 'not-selected':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Not Selected</Badge>;
      case 'withdrawn':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Withdrawn</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getStageIcon = (stage: ApplicationStage) => {
    switch (stage.status) {
      case 'completed':
        return <CheckCircle className="h-6 w-6 text-green-600" />;
      case 'active':
        return <CircleDot className="h-6 w-6 text-blue-600" />;
      case 'rejected':
        return <XCircle className="h-6 w-6 text-red-600" />;
      default:
        return <Clock className="h-6 w-6 text-gray-400" />;
    }
  };

  const getProgressPercentage = () => {
    const completedStages = application.stages.filter(stage => stage.status === 'completed').length;
    return (completedStages / application.stages.length) * 100;
  };

  const handleSaveNotes = () => {
    // Here you would save the notes to your backend
    console.log('Saving notes:', personalNotes);
    setIsEditingNotes(false);
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
                <h1 className="text-2xl font-semibold">Application Details</h1>
                <p className="text-gray-600">Track your application progress and manage details</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline">
                <Archive className="h-4 w-4 mr-2" />
                Archive
              </Button>
              <Button variant="outline">
                <Bell className="h-4 w-4 mr-2" />
                Set Reminder
              </Button>
              {getStatusBadge(application.status)}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Summary Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={application.companyLogo} alt={application.company} />
                    <AvatarFallback className="text-lg">{application.company.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold mb-2">{application.jobTitle}</h2>
                    <p className="text-xl text-gray-600 mb-3">{application.company}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        {application.location}
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-2" />
                        {application.salary}
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-2" />
                        {application.jobType}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        Applied {formatDate(application.appliedDate)}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Job Posting
                    </Button>
                    <Button variant="outline" size="sm">
                      <Building className="h-4 w-4 mr-2" />
                      Company Profile
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
                  {application.stages.map((stage, index) => (
                    <div key={stage.id} className="relative">
                      {/* Connector line */}
                      {index < application.stages.length - 1 && (
                        <div className="absolute left-3 top-8 w-0.5 h-12 bg-gray-200"></div>
                      )}
                      
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          {getStageIcon(stage)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-900">{stage.name}</h4>
                            {stage.date && (
                              <span className="text-sm text-gray-500">{formatDate(stage.date)}</span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{stage.description}</p>
                          
                          {stage.feedback && (
                            <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                              <h5 className="font-medium text-blue-900 mb-1">Feedback</h5>
                              <p className="text-sm text-blue-800">{stage.feedback}</p>
                            </div>
                          )}
                          
                          {stage.nextSteps && (
                            <div className="mt-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                              <h5 className="font-medium text-yellow-900 mb-1">Next Steps</h5>
                              <p className="text-sm text-yellow-800">{stage.nextSteps}</p>
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
            <Tabs defaultValue="interviews" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="interviews">Interviews</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
              </TabsList>

              <TabsContent value="interviews" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Interview History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockInterviews.map((interview) => (
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
                              {interview.interviewer} - {interview.role}
                            </div>
                          </div>
                          
                          {interview.notes && (
                            <div className="mt-3 p-3 bg-gray-50 rounded">
                              <h5 className="font-medium mb-1">My Notes</h5>
                              <p className="text-sm text-gray-700">{interview.notes}</p>
                            </div>
                          )}
                          
                          {interview.feedback && (
                            <div className="mt-3 p-3 bg-green-50 rounded">
                              <h5 className="font-medium mb-1">Feedback</h5>
                              <p className="text-sm text-green-800">{interview.feedback}</p>
                            </div>
                          )}
                          
                          {interview.status === 'scheduled' && (
                            <div className="mt-3 flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Video className="h-4 w-4 mr-2" />
                                Join Meeting
                              </Button>
                              <Button size="sm" variant="outline">
                                <Calendar className="h-4 w-4 mr-2" />
                                Reschedule
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                      
                      {mockInterviews.length === 0 && (
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
                    <div className="flex items-center justify-between">
                      <CardTitle>Application Documents</CardTitle>
                      <Button size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        Upload Document
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockDocuments.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-gray-400" />
                            <div>
                              <p className="font-medium">{doc.name}</p>
                              <p className="text-sm text-gray-500">
                                {doc.type} • {doc.size} • Uploaded {formatDate(doc.uploadDate)}
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

              <TabsContent value="notes" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Personal Notes</CardTitle>
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
                          value={personalNotes}
                          onChange={(e) => setPersonalNotes(e.target.value)}
                          placeholder="Add your thoughts about this application, interview prep notes, or any other details..."
                          className="min-h-[200px]"
                        />
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setIsEditingNotes(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleSaveNotes}>
                            Save Notes
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="min-h-[200px]">
                        {personalNotes ? (
                          <p className="text-gray-700 whitespace-pre-wrap">{personalNotes}</p>
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
                <Button className="w-full" variant="outline">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Follow-up
                </Button>
                <Button className="w-full" variant="outline">
                  <Phone className="h-4 w-4 mr-2" />
                  Schedule Call
                </Button>
                <Button className="w-full" variant="outline">
                  <Linkedin className="h-4 w-4 mr-2" />
                  Connect on LinkedIn
                </Button>
                <Button className="w-full" variant="outline">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Withdraw Application
                </Button>
              </CardContent>
            </Card>

            {/* Skills Match */}
            {application.skills && (
              <Card>
                <CardHeader>
                  <CardTitle>Required Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {application.skills.map((skill, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <Badge variant="secondary">{skill}</Badge>
                        <Star className="h-4 w-4 text-yellow-500" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Offer Details */}
            {application.offerDetails && (
              <Card>
                <CardHeader>
                  <CardTitle>Offer Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Offer Value</p>
                    <p className="text-lg font-semibold text-green-600">{application.offerDetails.value}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Expires On</p>
                    <p className="font-medium">{formatDate(application.offerDetails.expiryDate)}</p>
                  </div>
                  {application.offerDetails.benefits && (
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Benefits</p>
                      <div className="space-y-1">
                        {application.offerDetails.benefits.map((benefit, index) => (
                          <div key={index} className="flex items-center text-sm">
                            <CheckCircle className="h-3 w-3 mr-2 text-green-500" />
                            {benefit}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex space-x-2">
                    <Button className="flex-1 bg-green-600 hover:bg-green-700">
                      Accept Offer
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Negotiate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Application Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-600">Applied on {formatDate(application.appliedDate)}</span>
                  </div>
                  {application.stages
                    .filter(stage => stage.date && stage.status === 'completed')
                    .map((stage, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <span className="text-gray-600">{stage.name} - {formatDate(stage.date!)}</span>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}