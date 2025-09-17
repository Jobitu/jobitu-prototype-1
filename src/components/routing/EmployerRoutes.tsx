import React from "react";
import { EmployerHomeDashboard } from "../employer/EmployerHomeDashboard";
import { EmployerApplicationsPage } from "../employer/EmployerApplicationsPage";
import { EmployerApplicationDetailPage } from "../employer/EmployerApplicationDetailPage";
import { PreviewMyProfile } from "../PreviewMyProfile";
import { EnhancedEmployerInterviewsPage } from "../employer/EnhancedEmployerInterviewsPage";
import { EmployerFeedbackCenterPage } from "../employer/EmployerFeedbackCenterPage";
import { EmployerCompanyPage } from "../employer/EmployerCompanyPage";
import { EmployerInboxPage } from "../employer/EmployerInboxPage";
import { TalentSearchPage } from "../employer/TalentSearchPage";
import EmployerJobPostingsPage from "../employer/EmployerJobPostingsPage";
import { EmployerJobCreationPage } from "../employer/EmployerJobCreationPage";
import { EmployerCandidateProfilePage } from "../employer/EmployerCandidateProfilePage";
import { EmployerAssessmentsPage } from "../employer/EmployerAssessmentsPage";
import { EmployerSettingsPage } from "../employer/EmployerSettingsPage";
import { EmployerCaseStudiesPage } from "../employer/EmployerCaseStudiesPage";
import { EmployerCaseStudyCreationPage } from "../employer/EmployerCaseStudyCreationPage";
import { CareerProfilePage } from "../CareerProfilePage";
import { UserSettings } from "../UserSettings";
import { BillingSettings } from "../BillingSettings";
import { JobCreation } from "../JobCreation";
import { EmployerAnalyticsReportsPage } from "../employer/EmployerAnalyticsReportsPage";
import { CreateInterviewPage } from "../employer/CreateInterviewPage";
import { CandidateMarketplace } from "../CandidateMarketplace";
import { EmployerDashboard } from "../EmployerDashboard";
import { PlaceholderPage } from "../PlaceholderPage";
import { PageType, UserType } from "../../types/app";
import { useRoleSwitch } from "../RoleSwitchProvider";
import { useEffect, useState } from "react";
import { EmployerJobDetailPage } from "../employer/EmployerJobDetailPage";
import { useTabContent } from "../TabContentProvider";

interface EmployerRoutesProps {
  currentPage: PageType;
  currentRole: UserType;
  onBackToDashboard: () => void;
  setCurrentPage: (page: PageType) => void;
  onBackToLanding: () => void;
  onSubTabChange?: (tab: string) => void;
}

