import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { toast } from "sonner@2.0.3";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft,
  MapPin,
  Briefcase,
  Building,
  DollarSign,
  Clock,
  Users,
  Edit,
  Search,
  Filter,
  Star,
  Heart,
  ExternalLink,
  TrendingUp,
  CheckCircle,
  Calendar,
  Target,
  Settings,
  MoreHorizontal,
  Plus,
  X,
  BarChart3,
  Activity,
  Lightbulb,
  AlertCircle,
  Zap,
  Award,
  BookmarkPlus,
  Share,
  EyeOff,
  RefreshCw,
  HelpCircle,
  TrendingDown,
  Info,
  ChevronDown,
  ChevronUp
} from "lucide-react";

interface JobFocusDetailPageProps {
  focusId: string;
  onBack: () => void;
  onEditFocus: () => void;
}

// Enhanced mock data
const mockJobFocusDetail = {
  id: '1',
  title: 'Senior Frontend Developer',
  description: 'Focus on senior-level frontend development roles with modern technologies and competitive compensation',
  active: true,
  createdDate: '2024-01-15',
  lastUpdated: '2024-01-20',
  healthScore: 85,
  criteria: {
    location: ['San Francisco, CA', 'Remote', 'New York, NY'],
    workMode: ['Remote', 'Hybrid'],
    companySize: ['51-200', '201-1000', '1000+'],
    role: 'Frontend Developer',
    seniority: 'Senior',
    industry: ['Technology', 'SaaS', 'E-commerce'],
    salaryRange: { min: 140000, max: 200000 },
    experienceYears: '5+ years',
    requiredSkills: ['React', 'TypeScript', 'JavaScript', 'CSS/SCSS'],
    preferredSkills: ['Next.js', 'Redux', 'GraphQL', 'Testing'],
    benefits: ['Health Insurance', 'Remote Work', 'Equity']
  },
  matchingJobs: [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'TechFlow Inc.',
      companyLogo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=150&h=150&fit=crop',
      location: 'San Francisco, CA',
      salary: '$150k - $180k',
      matchPercentage: 95,
      skills: ['React', 'TypeScript', 'Next.js'],
      postedDate: '2024-01-20',
      jobType: 'Full-time',
      companySize: '201-1000',
      workMode: 'Hybrid',
      matchReasons: ['Perfect skill alignment', 'Ideal salary range', 'Preferred location'],
      isNew: true
    },
    {
      id: '2',
      title: 'React Developer',
      company: 'InnovateLab',
      companyLogo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=150&h=150&fit=crop',
      location: 'Remote',
      salary: '$140k - $170k',
      matchPercentage: 92,
      skills: ['React', 'Node.js', 'AWS'],
      postedDate: '2024-01-19',
      jobType: 'Full-time',
      companySize: '51-200',
      workMode: 'Remote',
      matchReasons: ['Strong React skills', 'Remote work available', 'Growing company'],
      isNew: true
    },
    {
      id: '3',
      title: 'Senior UI Developer',
      company: 'DesignCorp',
      companyLogo: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=150&h=150&fit=crop',
      location: 'New York, NY',
      salary: '$160k - $200k',
      matchPercentage: 90,
      skills: ['React', 'TypeScript', 'CSS'],
      postedDate: '2024-01-18',
      jobType: 'Full-time',
      companySize: '1000+',
      workMode: 'Hybrid',
      matchReasons: ['Senior level match', 'High compensation', 'Large company stability'],
      isNew: false
    }
  ],
  stats: {
    totalMatches: 24,
    newThisWeek: 8,
    averageMatch: 87,
    appliedCount: 3
  },
  suggestions: [
    {
      type: 'location',
      title: 'Consider adding Seattle, WA',
      description: '200+ jobs available that match 80% of your skills',
      impact: '+30% opportunities'
    },
    {
      type: 'skills',
      title: 'Add Vue.js to preferred skills',
      description: 'Growing demand in your target companies',
      impact: '+15% matches'
    },
    {
      type: 'salary',
      title: 'Expand salary range to $130k+',
      description: 'Include more early-stage companies with equity',
      impact: '+25% opportunities'
    }
  ],
  marketInsights: {
    averageSalary: 165000,
    salaryGrowth: 12,
    jobGrowth: 15,
    competitionLevel: 'Moderate',
    topSkillsInDemand: [
      { skill: 'React', demand: 95, growth: 5 },
      { skill: 'TypeScript', demand: 85, growth: 15 },
      { skill: 'Next.js', demand: 65, growth: 25 },
      { skill: 'GraphQL', demand: 45, growth: 30 }
    ],
    industryTrends: [
      { trend: 'Remote work increasing', impact: 'positive' },
      { trend: 'AI integration in workflows', impact: 'neutral' },
      { trend: 'Micro-frontend adoption', impact: 'positive' }
    ]
  }
};

