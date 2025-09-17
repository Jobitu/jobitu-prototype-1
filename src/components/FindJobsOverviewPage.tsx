import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { Input } from "./ui/input";
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Search,
  MapPin,
  Briefcase,
  TrendingUp,
  Star,
  Heart,
  ExternalLink,
  Edit,
  X,
  Plus,
  ChevronRight,
  Building,
  DollarSign,
  Clock,
  Users,
  Target,
  CheckCircle,
  Info,
  ArrowRight,
  Settings,
  Bookmark,
  Filter,
  RotateCcw,
  Sparkles,
  Brain,
  Zap,
  Award,
  Calendar,
  Eye
} from "lucide-react";

interface JobRecommendation {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  salary: string;
  matchPercentage: number;
  skills: string[];
  postedDate: string;
  jobType: string;
  applied?: boolean;
  saved?: boolean;
  matchReason?: string;
  isRemote?: boolean;
  aiInsight?: string;
}

interface JobFocus {
  id: string;
  title: string;
  description: string;
  newJobsCount: number;
  totalJobs: number;
  active: boolean;
  keywords: string[];
}

interface SavedJob {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  savedDate: string;
  applied: boolean;
}

const mockJobRecommendations: JobRecommendation[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechFlow Inc.',
    companyLogo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=150&h=150&fit=crop',
    location: 'San Francisco, CA',
    salary: '$140k - $180k',
    matchPercentage: 95,
    skills: ['React', 'TypeScript', 'Next.js'],
    postedDate: '2024-01-20',
    jobType: 'Full-time',
    isRemote: false,
    matchReason: "Perfect match for your React and TypeScript skills",
    aiInsight: "This role aligns perfectly with your 5+ years of React experience and your preference for frontend leadership roles."
  },
  {
    id: '2',
    title: 'React Developer',
    company: 'InnovateLab',
    companyLogo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=150&h=150&fit=crop',
    location: 'Remote',
    salary: '$130k - $160k',
    matchPercentage: 92,
    skills: ['React', 'Node.js', 'AWS'],
    postedDate: '2024-01-19',
    jobType: 'Full-time',
    isRemote: true,
    matchReason: "Matched because you have React + Node.js skills",
    aiInsight: "Remote position with your preferred tech stack. Company has excellent remote culture."
  },
  {
    id: '3',
    title: 'Full Stack Engineer',
    company: 'StartupX',
    companyLogo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop',
    location: 'New York, NY',
    salary: '$120k - $155k',
    matchPercentage: 88,
    skills: ['React', 'Python', 'Docker'],
    postedDate: '2024-01-18',
    jobType: 'Full-time',
    isRemote: false,
    matchReason: "Great match for your full-stack experience",
    aiInsight: "Fast-growing startup seeking someone with your diverse skillset. Great learning opportunity."
  },
  {
    id: '4',
    title: 'Frontend Tech Lead',
    company: 'CloudScale',
    companyLogo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=150&h=150&fit=crop',
    location: 'Seattle, WA',
    salary: '$160k - $200k',
    matchPercentage: 90,
    skills: ['React', 'TypeScript', 'Leadership'],
    postedDate: '2024-01-17',
    jobType: 'Full-time',
    isRemote: false,
    matchReason: "Leadership role matching your career goals",
    aiInsight: "This senior role matches your goal to transition into technical leadership."
  }
];

const mockJobFocuses: JobFocus[] = [
  {
    id: '1',
    title: 'Frontend Developer Roles in San Francisco',
    description: 'React, Vue, Angular positions in SF Bay Area',
    newJobsCount: 8,
    totalJobs: 47,
    active: true,
    keywords: ['React', 'San Francisco', 'Frontend']
  },
  {
    id: '2',
    title: 'Remote React Developer Positions',
    description: 'Full-time remote React opportunities',
    newJobsCount: 12,
    totalJobs: 89,
    active: true,
    keywords: ['React', 'Remote', 'Full-time']
  },
  {
    id: '3',
    title: 'Senior Tech Lead Opportunities',
    description: 'Leadership roles in technology',
    newJobsCount: 3,
    totalJobs: 21,
    active: true,
    keywords: ['Tech Lead', 'Senior', 'Leadership']
  }
];

const mockSavedJobs: SavedJob[] = [
  {
    id: '1',
    title: 'Senior React Developer',
    company: 'Airbnb',
    companyLogo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=150&h=150&fit=crop',
    savedDate: '2024-01-19',
    applied: false
  },
  {
    id: '2',
    title: 'Frontend Engineer',
    company: 'Stripe',
    companyLogo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=150&h=150&fit=crop',
    savedDate: '2024-01-18',
    applied: true
  },
  {
    id: '3',
    title: 'UI Developer',
    company: 'Discord',
    companyLogo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop',
    savedDate: '2024-01-17',
    applied: false
  }
];

