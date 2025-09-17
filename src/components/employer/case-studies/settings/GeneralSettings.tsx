import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import { Label } from "../../../ui/label";
import { Switch } from "../../../ui/switch";
import { Textarea } from "../../../ui/textarea";
import { Slider } from "../../../ui/slider";
import { Settings } from "lucide-react";

interface GeneralSettingsProps {
  settings: any;
  onSettingChange: (key: string, value: any) => void;
}

export function GeneralSettings({ settings, onSettingChange }: GeneralSettingsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Settings className="h-5 w-5 mr-2" />
          General Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label>Default Time Limit (minutes)</Label>
          <div className="mt-2">
            <Slider
              value={settings.defaultTimeLimit}
              onValueChange={(value) => onSettingChange('defaultTimeLimit', value)}
              max={300}
              min={30}
              step={15}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>30 min</span>
              <span className="font-medium">{settings.defaultTimeLimit[0]} min</span>
              <span>300 min</span>
            </div>
          </div>
        </div>

        <div>
          <Label>Max Concurrent Sessions</Label>
          <div className="mt-2">
            <Slider
              value={settings.maxConcurrentSessions}
              onValueChange={(value) => onSettingChange('maxConcurrentSessions', value)}
              max={200}
              min={10}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>10</span>
              <span className="font-medium">{settings.maxConcurrentSessions[0]}</span>
              <span>200</span>
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="default-instructions">Default Instructions Template</Label>
          <Textarea 
            id="default-instructions"
            placeholder="Enter default instructions for candidates..."
            rows={4}
            className="mt-1"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label>Auto-save Progress</Label>
            <p className="text-sm text-gray-500">Automatically save candidate progress</p>
          </div>
          <Switch
            checked={settings.autoSave}
            onCheckedChange={(value) => onSettingChange('autoSave', value)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label>Enable Debugging</Label>
            <p className="text-sm text-gray-500">Allow candidates to use debugging tools</p>
          </div>
          <Switch
            checked={settings.enableDebugging}
            onCheckedChange={(value) => onSettingChange('enableDebugging', value)}
          />
        </div>
      </CardContent>
    </Card>
  );
}