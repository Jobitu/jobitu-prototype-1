import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Search, X, Zap } from "lucide-react";
import { OnboardingData } from "../OnboardingFlow";

interface SkillsStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
}

const skillsSuggestions = [
  "JavaScript", "Python", "React", "Node.js", "SQL", "Java", "C++", "HTML/CSS",
  "Machine Learning", "Data Analysis", "Digital Marketing", "SEO", "Content Writing",
  "Graphic Design", "Photoshop", "Project Management", "Agile", "Scrum",
  "Financial Analysis", "Excel", "PowerPoint", "Sales", "Customer Service",
  "Communication", "Leadership", "Problem Solving", "Teamwork", "Time Management",
  "Critical Thinking", "Creativity", "Adaptability", "Attention to Detail",
  "Public Speaking", "Negotiation", "Mentoring", "Strategic Thinking",
  "Emotional Intelligence", "Conflict Resolution", "Decision Making",
  "Microsoft Office", "Google Workspace", "Slack", "Zoom", "Figma", "Adobe Creative Suite",
  "Jira", "Trello", "Asana", "Salesforce", "HubSpot", "GitHub", "Docker", "AWS",
  "Tableau", "Power BI", "Notion", "Confluence", "InDesign", "Canva"
];

export function SkillsStep({ data, updateData, onNext }: SkillsStepProps) {
  // Handle both old object format and new array format
  const getInitialSkills = () => {
    if (!data.skills) return [];
    if (Array.isArray(data.skills)) return data.skills;
    
    // Convert old object format {hardSkills: [], softSkills: [], tools: []} to array
    if (typeof data.skills === 'object' && data.skills !== null) {
      const oldFormat = data.skills as any;
      const allSkills = [
        ...(oldFormat.hardSkills || []),
        ...(oldFormat.softSkills || []),
        ...(oldFormat.tools || [])
      ];
      return allSkills;
    }
    
    return [];
  };

  const [skills, setSkills] = useState<string[]>(getInitialSkills());
  const [searchTerm, setSearchTerm] = useState("");

  const addSkill = (skill: string) => {
    if (Array.isArray(skills) && !skills.includes(skill.trim()) && skill.trim() !== "") {
      setSkills(prev => [...prev, skill.trim()]);
    }
  };

  const removeSkill = (skillToRemove: string) => {
    if (Array.isArray(skills)) {
      setSkills(prev => prev.filter(skill => skill !== skillToRemove));
    }
  };

  const handleSearch = (term: string) => {
    if (term.trim() && !skills.includes(term.trim())) {
      addSkill(term.trim());
      setSearchTerm("");
    }
  };

  const handleSubmit = () => {
    updateData({ skills });
    onNext();
  };

  const getSuggestions = () => {
    if (!Array.isArray(skills)) return [];
    return skillsSuggestions.filter(skill => 
      !skills.includes(skill) &&
      skill.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 12);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Zap className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl">Your Skills & Expertise ⚡</CardTitle>
          <p className="text-muted-foreground">
            Tell us what you're great at - this helps us match you with the perfect opportunities!
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Skills, Tools & Expertise</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Type any skill and press Enter (e.g., JavaScript, Leadership, Excel, Marketing)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSearch(searchTerm);
                    }
                  }}
                  className="pl-10"
                />
              </div>
              
              <div className="flex flex-wrap gap-2 min-h-[3rem] p-3 border rounded-lg bg-gray-50">
                {skills.length === 0 ? (
                  <p className="text-muted-foreground text-sm">Your selected skills will appear here</p>
                ) : (
                  Array.isArray(skills) ? skills.map((skill, index) => (
                    <Badge key={index} variant="default" className="flex items-center gap-1 px-3 py-1">
                      {skill}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={() => removeSkill(skill)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  )) : null
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Popular suggestions:</Label>
                <div className="flex flex-wrap gap-2">
                  {getSuggestions().map(skill => (
                    <Button
                      key={skill}
                      variant="outline"
                      size="sm"
                      onClick={() => addSkill(skill)}
                      className="h-8 text-xs"
                    >
                      + {skill}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">
              📊 Skills Summary ({Array.isArray(skills) ? skills.length : 0} total)
            </h4>
            <p className="text-sm text-blue-800">
              {(!Array.isArray(skills) || skills.length === 0) && "Start adding your skills to improve job matching"}
              {Array.isArray(skills) && skills.length > 0 && skills.length < 5 && "Great start! Adding more skills will improve your matches"}
              {Array.isArray(skills) && skills.length >= 5 && skills.length < 10 && "Nice work! You have a good foundation of skills"}
              {Array.isArray(skills) && skills.length >= 10 && "Excellent! You have a comprehensive skill set"}
            </p>
          </div>

          {/* Tips Card */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-900 mb-2">💡 Skills Tips</h4>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Add at least 5-10 skills for better job matching</li>
              <li>• Include technical skills, soft skills, and tools you use</li>
              <li>• Be specific (e.g., "React" instead of just "Programming")</li>
              <li>• You can always update your skills later in your profile</li>
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
              className="flex-1 py-6"
            >
              Continue to Preferences
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}