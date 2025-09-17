import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { PipelineManagement } from "./PipelineManagement";
import { CandidateApplicationTracker } from "./CandidateApplicationTracker";
import { PipelineProgress } from "./PipelineProgress";
import { ApplicationStage } from "../types/pipeline";
import { mockPipelineApplications } from "../data/pipelineMockData";
import { 
  Users, 
  Building, 
  Eye, 
  PlayCircle,
  ArrowRight,
  CheckCircle,
  Trophy,
  Zap,
  Target,
  BarChart3
} from "lucide-react";

interface PipelineDemoPageProps {
  onBack?: () => void;
}

export function PipelineDemoPage({ onBack }: PipelineDemoPageProps) {
  const [activeDemo, setActiveDemo] = useState<'overview' | 'employer' | 'candidate'>('overview');
  const [selectedScenario, setSelectedScenario] = useState<string>('');

  const demoScenarios = [
    {
      id: 'full_journey',
      title: 'Complete Candidate Journey',
      description: 'Maya Patel: Applied → Qualified → Interview → Final Review → Passed',
      candidateEmail: 'maya.patel@email.com',
      stage: 'passed' as ApplicationStage,
      highlight: 'Success Story'
    },
    {
      id: 'in_progress',
      title: 'Application in Progress',
      description: 'Sarah Chen: Currently in Applied stage with pending assessments',
      candidateEmail: 'sarah.chen@email.com',
      stage: 'applied' as ApplicationStage,
      highlight: 'Active'
    },
    {
      id: 'interview_stage',
      title: 'Interview Scheduled',
      description: 'Lisa Wang: Interview scheduled for Marketing Manager position',
      candidateEmail: 'lisa.wang@email.com',
      stage: 'interview' as ApplicationStage,
      highlight: 'Upcoming'
    },
    {
      id: 'final_review',
      title: 'Final Review Stage',
      description: 'Alex Thompson: Post-interview evaluation for DevOps Engineer',
      candidateEmail: 'alex.thompson@email.com',
      stage: 'final_review' as ApplicationStage,
      highlight: 'Decision Pending'
    },
    {
      id: 'rejection_feedback',
      title: 'Rejection with Feedback',
      description: 'James Wilson: Rejected at qualification stage with detailed feedback',
      candidateEmail: 'james.wilson@email.com',
      stage: 'rejected' as ApplicationStage,
      highlight: 'Learning Opportunity'
    }
  ];

  const pipelineStats = {
    totalApplications: mockPipelineApplications.length,
    stageDistribution: {
      applied: mockPipelineApplications.filter(app => app.stage === 'applied').length,
      qualified: mockPipelineApplications.filter(app => app.stage === 'qualified').length,
      interview: mockPipelineApplications.filter(app => app.stage === 'interview').length,
      final_review: mockPipelineApplications.filter(app => app.stage === 'final_review').length,
      passed: mockPipelineApplications.filter(app => app.stage === 'passed').length,
      rejected: mockPipelineApplications.filter(app => app.stage === 'rejected').length
    }
  };

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8">
          <h1 className="text-4xl font-bold mb-4">Jobitu 5-Stage Pipeline Demo</h1>
          <p className="text-xl text-blue-100 mb-6">
            Experience the complete candidate journey from application to company handover
          </p>
          <div className="flex justify-center">
            <PipelineProgress 
              currentStage="final_review" 
              completedStages={['applied', 'qualified', 'interview']}
              size="lg" 
              showLabels={true}
            />
          </div>
        </div>
      </div>

      {/* Pipeline Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Object.entries(pipelineStats.stageDistribution).map(([stage, count]) => {
          const stageConfig = {
            applied: { label: 'Applied', color: 'bg-blue-500', icon: Target },
            qualified: { label: 'Qualified', color: 'bg-green-500', icon: CheckCircle },
            interview: { label: 'Interview', color: 'bg-purple-500', icon: Users },
            final_review: { label: 'Final Review', color: 'bg-orange-500', icon: Eye },
            passed: { label: 'Passed', color: 'bg-yellow-500', icon: Trophy },
            rejected: { label: 'Rejected', color: 'bg-red-500', icon: ArrowRight }
          };
          
          const config = stageConfig[stage as keyof typeof stageConfig];
          const Icon = config.icon;
          
          return (
            <Card key={stage} className="text-center">
              <CardContent className="p-4">
                <div className={`${config.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold">{count}</div>
                <div className="text-sm text-gray-600">{config.label}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Demo Scenarios */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Interactive Demo Scenarios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {demoScenarios.map((scenario) => (
            <Card key={scenario.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{scenario.title}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{scenario.description}</p>
                  </div>
                  <Badge className={`${
                    scenario.stage === 'passed' ? 'bg-yellow-100 text-yellow-800' :
                    scenario.stage === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {scenario.highlight}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <PipelineProgress 
                    currentStage={scenario.stage} 
                    size="sm" 
                    showLabels={false}
                  />
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      onClick={() => {
                        setSelectedScenario(scenario.candidateEmail);
                        setActiveDemo('candidate');
                      }}
                    >
                      <PlayCircle className="h-4 w-4 mr-2" />
                      View as Candidate
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setActiveDemo('employer')}
                    >
                      <Building className="h-4 w-4 mr-2" />
                      View as Employer
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Key Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-purple-600" />
              Smart Automation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Automatic test assignment, qualification triggers, and stage progression based on completion status.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-blue-600" />
              Full Transparency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Candidates see exactly where they are in the process and what's required for advancement.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-green-600" />
              Data-Driven Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Comprehensive analytics on conversion rates, time-to-hire, and pipeline efficiency.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {onBack && (
          <Button variant="ghost" onClick={onBack} className="mb-6">
            <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
            Back to Dashboard
          </Button>
        )}

        <Tabs value={activeDemo} onValueChange={(value: any) => setActiveDemo(value)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Demo Overview</TabsTrigger>
            <TabsTrigger value="employer">Employer View</TabsTrigger>
            <TabsTrigger value="candidate">Candidate View</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            {renderOverview()}
          </TabsContent>

          <TabsContent value="employer" className="mt-6">
            <PipelineManagement 
              onViewApplicationDetail={(id) => console.log('View application:', id)}
              onStageAction={(id, action) => console.log('Stage action:', action, 'for:', id)}
            />
          </TabsContent>

          <TabsContent value="candidate" className="mt-6">
            <CandidateApplicationTracker 
              candidateEmail={selectedScenario || 'sarah.chen@email.com'}
              onViewJobDetail={(id) => console.log('View job:', id)}
              onTakeAssessment={(test) => console.log('Take assessment:', test)}
              onViewFeedback={(id) => console.log('View feedback:', id)}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
