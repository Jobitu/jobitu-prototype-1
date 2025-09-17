import React, { useEffect, useState } from "react";
import { useTabContent } from "./TabContentProvider";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { 
  Camera,
  Shield,
  Check,
  Monitor,
  Download,
  Trash2,
  AlertTriangle,
  QrCode,
  LogOut,
  Moon,
  Sun,
  Bell,
  Lock,
  Mail,
  Phone,
  Chrome,
  Smartphone,
  Save,
  X,
  Globe
} from "lucide-react";
import { toast } from "sonner";
import { getCurrentTheme, setTheme as applyTheme } from "../utils/theme";

interface CandidateSettingsPageProps {
  onSubTabChange?: (tab: string) => void;
}

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
}

interface SecuritySettings {
  twoFactorEnabled: boolean;
  lastPasswordChange: string;
}

interface NotificationSettings {
  applicationUpdates: boolean;
  messages: boolean;
  interviewReminders: boolean;
  careerTips: boolean;
  deliveryChannels: {
    email: boolean;
    inApp: boolean;
    push: boolean;
  };
}

interface AppearanceSettings {
  theme: 'system' | 'light' | 'dark';
  fontSize: 'small' | 'medium' | 'large';
  highContrast: boolean;
  keepMenuVisible: boolean;
  autoCollapseMenu: boolean;
}

interface LanguageSettings {
  language: string;
  region: string;
  timeZone: string;
  dateFormat: 'system' | 'dd/mm/yyyy' | 'mm/dd/yyyy';
}

