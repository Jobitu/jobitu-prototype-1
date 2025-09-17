import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Textarea } from "./ui/textarea";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Alert, AlertDescription } from "./ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Eye, 
  EyeOff,
  Shield,
  Monitor,
  Wifi,
  Camera,
  Mic,
  Save,
  Send,
  ArrowLeft,
  ArrowRight,
  Flag,
  HelpCircle
} from "lucide-react";
import { CandidateAssessment, AssessmentQuestion } from "../data/assessmentMockData";

interface CandidateAssessmentInterfaceProps {
  assessment: CandidateAssessment;
  onSubmit: (answers: Record<string, any>) => void;
  onSave: (answers: Record<string, any>) => void;
  onExit: () => void;
}

export function CandidateAssessmentInterface({ 
  assessment, 
  onSubmit, 
  onSave, 
  onExit 
}: CandidateAssessmentInterfaceProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>(assessment.answers || {});
  const [timeRemaining, setTimeRemaining] = useState(assessment.totalTimeAllowed * 60); // Convert to seconds
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string>>(new Set());
  const [monitoringActive, setMonitoringActive] = useState(true);
  const [codeEditorValue, setCodeEditorValue] = useState('');
  
  const containerRef = useRef<HTMLDivElement>(null);
  const currentQuestion = assessment.questions[currentQuestionIndex];

  // Timer effect
  useEffect(() => {
    if (timeRemaining > 0 && assessment.status === 'in-progress') {
      const timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeRemaining, assessment.status]);

  // Fullscreen monitoring
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    const handleVisibilityChange = () => {
      if (document.hidden && monitoringActive) {
        // Track tab switch
        console.log('Tab switch detected');
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      if (monitoringActive) {
        e.preventDefault();
        console.log('Right click attempt detected');
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (monitoringActive && (e.ctrlKey || e.metaKey)) {
        if (e.key === 'c' || e.key === 'v' || e.key === 'a') {
          console.log('Copy/paste attempt detected');
        }
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [monitoringActive]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeColor = () => {
    const percentage = (timeRemaining / (assessment.totalTimeAllowed * 60)) * 100;
    if (percentage < 10) return 'text-red-600';
    if (percentage < 25) return 'text-orange-600';
    return 'text-green-600';
  };

  const handleAnswerChange = (questionId: string, answer: any) => {
    const newAnswers = { ...answers, [questionId]: answer };
    setAnswers(newAnswers);
    
    // Auto-save every answer
    onSave(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < assessment.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      // Load existing code for coding questions
      const nextQuestion = assessment.questions[currentQuestionIndex + 1];
      if (nextQuestion.type === 'coding') {
        setCodeEditorValue(answers[nextQuestion.id] || '');
      }
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      // Load existing code for coding questions
      const prevQuestion = assessment.questions[currentQuestionIndex - 1];
      if (prevQuestion.type === 'coding') {
        setCodeEditorValue(answers[prevQuestion.id] || '');
      }
    }
  };

  const handleFlagQuestion = () => {
    const newFlagged = new Set(flaggedQuestions);
    if (newFlagged.has(currentQuestion.id)) {
      newFlagged.delete(currentQuestion.id);
    } else {
      newFlagged.add(currentQuestion.id);
    }
    setFlaggedQuestions(newFlagged);
  };

  const enterFullscreen = () => {
    if (containerRef.current) {
      containerRef.current.requestFullscreen();
    }
  };

  const getProgressPercentage = () => {
    const answeredQuestions = assessment.questions.filter(q => answers[q.id] !== undefined).length;
    return (answeredQuestions / assessment.questions.length) * 100;
  };

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{currentQuestion.question}</h3>
            <RadioGroup 
              value={answers[currentQuestion.id]?.toString() || ''} 
              onValueChange={(value) => handleAnswerChange(currentQuestion.id, parseInt(value))}
            >
              {currentQuestion.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="cursor-pointer">{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case 'coding':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{currentQuestion.question}</h3>
            <div className="border rounded-lg">
              <div className="bg-gray-50 px-4 py-2 border-b flex items-center justify-between">
                <span className="text-sm font-medium">Code Editor</span>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">JavaScript</Badge>
                  {currentQuestion.timeLimit && (
                    <Badge variant="outline">
                      <Clock className="h-3 w-3 mr-1" />
                      {currentQuestion.timeLimit}min
                    </Badge>
                  )}
                </div>
              </div>
              <Textarea
                value={codeEditorValue}
                onChange={(e) => {
                  setCodeEditorValue(e.target.value);
                  handleAnswerChange(currentQuestion.id, e.target.value);
                }}
                placeholder="// Write your code here..."
                className="min-h-[300px] font-mono text-sm border-0 rounded-none resize-none"
              />
            </div>
            <div className="text-sm text-muted-foreground">
              <p>💡 Tip: Write clean, well-commented code. Consider edge cases and efficiency.</p>
            </div>
          </div>
        );

      case 'essay':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{currentQuestion.question}</h3>
            <Textarea
              value={answers[currentQuestion.id] || ''}
              onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
              placeholder="Type your answer here..."
              className="min-h-[200px]"
            />
            <div className="text-sm text-muted-foreground">
              Word count: {(answers[currentQuestion.id] || '').split(' ').filter(Boolean).length}
            </div>
          </div>
        );

      default:
        return <div>Question type not supported</div>;
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-xl font-semibold">{assessment.jobTitle} - Technical Assessment</h1>
              <p className="text-sm text-muted-foreground">
                Question {currentQuestionIndex + 1} of {assessment.questions.length}
              </p>
            </div>
            {flaggedQuestions.has(currentQuestion.id) && (
              <Badge variant="outline" className="text-orange-600 border-orange-600">
                <Flag className="h-3 w-3 mr-1" />
                Flagged
              </Badge>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Monitoring Status */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <Monitor className="h-4 w-4 text-green-600" />
                <Camera className="h-4 w-4 text-green-600" />
                <Mic className="h-4 w-4 text-green-600" />
                <Shield className="h-4 w-4 text-green-600" />
              </div>
              <span className="text-xs text-green-600">Secure Mode</span>
            </div>
            
            {/* Timer */}
            <div className={`flex items-center space-x-2 ${getTimeColor()}`}>
              <Clock className="h-4 w-4" />
              <span className="font-mono text-lg font-semibold">{formatTime(timeRemaining)}</span>
            </div>
            
            {/* Fullscreen Toggle */}
            {!isFullscreen && (
              <Button variant="outline" size="sm" onClick={enterFullscreen}>
                <Monitor className="h-4 w-4 mr-2" />
                Fullscreen
              </Button>
            )}
            
            {/* Exit Button */}
            <Button variant="outline" size="sm" onClick={() => setShowExitDialog(true)}>
              Exit
            </Button>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>Progress</span>
            <span>{Math.round(getProgressPercentage())}% Complete</span>
          </div>
          <Progress value={getProgressPercentage()} className="h-2" />
        </div>
      </div>

      {/* Security Alerts */}
      {!isFullscreen && (
        <Alert className="mx-6 mt-4 border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            For security purposes, please enable fullscreen mode. Tab switching and copy-paste are monitored.
          </AlertDescription>
        </Alert>
      )}

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <span>Question {currentQuestionIndex + 1}</span>
                  <Badge variant={currentQuestion.difficulty === 'easy' ? 'default' : 
                                currentQuestion.difficulty === 'medium' ? 'secondary' : 'destructive'}>
                    {currentQuestion.difficulty}
                  </Badge>
                  <Badge variant="outline">{currentQuestion.points} points</Badge>
                </CardTitle>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleFlagQuestion}
                  className={flaggedQuestions.has(currentQuestion.id) ? 'text-orange-600 border-orange-600' : ''}
                >
                  <Flag className="h-4 w-4 mr-1" />
                  {flaggedQuestions.has(currentQuestion.id) ? 'Unflag' : 'Flag'}
                </Button>
                <Button variant="outline" size="sm">
                  <HelpCircle className="h-4 w-4 mr-1" />
                  Help
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {renderQuestion()}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <Button
              variant="outline"
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={() => onSave(answers)}>
                <Save className="h-4 w-4 mr-2" />
                Save Progress
              </Button>
              
              {currentQuestionIndex === assessment.questions.length - 1 ? (
                <Button onClick={() => onSubmit(answers)} className="bg-green-600 hover:bg-green-700">
                  <Send className="h-4 w-4 mr-2" />
                  Submit Assessment
                </Button>
              ) : (
                <Button onClick={handleNextQuestion}>
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </div>

          {/* Question Navigation */}
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Question Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-10 gap-2">
                  {assessment.questions.map((question, index) => (
                    <Button
                      key={question.id}
                      variant={index === currentQuestionIndex ? "default" : "outline"}
                      size="sm"
                      className={`relative ${answers[question.id] !== undefined ? 'bg-green-100 border-green-300' : ''} 
                                 ${flaggedQuestions.has(question.id) ? 'bg-orange-100 border-orange-300' : ''}`}
                      onClick={() => setCurrentQuestionIndex(index)}
                    >
                      {index + 1}
                      {answers[question.id] !== undefined && (
                        <CheckCircle className="h-3 w-3 absolute -top-1 -right-1 text-green-600" />
                      )}
                      {flaggedQuestions.has(question.id) && (
                        <Flag className="h-3 w-3 absolute -top-1 -right-1 text-orange-600" />
                      )}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Exit Confirmation Dialog */}
      <Dialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Exit Assessment?</DialogTitle>
            <DialogDescription>
              Are you sure you want to exit? Your progress will be saved, but you'll need to restart the assessment.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={() => setShowExitDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={onExit}>
              Exit Assessment
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
