import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { OnboardingData } from "./OnboardingFlow";
import { useTabContent } from "./TabContentProvider";
import { 
  User, 
  Briefcase, 
  Star, 
  TrendingUp, 
  Calendar,
  Eye,
  Send,
  Heart,
  Brain,
  Target,
  Zap,
  Trophy,
  MessageSquare,
  ArrowRight,
  CheckCircle,
  Clock,
  Building,
  Award,
  BookOpen,
  Search,
  Plus,
  BarChart3,
  Activity,
  Sparkles
} from "lucide-react";

interface DashboardProps {
  userData: OnboardingData;
  onEditProfile: () => void;
  onViewJobDetail: (jobId: number) => void;
  onOpenAICoach: () => void;
  onOpenJobSearch: () => void;
  onOpenSettings: () => void;
  onOpenBilling: () => void;
  onOpenRejectionFeedback: () => void;
  onOpenTestSimulation: () => void;
}

interface JobMatch {
  id: number;
  title: string;
  company: string;
  logo: string;
  location: string;
  matchPercentage: number;
  type: string;
  postedTime: string;
}

interface Activity {
  id: string;
  type: 'application' | 'profile_view' | 'interview' | 'message' | 'test';
  title: string;
  description: string;
  time: string;
  icon: React.ReactNode;
}

const mockJobMatches: JobMatch[] = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechFlow Inc.",
    logo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=150&h=150&fit=crop",
    location: "San Francisco, CA",
    matchPercentage: 94,
    type: "Full-time",
    postedTime: "2 days ago"
  },
  {
    id: 2,
    title: "React Developer",
    company: "StartupX",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop",
    location: "New York, NY",
    matchPercentage: 89,
    type: "Full-time",
    postedTime: "1 day ago"
  },
  {
    id: 3,
    title: "Full Stack Engineer",
    company: "InnovateLab",
    logo: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=150&h=150&fit=crop",
    location: "Austin, TX",
    matchPercentage: 87,
    type: "Full-time",
    postedTime: "3 days ago"
  }
];

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'interview',
    title: 'Interview Scheduled',
    description: 'TechFlow Inc. - Senior Frontend Developer on Jan 25',
    time: '2 hours ago',
    icon: <Calendar className="h-4 w-4 text-green-600" />
  },
  {
    id: '2',
    type: 'profile_view',
    title: 'Profile Viewed',
    description: 'Your profile was viewed by StartupX recruiters',
    time: '4 hours ago',
    icon: <Eye className="h-4 w-4 text-blue-600" />
  },
  {
    id: '3',
    type: 'application',
    title: 'Application Submitted',
    description: 'Applied to Full Stack Engineer at InnovateLab',
    time: '1 day ago',
    icon: <Send className="h-4 w-4 text-purple-600" />
  },
  {
    id: '4',
    type: 'message',
    title: 'New Message',
    description: 'Received interview details from TechFlow Inc.',
    time: '2 days ago',
    icon: <MessageSquare className="h-4 w-4 text-orange-600" />
  }
];

