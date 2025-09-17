import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Progress } from "../../ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { 
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  Users,
  Clock,
  MessageSquare,
  Target,
  BarChart3,
  PieChart,
  LineChart,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Mail,
  FileText,
  AlertTriangle,
  CheckCircle,
  Star,
  Activity,
  Filter,
  RefreshCw
} from "lucide-react";

interface ConversionStage {
  id: string;
  name: string;
  candidates: number;
  converted: number;
  conversionRate: number;
  avgTime: string;
  dropoffReasons: Array<{
    reason: string;
    percentage: number;
  }>;
}

interface RecruiterMetrics {
  id: string;
  name: string;
  avatar: string;
  candidatesHandled: number;
  avgResponseTime: string;
  successRate: number;
  feedback: number;
  rating: number;
}

interface AssessmentMetrics {
  name: string;
  type: 'technical' | 'case-study' | 'culture-fit';
  passRate: number;
  avgScore: number;
  predictiveValue: 'high' | 'medium' | 'low';
  completionRate: number;
}

const mockConversionData: ConversionStage[] = [
  {
    id: 'applied',
    name: 'Applied',
    candidates: 120,
    converted: 85,
    conversionRate: 71,
    avgTime: '2.1 days',
    dropoffReasons: [
      { reason: 'Incomplete application', percentage: 45 },
      { reason: 'No response to emails', percentage: 35 },
      { reason: 'Withdrew application', percentage: 20 }
    ]
  },
  {
    id: 'ready',
    name: 'Ready for Evaluation',
    candidates: 85,
    converted: 62,
    conversionRate: 73,
    avgTime: '1.8 days',
    dropoffReasons: [
      { reason: 'Auto-filtered by criteria', percentage: 40 },
      { reason: 'Manual screening rejection', percentage: 35 },
      { reason: 'Candidate withdrew', percentage: 25 }
    ]
  },
  {
    id: 'firstEval',
    name: 'First Evaluation',
    candidates: 62,
    converted: 35,
    conversionRate: 56,
    avgTime: '3.2 days',
    dropoffReasons: [
      { reason: 'Technical skills insufficient', percentage: 55 },
      { reason: 'Experience mismatch', percentage: 30 },
      { reason: 'Salary expectations too high', percentage: 15 }
    ]
  },
  {
    id: 'interviews',
    name: 'Interviews',
    candidates: 35,
    converted: 22,
    conversionRate: 63,
    avgTime: '5.4 days',
    dropoffReasons: [
      { reason: 'Cultural fit concerns', percentage: 40 },
      { reason: 'Technical performance', percentage: 35 },
      { reason: 'Communication issues', percentage: 25 }
    ]
  },
  {
    id: 'finalEval',
    name: 'Final Evaluation',
    candidates: 22,
    converted: 18,
    conversionRate: 82,
    avgTime: '2.8 days',
    dropoffReasons: [
      { reason: 'Reference check issues', percentage: 50 },
      { reason: 'Salary negotiation failed', percentage: 30 },
      { reason: 'Candidate accepted other offer', percentage: 20 }
    ]
  },
  {
    id: 'completed',
    name: 'Completed',
    candidates: 18,
    converted: 18,
    conversionRate: 100,
    avgTime: '1.2 days',
    dropoffReasons: []
  }
];

const mockRecruiterMetrics: RecruiterMetrics[] = [
  {
    id: '1',
    name: 'Burak Demirhan',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    candidatesHandled: 45,
    avgResponseTime: '1.8 hours',
    successRate: 22,
    feedback: 42,
    rating: 4.8
  },
  {
    id: '2',
    name: 'Arda Serim',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    candidatesHandled: 38,
    avgResponseTime: '2.3 hours',
    successRate: 19,
    feedback: 35,
    rating: 4.6
  },
  {
    id: '3',
    name: 'Mert Kaya',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    candidatesHandled: 29,
    avgResponseTime: '3.1 hours',
    successRate: 16,
    feedback: 28,
    rating: 4.3
  }
];

const mockAssessmentMetrics: AssessmentMetrics[] = [
  {
    name: 'Technical Assessment',
    type: 'technical',
    passRate: 68,
    avgScore: 76,
    predictiveValue: 'high',
    completionRate: 92
  },
  {
    name: 'Case Study Project',
    type: 'case-study',
    passRate: 45,
    avgScore: 71,
    predictiveValue: 'high',
    completionRate: 78
  },
  {
    name: 'Cultural Fit Interview',
    type: 'culture-fit',
    passRate: 78,
    avgScore: 82,
    predictiveValue: 'medium',
    completionRate: 95
  }
];

