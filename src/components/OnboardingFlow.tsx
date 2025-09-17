import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { WelcomeStep } from "./onboarding/WelcomeStep";
import { BasicInfoStep } from "./onboarding/BasicInfoStep";
import { EducationStep } from "./onboarding/EducationStep";
import { WorkExperienceStep } from "./onboarding/WorkExperienceStep";
import { SkillsStep } from "./onboarding/SkillsStep";
import { CareerPreferencesStep } from "./onboarding/CareerPreferencesStep";
import { CareerGoalsStep } from "./onboarding/CareerGoalsStep";
import { ConfirmationStep } from "./onboarding/ConfirmationStep";
import { ArrowLeft, ArrowRight } from "lucide-react";

export interface OnboardingData {
  // Basic Info
  fullName: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  bio?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  
  // Current Status
  currentRole?: string;
  yearsOfExperience: number;
  
  // Education
  education: Array<{
    degree: string;
    school: string;
    location?: string;
    startYear: string;
    endYear: string;
    description?: string;
  }>;
  
  // Work Experience
  workExperience: Array<{
    title: string;
    company: string;
    duration: string;
    description: string;
    current?: boolean;
  }>;
  
  // Skills
  skills: {
    hardSkills: string[];
    softSkills: string[];
    tools: string[];
  };
  
  // Career Preferences
  careerPreferences: {
    interestedRoles: string[];
    workStyle: string[];
    employmentType: string[];
    salaryRange: {
      min: number;
      max: number;
    };
    locations: string[];
  };
  
  // Career Goals
  careerGoals: string;
  desiredRoles: string[];
  interestedIndustries: string[];
  
  // System fields
  isPreviewMode?: boolean;
}

interface OnboardingFlowProps {
  onComplete: (data: OnboardingData) => void;
  onBack: () => void;
}

export function OnboardingFlow({ onComplete, onBack }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    avatar: '',
    bio: '',
    website: '',
    linkedin: '',
    github: '',
    currentRole: '',
    yearsOfExperience: 0,
    education: [],
    workExperience: [],
    skills: {
      hardSkills: [],
      softSkills: [],
      tools: []
    },
    careerPreferences: {
      interestedRoles: [],
      workStyle: [],
      employmentType: [],
      salaryRange: { min: 40000, max: 120000 },
      locations: []
    },
    careerGoals: '',
    desiredRoles: [],
    interestedIndustries: []
  });

  const steps = [
    { title: "Welcome", component: WelcomeStep },
    { title: "Basic Info", component: BasicInfoStep },
    { title: "Education", component: EducationStep },
    { title: "Experience", component: WorkExperienceStep },
    { title: "Skills", component: SkillsStep },
    { title: "Preferences", component: CareerPreferencesStep },
    { title: "Goals", component: CareerGoalsStep },
    { title: "Confirmation", component: ConfirmationStep }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(data);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const handleDataUpdate = (updates: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const goToStep = (step: number) => {
    if (step >= 0 && step < steps.length) {
      setCurrentStep(step);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;
  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-indigo-50 via-white to-white">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-5xl px-4 py-10 sm:py-12">
        {/* Progress Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                <span className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">Complete Your Profile</span>
              </h1>
              <p className="mt-1 text-sm text-gray-500">We’ll use this info to tailor opportunities for you.</p>
            </div>
            <span className="text-sm font-medium text-gray-600">Step {currentStep + 1} of {steps.length}</span>
          </div>

          <div className="mt-4">
            <Progress 
              value={progress} 
              className="h-2 w-full overflow-hidden rounded-full bg-indigo-100"
            />
            <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
              <span>{steps[currentStep].title}</span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Card className="border-0 bg-white/70 shadow-xl backdrop-blur-sm">
          <CardContent className="p-5 sm:p-8">
            <CurrentStepComponent
              data={data}
              updateData={handleDataUpdate}
              onNext={handleNext}
              goToStep={goToStep}
            />
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="mt-6 flex flex-col items-stretch gap-3 sm:mt-8 sm:flex-row sm:items-center sm:justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            className="order-2 sm:order-1"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          <div className="order-1 flex items-center justify-center gap-2 sm:order-2">
            {steps.map((s, index) => (
              <button
                key={s.title}
                aria-label={`Go to ${s.title}`}
                onClick={() => goToStep(index)}
                className={`h-2 w-2 rounded-full transition-all ${
                  index < currentStep
                    ? 'bg-indigo-600'
                    : index === currentStep
                    ? 'h-2.5 w-5 bg-indigo-500'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          <Button
            onClick={handleNext}
            className="order-3 bg-indigo-600 hover:bg-indigo-700"
          >
            {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}