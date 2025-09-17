import { Dashboard } from "../Dashboard";
import { CandidateInboxPage } from "../CandidateInboxPage";
import { FindJobsPage } from "../FindJobsPage";
import { SmartMatchJobDetailPage } from "../SmartMatchJobDetailPage";
import { CandidateJobDetailPage } from "../CandidateJobDetailPage";
import { JobSearchPage } from "../JobSearchPage";
import { ApplicationsPage } from "../ApplicationsPage";
import { ApplicationProgressPage } from "../ApplicationProgressPage";
import { ApplicationDetailPage } from "../ApplicationDetailPage";
import { InterviewsPage } from "../InterviewsPage";
import { UpcomingInterviewDetailPage } from "../UpcomingInterviewDetailPage";
import { PastInterviewDetailPage } from "../PastInterviewDetailPage";
import { JobFocusDetailPage } from "../JobFocusDetailPage";
import { CreateJobFocusPage } from "../CreateJobFocusPage";

import { CareerProfilePage } from "../CareerProfilePage";
import { PreviewMyProfile } from "../PreviewMyProfile";
import { UserSettings } from "../UserSettings";
import { CandidateSettingsPage } from "../CandidateSettingsPage";
import { JobDetailPage } from "../JobDetailPage";
import { SemanticFitDashboard } from "../SemanticFitDashboard";
import { BillingSettings } from "../BillingSettings";
import { RejectionFeedback } from "../RejectionFeedback";
import { TestSimulation } from "../TestSimulation";
import { RedFlagReporting } from "../RedFlagReporting";
import { GrowthCenterPage } from "../GrowthCenterPage";
import { OnboardingData } from "../OnboardingFlow";
import { PageType, UserType } from "../../types/app";
import { useRoleSwitch } from "../RoleSwitchProvider";
import { useTabContent } from "../TabContentProvider";
import { useEffect } from "react";

interface CandidateRoutesProps {
  currentPage: PageType;
  onboardingData: OnboardingData | null;
  selectedJobId: number | null;
  selectedApplication?: any | null;
  selectedSmartMatchJob?: any | null;
  smartMatchJobIndex?: number;
  currentRole: UserType;
  onEditProfile: () => void;
  onViewJobDetail: (jobId: number) => void;

  onOpenJobSearch: () => void;
  onOpenSettings: () => void;
  onOpenBilling: () => void;
  onOpenRejectionFeedback: () => void;
  onOpenTestSimulation: () => void;
  onBackToDashboard: () => void;
  onBackToJobSearch: () => void;
  onProfileSave: (data: OnboardingData) => void;
  onApplyFromSemanticFit: () => void;
  setCurrentPage: (page: PageType) => void;
  setSelectedApplication?: (app: any) => void;
  setSelectedSmartMatchJob?: (job: any, index: number) => void;
  onSubTabChange?: (tab: string) => void;
}

