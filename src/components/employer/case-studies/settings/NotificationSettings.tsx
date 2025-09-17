import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import { Label } from "../../../ui/label";
import { Switch } from "../../../ui/switch";
import { Input } from "../../../ui/input";
import { Button } from "../../../ui/button";
import { Bell } from "lucide-react";

interface NotificationSettingsProps {
  settings: any;
  onSettingChange: (key: string, value: any) => void;
}

export function NotificationSettings({ settings, onSettingChange }: NotificationSettingsProps) {
  return (
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
            <p className="text-sm text-gray-500">Get notified about case study events</p>
          </div>
          <Switch
            checked={settings.emailNotifications}
            onCheckedChange={(value) => onSettingChange('emailNotifications', value)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label>Slack Integration</Label>
            <p className="text-sm text-gray-500">Send notifications to Slack</p>
          </div>
          <Switch
            checked={settings.slackIntegration}
            onCheckedChange={(value) => onSettingChange('slackIntegration', value)}
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
            placeholder="https://api.yourcompany.com/webhooks/case-studies"
            className="mt-1"
          />
          <p className="text-xs text-gray-500 mt-1">Receive real-time updates via webhook</p>
        </div>

        <div className="space-y-2">
          <Label>Send notifications for:</Label>
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm">
              <input type="checkbox" defaultChecked className="rounded" />
              <span>Session completions</span>
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
              <span>Environment failures</span>
            </label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}