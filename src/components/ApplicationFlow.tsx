import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { 
  ArrowLeft, 
  ArrowRight, 
  FileText, 
  Edit3, 
  CheckCircle, 
  Upload,
  Sparkles,
  Calendar,
  Clock,
  Zap,
  Trophy,
  Confetti
} from "lucide-react";
import { OnboardingData } from "./OnboardingFlow";

interface ApplicationFlowProps {
  job: any;
  userData: OnboardingData;
  onBack: () => void;
  onComplete: () => void;
}

interface ApplicationData {
  resume: {
    useProfile: boolean;
    customFile?: File;
  };
  coverLetter: string;
  additionalInfo: string;
  confirmed: boolean;
}

export function ApplicationFlow({ job, userData, onBack, onComplete }: ApplicationFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [applicationData, setApplicationData] = useState<ApplicationData>({
    resume: { useProfile: true },
    coverLetter: "",
    additionalInfo: "",
    confirmed: false
  });

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateCoverLetter = () => {
    const skills = userData.skills.hardSkills.slice(0, 3).join(", ");
    const template = `Dear ${job.company} Hiring Team,

I am excited to apply for the ${job.title} position. With my background in ${skills} and ${userData.workExperience.length > 0 ? `experience at ${userData.workExperience[0]?.company}` : 'my passion for technology'}, I believe I would be a strong addition to your team.

What particularly draws me to this role is ${job.culture?.values[0] || 'the company culture'} and the opportunity to work with cutting-edge technologies. My skills in ${skills} align well with your requirements, and I'm excited about the possibility of contributing to your innovative projects.

${userData.careerGoals ? `My career goal is to ${userData.careerGoals.split('.')[0].toLowerCase()}, which aligns perfectly with this opportunity.` : ''}

Thank you for considering my application. I look forward to discussing how I can contribute to ${job.company}'s continued success.

Best regards,
${userData.basicInfo.fullName}`;
    
    setApplicationData(prev => ({ ...prev, coverLetter: template }));
  };

  const submitApplication = () => {
    // In a real app, this would submit to an API
    console.log('Submitting application:', applicationData);
    setCurrentStep(4); // Go to success screen
  };

  // Success Screen
  if (currentStep === 4) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full border-0 shadow-xl">
          <CardContent className="p-8 text-center">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            
            <h1 className="text-3xl font-bold mb-4 text-green-900">
              Application Sent! 🎉
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8">
              Your application for <strong>{job.title}</strong> at <strong>{job.company}</strong> has been successfully submitted.
            </p>

            <div className="bg-white rounded-lg p-6 mb-8 border border-green-200">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                What happens next?
              </h3>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 rounded-full p-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <span className="text-sm">Application review (1-2 days)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 rounded-full p-1">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  </div>
                  <span className="text-sm">Initial screening call (3-5 days)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 rounded-full p-1">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <span className="text-sm">Technical interview (1-2 weeks)</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <Trophy className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <h4 className="font-semibold text-blue-900 mb-1">Strong Match</h4>
                <p className="text-sm text-blue-800">
                  {job.matchScore}% compatibility with this role
                </p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <Zap className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                <h4 className="font-semibold text-purple-900 mb-1">AI Optimized</h4>
                <p className="text-sm text-purple-800">
                  Application enhanced with AI insights
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" onClick={onComplete} className="flex-1">
                Back to Dashboard
              </Button>
              <Button onClick={onComplete} className="flex-1">
                Find More Jobs
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 to-purple-50/30">
      {/* Header */}
      <div className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" onClick={onBack} className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Job
              </Button>
              <h1 className="font-semibold">Apply to {job.company}</h1>
            </div>
            <div className="text-sm text-muted-foreground">
              Step {currentStep} of {totalSteps}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress */}
        <div className="mb-8">
          <Progress value={progress} className="h-2 mb-4" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span className={currentStep >= 1 ? "text-foreground font-medium" : ""}>
              Confirm Resume
            </span>
            <span className={currentStep >= 2 ? "text-foreground font-medium" : ""}>
              Customize Application
            </span>
            <span className={currentStep >= 3 ? "text-foreground font-medium" : ""}>
              Review & Submit
            </span>
          </div>
        </div>

        {/* Job Summary */}
        <Card className="mb-8 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src={job.companyLogo} alt={job.company} />
                <AvatarFallback>{job.company[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="font-semibold text-lg">{job.title}</h2>
                <p className="text-muted-foreground">{job.company} • {job.location}</p>
              </div>
              <Badge variant="default" className="bg-green-500 text-white">
                {job.matchScore}% Match
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Step Content */}
        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Confirm Your Resume
              </CardTitle>
              <p className="text-muted-foreground">
                Review your profile information that will be shared with the employer
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/50 rounded-lg p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={userData.basicInfo.profilePicture} />
                    <AvatarFallback>
                      {userData.basicInfo.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">{userData.basicInfo.fullName}</h3>
                    <p className="text-muted-foreground">{userData.basicInfo.currentRole}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Experience */}
                  {userData.workExperience.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-3">Recent Experience</h4>
                      <div className="space-y-3">
                        {userData.workExperience.slice(0, 2).map((exp, index) => (
                          <div key={index} className="border-l-2 border-blue-200 pl-3">
                            <p className="font-medium">{exp.role}</p>
                            <p className="text-sm text-muted-foreground">{exp.company}</p>
                            <p className="text-xs text-muted-foreground">
                              {exp.startDate} - {exp.endDate}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Skills */}
                  <div>
                    <h4 className="font-medium mb-3">Key Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {userData.skills.hardSkills.slice(0, 6).map(skill => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                      {userData.skills.hardSkills.length > 6 && (
                        <Badge variant="outline">
                          +{userData.skills.hardSkills.length - 6} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Education */}
                  {userData.education.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-3">Education</h4>
                      <div className="space-y-2">
                        {userData.education.slice(0, 2).map((edu, index) => (
                          <div key={index}>
                            <p className="font-medium text-sm">{edu.degree}</p>
                            <p className="text-sm text-muted-foreground">{edu.school}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="useProfile" 
                  checked={applicationData.resume.useProfile}
                  onCheckedChange={(checked) => 
                    setApplicationData(prev => ({
                      ...prev,
                      resume: { ...prev.resume, useProfile: !!checked }
                    }))
                  }
                />
                <Label htmlFor="useProfile">
                  Use my Jobitu profile as my resume
                </Label>
              </div>

              <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="font-medium mb-1">Upload Custom Resume (Optional)</p>
                <p className="text-sm text-muted-foreground mb-3">
                  PDF, DOC, or DOCX up to 5MB
                </p>
                <Button variant="outline" size="sm">
                  Choose File
                </Button>
              </div>

              <div className="flex justify-end">
                <Button onClick={nextStep} disabled={!applicationData.resume.useProfile}>
                  Continue
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Edit3 className="h-5 w-5" />
                Customize Your Application
              </CardTitle>
              <p className="text-muted-foreground">
                Add a personal touch to stand out from other candidates
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label htmlFor="coverLetter">Cover Letter</Label>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={generateCoverLetter}
                    disabled={!!applicationData.coverLetter}
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate with AI
                  </Button>
                </div>
                <Textarea
                  id="coverLetter"
                  placeholder="Write a brief cover letter explaining why you're interested in this role..."
                  value={applicationData.coverLetter}
                  onChange={(e) => setApplicationData(prev => ({ ...prev, coverLetter: e.target.value }))}
                  rows={12}
                  className="resize-none"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  {applicationData.coverLetter.length} characters
                </p>
              </div>

              <Separator />

              <div>
                <Label htmlFor="additionalInfo">Additional Information (Optional)</Label>
                <Textarea
                  id="additionalInfo"
                  placeholder="Any additional information you'd like to share (portfolio links, availability, etc.)"
                  value={applicationData.additionalInfo}
                  onChange={(e) => setApplicationData(prev => ({ ...prev, additionalInfo: e.target.value }))}
                  rows={4}
                  className="mt-2"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  AI Tips for This Application
                </h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Mention your React and TypeScript experience early</li>
                  <li>• Highlight your remote work capabilities</li>
                  <li>• Reference their company values in your cover letter</li>
                  <li>• Include specific examples of your problem-solving skills</li>
                </ul>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <Button onClick={nextStep}>
                  Continue
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Review & Submit Application
              </CardTitle>
              <p className="text-muted-foreground">
                Double-check your application before submitting
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/50 rounded-lg p-6">
                <h3 className="font-semibold mb-4">Application Summary</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Position</h4>
                    <p className="text-sm text-muted-foreground">
                      {job.title} at {job.company}
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium mb-2">Resume</h4>
                    <p className="text-sm text-muted-foreground">
                      {applicationData.resume.useProfile 
                        ? "Using Jobitu profile" 
                        : "Custom resume uploaded"
                      }
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium mb-2">Cover Letter</h4>
                    <div className="bg-white rounded border p-3 max-h-40 overflow-y-auto">
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {applicationData.coverLetter || "No cover letter provided"}
                      </p>
                    </div>
                  </div>

                  {applicationData.additionalInfo && (
                    <>
                      <Separator />
                      <div>
                        <h4 className="font-medium mb-2">Additional Information</h4>
                        <div className="bg-white rounded border p-3">
                          <p className="text-sm text-muted-foreground">
                            {applicationData.additionalInfo}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="confirm" 
                  checked={applicationData.confirmed}
                  onCheckedChange={(checked) => 
                    setApplicationData(prev => ({ ...prev, confirmed: !!checked }))
                  }
                />
                <Label htmlFor="confirm" className="text-sm">
                  I confirm that all information provided is accurate and I agree to the terms of application
                </Label>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-medium text-green-900 mb-2">Ready to Submit!</h4>
                <p className="text-sm text-green-800">
                  Your application looks great! {job.company} typically responds within 3-5 business days.
                </p>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <Button 
                  onClick={submitApplication}
                  disabled={!applicationData.confirmed}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Submit Application
                  <CheckCircle className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}