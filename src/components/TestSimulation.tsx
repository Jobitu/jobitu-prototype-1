import { useState, useEffect } from "react";
import { useNotifications } from "./NotificationContext";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Checkbox } from "./ui/checkbox";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Alert, AlertDescription } from "./ui/alert";
import { 
  ArrowLeft,
  Clock,
  FileText,
  Code,
  Brain,
  Target,
  CheckCircle,
  AlertCircle,
  Bookmark,
  Send,
  Save,
  Play,
  Pause,
  Eye,
  Download,
  Upload,
  Lightbulb,
  BookOpen,
  Users,
  BarChart3,
  Zap,
  Award,
  Coffee,
  Timer,
  Flag,
  ArrowRight
} from "lucide-react";

interface TestSimulationProps {
  onBack: () => void;
  testType: 'coding' | 'case' | 'design' | 'marketing';
  testTitle: string;
  companyName: string;
}

interface Question {
  id: string;
  type: 'multiple-choice' | 'short-answer' | 'long-answer' | 'code' | 'file-upload';
  title: string;
  description: string;
  options?: string[];
  placeholder?: string;
  maxLength?: number;
  language?: string;
  timeEstimate: number;
  points: number;
  isRequired: boolean;
}

interface TestData {
  title: string;
  description: string;
  estimatedTime: number;
  totalPoints: number;
  skillsAssessed: string[];
  questions: Question[];
  resources?: {
    title: string;
    content: string;
    type: 'text' | 'pdf' | 'link';
  }[];
}

