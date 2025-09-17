import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Progress } from "../ui/progress";
import { Textarea } from "../ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { PipelineManagement } from "../PipelineManagement";
import { mockPipelineApplications } from "../../data/pipelineMockData";
import { 
  Search,
  Filter,
  Download,
  ArrowLeft,
  MapPin,
  Briefcase,
  GraduationCap,
  Clock,
  Star,
  Mail,
  Phone,
  Calendar,
  FileText,
  ExternalLink,
  MessageCircle,
  CheckCircle,
  XCircle,
  Pause,
  Eye,
  Edit,
  MoreHorizontal
} from "lucide-react";
import { ApplicationCard } from "./components/ApplicationCard";
import { ApplicationTableRow } from "./components/ApplicationTableRow";
import { mockApplications } from "./data/mockApplications";
import { Application, filterApplications, getTabCount } from "./utils/applicationUtils";

interface DetailedApplication extends Application {
  resumeUrl?: string;
  coverLetter?: string;
  portfolioUrl?: string;
  applicationAnswers?: Array<{ question: string; answer: string }>;
  interviewHistory?: Array<{
    date: string;
    type: string;
    interviewer: string;
    notes: string;
    rating: number;
  }>;
  timeline?: Array<{
    date: string;
    action: string;
    description: string;
    user: string;
  }>;
  notes?: Array<{
    id: string;
    date: string;
    author: string;
    content: string;
  }>;
}

const detailedMockApplications: DetailedApplication[] = mockApplications.map(app => ({
  ...app,
  resumeUrl: '#resume.pdf',
  coverLetter: `Dear Hiring Manager,\n\nI am excited to apply for the ${app.jobTitle} position at your company. With ${app.experience} of experience in software development, I believe I would be a valuable addition to your team.\n\nMy background includes extensive work with modern technologies and frameworks that align perfectly with your requirements. I am particularly drawn to this opportunity because of your company's innovative approach and strong engineering culture.\n\nI would welcome the opportunity to discuss how my skills and passion can contribute to your team's success.\n\nBest regards,\n${app.candidateName}`,
  portfolioUrl: app.candidateName.includes('Sarah') ? 'https://sarahchen.dev' : undefined,
  applicationAnswers: [
    {
      question: "Why are you interested in this role?",
      answer: "I'm passionate about building scalable applications and your company's mission really resonates with me. This role would allow me to work on challenging problems while contributing to meaningful products."
    },
    {
      question: "What is your experience with our tech stack?",
      answer: "I have extensive experience with React, TypeScript, and Node.js. I've built several production applications using these technologies and am comfortable with the entire development lifecycle."
    }
  ],
  interviewHistory: app.status !== 'new' ? [
    {
      date: '2024-01-20',
      type: 'Phone Screen',
      interviewer: 'Sarah Wilson',
      notes: 'Strong technical background, good communication skills. Recommended for technical interview.',
      rating: 4
    }
  ] : [],
  timeline: [
    {
      date: '2024-01-15',
      action: 'Application Submitted',
      description: 'Candidate submitted application with resume and cover letter',
      user: 'System'
    },
    {
      date: '2024-01-16',
      action: 'Application Reviewed',
      description: 'Initial screening completed',
      user: 'Alex Johnson'
    },
    ...(app.status !== 'new' ? [{
      date: '2024-01-18',
      action: 'Interview Scheduled',
      description: 'Phone screen scheduled with Sarah Wilson',
      user: 'Sarah Wilson'
    }] : [])
  ],
  notes: [
    {
      id: '1',
      date: '2024-01-16',
      author: 'Alex Johnson',
      content: 'Strong technical background. Resume shows progressive career growth. Definitely worth interviewing.'
    }
  ]
}));

interface EnhancedEmployerApplicationsPageProps {
  activeSubTab?: string;
  onViewCandidateProfile?: (candidateId: string) => void;
  onViewCandidatePreview?: (candidateId: string) => void;
}

