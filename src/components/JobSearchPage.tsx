import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { Checkbox } from "./ui/checkbox";
import { 
  ArrowLeft,
  Search,
  Filter,
  Zap,
  Star,
  MapPin,
  Clock,
  Briefcase,
  Heart,
  Bookmark,
  TrendingUp,
  Target,
  Lightbulb,
  Users,
  Building,
  Globe,
  ChevronRight,
  Settings,
  BookOpen,
  Trophy,
  Brain
} from "lucide-react";
import { OnboardingData } from "./OnboardingFlow";

interface JobSearchPageProps {
  userData: OnboardingData;
  onBack: () => void;
  onViewJobDetail: (jobId: number) => void;
}

interface JobMatch {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  matchScore: number;
  salary: string;
  postedDays: number;
  companyLogo: string;
  tags: string[];
  semanticReasons: {
    skillsMatch: number;
    cultureMatch: number;
    experienceMatch: number;
    personalityMatch: number;
  };
  aiInsight: string;
  learningRequired: "low" | "medium" | "high";
  isBookmarked: boolean;
  applicationStatus: "not_started" | "in_progress" | "interviewing" | "applied";
}

const mockJobMatches: JobMatch[] = [
  {
    id: 1,
    title: "Senior Product Manager",
    company: "TechFlow Inc.",
    location: "Remote",
    type: "Full-Time",
    matchScore: 94,
    salary: "$130k - $170k",
    postedDays: 2,
    companyLogo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=50&h=50&fit=crop",
    tags: ["Strategic Thinking", "Cross-functional", "Growth Stage"],
    semanticReasons: {
      skillsMatch: 92,
      cultureMatch: 96,
      experienceMatch: 88,
      personalityMatch: 94
    },
    aiInsight: "Your strategic mindset and experience scaling products at early-stage companies aligns perfectly with their growth phase.",
    learningRequired: "low",
    isBookmarked: false,
    applicationStatus: "not_started"
  },
  {
    id: 2,
    title: "Engineering Team Lead",
    company: "InnovateLabs",
    location: "San Francisco, CA",
    type: "Full-Time",
    matchScore: 87,
    salary: "$150k - $190k",
    postedDays: 1,
    companyLogo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=50&h=50&fit=crop",
    tags: ["Technical Leadership", "Mentorship", "Innovation"],
    semanticReasons: {
      skillsMatch: 85,
      cultureMatch: 82,
      experienceMatch: 90,
      personalityMatch: 92
    },
    aiInsight: "Your technical depth combined with natural mentoring style matches their need for developer growth leadership.",
    learningRequired: "medium",
    isBookmarked: true,
    applicationStatus: "applied"
  },
  {
    id: 3,
    title: "Head of Design",
    company: "CreativeStudio",
    location: "New York, NY",
    type: "Full-Time",
    matchScore: 73,
    salary: "$120k - $160k",
    postedDays: 5,
    companyLogo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=50&h=50&fit=crop",
    tags: ["Design Systems", "Team Building", "User-Centric"],
    semanticReasons: {
      skillsMatch: 68,
      cultureMatch: 85,
      experienceMatch: 70,
      personalityMatch: 78
    },
    aiInsight: "Great cultural fit for their collaborative approach, though you'd need to develop design leadership skills.",
    learningRequired: "high",
    isBookmarked: false,
    applicationStatus: "not_started"
  }
];

