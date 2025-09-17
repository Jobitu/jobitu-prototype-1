import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Plus, Trash2, Briefcase, X } from "lucide-react";
import { OnboardingData } from "../OnboardingFlow";

interface WorkExperienceStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
}

const workTags = ["Remote", "Hybrid", "On-site", "Internship", "Freelance", "Contract", "Full-time", "Part-time"];

export function WorkExperienceStep({ data, updateData, onNext }: WorkExperienceStepProps) {
  const [workExperience, setWorkExperience] = useState(
    data.workExperience.length > 0 
      ? data.workExperience 
      : [{ role: "", company: "", startDate: "", endDate: "", description: "", tags: [] }]
  );

  const addExperience = () => {
    setWorkExperience([...workExperience, { role: "", company: "", startDate: "", endDate: "", description: "", tags: [] }]);
  };

  const removeExperience = (index: number) => {
    if (workExperience.length > 1) {
      setWorkExperience(workExperience.filter((_, i) => i !== index));
    }
  };

  const updateExperience = (index: number, field: string, value: string | string[]) => {
    const updated = workExperience.map((exp, i) => 
      i === index ? { ...exp, [field]: value } : exp
    );
    setWorkExperience(updated);
  };

  const addTag = (index: number, tag: string) => {
    const experience = workExperience[index];
    if (!experience.tags.includes(tag)) {
      updateExperience(index, 'tags', [...experience.tags, tag]);
    }
  };

  const removeTag = (index: number, tagToRemove: string) => {
    const experience = workExperience[index];
    updateExperience(index, 'tags', experience.tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = () => {
    const validExperience = workExperience.filter(exp => 
      exp.role.trim() !== "" && exp.company.trim() !== ""
    );
    updateData({ workExperience: validExperience });
    onNext();
  };

  const hasValidExperience = workExperience.some(exp => 
    exp.role.trim() !== "" && exp.company.trim() !== ""
  );

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Briefcase className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl">Your Work Experience 💼</CardTitle>
          <p className="text-muted-foreground">
            Share your professional journey with us
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {workExperience.map((exp, index) => (
            <Card key={index} className="bg-muted/30 border-dashed">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">Experience #{index + 1}</h3>
                  {workExperience.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeExperience(index)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label>Job Title / Role *</Label>
                    <Input
                      placeholder="e.g., Software Engineer, Marketing Manager"
                      value={exp.role}
                      onChange={(e) => updateExperience(index, 'role', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Company *</Label>
                    <Input
                      placeholder="e.g., Google, Local Startup, Freelance"
                      value={exp.company}
                      onChange={(e) => updateExperience(index, 'company', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Select value={exp.startDate.split('-')[1]} onValueChange={(month) => {
                        const year = exp.startDate.split('-')[0] || currentYear.toString();
                        updateExperience(index, 'startDate', `${year}-${month}`);
                      }}>
                        <SelectTrigger>
                          <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent>
                          {months.map((month, i) => (
                            <SelectItem key={i} value={(i + 1).toString().padStart(2, '0')}>
                              {month}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select value={exp.startDate.split('-')[0]} onValueChange={(year) => {
                        const month = exp.startDate.split('-')[1] || '01';
                        updateExperience(index, 'startDate', `${year}-${month}`);
                      }}>
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
                  </div>

                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Select value={exp.endDate === 'present' ? 'present' : exp.endDate.split('-')[1]} onValueChange={(month) => {
                        if (month === 'present') {
                          updateExperience(index, 'endDate', 'present');
                        } else {
                          const year = exp.endDate.split('-')[0] || currentYear.toString();
                          updateExperience(index, 'endDate', `${year}-${month}`);
                        }
                      }}>
                        <SelectTrigger>
                          <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="present">Present</SelectItem>
                          {months.map((month, i) => (
                            <SelectItem key={i} value={(i + 1).toString().padStart(2, '0')}>
                              {month}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {exp.endDate !== 'present' && (
                        <Select value={exp.endDate.split('-')[0]} onValueChange={(year) => {
                          const month = exp.endDate.split('-')[1] || '12';
                          updateExperience(index, 'endDate', `${year}-${month}`);
                        }}>
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
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <Label>Description (Optional)</Label>
                  <Textarea
                    placeholder="Describe your key responsibilities and achievements..."
                    value={exp.description}
                    onChange={(e) => updateExperience(index, 'description', e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {exp.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0"
                          onClick={() => removeTag(index, tag)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {workTags.filter(tag => !exp.tags.includes(tag)).map(tag => (
                      <Button
                        key={tag}
                        variant="outline"
                        size="sm"
                        onClick={() => addTag(index, tag)}
                        className="h-8"
                      >
                        + {tag}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Button
            variant="outline"
            onClick={addExperience}
            className="w-full py-6 border-dashed"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Another Experience
          </Button>

          {/* Tips Card */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 className="font-semibold text-purple-900 mb-2">💡 Experience Tips</h4>
            <ul className="text-sm text-purple-800 space-y-1">
              <li>• Include internships, freelance work, and volunteer experience</li>
              <li>• Focus on achievements and impact, not just duties</li>
              <li>• Use tags to highlight work style and employment type</li>
              <li>• Fresh graduate? Include relevant projects and internships</li>
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
              disabled={!hasValidExperience}
              className="flex-1 py-6"
            >
              Continue to Skills
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}