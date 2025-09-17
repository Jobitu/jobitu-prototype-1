import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  ArrowLeft,
  Star,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Target,
  TrendingUp,
  Brain,
  Users,
  Zap,
  BookOpen,
  Award,
  Clock,
  Building,
  Globe,
  Heart,
  Share2
} from "lucide-react";
import { OnboardingData } from "./OnboardingFlow";

interface SemanticFitDashboardProps {
  jobId: number;
  userData: OnboardingData;
  onBack: () => void;
  onApply: () => void;
}

interface SkillMatch {
  skill: string;
  userLevel: number;
  requiredLevel: number;
  isMatch: boolean;
  importance: "high" | "medium" | "low";
}

interface SemanticAnalysis {
  overallScore: number;
  skillsMatch: {
    score: number;
    strengths: SkillMatch[];
    gaps: SkillMatch[];
  };
  cultureMatch: {
    score: number;
    alignments: string[];
    considerations: string[];
  };
  experienceMatch: {
    score: number;
    relevantExperience: string[];
    transferableSkills: string[];
    experienceGap: string[];
  };
  personalityMatch: {
    score: number;
    traits: { trait: string; match: boolean; description: string }[];
  };
  careerFit: {
    score: number;
    goalAlignment: string[];
    growthOpportunities: string[];
  };
  improvements: {
    shortTerm: { action: string; impact: string; timeframe: string }[];
    longTerm: { action: string; impact: string; timeframe: string }[];
  };
}

const mockSemanticAnalysis: SemanticAnalysis = {
  overallScore: 87,
  skillsMatch: {
    score: 85,
    strengths: [
      { skill: "React", userLevel: 9, requiredLevel: 8, isMatch: true, importance: "high" },
      { skill: "TypeScript", userLevel: 8, requiredLevel: 7, isMatch: true, importance: "high" },
      { skill: "Team Leadership", userLevel: 7, requiredLevel: 6, isMatch: true, importance: "medium" },
      { skill: "Problem Solving", userLevel: 9, requiredLevel: 8, isMatch: true, importance: "high" }
    ],
    gaps: [
      { skill: "GraphQL", userLevel: 4, requiredLevel: 7, isMatch: false, importance: "medium" },
      { skill: "System Design", userLevel: 5, requiredLevel: 8, isMatch: false, importance: "high" },
      { skill: "DevOps", userLevel: 3, requiredLevel: 6, isMatch: false, importance: "low" }
    ]
  },
  cultureMatch: {
    score: 92,
    alignments: [
      "Remote-first culture matches your preference for flexible work",
      "Innovation-focused environment aligns with your creative problem-solving style",
      "Flat hierarchy suits your collaborative leadership approach",
      "Continuous learning culture matches your growth mindset"
    ],
    considerations: [
      "Fast-paced environment may require adjustment from your current structured workflow",
      "Startup mentality might differ from enterprise experience"
    ]
  },
  experienceMatch: {
    score: 78,
    relevantExperience: [
      "3+ years in React development directly applicable",
      "Team lead experience at previous startups highly relevant",
      "Experience scaling applications matches their growth phase"
    ],
    transferableSkills: [
      "Cross-functional collaboration from previous roles",
      "Mentoring junior developers",
      "Technical architecture decisions"
    ],
    experienceGap: [
      "No direct experience with their specific tech stack (GraphQL + Microservices)",
      "Limited experience in financial technology domain"
    ]
  },
  personalityMatch: {
    score: 89,
    traits: [
      { trait: "Collaborative", match: true, description: "Strong fit for their team-oriented culture" },
      { trait: "Adaptable", match: true, description: "Perfect for their evolving startup environment" },
      { trait: "Growth-minded", match: true, description: "Aligns with their learning culture" },
      { trait: "Detail-oriented", match: false, description: "They prefer big-picture thinking" }
    ]
  },
  careerFit: {
    score: 84,
    goalAlignment: [
      "Technical leadership opportunity matches your career goals",
      "Startup environment aligns with your entrepreneurial interests",
      "Remote work supports your work-life balance priorities"
    ],
    growthOpportunities: [
      "Lead a growing engineering team (current team: 8 developers)",
      "Shape technical architecture decisions",
      "Potential for CTO track in 2-3 years"
    ]
  },
  improvements: {
    shortTerm: [
      { 
        action: "Complete GraphQL fundamentals course", 
        impact: "Increase skills match from 85% to 92%", 
        timeframe: "2-3 weeks" 
      },
      { 
        action: "Review system design principles", 
        impact: "Address major technical gap", 
        timeframe: "1 month" 
      },
      { 
        action: "Highlight startup experience in resume", 
        impact: "Better showcase relevant background", 
        timeframe: "1 day" 
      }
    ],
    longTerm: [
      { 
        action: "Gain experience in fintech domain", 
        impact: "Increase industry relevance", 
        timeframe: "3-6 months" 
      },
      { 
        action: "Develop public speaking skills", 
        impact: "Enhance leadership presence", 
        timeframe: "6-12 months" 
      }
    ]
  }
};

