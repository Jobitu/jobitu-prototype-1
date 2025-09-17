import { useState } from "react";
import { useNotifications } from "./NotificationContext";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Progress } from "./ui/progress";
import { Alert, AlertDescription } from "./ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { 
  ArrowLeft,
  Shield,
  Users,
  Briefcase,
  BarChart3,
  AlertTriangle,
  Settings,
  Activity,
  Search,
  Filter,
  MoreHorizontal,
  UserX,
  Ban,
  Eye,
  Edit,
  Trash2,
  Flag,
  CheckCircle,
  XCircle,
  Clock,
  Globe,
  Server,
  Database,
  Mail,
  DollarSign,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Download,
  Upload,
  Star,
  MessageCircle,
  UserCheck,
  Building,
  Calendar
} from "lucide-react";

interface EnhancedAdminPanelProps {
  onBack: () => void;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'candidate' | 'employer' | 'admin';
  status: 'active' | 'suspended' | 'banned';
  lastActive: string;
  joinDate: string;
  avatar: string;
  metrics?: {
    applications?: number;
    jobPosts?: number;
    satisfaction?: number;
  };
}

interface JobPosting {
  id: string;
  title: string;
  company: string;
  status: 'active' | 'draft' | 'expired' | 'flagged';
  applications: number;
  posted: string;
  type: 'freelance' | 'contract';
  salary: string;
}

interface FlaggedContent {
  id: string;
  type: 'user' | 'job' | 'message';
  reportedBy: string;
  reportedUser: string;
  reason: string;
  severity: 'low' | 'medium' | 'high';
  status: 'pending' | 'resolved' | 'dismissed';
  date: string;
  description: string;
}

interface SystemLog {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'critical';
  service: string;
  message: string;
  details?: any;
}

