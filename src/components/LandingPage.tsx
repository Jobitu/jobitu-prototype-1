import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { 
  Brain, 
  Search, 
  MapPin,
  Star,
  TrendingUp,
  Users,
  Zap,
  Target,
  CheckCircle,
  ArrowRight,
  Upload,
  Bell,
  Award,
  Play,
  Building,
  Calendar,
  Clock,
  Briefcase,
  Globe,
  Mail,
  Phone,
  Twitter,
  Linkedin,
  Github
} from "lucide-react";

interface LandingPageProps {
  onNavigateToAuth: () => void;
}

interface JobListing {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  tags: string[];
  postedTime: string;
  logo: string;
  featured?: boolean;
}

const mockJobs: JobListing[] = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechFlow Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    tags: ["React", "TypeScript", "Remote"],
    postedTime: "2 days ago",
    logo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=150&h=150&fit=crop",
    featured: true
  },
  {
    id: 2,
    title: "Product Manager",
    company: "StartupX",
    location: "New York, NY",
    type: "Full-time",
    tags: ["Product Strategy", "Analytics", "Hybrid"],
    postedTime: "1 day ago",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop"
  },
  {
    id: 3,
    title: "UX Designer",
    company: "DesignCorp",
    location: "Remote",
    type: "Contract",
    tags: ["Figma", "User Research", "Remote"],
    postedTime: "3 days ago",
    logo: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=150&h=150&fit=crop"
  },
  {
    id: 4,
    title: "Full Stack Engineer",
    company: "InnovateLab",
    location: "Austin, TX",
    type: "Full-time",
    tags: ["React", "Node.js", "AWS"],
    postedTime: "4 days ago",
    logo: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=150&h=150&fit=crop"
  },
  {
    id: 5,
    title: "Data Scientist",
    company: "AI Dynamics",
    location: "Seattle, WA",
    type: "Full-time",
    tags: ["Python", "ML", "Analytics"],
    postedTime: "5 days ago",
    logo: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop"
  },
  {
    id: 6,
    title: "DevOps Engineer",
    company: "CloudTech",
    location: "Denver, CO",
    type: "Full-time",
    tags: ["AWS", "Docker", "Kubernetes"],
    postedTime: "1 week ago",
    logo: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=150&h=150&fit=crop"
  }
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Frontend Developer",
    company: "TechFlow Inc.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop",
    quote: "I got hired within 2 weeks through Jobitu's matching system! The AI recommendations were spot-on.",
    rating: 5
  },
  {
    name: "Mike Rodriguez",
    role: "Product Manager",
    company: "StartupX",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    quote: "The platform's insights helped me understand exactly what skills I needed to develop for my dream role.",
    rating: 5
  },
  {
    name: "Emily Davis",
    role: "UX Designer",
    company: "DesignCorp",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    quote: "Finally, a job platform that actually understands what I'm looking for. The match scores are incredibly accurate.",
    rating: 5
  }
];

