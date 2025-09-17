import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { 
  ArrowLeft,
  ArrowRight,
  MapPin,
  Building,
  DollarSign,
  Clock,
  Users,
  Star,
  Heart,
  ExternalLink,
  Share2,
  CheckCircle,
  Briefcase,
  Calendar,
  GraduationCap,
  Award,
  Globe,
  BookOpen,
  TrendingUp,
  Code,
  Target,
  Lightbulb,
  Zap,
  Eye,
  UserCheck,
  Brain,
  AlertCircle,
  Bookmark
} from "lucide-react";

interface SmartMatchJobDetailPageProps {
  job: {
    id: string;
    title: string;
    company: string;
    companyLogo: string;
    location: string;
    salary: string;
    jobType: string;
    postedDate: string;
    deadline?: string;
    applicants?: number;
    views?: number;
    teamSize?: string;
    experience?: string;
    description: string;
    skills: string[];
    benefits?: string[];
    matchPercentage: number;
    matchReasons: string[];
    applied: boolean;
  };
  onBack: () => void;
  onApply: (jobId: string) => void;
  onSave: (jobId: string) => void;
  formatDate: (date: string) => string;
}

const mockResponsibilities = [
  "Develop and maintain high-quality React applications using modern JavaScript/TypeScript",
  "Collaborate with design teams to implement pixel-perfect UI components",
  "Optimize application performance and ensure cross-browser compatibility",
  "Mentor junior developers and participate in code reviews",
  "Work closely with backend teams to integrate APIs and ensure seamless user experiences",
  "Contribute to technical architecture decisions and engineering best practices"
];

const mockRequirements = [
  "6+ years of experience in frontend development with React and TypeScript",
  "Strong understanding of modern JavaScript ES6+, HTML5, and CSS3",
  "Experience with state management libraries (Redux, Zustand, or similar)",
  "Proficiency in testing frameworks (Jest, React Testing Library)",
  "Knowledge of build tools and bundlers (Webpack, Vite, or similar)",
  "Experience with version control systems (Git) and collaborative development workflows"
];

const mockCompanyInfo = {
  description: "TechFlow Inc. is a leading fintech company revolutionizing digital banking and financial services. We're building the future of money management with innovative solutions that help millions of users worldwide achieve their financial goals.",
  size: "500-1000 employees",
  industry: "Financial Technology",
  founded: "2018",
  funding: "Series C ($150M raised)",
  culture: [
    "Remote-first culture with flexible working hours",
    "Strong emphasis on work-life balance and mental health",
    "Continuous learning and professional development opportunities",
    "Diverse and inclusive team from 30+ countries",
    "Innovation-driven environment with regular hackathons"
  ]
};

// Mock matching skills data
const matchingSkills = [
  { name: "React", type: "matching" },
  { name: "TypeScript", type: "matching" },
  { name: "Node.js", type: "matching" },
  { name: "GraphQL", type: "matching" },
  { name: "Git", type: "matching" },
  { name: "Jest", type: "matching" },
  { name: "Webpack", type: "matching" }
];

const partialMatchSkills = [
  { name: "HTML/CSS", type: "partial" }
];

const skillsToDeveop = [
  { name: "JavaScript", type: "develop" },
  { name: "Redux", type: "develop" }
];

