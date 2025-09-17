import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { 
  ArrowLeft
} from "lucide-react";
import { OnboardingData } from "./OnboardingFlow";
import { SecondaryTabNavigation } from "./SecondaryTabNavigation";


interface CareerProfilePageProps {
  userData: OnboardingData;
  onBack: () => void;
  onSave: (data: OnboardingData) => void;
  isPreviewMode?: boolean;
  viewerType?: 'candidate' | 'employer';
  activeSubTab?: string;
  onViewFullProfile?: () => void;
}

interface PersonalityTrait {
  name: string;
  score: number;
  level: 'Low' | 'Medium' | 'High';
  description: string;
  icon: any;
  color: string;
  roleCompatibility: string[];
  strengths: string[];
  risks: string[];
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: any;
  category: 'Performance' | 'Engagement' | 'Skills' | 'Milestones';
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  dateEarned: string;
  progress?: number;
  maxProgress?: number;
  unlocked: boolean;
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

export function CareerProfilePage({ 
  userData, 
  onBack, 
  onSave, 
  isPreviewMode = false,
  viewerType = 'candidate',
  activeSubTab = 'overview',
  onViewFullProfile
}: CareerProfilePageProps) {
  const [currentTab, setCurrentTab] = useState(activeSubTab);
  const [showEditBio, setShowEditBio] = useState(false);
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [showAddExperience, setShowAddExperience] = useState(false);
  const [showAddEducation, setShowAddEducation] = useState(false);
  const [showMatchReadiness, setShowMatchReadiness] = useState(false);
  
  // Ensure userData has proper defaults to prevent type errors
  const [profileData, setProfileData] = useState<OnboardingData>({
    ...userData,
    skills: Array.isArray(userData.skills) ? userData.skills : [],
    workExperience: Array.isArray(userData.workExperience) ? userData.workExperience : [],
    education: Array.isArray(userData.education) ? userData.education : [],
  });
  
  const [tempBio, setTempBio] = useState(userData.bio || '');
  const [openToWork, setOpenToWork] = useState(true);
  const [verifiedProfile, setVerifiedProfile] = useState(true);
  
  const [newSkill, setNewSkill] = useState({ name: '', level: 50 });
  const [newExperience, setNewExperience] = useState({
    title: '',
    company: '',
    duration: '',
    description: ''
  });
  const [newEducation, setNewEducation] = useState({
    degree: '',
    school: '',
    year: '',
    description: ''
  });

  const handleSaveBio = () => {
    const updatedData = { ...profileData, bio: tempBio };
    setProfileData(updatedData);
    onSave(updatedData);
    setShowEditBio(false);
  };

  const handleAddSkill = () => {
    if (newSkill.name.trim()) {
      const currentSkills = Array.isArray(profileData.skills) ? profileData.skills : [];
      const updatedData = {
        ...profileData,
        skills: [...currentSkills, newSkill]
      };
      setProfileData(updatedData);
      onSave(updatedData);
      setNewSkill({ name: '', level: 50 });
      setShowAddSkill(false);
    }
  };

  const handleAddExperience = () => {
    if (newExperience.title.trim() && newExperience.company.trim()) {
      const currentExperience = Array.isArray(profileData.workExperience) ? profileData.workExperience : [];
      const updatedData = {
        ...profileData,
        workExperience: [...currentExperience, newExperience]
      };
      setProfileData(updatedData);
      onSave(updatedData);
      setNewExperience({ title: '', company: '', duration: '', description: '' });
      setShowAddExperience(false);
    }
  };

  const handleAddEducation = () => {
    if (newEducation.degree.trim() && newEducation.school.trim()) {
      const currentEducation = Array.isArray(profileData.education) ? profileData.education : [];
      const updatedData = {
        ...profileData,
        education: [...currentEducation, newEducation]
      };
      setProfileData(updatedData);
      onSave(updatedData);
      setNewEducation({ degree: '', school: '', year: '', description: '' });
      setShowAddEducation(false);
    }
  };

  // Safe array access helpers
  const safeSkills = Array.isArray(profileData.skills) ? profileData.skills : [];
  const safeWorkExperience = Array.isArray(profileData.workExperience) ? profileData.workExperience : [];
  const safeEducation = Array.isArray(profileData.education) ? profileData.education : [];

  // Page-level header
  const PageHeader = () => (
    <div className="flex items-center justify-between mb-6 pb-4 border-b">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-xl">Career Profile</h1>
          <p className="text-sm text-muted-foreground">Manage your professional profile</p>
        </div>
      </div>
    </div>
  );









  return (
    <div>
      <div className="max-w-6xl mx-auto p-6">
        <PageHeader />
      </div>
      <SecondaryTabNavigation
        currentPage="careerProfile"
        onTabChange={setCurrentTab}
        userType="candidate"
        activeTab={currentTab}
        userData={profileData}
        isPreviewMode={isPreviewMode}
        onViewFullProfile={onViewFullProfile}
      />

      {/* Edit Bio Dialog */}
      <Dialog open={showEditBio} onOpenChange={setShowEditBio}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Bio</DialogTitle>
            <DialogDescription>
              Tell potential employers about yourself in a few sentences.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              value={tempBio}
              onChange={(e) => setTempBio(e.target.value)}
              placeholder="Write a brief bio about yourself..."
              className="min-h-24"
            />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowEditBio(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveBio}>
                Save Bio
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Skill Dialog */}
      <Dialog open={showAddSkill} onOpenChange={setShowAddSkill}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Skill</DialogTitle>
            <DialogDescription>
              Add a new skill to your profile.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              value={newSkill.name}
              onChange={(e) => setNewSkill({...newSkill, name: e.target.value})}
              placeholder="Skill name"
            />
            <div>
              <label className="text-sm font-medium mb-2 block">Proficiency Level: {newSkill.level}%</label>
              <input
                type="range"
                min="1"
                max="100"
                value={newSkill.level}
                onChange={(e) => setNewSkill({...newSkill, level: parseInt(e.target.value)})}
                className="w-full"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowAddSkill(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddSkill}>
                Add Skill
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Experience Dialog */}
      <Dialog open={showAddExperience} onOpenChange={setShowAddExperience}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Work Experience</DialogTitle>
            <DialogDescription>
              Add a new work experience to your profile.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              value={newExperience.title}
              onChange={(e) => setNewExperience({...newExperience, title: e.target.value})}
              placeholder="Job title"
            />
            <Input
              value={newExperience.company}
              onChange={(e) => setNewExperience({...newExperience, company: e.target.value})}
              placeholder="Company name"
            />
            <Input
              value={newExperience.duration}
              onChange={(e) => setNewExperience({...newExperience, duration: e.target.value})}
              placeholder="Duration (e.g., 2020-2022)"
            />
            <Textarea
              value={newExperience.description}
              onChange={(e) => setNewExperience({...newExperience, description: e.target.value})}
              placeholder="Job description"
              className="min-h-24"
            />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowAddExperience(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddExperience}>
                Add Experience
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Education Dialog */}
      <Dialog open={showAddEducation} onOpenChange={setShowAddEducation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Education</DialogTitle>
            <DialogDescription>
              Add educational background to your profile.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              value={newEducation.degree}
              onChange={(e) => setNewEducation({...newEducation, degree: e.target.value})}
              placeholder="Degree"
            />
            <Input
              value={newEducation.school}
              onChange={(e) => setNewEducation({...newEducation, school: e.target.value})}
              placeholder="School/University"
            />
            <Input
              value={newEducation.year}
              onChange={(e) => setNewEducation({...newEducation, year: e.target.value})}
              placeholder="Year (e.g., 2020)"
            />
            <Textarea
              value={newEducation.description}
              onChange={(e) => setNewEducation({...newEducation, description: e.target.value})}
              placeholder="Additional details"
              className="min-h-24"
            />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowAddEducation(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddEducation}>
                Add Education
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}