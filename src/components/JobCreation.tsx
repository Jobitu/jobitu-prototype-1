import { useState } from "react";
import { useNotifications } from "./NotificationContext";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Alert, AlertDescription } from "./ui/alert";
import { 
  ArrowLeft,
  Briefcase,
  Clock,
  DollarSign,
  MapPin,
  Users,
  Calendar,
  FileText,
  Upload,
  Eye,
  Save,
  Send,
  Building,
  Zap,
  Target,
  Globe,
  Coffee,
  Star,
  CheckCircle,
  AlertCircle,
  Plus,
  X,
  Lightbulb
} from "lucide-react";

interface JobCreationProps {
  onBack: () => void;
  onSave?: (jobData: any) => void;
  onPublish?: (jobData: any) => void;
}

type JobType = 'freelance' | 'contract' | '';
type LocationType = 'remote' | 'hybrid' | 'onsite';
type EmploymentType = 'full-time' | 'part-time' | 'internship';
type PaymentType = 'hourly' | 'fixed' | 'monthly';

interface JobFormData {
  jobType: JobType;
  title: string;
  category: string;
  locationType: LocationType;
  location: string;
  paymentType: PaymentType;
  budget: {
    min: string;
    max: string;
    currency: string;
  };
  skills: string[];
  description: string;
  requirements: string[];
  
  // Freelance-specific
  duration: string;
  paymentMilestones: boolean;
  projectBrief: string;
  attachments: File[];
  
  // Contract-specific
  employmentType: EmploymentType;
  startDate: string;
  department: string;
  benefits: string[];
  companyPerks: string[];
}

const jobCategories = [
  'Engineering & Development',
  'Design & Creative',
  'Marketing & Sales',
  'Product Management',
  'Data & Analytics',
  'Customer Success',
  'HR & Operations',
  'Finance & Legal',
  'Consulting',
  'Other'
];

const skillsSuggestions = [
  'React', 'TypeScript', 'Node.js', 'Python', 'JavaScript', 'AWS', 'Docker',
  'UI/UX Design', 'Figma', 'Photoshop', 'Illustrator', 'Sketch',
  'Digital Marketing', 'SEO', 'Content Marketing', 'Social Media',
  'Project Management', 'Scrum', 'Agile', 'Jira',
  'Data Analysis', 'SQL', 'Tableau', 'Excel', 'R'
];

const benefitOptions = [
  'Health Insurance',
  'Dental Insurance',
  'Vision Insurance',
  '401(k) Matching',
  'Flexible PTO',
  'Remote Work',
  'Professional Development',
  'Stock Options',
  'Commuter Benefits',
  'Gym Membership'
];

