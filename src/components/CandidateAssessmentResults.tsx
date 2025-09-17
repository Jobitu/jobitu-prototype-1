import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Alert, AlertDescription } from "./ui/alert";
import { 
  Trophy,
  CheckCircle,
  XCircle,
  Clock,
  Target,
  TrendingUp,
  BarChart3,
  FileText,
  Download,
  Share,
  ArrowLeft,
  Star,
  AlertTriangle,
  Brain,
  Code,
  MessageSquare
} from "lucide-react";
import { CandidateAssessment, CandidateCaseStudy } from "../data/assessmentMockData";

interface CandidateAssessmentResultsProps {
  assessment?: CandidateAssessment;
  caseStudy?: CandidateCaseStudy;
  onBack: () => void;
  onDownloadReport: () => void;
  onShareResults: () => void;
}

export function CandidateAssessmentResults({ 
  assessment, 
  caseStudy, 
  onBack, 
  onDownloadReport, 
  onShareResults 
}: CandidateAssessmentResultsProps) {
  const item = assessment || caseStudy;
  const isAssessment = !!assessment;
  
  if (!item || item.status !== 'completed') {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2">Results Not Available</h3>
        <p className="text-muted-foreground">
          Results are only available for completed {isAssessment ? 'assessments' : 'case studies'}.
        </p>
        <Button onClick={onBack} className="mt-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Go Back
        </Button>
      </div>
    );
  }

  const getScoreColor = (score: number, passingScore: number) => {
    if (score >= passingScore) return 'text-green-600';
    if (score >= passingScore * 0.8) return 'text-orange-600';
    return 'text-red-600';
  };

  const getPerformanceLevel = (score: number) => {
    if (score >= 90) return { level: 'Excellent', color: 'bg-green-100 text-green-800 border-green-200' };
    if (score >= 80) return { level: 'Good', color: 'bg-blue-100 text-blue-800 border-blue-200' };
    if (score >= 70) return { level: 'Average', color: 'bg-orange-100 text-orange-800 border-orange-200' };
    return { level: 'Below Average', color: 'bg-red-100 text-red-800 border-red-200' };
  };

  const performance = getPerformanceLevel(item.score || 0);

  const renderAssessmentResults = () => {
    if (!assessment) return null;

    const correctAnswers = assessment.questions.filter(q => 
      assessment.answers?.[q.id] === q.correctAnswer
    ).length;

    return (
      <div className="space-y-6">
        {/* Score Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="h-5 w-5" />
              <span>Assessment Results</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className={`text-6xl font-bold ${getScoreColor(assessment.score || 0, assessment.passingScore)}`}>
                {assessment.score}%
              </div>
              <Badge className={performance.color} variant="outline">
                {performance.level}
              </Badge>
              <p className="text-muted-foreground mt-2">
                {correctAnswers} out of {assessment.questions.length} questions correct
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Passing Score</p>
                <p className="text-2xl font-bold">{assessment.passingScore}%</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Time Taken</p>
                <p className="text-2xl font-bold">{assessment.timeTaken || 'N/A'}</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Difficulty</p>
                <p className="text-2xl font-bold capitalize">{assessment.difficulty}</p>
              </div>
            </div>

            {(assessment.score || 0) >= assessment.passingScore ? (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  <strong>Congratulations!</strong> You passed this assessment. Your application will advance to the next stage.
                </AlertDescription>
              </Alert>
            ) : (
              <Alert className="border-red-200 bg-red-50">
                <XCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  <strong>Assessment not passed.</strong> You may be able to retake this assessment after a waiting period.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Question Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Question Breakdown</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assessment.questions.map((question, index) => {
                const userAnswer = assessment.answers?.[question.id];
                const isCorrect = userAnswer === question.correctAnswer;
                
                return (
                  <div key={question.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm font-medium">Question {index + 1}</span>
                          <Badge variant="outline">{question.points} pts</Badge>
                          <Badge variant={question.difficulty === 'easy' ? 'default' : 
                                        question.difficulty === 'medium' ? 'secondary' : 'destructive'}>
                            {question.difficulty}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{question.question}</p>
                      </div>
                      {isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                      )}
                    </div>
                    
                    {question.type === 'multiple-choice' && (
                      <div className="text-sm">
                        <p className="text-muted-foreground">
                          Your answer: <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                            {question.options?.[userAnswer] || 'No answer'}
                          </span>
                        </p>
                        {!isCorrect && (
                          <p className="text-muted-foreground">
                            Correct answer: <span className="text-green-600">
                              {question.options?.[question.correctAnswer]}
                            </span>
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Feedback */}
        {assessment.feedback && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5" />
                <span>Feedback</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{assessment.feedback}</p>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  const renderCaseStudyResults = () => {
    if (!caseStudy) return null;

    return (
      <div className="space-y-6">
        {/* Score Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="h-5 w-5" />
              <span>Case Study Results</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className={`text-6xl font-bold ${getScoreColor(caseStudy.score || 0, 70)}`}>
                {caseStudy.score}%
              </div>
              <Badge className={performance.color} variant="outline">
                {performance.level}
              </Badge>
              <p className="text-muted-foreground mt-2">{caseStudy.title}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <Brain className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Difficulty</p>
                <p className="text-2xl font-bold capitalize">{caseStudy.difficulty}</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Time Limit</p>
                <p className="text-2xl font-bold">{caseStudy.totalTimeAllowed}h</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <FileText className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Submission</p>
                <p className="text-2xl font-bold">Complete</p>
              </div>
            </div>

            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                <strong>Case study submitted successfully!</strong> Your submission is being reviewed by the hiring team.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Evaluation Criteria */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="h-5 w-5" />
              <span>Evaluation Breakdown</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { criteria: 'Problem Analysis', score: 85, weight: 25 },
                { criteria: 'Strategic Thinking', score: 78, weight: 25 },
                { criteria: 'Recommendations Quality', score: 82, weight: 30 },
                { criteria: 'Implementation Plan', score: 75, weight: 20 }
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{item.criteria}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">{item.weight}%</span>
                      <span className="text-sm font-bold">{item.score}%</span>
                    </div>
                  </div>
                  <Progress value={item.score} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Feedback */}
        {caseStudy.feedback && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5" />
                <span>Reviewer Feedback</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{caseStudy.feedback}</p>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Button variant="ghost" onClick={onBack} className="mb-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold">{item.jobTitle} - Results</h1>
          <p className="text-muted-foreground">{item.companyName}</p>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" onClick={onDownloadReport}>
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </Button>
          <Button variant="outline" onClick={onShareResults}>
            <Share className="h-4 w-4 mr-2" />
            Share Results
          </Button>
        </div>
      </div>

      {/* Results Content */}
      {isAssessment ? renderAssessmentResults() : renderCaseStudyResults()}

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <div>
                <p className="font-medium">Application Review</p>
                <p className="text-sm text-muted-foreground">
                  Your {isAssessment ? 'assessment' : 'case study'} results will be reviewed by the hiring team.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-gray-300 rounded-full mt-2"></div>
              <div>
                <p className="font-medium">Interview Invitation</p>
                <p className="text-sm text-muted-foreground">
                  If your results meet the requirements, you'll be invited for an interview.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-gray-300 rounded-full mt-2"></div>
              <div>
                <p className="font-medium">Final Decision</p>
                <p className="text-sm text-muted-foreground">
                  You'll receive notification about the final hiring decision.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