export function SemanticFitDashboard({ jobId, userData, onBack, onApply }: SemanticFitDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [isBookmarked, setIsBookmarked] = useState(false);

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-yellow-600";
    return "text-orange-600";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 90) return "bg-green-100";
    if (score >= 80) return "bg-blue-100";
    if (score >= 70) return "bg-yellow-100";
    return "bg-orange-100";
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
                Back to Search
              </Button>
              <h1 className="text-xl font-semibold">Semantic Fit Analysis</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share Analysis
              </Button>
              <Button
                variant={isBookmarked ? "default" : "outline"}
                size="sm"
                onClick={() => setIsBookmarked(!isBookmarked)}
              >
                <Heart className={`h-4 w-4 mr-2 ${isBookmarked ? "fill-current" : ""}`} />
                {isBookmarked ? "Saved" : "Save"}
              </Button>
              <Button onClick={onApply}>Apply Now</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overall Score Header */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="text-center lg:text-left">
                <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-2xl ${getScoreBgColor(mockSemanticAnalysis.overallScore)}`}>
                  <Star className={`h-8 w-8 ${getScoreColor(mockSemanticAnalysis.overallScore)}`} />
                  <div>
                    <div className={`text-3xl font-bold ${getScoreColor(mockSemanticAnalysis.overallScore)}`}>
                      {mockSemanticAnalysis.overallScore}%
                    </div>
                    <div className={`text-sm font-medium ${getScoreColor(mockSemanticAnalysis.overallScore)}`}>
                      Semantic Match
                    </div>
                  </div>
                </div>
                <h2 className="text-xl font-semibold mt-4 mb-2">Senior Software Engineer</h2>
                <p className="text-muted-foreground">TechFlow Inc. • Remote • $130k - $170k</p>
              </div>

              <div className="flex-1 w-full">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{mockSemanticAnalysis.skillsMatch.score}%</div>
                    <div className="text-sm text-muted-foreground">Skills</div>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{mockSemanticAnalysis.cultureMatch.score}%</div>
                    <div className="text-sm text-muted-foreground">Culture</div>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">{mockSemanticAnalysis.experienceMatch.score}%</div>
                    <div className="text-sm text-muted-foreground">Experience</div>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{mockSemanticAnalysis.personalityMatch.score}%</div>
                    <div className="text-sm text-muted-foreground">Personality</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Analysis Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="skills">Skills Match</TabsTrigger>
            <TabsTrigger value="culture">Culture Fit</TabsTrigger>
            <TabsTrigger value="improvements">Growth Path</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Why This Match */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    Why This Match Works
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-900 mb-2">🎯 Perfect Alignment</h4>
                    <p className="text-sm text-green-800">
                      Your React/TypeScript expertise directly matches their core needs. Your startup experience 
                      and remote work preference align perfectly with their culture and growth stage.
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    {mockSemanticAnalysis.cultureMatch.alignments.slice(0, 3).map((alignment, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{alignment}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Growth Opportunities */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Growth Opportunities
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockSemanticAnalysis.careerFit.growthOpportunities.map((opportunity, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Target className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{opportunity}</span>
                    </div>
                  ))}
                  
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <h5 className="font-medium text-blue-900 mb-1">Career Trajectory</h5>
                    <p className="text-sm text-blue-800">
                      This role positions you for senior technical leadership with potential CTO track in 2-3 years.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Recommended Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {mockSemanticAnalysis.improvements.shortTerm.map((improvement, index) => (
                    <div key={index} className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <h5 className="font-medium text-yellow-900 mb-2">{improvement.action}</h5>
                      <p className="text-sm text-yellow-800 mb-2">{improvement.impact}</p>
                      <Badge variant="outline" className="text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {improvement.timeframe}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Skill Strengths */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-700">
                    <CheckCircle className="h-5 w-5" />
                    Your Strengths
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockSemanticAnalysis.skillsMatch.strengths.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{skill.skill}</span>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={skill.importance === "high" ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {skill.importance} priority
                          </Badge>
                          <span className="text-sm text-green-600 font-medium">
                            {skill.userLevel}/10
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${(skill.userLevel / 10) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">
                          Required: {skill.requiredLevel}/10
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Skill Gaps */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-700">
                    <AlertCircle className="h-5 w-5" />
                    Areas to Develop
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockSemanticAnalysis.skillsMatch.gaps.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{skill.skill}</span>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={skill.importance === "high" ? "destructive" : "secondary"}
                            className="text-xs"
                          >
                            {skill.importance} priority
                          </Badge>
                          <span className="text-sm text-orange-600 font-medium">
                            {skill.userLevel}/10
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-orange-500 h-2 rounded-full" 
                            style={{ width: `${(skill.userLevel / 10) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">
                          Need: {skill.requiredLevel}/10
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Gap: {skill.requiredLevel - skill.userLevel} levels
                      </div>
                    </div>
                  ))}
                  
                  <div className="mt-4">
                    <Button size="sm" variant="outline" className="w-full">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Get Learning Recommendations
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="culture" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Cultural Alignments */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-700">
                    <Users className="h-5 w-5" />
                    Perfect Cultural Fits
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {mockSemanticAnalysis.cultureMatch.alignments.map((alignment, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{alignment}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Personality Traits */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    Personality Match
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {mockSemanticAnalysis.personalityMatch.traits.map((trait, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {trait.match ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-orange-500" />
                        )}
                        <span className="font-medium">{trait.trait}</span>
                      </div>
                      <Badge variant={trait.match ? "default" : "secondary"} className="text-xs">
                        {trait.match ? "Strong fit" : "Consider"}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Considerations */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-yellow-700">
                    <Lightbulb className="h-5 w-5" />
                    Things to Consider
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {mockSemanticAnalysis.cultureMatch.considerations.map((consideration, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{consideration}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="improvements" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Short-term Improvements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-700">
                    <Zap className="h-5 w-5" />
                    Quick Wins (1-3 months)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockSemanticAnalysis.improvements.shortTerm.map((improvement, index) => (
                    <div key={index} className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h5 className="font-medium text-blue-900 mb-2">{improvement.action}</h5>
                      <p className="text-sm text-blue-800 mb-2">{improvement.impact}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          {improvement.timeframe}
                        </Badge>
                        <Button size="sm" variant="outline">
                          Start Learning
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Long-term Development */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-700">
                    <Award className="h-5 w-5" />
                    Long-term Growth (3-12 months)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockSemanticAnalysis.improvements.longTerm.map((improvement, index) => (
                    <div key={index} className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <h5 className="font-medium text-purple-900 mb-2">{improvement.action}</h5>
                      <p className="text-sm text-purple-800 mb-2">{improvement.impact}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          {improvement.timeframe}
                        </Badge>
                        <Button size="sm" variant="outline">
                          Plan Path
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Growth Trajectory */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Your Potential Growth Trajectory
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
                    <h4 className="font-semibold text-green-900 mb-4">Bridge to Match Analysis</h4>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">73%</div>
                        <div className="text-sm text-muted-foreground">Current Match</div>
                      </div>
                      <div className="flex-1 mx-4">
                        <div className="relative">
                          <Progress value={73} className="h-3" />
                          <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
                            <div className="bg-green-600 text-white text-xs px-2 py-1 rounded">
                              Target: 90%
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">90%</div>
                        <div className="text-sm text-muted-foreground">Potential Match</div>
                      </div>
                    </div>
                    <p className="text-sm text-green-800">
                      Complete the recommended learning path to increase your match score by 17% and position yourself as a top candidate.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}