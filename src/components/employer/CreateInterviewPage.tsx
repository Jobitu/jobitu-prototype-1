import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Switch } from "../ui/switch";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { 
  ArrowLeft,
  Calendar as CalendarIcon,
  Clock,
  Video,
  Phone,
  MapPin,
  Users,
  Plus,
  X,
  FileText,
  User,
  Building,
  Mail,
  Info,
  AlertCircle,
  Upload,
  Link as LinkIcon,
  Save,
  Send
} from "lucide-react";

interface CreateInterviewPageProps {
  onBack: () => void;
  onSave: (interviewData: InterviewFormData) => void;
  editingInterview?: any; // If provided, we're in edit mode
}

interface InterviewFormData {
  // Basic Information
  title: string;
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  candidateAvatar?: string;
  jobTitle: string;
  jobId: string;
  
  // Schedule Details
  date: string;
  time: string;
  duration: number;
  type: 'online' | 'in-person' | 'phone';
  
  // Location/Meeting Details
  location?: string;
  meetingLink?: string;
  
  // Participants
  interviewers: Array<{
    id: string;
    name: string;
    role: string;
    email: string;
    avatar?: string;
  }>;
  
  // Interview Content
  agenda: string;
  suggestedQuestions: string[];
  
  // Optional attachments and evaluation
  preparationMaterials: Array<{
    name: string;
    type: 'pdf' | 'video' | 'link' | 'article';
    url: string;
    description: string;
  }>;
  evaluationCriteria: string[];
  
  // Settings
  sendCalendarInvite: boolean;
  notifyCandidate: boolean;
  sendReminderEmails: boolean;
}

// Mock data for dropdowns
const mockCandidates = [
  {
    id: 'cand-1',
    name: 'Sarah Chen',
    email: 'sarah.chen@email.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop',
    jobTitle: 'Senior Frontend Developer',
    jobId: 'job-1'
  },
  {
    id: 'cand-2',
    name: 'Michael Rodriguez',
    email: 'michael.rodriguez@email.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    jobTitle: 'Product Manager',
    jobId: 'job-2'
  },
  {
    id: 'cand-3',
    name: 'Emily Johnson',
    email: 'emily.johnson@email.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    jobTitle: 'UX Designer',
    jobId: 'job-3'
  }
];

const mockInterviewers = [
  {
    id: 'int-1',
    name: 'Alex Johnson',
    role: 'Engineering Manager',
    email: 'alex@company.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop'
  },
  {
    id: 'int-2',
    name: 'Sarah Wilson',
    role: 'Senior Developer',
    email: 'sarah@company.com'
  },
  {
    id: 'int-3',
    name: 'Emily Davis',
    role: 'Head of Product',
    email: 'emily@company.com'
  },
  {
    id: 'int-4',
    name: 'David Kim',
    role: 'Design Lead',
    email: 'david@company.com'
  },
  {
    id: 'int-5',
    name: 'Mike Chen',
    role: 'Senior Engineer',
    email: 'mike@company.com'
  }
];

const defaultEvaluationCriteria = [
  'Communication Skills',
  'Technical Knowledge',
  'Problem Solving',
  'Cultural Fit',
  'Leadership Potential'
];

