import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { 
  User,
  MapPin,
  Mail,
  Globe,
  Github,
  Linkedin,
  ArrowLeft,
  Star,
  Award,
  BookOpen,
  Briefcase,
  Code,
  Calendar,
  Download,
  ExternalLink,
  Brain,
  Target,
  TrendingUp,
  Users,
  Heart,
  Zap,
  Shield,
  Lightbulb,
  Share,
  FileDown,
  Bot,
  BarChart3,
  Clock,
  Building,
  GraduationCap,
  Languages,
  MessageSquare,
  UserPlus
} from "lucide-react";
import { SecondaryTabNavigation } from "./SecondaryTabNavigation";
import { AchievementsBadgesPage } from "./AchievementsBadgesPage";
import profileImage from '../assets/default-profile.svg';

interface PreviewMyProfileProps {
  onBack: () => void;
  viewerType?: 'candidate' | 'employer';
  candidateId?: string;
  showAIMatchScore?: boolean;
  matchScore?: number;
}

const mockLanguages = [
  { name: 'English', proficiency: 'Native' },
  { name: 'Spanish', proficiency: 'Professional' },
  { name: 'French', proficiency: 'Conversational' }
];

const mockProjects = [
  { title: 'E-commerce Platform', description: 'React-based shopping platform', tech: ['React', 'Node.js'] },
  { title: 'Mobile App', description: 'Cross-platform mobile application', tech: ['React Native', 'Firebase'] }
];

const mockTests = [
  { name: 'JavaScript Assessment', score: 95, date: '2024-01-15' },
  { name: 'React Certification', score: 88, date: '2024-01-20' }
];

