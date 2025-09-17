import { LandingPage } from "./components/LandingPage";
import { AuthPage } from "./components/AuthPage";
import { OnboardingFlow } from "./components/OnboardingFlow";
import { DashboardLayout } from "./components/DashboardLayout";
import { EmployerDashboardLayout } from "./components/EmployerDashboardLayout";
import { CompanyCreation } from "./components/CompanyCreation";
import { CandidateRoutes } from "./components/routing/CandidateRoutes";
import { EmployerRoutes } from "./components/routing/EmployerRoutes";
import { AdminRoutes } from "./components/routing/AdminRoutes";
import { NotificationProvider } from "./components/NotificationContext";
import { RoleSwitchProvider } from "./components/RoleSwitchProvider";
import { ToastNotifications } from "./components/ToastNotifications";
import { useAppNavigation } from "./hooks/useAppNavigation";

function AppContent() {
  const {
    currentPage,
    onboardingData,
    selectedJobId,
    selectedApplication,
    selectedSmartMatchJob,
    smartMatchJobIndex,
    currentRole,
    isAuthenticated,
    handleAuthComplete,
    handleOnboardingComplete,
    handleBackToLanding,
    handleSignOut,
    handleTabChange,
    handleBackToDashboard,
    handleBackToJobSearch,
    handleProfileSave,
    handleApplyFromSemanticFit,
    handleCompanyCreated,
    setCurrentPage,
    setSelectedJobId,
    setSelectedApplication,
    setSelectedSmartMatchJob
  } = useAppNavigation();

  const handleSubTabChange = (subTab: string) => {
    console.log('Sub-tab changed to:', subTab);
    // Sub-tab changes are handled within the page components
    // This can be used for analytics or state management if needed
  };

  // Show landing page if not authenticated
  if (!isAuthenticated) {
    return (
      <>
        {currentPage === 'auth' && (
          <AuthPage 
            onBack={handleBackToLanding}
            onAuthComplete={handleAuthComplete}
          />
        )}

        {currentPage === 'landing' && (
          <LandingPage onNavigateToAuth={() => setCurrentPage('auth')} />
        )}
      </>
    );
  }

  // Special pages that don't use the dashboard layout
  if (currentPage === 'onboarding') {
    return (
      <OnboardingFlow 
        onComplete={handleOnboardingComplete}
        onBack={handleBackToLanding} 
      />
    );
  }

  if (currentPage === 'companyCreation') {
    return (
      <CompanyCreation
        onBack={handleBackToDashboard}
        onSave={handleCompanyCreated}
      />
    );
  }

  // Admin pages (not using dashboard layout)
  if (currentRole === 'admin') {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminRoutes 
          currentPage={currentPage}
          onBackToLanding={handleBackToLanding}
        />
      </div>
    );
  }

  // Employer dashboard with new layout
  if (currentRole === 'employer') {
    return (
      <EmployerDashboardLayout
        activeTab={currentPage}
        onTabChange={handleTabChange}
        onSignOut={handleSignOut}
        onSubTabChange={handleSubTabChange}
      >
        <EmployerRoutes
          currentPage={currentPage}
          currentRole={currentRole}
          onBackToDashboard={handleBackToDashboard}
          setCurrentPage={setCurrentPage}
          onBackToLanding={handleBackToLanding}
          onSubTabChange={handleSubTabChange}
        />
      </EmployerDashboardLayout>
    );
  }

  // Candidate dashboard with new layout
  return (
    <DashboardLayout
      activeTab={currentPage}
      onTabChange={handleTabChange}
      onSignOut={handleSignOut}
      onSubTabChange={handleSubTabChange}
    >
      <CandidateRoutes
        currentPage={currentPage}
        onboardingData={onboardingData}
        selectedJobId={selectedJobId}
        selectedApplication={selectedApplication}
        selectedSmartMatchJob={selectedSmartMatchJob}
        smartMatchJobIndex={smartMatchJobIndex}
        currentRole={currentRole}
        onEditProfile={() => setCurrentPage('careerProfile')}
        onViewJobDetail={(jobId) => {
          setSelectedJobId(jobId);
          setCurrentPage('jobDetail');
        }}

        onOpenJobSearch={() => setCurrentPage('jobSearch')}
        onOpenSettings={() => setCurrentPage('settings')}
        onOpenBilling={() => setCurrentPage('billing')}
        onOpenRejectionFeedback={() => setCurrentPage('rejectionFeedback')}
        onOpenTestSimulation={() => setCurrentPage('testSimulation')}
        onBackToDashboard={handleBackToDashboard}
        onBackToJobSearch={handleBackToJobSearch}
        onProfileSave={handleProfileSave}
        onApplyFromSemanticFit={handleApplyFromSemanticFit}
        setCurrentPage={setCurrentPage}
        setSelectedApplication={setSelectedApplication}
        setSelectedSmartMatchJob={setSelectedSmartMatchJob}
        onSubTabChange={handleSubTabChange}
      />
    </DashboardLayout>
  );
}

export default function App() {
  return (
    <NotificationProvider>
      <RoleSwitchProvider>
        <AppContent />
        <ToastNotifications />
      </RoleSwitchProvider>
    </NotificationProvider>
  );
}