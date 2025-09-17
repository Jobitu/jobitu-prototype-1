import React, { useEffect, useState } from "react";
import { SecondaryTabNavigation } from "../SecondaryTabNavigation";
import { useTabContent } from "../TabContentProvider";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { 
  Shield,
  Globe,
  Smartphone,
  Monitor,
  LogOut,
  Moon,
  Sun,
  Bell,
  Mail,
  QrCode,
  MapPin,
  Clock,
  Save,
  X,
  RotateCcw,
  Chrome,
  Lock,
  Building,
  Eye,
  Users,
  MessageSquare,
  Calendar,
  Megaphone,
  Settings as SettingsIcon
} from "lucide-react";
import { toast } from "sonner";
import { getCurrentTheme, setTheme as applyTheme } from "../../utils/theme";

interface EmployerSettingsPageProps {
  onSubTabChange?: (tab: string) => void;
}

interface NotificationSettings {
  applicationEvents: {
    newApplication: boolean;
    statusChange: boolean;
  };
  communication: {
    newMessage: boolean;
    interviewReminders: boolean;
  };
  platformUpdates: {
    announcements: boolean;
  };
  deliveryChannels: {
    email: boolean;
    inApp: boolean;
    push: boolean;
  };
}

interface SecuritySettings {
  twoFactorEnabled: boolean;
  companyVisibility: 'public' | 'applicants-only' | 'private';
}

interface AppearanceSettings {
  theme: 'system' | 'light' | 'dark';
  navigationStyle: 'fixed' | 'auto-hide';
  highContrast: boolean;
}

interface LanguageSettings {
  language: string;
  region: string;
  timeZone: string;
  dateFormat: 'dd/mm/yyyy' | 'mm/dd/yyyy';
}

