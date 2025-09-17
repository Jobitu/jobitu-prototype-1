import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useTabContent } from "../TabContentProvider";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Checkbox } from "../ui/checkbox";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { 
  Building,
  Globe,
  MapPin,
  Users,
  Edit,
  Eye,
  Save,
  X,
  Plus,
  ExternalLink,
  Upload,
  Camera,
  Twitter,
  Linkedin,
  Facebook,
  Instagram,
  Star,
  Heart,
  Award,
  Coffee,
  Car,
  Plane,
  Shield,
  Zap,
  Home,
  Briefcase,
  Clock,
  TrendingUp,
  TrendingDown,
  Share2,
  FileText,
  Search,
  Filter,
  MoreHorizontal,
  Copy,
  Download,
  Mail,
  Phone,
  Calendar,
  MessageSquare,
  Trash2,
  Settings,
  BarChart3,
  LineChart,
  PieChart,
  ChevronDown,
  ChevronRight,
  Target,
  UserPlus,
  UserCheck,
  Verified,
  Link,
  Image,
  Video,
  Palette,
  Monitor,
  Smartphone,
  Bell,
  Lock,
  MousePointer,
  RotateCcw
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from "recharts";

// Enhanced Company Data Interface
interface CompanyData {
  name: string;
  logo: string;
  industry: string;
  location: string;
  size: string;
  website: string;
  description: string;
  tagline: string;
  founded: string;
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    facebook?: string;
    instagram?: string;
  };
  perks: string[];
  culture: string[];
  gallery: string[];
  heroImage: string;
  stats: {
    followers: number;
    reviews: number;
    rating: number;
    pageViews: number;
    jobViews: number;
    applyRate: number;
    openPositions: number;
    avgCandidateRating: number;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  visibility: {
    isPublic: boolean;
    isVerified: boolean;
    requiresApproval: boolean;
  };
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  lastActive: string;
  assignedJobs: number;
  status: 'active' | 'pending' | 'inactive';
}

interface JobListing {
  id: string;
  title: string;
  location: string;
  type: string;
  posted: string;
  status: 'active' | 'draft' | 'closed';
  applicants: number;
  views: number;
  applyRate: number;
  sources: Array<{ name: string; count: number }>;
}

// Mock data with enhanced structure
const mockCompanyData: CompanyData = {
  name: 'TechFlow Inc.',
  logo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=150&h=150&fit=crop',
  industry: 'Technology',
  location: 'San Francisco, CA',
  size: '51-200 employees',
  website: 'https://techflow.com',
  description: 'TechFlow Inc. is a leading technology company focused on building innovative solutions for modern businesses. We specialize in web development, mobile applications, and cloud infrastructure.',
  tagline: 'Building the future of technology',
  founded: '2018',
  heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=600&fit=crop',
  socialLinks: {
    twitter: 'https://twitter.com/techflow',
    linkedin: 'https://linkedin.com/company/techflow',
    facebook: 'https://facebook.com/techflow'
  },
  perks: ['Remote Work', 'Health Insurance', 'Dental Insurance', 'Vision Insurance', 'Unlimited PTO', 'Stock Options', 'Learning Budget', 'Gym Membership', 'Free Lunch', 'Flexible Hours'],
  culture: ['Innovation', 'Collaboration', 'Work-Life Balance', 'Continuous Learning', 'Diversity & Inclusion'],
  gallery: [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop'
  ],
  stats: {
    followers: 1250,
    reviews: 87,
    rating: 4.6,
    pageViews: 8750,
    jobViews: 12400,
    applyRate: 8.5,
    openPositions: 12,
    avgCandidateRating: 4.2
  },
  seo: {
    metaTitle: 'TechFlow Inc. - Careers & Jobs',
    metaDescription: 'Join TechFlow Inc. and help build the future of technology. We offer competitive salaries, great benefits, and a collaborative work environment.',
    keywords: ['technology', 'software development', 'careers', 'jobs', 'startup']
  },
  visibility: {
    isPublic: true,
    isVerified: true,
    requiresApproval: false
  }
};

const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@techflow.com',
    role: 'HR Manager',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop',
    lastActive: '2 hours ago',
    assignedJobs: 5,
    status: 'active'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael@techflow.com',
    role: 'Engineering Manager',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    lastActive: '1 day ago',
    assignedJobs: 3,
    status: 'active'
  },
  {
    id: '3',
    name: 'Emily Davis',
    email: 'emily@techflow.com',
    role: 'Interviewer',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    lastActive: '3 hours ago',
    assignedJobs: 2,
    status: 'active'
  }
];

