import React, { useState } from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useRoleSwitch } from "./RoleSwitchProvider";
import { NotificationsDropdown } from "./NotificationsDropdown";
import { SecondaryTabNavigation } from "./SecondaryTabNavigation";
import { TabContentProvider } from "./TabContentProvider";
import { MessageSquare /* or MessageSquareText */ } from "lucide-react";
import { 
  Home,
  Inbox,
  FileText,
  User,
  Calendar,
  BarChart3,
  Building,
  TestTube,
  GraduationCap,
  Settings,
  ArrowLeft,
  ArrowRight,
  HelpCircle,
  ChevronDown,
  LogOut,
  Search,
  CreditCard,
  Briefcase
} from "lucide-react";

interface EmployerDashboardLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onSignOut: () => void;
  onSubTabChange?: (subTab: string) => void;
}

const navigationItems = [
  { id: 'employerHome', label: 'Home Dashboard', icon: Home },
  { id: 'employerInbox', label: 'Inbox', icon: Inbox },
  { id: 'employerTalentSearch', label: 'Talent Search', icon: Search },
  { id: 'employerJobs', label: 'Job Postings', icon: FileText },
  { id: 'employerApplications', label: 'Applications', icon: User },
  { id: 'employerInterviews', label: 'Interviews', icon: Calendar },
  { id: 'employerFeedbackCenter', label: 'Feedback Center', icon: MessageSquare },
  { id: 'employerAssessments', label: 'Assessments', icon: TestTube },
  { id: 'employerCaseStudies', label: 'Case Studies', icon: GraduationCap },
  { id: 'employerAnalytics', label: 'Analytics & Reports', icon: BarChart3 },
  { id: 'employerCompany', label: 'Company Page', icon: Building },
  { id: 'employerSettings', label: 'Settings', icon: Settings },
];

