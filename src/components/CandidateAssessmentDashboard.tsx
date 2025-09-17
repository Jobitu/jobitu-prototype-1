import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Alert, AlertDescription } from "./ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Play,
  RotateCcw,
  FileText,
  Code,
  Brain,
  Target,
  Calendar,
  Trophy,
  TrendingUp,
  Users,
  Star,
  Timer,
  BookOpen,
  Award
} from "lucide-react";
import { candidateAssessments, candidateCaseStudies } from "../data/assessmentMockData";

interface CandidateAssessmentDashboardProps {
  candidateEmail: string;
  onStartAssessment: (assessmentId: string) => void;
  onStartCaseStudy: (caseStudyId: string) => void;
  onViewResults: (type: 'assessment' | 'case-study', id: string) => void;
}

export function CandidateAssessmentDashboard({ 
  candidateEmail, 
  onStartAssessment, 
  onStartCaseStudy, 
  onViewResults 
}: CandidateAssessmentDashboardProps) {
  const [activeTab, setActiveTab] = useState('assessments');

  const userAssessments = candidateAssessments.filter(a => a.candidateEmail === candidateEmail);
  const userCaseStudies = candidateCaseStudies.filter(cs => cs.candidateEmail === candidateEmail);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'not-started': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'expired': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'in-progress': return <Clock className="h-4 w-4" />;
      case 'not-started': return <Play className="h-4 w-4" />;
      case 'expired': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const renderAssessmentCard = (assessment: any) => (
    <Card key={assessment.id} className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{assessment.jobTitle}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{assessment.companyName}</p>
          </div>
          <Badge className={getStatusColor(assessment.status)}>
            {getStatusIcon(assessment.status)}
            <span className="ml-1 capitalize">{assessment.status.replace('-', ' ')}</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span>{assessment.questions.length} Questions</span>
          </div>
          <div className="flex items-center space-x-2">
            <Timer className="h-4 w-4 text-muted-foreground" />
            <span>{assessment.totalTimeAllowed} minutes</span>
          </div>
          <div className="flex items-center space-x-2">
            <Brain className="h-4 w-4 text-muted-foreground" />
            <span className="capitalize">{assessment.difficulty}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Target className="h-4 w-4 text-muted-foreground" />
            <span>{assessment.passingScore}% to pass</span>
          </div>
        </div>

        {assessment.status === 'in-progress' && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{Math.round((Object.keys(assessment.answers || {}).length / assessment.questions.length) * 100)}%</span>
            </div>
            <Progress value={(Object.keys(assessment.answers || {}).length / assessment.questions.length) * 100} />
          </div>
        )}

        {assessment.status === 'completed' && assessment.score !== undefined && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-900">Score: {assessment.score}%</span>
              </div>
              <Badge variant={assessment.score >= assessment.passingScore ? "default" : "destructive"}>
                {assessment.score >= assessment.passingScore ? "Passed" : "Failed"}
              </Badge>
            </div>
            {assessment.feedback && (
              <p className="text-sm text-green-800 mt-2">{assessment.feedback}</p>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <div className="text-xs text-muted-foreground">
            {assessment.status === 'not-started' && `Available until ${new Date(assessment.expiresAt).toLocaleDateString()}`}
            {assessment.status === 'in-progress' && `Started ${new Date(assessment.startedAt).toLocaleDateString()}`}
            {assessment.status === 'completed' && `Completed ${new Date(assessment.completedAt).toLocaleDateString()}`}
          </div>
          
          <div className="flex space-x-2">
            {assessment.status === 'not-started' && (
              <Button onClick={() => onStartAssessment(assessment.id)}>
                <Play className="h-4 w-4 mr-2" />
                Start Assessment
              </Button>
            )}
            {assessment.status === 'in-progress' && (
              <Button onClick={() => onStartAssessment(assessment.id)}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Continue
              </Button>
            )}
            {assessment.status === 'completed' && (
              <Button variant="outline" onClick={() => onViewResults('assessment', assessment.id)}>
                <FileText className="h-4 w-4 mr-2" />
                View Results
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderCaseStudyCard = (caseStudy: any) => (
    <Card key={caseStudy.id} className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{caseStudy.jobTitle}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{caseStudy.companyName}</p>
            <p className="text-sm font-medium text-blue-600 mt-1">{caseStudy.title}</p>
          </div>
          <Badge className={getStatusColor(caseStudy.status)}>
            {getStatusIcon(caseStudy.status)}
            <span className="ml-1 capitalize">{caseStudy.status.replace('-', ' ')}</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{caseStudy.totalTimeAllowed} hours</span>
          </div>
          <div className="flex items-center space-x-2">
            <Brain className="h-4 w-4 text-muted-foreground" />
            <span className="capitalize">{caseStudy.difficulty}</span>
          </div>
          <div className="flex items-center space-x-2">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <span>{caseStudy.resources?.length || 0} Resources</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{caseStudy.type}</span>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          <p className="line-clamp-2">{caseStudy.objective}</p>
        </div>

        {caseStudy.status === 'in-progress' && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>In Progress</span>
            </div>
            <Progress value={45} />
          </div>
        )}

        {caseStudy.status === 'completed' && caseStudy.score !== undefined && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-900">Score: {caseStudy.score}%</span>
              </div>
              <Badge variant="default">Completed</Badge>
            </div>
            {caseStudy.feedback && (
              <p className="text-sm text-green-800 mt-2">{caseStudy.feedback}</p>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <div className="text-xs text-muted-foreground">
            {caseStudy.status === 'not-started' && `Available until ${new Date(caseStudy.expiresAt).toLocaleDateString()}`}
            {caseStudy.status === 'in-progress' && `Started ${new Date(caseStudy.startedAt).toLocaleDateString()}`}
            {caseStudy.status === 'completed' && `Completed ${new Date(caseStudy.completedAt).toLocaleDateString()}`}
          </div>
          
          <div className="flex space-x-2">
            {caseStudy.status === 'not-started' && (
              <Button onClick={() => onStartCaseStudy(caseStudy.id)}>
                <Play className="h-4 w-4 mr-2" />
                Start Case Study
              </Button>
            )}
            {caseStudy.status === 'in-progress' && (
              <Button onClick={() => onStartCaseStudy(caseStudy.id)}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Continue
              </Button>
            )}
            {caseStudy.status === 'completed' && (
              <Button variant="outline" onClick={() => onViewResults('case-study', caseStudy.id)}>
                <FileText className="h-4 w-4 mr-2" />
                View Results
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const getOverallStats = () => {
    const allItems = [...userAssessments, ...userCaseStudies];
    const completed = allItems.filter(item => item.status === 'completed').length;
    const inProgress = allItems.filter(item => item.status === 'in-progress').length;
    const notStarted = allItems.filter(item => item.status === 'not-started').length;
    
    return { completed, inProgress, notStarted, total: allItems.length };
  };

  const stats = getOverallStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Assessment Center</h1>
        <p className="text-muted-foreground">Complete your assessments and case studies to advance in the hiring process</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Items</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{stats.completed}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold">{stats.inProgress}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Play className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{stats.notStarted}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Priority Items Alert */}
      {stats.inProgress > 0 && (
        <Alert className="border-orange-200 bg-orange-50">
          <AlertCircle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            You have {stats.inProgress} assessment{stats.inProgress > 1 ? 's' : ''} in progress. 
            Complete them before they expire to avoid having to restart.
          </AlertDescription>
        </Alert>
      )}

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="assessments" className="flex items-center space-x-2">
            <Code className="h-4 w-4" />
            <span>Technical Assessments ({userAssessments.length})</span>
          </TabsTrigger>
          <TabsTrigger value="case-studies" className="flex items-center space-x-2">
            <Target className="h-4 w-4" />
            <span>Case Studies ({userCaseStudies.length})</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="assessments" className="mt-6">
          {userAssessments.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Code className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Assessments Available</h3>
                <p className="text-muted-foreground">
                  You don't have any technical assessments assigned yet. 
                  Check back after applying to positions that require assessments.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {userAssessments.map(renderAssessmentCard)}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="case-studies" className="mt-6">
          {userCaseStudies.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Case Studies Available</h3>
                <p className="text-muted-foreground">
                  You don't have any case studies assigned yet. 
                  These are typically assigned for senior roles and consulting positions.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {userCaseStudies.map(renderCaseStudyCard)}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
