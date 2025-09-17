import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { 
  ArrowLeft,
  Plus,
  X,
  MapPin,
  Building,
  Briefcase,
  DollarSign,
  Code,
  Target,
  Clock,
  Users,
  Save,
  CheckCircle
} from "lucide-react";

interface CreateJobFocusPageProps {
  onBack: () => void;
  onSave: (focusData: any) => void;
  editingFocus?: any; // If editing an existing focus
}

const locationOptions = [
  'Remote',
  'San Francisco, CA',
  'New York, NY',
  'Los Angeles, CA',
  'Seattle, WA',
  'Austin, TX',
  'Chicago, IL',
  'Boston, MA',
  'Denver, CO',
  'Miami, FL'
];

const workModeOptions = [
  { id: 'remote', label: 'Remote' },
  { id: 'hybrid', label: 'Hybrid' },
  { id: 'onsite', label: 'On-site' }
];

const companySizeOptions = [
  { id: 'startup', label: '1-10 employees', value: '1-10' },
  { id: 'small', label: '11-50 employees', value: '11-50' },
  { id: 'medium', label: '51-200 employees', value: '51-200' },
  { id: 'large', label: '201-1000 employees', value: '201-1000' },
  { id: 'enterprise', label: '1000+ employees', value: '1000+' }
];

const industryOptions = [
  'Technology',
  'SaaS',
  'E-commerce',
  'Fintech',
  'Healthcare',
  'Education',
  'Gaming',
  'Social Media',
  'AI/ML',
  'Blockchain',
  'Media & Entertainment',
  'Automotive',
  'Real Estate',
  'Travel & Hospitality'
];

const roleOptions = [
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'Mobile Developer',
  'DevOps Engineer',
  'Data Scientist',
  'Product Manager',
  'UI/UX Designer',
  'Software Engineer',
  'Technical Lead'
];

const seniorityOptions = [
  { id: 'junior', label: 'Junior (0-2 years)' },
  { id: 'mid', label: 'Mid-level (2-5 years)' },
  { id: 'senior', label: 'Senior (5-8 years)' },
  { id: 'lead', label: 'Lead (8+ years)' },
  { id: 'principal', label: 'Principal/Staff (10+ years)' }
];

const commonSkills = [
  'JavaScript', 'TypeScript', 'React', 'Angular', 'Vue.js',
  'Node.js', 'Python', 'Java', 'C#', 'Go',
  'HTML', 'CSS', 'SCSS', 'Tailwind CSS', 'Bootstrap',
  'Next.js', 'Nuxt.js', 'Express.js', 'FastAPI', 'Django',
  'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'GraphQL',
  'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes',
  'Git', 'Jest', 'Cypress', 'Webpack', 'Vite'
];

