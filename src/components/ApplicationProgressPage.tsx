import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { Textarea } from "./ui/textarea";
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
  ArrowLeft,
  Download,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  CircleDot,
  Heart,
  Archive,
  DollarSign,
  TrendingUp,
  Briefcase,
  Star,
  Edit,
  Send,
  Bell,
  Trash2
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

interface ApplicationProgressPageProps {
  application: Application;
  onBack: () => void;
}

export function ApplicationProgressPage({ application, onBack }: ApplicationProgressPageProps) {
  const [notes, setNotes] = useState(application.notes);
  const [showEditNotes, setShowEditNotes] = useState(false);

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

  const getStageColor = (stage: ApplicationStage) => {
    switch (stage.status) {
      case 'completed':
        return 'border-green-200 bg-green-50';
      case 'active':
        return 'border-blue-200 bg-blue-50';
      case 'rejected':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const getCurrentStageInfo = () => {
    const currentStage = application.stages.find(stage => stage.status === 'active');
    return currentStage || application.stages[application.stages.length - 1];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Applications
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Application Progress</h1>
                <p className="text-sm text-gray-600">Track your application status and next steps</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline">
                <MessageSquare className="h-4 w-4 mr-2" />
                Message Company
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Application Header */}
        <Card>
          <CardContent className="p-8">
            <div className="flex items-center space-x-6">
              <Avatar className="w-20 h-20">
                <AvatarImage src={application.companyLogo} alt={application.company} />
                <AvatarFallback>{application.company.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">{application.jobTitle}</h2>
                <p className="text-lg text-gray-600">{application.company}</p>
                <div className="flex items-center space-x-6 mt-3 text-sm text-gray-500">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {application.location}
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" />
                    {application.salary}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Applied {formatDate(application.appliedDate)}
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-1" />
                    {application.jobType}
                  </div>
                </div>
              </div>
              <div className="text-right">
                {getStatusBadge(application.status)}
                <div className="mt-3 text-sm text-gray-600">
                  Job ID: {application.jobId}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Progress Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Application Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Application Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {application.stages.map((stage, index) => {
                    const isLast = index === application.stages.length - 1;
                    return (
                      <div key={stage.id} className="relative">
                        {!isLast && (
                          <div className="absolute left-3 top-12 w-0.5 h-8 bg-gray-200"></div>
                        )}
                        <div className={`border rounded-lg p-6 ${getStageColor(stage)}`}>
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                              {getStageIcon(stage)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="text-lg font-semibold">{stage.name}</h3>
                                {stage.date && (
                                  <span className="text-sm text-gray-500">{formatDate(stage.date)}</span>
                                )}
                              </div>
                              <p className="text-gray-700 mb-3">{stage.description}</p>
                              
                              {stage.feedback && (
                                <div className="bg-white border rounded-lg p-4 mb-3">
                                  <h4 className="font-medium mb-2">Feedback</h4>
                                  <p className="text-gray-700 text-sm">{stage.feedback}</p>
                                </div>
                              )}

                              {stage.nextSteps && (
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-3">
                                  <h4 className="font-medium text-blue-900 mb-2">Next Steps</h4>
                                  <p className="text-blue-800 text-sm">{stage.nextSteps}</p>
                                </div>
                              )}

                              {stage.requirements && stage.requirements.length > 0 && (
                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                  <h4 className="font-medium text-yellow-900 mb-2">Requirements</h4>
                                  <ul className="space-y-1">
                                    {stage.requirements.map((req, reqIndex) => (
                                      <li key={reqIndex} className="text-yellow-800 text-sm flex items-center">
                                        <span className="w-1.5 h-1.5 bg-yellow-600 rounded-full mr-2"></span>
                                        {req}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Skills Match */}
            {application.skills && (
              <Card>
                <CardHeader>
                  <CardTitle>Required Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {application.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="px-3 py-1">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message Recruiter
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Interview
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  View Job Description
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Building className="h-4 w-4 mr-2" />
                  Company Profile
                </Button>
              </CardContent>
            </Card>

            {/* Application Status */}
            <Card>
              <CardHeader>
                <CardTitle>Status Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Application Status</span>
                  {getStatusBadge(application.status)}
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Current Stage</span>
                  <span className="font-medium">{getCurrentStageInfo()?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Days Since Applied</span>
                  <span className="font-medium">
                    {Math.ceil((new Date().getTime() - new Date(application.appliedDate).getTime()) / (1000 * 3600 * 24))}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">
                      {application.stages.filter(s => s.status === 'completed').length}/{application.stages.length}
                    </span>
                  </div>
                  <Progress 
                    value={(application.stages.filter(s => s.status === 'completed').length / application.stages.length) * 100} 
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>My Notes</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setShowEditNotes(!showEditNotes)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {showEditNotes ? (
                  <div className="space-y-3">
                    <Textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Add your notes about this application..."
                      className="min-h-[100px]"
                    />
                    <div className="flex space-x-2">
                      <Button size="sm" onClick={() => setShowEditNotes(false)}>
                        Save Notes
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setShowEditNotes(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-700 text-sm mb-3">
                      {notes || "No notes added yet"}
                    </p>
                    <Button variant="outline" size="sm" onClick={() => setShowEditNotes(true)}>
                      {notes ? "Edit Notes" : "Add Notes"}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Heart className="h-4 w-4 mr-2" />
                  Save for Later
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Archive className="h-4 w-4 mr-2" />
                  Archive Application
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start text-red-600 hover:text-red-700">
                  <X className="h-4 w-4 mr-2" />
                  Withdraw Application
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}