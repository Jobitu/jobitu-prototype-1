import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ProfileDropdown } from "./ProfileDropdown";
import { useRoleSwitch } from "./RoleSwitchProvider";
import { 
  Bell,
  Search,
  Menu,
  User,
  Briefcase,
  Crown
} from "lucide-react";

interface TopNavigationProps {
  onViewProfile: () => void;
  onCreateCompany: () => void;
  onSettings: () => void;
  onToggleMobileMenu?: () => void;
  pageTitle?: string;
  showSearch?: boolean;
  showNotifications?: boolean;
}

export function TopNavigation({
  onViewProfile,
  onCreateCompany,
  onSettings,
  onToggleMobileMenu,
  pageTitle,
  showSearch = true,
  showNotifications = true
}: TopNavigationProps) {
  const { 
    currentRole, 
    currentCompany, 
    user, 
    companies, 
    switchRole, 
    logout,
    isAuthenticated 
  } = useRoleSwitch();

  const getRoleContext = () => {
    if (currentRole === 'employer' && currentCompany) {
      return `${currentCompany.name} • Employer Dashboard`;
    }
    if (currentRole === 'admin') {
      return 'Admin Panel';
    }
    return 'Candidate Dashboard';
  };

  const getRoleIcon = () => {
    switch (currentRole) {
      case 'candidate':
        return <User className="h-4 w-4" />;
      case 'employer':
        return <Briefcase className="h-4 w-4" />;
      case 'admin':
        return <Crown className="h-4 w-4" />;
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Toggle */}
            {onToggleMobileMenu && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggleMobileMenu}
                className="md:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
            )}

            {/* Logo */}
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 w-8 h-8 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold">J</span>
              </div>
              <div className="hidden sm:block">
                <div className="font-bold text-gray-900">Jobitu</div>
                <div className="text-xs text-gray-500">{getRoleContext()}</div>
              </div>
            </div>

            {/* Page Title */}
            {pageTitle && (
              <>
                <div className="hidden md:block w-px h-6 bg-gray-300" />
                <div className="hidden md:flex items-center space-x-2">
                  {getRoleIcon()}
                  <span className="font-medium text-gray-900">{pageTitle}</span>
                </div>
              </>
            )}
          </div>

          {/* Center Section - Search */}
          {showSearch && (
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search jobs, candidates, companies..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          )}

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            {/* Role Status Badge - Mobile */}
            <Badge 
              className={`sm:hidden ${
                currentRole === 'candidate' 
                  ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' 
                  : currentRole === 'employer'
                  ? 'bg-green-100 text-green-800 hover:bg-green-100'
                  : 'bg-purple-100 text-purple-800 hover:bg-purple-100'
              }`}
            >
              {getRoleIcon()}
            </Badge>

            {/* Notifications */}
            {showNotifications && (
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white">3</span>
                </div>
              </Button>
            )}

            {/* Profile Dropdown */}
            <ProfileDropdown
              currentRole={currentRole}
              user={user}
              companies={companies}
              onRoleSwitch={switchRole}
              onViewProfile={onViewProfile}
              onCreateCompany={onCreateCompany}
              onSettings={onSettings}
              onLogout={logout}
            />
          </div>
        </div>
      </div>

      {/* Mobile Role Context */}
      <div className="sm:hidden border-t border-gray-100 px-4 py-2 bg-gray-50">
        <div className="text-sm text-gray-600">{getRoleContext()}</div>
      </div>
    </header>
  );
}