import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { 
  Search,
  Filter,
  Download,
  Eye,
  Play,
  Flag,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle
} from "lucide-react";

interface Session {
  id: string;
  candidateName: string;
  candidateEmail: string;
  candidateAvatar: string;
  caseStudyTitle: string;
  caseStudyId: string;
  startTime: string;
  duration: string;
  score: number;
  status: 'Completed' | 'Failed' | 'Flagged' | 'In Review' | 'Started';
  reviewer?: string;
  reviewStatus: 'Pending' | 'Approved' | 'Rejected' | 'In Progress';
  flagged?: boolean;
  flagReason?: string;
}

const mockSessions: Session[] = [
  {
    id: 'SES-001',
    candidateName: 'John Smith',
    candidateEmail: 'john.smith@email.com',
    candidateAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    caseStudyTitle: 'Frontend React Challenge — Component & State',
    caseStudyId: 'CS-101',
    startTime: '2025-07-28 14:30',
    duration: '87 min',
    score: 92,
    status: 'Completed',
    reviewer: 'Arda Kara',
    reviewStatus: 'Approved',
    flagged: false
  },
  {
    id: 'SES-002',
    candidateName: 'Sarah Johnson',
    candidateEmail: 'sarah.j@email.com',
    candidateAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop',
    caseStudyTitle: 'Backend API – Auth & Rate Limiting',
    caseStudyId: 'CS-102',
    startTime: '2025-07-28 10:15',
    duration: '110 min',
    score: 58,
    status: 'Failed',
    reviewer: 'Sarah Chen',
    reviewStatus: 'Rejected',
    flagged: false
  },
  {
    id: 'SES-003',
    candidateName: 'Mike Chen',
    candidateEmail: 'mike.chen@email.com',
    candidateAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    caseStudyTitle: 'Frontend React Challenge — Component & State',
    caseStudyId: 'CS-101',
    startTime: '2025-07-27 16:20',
    duration: '74 min',
    score: 74,
    status: 'Flagged',
    reviewer: 'Arda Kara',
    reviewStatus: 'In Progress',
    flagged: true,
    flagReason: 'Potential plagiarism detected'
  },
  {
    id: 'SES-004',
    candidateName: 'Emma Wilson',
    candidateEmail: 'emma.w@email.com',
    candidateAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    caseStudyTitle: 'System Design – Scalable Chat Service',
    caseStudyId: 'CS-103',
    startTime: '2025-07-27 11:45',
    duration: '145 min',
    score: 88,
    status: 'Completed',
    reviewer: 'Michael Rodriguez',
    reviewStatus: 'Approved',
    flagged: false
  },
  {
    id: 'SES-005',
    candidateName: 'David Lee',
    candidateEmail: 'david.lee@email.com',
    candidateAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    caseStudyTitle: 'DevOps – CI/CD Pipeline Setup',
    caseStudyId: 'CS-105',
    startTime: '2025-07-26 14:00',
    duration: '95 min',
    score: 67,
    status: 'In Review',
    reviewer: 'Alex Johnson',
    reviewStatus: 'Pending',
    flagged: false
  }
];

const getStatusIcon = (status: string, flagged?: boolean) => {
  if (flagged) return <Flag className="h-4 w-4 text-orange-500" />;
  
  switch (status) {
    case 'Completed':
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'Failed':
      return <XCircle className="h-4 w-4 text-red-500" />;
    case 'In Review':
      return <Clock className="h-4 w-4 text-blue-500" />;
    case 'Started':
      return <Play className="h-4 w-4 text-yellow-500" />;
    default:
      return <AlertCircle className="h-4 w-4 text-gray-500" />;
  }
};

const getStatusBadge = (status: string, flagged?: boolean) => {
  if (flagged) {
    return <Badge className="bg-orange-100 text-orange-800 border-orange-200" variant="outline">Flagged</Badge>;
  }
  
  const statusConfig = {
    Completed: 'bg-green-100 text-green-800 border-green-200',
    Failed: 'bg-red-100 text-red-800 border-red-200',
    'In Review': 'bg-blue-100 text-blue-800 border-blue-200',
    Started: 'bg-yellow-100 text-yellow-800 border-yellow-200'
  };
  
  const colorClass = statusConfig[status as keyof typeof statusConfig] || 'bg-gray-100 text-gray-800 border-gray-200';
  
  return (
    <Badge className={colorClass} variant="outline">
      {status}
    </Badge>
  );
};

