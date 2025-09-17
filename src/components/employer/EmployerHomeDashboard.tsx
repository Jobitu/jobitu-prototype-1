import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Progress } from "../ui/progress";
import { useTabContent } from "../TabContentProvider";
import { 
  Users, 
  FileText, 
  Calendar,
  Eye,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  Star,
  MessageSquare,
  ArrowRight,
  Plus,
  BarChart3,
  Target,
  Building,
  Activity,
  Briefcase,
  UserCheck,
  Zap,
  Award,
  Sparkles
} from "lucide-react";

interface EmployerHomeDashboardProps {
  onNavigateToApplications: () => void;
  onNavigateToInterviews: () => void;
  onNavigateToJobs: () => void;
  onNavigateToAnalytics: () => void;
  onCreateJob: () => void;
}

interface JobPosting {
  id: string;
  title: string;
  applications: number;
  views: number;
  status: 'active' | 'draft' | 'closed';
  postedDate: string;
}

interface RecentApplication {
  id: string;
  candidateName: string;
  candidateAvatar: string;
  jobTitle: string;
  appliedDate: string;
  status: 'new' | 'reviewed' | 'interview' | 'rejected' | 'hired';
  matchScore: number;
}

interface UpcomingInterview {
  id: string;
  candidateName: string;
  candidateAvatar: string;
  jobTitle: string;
  date: string;
  time: string;
  type: 'video' | 'phone' | 'in-person';
}

const mockJobPostings: JobPosting[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    applications: 47,
    views: 1205,
    status: 'active',
    postedDate: '2024-01-15'
  },
  {
    id: '2',
    title: 'Product Manager',
    applications: 32,
    views: 867,
    status: 'active',
    postedDate: '2024-01-12'
  },
  {
    id: '3',
    title: 'UX Designer',
    applications: 28,
    views: 743,
    status: 'active',
    postedDate: '2024-01-10'
  }
];

const mockRecentApplications: RecentApplication[] = [
  {
    id: '1',
    candidateName: 'Sarah Chen',
    candidateAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop',
    jobTitle: 'Senior Frontend Developer',
    appliedDate: '2 hours ago',
    status: 'new',
    matchScore: 94
  },
  {
    id: '2',
    candidateName: 'Michael Rodriguez',
    candidateAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    jobTitle: 'Product Manager',
    appliedDate: '4 hours ago',
    status: 'reviewed',
    matchScore: 89
  },
  {
    id: '3',
    candidateName: 'Emily Davis',
    candidateAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    jobTitle: 'UX Designer',
    appliedDate: '1 day ago',
    status: 'interview',
    matchScore: 92
  }
];

const mockUpcomingInterviews: UpcomingInterview[] = [
  {
    id: '1',
    candidateName: 'Alex Johnson',
    candidateAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    jobTitle: 'Senior Frontend Developer',
    date: 'Today',
    time: '2:00 PM',
    type: 'video'
  },
  {
    id: '2',
    candidateName: 'Jessica Adams',
    candidateAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop',
    jobTitle: 'Product Manager',
    date: 'Tomorrow',
    time: '10:00 AM',
    type: 'video'
  }
];

