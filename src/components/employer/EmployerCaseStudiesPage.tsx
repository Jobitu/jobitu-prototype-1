import { useTabContent } from "../TabContentProvider";
import { CaseStudiesOverview } from "./case-studies/CaseStudiesOverview";
import { CaseStudiesLibrary } from "./case-studies/CaseStudiesLibrary";
import { CaseStudiesSessions } from "./case-studies/CaseStudiesSessions";
import { CaseStudiesTemplates } from "./case-studies/CaseStudiesTemplates";
import { CaseStudiesSettings } from "./case-studies/CaseStudiesSettings";

interface EmployerCaseStudiesPageProps {
  onSubTabChange?: (tab: string) => void;
}

export function EmployerCaseStudiesPage({ onSubTabChange }: EmployerCaseStudiesPageProps) {
  const { activeSubTab } = useTabContent();

  // Use the active tab from the TabContentProvider
  const activeTab = activeSubTab || 'overview';

  const handleCreateCaseStudy = () => {
    console.log('Create new case study');
    // This would typically navigate to case study creation page
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <CaseStudiesOverview />;
      case 'library':
        return <CaseStudiesLibrary onCreateCaseStudy={handleCreateCaseStudy} />;
      case 'sessions':
        return <CaseStudiesSessions />;
      case 'templates':
        return <CaseStudiesTemplates />;
      case 'settings':
        return <CaseStudiesSettings />;
      default:
        return <CaseStudiesOverview />;
    }
  };

  return (
    <div className="space-y-6">
      {renderContent()}
    </div>
  );
}
