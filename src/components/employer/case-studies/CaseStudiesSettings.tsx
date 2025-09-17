import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Save } from "lucide-react";
import { GeneralSettings } from "./settings/GeneralSettings";
import { EnvironmentSettings } from "./settings/EnvironmentSettings";
import { SecuritySettings } from "./settings/SecuritySettings";
import { NotificationSettings } from "./settings/NotificationSettings";

export function CaseStudiesSettings() {
  const [settings, setSettings] = useState({
    defaultTimeLimit: [120],
    maxConcurrentSessions: [50],
    autoSave: true,
    recordScreen: true,
    allowCopy: false,
    enableDebugging: true,
    plagiarismCheck: true,
    autoGrading: false,
    emailNotifications: true,
    slackIntegration: false
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Case Study Settings</h2>
          <p className="text-gray-600">Configure environments, defaults, and execution settings</p>
        </div>
        <Button>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GeneralSettings 
          settings={settings}
          onSettingChange={handleSettingChange}
        />
        <SecuritySettings 
          settings={settings}
          onSettingChange={handleSettingChange}
        />
        <NotificationSettings 
          settings={settings}
          onSettingChange={handleSettingChange}
        />
      </div>

      <EnvironmentSettings />
    </div>
  );
}