export default function ReportsInsightsTab() {
  const getConversionColor = (rate: number) => {
    if (rate >= 70) return 'text-green-600';
    if (rate >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPredictiveValueColor = (value: string) => {
    switch (value) {
      case 'high': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalCandidates = mockConversionData[0]?.candidates || 0;
  const finalCandidates = mockConversionData[mockConversionData.length - 1]?.candidates || 0;
  const overallConversion = totalCandidates > 0 ? Math.round((finalCandidates / totalCandidates) * 100) : 0;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Reports & Insights</h1>
          <p className="text-muted-foreground">Analytics and performance metrics for your hiring process</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="30d">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Overall Conversion</p>
                <p className="text-2xl font-bold">{overallConversion}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              Applied → Completed conversion rate
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Biggest Drop-off</p>
                <p className="text-2xl font-bold">44%</p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-600" />
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              At First Evaluation stage
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Feedback Coverage</p>
                <p className="text-2xl font-bold">87%</p>
              </div>
              <MessageSquare className="h-8 w-8 text-purple-600" />
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              Rejected candidates receiving feedback
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Time to Send</p>
                <p className="text-2xl font-bold">2.3d</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              Time to send feedback after rejection
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stage Conversion Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Stage Conversion Analysis
          </CardTitle>
          <CardDescription>Conversion rates and drop-off points throughout your hiring funnel</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {mockConversionData.slice(0, -1).map((stage, index) => {
              const nextStage = mockConversionData[index + 1];
              return (
                <div key={stage.id}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-32 text-sm font-medium">{stage.name}</div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    <div className="w-32 text-sm font-medium">{nextStage.name}</div>
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-2">
                        <span>{stage.candidates} → {stage.converted} candidates</span>
                        <span className={`font-medium ${getConversionColor(stage.conversionRate)}`}>
                          {stage.conversionRate}%
                        </span>
                      </div>
                      <Progress value={stage.conversionRate} className="h-2" />
                    </div>
                    <div className="text-sm text-muted-foreground w-20">
                      Avg: {stage.avgTime}
                    </div>
                  </div>
                  
                  {/* Drop-off Reasons */}
                  {stage.dropoffReasons.length > 0 && (
                    <div className="ml-36 mb-4">
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Main drop-off reasons:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        {stage.dropoffReasons.map((reason, idx) => (
                          <div key={idx} className="flex items-center justify-between p-2 rounded bg-muted/50">
                            <span className="text-xs">{reason.reason}</span>
                            <Badge variant="outline" className="text-xs">{reason.percentage}%</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recruiter Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Recruiter Performance
            </CardTitle>
            <CardDescription>Individual recruiter metrics and productivity analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockRecruiterMetrics.map((recruiter) => (
                <div key={recruiter.id} className="p-4 rounded-lg border">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={recruiter.avatar} />
                      <AvatarFallback>{recruiter.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-medium">{recruiter.name}</h3>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < Math.floor(recruiter.rating) 
                                ? 'text-yellow-500 fill-current' 
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="text-xs text-muted-foreground ml-1">{recruiter.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Candidates Handled</p>
                      <p className="font-medium">{recruiter.candidatesHandled}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Avg Response Time</p>
                      <p className="font-medium">{recruiter.avgResponseTime}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Success Rate</p>
                      <p className={`font-medium ${getConversionColor(recruiter.successRate)}`}>
                        {recruiter.successRate}%
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Feedback Sent</p>
                      <p className="font-medium">{recruiter.feedback}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Assessment Effectiveness */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Assessment Effectiveness
            </CardTitle>
            <CardDescription>Performance analysis of different assessment types</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAssessmentMetrics.map((assessment, index) => (
                <div key={index} className="p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">{assessment.name}</h3>
                    <Badge variant="outline" className={getPredictiveValueColor(assessment.predictiveValue)}>
                      {assessment.predictiveValue} predictive
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Pass Rate</span>
                        <span className="font-medium">{assessment.passRate}%</span>
                      </div>
                      <Progress value={assessment.passRate} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Completion Rate</span>
                        <span className="font-medium">{assessment.completionRate}%</span>
                      </div>
                      <Progress value={assessment.completionRate} className="h-2" />
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Average Score</span>
                      <span className="font-medium">{assessment.avgScore}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Time Metrics Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Time-in-Stage Metrics
          </CardTitle>
          <CardDescription>Average time spent in each stage with SLA performance</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Stage</TableHead>
                <TableHead>Avg Time</TableHead>
                <TableHead>SLA Target</TableHead>
                <TableHead>SLA Performance</TableHead>
                <TableHead>Overdue Count</TableHead>
                <TableHead>Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockConversionData.map((stage, index) => {
                const slaTarget = ['1d', '2d', '3d', '4d', '2d', '1d'][index] || '2d';
                const slaPerformance = Math.floor(Math.random() * 30) + 70; // Mock data
                const overdueCount = Math.floor(Math.random() * 8);
                const trend = Math.random() > 0.5 ? 'up' : 'down';
                
                return (
                  <TableRow key={stage.id}>
                    <TableCell className="font-medium">{stage.name}</TableCell>
                    <TableCell>{stage.avgTime}</TableCell>
                    <TableCell>{slaTarget}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={slaPerformance} className="h-2 w-16" />
                        <span className="text-sm">{slaPerformance}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {overdueCount > 0 ? (
                        <Badge variant="destructive">{overdueCount}</Badge>
                      ) : (
                        <Badge variant="secondary">0</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {trend === 'up' ? (
                        <ArrowUp className="h-4 w-4 text-red-600" />
                      ) : (
                        <ArrowDown className="h-4 w-4 text-green-600" />
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Export and Reporting Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Export & Reporting
          </CardTitle>
          <CardDescription>Generate custom reports and schedule automated exports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <BarChart3 className="h-6 w-6" />
              <span>Pipeline Report</span>
              <span className="text-xs text-muted-foreground">Detailed CSV export</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <PieChart className="h-6 w-6" />
              <span>Conversion Analysis</span>
              <span className="text-xs text-muted-foreground">PDF summary report</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <LineChart className="h-6 w-6" />
              <span>Performance Trends</span>
              <span className="text-xs text-muted-foreground">Historical analysis</span>
            </Button>
          </div>
          
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <h3 className="font-medium mb-2">Scheduled Reports</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Set up automated reports to be sent to your team on a regular basis
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Mail className="h-4 w-4 mr-2" />
                Weekly Summary
              </Button>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Monthly Deep Dive
              </Button>
              <Button variant="outline" size="sm">
                <AlertTriangle className="h-4 w-4 mr-2" />
                SLA Alerts
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}