export function PreviewMyProfile({ 
  onBack, 
  viewerType = 'candidate',
  candidateId,
  showAIMatchScore = false,
  matchScore = 94
}: PreviewMyProfileProps) {
  const [currentTab, setCurrentTab] = useState('overview');

  // Page-level header
  const PageHeader = () => (
    <div className="flex items-center justify-between mb-6 pb-4 border-b">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-xl">
            {viewerType === 'employer' ? 'Candidate Profile' : 'Profile Preview'}
          </h1>
          <p className="text-sm text-muted-foreground">
            {viewerType === 'employer' 
              ? 'Detailed candidate information and match analysis'
              : 'This is how employers see your profile'
            }
          </p>
        </div>
      </div>
      {viewerType === 'employer' && (
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <MessageSquare className="h-4 w-4 mr-2" />
            Message
          </Button>
          <Button variant="outline" size="sm">
            <UserPlus className="h-4 w-4 mr-2" />
            Add to Shortlist
          </Button>
          <Button size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Interview
          </Button>
        </div>
      )}
    </div>
  );

  // AI Match Score Card (only for employer view)
  const AIMatchScoreCard = () => {
    if (!showAIMatchScore || viewerType !== 'employer') return null;
    
    return (
      <Card className="mb-6 border-blue-200 bg-blue-50/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-blue-600" />
              <h3 className="font-medium">AI Match Analysis</h3>
            </div>
            <Badge className="bg-blue-100 text-blue-800 border-blue-300">
              {matchScore}% Match
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">{matchScore}%</div>
              <div className="text-sm text-muted-foreground">Overall Match</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">92%</div>
              <div className="text-sm text-muted-foreground">Skills Match</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">89%</div>
              <div className="text-sm text-muted-foreground">Experience Match</div>
            </div>
          </div>
          
          <Progress value={matchScore} className="h-3 mb-3" />
          
          <div className="text-sm text-muted-foreground">
            <strong>Key Strengths:</strong> Strong React expertise, Senior-level experience, Portfolio quality, Cultural fit indicators
          </div>
        </CardContent>
      </Card>
    );
  };

  // Profile Header Card Component
  const ProfileHeaderCard = () => (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Avatar Section */}
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage src={profileImage} />
              <AvatarFallback className="text-xl">
                AJ
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Primary Identity Block */}
          <div className="flex-1">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
              <div className="flex-1">
                <h1 className="text-2xl mb-1">Alex Johnson</h1>
                <p className="text-lg text-muted-foreground mb-2">
                  Senior Frontend Developer
                </p>
                
                {/* Meta Row */}
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    San Francisco, CA
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-1" />
                    5+ years experience
                  </div>
                  <div className="flex items-center">
                    <Building className="h-4 w-4 mr-1" />
                    Technology
                  </div>
                </div>

                {/* Badges/Status Chips */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Open to Work
                  </Badge>
                  <Badge variant="outline" className="border-blue-200 text-blue-700">
                    <Shield className="h-3 w-3 mr-1" />
                    Verified Profile
                  </Badge>
                </div>

                {/* Contact Links */}
                <div className="flex flex-wrap gap-4 text-sm">
                  <a href="#" className="flex items-center text-muted-foreground hover:text-foreground">
                    <Mail className="h-4 w-4 mr-1" />
                    alex.johnson@example.com
                  </a>
                  <a href="#" className="flex items-center text-muted-foreground hover:text-foreground">
                    <Linkedin className="h-4 w-4 mr-1" />
                    LinkedIn
                  </a>
                  <a href="#" className="flex items-center text-muted-foreground hover:text-foreground">
                    <Github className="h-4 w-4 mr-1" />
                    GitHub
                  </a>
                </div>
              </div>

              {/* Right-side Action Cluster for Employer View */}
              {viewerType === 'employer' && (
                <div className="mt-4 lg:mt-0 flex flex-col gap-2">
                  <div className="flex gap-2">
                    <Button size="sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Interview
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    <Button variant="outline" size="sm">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add to Shortlist
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Overview Tab Content
  const OverviewContent = () => (
    <div className="space-y-6">
      {/* Top Row Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Stats */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              <h3 className="font-medium">Profile Stats</h3>
            </div>
            <div className="space-y-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">1,247</div>
                <div className="text-sm text-muted-foreground">Profile Views</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">23</div>
                <div className="text-sm text-muted-foreground">Applications</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">92%</div>
                <div className="text-sm text-muted-foreground">Profile Score</div>
                <Progress value={92} className="h-2 mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Match Readiness */}
        <Card className="border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Match Readiness</h3>
              <div className="text-sm text-green-600">Excellent</div>
            </div>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-3xl font-bold text-green-600">100%</span>
            </div>
            <Progress value={100} className="h-2 mb-2 bg-green-100" />
            <p className="text-sm text-muted-foreground">Profile optimization score</p>
          </CardContent>
        </Card>

        {/* Skills Summary */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Code className="h-5 w-5 text-purple-600" />
              <h3 className="font-medium">Top Skills</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">React</span>
                <span className="text-sm text-muted-foreground">Expert</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">TypeScript</span>
                <span className="text-sm text-muted-foreground">Advanced</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Node.js</span>
                <span className="text-sm text-muted-foreground">Advanced</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Recent Experience */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div className="flex items-center space-x-2">
                <Briefcase className="h-5 w-5 text-muted-foreground" />
                <CardTitle>Recent Experience</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <h4 className="font-medium">Senior Frontend Developer</h4>
                    <p className="text-muted-foreground">TechFlow Inc.</p>
                    <p className="text-sm text-muted-foreground">2022 - Present</p>
                    <p className="text-sm mt-2">Lead frontend development for a team of 5 developers, building React applications used by 100k+ users. Implemented design system and improved performance by 40%.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-2 h-2 bg-muted rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <h4 className="font-medium">Frontend Developer</h4>
                    <p className="text-muted-foreground">InnovateTech</p>
                    <p className="text-sm text-muted-foreground">2020 - 2022</p>
                    <p className="text-sm mt-2">Developed responsive web applications using React and TypeScript. Collaborated with UX/UI designers to implement pixel-perfect designs.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Portfolio/Projects */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Code className="h-5 w-5 text-muted-foreground" />
                <CardTitle>Portfolio Projects</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockProjects.map((project, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <h4 className="font-medium text-sm">{project.title}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{project.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {project.tech.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Education */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div className="flex items-center space-x-2">
                <GraduationCap className="h-5 w-5 text-muted-foreground" />
                <CardTitle>Education</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div>
                <h4 className="font-medium">Bachelor of Science in Computer Science</h4>
                <p className="text-muted-foreground">Stanford University</p>
                <p className="text-sm text-muted-foreground">Class of 2019</p>
              </div>
            </CardContent>
          </Card>

          {/* Tests & Certifications */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-muted-foreground" />
                <CardTitle>Tests & Certifications</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockTests.map((test, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-sm">{test.name}</h4>
                      <p className="text-xs text-muted-foreground">{test.date}</p>
                    </div>
                    <Badge variant="outline" className={
                      test.score >= 90 ? 'border-green-300 text-green-800' : 
                      test.score >= 80 ? 'border-blue-300 text-blue-800' :
                      'border-gray-300 text-gray-800'
                    }>
                      {test.score}%
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Languages */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Languages className="h-5 w-5 text-muted-foreground" />
                <CardTitle>Languages</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {mockLanguages.map((lang, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm">{lang.name}</span>
                    <Badge variant="outline" className="text-xs">{lang.proficiency}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (currentTab) {
      case 'overview':
        return <OverviewContent />;
      case 'achievements':
        return <AchievementsBadgesPage />;
      case 'experience':
        return <div className="text-center py-8 text-muted-foreground">Experience tab content</div>;
      case 'skills':
        return <div className="text-center py-8 text-muted-foreground">Skills tab content</div>;
      case 'education':
        return <div className="text-center py-8 text-muted-foreground">Education tab content</div>;
      case 'projects':
        return <div className="text-center py-8 text-muted-foreground">Projects tab content</div>;
      case 'tests':
        return <div className="text-center py-8 text-muted-foreground">Tests tab content</div>;
      case 'languages':
        return <div className="text-center py-8 text-muted-foreground">Languages tab content</div>;
      case 'personality':
        return <div className="text-center py-8 text-muted-foreground">Personality tab content</div>;
      default:
        return <OverviewContent />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <PageHeader />
      <AIMatchScoreCard />
      <ProfileHeaderCard />
      <SecondaryTabNavigation
        currentPage="careerProfile"
        onTabChange={setCurrentTab}
        userType="candidate"
        activeTab={currentTab}
      />
      <div className="min-h-96">
        {renderTabContent()}
      </div>
    </div>
  );
}