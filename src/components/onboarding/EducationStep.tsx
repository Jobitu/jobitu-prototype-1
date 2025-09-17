import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Plus, Trash2, GraduationCap } from "lucide-react";
import { OnboardingData } from "../OnboardingFlow";

interface EducationStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
}

export function EducationStep({ data, updateData, onNext }: EducationStepProps) {
  const [education, setEducation] = useState(
    data.education && data.education.length > 0 
      ? data.education 
      : [{ degree: "", school: "", location: "", startYear: "", endYear: "" }]
  );

  const addEducation = () => {
    setEducation([...education, { degree: "", school: "", location: "", startYear: "", endYear: "" }]);
  };

  const removeEducation = (index: number) => {
    if (education.length > 1) {
      setEducation(education.filter((_, i) => i !== index));
    }
  };

  const updateEducation = (index: number, field: string, value: string) => {
    const updated = education.map((edu, i) => 
      i === index ? { ...edu, [field]: value } : edu
    );
    setEducation(updated);
  };

  const handleSubmit = () => {
    const validEducation = education.filter(edu => 
      edu.degree.trim() !== "" && edu.school.trim() !== ""
    );
    updateData({ education: validEducation });
    onNext();
  };

  const hasValidEducation = education.some(edu => 
    edu.degree.trim() !== "" && edu.school.trim() !== ""
  );

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl">Your Educational Journey 🎓</CardTitle>
          <p className="text-muted-foreground">
            Tell us about your educational background
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {education.map((edu, index) => (
            <Card key={index} className="bg-muted/30 border-dashed">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">Education #{index + 1}</h3>
                  {education.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeEducation(index)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Degree / Program *</Label>
                    <Input
                      placeholder="e.g., Bachelor of Science, MBA, High School Diploma"
                      value={edu.degree}
                      onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>School / University *</Label>
                    <Input
                      placeholder="e.g., Stanford University, Community College"
                      value={edu.school}
                      onChange={(e) => updateEducation(index, 'school', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input
                      placeholder="e.g., San Francisco, CA"
                      value={edu.location}
                      onChange={(e) => updateEducation(index, 'location', e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <Label>Start Year</Label>
                      <Select value={edu.startYear} onValueChange={(value) => updateEducation(index, 'startYear', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent>
                          {years.map(year => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>End Year</Label>
                      <Select value={edu.endYear} onValueChange={(value) => updateEducation(index, 'endYear', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="present">Present</SelectItem>
                          {years.map(year => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Button
            variant="outline"
            onClick={addEducation}
            className="w-full py-6 border-dashed"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Another Education
          </Button>

          {/* Tips Card */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-900 mb-2">💡 Education Tips</h4>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• Include all relevant education (university, college, certifications)</li>
              <li>• Don't worry about GPA unless it's exceptional</li>
              <li>• Professional certifications count too!</li>
              <li>• You can skip this if you prefer to focus on experience</li>
            </ul>
          </div>

          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={handleSubmit}
              className="flex-1 py-6"
            >
              Skip for Now
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={!hasValidEducation}
              className="flex-1 py-6"
            >
              Continue to Experience
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}