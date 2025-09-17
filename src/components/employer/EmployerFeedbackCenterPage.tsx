import React from "react";
import { useTabContent } from "../TabContentProvider";
import { PendingFeedbacks } from "./feedback-center/PendingFeedbacks";
import { AllFeedbacks } from "./feedback-center/AllFeedbacks";
import { AISuggestions } from "./feedback-center/AISuggestions";
import { Analytics } from "./feedback-center/Analytics";
import { Settings } from "./feedback-center/Settings";
import { Benchmarks } from "./feedback-center/Benchmarks";

interface EmployerFeedbackCenterPageProps {
  onSubTabChange?: (tab: string) => void;
}

export function EmployerFeedbackCenterPage({ onSubTabChange }: EmployerFeedbackCenterPageProps) {
  const { activeSubTab } = useTabContent();

  // Use the active tab from the TabContentProvider
  const activeTab = activeSubTab || "pending";

  const handleTabChange = (tab: string) => {
    onSubTabChange?.(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "pending":
        return <PendingFeedbacks />;
      case "all-feedbacks":
        return <AllFeedbacks />;
      case "ai-suggestions":
        return <AISuggestions />;
      case "analytics":
        return <Analytics />;
      case "benchmarks":
        return <Benchmarks />;
      case "settings":
        return <Settings />;
      default:
        return <PendingFeedbacks />;
    }
  };

  return (
    <div className="space-y-6">
      {renderContent()}
    </div>
  );
}
