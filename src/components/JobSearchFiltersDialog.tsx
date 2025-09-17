import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Slider } from "./ui/slider";
import { Checkbox } from "./ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  MapPin,
  DollarSign,
  Building,
  Clock,
  Users,
  GraduationCap,
  Code,
  Briefcase,
  X,
  Search,
  ChevronRight,
  ArrowLeft,
  ArrowRight
} from "lucide-react";

interface MultiStepSearchWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSearch: (searchCriteria: any) => void;
}

interface JobSearchFiltersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApplyFilters: (filters: any) => void;
}

export function MultiStepSearchWizard({ 
  open, 
  onOpenChange, 
  onSearch 
}: MultiStepSearchWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [searchData, setSearchData] = useState({
    jobTitle: '',
    location: '',
    experience: '',
    skills: [] as string[],
    salary: [50000, 150000],
    jobType: [] as string[],
    companySize: '',
    benefits: [] as string[]
  });

  const totalSteps = 5;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    onSearch(searchData);
    onOpenChange(false);
    setCurrentStep(1);
  };

  const updateSearchData = (field: string, value: any) => {
    setSearchData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addToArray = (field: string, value: string) => {
    setSearchData(prev => ({
      ...prev,
      [field]: [...prev[field as keyof typeof prev] as string[], value]
    }));
  };

  const removeFromArray = (field: string, value: string) => {
    setSearchData(prev => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[]).filter(item => item !== value)
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">What role are you looking for?</h3>
              <p className="text-gray-600">Tell us about your ideal position</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Job Title</label>
                <Input
                  placeholder="e.g. Frontend Developer, Product Manager"
                  value={searchData.jobTitle}
                  onChange={(e) => updateSearchData('jobTitle', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Location Preference</label>
                <Input
                  placeholder="e.g. San Francisco, Remote, New York"
                  value={searchData.location}
                  onChange={(e) => updateSearchData('location', e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Experience & Skills</h3>
              <p className="text-gray-600">Help us understand your background</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Experience Level</label>
                <Select value={searchData.experience} onValueChange={(value) => updateSearchData('experience', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                    <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                    <SelectItem value="senior">Senior (5-10 years)</SelectItem>
                    <SelectItem value="lead">Lead/Principal (10+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Key Skills</label>
                <div className="grid grid-cols-2 gap-2">
                  {['React', 'JavaScript', 'TypeScript', 'Python', 'Java', 'Node.js', 'AWS', 'Docker'].map(skill => (
                    <label key={skill} className="flex items-center space-x-2">
                      <Checkbox
                        checked={searchData.skills.includes(skill)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            addToArray('skills', skill);
                          } else {
                            removeFromArray('skills', skill);
                          }
                        }}
                      />
                      <span className="text-sm">{skill}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Compensation</h3>
              <p className="text-gray-600">What's your expected salary range?</p>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-4">Annual Salary Range</label>
                <Slider
                  value={searchData.salary}
                  onValueChange={(value) => updateSearchData('salary', value)}
                  max={300000}
                  min={30000}
                  step={5000}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>$30K</span>
                  <span className="font-medium">
                    ${(searchData.salary[0] / 1000).toFixed(0)}K - ${(searchData.salary[1] / 1000).toFixed(0)}K
                  </span>
                  <span>$300K</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Work Preferences</h3>
              <p className="text-gray-600">Tell us about your ideal work environment</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Job Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Full-time', 'Part-time', 'Contract', 'Freelance'].map(type => (
                    <label key={type} className="flex items-center space-x-2">
                      <Checkbox
                        checked={searchData.jobType.includes(type)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            addToArray('jobType', type);
                          } else {
                            removeFromArray('jobType', type);
                          }
                        }}
                      />
                      <span className="text-sm">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Company Size</label>
                <Select value={searchData.companySize} onValueChange={(value) => updateSearchData('companySize', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select company size preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="startup">Startup (1-50 employees)</SelectItem>
                    <SelectItem value="small">Small (51-200 employees)</SelectItem>
                    <SelectItem value="medium">Medium (201-1000 employees)</SelectItem>
                    <SelectItem value="large">Large (1000+ employees)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Almost Done!</h3>
              <p className="text-gray-600">Review your search preferences</p>
            </div>
            <div className="space-y-4 max-h-60 overflow-y-auto">
              <div className="grid grid-cols-1 gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">Job Title:</span>
                  <span>{searchData.jobTitle || 'Any'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Location:</span>
                  <span>{searchData.location || 'Any'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Experience:</span>
                  <span>{searchData.experience || 'Any level'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Salary Range:</span>
                  <span>${(searchData.salary[0] / 1000).toFixed(0)}K - ${(searchData.salary[1] / 1000).toFixed(0)}K</span>
                </div>
                {searchData.skills.length > 0 && (
                  <div>
                    <span className="font-medium">Skills:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {searchData.skills.map(skill => (
                        <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                {searchData.jobType.length > 0 && (
                  <div>
                    <span className="font-medium">Job Types:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {searchData.jobType.map(type => (
                        <Badge key={type} variant="secondary" className="text-xs">{type}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Search className="h-5 w-5" />
              <span>New Job Search</span>
            </div>
            <div className="text-sm font-normal text-gray-600">
              Step {currentStep} of {totalSteps}
            </div>
          </DialogTitle>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>

        {/* Step Content */}
        <div className="py-4">
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-4 border-t">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          {currentStep === totalSteps ? (
            <Button onClick={handleFinish} className="bg-blue-600 hover:bg-blue-700">
              Start Search
              <Search className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button 
              onClick={handleNext}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function JobSearchFiltersDialog({ 
  open, 
  onOpenChange, 
  onApplyFilters 
}: JobSearchFiltersDialogProps) {
  const [filters, setFilters] = useState({
    location: [] as string[],
    jobType: [] as string[],
    experience: [] as string[],
    skills: [] as string[],
    salary: [50000, 200000],
    companySize: [] as string[],
    remote: false,
    postedDate: '30' // days
  });

  const locationOptions = [
    'San Francisco, CA', 'New York, NY', 'Seattle, WA', 'Austin, TX',
    'Los Angeles, CA', 'Chicago, IL', 'Boston, MA', 'Denver, CO', 'Remote'
  ];

  const jobTypeOptions = ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'];
  
  const experienceOptions = [
    'Entry Level (0-2 years)', '3-5 years', '5-7 years',
    '7-10 years', 'Senior (10+ years)', 'Executive'
  ];

  const skillsOptions = [
    'React', 'JavaScript', 'TypeScript', 'Python', 'Java', 'C++',
    'Node.js', 'AWS', 'Docker', 'Kubernetes', 'GraphQL', 'MongoDB'
  ];

  const companySizeOptions = [
    'Startup (1-50)', 'Small (51-200)', 'Medium (201-1000)', 'Large (1000+)'
  ];

  const handleArrayFilterChange = (filterKey: string, value: string, checked: boolean) => {
    setFilters(prev => {
      const currentArray = prev[filterKey as keyof typeof prev] as string[];
      if (checked) {
        return {
          ...prev,
          [filterKey]: [...currentArray, value]
        };
      } else {
        return {
          ...prev,
          [filterKey]: currentArray.filter(item => item !== value)
        };
      }
    });
  };

  const clearFilters = () => {
    setFilters({
      location: [],
      jobType: [],
      experience: [],
      skills: [],
      salary: [50000, 200000],
      companySize: [],
      remote: false,
      postedDate: '30'
    });
  };

  const getActiveFiltersCount = () => {
    return filters.location.length + 
           filters.jobType.length + 
           filters.experience.length + 
           filters.skills.length + 
           filters.companySize.length;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Search Filters</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic Filters</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6 mt-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Location */}
              <div>
                <h4 className="font-medium mb-3 flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Location
                </h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {locationOptions.map(location => (
                    <label key={location} className="flex items-center space-x-2 text-sm">
                      <Checkbox
                        checked={filters.location.includes(location)}
                        onCheckedChange={(checked) => 
                          handleArrayFilterChange('location', location, checked as boolean)
                        }
                      />
                      <span>{location}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Job Type */}
              <div>
                <h4 className="font-medium mb-3 flex items-center">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Job Type
                </h4>
                <div className="space-y-2">
                  {jobTypeOptions.map(type => (
                    <label key={type} className="flex items-center space-x-2 text-sm">
                      <Checkbox
                        checked={filters.jobType.includes(type)}
                        onCheckedChange={(checked) => 
                          handleArrayFilterChange('jobType', type, checked as boolean)
                        }
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Salary Range */}
            <div>
              <h4 className="font-medium mb-3 flex items-center">
                <DollarSign className="h-4 w-4 mr-2" />
                Salary Range
              </h4>
              <Slider
                value={filters.salary}
                onValueChange={(value) => setFilters(prev => ({ ...prev, salary: value }))}
                max={300000}
                min={30000}
                step={5000}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>$30K</span>
                <span className="font-medium">
                  ${(filters.salary[0] / 1000).toFixed(0)}K - ${(filters.salary[1] / 1000).toFixed(0)}K
                </span>
                <span>$300K</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6 mt-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Experience */}
              <div>
                <h4 className="font-medium mb-3 flex items-center">
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Experience Level
                </h4>
                <div className="space-y-2">
                  {experienceOptions.map(exp => (
                    <label key={exp} className="flex items-center space-x-2 text-sm">
                      <Checkbox
                        checked={filters.experience.includes(exp)}
                        onCheckedChange={(checked) => 
                          handleArrayFilterChange('experience', exp, checked as boolean)
                        }
                      />
                      <span>{exp}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div>
                <h4 className="font-medium mb-3 flex items-center">
                  <Code className="h-4 w-4 mr-2" />
                  Skills
                </h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {skillsOptions.map(skill => (
                    <label key={skill} className="flex items-center space-x-2 text-sm">
                      <Checkbox
                        checked={filters.skills.includes(skill)}
                        onCheckedChange={(checked) => 
                          handleArrayFilterChange('skills', skill, checked as boolean)
                        }
                      />
                      <span>{skill}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6 mt-6">
            {/* Company Size */}
            <div>
              <h4 className="font-medium mb-3 flex items-center">
                <Building className="h-4 w-4 mr-2" />
                Company Size
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {companySizeOptions.map(size => (
                  <label key={size} className="flex items-center space-x-2 text-sm">
                    <Checkbox
                      checked={filters.companySize.includes(size)}
                      onCheckedChange={(checked) => 
                        handleArrayFilterChange('companySize', size, checked as boolean)
                      }
                    />
                    <span>{size}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Posted Date */}
            <div>
              <h4 className="font-medium mb-3 flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Posted Within
              </h4>
              <Select 
                value={filters.postedDate} 
                onValueChange={(value) => setFilters(prev => ({ ...prev, postedDate: value }))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Last 24 hours</SelectItem>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="90">Last 3 months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between pt-4 border-t">
          <Button variant="outline" onClick={clearFilters}>
            Clear All
          </Button>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button 
              onClick={() => {
                onApplyFilters(filters);
                onOpenChange(false);
              }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Apply Filters ({getActiveFiltersCount()})
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}