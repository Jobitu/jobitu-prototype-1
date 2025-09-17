import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { toast } from "sonner@2.0.3";
import { motion, AnimatePresence } from "motion/react";
import { 
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  Building,
  Star,
  Heart,
  Trash2,
  AlertTriangle,
  Eye,
  Search,
  Filter,
  SortAsc,
  Grid3X3,
  List,
  Edit3,
  Calendar,
  Bell,
  BellRing,
  Plus,
  ChevronDown,
  ChevronUp,
  X,
  MoreHorizontal,
  FileText,
  TrendingUp,
  CheckSquare,
  Users,
  CalendarDays,
  Target
} from "lucide-react";

interface SavedJob {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  salary: string;
  matchPercentage: number;
  skills: string[];
  postedDate: string;
  savedDate: string;
  jobType: string;
  applied?: boolean;
  appliedDate?: string;
  closingDate?: string;
  note?: string;
  reminderSet?: boolean;
  reminderDate?: string;
  description: string;
}

const mockSavedJobs: SavedJob[] = [
  {
    id: '1',
    title: 'Senior UX Designer',
    company: 'DesignFirst',
    companyLogo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=150&h=150&fit=crop',
    location: 'Los Angeles, CA',
    salary: '$110k - $140k',
    matchPercentage: 95,
    skills: ['Figma', 'Design Systems', 'User Research', 'Prototyping', 'Sketch', 'Adobe XD'],
    postedDate: '2024-01-20',
    savedDate: '2024-01-21',
    jobType: 'Full-time',
    closingDate: '2024-02-05',
    note: 'Great company culture and benefits. Portfolio aligns well with their design philosophy.',
    reminderSet: true,
    reminderDate: '2024-02-03',
    description: 'Lead UX design for consumer products, working closely with product teams...'
  },
  {
    id: '2',
    title: 'Frontend Developer',
    company: 'TechFlow Inc.',
    companyLogo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=150&h=150&fit=crop',
    location: 'San Francisco, CA',
    salary: '$140k - $180k',
    matchPercentage: 92,
    skills: ['React', 'TypeScript', 'Next.js', 'GraphQL'],
    postedDate: '2024-01-19',
    savedDate: '2024-01-20',
    jobType: 'Full-time',
    applied: true,
    appliedDate: '2024-01-22',
    closingDate: '2024-01-30',
    note: 'Already applied. Waiting for response from technical team.',
    description: 'Build next-generation web applications with our engineering team...'
  },
  {
    id: '3',
    title: 'Product Designer',
    company: 'InnovateLab',
    companyLogo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=150&h=150&fit=crop',
    location: 'Remote',
    salary: '$115k - $145k',
    matchPercentage: 88,
    skills: ['Design Systems', 'User Research', 'A/B Testing', 'Analytics'],
    postedDate: '2024-01-18',
    savedDate: '2024-01-19',
    jobType: 'Full-time',
    closingDate: '2024-02-10',
    note: 'Remote position with flexible hours. Team seems very collaborative.',
    reminderSet: false,
    description: 'Drive product design decisions through user research and data analysis...'
  },
  {
    id: '4',
    title: 'Full Stack Engineer',
    company: 'StartupX',
    companyLogo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop',
    location: 'New York, NY',
    salary: '$120k - $155k',
    matchPercentage: 85,
    skills: ['React', 'Node.js', 'Python', 'AWS'],
    postedDate: '2024-01-17',
    savedDate: '2024-01-18',
    jobType: 'Full-time',
    closingDate: '2024-01-25',
    note: 'Early stage startup with good funding. High growth potential.',
    description: 'Build and scale our platform from the ground up...'
  },
  {
    id: '5',
    title: 'UI/UX Designer',
    company: 'Creative Co',
    companyLogo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=150&h=150&fit=crop',
    location: 'Austin, TX',
    salary: '$95k - $125k',
    matchPercentage: 82,
    skills: ['Figma', 'Adobe Creative Suite', 'User Testing'],
    postedDate: '2024-01-16',
    savedDate: '2024-01-17',
    jobType: 'Full-time',
    closingDate: '2024-02-08',
    reminderSet: true,
    reminderDate: '2024-02-06',
    description: 'Join our creative team to design beautiful user experiences...'
  },
  {
    id: '6',
    title: 'Design System Lead',
    company: 'TechScale',
    companyLogo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop',
    location: 'Seattle, WA',
    salary: '$130k - $165k',
    matchPercentage: 90,
    skills: ['Design Systems', 'React', 'Figma', 'Design Tokens'],
    postedDate: '2024-01-15',
    savedDate: '2024-01-16',
    jobType: 'Full-time',
    applied: true,
    appliedDate: '2024-01-20',
    closingDate: '2024-02-01',
    description: 'Lead the development and maintenance of our design system...'
  }
];

