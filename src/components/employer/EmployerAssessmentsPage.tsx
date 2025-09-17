import { useState } from "react";
import { useTabContent } from "../TabContentProvider";
import { AllAssessments } from "./assessments/AllAssessments";
import { AssessmentReports } from "./assessments/AssessmentReports";
import { AssessmentsMarketplace } from "./assessments/AssessmentsMarketplace";
import { AssessmentLibrary } from "./assessments/AssessmentLibrary";
import { AssessmentSettings } from "./assessments/AssessmentSettings";
import { CreateAssessmentModal } from "./assessments/CreateAssessmentModal";

interface EmployerAssessmentsPageProps {
  onSubTabChange?: (tab: string) => void;
}

export function EmployerAssessmentsPage({ onSubTabChange }: EmployerAssessmentsPageProps) {
  const { activeSubTab } = useTabContent();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [assessmentSubTab, setAssessmentSubTab] = useState('ongoing');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Use the active tab from the TabContentProvider
  const activeTab = activeSubTab || 'all-assessments';

  const handleTabChange = (tab: string) => {
    onSubTabChange?.(tab);
  };

  const handleCreateAssessment = () => {
    setShowCreateModal(true);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'all-assessments':
        return (
          <AllAssessments
            onCreateAssessment={handleCreateAssessment}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            assessmentSubTab={assessmentSubTab}
            setAssessmentSubTab={setAssessmentSubTab}
            isLoading={isLoading}
          />
        );
      case 'reports':
        return <AssessmentReports />;
      case 'marketplace':
        return <AssessmentsMarketplace />;
      case 'library':
        return <AssessmentLibrary />;
      case 'settings':
        return <AssessmentSettings />;
      default:
        return (
          <AllAssessments
            onCreateAssessment={handleCreateAssessment}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            assessmentSubTab={assessmentSubTab}
            setAssessmentSubTab={setAssessmentSubTab}
            isLoading={isLoading}
          />
        );
    }
  };

  return (
    <div className="space-y-6">
      {renderContent()}

      <CreateAssessmentModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </div>
  );
}