interface FindJobsOverviewPageProps {
  activeSubTab?: string;
  onCreateFocus?: () => void;
  onViewFocusDetail?: (focusId: string) => void;
  onViewAllSmartMatches?: () => void;
  onViewAllSavedJobs?: () => void;
  onJobSearch?: () => void;
  onUpdateProfile?: () => void;
}

export function FindJobsOverviewPage({ 
  activeSubTab = 'overview',
  onCreateFocus,
  onViewFocusDetail,
  onViewAllSmartMatches,
  onViewAllSavedJobs,
  onJobSearch,
  onUpdateProfile
}: FindJobsOverviewPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [profileCompletion] = useState(78);
  const [savedJobsCount] = useState(12);
  const [newMatchesCount] = useState(12);

  const userName = "Alex";

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    if (percentage >= 80) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (percentage >= 70) return 'bg-amber-100 text-amber-800 border-amber-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getMissingProfileItems = () => {
    const missing = [];
    if (profileCompletion < 80) missing.push("Professional Summary");
    if (profileCompletion < 85) missing.push("Skills Assessment");
    if (profileCompletion < 90) missing.push("Portfolio Links");
    return missing;
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          
          {/* Hero Welcome Section */}
          <div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-b border-gray-100">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5" />
            <div className="relative px-6 py-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="space-y-2">
                  <h1 className="text-3xl text-gray-900">Welcome back, {userName}! 👋</h1>
                  <p className="text-lg text-gray-600">Let's find your next opportunity</p>
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200">
                      <Sparkles className="h-4 w-4 text-blue-500" />
                      <span className="font-medium text-gray-900">{newMatchesCount} new job matches today</span>
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={onUpdateProfile}
                      className="bg-white hover:bg-gray-50 border-gray-200"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Update Preferences
                    </Button>
                  </div>
                </div>
                <div className="lg:w-64 lg:h-48 rounded-lg overflow-hidden shadow-lg">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1580708794695-16151cc7e63f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b3JrcGxhY2UlMjBtb3RpdmF0aW9ufGVufDF8fHx8MTc1NTM3MDQxOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Professional workspace"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 py-6 space-y-6">
            
            {/* Profile Completion Widget */}
            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Award className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Profile Completion</h3>
                        <p className="text-sm text-gray-600">Complete your profile for better AI matches</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Progress</span>
                      <span className="text-sm font-semibold text-gray-900">{profileCompletion}%</span>
                    </div>
                    <Progress value={profileCompletion} className="h-2 mb-4" />
                    {getMissingProfileItems().length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">Missing sections:</p>
                        <div className="flex flex-wrap gap-2">
                          {getMissingProfileItems().map((item, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              + {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="ml-6">
                    <Button onClick={onUpdateProfile} className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Complete Profile
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              
              {/* Left Sidebar: Job Focus & Saved Jobs */}
              <div className="lg:col-span-1 space-y-6">
                
                {/* Job Focus Section */}
                <Card className="border border-gray-200 shadow-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Target className="h-5 w-5 text-blue-500" />
                        <CardTitle className="text-lg">Job Focus</CardTitle>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {mockJobFocuses.map((focus) => (
                      <Card
                        key={focus.id}
                        className={`cursor-pointer transition-all hover:shadow-md border ${
                          focus.active 
                            ? 'bg-blue-50 border-blue-200 shadow-sm' 
                            : 'bg-white border-gray-200 hover:bg-gray-50'
                        }`}
                        onClick={() => onViewFocusDetail?.(focus.id)}
                      >
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            <div className="flex items-start justify-between">
                              <h4 className="font-medium text-sm leading-tight">{focus.title}</h4>
                              {focus.newJobsCount > 0 && (
                                <Badge variant="secondary" className="text-xs ml-2 flex-shrink-0">
                                  {focus.newJobsCount} new
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-gray-600 line-clamp-2">{focus.description}</p>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span>{focus.totalJobs} total jobs</span>
                              <ChevronRight className="h-3 w-3" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full" 
                      onClick={onCreateFocus}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create Focus
                    </Button>
                  </CardContent>
                </Card>

                {/* Saved Jobs Preview */}
                <Card className="border border-gray-200 shadow-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bookmark className="h-5 w-5 text-purple-500" />
                        <CardTitle className="text-lg">Saved Jobs</CardTitle>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {savedJobsCount}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {mockSavedJobs.slice(0, 3).map((job) => (
                      <div key={job.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={job.companyLogo} alt={job.company} />
                          <AvatarFallback className="text-xs">{job.company.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{job.title}</p>
                          <p className="text-xs text-gray-600 truncate">{job.company}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                          {job.applied ? (
                            <Badge variant="secondary" className="text-xs">Applied</Badge>
                          ) : (
                            <Button size="sm" variant="ghost" className="h-6 px-2 text-xs">
                              Apply
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full" 
                      onClick={onViewAllSavedJobs}
                    >
                      View All Saved
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Center: AI Smart Matches */}
              <div className="lg:col-span-3">
                <Card className="border border-gray-200 shadow-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                          <Brain className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">AI Smart Matches</CardTitle>
                          <p className="text-sm text-gray-600">Personalized recommendations based on your profile</p>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        onClick={onViewAllSmartMatches}
                        className="bg-white hover:bg-gray-50"
                      >
                        View All Matches
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {mockJobRecommendations.map((job) => (
                        <Card key={job.id} className="border border-gray-200 hover:shadow-lg transition-all cursor-pointer group">
                          <CardContent className="p-5">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-3 flex-1">
                                <Avatar className="w-10 h-10">
                                  <AvatarImage src={job.companyLogo} alt={job.company} />
                                  <AvatarFallback>{job.company.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                                <div className="min-w-0 flex-1">
                                  <h3 className="font-semibold text-base leading-tight">{job.title}</h3>
                                  <p className="text-sm text-gray-600">{job.company}</p>
                                </div>
                              </div>
                              <Heart className="h-5 w-5 text-gray-300 hover:text-red-500 cursor-pointer transition-colors flex-shrink-0" />
                            </div>
                            
                            {/* Match Percentage */}
                            <div className="mb-4">
                              <Badge className={`${getMatchColor(job.matchPercentage)} border`}>
                                <Sparkles className="h-3 w-3 mr-1" />
                                {job.matchPercentage}% Match
                              </Badge>
                            </div>

                            {/* AI Insight */}
                            {job.aiInsight && (
                              <div className="mb-4 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                                <div className="flex items-start gap-2">
                                  <Zap className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                  <p className="text-sm text-blue-800 leading-relaxed">{job.aiInsight}</p>
                                </div>
                              </div>
                            )}
                            
                            {/* Job Details */}
                            <div className="space-y-2 mb-4">
                              <div className="flex items-center text-sm text-gray-600">
                                <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                                <span>{job.location}</span>
                                {job.isRemote && (
                                  <Badge variant="outline" className="ml-2 text-xs">Remote</Badge>
                                )}
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <DollarSign className="h-4 w-4 mr-2 flex-shrink-0" />
                                <span>{job.salary}</span>
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                                <span>{formatDate(job.postedDate)}</span>
                              </div>
                            </div>

                            {/* Skills */}
                            <div className="flex flex-wrap gap-2 mb-4">
                              {job.skills.slice(0, 3).map((skill, index) => (
                                <Badge key={index} variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                                  {skill}
                                </Badge>
                              ))}
                              {job.skills.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{job.skills.length - 3} more
                                </Badge>
                              )}
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 flex-1">
                                Apply Now
                              </Button>
                              <Button variant="outline" size="sm" className="flex-1">
                                <Bookmark className="h-4 w-4 mr-1" />
                                Save
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* General Job Search Section */}
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Search className="h-5 w-5 text-green-500" />
                    <CardTitle className="text-xl">Explore All Jobs</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Search Bar */}
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search jobs by title, company, or location..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-white border-gray-200"
                      />
                    </div>
                    <Button onClick={onJobSearch} className="bg-blue-600 hover:bg-blue-700">
                      <Search className="h-4 w-4 mr-2" />
                      Search
                    </Button>
                  </div>

                  {/* Quick Filter Pills */}
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" className="bg-white border-gray-200">
                      <MapPin className="h-4 w-4 mr-1" />
                      Remote
                    </Button>
                    <Button variant="outline" size="sm" className="bg-white border-gray-200">
                      <Building className="h-4 w-4 mr-1" />
                      Full-time
                    </Button>
                    <Button variant="outline" size="sm" className="bg-white border-gray-200">
                      <DollarSign className="h-4 w-4 mr-1" />
                      $120k+
                    </Button>
                    <Button variant="outline" size="sm" className="bg-white border-gray-200">
                      <Calendar className="h-4 w-4 mr-1" />
                      This week
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Filter className="h-4 w-4 mr-1" />
                      More filters
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Empty State / AI Suggestions */}
            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="p-8 text-center">
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
                    <Sparkles className="h-8 w-8 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Career Suggestions</h3>
                    <p className="text-gray-600 mb-6">Here are some personalized tips to improve your job search</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                    <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Plus className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-blue-900">Add Skills</span>
                      </div>
                      <p className="text-sm text-blue-800">Add JavaScript to unlock 50+ more relevant matches</p>
                    </div>
                    <div className="p-4 bg-purple-50 border border-purple-100 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="h-4 w-4 text-purple-600" />
                        <span className="font-medium text-purple-900">Create Focus</span>
                      </div>
                      <p className="text-sm text-purple-800">Set up a focus for Remote Data Science roles</p>
                    </div>
                    <div className="p-4 bg-green-50 border border-green-100 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-green-900">Complete Profile</span>
                      </div>
                      <p className="text-sm text-green-800">Complete your experience section for better matches</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}