import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Separator } from './ui/separator';
import { 
  Search,
  Bell,
  Filter,
  Zap,
  Star,
  MapPin,
  Clock,
  Briefcase,
  Heart,
  Bookmark,
  TrendingUp,
  Target,
  Users,
  Building,
  ChevronRight,
  LayoutGrid,
  List,
  Sparkles,
  User,
  AlertCircle,
  CheckCircle,
  Calendar,
  DollarSign,
  BarChart3,
  BookOpen,
  Settings,
  Globe,
  Home,
  ArrowUpRight,
  Plus,
  FileText
} from 'lucide-react';

interface JobMatch {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  matchScore: number;
  salary: string;
  postedDays: number;
  companyLogo: string;
  tags: string[];
  isBookmarked: boolean;
  applicationStatus: 'not_started' | 'applied' | 'interviewing' | 'rejected';
  deadline?: string;
  note?: string;
  aiReason?: string;
}

const mockSmartMatches: JobMatch[] = [
  {
    id: 1,
    title: 'Senior React Developer',
    company: 'InnovateLab',
    location: 'Remote',
    type: 'Full-Time',
    matchScore: 94,
    salary: '$140k - $180k',
    postedDays: 1,
    companyLogo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=50&h=50&fit=crop',
    tags: ['React', 'TypeScript', 'Remote'],
    isBookmarked: false,
    applicationStatus: 'not_started',
    aiReason: '94% match: Your React and TypeScript skills, plus remote work preference align perfectly.'
  },
  {
    id: 2,
    title: 'Frontend Lead',
    company: 'StartupHub',
    location: 'San Francisco, CA',
    type: 'Full-Time',
    matchScore: 91,
    salary: '$160k - $200k',
    postedDays: 2,
    companyLogo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=50&h=50&fit=crop',
    tags: ['Leadership', 'Vue.js', 'Hybrid'],
    isBookmarked: true,
    applicationStatus: 'applied',
    aiReason: '91% match: Leadership experience and technical depth match their scaling needs.'
  },
  {
    id: 3,
    title: 'Full Stack Engineer',
    company: 'TechCorp',
    location: 'New York, NY',
    type: 'Full-Time',
    matchScore: 87,
    salary: '$130k - $160k',
    postedDays: 3,
    companyLogo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=50&h=50&fit=crop',
    tags: ['Node.js', 'Python', 'AWS'],
    isBookmarked: false,
    applicationStatus: 'not_started',
    aiReason: '87% match: Full-stack skills and cloud experience align with their tech stack.'
  }
];

const mockJobSearchResults: JobMatch[] = [
  ...mockSmartMatches,
  {
    id: 4,
    title: 'Frontend Developer',
    company: 'DesignFirst',
    location: 'Los Angeles, CA',
    type: 'Full-Time',
    matchScore: 78,
    salary: '$110k - $140k',
    postedDays: 5,
    companyLogo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=50&h=50&fit=crop',
    tags: ['React', 'CSS', 'Design Systems'],
    isBookmarked: false,
    applicationStatus: 'not_started'
  },
  {
    id: 5,
    title: 'JavaScript Developer',
    company: 'CodeLabs',
    location: 'Austin, TX',
    type: 'Contract',
    matchScore: 72,
    salary: '$85/hr',
    postedDays: 7,
    companyLogo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=50&h=50&fit=crop',
    tags: ['JavaScript', 'Node.js', 'Contract'],
    isBookmarked: false,
    applicationStatus: 'not_started'
  }
];

const mockSavedJobs: JobMatch[] = [
  {
    ...mockSmartMatches[1],
    note: 'Great leadership opportunity',
    deadline: '2024-02-15'
  },
  {
    id: 6,
    title: 'Product Engineer',
    company: 'GrowthCo',
    location: 'Remote',
    type: 'Full-Time',
    matchScore: 85,
    salary: '$125k - $155k',
    postedDays: 10,
    companyLogo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=50&h=50&fit=crop',
    tags: ['Product', 'React', 'Growth'],
    isBookmarked: true,
    applicationStatus: 'not_started',
    note: 'Product-focused role',
    deadline: '2024-02-20'
  }
];

