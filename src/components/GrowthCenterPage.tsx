import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { Checkbox } from "./ui/checkbox";
import { 
  Target,
  TrendingUp,
  Brain,
  BookOpen,
  Play,
  CheckCircle,
  Clock,
  Star,
  Award,
  Lightbulb,
  MessageCircle,
  Plus,
  ArrowRight,
  BarChart3,
  Calendar,
  AlertTriangle,
  Zap,
  Trophy,
  Users,
  Video,
  FileText,
  Headphones,
  Bookmark,
  Filter,
  Search,
  MapPin,
  ExternalLink,
  Heart,
  ThumbsUp,
  Eye,
  Send,
  Bell,
  Settings,
  ChevronRight,
  Globe,
  Building,
  CheckSquare,
  Download,
  Link,
  Edit,
  TrendingDown,
  Calendar as CalendarIcon,
  X,
  Info,
  GraduationCap,
  Briefcase,
  Network,
  Handshake,
  Target as TargetIcon,
  Sparkles,
  BookMarked,
  Home,
  FileUser,
  PieChart,
  RotateCcw,
  ArrowUp,
  ArrowDown,
  Trash2
} from "lucide-react";
import { OnboardingData } from "./OnboardingFlow";

interface GrowthCenterPageProps {
  userData: OnboardingData;
  onBack: () => void;
  activeTab?: string;
}

interface Mentor {
  id: string;
  name: string;
  title: string;
  company: string;
  avatar: string;
  experience: string;
  expertise: string[];
  rating: number;
  responseRate: string;
  price: string;
  available: boolean;
  bio: string;
}

interface NetworkingEvent {
  id: string;
  title: string;
  type: 'virtual' | 'in-person';
  date: string;
  time: string;
  location: string;
  attendees: number;
  category: string;
  description: string;
  organizer: string;
  price: 'free' | 'paid';
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  progress: number;
  modules: number;
  skills: string[];
  provider: string;
  rating: number;
  enrolled: boolean;
}

const mockMentors: Mentor[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    title: 'Senior Engineering Manager',
    company: 'Google',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b67892d1?w=150&h=150&fit=crop',
    experience: '8+ years',
    expertise: ['Engineering Leadership', 'System Design', 'Team Building'],
    rating: 4.9,
    responseRate: '95%',
    price: '$120/hr',
    available: true,
    bio: 'Passionate about helping engineers grow into leadership roles. Led teams of 20+ at Google.'
  },
  {
    id: '2',
    name: 'David Rodriguez',
    title: 'Principal Software Engineer',
    company: 'Netflix',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    experience: '10+ years',
    expertise: ['Distributed Systems', 'Microservices', 'Performance'],
    rating: 4.8,
    responseRate: '88%',
    price: '$100/hr',
    available: false,
    bio: 'Expert in large-scale distributed systems. Built Netflix\'s content delivery infrastructure.'
  },
  {
    id: '3',
    name: 'Emily Johnson',
    title: 'VP of Product',
    company: 'Stripe',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    experience: '12+ years',
    expertise: ['Product Strategy', 'Growth Hacking', 'User Research'],
    rating: 4.9,
    responseRate: '92%',
    price: '$150/hr',
    available: true,
    bio: 'Product leader with expertise in fintech. Scaled Stripe\'s payments platform globally.'
  }
];

const mockNetworkingEvents: NetworkingEvent[] = [
  {
    id: '1',
    title: 'React & Next.js Developer Meetup',
    type: 'in-person',
    date: '2024-02-15',
    time: '18:00',
    location: 'San Francisco, CA',
    attendees: 124,
    category: 'Frontend Development',
    description: 'Join fellow React developers to discuss the latest in React 18 and Next.js 14.',
    organizer: 'SF React Developers',
    price: 'free'
  },
  {
    id: '2',
    title: 'Tech Career Fair - Startup Edition',
    type: 'virtual',
    date: '2024-02-20',
    time: '14:00',
    location: 'Online',
    attendees: 450,
    category: 'Career Development',
    description: 'Connect with hiring managers from 50+ tech startups. Virtual networking and interviews.',
    organizer: 'TechCareers',
    price: 'free'
  },
  {
    id: '3',
    title: 'Women in Tech Leadership Summit',
    type: 'in-person',
    date: '2024-02-28',
    time: '09:00',
    location: 'New York, NY',
    attendees: 280,
    category: 'Leadership',
    description: 'A full-day conference featuring top women leaders in technology.',
    organizer: 'WomenTech Network',
    price: 'paid'
  }
];

