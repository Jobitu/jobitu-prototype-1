import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Switch } from "../ui/switch";
import { Separator } from "../ui/separator";
import { 
  ArrowLeft,
  ArrowRight,
  Check,
  MapPin,
  Building,
  Users,
  Clock,
  FileText,
  UserCheck,
  Video,
  Trophy,
  Plus,
  X,
  Info,
  AlertTriangle,
  Zap,
  Brain,
  Target,
  Calendar
} from "lucide-react";

interface JobCreationProps {
  onBack: () => void;
  onSave: (jobData: any) => void;
  editingJob?: any; // If provided, we're in edit mode
}

interface JobFormData {
  // Step 1: General Information
  title: string;
  department: string;
  location: string;
  locationType: 'remote' | 'onsite' | 'hybrid';
  employmentType: 'full-time' | 'part-time' | 'contract' | 'internship';
  experienceLevel: 'entry' | 'mid' | 'senior' | 'lead';
  salaryRange: {
    min: string;
    max: string;
    currency: string;
  };
  description: string;
  responsibilities: string[];
  requirements: string[];
  skills: string[];
  benefits: string[];
  
  // Step 2: Application Process
  processSteps: ProcessStep[];
  estimatedTimeToHire: string;
  autoRejectIncomplete: boolean;
  sendReminderEmails: boolean;
  
  // Step 3: Publishing
  publishImmediately: boolean;
  applicationDeadline: string;
  maxApplications: string;
}

interface ProcessStep {
  id: string;
  name: string;
  description: string;
  type: 'application' | 'assessment' | 'case-study' | 'interview' | 'evaluation';
  required: boolean;
  timeLimit?: string;
  position: number;
  icon: React.ReactNode;
}

const defaultProcessSteps: ProcessStep[] = [
  {
    id: 'application',
    name: 'Application Submission',
    description: 'Basic application form with resume and cover letter',
    type: 'application',
    required: true,
    position: 1,
    icon: <FileText className="h-4 w-4" />
  },
  {
    id: 'screening',
    name: 'Initial Screening',
    description: 'Automated screening based on requirements',
    type: 'evaluation',
    required: true,
    position: 2,
    icon: <UserCheck className="h-4 w-4" />
  },
  {
    id: 'assessment',
    name: 'Technical Assessment',
    description: 'Skills-based technical evaluation',
    type: 'assessment',
    required: false,
    timeLimit: '120 minutes',
    position: 3,
    icon: <Target className="h-4 w-4" />
  },
  {
    id: 'case-study',
    name: 'Case Study Project',
    description: 'Real-world problem solving exercise',
    type: 'case-study',
    required: false,
    timeLimit: '5 days',
    position: 4,
    icon: <Brain className="h-4 w-4" />
  },
  {
    id: 'interviews',
    name: 'Interview Rounds',
    description: 'Technical and cultural fit interviews',
    type: 'interview',
    required: true,
    position: 5,
    icon: <Video className="h-4 w-4" />
  },
  {
    id: 'final-evaluation',
    name: 'Final Evaluation',
    description: 'Final decision and offer preparation',
    type: 'evaluation',
    required: true,
    position: 6,
    icon: <Trophy className="h-4 w-4" />
  }
];