export function JobFocusDetailPage({ focusId, onBack, onEditFocus }: JobFocusDetailPageProps) {
  const [activeTab, setActiveTab] = useState('matches');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('match');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [expandedCriteria, setExpandedCriteria] = useState<Set<string>>(new Set());
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingCriterion, setEditingCriterion] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-100 text-green-800 border-green-200';
    if (percentage >= 80) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (percentage >= 70) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getHealthScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Needs Improvement';
  };

  const handleStatClick = (statType: string) => {
    switch (statType) {
      case 'newThisWeek':
        setSelectedFilters(['new']);
        toast.success("Showing jobs from this week");
        break;
      case 'applied':
        setSelectedFilters(['applied']);
        toast.success("Showing applied jobs");
        break;
      default:
        setSelectedFilters([]);
    }
  };

  const handleSaveJob = (jobId: string) => {
    toast.success("Job saved to your list");
  };

  const handleApplySuggestion = (suggestionIndex: number) => {
    const suggestion = mockJobFocusDetail.suggestions[suggestionIndex];
    toast.success(`Applied suggestion: ${suggestion.title}`);
  };

  const toggleCriteriaExpansion = (criterion: string) => {
    const newExpanded = new Set(expandedCriteria);
    if (newExpanded.has(criterion)) {
      newExpanded.delete(criterion);
    } else {
      newExpanded.add(criterion);
    }
    setExpandedCriteria(newExpanded);
  };

  const EmptyJobsState = () => (
    <div className="text-center py-12">
      <Target className="h-16 w-16 mx-auto text-gray-400 mb-4" />
      <h3 className="text-lg font-semibold mb-2">No matching jobs found</h3>
      <p className="text-muted-foreground mb-6">
        Try refining your focus criteria to discover new opportunities.
      </p>
      <Button onClick={() => setActiveTab('criteria')}>
        <Settings className="h-4 w-4 mr-2" />
        Refine Criteria
      </Button>
    </div>
  );

  return (
    <TooltipProvider>
      <div className="max-w-7xl mx-auto p-6">
        {/* Enhanced Header */}
        <div className="flex items-center justify-between mb-6 pb-6 border-b">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-2xl font-semibold">{mockJobFocusDetail.title}</h1>
                
                {/* Focus Health Score */}
                <div className="flex items-center space-x-2">
                  <div className={`flex items-center space-x-1 ${getHealthScoreColor(mockJobFocusDetail.healthScore)}`}>
                    <Activity className="h-5 w-5" />
                    <span className="font-semibold">{mockJobFocusDetail.healthScore}%</span>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge variant="outline" className={getHealthScoreColor(mockJobFocusDetail.healthScore)}>
                          {getHealthScoreLabel(mockJobFocusDetail.healthScore)}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="space-y-1">
                          <p className="font-medium">Focus Health Score</p>
                          <p className="text-sm">Based on criteria strength and market availability</p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-2">{mockJobFocusDetail.description}</p>
              
              {/* Created/Updated Dates */}
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Created {formatDate(mockJobFocusDetail.createdDate)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <RefreshCw className="h-4 w-4" />
                  <span>Updated {formatDate(mockJobFocusDetail.lastUpdated)}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Badge variant={mockJobFocusDetail.active ? "default" : "secondary"} className="px-3 py-1">
              {mockJobFocusDetail.active ? 'Active' : 'Inactive'}
            </Badge>
            <Button variant="outline" size="sm" onClick={onEditFocus}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Focus
            </Button>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card 
            className="cursor-pointer hover:shadow-md transition-shadow" 
            onClick={() => handleStatClick('total')}
          >
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <Target className="h-6 w-6 text-blue-600 mr-2" />
                <div className="text-3xl font-bold text-blue-600">
                  {mockJobFocusDetail.stats.totalMatches}
                </div>
              </div>
              <div className="text-sm text-muted-foreground">Total Matches</div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-gray-400 mx-auto mt-1" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Jobs that match at least 70% of your criteria</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-md transition-shadow" 
            onClick={() => handleStatClick('newThisWeek')}
          >
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <Zap className="h-6 w-6 text-green-600 mr-2" />
                <div className="text-3xl font-bold text-green-600">
                  {mockJobFocusDetail.stats.newThisWeek}
                </div>
              </div>
              <div className="text-sm text-muted-foreground">New This Week</div>
              {mockJobFocusDetail.stats.newThisWeek === 0 && (
                <div className="mt-1 text-xs text-orange-600">
                  Try broadening criteria
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <BarChart3 className="h-6 w-6 text-purple-600 mr-2" />
                <div className="text-3xl font-bold text-purple-600">
                  {mockJobFocusDetail.stats.averageMatch}%
                </div>
              </div>
              <div className="text-sm text-muted-foreground">Avg Match Score</div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-gray-400 mx-auto mt-1" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Average match percentage across all recommendations</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-md transition-shadow" 
            onClick={() => handleStatClick('applied')}
          >
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <CheckCircle className="h-6 w-6 text-orange-600 mr-2" />
                <div className="text-3xl font-bold text-orange-600">
                  {mockJobFocusDetail.stats.appliedCount}
                </div>
              </div>
              <div className="text-sm text-muted-foreground">Applied</div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Tab Navigation */}
        <div className="mb-8">
          <div className="border-b">
            <nav className="flex space-x-8">
              {[
                { 
                  id: 'matches', 
                  label: 'Matching Jobs', 
                  count: mockJobFocusDetail.matchingJobs.length,
                  icon: Target 
                },
                { 
                  id: 'criteria', 
                  label: 'Focus Criteria', 
                  count: Object.keys(mockJobFocusDetail.criteria).length,
                  icon: Settings 
                },
                { 
                  id: 'insights', 
                  label: 'Market Insights', 
                  count: 3,
                  icon: TrendingUp 
                }
              ].map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? 'border-primary text-primary'
                        : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span>{tab.label}</span>
                    <Badge variant="secondary" className="text-xs ml-1">
                      {tab.count}
                    </Badge>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Enhanced Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'matches' && (
            <motion.div
              key="matches"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Enhanced Search and Filter Bar */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                          type="text"
                          placeholder="Search matching jobs..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-9 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-80"
                        />
                      </div>
                      
                      {/* Quick Filters */}
                      <div className="flex items-center space-x-2">
                        <Button
                          variant={selectedFilters.includes('remote') ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => {
                            const newFilters = selectedFilters.includes('remote') 
                              ? selectedFilters.filter(f => f !== 'remote')
                              : [...selectedFilters, 'remote'];
                            setSelectedFilters(newFilters);
                          }}
                        >
                          Show only Remote
                        </Button>
                        <Button
                          variant={selectedFilters.includes('highMatch') ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => {
                            const newFilters = selectedFilters.includes('highMatch') 
                              ? selectedFilters.filter(f => f !== 'highMatch')
                              : [...selectedFilters, 'highMatch'];
                            setSelectedFilters(newFilters);
                          }}
                        >
                          85%+ Match
                        </Button>
                      </div>
                      
                      <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 mr-2" />
                        Advanced Filters
                      </Button>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-muted-foreground">Sort by:</span>
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="match">Match Score</SelectItem>
                          <SelectItem value="date">Date Posted</SelectItem>
                          <SelectItem value="salary">Salary Range</SelectItem>
                          <SelectItem value="company">Company Size</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Job Listings */}
              {mockJobFocusDetail.matchingJobs.length > 0 ? (
                <div className="space-y-4">
                  {mockJobFocusDetail.matchingJobs.map((job) => (
                    <Card key={job.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4 flex-1">
                            <Avatar className="w-14 h-14">
                              <AvatarImage src={job.companyLogo} alt={job.company} />
                              <AvatarFallback>{job.company.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-3">
                                <div>
                                  <div className="flex items-center space-x-2">
                                    <h3 className="font-semibold text-lg">{job.title}</h3>
                                    {job.isNew && (
                                      <Badge variant="default" className="bg-green-100 text-green-800 text-xs">
                                        New
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-muted-foreground">{job.company}</p>
                                </div>
                                
                                <div className="flex items-center space-x-3">
                                  <Badge className={`text-lg px-4 py-2 border-2 ${getMatchColor(job.matchPercentage)}`}>
                                    <Star className="h-4 w-4 mr-2" />
                                    {job.matchPercentage}%
                                  </Badge>
                                  
                                  <div className="flex items-center space-x-1">
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button variant="ghost" size="sm" onClick={() => handleSaveJob(job.id)}>
                                            <BookmarkPlus className="h-4 w-4" />
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>Save Job</TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                    
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button variant="ghost" size="sm">
                                            <Share className="h-4 w-4" />
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>Share Job</TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  </div>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground mb-4">
                                <div className="flex items-center">
                                  <MapPin className="h-4 w-4 mr-2" />
                                  {job.location}
                                </div>
                                <div className="flex items-center">
                                  <DollarSign className="h-4 w-4 mr-2" />
                                  {job.salary}
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-2" />
                                  {formatDate(job.postedDate)}
                                </div>
                                <div className="flex items-center">
                                  <Users className="h-4 w-4 mr-2" />
                                  {job.companySize} employees
                                </div>
                              </div>

                              <div className="flex flex-wrap gap-2 mb-4">
                                {job.skills.map((skill, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                                <Badge variant="outline" className="text-xs">
                                  {job.workMode}
                                </Badge>
                              </div>

                              {/* Enhanced Why This Job Matches Section */}
                              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                                <h4 className="font-medium text-blue-900 mb-2">Why this job matches your criteria</h4>
                                <div className="space-y-1">
                                  {job.matchReasons.map((reason, index) => (
                                    <div key={index} className="flex items-center text-sm text-blue-800">
                                      <CheckCircle className="h-4 w-4 mr-2 text-blue-600 flex-shrink-0" />
                                      {reason}
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <Button className="bg-blue-600 hover:bg-blue-700">
                                    Apply Now
                                  </Button>
                                  <Button variant="outline">
                                    <ExternalLink className="h-4 w-4 mr-2" />
                                    View Details
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <EmptyJobsState />
              )}
            </motion.div>
          )}

          {activeTab === 'criteria' && (
            <motion.div
              key="criteria"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Suggested Expansions */}
              {showSuggestions && (
                <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-2">
                        <Lightbulb className="h-5 w-5 text-yellow-600" />
                        <span>Suggested Expansions</span>
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowSuggestions(false)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockJobFocusDetail.suggestions.map((suggestion, index) => (
                        <div key={index} className="flex items-start justify-between p-4 bg-white rounded-lg border">
                          <div className="flex-1">
                            <h4 className="font-medium mb-1">{suggestion.title}</h4>
                            <p className="text-sm text-muted-foreground mb-2">{suggestion.description}</p>
                            <Badge variant="outline" className="text-xs text-green-700 bg-green-50">
                              {suggestion.impact}
                            </Badge>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleApplySuggestion(index)}
                          >
                            Apply
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Enhanced Criteria Display */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Current Search Criteria</CardTitle>
                    <Button variant="outline" onClick={() => setShowEditDialog(true)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit All Criteria
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Location */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span>Location Preferences</span>
                        </h4>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary" className="text-xs">
                            Very competitive
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingCriterion('location')}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {mockJobFocusDetail.criteria.location.map((location, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <span className="text-sm">{location}</span>
                            </div>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Work Mode */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium flex items-center space-x-2">
                          <Building className="h-4 w-4" />
                          <span>Work Mode</span>
                        </h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingCriterion('workMode')}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {mockJobFocusDetail.criteria.workMode.map((mode, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <span className="text-sm">{mode}</span>
                            </div>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="space-y-3 col-span-full">
                      <h4 className="font-medium flex items-center space-x-2">
                        <Award className="h-4 w-4" />
                        <span>Skills & Technologies</span>
                      </h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium text-sm text-gray-700 mb-3">Required Skills</h5>
                          <div className="flex flex-wrap gap-2">
                            {mockJobFocusDetail.criteria.requiredSkills.map((skill, index) => (
                              <Badge key={index} variant="default" className="text-xs">
                                {skill}
                                <button className="ml-2 hover:bg-white hover:bg-opacity-20 rounded">
                                  <X className="h-3 w-3" />
                                </button>
                              </Badge>
                            ))}
                            <Button variant="outline" size="sm" className="h-6">
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        <div>
                          <h5 className="font-medium text-sm text-gray-700 mb-3">Preferred Skills</h5>
                          <div className="flex flex-wrap gap-2">
                            {mockJobFocusDetail.criteria.preferredSkills.map((skill, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {skill}
                                <button className="ml-2 hover:bg-gray-200 rounded">
                                  <X className="h-3 w-3" />
                                </button>
                              </Badge>
                            ))}
                            <Button variant="outline" size="sm" className="h-6">
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Salary and Experience */}
                  <div className="mt-6 pt-6 border-t">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <h4 className="font-medium flex items-center space-x-2">
                          <DollarSign className="h-4 w-4" />
                          <span>Salary Range</span>
                        </h4>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                          <span className="text-sm">
                            ${(mockJobFocusDetail.criteria.salaryRange.min / 1000).toFixed(0)}k - 
                            ${(mockJobFocusDetail.criteria.salaryRange.max / 1000).toFixed(0)}k
                          </span>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium flex items-center space-x-2">
                          <Briefcase className="h-4 w-4" />
                          <span>Experience Level</span>
                        </h4>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                          <span className="text-sm">{mockJobFocusDetail.criteria.experienceYears}</span>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium flex items-center space-x-2">
                          <Users className="h-4 w-4" />
                          <span>Seniority</span>
                        </h4>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                          <span className="text-sm">{mockJobFocusDetail.criteria.seniority}</span>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === 'insights' && (
            <motion.div
              key="insights"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Market Trends */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5" />
                      <span>Market Trends</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                        <span>Average Salary</span>
                        <span className="font-semibold">${(mockJobFocusDetail.marketInsights.averageSalary / 1000).toFixed(0)}k</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
                        <span>Salary Growth (YoY)</span>
                        <span className="font-semibold flex items-center text-green-600">
                          <TrendingUp className="h-4 w-4 mr-1" />
                          +{mockJobFocusDetail.marketInsights.salaryGrowth}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-purple-50 rounded">
                        <span>Job Postings (This Month)</span>
                        <span className="font-semibold flex items-center text-green-600">
                          <TrendingUp className="h-4 w-4 mr-1" />
                          +{mockJobFocusDetail.marketInsights.jobGrowth}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-orange-50 rounded">
                        <span>Competition Level</span>
                        <Badge variant="secondary">{mockJobFocusDetail.marketInsights.competitionLevel}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Skills Demand Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BarChart3 className="h-5 w-5" />
                      <span>Skills in Demand</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockJobFocusDetail.marketInsights.topSkillsInDemand.map((skillData, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{skillData.skill}</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-muted-foreground">{skillData.demand}%</span>
                              <Badge 
                                variant={skillData.growth > 20 ? "default" : "secondary"} 
                                className="text-xs"
                              >
                                +{skillData.growth}%
                              </Badge>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                              style={{ width: `${skillData.demand}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Competition Benchmarking */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>Competition Benchmarking</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-orange-600 mb-2">75%</div>
                      <p className="text-sm text-muted-foreground">Your Profile Completion</p>
                      <p className="text-xs text-orange-600 mt-1">Most successful candidates: 90%</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">8.5</div>
                      <p className="text-sm text-muted-foreground">Avg Applications per Role</p>
                      <p className="text-xs text-green-600 mt-1">Below market average</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">72%</div>
                      <p className="text-sm text-muted-foreground">Interview Success Rate</p>
                      <p className="text-xs text-blue-600 mt-1">Above average</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Focus Performance Scorecard */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5" />
                    <span>Focus Performance Scorecard</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-6">
                    <div className={`text-4xl font-bold mb-4 ${getHealthScoreColor(mockJobFocusDetail.healthScore)}`}>
                      {mockJobFocusDetail.healthScore}%
                    </div>
                    <p className="text-lg font-medium mb-2">
                      {getHealthScoreLabel(mockJobFocusDetail.healthScore)} Focus Health
                    </p>
                    <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                      Your focus criteria are well-defined and generating high-quality matches. 
                      Consider broadening location preferences to increase opportunities by 30%.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="p-4 bg-green-50 rounded-lg">
                        <div className="flex items-center justify-center mb-2">
                          <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                          <span className="font-medium">Strengths</span>
                        </div>
                        <ul className="text-sm text-green-800 space-y-1">
                          <li>• High match quality (87% avg)</li>
                          <li>• Clear skill requirements</li>
                          <li>• Realistic salary expectations</li>
                        </ul>
                      </div>
                      
                      <div className="p-4 bg-orange-50 rounded-lg">
                        <div className="flex items-center justify-center mb-2">
                          <AlertCircle className="h-5 w-5 text-orange-600 mr-2" />
                          <span className="font-medium">Opportunities</span>
                        </div>
                        <ul className="text-sm text-orange-800 space-y-1">
                          <li>• Limited location range</li>
                          <li>• Could add emerging skills</li>
                          <li>• Consider mid-size companies</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Opportunity Forecast */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>Opportunity Forecast</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center mb-2">
                        <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
                        <span className="font-medium text-blue-900">Next Quarter Outlook</span>
                      </div>
                      <p className="text-blue-800">
                        Expected 15% growth in frontend developer jobs, particularly in React and TypeScript roles.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {mockJobFocusDetail.marketInsights.industryTrends.map((trend, index) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <div className="flex items-center mb-1">
                            {trend.impact === 'positive' && <TrendingUp className="h-4 w-4 text-green-600 mr-2" />}
                            {trend.impact === 'negative' && <TrendingDown className="h-4 w-4 text-red-600 mr-2" />}
                            {trend.impact === 'neutral' && <Activity className="h-4 w-4 text-gray-600 mr-2" />}
                            <span className="text-sm font-medium">{trend.trend}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Action Button */}
        <Button
          className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg"
          onClick={() => setActiveTab('criteria')}
        >
          <Settings className="h-6 w-6" />
        </Button>
      </div>
    </TooltipProvider>
  );
}