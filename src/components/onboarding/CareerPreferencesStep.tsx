import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";
import { Heart, MapPin, X, DollarSign } from "lucide-react";
import { OnboardingData } from "../OnboardingFlow";

interface CareerPreferencesStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
}

const roleSuggestions = [
  "Software Engineer", "Product Manager", "UX/UI Designer", "Data Scientist", "Marketing Manager",
  "Sales Representative", "Project Manager", "Business Analyst", "DevOps Engineer", "Content Writer",
  "Graphic Designer", "Customer Success Manager", "HR Manager", "Financial Analyst", "Operations Manager"
];

const workStyleOptions = ["Remote", "Hybrid", "On-site"];
const employmentTypeOptions = ["Full-Time", "Part-Time", "Freelance", "Contract", "Internship"];

const popularLocations = [
  "New York, NY", "San Francisco, CA", "Los Angeles, CA", "Chicago, IL", "Austin, TX",
  "Seattle, WA", "Boston, MA", "Denver, CO", "Atlanta, GA", "Miami, FL", "Remote (US)",
  "London, UK", "Berlin, Germany", "Toronto, Canada", "Amsterdam, Netherlands"
];

export function CareerPreferencesStep({ data, updateData, onNext }: CareerPreferencesStepProps) {
  const [preferences, setPreferences] = useState(data.careerPreferences || {
    interestedRoles: [],
    workStyle: [],
    employmentType: [],
    salaryRange: { min: 40000, max: 120000 },
    locations: []
  });
  const [customRole, setCustomRole] = useState("");
  const [customLocation, setCustomLocation] = useState("");

  const addRole = (role: string) => {
    if (!(preferences.interestedRoles || []).includes(role) && role.trim() !== "") {
      setPreferences(prev => ({
        ...prev,
        interestedRoles: [...(prev.interestedRoles || []), role.trim()]
      }));
    }
  };

  const removeRole = (roleToRemove: string) => {
    setPreferences(prev => ({
      ...prev,
      interestedRoles: (prev.interestedRoles || []).filter(role => role !== roleToRemove)
    }));
  };

  const addLocation = (location: string) => {
    if (!(preferences.locations || []).includes(location) && location.trim() !== "") {
      setPreferences(prev => ({
        ...prev,
        locations: [...(prev.locations || []), location.trim()]
      }));
    }
  };

  const removeLocation = (locationToRemove: string) => {
    setPreferences(prev => ({
      ...prev,
      locations: (prev.locations || []).filter(location => location !== locationToRemove)
    }));
  };

  const toggleWorkStyle = (style: string) => {
    setPreferences(prev => ({
      ...prev,
      workStyle: (prev.workStyle || []).includes(style)
        ? (prev.workStyle || []).filter(s => s !== style)
        : [...(prev.workStyle || []), style]
    }));
  };

  const toggleEmploymentType = (type: string) => {
    setPreferences(prev => ({
      ...prev,
      employmentType: (prev.employmentType || []).includes(type)
        ? (prev.employmentType || []).filter(t => t !== type)
        : [...(prev.employmentType || []), type]
    }));
  };

  const handleSalaryChange = (field: 'min' | 'max', value: string) => {
    const numValue = parseInt(value.replace(/[^0-9]/g, '')) || 0;
    setPreferences(prev => ({
      ...prev,
      salaryRange: {
        ...prev.salaryRange,
        [field]: numValue
      }
    }));
  };

  const handleSubmit = () => {
    updateData({ careerPreferences: preferences });
    onNext();
  };

  const formatSalaryInput = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Heart className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl">Your Career Preferences 💝</CardTitle>
          <p className="text-muted-foreground">
            Help us understand what you're looking for in your next opportunity
          </p>
        </CardHeader>
        
        <CardContent className="space-y-8">
          {/* Interested Roles */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">What roles are you interested in?</Label>
            
            <div className="flex gap-2">
              <Input
                placeholder="Type a role and press Enter"
                value={customRole}
                onChange={(e) => setCustomRole(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (customRole.trim()) {
                      addRole(customRole);
                      setCustomRole("");
                    }
                  }
                }}
                className="flex-1"
              />
              <Button 
                onClick={() => {
                  if (customRole.trim()) {
                    addRole(customRole);
                    setCustomRole("");
                  }
                }}
                disabled={!customRole.trim()}
              >
                Add
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {(preferences.interestedRoles || []).map((role, index) => (
                <Badge key={index} variant="default" className="flex items-center gap-1 py-1 px-3">
                  {role}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0"
                    onClick={() => removeRole(role)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Popular roles:</Label>
              <div className="flex flex-wrap gap-2">
                {roleSuggestions.filter(role => !(preferences.interestedRoles || []).includes(role)).slice(0, 8).map(role => (
                  <Button
                    key={role}
                    variant="outline"
                    size="sm"
                    onClick={() => addRole(role)}
                    className="h-8"
                  >
                    + {role}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Work Style */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Preferred work style</Label>
            <div className="grid grid-cols-3 gap-4">
              {workStyleOptions.map(style => (
                <div key={style} className="flex items-center space-x-2">
                  <Checkbox
                    id={`workStyle-${style}`}
                    checked={(preferences.workStyle || []).includes(style)}
                    onCheckedChange={() => toggleWorkStyle(style)}
                  />
                  <Label htmlFor={`workStyle-${style}`} className="text-sm">
                    {style}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Employment Type */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Employment type</Label>
            <div className="grid grid-cols-3 gap-4">
              {employmentTypeOptions.map(type => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={`employmentType-${type}`}
                    checked={(preferences.employmentType || []).includes(type)}
                    onCheckedChange={() => toggleEmploymentType(type)}
                  />
                  <Label htmlFor={`employmentType-${type}`} className="text-sm">
                    {type}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Salary Range */}
          <div className="space-y-4">
            <Label className="text-base font-semibold flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Salary Range (Annual)
            </Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="min-salary" className="text-sm text-muted-foreground">
                  Minimum Desired Salary
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <Input
                    id="min-salary"
                    type="text"
                    placeholder="40,000"
                    value={formatSalaryInput(preferences.salaryRange?.min || 0)}
                    onChange={(e) => handleSalaryChange('min', e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-salary" className="text-sm text-muted-foreground">
                  Maximum Desired Salary
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <Input
                    id="max-salary"
                    type="text"
                    placeholder="120,000"
                    value={formatSalaryInput(preferences.salaryRange?.max || 0)}
                    onChange={(e) => handleSalaryChange('max', e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              This helps us show you relevant opportunities. Your salary preferences are private and you can leave this blank if you prefer.
            </p>
          </div>

          {/* Preferred Locations */}
          <div className="space-y-4">
            <Label className="text-base font-semibold flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Preferred locations
            </Label>
            
            <div className="flex gap-2">
              <Input
                placeholder="Type a location and press Enter"
                value={customLocation}
                onChange={(e) => setCustomLocation(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (customLocation.trim()) {
                      addLocation(customLocation);
                      setCustomLocation("");
                    }
                  }
                }}
                className="flex-1"
              />
              <Button 
                onClick={() => {
                  if (customLocation.trim()) {
                    addLocation(customLocation);
                    setCustomLocation("");
                  }
                }}
                disabled={!customLocation.trim()}
              >
                Add
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {(preferences.locations || []).map((location, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1 py-1 px-3">
                  {location}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0"
                    onClick={() => removeLocation(location)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Popular locations:</Label>
              <div className="flex flex-wrap gap-2">
                {popularLocations.filter(location => !(preferences.locations || []).includes(location)).slice(0, 8).map(location => (
                  <Button
                    key={location}
                    variant="outline"
                    size="sm"
                    onClick={() => addLocation(location)}
                    className="h-8"
                  >
                    + {location}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Tips Card */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h4 className="font-semibold text-orange-900 mb-2">💡 Preferences Tips</h4>
            <ul className="text-sm text-orange-800 space-y-1">
              <li>• Be specific about roles you want, but don't limit yourself too much</li>
              <li>• Consider remote work to expand your opportunities</li>
              <li>• Salary ranges help us filter relevant jobs for you</li>
              <li>• You can always adjust preferences later in your profile</li>
            </ul>
          </div>

          <Button 
            onClick={handleSubmit} 
            className="w-full py-6 text-base"
            size="lg"
          >
            Continue to Career Goals
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}