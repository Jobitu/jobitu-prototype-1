import React from "react";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Checkbox } from "../ui/checkbox";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { 
  Search,
  Filter,
  Plus,
  Reply,
  Forward,
  Archive,
  Trash2,
  Star,
  StarOff,
  Flag,
  MoreHorizontal,
  Send,
  Paperclip,
  Calendar,
  Clock,
  Users,
  Mail,
  MessageSquare,
  Phone,
  Video,
  FileText,
  Download,
  ExternalLink,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
  EyeOff,
  Bookmark,
  BookmarkCheck,
  User,
  Building,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  LinkIcon,
  Edit,
  Share2,
  Copy
} from "lucide-react";

// Types and Interfaces
interface Message {
  id: string;
  type: 'application' | 'interview' | 'offer' | 'system' | 'candidate' | 'recruiter';
  subject: string;
  from: {
    name: string;
    email: string;
    avatar?: string;
    role: string;
    company?: string;
  };
  to: string[];
  content: string;
  timestamp: string;
  isRead: boolean;
  isStarred: boolean;
  isFlagged: boolean;
  isArchived: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  labels: string[];
  attachments?: {
    name: string;
    size: string;
    type: string;
    url: string;
  }[];
  relatedJob?: {
    id: string;
    title: string;
    department: string;
  };
  relatedCandidate?: {
    id: string;
    name: string;
    avatar?: string;
    currentStage: string;
  };
  actions?: {
    type: string;
    label: string;
    variant?: string;
  }[];
}

interface CandidateMessage {
  id: string;
  candidateId: string;
  candidateName: string;
  candidateAvatar?: string;
  candidateEmail: string;
  jobId: string;
  jobTitle: string;
  stage: string;
  lastMessage: string;
  timestamp: string;
  isUnread: boolean;
  priority: 'low' | 'medium' | 'high';
  matchScore: number;
}

interface Interview {
  id: string;
  candidateName: string;
  candidateAvatar?: string;
  jobTitle: string;
  interviewType: 'phone' | 'video' | 'onsite' | 'technical';
  scheduledTime: string;
  duration: number;
  location?: string;
  meetingLink?: string;
  status: 'scheduled' | 'confirmed' | 'rescheduled' | 'completed' | 'cancelled';
  interviewer: string;
  notes?: string;
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  department: string;
  isOnline: boolean;
  lastActive: string;
}

// Mock Data
const mockMessages: Message[] = [
  {
    id: 'MSG-001',
    type: 'application',
    subject: 'New Application for Senior Frontend Developer',
    from: {
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop',
      role: 'Candidate'
    },
    to: ['hiring@company.com'],
    content: 'Dear Hiring Manager, I am excited to apply for the Senior Frontend Developer position...',
    timestamp: '2025-08-14T10:30:00Z',
    isRead: false,
    isStarred: true,
    isFlagged: false,
    isArchived: false,
    priority: 'high',
    labels: ['New Application', 'Frontend', 'Senior'],
    relatedJob: {
      id: 'JOB-001',
      title: 'Senior Frontend Developer',
      department: 'Engineering'
    },
    relatedCandidate: {
      id: 'CAND-001',
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop',
      currentStage: 'Applied'
    },
    actions: [
      { type: 'review', label: 'Review Application', variant: 'default' },
      { type: 'schedule', label: 'Schedule Interview', variant: 'outline' }
    ]
  },
  {
    id: 'MSG-002',
    type: 'interview',
    subject: 'Interview Confirmation - Backend Engineer Position',
    from: {
      name: 'Michael Chen',
      email: 'michael.chen@example.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
      role: 'Candidate'
    },
    to: ['hiring@company.com'],
    content: 'Thank you for scheduling the interview. I confirm my availability for Friday, August 16th at 2:00 PM...',
    timestamp: '2025-08-14T09:15:00Z',
    isRead: true,
    isStarred: false,
    isFlagged: false,
    isArchived: false,
    priority: 'medium',
    labels: ['Interview', 'Confirmed', 'Backend'],
    relatedJob: {
      id: 'JOB-002',
      title: 'Backend Engineer',
      department: 'Engineering'
    },
    relatedCandidate: {
      id: 'CAND-002',
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
      currentStage: 'Interview Scheduled'
    },
    actions: [
      { type: 'confirm', label: 'Confirm Details', variant: 'default' },
      { type: 'reschedule', label: 'Reschedule', variant: 'outline' }
    ]
  },
  {
    id: 'MSG-003',
    type: 'system',
    subject: 'Weekly Hiring Report - 127 New Applications',
    from: {
      name: 'Jobitu System',
      email: 'system@jobitu.com',
      role: 'System'
    },
    to: ['hiring@company.com'],
    content: 'Your weekly hiring summary: 127 new applications, 23 interviews scheduled, 8 offers extended...',
    timestamp: '2025-08-14T08:00:00Z',
    isRead: true,
    isStarred: false,
    isFlagged: false,
    isArchived: false,
    priority: 'low',
    labels: ['System', 'Report', 'Weekly'],
    actions: [
      { type: 'view', label: 'View Full Report', variant: 'outline' }
    ]
  },
  {
    id: 'MSG-004',
    type: 'offer',
    subject: 'Offer Acceptance - Product Manager Position',
    from: {
      name: 'Emma Wilson',
      email: 'emma.wilson@example.com',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
      role: 'Candidate'
    },
    to: ['hiring@company.com'],
    content: 'I am delighted to accept the offer for the Product Manager position. I look forward to joining the team...',
    timestamp: '2025-08-13T16:45:00Z',
    isRead: false,
    isStarred: true,
    isFlagged: false,
    isArchived: false,
    priority: 'urgent',
    labels: ['Offer', 'Accepted', 'Product'],
    relatedJob: {
      id: 'JOB-003',
      title: 'Product Manager',
      department: 'Product'
    },
    relatedCandidate: {
      id: 'CAND-003',
      name: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
      currentStage: 'Offer Accepted'
    },
    actions: [
      { type: 'onboard', label: 'Start Onboarding', variant: 'default' },
      { type: 'welcome', label: 'Send Welcome Pack', variant: 'outline' }
    ]
  }
];