export function CandidateSettingsPage({ onSubTabChange }: CandidateSettingsPageProps) {
  const { activeSubTab } = useTabContent();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDeactivateDialog, setShowDeactivateDialog] = useState(false);
  const [show2FADialog, setShow2FADialog] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');

  // User profile state
  const [profile, setProfile] = useState<UserProfile>({
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    isEmailVerified: true,
    isPhoneVerified: false
  });

  // Security state
  const [security, setSecurity] = useState<SecuritySettings>({
    twoFactorEnabled: false,
    lastPasswordChange: '2024-01-15'
  });

  // Notification settings state
  const [notifications, setNotifications] = useState<NotificationSettings>({
    applicationUpdates: true,
    messages: true,
    interviewReminders: true,
    careerTips: false,
    deliveryChannels: {
      email: true,
      inApp: true,
      push: false
    }
  });

  // Appearance settings state
  const [appearance, setAppearance] = useState<AppearanceSettings>({
    theme: 'light',
    fontSize: 'medium',
    highContrast: false,
    keepMenuVisible: true,
    autoCollapseMenu: true
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
    dateFormat: 'mm/dd/yyyy'
  });

  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [passwordStrength, setPasswordStrength] = useState(0);

  const activeTab = activeSubTab || 'account-settings';

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

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
  };

  const renderAccountSettings = () => (
    <div className="space-y-8">
      {/* Basic Info */}
      <Card className="border border-border shadow-sm bg-card">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-border">
          <CardTitle className="flex items-center gap-3 text-xl text-foreground">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Camera className="h-5 w-5 text-blue-600" />
            </div>
            Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 space-y-8">
          {/* Avatar */}
          <div className="flex items-center space-x-6">
            <div className="relative">
              <Avatar className="h-24 w-24 ring-4 ring-blue-100">
                <AvatarImage src={profile.avatar} />
                <AvatarFallback className="text-xl bg-gradient-to-br from-blue-100 to-purple-100 text-blue-700">
                  {profile.firstName[0]}{profile.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 p-2 bg-background rounded-full shadow-lg border border-border">
                <Camera className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <div className="space-y-3">
              <Button variant="outline" size="sm" className="bg-background hover:bg-muted border-border">
                <Camera className="h-4 w-4 mr-2" />
                Change Photo
              </Button>
              <p className="text-sm text-muted-foreground">
                JPG or PNG. Max size 5MB.
              </p>
            </div>
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm font-medium text-muted-foreground">First Name</Label>
              <Input
                id="firstName"
                value={profile.firstName}
                onChange={(e) => {
                  setProfile(prev => ({ ...prev, firstName: e.target.value }));
                  setHasUnsavedChanges(true);
                }}
                className="bg-muted border-border focus:bg-background focus:border-primary focus:ring-primary/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-sm font-medium text-muted-foreground">Last Name</Label>
              <Input
                id="lastName"
                value={profile.lastName}
                onChange={(e) => {
                  setProfile(prev => ({ ...prev, lastName: e.target.value }));
                  setHasUnsavedChanges(true);
                }}
                className="bg-muted border-border focus:bg-background focus:border-primary focus:ring-primary/20"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-muted-foreground">Email Address</Label>
            <div className="flex items-center space-x-3">
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => {
                  setProfile(prev => ({ ...prev, email: e.target.value }));
                  setHasUnsavedChanges(true);
                }}
                className="bg-muted border-border focus:bg-background focus:border-primary focus:ring-primary/20"
              />
              {profile.isEmailVerified && (
                <Badge variant="outline" className="text-emerald-700 border-emerald-200 bg-emerald-50 px-3 py-1">
                  <Check className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              )}
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium text-muted-foreground">Phone Number</Label>
            <div className="flex items-center space-x-3">
              <Input
                id="phone"
                value={profile.phone}
                onChange={(e) => {
                  setProfile(prev => ({ ...prev, phone: e.target.value }));
                  setHasUnsavedChanges(true);
                }}
                className="bg-muted border-border focus:bg-background focus:border-primary focus:ring-primary/20"
              />
              {!profile.isPhoneVerified && (
                <Button variant="outline" size="sm" className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100">
                  Verify
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Login & Authentication */}
      <Card className="border border-border shadow-sm bg-card">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-border">
          <CardTitle className="flex items-center gap-3 text-xl text-foreground">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Lock className="h-5 w-5 text-purple-600" />
            </div>
            Login & Authentication
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 space-y-8">
          {/* Change Password */}
          <div className="space-y-6">
            <h4 className="text-lg font-medium text-foreground">Change Password</h4>
            <div className="space-y-4 max-w-md">
              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="text-sm font-medium text-muted-foreground">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                  className="bg-muted border-border focus:bg-background focus:border-primary focus:ring-primary/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-sm font-medium text-muted-foreground">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => {
                    const value = e.target.value;
                    setPasswordForm(prev => ({ ...prev, newPassword: value }));
                    setPasswordStrength(calculatePasswordStrength(value));
                  }}
                  className="bg-muted border-border focus:bg-background focus:border-primary focus:ring-primary/20"
                />
                {passwordForm.newPassword && (
                  <div className="mt-3">
                    <Progress value={passwordStrength} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-2">
                      Password strength: {passwordStrength < 50 ? 'Weak' : passwordStrength < 75 ? 'Good' : 'Strong'}
                    </p>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-muted-foreground">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="bg-muted border-border focus:bg-background focus:border-primary focus:ring-primary/20"
                />
              </div>
              <Button variant="outline" size="sm" className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100">
                Update Password
              </Button>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Connected Accounts */}
          <div className="space-y-6">
            <h4 className="text-lg font-medium text-foreground">Connected Accounts</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted border border-border rounded-xl">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center ring-2 ring-red-100 bg-background">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                      role="img"
                    >
                      <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C32.689,6.053,28.556,4,24,4C12.955,4,4,12.955,4,24 s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                      <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,16.043,18.961,13,24,13c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657 C32.689,6.053,28.556,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                      <path fill="#4CAF50" d="M24,44c5.176,0,9.86-1.977,13.409-5.197l-6.197-5.238C29.211,35.091,26.715,36,24,36 c-5.185,0-9.592-3.315-11.227-7.946l-6.513,5.025C9.592,39.031,16.292,44,24,44z"/>
                      <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.091,5.565l6.197,5.238 C40.098,35.866,44,30.455,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Google</p>
                    <p className="text-sm text-muted-foreground">alex.johnson@gmail.com</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-emerald-700 border-emerald-200 bg-emerald-50 px-3 py-1">
                  Connected
                </Badge>
              </div>
              <div className="flex items-center justify-between p-4 bg-muted border border-border rounded-xl">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center ring-2 ring-blue-100 bg-background">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 448 512"
                      aria-hidden="true"
                      role="img"
                    >
                      <path fill="#0A66C2" d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8S24.09 -0.5 53.79 -0.5s53.79 24.5 53.79 54.3c0 29.7-24.09 54.3-53.79 54.3zM447.9 448h-92.7V302.4c0-34.7-12.5-58.4-43.6-58.4-23.8 0-38 16-44.2 31.4-2.3 5.6-2.8 13.5-2.8 21.4V448h-92.7s1.2-241.9 0-266.6h92.7v37.8c12.3-19 34.2-46 83.3-46 60.8 0 106.5 39.7 106.5 125.1V448z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">LinkedIn</p>
                    <p className="text-sm text-muted-foreground">Not connected</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100">
                  Connect
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-8">
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          Control when we notify you and how you want to be contacted.
        </p>
      </div>

      {/* Notification Types */}
      <Card className="border border-border shadow-sm bg-card">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-border">
          <CardTitle className="flex items-center gap-3 text-xl text-foreground">
            <div className="p-2 bg-green-100 rounded-lg">
              <Bell className="h-5 w-5 text-green-600" />
            </div>
            Notification Types
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg border border-border">
            <div>
              <p className="font-medium text-foreground">Application Updates</p>
              <p className="text-sm text-muted-foreground">
                Status changes and next steps for your applications
              </p>
            </div>
            <Switch
              checked={notifications.applicationUpdates}
              onCheckedChange={(checked) => {
                setNotifications(prev => ({ ...prev, applicationUpdates: checked }));
                setHasUnsavedChanges(true);
              }}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-muted rounded-lg border border-border">
            <div>
              <p className="font-medium text-foreground">Messages</p>
              <p className="text-sm text-muted-foreground">
                New messages from employers
              </p>
            </div>
            <Switch
              checked={notifications.messages}
              onCheckedChange={(checked) => {
                setNotifications(prev => ({ ...prev, messages: checked }));
                setHasUnsavedChanges(true);
              }}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-muted rounded-lg border border-border">
            <div>
              <p className="font-medium text-foreground">Interview Reminders</p>
              <p className="text-sm text-muted-foreground">
                Upcoming interview reminders and changes
              </p>
            </div>
            <Switch
              checked={notifications.interviewReminders}
              onCheckedChange={(checked) => {
                setNotifications(prev => ({ ...prev, interviewReminders: checked }));
                setHasUnsavedChanges(true);
              }}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-muted rounded-lg border border-border">
            <div>
              <p className="font-medium text-foreground">Career Tips</p>
              <p className="text-sm text-muted-foreground">
                Occasional AI-driven tips to improve your job search
              </p>
            </div>
            <Switch
              checked={notifications.careerTips}
              onCheckedChange={(checked) => {
                setNotifications(prev => ({ ...prev, careerTips: checked }));
                setHasUnsavedChanges(true);
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Delivery Channels */}
      <Card className="border border-border shadow-sm bg-card">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-border">
          <CardTitle className="flex items-center gap-3 text-xl text-foreground">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Mail className="h-5 w-5 text-purple-600" />
            </div>
            Delivery Channels
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Choose where we deliver notifications.
          </p>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg border border-border">
            <Checkbox
              id="email-channel"
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
            <Label htmlFor="email-channel" className="flex items-center space-x-3 cursor-pointer">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Mail className="h-4 w-4 text-blue-600" />
              </div>
              <span className="font-medium text-foreground">Email</span>
            </Label>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg border border-border">
            <Checkbox
              id="inapp-channel"
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
            <Label htmlFor="inapp-channel" className="flex items-center space-x-3 cursor-pointer">
              <div className="p-2 bg-green-100 rounded-lg">
                <Bell className="h-4 w-4 text-green-600" />
              </div>
              <span className="font-medium text-foreground">In-app</span>
            </Label>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg border border-border">
            <Checkbox
              id="push-channel"
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
            <Label htmlFor="push-channel" className="flex items-center space-x-3 cursor-pointer">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Smartphone className="h-4 w-4 text-purple-600" />
              </div>
              <span className="font-medium text-foreground">Push notifications</span>
            </Label>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPrivacySecurity = () => (
    <div className="space-y-8">
      {/* Two-Factor Authentication */}
      <Card className="border border-border shadow-sm bg-card">
        <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 border-b border-border">
          <CardTitle className="flex items-center gap-3 text-xl text-foreground">
            <div className="p-2 bg-red-100 rounded-lg">
              <Shield className="h-5 w-5 text-red-600" />
            </div>
            Two-Factor Authentication (2FA)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg border border-border">
            <div>
              <p className="font-medium text-foreground">2FA Status</p>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security to your account
              </p>
            </div>
            <Badge 
              variant={security.twoFactorEnabled ? "default" : "outline"}
              className={security.twoFactorEnabled ? "bg-emerald-100 text-emerald-800 border-emerald-200" : "bg-muted text-muted-foreground border-border"}
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
                    Scan the QR code with your authenticator app, then enter the 6-digit code.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="flex justify-center">
                    <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center">
                      <QrCode className="h-16 w-16 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="verification-code" className="text-sm font-medium text-muted-foreground">Verification Code</Label>
                    <Input
                      id="verification-code"
                      placeholder="000000"
                      className="text-center font-mono text-lg tracking-widest bg-muted border-border focus:bg-background focus:border-primary"
                      maxLength={6}
                    />
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Download Backup Codes</Button>
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
            <div className="space-y-3">
              <Button variant="outline" size="sm" className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100">
                Regenerate Backup Codes
              </Button>
              <Button variant="outline" size="sm" className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100">
                Disable 2FA
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderAppearance = () => (
    <div className="space-y-8">
      <Card className="border border-border shadow-sm bg-card">
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-border">
          <CardTitle className="flex items-center gap-3 text-xl text-foreground">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Monitor className="h-5 w-5 text-indigo-600" />
            </div>
            Theme
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <div className="space-y-4">
            <Label className="text-sm font-medium text-muted-foreground">Theme Preference</Label>
            <RadioGroup
              value={appearance.theme}
              onValueChange={(value: 'system' | 'light' | 'dark') => {
                setAppearance(prev => ({ ...prev, theme: value }));
                applyTheme(value);
                setHasUnsavedChanges(true);
              }}
              className="space-y-3"
            >
              <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg border border-border hover:bg-muted/70 transition-colors">
                <RadioGroupItem 
                  value="system" 
                  id="system" 
                  className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 border-2"
                />
                <Label htmlFor="system" className="flex items-center space-x-3 cursor-pointer flex-1">
                  <div className="p-2 bg-muted rounded-lg">
                    <Monitor className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <span className="font-medium text-foreground">System</span>
                    <p className="text-sm text-muted-foreground">Use your system's theme setting</p>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg border border-border hover:bg-muted/70 transition-colors">
                <RadioGroupItem 
                  value="light" 
                  id="light" 
                  className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 border-2"
                />
                <Label htmlFor="light" className="flex items-center space-x-3 cursor-pointer flex-1">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Sun className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Light</span>
                    <p className="text-sm text-muted-foreground">Clean bright appearance</p>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg border border-border hover:bg-muted/70 transition-colors">
                <RadioGroupItem 
                  value="dark" 
                  id="dark" 
                  className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 border-2"
                />
                <Label htmlFor="dark" className="flex items-center space-x-3 cursor-pointer flex-1">
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
          </div>

          <Separator className="my-8" />

          <div className="space-y-4">
            <Label className="text-sm font-medium text-muted-foreground">Font Size</Label>
            <Select value={appearance.fontSize} onValueChange={(value: 'small' | 'medium' | 'large') => {
              setAppearance(prev => ({ ...prev, fontSize: value }));
              setHasUnsavedChanges(true);
            }}>
              <SelectTrigger className="bg-muted border-border focus:bg-background focus:border-primary">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between p-4 bg-muted rounded-lg border border-border">
            <div>
              <p className="font-medium text-foreground">High Contrast</p>
              <p className="text-sm text-muted-foreground">Increase contrast for better visibility</p>
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
    </div>
  );

  const renderLanguageRegion = () => (
    <div className="space-y-8">
      <Card className="border border-border shadow-sm bg-card">
        <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50 border-b border-border">
          <CardTitle className="flex items-center gap-3 text-xl text-foreground">
            <div className="p-2 bg-green-100 rounded-lg">
              <Globe className="h-5 w-5 text-green-600" />
            </div>
            Language & Region
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 space-y-8">
          <div className="space-y-4">
            <Label className="text-sm font-medium text-muted-foreground">Language</Label>
            <Select value={language.language} onValueChange={(value) => {
              setLanguage(prev => ({ ...prev, language: value }));
              setHasUnsavedChanges(true);
            }}>
              <SelectTrigger className="bg-muted border-border focus:bg-background focus:border-primary">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
                <SelectItem value="it">Italiano</SelectItem>
                <SelectItem value="pt">Português</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label className="text-sm font-medium text-muted-foreground">Region</Label>
            <Select value={language.region} onValueChange={(value) => {
              setLanguage(prev => ({ ...prev, region: value }));
              setHasUnsavedChanges(true);
            }}>
              <SelectTrigger className="bg-muted border-border focus:bg-background focus:border-primary">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="US">United States</SelectItem>
                <SelectItem value="CA">Canada</SelectItem>
                <SelectItem value="GB">United Kingdom</SelectItem>
                <SelectItem value="AU">Australia</SelectItem>
                <SelectItem value="DE">Germany</SelectItem>
                <SelectItem value="FR">France</SelectItem>
                <SelectItem value="ES">Spain</SelectItem>
                <SelectItem value="IT">Italy</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label className="text-sm font-medium text-muted-foreground">Time Zone</Label>
            <Select value={language.timeZone} onValueChange={(value) => {
              setLanguage(prev => ({ ...prev, timeZone: value }));
              setHasUnsavedChanges(true);
            }}>
              <SelectTrigger className="bg-muted border-border focus:bg-background focus:border-primary">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="America/New_York">Eastern Time</SelectItem>
                <SelectItem value="America/Chicago">Central Time</SelectItem>
                <SelectItem value="America/Denver">Mountain Time</SelectItem>
                <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                <SelectItem value="Europe/London">GMT</SelectItem>
                <SelectItem value="Europe/Paris">CET</SelectItem>
                <SelectItem value="Asia/Tokyo">JST</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label className="text-sm font-medium text-muted-foreground">Date Format</Label>
            <RadioGroup
              value={language.dateFormat}
              onValueChange={(value: 'system' | 'dd/mm/yyyy' | 'mm/dd/yyyy') => {
                setLanguage(prev => ({ ...prev, dateFormat: value }));
                setHasUnsavedChanges(true);
              }}
              className="space-y-3"
            >
              <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg border border-border hover:bg-muted/70 transition-colors">
                <RadioGroupItem 
                  value="system" 
                  id="date-system" 
                  className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 border-2"
                />
                <Label htmlFor="date-system" className="cursor-pointer flex-1">
                  <span className="font-medium text-foreground">System default</span>
                </Label>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg border border-border hover:bg-muted/70 transition-colors">
                <RadioGroupItem 
                  value="mm/dd/yyyy" 
                  id="date-us" 
                  className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 border-2"
                />
                <Label htmlFor="date-us" className="cursor-pointer flex-1">
                  <span className="font-medium text-foreground">MM/DD/YYYY (US)</span>
                </Label>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg border border-border hover:bg-muted/70 transition-colors">
                <RadioGroupItem 
                  value="dd/mm/yyyy" 
                  id="date-eu" 
                  className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 border-2"
                />
                <Label htmlFor="date-eu" className="cursor-pointer flex-1">
                  <span className="font-medium text-foreground">DD/MM/YYYY (European)</span>
                </Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAccountDeletion = () => (
    <div className="space-y-8">
      <Card className="border border-red-200 shadow-sm bg-card">
        <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 border-b border-red-100">
          <CardTitle className="flex items-center gap-3 text-xl text-red-900">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 space-y-8">
          <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
            <h4 className="text-lg font-medium text-red-900 mb-4">Deactivate Account</h4>
            <p className="text-sm text-red-700 mb-4">
              Deactivating your account will hide your profile from employers and pause job recommendations. 
              You can reactivate your account at any time.
            </p>
            <Dialog open={showDeactivateDialog} onOpenChange={setShowDeactivateDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" className="bg-background text-red-700 border-red-300 hover:bg-red-50">
                  Deactivate Account
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Deactivate Account</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to deactivate your account? This action can be reversed.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowDeactivateDialog(false)}>
                    Cancel
                  </Button>
                  <Button variant="destructive">
                    Deactivate
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
            <h4 className="text-lg font-medium text-red-900 mb-4">Delete Account</h4>
            <p className="text-sm text-red-700 mb-4">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
              <DialogTrigger asChild>
                <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Account</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete your account and all associated data.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <Label htmlFor="delete-confirmation" className="text-sm font-medium text-muted-foreground">
                    Type "DELETE" to confirm
                  </Label>
                  <Input
                    id="delete-confirmation"
                    value={deleteConfirmation}
                    onChange={(e) => setDeleteConfirmation(e.target.value)}
                    className="mt-2 bg-muted border-border focus:bg-background focus:border-red-500"
                  />
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                    Cancel
                  </Button>
                  <Button 
                    variant="destructive" 
                    disabled={deleteConfirmation !== 'DELETE'}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Delete Account
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'account-settings':
        return renderAccountSettings();
      case 'notifications':
        return renderNotifications();
      case 'privacy-security':
        return renderPrivacySecurity();
      case 'appearance':
        return renderAppearance();
      case 'language-region':
        return renderLanguageRegion();
      case 'account-deletion':
        return renderAccountDeletion();
      default:
        return renderAccountSettings();
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