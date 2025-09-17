import { useState } from "react";
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
import { MobileDashboardNav } from "./MobileDashboardNav";
import { SecondaryTabNavigation } from "./SecondaryTabNavigation";
import { TabContentProvider } from "./TabContentProvider";
import { 
  Home,
  Inbox,
  Search,
  FileText,
  Calendar,
  User,
  Settings,
  ArrowLeft,
  ArrowRight,
  HelpCircle,
  ChevronDown,
  LogOut,
  X,
  CreditCard,
  Building,
  TrendingUp,
  Plus
} from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onSignOut: () => void;
  onSubTabChange?: (subTab: string) => void;
}

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'inbox', label: 'Inbox', icon: Inbox },
  { id: 'jobSearch', label: 'Find Jobs', icon: Search },
  { id: 'applications', label: 'Applications', icon: FileText },
  { id: 'interviews', label: 'Interviews', icon: Calendar },
  { id: 'growthCenter', label: 'Growth Center', icon: TrendingUp },
  { id: 'careerProfile', label: 'My Profile', icon: User },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function DashboardLayout({ children, activeTab, onTabChange, onSignOut, onSubTabChange }: DashboardLayoutProps) {
  const { user, companies, switchRole, addToHistory, goBack } = useRoleSwitch();
  const [sidebarOpen, setSidebarOpen] = useState(true); // ✅ sadece bu state ile kontrol

  const handleCompanySwitch = (companyId: string) => {
    switchRole('employer');
  };

  const handleTabChange = (tab: string) => {
    addToHistory(activeTab);
    onTabChange(tab);
  };

  const handleBackNavigation = () => {
    const previousPage = goBack();
    if (previousPage) onTabChange(previousPage);
  };

  const handleSettingsClick = () => handleTabChange('settings');
  const handleBillingClick = () => handleTabChange('billing');
  const handleHelpClick = () => console.log('Help clicked');
  const handleCreateWorkplace = () => handleTabChange('companyCreation');

  const handleNotificationNavigation = (url: string) => {
    const urlToTabMap: Record<string, string> = {
      '/interviews': 'interviews',
      '/inbox': 'inbox',
      '/applications': 'applications',
      '/jobs': 'jobSearch'
    };
    const tab = urlToTabMap[url];
    if (tab) handleTabChange(tab);
  };

  return (
    <TabContentProvider currentPage={activeTab}>
      <div className="flex h-screen bg-gray-50">
        
        {/* Sidebar (tamamen aç/kapat) */}
        {sidebarOpen && (
          <div className="bg-white border-r border-gray-200 transition-all duration-300 ease-in-out w-60">
            {/* Header with Logo */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 w-8 h-8 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">J</span>
                </div>
                <span className="ml-3 font-bold text-gray-900">Jobitu</span>
              </div>
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
                        onClick={() => handleTabChange(item.id)}
                        className={`w-full flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 ${
                          isActive 
                            ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <Icon className={`h-5 w-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                        <span className="ml-3 font-medium text-sm text-left">{item.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          
          {/* Topbar */}
          <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
            
            {/* Left Section */}
            <div className="flex items-center space-x-4">
              {/* Hamburger toggle (desktop + mobile) */}
<Button
  variant="ghost"
  size="sm"
  onClick={() => setSidebarOpen(!sidebarOpen)}
  className="hover:bg-gray-100 rounded-xl p-2"
>
  <div className="space-y-1">
    <div className="w-5 h-0.5 bg-gray-600 rounded"></div>
    <div className="w-5 h-0.5 bg-gray-600 rounded"></div>
    <div className="w-5 h-0.5 bg-gray-600 rounded"></div>
  </div>
</Button>


              {/* Navigation arrows */}
              <div className="hidden md:flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleBackNavigation}
                  className="hover:bg-gray-100"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" disabled className="opacity-50">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Page Title */}
              <div className="hidden sm:block">
                <h1 className="font-semibold text-gray-900">
                  {navigationItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
                </h1>
              </div>
            </div>

            {/* Center Search */}
            <div className="flex-1 max-w-md mx-8 hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search jobs, companies, skills..."
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
              <NotificationsDropdown userType="candidate" onNavigate={handleNotificationNavigation} />
              
              {/* Profile dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 px-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="hidden md:flex flex-col items-start">
                      <span className="text-sm font-medium">{user.name}</span>
                      <span className="text-xs text-gray-500">Candidate</span>
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <DropdownMenuLabel className="p-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                        <Badge className="mt-1 bg-blue-100 text-blue-800 hover:bg-blue-100">
                          <User className="h-3 w-3 mr-1" />
                          Candidate
                        </Badge>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="p-2 space-y-1">
                    <DropdownMenuItem onClick={() => handleTabChange('careerProfile')}>
                      <User className="h-4 w-4 mr-2" /> My Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleTabChange('growthCenter')}>
                      <TrendingUp className="h-4 w-4 mr-2" /> Growth Center
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleBillingClick}>
                      <CreditCard className="h-4 w-4 mr-2" /> Billing & Subscription
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleTabChange('settings')}>
                      <Settings className="h-4 w-4 mr-2" /> Account Settings
                    </DropdownMenuItem>
                  </div>
                  <DropdownMenuSeparator />
                  {companies.length > 0 && (
                    <>
                      <DropdownMenuLabel className="px-4 py-2 text-xs text-gray-500 uppercase tracking-wide">
                        Company Accounts
                      </DropdownMenuLabel>
                      <div className="p-2">
                        {companies.map((company) => (
                          <DropdownMenuItem 
                            key={company.id}
                            onClick={() => handleCompanySwitch(company.id)}
                          >
                            <div className="flex items-center space-x-3 w-full">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={company.logo} alt={company.name} />
                                <AvatarFallback>{company.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="text-sm font-medium">{company.name}</div>
                                <div className="text-xs text-gray-500 capitalize">{company.role}</div>
                              </div>
                              <Building className="h-4 w-4 text-gray-400" />
                            </div>
                          </DropdownMenuItem>
                        ))}
                      </div>
                    </>
                  )}
                  <div className="p-2">
                    <DropdownMenuItem onClick={handleCreateWorkplace}>
                      <Plus className="h-4 w-4 mr-2" /> Create New Workplace
                    </DropdownMenuItem>
                  </div>
                  <DropdownMenuSeparator />
                  <div className="p-2">
                    <DropdownMenuItem 
                      onClick={onSignOut}
                      className="text-red-600 focus:text-red-600"
                    >
                      <LogOut className="h-4 w-4 mr-2" /> Sign Out
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Secondary Tabs */}
          <SecondaryTabNavigation 
            currentPage={activeTab}
            onTabChange={(subTab) => onSubTabChange?.(subTab)}
            userType="candidate"
          />

          {/* Main Area */}
          <main className="flex-1 overflow-auto">{children}</main>
        </div>

        {/* Mobile bottom nav */}
        <MobileDashboardNav 
          activeTab={activeTab}
          onTabChange={handleTabChange}
          userType="candidate"
        />
      </div>
    </TabContentProvider>
  );
}
