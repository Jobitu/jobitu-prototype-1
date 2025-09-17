import { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { EnhancedJobSearchSort } from "./EnhancedJobSearchSort";
import { JobSearchFiltersDialog, MultiStepSearchWizard } from "./JobSearchFiltersDialog";
import { toast } from "sonner@2.0.3";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search,
  MapPin,
  Briefcase,
  Filter,
  Grid3X3,
  List,
  Heart,
  ExternalLink,
  DollarSign,
  Clock,
  Building,
  Star,
  ChevronDown,
  X,
  Eye,
  Bookmark,
  Wand2,
  ArrowRight,
  Users,
  FileText,
  Loader2,
  Sparkles,
  Award,
  Zap
} from "lucide-react";

interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  salary: string;
  matchPercentage?: number;
  skills: string[];
  postedDate: string;
  jobType: string;
  applied?: boolean;
  saved?: boolean;
  description: string;
  benefits?: string[];
  teamSize?: string;
  experience?: string;
}

const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechFlow Inc.',
    companyLogo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=150&h=150&fit=crop',
    location: 'San Francisco, CA',
    salary: '$140k - $180k',
    matchPercentage: 95,
    skills: ['React', 'TypeScript', 'Next.js', 'GraphQL'],
    postedDate: '2024-01-20',
    jobType: 'Full-time',
    description: 'Join our engineering team to build next-generation web applications...',
    benefits: ['Health Insurance', 'Dental', '401k Match', 'Remote Work', 'Unlimited PTO'],
    teamSize: '8-12 engineers',
    experience: '5+ years'
  },
  {
    id: '2',
    title: 'React Developer',
    company: 'InnovateLab',
    companyLogo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=150&h=150&fit=crop',
    location: 'Remote',
    salary: '$130k - $160k',
    matchPercentage: 92,
    skills: ['React', 'Node.js', 'AWS', 'Docker'],
    postedDate: '2024-01-19',
    jobType: 'Full-time',
    description: 'Build scalable applications with our distributed team...',
    benefits: ['Health Insurance', 'Stock Options', 'Learning Budget', 'Home Office Setup'],
    teamSize: '15-20 engineers',
    experience: '3+ years'
  },
  {
    id: '3',
    title: 'Full Stack Engineer',
    company: 'StartupX',
    companyLogo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop',
    location: 'New York, NY',
    salary: '$120k - $155k',
    matchPercentage: 88,
    skills: ['React', 'Python', 'Docker', 'PostgreSQL'],
    postedDate: '2024-01-18',
    jobType: 'Full-time',
    applied: true,
    description: 'Help us scale our platform and mentor junior developers...',
    benefits: ['Equity', 'Health Insurance', 'Catered Meals', 'Gym Membership'],
    teamSize: '5-8 engineers',
    experience: '4+ years'
  },
  {
    id: '4',
    title: 'Frontend Architect',
    company: 'Enterprise Corp',
    companyLogo: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=150&h=150&fit=crop',
    location: 'Austin, TX',
    salary: '$160k - $200k',
    matchPercentage: 85,
    skills: ['React', 'TypeScript', 'Microservices', 'Team Leadership'],
    postedDate: '2024-01-17',
    jobType: 'Full-time',
    description: 'Lead frontend architecture decisions for our enterprise platform...',
    benefits: ['Health Insurance', 'Stock Purchase Plan', 'Sabbatical Program', 'Relocation'],
    teamSize: '25+ engineers',
    experience: '7+ years'
  },
  {
    id: '5',
    title: 'UI Developer',
    company: 'DesignFirst',
    companyLogo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=150&h=150&fit=crop',
    location: 'Los Angeles, CA',
    salary: '$110k - $140k',
    matchPercentage: 82,
    skills: ['React', 'CSS', 'Design Systems', 'Storybook'],
    postedDate: '2024-01-16',
    jobType: 'Full-time',
    description: 'Work closely with our design team to create beautiful interfaces...',
    benefits: ['Health Insurance', 'Creative Budget', 'Flexible Hours', 'Design Tools'],
    teamSize: '6-10 engineers',
    experience: '3+ years'
  },
  {
    id: '6',
    title: 'JavaScript Developer',
    company: 'TechScale',
    companyLogo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop',
    location: 'Seattle, WA',
    salary: '$125k - $150k',
    matchPercentage: 78,
    skills: ['JavaScript', 'Vue.js', 'Node.js', 'MongoDB'],
    postedDate: '2024-01-15',
    jobType: 'Full-time',
    description: 'Join our team building innovative web solutions...',
    benefits: ['Health Insurance', 'Stock Options', 'Conference Budget', 'Remote Days'],
    teamSize: '12-15 engineers',
    experience: '3+ years'
  }
];

