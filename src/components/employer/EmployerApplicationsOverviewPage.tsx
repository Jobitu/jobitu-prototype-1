import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Progress } from "../ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { PipelineManagement } from "../PipelineManagement";
import { mockPipelineStats } from "../../data/pipelineMockData";
import { 
  TrendingUp,
  TrendingDown,
  Users,
  Clock,
  CheckCircle,
  Calendar,
  MapPin,
  Star,
  Eye,
  MessageSquare,
  FileText,
  Briefcase,
  Award,
  AlertCircle,
  ArrowUpRight,
  ChevronRight,
  UserCheck,
  CalendarDays,
  Mail,
  Phone,
  Filter,
  Search,
  BarChart3,
  PieChart,
  Target,
  Zap
} from "lucide-react";

interface ApplicationMetrics {
  totalApplications: number;
  newThisWeek: number;
  inReview: number;
  interviewStage: number;
  offersExtended: number;
  hired: number;
  averageTimeToHire: number;
  conversionRate: number;
  topSources: Array<{
    source: string;
    count: number;
    percentage: number;
  }>;
  stageBreakdown: Array<{
    stage: string;
    count: number;
    percentage: number;
  }>;
}

interface RecentActivity {
  id: string;
  type: 'application' | 'interview' | 'status_change' | 'offer' | 'hire';
  candidateName: string;
  candidateAvatar?: string;
  jobTitle: string;
  description: string;
  timestamp: string;
  priority?: 'high' | 'medium' | 'low';
}

interface PendingAction {
  id: string;
  type: 'review' | 'interview' | 'decision' | 'offer_response';
  candidateName: string;
  candidateAvatar?: string;
  jobTitle: string;
  description: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
}

// Mock data
const mockMetrics: ApplicationMetrics = {
  totalApplications: 247,
  newThisWeek: 23,
  inReview: 45,
  interviewStage: 18,
  offersExtended: 8,
  hired: 3,
  averageTimeToHire: 18,
  conversionRate: 12.5,
  topSources: [
    { source: 'Job Boards', count: 98, percentage: 39.7 },
    { source: 'LinkedIn', count: 75, percentage: 30.4 },
    { source: 'Referrals', count: 42, percentage: 17.0 },
    { source: 'Direct Applications', count: 32, percentage: 13.0 }
  ],
  stageBreakdown: [
    { stage: 'Applied', count: 124, percentage: 50.2 },
    { stage: 'Screening', count: 67, percentage: 27.1 },
    { stage: 'Interview', count: 35, percentage: 14.2 },
    { stage: 'Final Review', count: 15, percentage: 6.1 },
    { stage: 'Offer', count: 6, percentage: 2.4 }
  ]
};

const mockRecentActivity: RecentActivity[] = [
  {
    id: '1',
    type: 'application',
    candidateName: 'Sarah Johnson',
    candidateAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop',
    jobTitle: 'Senior Frontend Developer',
    description: 'New application received',
    timestamp: '2024-01-25T10:30:00Z',
    priority: 'high'
  },
  {
    id: '2',
    type: 'interview',
    candidateName: 'Michael Chen',
    candidateAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    jobTitle: 'Product Manager',
    description: 'Technical interview completed - Positive feedback',
    timestamp: '2024-01-25T09:15:00Z',
    priority: 'medium'
  },
  {
    id: '3',
    type: 'status_change',
    candidateName: 'Emma Wilson',
    candidateAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    jobTitle: 'UX Designer',
    description: 'Moved to final review stage',
    timestamp: '2024-01-25T08:45:00Z',
    priority: 'medium'
  },
  {
    id: '4',
    type: 'offer',
    candidateName: 'David Rodriguez',
    candidateAvatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop',
    jobTitle: 'Backend Engineer',
    description: 'Offer accepted - Starting March 1st',
    timestamp: '2024-01-24T16:20:00Z',
    priority: 'high'
  },
  {
    id: '5',
    type: 'hire',
    candidateName: 'Lisa Thompson',
    candidateAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop',
    jobTitle: 'Data Scientist',
    description: 'Successfully onboarded',
    timestamp: '2024-01-24T14:10:00Z',
    priority: 'high'
  }
];

const mockPendingActions: PendingAction[] = [
  {
    id: '1',
    type: 'review',
    candidateName: 'Alex Martinez',
    candidateAvatar: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=150&h=150&fit=crop',
    jobTitle: 'Frontend Developer',
    description: 'Application requires review',
    dueDate: '2024-01-26',
    priority: 'high'
  },
  {
    id: '2',
    type: 'interview',
    candidateName: 'Jessica Lee',
    candidateAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop',
    jobTitle: 'Product Manager',
    description: 'Schedule final interview',
    dueDate: '2024-01-27',
    priority: 'high'
  },
  {
    id: '3',
    type: 'decision',
    candidateName: 'Robert Kim',
    candidateAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    jobTitle: 'Senior Backend Engineer',
    description: 'Final hiring decision needed',
    dueDate: '2024-01-28',
    priority: 'medium'
  },
  {
    id: '4',
    type: 'offer_response',
    candidateName: 'Maria Garcia',
    candidateAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop',
    jobTitle: 'UX Designer',
    description: 'Offer response due',
    dueDate: '2024-01-29',
    priority: 'medium'
  }
];