export function EmployerJobCreationPage({ onBack, onSave, editingJob }: JobCreationProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<JobFormData>({
    title: editingJob?.title || '',
    department: editingJob?.department || '',
    location: editingJob?.location || '',
    locationType: editingJob?.locationType || 'remote',
    employmentType: editingJob?.employmentType || 'full-time',
    experienceLevel: editingJob?.experienceLevel || 'mid',
    salaryRange: editingJob?.salaryRange || { min: '', max: '', currency: 'USD' },
    description: editingJob?.description || '',
    responsibilities: editingJob?.responsibilities || [''],
    requirements: editingJob?.requirements || [''],
    skills: editingJob?.skills || [],
    benefits: editingJob?.benefits || [''],
    processSteps: editingJob?.processSteps || defaultProcessSteps,
    estimatedTimeToHire: editingJob?.estimatedTimeToHire || '2-3 weeks',
    autoRejectIncomplete: editingJob?.autoRejectIncomplete || true,
    sendReminderEmails: editingJob?.sendReminderEmails || true,
    publishImmediately: editingJob?.publishImmediately || true,
    applicationDeadline: editingJob?.applicationDeadline || '',
    maxApplications: editingJob?.maxApplications || ''
  });

  const isEditMode = !!editingJob;
  const totalSteps = 3;
  const stepProgress = (currentStep / totalSteps) * 100;

  const updateFormData = (updates: Partial<JobFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const addListItem = (field: keyof JobFormData, value: string = '') => {
    if (Array.isArray(formData[field])) {
      updateFormData({
        [field]: [...(formData[field] as string[]), value]
      });
    }
  };

  const removeListItem = (field: keyof JobFormData, index: number) => {
    if (Array.isArray(formData[field])) {
      const newArray = [...(formData[field] as string[])];
      newArray.splice(index, 1);
      updateFormData({ [field]: newArray });
    }
  };

  const updateListItem = (field: keyof JobFormData, index: number, value: string) => {
    if (Array.isArray(formData[field])) {
      const newArray = [...(formData[field] as string[])];
      newArray[index] = value;
      updateFormData({ [field]: newArray });
    }
  };

  const updateProcessStep = (stepId: string, updates: Partial<ProcessStep>) => {
    const updatedSteps = formData.processSteps.map(step =>
      step.id === stepId ? { ...step, ...updates } : step
    );
    updateFormData({ processSteps: updatedSteps });
  };

  const addSkill = (skill: string) => {
    if (skill && !formData.skills.includes(skill)) {
      updateFormData({ skills: [...formData.skills, skill] });
    }
  };

  const removeSkill = (skillToRemove: string) => {
    updateFormData({ 
      skills: formData.skills.filter(skill => skill !== skillToRemove) 
    });
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return formData.title && formData.location && formData.description;
      case 2:
        return formData.processSteps.filter(step => step.required).length >= 2;
      case 3:
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps && canProceedToNext()) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-semibold">
                  {isEditMode ? 'Edit Job Posting' : 'Create New Job'}
                </h1>
                <p className="text-sm text-muted-foreground">
                  Step {currentStep} of {totalSteps}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm text-muted-foreground">
                {Math.round(stepProgress)}% Complete
              </div>
              <Progress value={stepProgress} className="w-24" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    step < currentStep 
                      ? 'bg-primary border-primary text-primary-foreground'
                      : step === currentStep
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-muted bg-muted text-muted-foreground'
                  }`}
                >
                  {step < currentStep ? <Check className="h-5 w-5" /> : step}
                </div>
                {step < 3 && (
                  <div 
                    className={`h-0.5 w-24 mx-4 ${
                      step < currentStep ? 'bg-primary' : 'bg-muted'
                    }`} 
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span className={currentStep >= 1 ? 'text-foreground' : 'text-muted-foreground'}>
              General Information
            </span>
            <span className={currentStep >= 2 ? 'text-foreground' : 'text-muted-foreground'}>
              Application Process
            </span>
            <span className={currentStep >= 3 ? 'text-foreground' : 'text-muted-foreground'}>
              Review & Publish
            </span>
          </div>
        </div>

        {/* Step 1: General Information */}
        {currentStep === 1 && (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Basic Job Details
                </CardTitle>
                <CardDescription>
                  Essential information about the position and requirements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g. Senior Frontend Engineer"
                      value={formData.title}
                      onChange={(e) => updateFormData({ title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      placeholder="e.g. Engineering"
                      value={formData.department}
                      onChange={(e) => updateFormData({ department: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      placeholder="e.g. San Francisco, CA"
                      value={formData.location}
                      onChange={(e) => updateFormData({ location: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Location Type</Label>
                    <Select value={formData.locationType} onValueChange={(value: any) => updateFormData({ locationType: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="remote">Remote</SelectItem>
                        <SelectItem value="onsite">On-site</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Employment Type</Label>
                    <Select value={formData.employmentType} onValueChange={(value: any) => updateFormData({ employmentType: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Experience Level</Label>
                    <Select value={formData.experienceLevel} onValueChange={(value: any) => updateFormData({ experienceLevel: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="entry">Entry Level</SelectItem>
                        <SelectItem value="mid">Mid Level</SelectItem>
                        <SelectItem value="senior">Senior Level</SelectItem>
                        <SelectItem value="lead">Lead/Principal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Salary Range</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Min"
                        value={formData.salaryRange.min}
                        onChange={(e) => updateFormData({ 
                          salaryRange: { ...formData.salaryRange, min: e.target.value }
                        })}
                      />
                      <Input
                        placeholder="Max"
                        value={formData.salaryRange.max}
                        onChange={(e) => updateFormData({ 
                          salaryRange: { ...formData.salaryRange, max: e.target.value }
                        })}
                      />
                      <Select 
                        value={formData.salaryRange.currency} 
                        onValueChange={(value) => updateFormData({ 
                          salaryRange: { ...formData.salaryRange, currency: value }
                        })}
                      >
                        <SelectTrigger className="w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="EUR">EUR</SelectItem>
                          <SelectItem value="TRY">TRY</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Job Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the role, company culture, and what makes this opportunity unique..."
                    className="min-h-[120px]"
                    value={formData.description}
                    onChange={(e) => updateFormData({ description: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Responsibilities */}
            <Card>
              <CardHeader>
                <CardTitle>Key Responsibilities</CardTitle>
                <CardDescription>
                  Main duties and responsibilities for this role
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.responsibilities.map((responsibility, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="Enter a key responsibility..."
                      value={responsibility}
                      onChange={(e) => updateListItem('responsibilities', index, e.target.value)}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeListItem('responsibilities', index)}
                      disabled={formData.responsibilities.length === 1}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" onClick={() => addListItem('responsibilities')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Responsibility
                </Button>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
                <CardDescription>
                  Essential qualifications and experience needed
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.requirements.map((requirement, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="Enter a requirement..."
                      value={requirement}
                      onChange={(e) => updateListItem('requirements', index, e.target.value)}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeListItem('requirements', index)}
                      disabled={formData.requirements.length === 1}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" onClick={() => addListItem('requirements')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Requirement
                </Button>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Required Skills</CardTitle>
                <CardDescription>
                  Technical and soft skills needed for success
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="gap-1">
                      {skill}
                      <button onClick={() => removeSkill(skill)}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a skill and press Enter..."
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addSkill(e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 2: Application Process */}
        {currentStep === 2 && (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Application Process Design
                </CardTitle>
                <CardDescription>
                  Configure the hiring workflow that candidates will follow. These steps will be reflected in your Applications pipeline.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900">Pipeline Integration</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        The steps you define here will create the workflow in your Applications pipeline. 
                        Required steps must be completed for candidates to advance.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {formData.processSteps.map((step, index) => (
                    <Card key={step.id} className={`transition-all ${step.required ? 'border-primary' : 'border-muted'}`}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                            step.required ? 'border-primary bg-primary/10' : 'border-muted bg-muted'
                          }`}>
                            {step.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-3">
                                <h3 className="font-medium">{step.name}</h3>
                                {step.required && (
                                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary">
                                    Required
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                <Switch
                                  checked={step.required}
                                  onCheckedChange={(checked) => updateProcessStep(step.id, { required: checked })}
                                />
                                <span className="text-sm text-muted-foreground">Required</span>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                            {step.timeLimit && (
                              <div className="flex items-center gap-2 text-sm">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span>Time limit: {step.timeLimit}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Estimated Time to Hire</Label>
                    <Select value={formData.estimatedTimeToHire} onValueChange={(value) => updateFormData({ estimatedTimeToHire: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-2 weeks">1-2 weeks</SelectItem>
                        <SelectItem value="2-3 weeks">2-3 weeks</SelectItem>
                        <SelectItem value="3-4 weeks">3-4 weeks</SelectItem>
                        <SelectItem value="1-2 months">1-2 months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Auto-reject incomplete applications</h4>
                      <p className="text-sm text-muted-foreground">
                        Automatically reject applications that don't complete required steps within deadline
                      </p>
                    </div>
                    <Switch
                      checked={formData.autoRejectIncomplete}
                      onCheckedChange={(checked) => updateFormData({ autoRejectIncomplete: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Send reminder emails</h4>
                      <p className="text-sm text-muted-foreground">
                        Send automated reminders to candidates for pending steps
                      </p>
                    </div>
                    <Switch
                      checked={formData.sendReminderEmails}
                      onCheckedChange={(checked) => updateFormData({ sendReminderEmails: checked })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 3: Review & Publish */}
        {currentStep === 3 && (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  Review & Publish
                </CardTitle>
                <CardDescription>
                  Final review of your job posting before publishing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Job Summary */}
                <div className="bg-muted/50 rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-4">{formData.title}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{formData.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{formData.employmentType}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{formData.experienceLevel}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{formData.estimatedTimeToHire}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-3">{formData.description}</p>
                </div>

                {/* Process Steps Summary */}
                <div>
                  <h4 className="font-medium mb-3">Application Process ({formData.processSteps.filter(s => s.required).length} required steps)</h4>
                  <div className="space-y-2">
                    {formData.processSteps.map((step, index) => (
                      <div key={step.id} className="flex items-center gap-3 p-2 rounded border">
                        {step.icon}
                        <span className="text-sm">{step.name}</span>
                        {step.required && (
                          <Badge variant="outline" className="ml-auto bg-primary/10 text-primary">Required</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Publishing Options */}
                <div className="space-y-4">
                  <h4 className="font-medium">Publishing Options</h4>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium">Publish immediately</h5>
                      <p className="text-sm text-muted-foreground">
                        Make this job visible to candidates right away
                      </p>
                    </div>
                    <Switch
                      checked={formData.publishImmediately}
                      onCheckedChange={(checked) => updateFormData({ publishImmediately: checked })}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="deadline">Application Deadline</Label>
                      <Input
                        id="deadline"
                        type="date"
                        value={formData.applicationDeadline}
                        onChange={(e) => updateFormData({ applicationDeadline: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxApps">Max Applications</Label>
                      <Input
                        id="maxApps"
                        type="number"
                        placeholder="Leave empty for unlimited"
                        value={formData.maxApplications}
                        onChange={(e) => updateFormData({ maxApplications: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* Candidate Visibility Rules */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-amber-900">Candidate Visibility Rules</h4>
                      <ul className="text-sm text-amber-700 mt-1 space-y-1">
                        <li>• Before applying: Candidates see only general job information</li>
                        <li>• After applying: Process steps and requirements become visible</li>
                        <li>• Incomplete applications auto-expire based on your settings</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6 border-t">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <div className="flex items-center gap-3">
            {currentStep < totalSteps ? (
              <Button
                onClick={handleNext}
                disabled={!canProceedToNext()}
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleSave}>
                {isEditMode ? 'Update Job' : 'Publish Job'}
                <Check className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

