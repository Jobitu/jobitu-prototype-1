import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Slider } from "./ui/slider";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { 
  MapPin,
  DollarSign,
  Building,
  Clock,
  Users,
  Star,
  GraduationCap,
  Code,
  Briefcase,
  X
} from "lucide-react";

interface FilterState {
  matchPercentage: number[];
  salaryRange: number[];
  location: string[];
  jobType: string[];
  experience: string[];
  companySize: string[];
  skills: string[];
  benefits: string[];
  workSchedule: string[];
  education: string[];
}

interface SmartMatchesFilterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApplyFilters: (filters: FilterState) => void;
}

export function SmartMatchesFilterDialog({ 
  open, 
  onOpenChange, 
  onApplyFilters 
}: SmartMatchesFilterDialogProps) {
  const [filters, setFilters] = useState<FilterState>({
    matchPercentage: [70],
    salaryRange: [80000, 200000],
    location: [],
    jobType: [],
    experience: [],
    companySize: [],
    skills: [],
    benefits: [],
    workSchedule: [],
    education: []
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

  const companySizeOptions = [
    'Startup (1-50)', 'Small (51-200)', 'Medium (201-1000)', 
    'Large (1000-5000)', 'Enterprise (5000+)'
  ];

  const skillsOptions = [
    'React', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 'Java',
    'AWS', 'Docker', 'GraphQL', 'Next.js', 'Vue.js', 'Angular',
    'PostgreSQL', 'MongoDB', 'Redis', 'Kubernetes'
  ];

  const benefitsOptions = [
    'Health Insurance', 'Dental Insurance', 'Vision Insurance',
    '401k Match', 'Stock Options', 'Remote Work', 'Flexible Hours',
    'Unlimited PTO', 'Professional Development', 'Gym Membership',
    'Mental Health Support', 'Parental Leave'
  ];

  const workScheduleOptions = [
    'Standard Hours (9-5)', 'Flexible Hours', 'Remote-First', 
    'Hybrid', 'On-Site Only', '4-Day Work Week'
  ];

  const educationOptions = [
    'High School', 'Associate Degree', 'Bachelor\'s Degree',
    'Master\'s Degree', 'PhD', 'Professional Certification'
  ];

  const handleArrayFilterChange = (
    filterKey: keyof FilterState,
    value: string,
    checked: boolean
  ) => {
    setFilters(prev => {
      const currentArray = prev[filterKey] as string[];
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

  const handleRangeChange = (filterKey: keyof FilterState, values: number[]) => {
    setFilters(prev => ({
      ...prev,
      [filterKey]: values
    }));
  };

  const clearFilters = () => {
    setFilters({
      matchPercentage: [70],
      salaryRange: [80000, 200000],
      location: [],
      jobType: [],
      experience: [],
      companySize: [],
      skills: [],
      benefits: [],
      workSchedule: [],
      education: []
    });
  };

  const getActiveFiltersCount = () => {
    return filters.location.length + 
           filters.jobType.length + 
           filters.experience.length + 
           filters.companySize.length + 
           filters.skills.length + 
           filters.benefits.length + 
           filters.workSchedule.length + 
           filters.education.length;
  };

  const removeFilter = (filterKey: keyof FilterState, value: string) => {
    handleArrayFilterChange(filterKey, value, false);
  };

  const FilterSection = ({ 
    title, 
    icon: Icon, 
    children 
  }: { 
    title: string; 
    icon: any; 
    children: React.ReactNode; 
  }) => (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Icon className="h-4 w-4 text-gray-600" />
        <h3 className="font-medium">{title}</h3>
      </div>
      {children}
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Advanced Filters
            <div className="flex items-center space-x-2">
              {getActiveFiltersCount() > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {getActiveFiltersCount()} active
                </Badge>
              )}
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Match Percentage */}
            <FilterSection title="Minimum Match Percentage" icon={Star}>
              <div className="space-y-3">
                <Slider
                  value={filters.matchPercentage}
                  onValueChange={(value) => handleRangeChange('matchPercentage', value)}
                  max={100}
                  min={50}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>50%</span>
                  <span className="font-medium">{filters.matchPercentage[0]}%+</span>
                  <span>100%</span>
                </div>
              </div>
            </FilterSection>

            {/* Salary Range */}
            <FilterSection title="Salary Range" icon={DollarSign}>
              <div className="space-y-3">
                <Slider
                  value={filters.salaryRange}
                  onValueChange={(value) => handleRangeChange('salaryRange', value)}
                  max={300000}
                  min={40000}
                  step={5000}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>$40K</span>
                  <span className="font-medium">
                    ${(filters.salaryRange[0] / 1000).toFixed(0)}K - ${(filters.salaryRange[1] / 1000).toFixed(0)}K
                  </span>
                  <span>$300K</span>
                </div>
              </div>
            </FilterSection>

            {/* Location */}
            <FilterSection title="Location" icon={MapPin}>
              <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto">
                {locationOptions.map((location) => (
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
            </FilterSection>

            {/* Job Type */}
            <FilterSection title="Job Type" icon={Briefcase}>
              <div className="grid grid-cols-2 gap-2">
                {jobTypeOptions.map((type) => (
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
            </FilterSection>

            {/* Experience Level */}
            <FilterSection title="Experience Level" icon={GraduationCap}>
              <div className="grid grid-cols-1 gap-2">
                {experienceOptions.map((exp) => (
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
            </FilterSection>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Company Size */}
            <FilterSection title="Company Size" icon={Building}>
              <div className="grid grid-cols-1 gap-2">
                {companySizeOptions.map((size) => (
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
            </FilterSection>

            {/* Skills */}
            <FilterSection title="Required Skills" icon={Code}>
              <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                {skillsOptions.map((skill) => (
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
            </FilterSection>

            {/* Benefits */}
            <FilterSection title="Benefits" icon={Users}>
              <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto">
                {benefitsOptions.map((benefit) => (
                  <label key={benefit} className="flex items-center space-x-2 text-sm">
                    <Checkbox
                      checked={filters.benefits.includes(benefit)}
                      onCheckedChange={(checked) => 
                        handleArrayFilterChange('benefits', benefit, checked as boolean)
                      }
                    />
                    <span>{benefit}</span>
                  </label>
                ))}
              </div>
            </FilterSection>

            {/* Work Schedule */}
            <FilterSection title="Work Schedule" icon={Clock}>
              <div className="grid grid-cols-1 gap-2">
                {workScheduleOptions.map((schedule) => (
                  <label key={schedule} className="flex items-center space-x-2 text-sm">
                    <Checkbox
                      checked={filters.workSchedule.includes(schedule)}
                      onCheckedChange={(checked) => 
                        handleArrayFilterChange('workSchedule', schedule, checked as boolean)
                      }
                    />
                    <span>{schedule}</span>
                  </label>
                ))}
              </div>
            </FilterSection>
          </div>
        </div>

        {/* Active Filters Display */}
        {getActiveFiltersCount() > 0 && (
          <div className="border-t pt-4">
            <h4 className="font-medium mb-3">Active Filters</h4>
            <div className="flex flex-wrap gap-2">
              {Object.entries(filters).map(([key, values]) => {
                if (Array.isArray(values) && values.length > 0) {
                  return values.map((value) => (
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
                        onClick={() => removeFilter(key as keyof FilterState, value)}
                      >
                        <X className="h-2 w-2" />
                      </Button>
                    </Badge>
                  ));
                }
                return null;
              })}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-between items-center pt-4 border-t">
          <Button variant="outline" onClick={clearFilters}>
            Clear All Filters
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