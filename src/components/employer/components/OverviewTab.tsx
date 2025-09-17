import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Progress } from "../../ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { 
  Users,
  Clock,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Target,
  MessageSquare,
  Timer,
  Download,
  Plus,
  FileText,
  Calendar,
  Activity,
  TrendingUp,
  TrendingDown,
  Eye,
  Send,
  RefreshCw
} from "lucide-react";

interface FunnelStage {
  id: string;
  name: string;
  count: number;
  avgTime: string;
  status: 'healthy' | 'warning' | 'critical';
  delta: number;
  slaBreaches: number;
}

interface ActivityItem {
  id: string;
  type: 'submission' | 'evaluation' | 'feedback' | 'interview' | 'advancement';
  candidateName: string;
  candidateAvatar: string;
  action: string;
  timestamp: string;
  position: string;
}

const mockStages: FunnelStage[] = [
  {
    id: 'applied',
    name: 'Applied',
    count: 45,
    avgTime: '2.1 days',
    status: 'warning',
    delta: -8,
    slaBreaches: 5
  },
  {
    id: 'ready',
    name: 'Ready',
    count: 32,
    avgTime: '1.8 days',
    status: 'healthy',
    delta: +12,
    slaBreaches: 0
  },
  {
    id: 'firstEval',
    name: 'First Eval',
    count: 18,
    avgTime: '3.2 days',
    status: 'critical',
    delta: -15,
    slaBreaches: 8
  },
  {
    id: 'interviews',
    name: 'Interviews',
    count: 12,
    avgTime: '5.4 days',
    status: 'healthy',
    delta: +3,
    slaBreaches: 2
  },
  {
    id: 'finalEval',
    name: 'Final Eval',
    count: 8,
    avgTime: '2.8 days',
    status: 'warning',
    delta: 0,
    slaBreaches: 3
  },
  {
    id: 'completed',
    name: 'Completed',
    count: 5,
    avgTime: '1.5 days',
    status: 'healthy',
    delta: +2,
    slaBreaches: 0
  }
];

const mockActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'submission',
    candidateName: 'Sarah Chen',
    candidateAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop',
    action: 'Submitted case study for Senior Frontend Engineer',
    timestamp: '2 hours ago',
    position: 'Senior Frontend Engineer'
  },
  {
    id: '2',
    type: 'feedback',
    candidateName: 'Michael Rodriguez',
    candidateAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    action: 'AI feedback draft generated and ready for review',
    timestamp: '4 hours ago',
    position: 'Data Scientist'
  },
  {
    id: '3',
    type: 'evaluation',
    candidateName: 'Emily Watson',
    candidateAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    action: 'First evaluation completed - Advanced to interviews',
    timestamp: '6 hours ago',
    position: 'Product Manager'
  },
  {
    id: '4',
    type: 'interview',
    candidateName: 'James Park',
    candidateAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    action: 'Technical interview scheduled for tomorrow 2:00 PM',
    timestamp: '1 day ago',
    position: 'Backend Developer'
  },
  {
    id: '5',
    type: 'advancement',
    candidateName: 'Lisa Kim',
    candidateAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop',
    action: 'Advanced to Final Evaluation stage',
    timestamp: '1 day ago',
    position: 'UX Designer'
  }
];

interface OverviewTabProps {
  onCreateJob?: () => void;
}

