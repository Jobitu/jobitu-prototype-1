import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { SmartMatchesFilterDialog } from "./SmartMatchesFilterDialog";
import { toast } from "sonner@2.0.3";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search,
  MapPin,
  Briefcase,
  TrendingUp,
  Star,
  Heart,
  ExternalLink,
  Filter,
  Grid3X3,
  List,
  ChevronDown,
  ChevronUp,
  DollarSign,
  Clock,
  Building,
  Users,
  CheckCircle,
  ArrowRight,
  Eye,
  Bookmark,
  Square,
  ChevronLeft,
  ChevronRight,
  X,
  FileText,
  Activity,
  Sparkles,
  Award,
  MapPinCheck,
  Zap
} from "lucide-react";

interface JobMatch {
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
  matchReasons: string[];
  description: string;
  benefits?: string[];
  teamSize?: string;
  experience?: string;
  highlights?: string[];
}

const mockJobMatches: JobMatch[] = [
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
    saved: true,
    matchReasons: [
      'Perfect match for React and TypeScript skills',
      'Company size aligns with your preferences',
      'Remote-friendly work culture',
      'Salary matches your expectations'
    ],
    description: 'Join our engineering team to build next-generation web applications...',
    benefits: ['Health Insurance', 'Dental', '401k Match', 'Remote Work', 'Unlimited PTO'],
    teamSize: '8-12 engineers',
    experience: '5+ years',
    highlights: ['Remote', 'Great Salary', 'Growth Opportunities']
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
    matchReasons: [
      'Strong alignment with React expertise',
      'Remote position matches preferences',
      'Modern tech stack including AWS',
      'Growth opportunities in DevOps'
    ],
    description: 'Build scalable applications with our distributed team...',
    benefits: ['Health Insurance', 'Stock Options', 'Learning Budget', 'Home Office Setup'],
    teamSize: '15-20 engineers',
    experience: '3+ years',
    highlights: ['Remote', 'Stock Options', 'Modern Stack']
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
    matchReasons: [
      'React skills directly applicable',
      'Opportunity to expand into backend',
      'Fast-growing startup environment',
      'Located in preferred city'
    ],
    description: 'Help us scale our platform and mentor junior developers...',
    benefits: ['Equity', 'Health Insurance', 'Catered Meals', 'Gym Membership'],
    teamSize: '5-8 engineers',
    experience: '4+ years',
    highlights: ['Equity', 'Fast Growth', 'Full Stack']
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
    matchReasons: [
      'Senior role matches career goals',
      'Architecture focus aligns with interests',
      'High compensation bracket',
      'Leadership opportunities available'
    ],
    description: 'Lead frontend architecture decisions for our enterprise platform...',
    benefits: ['Health Insurance', 'Stock Purchase Plan', 'Sabbatical Program', 'Relocation'],
    teamSize: '25+ engineers',
    experience: '7+ years',
    highlights: ['Leadership', 'Architecture', 'High Salary']
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
    matchReasons: [
      'Design systems experience valued',
      'Frontend focus matches skills',
      'Creative industry exposure',
      'Strong design collaboration'
    ],
    description: 'Work closely with our design team to create beautiful interfaces...',
    benefits: ['Health Insurance', 'Creative Budget', 'Flexible Hours', 'Design Tools'],
    teamSize: '6-10 engineers',
    experience: '3+ years',
    highlights: ['Creative', 'Design Focus', 'Flexible']
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
    matchReasons: [
      'Strong JavaScript foundation',
      'Opportunity to learn Vue.js',
      'Full-stack potential',
      'Growing company environment'
    ],
    description: 'Join our team building innovative web solutions...',
    benefits: ['Health Insurance', 'Stock Options', 'Conference Budget', 'Remote Days'],
    teamSize: '12-15 engineers',
    experience: '3+ years',
    highlights: ['Learning', 'Vue.js', 'Growing Team']
  }
];

interface FindJobsSmartMatchesPageProps {
  activeSubTab?: string;
  onViewJobDetail?: (job: JobMatch, currentIndex: number) => void;
}

