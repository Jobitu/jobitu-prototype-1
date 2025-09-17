import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Switch } from "../../ui/switch";
import { Textarea } from "../../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Slider } from "../../ui/slider";
import { 
  Settings,
  Save,
  Bell,
  Clock,
  Shield,
  Webhook,
  CreditCard,
  Sliders,
  Building
} from "lucide-react";

export function AssessmentSettings() {
  const [settings, setSettings] = useState({
    defaultDuration: [120],
    autoSave: true,
    emailNotifications: true,
    candidatePreview: false,
    timeWarnings: true,
    plagiarismDetection: true,
    autoGrading: true,
    saveProgress: true
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Assessment Settings</h2>
          <p className="text-gray-600">Configure default settings and preferences for assessments</p>
        </div>
        <Button>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              General Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label>Default Assessment Duration (minutes)</Label>
              <div className="mt-2">
                <Slider
                  value={settings.defaultDuration}
                  onValueChange={(value) => handleSettingChange('defaultDuration', value)}
                  max={300}
                  min={30}
                  step={15}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>30 min</span>
                  <span className="font-medium">{settings.defaultDuration[0]} min</span>
                  <span>300 min</span>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="company-name">Company Name</Label>
              <Input 
                id="company-name" 
                placeholder="Your company name"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="default-instructions">Default Instructions Template</Label>
              <Textarea 
                id="default-instructions"
                placeholder="Enter default instructions for candidates..."
                rows={3}
                className="mt-1"
              />
            </div>

            <div>
              <Label>Default Difficulty Level</Label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select default difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Candidate Experience */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Candidate Experience
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto-save Progress</Label>
                <p className="text-sm text-gray-500">Automatically save candidate answers</p>
              </div>
              <Switch
                checked={settings.autoSave}
                onCheckedChange={(value) => handleSettingChange('autoSave', value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Allow Preview</Label>
                <p className="text-sm text-gray-500">Let candidates preview before starting</p>
              </div>
              <Switch
                checked={settings.candidatePreview}
                onCheckedChange={(value) => handleSettingChange('candidatePreview', value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Time Warnings</Label>
                <p className="text-sm text-gray-500">Show time remaining warnings</p>
              </div>
              <Switch
                checked={settings.timeWarnings}
                onCheckedChange={(value) => handleSettingChange('timeWarnings', value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Save Partial Progress</Label>
                <p className="text-sm text-gray-500">Save incomplete submissions</p>
              </div>
              <Switch
                checked={settings.saveProgress}
                onCheckedChange={(value) => handleSettingChange('saveProgress', value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Security & Integrity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Security & Integrity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label>Plagiarism Detection</Label>
                <p className="text-sm text-gray-500">Check for code similarities</p>
              </div>
              <Switch
                checked={settings.plagiarismDetection}
                onCheckedChange={(value) => handleSettingChange('plagiarismDetection', value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Auto-grading</Label>
                <p className="text-sm text-gray-500">Automatically grade submissions</p>
              </div>
              <Switch
                checked={settings.autoGrading}
                onCheckedChange={(value) => handleSettingChange('autoGrading', value)}
              />
            </div>

            <div>
              <Label>IP Whitelist</Label>
              <Input 
                placeholder="e.g., 192.168.1.0/24"
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">Restrict access to specific IP ranges</p>
            </div>

            <div>
              <Label>Browser Requirements</Label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select browser policy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Browser</SelectItem>
                  <SelectItem value="modern">Modern Browsers Only</SelectItem>
                  <SelectItem value="lockdown">Lockdown Mode</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label>Email Notifications</Label>
                <p className="text-sm text-gray-500">Get notified about assessment events</p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(value) => handleSettingChange('emailNotifications', value)}
              />
            </div>

            <div>
              <Label>Notification Email</Label>
              <Input 
                type="email"
                placeholder="notifications@company.com"
                className="mt-1"
              />
            </div>

            <div>
              <Label>Webhook URL</Label>
              <Input 
                placeholder="https://api.yourcompany.com/webhooks/assessments"
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">Receive real-time updates via webhook</p>
            </div>

            <div className="space-y-2">
              <Label>Send notifications for:</Label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span>Assessment completions</span>
                </label>
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span>Flagged submissions</span>
                </label>
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" className="rounded" />
                  <span>Low scores (below threshold)</span>
                </label>
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" className="rounded" />
                  <span>Time limit violations</span>
                </label>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* API Keys Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Webhook className="h-5 w-5 mr-2" />
            API Integration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <Label>API Key</Label>
              <div className="flex mt-1">
                <Input 
                  type="password"
                  value="sk-test-1234567890abcdef"
                  readOnly
                  className="rounded-r-none"
                />
                <Button variant="outline" className="rounded-l-none">
                  Copy
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Use this key to integrate with our API</p>
            </div>

            <div>
              <Label>API Endpoint</Label>
              <Input 
                value="https://api.jobitu.com/v1/assessments"
                readOnly
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">Base URL for assessment API calls</p>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <Button variant="outline">
              View Documentation
            </Button>
            <Button variant="outline">
              Regenerate Key
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}