export default function OverviewTab({ onCreateJob }: OverviewTabProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-800 border-green-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDeltaIcon = (delta: number) => {
    if (delta > 0) return <ArrowUp className="h-3 w-3 text-green-600" />;
    if (delta < 0) return <ArrowDown className="h-3 w-3 text-red-600" />;
    return <div className="h-3 w-3" />;
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'submission': return <FileText className="h-4 w-4 text-blue-600" />;
      case 'evaluation': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'feedback': return <MessageSquare className="h-4 w-4 text-purple-600" />;
      case 'interview': return <Calendar className="h-4 w-4 text-orange-600" />;
      case 'advancement': return <ArrowRight className="h-4 w-4 text-green-600" />;
      default: return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  // Check if there's data (for empty state)
  const hasData = mockStages.some(stage => stage.count > 0);

  if (!hasData) {
    return (
      <div className="p-6">
        {/* Empty State - Onboarding Checklist */}
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <Users className="h-16 w-16 mx-auto text-muted-foreground opacity-50" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Get Started with Applications</h2>
            <p className="text-muted-foreground mb-6">
              Follow these steps to start receiving and managing candidate applications
            </p>
            
            <div className="space-y-4 text-left max-w-md mx-auto">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">1</div>
                <div>
                  <h3 className="font-medium">Create Your First Job</h3>
                  <p className="text-sm text-muted-foreground">Set up job postings to attract candidates</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-6 h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-medium">2</div>
                <div>
                  <h3 className="font-medium">Define Your Workflow</h3>
                  <p className="text-sm text-muted-foreground">Configure evaluation stages and criteria</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-6 h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-medium">3</div>
                <div>
                  <h3 className="font-medium">Invite Applicants</h3>
                  <p className="text-sm text-muted-foreground">Share job links and start receiving applications</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex gap-3 justify-center">
              <Button onClick={onCreateJob}>
                <Plus className="h-4 w-4 mr-2" />
                Create First Job
              </Button>
              <Button variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                View Documentation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Applications Overview</h1>
          <p className="text-muted-foreground">Track candidate flow and hiring progress across all positions</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm" onClick={onCreateJob}>
            <Plus className="h-4 w-4 mr-2" />
            Create Job
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Applications</p>
                <p className="text-2xl font-bold">120</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <div className="mt-2 flex items-center text-sm">
              <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
              <span className="text-green-600">15% from last week</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold">75</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
            <div className="mt-2 flex items-center text-sm">
              <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
              <span className="text-red-600">8% from last week</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">SLA Breaches</p>
                <p className="text-2xl font-bold">18</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <div className="mt-2 flex items-center text-sm">
              <AlertTriangle className="h-3 w-3 text-red-600 mr-1" />
              <span className="text-red-600">Needs attention</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Time to Hire</p>
                <p className="text-2xl font-bold">14.2d</p>
              </div>
              <Timer className="h-8 w-8 text-green-600" />
            </div>
            <div className="mt-2 flex items-center text-sm">
              <ArrowDown className="h-3 w-3 text-green-600 mr-1" />
              <span className="text-green-600">3.1d faster</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Funnel Visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Hiring Funnel
          </CardTitle>
          <CardDescription>Candidate flow through each stage of the hiring process</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockStages.map((stage, index) => (
              <div key={stage.id}>
                <div className={`p-4 rounded-lg border-2 ${getStatusColor(stage.status)} transition-all hover:shadow-md cursor-pointer`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-center min-w-[60px]">
                        <div className="text-2xl font-bold">{stage.count}</div>
                        <div className="text-xs text-muted-foreground">candidates</div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{stage.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Avg: {stage.avgTime}</span>
                          {stage.slaBreaches > 0 && (
                            <span className="text-red-600 flex items-center gap-1">
                              <AlertTriangle className="h-3 w-3" />
                              {stage.slaBreaches} overdue
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        {getDeltaIcon(stage.delta)}
                        <span className={`text-sm font-medium ${
                          stage.delta > 0 ? 'text-green-600' : 
                          stage.delta < 0 ? 'text-red-600' : 'text-gray-600'
                        }`}>
                          {stage.delta !== 0 && (stage.delta > 0 ? '+' : '')}{stage.delta}
                        </span>
                      </div>
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  
                  {/* Conversion Rate Progress */}
                  {index < mockStages.length - 1 && (
                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Conversion to next stage</span>
                        <span>{Math.round((mockStages[index + 1].count / stage.count) * 100)}%</span>
                      </div>
                      <Progress value={(mockStages[index + 1].count / stage.count) * 100} className="h-2" />
                    </div>
                  )}
                </div>
                
                {/* Arrow between stages */}
                {index < mockStages.length - 1 && (
                  <div className="flex justify-center py-2">
                    <ArrowDown className="h-4 w-4 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and urgent items requiring attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start h-auto p-4">
              <div className="flex items-center gap-3 w-full">
                <Target className="h-5 w-5 text-blue-600" />
                <div className="flex-1 text-left">
                  <div className="font-medium">Needs First Evaluation</div>
                  <div className="text-sm text-muted-foreground">18 candidates waiting</div>
                </div>
                <Badge variant="secondary">18</Badge>
              </div>
            </Button>

            <Button variant="outline" className="w-full justify-start h-auto p-4">
              <div className="flex items-center gap-3 w-full">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <div className="flex-1 text-left">
                  <div className="font-medium">Overdue Steps</div>
                  <div className="text-sm text-muted-foreground">12 candidates past SLA</div>
                </div>
                <Badge variant="destructive">12</Badge>
              </div>
            </Button>

            <Button variant="outline" className="w-full justify-start h-auto p-4">
              <div className="flex items-center gap-3 w-full">
                <MessageSquare className="h-5 w-5 text-purple-600" />
                <div className="flex-1 text-left">
                  <div className="font-medium">Awaiting Feedback</div>
                  <div className="text-sm text-muted-foreground">8 drafts ready to send</div>
                </div>
                <Badge variant="secondary">8</Badge>
              </div>
            </Button>

            <Button variant="outline" className="w-full justify-start h-auto p-4">
              <div className="flex items-center gap-3 w-full">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div className="flex-1 text-left">
                  <div className="font-medium">Ready to Complete</div>
                  <div className="text-sm text-muted-foreground">5 candidates ready for handoff</div>
                </div>
                <Badge variant="secondary">5</Badge>
              </div>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your hiring pipeline</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="p-2 rounded-full bg-muted">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={activity.candidateAvatar} />
                        <AvatarFallback className="text-xs">
                          {activity.candidateName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-sm">{activity.candidateName}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{activity.action}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{activity.position}</span>
                      <span>•</span>
                      <span>{activity.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <Button variant="ghost" className="w-full text-sm">
                View All Activity
                <ArrowRight className="h-3 w-3 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stage Details & Time Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Stage Performance</CardTitle>
          <CardDescription>Detailed metrics for each stage of your hiring process</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockStages.slice(0, 3).map((stage) => (
              <div key={stage.id} className="p-4 rounded-lg bg-muted/50">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">{stage.name}</h3>
                  <Badge variant="outline" className={getStatusColor(stage.status)}>
                    {stage.status}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Candidates:</span>
                    <span className="font-medium">{stage.count}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Avg Time:</span>
                    <span className="font-medium">{stage.avgTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">SLA Breaches:</span>
                    <span className={`font-medium ${stage.slaBreaches > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {stage.slaBreaches}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}