export function CreateJobFocusPage({ onBack, onSave, editingFocus }: CreateJobFocusPageProps) {
  const [focusData, setFocusData] = useState({
    title: editingFocus?.title || '',
    description: editingFocus?.description || '',
    locations: editingFocus?.criteria?.location || [],
    workModes: editingFocus?.criteria?.workMode || [],
    companySizes: editingFocus?.criteria?.companySize || [],
    role: editingFocus?.criteria?.role || '',
    seniority: editingFocus?.criteria?.seniority || '',
    industries: editingFocus?.criteria?.industry || [],
    salaryMin: editingFocus?.criteria?.salaryRange?.split(' - ')[0]?.replace('$', '').replace('k', '') || '',
    salaryMax: editingFocus?.criteria?.salaryRange?.split(' - ')[1]?.replace('$', '').replace('k', '') || '',
    requiredSkills: editingFocus?.criteria?.requiredSkills || [],
    preferredSkills: editingFocus?.criteria?.preferredSkills || [],
    customLocation: '',
    customSkill: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;

  const handleInputChange = (field: string, value: any) => {
    setFocusData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayToggle = (field: string, value: string) => {
    setFocusData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) 
        ? prev[field].filter((item: string) => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleAddCustomItem = (field: string, customField: string) => {
    const customValue = focusData[customField];
    if (customValue.trim() && !focusData[field].includes(customValue.trim())) {
      setFocusData(prev => ({
        ...prev,
        [field]: [...prev[field], customValue.trim()],
        [customField]: ''
      }));
    }
  };

  const handleRemoveItem = (field: string, value: string) => {
    setFocusData(prev => ({
      ...prev,
      [field]: prev[field].filter((item: string) => item !== value)
    }));
  };

  const handleSave = () => {
    const formattedData = {
      ...focusData,
      salaryRange: focusData.salaryMin && focusData.salaryMax 
        ? `$${focusData.salaryMin}k - $${focusData.salaryMax}k`
        : '',
      active: true,
      createdDate: new Date().toISOString().split('T')[0]
    };
    onSave(formattedData);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return focusData.title.trim() !== '';
      case 2:
        return focusData.locations.length > 0;
      case 3:
        return focusData.role && focusData.seniority;
      case 4:
        return focusData.companySizes.length > 0;
      case 5:
        return focusData.requiredSkills.length > 0;
      case 6:
        return true;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-blue-600" />
                <span>Basic Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="title">Focus Title *</Label>
                <Input
                  id="title"
                  value={focusData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="e.g., Senior Frontend Developer"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={focusData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe what type of roles you're looking for..."
                  className="mt-2"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                <span>Location & Work Mode</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Preferred Locations *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                  {locationOptions.map((location) => (
                    <div key={location} className="flex items-center space-x-2">
                      <Checkbox
                        id={`location-${location}`}
                        checked={focusData.locations.includes(location)}
                        onCheckedChange={() => handleArrayToggle('locations', location)}
                      />
                      <Label htmlFor={`location-${location}`} className="text-sm">{location}</Label>
                    </div>
                  ))}
                </div>
                <div className="flex items-center space-x-2 mt-3">
                  <Input
                    value={focusData.customLocation}
                    onChange={(e) => handleInputChange('customLocation', e.target.value)}
                    placeholder="Add custom location"
                    className="flex-1"
                  />
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleAddCustomItem('locations', 'customLocation')}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {focusData.locations.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {focusData.locations.map((location) => (
                      <Badge key={location} variant="secondary" className="flex items-center space-x-1">
                        <span>{location}</span>
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => handleRemoveItem('locations', location)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <Label>Work Mode</Label>
                <div className="grid grid-cols-3 gap-3 mt-3">
                  {workModeOptions.map((mode) => (
                    <div key={mode.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`workmode-${mode.id}`}
                        checked={focusData.workModes.includes(mode.label)}
                        onCheckedChange={() => handleArrayToggle('workModes', mode.label)}
                      />
                      <Label htmlFor={`workmode-${mode.id}`} className="text-sm">{mode.label}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Briefcase className="h-5 w-5 text-blue-600" />
                <span>Role & Experience</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Target Role *</Label>
                <select
                  value={focusData.role}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  className="w-full mt-2 p-2 border rounded-lg"
                >
                  <option value="">Select a role</option>
                  {roleOptions.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>

              <div>
                <Label>Seniority Level *</Label>
                <div className="space-y-2 mt-3">
                  {seniorityOptions.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id={`seniority-${option.id}`}
                        name="seniority"
                        value={option.id}
                        checked={focusData.seniority === option.id}
                        onChange={(e) => handleInputChange('seniority', e.target.value)}
                      />
                      <Label htmlFor={`seniority-${option.id}`} className="text-sm">{option.label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Salary Range (optional)</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <Input
                    value={focusData.salaryMin}
                    onChange={(e) => handleInputChange('salaryMin', e.target.value)}
                    placeholder="120"
                    className="flex-1"
                  />
                  <span>k to</span>
                  <Input
                    value={focusData.salaryMax}
                    onChange={(e) => handleInputChange('salaryMax', e.target.value)}
                    placeholder="180"
                    className="flex-1"
                  />
                  <span>k USD</span>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building className="h-5 w-5 text-blue-600" />
                <span>Company Preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Company Size *</Label>
                <div className="space-y-2 mt-3">
                  {companySizeOptions.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`company-${option.id}`}
                        checked={focusData.companySizes.includes(option.value)}
                        onCheckedChange={() => handleArrayToggle('companySizes', option.value)}
                      />
                      <Label htmlFor={`company-${option.id}`} className="text-sm">{option.label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Industry (optional)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                  {industryOptions.map((industry) => (
                    <div key={industry} className="flex items-center space-x-2">
                      <Checkbox
                        id={`industry-${industry}`}
                        checked={focusData.industries.includes(industry)}
                        onCheckedChange={() => handleArrayToggle('industries', industry)}
                      />
                      <Label htmlFor={`industry-${industry}`} className="text-sm">{industry}</Label>
                    </div>
                  ))}
                </div>
                {focusData.industries.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {focusData.industries.map((industry) => (
                      <Badge key={industry} variant="secondary" className="flex items-center space-x-1">
                        <span>{industry}</span>
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => handleRemoveItem('industries', industry)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );

      case 5:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Code className="h-5 w-5 text-blue-600" />
                <span>Skills & Requirements</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Required Skills *</Label>
                <p className="text-sm text-muted-foreground mt-1">Skills that jobs must have</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3 max-h-60 overflow-y-auto">
                  {commonSkills.map((skill) => (
                    <div key={skill} className="flex items-center space-x-2">
                      <Checkbox
                        id={`required-${skill}`}
                        checked={focusData.requiredSkills.includes(skill)}
                        onCheckedChange={() => handleArrayToggle('requiredSkills', skill)}
                      />
                      <Label htmlFor={`required-${skill}`} className="text-sm">{skill}</Label>
                    </div>
                  ))}
                </div>
                <div className="flex items-center space-x-2 mt-3">
                  <Input
                    value={focusData.customSkill}
                    onChange={(e) => handleInputChange('customSkill', e.target.value)}
                    placeholder="Add custom skill"
                    className="flex-1"
                  />
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleAddCustomItem('requiredSkills', 'customSkill')}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {focusData.requiredSkills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {focusData.requiredSkills.map((skill) => (
                      <Badge key={skill} variant="default" className="flex items-center space-x-1">
                        <span>{skill}</span>
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => handleRemoveItem('requiredSkills', skill)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <Label>Preferred Skills (optional)</Label>
                <p className="text-sm text-muted-foreground mt-1">Nice to have skills that improve matches</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3 max-h-40 overflow-y-auto">
                  {commonSkills.filter(skill => !focusData.requiredSkills.includes(skill)).map((skill) => (
                    <div key={skill} className="flex items-center space-x-2">
                      <Checkbox
                        id={`preferred-${skill}`}
                        checked={focusData.preferredSkills.includes(skill)}
                        onCheckedChange={() => handleArrayToggle('preferredSkills', skill)}
                      />
                      <Label htmlFor={`preferred-${skill}`} className="text-sm">{skill}</Label>
                    </div>
                  ))}
                </div>
                {focusData.preferredSkills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {focusData.preferredSkills.map((skill) => (
                      <Badge key={skill} variant="outline" className="flex items-center space-x-1">
                        <span>{skill}</span>
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => handleRemoveItem('preferredSkills', skill)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );

      case 6:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>Review & Save</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium mb-4">{focusData.title}</h3>
                {focusData.description && (
                  <p className="text-sm text-muted-foreground mb-4">{focusData.description}</p>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Locations:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {focusData.locations.map((location) => (
                        <Badge key={location} variant="secondary" className="text-xs">{location}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <span className="font-medium">Work Mode:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {focusData.workModes.map((mode) => (
                        <Badge key={mode} variant="secondary" className="text-xs">{mode}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <span className="font-medium">Role:</span>
                    <p className="text-muted-foreground">{focusData.role} ({focusData.seniority})</p>
                  </div>
                  
                  {focusData.salaryMin && focusData.salaryMax && (
                    <div>
                      <span className="font-medium">Salary:</span>
                      <p className="text-muted-foreground">${focusData.salaryMin}k - ${focusData.salaryMax}k</p>
                    </div>
                  )}
                  
                  <div className="md:col-span-2">
                    <span className="font-medium">Required Skills:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {focusData.requiredSkills.map((skill) => (
                        <Badge key={skill} variant="default" className="text-xs">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  {focusData.preferredSkills.length > 0 && (
                    <div className="md:col-span-2">
                      <span className="font-medium">Preferred Skills:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {focusData.preferredSkills.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-xl">{editingFocus ? 'Edit Job Focus' : 'Create Job Focus'}</h1>
            <p className="text-sm text-muted-foreground">
              Step {currentStep} of {totalSteps}: Set up your personalized job search criteria
            </p>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Progress</span>
          <span className="text-sm text-muted-foreground">{currentStep}/{totalSteps}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Step Content */}
      <div className="mb-6">
        {renderStep()}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button 
          variant="outline" 
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
        >
          Previous
        </Button>
        
        <div className="flex items-center space-x-2">
          {currentStep < totalSteps ? (
            <Button 
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={!canProceed()}
            >
              Next
            </Button>
          ) : (
            <Button 
              onClick={handleSave}
              disabled={!canProceed()}
              className="bg-green-600 hover:bg-green-700"
            >
              <Save className="h-4 w-4 mr-2" />
              {editingFocus ? 'Update Focus' : 'Create Focus'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}