interface FindJobsJobSearchPageProps {
  activeSubTab?: string;
  onViewJobDetail?: (jobId: number) => void;
}

export function FindJobsJobSearchPage({ 
  activeSubTab = 'job-search',
  onViewJobDetail
}: FindJobsJobSearchPageProps) {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showWizard, setShowWizard] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());
  const [appliedFilters, setAppliedFilters] = useState<any>(null);
  const [displayedJobs, setDisplayedJobs] = useState<Job[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver>();
  const lastJobElementRef = useCallback((node: HTMLDivElement) => {
    if (isLoadingMore) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreJobs();
      }
    });
    if (node) observer.current.observe(node);
  }, [isLoadingMore, hasMore]);

  // Set mobile view mode on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setViewMode('list');
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize displayed jobs
  useEffect(() => {
    setDisplayedJobs(sortedJobs.slice(0, 6));
    setHasMore(sortedJobs.length > 6);
  }, [sortBy, appliedFilters, searchQuery]);

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
    if (percentage >= 90) return 'bg-green-100 text-green-800 border-green-200';
    if (percentage >= 80) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (percentage >= 70) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const toggleSavedJob = (jobId: string) => {
    const newSavedJobs = new Set(savedJobs);
    if (newSavedJobs.has(jobId)) {
      newSavedJobs.delete(jobId);
      toast.success("Job removed from saved list");
    } else {
      newSavedJobs.add(jobId);
      toast.success("Job saved to your list");
    }
    setSavedJobs(newSavedJobs);
  };

  const handleApplyJob = (jobId: string) => {
    toast.success("Application started");
  };

  const handleApplyFilters = (filters: any) => {
    setAppliedFilters(filters);
    console.log('Applied filters:', filters);
  };

  const handleNewSearch = (searchCriteria: any) => {
    console.log('New search criteria:', searchCriteria);
    setAppliedFilters(searchCriteria);
  };

  const getActiveFiltersCount = () => {
    if (!appliedFilters) return 0;
    return Object.values(appliedFilters).reduce((count: number, filterArray: any) => {
      if (Array.isArray(filterArray)) {
        return count + filterArray.length;
      }
      return count;
    }, 0);
  };

  const removeActiveFilter = (filterKey: string, value: string) => {
    if (!appliedFilters) return;
    
    const updatedFilters = {
      ...appliedFilters,
      [filterKey]: appliedFilters[filterKey].filter((item: string) => item !== value)
    };
    
    // Remove empty filter arrays
    Object.keys(updatedFilters).forEach(key => {
      if (Array.isArray(updatedFilters[key]) && updatedFilters[key].length === 0) {
        delete updatedFilters[key];
      }
    });

    setAppliedFilters(Object.keys(updatedFilters).length > 0 ? updatedFilters : null);
    toast.success("Filter removed");
  };

  const clearAllFilters = () => {
    setAppliedFilters(null);
    setSearchQuery('');
    toast.success("All filters cleared");
  };

  const loadMoreJobs = async () => {
    if (isLoadingMore || !hasMore) return;
    
    setIsLoadingMore(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const currentLength = displayedJobs.length;
    const nextJobs = sortedJobs.slice(currentLength, currentLength + 6);
    
    setDisplayedJobs(prev => [...prev, ...nextJobs]);
    setHasMore(currentLength + nextJobs.length < sortedJobs.length);
    setIsLoadingMore(false);
  };

  const filteredJobs = mockJobs.filter(job => {
    if (searchQuery && !job.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !job.company.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))) {
      return false;
    }
    // Apply filters if they exist
    if (appliedFilters) {
      if (appliedFilters.location?.length > 0 && 
          !appliedFilters.location.some((loc: string) => job.location.toLowerCase().includes(loc.toLowerCase()))) {
        return false;
      }
      if (appliedFilters.jobType?.length > 0 && !appliedFilters.jobType.includes(job.jobType)) {
        return false;
      }
      if (appliedFilters.skills?.length > 0 && 
          !appliedFilters.skills.some((skill: string) => job.skills.includes(skill))) {
        return false;
      }
    }
    return true;
  });

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    switch (sortBy) {
      case 'relevance':
        return (b.matchPercentage || 0) - (a.matchPercentage || 0);
      case 'ai-recommended':
        // AI-based sorting - could incorporate multiple factors
        const aScore = (a.matchPercentage || 0) + (savedJobs.has(a.id) ? 10 : 0);
        const bScore = (b.matchPercentage || 0) + (savedJobs.has(b.id) ? 10 : 0);
        return bScore - aScore;
      case 'newest':
        return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
      case 'salary-high':
        const aMax = parseInt(a.salary.split(' - ')[1].replace(/[^0-9]/g, ''));
        const bMax = parseInt(b.salary.split(' - ')[1].replace(/[^0-9]/g, ''));
        return bMax - aMax;
      case 'salary-low':
        const aMin = parseInt(a.salary.split(' - ')[0].replace(/[^0-9]/g, ''));
        const bMin = parseInt(b.salary.split(' - ')[0].replace(/[^0-9]/g, ''));
        return aMin - bMin;
      case 'company-size':
        return b.company.localeCompare(a.company);
      case 'location':
        return a.location.localeCompare(b.location);
      case 'trending':
        return (b.matchPercentage || 0) - (a.matchPercentage || 0);
      default:
        return 0;
    }
  });

  // Empty state component
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-64 h-64 mb-8 opacity-50">
        <FileText className="w-full h-full text-gray-300" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs match your search</h3>
      <p className="text-gray-600 text-center mb-6 max-w-md">
        Try adjusting your search terms or filters to discover more opportunities.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <Button variant="outline" onClick={clearAllFilters}>
          Reset Filters
        </Button>
        <Button onClick={() => setShowWizard(true)}>
          Try Smart Search
        </Button>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-2">Try searching for:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {['Frontend Developer', 'Product Manager', 'Data Scientist', 'UX Designer'].map((term) => (
            <Button
              key={term}
              variant="ghost"
              size="sm"
              onClick={() => setSearchQuery(term)}
              className="text-xs bg-gray-100 hover:bg-gray-200 rounded-full"
            >
              {term}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );

  const JobCard = ({ job, index }: { job: Job; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      ref={index === displayedJobs.length - 1 ? lastJobElementRef : null}
    >
      <Card className="border border-gray-200 hover:shadow-md transition-all duration-200 hover:translate-y-[-2px]">
        <CardContent className="p-5">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3 flex-1">
              <Avatar className="w-10 h-10">
                <AvatarImage 
                  src={job.companyLogo} 
                  alt={job.company}
                  loading="lazy"
                />
                <AvatarFallback>{job.company.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-base">{job.title}</h3>
                <p className="text-sm text-muted-foreground">{job.company}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {job.matchPercentage && (
                <Badge className={`text-xs border ${getMatchColor(job.matchPercentage)}`}>
                  <Star className="h-3 w-3 mr-1" />
                  {job.matchPercentage}% match
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleSavedJob(job.id)}
                className="p-1"
              >
                <Heart 
                  className={`h-4 w-4 ${savedJobs.has(job.id) ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'}`} 
                />
              </Button>
            </div>
          </div>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-2" />
              {job.location}
              <Building className="h-4 w-4 ml-4 mr-2" />
              {job.jobType}
              <Clock className="h-4 w-4 ml-4 mr-2" />
              {formatDate(job.postedDate)}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <DollarSign className="h-4 w-4 mr-2" />
              {job.salary}
              {job.teamSize && (
                <>
                  <Users className="h-4 w-4 ml-4 mr-2" />
                  {job.teamSize}
                </>
              )}
              {job.experience && (
                <>
                  <Briefcase className="h-4 w-4 ml-4 mr-2" />
                  {job.experience}
                </>
              )}
            </div>
            
            {/* Key benefits row */}
            {job.benefits && job.benefits.length > 0 && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Award className="h-4 w-4 mr-2" />
                <span>{job.benefits.slice(0, 2).join(', ')}</span>
                {job.benefits.length > 2 && (
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full ml-2">
                    +{job.benefits.length - 2} more
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {job.skills.slice(0, 4).map((skill, skillIndex) => (
              <Badge key={skillIndex} variant="secondary" className="text-xs">{skill}</Badge>
            ))}
            {job.skills.length > 4 && (
              <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                +{job.skills.length - 4} more
              </Badge>
            )}
          </div>

          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {job.description}
          </p>

          <div className="flex items-center space-x-3">
            {job.applied ? (
              <Badge className="bg-gray-100 text-gray-800 flex-1 justify-center py-2">
                Applied
              </Badge>
            ) : (
              <Button 
                className="bg-blue-600 hover:bg-blue-700 flex-1"
                onClick={() => handleApplyJob(job.id)}
              >
                Apply Now
              </Button>
            )}
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => onViewJobDetail?.(parseInt(job.id))}
            >
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-semibold">Job Search</h1>
              <p className="text-muted-foreground mt-1">Find your perfect role with our comprehensive search</p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Button 
                variant="outline" 
                onClick={() => setShowWizard(true)}
                className="flex items-center"
              >
                <Wand2 className="h-4 w-4 mr-2" />
                Smart Search Wizard
              </Button>
              <div className="flex items-center space-x-2">
                <div className="flex items-center border rounded-lg">
                  <Button 
                    variant={viewMode === 'list' ? 'default' : 'ghost'} 
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-r-none border-0"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant={viewMode === 'grid' ? 'default' : 'ghost'} 
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-l-none border-0"
                    disabled={window.innerWidth < 768}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setShowFilters(true)}
                  className="flex items-center"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  {getActiveFiltersCount() > 0 && (
                    <Badge variant="secondary" className="ml-2 px-1 py-0 text-xs">
                      {getActiveFiltersCount()}
                    </Badge>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by job title, company, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
            />
          </div>

          {/* Active Filters */}
          {getActiveFiltersCount() > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-gray-600">Active filters:</span>
                {appliedFilters && Object.entries(appliedFilters).map(([key, values]) => {
                  if (Array.isArray(values) && values.length > 0) {
                    return values.map((value: string) => (
                      <Badge 
                        key={`${key}-${value}`} 
                        variant="secondary" 
                        className="text-xs flex items-center gap-1"
                      >
                        {value}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-3 w-3 p-0 hover:bg-transparent"
                          onClick={() => removeActiveFilter(key, value)}
                        >
                          <X className="h-2 w-2" />
                        </Button>
                      </Badge>
                    ));
                  }
                  return null;
                })}
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-xs text-red-600 hover:text-red-700 h-6 px-2"
                >
                  Clear all
                </Button>
              </div>
            </div>
          )}

          {/* Quick Search Suggestions */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-600">Popular searches:</span>
            {['Frontend Developer', 'Product Manager', 'Data Scientist', 'UX Designer', 'Backend Engineer'].map((term) => (
              <Button
                key={term}
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery(term)}
                className="h-7 px-3 text-xs bg-gray-100 hover:bg-gray-200 rounded-full"
              >
                {term}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Sort Component */}
      <div className="px-6">
        <div className="max-w-6xl mx-auto">
          <EnhancedJobSearchSort
            activeSort={sortBy}
            onSortChange={setSortBy}
            resultCount={sortedJobs.length}
            appliedFiltersCount={getActiveFiltersCount()}
            showAIRecommended={true}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-6xl mx-auto">
          {sortedJobs.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <div className={`${viewMode === 'grid' && window.innerWidth >= 768 ? 'grid grid-cols-1 lg:grid-cols-2 gap-6' : 'space-y-4'}`}>
                {displayedJobs.map((job, index) => (
                  <JobCard key={job.id} job={job} index={index} />
                ))}
              </div>

              {/* Infinite scroll loading indicator */}
              {isLoadingMore && (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin mr-2" />
                  <span className="text-gray-600">Loading more jobs...</span>
                </div>
              )}

              {/* Load More Button (fallback for infinite scroll) */}
              {!isLoadingMore && hasMore && displayedJobs.length >= 6 && (
                <div className="flex justify-center mt-8">
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={loadMoreJobs}
                  >
                    Load More Jobs
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              )}

              {!hasMore && displayedJobs.length > 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-600">You've reached the end of the results</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Enhanced Filter Dialog */}
      <JobSearchFiltersDialog
        open={showFilters}
        onOpenChange={setShowFilters}
        onApplyFilters={handleApplyFilters}
        isMobile={window.innerWidth < 768}
      />

      {/* Multi-Step Search Wizard */}
      <MultiStepSearchWizard
        open={showWizard}
        onOpenChange={setShowWizard}
        onSearch={handleNewSearch}
        isMobile={window.innerWidth < 768}
      />
    </div>
  );
}