export function EmployerSettingsPage({ onSubTabChange }: EmployerSettingsPageProps) {
  const { activeSubTab } = useTabContent();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [show2FADialog, setShow2FADialog] = useState(false);

  // Notification settings state
  const [notifications, setNotifications] = useState<NotificationSettings>({
    applicationEvents: {
      newApplication: true,
      statusChange: true,
    },
    communication: {
      newMessage: true,
      interviewReminders: true,
    },
    platformUpdates: {
      announcements: false,
    },
    deliveryChannels: {
      email: true,
      inApp: true,
      push: false,
    },
  });

  // Security settings state
  const [security, setSecurity] = useState<SecuritySettings>({
    twoFactorEnabled: false,
    companyVisibility: 'public',
  });

  // Appearance settings state
  const [appearance, setAppearance] = useState<AppearanceSettings>({
    theme: 'light',
    navigationStyle: 'fixed',
    highContrast: false,
  });

  // Hydrate theme preference from storage on mount
  useEffect(() => {
    const saved = getCurrentTheme();
    setAppearance(prev => ({ ...prev, theme: saved }));
  }, []);

  // Language settings state
  const [language, setLanguage] = useState<LanguageSettings>({
    language: 'en',
    region: 'US',
    timeZone: 'America/New_York',
    dateFormat: 'mm/dd/yyyy',
  });

  const activeTab = activeSubTab || 'notifications';

  const handleTabChange = (tab: string) => {
    onSubTabChange?.(tab);
  };

  const handleSaveChanges = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setHasUnsavedChanges(false);
      toast.success("Settings saved successfully");
    } catch (error) {
      toast.error("Failed to save settings");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDiscardChanges = () => {
    setHasUnsavedChanges(false);
    // Reset to original values
    toast.info("Changes discarded");
  };

  const mockActiveSessions = [
    {
      id: '1',
      device: 'Chrome on Windows',
      location: 'New York, NY',
      lastActive: '1 hour ago',
      current: true
    },
    {
      id: '2',
      device: 'Safari on MacOS',
      location: 'New York, NY',
      lastActive: '2 days ago',
      current: false
    }
  ];

  const renderNotifications = () => (
    <div className="space-y-8">
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          Manage when and how you receive notifications about your hiring activities.
        </p>
      </div>

      {/* Application Events */}
      <Card className="border border-border shadow-sm bg-card">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-border">
          <CardTitle className="flex items-center gap-3 text-xl text-foreground">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            Application Events
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg border border-border">
            <div>
              <p className="font-medium text-foreground">New Application Received</p>
              <p className="text-sm text-muted-foreground">
                Notify when candidates apply to your job postings
              </p>
            </div>
            <Switch
              checked={notifications.applicationEvents.newApplication}
              onCheckedChange={(checked) => {
                setNotifications(prev => ({
                  ...prev,
                  applicationEvents: { ...prev.applicationEvents, newApplication: checked }
                }));
                setHasUnsavedChanges(true);
              }}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-muted rounded-lg border border-border">
            <div>
              <p className="font-medium text-foreground">Application Status Change</p>
              <p className="text-sm text-muted-foreground">
                Notify when application statuses are updated by your team
              </p>
            </div>
            <Switch
              checked={notifications.applicationEvents.statusChange}
              onCheckedChange={(checked) => {
                setNotifications(prev => ({
                  ...prev,
                  applicationEvents: { ...prev.applicationEvents, statusChange: checked }
                }));
                setHasUnsavedChanges(true);
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Communication */}
      <Card className="border border-border shadow-sm bg-card">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-border">
          <CardTitle className="flex items-center gap-3 text-xl text-foreground">
            <div className="p-2 bg-green-100 rounded-lg">
              <MessageSquare className="h-5 w-5 text-green-600" />
            </div>
            Communication
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg border border-border">
            <div>
              <p className="font-medium text-foreground">New Message from Candidate</p>
              <p className="text-sm text-muted-foreground">
                Notify when candidates send you messages
              </p>
            </div>
            <Switch
              checked={notifications.communication.newMessage}
              onCheckedChange={(checked) => {
                setNotifications(prev => ({
                  ...prev,
                  communication: { ...prev.communication, newMessage: checked }
                }));
                setHasUnsavedChanges(true);
              }}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-muted rounded-lg border border-border">
            <div>
              <p className="font-medium text-foreground">Interview Reminders</p>
              <p className="text-sm text-muted-foreground">
                Reminders for upcoming interviews and schedule changes
              </p>
            </div>
            <Switch
              checked={notifications.communication.interviewReminders}
              onCheckedChange={(checked) => {
                setNotifications(prev => ({
                  ...prev,
                  communication: { ...prev.communication, interviewReminders: checked }
                }));
                setHasUnsavedChanges(true);
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Platform Updates */}
      <Card className="border border-border shadow-sm bg-card">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-border">
          <CardTitle className="flex items-center gap-3 text-xl text-foreground">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Megaphone className="h-5 w-5 text-purple-600" />
            </div>
            Platform Updates
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg border border-border">
            <div>
              <p className="font-medium text-foreground">Platform Announcements & Insights</p>
              <p className="text-sm text-muted-foreground">
                New features, industry insights, and platform updates
              </p>
            </div>
            <Switch
              checked={notifications.platformUpdates.announcements}
              onCheckedChange={(checked) => {
                setNotifications(prev => ({
                  ...prev,
                  platformUpdates: { ...prev.platformUpdates, announcements: checked }
                }));
                setHasUnsavedChanges(true);
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Delivery Method Settings */}
      <Card className="border border-border shadow-sm bg-card">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b border-border">
          <CardTitle className="flex items-center gap-3 text-xl text-foreground">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Bell className="h-5 w-5 text-orange-600" />
            </div>
            Delivery Method Settings
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Choose how you want to receive notifications.
          </p>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg border border-border">
            <Checkbox
              id="email-delivery"
              checked={notifications.deliveryChannels.email}
              onCheckedChange={(checked) => {
                setNotifications(prev => ({
                  ...prev,
                  deliveryChannels: { ...prev.deliveryChannels, email: checked as boolean }
                }));
                setHasUnsavedChanges(true);
              }}
              className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
            />
            <Label htmlFor="email-delivery" className="flex items-center space-x-3 cursor-pointer">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Mail className="h-4 w-4 text-blue-600" />
              </div>
              <span className="font-medium text-foreground">Email</span>
            </Label>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg border border-border">
            <Checkbox
              id="inapp-delivery"
              checked={notifications.deliveryChannels.inApp}
              onCheckedChange={(checked) => {
                setNotifications(prev => ({
                  ...prev,
                  deliveryChannels: { ...prev.deliveryChannels, inApp: checked as boolean }
                }));
                setHasUnsavedChanges(true);
              }}
              className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
            />
            <Label htmlFor="inapp-delivery" className="flex items-center space-x-3 cursor-pointer">
              <div className="p-2 bg-green-100 rounded-lg">
                <Bell className="h-4 w-4 text-green-600" />
              </div>
              <span className="font-medium text-foreground">In-app</span>
            </Label>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg border border-border">
            <Checkbox
              id="push-delivery"
              checked={notifications.deliveryChannels.push}
              onCheckedChange={(checked) => {
                setNotifications(prev => ({
                  ...prev,
                  deliveryChannels: { ...prev.deliveryChannels, push: checked as boolean }
                }));
                setHasUnsavedChanges(true);
              }}
              className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
            />
            <Label htmlFor="push-delivery" className="flex items-center space-x-3 cursor-pointer">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Smartphone className="h-4 w-4 text-purple-600" />
              </div>
              <span className="font-medium text-foreground">Push notifications</span>
            </Label>
          </div>

          <p className="text-xs text-muted-foreground px-4">
            Enable in your device settings to receive push notifications.
          </p>
        </CardContent>
      </Card>
    </div>
  );

  const renderPrivacySecurity = () => (
    <div className="space-y-8">
      {/* Security Section */}
      <Card className="border border-border shadow-sm bg-card">
        <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 border-b border-border">
          <CardTitle className="flex items-center gap-3 text-xl text-foreground">
            <div className="p-2 bg-red-100 rounded-lg">
              <Shield className="h-5 w-5 text-red-600" />
            </div>
            Security
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 space-y-8">
          {/* Two-Factor Authentication */}
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg border border-border">
              <div>
                <h4 className="font-medium text-foreground">Two-Factor Authentication (2FA)</h4>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your employer account
                </p>
              </div>
              <Badge 
                variant={security.twoFactorEnabled ? "default" : "outline"}
                className={security.twoFactorEnabled ? "bg-emerald-100 text-emerald-800 border-emerald-200" : "bg-muted text-foreground border-border"}
              >
                {security.twoFactorEnabled ? "Enabled" : "Disabled"}
              </Badge>
            </div>

            {!security.twoFactorEnabled ? (
              <Dialog open={show2FADialog} onOpenChange={setShow2FADialog}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100">
                    <Shield className="h-4 w-4 mr-2" />
                    Enable 2FA
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Enable Two-Factor Authentication</DialogTitle>
                    <DialogDescription>
                      Scan the QR code with your authenticator app, then enter the 6-digit verification code.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="flex justify-center">
                      <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center">
                        <QrCode className="h-16 w-16 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="verification-code" className="text-sm font-medium text-foreground">Verification Code</Label>
                      <Input
                        id="verification-code"
                        placeholder="000000"
                        className="text-center font-mono text-lg tracking-widest bg-muted border-border focus:bg-background focus:border-ring"
                        maxLength={6}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShow2FADialog(false)}>
                      Cancel
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700">Enable 2FA</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            ) : (
              <div className="space-x-3">
                <Button variant="outline" size="sm" className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100">
                  Disable 2FA
                </Button>
              </div>
            )}
          </div>

          <Separator className="my-8" />

          {/* Active Sessions */}
          <div className="space-y-6">
            <h4 className="text-lg font-medium text-foreground">Active Sessions</h4>
            <div className="bg-muted border border-border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted">
                    <TableHead className="font-medium text-foreground">Device</TableHead>
                    <TableHead className="font-medium text-foreground">Location</TableHead>
                    <TableHead className="font-medium text-foreground">Last Active</TableHead>
                    <TableHead className="font-medium text-foreground">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockActiveSessions.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Chrome className="h-4 w-4 text-blue-600" />
                          </div>
                          <span className="font-medium">{session.device}</span>
                          {session.current && (
                            <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">Current</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{session.location}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {session.lastActive}
                      </TableCell>
                      <TableCell>
                        {!session.current && (
                          <Button variant="outline" size="sm" className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100">
                            <LogOut className="h-3 w-3 mr-1" />
                            Sign Out
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div>
              <Button variant="outline" size="sm" className="bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100">
                Sign Out of All Other Sessions
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Section */}
      <Card className="border border-border shadow-sm bg-card">
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-border">
          <CardTitle className="flex items-center gap-3 text-xl text-foreground">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Eye className="h-5 w-5 text-indigo-600" />
            </div>
            Privacy
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <div className="space-y-4">
            <Label htmlFor="company-visibility" className="text-sm font-medium text-foreground">Company Profile Visibility</Label>
            <Select 
              value={security.companyVisibility}
              onValueChange={(value: 'public' | 'applicants-only' | 'private') => {
                setSecurity(prev => ({ ...prev, companyVisibility: value }));
                setHasUnsavedChanges(true);
              }}
            >
              <SelectTrigger className="bg-muted border-border focus:bg-background focus:border-ring">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">
                  <div className="py-2">
                    <p className="font-medium">Public</p>
                    <p className="text-sm text-muted-foreground">
                      Visible to all candidates and job seekers
                    </p>
                  </div>
                </SelectItem>
                <SelectItem value="applicants-only">
                  <div className="py-2">
                    <p className="font-medium">Visible to Applicants Only</p>
                    <p className="text-sm text-muted-foreground">
                      Only candidates who apply can see your full profile
                    </p>
                  </div>
                </SelectItem>
                <SelectItem value="private">
                  <div className="py-2">
                    <p className="font-medium">Private</p>
                    <p className="text-sm text-muted-foreground">
                      Hidden from public view and candidate searches
                    </p>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Controls who can discover and view your company profile on the platform.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAppearance = () => (
    <div className="space-y-8">
      {/* Theme Selection */}
      <Card className="border border-border shadow-sm bg-card">
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-border">
          <CardTitle className="flex items-center gap-3 text-xl text-foreground">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Monitor className="h-5 w-5 text-indigo-600" />
            </div>
            Theme Selection
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <RadioGroup 
            value={appearance.theme} 
            onValueChange={(value: 'system' | 'light' | 'dark') => {
              setAppearance(prev => ({ ...prev, theme: value }));
              applyTheme(value);
              setHasUnsavedChanges(true);
            }}
            className="space-y-3"
          >
            <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg border border-border hover:bg-muted transition-colors">
              <RadioGroupItem 
                value="system" 
                id="system-theme" 
                className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 border-2"
              />
              <Label htmlFor="system-theme" className="flex items-center space-x-3 cursor-pointer flex-1">
                <div className="p-2 bg-muted rounded-lg">
                  <Monitor className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <span className="font-medium text-foreground">System</span>
                  <p className="text-sm text-muted-foreground">Use your system's theme setting</p>
                </div>
              </Label>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg border border-border hover:bg-muted transition-colors">
              <RadioGroupItem 
                value="light" 
                id="light-theme" 
                className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 border-2"
              />
              <Label htmlFor="light-theme" className="flex items-center space-x-3 cursor-pointer flex-1">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Sun className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <span className="font-medium text-foreground">Light</span>
                  <p className="text-sm text-muted-foreground">Clean bright appearance</p>
                </div>
              </Label>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg border border-border hover:bg-muted transition-colors">
              <RadioGroupItem 
                value="dark" 
                id="dark-theme" 
                className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 border-2"
              />
              <Label htmlFor="dark-theme" className="flex items-center space-x-3 cursor-pointer flex-1">
                <div className="p-2 bg-muted rounded-lg">
                  <Moon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <span className="font-medium text-foreground">Dark</span>
                  <p className="text-sm text-muted-foreground">Easy on the eyes in low light</p>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Navigation Style */}
      <Card className="border border-border shadow-sm bg-card">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-border">
          <CardTitle className="flex items-center gap-3 text-xl text-foreground">
            <div className="p-2 bg-green-100 rounded-lg">
              <SettingsIcon className="h-5 w-5 text-green-600" />
            </div>
            Navigation Style
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <div className="space-y-4">
            <Label htmlFor="nav-style" className="text-sm font-medium text-foreground">Sidebar Behavior</Label>
            <Select 
              value={appearance.navigationStyle}
              onValueChange={(value: 'fixed' | 'auto-hide') => {
                setAppearance(prev => ({ ...prev, navigationStyle: value }));
                setHasUnsavedChanges(true);
              }}
            >
              <SelectTrigger className="bg-muted border-border focus:bg-background focus:border-ring">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fixed">Fixed</SelectItem>
                <SelectItem value="auto-hide">Auto-hide</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Choose how the navigation sidebar behaves on your screen.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* High Contrast Mode */}
      <Card className="border border-border shadow-sm bg-card">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-border">
          <CardTitle className="flex items-center gap-3 text-xl text-foreground">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Eye className="h-5 w-5 text-purple-600" />
            </div>
            Accessibility
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg border border-border">
            <div>
              <p className="font-medium text-foreground">High Contrast Mode</p>
              <p className="text-sm text-muted-foreground">
                Increase contrast for better visibility and accessibility
              </p>
            </div>
            <Switch
              checked={appearance.highContrast}
              onCheckedChange={(checked) => {
                setAppearance(prev => ({ ...prev, highContrast: checked }));
                setHasUnsavedChanges(true);
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Preview Area */}
      <Card className="border border-border shadow-sm bg-card">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-border">
          <CardTitle className="flex items-center gap-3 text-xl text-foreground">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Eye className="h-5 w-5 text-blue-600" />
            </div>
            Preview
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="p-6 border border-border rounded-lg space-y-4 bg-muted">
            <div className="h-10 bg-primary rounded-lg flex items-center px-4 shadow-sm">
              <span className="text-primary-foreground font-medium">Navigation bar</span>
            </div>
            <div className="h-20 bg-muted rounded-lg flex items-center px-4 shadow-sm">
              <span className="text-muted-foreground">Dashboard content area</span>
            </div>
            <div className="h-16 bg-card border border-border rounded-lg flex items-center px-4 shadow-sm">
              <span className="text-card-foreground">Card component</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderLanguageRegion = () => (
    <div className="space-y-8">
      {/* Language Selection */}
      <Card className="border border-border shadow-sm bg-card">
        <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50 border-b border-border">
          <CardTitle className="flex items-center gap-3 text-xl text-foreground">
            <div className="p-2 bg-green-100 rounded-lg">
              <Globe className="h-5 w-5 text-green-600" />
            </div>
            Language Selection
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <div className="space-y-4">
            <Label htmlFor="language-select" className="text-sm font-medium text-foreground">Display Language</Label>
            <Select 
              value={language.language}
              onValueChange={(value) => {
                setLanguage(prev => ({ ...prev, language: value }));
                setHasUnsavedChanges(true);
              }}
            >
              <SelectTrigger className="bg-muted border-border focus:bg-background focus:border-ring">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
                <SelectItem value="tr">Turkish</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Some content may not be fully translated.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Region Selection */}
      <Card className="border border-border shadow-sm bg-card">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-border">
          <CardTitle className="flex items-center gap-3 text-xl text-foreground">
            <div className="p-2 bg-blue-100 rounded-lg">
              <MapPin className="h-5 w-5 text-blue-600" />
            </div>
            Region Selection
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <div className="space-y-4">
            <Label htmlFor="region-select" className="text-sm font-medium text-foreground">Country/Region</Label>
            <Select 
              value={language.region}
              onValueChange={(value) => {
                setLanguage(prev => ({ ...prev, region: value }));
                setHasUnsavedChanges(true);
              }}
            >
              <SelectTrigger className="bg-muted border-border focus:bg-background focus:border-ring">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="US">United States</SelectItem>
                <SelectItem value="CA">Canada</SelectItem>
                <SelectItem value="GB">United Kingdom</SelectItem>
                <SelectItem value="DE">Germany</SelectItem>
                <SelectItem value="TR">Turkey</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Affects local hiring laws, compliance, and talent pool recommendations.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Time Zone Selection */}
      <Card className="border border-border shadow-sm bg-card">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-border">
          <CardTitle className="flex items-center gap-3 text-xl text-foreground">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Clock className="h-5 w-5 text-purple-600" />
            </div>
            Time Zone Selection
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <div className="space-y-4">
            <Label htmlFor="timezone-select" className="text-sm font-medium text-foreground">Time Zone</Label>
            <Select 
              value={language.timeZone}
              onValueChange={(value) => {
                setLanguage(prev => ({ ...prev, timeZone: value }));
                setHasUnsavedChanges(true);
              }}
            >
              <SelectTrigger className="bg-muted border-border focus:bg-background focus:border-ring">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                <SelectItem value="Europe/London">Greenwich Mean Time (GMT)</SelectItem>
                <SelectItem value="Europe/Istanbul">Turkey Time (TRT)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Used for scheduling interviews and displaying timestamps.
            </p>
          </div>

          <Separator className="my-8" />

          <div className="space-y-4">
            <Label className="text-sm font-medium text-foreground">Date Format</Label>
            <RadioGroup
              value={language.dateFormat}
              onValueChange={(value: 'dd/mm/yyyy' | 'mm/dd/yyyy') => {
                setLanguage(prev => ({ ...prev, dateFormat: value }));
                setHasUnsavedChanges(true);
              }}
              className="space-y-3"
            >
              <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg border border-border hover:bg-muted transition-colors">
                <RadioGroupItem 
                  value="mm/dd/yyyy" 
                  id="date-us-format" 
                  className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 border-2"
                />
                <Label htmlFor="date-us-format" className="cursor-pointer flex-1">
                  <span className="font-medium text-foreground">MM/DD/YYYY (US)</span>
                  <p className="text-sm text-muted-foreground">Example: 01/15/2024</p>
                </Label>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg border border-border hover:bg-muted transition-colors">
                <RadioGroupItem 
                  value="dd/mm/yyyy" 
                  id="date-eu-format" 
                  className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 border-2"
                />
                <Label htmlFor="date-eu-format" className="cursor-pointer flex-1">
                  <span className="font-medium text-foreground">DD/MM/YYYY (European)</span>
                  <p className="text-sm text-muted-foreground">Example: 15/01/2024</p>
                </Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'notifications':
        return renderNotifications();
      case 'privacy-security':
        return renderPrivacySecurity();
      case 'appearance':
        return renderAppearance();
      case 'language-region':
        return renderLanguageRegion();
      default:
        return renderNotifications();
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6">
          {renderContent()}
        </div>
      </div>

      {/* Fixed Save Bar */}
      {hasUnsavedChanges && (
        <div className="border-t border-border bg-card p-4 shadow-lg">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <p className="text-sm text-muted-foreground">You have unsaved changes</p>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDiscardChanges}
                className="bg-background hover:bg-muted"
              >
                <X className="h-4 w-4 mr-2" />
                Discard
              </Button>
              <Button
                size="sm"
                onClick={handleSaveChanges}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}