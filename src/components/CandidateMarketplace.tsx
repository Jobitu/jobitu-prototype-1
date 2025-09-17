import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ScrollArea } from "./ui/scroll-area";
import { 
  ArrowLeft,
  Search,
  Filter,
  Star,
  MapPin,
  Clock,
  Briefcase,
  Heart,
  MessageCircle,
  UserPlus,
  Bookmark,
  Eye,
  ChevronRight,
  Brain,
  Zap,
  Target,
  Globe,
  Award,
  GraduationCap,
  Code,
  Users,
  Calendar,
  ExternalLink,
  Github,
  Linkedin,
  FileText,
  Video,
  Download,
  Share2,
  BookOpen,
  TrendingUp,
  Settings
} from "lucide-react";

interface CandidateMarketplaceProps {
  onBack: () => void;
}

interface Candidate {
  id: number;
  name: string;
  title: string;
  location: string;
  avatar: string;
  skills: string[];
  experience: string;
  education: string;
  availability: string;
  matchScore: number;
  isBookmarked: boolean;
  lastActive: string;
  portfolio?: string;
  github?: string;
  linkedin?: string;
  bio: string;
  workHistory: {
    role: string;
    company: string;
    duration: string;
  }[];
  languages: string[];
  certifications: string[];
  aiHighlights: string[];
  salaryRange: string;
  remotePreference: string;
}

const mockCandidates: Candidate[] = [
  {
    id: 1,
    name: "Sarah Chen",
    title: "Senior React Developer",
    location: "San Francisco, CA",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop",
    skills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS"],
    experience: "5+ years",
    education: "Stanford University - CS",
    availability: "Available immediately",
    matchScore: 94,
    isBookmarked: false,
    lastActive: "2 hours ago",
    portfolio: "sarahchen.dev",
    github: "sarah-chen",
    linkedin: "sarah-chen-dev",
    bio: "Passionate full-stack developer with expertise in building scalable React applications. Love working with startups and creating user-centric solutions.",
    workHistory: [
      { role: "Senior Frontend Developer", company: "Stripe", duration: "2022-2024" },
      { role: "Frontend Developer", company: "Airbnb", duration: "2020-2022" },
      { role: "Junior Developer", company: "Startup Inc", duration: "2019-2020" }
    ],
    languages: ["English", "Mandarin"],
    certifications: ["AWS Certified", "React Advanced"],
    aiHighlights: ["Top 5% in React skills", "Excellent remote collaboration", "Fast learner"],
    salaryRange: "$130k - $160k",
    remotePreference: "Remote only"
  },
  {
    id: 2,
    name: "Marcus Johnson",
    title: "Full Stack Engineer",
    location: "New York, NY",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    skills: ["Python", "Django", "React", "PostgreSQL", "Docker"],
    experience: "4+ years",
    education: "MIT - Computer Science",
    availability: "Available in 2 weeks",
    matchScore: 87,
    isBookmarked: true,
    lastActive: "1 day ago",
    github: "marcus-dev",
    linkedin: "marcus-johnson-eng",
    bio: "Backend-focused engineer with strong frontend skills. Experienced in building high-performance APIs and data systems.",
    workHistory: [
      { role: "Full Stack Engineer", company: "Uber", duration: "2021-2024" },
      { role: "Backend Developer", company: "Spotify", duration: "2020-2021" }
    ],
    languages: ["English", "Spanish"],
    certifications: ["Google Cloud Professional"],
    aiHighlights: ["Strong system design skills", "Great mentor", "API architecture expert"],
    salaryRange: "$120k - $150k",
    remotePreference: "Hybrid preferred"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    title: "UX Engineer",
    location: "Austin, TX",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    skills: ["Figma", "React", "CSS", "Design Systems", "User Research"],
    experience: "3+ years",
    education: "UT Austin - Design",
    availability: "Open to opportunities",
    matchScore: 81,
    isBookmarked: false,
    lastActive: "3 hours ago",
    portfolio: "emilyux.com",
    linkedin: "emily-rodriguez-ux",
    bio: "UX Engineer bridging design and development. Passionate about creating accessible and beautiful user interfaces.",
    workHistory: [
      { role: "UX Engineer", company: "Adobe", duration: "2022-2024" },
      { role: "Frontend Developer", company: "Shopify", duration: "2021-2022" }
    ],
    languages: ["English", "Spanish"],
    certifications: ["Google UX Certificate"],
    aiHighlights: ["Design-dev collaboration", "Accessibility expert", "Component library specialist"],
    salaryRange: "$100k - $130k",
    remotePreference: "Flexible"
  },
  {
    id: 4,
    name: "David Kim",
    title: "DevOps Engineer",
    location: "Seattle, WA",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    skills: ["Kubernetes", "AWS", "Terraform", "Python", "CI/CD"],
    experience: "6+ years",
    education: "University of Washington - CS",
    availability: "Available immediately",
    matchScore: 89,
    isBookmarked: false,
    lastActive: "5 hours ago",
    github: "david-kim-devops",
    linkedin: "david-kim-devops",
    bio: "DevOps engineer specialized in cloud infrastructure and automation. Love building scalable systems and improving developer experience.",
    workHistory: [
      { role: "Senior DevOps Engineer", company: "Microsoft", duration: "2020-2024" },
      { role: "Cloud Engineer", company: "Amazon", duration: "2018-2020" }
    ],
    languages: ["English", "Korean"],
    certifications: ["AWS Solutions Architect", "Kubernetes Certified"],
    aiHighlights: ["Infrastructure automation expert", "Cost optimization specialist", "Security-focused"],
    salaryRange: "$140k - $170k",
    remotePreference: "Remote preferred"
  }
];