export function EmployerHomeDashboard({ 
  onNavigateToApplications,
  onNavigateToInterviews,
  onNavigateToJobs,
  onNavigateToAnalytics,
  onCreateJob
}: EmployerHomeDashboardProps) {
  const { activeSubTab } = useTabContent();
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">New</Badge>;
      case 'reviewed':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Reviewed</Badge>;
      case 'interview':
        return <Badge className="bg-purple-100 text-purple-800 border-purple-200">Interview</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Rejected</Badge>;
      case 'hired':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Hired</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getJobStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>;
      case 'draft':
        return <Badge className="bg-muted text-muted-foreground border-border">Draft</Badge>;
      case 'closed':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Closed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  // Render different content based on active sub-tab
  const renderTabContent = () => {
    switch (activeSubTab) {
      case 'recent-activity':
        return renderRecentActivityTab();
      case 'quick-actions':
        return renderQuickActionsTab();
      case 'notifications':
        return renderNotificationsTab();
      default:
        return renderOverviewTab();
    }
  };

  const renderOverviewTab = () => (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Enhanced Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-8 text-white">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back to TechFlow Inc.! 👋
            </h1>
            <p className="text-indigo-100 text-lg">
              Here's an overview of your hiring activity and pipeline.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <Button 
              onClick={onCreateJob} 
              className="bg-background text-primary hover:bg-muted font-medium"
              size="lg"
            >
              <Plus className="h-5 w-5 mr-2" />
              Post New Job
            </Button>
            <Button 
              variant="outline" 
              onClick={onNavigateToAnalytics}
              className="border-white text-white bg-transparent hover:bg-white/10"
              size="lg"
            >
              <BarChart3 className="h-5 w-5 mr-2" />
              View Analytics
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 mb-1">Active Jobs</p>
                <p className="text-3xl font-bold text-blue-900">8</p>
                <p className="text-xs text-green-600 font-medium">+2 this month</p>
              </div>
              <div className="bg-blue-600 p-3 rounded-full">
                <FileText className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 mb-1">Total Applications</p>
                <p className="text-3xl font-bold text-green-900">247</p>
                <p className="text-xs text-green-600 font-medium">+18 today</p>
              </div>
              <div className="bg-green-600 p-3 rounded-full">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-100 border-purple-200 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 mb-1">Interviews</p>
                <p className="text-3xl font-bold text-purple-900">12</p>
                <p className="text-xs text-blue-600 font-medium">2 today</p>
              </div>
              <div className="bg-purple-600 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-amber-100 border-orange-200 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600 mb-1">Profile Views</p>
                <p className="text-3xl font-bold text-orange-900">3.2k</p>
                <p className="text-xs text-green-600 font-medium">+15% this week</p>
              </div>
              <div className="bg-orange-600 p-3 rounded-full">
                <Eye className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Applications and Hiring Pipeline Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Applications */}
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center text-xl">
                <Users className="h-6 w-6 mr-3 text-blue-600" />
                Recent Applications
              </CardTitle>
              <Button variant="ghost" onClick={onNavigateToApplications} className="text-blue-600 hover:text-blue-700">
                View All
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockRecentApplications.map((application) => (
                <div
                  key={application.id}
                  className="border border-border rounded-xl p-4 hover:shadow-md hover:border-blue-200 transition-all cursor-pointer"
                  onClick={onNavigateToApplications}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-12 h-12 border-2 border-border">
                        <AvatarImage src={application.candidateAvatar} alt={application.candidateName} />
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {application.candidateName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold text-foreground">{application.candidateName}</h4>
                        <p className="text-muted-foreground font-medium">{application.jobTitle}</p>
                        <p className="text-sm text-muted-foreground">Applied {application.appliedDate}</p>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      {getStatusBadge(application.status)}
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-500" />
                        <span className="text-xs text-muted-foreground font-medium">{application.matchScore}% match</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full" onClick={onNavigateToApplications} size="lg">
                <Users className="h-4 w-4 mr-2" />
                View All Applications
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Hiring Pipeline */}
        <Card className="shadow-lg bg-gradient-to-br from-purple-50 to-indigo-50">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <TrendingUp className="h-6 w-6 mr-3 text-purple-600" />
              Hiring Pipeline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">Applications</span>
                  <span className="text-blue-600 font-bold text-lg">247</span>
                </div>
                <Progress value={100} className="h-3 bg-muted" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">Screening</span>
                  <span className="text-yellow-600 font-bold text-lg">89</span>
                </div>
                <Progress value={36} className="h-3 bg-muted" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">Interviews</span>
                  <span className="text-purple-600 font-bold text-lg">32</span>
                </div>
                <Progress value={13} className="h-3 bg-muted" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">Offers</span>
                  <span className="text-green-600 font-bold text-lg">8</span>
                </div>
                <Progress value={3} className="h-3 bg-muted" />
              </div>
            </div>
            <Button className="w-full" onClick={onNavigateToAnalytics} size="lg">
              <BarChart3 className="h-4 w-4 mr-2" />
              View Detailed Analytics
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Job Postings Performance */}
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center text-xl">
              <Briefcase className="h-6 w-6 mr-3 text-green-600" />
              Job Postings Performance
            </CardTitle>
            <Button variant="ghost" onClick={onNavigateToJobs} className="text-green-600 hover:text-green-700">
              Manage Jobs
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockJobPostings.map((job) => (
              <div key={job.id} className="border border-border rounded-xl p-6 hover:shadow-md hover:border-green-200 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-foreground text-lg">{job.title}</h4>
                    <p className="text-sm text-muted-foreground">Posted {new Date(job.postedDate).toLocaleDateString()}</p>
                  </div>
                  {getJobStatusBadge(job.status)}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Users className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Applications</p>
                      <p className="font-semibold text-foreground">{job.applications}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <Eye className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Views</p>
                      <p className="font-semibold text-foreground">{job.views}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Button variant="outline" className="w-full" onClick={onNavigateToJobs} size="lg">
              <FileText className="h-4 w-4 mr-2" />
              Manage All Jobs
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Interviews and Quick Actions Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Interviews */}
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center text-xl">
                <Calendar className="h-6 w-6 mr-3 text-purple-600" />
                Upcoming Interviews
              </CardTitle>
              <Button variant="ghost" onClick={onNavigateToInterviews} className="text-purple-600 hover:text-purple-700">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockUpcomingInterviews.map((interview) => (
                <div key={interview.id} className="border border-border rounded-lg p-4 hover:shadow-md hover:border-purple-200 transition-all">
                  <div className="flex items-center space-x-4 mb-3">
                    <Avatar className="w-10 h-10 border-2 border-border">
                      <AvatarImage src={interview.candidateAvatar} alt={interview.candidateName} />
                      <AvatarFallback className="bg-purple-100 text-purple-600">
                        {interview.candidateName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h5 className="font-semibold text-foreground">{interview.candidateName}</h5>
                      <p className="text-sm text-muted-foreground">{interview.jobTitle}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">{interview.date} at {interview.time}</span>
                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 capitalize">
                      {interview.type}
                    </Badge>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full" onClick={onNavigateToInterviews} size="lg">
                <Calendar className="h-4 w-4 mr-2" />
                View Calendar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Zap className="h-6 w-6 mr-3 text-yellow-600" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="h-20 flex-col space-y-2 hover:bg-blue-50 hover:border-blue-200" 
                onClick={onCreateJob}
              >
                <Plus className="h-6 w-6 text-blue-600" />
                <span className="text-sm font-medium">Post Job</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col space-y-2 hover:bg-green-50 hover:border-green-200" 
                onClick={onNavigateToApplications}
              >
                <Users className="h-6 w-6 text-green-600" />
                <span className="text-sm font-medium">Review Apps</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col space-y-2 hover:bg-purple-50 hover:border-purple-200"
              >
                <MessageSquare className="h-6 w-6 text-purple-600" />
                <span className="text-sm font-medium">Messages</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col space-y-2 hover:bg-orange-50 hover:border-orange-200" 
                onClick={onNavigateToAnalytics}
              >
                <BarChart3 className="h-6 w-6 text-orange-600" />
                <span className="text-sm font-medium">Reports</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderRecentActivityTab = () => (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold">Recent Activity</h1>
        <p className="text-green-100 text-lg mt-2">Track all hiring activities and candidate interactions.</p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">Activity Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">New applications received</p>
                  <p className="text-muted-foreground">5 candidates applied to Senior Frontend Developer</p>
                  <p className="text-sm text-muted-foreground">2 hours ago</p>
                </div>
              </div>
            </div>
            <div className="border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Interview completed</p>
                  <p className="text-muted-foreground">Interview with Sarah Chen for Senior Frontend Developer</p>
                  <p className="text-sm text-muted-foreground">4 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderQuickActionsTab = () => (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold">Quick Actions</h1>
        <p className="text-purple-100 text-lg mt-2">Streamline your hiring process with these quick actions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={onCreateJob}>
          <CardContent className="p-8 text-center">
          <div className="bg-blue-100 p-4 rounded-full w-fit mx-auto mb-4">
            <Plus className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="font-semibold text-foreground mb-2">Post New Job</h3>
          <p className="text-muted-foreground">Create a new job posting</p>
        </CardContent>
      </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={onNavigateToApplications}>
          <CardContent className="p-8 text-center">
          <div className="bg-green-100 p-4 rounded-full w-fit mx-auto mb-4">
            <Users className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="font-semibold text-foreground mb-2">Review Applications</h3>
          <p className="text-muted-foreground">12 new applications</p>
        </CardContent>
      </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={onNavigateToInterviews}>
          <CardContent className="p-8 text-center">
          <div className="bg-purple-100 p-4 rounded-full w-fit mx-auto mb-4">
            <Calendar className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="font-semibold text-foreground mb-2">Schedule Interview</h3>
          <p className="text-muted-foreground">Manage interview calendar</p>
        </CardContent>
      </Card>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold">Notifications</h1>
        <p className="text-orange-100 text-lg mt-2">Stay updated with hiring notifications and alerts.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Application Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <p className="font-medium text-blue-900">5 new applications</p>
                <p className="text-sm text-blue-700 mt-1">Senior Frontend Developer position</p>
              </div>
              <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                <p className="font-medium text-green-900">High-match candidate</p>
                <p className="text-sm text-green-700 mt-1">94% match for Product Manager role</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>System Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                <p className="font-medium text-purple-900">Interview reminder</p>
                <p className="text-sm text-purple-700 mt-1">Alex Johnson interview at 2:00 PM today</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
                <p className="font-medium text-orange-900">Job posting expiring</p>
                <p className="text-sm text-orange-700 mt-1">UX Designer position expires in 2 days</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div>
      {renderTabContent()}
    </div>
  );
}