const mockCandidateMessages: CandidateMessage[] = [
  {
    id: 'CM-001',
    candidateId: 'CAND-001',
    candidateName: 'Sarah Johnson',
    candidateAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop',
    candidateEmail: 'sarah.johnson@example.com',
    jobId: 'JOB-001',
    jobTitle: 'Senior Frontend Developer',
    stage: 'Applied',
    lastMessage: 'Thank you for considering my application...',
    timestamp: '2025-08-14T10:30:00Z',
    isUnread: true,
    priority: 'high',
    matchScore: 95
  },
  {
    id: 'CM-002',
    candidateId: 'CAND-002',
    candidateName: 'Michael Chen',
    candidateAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    candidateEmail: 'michael.chen@example.com',
    jobId: 'JOB-002',
    jobTitle: 'Backend Engineer',
    stage: 'Interview Scheduled',
    lastMessage: 'I confirm my availability for the interview...',
    timestamp: '2025-08-14T09:15:00Z',
    isUnread: false,
    priority: 'medium',
    matchScore: 88
  },
  {
    id: 'CM-003',
    candidateId: 'CAND-003',
    candidateName: 'David Rodriguez',
    candidateAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    candidateEmail: 'david.rodriguez@example.com',
    jobId: 'JOB-001',
    jobTitle: 'Senior Frontend Developer',
    stage: 'Phone Screen',
    lastMessage: 'Looking forward to our call tomorrow...',
    timestamp: '2025-08-13T14:20:00Z',
    isUnread: true,
    priority: 'medium',
    matchScore: 92
  }
];

const mockInterviews: Interview[] = [
  {
    id: 'INT-001',
    candidateName: 'Sarah Johnson',
    candidateAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop',
    jobTitle: 'Senior Frontend Developer',
    interviewType: 'video',
    scheduledTime: '2025-08-16T14:00:00Z',
    duration: 60,
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    status: 'scheduled',
    interviewer: 'Alex Thompson',
    notes: 'Technical interview focusing on React and system design'
  },
  {
    id: 'INT-002',
    candidateName: 'Michael Chen',
    candidateAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    jobTitle: 'Backend Engineer',
    interviewType: 'onsite',
    scheduledTime: '2025-08-15T10:00:00Z',
    duration: 90,
    location: 'Conference Room A, 2nd Floor',
    status: 'confirmed',
    interviewer: 'Lisa Wang',
    notes: 'System design and coding interview'
  }
];

const mockTeamMembers: TeamMember[] = [
  {
    id: 'TM-001',
    name: 'Alex Thompson',
    email: 'alex.thompson@company.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    role: 'Senior Engineering Manager',
    department: 'Engineering',
    isOnline: true,
    lastActive: 'Online now'
  },
  {
    id: 'TM-002',
    name: 'Lisa Wang',
    email: 'lisa.wang@company.com',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop',
    role: 'VP of Engineering',
    department: 'Engineering',
    isOnline: false,
    lastActive: '2 hours ago'
  },
  {
    id: 'TM-003',
    name: 'Jennifer Martinez',
    email: 'jennifer.martinez@company.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop',
    role: 'Product Manager',
    department: 'Product',
    isOnline: true,
    lastActive: 'Online now'
  }
];

