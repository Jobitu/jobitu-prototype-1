import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Switch } from "../../ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Textarea } from "../../ui/textarea";
import { Separator } from "../../ui/separator";
import { 
  Settings, 
  Save, 
  Bell, 
  Globe, 
  Shield, 
  Users, 
  Clock,
  Mail,
  Zap,
  AlertCircle,
  CheckCircle
} from "lucide-react";

export function JobPostingsSettings() {
  const [settings, setSettings] = useState({
    // Job Posting Defaults
    defaultDepartment: 'Engineering',
    defaultJobType: 'Full-time',
    defaultLocation: 'San Francisco, CA',
    autoExpiry: true,
    expiryDays: '30',
    
    // Application Settings
    requireCoverLetter: false,
    allowAnonymousApplications: false,
    autoScreening: true,
    screeningQuestions: 3,
    
    // Notifications
    newApplications: true,
    applicationUpdates: true,
    jobExpiring: true,
    weeklyReport: true,
    emailDigest: 'daily',
    
    // Publishing
    autoPublishToCompanySite: true,
    autoPublishToLinkedIn: false,
    autoPublishToIndeed: false,
    publishDelay: '0',
    
    // Compliance
    eeocCompliance: true,
    gdprCompliance: true,
    dataRetention: '12',
    
    // Team & Permissions
    requireApproval: false,
    allowTeamEditing: true,
    defaultOwner: 'current_user'
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const saveSettings = () => {
    console.log('Settings saved:', settings);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Job Posting Settings</h2>
          <p className="text-gray-600">Configure defaults, notifications, and preferences</p>
        </div>
        <Button onClick={saveSettings}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      {/* Job Posting Defaults */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <CardTitle>Job Posting Defaults</CardTitle>
          </div>
          <CardDescription>Default values for new job postings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="defaultDepartment">Default Department</Label>
              <Select value={settings.defaultDepartment} onValueChange={(value) => handleSettingChange('defaultDepartment', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Product">Product</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Data">Data</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="defaultJobType">Default Job Type</Label>
              <Select value={settings.defaultJobType} onValueChange={(value) => handleSettingChange('defaultJobType', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Freelance">Freelance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="defaultLocation">Default Location</Label>
              <Input
                id="defaultLocation"
                value={settings.defaultLocation}
                onChange={(e) => handleSettingChange('defaultLocation', e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Auto-expire Jobs</Label>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.autoExpiry}
                  onCheckedChange={(checked) => handleSettingChange('autoExpiry', checked)}
                />
                <span className="text-sm text-gray-600">Automatically expire jobs after a set period</span>
              </div>
              {settings.autoExpiry && (
                <div className="mt-2">
                  <Input
                    placeholder="Days until expiry"
                    value={settings.expiryDays}
                    onChange={(e) => handleSettingChange('expiryDays', e.target.value)}
                    className="w-32"
                  />
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Application Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <CardTitle>Application Settings</CardTitle>
          </div>
          <CardDescription>Configure how candidates can apply to your jobs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Require Cover Letter</Label>
                <p className="text-sm text-gray-600">Make cover letters mandatory for all applications</p>
              </div>
              <Switch
                checked={settings.requireCoverLetter}
                onCheckedChange={(checked) => handleSettingChange('requireCoverLetter', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Allow Anonymous Applications</Label>
                <p className="text-sm text-gray-600">Let candidates apply without revealing their identity initially</p>
              </div>
              <Switch
                checked={settings.allowAnonymousApplications}
                onCheckedChange={(checked) => handleSettingChange('allowAnonymousApplications', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto-screening</Label>
                <p className="text-sm text-gray-600">Automatically screen applications based on criteria</p>
              </div>
              <Switch
                checked={settings.autoScreening}
                onCheckedChange={(checked) => handleSettingChange('autoScreening', checked)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="screeningQuestions">Number of Screening Questions</Label>
            <Select value={settings.screeningQuestions.toString()} onValueChange={(value) => handleSettingChange('screeningQuestions', parseInt(value))}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">None</SelectItem>
                <SelectItem value="1">1 Question</SelectItem>
                <SelectItem value="2">2 Questions</SelectItem>
                <SelectItem value="3">3 Questions</SelectItem>
                <SelectItem value="5">5 Questions</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <CardTitle>Notifications</CardTitle>
          </div>
          <CardDescription>Control when and how you receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>New Applications</Label>
                <p className="text-sm text-gray-600">Get notified when candidates apply to your jobs</p>
              </div>
              <Switch
                checked={settings.newApplications}
                onCheckedChange={(checked) => handleSettingChange('newApplications', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Application Updates</Label>
                <p className="text-sm text-gray-600">Notifications when application status changes</p>
              </div>
              <Switch
                checked={settings.applicationUpdates}
                onCheckedChange={(checked) => handleSettingChange('applicationUpdates', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Job Expiring Soon</Label>
                <p className="text-sm text-gray-600">Alert when jobs are about to expire</p>
              </div>
              <Switch
                checked={settings.jobExpiring}
                onCheckedChange={(checked) => handleSettingChange('jobExpiring', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Weekly Report</Label>
                <p className="text-sm text-gray-600">Weekly summary of job posting activity</p>
              </div>
              <Switch
                checked={settings.weeklyReport}
                onCheckedChange={(checked) => handleSettingChange('weeklyReport', checked)}
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="emailDigest">Email Digest Frequency</Label>
            <Select value={settings.emailDigest} onValueChange={(value) => handleSettingChange('emailDigest', value)}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="immediate">Immediate</SelectItem>
                <SelectItem value="daily">Daily Digest</SelectItem>
                <SelectItem value="weekly">Weekly Digest</SelectItem>
                <SelectItem value="never">Never</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Publishing Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Globe className="h-5 w-5" />
            <CardTitle>Publishing Settings</CardTitle>
          </div>
          <CardDescription>Configure automatic publishing to job boards</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto-publish to Company Site</Label>
                <p className="text-sm text-gray-600">Automatically post jobs to your company website</p>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.autoPublishToCompanySite}
                  onCheckedChange={(checked) => handleSettingChange('autoPublishToCompanySite', checked)}
                />
                {settings.autoPublishToCompanySite && <CheckCircle className="h-4 w-4 text-green-500" />}
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto-publish to LinkedIn</Label>
                <p className="text-sm text-gray-600">Automatically post jobs to LinkedIn Jobs</p>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.autoPublishToLinkedIn}
                  onCheckedChange={(checked) => handleSettingChange('autoPublishToLinkedIn', checked)}
                />
                {!settings.autoPublishToLinkedIn && <AlertCircle className="h-4 w-4 text-yellow-500" />}
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto-publish to Indeed</Label>
                <p className="text-sm text-gray-600">Automatically post jobs to Indeed</p>
              </div>
              <Switch
                checked={settings.autoPublishToIndeed}
                onCheckedChange={(checked) => handleSettingChange('autoPublishToIndeed', checked)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="publishDelay">Publishing Delay (hours)</Label>
            <Select value={settings.publishDelay} onValueChange={(value) => handleSettingChange('publishDelay', value)}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Immediate</SelectItem>
                <SelectItem value="1">1 hour</SelectItem>
                <SelectItem value="4">4 hours</SelectItem>
                <SelectItem value="24">24 hours</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">Delay before automatically publishing to external boards</p>
          </div>
        </CardContent>
      </Card>

      {/* Team & Permissions */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <CardTitle>Team & Permissions</CardTitle>
          </div>
          <CardDescription>Manage team access and approval workflows</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Require Approval</Label>
                <p className="text-sm text-gray-600">All job postings must be approved before publishing</p>
              </div>
              <Switch
                checked={settings.requireApproval}
                onCheckedChange={(checked) => handleSettingChange('requireApproval', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Allow Team Editing</Label>
                <p className="text-sm text-gray-600">Team members can edit each other's job postings</p>
              </div>
              <Switch
                checked={settings.allowTeamEditing}
                onCheckedChange={(checked) => handleSettingChange('allowTeamEditing', checked)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="defaultOwner">Default Job Owner</Label>
            <Select value={settings.defaultOwner} onValueChange={(value) => handleSettingChange('defaultOwner', value)}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current_user">Current User</SelectItem>
                <SelectItem value="department_head">Department Head</SelectItem>
                <SelectItem value="hr_manager">HR Manager</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={saveSettings} size="lg">
          <Save className="h-4 w-4 mr-2" />
          Save All Settings
        </Button>
      </div>
    </div>
  );
}