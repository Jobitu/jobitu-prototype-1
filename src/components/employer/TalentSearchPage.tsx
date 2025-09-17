import { useTabContent } from "../TabContentProvider";
import { TalentSearchOverview } from "./talent-search/TalentSearchOverview";
import { TalentSearchDiscover } from "./talent-search/TalentSearchDiscover";
import { TalentSearchSaved } from "./talent-search/TalentSearchSaved";
import { TalentSearchCandidateFocus } from "./talent-search/TalentSearchCandidateFocus";
import { TalentSearchCampaigns } from "./talent-search/TalentSearchCampaigns";
import { TalentSearchInsights } from "./talent-search/TalentSearchInsights";
import { TalentSearchSettings } from "./talent-search/TalentSearchSettings";

export function TalentSearchPage() {
  const { activeSubTab } = useTabContent();

  const renderContent = () => {
    switch (activeSubTab) {
      case 'overview':
        return <TalentSearchOverview />;
      case 'discover':
        return <TalentSearchDiscover />;
      case 'saved':
        return <TalentSearchSaved />;
      case 'candidateFocus':
        return <TalentSearchCandidateFocus />;
      case 'campaigns':
        return <TalentSearchCampaigns />;
      case 'insights':
        return <TalentSearchInsights />;
      case 'settings':
        return <TalentSearchSettings />;
      default:
        return <TalentSearchOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {renderContent()}
      </div>
    </div>
  );
}