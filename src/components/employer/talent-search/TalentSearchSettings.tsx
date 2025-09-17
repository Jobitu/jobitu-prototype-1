import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Switch } from "../../ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Textarea } from "../../ui/textarea";
import { Separator } from "../../ui/separator";
import { 
  Settings,
  Bell,
  Mail,
  Zap,
  Shield,
  Users,
  MessageSquare,
  Search,
  Filter,
  Globe,
  Clock,
  Target,
  Save,
  RefreshCw,
  Calendar,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

export function TalentSearchSettings() {
  const [settings, setSettings] = useState({
    // Search & Discovery
    autoSaveSearches: true,
    searchRadius: '50',
    includeInternational: false,
    minExperience: '0',
    maxExperience: '15',
    
    // Notifications
    newCandidateMatches: true,
    campaignUpdates: true,
    responseNotifications: true,
    weeklyDigest: true,
    emailFrequency: 'immediate',
    
    // Outreach
    defaultMessageTemplate: `Hi {{name}},

I came across your profile and was impressed by your {{top_skill}} experience. We have an exciting {{job_title}} opportunity at {{company_name}} that I think would be a great fit for your background.

Would you be interested in learning more?

Best regards,
{{recruiter_name}}`,
    maxDailyOutreach: '50',
    followUpEnabled: true,
    followUpDelay: '3',
    
    // Privacy & Compliance
    gdprCompliance: true,
    dataRetention: '24',
    anonymizeData: true,
    trackingEnabled: false,
    
    // Team & Permissions
    shareShortlists: true,
    allowTeamCampaigns: true,
    requireApproval: false,
    
    // Integrations
    linkedinIntegration: true,
    calendarSync: true,
    crmSync: false,
    slackNotifications: false
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const saveSettings = () => {
    // Handle settings save
    console.log('Settings saved:', settings);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Talent Search Settings</h2>
          <p className="text-gray-600">Configure your talent search preferences and behavior</p>
        </div>
        <Button onClick={saveSettings}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      {/* Search & Discovery Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <CardTitle>Search & Discovery</CardTitle>
          </div>
          <CardDescription>Configure how you discover and search for candidates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="searchRadius">Search Radius (km)</Label>
              <Select value={settings.searchRadius} onValueChange={(value) => handleSettingChange('searchRadius', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="25">25 km</SelectItem>
                  <SelectItem value="50">50 km</SelectItem>
                  <SelectItem value="100">100 km</SelectItem>
                  <SelectItem value="unlimited">Unlimited</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Include International Candidates</Label>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.includeInternational}
                  onCheckedChange={(checked) => handleSettingChange('includeInternational', checked)}
                />
                <span className="text-sm text-gray-600">Search globally for candidates</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="minExperience">Minimum Experience (years)</Label>
              <Input
                id="minExperience"
                type="number"
                value={settings.minExperience}
                onChange={(e) => handleSettingChange('minExperience', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxExperience">Maximum Experience (years)</Label>
              <Input
                id="maxExperience"
                type="number"
                value={settings.maxExperience}
                onChange={(e) => handleSettingChange('maxExperience', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Auto-save Searches</Label>
            <div className="flex items-center space-x-2">
              <Switch
                checked={settings.autoSaveSearches}
                onCheckedChange={(checked) => handleSettingChange('autoSaveSearches', checked)}
              />
              <span className="text-sm text-gray-600">Automatically save frequently used search filters</span>
            </div>
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
                <Label>New Candidate Matches</Label>
                <p className="text-sm text-gray-600">Get notified when new candidates match your searches</p>
              </div>
              <Switch
                checked={settings.newCandidateMatches}
                onCheckedChange={(checked) => handleSettingChange('newCandidateMatches', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Campaign Updates</Label>
                <p className="text-sm text-gray-600">Notifications about campaign performance and status changes</p>
              </div>
              <Switch
                checked={settings.campaignUpdates}
                onCheckedChange={(checked) => handleSettingChange('campaignUpdates', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Response Notifications</Label>
                <p className="text-sm text-gray-600">Get notified when candidates respond to your messages</p>
              </div>
              <Switch
                checked={settings.responseNotifications}
                onCheckedChange={(checked) => handleSettingChange('responseNotifications', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Weekly Digest</Label>
                <p className="text-sm text-gray-600">Weekly summary of your talent search activities</p>
              </div>
              <Switch
                checked={settings.weeklyDigest}
                onCheckedChange={(checked) => handleSettingChange('weeklyDigest', checked)}
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="emailFrequency">Email Notification Frequency</Label>
            <Select value={settings.emailFrequency} onValueChange={(value) => handleSettingChange('emailFrequency', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="immediate">Immediate</SelectItem>
                <SelectItem value="hourly">Hourly Digest</SelectItem>
                <SelectItem value="daily">Daily Digest</SelectItem>
                <SelectItem value="weekly">Weekly Digest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Outreach Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5" />
            <CardTitle>Outreach & Messaging</CardTitle>
          </div>
          <CardDescription>Configure your outreach campaigns and messaging</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="defaultTemplate">Default Message Template</Label>
            <Textarea
              id="defaultTemplate"
              value={settings.defaultMessageTemplate}
              onChange={(e) => handleSettingChange('defaultMessageTemplate', e.target.value)}
              rows={8}
              placeholder="Your default message template..."
            />
            <p className="text-xs text-gray-500">
              Use variables: {`{{name}}, {{job_title}}, {{company_name}}, {{top_skill}}, {{recruiter_name}}`}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="maxDailyOutreach">Max Daily Outreach</Label>
              <Input
                id="maxDailyOutreach"
                type="number"
                value={settings.maxDailyOutreach}
                onChange={(e) => handleSettingChange('maxDailyOutreach', e.target.value)}
              />
              <p className="text-xs text-gray-500">Maximum messages to send per day</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="followUpDelay">Follow-up Delay (days)</Label>
              <Input
                id="followUpDelay"
                type="number"
                value={settings.followUpDelay}
                onChange={(e) => handleSettingChange('followUpDelay', e.target.value)}
              />
              <p className="text-xs text-gray-500">Days to wait before sending follow-up messages</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Automatic Follow-ups</Label>
            <div className="flex items-center space-x-2">
              <Switch
                checked={settings.followUpEnabled}
                onCheckedChange={(checked) => handleSettingChange('followUpEnabled', checked)}
              />
              <span className="text-sm text-gray-600">Automatically send follow-up messages to non-responders</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Compliance */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <CardTitle>Privacy & Compliance</CardTitle>
          </div>
          <CardDescription>Data protection and compliance settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>GDPR Compliance</Label>
                <p className="text-sm text-gray-600">Enable GDPR compliance features</p>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.gdprCompliance}
                  onCheckedChange={(checked) => handleSettingChange('gdprCompliance', checked)}
                />
                {settings.gdprCompliance && <CheckCircle className="h-4 w-4 text-green-500" />}
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Anonymize Candidate Data</Label>
                <p className="text-sm text-gray-600">Anonymize personal data in exports and reports</p>
              </div>
              <Switch
                checked={settings.anonymizeData}
                onCheckedChange={(checked) => handleSettingChange('anonymizeData', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Enable Tracking</Label>
                <p className="text-sm text-gray-600">Track email opens and link clicks</p>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.trackingEnabled}
                  onCheckedChange={(checked) => handleSettingChange('trackingEnabled', checked)}
                />
                {!settings.trackingEnabled && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="dataRetention">Data Retention Period (months)</Label>
            <Select value={settings.dataRetention} onValueChange={(value) => handleSettingChange('dataRetention', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12">12 months</SelectItem>
                <SelectItem value="24">24 months</SelectItem>
                <SelectItem value="36">36 months</SelectItem>
                <SelectItem value="unlimited">Unlimited</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">How long to keep candidate data</p>
          </div>
        </CardContent>
      </Card>

      {/* Team & Permissions */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <CardTitle>Team & Permissions</CardTitle>
          </div>
          <CardDescription>Manage team access and collaboration settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Share Shortlists with Team</Label>
                <p className="text-sm text-gray-600">Allow team members to access your shortlists</p>
              </div>
              <Switch
                checked={settings.shareShortlists}
                onCheckedChange={(checked) => handleSettingChange('shareShortlists', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Allow Team Campaigns</Label>
                <p className="text-sm text-gray-600">Team members can create campaigns using your templates</p>
              </div>
              <Switch
                checked={settings.allowTeamCampaigns}
                onCheckedChange={(checked) => handleSettingChange('allowTeamCampaigns', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Require Campaign Approval</Label>
                <p className="text-sm text-gray-600">All campaigns must be approved before sending</p>
              </div>
              <Switch
                checked={settings.requireApproval}
                onCheckedChange={(checked) => handleSettingChange('requireApproval', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Integrations */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Zap className="h-5 w-5" />
            <CardTitle>Integrations</CardTitle>
          </div>
          <CardDescription>Connect with external tools and services</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                    <Globe className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <Label>External Platform Integration</Label>
                    <p className="text-xs text-gray-600">Import candidate profiles from external platforms</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={settings.linkedinIntegration}
                    onCheckedChange={(checked) => handleSettingChange('linkedinIntegration', checked)}
                  />
                  {settings.linkedinIntegration && <Badge variant="default" className="text-xs">Connected</Badge>}
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <Label>Calendar Sync</Label>
                    <p className="text-xs text-gray-600">Sync interview schedules</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={settings.calendarSync}
                    onCheckedChange={(checked) => handleSettingChange('calendarSync', checked)}
                  />
                  {settings.calendarSync && <Badge variant="default" className="text-xs">Connected</Badge>}
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
                    <Target className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <Label>CRM Integration</Label>
                    <p className="text-xs text-gray-600">Sync with your CRM system</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={settings.crmSync}
                    onCheckedChange={(checked) => handleSettingChange('crmSync', checked)}
                  />
                  <Button variant="outline" size="sm" disabled={!settings.crmSync}>
                    Setup
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-600 rounded flex items-center justify-center">
                    <MessageSquare className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <Label>Slack Notifications</Label>
                    <p className="text-xs text-gray-600">Get updates in Slack</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={settings.slackNotifications}
                    onCheckedChange={(checked) => handleSettingChange('slackNotifications', checked)}
                  />
                  <Button variant="outline" size="sm" disabled={!settings.slackNotifications}>
                    Setup
                  </Button>
                </div>
              </div>
            </div>
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