interface EmployerInboxPageProps {
  activeTab?: 'messages' | 'job-offers' | 'archived' | 'system-notifications';
}

export function EmployerInboxPage({ activeTab = 'messages' }: EmployerInboxPageProps) {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isComposing, setIsComposing] = useState(false);

  // Base messages by active sub-tab
  const baseMessages = (() => {
    switch (activeTab) {
      case 'job-offers':
        return mockMessages.filter(m => m.type === 'offer');
      case 'archived':
        return mockMessages.filter(m => m.isArchived);
      case 'system-notifications':
        return mockMessages.filter(m => m.type === 'system');
      case 'messages':
      default:
        return mockMessages.filter(m => !m.isArchived);
    }
  })();

  const filteredMessages = baseMessages.filter(message => {
    const matchesSearch = message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         message.from.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = selectedFilter === "all" || 
                         (selectedFilter === "unread" && !message.isRead) ||
                         (selectedFilter === "starred" && message.isStarred) ||
                         (selectedFilter === "applications" && message.type === "application") ||
                         (selectedFilter === "interviews" && message.type === "interview") ||
                          (selectedFilter === "offers" && message.type === "offer");
    
    return matchesSearch && matchesFilter;
  });

  // Helper: icon by message type
  const getMessageIcon = (type: Message['type']) => {
    switch (type) {
      case 'application':
        return <FileText className="h-4 w-4 text-blue-600" />;
      case 'interview':
        return <Calendar className="h-4 w-4 text-green-600" />;
      case 'offer':
        return <CheckCircle className="h-4 w-4 text-emerald-600" />;
      case 'system':
        return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      case 'candidate':
      case 'recruiter':
      default:
        return <Mail className="h-4 w-4 text-gray-600" />;
    }
  };

  const MessageList = () => (
    <div className="space-y-2">
      {filteredMessages.map((message) => (
        <div
          key={message.id}
          onClick={() => setSelectedMessage(message)}
          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
            selectedMessage?.id === message.id ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
          } ${!message.isRead ? 'border-l-4 border-l-blue-500' : ''}`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3 flex-1">
              <Avatar className="h-10 w-10">
                <AvatarImage src={message.from.avatar} alt={message.from.name} />
                <AvatarFallback>{message.from.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <p className={`font-medium ${!message.isRead ? 'font-semibold' : ''}`}>
                    {message.from.name}
                  </p>
                  <Badge variant="outline" className="text-xs">
                    {message.type}
                  </Badge>
                  {message.priority === 'urgent' && (
                    <Badge variant="destructive" className="text-xs">Urgent</Badge>
                  )}
                  {message.priority === 'high' && (
                    <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-700">High</Badge>
                  )}
                </div>
                <p className={`text-sm ${!message.isRead ? 'font-medium' : 'text-gray-600'} truncate`}>
                  {message.subject}
                </p>
                <p className="text-xs text-gray-500 mt-1 truncate">
                  {message.content.substring(0, 80)}...
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-xs text-gray-400">
                    {new Date(message.timestamp).toLocaleDateString()} at {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  {message.relatedJob && (
                    <Badge variant="outline" className="text-xs">
                      {message.relatedJob.title}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-1 flex-shrink-0">
              {message.isStarred && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
              {message.isFlagged && <Flag className="h-4 w-4 text-red-500" />}
              {!message.isRead && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const MessageDetail = ({ message }: { message: Message }) => (
    <div className="space-y-6">
      {/* Message Header */}
      <div className="border-b pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={message.from.avatar} alt={message.from.name} />
              <AvatarFallback>{message.from.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{message.from.name}</h3>
              <p className="text-sm text-gray-600">{message.from.email}</p>
              <p className="text-xs text-gray-500">{message.from.role}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Star className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Flag className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Archive className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="mt-3">
          <h2 className="text-xl font-semibold">{message.subject}</h2>
          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
            <span>{new Date(message.timestamp).toLocaleDateString()} at {new Date(message.timestamp).toLocaleTimeString()}</span>
            <span>To: {message.to.join(', ')}</span>
          </div>
        </div>
      </div>

      {/* Message Content */}
      <div className="prose max-w-none">
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>

      {/* Related Information */}
      {(message.relatedJob || message.relatedCandidate) && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-3">Related Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {message.relatedJob && (
              <div className="space-y-2">
                <h5 className="text-sm font-medium">Job Position</h5>
                <div className="flex items-center space-x-2">
                  <Briefcase className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{message.relatedJob.title}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Building className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{message.relatedJob.department}</span>
                </div>
              </div>
            )}
            {message.relatedCandidate && (
              <div className="space-y-2">
                <h5 className="text-sm font-medium">Candidate</h5>
                <div className="flex items-center space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={message.relatedCandidate.avatar} alt={message.relatedCandidate.name} />
                    <AvatarFallback className="text-xs">{message.relatedCandidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{message.relatedCandidate.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Current Stage: {message.relatedCandidate.currentStage}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Attachments */}
      {message.attachments && message.attachments.length > 0 && (
        <div className="border-t pt-4">
          <h4 className="font-medium mb-3">Attachments</h4>
          <div className="space-y-2">
            {message.attachments.map((attachment, index) => (
              <div key={index} className="flex items-center space-x-3 p-2 border rounded-lg">
                <FileText className="h-5 w-5 text-gray-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{attachment.name}</p>
                  <p className="text-xs text-gray-500">{attachment.size} • {attachment.type}</p>
                </div>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {message.actions && message.actions.length > 0 && (
        <div className="border-t pt-4">
          <div className="flex items-center space-x-2">
            {message.actions.map((action, index) => (
              <Button key={index} variant={action.variant as any || 'default'} size="sm">
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Reply Actions */}
      <div className="border-t pt-4">
        <div className="flex items-center space-x-2">
          <Button>
            <Reply className="h-4 w-4 mr-2" />
            Reply
          </Button>
          <Button variant="outline">
            <Forward className="h-4 w-4 mr-2" />
            Forward
          </Button>
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Interview
          </Button>
        </div>
      </div>
    </div>
  );

  const CandidateChats = () => (
    <div className="space-y-4">
      {mockCandidateMessages.map((chat) => (
        <div key={chat.id} className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
          <div className="flex items-start space-x-3">
            <div className="relative">
              <Avatar className="h-10 w-10">
                <AvatarImage src={chat.candidateAvatar} alt={chat.candidateName} />
                <AvatarFallback>{chat.candidateName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              {chat.isUnread && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <h4 className="font-medium">{chat.candidateName}</h4>
                  <Badge variant="outline" className="text-xs">
                    {chat.matchScore}% match
                  </Badge>
                  {chat.priority === 'high' && (
                    <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-700">
                      High Priority
                    </Badge>
                  )}
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(chat.timestamp).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-gray-600">{chat.jobTitle}</p>
              <p className="text-sm text-gray-800 mt-1">{chat.lastMessage}</p>
              <div className="flex items-center space-x-2 mt-2">
                <Badge variant="outline" className="text-xs">
                  {chat.stage}
                </Badge>
                <Button variant="ghost" size="sm">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Reply
                </Button>
                <Button variant="ghost" size="sm">
                  <Calendar className="h-4 w-4 mr-1" />
                  Schedule
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const InterviewsTab = () => (
    <div className="space-y-4">
      {mockInterviews.map((interview) => (
        <div key={interview.id} className="border rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={interview.candidateAvatar} alt={interview.candidateName} />
                <AvatarFallback>{interview.candidateName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-medium">{interview.candidateName}</h4>
                <p className="text-sm text-gray-600">{interview.jobTitle}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(interview.scheduledTime).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{new Date(interview.scheduledTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {interview.interviewType === 'video' && <Video className="h-4 w-4" />}
                    {interview.interviewType === 'phone' && <Phone className="h-4 w-4" />}
                    {interview.interviewType === 'onsite' && <Building className="h-4 w-4" />}
                    {interview.interviewType === 'technical' && <FileText className="h-4 w-4" />}
                    <span className="capitalize">{interview.interviewType}</span>
                  </div>
                </div>
                {interview.notes && (
                  <p className="text-sm text-gray-600 mt-2">{interview.notes}</p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge 
                variant={interview.status === 'confirmed' ? 'default' : 'secondary'}
                className="text-xs"
              >
                {interview.status}
              </Badge>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center space-x-2 mt-4">
            <Button size="sm">
              {interview.interviewType === 'video' ? 'Join Meeting' : 'View Details'}
            </Button>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-1" />
              Reschedule
            </Button>
            {interview.meetingLink && (
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-1" />
                Meeting Link
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const TeamTab = () => (
    <div className="space-y-4">
      {mockTeamMembers.map((member) => (
        <div key={member.id} className="border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                  member.isOnline ? 'bg-green-500' : 'bg-gray-400'
                }`} />
              </div>
              <div>
                <h4 className="font-medium">{member.name}</h4>
                <p className="text-sm text-gray-600">{member.role}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    {member.department}
                  </Badge>
                  <span className="text-xs text-gray-500">{member.lastActive}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <MessageSquare className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Mail className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex h-full flex-col lg:flex-row">
      {/* Left panel: search + tabs + list */}
      <div className="w-full lg:w-1/3 border-r border-border bg-card flex flex-col">
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-2 mb-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="sm" onClick={() => setIsComposing(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Compose
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => setSelectedFilter('all')}>
                  All
                  <Badge variant="secondary" className="ml-auto">{mockMessages.length}</Badge>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedFilter('unread')}>
                  Unread
                  <Badge variant="secondary" className="ml-auto">{mockMessages.filter(m => !m.isRead).length}</Badge>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedFilter('starred')}>
                  Starred
                  <Badge variant="secondary" className="ml-auto">{mockMessages.filter(m => m.isStarred).length}</Badge>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setSelectedFilter('applications')}>
                  Applications
                  <Badge variant="secondary" className="ml-auto">{mockMessages.filter(m => m.type === 'application').length}</Badge>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedFilter('interviews')}>
                  Interviews
                  <Badge variant="secondary" className="ml-auto">{mockMessages.filter(m => m.type === 'interview').length}</Badge>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedFilter('offers')}>
                  Offers
                  <Badge variant="secondary" className="ml-auto">{mockMessages.filter(m => m.type === 'offer').length}</Badge>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Filters moved to dropdown menu; chip row removed for compact UI */}
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto">
          {filteredMessages.length === 0 ? (
            <div className="flex-1 flex items-center justify-center p-8 text-muted-foreground">
              <div className="text-center">
                <Mail className="h-10 w-10 mx-auto mb-3 opacity-60" />
                <div className="text-sm">No messages found</div>
              </div>
            </div>
          ) : (
            <div className="p-2 space-y-2">
              {filteredMessages.map((message) => (
                <div
                  key={message.id}
                  onClick={() => setSelectedMessage(message)}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedMessage?.id === message.id ? 'bg-accent border-accent-foreground/20' : 'hover:bg-muted/50 border-border'
                  } ${!message.isRead ? 'ring-1 ring-blue-500/30' : ''}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1 min-w-0">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={message.from.avatar} alt={message.from.name} />
                        <AvatarFallback>{message.from.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 min-w-0">
                            <p className={`text-sm truncate ${!message.isRead ? 'font-semibold' : ''}`}>{message.from.name}</p>
                            <Badge variant="outline" className="text-[10px]">
                              {message.type}
                            </Badge>
                            {message.relatedJob && (
                              <Badge variant="secondary" className="text-[10px]">
                                {message.relatedJob.title}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                            {getMessageIcon(message.type)}
                            <span className="text-[10px] text-muted-foreground">
                              {new Date(message.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="text-sm truncate ${!message.isRead ? 'font-medium' : 'text-muted-foreground'}">
                          {message.subject}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          {message.content.substring(0, 100)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                      {message.isStarred && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                      {message.isFlagged && <Flag className="h-4 w-4 text-red-500" />}
                      {!message.isRead && <div className="w-2 h-2 bg-blue-600 rounded-full" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right panel: detail */}
      <div className="flex-1 bg-background flex flex-col min-h-[300px]">
        {selectedMessage ? (
          <div className="flex-1 overflow-y-auto p-4 lg:p-6">
            <div className="flex items-center justify-between mb-4">
              <Button variant="ghost" size="sm" onClick={() => setSelectedMessage(null)} className="lg:hidden">
                ← Back
              </Button>
              <div className="hidden lg:flex items-center gap-2 ml-auto">
                <Button variant="ghost" size="sm"><Star className="h-4 w-4" /></Button>
                <Button variant="ghost" size="sm"><Flag className="h-4 w-4" /></Button>
                <Button variant="ghost" size="sm"><Archive className="h-4 w-4" /></Button>
                <Button variant="ghost" size="sm"><Trash2 className="h-4 w-4" /></Button>
              </div>
            </div>
            <Card>
              <CardContent className="p-4 lg:p-6">
                <MessageDetail message={selectedMessage} />
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-8 text-muted-foreground">
            <div className="text-center">
              <MessageSquare className="h-10 w-10 mx-auto mb-3 opacity-60" />
              <div className="text-sm">Select a message to view details</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}