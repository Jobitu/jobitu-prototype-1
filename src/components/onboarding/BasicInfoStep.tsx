import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Upload, User } from "lucide-react";
import { OnboardingData } from "../OnboardingFlow";

interface BasicInfoStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
}

export function BasicInfoStep({ data, updateData, onNext }: BasicInfoStepProps) {
  const [formData, setFormData] = useState({
    fullName: data.fullName || '',
    currentRole: data.currentRole || '',
    linkedin: data.linkedin || '',
    profilePicture: data.avatar || ''
  });

  const handleSubmit = () => {
    updateData({ 
      fullName: formData.fullName,
      currentRole: formData.currentRole,
      linkedin: formData.linkedin,
      avatar: formData.profilePicture
    });
    onNext();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isValid = formData.fullName && formData.fullName.trim() !== "";

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <User className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl">Let's get to know you! 👋</CardTitle>
          <p className="text-muted-foreground">
            Tell us a bit about yourself to get started
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Profile Picture Upload */}
          <div className="flex flex-col items-center mb-6">
            <Avatar className="w-24 h-24 mb-4">
              <AvatarImage src={formData.profilePicture} />
              <AvatarFallback className="text-2xl">
                {formData.fullName && formData.fullName.trim() ? formData.fullName.split(' ').map(n => n[0]).join('').toUpperCase() : '📷'}
              </AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm" className="text-sm">
              <Upload className="h-4 w-4 mr-2" />
              Upload Photo (Optional)
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              Help employers recognize you
            </p>
          </div>

          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              placeholder="e.g., Sarah Johnson"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              className="text-base"
            />
          </div>

          {/* Current Role */}
          <div className="space-y-2">
            <Label htmlFor="currentRole">Current Role or Title</Label>
            <Input
              id="currentRole"
              placeholder="e.g., Software Engineer, Recent Graduate, Marketing Manager"
              value={formData.currentRole}
              onChange={(e) => handleInputChange('currentRole', e.target.value)}
              className="text-base"
            />
            <p className="text-xs text-muted-foreground">
              If you're between jobs, just put your most recent role or "Job Seeker"
            </p>
          </div>

          {/* LinkedIn */}
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn Profile (Optional)</Label>
            <Input
              id="linkedin"
              placeholder="e.g., linkedin.com/in/yourname"
              value={formData.linkedin}
              onChange={(e) => handleInputChange('linkedin', e.target.value)}
              className="text-base"
            />
            <p className="text-xs text-muted-foreground">
              We'll never post anything without your permission
            </p>
          </div>

          {/* Tips Card */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
            <h4 className="font-semibold text-blue-900 mb-2">💡 Quick Tips</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Use your full professional name</li>
              <li>• Your current role helps us understand your experience level</li>
              <li>• All information can be edited later</li>
            </ul>
          </div>

          <Button 
            onClick={handleSubmit} 
            disabled={!isValid}
            className="w-full text-base py-6"
            size="lg"
          >
            Continue to Education
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}