const jobFocusData = {
  focusArea: 'UX DESIGNER',
  jobType: ['Full Time', 'Freelance'],
  matches: [
    {
      id: 7,
      title: 'Senior UX Designer',
      company: 'Design Studio',
      location: 'Remote',
      type: 'Full-Time',
      matchScore: 96,
      salary: '$120k - $150k',
      postedDays: 2,
      companyLogo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=50&h=50&fit=crop',
      tags: ['Figma', 'User Research', 'Prototyping'],
      isBookmarked: false,
      applicationStatus: 'not_started',
      aiReason: 'Perfect match: Your design portfolio and user research experience align exactly with their needs for a senior role.'
    },
    {
      id: 8,
      title: 'UX Designer',
      company: 'TechFlow',
      location: 'San Francisco, CA',
      type: 'Full-Time',
      matchScore: 89,
      salary: '$110k - $130k',
      postedDays: 4,
      companyLogo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=50&h=50&fit=crop',
      tags: ['UI/UX', 'Sketch', 'Agile'],
      isBookmarked: true,
      applicationStatus: 'not_started',
      aiReason: 'Strong match: Your experience with design systems and agile methodologies fits their collaborative environment.'
    }
  ]
};

const categoryButtons = [
  'Tech', 'Marketing', 'Design', 'Sales', 'HR', 'Finance', 'Operations', 'Healthcare'
];

interface CandidateJobSearchesPageProps {
  activeTab?: string;
}

