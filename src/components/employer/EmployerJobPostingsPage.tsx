import { useTabContent } from "../TabContentProvider";
import { JobPostingsOverview } from "./job-postings/JobPostingsOverview";
import { JobPostingsListings } from "./job-postings/JobPostingsListings";
import { JobPostingsTemplates } from "./job-postings/JobPostingsTemplates";
import { JobPostingsAnalytics } from "./job-postings/JobPostingsAnalytics";
import { JobPostingsSettings } from "./job-postings/JobPostingsSettings";
import { PageType } from "../../types/app";
import { Dispatch, SetStateAction } from "react";

interface EmployerJobPostingsPageProps {
  setCurrentPage: (page: PageType) => void;
  setSelectedJobId: Dispatch<SetStateAction<string | null>>;
}

export default function EmployerJobPostingsPage({
  setCurrentPage,
  setSelectedJobId,
}: EmployerJobPostingsPageProps) {
  const { activeSubTab } = useTabContent();

  const handleViewJob = (jobId: string) => {
    setSelectedJobId(jobId);
    setCurrentPage("employerJobDetail");
  };

  const handleEditJob = (jobId: string) => {
    setSelectedJobId(jobId);
    setCurrentPage("employerJobCreation");
  };

  const renderContent = () => {
    switch (activeSubTab) {
      case "overview":
        return (
          <JobPostingsOverview onViewJob={handleViewJob} onEditJob={handleEditJob} />
        );
      case "listings":
        return (
          <JobPostingsListings onViewJob={handleViewJob} onEditJob={handleEditJob} />
        );
      case "templates":
        return (
          <JobPostingsTemplates onViewJob={handleViewJob} onEditJob={handleEditJob} />
        );
      case "analytics":
        return <JobPostingsAnalytics />;
      case "settings":
        return <JobPostingsSettings />;
      default:
        return (
          <JobPostingsOverview onViewJob={handleViewJob} onEditJob={handleEditJob} />
        );
    }
  };

  return <div className="p-8 space-y-8 max-w-7xl mx-auto">{renderContent()}</div>;
}