export function Dashboard({ 
  userData, 
  onEditProfile, 
  onViewJobDetail, 
  onOpenAICoach, 
  onOpenJobSearch,
  onOpenSettings,
  onOpenBilling,
  onOpenRejectionFeedback,
  onOpenTestSimulation
}: DashboardProps) {
  const { activeSubTab } = useTabContent();
  
  const getProfileCompleteness = () => {
    // Safely access userData properties with fallbacks
    const fields = [
      userData?.fullName,
      userData?.currentRole,
      userData?.location,
      userData?.bio,
      Array.isArray(userData?.workExperience) && userData.workExperience.length > 0,
      Array.isArray(userData?.education) && userData.education.length > 0,
      Array.isArray(userData?.skills) && userData.skills.length > 0,
      Array.isArray(userData?.desiredRoles) && userData.desiredRoles.length > 0,
      userData?.careerGoals
    ];
    
    const completedFields = fields.filter(field => 
      field && (typeof field === 'string' ? field.trim() : field)
    ).length;
    
    return Math.round((completedFields / fields.length) * 100);
  };

  const profileCompleteness = getProfileCompleteness();
  
  // Safe access to user name with fallback
  const firstName = userData?.fullName?.split(' ')[0] || 'User';
  const careerGoals = userData?.careerGoals || 'Set your career goals to get personalized recommendations';
  // Quick stats for hero chips
  const newMatchesCount = mockJobMatches.length;
  const interviewsScheduled = mockActivities.filter((a) => a.type === 'interview').length;
 
  // Render different content based on active sub-tab
  const renderTabContent = () => {
    switch (activeSubTab) {
      case 'recent-activity':
        return renderRecentActivityTab();
      case 'notifications':
        return renderNotificationsTab();
      case 'quick-actions':
        return renderQuickActionsTab();
      default:
        return renderOverviewTab();
    }
  };

  const renderOverviewTab = () => (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Modern Welcome Section */}
      <div className="relative overflow-hidden rounded-2xl text-white ring-1 ring-white/10">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-600" />
        {/* Subtle glow accents */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-white/10 rounded-full blur-3xl" />

        <div className="relative p-8 sm:p-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 ring-1 ring-white/20 text-sm mb-3">
                <Sparkles className="h-4 w-4 mr-2 text-yellow-300" />
                Good to see you
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
                Welcome back, {firstName}! <span className="inline-block">👋</span>
              </h1>
              <p className="text-indigo-100 text-lg">
                Here's a quick snapshot of your job search today.
              </p>
              {/* Quick chips */}
              <div className="flex flex-wrap items-center gap-3 mt-4">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 ring-1 ring-white/20 text-sm">
                  <Target className="h-4 w-4" />
                  <span className="font-medium">{newMatchesCount} new matches</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 ring-1 ring-white/20 text-sm">
                  <Calendar className="h-4 w-4" />
                  <span className="font-medium">{interviewsScheduled} interviews</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 ring-1 ring-white/20 text-sm">
                  <CheckCircle className="h-4 w-4" />
                  <span className="font-medium">Profile {profileCompleteness}%</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={onOpenJobSearch}
                className="bg-white text-indigo-700 hover:bg-indigo-50 shadow-sm"
                size="lg"
              >
                <Target className="h-5 w-5 mr-2" />
                Find Jobs
              </Button>
              <Button
                onClick={onOpenAICoach}
                className="bg-white/15 text-white hover:bg-white/20 border border-white/20 backdrop-blur-md"
                size="lg"
              >
                <Brain className="h-5 w-5 mr-2" />
                AI Coach
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 mb-1">Profile Views</p>
                <p className="text-3xl font-bold text-blue-900">247</p>
                <p className="text-xs text-green-600 font-medium">+12% this week</p>
              </div>
              <div className="bg-blue-600 p-3 rounded-full">
                <Eye className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 mb-1">Job Matches</p>
                <p className="text-3xl font-bold text-green-900">23</p>
                <p className="text-xs text-green-600 font-medium">+5 new today</p>
              </div>
              <div className="bg-green-600 p-3 rounded-full">
                <Target className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 mb-1">Applications</p>
                <p className="text-3xl font-bold text-purple-900">8</p>
                <p className="text-xs text-blue-600 font-medium">3 in progress</p>
              </div>
              <div className="bg-purple-600 p-3 rounded-full">
                <Send className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600 mb-1">Interviews</p>
                <p className="text-3xl font-bold text-orange-900">2</p>
                <p className="text-xs text-orange-600 font-medium">1 upcoming</p>
              </div>
              <div className="bg-orange-600 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Profile Completion and AI Insights Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile Completion */}
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center text-xl">
                <User className="h-6 w-6 mr-3 text-blue-600" />
                Profile Completion
              </CardTitle>
              <Badge className={`px-3 py-1 ${profileCompleteness >= 80 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                {profileCompleteness}%
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Progress value={profileCompleteness} className="h-4" />
              <p className="text-muted-foreground">
                {profileCompleteness >= 80 
                  ? "Great! Your profile is well-optimized for job matching."
                  : "Complete your profile to get better job matches and increase visibility."
                }
              </p>
            </div>
            <Button onClick={onEditProfile} className="w-full" size="lg">
              <User className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </CardContent>
        </Card>

        {/* AI Career Coach */}
        <Card className="shadow-lg bg-gradient-to-br from-purple-50 to-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Brain className="h-6 w-6 mr-3 text-purple-600" />
              AI Career Coach
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="bg-card text-card-foreground rounded-lg p-4 border border-border">
                <div className="flex items-start space-x-3">
                  <Sparkles className="h-5 w-5 text-purple-600 mt-1" />
                  <div>
                    <p className="font-medium text-purple-900">Weekly Insight</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Add "System Design" to your skills. 67% of senior frontend roles now require this skill.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-card text-card-foreground rounded-lg p-4 border border-border">
                <div className="flex items-start space-x-3">
                  <Trophy className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium text-blue-900">Skill Recommendation</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Consider taking our GraphQL assessment to boost your profile visibility.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <Button onClick={onOpenAICoach} className="w-full" size="lg">
              <Brain className="h-4 w-4 mr-2" />
              Get More Insights
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Top Job Matches */}
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center text-xl">
              <Star className="h-6 w-6 mr-3 text-yellow-600" />
              Top Job Matches
            </CardTitle>
            <Button variant="ghost" onClick={onOpenJobSearch} className="text-blue-600 hover:text-blue-700">
              View All
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockJobMatches.map((job) => (
              <div
                key={job.id}
                className="border border-border rounded-xl p-6 hover:shadow-md hover:border-blue-200 transition-all cursor-pointer"
                onClick={() => onViewJobDetail(job.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-12 h-12 border-2 border-border">
                      <AvatarImage src={job.logo} alt={job.company} />
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {job.company.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-foreground text-lg">{job.title}</h4>
                      <p className="text-muted-foreground font-medium">{job.company}</p>
                      <p className="text-sm text-muted-foreground">{job.location} • {job.postedTime}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={`text-sm px-3 py-1 ${
                      job.matchPercentage >= 90 ? 'bg-green-100 text-green-800 border-green-200' :
                      job.matchPercentage >= 80 ? 'bg-blue-100 text-blue-800 border-blue-200' :
                      'bg-yellow-100 text-yellow-800 border-yellow-200'
                    }`}>
                      {job.matchPercentage}% Match
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full" onClick={onOpenJobSearch} size="lg">
              <Search className="h-4 w-4 mr-2" />
              Search More Jobs
            </Button>
          </div>
        </CardContent>
      </Card>



      {/* Career Goals Progress */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <Target className="h-6 w-6 mr-3 text-indigo-600" />
            Career Goals Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-2">Current Goal</p>
                <p className="font-medium text-foreground">{careerGoals}</p>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Skills Development</span>
                    <span className="text-green-600 font-semibold">85%</span>
                  </div>
                  <Progress value={85} className="h-3" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Network Building</span>
                    <span className="text-blue-600 font-semibold">62%</span>
                  </div>
                  <Progress value={62} className="h-3" />
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <Button className="w-full" size="lg">
                <Target className="h-4 w-4 mr-2" />
                Update Goals
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderRecentActivityTab = () => (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold">Recent Activity</h1>
        <p className="text-purple-100 text-lg mt-2">Track all your job search activities in one place.</p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">Activity Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {mockActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4 p-4 border border-border rounded-xl hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 mt-1">
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-foreground">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  <p className="text-muted-foreground mt-1">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold">Notifications</h1>
        <p className="text-yellow-100 text-lg mt-2">Stay updated with personalized notifications.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Job Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <p className="font-medium text-blue-900">3 new jobs match your criteria</p>
                <p className="text-sm text-blue-700 mt-1">Frontend Developer positions in San Francisco</p>
              </div>
              <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                <p className="font-medium text-green-900">Interview availability updated</p>
                <p className="text-sm text-green-700 mt-1">TechFlow Inc. added new time slots for this Friday</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>System Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                <p className="font-medium text-purple-900">Profile optimization tip</p>
                <p className="text-sm text-purple-700 mt-1">Add portfolio links to increase visibility</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
                <p className="font-medium text-orange-900">Interview reminder</p>
                <p className="text-sm text-orange-700 mt-1">TechFlow Inc. interview tomorrow at 2:00 PM</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderQuickActionsTab = () => (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold">Quick Actions</h1>
        <p className="text-green-100 text-lg mt-2">Fast-track your job search with these actions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={onEditProfile}>
          <CardContent className="p-8 text-center">
            <div className="bg-blue-100 p-4 rounded-full w-fit mx-auto mb-4">
              <User className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Update Profile</h3>
            <p className="text-muted-foreground">Keep your profile fresh and complete</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={onOpenJobSearch}>
          <CardContent className="p-8 text-center">
            <div className="bg-green-100 p-4 rounded-full w-fit mx-auto mb-4">
              <Search className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Search Jobs</h3>
            <p className="text-muted-foreground">Find your next opportunity</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={onOpenTestSimulation}>
          <CardContent className="p-8 text-center">
            <div className="bg-purple-100 p-4 rounded-full w-fit mx-auto mb-4">
              <Award className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Take Assessment</h3>
            <p className="text-muted-foreground">Showcase your skills</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={onOpenAICoach}>
          <CardContent className="p-8 text-center">
            <div className="bg-orange-100 p-4 rounded-full w-fit mx-auto mb-4">
              <Brain className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">AI Coach</h3>
            <p className="text-muted-foreground">Get personalized guidance</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-8 text-center">
            <div className="bg-indigo-100 p-4 rounded-full w-fit mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Upload Resume</h3>
            <p className="text-muted-foreground">Update your latest resume</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-8 text-center">
            <div className="bg-pink-100 p-4 rounded-full w-fit mx-auto mb-4">
              <MessageSquare className="h-8 w-8 text-pink-600" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Check Messages</h3>
            <p className="text-muted-foreground">3 unread messages</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div>
      {renderTabContent()}
    </div>
  );
}