export function CreateInterviewPage({ onBack, onSave, editingInterview }: CreateInterviewPageProps) {
  const [formData, setFormData] = useState<InterviewFormData>({
    title: editingInterview?.title || '',
    candidateId: editingInterview?.candidateId || '',
    candidateName: editingInterview?.candidateName || '',
    candidateEmail: editingInterview?.candidateEmail || '',
    candidateAvatar: editingInterview?.candidateAvatar || '',
    jobTitle: editingInterview?.jobTitle || '',
    jobId: editingInterview?.jobId || '',
    date: editingInterview?.date || '',
    time: editingInterview?.time || '',
    duration: editingInterview?.duration || 60,
    type: editingInterview?.type || 'online',
    location: editingInterview?.location || '',
    meetingLink: editingInterview?.meetingLink || '',
    interviewers: editingInterview?.interviewers || [],
    agenda: editingInterview?.agenda || '',
    suggestedQuestions: editingInterview?.suggestedQuestions || [''],
    preparationMaterials: editingInterview?.preparationMaterials || [],
    evaluationCriteria: editingInterview?.evaluationCriteria || [],
    sendCalendarInvite: editingInterview?.sendCalendarInvite ?? true,
    notifyCandidate: editingInterview?.notifyCandidate ?? true,
    sendReminderEmails: editingInterview?.sendReminderEmails ?? true
  });

  const [isDraft, setIsDraft] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isEditMode = !!editingInterview;

  const updateFormData = (updates: Partial<InterviewFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
    // Clear related errors
    const newErrors = { ...errors };
    Object.keys(updates).forEach(key => {
      delete newErrors[key];
    });
    setErrors(newErrors);
  };

  const handleCandidateSelect = (candidateId: string) => {
    const candidate = mockCandidates.find(c => c.id === candidateId);
    if (candidate) {
      updateFormData({
        candidateId: candidate.id,
        candidateName: candidate.name,
        candidateEmail: candidate.email,
        candidateAvatar: candidate.avatar,
        jobTitle: candidate.jobTitle,
        jobId: candidate.jobId,
        title: `${candidate.jobTitle} Interview - ${candidate.name}`
      });
    }
  };

  const addInterviewer = (interviewerId: string) => {
    const interviewer = mockInterviewers.find(i => i.id === interviewerId);
    if (interviewer && !formData.interviewers.find(i => i.id === interviewerId)) {
      updateFormData({
        interviewers: [...formData.interviewers, interviewer]
      });
    }
  };

  const removeInterviewer = (interviewerId: string) => {
    updateFormData({
      interviewers: formData.interviewers.filter(i => i.id !== interviewerId)
    });
  };

  const addQuestion = () => {
    updateFormData({
      suggestedQuestions: [...formData.suggestedQuestions, '']
    });
  };

  const updateQuestion = (index: number, value: string) => {
    const newQuestions = [...formData.suggestedQuestions];
    newQuestions[index] = value;
    updateFormData({ suggestedQuestions: newQuestions });
  };

  const removeQuestion = (index: number) => {
    const newQuestions = formData.suggestedQuestions.filter((_, i) => i !== index);
    updateFormData({ suggestedQuestions: newQuestions });
  };

  const addEvaluationCriterion = (criterion: string) => {
    if (criterion && !formData.evaluationCriteria.includes(criterion)) {
      updateFormData({
        evaluationCriteria: [...formData.evaluationCriteria, criterion]
      });
    }
  };

  const removeEvaluationCriterion = (criterion: string) => {
    updateFormData({
      evaluationCriteria: formData.evaluationCriteria.filter(c => c !== criterion)
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Interview title is required';
    if (!formData.candidateId) newErrors.candidateId = 'Please select a candidate';
    if (!formData.date) newErrors.date = 'Interview date is required';
    if (!formData.time) newErrors.time = 'Interview time is required';
    if (formData.duration < 15) newErrors.duration = 'Duration must be at least 15 minutes';
    if (formData.interviewers.length === 0) newErrors.interviewers = 'At least one interviewer is required';
    
    if (formData.type === 'online' && !formData.meetingLink?.trim()) {
      newErrors.meetingLink = 'Meeting link is required for online interviews';
    }
    if (formData.type === 'in-person' && !formData.location?.trim()) {
      newErrors.location = 'Location is required for in-person interviews';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = (saveAsDraft = false) => {
    if (!saveAsDraft && !validateForm()) {
      return;
    }

    const interviewData = {
      ...formData,
      suggestedQuestions: formData.suggestedQuestions.filter(q => q.trim()),
      isDraft: saveAsDraft
    };

    setIsDraft(saveAsDraft);
    onSave(interviewData);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'online': return <Video className="h-4 w-4 text-blue-500" />;
      case 'phone': return <Phone className="h-4 w-4 text-green-500" />;
      case 'in-person': return <MapPin className="h-4 w-4 text-purple-500" />;
      default: return <CalendarIcon className="h-4 w-4" />;
    }
  };

  const selectedCandidate = mockCandidates.find(c => c.id === formData.candidateId);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Interviews
              </Button>
              <div>
                <h1 className="text-2xl font-semibold">
                  {isEditMode ? 'Edit Interview' : 'Create New Interview'}
                </h1>
                <p className="text-sm text-muted-foreground">
                  Schedule and configure interview details
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => handleSave(true)}>
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button onClick={() => handleSave(false)}>
                <Send className="h-4 w-4 mr-2" />
                Create Interview
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Interview Details
              </CardTitle>
              <CardDescription>
                Basic information about the interview and candidate
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Interview Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g. Technical Interview - Frontend Developer"
                    value={formData.title}
                    onChange={(e) => updateFormData({ title: e.target.value })}
                    className={errors.title ? 'border-red-500' : ''}
                  />
                  {errors.title && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.title}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Candidate *</Label>
                  <Select value={formData.candidateId} onValueChange={handleCandidateSelect}>
                    <SelectTrigger className={errors.candidateId ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select candidate" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockCandidates.map(candidate => (
                        <SelectItem key={candidate.id} value={candidate.id}>
                          <div className="flex items-center gap-2">
                            <Avatar className="w-6 h-6">
                              <AvatarImage src={candidate.avatar} alt={candidate.name} />
                              <AvatarFallback>{candidate.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{candidate.name}</p>
                              <p className="text-xs text-muted-foreground">{candidate.jobTitle}</p>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.candidateId && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.candidateId}
                    </p>
                  )}
                </div>
              </div>

              {selectedCandidate && (
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={selectedCandidate.avatar} alt={selectedCandidate.name} />
                      <AvatarFallback>{selectedCandidate.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{selectedCandidate.name}</h3>
                      <p className="text-sm text-muted-foreground">{selectedCandidate.email}</p>
                      <p className="text-sm text-muted-foreground">Applying for: {selectedCandidate.jobTitle}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Schedule Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Schedule & Format
              </CardTitle>
              <CardDescription>
                Set the interview date, time, and format
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => updateFormData({ date: e.target.value })}
                    className={errors.date ? 'border-red-500' : ''}
                    min={new Date().toISOString().split('T')[0]}
                  />
                  {errors.date && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.date}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Time *</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => updateFormData({ time: e.target.value })}
                    className={errors.time ? 'border-red-500' : ''}
                  />
                  {errors.time && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.time}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (minutes) *</Label>
                  <Select 
                    value={formData.duration.toString()} 
                    onValueChange={(value) => updateFormData({ duration: parseInt(value) })}
                  >
                    <SelectTrigger className={errors.duration ? 'border-red-500' : ''}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="90">1.5 hours</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.duration && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.duration}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <Label>Interview Type *</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { value: 'online', label: 'Online Meeting', icon: <Video className="h-4 w-4" /> },
                    { value: 'in-person', label: 'In-Person', icon: <MapPin className="h-4 w-4" /> },
                    { value: 'phone', label: 'Phone Call', icon: <Phone className="h-4 w-4" /> }
                  ].map(type => (
                    <Card 
                      key={type.value}
                      className={`cursor-pointer transition-all ${
                        formData.type === type.value 
                          ? 'border-primary bg-primary/5' 
                          : 'hover:border-muted-foreground'
                      }`}
                      onClick={() => updateFormData({ type: type.value as any })}
                    >
                      <CardContent className="p-4 text-center">
                        <div className="flex flex-col items-center gap-2">
                          {type.icon}
                          <span className="font-medium">{type.label}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {formData.type === 'online' && (
                <div className="space-y-2">
                  <Label htmlFor="meetingLink">Meeting Link *</Label>
                  <Input
                    id="meetingLink"
                    placeholder="https://zoom.us/j/123456789 or https://meet.google.com/xyz-abc-def"
                    value={formData.meetingLink}
                    onChange={(e) => updateFormData({ meetingLink: e.target.value })}
                    className={errors.meetingLink ? 'border-red-500' : ''}
                  />
                  {errors.meetingLink && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.meetingLink}
                    </p>
                  )}
                </div>
              )}

              {formData.type === 'in-person' && (
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    placeholder="Office address, conference room, etc."
                    value={formData.location}
                    onChange={(e) => updateFormData({ location: e.target.value })}
                    className={errors.location ? 'border-red-500' : ''}
                  />
                  {errors.location && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.location}
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Interviewers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Interviewers
              </CardTitle>
              <CardDescription>
                Select team members who will conduct the interview
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {errors.interviewers && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.interviewers}
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <Label>Add Interviewer</Label>
                <Select onValueChange={addInterviewer}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select team member" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockInterviewers
                      .filter(interviewer => !formData.interviewers.find(i => i.id === interviewer.id))
                      .map(interviewer => (
                        <SelectItem key={interviewer.id} value={interviewer.id}>
                          <div className="flex items-center gap-2">
                            <Avatar className="w-6 h-6">
                              <AvatarImage src={interviewer.avatar} alt={interviewer.name} />
                              <AvatarFallback>{interviewer.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{interviewer.name}</p>
                              <p className="text-xs text-muted-foreground">{interviewer.role}</p>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              {formData.interviewers.length > 0 && (
                <div className="space-y-3">
                  <Label>Selected Interviewers</Label>
                  {formData.interviewers.map(interviewer => (
                    <div key={interviewer.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={interviewer.avatar} alt={interviewer.name} />
                          <AvatarFallback>{interviewer.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{interviewer.name}</p>
                          <p className="text-sm text-muted-foreground">{interviewer.role}</p>
                          <p className="text-xs text-muted-foreground">{interviewer.email}</p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeInterviewer(interviewer.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Interview Content */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Interview Content
              </CardTitle>
              <CardDescription>
                Prepare the interview agenda and questions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="agenda">Interview Agenda</Label>
                <Textarea
                  id="agenda"
                  placeholder="Describe the interview structure and timeline. E.g., 'Introduction (10 min) + Technical questions (30 min) + Q&A (20 min)'"
                  value={formData.agenda}
                  onChange={(e) => updateFormData({ agenda: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Suggested Questions</Label>
                  <Button variant="outline" size="sm" onClick={addQuestion}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Question
                  </Button>
                </div>
                
                {formData.suggestedQuestions.map((question, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="Enter interview question..."
                      value={question}
                      onChange={(e) => updateQuestion(index, e.target.value)}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeQuestion(index)}
                      disabled={formData.suggestedQuestions.length === 1}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Evaluation Template */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Evaluation Template
              </CardTitle>
              <CardDescription>
                Select evaluation criteria for this interview
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Available Criteria</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {defaultEvaluationCriteria.map(criterion => (
                    <div key={criterion} className="flex items-center space-x-2">
                      <Checkbox
                        id={criterion}
                        checked={formData.evaluationCriteria.includes(criterion)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            addEvaluationCriterion(criterion);
                          } else {
                            removeEvaluationCriterion(criterion);
                          }
                        }}
                      />
                      <Label htmlFor={criterion} className="text-sm font-normal">
                        {criterion}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {formData.evaluationCriteria.length > 0 && (
                <div className="space-y-2">
                  <Label>Selected Criteria</Label>
                  <div className="flex flex-wrap gap-2">
                    {formData.evaluationCriteria.map(criterion => (
                      <Badge key={criterion} variant="secondary" className="gap-1">
                        {criterion}
                        <button onClick={() => removeEvaluationCriterion(criterion)}>
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Interview Settings
              </CardTitle>
              <CardDescription>
                Configure notifications and calendar integration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Send Calendar Invite</h4>
                    <p className="text-sm text-muted-foreground">
                      Send calendar invitations to all participants
                    </p>
                  </div>
                  <Switch
                    checked={formData.sendCalendarInvite}
                    onCheckedChange={(checked) => updateFormData({ sendCalendarInvite: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Notify Candidate</h4>
                    <p className="text-sm text-muted-foreground">
                      Send interview details to the candidate via email
                    </p>
                  </div>
                  <Switch
                    checked={formData.notifyCandidate}
                    onCheckedChange={(checked) => updateFormData({ notifyCandidate: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Send Reminder Emails</h4>
                    <p className="text-sm text-muted-foreground">
                      Send reminder emails 24 hours before the interview
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
      </div>
    </div>
  );
}