export function EnhancedAdminPanel({ onBack }: EnhancedAdminPanelProps) {
  const { showToast } = useNotifications();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data
  const platformStats = {
    totalUsers: 12847,
    activeUsers: 9234,
    jobPostings: 3421,
    applicationsThisMonth: 18642,
    revenue: 124500,
    systemHealth: 98.5
  };

  const mockUsers: User[] = [
    {
      id: 'u1',
      name: 'Alex Johnson',
      email: 'alex.johnson@email.com',
      role: 'candidate',
      status: 'active',
      lastActive: '2024-01-15T10:30:00Z',
      joinDate: '2023-06-15',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
      metrics: { applications: 24, satisfaction: 4.2 }
    },
    {
      id: 'u2',
      name: 'Sarah Chen',
      email: 'sarah@techflow.com',
      role: 'employer',
      status: 'active',
      lastActive: '2024-01-14T16:45:00Z',
      joinDate: '2023-03-10',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop',
      metrics: { jobPosts: 12, satisfaction: 4.8 }
    },
    {
      id: 'u3',
      name: 'Mike Rodriguez',
      email: 'mike.r@email.com',
      role: 'candidate',
      status: 'suspended',
      lastActive: '2024-01-10T08:20:00Z',
      joinDate: '2023-09-22',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
      metrics: { applications: 8, satisfaction: 3.1 }
    }
  ];

  const mockJobs: JobPosting[] = [
    {
      id: 'j1',
      title: 'Senior Frontend Developer',
      company: 'TechFlow Inc.',
      status: 'active',
      applications: 45,
      posted: '2024-01-10',
      type: 'contract',
      salary: '$120k - $160k'
    },
    {
      id: 'j2',
      title: 'React Dashboard Project',
      company: 'StartupX',
      status: 'flagged',
      applications: 12,
      posted: '2024-01-12',
      type: 'freelance',
      salary: '$5,000 fixed'
    },
    {
      id: 'j3',
      title: 'Product Manager',
      company: 'InnovateLab',
      status: 'active',
      applications: 38,
      posted: '2024-01-08',
      type: 'contract',
      salary: '$140k - $180k'
    }
  ];

  const mockFlags: FlaggedContent[] = [
    {
      id: 'f1',
      type: 'user',
      reportedBy: 'HR Manager',
      reportedUser: 'Mike Rodriguez',
      reason: 'Inappropriate behavior',
      severity: 'high',
      status: 'pending',
      date: '2024-01-15',
      description: 'Candidate was disrespectful during interview and made inappropriate comments.'
    },
    {
      id: 'f2',
      type: 'job',
      reportedBy: 'System',
      reportedUser: 'StartupX',
      reason: 'Misleading job description',
      severity: 'medium',
      status: 'pending',
      date: '2024-01-14',
      description: 'Job posting contains unrealistic requirements and salary information.'
    },
    {
      id: 'f3',
      type: 'message',
      reportedBy: 'Alex Johnson',
      reportedUser: 'Unknown Recruiter',
      reason: 'Spam/Scam',
      severity: 'high',
      status: 'resolved',
      date: '2024-01-13',
      description: 'Received suspicious messages requesting personal financial information.'
    }
  ];

  const mockLogs: SystemLog[] = [
    {
      id: 'l1',
      timestamp: '2024-01-15T10:30:00Z',
      level: 'info',
      service: 'Auth',
      message: 'User login successful',
      details: { userId: 'u1', ip: '192.168.1.1' }
    },
    {
      id: 'l2',
      timestamp: '2024-01-15T10:25:00Z',
      level: 'warning',
      service: 'Payment',
      message: 'Payment retry attempt',
      details: { invoiceId: 'inv_001', attempt: 2 }
    },
    {
      id: 'l3',
      timestamp: '2024-01-15T10:20:00Z',
      level: 'error',
      service: 'Email',
      message: 'Failed to send notification email',
      details: { recipient: 'user@example.com', error: 'SMTP timeout' }
    },
    {
      id: 'l4',
      timestamp: '2024-01-15T10:15:00Z',
      level: 'critical',
      service: 'Database',
      message: 'High connection count detected',
      details: { connections: 145, threshold: 100 }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'suspended': return 'bg-yellow-100 text-yellow-800';
      case 'banned': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      case 'flagged': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'dismissed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-blue-100 text-blue-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case 'info': return 'text-blue-600';
      case 'warning': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      case 'critical': return 'text-red-800 font-bold';
      default: return 'text-gray-600';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleUserAction = (userId: string, action: string) => {
    showToast({
      type: action === 'ban' ? 'warning' : 'success',
      title: `User ${action}ed`,
      message: `User has been ${action}ed successfully.`,
      duration: 3000
    });
  };

  const handleJobAction = (jobId: string, action: string) => {
    showToast({
      type: 'success',
      title: `Job ${action}`,
      message: `Job posting has been ${action} successfully.`,
      duration: 3000
    });
  };

  const handleFlagAction = (flagId: string, action: string) => {
    showToast({
      type: 'success',
      title: `Flag ${action}`,
      message: `Report has been ${action} successfully.`,
      duration: 3000
    });
  };

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50/30 to-blue-50/30">
      {/* Header */}
      <div className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" onClick={onBack} className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Login
              </Button>
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-slate-600 to-blue-600 w-8 h-8 rounded-lg flex items-center justify-center">
                  <Shield className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold">Admin Panel</h1>
                  <p className="text-sm text-muted-foreground">Platform management and oversight</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="logs">System Logs</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Platform Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Users</p>
                      <p className="text-2xl font-bold">{platformStats.totalUsers.toLocaleString()}</p>
                      <p className="text-xs text-green-600 flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        +12% this month
                      </p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Jobs</p>
                      <p className="text-2xl font-bold">{platformStats.jobPostings.toLocaleString()}</p>
                      <p className="text-xs text-green-600 flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        +8% this month
                      </p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-lg">
                      <Briefcase className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                      <p className="text-2xl font-bold">${platformStats.revenue.toLocaleString()}</p>
                      <p className="text-xs text-green-600 flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        +15% this month
                      </p>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <DollarSign className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">System Health</p>
                      <p className="text-2xl font-bold">{platformStats.systemHealth}%</p>
                      <p className="text-xs text-green-600 flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        All systems operational
                      </p>
                    </div>
                    <div className="bg-orange-100 p-3 rounded-lg">
                      <Activity className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Registrations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockUsers.slice(0, 5).map((user) => (
                      <div key={user.id} className="flex items-center gap-3 p-2 hover:bg-muted/30 rounded-lg">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.role}</p>
                        </div>
                        <Badge className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        High database connection count detected (145/100)
                      </AlertDescription>
                    </Alert>
                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription>
                        Daily backup completed successfully
                      </AlertDescription>
                    </Alert>
                    <Alert>
                      <Activity className="h-4 w-4" />
                      <AlertDescription>
                        Scheduled maintenance in 3 hours
                      </AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search users by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={filterRole} onValueChange={setFilterRole}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="candidate">Candidates</SelectItem>
                      <SelectItem value="employer">Employers</SelectItem>
                      <SelectItem value="admin">Admins</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                      <SelectItem value="banned">Banned</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Users Table */}
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead>Metrics</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-muted-foreground">{user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{user.role}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(user.status)}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatTimestamp(user.lastActive)}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {user.role === 'candidate' && user.metrics?.applications && (
                              <div>{user.metrics.applications} applications</div>
                            )}
                            {user.role === 'employer' && user.metrics?.jobPosts && (
                              <div>{user.metrics.jobPosts} job posts</div>
                            )}
                            {user.metrics?.satisfaction && (
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 text-yellow-500" />
                                {user.metrics.satisfaction}/5
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            {user.status === 'active' ? (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleUserAction(user.id, 'suspend')}
                              >
                                <UserX className="h-4 w-4" />
                              </Button>
                            ) : (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleUserAction(user.id, 'activate')}
                              >
                                <UserCheck className="h-4 w-4" />
                              </Button>
                            )}
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleUserAction(user.id, 'ban')}
                            >
                              <Ban className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Jobs Tab */}
          <TabsContent value="jobs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Job Posting Management</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Job Title</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Applications</TableHead>
                      <TableHead>Posted</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockJobs.map((job) => (
                      <TableRow key={job.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{job.title}</div>
                            <div className="text-sm text-muted-foreground">{job.salary}</div>
                          </div>
                        </TableCell>
                        <TableCell>{job.company}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{job.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(job.status)}>
                            {job.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{job.applications}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDate(job.posted)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            {job.status === 'flagged' ? (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleJobAction(job.id, 'approved')}
                              >
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              </Button>
                            ) : (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleJobAction(job.id, 'flagged')}
                              >
                                <Flag className="h-4 w-4" />
                              </Button>
                            )}
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleJobAction(job.id, 'removed')}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Flagged Content & Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockFlags.map((flag) => (
                    <div key={flag.id} className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${
                            flag.type === 'user' ? 'bg-red-100' :
                            flag.type === 'job' ? 'bg-yellow-100' : 'bg-blue-100'
                          }`}>
                            {flag.type === 'user' ? <Users className="h-4 w-4" /> :
                             flag.type === 'job' ? <Briefcase className="h-4 w-4" /> :
                             <MessageCircle className="h-4 w-4" />}
                          </div>
                          <div>
                            <h4 className="font-medium">{flag.reportedUser}</h4>
                            <p className="text-sm text-muted-foreground">
                              Reported by {flag.reportedBy} • {formatDate(flag.date)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getSeverityColor(flag.severity)}>
                            {flag.severity}
                          </Badge>
                          <Badge className={getStatusColor(flag.status)}>
                            {flag.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="font-medium text-sm mb-1">Reason: {flag.reason}</div>
                        <p className="text-sm text-muted-foreground">{flag.description}</p>
                      </div>
                      
                      {flag.status === 'pending' && (
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            onClick={() => handleFlagAction(flag.id, 'resolved')}
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Resolve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleFlagAction(flag.id, 'dismissed')}
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Dismiss
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-2" />
                            Investigate
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Logs Tab */}
          <TabsContent value="logs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Logs & Technical Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockLogs.map((log) => (
                    <div key={log.id} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/30 transition-colors">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        log.level === 'info' ? 'bg-blue-500' :
                        log.level === 'warning' ? 'bg-yellow-500' :
                        log.level === 'error' ? 'bg-red-500' : 'bg-red-800'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-sm font-medium ${getLogLevelColor(log.level)}`}>
                            {log.level.toUpperCase()}
                          </span>
                          <span className="text-sm text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">{log.service}</span>
                          <span className="text-sm text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">
                            {formatTimestamp(log.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm">{log.message}</p>
                        {log.details && (
                          <pre className="text-xs text-muted-foreground mt-1 bg-muted/50 p-2 rounded overflow-x-auto">
                            {JSON.stringify(log.details, null, 2)}
                          </pre>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* System Health */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="h-5 w-5" />
                    Server Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">CPU Usage</span>
                      <span className="text-sm font-medium">45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Memory Usage</span>
                      <span className="text-sm font-medium">67%</span>
                    </div>
                    <Progress value={67} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Disk Usage</span>
                      <span className="text-sm font-medium">23%</span>
                    </div>
                    <Progress value={23} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Database
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Connections</span>
                      <span className="text-sm font-medium">145/200</span>
                    </div>
                    <Progress value={72.5} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Query Performance</span>
                      <span className="text-sm font-medium">Good</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Last Backup</span>
                      <span className="text-sm font-medium">2 hours ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    External Services
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Email Service</span>
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Operational
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Stripe Payments</span>
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Operational
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">File Storage</span>
                      <Badge className="bg-yellow-100 text-yellow-800">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Degraded
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Platform Name</Label>
                    <Input defaultValue="Jobitu" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Maintenance Mode</Label>
                    <Select defaultValue="disabled">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="disabled">Disabled</SelectItem>
                        <SelectItem value="enabled">Enabled</SelectItem>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>User Registration</Label>
                    <Select defaultValue="open">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="invite-only">Invite Only</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button>Save Settings</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Session Timeout (minutes)</Label>
                    <Input type="number" defaultValue="30" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Password Requirements</Label>
                    <Select defaultValue="standard">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic</SelectItem>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="strict">Strict</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Two-Factor Authentication</Label>
                    <Select defaultValue="optional">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="disabled">Disabled</SelectItem>
                        <SelectItem value="optional">Optional</SelectItem>
                        <SelectItem value="required">Required</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button>Update Security</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}