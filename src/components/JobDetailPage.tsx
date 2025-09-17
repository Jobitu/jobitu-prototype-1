import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { useNotifications } from "./NotificationContext";
import { OnboardingData } from "./OnboardingFlow";
import { 
  ArrowLeft,
  MapPin,
  DollarSign,
  Calendar,
  Eye,
  Users,
  Clock,
  Heart,
  Send,
  Target,
  Star,
  CheckCircle,
  Award,
  Building,
  Globe,
  ExternalLink,
  Lightbulb,
  TrendingUp,
  BookOpen,
  Briefcase,
  AlertTriangle,
  Plus,
  Share2
} from "lucide-react";

interface JobDetailPageProps {
  jobId: number;
  userData: OnboardingData;
  onBack: () => void;
}

interface JobDetail {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  workMode: string;
  salary: string;
  logo: string;
  description: string;
  requirements: string;
  benefits: string[];
  skills: string[];
  postedDate: string;
  deadline: string;
  applicants: number;
  views: number;
  matchScore: number;
  companyInfo: {
    size: string;
    founded: string;
    industry: string;
    description: string;
    website: string;
  };
}

const mockJobs: Record<number, JobDetail> = {
  1: {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechFlow Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    workMode: "Hybrid",
    salary: "$130k - $160k",
    logo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=150&h=150&fit=crop",
    description: `We are looking for a Senior Frontend Developer to join our growing engineering team. You will be responsible for building and maintaining our customer-facing web applications using modern technologies.

Key Responsibilities:
• Lead frontend development initiatives and mentor junior developers
• Build responsive, performant web applications using React and TypeScript
• Collaborate with design and backend teams to deliver exceptional user experiences
• Implement best practices for code quality, testing, and deployment
• Drive technical decisions and architecture for frontend systems

What You'll Build:
• Customer dashboard used by 100k+ users daily
• Real-time data visualization and analytics tools
• Mobile-responsive e-commerce platform
• Internal admin tools and workflow systems`,
    requirements: `Required Qualifications:
• 5+ years of experience in frontend development
• Expert-level knowledge of React, TypeScript, and modern JavaScript
• Strong understanding of HTML5, CSS3, and responsive design principles
• Experience with state management libraries (Redux, Zustand, or similar)
• Proficiency with build tools (Webpack, Vite) and version control (Git)
• Experience with testing frameworks (Jest, React Testing Library)

Preferred Qualifications:
• Experience with Next.js or other React frameworks
• Knowledge of GraphQL and modern API integration patterns
• Familiarity with design systems and component libraries
• Experience with performance optimization and monitoring tools
• Understanding of accessibility standards (WCAG 2.1)
• Previous experience in a senior or lead role`,
    benefits: [
      "Competitive salary and equity package",
      "Comprehensive health, dental, and vision insurance",
      "Unlimited PTO and flexible working hours",
      "Professional development budget ($3,000/year)",
      "Latest MacBook Pro and accessories",
      "Catered lunches and snacks",
      "Remote work flexibility",
      "Annual team retreats and events"
    ],
    skills: ["React", "TypeScript", "JavaScript", "HTML/CSS", "Node.js", "GraphQL", "Git", "Jest", "Webpack", "Redux"],
    postedDate: "2 days ago",
    deadline: "January 30, 2024",
    applicants: 47,
    views: 1205,
    matchScore: 94,
    companyInfo: {
      size: "150-300 employees",
      founded: "2018",
      industry: "Financial Technology",
      description: "TechFlow Inc. is a leading fintech company that builds innovative payment solutions for businesses worldwide. We're backed by top-tier VCs and growing rapidly.",
      website: "https://techflow.com"
    }
  }
};