export function CandidateRoutes({
  currentPage,
  onboardingData,
  selectedJobId,
  selectedApplication,
  selectedSmartMatchJob,
  smartMatchJobIndex,
  currentRole,
  onEditProfile,
  onViewJobDetail,

  onOpenJobSearch,
  onOpenSettings,
  onOpenBilling,
  onOpenRejectionFeedback,
  onOpenTestSimulation,
  onBackToDashboard,
  onBackToJobSearch,
  onProfileSave,
  onApplyFromSemanticFit,
  setCurrentPage,
  setSelectedApplication,
  setSelectedSmartMatchJob,
  onSubTabChange
}: CandidateRoutesProps) {
  
  const { addToHistory } = useRoleSwitch();
  const { activeSubTab } = useTabContent();

  // Add current page to navigation history
  useEffect(() => {
    addToHistory(currentPage);
  }, [currentPage, addToHistory]);

  const handlePreviewProfile = () => {
    setCurrentPage('profilePreview');
  };

  const handleBackToProfile = () => {
    setCurrentPage('careerProfile');
  };

  switch (currentPage) {
    case 'dashboard':
      if (!onboardingData) return null;
      return (
        <Dashboard 
          userData={onboardingData} 
          onEditProfile={onEditProfile}
          onViewJobDetail={onViewJobDetail}

          onOpenJobSearch={onOpenJobSearch}
          onOpenSettings={onOpenSettings}
          onOpenBilling={onOpenBilling}
          onOpenRejectionFeedback={onOpenRejectionFeedback}
          onOpenTestSimulation={onOpenTestSimulation}
        />
      );

    case 'inbox':
      return <CandidateInboxPage activeTab={activeSubTab} />;

    case 'jobSearch':
      return (
        <FindJobsPage 
          activeSubTab={activeSubTab} 
          onViewSmartMatchJob={(job, index) => {
            setSelectedSmartMatchJob?.(job, index);
            setCurrentPage('smartMatchJobDetail');
          }}
          onViewJobDetail={onViewJobDetail}
          onCreateFocus={() => setCurrentPage('createJobFocus')}
          onViewFocusDetail={(focusId) => setCurrentPage('jobFocusDetail')}
        />
      );

    case 'smartMatchJobDetail':
      if (!selectedSmartMatchJob) return null;
      return (
        <SmartMatchJobDetailPage
          job={selectedSmartMatchJob}
          currentIndex={smartMatchJobIndex || 0}
          totalJobs={6} // This would come from the actual job list
          onBack={() => setCurrentPage('jobSearch')}
          onNext={() => {
            // Navigate to next job - would need proper implementation
            console.log('Next job');
          }}
          onPrevious={() => {
            // Navigate to previous job - would need proper implementation
            console.log('Previous job');
          }}
          onSave={(jobId) => {
            console.log('Save job:', jobId);
          }}
          onApply={(jobId) => {
            console.log('Apply to job:', jobId);
          }}
          isSaved={false} // This would come from saved jobs state
        />
      );

    case 'legacyJobSearch':
      if (!onboardingData) return null;
      return (
        <JobSearchPage
          userData={onboardingData}
          onBack={onBackToDashboard}
          onViewJobDetail={(jobId) => {
            onViewJobDetail(jobId);
            setCurrentPage('semanticFit');
          }}
        />
      );

    case 'applications':
      return (
        <ApplicationsPage 
          activeSubTab={activeSubTab} 
          onViewApplication={(app) => {
            setSelectedApplication?.(app);
            setCurrentPage('applicationDetail');
          }}
        />
      );

    case 'applicationProgress':
      if (!selectedApplication) return null;
      return (
        <ApplicationProgressPage
          application={selectedApplication}
          onBack={() => setCurrentPage('applications')}
        />
      );

    case 'applicationDetail':
      if (!selectedApplication) return null;
      return (
        <ApplicationDetailPage
          application={selectedApplication}
          onBack={() => setCurrentPage('applications')}
        />
      );

    case 'interviews':
      return (
        <InterviewsPage 
          activeSubTab={activeSubTab} 
          onOpenUpcomingDetail={(interviewId) => {
            setCurrentPage('upcomingInterviewDetail');
          }}
          onOpenPastDetail={(interviewId) => {
            setCurrentPage('pastInterviewDetail');
          }}
        />
      );

    case 'upcomingInterviewDetail':
      return (
        <UpcomingInterviewDetailPage
          interviewId="1" // This would come from state
          onBack={() => setCurrentPage('interviews')}
        />
      );

    case 'pastInterviewDetail':
      return (
        <PastInterviewDetailPage
          interviewId="4" // This would come from state
          onBack={() => setCurrentPage('interviews')}
        />
      );

    case 'jobFocusDetail':
      return (
        <JobFocusDetailPage
          focusId="1" // This would come from state
          onBack={() => setCurrentPage('jobSearch')}
          onEditFocus={() => setCurrentPage('createJobFocus')}
        />
      );

    case 'createJobFocus':
      return (
        <CreateJobFocusPage
          onBack={() => setCurrentPage('jobSearch')}
          onSave={(focusData) => {
            console.log('Job focus saved:', focusData);
            setCurrentPage('jobSearch');
          }}
        />
      );



    case 'growthCenter':
      if (!onboardingData) return null;
      return (
        <GrowthCenterPage
          userData={onboardingData}
          onBack={onBackToDashboard}
          activeTab={activeSubTab}
        />
      );

    case 'careerProfile':
      if (!onboardingData) return null;
      return (
        <CareerProfilePage 
          userData={onboardingData}
          onBack={onBackToDashboard}
          onSave={onProfileSave}
          onViewFullProfile={handlePreviewProfile}
          isPreviewMode={false}
          viewerType="candidate"
          activeSubTab={activeSubTab}
        />
      );

    case 'profilePreview':
      if (!onboardingData) return null;
      return (
        <PreviewMyProfile 
          onBack={handleBackToProfile}
          viewerType="candidate"
          showAIMatchScore={false}
        />
      );

    case 'settings':
      return (
        <CandidateSettingsPage 
          onSubTabChange={onSubTabChange}
        />
      );

    case 'jobDetail':
      if (!selectedJobId) return null;
      return (
        <CandidateJobDetailPage 
          jobId={selectedJobId}
          onBack={onBackToDashboard}
          onApply={(jobId) => {
            console.log('Apply to job:', jobId);
            // Handle application logic here
          }}
          onSave={(jobId) => {
            console.log('Save job:', jobId);
            // Handle save job logic here
          }}
        />
      );

    case 'semanticFit':
      if (!onboardingData || !selectedJobId) return null;
      return (
        <SemanticFitDashboard
          jobId={selectedJobId}
          userData={onboardingData}
          onBack={onBackToJobSearch}
          onApply={onApplyFromSemanticFit}
        />
      );

    case 'billing':
      return (
        <BillingSettings 
          onBack={onBackToDashboard}
          userType={currentRole}
        />
      );

    case 'rejectionFeedback':
      return (
        <RejectionFeedback
          onBack={onBackToDashboard}
          jobTitle="Senior Frontend Developer"
          companyName="TechFlow Inc."
          rejectionReason="While your technical skills are strong, we decided to move forward with a candidate who has more experience in system design and team leadership."
        />
      );

    case 'testSimulation':
      return (
        <TestSimulation
          onBack={onBackToDashboard}
          testType="coding"
          testTitle="Frontend Developer Technical Assessment"
          companyName="TechFlow Inc."
        />
      );

    case 'redFlagReporting':
      return (
        <RedFlagReporting
          candidateId="c1"
          candidateName="Alex Johnson"
          onClose={onBackToDashboard}
          viewMode="history"
        />
      );

    default:
      return null;
  }
}