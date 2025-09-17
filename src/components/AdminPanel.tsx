import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ScrollArea } from "./ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { 
  ArrowLeft,
  Shield,
  Users,
  Briefcase,
  MessageCircle,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  X,
  Ban,
  Eye,
  Flag,
  Search,
  Filter,
  Download,
  Settings,
  Activity,
  Globe,
  Lock,
  Brain,
  BarChart3,
  Calendar,
  Clock,
  UserCheck,
  FileText,
  Zap,
  Target,
  Wifi,
  WifiOff,
  RefreshCw,
  MapPin,
  Building,
  Database,
  Server,
  ExternalLink,
  Mail,
  Bell,
  Home,
  ChevronRight
} from "lucide-react";

interface AdminPanelProps {
  onBack: () => void;
}

interface FlaggedItem {
  id: string;
  type: 'user' | 'job' | 'message';
  reportedItem: string;
  reportedBy: string;
  reason: string;
  reportCount: number;
  status: 'pending' | 'approved' | 'banned' | 'resolved';
  createdAt: string;
  aiReview: string;
  priority: 'low' | 'medium' | 'high';
}

interface SystemMetric {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  icon: any;
}

interface AdminActivity {
  id: string;
  admin: string;
  action: string;
  target: string;
  timestamp: string;
  impact: string;
}

interface Integration {
  name: string;
  status: 'online' | 'offline' | 'warning';
  lastSync: string;
  errorCount: number;
  usage: number;
}

const mockSystemMetrics: SystemMetric[] = [
  {
    label: "Active Users Today",
    value: "4,982",
    change: "+12%",
    trend: "up",
    icon: Users
  },
  {
    label: "New Signups",
    value: "382",
    change: "+8%",
    trend: "up",
    icon: UserCheck
  },
  {
    label: "Jobs Posted Today",
    value: "149",
    change: "-3%",
    trend: "down",
    icon: Briefcase
  },
  {
    label: "Interviews Scheduled",
    value: "78",
    change: "+15%",
    trend: "up",
    icon: Calendar
  },
  {
    label: "AI Suggestions Used",
    value: "314",
    change: "+22%",
    trend: "up",
    icon: Brain
  },
  {
    label: "Match Success Rate",
    value: "87%",
    change: "+2%",
    trend: "up",
    icon: Target
  }
];

const mockFlaggedItems: FlaggedItem[] = [
  {
    id: "F001",
    type: "user",
    reportedItem: "john.doe@email.com",
    reportedBy: "sarah.wilson@company.com",
    reason: "Inappropriate profile content",
    reportCount: 3,
    status: "pending",
    createdAt: "2 hours ago",
    aiReview: "Profile contains potentially unprofessional language. Confidence: 78%",
    priority: "medium"
  },
  {
    id: "F002",
    type: "job",
    reportedItem: "Senior Developer - TechCorp",
    reportedBy: "mike.johnson@email.com",
    reason: "Fake job posting",
    reportCount: 5,
    status: "pending",
    createdAt: "4 hours ago",
    aiReview: "Company domain verification failed. Salary range unusually high. Confidence: 92%",
    priority: "high"
  },
  {
    id: "F003",
    type: "message",
    reportedItem: "Conversation #8291",
    reportedBy: "anonymous",
    reason: "Spam/harassment",
    reportCount: 1,
    status: "resolved",
    createdAt: "1 day ago",
    aiReview: "Message content classified as promotional spam. Auto-flagged.",
    priority: "low"
  }
];

const mockAdminActivities: AdminActivity[] = [
  {
    id: "A001",
    admin: "Selin K.",
    action: "Reviewed flagged user",
    target: "#8291 - No action taken",
    timestamp: "15 minutes ago",
    impact: "User status unchanged"
  },
  {
    id: "A002",
    admin: "Jack R.",
    action: "Updated AI threshold",
    target: "Junior roles - 65% → 70%",
    timestamp: "2 hours ago",
    impact: "Affected 127 matches"
  },
  {
    id: "A003",
    admin: "Burak A.",
    action: "Deleted fake accounts",
    target: "3 recruiter accounts",
    timestamp: "4 hours ago",
    impact: "Removed fraudulent postings"
  },
  {
    id: "A004",
    admin: "Maria S.",
    action: "Updated job template",
    target: "Tech roles - Added diversity clause",
    timestamp: "1 day ago",
    impact: "Applied to 45 active postings"
  }
];