export function EmployerRoutes({
  currentPage,
  currentRole,
  onBackToDashboard,
  setCurrentPage,
  onBackToLanding,
  onSubTabChange
}: EmployerRoutesProps) {
  
  const { addToHistory } = useRoleSwitch();
  const { activeSubTab } = useTabContent();
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [selectedJobFilter, setSelectedJobFilter] = useState<string>("");
  const [selectedApplication, setSelectedApplication] = useState<any | null>(null);

  // Add current page to navigation history
  useEffect(() => {
    addToHistory(currentPage);
  }, [currentPage, addToHistory]);

  // Clear job filter when navigating away from applications page
  useEffect(() => {
    if (currentPage !== 'employerApplications') {
      setSelectedJobFilter("");
    }
  }, [currentPage]);

  // Mock candidate data for preview
  const mockCandidateData = {
    fullName: 'Sarah Chen',
    email: 'sarah.chen@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop',
    bio: 'Passionate frontend developer with 5+ years of experience building scalable web applications.',
    website: 'sarahchen.dev',
    linkedin: 'linkedin.com/in/sarahchen',
    github: 'github.com/sarahchen',
    currentRole: 'Senior Frontend Developer',
    yearsOfExperience: 5,
    education: [
      {
        degree: 'Bachelor of Computer Science',
        school: 'Stanford University',
        year: '2019',
        description: 'Graduated Summa Cum Laude'
      }
    ],
    workExperience: [
      {
        title: 'Senior Frontend Developer',
        company: 'TechFlow Inc.',
        duration: 'Jan 2022 - Present',
        description: 'Led frontend development for React-based applications.'
      }
    ],
    skills: [
      { name: 'React', level: 95, verified: true },
      { name: 'TypeScript', level: 90, verified: true },
      { name: 'JavaScript', level: 92, verified: false }
    ],
    jobTypes: ['full-time'],
    workEnvironment: ['remote'],
    salaryRange: { min: 120000, max: 160000 },
    careerGoals: ['Technical Leadership'],
    desiredRoles: ['Senior Developer'],
    interestedIndustries: ['Technology']
  };
  
  switch (currentPage) {
    case 'employerHome':
      return (
        <EmployerHomeDashboard 
          onNavigateToApplications={() => setCurrentPage('employerApplications')}
          onNavigateToInterviews={() => setCurrentPage('employerInterviews')}
          onNavigateToJobs={() => setCurrentPage('employerJobs')}
          onNavigateToAnalytics={() => setCurrentPage('employerAnalytics')}
          onCreateJob={() => setCurrentPage('employerJobCreation')}
        />
      );

    case 'employerInbox':
      return <EmployerInboxPage activeTab={activeSubTab} />;

    case 'employerTalentSearch':
      return <TalentSearchPage />;

    case 'employerFeedbackCenter':
      return <EmployerFeedbackCenterPage onSubTabChange={onSubTabChange} />;

    case 'employerJobs':
      return (
        <EmployerJobPostingsPage 
          setCurrentPage={setCurrentPage}
          setSelectedJobId={setSelectedJobId}
        />
      );

    case 'employerJobCreation':
      return (
        <EmployerJobCreationPage
          onBack={() => setCurrentPage('employerJobs')}
          onSave={(jobData) => {
            console.log('Job saved:', jobData);
            setCurrentPage('employerJobs');
          }}
        />
      );

    case 'employerJobDetail':
      return (
        <EmployerJobDetailPage
          jobId={selectedJobId || 'default'}
          onBack={() => setCurrentPage('employerJobs')}
          onEdit={() => setCurrentPage('employerJobCreation')}
          onViewApplicants={(jobTitle) => {
            setSelectedJobFilter(jobTitle);
            setCurrentPage('employerApplications');
          }}
        />
      );

    case 'employerApplications':
      return (
        <EmployerApplicationsPage 
          onViewFullProfile={(candidateId) => setCurrentPage('employerCandidatePreview')}
          onViewApplicationDetail={(application) => {
            setSelectedApplication(application);
            setCurrentPage('employerApplicationDetail');
          }}
          selectedJobFilter={selectedJobFilter}
          onCreateJob={() => setCurrentPage('employerJobCreation')}
        />
      );

    case 'employerApplicationDetail':
      return (
        <EmployerApplicationDetailPage
          application={selectedApplication}
          onBack={() => setCurrentPage('employerApplications')}
        />
      );

    case 'employerInterviews':
      return <EnhancedEmployerInterviewsPage onCreateInterview={() => setCurrentPage('employerCreateInterview')} />;

    case 'employerCreateInterview':
      return (
        <CreateInterviewPage
          onBack={() => setCurrentPage('employerInterviews')}
          onSave={(interviewData) => {
            console.log('Interview created:', interviewData);
            // Handle interview creation logic here
            setCurrentPage('employerInterviews');
          }}
        />
      );

    case 'employerCandidates':
      return (
        <PlaceholderPage
          title="Candidate Profiles"
          subtitle="Browse Candidate Profiles"
          description="View detailed candidate profiles with tabbed layout"
        />
      );

    case 'employerCandidateProfile':
      return (
        <EmployerCandidateProfilePage
          onBack={() => setCurrentPage('employerApplications')}
        />
      );

    case 'employerCandidatePreview':
      return (
        <PreviewMyProfile
          onBack={() => setCurrentPage('employerApplications')}
          viewerType="employer"
          showAIMatchScore={true}
          matchScore={94}
        />
      );

    case 'employerAssessments':
      return <EmployerAssessmentsPage onSubTabChange={onSubTabChange} />;

    case 'employerCaseStudies':
      return (
        <EmployerCaseStudiesPage 
          onSubTabChange={onSubTabChange}
        />
      );
    
    case 'employerCaseStudyCreation':
      return (
        <EmployerCaseStudyCreationPage
          onBack={() => setCurrentPage('employerCaseStudies')}
          onSave={(caseStudyData) => {
            console.log('Case study created:', caseStudyData);
            setCurrentPage('employerCaseStudies');
          }}
        />
      );

    case 'employerAnalytics':
      return <EmployerAnalyticsReportsPage />;

    case 'employerCompany':
      return <EmployerCompanyPage />;

    case 'employerTests':
      return (
        <PlaceholderPage
          title="Cases & Tests"
          subtitle="Create Custom Assessments"
          description="Build and assign technical tests and case studies"
          comingSoon={true}
        />
      );

    case 'employerSettings':
      return (
        <EmployerSettingsPage 
          onSubTabChange={onSubTabChange}
        />
      );

    case 'employerBilling':
      return (
        <BillingSettings 
          onBack={onBackToDashboard}
          userType={currentRole}
        />
      );

    case 'jobCreation':
      return (
        <JobCreation
          onBack={onBackToDashboard}
          onSave={(jobData) => {
            console.log('Job saved:', jobData);
            onBackToDashboard();
          }}
          onPublish={(jobData) => {
            console.log('Job published:', jobData);
            onBackToDashboard();
          }}
        />
      );

    case 'candidateMarketplace':
      return (
        <CandidateMarketplace 
          onBack={onBackToDashboard}
        />
      );

    case 'employerDashboard':
      return (
        <EmployerDashboard 
          onNavigateToMarketplace={() => setCurrentPage('candidateMarketplace')}
          onBack={onBackToLanding}
          onCreateJob={() => setCurrentPage('jobCreation')}
          onViewAnalytics={() => setCurrentPage('employerAnalytics')}
        />
      );

    default:
      return null;
  }
}
