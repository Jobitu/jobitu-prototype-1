import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { 
  Bot,
  BarChart3,
  Zap,
  TrendingUp,
  Plus,
  Award,
  Target,
  Briefcase,
  GraduationCap,
  Edit,
  Code,
  Languages,
  Brain,
  BookOpen,
  TestTube
} from "lucide-react";
import profileImage from '../assets/default-profile.svg';

interface ProfileOverviewTabsProps {
  userData: any;
  isPreviewMode?: boolean;
  onViewFullProfile?: () => void;
}

const overviewTabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'projects', label: 'Projects' },
  { id: 'tests', label: 'Tests' },
  { id: 'languages', label: 'Languages' },
  { id: 'personality', label: 'Personality' }
];

export function ProfileOverviewTabs({ userData, isPreviewMode = false, onViewFullProfile }: ProfileOverviewTabsProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const handleAddExperience = () => {
    console.log('Add new work experience');
    // Add your existing add experience functionality here
  };

  const handleAddSkill = () => {
    console.log('Add new skill');
    // Add your existing add skill functionality here
  };

  const handleAddEducation = () => {
    console.log('Add new education');
    // Add your existing add education functionality here
  };

  const handleAddProject = () => {
    console.log('Add new project');
    // Add your existing add project functionality here
  };

  const handleAddTest = () => {
    console.log('Add new test');
    // Add your existing add test functionality here
  };

  const handleAddLanguage = () => {
    console.log('Add new language');
    // Add your existing add language functionality here
  };

  const handleAddPersonality = () => {
    console.log('Add new personality assessment');
    // Add your existing add personality functionality here
  };

  // Overview Tab Content
  const OverviewContent = () => (
    <div className="space-y-6">
      {/* Top Row Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* AI Career Coach */}
        <Card className="border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Bot className="h-5 w-5 text-blue-600" />
                <h3 className="font-medium">AI Career Coach</h3>
              </div>
              <BarChart3 className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              "Consider developing system design skills to reach your technical lead goals."
            </p>
            <Button variant="ghost" size="sm" className="p-0 h-auto">
              <Zap className="h-4 w-4 mr-2" />
              Get AI Insights
            </Button>
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

        {/* Quick Actions */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              <h3 className="font-medium">Quick Actions</h3>
            </div>
            <div className="space-y-3">
              <Button variant="outline" size="sm" className="w-full justify-start" onClick={handleAddProject}>
                <Plus className="h-4 w-4 mr-2" />
                Add Project
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start" onClick={handleAddTest}>
                <Award className="h-4 w-4 mr-2" />
                Take Skill Test
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Target className="h-4 w-4 mr-2" />
                Update Goals
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Experience Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div className="flex items-center space-x-2">
                <Briefcase className="h-5 w-5 text-muted-foreground" />
                <CardTitle>Experience</CardTitle>
              </div>
              <div className="flex items-center space-x-2">
                {!isPreviewMode && (
                  <>
                    <Button variant="ghost" size="sm" onClick={handleAddExperience}>
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </>
                )}
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
                    <p className="text-sm mt-2">Lead frontend development for a team of 5 developers, building React applications used by 100k+ users...</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-2 h-2 bg-muted rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <h4 className="font-medium">Frontend Developer</h4>
                    <p className="text-muted-foreground">InnovateTech</p>
                    <p className="text-sm text-muted-foreground">2020 - 2022</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div className="flex items-center space-x-2">
                <Code className="h-5 w-5 text-muted-foreground" />
                <CardTitle>Skills</CardTitle>
              </div>
              <div className="flex items-center space-x-2">
                {!isPreviewMode && (
                  <>
                    <Button variant="ghost" size="sm" onClick={handleAddSkill}>
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { name: 'React', level: 95 },
                  { name: 'TypeScript', level: 90 },
                  { name: 'JavaScript', level: 92 },
                  { name: 'Node.js', level: 85 }
                ].map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Projects Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div className="flex items-center space-x-2">
                <Code className="h-5 w-5 text-muted-foreground" />
                <CardTitle>Projects</CardTitle>
              </div>
              <div className="flex items-center space-x-2">
                {!isPreviewMode && (
                  <>
                    <Button variant="ghost" size="sm" onClick={handleAddProject}>
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-3">
                  <h4 className="font-medium mb-2">E-commerce Platform</h4>
                  <p className="text-sm text-muted-foreground mb-2">A full-stack e-commerce solution built with React and Node.js</p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs">React</Badge>
                    <Badge variant="secondary" className="text-xs">Node.js</Badge>
                    <Badge variant="secondary" className="text-xs">MongoDB</Badge>
                  </div>
                </div>
                <div className="border rounded-lg p-3">
                  <h4 className="font-medium mb-2">Task Management App</h4>
                  <p className="text-sm text-muted-foreground mb-2">Mobile-first task management application</p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs">React Native</Badge>
                    <Badge variant="secondary" className="text-xs">Firebase</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Education Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div className="flex items-center space-x-2">
                <GraduationCap className="h-5 w-5 text-muted-foreground" />
                <CardTitle>Education</CardTitle>
              </div>
              <div className="flex items-center space-x-2">
                {!isPreviewMode && (
                  <>
                    <Button variant="ghost" size="sm" onClick={handleAddEducation}>
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div>
                <h4 className="font-medium">Bachelor of Science in Computer Science</h4>
                <p className="text-muted-foreground">Stanford University</p>
                <p className="text-sm text-muted-foreground">Class of 2019 • GPA: 3.8/4.0</p>
                <p className="text-sm mt-2">Relevant coursework: Data Structures, Algorithms, Software Engineering</p>
              </div>
            </CardContent>
          </Card>

          {/* Tests Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div className="flex items-center space-x-2">
                <TestTube className="h-5 w-5 text-muted-foreground" />
                <CardTitle>Tests & Assessments</CardTitle>
              </div>
              <div className="flex items-center space-x-2">
                {!isPreviewMode && (
                  <>
                    <Button variant="ghost" size="sm" onClick={handleAddTest}>
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'JavaScript Assessment', score: 95, date: '2024-01-15', status: 'Passed' },
                  { name: 'React Certification', score: 88, date: '2024-01-20', status: 'Passed' }
                ].map((test, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{test.name}</h4>
                      <p className="text-sm text-muted-foreground">{test.date}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-green-600">{test.score}%</div>
                      <Badge variant="outline" className="text-xs">{test.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Languages Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div className="flex items-center space-x-2">
                <Languages className="h-5 w-5 text-muted-foreground" />
                <CardTitle>Languages</CardTitle>
              </div>
              <div className="flex items-center space-x-2">
                {!isPreviewMode && (
                  <>
                    <Button variant="ghost" size="sm" onClick={handleAddLanguage}>
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'English', proficiency: 'Native', level: 100 },
                  { name: 'Spanish', proficiency: 'Professional', level: 85 },
                  { name: 'French', proficiency: 'Conversational', level: 60 }
                ].map((language, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{language.name}</span>
                      <span className="text-sm text-muted-foreground">{language.proficiency}</span>
                    </div>
                    <Progress value={language.level} className="h-2" />
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
    switch (activeTab) {
      case 'overview':
        return <OverviewContent />;
      case 'experience':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="flex items-center">
                  <Briefcase className="h-5 w-5 mr-2" />
                  Work Experience
                </CardTitle>
                {!isPreviewMode && (
                  <Button variant="default" size="sm" onClick={handleAddExperience}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Experience
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border-l-2 border-blue-200 pl-4">
                    <h3 className="font-medium">Senior Frontend Developer</h3>
                    <p className="text-muted-foreground">TechFlow Inc. • 2022 - Present</p>
                    <p className="text-sm mt-2">Lead frontend development for a team of 5 developers, building React applications used by 100k+ users. Responsible for architecture decisions, code reviews, and mentoring junior developers.</p>
                  </div>
                  <div className="border-l-2 border-gray-200 pl-4">
                    <h3 className="font-medium">Frontend Developer</h3>
                    <p className="text-muted-foreground">InnovateTech • 2020 - 2022</p>
                    <p className="text-sm mt-2">Developed responsive web applications using React and TypeScript. Collaborated with design and backend teams to deliver high-quality user experiences.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case 'skills':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="flex items-center">
                  <Code className="h-5 w-5 mr-2" />
                  Technical Skills
                </CardTitle>
                {!isPreviewMode && (
                  <Button variant="default" size="sm" onClick={handleAddSkill}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Skill
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: 'React', level: 95 },
                    { name: 'TypeScript', level: 90 },
                    { name: 'JavaScript', level: 92 },
                    { name: 'Node.js', level: 85 },
                    { name: 'Python', level: 80 },
                    { name: 'SQL', level: 75 }
                  ].map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case 'education':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2" />
                  Education
                </CardTitle>
                {!isPreviewMode && (
                  <Button variant="default" size="sm" onClick={handleAddEducation}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Education
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Bachelor of Science in Computer Science</h3>
                    <p className="text-muted-foreground">Stanford University</p>
                    <p className="text-sm text-muted-foreground">Class of 2019 • GPA: 3.8/4.0</p>
                    <p className="text-sm mt-2">Relevant coursework: Data Structures, Algorithms, Software Engineering, Database Systems</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case 'projects':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="flex items-center">
                  <Code className="h-5 w-5 mr-2" />
                  Projects
                </CardTitle>
                {!isPreviewMode && (
                  <Button variant="default" size="sm" onClick={handleAddProject}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Project
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">E-commerce Platform</h3>
                    <p className="text-sm text-muted-foreground mb-3">A full-stack e-commerce solution built with React and Node.js</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">React</Badge>
                      <Badge variant="secondary">Node.js</Badge>
                      <Badge variant="secondary">MongoDB</Badge>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Task Management App</h3>
                    <p className="text-sm text-muted-foreground mb-3">Mobile-first task management application with real-time sync</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">React Native</Badge>
                      <Badge variant="secondary">Firebase</Badge>
                      <Badge variant="secondary">Redux</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case 'tests':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="flex items-center">
                  <TestTube className="h-5 w-5 mr-2" />
                  Skill Assessments
                </CardTitle>
                {!isPreviewMode && (
                  <Button variant="default" size="sm" onClick={handleAddTest}>
                    <Plus className="h-4 w-4 mr-1" />
                    Take Test
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'JavaScript Assessment', score: 95, date: '2024-01-15', status: 'Passed' },
                    { name: 'React Certification', score: 88, date: '2024-01-20', status: 'Passed' },
                    { name: 'TypeScript Test', score: 92, date: '2024-02-01', status: 'Passed' }
                  ].map((test, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{test.name}</h4>
                        <p className="text-sm text-muted-foreground">{test.date}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-green-600">{test.score}%</div>
                        <Badge variant="outline" className="text-xs">{test.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case 'languages':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="flex items-center">
                  <Languages className="h-5 w-5 mr-2" />
                  Languages
                </CardTitle>
                {!isPreviewMode && (
                  <Button variant="default" size="sm" onClick={handleAddLanguage}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Language
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'English', proficiency: 'Native', level: 100 },
                    { name: 'Spanish', proficiency: 'Professional', level: 85 },
                    { name: 'French', proficiency: 'Conversational', level: 60 }
                  ].map((language, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{language.name}</span>
                        <span className="text-sm text-muted-foreground">{language.proficiency}</span>
                      </div>
                      <Progress value={language.level} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case 'personality':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="flex items-center">
                  <Brain className="h-5 w-5 mr-2" />
                  Personality Assessment
                </CardTitle>
                {!isPreviewMode && (
                  <Button variant="default" size="sm" onClick={handleAddPersonality}>
                    <Plus className="h-4 w-4 mr-1" />
                    Take Assessment
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { trait: 'Leadership', score: 85, description: 'Strong leadership potential' },
                    { trait: 'Creativity', score: 92, description: 'Highly creative and innovative' },
                    { trait: 'Analytical', score: 88, description: 'Excellent analytical skills' },
                    { trait: 'Communication', score: 80, description: 'Good communication abilities' }
                  ].map((trait, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{trait.trait}</span>
                        <span className="text-sm font-medium">{trait.score}%</span>
                      </div>
                      <Progress value={trait.score} className="h-2" />
                      <p className="text-sm text-muted-foreground">{trait.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return <OverviewContent />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Inner Tab Navigation */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-1 overflow-x-auto">
          {overviewTabs.map((tab) => (
            <Button
              key={tab.id}
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-4 py-2 rounded-none border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 bg-blue-50/50'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-96">
        {renderTabContent()}
      </div>
    </div>
  );
}