export function EmployerDashboardLayout({ children, activeTab, onTabChange, onSignOut, onSubTabChange }: EmployerDashboardLayoutProps) {
  const { user, companies, switchRole } = useRoleSwitch();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCandidateSwitch = () => {
    switchRole('candidate');
    onTabChange('dashboard');
  };

  const handleSettingsClick = () => {
    onTabChange('employerSettings');
  };

  const handleHelpClick = () => {
    console.log('Help clicked');
  };

  const handleBillingClick = () => {
    onTabChange('employerBilling');
  };

  const handleNotificationNavigation = (url: string) => {
    const urlToTabMap: Record<string, string> = {
      '/employer/interviews': 'employerInterviews',
      '/employer/inbox': 'employerInbox',
      '/employer/applications': 'employerApplications',
      '/employer/jobs': 'employerJobs'
    };
    
    const tab = urlToTabMap[url];
    if (tab) {
      onTabChange(tab);
    }
  };

  const currentCompany = companies.find(c => c.id === user.currentCompanyId) || companies[0];

  return (
    <TabContentProvider currentPage={activeTab}>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <div
          className={`bg-white border-r border-gray-200 transition-all duration-300 ease-in-out
            ${mobileMenuOpen ? 'fixed inset-y-0 left-0 z-50 shadow-xl w-60 block' : ''}
            ${!mobileMenuOpen ? (sidebarOpen ? 'w-60 hidden lg:block' : 'hidden') : ''}
          `}
        >
          {/* Header with Logo and Hamburger */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            {/* Logo */}
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-purple-600 to-indigo-600 w-8 h-8 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">J</span>
              </div>
              {sidebarOpen && (
                <span className="ml-3 font-bold text-gray-900">Jobitu</span>
              )}
            </div>
            
            {/* Desktop Hamburger Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden lg:flex text-gray-500 hover:bg-gray-100 rounded-lg h-8 w-8 p-0"
            >
              <div className="space-y-1">
                <div className="w-4 h-0.5 bg-gray-600 rounded"></div>
                <div className="w-4 h-0.5 bg-gray-600 rounded"></div>
                <div className="w-4 h-0.5 bg-gray-600 rounded"></div>
              </div>
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-3">
            <ul className="space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        onTabChange(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 ${
                        isActive 
                          ? 'bg-purple-50 text-purple-700 border border-purple-200' 
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon className={`h-5 w-5 ${isActive ? 'text-purple-600' : 'text-gray-500'}`} />
                      {sidebarOpen && (
                        <span className="ml-3 font-medium text-sm text-left">{item.label}</span>
                      )}
                      {isActive && sidebarOpen && (
                        <div className="ml-auto w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {mobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Navigation Bar */}
          <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
            {/* Left Section */}
            <div className="flex items-center space-x-4">
              {/* Mobile hamburger button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden hover:bg-gray-100 rounded-xl p-2 transition-colors"
              >
                <div className="space-y-1">
                  <div className="w-5 h-0.5 bg-gray-600 rounded"></div>
                  <div className="w-5 h-0.5 bg-gray-600 rounded"></div>
                  <div className="w-5 h-0.5 bg-gray-600 rounded"></div>
                </div>
              </Button>

              {/* Desktop hamburger when sidebar is closed */}
              {!sidebarOpen && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(true)}
                  className="hidden lg:flex hover:bg-gray-100 rounded-xl p-2 transition-colors"
                  aria-label="Open sidebar"
                >
                  <div className="space-y-1">
                    <div className="w-5 h-0.5 bg-gray-600 rounded"></div>
                    <div className="w-5 h-0.5 bg-gray-600 rounded"></div>
                    <div className="w-5 h-0.5 bg-gray-600 rounded"></div>
                  </div>
                </Button>
              )}

              {/* Navigation buttons */}
              <div className="hidden md:flex items-center space-x-2">
                <Button variant="ghost" size="sm" disabled>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" disabled>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Page title */}
              <div className="hidden sm:block">
                <h1 className="font-semibold text-gray-900">
                  {navigationItems.find(item => item.id === activeTab)?.label || 'Employer Dashboard'}
                </h1>
              </div>
            </div>

            {/* Center Section - Search */}
            <div className="flex-1 max-w-md mx-8 hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search candidates, jobs, applications..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="hidden sm:flex" onClick={handleHelpClick}>
                <HelpCircle className="h-4 w-4" />
              </Button>

              <Button variant="ghost" size="sm" onClick={handleSettingsClick}>
                <Settings className="h-4 w-4" />
              </Button>

              <NotificationsDropdown 
                userType="employer" 
                onNavigate={handleNotificationNavigation}
              />

              {/* Profile dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 px-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={currentCompany?.logo || user.avatar} alt={currentCompany?.name || user.name} />
                      <AvatarFallback>
                        {currentCompany?.name ? currentCompany.name.substring(0, 2).toUpperCase() : 
                        user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:flex flex-col items-start">
                      <span className="text-sm font-medium">{user.name}</span>
                      <span className="text-xs text-gray-500">
                        {currentCompany?.name || 'Employer'}
                      </span>
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-64">
                  <DropdownMenuLabel className="p-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={currentCompany?.logo || user.avatar} alt={currentCompany?.name || user.name} />
                        <AvatarFallback>
                          {currentCompany?.name ? currentCompany.name.substring(0, 2).toUpperCase() : 
                          user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                        <Badge className="mt-1 bg-purple-100 text-purple-800 hover:bg-purple-100">
                          <Building className="h-3 w-3 mr-1" />
                          Employer
                        </Badge>
                      </div>
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  <div className="p-2 space-y-1">
                    <DropdownMenuItem onClick={() => onTabChange('employerCompany')} className="cursor-pointer">
                      <Building className="h-4 w-4 mr-2" />
                      Company Profile
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={handleBillingClick} className="cursor-pointer">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Billing & Subscription
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => onTabChange('employerSettings')} className="cursor-pointer">
                      <Settings className="h-4 w-4 mr-2" />
                      Account Settings
                    </DropdownMenuItem>
                  </div>

                  <DropdownMenuSeparator />

                  <div className="p-2">
                    <DropdownMenuItem onClick={handleCandidateSwitch} className="cursor-pointer">
                      <Briefcase className="h-4 w-4 mr-2" />
                      Switch to Candidate View
                    </DropdownMenuItem>
                  </div>

                  <DropdownMenuSeparator />

                  <div className="p-2">
                    <DropdownMenuItem 
                      onClick={onSignOut}
                      className="cursor-pointer text-red-600 focus:text-red-600"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <SecondaryTabNavigation 
            currentPage={activeTab}
            onTabChange={(subTab) => onSubTabChange?.(subTab)}
            userType="employer"
          />

          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </TabContentProvider>
  );
}