export function TestSimulation({ onBack, testType, testTitle, companyName }: TestSimulationProps) {
  const { showToast } = useNotifications();
  const [currentStep, setCurrentStep] = useState<'overview' | 'test' | 'submitted'>('overview');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [markedQuestions, setMarkedQuestions] = useState<Set<string>>(new Set());
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState('');

  // Mock test data based on type
  const getTestData = (): TestData => {
    switch (testType) {
      case 'coding':
        return {
          title: "Frontend Developer Technical Assessment",
          description: "Evaluate your React and TypeScript skills through practical coding challenges.",
          estimatedTime: 45,
          totalPoints: 100,
          skillsAssessed: ["React", "TypeScript", "Problem Solving", "Code Quality"],
          questions: [
            {
              id: 'q1',
              type: 'code',
              title: "React Component Implementation",
              description: "Create a reusable Button component in React with TypeScript that supports different variants (primary, secondary, outline) and sizes (small, medium, large).",
              language: 'typescript',
              timeEstimate: 20,
              points: 40,
              isRequired: true,
              placeholder: `interface ButtonProps {\n  // Define your props here\n}\n\nconst Button: React.FC<ButtonProps> = ({ }) => {\n  // Implement your component here\n  return (\n    <button>\n      \n    </button>\n  );\n};\n\nexport default Button;`
            },
            {
              id: 'q2',
              type: 'multiple-choice',
              title: "React Hooks Best Practices",
              description: "Which of the following is the correct way to handle side effects in a React functional component?",
              options: [
                "Use useEffect with an empty dependency array",
                "Use useEffect with all dependencies included",
                "Use useLayoutEffect for all side effects",
                "Avoid useEffect and use class components instead"
              ],
              timeEstimate: 5,
              points: 20,
              isRequired: true
            },
            {
              id: 'q3',
              type: 'short-answer',
              title: "Performance Optimization",
              description: "Describe three techniques you would use to optimize the performance of a React application.",
              maxLength: 500,
              timeEstimate: 10,
              points: 30,
              isRequired: true
            },
            {
              id: 'q4',
              type: 'long-answer',
              title: "Architecture Decision",
              description: "You're building a complex dashboard with real-time data updates. Explain your approach to state management and data synchronization.",
              maxLength: 1000,
              timeEstimate: 10,
              points: 10,
              isRequired: false
            }
          ],
          resources: [
            {
              title: "React TypeScript Cheatsheet",
              content: "Common patterns and type definitions for React with TypeScript",
              type: 'text'
            },
            {
              title: "Company Style Guide",
              content: "Internal coding standards and conventions",
              type: 'pdf'
            }
          ]
        };
      
      case 'marketing':
        return {
          title: "Marketing Strategy Simulation",
          description: "Analyze a real growth scenario and propose a comprehensive marketing strategy.",
          estimatedTime: 25,
          totalPoints: 100,
          skillsAssessed: ["Strategic Thinking", "Data Analysis", "Creative Problem Solving", "Communication"],
          questions: [
            {
              id: 'q1',
              type: 'long-answer',
              title: "Market Analysis",
              description: "A B2B SaaS company has 1000 users but low engagement (20% MAU). Revenue is $50k MRR. Analyze the situation and identify the core problem.",
              maxLength: 800,
              timeEstimate: 8,
              points: 30,
              isRequired: true
            },
            {
              id: 'q2',
              type: 'multiple-choice',
              title: "Primary Growth Lever",
              description: "Given the scenario above, what should be the primary growth focus?",
              options: [
                "Acquisition - Get more users",
                "Activation - Improve onboarding",
                "Retention - Increase engagement",
                "Revenue - Increase pricing"
              ],
              timeEstimate: 3,
              points: 20,
              isRequired: true
            },
            {
              id: 'q3',
              type: 'long-answer',
              title: "90-Day Action Plan",
              description: "Create a detailed 90-day marketing plan to address the identified problem. Include specific tactics, metrics, and expected outcomes.",
              maxLength: 1200,
              timeEstimate: 12,
              points: 40,
              isRequired: true
            },
            {
              id: 'q4',
              type: 'short-answer',
              title: "Success Metrics",
              description: "What 3 key metrics would you track to measure the success of your plan?",
              maxLength: 300,
              timeEstimate: 2,
              points: 10,
              isRequired: true
            }
          ],
          resources: [
            {
              title: "Company Metrics Dashboard",
              content: "Current performance data and user analytics",
              type: 'text'
            },
            {
              title: "User Persona Research",
              content: "Detailed user research and persona documentation",
              type: 'pdf'
            }
          ]
        };

      default:
        return {
          title: "General Assessment",
          description: "Multi-format assessment covering various skills.",
          estimatedTime: 30,
          totalPoints: 100,
          skillsAssessed: ["Problem Solving", "Communication", "Analytical Thinking"],
          questions: [],
          resources: []
        };
    }
  };

  const testData = getTestData();
  const currentQuestion = testData.questions[currentQuestionIndex];
  const completedQuestions = Object.keys(answers).length;
  const progress = (completedQuestions / testData.questions.length) * 100;

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && currentStep === 'test') {
      interval = setInterval(() => {
        setTimeElapsed(timeElapsed => timeElapsed + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, currentStep]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartTest = () => {
    setCurrentStep('test');
    setIsActive(true);
    showToast({
      type: 'success',
      title: 'Test started',
      message: 'Good luck! Remember to save your progress regularly.',
      duration: 3000
    });
  };

  const handleAnswerChange = (questionId: string, value: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleMarkQuestion = (questionId: string) => {
    const newMarked = new Set(markedQuestions);
    if (newMarked.has(questionId)) {
      newMarked.delete(questionId);
    } else {
      newMarked.add(questionId);
    }
    setMarkedQuestions(newMarked);
  };

  const handleSaveProgress = () => {
    showToast({
      type: 'success',
      title: 'Progress saved',
      message: 'Your answers have been automatically saved.',
      duration: 2000
    });
  };

  const handleSubmitTest = () => {
    setIsActive(false);
    setCurrentStep('submitted');
    showToast({
      type: 'success',
      title: 'Test submitted',
      message: 'Thank you! We\'ll review your responses and get back to you soon.',
      duration: 4000
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < testData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const renderQuestionInput = (question: Question) => {
    const answer = answers[question.id] || '';

    switch (question.type) {
      case 'multiple-choice':
        return (
          <RadioGroup 
            value={answer} 
            onValueChange={(value) => handleAnswerChange(question.id, value)}
            className="space-y-3"
          >
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case 'short-answer':
        return (
          <div className="space-y-2">
            <Input
              value={answer}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              placeholder={question.placeholder || "Type your answer..."}
              maxLength={question.maxLength}
            />
            {question.maxLength && (
              <div className="text-xs text-muted-foreground text-right">
                {answer.length}/{question.maxLength} characters
              </div>
            )}
          </div>
        );

      case 'long-answer':
        return (
          <div className="space-y-2">
            <Textarea
              value={answer}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              placeholder={question.placeholder || "Type your detailed answer..."}
              className="min-h-32"
              maxLength={question.maxLength}
            />
            {question.maxLength && (
              <div className="text-xs text-muted-foreground text-right">
                {answer.length}/{question.maxLength} characters
              </div>
            )}
          </div>
        );

      case 'code':
        return (
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">{question.language}</Badge>
              <span className="text-xs text-muted-foreground">Use proper formatting and comments</span>
            </div>
            <Textarea
              value={answer}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              placeholder={question.placeholder}
              className="min-h-64 font-mono text-sm"
            />
          </div>
        );

      case 'file-upload':
        return (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground mb-2">Upload your file</p>
            <Button variant="outline" size="sm">
              Choose File
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  // Overview Screen
  if (currentStep === 'overview') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50/30 to-green-50/30">
        <div className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Button variant="ghost" size="sm" onClick={onBack} className="mr-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-blue-600 to-green-600 w-8 h-8 rounded-lg flex items-center justify-center">
                    <Brain className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-semibold">Assessment Portal</h1>
                    <p className="text-sm text-muted-foreground">{companyName}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="mb-8">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold mb-3">{testData.title}</h2>
              <p className="text-lg text-muted-foreground mb-6">
                {testData.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="bg-blue-100 p-3 rounded-lg inline-flex items-center justify-center mb-2">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="font-semibold">{testData.estimatedTime} minutes</div>
                  <div className="text-sm text-muted-foreground">Estimated Time</div>
                </div>
                
                <div className="text-center">
                  <div className="bg-green-100 p-3 rounded-lg inline-flex items-center justify-center mb-2">
                    <Target className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="font-semibold">{testData.questions.length} Questions</div>
                  <div className="text-sm text-muted-foreground">Total Questions</div>
                </div>
                
                <div className="text-center">
                  <div className="bg-purple-100 p-3 rounded-lg inline-flex items-center justify-center mb-2">
                    <Award className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="font-semibold">{testData.totalPoints} Points</div>
                  <div className="text-sm text-muted-foreground">Total Points</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Skills Being Assessed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {testData.skillsAssessed.map((skill, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{skill}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Available Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {testData.resources?.map((resource, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">{resource.title}</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Important Instructions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <div className="font-medium">Auto-Save Enabled</div>
                  <div className="text-sm text-muted-foreground">Your progress is automatically saved every few seconds</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Timer className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <div className="font-medium">Time Tracking</div>
                  <div className="text-sm text-muted-foreground">The timer starts when you begin and tracks your total time</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <div className="font-medium">Ask for Help</div>
                  <div className="text-sm text-muted-foreground">Use the "Need Help?" button if you get stuck on any question</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button 
              size="lg" 
              className="px-8"
              onClick={handleStartTest}
            >
              <Play className="h-5 w-5 mr-2" />
              Start Assessment
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              Ready when you are. Take your time and do your best!
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Test Interface
  if (currentStep === 'test') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50/30 to-green-50/30">
        {/* Header with progress */}
        <div className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="bg-gradient-to-r from-blue-600 to-green-600 w-8 h-8 rounded-lg flex items-center justify-center">
                    <Brain className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-semibold">{testData.title}</span>
                </div>
                <Separator orientation="vertical" className="h-6" />
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{formatTime(timeElapsed)}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-sm text-muted-foreground">
                  Question {currentQuestionIndex + 1} of {testData.questions.length}
                </div>
                <Button variant="outline" size="sm" onClick={handleSaveProgress}>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
            </div>
            
            <div className="pb-2">
              <Progress value={progress} className="h-2" />
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Question Area */}
            <div className="lg:col-span-3 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2 mb-2">
                        <span>Question {currentQuestionIndex + 1}</span>
                        {currentQuestion.isRequired && (
                          <Badge variant="destructive" className="text-xs">Required</Badge>
                        )}
                        <Badge variant="outline" className="text-xs">
                          {currentQuestion.points} pts
                        </Badge>
                      </CardTitle>
                      <h3 className="text-lg font-semibold mb-2">{currentQuestion.title}</h3>
                      <p className="text-muted-foreground">{currentQuestion.description}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleMarkQuestion(currentQuestion.id)}
                      className={markedQuestions.has(currentQuestion.id) ? 'text-yellow-600' : ''}
                    >
                      <Flag className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {renderQuestionInput(currentQuestion)}
                  
                  <div className="flex items-center justify-between pt-4">
                    <Button
                      variant="outline"
                      onClick={handlePrevQuestion}
                      disabled={currentQuestionIndex === 0}
                    >
                      Previous
                    </Button>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Lightbulb className="h-4 w-4 mr-2" />
                        Need Help?
                      </Button>
                    </div>
                    
                    {currentQuestionIndex === testData.questions.length - 1 ? (
                      <Button onClick={handleSubmitTest} className="bg-green-600 hover:bg-green-700">
                        <Send className="h-4 w-4 mr-2" />
                        Submit Test
                      </Button>
                    ) : (
                      <Button onClick={handleNextQuestion}>
                        Next
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Question Navigator */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-2">
                    {testData.questions.map((question, index) => {
                      const isAnswered = answers[question.id];
                      const isMarked = markedQuestions.has(question.id);
                      const isCurrent = index === currentQuestionIndex;
                      
                      return (
                        <button
                          key={question.id}
                          onClick={() => setCurrentQuestionIndex(index)}
                          className={`
                            w-10 h-10 rounded-lg border-2 text-sm font-medium transition-all
                            ${isCurrent 
                              ? 'border-blue-500 bg-blue-50 text-blue-700' 
                              : isAnswered
                                ? 'border-green-500 bg-green-50 text-green-700'
                                : 'border-gray-300 hover:border-gray-400'
                            }
                            ${isMarked ? 'ring-2 ring-yellow-300' : ''}
                          `}
                        >
                          {index + 1}
                        </button>
                      );
                    })}
                  </div>
                  
                  <div className="mt-4 space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-50 border border-green-500 rounded"></div>
                      <span>Answered</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-50 border border-blue-500 rounded"></div>
                      <span>Current</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-white border border-gray-300 rounded ring-1 ring-yellow-300"></div>
                      <span>Marked</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Resources */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Resources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {testData.resources?.map((resource, index) => (
                    <Button key={index} variant="ghost" size="sm" className="w-full justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      {resource.title}
                    </Button>
                  ))}
                </CardContent>
              </Card>

              {/* Notes */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Take notes here..."
                    className="min-h-24 text-sm"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Submission Success Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/30 to-blue-50/30">
      <div className="border-b border-border/50 backdrop-blur-sm bg-background/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 w-8 h-8 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-xl font-semibold">Assessment Completed</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="text-center">
          <CardContent className="p-12">
            <div className="w-20 h-20 bg-gradient-to-r from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            
            <h2 className="text-3xl font-bold mb-4">Thank You for Completing the Assessment!</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Your responses have been submitted successfully. We'll review your work and get back to you within 2-3 business days.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <Clock className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <div className="font-semibold">{formatTime(timeElapsed)}</div>
                <div className="text-sm text-muted-foreground">Time Taken</div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <Target className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <div className="font-semibold">{completedQuestions}/{testData.questions.length}</div>
                <div className="text-sm text-muted-foreground">Questions Answered</div>
              </div>
              
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <Award className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                <div className="font-semibold">{Math.round(progress)}%</div>
                <div className="text-sm text-muted-foreground">Completion Rate</div>
              </div>
            </div>
            
            <Alert className="mb-6">
              <Coffee className="h-4 w-4" />
              <AlertDescription>
                <strong>What's next?</strong> Our team will review your responses along with your application. 
                You'll receive feedback regardless of the outcome. In the meantime, feel free to continue exploring other opportunities!
              </AlertDescription>
            </Alert>
            
            <div className="flex justify-center gap-4">
              <Button onClick={onBack}>
                Return to Dashboard
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download Certificate
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}