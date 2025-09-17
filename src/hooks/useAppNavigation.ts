import { useState, useEffect } from "react";
import { PageType, UserType } from "../types/app";
import { OnboardingData } from "../components/OnboardingFlow";
import { mockCandidateData, mockUser } from "../constants/mockData";
import { useRoleSwitch } from "../components/RoleSwitchProvider";

export function useAppNavigation() {
  const [currentPage, setCurrentPage] = useState<PageType>('landing');
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<any | null>(null);
  const [selectedSmartMatchJob, setSelectedSmartMatchJob] = useState<any | null>(null);
  const [smartMatchJobIndex, setSmartMatchJobIndex] = useState<number>(0);
  
  const { currentRole, login, isAuthenticated, addCompany, logout } = useRoleSwitch();

  // Listen for role switch events
  useEffect(() => {
    const handleRoleSwitch = (event: CustomEvent) => {
      const { targetPage } = event.detail;
      setCurrentPage(targetPage);
    };

    const handleCompanySwitch = (event: CustomEvent) => {
      const { targetPage } = event.detail;
      setCurrentPage(targetPage);
    };

    window.addEventListener('roleSwitch', handleRoleSwitch as EventListener);
    window.addEventListener('companySwitch', handleCompanySwitch as EventListener);

    return () => {
      window.removeEventListener('roleSwitch', handleRoleSwitch as EventListener);
      window.removeEventListener('companySwitch', handleCompanySwitch as EventListener);
    };
  }, []);

  const handleAuthComplete = (isNewUser: boolean, selectedUserType: UserType) => {
    login(mockUser, selectedUserType);
    
    if (isNewUser) {
      if (selectedUserType === 'candidate') {
        setCurrentPage('onboarding');
      } else if (selectedUserType === 'employer') {
        setCurrentPage('companyCreation');
      } else if (selectedUserType === 'admin') {
        setCurrentPage('enhancedAdminPanel');
      }
    } else {
      if (selectedUserType === 'candidate') {
        setOnboardingData(mockCandidateData);
        setCurrentPage('dashboard');
      } else if (selectedUserType === 'employer') {
        // Direct redirect to employer home dashboard - no intermediary page
        setCurrentPage('employerHome');
      } else if (selectedUserType === 'admin') {
        setCurrentPage('enhancedAdminPanel');
      }
    }
  };

  const handleOnboardingComplete = (data: OnboardingData) => {
    setOnboardingData(data);
    setCurrentPage('dashboard');
  };

  const handleBackToLanding = () => {
    logout();
    setCurrentPage('landing');
    setOnboardingData(null);
    setSelectedJobId(null);
  };

  const handleSignOut = () => {
    logout();
    setCurrentPage('landing');
    setOnboardingData(null);
    setSelectedJobId(null);
  };

  const handleTabChange = (tab: string) => {
    setCurrentPage(tab as PageType);
    setSelectedJobId(null);
  };

  const handleBackToDashboard = () => {
    if (currentRole === 'candidate') {
      setCurrentPage('dashboard');
    } else if (currentRole === 'employer') {
      // Always go back to employer home dashboard
      setCurrentPage('employerHome');
    } else if (currentRole === 'admin') {
      setCurrentPage('enhancedAdminPanel');
    }
    setSelectedJobId(null);
    setSelectedApplication(null);
    setSelectedSmartMatchJob(null);
    setSmartMatchJobIndex(0);
  };

  const handleBackToJobSearch = () => {
    setCurrentPage('jobSearch');
    setSelectedJobId(null);
  };

  const handleProfileSave = (data: OnboardingData) => {
    setOnboardingData(data);
    setCurrentPage('dashboard');
  };

  const handleApplyFromSemanticFit = () => {
    console.log('Apply to job:', selectedJobId);
    handleBackToDashboard();
  };

  const handleCompanyCreated = (companyData: any) => {
    const newCompany = {
      id: companyData.name.toLowerCase().replace(/\s+/g, '-'),
      name: companyData.name,
      logo: companyData.logoPreview,
      role: 'admin' as const
    };
    
    addCompany(newCompany);
    // Direct redirect to employer home dashboard after company creation
    setCurrentPage('employerHome');
  };

  const handleSetSelectedSmartMatchJob = (job: any, index: number) => {
    setSelectedSmartMatchJob(job);
    setSmartMatchJobIndex(index);
  };

  return {
    // State
    currentPage,
    onboardingData,
    selectedJobId,
    selectedApplication,
    selectedSmartMatchJob,
    smartMatchJobIndex,
    currentRole,
    isAuthenticated,
    
    // Handlers
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
    
    // Setters
    setCurrentPage,
    setSelectedJobId,
    setSelectedApplication,
    setSelectedSmartMatchJob: handleSetSelectedSmartMatchJob
  };
}