import { useState } from "react";
import { useNotifications } from "./NotificationContext";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { 
  ArrowLeft,
  Brain,
  TrendingUp,
  Target,
  Heart,
  BookOpen,
  User,
  MessageCircle,
  Search,
  Edit,
  Award,
  Lightbulb,
  CheckCircle,
  Star,
  Smile,
  Meh,
  Frown,
  ThumbsUp,
  ArrowRight,
  Zap,
  Coffee,
  Sparkles
} from "lucide-react";

interface RejectionFeedbackProps {
  onBack: () => void;
  jobTitle: string;
  companyName: string;
  rejectionReason?: string;
}

interface FeedbackScore {
  category: string;
  score: number;
  maxScore: number;
  insight: string;
  improvementTip: string;
  icon: any;
  color: string;
}

interface ImprovementSuggestion {
  title: string;
  description: string;
  actionType: 'skill' | 'experience' | 'profile' | 'learning';
  icon: any;
  priority: 'high' | 'medium' | 'low';
}

export function RejectionFeedback({ onBack, jobTitle, companyName, rejectionReason }: RejectionFeedbackProps) {
  const { showToast } = useNotifications();
  const [selectedMood, setSelectedMood] = useState<'happy' | 'neutral' | 'sad' | null>(null);
  const [showDetailedInsights, setShowDetailedInsights] = useState(false);

  const feedbackScores: FeedbackScore[] = [
    {
      category: "Skill Match",
      score: 7,
      maxScore: 10,
      insight: "Your technical skills align well with most requirements",
      improvementTip: "Consider gaining experience in system design and cloud platforms",
      icon: Target,
      color: "text-blue-600"
    },
    {
      category: "Experience Level",
      score: 5,
      maxScore: 10,
      insight: "Looking for someone with more senior-level experience",
      improvementTip: "Highlight leadership experiences and complex project ownership",
      icon: TrendingUp,
      color: "text-orange-600"
    },
    {
      category: "Culture Fit",
      score: 8,
      maxScore: 10,
      insight: "Your values and working style match our team culture well",
      improvementTip: "Continue showcasing collaborative examples in interviews",
      icon: Heart,
      color: "text-green-600"
    },
    {
      category: "Communication",
      score: 6,
      maxScore: 10,
      insight: "Clear communication, could be more confident in technical discussions",
      improvementTip: "Practice explaining technical concepts to non-technical audiences",
      icon: MessageCircle,
      color: "text-purple-600"
    }
  ];

  const improvementSuggestions: ImprovementSuggestion[] = [
    {
      title: "Gain System Design Experience",
      description: "83% of senior roles require system design knowledge. This is your biggest opportunity area.",
      actionType: 'learning',
      icon: Brain,
      priority: 'high'
    },
    {
      title: "Add Leadership Examples",
      description: "Showcase 2-3 examples of leading projects or mentoring team members in your profile.",
      actionType: 'profile',
      icon: User,
      priority: 'high'
    },
    {
      title: "Practice Technical Communication",
      description: "Join tech talks or practice explaining complex concepts clearly and confidently.",
      actionType: 'skill',
      icon: MessageCircle,
      priority: 'medium'
    },
    {
      title: "Consider AWS Certification",
      description: "Cloud platform knowledge was mentioned as valuable for this role type.",
      actionType: 'learning',
      icon: Award,
      priority: 'medium'
    }
  ];

  const handleMoodSelection = (mood: 'happy' | 'neutral' | 'sad') => {
    setSelectedMood(mood);
    
    const moodMessages = {
      happy: "Great attitude! That resilience will serve you well in your career journey.",
      neutral: "It's totally normal to feel this way. Every 'no' gets you closer to the right 'yes'.",
      sad: "We understand this is disappointing. Remember, this is about fit, not your worth as a professional."
    };

    showToast({
      type: 'info',
      title: 'Thanks for sharing',
      message: moodMessages[mood],
      duration: 4000
    });
  };

  const handleActionClick = (action: string) => {
    switch (action) {
      case 'findSimilar':
        showToast({
          type: 'success',
          title: 'Finding matches',
          message: 'We found 8 similar roles that might be a great fit!',
          duration: 3000
        });
        break;
      case 'askCoach':
        showToast({
          type: 'info',
          title: 'AI Coach activated',
          message: 'Your AI career coach is ready to help with interview preparation.',
          duration: 3000
        });
        break;
      case 'editProfile':
        showToast({
          type: 'info',
          title: 'Profile editor',
          message: 'Profile editing would open here.',
          duration: 3000
        });
        break;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const overallScore = Math.round(feedbackScores.reduce((sum, score) => sum + score.score, 0) / feedbackScores.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/30 to-pink-50/30">
      {/* Header */}
      <div className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" onClick={onBack} className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-8 h-8 rounded-lg flex items-center justify-center">
                  <Heart className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold">Application Feedback</h1>
                  <p className="text-sm text-muted-foreground">Personalized insights for growth</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Headline */}
        <Card className="mb-8 border-0 bg-gradient-to-r from-purple-100 to-pink-100">
          <CardContent className="p-8 text-center">
            <div className="flex justify-center items-center gap-3 mb-4">
              <span className="text-4xl">🌱</span>
              <Sparkles className="h-8 w-8 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold mb-3 text-gray-900">
              This one didn't work out – but here's what we learned together
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              Your application for <span className="font-semibold">{jobTitle}</span> at <span className="font-semibold">{companyName}</span> has been reviewed
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border-2 border-purple-200">
                  <Brain className="h-6 w-6 text-purple-600" />
                </div>
                <span>AI-Powered Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border-2 border-pink-200">
                  <TrendingUp className="h-6 w-6 text-pink-600" />
                </div>
                <span>Growth Focused</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Overall Score */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Overall Match Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-3xl font-bold text-purple-600">{overallScore}/10</div>
                <div className="text-sm text-muted-foreground">Overall Match Score</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold">Good Foundation</div>
                <div className="text-sm text-muted-foreground">Strong potential with some areas to develop</div>
              </div>
            </div>
            <Progress value={overallScore * 10} className="h-3 mb-4" />
            <p className="text-sm text-muted-foreground">
              {rejectionReason || "Based on your profile and interview, you showed strong technical skills but we're looking for someone with more senior-level experience for this particular role."}
            </p>
          </CardContent>
        </Card>

        {/* AI-Powered Feedback Breakdown */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Detailed Feedback Breakdown
            </CardTitle>
            <div className="flex items-center gap-2 mt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDetailedInsights(!showDetailedInsights)}
              >
                {showDetailedInsights ? 'Hide' : 'Show'} Detailed Insights
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {feedbackScores.map((feedback, index) => {
              const Icon = feedback.icon;
              return (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-gray-100`}>
                        <Icon className={`h-5 w-5 ${feedback.color}`} />
                      </div>
                      <div>
                        <h4 className="font-medium">{feedback.category}</h4>
                        <p className="text-sm text-muted-foreground">{feedback.insight}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">{feedback.score}/{feedback.maxScore}</div>
                    </div>
                  </div>
                  <Progress value={(feedback.score / feedback.maxScore) * 100} className="h-2" />
                  {showDetailedInsights && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 ml-11">
                      <p className="text-sm text-blue-800">
                        <Lightbulb className="h-4 w-4 inline mr-2" />
                        <strong>Improvement tip:</strong> {feedback.improvementTip}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Improvement Suggestions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Personalized Improvement Plan
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              To boost your fit for similar roles, focus on these areas:
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {improvementSuggestions.map((suggestion, index) => {
              const Icon = suggestion.icon;
              return (
                <div key={index} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-3 rounded-lg">
                    <Icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium">{suggestion.title}</h4>
                      <Badge className={getPriorityColor(suggestion.priority)}>
                        {suggestion.priority} priority
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {suggestion.description}
                    </p>
                    <Button size="sm" variant="outline">
                      Get Started
                    </Button>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Emotional Support Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coffee className="h-5 w-5" />
              How are you feeling today?
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Your feedback helps us provide better support and resources
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center gap-6 mb-6">
              <button
                onClick={() => handleMoodSelection('happy')}
                className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                  selectedMood === 'happy' 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <Smile className="h-8 w-8 text-green-600" />
                <span className="text-sm font-medium">Optimistic</span>
              </button>
              <button
                onClick={() => handleMoodSelection('neutral')}
                className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                  selectedMood === 'neutral' 
                    ? 'border-yellow-500 bg-yellow-50' 
                    : 'border-gray-200 hover:border-yellow-300'
                }`}
              >
                <Meh className="h-8 w-8 text-yellow-600" />
                <span className="text-sm font-medium">Neutral</span>
              </button>
              <button
                onClick={() => handleMoodSelection('sad')}
                className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                  selectedMood === 'sad' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <Frown className="h-8 w-8 text-blue-600" />
                <span className="text-sm font-medium">Disappointed</span>
              </button>
            </div>

            {selectedMood && (
              <div className="text-center">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
                  <ThumbsUp className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm text-purple-800">
                    Would you like to speak with our AI Career Coach for personalized guidance and motivation?
                  </p>
                  <Button 
                    size="sm" 
                    className="mt-3"
                    onClick={() => handleActionClick('askCoach')}
                  >
                    Talk to AI Coach
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Next Steps Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowRight className="h-5 w-5" />
              Your Next Steps
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Ready to keep moving forward? Here's what you can do right now:
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                className="h-20 flex flex-col items-center justify-center gap-2"
                onClick={() => handleActionClick('findSimilar')}
              >
                <Search className="h-6 w-6" />
                <span>Find Similar Roles</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-20 flex flex-col items-center justify-center gap-2"
                onClick={() => handleActionClick('askCoach')}
              >
                <Brain className="h-6 w-6" />
                <span>Ask AI Coach for Help</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-20 flex flex-col items-center justify-center gap-2"
                onClick={() => handleActionClick('editProfile')}
              >
                <Edit className="h-6 w-6" />
                <span>Enhance My Profile</span>
              </Button>
            </div>

            <Separator className="my-6" />

            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4 text-center">
              <Star className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <h4 className="font-medium mb-2">Remember</h4>
              <p className="text-sm text-muted-foreground">
                Every application is a learning opportunity. You're building valuable experience and getting closer to the right fit. 
                <span className="font-medium text-green-700"> Keep going – your next opportunity is out there!</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}