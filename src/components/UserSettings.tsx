import { useState } from 'react';
import { useNotifications } from './NotificationContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Alert, AlertDescription } from './ui/alert';
import {
  ArrowLeft,
  User,
  Palette,
  Bell,
  Shield,
  Globe,
  Save,
  Camera,
  Eye,
  EyeOff,
  Trash2,
  AlertTriangle,
  Check,
  Linkedin,
  Mail,
  Lock,
  Moon,
  Sun,
  Monitor,
  Download,
  ExternalLink
} from 'lucide-react';

interface UserSettingsProps {
  onBack: () => void;
  userType: 'candidate' | 'employer' | 'admin';
}

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  linkedin?: string;
  phone?: string;
  company?: string;
  title?: string;
}

interface NotificationPreferences {
  emailAlerts: boolean;
  matchUpdates: 'real-time' | 'daily' | 'weekly' | 'off';
  interviewReminders: boolean;
  feedbackNotifications: boolean;
  marketingEmails: boolean;
  systemUpdates: boolean;
}

interface PrivacySettings {
  profileVisibility: 'public' | 'private' | 'recruiters-only';
  activityTracking: boolean;
  dataCollection: boolean;
  thirdPartySharing: boolean;
}

export function UserSettings({ onBack, userType }: UserSettingsProps) {
  const { showToast } = useNotifications();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [showPassword, setShowPassword] = useState(false);

  const [profile, setProfile] = useState<UserProfile>({
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    linkedin: 'alex-johnson-dev',
    phone: '+1 (555) 123-4567',
    company: userType === 'employer' ? 'TechFlow Inc.' : undefined,
    title: userType === 'candidate' ? 'Senior Frontend Developer' : userType === 'employer' ? 'HR Manager' : 'Platform Admin'
  });

  const [notifications, setNotifications] = useState<NotificationPreferences>({
    emailAlerts: true,
    matchUpdates: 'daily',
    interviewReminders: true,
    feedbackNotifications: true,
    marketingEmails: false,
    systemUpdates: true
  });

  const [privacy, setPrivacy] = useState<PrivacySettings>({
    profileVisibility: 'recruiters-only',
    activityTracking: true,
    dataCollection: true,
    thirdPartySharing: false
  });

  const [language, setLanguage] = useState('en');
  const [timezone, setTimezone] = useState('America/New_York');

  const handleSave = () => {
    // Simulate save
    showToast({
      type: 'success',
      title: 'Settings saved',
      message: 'Your preferences have been updated successfully.',
      duration: 3000
    });
    setHasUnsavedChanges(false);
  };

  const handleProfileChange = (field: keyof UserProfile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
  };

  const handleNotificationChange = (field: keyof NotificationPreferences, value: any) => {
    setNotifications(prev => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
  };

  const handlePrivacyChange = (field: keyof PrivacySettings, value: any) => {
    setPrivacy(prev => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
  };

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    setHasUnsavedChanges(true);
    
    // Apply theme immediately
    if (newTheme === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', isDark);
    } else {
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/30 to-blue-50/30">
      {/* Header */}
      <div className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" onClick={onBack} className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-gray-600 to-blue-600 w-8 h-8 rounded-lg flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold">Settings</h1>
                  <p className="text-sm text-muted-foreground">Manage your account and preferences</p>
                </div>
              </div>
            </div>
            
            {hasUnsavedChanges && (
              <Button onClick={handleSave} className="gap-2">
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {hasUnsavedChanges && (
          <Alert className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              You have unsaved changes. Don't forget to save your preferences.
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile" className="gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="theme" className="gap-2">
              <Palette className="h-4 w-4" />
              Theme
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="gap-2">
              <Shield className="h-4 w-4" />
              Privacy
            </TabsTrigger>
            <TabsTrigger value="language" className="gap-2">
              <Globe className="h-4 w-4" />
              Language
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information and profile details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Picture */}
                <div className="flex items-center gap-6">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={profile.avatar} />
                    <AvatarFallback className="text-lg">
                      {profile.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Camera className="h-4 w-4" />
                      Change Photo
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      JPG, PNG or GIF. Max size 2MB.
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => handleProfileChange('name', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => handleProfileChange('email', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={profile.phone || ''}
                      onChange={(e) => handleProfileChange('phone', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">
                      {userType === 'candidate' ? 'Current Role' : userType === 'employer' ? 'Job Title' : 'Position'}
                    </Label>
                    <Input
                      id="title"
                      value={profile.title || ''}
                      onChange={(e) => handleProfileChange('title', e.target.value)}
                    />
                  </div>
                  {(userType === 'employer' || userType === 'admin') && (
                    <div className="space-y-2">
                      <Label htmlFor="company">
                        {userType === 'employer' ? 'Company' : 'Organization'}
                      </Label>
                      <Input
                        id="company"
                        value={profile.company || ''}
                        onChange={(e) => handleProfileChange('company', e.target.value)}
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn Profile</Label>
                    <div className="flex">
                      <div className="flex items-center px-3 bg-muted border border-r-0 rounded-l-md">
                        <Linkedin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground ml-2">linkedin.com/in/</span>
                      </div>
                      <Input
                        id="linkedin"
                        className="rounded-l-none"
                        value={profile.linkedin || ''}
                        onChange={(e) => handleProfileChange('linkedin', e.target.value)}
                        placeholder="your-profile"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Password Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Security</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="current-password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter current password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input
                        id="new-password"
                        type="password"
                        placeholder="Enter new password"
                      />
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Lock className="h-4 w-4" />
                    Update Password
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Theme Tab */}
          <TabsContent value="theme" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>
                  Customize how Jobitu looks and feels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label className="text-base font-medium">Theme Preference</Label>
                  <RadioGroup
                    value={theme}
                    onValueChange={(value: 'light' | 'dark' | 'system') => handleThemeChange(value)}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  >
                    <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted/30 transition-colors">
                      <RadioGroupItem value="light" id="light" />
                      <div className="flex items-center space-x-3">
                        <div className="bg-yellow-100 p-2 rounded-lg">
                          <Sun className="h-5 w-5 text-yellow-600" />
                        </div>
                        <div>
                          <Label htmlFor="light" className="cursor-pointer">Light</Label>
                          <p className="text-xs text-muted-foreground">Clean and bright interface</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted/30 transition-colors">
                      <RadioGroupItem value="dark" id="dark" />
                      <div className="flex items-center space-x-3">
                        <div className="bg-slate-100 p-2 rounded-lg">
                          <Moon className="h-5 w-5 text-slate-600" />
                        </div>
                        <div>
                          <Label htmlFor="dark" className="cursor-pointer">Dark</Label>
                          <p className="text-xs text-muted-foreground">Easy on the eyes</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted/30 transition-colors">
                      <RadioGroupItem value="system" id="system" />
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <Monitor className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <Label htmlFor="system" className="cursor-pointer">System</Label>
                          <p className="text-xs text-muted-foreground">Matches your device</p>
                        </div>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                <div className="space-y-4">
                  <Label className="text-base font-medium">Preview</Label>
                  <div className="border rounded-lg p-4 bg-card">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Sample Interface</h4>
                        <Badge variant="outline">Preview</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        This is how your interface will look with the selected theme.
                      </p>
                      <div className="flex gap-2">
                        <Button size="sm">Primary Button</Button>
                        <Button size="sm" variant="outline">Secondary</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose how and when you want to be notified
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium">Email Alerts</Label>
                      <p className="text-sm text-muted-foreground">Receive important updates via email</p>
                    </div>
                    <Switch
                      checked={notifications.emailAlerts}
                      onCheckedChange={(checked) => handleNotificationChange('emailAlerts', checked)}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <Label className="font-medium">Match Updates</Label>
                    <Select
                      value={notifications.matchUpdates}
                      onValueChange={(value) => handleNotificationChange('matchUpdates', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="real-time">Real-time</SelectItem>
                        <SelectItem value="daily">Daily digest</SelectItem>
                        <SelectItem value="weekly">Weekly summary</SelectItem>
                        <SelectItem value="off">Off</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      How often you want to be notified about new job matches
                    </p>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium">Interview Reminders</Label>
                      <p className="text-sm text-muted-foreground">Get notified before interviews</p>
                    </div>
                    <Switch
                      checked={notifications.interviewReminders}
                      onCheckedChange={(checked) => handleNotificationChange('interviewReminders', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium">Feedback Notifications</Label>
                      <p className="text-sm text-muted-foreground">When you receive interview feedback</p>
                    </div>
                    <Switch
                      checked={notifications.feedbackNotifications}
                      onCheckedChange={(checked) => handleNotificationChange('feedbackNotifications', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium">System Updates</Label>
                      <p className="text-sm text-muted-foreground">Important platform announcements</p>
                    </div>
                    <Switch
                      checked={notifications.systemUpdates}
                      onCheckedChange={(checked) => handleNotificationChange('systemUpdates', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium">Marketing Emails</Label>
                      <p className="text-sm text-muted-foreground">Tips, resources, and platform news</p>
                    </div>
                    <Switch
                      checked={notifications.marketingEmails}
                      onCheckedChange={(checked) => handleNotificationChange('marketingEmails', checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Privacy & Security</CardTitle>
                <CardDescription>
                  Control your privacy settings and data preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-3">
                    <Label className="font-medium">Profile Visibility</Label>
                    <Select
                      value={privacy.profileVisibility}
                      onValueChange={(value) => handlePrivacyChange('profileVisibility', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public - Visible to everyone</SelectItem>
                        <SelectItem value="recruiters-only">Recruiters Only - Visible to verified employers</SelectItem>
                        <SelectItem value="private">Private - Only visible to you</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium">Activity Tracking</Label>
                      <p className="text-sm text-muted-foreground">Allow usage data to improve matching</p>
                    </div>
                    <Switch
                      checked={privacy.activityTracking}
                      onCheckedChange={(checked) => handlePrivacyChange('activityTracking', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium">Data Collection</Label>
                      <p className="text-sm text-muted-foreground">Help improve our AI recommendations</p>
                    </div>
                    <Switch
                      checked={privacy.dataCollection}
                      onCheckedChange={(checked) => handlePrivacyChange('dataCollection', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium">Third-party Sharing</Label>
                      <p className="text-sm text-muted-foreground">Share anonymized data with partners</p>
                    </div>
                    <Switch
                      checked={privacy.thirdPartySharing}
                      onCheckedChange={(checked) => handlePrivacyChange('thirdPartySharing', checked)}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <Label className="font-medium text-red-600">Data Management</Label>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Download className="h-4 w-4" />
                        Download My Data
                      </Button>
                      <p className="text-xs text-muted-foreground">
                        Download a copy of all your personal data
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="gap-2 text-red-600 border-red-200 hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                        Delete Account
                      </Button>
                      <p className="text-xs text-muted-foreground">
                        Permanently delete your account and all associated data
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Language Tab */}
          <TabsContent value="language" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Language & Region</CardTitle>
                <CardDescription>
                  Set your language preferences and regional settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="tr">Türkçe</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                        <SelectItem value="pt">Português</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select value={timezone} onValueChange={setTimezone}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                        <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                        <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                        <SelectItem value="Europe/London">Greenwich Mean Time (GMT)</SelectItem>
                        <SelectItem value="Europe/Berlin">Central European Time (CET)</SelectItem>
                        <SelectItem value="Europe/Istanbul">Turkey Time (TRT)</SelectItem>
                        <SelectItem value="Asia/Tokyo">Japan Standard Time (JST)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <Label className="font-medium">Date & Time Format</Label>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="text-sm">Date Format</span>
                      <span className="text-sm text-muted-foreground">MM/DD/YYYY</span>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="text-sm">Time Format</span>
                      <span className="text-sm text-muted-foreground">12-hour (AM/PM)</span>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="text-sm">First Day of Week</span>
                      <span className="text-sm text-muted-foreground">Sunday</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}