const mockIntegrations: Integration[] = [
  {
    name: "LinkedIn API",
    status: "online",
    lastSync: "2 minutes ago",
    errorCount: 0,
    usage: 89
  },
  {
    name: "CV Parser Service",
    status: "warning",
    lastSync: "15 minutes ago",
    errorCount: 3,
    usage: 67
  },
  {
    name: "Email Service",
    status: "online",
    lastSync: "30 seconds ago",
    errorCount: 0,
    usage: 34
  },
  {
    name: "ATS Integration",
    status: "offline",
    lastSync: "2 hours ago",
    errorCount: 12,
    usage: 0
  },
  {
    name: "Payment Gateway",
    status: "online",
    lastSync: "1 minute ago",
    errorCount: 0,
    usage: 23
  }
];

export function AdminPanel({ onBack }: AdminPanelProps) {
  const [selectedTimeRange, setSelectedTimeRange] = useState("7d");
  const [activeTab, setActiveTab] = useState("overview");
  const [flaggedFilter, setFlaggedFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "approved": return "bg-green-100 text-green-800";
      case "banned": return "bg-red-100 text-red-800";
      case "resolved": return "bg-blue-100 text-blue-800";
      case "online": return "bg-green-100 text-green-800";
      case "offline": return "bg-red-100 text-red-800";
      case "warning": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredFlaggedItems = mockFlaggedItems.filter(item => {
    if (flaggedFilter !== "all" && item.type !== flaggedFilter) return false;
    if (searchTerm && !item.reportedItem.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50/30 to-orange-50/30">
      {/* Header */}
      <div className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" onClick={onBack} className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-red-600 to-orange-600 w-8 h-8 rounded-lg flex items-center justify-center">
                  <Shield className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold">Admin Panel</h1>
                  <p className="text-sm text-muted-foreground">System control & monitoring</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1d">Last 24h</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* System Overview KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          {mockSystemMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-lg ${
                      metric.trend === 'up' ? 'bg-green-100' : 
                      metric.trend === 'down' ? 'bg-red-100' : 'bg-gray-100'
                    }`}>
                      <Icon className={`h-4 w-4 ${
                        metric.trend === 'up' ? 'text-green-600' : 
                        metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                      }`} />
                    </div>
                    <span className={`text-xs font-medium ${
                      metric.trend === 'up' ? 'text-green-600' : 
                      metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {metric.change}
                    </span>
                  </div>
                  <div className="text-2xl font-bold mb-1">{metric.value}</div>
                  <div className="text-sm text-muted-foreground">{metric.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="flagged">Moderation</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="systems">Systems</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Platform Health */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Platform Health
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">System Uptime</span>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="text-2xl font-bold text-green-600">99.9%</div>
                      <div className="text-xs text-muted-foreground">Last 30 days</div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">AI Match Quality</span>
                        <Brain className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="text-2xl font-bold text-blue-600">87%</div>
                      <div className="text-xs text-muted-foreground">Avg satisfaction</div>
                    </div>

                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">User Trust Score</span>
                        <Shield className="h-4 w-4 text-purple-600" />
                      </div>
                      <div className="text-2xl font-bold text-purple-600">94%</div>
                      <div className="text-xs text-muted-foreground">Trust AI matching</div>
                    </div>

                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Response Time</span>
                        <Clock className="h-4 w-4 text-orange-600" />
                      </div>
                      <div className="text-2xl font-bold text-orange-600">0.8s</div>
                      <div className="text-xs text-muted-foreground">Avg API response</div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h4 className="font-medium">Critical Alerts</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">High traffic detected</p>
                          <p className="text-xs text-muted-foreground">Server load at 85% - monitoring closely</p>
                        </div>
                        <Button size="sm" variant="outline">View</Button>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <Database className="h-4 w-4 text-blue-600" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">Scheduled maintenance</p>
                          <p className="text-xs text-muted-foreground">Database optimization in 2 hours</p>
                        </div>
                        <Button size="sm" variant="outline">Reschedule</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Flag className="h-4 w-4 mr-2" />
                    Review Flagged Content ({filteredFlaggedItems.filter(item => item.status === 'pending').length})
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="h-4 w-4 mr-2" />
                    User Management
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    System Configuration
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Announcement
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Recent System Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockAdminActivities.slice(0, 5).map(activity => (
                    <div key={activity.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="text-xs">
                            {activity.admin.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">
                            {activity.admin} {activity.action}
                          </p>
                          <p className="text-xs text-muted-foreground">{activity.target}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">{activity.timestamp}</div>
                        <div className="text-xs text-blue-600">{activity.impact}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="flagged" className="space-y-6">
            {/* Moderation Controls */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Flag className="h-5 w-5" />
                  Content Moderation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search flagged content..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={flaggedFilter} onValueChange={setFlaggedFilter}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="user">Flagged Users</SelectItem>
                      <SelectItem value="job">Flagged Jobs</SelectItem>
                      <SelectItem value="message">Flagged Messages</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Tabs defaultValue="flagged-users" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="flagged-users">
                      🚩 Users ({mockFlaggedItems.filter(item => item.type === 'user').length})
                    </TabsTrigger>
                    <TabsTrigger value="flagged-jobs">
                      📝 Jobs ({mockFlaggedItems.filter(item => item.type === 'job').length})
                    </TabsTrigger>
                    <TabsTrigger value="flagged-messages">
                      📩 Messages ({mockFlaggedItems.filter(item => item.type === 'message').length})
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="flagged-users" className="space-y-4">
                    <div className="space-y-4">
                      {filteredFlaggedItems.filter(item => item.type === 'user').map(item => (
                        <Card key={item.id}>
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h3 className="font-semibold">{item.reportedItem}</h3>
                                  <Badge className={getStatusColor(item.status)}>
                                    {item.status}
                                  </Badge>
                                  <Badge className={getPriorityColor(item.priority)}>
                                    {item.priority} priority
                                  </Badge>
                                </div>
                                <div className="space-y-2 text-sm text-muted-foreground">
                                  <p><strong>Reason:</strong> {item.reason}</p>
                                  <p><strong>Reports:</strong> {item.reportCount}</p>
                                  <p><strong>Reported by:</strong> {item.reportedBy}</p>
                                  <p><strong>AI Review:</strong> {item.aiReview}</p>
                                  <p><strong>Time:</strong> {item.createdAt}</p>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">
                                  <Eye className="h-4 w-4 mr-2" />
                                  View
                                </Button>
                                <Button size="sm" variant="outline" className="text-green-600">
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Approve
                                </Button>
                                <Button size="sm" variant="outline" className="text-red-600">
                                  <Ban className="h-4 w-4 mr-2" />
                                  Ban
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="flagged-jobs" className="space-y-4">
                    <div className="space-y-4">
                      {filteredFlaggedItems.filter(item => item.type === 'job').map(item => (
                        <Card key={item.id}>
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h3 className="font-semibold">{item.reportedItem}</h3>
                                  <Badge className={getStatusColor(item.status)}>
                                    {item.status}
                                  </Badge>
                                  <Badge className={getPriorityColor(item.priority)}>
                                    {item.priority} priority
                                  </Badge>
                                </div>
                                <div className="space-y-2 text-sm text-muted-foreground">
                                  <p><strong>Reason:</strong> {item.reason}</p>
                                  <p><strong>Reports:</strong> {item.reportCount}</p>
                                  <p><strong>AI Review:</strong> {item.aiReview}</p>
                                  <p><strong>Time:</strong> {item.createdAt}</p>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Job
                                </Button>
                                <Button size="sm" variant="outline" className="text-green-600">
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Approve
                                </Button>
                                <Button size="sm" variant="outline" className="text-red-600">
                                  <X className="h-4 w-4 mr-2" />
                                  Remove
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="flagged-messages" className="space-y-4">
                    <div className="space-y-4">
                      {filteredFlaggedItems.filter(item => item.type === 'message').map(item => (
                        <Card key={item.id}>
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h3 className="font-semibold">{item.reportedItem}</h3>
                                  <Badge className={getStatusColor(item.status)}>
                                    {item.status}
                                  </Badge>
                                  <Badge className={getPriorityColor(item.priority)}>
                                    {item.priority} priority
                                  </Badge>
                                </div>
                                <div className="space-y-2 text-sm text-muted-foreground">
                                  <p><strong>Reason:</strong> {item.reason}</p>
                                  <p><strong>AI Review:</strong> {item.aiReview}</p>
                                  <p><strong>Time:</strong> {item.createdAt}</p>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Thread
                                </Button>
                                <Button size="sm" variant="outline" className="text-orange-600">
                                  <Bell className="h-4 w-4 mr-2" />
                                  Warn
                                </Button>
                                <Button size="sm" variant="outline" className="text-red-600">
                                  <X className="h-4 w-4 mr-2" />
                                  Delete
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Popular Job Categories */}
              <Card>
                <CardHeader>
                  <CardTitle>Popular Job Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { category: "Software Engineering", count: 234, percentage: 35 },
                      { category: "Data Science", count: 156, percentage: 23 },
                      { category: "Product Management", count: 98, percentage: 15 },
                      { category: "Design", count: 87, percentage: 13 },
                      { category: "Marketing", count: 65, percentage: 10 },
                      { category: "Sales", count: 27, percentage: 4 }
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{item.category}</span>
                          <span className="text-sm text-muted-foreground">{item.count} jobs</span>
                        </div>
                        <Progress value={item.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Geographic Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>User Geography</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { location: "United States", users: 2340, percentage: 42 },
                      { location: "Turkey", users: 890, percentage: 16 },
                      { location: "Germany", users: 567, percentage: 10 },
                      { location: "United Kingdom", users: 445, percentage: 8 },
                      { location: "Canada", users: 334, percentage: 6 },
                      { location: "Others", users: 998, percentage: 18 }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{item.location}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{item.users}</div>
                          <div className="text-xs text-muted-foreground">{item.percentage}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* AI Performance Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    AI Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Average Match Score</span>
                      <span className="text-lg font-bold">84%</span>
                    </div>
                    <Progress value={84} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Candidate Satisfaction</span>
                      <span className="text-lg font-bold">91%</span>
                    </div>
                    <Progress value={91} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Employer Satisfaction</span>
                      <span className="text-lg font-bold">87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Model Accuracy</span>
                      <span className="text-lg font-bold">93%</span>
                    </div>
                    <Progress value={93} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Conversion Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>Conversion Funnel</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Profile Views</span>
                      <span className="font-bold">12,453</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Applications Started</span>
                      <span className="font-bold">3,456 (28%)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Applications Completed</span>
                      <span className="font-bold">2,890 (84%)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Interviews Scheduled</span>
                      <span className="font-bold">578 (20%)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Offers Extended</span>
                      <span className="font-bold">89 (15%)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Hires</span>
                      <span className="font-bold text-green-600">67 (75%)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="systems" className="space-y-6">
            {/* Integration Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5" />
                  System Integrations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockIntegrations.map((integration, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full ${
                          integration.status === 'online' ? 'bg-green-500' :
                          integration.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                        }`} />
                        <div>
                          <h4 className="font-medium">{integration.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Last sync: {integration.lastSync}
                            {integration.errorCount > 0 && ` • ${integration.errorCount} errors`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm font-medium">{integration.usage}% usage</div>
                          <Progress value={integration.usage} className="h-1 w-16" />
                        </div>
                        <Badge className={getStatusColor(integration.status)}>
                          {integration.status === 'online' && <Wifi className="h-3 w-3 mr-1" />}
                          {integration.status === 'offline' && <WifiOff className="h-3 w-3 mr-1" />}
                          {integration.status === 'warning' && <AlertTriangle className="h-3 w-3 mr-1" />}
                          {integration.status}
                        </Badge>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* System Configuration */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>AI Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Match Threshold (Junior)</span>
                      <span className="font-medium">70%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Match Threshold (Senior)</span>
                      <span className="font-medium">85%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Auto-reject below</span>
                      <span className="font-medium">50%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Bias detection</span>
                      <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Settings className="h-4 w-4 mr-2" />
                    Update Configuration
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Regional Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">🌍 Europe</span>
                      <Badge className="bg-green-100 text-green-800">95% trust</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">🇺🇸 North America</span>
                      <Badge className="bg-green-100 text-green-800">98% trust</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">🌏 Asia-Pacific</span>
                      <Badge className="bg-yellow-100 text-yellow-800">Enhanced moderation</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">🌍 MENA</span>
                      <Badge className="bg-red-100 text-red-800">Spam surge detected</Badge>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Globe className="h-4 w-4 mr-2" />
                    Regional Controls
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Admin Activity Log
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAdminActivities.map(activity => (
                    <div key={activity.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback>
                          {activity.admin.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{activity.admin}</span>
                          <span className="text-muted-foreground">{activity.action}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">{activity.target}</div>
                        <div className="text-xs text-blue-600 mt-1">{activity.impact}</div>
                      </div>
                      <div className="text-xs text-muted-foreground">{activity.timestamp}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    Security Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Suspicious IP detected</p>
                        <p className="text-xs text-muted-foreground">Multiple failed login attempts from 192.168.1.1</p>
                      </div>
                      <Button size="sm" variant="outline">Block</Button>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Unusual recruiter pattern</p>
                        <p className="text-xs text-muted-foreground">AI flagged 3 accounts with similar posting behavior</p>
                      </div>
                      <Button size="sm" variant="outline">Review</Button>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">GDPR compliance check</p>
                        <p className="text-xs text-muted-foreground">All systems passing privacy compliance</p>
                      </div>
                      <Button size="sm" variant="outline">View Report</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Privacy & Compliance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">GDPR Compliance</span>
                      <Badge className="bg-green-100 text-green-800">✓ Compliant</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Data Retention Policy</span>
                      <Badge className="bg-green-100 text-green-800">✓ Active</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Cookie Consent</span>
                      <Badge className="bg-green-100 text-green-800">✓ Implemented</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Data Export Requests</span>
                      <span className="text-sm">3 pending</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Deletion Requests</span>
                      <span className="text-sm">1 processing</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Compliance Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}