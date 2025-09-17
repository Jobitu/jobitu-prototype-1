import { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Target, Lightbulb } from "lucide-react";
import { OnboardingData } from "../OnboardingFlow";

interface CareerGoalsStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
}

const goalExamples = [
  "In 2 years, I want to become a senior software engineer at a tech startup, leading a small team and working on innovative products.",
  "I'm looking to transition from marketing to product management, and I'd like to join a company where I can learn from experienced PMs.",
  "My goal is to become a data science manager, combining my technical skills with leadership experience in a Fortune 500 company.",
  "I want to start my own design consultancy, so I'm looking for roles that will help me build client relationships and business skills.",
  "I'd like to work in sustainable technology, contributing to products that have a positive environmental impact."
];

export function CareerGoalsStep({ data, updateData, onNext }: CareerGoalsStepProps) {
  const [goals, setGoals] = useState(data.careerGoals || '');
  const [selectedExample, setSelectedExample] = useState<string | null>(null);

  const handleSubmit = () => {
    updateData({ careerGoals: goals });
    onNext();
  };

  const useExample = (example: string) => {
    setGoals(example);
    setSelectedExample(example);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Target className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl">Your Career Vision 🎯</CardTitle>
          <p className="text-muted-foreground">
            Share your career aspirations with us (optional but recommended)
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Main Question */}
          <div className="space-y-4">
            <Label htmlFor="careerGoals" className="text-base font-semibold">
              Where do you want to be in the next 2-3 years?
            </Label>
            <Textarea
              id="careerGoals"
              placeholder="Share your career aspirations, dream roles, or professional goals..."
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
              rows={6}
              className="text-base leading-relaxed"
            />
            <p className="text-sm text-muted-foreground">
              The more specific you are, the better we can tailor recommendations to your career path.
            </p>
          </div>

          {/* Examples Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-yellow-600" />
              <Label className="text-sm font-semibold text-muted-foreground">
                Need inspiration? Try these examples:
              </Label>
            </div>
            
            <div className="space-y-3">
              {goalExamples.map((example, index) => (
                <Card 
                  key={index} 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedExample === example ? 'border-primary bg-primary/5' : 'border-muted bg-muted/30'
                  }`}
                  onClick={() => useExample(example)}
                >
                  <CardContent className="p-4">
                    <p className="text-sm leading-relaxed">{example}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Benefits Card */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
            <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
              <span className="text-xl">🚀</span>
              How this helps you:
            </h4>
            <ul className="text-sm text-green-800 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span><strong>Personalized job matching:</strong> We'll prioritize roles that align with your goals</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span><strong>Career guidance:</strong> Get recommendations for skills to develop and steps to take</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span><strong>Company matching:</strong> Find employers whose values and growth opportunities fit your vision</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span><strong>Interview preparation:</strong> We'll help you articulate your career story</span>
              </li>
            </ul>
          </div>

          {/* Character Counter */}
          <div className="text-right">
            <span className="text-xs text-muted-foreground">
              {(goals || '').length} characters
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              variant="outline"
              onClick={handleSubmit}
              className="flex-1 py-6"
            >
              Skip This Step
            </Button>
            <Button 
              onClick={handleSubmit} 
              className="flex-1 py-6"
              disabled={(goals || '').trim().length < 20}
            >
              {(goals || '').trim().length < 20 ? 'Add More Details' : 'Continue to Summary'}
            </Button>
          </div>

          {/* Privacy Note */}
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              🔒 Your career goals are private and will only be used to improve your job recommendations
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}