import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { 
  User,
  Building2,
  Plus,
  LogOut,
  Settings,
  ChevronDown,
  Briefcase,
  Users,
  Crown,
  Check
} from "lucide-react";

type UserRole = 'candidate' | 'employer' | 'admin';

interface Company {
  id: string;
  name: string;
  logo?: string;
  role: 'admin' | 'recruiter' | 'member';
}

interface ProfileDropdownProps {
  currentRole: UserRole;
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  companies: Company[];
  onRoleSwitch: (role: UserRole, companyId?: string) => void;
  onViewProfile: () => void;
  onCreateCompany: () => void;
  onSettings: () => void;
  onLogout: () => void;
}

export function ProfileDropdown({
  currentRole,
  user,
  companies,
  onRoleSwitch,
  onViewProfile,
  onCreateCompany,
  onSettings,
  onLogout
}: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'candidate':
        return <User className="h-4 w-4" />;
      case 'employer':
        return <Briefcase className="h-4 w-4" />;
      case 'admin':
        return <Crown className="h-4 w-4" />;
    }
  };

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case 'candidate':
        return 'Job Seeker';
      case 'employer':
        return 'Employer';
      case 'admin':
        return 'Administrator';
    }
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case 'candidate':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
      case 'employer':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'admin':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-100';
    }
  };

  return (
    <div className="flex items-center space-x-3">
      {/* Current Role Badge */}
      <Badge className={getRoleBadgeColor(currentRole)}>
        {getRoleIcon(currentRole)}
        <span className="ml-1">{getRoleLabel(currentRole)}</span>
      </Badge>

      {/* Profile Dropdown */}
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center space-x-2 px-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>
                {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:flex flex-col items-start">
              <span className="text-sm font-medium">{user.name}</span>
              <span className="text-xs text-gray-500">{user.email}</span>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-80">
          {/* User Info Header */}
          <DropdownMenuLabel className="p-4">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>
                  {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold">{user.name}</div>
                <div className="text-sm text-gray-500">{user.email}</div>
                <Badge className={`mt-1 ${getRoleBadgeColor(currentRole)}`}>
                  {getRoleIcon(currentRole)}
                  <span className="ml-1">{getRoleLabel(currentRole)}</span>
                </Badge>
              </div>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          {/* Profile Actions */}
          <div className="p-2 space-y-1">
            <DropdownMenuItem onClick={onViewProfile} className="flex items-center space-x-2 cursor-pointer">
              <User className="h-4 w-4" />
              <span>View My Profile</span>
            </DropdownMenuItem>

            <DropdownMenuItem onClick={onSettings} className="flex items-center space-x-2 cursor-pointer">
              <Settings className="h-4 w-4" />
              <span>Account Settings</span>
            </DropdownMenuItem>
          </div>

          <DropdownMenuSeparator />

          {/* Role Switching Section */}
          <DropdownMenuLabel className="px-4 py-2 text-xs text-gray-500 uppercase tracking-wide">
            Switch Role
          </DropdownMenuLabel>

          <div className="p-2 space-y-1">
            {/* Candidate Mode */}
            <DropdownMenuItem 
              onClick={() => onRoleSwitch('candidate')}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Job Seeker Mode</span>
              </div>
              {currentRole === 'candidate' && <Check className="h-4 w-4 text-blue-600" />}
            </DropdownMenuItem>

            {/* Company Accounts */}
            {companies.length > 0 && (
              <>
                <div className="px-2 py-1">
                  <div className="text-xs text-gray-500 mb-2">Company Accounts</div>
                  {companies.map((company) => (
                    <DropdownMenuItem 
                      key={company.id}
                      onClick={() => onRoleSwitch('employer', company.id)}
                      className="flex items-center justify-between cursor-pointer pl-6"
                    >
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-4 w-4">
                          <AvatarImage src={company.logo} alt={company.name} />
                          <AvatarFallback className="text-xs">
                            {company.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-sm">{company.name}</span>
                          <span className="text-xs text-gray-500 capitalize">{company.role}</span>
                        </div>
                      </div>
                      {currentRole === 'employer' && <Check className="h-4 w-4 text-green-600" />}
                    </DropdownMenuItem>
                  ))}
                </div>
              </>
            )}

            {/* Create Company */}
            <DropdownMenuItem 
              onClick={onCreateCompany}
              className="flex items-center space-x-2 cursor-pointer text-blue-600"
            >
              <Plus className="h-4 w-4" />
              <span>Create Company Page</span>
            </DropdownMenuItem>

            {/* Admin Access (if applicable) */}
            {currentRole === 'admin' && (
              <DropdownMenuItem 
                onClick={() => onRoleSwitch('admin')}
                className="flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center space-x-2">
                  <Crown className="h-4 w-4" />
                  <span>Admin Panel</span>
                </div>
                <Check className="h-4 w-4 text-purple-600" />
              </DropdownMenuItem>
            )}
          </div>

          <DropdownMenuSeparator />

          {/* Logout */}
          <div className="p-2">
            <DropdownMenuItem 
              onClick={onLogout}
              className="flex items-center space-x-2 cursor-pointer text-red-600 focus:text-red-600"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}