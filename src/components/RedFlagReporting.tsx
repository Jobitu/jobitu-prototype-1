import { useState } from "react";
import { useNotifications } from "./NotificationContext";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { Alert, AlertDescription } from "./ui/alert";
import { ScrollArea } from "./ui/scroll-area";
import { 
  AlertTriangle,
  Flag,
  User,
  Clock,
  Eye,
  Lock,
  Shield,
  FileText,
  Users,
  MessageCircle,
  XCircle,
  AlertCircle,
  CheckCircle,
  Calendar,
  Send,
  History,
  Filter,
  Search,
  MoreHorizontal,
  ChevronDown,
  ExternalLink
} from "lucide-react";

interface RedFlagReportingProps {
  candidateId?: string;
  candidateName?: string;
  onClose?: () => void;
  viewMode?: 'report' | 'history' | 'admin';
}

interface RedFlag {
  id: string;
  candidateId: string;
  candidateName: string;
  reportedBy: string;
  reporterRole: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
  category: string;
  description: string;
  context?: string;
  jobRole?: string;
  status: 'active' | 'resolved' | 'dismissed';
  visibility: 'hiring-team' | 'managers-only' | 'admin-only';
  attachments?: string[];
}

interface FlagCategory {
  id: string;
  label: string;
  icon: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
}

const flagCategories: FlagCategory[] = [
  {
    id: 'no-show',
    label: 'No-Show',
    icon: '❗',
    description: 'Candidate did not attend scheduled interview',
    severity: 'medium'
  },
  {
    id: 'dishonesty',
    label: 'Dishonesty',
    icon: '🚩',
    description: 'Inconsistent information or false claims',
    severity: 'high'
  },
  {
    id: 'poor-communication',
    label: 'Poor Communication',
    icon: '😐',
    description: 'Unclear, unprofessional, or inappropriate communication',
    severity: 'low'
  },
  {
    id: 'skill-mismatch',
    label: 'Misaligned Skills',
    icon: '❌',
    description: 'Significant gap between claimed and actual abilities',
    severity: 'medium'
  },
  {
    id: 'disrespectful',
    label: 'Disrespectful Behavior',
    icon: '🛑',
    description: 'Inappropriate or disrespectful conduct during interview',
    severity: 'high'
  },
  {
    id: 'unprepared',
    label: 'Unprepared',
    icon: '📝',
    description: 'Clearly unprepared for interview or role requirements',
    severity: 'low'
  },
  {
    id: 'cultural-mismatch',
    label: 'Cultural Misalignment',
    icon: '🏢',
    description: 'Values or working style significantly misaligned with company culture',
    severity: 'medium'
  },
  {
    id: 'other',
    label: 'Other Concern',
    icon: '⚠️',
    description: 'Other professional concerns not covered above',
    severity: 'medium'
  }
];

const mockRedFlags: RedFlag[] = [
  {
    id: 'rf1',
    candidateId: 'c1',
    candidateName: 'John Smith',
    reportedBy: 'Sarah Wilson',
    reporterRole: 'Engineering Manager',
    timestamp: '2024-01-15T10:30:00Z',
    severity: 'medium',
    category: 'No-Show',
    description: 'Candidate did not show up for scheduled technical interview. No prior communication or rescheduling request.',
    context: 'Second interview - Technical round',
    jobRole: 'Senior Frontend Developer',
    status: 'active',
    visibility: 'hiring-team'
  },
  {
    id: 'rf2',
    candidateId: 'c2',
    candidateName: 'Mike Johnson',
    reportedBy: 'Alex Chen',
    reporterRole: 'Senior Developer',
    timestamp: '2024-01-10T14:20:00Z',
    severity: 'high',
    category: 'Dishonesty',
    description: 'Claimed 5 years of React experience but could not answer basic React questions. Inconsistent with portfolio projects.',
    context: 'Technical interview assessment',
    jobRole: 'React Developer',
    status: 'active',
    visibility: 'hiring-team'
  },
  {
    id: 'rf3',
    candidateId: 'c3',
    candidateName: 'Emma Davis',
    reportedBy: 'Lisa Thompson',
    reporterRole: 'HR Manager',
    timestamp: '2024-01-08T16:45:00Z',
    severity: 'low',
    category: 'Poor Communication',
    description: 'Difficulty articulating thoughts clearly. May need additional communication training for client-facing role.',
    context: 'Behavioral interview',
    jobRole: 'Customer Success Manager',
    status: 'resolved',
    visibility: 'managers-only'
  }
];

