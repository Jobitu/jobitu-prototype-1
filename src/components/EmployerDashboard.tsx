import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { NotificationPanel } from "./NotificationPanel";
import { useNotifications } from "./NotificationContext";
import { mockJobPostings, mockCandidates } from "./employer/mockData";
import { calculateStats } from "./employer/utils";
import { CompanyHeader } from "./employer/CompanyHeader";
import { QuickStats } from "./employer/QuickStats";
import { OverviewTab } from "./employer/OverviewTab";
import { JobsTab } from "./employer/JobsTab";
import { CandidatesTab } from "./employer/CandidatesTab";
import { AnalyticsTab } from "./employer/AnalyticsTab";
import { 
  Users,
  Settings,
  CreditCard
} from "lucide-react";

interface EmployerDashboardProps {
  onNavigateToMarketplace: () => void;
  onBack: () => void;
  onCreateJob?: () => void;
  onViewAnalytics?: () => void;
}

export function EmployerDashboard({ onNavigateToMarketplace, onBack, onCreateJob, onViewAnalytics }: EmployerDashboardProps) {
  const { showToast } = useNotifications();
  const [activeTab, setActiveTab] = useState("overview");

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'settings':
        showToast({
          type: 'info',
          title: 'Settings',
          message: 'Settings panel would open here.',
          duration: 3000
        });
        break;
      case 'billing':
        showToast({
          type: 'info',
          title: 'Billing',
          message: 'Billing panel would open here.',
          duration: 3000
        });
        break;
      default:
        break;
    }
  };

  const { totalApplicants, avgMatchScore, activeJobs } = calculateStats(mockJobPostings);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 to-purple-50/30">
      {/* Header */}
      <nav className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="bg-primary text-primary-foreground w-8 h-8 rounded-lg flex items-center justify-center mr-3">
                <span className="font-bold">J</span>
              </div>
              <span className="text-xl font-semibold">Jobitu for Employers</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={onNavigateToMarketplace}>
                <Users className="h-4 w-4 mr-2" />
                Talent Marketplace
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleQuickAction('settings')}>
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleQuickAction('billing')}>
                <CreditCard className="h-4 w-4" />
              </Button>
              <NotificationPanel />
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop" />
                <AvatarFallback>TF</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CompanyHeader 
          activeJobs={activeJobs}
          totalApplicants={totalApplicants}
          avgMatchScore={avgMatchScore}
        />

        <QuickStats />

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="jobs">Job Postings</TabsTrigger>
            <TabsTrigger value="candidates">Candidates</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <OverviewTab 
              onNavigateToMarketplace={onNavigateToMarketplace}
              onCreateJob={onCreateJob}
              onViewAnalytics={onViewAnalytics}
            />
          </TabsContent>

          <TabsContent value="jobs">
            <JobsTab jobs={mockJobPostings} />
          </TabsContent>

          <TabsContent value="candidates">
            <CandidatesTab candidates={mockCandidates} onNavigateToMarketplace={onNavigateToMarketplace} />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsTab avgMatchScore={avgMatchScore} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}