export function FindJobsSmartMatchesPage({ 
  activeSubTab = 'smart-matches',
  onViewJobDetail
}: FindJobsSmartMatchesPageProps) {
  const [viewMode, setViewMode] = useState<'list' | 'grid' | 'single'>('list');
  const [currentSingleIndex, setCurrentSingleIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('bestMatch');
  const [showFilters, setShowFilters] = useState(false);
  const [expandedMatch, setExpandedMatch] = useState<string | null>(null);
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set(['1']));
  const [appliedFilters, setAppliedFilters] = useState<any>(null);
  const [filteredJobs, setFilteredJobs] = useState(mockJobMatches);
  const [isLoading, setIsLoading] = useState(false);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);

  // Filter and search jobs
  useEffect(() => {
    let jobs = [...mockJobMatches];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      jobs = jobs.filter(job => 
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query) ||
        job.skills.some(skill => skill.toLowerCase().includes(query))
      );
    }

    // Apply other filters (simplified - in real app would be more comprehensive)
    if (appliedFilters) {
      // Example filter logic
      if (appliedFilters.location?.length > 0) {
        jobs = jobs.filter(job => appliedFilters.location.includes(job.location));
      }
      if (appliedFilters.jobType?.length > 0) {
        jobs = jobs.filter(job => appliedFilters.jobType.includes(job.jobType));
      }
    }

    // Apply sorting
    switch (sortBy) {
      case 'bestMatch':
        jobs.sort((a, b) => b.matchPercentage - a.matchPercentage);
        break;
      case 'newest':
        jobs.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
        break;
      case 'salary':
        jobs.sort((a, b) => {
          const aMax = parseInt(a.salary.match(/\$(\d+)k/)?.[1] || '0');
          const bMax = parseInt(b.salary.match(/\$(\d+)k/)?.[1] || '0');
          return bMax - aMax;
        });
        break;
    }

    setFilteredJobs(jobs);
  }, [searchQuery, appliedFilters, sortBy]);

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

  const getActiveFiltersCount = () => {
    if (!appliedFilters) return 0;
    return Object.values(appliedFilters).reduce((count: number, filterArray: any) => {
      if (Array.isArray(filterArray)) {
        return count + filterArray.length;
      }
      return count;
    }, 0);
  };

  const clearAllFilters = () => {
    setAppliedFilters(null);
    setSearchQuery('');
    toast.success("All filters cleared");
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

  const loadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Loaded more matches");
    }, 1500);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    if (viewMode !== 'single') return;
    setTouchStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const handleTouchEnd = (e: React.TouchEvent, job: JobMatch) => {
    if (!touchStart || viewMode !== 'single') return;

    const touchEnd = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
    const deltaX = touchEnd.x - touchStart.x;
    const deltaY = touchEnd.y - touchStart.y;

    // Only trigger if swipe is more horizontal than vertical
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        // Swipe right - save job
        toggleSavedJob(job.id);
      } else {
        // Swipe left - dismiss (go to next)
        setCurrentSingleIndex(Math.min(filteredJobs.length - 1, currentSingleIndex + 1));
      }
    } else if (deltaY < -50) {
      // Swipe up - view details
      onViewJobDetail?.(job, currentSingleIndex);
    }

    setTouchStart(null);
  };

  const stats = {
    totalMatches: filteredJobs.length,
    highMatches: filteredJobs.filter(job => job.matchPercentage >= 85).length,
    appliedCount: filteredJobs.filter(job => job.applied).length,
    savedCount: savedJobs.size
  };

  const insights = {
    remotePercentage: Math.round((filteredJobs.filter(job => job.location.includes('Remote')).length / filteredJobs.length) * 100),
    newThisWeek: filteredJobs.filter(job => {
      const posted = new Date(job.postedDate);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return posted >= weekAgo;
    }).length
  };

  const SingleJobCard = ({ job }: { job: JobMatch }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      onTouchStart={handleTouchStart}
      onTouchEnd={(e) => handleTouchEnd(e, job)}
    >
      <Card className="border border-gray-200 shadow-lg max-w-4xl mx-auto">
        <CardContent className="p-8">
          {/* Header with navigation */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setCurrentSingleIndex(Math.max(0, currentSingleIndex - 1))}
                disabled={currentSingleIndex === 0}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-gray-600">
                {currentSingleIndex + 1} of {filteredJobs.length}
              </span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setCurrentSingleIndex(Math.min(filteredJobs.length - 1, currentSingleIndex + 1))}
                disabled={currentSingleIndex === filteredJobs.length - 1}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <Badge className={`text-sm border ${getMatchColor(job.matchPercentage)}`}>
              <Star className="h-4 w-4 mr-2" />
              {job.matchPercentage}% match
            </Badge>
          </div>

          {/* Mobile swipe hints */}
          <div className="md:hidden mb-4 text-center">
            <p className="text-xs text-gray-500">
              Swipe → to save • ← to dismiss • ↑ for details
            </p>
          </div>

          {/* Main job info */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4 flex-1">
              <Avatar className="w-16 h-16">
                <AvatarImage src={job.companyLogo} alt={job.company} />
                <AvatarFallback className="text-lg">{job.company.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <h1 className="text-3xl font-semibold mb-2">{job.title}</h1>
                <p className="text-xl text-gray-600 mb-2">{job.company}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    <Building className="h-4 w-4 mr-1" />
                    {job.jobType}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {formatDate(job.postedDate)}
                  </div>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="lg"
              onClick={() => toggleSavedJob(job.id)}
              className="p-2"
            >
              <Heart 
                className={`h-6 w-6 ${savedJobs.has(job.id) ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'}`} 
              />
            </Button>
          </div>

          {/* Highlight badges */}
          {job.highlights && job.highlights.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {job.highlights.map((highlight, index) => (
                <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  <Sparkles className="h-3 w-3 mr-1" />
                  {highlight}
                </Badge>
              ))}
            </div>
          )}

          {/* Salary and team info */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
            <div>
              <h3 className="font-medium text-gray-600 mb-1">Salary Range</h3>
              <p className="text-xl font-semibold text-green-600">{job.salary}</p>
            </div>
            {job.teamSize && (
              <div>
                <h3 className="font-medium text-gray-600 mb-1">Team Size</h3>
                <p className="text-lg">{job.teamSize}</p>
              </div>
            )}
            {job.experience && (
              <div>
                <h3 className="font-medium text-gray-600 mb-1">Experience</h3>
                <p className="text-lg">{job.experience}</p>
              </div>
            )}
          </div>

          {/* Skills */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-600 mb-3">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-sm px-3 py-1">{skill}</Badge>
              ))}
            </div>
          </div>

          {/* Job description */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-600 mb-3">Job Description</h3>
            <p className="text-gray-700 leading-relaxed">{job.description}</p>
          </div>

          {/* Benefits */}
          {job.benefits && (
            <div className="mb-6">
              <h3 className="font-medium text-gray-600 mb-3">Benefits & Perks</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {job.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    {benefit}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Match reasons */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-blue-900 mb-3">Why this is a great match for you</h3>
            <div className="space-y-2">
              {job.matchReasons.map((reason, index) => (
                <div key={index} className="flex items-start text-sm text-blue-800">
                  <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-blue-600 flex-shrink-0" />
                  {reason}
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {job.applied ? (
              <Badge className="bg-gray-100 text-gray-800 px-6 py-3 text-base w-full sm:w-auto justify-center">
                ✓ Applied
              </Badge>
            ) : (
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 px-8 w-full sm:w-auto"
                onClick={() => handleApplyJob(job.id)}
              >
                Apply Now
              </Button>
            )}
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => onViewJobDetail?.(job, currentSingleIndex)}
              className="px-8 w-full sm:w-auto"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View Full Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const JobCard = ({ job, isExpanded = false }: { job: JobMatch; isExpanded?: boolean }) => (
    <Card className="border border-gray-200 hover:shadow-md transition-all duration-200 hover:translate-y-[-2px]">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3 flex-1">
            <Avatar className="w-10 h-10">
              <AvatarImage src={job.companyLogo} alt={job.company} />
              <AvatarFallback>{job.company.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-base">{job.title}</h3>
              <p className="text-sm text-muted-foreground">{job.company}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={`text-xs border ${getMatchColor(job.matchPercentage)}`}>
              <Star className="h-3 w-3 mr-1" />
              {job.matchPercentage}% match
            </Badge>
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

        {/* Highlight badges */}
        {job.highlights && job.highlights.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {job.highlights.slice(0, 3).map((highlight, index) => (
              <Badge key={index} variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200 px-2 py-0">
                {highlight}
              </Badge>
            ))}
            {job.highlights.length > 3 && (
              <Badge variant="outline" className="text-xs bg-gray-50 text-gray-600 border-gray-200 px-2 py-0">
                +{job.highlights.length - 3} more
              </Badge>
            )}
          </div>
        )}
        
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
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {job.skills.slice(0, 4).map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-xs">{skill}</Badge>
          ))}
          {job.skills.length > 4 && (
            <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
              +{job.skills.length - 4} more
            </Badge>
          )}
        </div>

        <Collapsible 
          open={expandedMatch === job.id} 
          onOpenChange={(open) => setExpandedMatch(open ? job.id : null)}
        >
          <CollapsibleTrigger asChild>
            <Button 
              variant="ghost" 
              className="w-full text-purple-600 hover:text-purple-700 hover:bg-purple-50 p-2 text-sm"
            >
              <span>Why we matched you</span>
              {expandedMatch === job.id ? (
                <ChevronUp className="h-4 w-4 ml-2" />
              ) : (
                <ChevronDown className="h-4 w-4 ml-2" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="bg-purple-50 rounded-lg p-4 mt-2">
            <ul className="space-y-2">
              {job.matchReasons.map((reason, index) => (
                <li key={index} className="flex items-start text-sm text-purple-900">
                  <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-purple-600 flex-shrink-0" />
                  {reason}
                </li>
              ))}
            </ul>
          </CollapsibleContent>
        </Collapsible>

        <div className="flex items-center space-x-3 mt-4">
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
            onClick={() => onViewJobDetail?.(job, filteredJobs.findIndex(j => j.id === job.id))}
          >
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  // Empty state component
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-64 h-64 mb-8 opacity-50">
        <FileText className="w-full h-full text-gray-300" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">No smart matches found</h3>
      <p className="text-gray-600 text-center mb-6 max-w-md">
        Try adjusting your filters or updating your profile to discover more opportunities.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button variant="outline" onClick={clearAllFilters}>
          Reset Filters
        </Button>
        <Button onClick={() => console.log('Navigate to profile')}>
          Update Profile
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl font-semibold">Best Matches for You</h1>
              <p className="text-muted-foreground mt-1">AI-powered job recommendations based on your profile</p>
            </div>
            
            {/* Search and controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="flex items-center space-x-2 flex-1 sm:flex-none">
                <div className="relative flex-1 sm:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search jobs or locations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-44">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bestMatch">Best Match</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="salary">Highest Salary</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
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
                    className="rounded-none border-0"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant={viewMode === 'single' ? 'default' : 'ghost'} 
                    size="sm"
                    onClick={() => setViewMode('single')}
                    className="rounded-l-none border-0"
                  >
                    <Square className="h-4 w-4" />
                  </Button>
                </div>
                <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
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

          {/* Enhanced KPI Strip */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="text-center">
              <p className="text-2xl font-semibold text-blue-600">{stats.totalMatches}</p>
              <p className="text-sm text-muted-foreground">Total Matches</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold text-green-600">{stats.highMatches}</p>
              <p className="text-sm text-muted-foreground">High Matches (85%+)</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold text-orange-600">{stats.appliedCount}</p>
              <p className="text-sm text-muted-foreground">Applications</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold text-purple-600">{stats.savedCount}</p>
              <p className="text-sm text-muted-foreground">Saved Jobs</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold text-teal-600">{insights.remotePercentage}%</p>
              <p className="text-sm text-muted-foreground">Remote-friendly</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold text-indigo-600">{insights.newThisWeek}</p>
              <p className="text-sm text-muted-foreground">New this week</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-6xl mx-auto">
          {filteredJobs.length === 0 ? (
            <EmptyState />
          ) : viewMode === 'single' ? (
            <AnimatePresence mode="wait">
              <SingleJobCard key={currentSingleIndex} job={filteredJobs[currentSingleIndex]} />
            </AnimatePresence>
          ) : (
            <>
              <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 gap-6' : 'space-y-4'}`}>
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>

              {/* Enhanced Load More */}
              <div className="flex flex-col items-center mt-8">
                <p className="text-sm text-gray-600 mb-4">
                  Showing {filteredJobs.length} of {mockJobMatches.length} matches
                </p>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={loadMore}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Activity className="h-4 w-4 mr-2 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      Load More Matches
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Enhanced Filter Dialog */}
      <SmartMatchesFilterDialog
        open={showFilters}
        onOpenChange={setShowFilters}
        onApplyFilters={handleApplyFilters}
      />
    </div>
  );
}