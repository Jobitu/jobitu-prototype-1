import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { CheckCircle, Edit, User, GraduationCap, Briefcase, Zap, Heart, Target } from "lucide-react";
import { OnboardingData } from "../OnboardingFlow";

interface ConfirmationStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  goToStep?: (step: number) => void;
}

export function ConfirmationStep({ data, onNext, goToStep }: ConfirmationStepProps) {
  const formatSalary = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const totalSkills = (data.skills?.hardSkills?.length || 0) + (data.skills?.softSkills?.length || 0) + (data.skills?.tools?.length || 0);

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl">Your Profile Looks Great! ✨</CardTitle>
          <p className="text-muted-foreground">
            Review your information and confirm to start finding amazing opportunities
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Profile Summary Card */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={data.avatar} />
                  <AvatarFallback className="text-lg">
                    {data.fullName ? data.fullName.split(' ').map(n => n[0]).join('').toUpperCase() : '👤'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold">{data.fullName || "Name not provided"}</h3>
                  <p className="text-muted-foreground">{data.currentRole || "Job Seeker"}</p>
                  {data.linkedin && (
                    <p className="text-sm text-blue-600">LinkedIn Profile Added</p>
                  )}
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => goToStep?.(1)}
                  className="ml-auto"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Sections Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Education */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-blue-600" />
                    <h4 className="font-semibold">Education</h4>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => goToStep?.(2)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
                {data.education && data.education.length > 0 ? (
                  <div className="space-y-3">
                    {data.education.slice(0, 2).map((edu, index) => (
                      <div key={index} className="border-l-2 border-blue-200 pl-3">
                        <p className="font-medium text-sm">{edu.degree}</p>
                        <p className="text-sm text-muted-foreground">{edu.school}</p>
                        <p className="text-xs text-muted-foreground">
                          {edu.startYear} - {edu.endYear}
                        </p>
                      </div>
                    ))}
                    {data.education.length > 2 && (
                      <p className="text-xs text-muted-foreground">
                        +{data.education.length - 2} more
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No education added</p>
                )}
              </CardContent>
            </Card>

            {/* Work Experience */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-green-600" />
                    <h4 className="font-semibold">Experience</h4>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => goToStep?.(3)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
                {data.workExperience && data.workExperience.length > 0 ? (
                  <div className="space-y-3">
                    {data.workExperience.slice(0, 2).map((exp, index) => (
                      <div key={index} className="border-l-2 border-green-200 pl-3">
                        <p className="font-medium text-sm">{exp.title}</p>
                        <p className="text-sm text-muted-foreground">{exp.company}</p>
                        <p className="text-xs text-muted-foreground">{exp.duration}</p>
                      </div>
                    ))}
                    {data.workExperience.length > 2 && (
                      <p className="text-xs text-muted-foreground">
                        +{data.workExperience.length - 2} more
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No experience added</p>
                )}
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-purple-600" />
                    <h4 className="font-semibold">Skills ({totalSkills})</h4>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => goToStep?.(4)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-3">
                  {data.skills?.hardSkills && data.skills.hardSkills.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">Hard Skills</p>
                      <div className="flex flex-wrap gap-1">
                        {data.skills.hardSkills.slice(0, 4).map(skill => (
                          <Badge key={skill} variant="default" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {data.skills.hardSkills.length > 4 && (
                          <Badge variant="secondary" className="text-xs">
                            +{data.skills.hardSkills.length - 4}
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                  {data.skills?.softSkills && data.skills.softSkills.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">Soft Skills</p>
                      <div className="flex flex-wrap gap-1">
                        {data.skills.softSkills.slice(0, 3).map(skill => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {data.skills.softSkills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{data.skills.softSkills.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Career Preferences */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-600" />
                    <h4 className="font-semibold">Preferences</h4>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => goToStep?.(5)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-3">
                  {data.careerPreferences?.interestedRoles && data.careerPreferences.interestedRoles.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">Interested Roles</p>
                      <div className="flex flex-wrap gap-1">
                        {data.careerPreferences.interestedRoles.slice(0, 2).map(role => (
                          <Badge key={role} variant="outline" className="text-xs">
                            {role}
                          </Badge>
                        ))}
                        {data.careerPreferences.interestedRoles.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{data.careerPreferences.interestedRoles.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                  {data.careerPreferences?.workStyle && data.careerPreferences.workStyle.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">Work Style</p>
                      <div className="flex flex-wrap gap-1">
                        {data.careerPreferences.workStyle.map(style => (
                          <Badge key={style} variant="outline" className="text-xs">
                            {style}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {data.careerPreferences?.salaryRange && (
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">Salary Range</p>
                      <p className="text-sm">
                        {formatSalary(data.careerPreferences.salaryRange.min)} - {formatSalary(data.careerPreferences.salaryRange.max)}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Career Goals */}
          {data.careerGoals && (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-orange-600" />
                    <h4 className="font-semibold">Career Goals</h4>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => goToStep?.(6)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {data.careerGoals.length > 200 
                    ? `${data.careerGoals.substring(0, 200)}...` 
                    : data.careerGoals
                  }
                </p>
              </CardContent>
            </Card>
          )}

          {/* Success Message */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6 text-center">
            <h4 className="font-semibold text-green-900 mb-2 flex items-center justify-center gap-2">
              <span className="text-2xl">🎉</span>
              Your profile is ready!
            </h4>
            <p className="text-sm text-green-800 mb-4">
              You've created a comprehensive profile that will help us find the perfect opportunities for you. 
              Our AI will now start matching you with relevant jobs and companies.
            </p>
            <div className="grid grid-cols-3 gap-4 text-sm text-green-700">
              <div>
                <strong>{data.education?.length || 0}</strong><br />
                Education entries
              </div>
              <div>
                <strong>{data.workExperience?.length || 0}</strong><br />
                Work experiences
              </div>
              <div>
                <strong>{totalSkills}</strong><br />
                Skills added
              </div>
            </div>
          </div>

          {/* Action Button */}
          <Button 
            onClick={onNext}
            size="lg"
            className="w-full py-6 text-base font-semibold"
          >
            Confirm & Start Finding Jobs! 🚀
          </Button>

          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              You can always edit your profile later in your dashboard
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}