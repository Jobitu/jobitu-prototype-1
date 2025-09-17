import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { 
  ArrowLeft,
  MapPin,
  Building,
  Clock,
  Users,
  Heart,
  Share2,
  CheckCircle,
  Briefcase,
  BookOpen,
  Target,
  Award,
  Bookmark
} from "lucide-react";

interface CandidateJobDetailPageProps {
  jobId: number;
  onBack: () => void;
  onApply: (jobId: number) => void;
  onSave: (jobId: number) => void;
}

// Mock job data - this would normally come from props or API
const mockJob = {
  id: 1,
  title: "Senior Frontend Developer",
  company: "TechFlow Inc.",
  companyLogo: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=150&h=150&fit=crop",
  location: "San Francisco, CA",
  jobType: "Full-time",
  description: "We're looking for a Senior Frontend Developer to join our dynamic engineering team. You'll be responsible for building high-quality, scalable web applications that serve millions of users worldwide. This role offers the opportunity to work with cutting-edge technologies and make a significant impact on our platform.",
  applied: false
};

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
  culture: [
    "Remote-first culture with flexible working hours",
    "Strong emphasis on work-life balance and mental health",
    "Continuous learning and professional development opportunities",
    "Diverse and inclusive team from 30+ countries",
    "Innovation-driven environment with regular hackathons"
  ]
};

export function CandidateJobDetailPage({
  jobId,
  onBack,
  onApply,
  onSave
}: CandidateJobDetailPageProps) {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(!isSaved);
    onSave(jobId);
  };

  const handleApply = () => {
    onApply(jobId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/20">
      {/* Top Navigation */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-gray-200/60 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-900 hover:bg-gray-100/80"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Jobs
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Job Header Card */}
        <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-start space-x-6">
                <Avatar className="w-20 h-20 shadow-lg border-4 border-white">
                  <AvatarImage src={mockJob.companyLogo} alt={mockJob.company} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-lg">
                    {mockJob.company.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{mockJob.title}</h1>
                  <h2 className="text-xl text-gray-600 mb-4 flex items-center">
                    <Building className="h-5 w-5 mr-2" />
                    {mockJob.company}
                  </h2>
                  
                  {/* Job Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <MapPin className="h-4 w-4 text-blue-500" />
                      <span>{mockJob.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Clock className="h-4 w-4 text-purple-500" />
                      <span>{mockJob.jobType}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="bg-blue-50 text-blue-700">Remote-friendly</Badge>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col space-y-3">
                {mockJob.applied ? (
                  <Badge className="py-3 px-6 bg-green-50 text-green-800 border-green-200 text-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Application Submitted
                  </Badge>
                ) : (
                  <Button 
                    onClick={handleApply}
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
                    {isSaved ? (
                      <>
                        <Bookmark className="h-4 w-4 mr-2 fill-red-500 text-red-500" />
                        Saved
                      </>
                    ) : (
                      <>
                        <Bookmark className="h-4 w-4 mr-2" />
                        Save
                      </>
                    )}
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
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
                  <p className="text-gray-700 leading-relaxed">{mockJob.description}</p>
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
          </div>

          {/* Sidebar - Company Information */}
          <div className="space-y-6">
            {/* Company Overview */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="h-5 w-5 mr-2 text-blue-600" />
                  About {mockJob.company}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <p className="text-gray-700 leading-relaxed">{mockCompanyInfo.description}</p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Users className="h-5 w-5 text-blue-500" />
                      <span className="text-gray-700">{mockCompanyInfo.size}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Briefcase className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700">{mockCompanyInfo.industry}</span>
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
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Apply Card */}
            <Card className="shadow-sm bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold text-gray-900 mb-2">Interested in this role?</h3>
                <p className="text-sm text-gray-600 mb-4">Apply now to get started with your application.</p>
                {mockJob.applied ? (
                  <Badge className="bg-green-50 text-green-800 border-green-200">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Application Submitted
                  </Badge>
                ) : (
                  <Button 
                    onClick={handleApply}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  >
                    Apply Now
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}