const mockLearningPaths: LearningPath[] = [
  {
    id: '1',
    title: 'Full-Stack JavaScript Developer',
    description: 'Master modern JavaScript development from frontend to backend',
    difficulty: 'intermediate',
    duration: '12 weeks',
    progress: 65,
    modules: 8,
    skills: ['React', 'Node.js', 'MongoDB', 'Express'],
    provider: 'TechAcademy',
    rating: 4.8,
    enrolled: true
  },
  {
    id: '2',
    title: 'System Design Mastery',
    description: 'Learn to design large-scale distributed systems like a senior engineer',
    difficulty: 'advanced',
    duration: '8 weeks',
    progress: 30,
    modules: 6,
    skills: ['System Architecture', 'Scalability', 'Database Design'],
    provider: 'DesignGuru',
    rating: 4.9,
    enrolled: true
  },
  {
    id: '3',
    title: 'Tech Leadership Fundamentals',
    description: 'Transition from individual contributor to effective tech leader',
    difficulty: 'intermediate',
    duration: '6 weeks',
    progress: 0,
    modules: 5,
    skills: ['Team Management', 'Communication', 'Decision Making'],
    provider: 'LeadershipTech',
    rating: 4.7,
    enrolled: false
  }
];

export function GrowthCenterPage({ 
  userData, 
  onBack, 
  activeTab = 'overview' 
}: GrowthCenterPageProps) {
  const [showGoalDialog, setShowGoalDialog] = useState(false);
  const [showMentorDialog, setShowMentorDialog] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [showPlanBuilderDialog, setShowPlanBuilderDialog] = useState(false);
  const [showDefaultViewDialog, setShowDefaultViewDialog] = useState(false);
  const [showResourceDetailDialog, setShowResourceDetailDialog] = useState(false);
  const [selectedResource, setSelectedResource] = useState<LearningPath | null>(null);
  const [showAssessmentDetailDialog, setShowAssessmentDetailDialog] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState<any>(null);
  const [showEventDetailDialog, setShowEventDetailDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<NetworkingEvent | null>(null);
  const [showMentorPackagesDialog, setShowMentorPackagesDialog] = useState(false);
  const [careerGoal, setCareerGoal] = useState("Senior Frontend Engineer");
  const [goalMilestones, setGoalMilestones] = useState([
    { id: 1, title: "Complete System Design Course", completed: true },
    { id: 2, title: "Get AWS Certification", completed: false },
    { id: 3, title: "Lead a Team Project", completed: false },
    { id: 4, title: "Mentor Junior Developer", completed: false }
  ]);
  const [isDefaultView, setIsDefaultView] = useState(false);
  const [learningPlan, setLearningPlan] = useState([
    {
      id: '1',
      title: 'System Design Fundamentals',
      skill: 'System Design',
      type: 'Course',
      duration: '4 weeks',
      dueDate: '2024-03-15',
      status: 'In Progress',
      linkedAssessment: 'System Design Assessment'
    },
    {
      id: '2',
      title: 'Advanced React Patterns',
      skill: 'React',
      type: 'Learning Path',
      duration: '6 weeks',
      dueDate: '2024-03-30',
      status: 'Not Started',
      linkedAssessment: 'React Advanced Assessment'
    }
  ]);
  const [resourceFilters, setResourceFilters] = useState({
    type: 'all',
    category: 'all',
    difficulty: 'all'
  });
  const [planViewMode, setPlanViewMode] = useState('cards'); // 'cards' or 'table'

  const growthScore = 78;
  const completedCourses = 12;
  const skillGaps = 3;
  const networkingConnections = 45;
  const mentoringSessions = 8;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${i < Math.floor(rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const MentorCard = ({ mentor }: { mentor: Mentor }) => {
    const [sessionHistory, setSessionHistory] = useState([
      {
        id: '1',
        date: '2024-01-15',
        topic: 'System Design Review',
        actionItems: ['Practice database sharding', 'Study load balancing patterns'],
        feedback: 'Great improvement in understanding distributed systems. Focus on scalability patterns next.',
        resources: ['Database Sharding Guide', 'Load Balancing Best Practices']
      }
    ]);

    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4 mb-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={mentor.avatar} alt={mentor.name} />
              <AvatarFallback>{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold">{mentor.name}</h3>
              <p className="text-sm text-gray-600 mb-1">{mentor.title}</p>
              <p className="text-sm text-gray-500 mb-2">{mentor.company} • {mentor.experience}</p>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  {renderStars(mentor.rating)}
                  <span className="text-xs text-gray-500">{mentor.rating}</span>
                </div>
                <div className={`w-2 h-2 rounded-full ${mentor.available ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-xs text-gray-500">
                  {mentor.available ? 'Available' : 'Busy'}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium">{mentor.price}</p>
              <p className="text-xs text-gray-500">{mentor.responseRate} response</p>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {mentor.expertise.slice(0, 3).map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-xs">{skill}</Badge>
              ))}
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{mentor.bio}</p>
          
          {/* Session Packages */}
          <div className="mb-4">
            <p className="text-sm font-medium mb-2">Available Packages:</p>
            <div className="space-y-1">
              {[
                { name: 'System Design Coaching', duration: '60 min', price: '$120' },
                { name: 'Career Guidance Session', duration: '45 min', price: '$90' },
                { name: 'Technical Interview Prep', duration: '90 min', price: '$180' }
              ].map((pkg, index) => (
                <div key={index} className="flex justify-between items-center text-xs bg-gray-50 p-2 rounded">
                  <span>{pkg.name} ({pkg.duration})</span>
                  <span className="font-medium">{pkg.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Previous Sessions */}
          {sessionHistory.length > 0 && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-medium text-blue-800 mb-2">Previous Session</p>
              <p className="text-xs text-blue-700 mb-1">{sessionHistory[0].topic} - {sessionHistory[0].date}</p>
              <p className="text-xs text-blue-600 mb-2">{sessionHistory[0].feedback}</p>
              <div className="flex flex-wrap gap-1">
                {sessionHistory[0].actionItems.slice(0, 2).map((item, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs text-blue-600 border-blue-300">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex space-x-2">
            <Button 
              className="flex-1" 
              disabled={!mentor.available}
              onClick={() => {
                setSelectedMentor(mentor);
                setShowMentorPackagesDialog(true);
              }}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Book Session
            </Button>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const EventCard = ({ event }: { event: NetworkingEvent }) => {
    const isRelatedToGoal = event.category === 'Frontend Development' || event.category === 'Leadership';
    const [isRSVPd, setIsRSVPd] = useState(false);
    const [eventNotes, setEventNotes] = useState('');
    
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="font-semibold">{event.title}</h3>
                {isRelatedToGoal && (
                  <Badge variant="default" className="text-xs bg-orange-100 text-orange-700 border-orange-200">
                    Related to Your Plan
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-3 w-3" />
                  <span>{event.location}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
                <Users className="h-3 w-3" />
                <span>{event.attendees} attending</span>
                <Badge variant={event.price === 'free' ? 'secondary' : 'outline'} className="text-xs">
                  {event.price}
                </Badge>
              </div>
              
              {/* Key Attendees */}
              <div className="mb-3">
                <p className="text-xs text-gray-600 mb-1">Key Attendees:</p>
                <div className="flex items-center space-x-2">
                  {['Sarah Chen (Google)', 'Mike Johnson (Netflix)'].map((attendee, index) => (
                    <Badge key={index} variant="outline" className="text-xs cursor-pointer hover:bg-blue-50">
                      {attendee}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <Badge variant={event.type === 'virtual' ? 'default' : 'outline'}>
              {event.type}
            </Badge>
          </div>
          
          <p className="text-sm text-gray-600 mb-4">{event.description}</p>
          
          {isRSVPd && (
            <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm font-medium text-green-800 mb-2">✓ You're attending this event</p>
              <Textarea
                placeholder="Add notes about what you learned..."
                value={eventNotes}
                onChange={(e) => setEventNotes(e.target.value)}
                className="text-sm"
              />
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">by {event.organizer}</span>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline">
                <Bookmark className="h-3 w-3" />
              </Button>
              {isRSVPd ? (
                <Button size="sm" variant="outline">
                  <Download className="h-3 w-3 mr-1" />
                  Add to Calendar
                </Button>
              ) : (
                <Button size="sm" onClick={() => setIsRSVPd(true)}>
                  RSVP
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const LearningPathCard = ({ path }: { path: LearningPath }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-semibold mb-2">{path.title}</h3>
            <p className="text-sm text-gray-600 mb-3">{path.description}</p>
            
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{path.duration}</span>
              </div>
              <div className="flex items-center space-x-1">
                <BookOpen className="h-3 w-3" />
                <span>{path.modules} modules</span>
              </div>
              <Badge variant="outline" className="text-xs capitalize">
                {path.difficulty}
              </Badge>
            </div>
            
            {path.enrolled && (
              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Progress</span>
                  <span className="text-sm font-medium">{path.progress}%</span>
                </div>
                <Progress value={path.progress} className="h-2" />
              </div>
            )}
            
            <div className="flex flex-wrap gap-1 mb-3">
              {path.skills.slice(0, 4).map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-xs">{skill}</Badge>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">{path.provider}</span>
            <div className="flex items-center space-x-1">
              {renderStars(path.rating)}
              <span className="text-xs text-gray-500">{path.rating}</span>
            </div>
          </div>
          
          <div className="flex space-x-2">
            {path.enrolled ? (
              <Button size="sm">
                <Play className="h-3 w-3 mr-1" />
                Continue
              </Button>
            ) : (
              <Button size="sm" variant="outline">
                Enroll
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'learning-resources':
        return renderLearningResources();
      case 'networking':
        return renderNetworking();
      case 'skill-development':
        return renderSkillDevelopment();
      case 'mentorship':
        return renderMentorship();
      default:
        return renderOverview();
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Default View Toggle */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Home className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium">Make Growth Center your default view</p>
                <p className="text-sm text-gray-600">Start each session with your career development dashboard</p>
              </div>
            </div>
            <Switch 
              checked={isDefaultView} 
              onCheckedChange={setIsDefaultView}
            />
          </div>
        </CardContent>
      </Card>

      {/* AI Suggestion Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-100 p-2 rounded-full">
              <Brain className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2">🎯 AI Recommendation</h3>
              <p className="text-gray-700 mb-3">
                Based on your recent interview feedback, focusing on <strong>System Design</strong> could 
                significantly boost your chances for senior roles. Start with our curated learning path.
              </p>
              <Button size="sm" className="mr-3">
                <ArrowRight className="h-4 w-4 mr-1" />
                Start Learning
              </Button>
              <Button size="sm" variant="outline">
                <MessageCircle className="h-4 w-4 mr-1" />
                Get Mentor
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Goal Tracking */}
      {careerGoal && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <TargetIcon className="h-5 w-5 mr-2 text-orange-500" />
                Career Goal Progress
              </div>
              <Button size="sm" variant="outline" onClick={() => setShowGoalDialog(true)}>
                <Edit className="h-4 w-4 mr-1" />
                Edit Goal
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <h4 className="font-medium text-lg mb-2">{careerGoal}</h4>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-orange-500 h-2 rounded-full" 
                  style={{ width: `${(goalMilestones.filter(m => m.completed).length / goalMilestones.length) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {goalMilestones.filter(m => m.completed).length} of {goalMilestones.length} milestones completed
              </p>
            </div>
            <div className="space-y-2">
              {goalMilestones.map((milestone) => (
                <div key={milestone.id} className="flex items-center space-x-3">
                  <Checkbox 
                    checked={milestone.completed} 
                    onCheckedChange={() => {
                      setGoalMilestones(prev => 
                        prev.map(m => m.id === milestone.id ? { ...m, completed: !m.completed } : m)
                      );
                    }}
                  />
                  <span className={milestone.completed ? "line-through text-gray-500" : ""}>{milestone.title}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Employer Feedback Widget */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageCircle className="h-5 w-5 mr-2 text-blue-500" />
            Feedback from Employers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-medium text-green-700 mb-2 flex items-center">
                <CheckCircle className="h-4 w-4 mr-1" />
                Strengths
              </h4>
              <ul className="text-sm space-y-1">
                <li>• Strong React expertise</li>
                <li>• Excellent problem-solving</li>
                <li>• Great communication skills</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-orange-700 mb-2 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-1" />
                Areas to Improve
              </h4>
              <ul className="text-sm space-y-1">
                <li>• System design knowledge</li>
                <li>• Leadership experience</li>
                <li>• Database optimization</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-700 mb-2 flex items-center">
                <Lightbulb className="h-4 w-4 mr-1" />
                Suggested Resources
              </h4>
              <ul className="text-sm space-y-1">
                <li>• System Design Course</li>
                <li>• Leadership Workshop</li>
                <li>• Database Performance Guide</li>
              </ul>
            </div>
          </div>
          <div className="flex space-x-2 mt-4">
            <Button size="sm" variant="outline">
              <ExternalLink className="h-4 w-4 mr-1" />
              Open Related Application
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add to Learning Plan
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Learning Plan Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <BookMarked className="h-5 w-5 mr-2 text-purple-500" />
              Your Learning Plan Summary
            </div>
            <Button size="sm" variant="outline">
              <ArrowRight className="h-4 w-4 mr-1" />
              Continue Plan
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-medium mb-2">Required Skills</h4>
              <div className="flex flex-wrap gap-1">
                {['System Design', 'Leadership', 'AWS'].map((skill) => (
                  <Badge key={skill} variant="outline" className="text-xs">{skill}</Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Recommended Paths</h4>
              <p className="text-sm text-gray-600">3 active learning paths</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Next Assessment</h4>
              <p className="text-sm text-gray-600">System Design - Due in 5 days</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Best Action Card */}
      <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="bg-orange-100 p-2 rounded-full">
              <Zap className="h-5 w-5 text-orange-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2">⚡ Next Best Actions</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                  <div>
                    <p className="font-medium">Complete System Design Assessment</p>
                    <p className="text-sm text-gray-600">Based on employer feedback and learning plan</p>
                  </div>
                  <Button size="sm">Start Now</Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                  <div>
                    <p className="font-medium">Book mentor session with Sarah Chen</p>
                    <p className="text-sm text-gray-600">System Design expertise - Available today</p>
                  </div>
                  <Button size="sm" variant="outline">Book Session</Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
              Recent Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: 'Completed React Advanced Patterns', type: 'Course', date: '2 days ago' },
                { title: 'System Design Assessment - 85%', type: 'Assessment', date: '1 week ago' },
                { title: 'Connected with 5 new professionals', type: 'Networking', date: '1 week ago' },
                { title: 'React Meetup - Learned about Next.js 14', type: 'Event Learning', date: '1 week ago' }
              ].map((achievement, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{achievement.title}</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Badge variant="secondary" className="text-xs">{achievement.type}</Badge>
                      <span>{achievement.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Skill Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-blue-500" />
              Skill Development
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { skill: 'React Development', level: 85, change: '+5' },
                { skill: 'System Design', level: 65, change: '+15' },
                { skill: 'Leadership', level: 70, change: '+10' },
                { skill: 'Problem Solving', level: 90, change: '+2' }
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{item.skill}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-green-600">{item.change}</span>
                      <span className="text-sm text-gray-600">{item.level}%</span>
                    </div>
                  </div>
                  <Progress value={item.level} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderLearningResources = () => (
    <div className="space-y-6">
      {/* Plan Builder and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <Button 
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white"
              onClick={() => setShowPlanBuilderDialog(true)}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Build or Refresh My Plan
            </Button>
            <div className="flex items-center space-x-2">
              <Button
                variant={planViewMode === 'cards' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPlanViewMode('cards')}
              >
                Cards
              </Button>
              <Button
                variant={planViewMode === 'table' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPlanViewMode('table')}
              >
                Plan View
              </Button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Search learning paths..." className="pl-10" />
            </div>
            <Select value={resourceFilters.type} onValueChange={(value) => setResourceFilters(prev => ({...prev, type: value}))}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="paths">Learning Paths</SelectItem>
                <SelectItem value="courses">Courses</SelectItem>
                <SelectItem value="articles">Articles</SelectItem>
                <SelectItem value="videos">Videos</SelectItem>
                <SelectItem value="practice">Practice</SelectItem>
              </SelectContent>
            </Select>
            <Select value={resourceFilters.category} onValueChange={(value) => setResourceFilters(prev => ({...prev, category: value}))}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="technical">Technical Skills</SelectItem>
                <SelectItem value="soft">Soft Skills</SelectItem>
                <SelectItem value="leadership">Leadership</SelectItem>
                <SelectItem value="interview">Interview Prep</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* CV Parsing Integration */}
      <Card className="bg-gradient-to-r from-green-50 to-teal-50 border-green-200">
        <CardContent className="p-4">
          <div className="flex items-start space-x-4">
            <FileUser className="h-5 w-5 text-green-600 mt-1" />
            <div className="flex-1">
              <h4 className="font-medium mb-2">Recommended for You (Based on CV)</h4>
              <p className="text-sm text-gray-600 mb-3">
                We analyzed your uploaded CV and found skills that could be enhanced with these resources:
              </p>
              <div className="flex flex-wrap gap-2">
                {['Advanced JavaScript Patterns', 'Microservices Architecture', 'Team Leadership Essentials'].map((resource) => (
                  <Badge key={resource} variant="outline" className="text-xs cursor-pointer hover:bg-green-100">
                    {resource}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {planViewMode === 'table' ? (
        /* Plan View Table */
        <Card>
          <CardHeader>
            <CardTitle>My Learning Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">Resource Name</th>
                    <th className="text-left p-3">Skill</th>
                    <th className="text-left p-3">Type</th>
                    <th className="text-left p-3">Duration</th>
                    <th className="text-left p-3">Due Date</th>
                    <th className="text-left p-3">Status</th>
                    <th className="text-left p-3">Assessment</th>
                    <th className="text-left p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {learningPlan.map((item, index) => (
                    <tr key={item.id} className="border-b">
                      <td className="p-3 font-medium">{item.title}</td>
                      <td className="p-3">
                        <Badge variant="secondary" className="text-xs">{item.skill}</Badge>
                      </td>
                      <td className="p-3">{item.type}</td>
                      <td className="p-3">{item.duration}</td>
                      <td className="p-3">{item.dueDate}</td>
                      <td className="p-3">
                        <Badge variant={item.status === 'In Progress' ? 'default' : 'outline'} className="text-xs">
                          {item.status}
                        </Badge>
                      </td>
                      <td className="p-3 text-sm text-blue-600 cursor-pointer">{item.linkedAssessment}</td>
                      <td className="p-3">
                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline">
                            <ArrowUp className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <ArrowDown className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <CheckCircle className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ) : (
        /* Learning Paths Cards */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockLearningPaths.map((path) => (
            <LearningPathCard key={path.id} path={path} />
          ))}
        </div>
      )}
    </div>
  );

  const renderNetworking = () => (
    <div className="space-y-6">
      {/* Upcoming Events */}
      <div>
        <h3 className="font-semibold mb-4">Upcoming Networking Events</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockNetworkingEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );

  const renderSkillDevelopment = () => (
    <div className="space-y-6">
      {/* Performance Insights */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center">
            <PieChart className="h-5 w-5 mr-2 text-blue-600" />
            Performance Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-medium text-green-700 mb-2">Strongest Skills</h4>
              <ul className="text-sm space-y-1">
                <li>• React Development (92%)</li>
                <li>• JavaScript ES6+ (85%)</li>
                <li>• Problem Solving (90%)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-orange-700 mb-2">Areas to Focus</h4>
              <ul className="text-sm space-y-1">
                <li>• System Design (78%)</li>
                <li>• Database Optimization (65%)</li>
                <li>• Microservices (70%)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-700 mb-2">Suggested Next Practice</h4>
              <div className="space-y-1">
                <Button size="sm" variant="outline" className="w-full justify-start">
                  <ArrowRight className="h-3 w-3 mr-1" />
                  Advanced System Design
                </Button>
                <Button size="sm" variant="outline" className="w-full justify-start">
                  <ArrowRight className="h-3 w-3 mr-1" />
                  Database Performance
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recommended Assessments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="h-5 w-5 mr-2 text-yellow-500" />
              Recommended Assessments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { 
                  title: 'System Design Advanced', 
                  duration: '90 min', 
                  difficulty: 'Expert', 
                  recommended: true, 
                  reason: 'Based on learning plan',
                  type: 'practice'
                },
                { 
                  title: 'Leadership Assessment', 
                  duration: '45 min', 
                  difficulty: 'Intermediate', 
                  recommended: true, 
                  reason: 'Career goal alignment',
                  type: 'practice'
                }
              ].map((assessment, index) => (
                <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">{assessment.title}</h4>
                        {assessment.recommended && (
                          <Badge variant="default" className="text-xs bg-orange-100 text-orange-700 border-orange-200">
                            Recommended
                          </Badge>
                        )}
                        <Badge variant="outline" className="text-xs capitalize">
                          {assessment.type}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-1">{assessment.reason}</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Clock className="h-3 w-3" />
                        <span>{assessment.duration}</span>
                        <Badge variant="outline" className="text-xs">{assessment.difficulty}</Badge>
                      </div>
                    </div>
                    <Button size="sm" onClick={() => {
                      setSelectedAssessment(assessment);
                      setShowAssessmentDetailDialog(true);
                    }}>
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Available Assessments */}
        <Card>
          <CardHeader>
            <CardTitle>Available Assessments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: 'JavaScript Fundamentals', duration: '45 min', difficulty: 'Intermediate', type: 'practice' },
                { title: 'React Development', duration: '60 min', difficulty: 'Advanced', type: 'practice' },
                { title: 'Frontend Assessment', duration: '120 min', difficulty: 'Advanced', type: 'employer-assigned', company: 'TechCorp' }
              ].map((assessment, index) => (
                <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium">{assessment.title}</h4>
                        <Badge 
                          variant={assessment.type === 'employer-assigned' ? 'default' : 'outline'} 
                          className="text-xs"
                        >
                          {assessment.type === 'employer-assigned' ? 'Assigned by Employer' : 'Practice'}
                        </Badge>
                      </div>
                      {assessment.company && (
                        <p className="text-xs text-blue-600 mb-1">Assigned by {assessment.company} - View Application</p>
                      )}
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Clock className="h-3 w-3" />
                        <span>{assessment.duration}</span>
                        <Badge variant="outline" className="text-xs">{assessment.difficulty}</Badge>
                      </div>
                    </div>
                    <Button size="sm">
                      Start Assessment
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assessment History */}
      <Card>
        <CardHeader>
          <CardTitle>Assessment History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { title: 'React Advanced Patterns', score: 92, date: '2024-01-18', status: 'Excellent', weakestSkills: ['State Management'], strongestSkills: ['Hooks', 'Context API'] },
              { title: 'System Design Basics', score: 78, date: '2024-01-15', status: 'Good', weakestSkills: ['Scalability', 'Caching'], strongestSkills: ['Database Design'] },
              { title: 'JavaScript ES6+', score: 85, date: '2024-01-10', status: 'Very Good', weakestSkills: ['Async/Await'], strongestSkills: ['Destructuring', 'Arrow Functions'] }
            ].map((assessment, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{assessment.title}</h4>
                  <div className="flex items-center space-x-2">
                    <Badge variant={assessment.score >= 90 ? 'default' : assessment.score >= 80 ? 'secondary' : 'outline'}>
                      {assessment.status}
                    </Badge>
                    <Button size="sm" variant="outline">
                      Review Results
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <span>Score: {assessment.score}%</span>
                  <span>{new Date(assessment.date).toLocaleDateString()}</span>
                </div>
                <Progress value={assessment.score} className="h-2 mb-3" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="font-medium text-red-600 mb-1">Areas to improve:</p>
                    <div className="flex flex-wrap gap-1">
                      {assessment.weakestSkills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs text-red-600 border-red-200">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-green-600 mb-1">Strong areas:</p>
                    <div className="flex flex-wrap gap-1">
                      {assessment.strongestSkills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs text-green-600 border-green-200">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderMentorship = () => (
    <div className="space-y-6">
      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search mentors..." className="pl-10 w-80" />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Become a Mentor
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Mentors Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockMentors.map((mentor) => (
          <MentorCard key={mentor.id} mentor={mentor} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold">Growth Center</h1>
              <p className="text-muted-foreground mt-1">
                AI-powered career development and skill enhancement
              </p>
            </div>
            <Button onClick={() => setShowGoalDialog(true)}>
              <Target className="h-4 w-4 mr-2" />
              Set Career Goal
            </Button>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Growth Score</p>
                    <p className="text-2xl font-bold text-blue-600">{growthScore}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Courses</p>
                    <p className="text-2xl font-bold text-green-600">{completedCourses}</p>
                  </div>
                  <BookOpen className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Skill Gaps</p>
                    <p className="text-2xl font-bold text-orange-600">{skillGaps}</p>
                  </div>
                  <Target className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Connections</p>
                    <p className="text-2xl font-bold text-purple-600">{networkingConnections}</p>
                  </div>
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Mentoring</p>
                    <p className="text-2xl font-bold text-indigo-600">{mentoringSessions}</p>
                  </div>
                  <MessageCircle className="h-8 w-8 text-indigo-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {renderContent()}
      </div>

      {/* Goal Setting Dialog */}
      <Dialog open={showGoalDialog} onOpenChange={setShowGoalDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Set Career Goal</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input placeholder="Enter your career goal..." />
            <Input placeholder="Target timeline..." />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowGoalDialog(false)}>
                Cancel
              </Button>
              <Button>
                Set Goal
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Mentor Booking Dialog */}
      <Dialog open={showMentorDialog} onOpenChange={setShowMentorDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Book Mentoring Session</DialogTitle>
          </DialogHeader>
          {selectedMentor && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={selectedMentor.avatar} alt={selectedMentor.name} />
                  <AvatarFallback>{selectedMentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">{selectedMentor.name}</h4>
                  <p className="text-sm text-gray-600">{selectedMentor.title}</p>
                </div>
              </div>
              <Input placeholder="Session topic..." />
              <Input type="datetime-local" />
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowMentorDialog(false)}>
                  Cancel
                </Button>
                <Button>
                  Book Session
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}