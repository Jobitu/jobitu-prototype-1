import { useMemo, useEffect } from "react";
import OverviewTab from "./components/OverviewTab";
import PipelineTab from "./components/PipelineTabWithJobFilter";
import ReportsInsightsTab from "./components/ReportsInsightsTab";
import { AllApplicationsTab } from "./components/AllApplicationsTab";
import { useTabContent } from "../TabContentProvider"; // <— yolunu kendi projene göre ayarla

interface EmployerApplicationsPageProps {
  onViewFullProfile?: (candidateId: string) => void;
  onViewApplicationDetail?: (application: any) => void;
  selectedJobFilter?: string;
  onCreateJob?: () => void;
}

export function EmployerApplicationsPage({ 
  onViewFullProfile, 
  onViewApplicationDetail,
  selectedJobFilter = "",
  onCreateJob
}: EmployerApplicationsPageProps) {
  const { activeSubTab, setActiveSubTab } = useTabContent();

  // Auto-switch to all-applications tab if a job filter is provided
  useEffect(() => {
    if (selectedJobFilter && selectedJobFilter.trim() !== "") {
      setActiveSubTab('all-applications');
    }
  }, [selectedJobFilter, setActiveSubTab]);

  // default 'overview' + yalnızca bu 4 id geçerli
  const tab = useMemo(() => {
    if (activeSubTab === 'all-applications') return 'all-applications';
    if (activeSubTab === 'pipeline') return 'pipeline';
    if (activeSubTab === 'reports-insights') return 'reports-insights';
    return 'overview';
  }, [activeSubTab]);

  switch (tab) {
    case 'overview':
      return <OverviewTab onCreateJob={onCreateJob} />;
    case 'all-applications':
      return <AllApplicationsTab jobFilter={selectedJobFilter} onViewApplicationDetail={onViewApplicationDetail} />;
    case 'pipeline':
      return <PipelineTab />;
    case 'reports-insights':
      return <ReportsInsightsTab />;
    default:
      return <OverviewTab onCreateJob={onCreateJob} />;
  }
}