export function EnhancedEmployerApplicationsPage({ 
  activeSubTab = 'all',
  onViewCandidateProfile,
  onViewCandidatePreview 
}: EnhancedEmployerApplicationsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [selectedApplication, setSelectedApplication] = useState<DetailedApplication | null>(null);
  const [newNote, setNewNote] = useState('');
  const [feedbackNotes, setFeedbackNotes] = useState('');

  const filteredApplications = filterApplications(detailedMockApplications, searchQuery, statusFilter, activeSubTab);

  const handleStatusChange = (applicationId: string, newStatus: string) => {
    console.log(`Updating application ${applicationId} to status: ${newStatus}`);
  };

  const handleViewCandidateProfile = (application: Application) => {
    if (onViewCandidateProfile) {
      onViewCandidateProfile(application.candidateId);
    }
  };

  const handleViewCandidatePreview = (application: Application) => {
    if (onViewCandidatePreview) {
      onViewCandidatePreview(application.candidateId);
    }
  };

  const handleViewApplication = (application: DetailedApplication) => {
    setSelectedApplication(application);
  };

  const handleAddNote = () => {
    if (newNote.trim() && selectedApplication) {
      const note = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        author: 'Alex Johnson', // Current user
        content: newNote
      };
      
      setSelectedApplication({
        ...selectedApplication,
        notes: [note, ...(selectedApplication.notes || [])]
      });
      setNewNote('');
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  if (selectedApplication) {
    return (
      <div className="flex flex-col h-full bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedApplication(null)}
                className="flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Applications
              </Button>
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={selectedApplication.candidateAvatar} alt={selectedApplication.candidateName} />
                  <AvatarFallback>
                    {selectedApplication.candidateName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-xl font-semibold">{selectedApplication.candidateName}</h1>
                  <p className="text-gray-600">{selectedApplication.jobTitle}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Select value={selectedApplication.status} onValueChange={(value) => handleStatusChange(selectedApplication.id, value)}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="reviewed">Reviewed</SelectItem>
                  <SelectItem value="shortlisted">Shortlisted</SelectItem>
                  <SelectItem value="interview">Interview</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="hired">Hired</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <MessageCircle className="h-4 w-4 mr-2" />
                Message
              </Button>
              <Button>
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Interview
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          <div className="grid grid-cols-12 h-full">
            {/* Main Content */}
            <div className="col-span-8 overflow-y-auto p-6">
              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="application">Application</TabsTrigger>
                  <TabsTrigger value="interviews">Interviews</TabsTrigger>
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  {/* Candidate Summary */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Candidate Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span>{selectedApplication.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Briefcase className="h-4 w-4 text-gray-400" />
                          <span>{selectedApplication.experience}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <GraduationCap className="h-4 w-4 text-gray-400" />
                          <span>{selectedApplication.education}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span>Applied {selectedApplication.appliedDate}</span>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h4 className="font-medium mb-2">Contact Information</h4>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Mail className="h-4 w-4 text-gray-400" />
                            <span>{selectedApplication.candidateEmail}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-gray-400" />
                            <span>+1 (555) 123-4567</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Match Analysis */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Match Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">Overall Match Score</span>
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-500" />
                              <span className="font-semibold">{selectedApplication.matchScore}%</span>
                            </div>
                          </div>
                          <Progress value={selectedApplication.matchScore} className="mb-4" />
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">{selectedApplication.experienceScore}%</div>
                            <div className="text-sm text-gray-600">Experience</div>
                          </div>
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">{selectedApplication.talentScore}%</div>
                            <div className="text-sm text-gray-600">Talent</div>
                          </div>
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-purple-600">{selectedApplication.testScore}%</div>
                            <div className="text-sm text-gray-600">Assessment</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Skills */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Skills & Expertise</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {selectedApplication.skills.map((skill, index) => (
                          <Badge key={index} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="application" className="space-y-6">
                  {/* Resume & Cover Letter */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Application Documents</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-blue-600" />
                          <span>Resume.pdf</span>
                        </div>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </div>
                      
                      {selectedApplication.portfolioUrl && (
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <ExternalLink className="h-5 w-5 text-purple-600" />
                            <span>Portfolio</span>
                          </div>
                          <Button variant="outline" size="sm">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Cover Letter */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Cover Letter</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="prose prose-sm max-w-none">
                        <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                          {selectedApplication.coverLetter}
                        </pre>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Application Questions */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Application Questions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {selectedApplication.applicationAnswers?.map((qa, index) => (
                        <div key={index} className="border-l-4 border-blue-200 pl-4">
                          <h4 className="font-medium text-gray-900 mb-2">{qa.question}</h4>
                          <p className="text-gray-700 text-sm">{qa.answer}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="interviews" className="space-y-6">
                  {selectedApplication.interviewHistory && selectedApplication.interviewHistory.length > 0 ? (
                    <div className="space-y-4">
                      {selectedApplication.interviewHistory.map((interview, index) => (
                        <Card key={index}>
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="font-semibold">{interview.type}</h3>
                                <p className="text-sm text-gray-600">with {interview.interviewer}</p>
                                <p className="text-sm text-gray-500">{interview.date}</p>
                              </div>
                              <div className="flex items-center space-x-1">
                                {renderStars(interview.rating)}
                              </div>
                            </div>
                            <p className="text-sm">{interview.notes}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="p-8 text-center">
                        <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <h3 className="font-medium mb-2">No interviews yet</h3>
                        <p className="text-gray-600 mb-4">Schedule an interview to start the evaluation process</p>
                        <Button>
                          <Calendar className="h-4 w-4 mr-2" />
                          Schedule Interview
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="timeline" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Application Timeline</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {selectedApplication.timeline?.map((event, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium">{event.action}</h4>
                                <span className="text-sm text-gray-500">{event.date}</span>
                              </div>
                              <p className="text-sm text-gray-600">{event.description}</p>
                              <p className="text-xs text-gray-500">by {event.user}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="col-span-4 border-l border-gray-200 bg-white p-6 overflow-y-auto">
              <div className="space-y-6">
                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Move to Next Stage
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Interview
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50">
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject Application
                    </Button>
                  </CardContent>
                </Card>

                {/* Notes */}
                <Card>
                  <CardHeader>
                    <CardTitle>Notes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Textarea
                        placeholder="Add a note..."
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        rows={3}
                      />
                      <Button onClick={handleAddNote} disabled={!newNote.trim()}>
                        Add Note
                      </Button>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-3">
                      {selectedApplication.notes?.map((note) => (
                        <div key={note.id} className="text-sm">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium">{note.author}</span>
                            <span className="text-gray-500">{note.date}</span>
                          </div>
                          <p className="text-gray-700">{note.content}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main applications list view
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header - only show in Overview tab */}
      {activeSubTab === 'overview' && (
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
            <p className="text-gray-600">Review and manage candidate applications</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
            </Button>
          </div>
        </div>
      )}
      
      {/* Alternative headers for other tabs */}
      {activeSubTab === 'review-queue' && (
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Review Queue</h1>
            <p className="text-gray-600">Applications pending your review</p>
          </div>
        </div>
      )}
      
      {activeSubTab === 'pipeline-shortlists' && (
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Pipeline & Shortlists</h1>
            <p className="text-gray-600">Manage your candidate pipeline and shortlists</p>
          </div>
        </div>
      )}
      
      {activeSubTab === 'assessments-artifacts' && (
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Assessments & Artifacts</h1>
            <p className="text-gray-600">Review candidate assessments and submission artifacts</p>
          </div>
        </div>
      )}
      
      {activeSubTab === 'interviews-scheduler' && (
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Interviews & Scheduler</h1>
            <p className="text-gray-600">Schedule and manage candidate interviews</p>
          </div>
        </div>
      )}
      
      {activeSubTab === 'reports-analytics' && (
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="text-gray-600">Application analytics and hiring insights</p>
          </div>
        </div>
      )}

      {/* Tabs */}
      <Tabs value={activeSubTab}>
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">
              All ({getTabCount(detailedMockApplications)})
            </TabsTrigger>
            <TabsTrigger value="new">
              New ({getTabCount(detailedMockApplications, 'new')})
            </TabsTrigger>
            <TabsTrigger value="shortlisted">
              Shortlisted ({getTabCount(detailedMockApplications, 'shortlisted')})
            </TabsTrigger>
            <TabsTrigger value="interview">
              Interview ({getTabCount(detailedMockApplications, 'interview')})
            </TabsTrigger>
            <TabsTrigger value="hired">
              Hired ({getTabCount(detailedMockApplications, 'hired')})
            </TabsTrigger>
          </TabsList>
          
          <div className="flex items-center space-x-2">
            <div className="flex border rounded-lg">
              <Button
                variant={viewMode === 'table' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('table')}
              >
                Table
              </Button>
              <Button
                variant={viewMode === 'cards' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('cards')}
              >
                Cards
              </Button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search candidates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="reviewed">Reviewed</SelectItem>
              <SelectItem value="shortlisted">Shortlisted</SelectItem>
              <SelectItem value="interview">Interview</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="hired">Hired</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="match-score">Highest Match Score</SelectItem>
              <SelectItem value="name">Name (A-Z)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <TabsContent value={activeSubTab} className="space-y-6">
          {activeSubTab === 'pipeline-shortlists' ? (
            <PipelineManagement />
          ) : viewMode === 'table' ? (
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Candidate</TableHead>
                    <TableHead>Job</TableHead>
                    <TableHead>Applied</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Match Score</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplications.map((application) => (
                    <ApplicationTableRow
                      key={application.id}
                      application={application}
                      onViewProfile={handleViewCandidateProfile}
                      onViewPreview={handleViewCandidatePreview}
                      onStatusChange={handleStatusChange}
                      onViewApplication={() => handleViewApplication(application)}
                    />
                  ))}
                </TableBody>
              </Table>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredApplications.map((application) => (
                <div key={application.id} onClick={() => handleViewApplication(application)} className="cursor-pointer">
                  <ApplicationCard
                    application={application}
                    onViewProfile={handleViewCandidateProfile}
                    onViewPreview={handleViewCandidatePreview}
                    onStatusChange={handleStatusChange}
                  />
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}