export function JobDetailPage({ jobId, userData, onBack }: JobDetailPageProps) {
  const { showToast } = useNotifications();
  const [isSaved, setIsSaved] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  const job = mockJobs[jobId] || mockJobs[1];

  const handleSaveJob = () => {
    setIsSaved(!isSaved);
    showToast({
      type: 'success',
      title: isSaved ? 'Job removed' : 'Job saved',
      message: isSaved ? 'Job removed from your saved list.' : 'Job added to your saved list.',
      duration: 3000
    });
  };

  const handleApply = () => {
    setHasApplied(true);
    showToast({
      type: 'success',
      title: 'Application submitted',
      message: 'Your application has been successfully submitted. We\'ll notify you of any updates.',
      duration: 5000
    });
  };

  const getSkillMatch = (skill: string) => {
    const userSkills = [
      ...userData.skills.hardSkills,
      ...userData.skills.softSkills,
      ...userData.skills.tools
    ].map(s => s.toLowerCase());
    
    if (userSkills.includes(skill.toLowerCase())) {
      return 'matching';
    }
    
    // Check for partial matches
    const partialMatches = ['javascript', 'css', 'html', 'react'];
    if (partialMatches.some(pm => skill.toLowerCase().includes(pm) && userSkills.some(us => us.includes(pm)))) {
      return 'partial';
    }
    
    return 'missing';
  };

  const matchingSkills = job.skills.filter(skill => getSkillMatch(skill) === 'matching');
  const partialSkills = job.skills.filter(skill => getSkillMatch(skill) === 'partial');
  const missingSkills = job.skills.filter(skill => getSkillMatch(skill) === 'missing');

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-gray-600';
  };

  const getMatchScoreBg = (score: number) => {
    if (score >= 90) return 'bg-green-100';
    if (score >= 80) return 'bg-blue-100';
    if (score >= 70) return 'bg-yellow-100';
    return 'bg-gray-100';
  };

  const similarJobs = [
    { id: 2, title: "Frontend Developer", company: "StartupX", match: 89 },
    { id: 3, title: "React Developer", company: "InnovateLab", match: 87 },
    { id: 4, title: "Full Stack Engineer", company: "DevCorp", match: 85 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Back Button */}
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Search
        </Button>

        {/* Job Header (Full Width) */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-6">
              {/* Left Side - Job Info */}
              <div className="flex items-start space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={job.logo} alt={job.company} />
                  <AvatarFallback>{job.company.substring(0, 2)}</AvatarFallback>
                </Avatar>
                
                <div className="space-y-3">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
                    <p className="text-lg text-gray-600">{job.company}</p>
                  </div>
                  
                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {job.salary}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {job.type}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Badge variant="secondary">{job.type}</Badge>
                    <Badge variant="secondary">{job.workMode}</Badge>
                    <Badge className={`${getMatchScoreBg(job.matchScore)} ${getMatchScoreColor(job.matchScore)} hover:${getMatchScoreBg(job.matchScore)}`}>
                      <Target className="h-3 w-3 mr-1" />
                      {job.matchScore}% Match
                    </Badge>
                  </div>
                </div>
              </div>
              
              {/* Right Side - Actions */}
              <div className="flex items-center space-x-3">
                <Button variant="outline" onClick={handleSaveJob}>
                  <Heart className={`h-4 w-4 mr-2 ${isSaved ? 'fill-current text-red-500' : ''}`} />
                  {isSaved ? 'Saved' : 'Save Job'}
                </Button>
                <Button variant="outline">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button 
                  onClick={handleApply}
                  disabled={hasApplied}
                  className={hasApplied ? 'bg-green-600 hover:bg-green-600' : ''}
                >
                  {hasApplied ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Applied
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Apply Now
                    </>
                  )}
                </Button>
              </div>
            </div>
            
            {/* Mini Stats Grid */}
            <div className="grid grid-cols-4 gap-4 pt-4 border-t">
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                </div>
                <p className="text-sm font-semibold text-gray-900">Posted</p>
                <p className="text-xs text-gray-600">{job.postedDate}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Clock className="h-4 w-4 mr-1 text-gray-400" />
                </div>
                <p className="text-sm font-semibold text-gray-900">Deadline</p>
                <p className="text-xs text-gray-600">{job.deadline}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Users className="h-4 w-4 mr-1 text-gray-400" />
                </div>
                <p className="text-sm font-semibold text-gray-900">Applicants</p>
                <p className="text-xs text-gray-600">{job.applicants}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Eye className="h-4 w-4 mr-1 text-gray-400" />
                </div>
                <p className="text-sm font-semibold text-gray-900">Views</p>
                <p className="text-xs text-gray-600">{job.views}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Match Analysis Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-5 w-5 mr-2 text-blue-600" />
              AI Match Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Match Score Bar */}
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className={`w-16 h-16 rounded-full ${getMatchScoreBg(job.matchScore)} flex items-center justify-center`}>
                    <span className={`text-2xl font-bold ${getMatchScoreColor(job.matchScore)}`}>
                      {job.matchScore}
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Overall Match Score</span>
                    <span className={`font-bold ${getMatchScoreColor(job.matchScore)}`}>
                      {job.matchScore >= 90 ? 'Excellent match!' :
                       job.matchScore >= 80 ? 'Great match!' :
                       job.matchScore >= 70 ? 'Good match!' : 'Potential match'}
                    </span>
                  </div>
                  <Progress value={job.matchScore} className="h-3" />
                </div>
              </div>

              {/* Skills Analysis Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Matching Skills */}
                <div>
                  <h4 className="font-medium text-green-700 mb-3 flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Matching Skills ({matchingSkills.length})
                  </h4>
                  <div className="space-y-2">
                    {matchingSkills.map((skill, index) => (
                      <Badge key={index} className="bg-green-100 text-green-800 hover:bg-green-100 mr-1 mb-1">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Partial Match Skills */}
                <div>
                  <h4 className="font-medium text-blue-700 mb-3 flex items-center">
                    <Star className="h-4 w-4 mr-2" />
                    Partial Match ({partialSkills.length})
                  </h4>
                  <div className="space-y-2">
                    {partialSkills.map((skill, index) => (
                      <Badge key={index} className="bg-blue-100 text-blue-800 hover:bg-blue-100 mr-1 mb-1">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Missing Skills */}
                <div>
                  <h4 className="font-medium text-orange-700 mb-3 flex items-center">
                    <Plus className="h-4 w-4 mr-2" />
                    Skills to Develop ({missingSkills.length})
                  </h4>
                  <div className="space-y-2">
                    {missingSkills.map((skill, index) => (
                      <Badge key={index} className="bg-orange-100 text-orange-800 hover:bg-orange-100 mr-1 mb-1">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* AI Recommendations */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-3 flex items-center">
                  <Award className="h-4 w-4 mr-2" />
                  AI Recommendations
                </h4>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li>• Your React and TypeScript experience aligns perfectly with their tech stack</li>
                  <li>• Consider highlighting your leadership experience to match their senior role requirements</li>
                  <li>• Your GraphQL knowledge gives you an edge over other candidates</li>
                  {missingSkills.length > 0 && (
                    <li>• Focus on developing {missingSkills.slice(0, 2).join(' and ')} to become an even stronger candidate</li>
                  )}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid - 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column (2/3 Width) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Description Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Job Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                    {job.description}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Requirements Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                    {job.requirements}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Benefits & Perks Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 mr-2" />
                  Benefits & Perks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {job.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar (1/3 Width) */}
          <div className="space-y-6">
            {/* Required Skills Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Required Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {job.skills.map((skill, index) => {
                    const matchType = getSkillMatch(skill);
                    return (
                      <Badge 
                        key={index} 
                        className={`mr-1 mb-1 ${
                          matchType === 'matching' ? 'bg-green-100 text-green-800 hover:bg-green-100' :
                          matchType === 'partial' ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' :
                          'bg-gray-100 text-gray-800 hover:bg-gray-100'
                        }`}
                      >
                        {skill}
                        {matchType === 'matching' && <CheckCircle className="h-3 w-3 ml-1" />}
                      </Badge>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Company Info Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="h-5 w-5 mr-2" />
                  Company Info
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Company Size</p>
                      <p className="font-medium">{job.companyInfo.size}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Founded</p>
                      <p className="font-medium">{job.companyInfo.founded}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-gray-600">Industry</p>
                      <p className="font-medium">{job.companyInfo.industry}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {job.companyInfo.description}
                    </p>
                  </div>
                  
                  <Button variant="outline" className="w-full" asChild>
                    <a href={job.companyInfo.website} target="_blank" rel="noopener noreferrer">
                      <Globe className="h-4 w-4 mr-2" />
                      Visit Website
                      <ExternalLink className="h-3 w-3 ml-2" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Application Tips Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2" />
                  Application Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="flex items-start space-x-2">
                      <TrendingUp className="h-4 w-4 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-blue-900">Highlight your leadership experience</p>
                        <p className="text-xs text-blue-700">This role requires mentoring junior developers</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-green-900">Mention your React expertise</p>
                        <p className="text-xs text-green-700">Perfect match for their tech stack</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 rounded-lg p-3">
                    <div className="flex items-start space-x-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-yellow-900">Address missing skills</p>
                        <p className="text-xs text-yellow-700">Show willingness to learn new technologies</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Similar Opportunities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="h-5 w-5 mr-2" />
                  Similar Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {similarJobs.map((similarJob) => (
                    <div key={similarJob.id} className="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{similarJob.title}</p>
                          <p className="text-xs text-gray-600">{similarJob.company}</p>
                        </div>
                        <Badge className={`${getMatchScoreBg(similarJob.match)} ${getMatchScoreColor(similarJob.match)} hover:${getMatchScoreBg(similarJob.match)}`}>
                          {similarJob.match}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Similar Jobs
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}