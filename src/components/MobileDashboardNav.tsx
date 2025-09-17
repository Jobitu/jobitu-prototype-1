import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { 
  Home, 
  Search, 
  Bookmark, 
  User, 
  Bell,
  Menu
} from "lucide-react";
import { OnboardingData } from "./OnboardingFlow";

interface MobileDashboardNavProps {
  userData?: OnboardingData;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function MobileDashboardNav({ userData, activeTab, onTabChange }: MobileDashboardNavProps) {
  if (!userData) {
    return null;
  }

  return (
    <>
      {/* Top Mobile Header */}
      <div className="md:hidden bg-background border-b border-border sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={userData.basicInfo?.profilePicture} />
              <AvatarFallback>
                {userData.basicInfo?.fullName?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-semibold">
                {userData.basicInfo?.fullName?.split(' ')[0] || 'User'}
              </h1>
              <p className="text-xs text-muted-foreground">
                {userData.basicInfo?.currentRole || "Job Seeker"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs"
              >
                3
              </Badge>
            </Button>
            <Button variant="ghost" size="sm">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50">
        <div className="flex items-center justify-around py-2">
          <Button
            variant={activeTab === 'home' ? 'default' : 'ghost'}
            size="sm"
            className="flex-1 flex-col h-12 max-w-none"
            onClick={() => onTabChange('home')}
          >
            <Home className="h-4 w-4" />
            <span className="text-xs mt-1">Home</span>
          </Button>
          <Button
            variant={activeTab === 'search' ? 'default' : 'ghost'}
            size="sm"
            className="flex-1 flex-col h-12 max-w-none"
            onClick={() => onTabChange('search')}
          >
            <Search className="h-4 w-4" />
            <span className="text-xs mt-1">Search</span>
          </Button>
          <Button
            variant={activeTab === 'saved' ? 'default' : 'ghost'}
            size="sm"
            className="flex-1 flex-col h-12 max-w-none"
            onClick={() => onTabChange('saved')}
          >
            <Bookmark className="h-4 w-4" />
            <span className="text-xs mt-1">Saved</span>
          </Button>
          <Button
            variant={activeTab === 'profile' ? 'default' : 'ghost'}
            size="sm"
            className="flex-1 flex-col h-12 max-w-none"
            onClick={() => onTabChange('profile')}
          >
            <User className="h-4 w-4" />
            <span className="text-xs mt-1">Profile</span>
          </Button>
        </div>
      </div>
    </>
  );
}