const mockJobListings: JobListing[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    location: 'San Francisco, CA',
    type: 'Full-time',
    posted: '2 days ago',
    status: 'active',
    applicants: 47,
    views: 890,
    applyRate: 5.3,
    sources: [
      { name: 'LinkedIn', count: 23 },
      { name: 'Company Site', count: 15 },
      { name: 'Indeed', count: 9 }
    ]
  },
  {
    id: '2',
    title: 'Product Manager',
    location: 'Remote',
    type: 'Full-time',
    posted: '1 week ago',
    status: 'active',
    applicants: 32,
    views: 650,
    applyRate: 4.9,
    sources: [
      { name: 'LinkedIn', count: 18 },
      { name: 'Referrals', count: 8 },
      { name: 'Company Site', count: 6 }
    ]
  },
  {
    id: '3',
    title: 'UX Designer',
    location: 'San Francisco, CA',
    type: 'Full-time',
    posted: '2 weeks ago',
    status: 'closed',
    applicants: 28,
    views: 420,
    applyRate: 6.7,
    sources: [
      { name: 'Dribbble', count: 12 },
      { name: 'LinkedIn', count: 10 },
      { name: 'Company Site', count: 6 }
    ]
  }
];

const availablePerks = [
  { id: 'remote', label: 'Remote Work', icon: Home },
  { id: 'health', label: 'Health Insurance', icon: Shield },
  { id: 'dental', label: 'Dental Insurance', icon: Shield },
  { id: 'vision', label: 'Vision Insurance', icon: Shield },
  { id: 'pto', label: 'Unlimited PTO', icon: Plane },
  { id: 'stock', label: 'Stock Options', icon: TrendingUp },
  { id: 'learning', label: 'Learning Budget', icon: Award },
  { id: 'gym', label: 'Gym Membership', icon: Zap },
  { id: 'lunch', label: 'Free Lunch', icon: Coffee },
  { id: 'flexible', label: 'Flexible Hours', icon: Clock },
  { id: 'parking', label: 'Free Parking', icon: Car },
  { id: 'commuter', label: 'Commuter Benefits', icon: Car }
];

