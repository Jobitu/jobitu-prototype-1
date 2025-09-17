import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { useTabContent } from "./TabContentProvider";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { 
  MapPin,
  Briefcase,
  Building,
  Eye,
  FileDown,
  Share,
  Edit,
  Shield,
  Camera
} from "lucide-react";
import { ProfileOverviewTabs } from "./ProfileOverviewTabs";
import { AchievementsBadgesPage } from "./AchievementsBadgesPage";
import profileImage from '../assets/fc4569e04e9edd96ce2a6bc04faab4e42283a9df.png';

interface TabConfig {
  id: string;
  label: string;
  isDefault?: boolean;
}

interface TabItem {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface SecondaryTabNavigationProps {
  currentPage?: string;
  onTabChange: (tab: string) => void;
  userType?: 'candidate' | 'employer';
  // Allow direct tab configuration to override page-based config
  tabs?: TabItem[];
  activeTab?: string;
  // Props for career profile page
  userData?: any;
  isPreviewMode?: boolean;
  onViewFullProfile?: () => void;
}

// Define tabs for each page for candidates
const candidatePageTabs: Record<string, TabConfig[]> = {
  dashboard: [
    { id: 'overview', label: 'Overview', isDefault: true },
    { id: 'recent-activity', label: 'Recent Activity' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'quick-actions', label: 'Quick Actions' }
  ],
  inbox: [
    { id: 'inbox', label: 'Inbox', isDefault: true },
    { id: 'archived', label: 'Archived' },
    { id: 'trash', label: 'Trash' },
    { id: 'news', label: 'News' },
    { id: 'system-notifications', label: 'System Notifications' }
  ],
  jobSearch: [
    { id: 'overview', label: 'Overview', isDefault: true },
    { id: 'smart-matches', label: 'Smart Matches' },
    { id: 'job-search', label: 'Job Search' },
    { id: 'job-focus', label: 'Job Focus' },
    { id: 'saved-jobs', label: 'Saved Jobs' }
  ],
  applications: [
    { id: 'all', label: 'All Applications', isDefault: true },
    { id: 'in-progress', label: 'In Progress' },
    { id: 'offers', label: 'Offers & Negotiations' },
    { id: 'rejected', label: 'Rejected/Closed' },
    { id: 'saved', label: 'Saved for Later' },
    { id: 'archived', label: 'Archived Applications' }
  ],
  interviews: [
    { id: 'upcoming', label: 'Upcoming', isDefault: true },
    { id: 'past', label: 'Past Interviews' },
    { id: 'calendar', label: 'Calendar' },
    { id: 'prep', label: 'Preparation' }
  ],
  aiCoach: [
    { id: 'personalized-insights', label: 'Personalized Insights', isDefault: true },
    { id: 'skill-assessment', label: 'Skill Assessment' },
    { id: 'career-path-suggestions', label: 'Career Path Suggestions' },
    { id: 'actionable-goals', label: 'Actionable Goals' }
  ],
  growthCenter: [
    { id: 'overview', label: 'Overview', isDefault: true },
    { id: 'learning-resources', label: 'Learning Resources' },
    { id: 'networking', label: 'Networking' },
    { id: 'skill-development', label: 'Skill Development' },
    { id: 'mentorship', label: 'Mentorship' }
  ],
  careerProfile: [
    { id: 'overview', label: 'Overview', isDefault: true },
    { id: 'achievements', label: 'Achievements/Badges' }
  ],
  settings: [
    { id: 'account-settings', label: 'Account Settings', isDefault: true },
    { id: 'notifications', label: 'Notifications' },
    { id: 'privacy-security', label: 'Privacy & Security' },
    { id: 'appearance', label: 'Appearance' },
    { id: 'language-region', label: 'Language & Region' }
  ]
};

// Define tabs for each page for employers
const employerPageTabs: Record<string, TabConfig[]> = {
  employerHome: [
    { id: 'overview', label: 'Overview', isDefault: true },
    { id: 'recent-activity', label: 'Recent Activity' },
    { id: 'quick-actions', label: 'Quick Actions' },
    { id: 'notifications', label: 'Notifications' }
  ],
  employerInbox: [
    { id: 'messages', label: 'Messages', isDefault: true },
    { id: 'job-offers', label: 'Job Offers' },
    { id: 'archived', label: 'Archived' },
    { id: 'system-notifications', label: 'System Notifications' }
  ],
  employerTalentMarketplace: [
    { id: 'browse-candidates', label: 'Browse Candidates', isDefault: true },
    { id: 'saved-candidates', label: 'Saved Candidates' },
    { id: 'candidate-suggestions', label: 'Candidate Suggestions' },
    { id: 'talent-pool-insights', label: 'Talent Pool Insights' }
  ],

  employerApplications: [
    { id: 'overview', label: 'Overview', isDefault: true },           // NEW dashboard
    { id: 'all-applications', label: 'All Applications' },            // NEW: All applications table
    { id: 'pipeline', label: 'Pipeline' },                           // Workflow view
    { id: 'reports-insights', label: 'Reports & Insights' }          // Analytics
  ],
  employerInterviews: [
    { id: 'upcoming-interviews', label: 'Upcoming Interviews', isDefault: true },
    { id: 'past-interviews', label: 'Past Interviews' },
    { id: 'calendar', label: 'Calendar' },
    { id: 'interview-feedback', label: 'Interview Feedback' },
    { id: 'preparation', label: 'Preparation' }
  ],
  employerAssessments: [
    { id: 'all-assessments', label: 'All Assessments', isDefault: true },
    { id: 'reports', label: 'Reports' },
    { id: 'marketplace', label: 'Marketplace' },
    { id: 'my-library', label: 'My Library' },
    { id: 'settings', label: 'Settings' }
  ],
  employerCaseStudies: [
    { id: 'overview', label: 'Overview', isDefault: true },
    { id: 'library', label: 'Library' },
    { id: 'sessions', label: 'Sessions' },
    { id: 'templates', label: 'Templates' },
    { id: 'environments', label: 'Environments' },
    { id: 'settings', label: 'Settings & Policies' }
  ],
  employerAnalytics: [
    { id: 'overview', label: 'Overview', isDefault: true },
    { id: 'recruitment-analytics', label: 'Recruitment Analytics' },
    { id: 'job-posting-analytics', label: 'Job Posting Analytics' },
    { id: 'candidate-analytics', label: 'Candidate Analytics' },
    { id: 'custom-reports', label: 'Custom Reports' }
  ],
  employerJobs: [
    { id: 'overview', label: 'Overview', isDefault: true },
    { id: 'listings', label: 'Listings' },
    { id: 'templates', label: 'Templates' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'settings', label: 'Settings & Integrations' }
  ],
  employerTalentSearch: [
    { id: 'overview', label: 'Overview', isDefault: true },
    { id: 'discover', label: 'Discover' },
    { id: 'saved', label: 'Saved' },
    { id: 'candidateFocus', label: 'Candidate Focus' },
    { id: 'campaigns', label: 'Campaigns' },
    { id: 'insights', label: 'Insights' },
    { id: 'settings', label: 'Settings' }
  ],
  employerCompany: [
    { id: 'overview', label: 'Overview', isDefault: true },
    { id: 'jobs', label: 'Job Openings' },
    { id: 'team', label: 'Team & Hiring' },
    { id: 'branding', label: 'Branding & Media' },
    { id: 'insights', label: 'Insights' },
    { id: 'settings', label: 'Settings' }
  ],
  employerFeedbackCenter: [
    { id: 'pending', label: 'Pending Feedbacks', isDefault: true },
    { id: 'all-feedbacks', label: 'All Feedbacks' },
    { id: 'ai-suggestions', label: 'AI Suggestions' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'benchmarks', label: 'Benchmarks' },
    { id: 'settings', label: 'Settings' }
  ],
  employerSettings: [
    { id: 'notifications', label: 'Notifications', isDefault: true },
    { id: 'privacy-security', label: 'Privacy & Security' },
    { id: 'appearance', label: 'Appearance' },
    { id: 'language-region', label: 'Language & Region' }
  ]
};

export function SecondaryTabNavigation({ currentPage, onTabChange, userType, tabs: directTabs, activeTab, userData, isPreviewMode = false, onViewFullProfile }: SecondaryTabNavigationProps) {
  const { activeSubTab, setActiveSubTab } = useTabContent();
  
  // Use direct tabs prop if provided, otherwise fall back to page configuration
  let tabs;
  if (directTabs) {
    tabs = directTabs.map(tab => ({ id: tab.id, label: tab.label, isDefault: tab.id === directTabs[0]?.id }));
  } else if (currentPage && userType) {
    const pageTabsConfig = userType === 'candidate' ? candidatePageTabs : employerPageTabs;
    tabs = pageTabsConfig[currentPage];
  }
  
  // Determine the current active tab
  const currentActiveTab = activeTab || activeSubTab;
  
  // Compute default tab for current tabs
  const defaultTab = tabs && (tabs.find(tab => tab.isDefault)?.id || tabs[0]?.id || 'overview');

  // On page change, always reset to default for page-based tabs
  useEffect(() => {
    if (!directTabs && tabs && defaultTab && currentPage) {
      setActiveSubTab(defaultTab);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, defaultTab]);

  // Don't render if no tabs defined
  if (!tabs || tabs.length === 0) {
    return null;
  }


  const handleSubTabChange = (tabId: string) => {
    if (!directTabs) {
      setActiveSubTab(tabId);
    }
    // Always notify parent component about tab change
    onTabChange(tabId);
  };

  // Profile Header Card Component for career profile page - ONLY shown in overview tab
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
            {!isPreviewMode && (
              <Button 
                size="sm" 
                variant="outline" 
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
              >
                <Camera className="h-3 w-3" />
              </Button>
            )}
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
              </div>

              {/* Right-side Action Cluster */}
              <div className="mt-4 lg:mt-0 flex flex-col gap-2">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={onViewFullProfile}>
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileDown className="h-4 w-4 mr-2" />
                    Export PDF
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Share className="h-4 w-4 mr-2" />
                    Share Profile
                  </Button>
                  <Button size="sm" className="bg-black text-white">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Render content for career profile page
  const renderCareerProfileContent = () => {
    if (currentPage !== 'careerProfile') return null;

    return (
      <div className="max-w-6xl mx-auto p-6">
        {/* Only show Profile Header Card in Overview tab */}
        {currentActiveTab === 'overview' && <ProfileHeaderCard />}
        
        {currentActiveTab === 'overview' && (
          <ProfileOverviewTabs 
            userData={userData}
            isPreviewMode={isPreviewMode}
            onViewFullProfile={onViewFullProfile}
          />
        )}
        {currentActiveTab === 'achievements' && (
          <AchievementsBadgesPage />
        )}
      </div>
    );
  };

  return (
    <>
      <div className="bg-white border-b border-gray-200 px-4 py-0 sticky top-0 z-40">
        <div className="flex items-center space-x-1 overflow-x-auto">
          {tabs.map((tab, index) => {
            const TabIcon = directTabs?.[index]?.icon;
            return (
              <Button
                key={tab.id}
                variant="ghost"
                size="sm"
                onClick={() => handleSubTabChange(tab.id)}
                className={`relative px-4 py-3 rounded-none border-b-2 transition-colors whitespace-nowrap ${
                  (currentActiveTab && tabs.find(t => t.id === currentActiveTab)) ?
                    (currentActiveTab === tab.id ? 'border-blue-500 text-blue-600 bg-blue-50/50' : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50')
                    : (defaultTab === tab.id ? 'border-blue-500 text-blue-600 bg-blue-50/50' : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50')
                }`}
              >
                <div className="flex items-center gap-2">
                  {TabIcon && <TabIcon className="h-4 w-4" />}
                  {tab.label}
                </div>
              </Button>
            );
          })}
        </div>
      </div>
      {renderCareerProfileContent()}
    </>
  );
}