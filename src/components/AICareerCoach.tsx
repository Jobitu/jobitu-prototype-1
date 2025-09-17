import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ScrollArea } from "./ui/scroll-area";
import { 
  ArrowLeft,
  Send,
  Mic,
  Lightbulb,
  Target,
  MessageCircle,
  Brain,
  TrendingUp,
  FileText,
  Users,
  Zap,
  Clock,
  CheckCircle,
  BookOpen,
  Compass,
  Sparkles
} from "lucide-react";
import { OnboardingData } from "./OnboardingFlow";

interface AICareerCoachProps {
  userData: OnboardingData;
  onBack: () => void;
}

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'text' | 'suggestion' | 'insight';
}

interface CoachingTopic {
  id: string;
  title: string;
  icon: any;
  description: string;
  questions: string[];
}

export function AICareerCoach({ userData, onBack }: AICareerCoachProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: `Hi ${userData.basicInfo.fullName.split(' ')[0]}! 👋 I'm Jobi, your AI Career Coach. I'm here to help you navigate your career journey, prepare for interviews, and achieve your professional goals. What would you like to work on today?`,
      sender: 'ai',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  
  const [currentMessage, setCurrentMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [mood, setMood] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("chat");

  const coachingTopics: CoachingTopic[] = [
    {
      id: "direction",
      title: "Career Direction",
      icon: Compass,
      description: "Explore career paths and find your direction",
      questions: [
        "What career path should I pursue?",
        "How do I transition to a new industry?",
        "What roles match my personality?",
        "Should I specialize or stay generalist?"
      ]
    },
    {
      id: "resume",
      title: "Resume Feedback",
      icon: FileText,
      description: "Get insights on your resume and profile",
      questions: [
        "How can I improve my resume?",
        "What skills should I highlight?",
        "How do I explain career gaps?",
        "Should I include this experience?"
      ]
    },
    {
      id: "interview",
      title: "Interview Prep",
      icon: Users,
      description: "Practice and prepare for interviews",
      questions: [
        "How do I answer 'tell me about yourself'?",
        "What are good questions to ask interviewers?",
        "How do I negotiate salary?",
        "How do I handle behavioral questions?"
      ]
    },
    {
      id: "discovery",
      title: "Self-Discovery",
      icon: Brain,
      description: "Understand your strengths and preferences",
      questions: [
        "What are my key strengths?",
        "What motivates me at work?",
        "What type of work environment suits me?",
        "How do I find my passion?"
      ]
    }
  ];

  const suggestedPrompts = [
    "How do I transition into a new industry?",
    "What job titles suit my personality?",
    "Can you help rewrite my resume summary?",
    "How do I talk about a job gap in interviews?",
    "What skills should I develop next?",
    "How do I negotiate a better salary?"
  ];

  const moodOptions = [
    { emoji: "😟", label: "Overwhelmed", value: "overwhelmed" },
    { emoji: "😐", label: "Uncertain", value: "uncertain" },
    { emoji: "🙂", label: "Optimistic", value: "optimistic" },
    { emoji: "😄", label: "Confident", value: "confident" }
  ];

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      content,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        content: generateAIResponse(content),
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const generateAIResponse = (userMessage: string): string => {
    // Simple response generation based on keywords
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('resume') || lowerMessage.includes('cv')) {
      return `Great question about resumes! Based on your profile, I can see you have strong skills in ${userData.skills.hardSkills.slice(0, 2).join(' and ')}. Here are some specific suggestions for your resume:\n\n• Lead with your strongest technical skills\n• Quantify your achievements where possible\n• Tailor your summary to match target roles\n• Consider adding more soft skills to show leadership potential\n\nWould you like me to help you rewrite any specific section?`;
    }
    
    if (lowerMessage.includes('interview')) {
      return `Interview preparation is crucial! Let me help you get ready. For someone with your background in ${userData.workExperience[0]?.role || 'your field'}, here's what I recommend:\n\n• Practice the STAR method for behavioral questions\n• Prepare specific examples from your experience\n• Research the company's values and culture\n• Have thoughtful questions ready about the role\n\nShall we do a mock interview session?`;
    }
    
    if (lowerMessage.includes('career') && lowerMessage.includes('change')) {
      return `Career transitions can be exciting! Given your experience and interests in ${userData.careerPreferences.interestedRoles.slice(0, 2).join(' and ')}, here's a strategic approach:\n\n• Identify transferable skills from your current role\n• Network with professionals in your target industry\n• Consider taking relevant courses or certifications\n• Start with informational interviews\n\nWhat specific industry or role are you considering?`;
    }
    
    return `That's a thoughtful question! Based on your profile and career goals, I think there are several approaches we could explore. Your background in ${userData.skills.hardSkills[0] || 'your field'} gives you a strong foundation.\n\nCould you tell me more about what specific aspect you'd like to focus on? I'm here to provide personalized guidance based on your unique situation.`;
  };

  const handleQuickQuestion = (question: string) => {
    sendMessage(question);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 to-purple-50/30">
      {/* Header */}
      <div className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" onClick={onBack} className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-8 h-8 rounded-lg flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold">AI Career Coach</h1>
                  <p className="text-sm text-muted-foreground">Your personal career mentor</p>
                </div>
              </div>
            </div>
            
            {/* Mood Check-in */}
            <div className="hidden md:flex items-center gap-2">
              <span className="text-sm text-muted-foreground">How are you feeling today?</span>
              <div className="flex gap-1">
                {moodOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => setMood(option.value)}
                    className={`p-2 rounded-lg transition-colors ${
                      mood === option.value 
                        ? 'bg-blue-100 border-2 border-blue-300' 
                        : 'hover:bg-muted'
                    }`}
                    title={option.label}
                  >
                    <span className="text-lg">{option.emoji}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="/jobi-avatar.png" />
                    <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                      J
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">Jobi - AI Career Coach</h3>
                    <p className="text-sm text-muted-foreground">
                      {isTyping ? "Typing..." : "Online"}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col">
                {/* Chat Messages */}
                <ScrollArea className="flex-1 pr-4 mb-4">
                  <div className="space-y-4">
                    {messages.map(message => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-4 ${
                            message.sender === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          <p className="whitespace-pre-line">{message.content}</p>
                          <p className="text-xs opacity-70 mt-2">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    ))}
                    
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-muted rounded-lg p-4">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100"></div>
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200"></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                {/* Quick Suggestions */}
                {messages.length <= 1 && (
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground mb-3">Try asking:</p>
                    <div className="flex flex-wrap gap-2">
                      {suggestedPrompts.slice(0, 3).map(prompt => (
                        <Button
                          key={prompt}
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuickQuestion(prompt)}
                          className="text-xs"
                        >
                          {prompt}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input Area */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask Jobi anything about your career..."
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage(currentMessage);
                      }
                    }}
                    className="flex-1"
                  />
                  <Button
                    onClick={() => sendMessage(currentMessage)}
                    disabled={!currentMessage.trim() || isTyping}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Mic className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Guidance Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="chat">Guidance</TabsTrigger>
                <TabsTrigger value="progress">Progress</TabsTrigger>
              </TabsList>
              
              <TabsContent value="chat" className="space-y-4">
                {coachingTopics.map(topic => {
                  const Icon = topic.icon;
                  return (
                    <Card key={topic.id}>
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-sm">
                          <Icon className="h-4 w-4" />
                          {topic.title}
                        </CardTitle>
                        <p className="text-xs text-muted-foreground">
                          {topic.description}
                        </p>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {topic.questions.slice(0, 2).map(question => (
                          <Button
                            key={question}
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start text-xs h-auto p-2 text-left"
                            onClick={() => handleQuickQuestion(question)}
                          >
                            {question}
                          </Button>
                        ))}
                      </CardContent>
                    </Card>
                  );
                })}
              </TabsContent>
              
              <TabsContent value="progress" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Career Journey</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3 p-2 bg-green-50 rounded-lg border border-green-200">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Profile Complete</p>
                        <p className="text-xs text-muted-foreground">Yesterday</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg border border-blue-200">
                      <MessageCircle className="h-4 w-4 text-blue-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">First AI Coaching</p>
                        <p className="text-xs text-muted-foreground">Just now</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-2 bg-muted/50 rounded-lg border border-muted-foreground/20">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-muted-foreground">Interview Practice</p>
                        <p className="text-xs text-muted-foreground">Coming up</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">AI Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                        <h4 className="font-medium text-sm text-purple-900 mb-1">
                          Personality Match
                        </h4>
                        <p className="text-xs text-purple-800">
                          You may thrive in collaborative, innovation-focused roles
                        </p>
                      </div>
                      
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                        <h4 className="font-medium text-sm text-orange-900 mb-1">
                          Growth Area
                        </h4>
                        <p className="text-xs text-orange-800">
                          Consider developing leadership and mentoring skills
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}