// Overview Tab Component
function OverviewTab({ companyData, isEditMode }: { companyData: CompanyData; isEditMode: boolean }) {
  const kpis = [
    {
      label: 'Followers',
      value: companyData.stats.followers.toLocaleString(),
      change: 12,
      icon: Users,
      sparkline: [1100, 1150, 1200, 1180, 1250]
    },
    {
      label: 'Page Views',
      value: companyData.stats.pageViews.toLocaleString(),
      change: 8,
      icon: Eye,
      sparkline: [7200, 7800, 8100, 8300, 8750]
    },
    {
      label: 'Job Apply Rate',
      value: `${companyData.stats.applyRate}%`,
      change: -2,
      icon: Target,
      sparkline: [9.2, 8.8, 8.5, 8.7, 8.5]
    },
    {
      label: 'Open Positions',
      value: companyData.stats.openPositions,
      change: 5,
      icon: Briefcase,
      sparkline: [10, 11, 11, 12, 12]
    }
  ];

  const activityFeed = [
    { type: 'application', message: '3 new applications for Senior Frontend Developer', time: '2 hours ago', icon: FileText },
    { type: 'review', message: 'New 5-star review from John Smith', time: '4 hours ago', icon: Star },
    { type: 'team', message: 'Emily Davis joined the hiring team', time: '1 day ago', icon: UserPlus },
    { type: 'job', message: 'Product Manager job posted', time: '2 days ago', icon: Plus }
  ];

  const conversionData = [
    { stage: 'Page Views', value: 8750, color: '#3b82f6' },
    { stage: 'Job Views', value: 2450, color: '#10b981' },
    { stage: 'Applications', value: 342, color: '#f59e0b' },
    { stage: 'Hires', value: 12, color: '#ef4444' }
  ];

  return (
    <div className="space-y-6">
      {/* Company Hero Section */}
      <Card>
        <CardContent className="p-0">
          <div className="h-48 bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-lg relative">
            <img 
              src={companyData.heroImage} 
              alt="Company hero" 
              className="w-full h-full object-cover rounded-t-lg opacity-80"
            />
            <div className="absolute inset-0 bg-background/80 rounded-t-lg" />
            {isEditMode && (
              <Button 
                size="sm" 
                variant="secondary"
                className="absolute top-4 right-4"
              >
                <Camera className="h-4 w-4 mr-2" />
                Change Cover
              </Button>
            )}
          </div>
          <div className="p-6">
            <div className="flex items-start space-x-6">
              <div className="relative">
                <Avatar className="w-24 h-24 border-4 border-border -mt-12">
                  <AvatarImage src={companyData.logo} alt={companyData.name} />
                  <AvatarFallback className="text-xl">{companyData.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                {companyData.visibility.isVerified && (
                  <Verified className="absolute -bottom-1 -right-1 h-6 w-6 text-blue-500 bg-card rounded-full" />
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">{companyData.name}</h1>
                    <p className="text-lg text-muted-foreground">{companyData.tagline}</p>
                    
                    <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {companyData.location}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {companyData.size}
                      </div>
                      <div className="flex items-center">
                        <Building className="h-4 w-4 mr-1" />
                        Founded {companyData.founded}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 mt-3">
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < Math.floor(companyData.stats.rating) ? 'text-yellow-500 fill-current' : 'text-muted-foreground/50'}`}
                          />
                        ))}
                        <span className="text-sm text-muted-foreground ml-1">
                          ({companyData.stats.reviews} reviews)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview Public Page
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Page
                    </Button>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Post Job
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPI Strip */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{kpi.label}</p>
                    <p className="text-2xl font-bold">{kpi.value}</p>
                    <div className="flex items-center mt-1">
                      {kpi.change > 0 ? (
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                      )}
                      <span className={`text-sm ${kpi.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {kpi.change > 0 ? '+' : ''}{kpi.change}%
                      </span>
                    </div>
                  </div>
                  <Icon className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Featured Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Featured Jobs */}
          <Card>
            <CardHeader>
              <CardTitle>Featured Job Openings</CardTitle>
              <CardDescription>Highlighted positions with high visibility</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockJobListings.slice(0, 2).map((job) => (
                  <div key={job.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">{job.title}</h3>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                          <span>{job.location}</span>
                          <span>{job.type}</span>
                          <span>{job.applicants} applicants</span>
                        </div>
                      </div>
                      <Badge variant={job.status === 'active' ? 'default' : 'secondary'}>
                        {job.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Conversion Funnel */}
          <Card>
            <CardHeader>
              <CardTitle>Conversion Funnel</CardTitle>
              <CardDescription>Views to applications conversion</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={conversionData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="stage" type="category" width={80} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Latest Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Latest Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activityFeed.map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Icon className="h-4 w-4 text-blue-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground">{activity.message}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Avg. Candidate Rating</span>
                <span className="font-medium">{companyData.stats.avgCandidateRating}/5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Job Views</span>
                <span className="font-medium">{companyData.stats.jobViews.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Applications</span>
                <span className="font-medium">342</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Job Openings Tab Component
function JobOpeningsTab() {
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-xl font-semibold">Job Openings</h2>
          <p className="text-muted-foreground">Manage all your job listings and performance</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Job
          </Button>
        </div>
      </div>

      {/* Filters and View Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <Select defaultValue="all">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="newest">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="applicants">Most Applicants</SelectItem>
              <SelectItem value="views">Most Views</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'table' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('table')}
          >
            Table
          </Button>
          <Button
            variant={viewMode === 'cards' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('cards')}
          >
            Cards
          </Button>
        </div>
      </div>

      {/* Job Listings */}
      {viewMode === 'table' ? (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border">
                  <tr>
                    <th className="text-left py-3 px-4">
                      <Checkbox 
                        checked={selectedJobs.length === mockJobListings.length}
                        onCheckedChange={(checked) => {
                          setSelectedJobs(checked ? mockJobListings.map(j => j.id) : []);
                        }}
                      />
                    </th>
                    <th className="text-left py-3 px-4">Job Title</th>
                    <th className="text-left py-3 px-4">Location</th>
                    <th className="text-left py-3 px-4">Type</th>
                    <th className="text-right py-3 px-4">Views</th>
                    <th className="text-right py-3 px-4">Applicants</th>
                    <th className="text-right py-3 px-4">Apply Rate</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-right py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockJobListings.map((job) => (
                    <tr key={job.id} className="border-b border-border">
                      <td className="py-3 px-4">
                        <Checkbox 
                          checked={selectedJobs.includes(job.id)}
                          onCheckedChange={(checked) => {
                            setSelectedJobs(prev => 
                              checked 
                                ? [...prev, job.id]
                                : prev.filter(id => id !== job.id)
                            );
                          }}
                        />
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium">{job.title}</div>
                          <div className="text-sm text-muted-foreground">Posted {job.posted}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">{job.location}</td>
                      <td className="py-3 px-4">{job.type}</td>
                      <td className="text-right py-3 px-4">{job.views}</td>
                      <td className="text-right py-3 px-4">{job.applicants}</td>
                      <td className="text-right py-3 px-4">{job.applyRate}%</td>
                      <td className="py-3 px-4">
                        <Badge variant={job.status === 'active' ? 'default' : job.status === 'draft' ? 'secondary' : 'outline'}>
                          {job.status}
                        </Badge>
                      </td>
                      <td className="text-right py-3 px-4">
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockJobListings.map((job) => (
            <Card key={job.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <Badge variant={job.status === 'active' ? 'default' : job.status === 'draft' ? 'secondary' : 'outline'}>
                    {job.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                <h3 className="font-semibold text-foreground mb-2">{job.title}</h3>
                <div className="space-y-1 text-sm text-muted-foreground mb-4">
                  <div>{job.location}</div>
                  <div>{job.type}</div>
                  <div>Posted {job.posted}</div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-lg font-semibold">{job.views}</div>
                    <div className="text-xs text-muted-foreground">Views</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold">{job.applicants}</div>
                    <div className="text-xs text-muted-foreground">Applicants</div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Bulk Actions */}
      {selectedJobs.length > 0 && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {selectedJobs.length} job{selectedJobs.length > 1 ? 's' : ''} selected
              </span>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline">
                  <Copy className="h-4 w-4 mr-1" />
                  Duplicate
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </Button>
                <Button size="sm" variant="outline">
                  <X className="h-4 w-4 mr-1" />
                  Close
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Team & Hiring Tab Component
function TeamHiringTab() {
  const [showInviteModal, setShowInviteModal] = useState(false);

  const roles = [
    { id: 'admin', name: 'Admin', permissions: ['view', 'edit', 'invite', 'delete'] },
    { id: 'hiring-manager', name: 'Hiring Manager', permissions: ['view', 'edit', 'invite'] },
    { id: 'interviewer', name: 'Interviewer', permissions: ['view'] },
    { id: 'read-only', name: 'Read Only', permissions: ['view'] }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Team & Hiring</h2>
          <p className="text-muted-foreground">Manage your hiring team and interview processes</p>
        </div>
        <Button onClick={() => setShowInviteModal(true)}>
          <UserPlus className="h-4 w-4 mr-2" />
          Invite Member
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team Members */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>Manage roles and permissions for your hiring team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTeamMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-muted-foreground">{member.email}</div>
                        <div className="flex items-center space-x-4 mt-1 text-xs text-muted-foreground">
                          <span>{member.role}</span>
                          <span>•</span>
                          <span>{member.assignedJobs} jobs assigned</span>
                          <span>•</span>
                          <span>Active {member.lastActive}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={member.status === 'active' ? 'default' : 'secondary'}>
                        {member.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Message
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Team Performance */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Team Performance</CardTitle>
              <CardDescription>Key metrics for your hiring team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">127</div>
                  <div className="text-sm text-muted-foreground">Interviews Conducted</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">2.4h</div>
                  <div className="text-sm text-muted-foreground">Avg Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">4.2/5</div>
                  <div className="text-sm text-muted-foreground">Avg Candidate Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">8%</div>
                  <div className="text-sm text-muted-foreground">No-show Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Roles & Permissions */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Roles & Permissions</CardTitle>
              <CardDescription>Define what team members can do</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {roles.map((role) => (
                  <div key={role.id} className="border border-border rounded-lg p-3">
                    <div className="font-medium mb-2">{role.name}</div>
                    <div className="space-y-1">
                      {role.permissions.map((permission) => (
                        <div key={permission} className="flex items-center space-x-2">
                          <UserCheck className="h-3 w-3 text-green-500" />
                          <span className="text-xs text-muted-foreground capitalize">{permission}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4">
                <Plus className="h-4 w-4 mr-1" />
                Create Custom Role
              </Button>
            </CardContent>
          </Card>

          {/* Interview Templates */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Interview Templates</CardTitle>
              <CardDescription>Standardize your interview process</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <div className="font-medium text-sm">Technical Interview</div>
                    <div className="text-xs text-muted-foreground">60 min • 5 questions</div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <div className="font-medium text-sm">Behavioral Interview</div>
                    <div className="text-xs text-muted-foreground">45 min • 8 questions</div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4">
                <Plus className="h-4 w-4 mr-1" />
                Create Template
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Branding & Media Tab Component
function BrandingMediaTab({ companyData, editData, setEditData, isEditMode }: { 
  companyData: CompanyData; 
  editData: CompanyData; 
  setEditData: (data: CompanyData) => void; 
  isEditMode: boolean;
}) {
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Branding & Media</h2>
          <p className="text-muted-foreground">Customize your employer brand and visual identity</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download Brand Kit
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Content Editor */}
        <div className="space-y-6">
          {/* About & Tagline */}
          <Card>
            <CardHeader>
              <CardTitle>About & Messaging</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Company Tagline</Label>
                <Input
                  value={isEditMode ? editData.tagline : companyData.tagline}
                  onChange={(e) => isEditMode && setEditData({...editData, tagline: e.target.value})}
                  placeholder="A short, compelling tagline (max 140 chars)"
                  disabled={!isEditMode}
                  maxLength={140}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {(isEditMode ? editData.tagline : companyData.tagline).length}/140 characters
                </p>
              </div>
              <div>
                <Label>About Us</Label>
                <Textarea
                  value={isEditMode ? editData.description : companyData.description}
                  onChange={(e) => isEditMode && setEditData({...editData, description: e.target.value})}
                  rows={4}
                  disabled={!isEditMode}
                  placeholder="Tell candidates about your company mission and values..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Visual Assets */}
          <Card>
            <CardHeader>
              <CardTitle>Visual Assets</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Company Logo</Label>
                <div className="flex items-center space-x-4 mt-2">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={companyData.logo} alt={companyData.name} />
                    <AvatarFallback>{companyData.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  {isEditMode && (
                    <div className="space-x-2">
                      <Button size="sm" variant="outline">
                        <Upload className="h-4 w-4 mr-1" />
                        Upload Logo
                      </Button>
                      <Button size="sm" variant="outline">
                        <Image className="h-4 w-4 mr-1" />
                        Logo Variants
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Label>Hero/Cover Image</Label>
                <div className="mt-2">
                  <div className="h-32 bg-muted rounded-lg relative overflow-hidden">
                    <img 
                      src={companyData.heroImage} 
                      alt="Hero" 
                      className="w-full h-full object-cover"
                    />
                    {isEditMode && (
                      <div className="absolute inset-0 bg-background/95 flex items-center justify-center">
                        <Button size="sm" variant="secondary">
                          <Camera className="h-4 w-4 mr-1" />
                          Change Image
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Photo & Video Gallery */}
          <Card>
            <CardHeader>
              <CardTitle>Media Gallery</CardTitle>
              <CardDescription>Showcase your office, team, and company culture</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
                {companyData.gallery.slice(0, 4).map((photo, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={photo}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    {isEditMode && (
                      <div className="absolute inset-0 bg-background/95 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <Button size="sm" variant="destructive">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {isEditMode && (
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Image className="h-4 w-4 mr-1" />
                    Add Photos
                  </Button>
                  <Button variant="outline" size="sm">
                    <Video className="h-4 w-4 mr-1" />
                    Add Videos
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* SEO Settings */}
          <Card>
            <CardHeader>
              <CardTitle>SEO & Meta Settings</CardTitle>
              <CardDescription>Optimize your page for search engines</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Page Title</Label>
                <Input
                  value={isEditMode ? editData.seo.metaTitle : companyData.seo.metaTitle}
                  onChange={(e) => isEditMode && setEditData({
                    ...editData,
                    seo: { ...editData.seo, metaTitle: e.target.value }
                  })}
                  disabled={!isEditMode}
                  placeholder="Page title for search results"
                />
              </div>
              <div>
                <Label>Meta Description</Label>
                <Textarea
                  value={isEditMode ? editData.seo.metaDescription : companyData.seo.metaDescription}
                  onChange={(e) => isEditMode && setEditData({
                    ...editData,
                    seo: { ...editData.seo, metaDescription: e.target.value }
                  })}
                  disabled={!isEditMode}
                  rows={3}
                  placeholder="Description for search results (max 160 chars)"
                  maxLength={160}
                />
              </div>
              <div>
                <Label>Keywords</Label>
                <Input
                  value={isEditMode ? editData.seo.keywords.join(', ') : companyData.seo.keywords.join(', ')}
                  onChange={(e) => isEditMode && setEditData({
                    ...editData,
                    seo: { 
                      ...editData.seo, 
                      keywords: e.target.value.split(',').map(k => k.trim()).filter(Boolean)
                    }
                  })}
                  disabled={!isEditMode}
                  placeholder="Separate keywords with commas"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
              <CardDescription>See how your page looks to visitors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <Button
                  variant={previewMode === 'desktop' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPreviewMode('desktop')}
                >
                  <Monitor className="h-4 w-4 mr-1" />
                  Desktop
                </Button>
                <Button
                  variant={previewMode === 'mobile' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPreviewMode('mobile')}
                >
                  <Smartphone className="h-4 w-4 mr-1" />
                  Mobile
                </Button>
              </div>

              <div className={`border border-border rounded-lg overflow-hidden ${previewMode === 'mobile' ? 'max-w-sm mx-auto' : ''}`}>
                <div className="h-24 bg-gradient-to-r from-blue-600 to-purple-600 relative">
                  <img 
                    src={companyData.heroImage} 
                    alt="Hero preview" 
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-12 h-12 border-2 border-border -mt-6">
                      <AvatarImage src={companyData.logo} alt={companyData.name} />
                      <AvatarFallback>{companyData.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold">{companyData.name}</h3>
                      <p className="text-sm text-muted-foreground">{companyData.tagline}</p>
                      <div className="flex items-center space-x-2 mt-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>{companyData.location}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3 line-clamp-3">
                    {companyData.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Social Media Preview</CardTitle>
              <CardDescription>How your page appears when shared</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border border-border rounded-lg overflow-hidden">
                <img 
                  src={companyData.heroImage} 
                  alt="Social preview" 
                  className="w-full h-32 object-cover"
                />
                <div className="p-3">
                  <div className="font-medium text-sm">{companyData.seo.metaTitle}</div>
                  <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {companyData.seo.metaDescription}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{companyData.website}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function InsightsTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Insights</CardTitle>
          <CardDescription>Key performance metrics and trends</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Insights dashboard coming soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}

function SettingsTab({ companyData, editData, setEditData, isEditMode }: { 
  companyData: CompanyData; 
  editData: CompanyData; 
  setEditData: (data: CompanyData) => void; 
  isEditMode: boolean;
}) {
  return (
    <div className="space-y-6">
      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <p className="text-sm text-muted-foreground">Configure email and push notifications</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>New Applications</Label>
              <p className="text-sm text-muted-foreground">Get notified when someone applies</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Company Reviews</Label>
              <p className="text-sm text-muted-foreground">New reviews and ratings</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Team Activity</Label>
              <p className="text-sm text-muted-foreground">Team member actions and updates</p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Weekly Reports</Label>
              <p className="text-sm text-muted-foreground">Automated performance summaries</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>Manage access and security settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">Add extra security to your account</p>
            </div>
            <Button variant="outline" size="sm">
              <Lock className="h-4 w-4 mr-2" />
              Enable 2FA
            </Button>
          </div>

          <div className="border-t border-border pt-4">
            <Label>Data Export</Label>
            <p className="text-sm text-muted-foreground mb-3">
              Download all your company data and analytics
            </p>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>

          <div className="border-t border-border pt-4">
            <Label className="text-red-600">Danger Zone</Label>
            <p className="text-sm text-muted-foreground mb-3">
              Permanently delete your company page
            </p>
            <Button variant="destructive" size="sm">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Company Page
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function EmployerCompanyPage() {
  const { activeSubTab } = useTabContent();
  const [isEditMode, setIsEditMode] = useState(false);
  const [companyData, setCompanyData] = useState<CompanyData>(mockCompanyData);
  const [editData, setEditData] = useState<CompanyData>(mockCompanyData);

  const handleSave = () => {
    setCompanyData(editData);
    setIsEditMode(false);
  };

  const handleCancel = () => {
    setEditData(companyData);
    setIsEditMode(false);
  };

  const handleEditModeToggle = () => {
    if (isEditMode) {
      handleCancel();
    } else {
      setIsEditMode(true);
    }
  };

  const renderTabContent = () => {
    switch (activeSubTab) {
      case 'overview':
        return <OverviewTab companyData={companyData} isEditMode={isEditMode} />;
      case 'jobs':
        return <JobOpeningsTab />;
      case 'team':
        return <TeamHiringTab />;
      case 'branding':
        return <BrandingMediaTab 
          companyData={companyData}
          editData={editData}
          setEditData={setEditData}
          isEditMode={isEditMode}
        />;
      case 'insights':
        return <InsightsTab />;
      case 'settings':
        return <SettingsTab 
          companyData={companyData}
          editData={editData}
          setEditData={setEditData}
          isEditMode={isEditMode}
        />;
      default:
        return <OverviewTab companyData={companyData} isEditMode={isEditMode} />;
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header - Only show in Overview tab */}
      {activeSubTab === 'overview' && (
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Company Page</h1>
            <p className="text-muted-foreground">Manage your public company profile and employer brand</p>
          </div>
          <div className="flex items-center space-x-2">
            {isEditMode ? (
              <>
                <Button variant="outline" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </>
            ) : (
              <Button onClick={handleEditModeToggle}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Tab Content */}
      <div>
        {renderTabContent()}
      </div>
    </div>
  );
}