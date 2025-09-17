import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { 
  ChevronDown, 
  SortAsc, 
  SortDesc, 
  Star, 
  Clock, 
  DollarSign,
  Building,
  MapPin,
  TrendingUp,
  Eye,
  Bookmark,
  Sparkles
} from "lucide-react";

interface SortOption {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

interface EnhancedJobSearchSortProps {
  activeSort: string;
  onSortChange: (sortValue: string) => void;
  resultCount: number;
  appliedFiltersCount: number;
  showAIRecommended?: boolean;
}

const baseSortOptions: SortOption[] = [
  {
    value: 'relevance',
    label: 'Best Match',
    icon: Star,
    description: 'Most relevant to your profile and preferences'
  },
  {
    value: 'ai-recommended',
    label: 'Recommended for You (AI-based)',
    icon: Sparkles,
    description: 'AI-powered recommendations based on your profile fit'
  },
  {
    value: 'newest',
    label: 'Most Recent',
    icon: Clock,
    description: 'Recently posted jobs first'
  },
  {
    value: 'salary-high',
    label: 'Salary: High to Low',
    icon: DollarSign,
    description: 'Highest paying jobs first'
  },
  {
    value: 'salary-low',
    label: 'Salary: Low to High',
    icon: DollarSign,
    description: 'Lowest paying jobs first'
  },
  {
    value: 'company-size',
    label: 'Company Size',
    icon: Building,
    description: 'Largest companies first'
  },
  {
    value: 'location',
    label: 'Location',
    icon: MapPin,
    description: 'Closest to your preferred location'
  },
  {
    value: 'trending',
    label: 'Trending',
    icon: TrendingUp,
    description: 'Popular jobs with high application rates'
  }
];

export function EnhancedJobSearchSort({
  activeSort,
  onSortChange,
  resultCount,
  appliedFiltersCount,
  showAIRecommended = false
}: EnhancedJobSearchSortProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Filter sort options based on showAIRecommended prop
  const sortOptions = showAIRecommended 
    ? baseSortOptions 
    : baseSortOptions.filter(option => option.value !== 'ai-recommended');
  
  const activeSortOption = sortOptions.find(option => option.value === activeSort) || sortOptions[0];
  const ActiveIcon = activeSortOption.icon;

  return (
    <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-4 mb-6">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">
            {resultCount.toLocaleString()} jobs found
          </span>
          {appliedFiltersCount > 0 && (
            <Badge variant="secondary" className="text-xs">
              {appliedFiltersCount} filters active
            </Badge>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="h-9 px-3 bg-white hover:bg-gray-50 border-gray-300"
              >
                <ActiveIcon className="h-4 w-4 mr-2" />
                <span className="font-medium">{activeSortOption.label}</span>
                <ChevronDown className="h-4 w-4 ml-2 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="max-h-80 overflow-y-auto">
                {sortOptions.map((option, index) => {
                  const OptionIcon = option.icon;
                  const isActive = option.value === activeSort;
                  
                  return (
                    <button
                      key={option.value}
                      className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                        index !== sortOptions.length - 1 ? 'border-b border-gray-100' : ''
                      } ${isActive ? 'bg-blue-50 border-blue-100' : ''}`}
                      onClick={() => {
                        onSortChange(option.value);
                        setIsOpen(false);
                      }}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${
                          isActive ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                        }`}>
                          <OptionIcon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <p className={`font-medium ${
                              isActive ? 'text-blue-600' : 'text-gray-900'
                            }`}>
                              {option.label}
                            </p>
                            {isActive && (
                              <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                                Active
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            {option.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
              
              <div className="border-t border-gray-100 p-3 bg-gray-50">
                <div className="flex items-center text-xs text-gray-600">
                  <Eye className="h-3 w-3 mr-1" />
                  <span>Results update automatically when you change sort options</span>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}