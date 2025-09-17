import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Progress } from "../ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { 
  ArrowLeft,
  MapPin,
  Mail,
  Phone,
  Globe,
  Github,
  Linkedin,
  Calendar,
  Star,
  Award,
  BookOpen,
  Briefcase,
  GraduationCap,
  MessageSquare,
  Video,
  CheckCircle,
  Download,
  ExternalLink,
  Clock,
  Target,
  FileText,
  Users,
  TrendingUp,
  Zap,
  Brain,
  Heart,
  User
} from "lucide-react";

interface CandidateData {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  title: string;
  location: string;
  bio: string;
  website?: string;
  linkedin?: string;
  github?: string;
  experience: Array<{
    title: string;
    company: string;
    duration: string;
    description: string;
  }>;
  education: Array<{
    degree: string;
    school: string;
    year: string;
    gpa?: string;
  }>;
  skills: Array<{
    name: string;
    level: number;
    verified?: boolean;
  }>;
  languages: Array<{
    name: string;
    proficiency: string;
  }>;
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
    url?: string;
  }>;
  assessments: Array<{
    name: string;
    score: number;
    completedDate: string;
    status: 'completed' | 'pending' | 'failed';
  }>;
  interviews: Array<{
    round: string;
    date: string;
    interviewer: string;
    status: 'scheduled' | 'completed' | 'cancelled';
    feedback?: string;
    rating?: number;
  }>;
  personality: Array<{
    trait: string;
    score: number;
    level: string;
  }>;
  matchScore: {
    overall: number;
    experience: number;
    talent: number;
    test: number;
  };
}

const mockCandidateData: CandidateData = {
  id: 'c1',
  name: 'Sarah Chen',
  email: 'sarah.chen@email.com',
  phone: '+1 (555) 123-4567',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop',
  title: 'Senior Frontend Developer',
  location: 'San Francisco, CA',
  bio: 'Passionate frontend developer with 5+ years of experience building scalable web applications. Specialized in React, TypeScript, and modern web technologies. Led several high-impact projects and mentored junior developers.',
  website: 'sarahchen.dev',
  linkedin: 'linkedin.com/in/sarahchen',
  github: 'github.com/sarahchen',
  experience: [
    {
      title: 'Senior Frontend Developer',
      company: 'TechFlow Inc.',
      duration: 'Jan 2022 - Present',
      description: 'Led frontend development for a React-based web application serving 100k+ users. Implemented modern state management, performance optimizations, and mentored 3 junior developers.'
    },
    {
      title: 'Frontend Developer',
      company: 'StartupXYZ',
      duration: 'Jun 2019 - Dec 2021',
      description: 'Built responsive web applications using React and TypeScript. Collaborated with designers and backend engineers to deliver pixel-perfect user experiences.'
    }
  ],
  education: [
    {
      degree: 'Bachelor of Computer Science',
      school: 'Stanford University',
      year: '2019',
      gpa: '3.8'
    }
  ],
  skills: [
    { name: 'React', level: 95, verified: true },
    { name: 'TypeScript', level: 90, verified: true },
    { name: 'JavaScript', level: 92, verified: false },
    { name: 'Node.js', level: 85, verified: false },
    { name: 'GraphQL', level: 80, verified: false },
    { name: 'AWS', level: 75, verified: false }
  ],
  languages: [
    { name: 'English', proficiency: 'Native' },
    { name: 'Mandarin', proficiency: 'Fluent' },
    { name: 'Spanish', proficiency: 'Conversational' }
  ],
  projects: [
    {
      name: 'E-commerce Platform',
      description: 'Built a full-stack e-commerce platform with React, Node.js, and PostgreSQL',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
      url: 'github.com/sarahchen/ecommerce'
    }
  ],
  assessments: [
    {
      name: 'Frontend Technical Assessment',
      score: 94,
      completedDate: '2024-01-20',
      status: 'completed'
    },
    {
      name: 'System Design Assessment',
      score: 87,
      completedDate: '2024-01-18',
      status: 'completed'
    }
  ],
  interviews: [
    {
      round: 'Technical Interview - Round 1',
      date: '2024-01-25',
      interviewer: 'John Smith',
      status: 'completed',
      feedback: 'Strong technical skills, good problem-solving approach',
      rating: 4
    }
  ],
  personality: [
    { trait: 'Openness', score: 85, level: 'High' },
    { trait: 'Conscientiousness', score: 92, level: 'High' },
    { trait: 'Extraversion', score: 68, level: 'Medium' },
    { trait: 'Agreeableness', score: 78, level: 'High' },
    { trait: 'Emotional Stability', score: 72, level: 'Medium' }
  ],
  matchScore: {
    overall: 94,
    experience: 92,
    talent: 96,
    test: 94
  }
};