interface FindJobsSavedJobsPageProps {
  activeSubTab?: string;
}

interface SavedJobFilters {
  location: string[];
  jobType: string[];
  appliedStatus: string[];
  reminderStatus: string[];
  company: string[];
}

export function FindJobsSavedJobsPage({ 
  activeSubTab = 'saved-jobs'
}: FindJobsSavedJobsPageProps) {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('saved-date');
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [tempNote, setTempNote] = useState('');
  const [expandedNote, setExpandedNote] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SavedJobFilters>({
    location: [],
    jobType: [],
    appliedStatus: [],
    reminderStatus: [],
    company: []
  });
  const [selectedJobs, setSelectedJobs] = useState<Set<string>>(new Set());
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [showReminderDialog, setShowReminderDialog] = useState(false);
  const [reminderJobId, setReminderJobId] = useState<string | null>(null);
  const [activeMetricFilter, setActiveMetricFilter] = useState<string | null>(null);

  // Calculate analytics
  const analytics = {
    totalSaved: mockSavedJobs.length,
    closingSoon: mockSavedJobs.filter(job => {
      if (!job.closingDate) return false;
      const closing = new Date(job.closingDate);
      const now = new Date();
      const diffTime = closing.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 3 && diffDays > 0;
    }).length,
    applied: mockSavedJobs.filter(job => job.applied).length,
    withReminders: mockSavedJobs.filter(job => job.reminderSet).length
  };

  useEffect(() => {
    setShowBulkActions(selectedJobs.size > 0);
  }, [selectedJobs]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isClosingSoon = (closingDate?: string) => {
    if (!closingDate) return false;
    const closing = new Date(closingDate);
    const now = new Date();
    const diffTime = closing.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays > 0;
  };

  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-100 text-green-800 border-green-200';
    if (percentage >= 80) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (percentage >= 70) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const applyMetricFilter = (metric: string) => {
    let newFilters = { ...filters };
    
    switch (metric) {
      case 'closingSoon':
        newFilters.jobType = []; // Clear other filters for focus
        setActiveMetricFilter('closingSoon');
        break;
      case 'applied':
        newFilters.appliedStatus = ['applied'];
        setActiveMetricFilter('applied');
        break;
      case 'withReminders':
        newFilters.reminderStatus = ['set'];
        setActiveMetricFilter('withReminders');
        break;
      default:
        newFilters = { location: [], jobType: [], appliedStatus: [], reminderStatus: [], company: [] };
        setActiveMetricFilter(null);
    }
    
    setFilters(newFilters);
  };

  const filteredAndSortedJobs = [...mockSavedJobs]
    .filter(job => {
      // Search filter
      if (searchQuery && !job.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !job.company.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))) {
        return false;
      }

      // Location filter
      if (filters.location.length > 0 && !filters.location.some(loc => 
        job.location.toLowerCase().includes(loc.toLowerCase()))) {
        return false;
      }

      // Job type filter
      if (filters.jobType.length > 0 && !filters.jobType.includes(job.jobType)) {
        return false;
      }

      // Applied status filter
      if (filters.appliedStatus.length > 0) {
        if (filters.appliedStatus.includes('applied') && !job.applied) return false;
        if (filters.appliedStatus.includes('notApplied') && job.applied) return false;
      }

      // Reminder status filter
      if (filters.reminderStatus.length > 0) {
        if (filters.reminderStatus.includes('set') && !job.reminderSet) return false;
        if (filters.reminderStatus.includes('notSet') && job.reminderSet) return false;
      }

      // Company filter
      if (filters.company.length > 0 && !filters.company.includes(job.company)) {
        return false;
      }

      // Metric-specific filters
      if (activeMetricFilter === 'closingSoon' && !isClosingSoon(job.closingDate)) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'saved-date':
          return new Date(b.savedDate).getTime() - new Date(a.savedDate).getTime();
        case 'closing-date':
          if (!a.closingDate) return 1;
          if (!b.closingDate) return -1;
          return new Date(a.closingDate).getTime() - new Date(b.closingDate).getTime();
        case 'match-percentage':
          return b.matchPercentage - a.matchPercentage;
        case 'salary':
          const aMax = parseInt(a.salary.split(' - ')[1].replace(/[^0-9]/g, ''));
          const bMax = parseInt(b.salary.split(' - ')[1].replace(/[^0-9]/g, ''));
          return bMax - aMax;
        case 'company':
          return a.company.localeCompare(b.company);
        default:
          return 0;
      }
    });

  const handleEditNote = (jobId: string, currentNote: string) => {
    setEditingNote(jobId);
    setTempNote(currentNote || '');
  };

  const handleSaveNote = () => {
    setEditingNote(null);
    setTempNote('');
    toast.success("Note saved successfully");
  };

  const handleCancelEdit = () => {
    setEditingNote(null);
    setTempNote('');
  };

  const handleToggleJobSelection = (jobId: string) => {
    const newSelection = new Set(selectedJobs);
    if (newSelection.has(jobId)) {
      newSelection.delete(jobId);
    } else {
      newSelection.add(jobId);
    }
    setSelectedJobs(newSelection);
  };

  const handleSelectAll = () => {
    if (selectedJobs.size === filteredAndSortedJobs.length) {
      setSelectedJobs(new Set());
    } else {
      setSelectedJobs(new Set(filteredAndSortedJobs.map(job => job.id)));
    }
  };

  const handleBulkDelete = () => {
    setSelectedJobs(new Set());
    toast.success(`${selectedJobs.size} jobs removed from saved list`);
  };

  const handleBulkSetReminder = () => {
    setSelectedJobs(new Set());
    toast.success(`Reminders set for ${selectedJobs.size} jobs`);
  };

  const handleBulkMarkApplied = () => {
    setSelectedJobs(new Set());
    toast.success(`${selectedJobs.size} jobs marked as applied`);
  };

  const handleSetReminder = (jobId: string) => {
    setReminderJobId(jobId);
    setShowReminderDialog(true);
  };

  const handleApplyJob = (jobId: string) => {
    toast.success("Application started");
  };

  const handleDeleteJob = (jobId: string) => {
    toast.success("Job removed from saved list");
  };

  const clearAllFilters = () => {
    setFilters({ location: [], jobType: [], appliedStatus: [], reminderStatus: [], company: [] });
    setActiveMetricFilter(null);
    toast.success("All filters cleared");
  };

  // Get unique values for filter options
  const uniqueCompanies = [...new Set(mockSavedJobs.map(job => job.company))];
  const uniqueLocations = [...new Set(mockSavedJobs.map(job => job.location))];

  const EmptyState = () => (
    <div className="text-center py-16">
      <Heart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
      <h3 className="text-xl font-semibold mb-2">
        {searchQuery || Object.values(filters).some(arr => arr.length > 0) 
          ? 'No jobs match your filters' 
          : 'No saved jobs found'
        }
      </h3>
      <p className="text-muted-foreground mb-6">
        {searchQuery || Object.values(filters).some(arr => arr.length > 0)
          ? 'Try adjusting your search terms or clearing filters'
          : 'Start saving jobs to see them here'
        }
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {(searchQuery || Object.values(filters).some(arr => arr.length > 0)) && (
          <Button variant="outline" onClick={clearAllFilters}>
            Clear Filters
          </Button>
        )}
        <Button onClick={() => console.log('Navigate to job search')}>
          Find Jobs
        </Button>
      </div>
    </div>
  );

  const GridJobCard = ({ job }: { job: SavedJob }) => (
    <Card className="border border-gray-200 hover:shadow-md transition-shadow relative">
      {selectedJobs.size > 0 && (
        <div className="absolute top-3 left-3 z-10">
          <Checkbox
            checked={selectedJobs.has(job.id)}
            onCheckedChange={() => handleToggleJobSelection(job.id)}
          />
        </div>
      )}
      
      {isClosingSoon(job.closingDate) && (
        <div className="bg-orange-50 border-b border-orange-200 px-4 py-2">
          <div className="flex items-center text-orange-800">
            <AlertTriangle className="h-3 w-3 mr-1" />
            <span className="text-xs">Closing soon</span>
          </div>
        </div>
      )}

      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src={job.companyLogo} alt={job.company} loading="lazy" />
            <AvatarFallback className="text-xs">{job.company.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <Badge className={`text-xs border ${getMatchColor(job.matchPercentage)}`}>
            {job.matchPercentage}%
          </Badge>
        </div>

        <h3 className="font-semibold text-sm mb-1">{job.title}</h3>
        <p className="text-xs text-muted-foreground mb-3">{job.company}</p>

        <div className="space-y-1 text-xs text-muted-foreground mb-3">
          <div>Saved: {formatDate(job.savedDate)}</div>
          {job.applied && <div className="text-green-600">Applied: {formatDate(job.appliedDate!)}</div>}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {job.reminderSet && (
              <BellRing className="h-3 w-3 text-yellow-600" />
            )}
            {job.applied && (
              <CheckSquare className="h-3 w-3 text-green-600" />
            )}
          </div>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <MoreHorizontal className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const ListJobCard = ({ job }: { job: SavedJob }) => (
    <Card className="border border-gray-200 hover:shadow-md transition-shadow">
      {isClosingSoon(job.closingDate) && (
        <div className="bg-orange-50 border-b border-orange-200 px-6 py-3">
          <div className="flex items-center text-orange-800">
            <AlertTriangle className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">
              Application deadline approaching: {job.closingDate && formatDate(job.closingDate)}
            </span>
          </div>
        </div>
      )}

      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4 flex-1">
            {selectedJobs.size > 0 && (
              <Checkbox
                checked={selectedJobs.has(job.id)}
                onCheckedChange={() => handleToggleJobSelection(job.id)}
              />
            )}
            
            <Avatar className="w-12 h-12">
              <AvatarImage src={job.companyLogo} alt={job.company} loading="lazy" />
              <AvatarFallback>{job.company.substring(0, 2)}</AvatarFallback>
            </Avatar>
            
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-lg">{job.title}</h3>
              <p className="text-muted-foreground">{job.company} • {job.location}</p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-1" />
                  {job.salary}
                </div>
                <div className="flex items-center">
                  <Building className="h-4 w-4 mr-1" />
                  {job.jobType}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Saved: {formatDate(job.savedDate)}
                </div>
                {job.closingDate && (
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Closes: {formatDate(job.closingDate)}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge className={`text-sm border ${getMatchColor(job.matchPercentage)}`}>
              <Star className="h-3 w-3 mr-1" />
              {job.matchPercentage}% match
            </Badge>
            
            <Button variant="ghost" size="sm" className="p-1">
              <Heart className="h-5 w-5 fill-red-500 text-red-500" />
            </Button>
          </div>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {job.skills.slice(0, 4).map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-sm">{skill}</Badge>
          ))}
          {job.skills.length > 4 && (
            <Badge variant="secondary" className="text-sm bg-gray-100 text-gray-600">
              +{job.skills.length - 4} more
            </Badge>
          )}
        </div>

        {/* Note Section */}
        <Collapsible>
          <div className="mb-4">
            {job.note ? (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {editingNote === job.id ? (
                      <div className="space-y-3">
                        <Textarea
                          value={tempNote}
                          onChange={(e) => setTempNote(e.target.value)}
                          placeholder="Add your notes about this job..."
                          className="min-h-[80px]"
                        />
                        <div className="flex items-center space-x-2">
                          <Button size="sm" onClick={handleSaveNote}>
                            Save
                          </Button>
                          <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <CollapsibleTrigger asChild>
                          <Button 
                            variant="ghost" 
                            className="p-0 h-auto text-left justify-start"
                            onClick={() => setExpandedNote(expandedNote === job.id ? null : job.id)}
                          >
                            <p className={`text-sm text-blue-900 ${expandedNote === job.id ? '' : 'line-clamp-2'}`}>
                              {job.note}
                            </p>
                            {job.note.length > 100 && (
                              <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${expandedNote === job.id ? 'rotate-180' : ''}`} />
                            )}
                          </Button>
                        </CollapsibleTrigger>
                      </div>
                    )}
                  </div>
                  {editingNote !== job.id && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleEditNote(job.id, job.note || '')}
                      className="ml-2"
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleEditNote(job.id, '')}
                className="text-gray-600 hover:text-gray-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add note
              </Button>
            )}
          </div>
        </Collapsible>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {job.applied ? (
              <Badge className="bg-green-100 text-green-800 px-4 py-2">
                Applied on {formatDate(job.appliedDate!)}
              </Badge>
            ) : (
              <Button 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => handleApplyJob(job.id)}
              >
                Apply Now
              </Button>
            )}
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            {job.reminderSet ? (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleSetReminder(job.id)}
                className="text-yellow-600 border-yellow-200 hover:bg-yellow-50"
              >
                <BellRing className="h-4 w-4 mr-2" />
                Reminder set
              </Button>
            ) : job.closingDate ? (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleSetReminder(job.id)}
              >
                <Bell className="h-4 w-4 mr-2" />
                Set Reminder
              </Button>
            ) : null}
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => handleDeleteJob(job.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-semibold">Saved Jobs</h1>
              <p className="text-muted-foreground mt-1">
                Your personal job management hub
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="saved-date">Recently Saved</SelectItem>
                  <SelectItem value="closing-date">Closing Soon</SelectItem>
                  <SelectItem value="match-percentage">Best Match</SelectItem>
                  <SelectItem value="salary">Highest Salary</SelectItem>
                  <SelectItem value="company">Company Name</SelectItem>
                </SelectContent>
              </Select>
              
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
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
              </div>
              
              <Button variant="outline" onClick={() => setShowFilters(true)}>
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search saved jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Analytics Summary */}
          <div className="grid grid-cols-4 gap-4">
            <Card 
              className={`cursor-pointer transition-colors hover:bg-blue-50 ${activeMetricFilter === null ? 'bg-blue-50 border-blue-200' : ''}`}
              onClick={() => applyMetricFilter('total')}
            >
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <p className="text-2xl font-semibold text-blue-600">{analytics.totalSaved}</p>
                <p className="text-sm text-muted-foreground">Total saved jobs</p>
              </CardContent>
            </Card>

            <Card 
              className={`cursor-pointer transition-colors hover:bg-orange-50 ${activeMetricFilter === 'closingSoon' ? 'bg-orange-50 border-orange-200' : ''}`}
              onClick={() => applyMetricFilter('closingSoon')}
            >
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="h-5 w-5 text-orange-600" />
                </div>
                <p className="text-2xl font-semibold text-orange-600">{analytics.closingSoon}</p>
                <p className="text-sm text-muted-foreground">Closing soon</p>
              </CardContent>
            </Card>

            <Card 
              className={`cursor-pointer transition-colors hover:bg-green-50 ${activeMetricFilter === 'applied' ? 'bg-green-50 border-green-200' : ''}`}
              onClick={() => applyMetricFilter('applied')}
            >
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <CheckSquare className="h-5 w-5 text-green-600" />
                </div>
                <p className="text-2xl font-semibold text-green-600">{analytics.applied}</p>
                <p className="text-sm text-muted-foreground">Applied</p>
              </CardContent>
            </Card>

            <Card 
              className={`cursor-pointer transition-colors hover:bg-purple-50 ${activeMetricFilter === 'withReminders' ? 'bg-purple-50 border-purple-200' : ''}`}
              onClick={() => applyMetricFilter('withReminders')}
            >
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <BellRing className="h-5 w-5 text-purple-600" />
                </div>
                <p className="text-2xl font-semibold text-purple-600">{analytics.withReminders}</p>
                <p className="text-sm text-muted-foreground">With reminders</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      <AnimatePresence>
        {showBulkActions && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-blue-50 border-b border-blue-200 px-6 py-3"
          >
            <div className="max-w-6xl mx-auto flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Checkbox
                  checked={selectedJobs.size === filteredAndSortedJobs.length}
                  onCheckedChange={handleSelectAll}
                />
                <span className="text-sm font-medium">
                  {selectedJobs.size} of {filteredAndSortedJobs.length} jobs selected
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm" onClick={handleBulkSetReminder}>
                  <Bell className="h-4 w-4 mr-2" />
                  Set Reminder
                </Button>
                <Button variant="outline" size="sm" onClick={handleBulkMarkApplied}>
                  <CheckSquare className="h-4 w-4 mr-2" />
                  Mark Applied
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleBulkDelete}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-6xl mx-auto">
          {filteredAndSortedJobs.length === 0 ? (
            <EmptyState />
          ) : (
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4' 
              : 'space-y-6'
            }>
              {filteredAndSortedJobs.map((job) => (
                viewMode === 'grid' 
                  ? <GridJobCard key={job.id} job={job} />
                  : <ListJobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Filter Dialog */}
      <Dialog open={showFilters} onOpenChange={setShowFilters}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Filter Saved Jobs</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            {/* Location Filter */}
            <div>
              <h4 className="font-medium mb-3">Location</h4>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {uniqueLocations.map((location) => (
                  <label key={location} className="flex items-center space-x-2">
                    <Checkbox
                      checked={filters.location.includes(location)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFilters(prev => ({ ...prev, location: [...prev.location, location] }));
                        } else {
                          setFilters(prev => ({ ...prev, location: prev.location.filter(l => l !== location) }));
                        }
                      }}
                    />
                    <span className="text-sm">{location}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Job Type Filter */}
            <div>
              <h4 className="font-medium mb-3">Job Type</h4>
              <div className="space-y-2">
                {['Full-time', 'Part-time', 'Contract', 'Internship'].map((type) => (
                  <label key={type} className="flex items-center space-x-2">
                    <Checkbox
                      checked={filters.jobType.includes(type)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFilters(prev => ({ ...prev, jobType: [...prev.jobType, type] }));
                        } else {
                          setFilters(prev => ({ ...prev, jobType: prev.jobType.filter(t => t !== type) }));
                        }
                      }}
                    />
                    <span className="text-sm">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Applied Status Filter */}
            <div>
              <h4 className="font-medium mb-3">Application Status</h4>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <Checkbox
                    checked={filters.appliedStatus.includes('applied')}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFilters(prev => ({ ...prev, appliedStatus: [...prev.appliedStatus, 'applied'] }));
                      } else {
                        setFilters(prev => ({ ...prev, appliedStatus: prev.appliedStatus.filter(s => s !== 'applied') }));
                      }
                    }}
                  />
                  <span className="text-sm">Applied</span>
                </label>
                <label className="flex items-center space-x-2">
                  <Checkbox
                    checked={filters.appliedStatus.includes('notApplied')}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFilters(prev => ({ ...prev, appliedStatus: [...prev.appliedStatus, 'notApplied'] }));
                      } else {
                        setFilters(prev => ({ ...prev, appliedStatus: prev.appliedStatus.filter(s => s !== 'notApplied') }));
                      }
                    }}
                  />
                  <span className="text-sm">Not Applied</span>
                </label>
              </div>
            </div>

            {/* Reminder Status Filter */}
            <div>
              <h4 className="font-medium mb-3">Reminder Status</h4>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <Checkbox
                    checked={filters.reminderStatus.includes('set')}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFilters(prev => ({ ...prev, reminderStatus: [...prev.reminderStatus, 'set'] }));
                      } else {
                        setFilters(prev => ({ ...prev, reminderStatus: prev.reminderStatus.filter(s => s !== 'set') }));
                      }
                    }}
                  />
                  <span className="text-sm">Reminder Set</span>
                </label>
                <label className="flex items-center space-x-2">
                  <Checkbox
                    checked={filters.reminderStatus.includes('notSet')}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFilters(prev => ({ ...prev, reminderStatus: [...prev.reminderStatus, 'notSet'] }));
                      } else {
                        setFilters(prev => ({ ...prev, reminderStatus: prev.reminderStatus.filter(s => s !== 'notSet') }));
                      }
                    }}
                  />
                  <span className="text-sm">No Reminder</span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t">
            <Button variant="outline" onClick={clearAllFilters}>
              Clear All Filters
            </Button>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={() => setShowFilters(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowFilters(false)}>
                Apply Filters
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Reminder Dialog */}
      <Dialog open={showReminderDialog} onOpenChange={setShowReminderDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Set Reminder</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground mb-4">
              When would you like to be reminded about this job?
            </p>
            {/* This would contain date/time picker in real implementation */}
            <div className="flex space-x-3">
              <Button variant="outline" className="flex-1">
                Tomorrow
              </Button>
              <Button variant="outline" className="flex-1">
                In 3 days
              </Button>
              <Button variant="outline" className="flex-1">
                In 1 week
              </Button>
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setShowReminderDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              setShowReminderDialog(false);
              toast.success("Reminder set successfully");
            }}>
              Set Reminder
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}