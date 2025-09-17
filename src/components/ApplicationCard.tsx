import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { PipelineApplication } from "../types/pipeline";
import { PipelineProgressCompact } from "./PipelineProgress";
import { 
  MapPin, 
  Clock, 
  Star, 
  Calendar,
  FileText,
  CheckCircle,
  Eye,
  Trophy,
  AlertTriangle,
  ChevronRight,
  Phone,
  Mail,
  ExternalLink,
  Award,
  Target,
  Zap,
  Users,
  MessageSquare,
  TrendingUp,
  Building
} from "lucide-react";

interface ApplicationCardProps {
  application: PipelineApplication;
  onViewDetails?: (applicationId: string) => void;
  onStageAction?: (applicationId: string, action: string) => void;
  viewType?: 'employer' | 'candidate';
  showActions?: boolean;
}

export function ApplicationCard({ 
  application, 
  onViewDetails, 
  onStageAction, 
  viewType = 'employer',
  showActions = true 
}: ApplicationCardProps) {
  
  const getStageActions = () => {
    if (!showActions || viewType !== 'employer') return null;
    
    switch (application.stage) {
      case 'applied':
        return (
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => onStageAction?.(application.id, 'view_tests')}>
              View Tests
            </Button>
            <Button size="sm" onClick={() => onStageAction?.(application.id, 'manual_review')}>
              Review Now
            </Button>
          </div>
        );
      case 'qualified':
        return (
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => onStageAction?.(application.id, 'reject')}>
              Reject
            </Button>
            <Button size="sm" onClick={() => onStageAction?.(application.id, 'advance_to_interview')}>
              Interview
            </Button>
          </div>
        );
      case 'interview':
        return (
          <div className="flex gap-2">
            {!application.stageData.interview?.interviewCompleted && (
              <Button size="sm" variant="outline" onClick={() => onStageAction?.(application.id, 'reschedule')}>
                Reschedule
              </Button>
            )}
            <Button size="sm" onClick={() => onStageAction?.(application.id, 'complete_interview')}>
              {application.stageData.interview?.interviewCompleted ? 'View Notes' : 'Complete'}
            </Button>
          </div>
        );
      case 'final_review':
        return (
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => onStageAction?.(application.id, 'reject_with_feedback')}>
              Reject
            </Button>
            <Button size="sm" onClick={() => onStageAction?.(application.id, 'advance_to_passed')}>
              Pass to Company
            </Button>
          </div>
        );
      case 'passed':
        return (
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => onStageAction?.(application.id, 'view_handover')}>
              View Handover
            </Button>
            <Button size="sm" onClick={() => onStageAction?.(application.id, 'complete_handover')}>
              Complete Handover
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  const getStageSpecificContent = () => {
    switch (application.stage) {
      case 'applied':
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Assigned Assessments</span>
              <Badge variant="secondary" className="text-xs">
                {application.stageData.applied?.assignedTests.length || 0} Tests
              </Badge>
            </div>
            <div className="space-y-2">
              {application.stageData.applied?.assignedTests.map((test, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                  <FileText className="h-3 w-3" />
                  {test}
                </div>
              ))}
              {application.stageData.applied?.assignedCaseStudies.map((study, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                  <Award className="h-3 w-3" />
                  {study}
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'qualified':
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Assessment Results</span>
              <Badge className="bg-green-100 text-green-800 text-xs">
                Qualified ✓
              </Badge>
            </div>
            <div className="space-y-2">
              {application.stageData.qualified?.testScores.map((test, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{test.testName}</span>
                  <div className="flex items-center gap-2">
                    <Progress value={(test.score / test.maxScore) * 100} className="w-16 h-2" />
                    <span className="text-sm font-medium">{test.score}/{test.maxScore}</span>
                  </div>
                </div>
              ))}
            </div>
            {application.stageData.qualified?.caseStudySubmitted && (
              <div className="flex items-center gap-2 text-sm text-green-600">
                <CheckCircle className="h-3 w-3" />
                Case study submitted
              </div>
            )}
          </div>
        );
      
      case 'interview':
        const interviewData = application.stageData.interview;
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Interview Details</span>
              <Badge className={`text-xs ${
                interviewData?.interviewCompleted ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {interviewData?.interviewCompleted ? 'Completed' : 'Scheduled'}
              </Badge>
            </div>
            {interviewData?.interviewDate && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-3 w-3" />
                {interviewData.interviewDate} at {interviewData.interviewTime}
              </div>
            )}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="h-3 w-3" />
              {interviewData?.interviewer} ({interviewData?.interviewType})
            </div>
            {interviewData?.interviewNotes && (
              <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                "{interviewData.interviewNotes}"
              </div>
            )}
          </div>
        );
      
      case 'final_review':
        const reviewData = application.stageData.final_review;
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Final Review</span>
              <Badge className="bg-orange-100 text-orange-800 text-xs">
                In Review
              </Badge>
            </div>
            {reviewData?.finalScore && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Overall Score</span>
                <div className="flex items-center gap-2">
                  <Progress value={reviewData.finalScore} className="w-16 h-2" />
                  <span className="text-sm font-bold text-orange-600">{reviewData.finalScore}/100</span>
                </div>
              </div>
            )}
            <div className="space-y-1">
              {reviewData?.reviewerNotes.slice(0, 2).map((note, index) => (
                <div key={index} className="text-xs text-gray-600 flex items-start gap-1">
                  <CheckCircle className="h-3 w-3 mt-0.5 text-green-500" />
                  {note}
                </div>
              ))}
              {(reviewData?.reviewerNotes.length || 0) > 2 && (
                <div className="text-xs text-gray-500">
                  +{(reviewData?.reviewerNotes.length || 0) - 2} more notes
                </div>
              )}
            </div>
          </div>
        );
      
      case 'passed':
        const passedData = application.stageData.passed;
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Handover Status</span>
              <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                <Trophy className="h-3 w-3 mr-1" />
                Passed!
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Building className="h-3 w-3" />
                Contact: {passedData?.companyContact}
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium">Next Steps:</span>
                <ul className="mt-1 space-y-1">
                  {passedData?.nextSteps.slice(0, 2).map((step, index) => (
                    <li key={index} className="text-xs flex items-start gap-1">
                      <ChevronRight className="h-3 w-3 mt-0.5" />
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const getSourceBadge = () => {
    const sourceConfig = {
      smart_match: { label: 'Smart Match', className: 'bg-purple-100 text-purple-800', icon: Zap },
      job_board: { label: 'Job Board', className: 'bg-blue-100 text-blue-800', icon: ExternalLink },
      referral: { label: 'Referral', className: 'bg-green-100 text-green-800', icon: Users },
      direct: { label: 'Direct', className: 'bg-gray-100 text-gray-800', icon: Target }
    };
    
    const config = sourceConfig[application.source];
    const Icon = config.icon;
    
    return (
      <Badge className={`${config.className} text-xs flex items-center gap-1`}>
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={application.candidateAvatar} alt={application.candidateName} />
              <AvatarFallback>
                {application.candidateName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">{application.candidateName}</h3>
              <p className="text-sm text-gray-600">{application.jobTitle}</p>
              <div className="flex items-center gap-2 mt-1">
                <MapPin className="h-3 w-3 text-gray-400" />
                <span className="text-xs text-gray-500">{application.candidateLocation}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-100 text-blue-800 text-xs">
                <Star className="h-3 w-3 mr-1" />
                {application.matchScore}% Match
              </Badge>
              {getSourceBadge()}
            </div>
            <div className="text-xs text-gray-500 flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Applied {application.applicationDate}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Pipeline Progress */}
        <PipelineProgressCompact currentStage={application.stage} />
        
        {/* Candidate Summary */}
        <p className="text-sm text-gray-600">{application.candidateSummary}</p>
        
        {/* Skills */}
        <div className="flex flex-wrap gap-1">
          {application.candidateSkills.slice(0, 4).map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
          {application.candidateSkills.length > 4 && (
            <Badge variant="secondary" className="text-xs">
              +{application.candidateSkills.length - 4} more
            </Badge>
          )}
        </div>
        
        {/* Stage-specific content */}
        {getStageSpecificContent()}
        
        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => onViewDetails?.(application.id)}>
              <Eye className="h-4 w-4 mr-1" />
              View Details
            </Button>
            {viewType === 'employer' && (
              <>
                <Button variant="ghost" size="sm">
                  <Mail className="h-4 w-4 mr-1" />
                  Contact
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Notes
                </Button>
              </>
            )}
          </div>
          {getStageActions()}
        </div>
      </CardContent>
    </Card>
  );
}

// Compact version for lists
export function ApplicationCardCompact({ 
  application, 
  onViewDetails, 
  onStageAction 
}: ApplicationCardProps) {
  return (
    <Card className="hover:shadow-sm transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={application.candidateAvatar} alt={application.candidateName} />
              <AvatarFallback className="text-xs">
                {application.candidateName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-medium text-sm">{application.candidateName}</h4>
              <p className="text-xs text-gray-600">{application.jobTitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <PipelineProgressCompact currentStage={application.stage} />
            <Button variant="ghost" size="sm" onClick={() => onViewDetails?.(application.id)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