export function CandidateJobSearchesPage({ activeTab = 'overview' }: CandidateJobSearchesPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'card'>('list');
  const [sortBy, setSortBy] = useState('match');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isOpenToWork, setIsOpenToWork] = useState(true);
  const [profileCompletion] = useState(78);
  const [jobSearchStatus, setJobSearchStatus] = useState(true);
  const [savedJobsFilter, setSavedJobsFilter] = useState<'all' | 'deadline'>('all');
  const [jobTypeFilters, setJobTypeFilters] = useState<string[]>(['Full Time', 'Freelance']);

  const toggleBookmark = (jobId: number) => {
    console.log('Toggle bookmark for job:', jobId);
  };

  const applyToJob = (jobId: number) => {
    console.log('Apply to job:', jobId);
  };

  const getFilteredJobs = () => {
    let jobs = mockJobSearchResults;
    
    if (searchQuery) {
      jobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    if (selectedCategory && selectedCategory !== 'Tech') {
      jobs = jobs.filter(job => job.tags.some(tag => tag.toLowerCase().includes(selectedCategory.toLowerCase())));
    }
    
    return jobs.sort((a, b) => {
      switch (sortBy) {
        case 'salary':
          return parseInt(b.salary.replace(/[^0-9]/g, '')) - parseInt(a.salary.replace(/[^0-9]/g, ''));
        case 'newest':
          return a.postedDays - b.postedDays;
        case 'match':
        default:
          return b.matchScore - a.matchScore;
      }
    });
  };

  const getFilteredSavedJobs = () => {
    let jobs = mockSavedJobs;
    
    if (savedJobsFilter === 'deadline') {
      jobs = jobs.filter(job => job.deadline);
    }
    
    return jobs;
  };

  const renderJobCard = (job: JobMatch, showAIReason = false) => {
    const isDeadlineSoon = job.deadline && new Date(job.deadline) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    
    return (
      <Card key={job.id} className="hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          {isDeadlineSoon && (
            <div className="mb-4 p-2 bg-orange-50 border border-orange-200 rounded text-sm text-orange-800">
              <AlertCircle className="h-4 w-4 inline mr-1" />
              Application deadline approaching: {job.deadline}
            </div>
          )}
          
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src={job.companyLogo} alt={job.company} />
                <AvatarFallback>{job.company[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-lg">{job.title}</h3>
                <p className="text-muted-foreground">{job.company}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="h-3 w-3" />
                    {job.type}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {job.postedDays}d ago
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge className={`${job.matchScore >= 90 ? 'bg-green-100 text-green-800' : job.matchScore >= 80 ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
                <Star className="h-3 w-3 mr-1" />
                {job.matchScore}% Match
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleBookmark(job.id)}
                className={job.isBookmarked ? 'text-red-600' : ''}
              >
                <Heart className={`h-4 w-4 ${job.isBookmarked ? 'fill-current' : ''}`} />
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {job.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="font-semibold text-lg">{job.salary}</div>
            {job.applicationStatus !== 'not_started' && (
              <Badge variant="outline">
                {job.applicationStatus === 'applied' && 'Applied'}
                {job.applicationStatus === 'interviewing' && 'Interviewing'}
                {job.applicationStatus === 'rejected' && 'Not Selected'}
              </Badge>
            )}
          </div>

          {showAIReason && job.aiReason && (
            <div className="mb-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="flex items-start gap-2">
                <Sparkles className="h-4 w-4 text-purple-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-purple-900 text-sm mb-1">Why we matched you</h4>
                  <p className="text-sm text-purple-800">{job.aiReason}</p>
                </div>
              </div>
            </div>
          )}

          {job.note && (
            <div className="mb-4 p-2 bg-blue-50 border border-blue-200 rounded text-sm text-blue-800">
              <strong>Note:</strong> {job.note}
            </div>
          )}

          <div className="flex gap-2">
            <Button onClick={() => applyToJob(job.id)} disabled={job.applicationStatus === 'applied'}>
              {job.applicationStatus === 'applied' ? 'Applied' : 'Apply'}
            </Button>
            <Button variant="outline">
              Save
            </Button>
            <Button variant="outline">
              View Details
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
            {activeTab === 'saved-jobs' && (
              <Button variant="ghost" size="sm">
                Remove
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderOverviewTab = () => (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Status Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold">8</h3>
                <p className="text-sm text-muted-foreground">Applications</p>
                <p className="text-xs text-green-600">3 in progress</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold">2</h3>
                <p className="text-sm text-muted-foreground">Interviews</p>
                <p className="text-xs text-green-600">1 upcoming</p>
              </div>
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold">23</h3>
                <p className="text-sm text-muted-foreground">Waiting for Response</p>
                <p className="text-xs text-orange-600">+5 new today</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Profile Completion */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Completion
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Profile completeness</span>
            <span className="font-semibold">{profileCompletion}%</span>
          </div>
          <Progress value={profileCompletion} className="h-2" />
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Complete Missing Fields
          </Button>
        </CardContent>
      </Card>

      {/* AI-Recommended Matches */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              AI-Recommended Matches
            </div>
            <Settings className="h-5 w-5 text-muted-foreground cursor-pointer" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {mockSmartMatches.slice(0, 3).map(job => (
                <div key={job.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={job.companyLogo} alt={job.company} />
                      <AvatarFallback>{job.company[0]}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium text-sm truncate">{job.title}</h4>
                      <p className="text-xs text-muted-foreground">{job.company}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 text-xs">
                      {job.matchScore}%
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">{job.location} • {job.salary}</p>
                  <div className="flex gap-2">
                    <Button size="sm" className="text-xs">Apply</Button>
                    <Button size="sm" variant="outline" className="text-xs">Save</Button>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full">
              <ArrowUpRight className="h-4 w-4 mr-2" />
              View All Smart Matches
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Career Goals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Career Goals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium">Senior Frontend Developer</p>
                <p className="text-sm text-muted-foreground">Target role in the next 12 months</p>
              </div>
            </div>
            <Separator />
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <BookOpen className="h-4 w-4 mr-2" />
                Update Goals
              </Button>
              <Button size="sm" variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Set Timeline
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSmartMatchesTab = () => (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header with View Toggle */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-xl mb-1">Best Matches for You</h2>
          <p className="text-sm text-muted-foreground">AI-powered job recommendations based on your profile</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 border rounded-lg p-1">
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'card' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('card')}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {/* Job Matches */}
      <div className="space-y-4">
        {mockSmartMatches.map(job => renderJobCard(job, true))}
      </div>
    </div>
  );

  const renderJobSearchTab = () => (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Search Bar */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs, companies, skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 text-base h-12"
              />
            </div>

            {/* Category Buttons */}
            <div className="flex flex-wrap gap-2">
              {categoryButtons.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(selectedCategory === category ? '' : category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">
            {getFilteredJobs().length} jobs found
          </h3>
          <p className="text-sm text-muted-foreground">
            Showing results {selectedCategory ? `in ${selectedCategory}` : 'across all categories'}
          </p>
        </div>
        
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="match">Best Match</SelectItem>
            <SelectItem value="salary">Highest Salary</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Job Results */}
      <div className="grid gap-4">
        {getFilteredJobs().map(job => renderJobCard(job))}
      </div>

      {getFilteredJobs().length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-semibold mb-2">No jobs found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search terms or exploring different categories
            </p>
            <Button onClick={() => setSearchQuery('')}>
              Clear Search
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderJobFocusTab = () => (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Focus Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">{jobFocusData.focusArea}</h1>
        <div className="flex justify-center gap-2">
          {jobFocusData.jobType.map(type => (
            <Badge key={type} variant="secondary" className="px-3 py-1">
              {type}
            </Badge>
          ))}
        </div>
      </div>

      {/* Job Type Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <h3 className="font-medium">Job Type</h3>
            <div className="flex gap-4">
              {['Full Time', 'Freelance'].map(type => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={type}
                    checked={jobTypeFilters.includes(type)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setJobTypeFilters(prev => [...prev, type]);
                      } else {
                        setJobTypeFilters(prev => prev.filter(t => t !== type));
                      }
                    }}
                  />
                  <Label htmlFor={type}>{type}</Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Focused Job Matches */}
      <div className="space-y-4">
        {jobFocusData.matches.map(job => renderJobCard(job, true))}
      </div>
    </div>
  );

  const renderSavedJobsTab = () => (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header with Filter */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-xl mb-1">Saved Jobs</h2>
          <p className="text-sm text-muted-foreground">Jobs you've bookmarked for later</p>
        </div>
        
        <Select value={savedJobsFilter} onValueChange={(value: 'all' | 'deadline') => setSavedJobsFilter(value)}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Jobs</SelectItem>
            <SelectItem value="deadline">Deadline Soon</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Deadline Warning */}
      {getFilteredSavedJobs().some(job => job.deadline && new Date(job.deadline) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)) && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              <div>
                <h4 className="font-medium text-orange-900">Deadlines Approaching</h4>
                <p className="text-sm text-orange-800">Some of your saved jobs have application deadlines within the next week</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Saved Jobs List */}
      <div className="space-y-4">
        {getFilteredSavedJobs().map(job => renderJobCard(job))}
      </div>

      {getFilteredSavedJobs().length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Bookmark className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-semibold mb-2">No saved jobs</h3>
            <p className="text-muted-foreground mb-6">
              {savedJobsFilter === 'deadline' 
                ? "No saved jobs with approaching deadlines" 
                : "Start saving jobs you're interested in to keep track of them"}
            </p>
            <Button variant="outline">
              <Search className="h-4 w-4 mr-2" />
              Browse Jobs
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverviewTab();
      case 'smart-matches':
        return renderSmartMatchesTab();
      case 'job-search':
        return renderJobSearchTab();
      case 'job-focus':
        return renderJobFocusTab();
      case 'saved-jobs':
        return renderSavedJobsTab();
      default:
        return renderOverviewTab();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        {renderTabContent()}
      </div>
    </div>
  );
}