export function SmartMatchJobDetailPage({
  job,
  onBack,
  onApply,
  onSave,
  formatDate
}: SmartMatchJobDetailPageProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'company' | 'match'>('overview');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(!isSaved);
    onSave(job.id);
  };

  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-100 text-green-800 border-green-200';
    if (percentage >= 70) return 'bg-blue-100 text-blue-800 border-blue-200';
    return 'bg-yellow-100 text-yellow-800 border-yellow-200';
  };

  const getSkillBadgeColor = (type: string) => {
    switch (type) {
      case 'matching':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'partial':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'develop':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/20">
      {/* Enhanced Top Navigation */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-gray-200/60 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-900 hover:bg-gray-100/80"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Smart Matches
            </Button>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                <Star className="h-3 w-3 mr-1" />
                AI Powered
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Enhanced Job Header Card */}
        <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-start space-x-6">
                <div className="relative">
                  <Avatar className="w-20 h-20 shadow-lg border-4 border-white">
                    <AvatarImage src={job.companyLogo} alt={job.company} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-lg">
                      {job.company.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    {job.matchPercentage}%
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-start space-x-3 mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
                    <Badge className={`${getMatchColor(job.matchPercentage)} border font-medium px-3 py-1`}>
                      {job.matchPercentage}% Match
                    </Badge>
                  </div>
                  <h2 className="text-xl text-gray-600 mb-4 flex items-center">
                    <Building className="h-5 w-5 mr-2" />
                    {job.company}
                  </h2>
                  
                  {/* Enhanced Job Details Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <MapPin className="h-4 w-4 text-blue-500" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <DollarSign className="h-4 w-4 text-green-500" />
                      <span>{job.salary}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Clock className="h-4 w-4 text-purple-500" />
                      <span>Full-time</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="bg-blue-50 text-blue-700">Remote-friendly</Badge>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Enhanced Action Buttons */}
              <div className="flex flex-col space-y-3">
                {job.applied ? (
                  <Badge className="py-3 px-6 bg-green-50 text-green-800 border-green-200 text-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Application Submitted
                  </Badge>
                ) : (
                  <Button 
                    onClick={() => onApply(job.id)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3 text-white shadow-lg"
                    size="lg"
                  >
                    Apply Now
                  </Button>
                )}
                
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={handleSave}
                    className="flex items-center hover:bg-red-50 hover:border-red-200"
                  >
                    <Heart className={`h-4 w-4 mr-2 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
                    {isSaved ? 'Saved' : 'Save'}
                  </Button>
                  <Button variant="outline" className="flex items-center hover:bg-blue-50">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Job Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-md transition-shadow bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200">
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <div className="text-xs text-blue-600 mb-1 uppercase tracking-wide">Posted</div>
              <div className="text-lg font-semibold text-blue-900">2 days ago</div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200">
            <CardContent className="p-6 text-center">
              <AlertCircle className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <div className="text-xs text-purple-600 mb-1 uppercase tracking-wide">Deadline</div>
              <div className="text-lg font-semibold text-purple-900">Jan 30, 2024</div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow bg-gradient-to-br from-green-50 to-green-100/50 border-green-200">
            <CardContent className="p-6 text-center">
              <UserCheck className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <div className="text-xs text-green-600 mb-1 uppercase tracking-wide">Applicants</div>
              <div className="text-lg font-semibold text-green-900">47</div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow bg-gradient-to-br from-orange-50 to-orange-100/50 border-orange-200">
            <CardContent className="p-6 text-center">
              <Eye className="h-8 w-8 text-orange-600 mx-auto mb-3" />
              <div className="text-xs text-orange-600 mb-1 uppercase tracking-wide">Views</div>
              <div className="text-lg font-semibold text-orange-900">1,295</div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced AI Match Analysis - PRESERVED AS REQUESTED */}
        <Card className="mb-8 shadow-lg border-0 bg-gradient-to-r from-blue-50 to-purple-50">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center text-xl">
              <Brain className="h-6 w-6 mr-3" />
              AI Match Analysis
              <Badge className="ml-auto bg-white/20 text-white">Beta</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            {/* Overall Match Score */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xl font-semibold text-gray-900">Overall Match Score</span>
                <span className="text-2xl font-bold text-green-600">Excellent match!</span>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-5xl font-bold text-green-600">94</div>
                <div className="flex-1">
                  <Progress value={94} className="h-4 bg-gray-200" />
                </div>
              </div>
            </div>

            <Separator className="bg-gray-200" />

            {/* Skills Breakdown */}
            <div className="space-y-8">
              {/* Matching Skills */}
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <span className="text-xl font-semibold text-gray-900">Matching Skills ({matchingSkills.length})</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {matchingSkills.map((skill, index) => (
                    <Badge 
                      key={index} 
                      className={`${getSkillBadgeColor(skill.type)} border px-3 py-1 font-medium`}
                    >
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Partial Match */}
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <Star className="h-6 w-6 text-blue-600" />
                  <span className="text-xl font-semibold text-gray-900">Partial Match ({partialMatchSkills.length})</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {partialMatchSkills.map((skill, index) => (
                    <Badge 
                      key={index} 
                      className={`${getSkillBadgeColor(skill.type)} border px-3 py-1 font-medium`}
                    >
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Skills to Develop */}
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                  <span className="text-xl font-semibold text-gray-900">Skills to Develop ({skillsToDeveop.length})</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {skillsToDeveop.map((skill, index) => (
                    <Badge 
                      key={index} 
                      className={`${getSkillBadgeColor(skill.type)} border px-3 py-1 font-medium`}
                    >
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <Separator className="bg-gray-200" />

            {/* AI Recommendations */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Brain className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-semibold text-gray-900">AI Recommendations</span>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-800">Your React and TypeScript experience aligns perfectly with their tech stack</span>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-800">Consider highlighting your leadership experience to match their senior role requirements</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enhanced Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Enhanced Tab Navigation */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <nav className="flex">
                {[
                  { id: 'overview', label: 'Job Overview', icon: BookOpen },
                  { id: 'company', label: 'About Company', icon: Building },
                  { id: 'match', label: 'Why You Match', icon: Target }
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id as any)}
                    className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 font-medium text-sm transition-colors ${
                      activeTab === id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Enhanced Tab Content */}
            <div className="space-y-6">
              {activeTab === 'overview' && (
                <>
                  {/* Job Description */}
                  <Card className="shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                        Job Description
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="prose prose-sm max-w-none space-y-4">
                        <p className="text-gray-700 leading-relaxed">{job.description}</p>
                        <p className="text-gray-700 leading-relaxed">
                          Join our engineering team at TechFlow Inc. and help us build the next generation of 
                          financial technology solutions. You'll work on challenging problems at scale, 
                          collaborating with talented engineers, designers, and product managers to create 
                          exceptional user experiences.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          We're looking for someone who is passionate about frontend development, has a keen 
                          eye for detail, and thrives in a fast-paced environment. This role offers the 
                          opportunity to make a significant impact on our platform used by millions of users worldwide.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Key Responsibilities */}
                  <Card className="shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Target className="h-5 w-5 mr-2 text-green-600" />
                        Key Responsibilities
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-4">
                        {mockResponsibilities.map((responsibility, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 leading-relaxed">{responsibility}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Requirements */}
                  <Card className="shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Award className="h-5 w-5 mr-2 text-purple-600" />
                        Requirements
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-4">
                        {mockRequirements.map((requirement, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-purple-600 rounded-full mt-3 flex-shrink-0" />
                            <span className="text-gray-700 leading-relaxed">{requirement}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Benefits */}
                  {job.benefits && (
                    <Card className="shadow-sm">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Star className="h-5 w-5 mr-2 text-yellow-600" />
                          Benefits & Perks
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {job.benefits.map((benefit, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <span className="text-gray-700">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </>
              )}

              {activeTab === 'company' && (
                <>
                  {/* Company Overview */}
                  <Card className="shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Building className="h-5 w-5 mr-2 text-blue-600" />
                        About {job.company}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <p className="text-gray-700 leading-relaxed">{mockCompanyInfo.description}</p>
                        
                        <div className="grid grid-cols-2 gap-6">
                          <div className="flex items-center space-x-3">
                            <Users className="h-5 w-5 text-blue-500" />
                            <span className="text-gray-700">{mockCompanyInfo.size}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Briefcase className="h-5 w-5 text-green-500" />
                            <span className="text-gray-700">{mockCompanyInfo.industry}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Calendar className="h-5 w-5 text-purple-500" />
                            <span className="text-gray-700">Founded {mockCompanyInfo.founded}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <TrendingUp className="h-5 w-5 text-orange-500" />
                            <span className="text-gray-700">{mockCompanyInfo.funding}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Company Culture */}
                  <Card className="shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Users className="h-5 w-5 mr-2 text-green-600" />
                        Company Culture
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mockCompanyInfo.culture.map((item, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <Zap className="h-4 w-4 text-blue-600" />
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}

              {activeTab === 'match' && (
                <>
                  {/* Match Score Breakdown */}
                  <Card className="shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Target className="h-5 w-5 mr-2 text-blue-600" />
                          Match Score Breakdown
                        </div>
                        <Badge className={`${getMatchColor(job.matchPercentage)} border`}>
                          {job.matchPercentage}% Overall Match
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {[
                          { category: 'Technical Skills', score: 95, description: 'Perfect alignment with React, TypeScript, and modern frontend stack' },
                          { category: 'Experience Level', score: 90, description: 'Your 6+ years experience matches the senior role requirements' },
                          { category: 'Company Culture', score: 85, description: 'Remote-friendly environment aligns with your preferences' },
                          { category: 'Compensation', score: 92, description: 'Salary range matches your expectations and market value' },
                          { category: 'Growth Potential', score: 88, description: 'Leadership opportunities align with career goals' }
                        ].map((item, index) => (
                          <div key={index} className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="font-medium text-gray-900">{item.category}</span>
                              <span className="font-semibold text-gray-700">{item.score}%</span>
                            </div>
                            <Progress value={item.score} className="h-3" />
                            <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Why We Matched You */}
                  <Card className="shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Lightbulb className="h-5 w-5 mr-2 text-yellow-600" />
                        Why We Matched You
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {job.matchReasons.map((reason, index) => (
                          <div key={index} className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-800 leading-relaxed">{reason}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            {/* Job Insights */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
                  Job Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Applications</span>
                  <span className="font-semibold">47 candidates</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Your Match Rank</span>
                  <Badge className="bg-green-100 text-green-800">#3 of 47</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Response Rate</span>
                  <span className="font-semibold">78%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Time to Hire</span>
                  <span className="font-semibold">2-3 weeks</span>
                </div>
              </CardContent>
            </Card>

            {/* Similar Roles */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bookmark className="h-5 w-5 mr-2 text-purple-600" />
                  Similar High-Match Roles
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { title: 'Senior React Developer', company: 'DevCorp', match: 93 },
                  { title: 'Frontend Architect', company: 'TechStart', match: 90 },
                  { title: 'UI Engineer', company: 'InnovateTech', match: 87 }
                ].map((role, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <div>
                      <p className="font-medium text-gray-900">{role.title}</p>
                      <p className="text-sm text-gray-600">{role.company}</p>
                    </div>
                    <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                      {role.match}%
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}