import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { ArrowRight, Sparkles } from "lucide-react";
import { OnboardingData } from "../OnboardingFlow";

interface WelcomeStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
}

export function WelcomeStep({ onNext }: WelcomeStepProps) {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <CardContent className="p-12">
          <div className="mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Sparkles className="h-10 w-10 text-white" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Welcome to Jobitu! 🎉
            </h1>
            
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Let's build your career profile together. We'll guide you through a quick setup 
              to match you with opportunities that truly fit your skills and goals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="flex flex-col items-center p-4">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                <span className="text-2xl">📝</span>
              </div>
              <h3 className="font-semibold mb-2">Smart CV Builder</h3>
              <p className="text-sm text-muted-foreground text-center">
                Create a comprehensive profile with our AI-assisted tools
              </p>
            </div>
            
            <div className="flex flex-col items-center p-4">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-semibold mb-2">Career Preferences</h3>
              <p className="text-sm text-muted-foreground text-center">
                Tell us about your ideal work environment and goals
              </p>
            </div>
            
            <div className="flex flex-col items-center p-4">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="font-semibold mb-2">Get Matched</h3>
              <p className="text-sm text-muted-foreground text-center">
                Start receiving personalized job recommendations
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8">
            <p className="text-sm text-muted-foreground text-center">
              <strong>Takes only 5 minutes</strong> • Your information is secure and private
            </p>
          </div>

          <Button onClick={onNext} size="lg" className="text-base px-8">
            Let's Start Building Your Profile
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}