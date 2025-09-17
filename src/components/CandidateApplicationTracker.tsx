import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { PipelineProgress } from "./PipelineProgress";
import { PipelineApplication, ApplicationStage } from "../types/pipeline";
import { mockPipelineApplications } from "../data/pipelineMockData";
import { 
  Clock, 
  CheckCircle, 
  Calendar,
  FileText,
  Award,
  MessageSquare,
  Eye,
  Trophy,
  AlertTriangle,
  ArrowRight,
  Download,
  ExternalLink,
  Star,
  Building,
  Users,
  Zap,
  Target
} from "lucide-react";

interface CandidateApplicationTrackerProps {
  candidateEmail?: string;
  onViewJobDetail?: (jobId: string) => void;
  onTakeAssessment?: (testName: string) => void;
  onViewFeedback?: (applicationId: string) => void;
}

export function CandidateApplicationTracker({ 
  candidateEmail = 'sarah.chen@email.com',
  onViewJobDetail,
  onTakeAssessment,
  onViewFeedback
}: CandidateApplicationTrackerProps) {
  // Filter applications for this candidate
  const [candidateApplications] = useState<PipelineApplication[]>(
    mockPipelineApplications.filter(app => app.candidateEmail === candidateEmail)
  );

  const getStageDescription = (stage: ApplicationStage, application: PipelineApplication) => {
    switch (stage) {
      case 'applied':
        const testsCount = application.stageData.applied?.assignedTests.length || 0;
        const caseStudiesCount = application.stageData.applied?.assignedCaseStudies.length || 0;
        return `${testsCount} assessments and ${caseStudiesCount} case study assigned. Complete them to advance.`;
      case 'qualified':
        return 'Great job! You\'ve completed all assessments. Your application is now being reviewed by the employer.';
      case 'interview':
        const interviewData = application.stageData.interview;
        if (interviewData?.interviewCompleted) {
          return 'Interview completed successfully. Awaiting final decision.';
        } else if (interviewData?.interviewScheduled) {
          return `Interview scheduled for ${interviewData.interviewDate} at ${interviewData.interviewTime}.`;
        }
        return 'You\'ve been selected for an interview! The employer will contact you soon.';
      case 'final_review':
        return 'Excellent! You\'re in the final review stage. The employer is making their final decision.';
      case 'passed':
        return 'Congratulations! You\'ve passed Jobitu\'s pre-screening. The company will contact you directly for next steps.';
      case 'rejected':
        return 'Unfortunately, your application was not successful this time. View feedback to improve future applications.';
      default:
        return '';
    }
  };

  const getNextSteps = (application: PipelineApplication) => {
    switch (application.stage) {
      case 'applied':
        return [
          'Complete assigned technical assessments',
          'Submit case study solution',
          'Wait for automatic qualification'
        ];
      case 'qualified':
        return [
          'Wait for employer review',
          'Prepare for potential interview',
          'Keep your profile updated'
        ];
      case 'interview':
        if (!application.stageData.interview?.interviewCompleted) {
          return [
            'Prepare for your interview',
            'Research the company',
            'Review your application materials'
          ];
        }
        return [
          'Wait for interview feedback',
          'Continue with other opportunities',
          'Stay available for follow-up questions'
        ];
      case 'final_review':
        return [
          'Wait for final decision',
          'Prepare for potential offer',
          'Keep other opportunities active'
        ];
      case 'passed':
        return [
          'Wait for company contact',
          'Prepare for technical interviews',
          'Review salary expectations'
        ];
      case 'rejected':
        return [
          'Review feedback provided',
          'Improve identified skill gaps',
          'Apply to similar positions'
        ];
      default:
        return [];
    }
  };

  const renderApplicationCard = (application: PipelineApplication) => {
    const isRejected = application.stage === 'rejected';
    
    return (
      <Card key={application.id} className={`${isRejected ? 'border-red-200 bg-red-50/30' : 'hover:shadow-md'} transition-shadow`}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl">{application.jobTitle}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Building className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">Company Job ID: {application.jobId}</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-500">Applied on {application.applicationDate}</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Badge className="bg-blue-100 text-blue-800 flex items-center gap-1">
                <Star className="h-3 w-3" />
                {application.matchScore}% Match
              </Badge>
              {application.source === 'smart_match' && (
                <Badge className="bg-purple-100 text-purple-800 flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  Smart Match
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Pipeline Progress */}
          <div>
            <h4 className="font-medium mb-3">Application Progress</h4>
            <PipelineProgress 
              currentStage={application.stage} 
              size="md" 
              showLabels={true}
            />
          </div>

          {/* Current Status */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium mb-2">Current Status</h4>
            <p className="text-sm text-gray-700">
              {getStageDescription(application.stage, application)}
            </p>
          </div>

          {/* Stage-specific content */}
          {application.stage === 'applied' && application.stageData.applied && (
            <div className="space-y-3">
              <h4 className="font-medium">Required Assessments</h4>
              <div className="space-y-2">
                {application.stageData.applied.assignedTests.map((test, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium">{test}</span>
                    </div>
                    <Button size="sm" onClick={() => onTakeAssessment?.(test)}>
                      Take Test
                    </Button>
                  </div>
                ))}
                {application.stageData.applied.assignedCaseStudies.map((study, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-purple-600" />
                      <span className="text-sm font-medium">{study}</span>
                    </div>
                    <Button size="sm" onClick={() => onTakeAssessment?.(study)}>
                      Start Case Study
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {application.stage === 'qualified' && application.stageData.qualified && (
            <div className="space-y-3">
              <h4 className="font-medium">Assessment Results</h4>
              <div className="space-y-2">
                {application.stageData.qualified.testScores.map((test, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm">{test.testName}</span>
                    <div className="flex items-center gap-2">
                      <Progress value={(test.score / test.maxScore) * 100} className="w-20 h-2" />
                      <span className="text-sm font-medium">{test.score}/{test.maxScore}</span>
                    </div>
                  </div>
                ))}
              </div>
              {application.stageData.qualified.caseStudySubmitted && (
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  Case study submitted successfully
                </div>
              )}
            </div>
          )}

          {application.stage === 'interview' && application.stageData.interview && (
            <div className="space-y-3">
              <h4 className="font-medium">Interview Information</h4>
              <div className="bg-blue-50 rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">
                    {application.stageData.interview.interviewDate} at {application.stageData.interview.interviewTime}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">
                    {application.stageData.interview.interviewer} ({application.stageData.interview.interviewType})
                  </span>
                </div>
                {application.stageData.interview.interviewCompleted && (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm">Interview completed</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {application.stage === 'final_review' && application.stageData.final_review && (
            <div className="space-y-3">
              <h4 className="font-medium">Final Review Status</h4>
              <div className="bg-orange-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Overall Evaluation</span>
                  {application.stageData.final_review.finalScore && (
                    <span className="text-lg font-bold text-orange-600">
                      {application.stageData.final_review.finalScore}/100
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-700">
                  Your application is being thoroughly reviewed by our team. This includes assessment of your technical skills, interview performance, and overall fit.
                </p>
              </div>
            </div>
          )}

          {application.stage === 'passed' && application.stageData.passed && (
            <div className="space-y-3">
              <h4 className="font-medium flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-600" />
                Congratulations! You've Passed
              </h4>
              <div className="bg-yellow-50 rounded-lg p-4 space-y-3">
                <div>
                  <span className="text-sm font-medium">Company Contact:</span>
                  <p className="text-sm text-gray-700">{application.stageData.passed.companyContact}</p>
                </div>
                <div>
                  <span className="text-sm font-medium">Next Steps:</span>
                  <ul className="text-sm text-gray-700 mt-1 space-y-1">
                    {application.stageData.passed.nextSteps.map((step, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <ArrowRight className="h-3 w-3 mt-1 text-gray-500" />
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {application.stage === 'rejected' && application.rejection && (
            <div className="space-y-3">
              <h4 className="font-medium flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                Application Feedback
              </h4>
              <div className="bg-red-50 rounded-lg p-4">
                <p className="text-sm text-gray-700 mb-3">{application.rejection.feedback}</p>
                <Button size="sm" variant="outline" onClick={() => onViewFeedback?.(application.id)}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  View Detailed Feedback
                </Button>
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className="space-y-3">
            <h4 className="font-medium">What's Next?</h4>
            <ul className="space-y-2">
              {getNextSteps(application).map((step, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                  <ArrowRight className="h-3 w-3 mt-1 text-gray-500" />
                  {step}
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4 border-t">
            <Button variant="outline" size="sm" onClick={() => onViewJobDetail?.(application.jobId)}>
              <Eye className="h-4 w-4 mr-2" />
              View Job Details
            </Button>
            {application.stage !== 'rejected' && (
              <Button variant="outline" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                Contact Recruiter
              </Button>
            )}
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download Timeline
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Applications</h1>
          <p className="text-gray-600 mt-1">Track your progress through the Jobitu pipeline</p>
        </div>
        <Badge className="bg-blue-100 text-blue-800">
          {candidateApplications.length} Active Application{candidateApplications.length !== 1 ? 's' : ''}
        </Badge>
      </div>

      {candidateApplications.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Applications Yet</h3>
            <p className="text-gray-600 mb-4">Start your job search to see your applications here</p>
            <Button>
              <ExternalLink className="h-4 w-4 mr-2" />
              Browse Jobs
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {candidateApplications.map(renderApplicationCard)}
        </div>
      )}
    </div>
  );
}
