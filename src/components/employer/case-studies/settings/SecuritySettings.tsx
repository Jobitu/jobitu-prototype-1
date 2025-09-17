import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import { Label } from "../../../ui/label";
import { Switch } from "../../../ui/switch";
import { Input } from "../../../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../ui/select";
import { Shield } from "lucide-react";

interface SecuritySettingsProps {
  settings: any;
  onSettingChange: (key: string, value: any) => void;
}

export function SecuritySettings({ settings, onSettingChange }: SecuritySettingsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Shield className="h-5 w-5 mr-2" />
          Security & Monitoring
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Label>Screen Recording</Label>
            <p className="text-sm text-gray-500">Record candidate sessions</p>
          </div>
          <Switch
            checked={settings.recordScreen}
            onCheckedChange={(value) => onSettingChange('recordScreen', value)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label>Allow Copy/Paste</Label>
            <p className="text-sm text-gray-500">Enable clipboard operations</p>
          </div>
          <Switch
            checked={settings.allowCopy}
            onCheckedChange={(value) => onSettingChange('allowCopy', value)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label>Plagiarism Detection</Label>
            <p className="text-sm text-gray-500">Check for code similarities</p>
          </div>
          <Switch
            checked={settings.plagiarismCheck}
            onCheckedChange={(value) => onSettingChange('plagiarismCheck', value)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label>Auto-grading</Label>
            <p className="text-sm text-gray-500">Automatically grade submissions</p>
          </div>
          <Switch
            checked={settings.autoGrading}
            onCheckedChange={(value) => onSettingChange('autoGrading', value)}
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
  );
}