export function RedFlagReporting({ 
  candidateId, 
  candidateName, 
  onClose, 
  viewMode = 'report' 
}: RedFlagReportingProps) {
  const { showToast } = useNotifications();
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [severity, setSeverity] = useState<'low' | 'medium' | 'high'>('medium');
  const [description, setDescription] = useState('');
  const [context, setContext] = useState('');
  const [visibility, setVisibility] = useState<'hiring-team' | 'managers-only'>('hiring-team');
  const [notifyManager, setNotifyManager] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const handleSubmitReport = () => {
    if (!selectedCategory || !description.trim()) {
      showToast({
        type: 'error',
        title: 'Missing information',
        message: 'Please select a category and provide a description.',
        duration: 3000
      });
      return;
    }

    // Simulate submission
    showToast({
      type: 'success',
      title: 'Report submitted',
      message: 'The concern has been logged and shared with the hiring team.',
      duration: 4000
    });

    // Reset form
    setSelectedCategory('');
    setDescription('');
    setContext('');
    setSeverity('medium');
    setVisibility('hiring-team');
    setNotifyManager(false);
    setIsReportOpen(false);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'dismissed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredFlags = mockRedFlags.filter(flag => {
    if (candidateId && flag.candidateId !== candidateId) return false;
    if (searchTerm && !flag.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !flag.description.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (filterSeverity !== 'all' && flag.severity !== filterSeverity) return false;
    if (filterStatus !== 'all' && flag.status !== filterStatus) return false;
    return true;
  });

  // Report Form Modal
  const ReportModal = () => (
    <Dialog open={isReportOpen} onOpenChange={setIsReportOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Flag className="h-4 w-4" />
          Report Concern
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            Report Interview Concern
          </DialogTitle>
          <DialogDescription>
            Log professional concerns to help improve our hiring process. Information will be shared confidentially with the hiring team.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {candidateName && (
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop" />
                  <AvatarFallback>{candidateName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{candidateName}</div>
                  <div className="text-sm text-muted-foreground">Candidate ID: {candidateId}</div>
                </div>
              </div>
            </div>
          )}

          {/* Category Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Concern Category *</label>
            <div className="grid grid-cols-2 gap-3">
              {flagCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setSeverity(category.severity);
                  }}
                  className={`text-left p-3 rounded-lg border-2 transition-all ${
                    selectedCategory === category.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{category.icon}</span>
                    <span className="font-medium text-sm">{category.label}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{category.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Severity */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Severity Level</label>
            <Select value={severity} onValueChange={(value: 'low' | 'medium' | 'high') => setSeverity(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low - Minor concern</SelectItem>
                <SelectItem value="medium">Medium - Notable issue</SelectItem>
                <SelectItem value="high">High - Significant concern</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Description *</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide specific details about the concern. Focus on observable behaviors and facts."
              className="min-h-24"
              maxLength={500}
            />
            <div className="text-xs text-muted-foreground text-right">
              {description.length}/500 characters
            </div>
          </div>

          {/* Context */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Interview Context</label>
            <Input
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="e.g., Technical interview, Phone screening, Final round"
            />
          </div>

          {/* Visibility */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Visibility</label>
            <Select value={visibility} onValueChange={(value: 'hiring-team' | 'managers-only') => setVisibility(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hiring-team">Hiring Team - All interviewers can see</SelectItem>
                <SelectItem value="managers-only">Managers Only - Limited visibility</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Notifications */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="notify-manager"
              checked={notifyManager}
              onChange={(e) => setNotifyManager(e.target.checked)}
              className="rounded border-gray-300"
            />
            <label htmlFor="notify-manager" className="text-sm">
              Notify hiring manager immediately
            </label>
          </div>

          <Alert>
            <Lock className="h-4 w-4" />
            <AlertDescription>
              This information will be stored securely and only shared with authorized team members. 
              Reports are used to improve our hiring process and maintain professional standards.
            </AlertDescription>
          </Alert>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setIsReportOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmitReport} disabled={!selectedCategory || !description.trim()}>
            <Send className="h-4 w-4 mr-2" />
            Submit Report
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  // History View
  if (viewMode === 'history') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Interview Concerns</h2>
            <p className="text-muted-foreground">Review flagged candidates and hiring concerns</p>
          </div>
          <ReportModal />
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search candidates or descriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severities</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="dismissed">Dismissed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Red Flags List */}
        <div className="space-y-4">
          {filteredFlags.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Flag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold mb-2">No concerns reported</h3>
                <p className="text-muted-foreground">
                  {searchTerm || filterSeverity !== 'all' || filterStatus !== 'all' 
                    ? 'No concerns match your current filters.'
                    : 'No interview concerns have been reported yet.'
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredFlags.map((flag) => (
              <Card key={flag.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop" />
                        <AvatarFallback>{flag.candidateName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{flag.candidateName}</h3>
                        <p className="text-sm text-muted-foreground">{flag.jobRole}</p>
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

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{flagCategories.find(c => c.id === flag.category.toLowerCase().replace(' ', '-'))?.icon || '⚠️'}</span>
                      <span className="font-medium">{flag.category}</span>
                    </div>

                    <p className="text-sm">{flag.description}</p>

                    {flag.context && (
                      <div className="bg-muted/50 rounded-lg p-3">
                        <p className="text-xs text-muted-foreground mb-1">Context:</p>
                        <p className="text-sm">{flag.context}</p>
                      </div>
                    )}

                    <Separator />

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          Reported by {flag.reportedBy}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatDate(flag.timestamp)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Lock className="h-3 w-3" />
                          {flag.visibility === 'hiring-team' ? 'Hiring Team' : 'Managers Only'}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-3 w-3 mr-1" />
                          Details
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    );
  }

  // Single Report View
  return (
    <div className="space-y-4">
      <ReportModal />
      
      {candidateId && mockRedFlags.filter(f => f.candidateId === candidateId).length > 0 && (
        <Alert>
          <History className="h-4 w-4" />
          <AlertDescription>
            This candidate has {mockRedFlags.filter(f => f.candidateId === candidateId).length} previous concern(s) on record.
            <Button variant="link" className="p-0 ml-2 h-auto">
              View History
            </Button>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}