export function CaseStudiesSessions() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [caseStudyFilter, setCaseStudyFilter] = useState('all');

  const filteredSessions = mockSessions.filter(session => {
    const matchesSearch = session.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         session.candidateEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         session.caseStudyTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || session.status.toLowerCase() === statusFilter;
    const matchesCaseStudy = caseStudyFilter === 'all' || session.caseStudyId === caseStudyFilter;
    
    return matchesSearch && matchesStatus && matchesCaseStudy;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Session History</h2>
          <p className="text-gray-600">Review and manage candidate sessions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Sessions
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search by candidate name, email, or case study..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="flagged">Flagged</SelectItem>
              <SelectItem value="in review">In Review</SelectItem>
              <SelectItem value="started">Started</SelectItem>
            </SelectContent>
          </Select>

          <Select value={caseStudyFilter} onValueChange={setCaseStudyFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Case Study" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Studies</SelectItem>
              <SelectItem value="CS-101">CS-101</SelectItem>
              <SelectItem value="CS-102">CS-102</SelectItem>
              <SelectItem value="CS-103">CS-103</SelectItem>
              <SelectItem value="CS-105">CS-105</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>
      </div>

      {/* Sessions Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="text-left py-3 px-4">Candidate</th>
                  <th className="text-left py-3 px-4">Case Study</th>
                  <th className="text-left py-3 px-4">Started</th>
                  <th className="text-center py-3 px-4">Duration</th>
                  <th className="text-center py-3 px-4">Score</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Reviewer</th>
                  <th className="text-left py-3 px-4">Review Status</th>
                  <th className="text-right py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSessions.map((session) => (
                  <tr key={session.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={session.candidateAvatar} alt={session.candidateName} />
                          <AvatarFallback>{session.candidateName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{session.candidateName}</div>
                          <div className="text-sm text-gray-500">{session.candidateEmail}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <Badge variant="outline" className="mb-1">{session.caseStudyId}</Badge>
                        <div className="text-sm text-gray-600">{session.caseStudyTitle}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm">{session.startTime}</div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="text-sm">{session.duration}</div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className={`text-sm font-medium ${
                        session.score >= 80 ? 'text-green-600' :
                        session.score >= 60 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {session.score}%
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(session.status, session.flagged)}
                        {getStatusBadge(session.status, session.flagged)}
                      </div>
                      {session.flagged && session.flagReason && (
                        <div className="text-xs text-orange-600 mt-1">{session.flagReason}</div>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm">{session.reviewer || '-'}</div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge 
                        variant="outline"
                        className={
                          session.reviewStatus === 'Approved' ? 'border-green-200 text-green-800' :
                          session.reviewStatus === 'Rejected' ? 'border-red-200 text-red-800' :
                          session.reviewStatus === 'In Progress' ? 'border-blue-200 text-blue-800' :
                          'border-gray-200 text-gray-800'
                        }
                      >
                        {session.reviewStatus}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end space-x-1">
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Play className="h-4 w-4" />
                        </Button>
                        {session.flagged && (
                          <Button size="sm" variant="ghost">
                            <Flag className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Sessions</p>
                <p className="text-2xl font-bold">{mockSessions.length}</p>
              </div>
              <Play className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">
                  {mockSessions.filter(s => s.status === 'Completed').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Flagged</p>
                <p className="text-2xl font-bold text-orange-600">
                  {mockSessions.filter(s => s.flagged).length}
                </p>
              </div>
              <Flag className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Score</p>
                <p className="text-2xl font-bold">
                  {Math.round(mockSessions.reduce((acc, s) => acc + s.score, 0) / mockSessions.length)}%
                </p>
              </div>
              <AlertCircle className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}