export function JobSearchPage({ userData, onBack, onViewJobDetail }: JobSearchPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [smartMatch, setSmartMatch] = useState(true);
  const [showGrowthMode, setShowGrowthMode] = useState(false);
  const [minMatchScore, setMinMatchScore] = useState([70]);
  const [selectedFilters, setSelectedFilters] = useState({
    workStyle: [] as string[],
    careerGoals: [] as string[],
    behavioralTraits: [] as string[],
    learningPreference: [] as string[],
    values: [] as string[]
  });
  const [bookmarkedJobs, setBookmarkedJobs] = useState<number[]>([2]);
  const [sortBy, setSortBy] = useState("match");

  const workStyleOptions = [
    "Remote-first", "Async communication", "Cross-functional teams", 
    "Independent work", "Collaborative", "Structured environment"
  ];

  const careerGoalsOptions = [
    "Leadership growth", "Technical mastery", "Entrepreneurial", 
    "Work-life balance", "Fast career progression", "Industry expertise"
  ];

  const behavioralTraitsOptions = [
    "Creative", "Analytical", "Empathetic", "Decisive", 
    "Detail-oriented", "Big picture thinking", "Adaptable"
  ];

  const learningPreferenceOptions = [
    "Mentorship-rich", "Self-directed", "Hands-on learning", 
    "Structured training", "Peer learning", "Experimental"
  ];

  const valuesOptions = [
    "Purpose-driven", "Innovation", "Stability", "Growth", 
    "Diversity & Inclusion", "Sustainability", "Customer focus"
  ];

  const toggleBookmark = (jobId: number) => {
    setBookmarkedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const filteredJobs = mockJobMatches
    .filter(job => job.matchScore >= minMatchScore[0])
    .filter(job => showGrowthMode || job.matchScore >= 70)
    .sort((a, b) => {
      switch (sortBy) {
        case "match": return b.matchScore - a.matchScore;
        case "salary": return parseInt(b.salary.split('$')[1]) - parseInt(a.salary.split('$')[1]);
        case "recent": return a.postedDays - b.postedDays;
        default: return 0;
      }
    });

  const getMatchColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-100";
    if (score >= 80) return "text-blue-600 bg-blue-100";
    if (score >= 70) return "text-yellow-600 bg-yellow-100";
    return "text-orange-600 bg-orange-100";
  };

  const getLearningBadgeColor = (level: string) => {
    switch (level) {
      case "low": return "bg-green-100 text-green-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "high": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 to-purple-50/30">
      {/* Header */}
      <div className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" onClick={onBack} className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <h1 className="text-xl font-semibold">Smart Job Search</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Bookmark className="h-4 w-4 mr-2" />
                Saved ({bookmarkedJobs.length})
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Preferences
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Smart Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search Mode Toggle */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="smart-match">Smart Match</Label>
                    <Switch
                      id="smart-match"
                      checked={smartMatch}
                      onCheckedChange={setSmartMatch}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {smartMatch ? "AI-powered semantic matching" : "Exact keyword matching"}
                  </p>
                </div>

                <Separator />

                {/* Growth Mode */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="growth-mode">Growth Mode</Label>
                    <Switch
                      id="growth-mode"
                      checked={showGrowthMode}
                      onCheckedChange={setShowGrowthMode}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Show aspirational roles with learning paths
                  </p>
                </div>

                <Separator />

                {/* Match Score Range */}
                <div className="space-y-3">
                  <Label>Minimum Match Score: {minMatchScore[0]}%</Label>
                  <Slider
                    value={minMatchScore}
                    onValueChange={setMinMatchScore}
                    min={50}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                </div>

                <Separator />

                {/* Work Style */}
                <div className="space-y-3">
                  <Label>Work Style</Label>
                  <div className="space-y-2">
                    {workStyleOptions.slice(0, 4).map(option => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                          id={`work-${option}`}
                          checked={selectedFilters.workStyle.includes(option)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedFilters(prev => ({
                                ...prev,
                                workStyle: [...prev.workStyle, option]
                              }));
                            } else {
                              setSelectedFilters(prev => ({
                                ...prev,
                                workStyle: prev.workStyle.filter(item => item !== option)
                              }));
                            }
                          }}
                        />
                        <Label htmlFor={`work-${option}`} className="text-sm">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Values */}
                <div className="space-y-3">
                  <Label>Company Values</Label>
                  <div className="space-y-2">
                    {valuesOptions.slice(0, 4).map(option => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                          id={`values-${option}`}
                          checked={selectedFilters.values.includes(option)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedFilters(prev => ({
                                ...prev,
                                values: [...prev.values, option]
                              }));
                            } else {
                              setSelectedFilters(prev => ({
                                ...prev,
                                values: prev.values.filter(item => item !== option)
                              }));
                            }
                          }}
                        />
                        <Label htmlFor={`values-${option}`} className="text-sm">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Quick Suggestions */}
                <div className="space-y-3">
                  <Label>Suggested Searches</Label>
                  <div className="space-y-2">
                    <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                      Jobs with mentorship opportunities
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                      Remote roles with growth potential
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                      Leadership positions in tech
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search Bar */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder={smartMatch ? "Search by role, company, or describe what you want..." : "Search jobs by title or keywords..."}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="match">Best Match</SelectItem>
                      <SelectItem value="salary">Highest Salary</SelectItem>
                      <SelectItem value="recent">Most Recent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {smartMatch && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-900">AI-Powered Search</span>
                    </div>
                    <p className="text-sm text-blue-800">
                      We're matching you based on skills, personality, culture fit, and career goals - not just keywords.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Results Summary */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h2 className="font-semibold">
                      Found {filteredJobs.length} {smartMatch ? "semantic matches" : "jobs"}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Showing jobs with {minMatchScore[0]}%+ compatibility
                      {showGrowthMode && " (including growth opportunities)"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="secondary">
                      <Target className="h-3 w-3 mr-1" />
                      {filteredJobs.filter(j => j.matchScore >= 90).length} perfect matches
                    </Badge>
                    <Badge variant="outline">
                      <Lightbulb className="h-3 w-3 mr-1" />
                      {filteredJobs.filter(j => j.learningRequired === "low").length} ready now
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Job Results */}
            <div className="space-y-4">
              {filteredJobs.map(job => (
                <Card key={job.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={job.companyLogo} alt={job.company} />
                              <AvatarFallback>{job.company[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold text-lg">{job.title}</h3>
                              <p className="text-muted-foreground">{job.company}</p>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {job.location}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Briefcase className="h-3 w-3" />
                                  {job.type}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {job.postedDays}d ago
                                </div>
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleBookmark(job.id)}
                            className={bookmarkedJobs.includes(job.id) ? "text-red-600" : ""}
                          >
                            <Heart className={`h-4 w-4 ${bookmarkedJobs.includes(job.id) ? "fill-current" : ""}`} />
                          </Button>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {job.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getLearningBadgeColor(job.learningRequired)}`}
                          >
                            {job.learningRequired} learning required
                          </Badge>
                        </div>

                        <div className="text-lg font-semibold mb-3">{job.salary}</div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                          <div className="flex items-start gap-2">
                            <Brain className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <h4 className="font-medium text-blue-900 mb-1">AI Insight</h4>
                              <p className="text-sm text-blue-800">{job.aiInsight}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-4 items-center justify-between">
                          <div className="flex gap-2">
                            <Button onClick={() => onViewJobDetail(job.id)}>
                              View Details
                              <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                            <Button variant="outline" size="sm">
                              Quick Apply
                            </Button>
                          </div>
                          {job.applicationStatus !== "not_started" && (
                            <Badge variant="outline" className="text-xs">
                              {job.applicationStatus === "applied" && "Applied"}
                              {job.applicationStatus === "in_progress" && "Application in Progress"}
                              {job.applicationStatus === "interviewing" && "Interviewing"}
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Match Score Panel */}
                      <div className="lg:w-64 space-y-4">
                        <div className="text-center">
                          <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-full ${getMatchColor(job.matchScore)}`}>
                            <Star className="h-4 w-4" />
                            <span className="font-semibold">{job.matchScore}% Match</span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm">Skills Match</span>
                              <span className="text-sm font-medium">{job.semanticReasons.skillsMatch}%</span>
                            </div>
                            <Progress value={job.semanticReasons.skillsMatch} className="h-2" />
                          </div>

                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm">Culture Fit</span>
                              <span className="text-sm font-medium">{job.semanticReasons.cultureMatch}%</span>
                            </div>
                            <Progress value={job.semanticReasons.cultureMatch} className="h-2" />
                          </div>

                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm">Experience</span>
                              <span className="text-sm font-medium">{job.semanticReasons.experienceMatch}%</span>
                            </div>
                            <Progress value={job.semanticReasons.experienceMatch} className="h-2" />
                          </div>

                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm">Personality</span>
                              <span className="text-sm font-medium">{job.semanticReasons.personalityMatch}%</span>
                            </div>
                            <Progress value={job.semanticReasons.personalityMatch} className="h-2" />
                          </div>
                        </div>

                        <Button variant="ghost" size="sm" className="w-full">
                          <TrendingUp className="h-4 w-4 mr-2" />
                          View Full Breakdown
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {filteredJobs.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Target className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="font-semibold mb-2">No matches found</h3>
                  <p className="text-muted-foreground mb-6">
                    We couldn't find jobs matching your current criteria. Try adjusting your filters or enabling Growth Mode.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="outline" onClick={() => setMinMatchScore([60])}>
                      Lower Match Threshold
                    </Button>
                    <Button onClick={() => setShowGrowthMode(true)}>
                      <Lightbulb className="h-4 w-4 mr-2" />
                      Enable Growth Mode
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Growth Mode Info */}
            {showGrowthMode && (
              <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-orange-100 p-2 rounded-lg">
                      <Trophy className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-orange-900 mb-2">Growth Mode Active</h3>
                      <p className="text-orange-800 text-sm mb-4">
                        You're now seeing aspirational roles that could be within reach with some learning and development.
                        Each job shows the skills gap and learning path required.
                      </p>
                      <Button variant="outline" size="sm" className="text-orange-700 border-orange-300">
                        <BookOpen className="h-4 w-4 mr-2" />
                        View Learning Recommendations
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}