export function JobCreation({ onBack, onSave, onPublish }: JobCreationProps) {
  const { showToast } = useNotifications();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<JobFormData>({
    jobType: '',
    title: '',
    category: '',
    locationType: 'remote',
    location: '',
    paymentType: 'fixed',
    budget: { min: '', max: '', currency: 'USD' },
    skills: [],
    description: '',
    requirements: [],
    duration: '',
    paymentMilestones: false,
    projectBrief: '',
    attachments: [],
    employmentType: 'full-time',
    startDate: '',
    department: '',
    benefits: [],
    companyPerks: []
  });

  const [skillInput, setSkillInput] = useState('');
  const [requirementInput, setRequirementInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateFormData = (field: keyof JobFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const addSkill = (skill: string) => {
    if (skill && !formData.skills.includes(skill)) {
      updateFormData('skills', [...formData.skills, skill]);
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    updateFormData('skills', formData.skills.filter(s => s !== skill));
  };

  const addRequirement = (requirement: string) => {
    if (requirement && !formData.requirements.includes(requirement)) {
      updateFormData('requirements', [...formData.requirements, requirement]);
      setRequirementInput('');
    }
  };

  const removeRequirement = (requirement: string) => {
    updateFormData('requirements', formData.requirements.filter(r => r !== requirement));
  };

  const toggleBenefit = (benefit: string) => {
    const benefits = formData.benefits.includes(benefit)
      ? formData.benefits.filter(b => b !== benefit)
      : [...formData.benefits, benefit];
    updateFormData('benefits', benefits);
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.jobType) newErrors.jobType = 'Please select a job type';
        if (!formData.title) newErrors.title = 'Job title is required';
        if (!formData.category) newErrors.category = 'Category is required';
        break;
      case 2:
        if (!formData.description) newErrors.description = 'Job description is required';
        if (formData.skills.length === 0) newErrors.skills = 'At least one skill is required';
        break;
      case 3:
        if (!formData.budget.min) newErrors.budgetMin = 'Minimum budget is required';
        if (formData.locationType !== 'remote' && !formData.location) {
          newErrors.location = 'Location is required for non-remote positions';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSave = () => {
    showToast({
      type: 'success',
      title: 'Draft saved',
      message: 'Your job posting has been saved as a draft.',
      duration: 3000
    });
    onSave?.(formData);
  };

  const handlePublish = () => {
    if (validateStep(currentStep)) {
      showToast({
        type: 'success',
        title: 'Job posted successfully',
        message: 'Your job posting is now live and visible to candidates.',
        duration: 4000
      });
      onPublish?.(formData);
    }
  };

  const getStepTitle = (step: number) => {
    switch (step) {
      case 1: return 'Job Type & Basics';
      case 2: return 'Description & Requirements';
      case 3: return 'Location & Compensation';
      case 4: return 'Additional Details';
      default: return 'Job Creation';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 to-green-50/30">
      {/* Header */}
      <div className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" onClick={onBack} className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-blue-600 to-green-600 w-8 h-8 rounded-lg flex items-center justify-center">
                  <Briefcase className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold">Create Job Posting</h1>
                  <p className="text-sm text-muted-foreground">{getStepTitle(currentStep)}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              {currentStep === 4 && (
                <Button onClick={handlePublish}>
                  <Send className="h-4 w-4 mr-2" />
                  Publish Job
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  ${step <= currentStep 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                  }
                `}>
                  {step < currentStep ? <CheckCircle className="h-4 w-4" /> : step}
                </div>
                {step < 4 && (
                  <div className={`
                    w-16 h-1 mx-2
                    ${step < currentStep ? 'bg-blue-600' : 'bg-gray-200'}
                  `} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>Job Type</span>
            <span>Description</span>
            <span>Compensation</span>
            <span>Details</span>
          </div>
        </div>

        {/* Step 1: Job Type & Basics */}
        {currentStep === 1 && (
          <div className="space-y-6">
            {/* Job Type Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  What kind of job are you posting?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup 
                  value={formData.jobType} 
                  onValueChange={(value: JobType) => updateFormData('jobType', value)}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <div className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
                    formData.jobType === 'freelance' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <div className="flex items-center space-x-2 mb-3">
                      <RadioGroupItem value="freelance" id="freelance" />
                      <Label htmlFor="freelance" className="cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 p-2 rounded-lg">
                            <Zap className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium">Freelance Project</div>
                            <div className="text-sm text-muted-foreground">Short-term, project-based work</div>
                          </div>
                        </div>
                      </Label>
                    </div>
                    <p className="text-sm text-muted-foreground ml-6">
                      Perfect for specific projects, one-time tasks, or short-term collaborations. 
                      Typically 1 week to 6 months duration.
                    </p>
                  </div>

                  <div className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
                    formData.jobType === 'contract' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <div className="flex items-center space-x-2 mb-3">
                      <RadioGroupItem value="contract" id="contract" />
                      <Label htmlFor="contract" className="cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="bg-green-100 p-2 rounded-lg">
                            <Building className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <div className="font-medium">Contract Role</div>
                            <div className="text-sm text-muted-foreground">Longer-term employment relationship</div>
                          </div>
                        </div>
                      </Label>
                    </div>
                    <p className="text-sm text-muted-foreground ml-6">
                      Ideal for ongoing roles, team integration, and longer commitments. 
                      Can include benefits and traditional employment structure.
                    </p>
                  </div>
                </RadioGroup>
                {errors.jobType && (
                  <p className="text-sm text-red-600 mt-2">{errors.jobType}</p>
                )}
              </CardContent>
            </Card>

            {formData.jobType && (
              <>
                {/* Basic Job Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">
                        {formData.jobType === 'freelance' ? 'Project Title' : 'Job Title'} *
                      </Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => updateFormData('title', e.target.value)}
                        placeholder={formData.jobType === 'freelance' 
                          ? "e.g., Build a React Dashboard for Analytics" 
                          : "e.g., Senior Frontend Developer"
                        }
                      />
                      {errors.title && (
                        <p className="text-sm text-red-600">{errors.title}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select value={formData.category} onValueChange={(value) => updateFormData('category', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {jobCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.category && (
                        <p className="text-sm text-red-600">{errors.category}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Location Type</Label>
                      <RadioGroup 
                        value={formData.locationType} 
                        onValueChange={(value: LocationType) => updateFormData('locationType', value)}
                        className="flex gap-6"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="remote" id="remote" />
                          <Label htmlFor="remote">Remote</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="hybrid" id="hybrid" />
                          <Label htmlFor="hybrid">Hybrid</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="onsite" id="onsite" />
                          <Label htmlFor="onsite">On-site</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {formData.locationType !== 'remote' && (
                      <div className="space-y-2">
                        <Label htmlFor="location">Location *</Label>
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) => updateFormData('location', e.target.value)}
                          placeholder="e.g., San Francisco, CA or New York, NY"
                        />
                        {errors.location && (
                          <p className="text-sm text-red-600">{errors.location}</p>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        )}

        {/* Step 2: Description & Requirements */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {formData.jobType === 'freelance' ? 'Project Description' : 'Job Description'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => updateFormData('description', e.target.value)}
                    placeholder={formData.jobType === 'freelance' 
                      ? "Describe the project scope, deliverables, and what success looks like..."
                      : "Describe the role, responsibilities, and what the candidate will be working on..."
                    }
                    className="min-h-32"
                  />
                  {errors.description && (
                    <p className="text-sm text-red-600">{errors.description}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="skills">Required Skills *</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="gap-1">
                        {skill}
                        <button onClick={() => removeSkill(skill)}>
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      placeholder="Type a skill and press Enter"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addSkill(skillInput);
                        }
                      }}
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => addSkill(skillInput)}
                      disabled={!skillInput}
                    >
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {skillsSuggestions
                      .filter(skill => !formData.skills.includes(skill))
                      .slice(0, 8)
                      .map((skill) => (
                        <Button
                          key={skill}
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => addSkill(skill)}
                          className="h-7 text-xs"
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          {skill}
                        </Button>
                      ))
                    }
                  </div>
                  {errors.skills && (
                    <p className="text-sm text-red-600">{errors.skills}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements">
                    {formData.jobType === 'freelance' ? 'Project Requirements' : 'Job Requirements'}
                  </Label>
                  <div className="space-y-2">
                    {formData.requirements.map((requirement, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="flex-1">{requirement}</span>
                        <button onClick={() => removeRequirement(requirement)}>
                          <X className="h-3 w-3 text-gray-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={requirementInput}
                      onChange={(e) => setRequirementInput(e.target.value)}
                      placeholder="Add a requirement"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addRequirement(requirementInput);
                        }
                      }}
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => addRequirement(requirementInput)}
                      disabled={!requirementInput}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 3: Location & Compensation */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Compensation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Payment Type</Label>
                  <RadioGroup 
                    value={formData.paymentType} 
                    onValueChange={(value: PaymentType) => updateFormData('paymentType', value)}
                    className="flex gap-6"
                  >
                    {formData.jobType === 'freelance' ? (
                      <>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="fixed" id="fixed" />
                          <Label htmlFor="fixed">Fixed Price</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="hourly" id="hourly" />
                          <Label htmlFor="hourly">Hourly Rate</Label>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="monthly" id="monthly" />
                          <Label htmlFor="monthly">Monthly Salary</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="hourly" id="hourly" />
                          <Label htmlFor="hourly">Hourly Rate</Label>
                        </div>
                      </>
                    )}
                  </RadioGroup>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="budgetMin">
                      {formData.paymentType === 'fixed' ? 'Budget' : 
                       formData.paymentType === 'hourly' ? 'Min Rate' : 'Min Salary'} *
                    </Label>
                    <Input
                      id="budgetMin"
                      type="number"
                      value={formData.budget.min}
                      onChange={(e) => updateFormData('budget', { ...formData.budget, min: e.target.value })}
                      placeholder="0"
                    />
                    {errors.budgetMin && (
                      <p className="text-sm text-red-600">{errors.budgetMin}</p>
                    )}
                  </div>
                  
                  {formData.paymentType !== 'fixed' && (
                    <div className="space-y-2">
                      <Label htmlFor="budgetMax">
                        {formData.paymentType === 'hourly' ? 'Max Rate' : 'Max Salary'}
                      </Label>
                      <Input
                        id="budgetMax"
                        type="number"
                        value={formData.budget.max}
                        onChange={(e) => updateFormData('budget', { ...formData.budget, max: e.target.value })}
                        placeholder="0"
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select 
                      value={formData.budget.currency} 
                      onValueChange={(value) => updateFormData('budget', { ...formData.budget, currency: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                        <SelectItem value="CAD">CAD ($)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Alert>
                  <Lightbulb className="h-4 w-4" />
                  <AlertDescription>
                    {formData.paymentType === 'hourly' 
                      ? 'Hourly rates help attract freelancers and contractors. Consider market rates for the skills required.'
                      : formData.paymentType === 'fixed'
                      ? 'Fixed pricing works well for defined project scopes. Make sure your budget aligns with the project complexity.'
                      : 'Competitive salaries attract the best talent. Research market rates for similar positions in your area.'
                    }
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 4: Additional Details */}
        {currentStep === 4 && (
          <div className="space-y-6">
            {formData.jobType === 'freelance' ? (
              <>
                {/* Freelance-specific fields */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Project Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="duration">Expected Duration</Label>
                      <Select value={formData.duration} onValueChange={(value) => updateFormData('duration', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-week">1 week</SelectItem>
                          <SelectItem value="2-weeks">2 weeks</SelectItem>
                          <SelectItem value="1-month">1 month</SelectItem>
                          <SelectItem value="2-months">2 months</SelectItem>
                          <SelectItem value="3-months">3 months</SelectItem>
                          <SelectItem value="6-months">6 months</SelectItem>
                          <SelectItem value="ongoing">Ongoing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="milestones"
                        checked={formData.paymentMilestones}
                        onCheckedChange={(checked) => updateFormData('paymentMilestones', checked)}
                      />
                      <Label htmlFor="milestones">Enable milestone-based payments</Label>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="projectBrief">Project Brief (Optional)</Label>
                      <Textarea
                        id="projectBrief"
                        value={formData.projectBrief}
                        onChange={(e) => updateFormData('projectBrief', e.target.value)}
                        placeholder="Additional context, background, or specific instructions for the project..."
                        className="min-h-24"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Reference Files (Optional)</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Upload design files, examples, or requirements documents
                        </p>
                        <Button variant="outline" size="sm">
                          Choose Files
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <>
                {/* Contract-specific fields */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Employment Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Employment Type</Label>
                      <RadioGroup 
                        value={formData.employmentType} 
                        onValueChange={(value: EmploymentType) => updateFormData('employmentType', value)}
                        className="flex gap-6"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="full-time" id="full-time" />
                          <Label htmlFor="full-time">Full-time</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="part-time" id="part-time" />
                          <Label htmlFor="part-time">Part-time</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="internship" id="internship" />
                          <Label htmlFor="internship">Internship</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="startDate">Expected Start Date</Label>
                        <Input
                          id="startDate"
                          type="date"
                          value={formData.startDate}
                          onChange={(e) => updateFormData('startDate', e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Input
                          id="department"
                          value={formData.department}
                          onChange={(e) => updateFormData('department', e.target.value)}
                          placeholder="e.g., Engineering, Marketing, Sales"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5" />
                      Benefits & Perks
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Benefits</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {benefitOptions.map((benefit) => (
                          <div key={benefit} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`benefit-${benefit}`}
                              checked={formData.benefits.includes(benefit)}
                              onCheckedChange={() => toggleBenefit(benefit)}
                            />
                            <Label htmlFor={`benefit-${benefit}`} className="text-sm">
                              {benefit}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Preview Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-4 bg-muted/30">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{formData.title || 'Job Title'}</h3>
                      <p className="text-sm text-muted-foreground">TechFlow Inc. • {formData.locationType}</p>
                    </div>
                    <Badge>{formData.jobType}</Badge>
                  </div>
                  <p className="text-sm mb-3 line-clamp-2">
                    {formData.description || 'Job description will appear here...'}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {formData.skills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {formData.skills.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{formData.skills.length - 3} more
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">
                      {formData.budget.min && (
                        `${formData.budget.currency} ${formData.budget.min}${
                          formData.budget.max ? ` - ${formData.budget.max}` : ''
                        }${formData.paymentType === 'hourly' ? '/hr' : formData.paymentType === 'monthly' ? '/month' : ''}`
                      )}
                    </span>
                    <span className="text-muted-foreground">
                      {formData.jobType === 'freelance' ? formData.duration : formData.employmentType}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between pt-6">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          
          {currentStep < 4 ? (
            <Button onClick={handleNext}>
              Next
            </Button>
          ) : (
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button onClick={handlePublish}>
                <Send className="h-4 w-4 mr-2" />
                Publish Job
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}