interface EmployerApplicationsOverviewPageProps {
  onViewAllApplications?: () => void;
  onViewApplication?: (applicationId: string) => void;
  onScheduleInterview?: (applicationId: string) => void;
}

export function EmployerApplicationsOverviewPage({
  onViewAllApplications,
  onViewApplication,
  onScheduleInterview
}: EmployerApplicationsOverviewPageProps) {
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d');

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'application':
        return <FileText className="h-4 w-4 text-blue-600" />;
      case 'interview':
        return <Calendar className="h-4 w-4 text-purple-600" />;
      case 'status_change':
        return <ArrowUpRight className="h-4 w-4 text-orange-600" />;
      case 'offer':
        return <Mail className="h-4 w-4 text-green-600" />;
      case 'hire':
        return <UserCheck className="h-4 w-4 text-emerald-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'review':
        return <Eye className="h-4 w-4 text-blue-600" />;
      case 'interview':
        return <Calendar className="h-4 w-4 text-purple-600" />;
      case 'decision':
        return <Target className="h-4 w-4 text-orange-600" />;
      case 'offer_response':
        return <Mail className="h-4 w-4 text-green-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Applications Overview</h1>
            <p className="text-muted-foreground mt-1">Monitor and manage your hiring pipeline</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={onViewAllApplications}>
              <Eye className="h-4 w-4 mr-2" />
              View All Applications
            </Button>
            <Button>
              <BarChart3 className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="pipeline">Pipeline Management</TabsTrigger>
              <TabsTrigger value="reports">Reports & Insights</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6 mt-6">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Applications</p>
                    <p className="text-2xl font-semibold">{mockMetrics.totalApplications}</p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +12% from last month
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">In Review</p>
                    <p className="text-2xl font-semibold">{mockMetrics.inReview}</p>
                    <p className="text-xs text-orange-600 flex items-center mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      Avg. 3 days
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Eye className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Interview Stage</p>
                    <p className="text-2xl font-semibold">{mockMetrics.interviewStage}</p>
                    <p className="text-xs text-purple-600 flex items-center mt-1">
                      <Calendar className="h-3 w-3 mr-1" />
                      {Math.floor(mockMetrics.interviewStage * 0.6)} scheduled
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Hired This Month</p>
                    <p className="text-2xl font-semibold">{mockMetrics.hired}</p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      {mockMetrics.conversionRate}% conversion
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Award className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Pipeline Analytics */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Hiring Pipeline</CardTitle>
                    <Badge variant="outline">Last 30 days</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockMetrics.stageBreakdown.map((stage, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{stage.stage}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">{stage.count} candidates</span>
                            <span className="text-xs text-gray-500">({stage.percentage}%)</span>
                          </div>
                        </div>
                        <Progress value={stage.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Recent Activity</CardTitle>
                    <Button variant="ghost" size="sm">
                      View All
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockRecentActivity.slice(0, 5).map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className="flex-shrink-0 w-8 h-8 bg-white border rounded-full flex items-center justify-center shadow-sm">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Avatar className="w-6 h-6">
                                <AvatarImage src={activity.candidateAvatar} />
                                <AvatarFallback className="text-xs">
                                  {activity.candidateName.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm font-medium">{activity.candidateName}</span>
                              {activity.priority && (
                                <Badge className={`text-xs ${getPriorityColor(activity.priority)}`}>
                                  {activity.priority}
                                </Badge>
                              )}
                            </div>
                            <span className="text-xs text-gray-500">{formatTimestamp(activity.timestamp)}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                          <p className="text-xs text-gray-500">{activity.jobTitle}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Pending Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2 text-orange-500" />
                    Pending Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockPendingActions.map((action) => (
                      <div key={action.id} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                            {getActionIcon(action.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium">{action.candidateName}</span>
                              <Badge className={`text-xs ${getPriorityColor(action.priority)}`}>
                                {action.priority}
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-600 mb-1">{action.description}</p>
                            <p className="text-xs text-gray-500">{action.jobTitle}</p>
                            <div className="flex items-center mt-2 text-xs text-orange-600">
                              <Clock className="h-3 w-3 mr-1" />
                              Due {new Date(action.dueDate).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4" size="sm">
                    View All Actions
                  </Button>
                </CardContent>
              </Card>

              {/* Application Sources */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Application Sources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockMetrics.topSources.map((source, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${
                            index === 0 ? 'bg-blue-500' : 
                            index === 1 ? 'bg-green-500' : 
                            index === 2 ? 'bg-purple-500' : 'bg-orange-500'
                          }`}></div>
                          <span className="text-sm">{source.source}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{source.count}</div>
                          <div className="text-xs text-gray-500">{source.percentage}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Avg. Time to Hire</span>
                    <span className="text-sm font-medium">{mockMetrics.averageTimeToHire} days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Offers Extended</span>
                    <span className="text-sm font-medium">{mockMetrics.offersExtended}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Acceptance Rate</span>
                    <span className="text-sm font-medium">75%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Open Positions</span>
                    <span className="text-sm font-medium">12</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
            </TabsContent>
            
            <TabsContent value="pipeline" className="space-y-6 mt-6">
              <PipelineManagement />
            </TabsContent>
            
            <TabsContent value="reports" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Reports & Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Advanced reporting features coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}