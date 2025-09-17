import { FindJobsOverviewPage } from "./FindJobsOverviewPage";
import { FindJobsSmartMatchesPage } from "./FindJobsSmartMatchesPage";
import { FindJobsJobSearchPage } from "./FindJobsJobSearchPage";
import { EnhancedJobFocusPage } from "./EnhancedJobFocusPage";
import { FindJobsSavedJobsPage } from "./FindJobsSavedJobsPage";

interface FindJobsPageProps {
  activeSubTab?: string;
  onViewSmartMatchJob?: (job: any, currentIndex: number) => void;
  onViewJobDetail?: (jobId: number) => void;
  onCreateFocus?: () => void;
  onViewFocusDetail?: (focusId: string) => void;
}

export function FindJobsPage({ 
  activeSubTab = 'overview',
  onViewSmartMatchJob,
  onViewJobDetail,
  onCreateFocus,
  onViewFocusDetail
}: FindJobsPageProps) {

  const renderContent = () => {
    switch (activeSubTab) {
      case 'overview':
        return (
          <FindJobsOverviewPage 
            activeSubTab={activeSubTab} 
            onCreateFocus={onCreateFocus}
            onViewFocusDetail={onViewFocusDetail}
          />
        );
      case 'smart-matches':
        return <FindJobsSmartMatchesPage activeSubTab={activeSubTab} onViewJobDetail={onViewSmartMatchJob} />;
      case 'job-search':
        return <FindJobsJobSearchPage activeSubTab={activeSubTab} onViewJobDetail={onViewJobDetail} />;
      case 'job-focus':
        return <EnhancedJobFocusPage activeSubTab={activeSubTab} />;
      case 'saved-jobs':
        return <FindJobsSavedJobsPage activeSubTab={activeSubTab} />;
      default:
        return <FindJobsOverviewPage activeSubTab={activeSubTab} />;
    }
  };

  return renderContent();
}