interface EmployerCandidateProfilePageProps {
  candidateId?: string;
  onBack: () => void;
}

export function EmployerCandidateProfilePage({ candidateId, onBack }: EmployerCandidateProfilePageProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [candidate] = useState<CandidateData>(mockCandidateData);

  const personalityIcons = {
    'Openness': Brain,
    'Conscientiousness': Target,
    'Extraversion': Users,
    'Agreeableness': Heart,
    'Emotional Stability': Zap
  };

  const renderOverviewTab = () => (
    <div className="space-y-8">
      {/* CV-Style Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Professional Summary */}
          <section>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <User className="h-5 w-5 mr-2 text-blue-600" />
              Professional Summary
            </h3>
            <p className="text-gray-700 leading-relaxed">{candidate.bio}</p>
          </section>

          {/* Experience */}
          <section>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Briefcase className="h-5 w-5 mr-2 text-blue-600" />
              Work Experience
            </h3>
            <div className="space-y-4">
              {candidate.experience.map((exp, index) => (
                <div key={index} className="border-l-2 border-blue-200 pl-4">
                  <h4 className="font-medium text-gray-900">{exp.title}</h4>
                  <p className="text-blue-600 font-medium">{exp.company}</p>
                  <p className="text-sm text-gray-600 mb-2">{exp.duration}</p>
                  <p className="text-gray-700 text-sm">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <GraduationCap className="h-5 w-5 mr-2 text-blue-600" />
              Education
            </h3>
            <div className="space-y-3">
              {candidate.education.map((edu, index) => (
                <div key={index} className="border-l-2 border-green-200 pl-4">
                  <h4 className="font-medium text-gray-900">{edu.degree}</h4>
                  <p className="text-green-600 font-medium">{edu.school}</p>
                  <p className="text-sm text-gray-600">
                    Graduated {edu.year} {edu.gpa && `• GPA: ${edu.gpa}`}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-blue-600" />
              Key Projects
            </h3>
            <div className="space-y-4">
              {candidate.projects.map((project, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">{project.name}</h4>
                  <p className="text-gray-700 text-sm mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column - Sidebar Info */}
        <div className="space-y-6">
          {/* Skills */}
          <section>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Award className="h-5 w-5 mr-2 text-blue-600" />
              Skills
            </h3>
            <div className="space-y-3">
              {candidate.skills.slice(0, 6).map((skill, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <div className="flex items-center space-x-2">
                      {skill.verified && (
                        <CheckCircle className="h-3 w-3 text-green-600" />
                      )}
                      <span className="text-xs text-gray-600">{skill.level}%</span>
                    </div>
                  </div>
                  <Progress value={skill.level} className="h-1" />
                </div>
              ))}
            </div>
          </section>

          {/* Languages */}
          <section>
            <h3 className="text-lg font-semibold mb-4">Languages</h3>
            <div className="space-y-2">
              {candidate.languages.map((lang, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-sm">{lang.name}</span>
                  <span className="text-sm text-gray-600">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Personality Traits */}
          <section>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Brain className="h-5 w-5 mr-2 text-blue-600" />
              Personality
            </h3>
            <div className="space-y-3">
              {candidate.personality.map((trait, index) => {
                const Icon = personalityIcons[trait.trait as keyof typeof personalityIcons] || Brain;
                return (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <Icon className="h-4 w-4 text-gray-600" />
                        <span className="text-sm font-medium">{trait.trait}</span>
                      </div>
                      <Badge variant="outline" className={`text-xs ${
                        trait.level === 'High' ? 'border-green-200 text-green-800' :
                        trait.level === 'Medium' ? 'border-yellow-200 text-yellow-800' :
                        'border-red-200 text-red-800'
                      }`}>
                        {trait.level}
                      </Badge>
                    </div>
                    <Progress value={trait.score} className="h-1" />
                  </div>
                );
              })}
            </div>
          </section>

          {/* Test Scores */}
          <section>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
              Test Results
            </h3>
            <div className="space-y-3">
              {candidate.assessments.map((assessment, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">{assessment.name}</span>
                    <span className="text-sm font-semibold">{assessment.score}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">{assessment.completedDate}</span>
                    <Badge className={
                      assessment.status === 'completed' ? 'bg-green-100 text-green-800' :
                      assessment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }>
                      {assessment.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Applications
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Candidate Profile</h1>
                <p className="text-sm text-gray-600">Review detailed candidate information and assessment results</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download CV
              </Button>
              <Button variant="outline">
                <MessageSquare className="h-4 w-4 mr-2" />
                Send Message
              </Button>
              <Button>
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Interview
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Candidate Header Card */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8">
              <Avatar className="w-32 h-32">
                <AvatarImage src={candidate.avatar} alt={candidate.name} />
                <AvatarFallback className="text-2xl">
                  {candidate.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{candidate.name}</h2>
                    <p className="text-lg text-gray-700">{candidate.title}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {candidate.location}
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-1" />
                        {candidate.email}
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-1" />
                        {candidate.phone}
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Match Analysis */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-gray-900 mb-4">AI Match Analysis</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{candidate.matchScore.overall}%</div>
                      <p className="text-sm text-gray-600">Overall Match</p>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-semibold text-green-600">{candidate.matchScore.experience}%</div>
                      <p className="text-sm text-gray-600">Experience</p>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-semibold text-purple-600">{candidate.matchScore.talent}%</div>
                      <p className="text-sm text-gray-600">Talent</p>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-semibold text-orange-600">{candidate.matchScore.test}%</div>
                      <p className="text-sm text-gray-600">Test</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Progress value={candidate.matchScore.overall} className="h-2" />
                  </div>
                </div>

                {/* Links (Non-clickable for employer view) */}
                <div className="flex space-x-4 mt-4 text-sm text-gray-600">
                  {candidate.website && (
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-1" />
                      <span>{candidate.website}</span>
                    </div>
                  )}
                  {candidate.linkedin && (
                    <div className="flex items-center">
                      <Linkedin className="h-4 w-4 mr-1" />
                      <span>LinkedIn</span>
                    </div>
                  )}
                  {candidate.github && (
                    <div className="flex items-center">
                      <Github className="h-4 w-4 mr-1" />
                      <span>GitHub</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="assessments">Assessments</TabsTrigger>
            <TabsTrigger value="interviews">Interviews</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            {renderOverviewTab()}
          </TabsContent>

          <TabsContent value="assessments" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {candidate.assessments.map((assessment, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{assessment.name}</CardTitle>
                      <Badge className={
                        assessment.status === 'completed' ? 'bg-green-100 text-green-800' :
                        assessment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }>
                        {assessment.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-blue-600">{assessment.score}%</span>
                        <span className="text-sm text-gray-600">{assessment.completedDate}</span>
                      </div>
                      <Progress value={assessment.score} />
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <FileText className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="interviews" className="mt-6">
            <div className="space-y-4">
              {candidate.interviews.map((interview, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-semibold">{interview.round}</h4>
                        <p className="text-sm text-gray-600">
                          {interview.date} • Interviewer: {interview.interviewer}
                        </p>
                      </div>
                      <Badge className={
                        interview.status === 'completed' ? 'bg-green-100 text-green-800' :
                        interview.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }>
                        {interview.status}
                      </Badge>
                    </div>
                    {interview.feedback && (
                      <div className="bg-gray-50 p-3 rounded-lg mb-3">
                        <p className="text-sm text-gray-700">{interview.feedback}</p>
                      </div>
                    )}
                    {interview.rating && (
                      <div className="flex items-center space-x-1">
                        <span className="text-sm text-gray-600">Rating:</span>
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < interview.rating! ? 'text-yellow-500 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="documents" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Candidate Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-8 w-8 text-red-600" />
                      <div>
                        <h4 className="font-medium">Resume.pdf</h4>
                        <p className="text-sm text-gray-600">Updated Jan 20, 2024</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-8 w-8 text-blue-600" />
                      <div>
                        <h4 className="font-medium">Cover Letter.pdf</h4>
                        <p className="text-sm text-gray-600">Submitted Jan 24, 2024</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}