export function CandidateMarketplace({ onBack }: CandidateMarketplaceProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [activeTab, setActiveTab] = useState("discover");
  const [showActiveOnly, setShowActiveOnly] = useState(false);
  const [bookmarkedCandidates, setBookmarkedCandidates] = useState<number[]>([2]);
  const [selectedFilters, setSelectedFilters] = useState({
    location: "",
    availability: "",
    experience: "",
    skills: [] as string[],
    remotePreference: ""
  });

  const filteredCandidates = mockCandidates.filter(candidate => {
    if (activeTab === "saved") {
      return bookmarkedCandidates.includes(candidate.id);
    }
    
    let matches = true;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      matches = matches && (
        candidate.name.toLowerCase().includes(query) ||
        candidate.title.toLowerCase().includes(query) ||
        candidate.skills.some(skill => skill.toLowerCase().includes(query)) ||
        candidate.bio.toLowerCase().includes(query)
      );
    }
    
    if (showActiveOnly) {
      matches = matches && candidate.lastActive.includes("hours");
    }
    
    if (selectedFilters.availability && selectedFilters.availability !== "all") {
      matches = matches && candidate.availability.toLowerCase().includes(selectedFilters.availability.toLowerCase());
    }
    
    if (selectedFilters.experience && selectedFilters.experience !== "all") {
      const expYears = parseInt(selectedFilters.experience);
      const candidateExp = parseInt(candidate.experience);
      matches = matches && candidateExp >= expYears;
    }
    
    return matches;
  });

  const toggleBookmark = (candidateId: number) => {
    setBookmarkedCandidates(prev => 
      prev.includes(candidateId) 
        ? prev.filter(id => id !== candidateId)
        : [...prev, candidateId]
    );
  };

  const skillOptions = ["React", "TypeScript", "Python", "Node.js", "AWS", "Docker", "Kubernetes", "GraphQL", "PostgreSQL", "Figma"];
  const locationOptions = ["San Francisco, CA", "New York, NY", "Austin, TX", "Seattle, WA", "Remote", "Los Angeles, CA"];

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
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 w-8 h-8 rounded-lg flex items-center justify-center">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold">Talent Marketplace</h1>
                  <p className="text-sm text-muted-foreground">Discover top candidates</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Brain className="h-4 w-4 mr-2" />
                Ask AI
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
                {/* Active Candidates Toggle */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="active-only">Show only actively looking</Label>
                    <Switch
                      id="active-only"
                      checked={showActiveOnly}
                      onCheckedChange={setShowActiveOnly}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Candidates who updated their profile recently
                  </p>
                </div>

                <Separator />

                {/* Location Filter */}
                <div className="space-y-3">
                  <Label>Location</Label>
                  <Select value={selectedFilters.location} onValueChange={(value) => 
                    setSelectedFilters(prev => ({ ...prev, location: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Any location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any location</SelectItem>
                      <SelectItem value="remote">Remote only</SelectItem>
                      {locationOptions.map(location => (
                        <SelectItem key={location} value={location}>{location}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Availability Filter */}
                <div className="space-y-3">
                  <Label>Availability</Label>
                  <Select value={selectedFilters.availability} onValueChange={(value) => 
                    setSelectedFilters(prev => ({ ...prev, availability: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Any availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any availability</SelectItem>
                      <SelectItem value="immediate">Available immediately</SelectItem>
                      <SelectItem value="2 weeks">Available in 2 weeks</SelectItem>
                      <SelectItem value="open">Open to opportunities</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Experience Filter */}
                <div className="space-y-3">
                  <Label>Years of Experience</Label>
                  <Select value={selectedFilters.experience} onValueChange={(value) => 
                    setSelectedFilters(prev => ({ ...prev, experience: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Any experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any experience</SelectItem>
                      <SelectItem value="1">1+ years</SelectItem>
                      <SelectItem value="3">3+ years</SelectItem>
                      <SelectItem value="5">5+ years</SelectItem>
                      <SelectItem value="7">7+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Popular Skills */}
                <div className="space-y-3">
                  <Label>Popular Skills</Label>
                  <div className="flex flex-wrap gap-2">
                    {skillOptions.slice(0, 6).map(skill => (
                      <Badge 
                        key={skill} 
                        variant="outline" 
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                        onClick={() => setSearchQuery(skill)}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* AI Suggestions */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    AI Suggestions
                  </Label>
                  <div className="space-y-2">
                    <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-auto p-2">
                      "Show me React developers in SF"
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-auto p-2">
                      "Find full-stack engineers available now"
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-auto p-2">
                      "DevOps engineers with AWS experience"
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className={`${selectedCandidate ? 'lg:col-span-2' : 'lg:col-span-3'} space-y-6`}>
            {/* Search Bar */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name, skills, title, company, or university..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline">
                    <Brain className="h-4 w-4 mr-2" />
                    AI Search
                  </Button>
                </div>

                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">Smart Discovery</span>
                  </div>
                  <p className="text-sm text-blue-800">
                    Try: "UX Designer? Consider 'Product Designer' or 'Interaction Architect' too."
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="discover">
                  Discover ({filteredCandidates.length})
                </TabsTrigger>
                <TabsTrigger value="saved">
                  Saved ({bookmarkedCandidates.length})
                </TabsTrigger>
                <TabsTrigger value="recent">
                  Recent Activity
                </TabsTrigger>
              </TabsList>

              <TabsContent value="discover" className="space-y-4">
                {/* Results Summary */}
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Found {filteredCandidates.length} candidates
                    {showActiveOnly && " actively looking"}
                  </p>
                  <Select defaultValue="match">
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="match">Best Match</SelectItem>
                      <SelectItem value="recent">Recently Active</SelectItem>
                      <SelectItem value="experience">Most Experienced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Candidate Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredCandidates.map(candidate => (
                    <Card 
                      key={candidate.id} 
                      className="hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => setSelectedCandidate(candidate)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={candidate.avatar} alt={candidate.name} />
                              <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold">{candidate.name}</h3>
                              <p className="text-sm text-muted-foreground">{candidate.title}</p>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                                <MapPin className="h-3 w-3" />
                                {candidate.location}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="text-center">
                              <div className="text-lg font-bold text-blue-600">{candidate.matchScore}%</div>
                              <div className="text-xs text-muted-foreground">Match</div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleBookmark(candidate.id);
                              }}
                              className={bookmarkedCandidates.includes(candidate.id) ? "text-red-600" : ""}
                            >
                              <Heart className={`h-4 w-4 ${bookmarkedCandidates.includes(candidate.id) ? "fill-current" : ""}`} />
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex flex-wrap gap-1">
                            {candidate.skills.slice(0, 4).map(skill => (
                              <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {candidate.skills.length > 4 && (
                              <Badge variant="outline" className="text-xs">
                                +{candidate.skills.length - 4}
                              </Badge>
                            )}
                          </div>

                          <div className="text-sm text-muted-foreground">
                            <div className="flex items-center gap-4">
                              <span>{candidate.experience}</span>
                              <span>{candidate.education}</span>
                            </div>
                            <div className="flex items-center gap-1 mt-1">
                              <Clock className="h-3 w-3" />
                              Active {candidate.lastActive}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {candidate.aiHighlights.slice(0, 2).map(highlight => (
                              <Badge key={highlight} variant="outline" className="text-xs bg-purple-50 text-purple-700">
                                <Zap className="h-2 w-2 mr-1" />
                                {highlight}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex gap-2 pt-2">
                            <Button size="sm" className="flex-1" onClick={(e) => e.stopPropagation()}>
                              <MessageCircle className="h-3 w-3 mr-2" />
                              Contact
                            </Button>
                            <Button size="sm" variant="outline" onClick={(e) => e.stopPropagation()}>
                              <UserPlus className="h-3 w-3 mr-2" />
                              Assign
                            </Button>
                            <Button size="sm" variant="outline" onClick={(e) => e.stopPropagation()}>
                              <Eye className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="saved" className="space-y-4">
                <div className="text-center py-8">
                  <Bookmark className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="font-semibold mb-2">Saved Candidates</h3>
                  <p className="text-muted-foreground mb-4">
                    You have {bookmarkedCandidates.length} saved candidates
                  </p>
                  <Button onClick={() => setActiveTab("discover")}>
                    <Search className="h-4 w-4 mr-2" />
                    Discover More Talent
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="recent" className="space-y-4">
                <div className="text-center py-8">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="font-semibold mb-2">Recent Activity</h3>
                  <p className="text-muted-foreground">
                    Track recently active candidates and profile updates
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Candidate Detail Sidebar */}
          {selectedCandidate && (
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Candidate Details</CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedCandidate(null)}>
                      ×
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[600px] pr-4">
                    <div className="space-y-6">
                      {/* Header */}
                      <div className="text-center">
                        <Avatar className="w-16 h-16 mx-auto mb-3">
                          <AvatarImage src={selectedCandidate.avatar} />
                          <AvatarFallback>
                            {selectedCandidate.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <h3 className="font-semibold">{selectedCandidate.name}</h3>
                        <p className="text-sm text-muted-foreground">{selectedCandidate.title}</p>
                        <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mt-1">
                          <MapPin className="h-3 w-3" />
                          {selectedCandidate.location}
                        </div>
                        
                        <div className="flex items-center justify-center gap-2 mt-3">
                          <div className="text-center">
                            <div className="text-xl font-bold text-blue-600">{selectedCandidate.matchScore}%</div>
                            <div className="text-xs text-muted-foreground">Match Score</div>
                          </div>
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="grid grid-cols-2 gap-2">
                        <Button size="sm">
                          <MessageCircle className="h-3 w-3 mr-2" />
                          Contact
                        </Button>
                        <Button size="sm" variant="outline">
                          <UserPlus className="h-3 w-3 mr-2" />
                          Assign
                        </Button>
                        <Button size="sm" variant="outline">
                          <Bookmark className="h-3 w-3 mr-2" />
                          Save
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share2 className="h-3 w-3 mr-2" />
                          Share
                        </Button>
                      </div>

                      <Separator />

                      {/* About */}
                      <div>
                        <h4 className="font-medium mb-2">About</h4>
                        <p className="text-sm text-muted-foreground">{selectedCandidate.bio}</p>
                      </div>

                      {/* AI Highlights */}
                      <div>
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <Brain className="h-4 w-4" />
                          AI Insights
                        </h4>
                        <div className="space-y-2">
                          {selectedCandidate.aiHighlights.map(highlight => (
                            <div key={highlight} className="flex items-start gap-2">
                              <Zap className="h-3 w-3 text-purple-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Skills */}
                      <div>
                        <h4 className="font-medium mb-2">Skills</h4>
                        <div className="flex flex-wrap gap-1">
                          {selectedCandidate.skills.map(skill => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Work History */}
                      <div>
                        <h4 className="font-medium mb-2">Recent Experience</h4>
                        <div className="space-y-3">
                          {selectedCandidate.workHistory.slice(0, 3).map((work, index) => (
                            <div key={index} className="flex gap-3">
                              <div className="bg-muted w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                                <Briefcase className="h-3 w-3" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">{work.role}</p>
                                <p className="text-xs text-muted-foreground">{work.company}</p>
                                <p className="text-xs text-muted-foreground">{work.duration}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Links */}
                      {(selectedCandidate.portfolio || selectedCandidate.github || selectedCandidate.linkedin) && (
                        <div>
                          <h4 className="font-medium mb-2">Links</h4>
                          <div className="space-y-2">
                            {selectedCandidate.portfolio && (
                              <Button variant="ghost" size="sm" className="w-full justify-start">
                                <ExternalLink className="h-3 w-3 mr-2" />
                                Portfolio
                              </Button>
                            )}
                            {selectedCandidate.github && (
                              <Button variant="ghost" size="sm" className="w-full justify-start">
                                <Github className="h-3 w-3 mr-2" />
                                GitHub
                              </Button>
                            )}
                            {selectedCandidate.linkedin && (
                              <Button variant="ghost" size="sm" className="w-full justify-start">
                                <Linkedin className="h-3 w-3 mr-2" />
                                LinkedIn
                              </Button>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Additional Info */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Availability</span>
                          <span>{selectedCandidate.availability}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Salary Range</span>
                          <span>{selectedCandidate.salaryRange}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Remote Preference</span>
                          <span>{selectedCandidate.remotePreference}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Languages</span>
                          <span>{selectedCandidate.languages.join(", ")}</span>
                        </div>
                      </div>

                      {/* Similar Candidates */}
                      <div>
                        <Button variant="outline" size="sm" className="w-full">
                          <Users className="h-3 w-3 mr-2" />
                          View Similar Candidates
                        </Button>
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}