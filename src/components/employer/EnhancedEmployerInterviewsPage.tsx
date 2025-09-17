import { useState } from "react";
import { useTabContent } from "../TabContentProvider";
import { UpcomingInterviews } from "./interviews/UpcomingInterviews";
import { PastInterviews } from "./interviews/PastInterviews";
import { InterviewCalendar } from "./interviews/Calendar";
import { InterviewFeedback } from "./interviews/InterviewFeedback";
import { Preparation } from "./interviews/Preparation";
import { InterviewDetail } from "./interviews/InterviewDetail";
import type { Interview } from "./interviews/types";

interface EnhancedEmployerInterviewsPageProps {
  onCreateInterview?: () => void;
}

export function EnhancedEmployerInterviewsPage({ onCreateInterview }: EnhancedEmployerInterviewsPageProps = {}) {
  const { activeSubTab } = useTabContent();
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);
  const [showInterviewDetail, setShowInterviewDetail] = useState(false);

  const handleViewDetails = (interview: Interview) => {
    setSelectedInterview(interview);
    setShowInterviewDetail(true);
  };

  const handleBackToList = () => {
    setShowInterviewDetail(false);
    setSelectedInterview(null);
  };

  // If showing interview detail, render the detail view
  if (showInterviewDetail && selectedInterview) {
    return (
      <InterviewDetail 
        interview={selectedInterview} 
        onBack={handleBackToList}
      />
    );
  }

  // Render appropriate component based on active sub-tab
  const renderContent = () => {
    switch (activeSubTab) {
      case 'upcoming-interviews':
        return (
          <UpcomingInterviews 
            onCreateInterview={onCreateInterview}
            onViewDetails={handleViewDetails}
          />
        );
      case 'past-interviews':
        return (
          <PastInterviews 
            onViewDetails={handleViewDetails}
          />
        );
      case 'calendar':
        return (
          <InterviewCalendar 
            onCreateInterview={onCreateInterview}
            onViewDetails={handleViewDetails}
          />
        );
      case 'interview-feedback':
        return (
          <InterviewFeedback 
            onViewDetails={handleViewDetails}
          />
        );
      case 'preparation':
        return <Preparation />;
      default:
        return (
          <UpcomingInterviews 
            onCreateInterview={onCreateInterview}
            onViewDetails={handleViewDetails}
          />
        );
    }
  };

  return (
    <div className="p-6">
      {renderContent()}
    </div>
  );
}