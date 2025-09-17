import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { 
  AlertCircle, 
  TrendingUp, 
  TrendingDown, 
  Briefcase, 
  Users, 
  Target, 
  Clock, 
  Building,
  Rocket,
  Edit,
  RotateCcw,
  Eye,
  MoreHorizontal,
  FileText,
  Calendar,
  Megaphone,
  ExternalLink,
  Flag,
  Sparkles
} from "lucide-react";
import { JobPostingsProps } from './types';
import { mockJobs, mockCandidates } from './mockData';

export function JobPostingsOverview({ onViewJob, onEditJob }: JobPostingsProps) {
  const kpis = [
    { label: 'Active Jobs', value: '22', icon: Briefcase, change: 8 },
    { label: 'Applications (30d)', value: '1,245', icon: Users, change: 15 },
    { label: 'Avg Match Score', value: '78%', icon: Target, change: 3 },
    { label: 'Time-to-Fill', value: '18d', icon: Clock, change: -12 },
    { label: 'Open Roles', value: '45', icon: Building, change: 5 }
  ];

  const urgentJobs = mockJobs.filter(job => 
    job.status === 'Live' && (job.applications < 10 || new Date(job.expiryDate || '') < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))
  );

  const recentApplications = mockCandidates.slice(0, 5);

  const activityFeed = [
    { type: 'published', message: 'Senior Frontend Developer job published', time: '2 hours ago', user: 'Sarah Chen' },
    { type: 'application', message: 'New application from Emma Wilson', time: '4 hours ago', user: 'System' },
    { type: 'campaign', message: 'LinkedIn campaign launched for Product Manager', time: '1 day ago', user: 'Michael Rodriguez' },
    { type: 'interview', message: 'Interview scheduled with John Smith', time: '1 day ago', user: 'Sarah Chen' }
  ];

  return (
    <div className="space-y-6">
      {/* KPI Strip */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{kpi.label}</p>
                    <p className="text-2xl font-bold">{kpi.value}</p>
                    <div className="flex items-center mt-1">
                      {kpi.change > 0 ? (
                        <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                      )}
                      <span className={`text-xs ${kpi.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {kpi.change > 0 ? '+' : ''}{kpi.change}%
                      </span>
                    </div>
                  </div>
                  <Icon className="h-6 w-6 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Urgent Jobs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-orange-500" />
                <span>Urgent Jobs</span>
                <Badge variant="secondary">{urgentJobs.length}</Badge>
              </CardTitle>
              <CardDescription>Jobs requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {urgentJobs.map((job) => (
                  <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium">{job.title}</h3>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                        <span>{job.applications} applications</span>
                        <span>Expires in 3 days</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">
                        <Rocket className="h-4 w-4 mr-1" />
                        Boost
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => onEditJob?.(job.id)}>
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm">
                        <RotateCcw className="h-4 w-4 mr-1" />
                        Repost
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recently Edited Jobs */}
          <Card>
            <CardHeader>
              <CardTitle>Recently Edited & Pinned Jobs</CardTitle>
              <CardDescription>Your most recent and important job postings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockJobs.slice(0, 4).map((job) => (
                  <div key={job.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-medium">{job.title}</h3>
                        <p className="text-sm text-gray-600">{job.location}</p>
                      </div>
                      <Badge variant={job.status === 'Live' ? 'default' : 'secondary'}>
                        {job.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex space-x-4 text-gray-500">
                        <span>Match: {job.avgMatch}%</span>
                        <span>{job.applications} apps</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button size="sm" variant="ghost" onClick={() => onViewJob?.(job.id)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {job.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Activity Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Activity Timeline</CardTitle>
              <CardDescription>Recent hiring activity across all jobs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activityFeed.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        {activity.type === 'published' && <FileText className="h-4 w-4 text-blue-600" />}
                        {activity.type === 'application' && <Users className="h-4 w-4 text-green-600" />}
                        {activity.type === 'campaign' && <Megaphone className="h-4 w-4 text-purple-600" />}
                        {activity.type === 'interview' && <Calendar className="h-4 w-4 text-orange-600" />}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-gray-500">by {activity.user}</span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Applications */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
              <CardDescription>Top 5 recent candidate applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentApplications.map((candidate) => (
                  <div key={candidate.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={candidate.avatar} alt={candidate.name} />
                        <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{candidate.name}</p>
                        <p className="text-xs text-gray-500">{candidate.matchScore}% match</p>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Review Queue */}
          <Card>
            <CardHeader>
              <CardTitle>Review Queue</CardTitle>
              <CardDescription>Candidates requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-4">
                <Flag className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                <p className="font-medium">2 flagged candidates</p>
                <p className="text-sm text-gray-500 mb-3">Require manual review</p>
                <Button size="sm">Review Now</Button>
              </div>
            </CardContent>
          </Card>

          {/* AI Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-yellow-500" />
                <span>AI Suggestions</span>
              </CardTitle>
              <CardDescription>Optimize your job postings with AI</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium mb-1">Rewrite job description</p>
                  <p className="text-xs text-gray-600 mb-2">Increase applications by 25%</p>
                  <Button size="sm" variant="outline">Apply Suggestion</Button>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm font-medium mb-1">Optimize salary range</p>
                  <p className="text-xs text-gray-600 mb-2">Better match market rates</p>
                  <Button size="sm" variant="outline">View Details</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}