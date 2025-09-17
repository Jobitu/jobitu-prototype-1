import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { 
  FileText,
  Activity,
  Users,
  Target,
  Eye,
  Copy,
  MoreHorizontal,
  PlayCircle,
  Flag,
  Award
} from "lucide-react";

interface CaseStudy {
  id: string;
  title: string;
  shortId: string;
  description: string;
  owner: string;
  type: 'Coding' | 'System' | 'Behavioral' | 'Mixed';
  status: 'Published' | 'Draft' | 'Archived';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  avgScore: number;
  attempts: number;
  lastRun: string;
  tags: string[];
}

interface Session {
  id: string;
  candidateName: string;
  candidateAvatar: string;
  score: number;
  duration: string;
}

const mockCaseStudies: CaseStudy[] = [
  {
    id: 'CS-101',
    title: 'Frontend React Challenge — Component & State',
    shortId: 'CS-101',
    description: 'Build a dynamic React component with state management and user interactions',
    owner: 'Arda Kara',
    type: 'Coding',
    status: 'Published',
    difficulty: 'Medium',
    avgScore: 81,
    attempts: 142,
    lastRun: '2025-07-28',
    tags: ['React', 'JavaScript', 'Frontend']
  },
  {
    id: 'CS-102',
    title: 'Backend API – Auth & Rate Limiting',
    shortId: 'CS-102', 
    description: 'Implement authentication system with rate limiting and security measures',
    owner: 'Sarah Chen',
    type: 'Coding',
    status: 'Published',
    difficulty: 'Hard',
    avgScore: 74,
    attempts: 89,
    lastRun: '2025-07-25',
    tags: ['Node.js', 'Authentication', 'Backend', 'Security']
  },
  {
    id: 'CS-103',
    title: 'System Design – Scalable Chat Service',
    shortId: 'CS-103',
    description: 'Design a distributed chat system handling millions of concurrent users',
    owner: 'Michael Rodriguez',
    type: 'System',
    status: 'Published',
    difficulty: 'Hard',
    avgScore: 67,
    attempts: 45,
    lastRun: '2025-07-22',
    tags: ['System Design', 'Scalability', 'Architecture']
  },
  {
    id: 'CS-104',
    title: 'Data Pipeline & Analytics',
    shortId: 'CS-104',
    description: 'Build ETL pipeline for processing large datasets',
    owner: 'Emily Davis',
    type: 'Coding',
    status: 'Draft',
    difficulty: 'Hard',
    avgScore: 0,
    attempts: 0,
    lastRun: 'Never',
    tags: ['Python', 'Data', 'ETL', 'Analytics']
  }
];

const mockSessions: Session[] = [
  {
    id: 'SES-001',
    candidateName: 'John Smith',
    candidateAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    score: 92,
    duration: '87 min'
  },
  {
    id: 'SES-002',
    candidateName: 'Sarah Johnson',
    candidateAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop',
    score: 58,
    duration: '110 min'
  },
  {
    id: 'SES-003',
    candidateName: 'Mike Chen',
    candidateAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    score: 74,
    duration: '74 min'
  },
  {
    id: 'SES-004',
    candidateName: 'Emma Wilson',
    candidateAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    score: 88,
    duration: '145 min'
  },
  {
    id: 'SES-005',
    candidateName: 'David Lee',
    candidateAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    score: 67,
    duration: '95 min'
  }
];

export function CaseStudiesOverview() {
  const kpis = [
    { label: 'Total Case Studies', value: '68', icon: FileText },
    { label: 'Active: 22 | Drafts: 11', value: '33', icon: Activity },
    { label: 'Sessions (30d)', value: '1,245', icon: Users },
    { label: 'Avg Score', value: '78%', icon: Target }
  ];

  const recentCaseStudies = mockCaseStudies.slice(0, 4);
  const recentSessions = mockSessions.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* KPI Strip */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{kpi.label}</p>
                    <p className="text-2xl font-bold">{kpi.value}</p>
                  </div>
                  <Icon className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Case Studies */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent & Pinned Case Studies</CardTitle>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">All</Badge>
                <Badge variant="outline">Published</Badge>
                <Badge variant="outline">Draft</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCaseStudies.map((study) => (
                  <div key={study.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold">{study.title}</h3>
                          <Badge variant={study.status === 'Published' ? 'default' : study.status === 'Draft' ? 'secondary' : 'outline'}>
                            {study.status}
                          </Badge>
                          <Badge variant="outline" className={
                            study.difficulty === 'Easy' ? 'border-green-200 text-green-800' :
                            study.difficulty === 'Medium' ? 'border-yellow-200 text-yellow-800' :
                            'border-red-200 text-red-800'
                          }>
                            {study.difficulty}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{study.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>Avg Score: {study.avgScore}%</span>
                          <span>Attempts: {study.attempts}</span>
                          <span>Last Run: {study.lastRun}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {study.tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 ml-4">
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity & Quick Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-2 rounded border">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={session.candidateAvatar} alt={session.candidateName} />
                        <AvatarFallback>{session.candidateName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{session.candidateName}</p>
                        <p className="text-xs text-gray-500">{session.score}% • {session.duration}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">
                      <PlayCircle className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Review Queue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-4">
                <Flag className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                <p className="font-medium">3 sessions flagged</p>
                <p className="text-sm text-gray-500">Require manual review</p>
                <Button size="sm" className="mt-2">Review Now</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Template Spotlight</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-4">
                <Award className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <p className="font-medium">Frontend React Challenge</p>
                <p className="text-sm text-gray-500">Best performing template</p>
                <p className="text-xs text-gray-400">85% avg pass rate</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}