export function LandingPage({ onNavigateToAuth }: LandingPageProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 sticky top-0 z-40 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 w-8 h-8 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold">J</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Jobitu</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#jobs" className="text-gray-600 hover:text-gray-900 transition-colors">Jobs</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">How it Works</a>
              <a href="#employers" className="text-gray-600 hover:text-gray-900 transition-colors">For Employers</a>
              <Button variant="ghost" onClick={onNavigateToAuth}>Sign In</Button>
              <Button onClick={onNavigateToAuth}>Get Started</Button>
            </nav>
            <Button className="md:hidden" variant="ghost" onClick={onNavigateToAuth}>
              Menu
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section with AI Value */}
      <section className="bg-gradient-to-br from-blue-50 to-green-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                  <Brain className="h-3 w-3 mr-1" />
                  AI-Powered Job Matching
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Stop searching.
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    Start matching.
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Our AI analyzes thousands of jobs to find the perfect matches for your skills, 
                  experience, and career goals. No more endless scrolling through irrelevant listings.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" onClick={onNavigateToAuth} className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                  <Target className="h-5 w-5 mr-2" />
                  Get Your Match Score
                </Button>
                <Button size="lg" variant="outline" onClick={() => document.getElementById('jobs')?.scrollIntoView({ behavior: 'smooth' })}>
                  <Search className="h-5 w-5 mr-2" />
                  Browse Jobs
                </Button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-gray-600">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-blue-600" />
                  50k+ job seekers
                </div>
                <div className="flex items-center">
                  <Building className="h-4 w-4 mr-2 text-green-600" />
                  1000+ companies
                </div>
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2 text-purple-600" />
                  95% match accuracy
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">AI Analysis in Progress</h3>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Profile Analysis</span>
                    <Badge className="bg-green-100 text-green-800">Complete</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Skill Matching</span>
                    <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Career Optimization</span>
                    <Badge className="bg-purple-100 text-purple-800">Preparing</Badge>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm text-gray-600 mb-2">Ready to discover your matches?</p>
                  <Button onClick={onNavigateToAuth} className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                    Start Your Journey
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inline Job Listings Section */}
      <section id="jobs" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Discover Your Next Opportunity
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Browse through thousands of opportunities from top companies. Create your profile to unlock AI-powered matching.
            </p>
          </div>

          {/* Job Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockJobs.map((job) => (
              <Card 
                key={job.id} 
                className={`hover:shadow-lg transition-all duration-300 cursor-pointer group ${
                  job.featured ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
                }`}
                onClick={onNavigateToAuth}
              >
                <CardContent className="p-6">
                  {job.featured && (
                    <Badge className="bg-gradient-to-r from-blue-600 to-green-600 text-white mb-4">
                      <Star className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                  
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <Avatar className="w-12 h-12 mr-3">
                        <AvatarImage src={job.logo} alt={job.company} />
                        <AvatarFallback>{job.company.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {job.title}
                        </h3>
                        <p className="text-sm text-gray-600">{job.company}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {job.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Briefcase className="h-4 w-4 mr-2" />
                      {job.type}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      {job.postedTime}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {job.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button className="w-full group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    View Details
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" onClick={onNavigateToAuth} className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
              <Search className="h-5 w-5 mr-2" />
              View All {mockJobs.length}+ Jobs
            </Button>
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Loved by Job Seekers Worldwide
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of professionals who found their dream jobs through Jobitu
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-gradient-to-br from-blue-50 to-green-50">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {renderStars(testimonial.rating)}
                  </div>
                  <blockquote className="text-gray-700 mb-4 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center">
                    <Avatar className="w-10 h-10 mr-3">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role} at {testimonial.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How Jobitu Works
            </h2>
            <p className="text-xl text-gray-600">
              Get matched with your perfect job in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Upload className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Create Your Profile</h3>
              <p className="text-gray-600">
                Share your skills, experience, and career goals. Our AI instantly analyzes your professional background.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">2. AI Finds Your Matches</h3>
              <p className="text-gray-600">
                Our advanced algorithms match your profile against thousands of jobs and rank them by compatibility.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Bell className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Get Hired Faster</h3>
              <p className="text-gray-600">
                Apply with confidence knowing you're perfectly matched. Get notified about new opportunities instantly.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-gradient-to-r from-blue-600 to-green-600 w-16 h-16 rounded-full flex items-center justify-center">
                  <Play className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                See Jobitu in Action
              </h3>
              <p className="text-gray-600 mb-6">
                Watch our 30-second demo to see how AI-powered job matching can transform your career search.
              </p>
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                <Play className="h-5 w-5 mr-2" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Join Now Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-white space-y-6">
            <h2 className="text-4xl font-bold">
              Ready to Find Your Dream Job?
            </h2>
            <p className="text-xl text-blue-100">
              Thousands of candidates are getting matched daily. Join them and discover opportunities you never knew existed.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Button size="lg" variant="secondary" onClick={onNavigateToAuth}>
                Start Free
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <div className="flex items-center text-blue-100">
                <CheckCircle className="h-5 w-5 mr-2" />
                No credit card required
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pt-8 border-t border-blue-500">
              <div className="text-center">
                <div className="text-3xl font-bold">50,000+</div>
                <div className="text-blue-100">Active Job Seekers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">1,000+</div>
                <div className="text-blue-100">Partner Companies</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">95%</div>
                <div className="text-blue-100">Match Accuracy</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-blue-600 to-green-600 w-8 h-8 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold">J</span>
                </div>
                <span className="text-xl font-bold text-white">Jobitu</span>
              </div>
              <p className="text-gray-400">
                AI-powered job matching platform connecting talented professionals with their dream careers.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                  <Github className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">For Job Seekers</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Browse Jobs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Career Coaching</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Resume Builder</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Salary Insights</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">For Employers</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Post Jobs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Search Candidates</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Employer Branding</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Analytics</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              © 2024 Jobitu. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <div className="flex items-center text-gray-400">
                <Mail className="h-4 w-4 mr-2" />
                hello@jobitu.com
              </div>
              <div className="flex items-center text-gray-400">
                <Phone className="h-4 w-4 mr-2" />
                +1 (555) 123-4567
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}