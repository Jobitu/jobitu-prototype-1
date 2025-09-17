import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Switch } from "../../ui/switch";
import { Textarea } from "../../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog";
import { 
  Settings as SettingsIcon,
  Save,
  Plus,
  Edit,
  Trash2,
  Eye,
  Copy,
  Sparkles,
  MessageSquare,
  Globe,
  Bell,
  Shield
} from "lucide-react";
import { mockFeedbackTemplates } from "./mockData";
import { AI_SUGGESTION_STYLES, FEEDBACK_TONES, LANGUAGES } from "./constants";
import { FeedbackTemplate, AISettings } from "./types";

export function Settings() {
  const [templates, setTemplates] = useState<FeedbackTemplate[]>(mockFeedbackTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState<FeedbackTemplate | null>(null);
  const [showCreateTemplate, setShowCreateTemplate] = useState(false);
  const [aiSettings, setAiSettings] = useState<AISettings>({
    autoGenerateEnabled: true,
    suggestionStyle: 'constructive',
    includeSpecificExamples: true,
    minimumFeedbackLength: 200,
    language: 'AUTO',
    tone: 'professional'
  });

  const [newTemplate, setNewTemplate] = useState({
    name: '',
    description: '',
    content: '',
    language: 'EN' as 'EN' | 'TR',
    tone: 'professional' as 'professional' | 'friendly' | 'formal',
    category: 'rejection' as 'rejection' | 'positive' | 'constructive'
  });

  const handleSaveAISettings = () => {
    console.log('Saving AI settings:', aiSettings);
    // Here you would typically save to your backend
  };

  const handleCreateTemplate = () => {
    const template: FeedbackTemplate = {
      id: `TPL-${Date.now()}`,
      ...newTemplate,
      isDefault: false,
      createdBy: 'Current User',
      createdAt: new Date().toISOString(),
      usageCount: 0,
      skillCategories: []
    };

    setTemplates(prev => [template, ...prev]);
    setShowCreateTemplate(false);
    setNewTemplate({
      name: '',
      description: '',
      content: '',
      language: 'EN',
      tone: 'professional',
      category: 'rejection'
    });
  };

  const handleDeleteTemplate = (id: string) => {
    setTemplates(prev => prev.filter(t => t.id !== id));
  };

  const getToneBadge = (tone: string) => {
    const colors = {
      professional: 'bg-blue-100 text-blue-800',
      friendly: 'bg-green-100 text-green-800',
      formal: 'bg-purple-100 text-purple-800'
    };
    
    return (
      <Badge variant="outline" className={colors[tone as keyof typeof colors]}>
        {tone}
      </Badge>
    );
  };

  const getCategoryBadge = (category: string) => {
    const colors = {
      rejection: 'bg-red-100 text-red-800',
      positive: 'bg-green-100 text-green-800',
      constructive: 'bg-yellow-100 text-yellow-800'
    };
    
    return (
      <Badge variant="outline" className={colors[category as keyof typeof colors]}>
        {category}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Feedback Settings</h2>
          <p className="text-gray-600">
            Configure AI assistance, templates, and default preferences
          </p>
        </div>
        <Button onClick={handleSaveAISettings}>
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sparkles className="h-5 w-5 mr-2" />
              AI Assistant Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label>Enable AI Suggestions</Label>
                <p className="text-sm text-gray-500">Automatically generate feedback suggestions</p>
              </div>
              <Switch
                checked={aiSettings.autoGenerateEnabled}
                onCheckedChange={(checked) => 
                  setAiSettings(prev => ({ ...prev, autoGenerateEnabled: checked }))
                }
              />
            </div>

            <div>
              <Label>Suggestion Style</Label>
              <Select 
                value={aiSettings.suggestionStyle} 
                onValueChange={(value) => 
                  setAiSettings(prev => ({ ...prev, suggestionStyle: value as any }))
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(AI_SUGGESTION_STYLES).map(([key, style]) => (
                    <SelectItem key={key} value={key}>
                      {style.label} - {style.description}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Default Tone</Label>
              <Select 
                value={aiSettings.tone} 
                onValueChange={(value) => 
                  setAiSettings(prev => ({ ...prev, tone: value as any }))
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(FEEDBACK_TONES).map(([key, tone]) => (
                    <SelectItem key={key} value={key}>
                      {tone.label} - {tone.description}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Default Language</Label>
              <Select 
                value={aiSettings.language} 
                onValueChange={(value) => 
                  setAiSettings(prev => ({ ...prev, language: value as any }))
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(LANGUAGES).map(([key, lang]) => (
                    <SelectItem key={key} value={key}>
                      {lang.flag} {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Minimum Feedback Length</Label>
              <div className="flex items-center space-x-2 mt-1">
                <Input
                  type="number"
                  value={aiSettings.minimumFeedbackLength}
                  onChange={(e) => 
                    setAiSettings(prev => ({ 
                      ...prev, 
                      minimumFeedbackLength: parseInt(e.target.value) 
                    }))
                  }
                  className="w-24"
                />
                <span className="text-sm text-gray-500">characters</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Include Specific Examples</Label>
                <p className="text-sm text-gray-500">Add specific examples from assessments</p>
              </div>
              <Switch
                checked={aiSettings.includeSpecificExamples}
                onCheckedChange={(checked) => 
                  setAiSettings(prev => ({ ...prev, includeSpecificExamples: checked }))
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <SettingsIcon className="h-5 w-5 mr-2" />
              General Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label>Company Name</Label>
              <Input 
                placeholder="Your company name"
                defaultValue="Jobitu"
                className="mt-1"
              />
            </div>

            <div>
              <Label>Default Feedback Sender</Label>
              <Input 
                placeholder="HR Team"
                defaultValue="Talent Acquisition Team"
                className="mt-1"
              />
            </div>

            <div>
              <Label>Email Signature</Label>
              <Textarea 
                placeholder="Best regards,\nThe Talent Team"
                defaultValue="Best regards,\nThe Jobitu Talent Team\ntalent@jobitu.com"
                rows={3}
                className="mt-1"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Auto-send to Growth Center</Label>
                <p className="text-sm text-gray-500">Automatically export skill gaps</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Require Manager Approval</Label>
                <p className="text-sm text-gray-500">All feedback needs manager review</p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Track Feedback Opens</Label>
                <p className="text-sm text-gray-500">Monitor when candidates read feedback</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Templates Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              Feedback Templates
            </div>
            <Dialog open={showCreateTemplate} onOpenChange={setShowCreateTemplate}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Template
                </Button>
              </DialogTrigger>
              
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Template</DialogTitle>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Template Name</Label>
                      <Input
                        value={newTemplate.name}
                        onChange={(e) => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="e.g., Technical Skills Rejection"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Category</Label>
                      <Select 
                        value={newTemplate.category} 
                        onValueChange={(value) => setNewTemplate(prev => ({ ...prev, category: value as any }))}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rejection">Rejection</SelectItem>
                          <SelectItem value="positive">Positive</SelectItem>
                          <SelectItem value="constructive">Constructive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label>Description</Label>
                    <Input
                      value={newTemplate.description}
                      onChange={(e) => setNewTemplate(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Brief description of when to use this template"
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Language</Label>
                      <Select 
                        value={newTemplate.language} 
                        onValueChange={(value) => setNewTemplate(prev => ({ ...prev, language: value as any }))}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="EN">🇺🇸 English</SelectItem>
                          <SelectItem value="TR">🇹🇷 Turkish</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Tone</Label>
                      <Select 
                        value={newTemplate.tone} 
                        onValueChange={(value) => setNewTemplate(prev => ({ ...prev, tone: value as any }))}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="friendly">Friendly</SelectItem>
                          <SelectItem value="formal">Formal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label>Template Content</Label>
                    <Textarea
                      value={newTemplate.content}
                      onChange={(e) => setNewTemplate(prev => ({ ...prev, content: e.target.value }))}
                      placeholder="Write your template content here. Use {candidateName}, {jobTitle}, etc. for dynamic values."
                      rows={8}
                      className="mt-1"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Use variables like {'{candidateName}'}, {'{jobTitle}'}, {'{companyName}'} for personalization
                    </p>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setShowCreateTemplate(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateTemplate}>
                      Create Template
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {templates.map((template) => (
              <div key={template.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-medium">{template.name}</h4>
                      {template.isDefault && (
                        <Badge variant="default">Default</Badge>
                      )}
                      {getToneBadge(template.tone)}
                      {getCategoryBadge(template.category)}
                      <Badge variant="outline">
                        {LANGUAGES[template.language].flag} {template.language}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                    
                    <div className="text-xs text-gray-500 space-x-4">
                      <span>Used {template.usageCount} times</span>
                      <span>•</span>
                      <span>Created by {template.createdBy}</span>
                      <span>•</span>
                      <span>{new Date(template.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setSelectedTemplate(template)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Template Preview</DialogTitle>
                        </DialogHeader>
                        
                        {selectedTemplate && (
                          <div className="space-y-4">
                            <div className="flex flex-wrap gap-2">
                              {getToneBadge(selectedTemplate.tone)}
                              {getCategoryBadge(selectedTemplate.category)}
                              <Badge variant="outline">
                                {LANGUAGES[selectedTemplate.language].flag} {selectedTemplate.language}
                              </Badge>
                            </div>
                            
                            <div>
                              <h4 className="font-medium mb-2">Content</h4>
                              <div className="bg-gray-50 rounded-lg p-4 text-sm whitespace-pre-wrap">
                                {selectedTemplate.content}
                              </div>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                    
                    <Button variant="ghost" size="sm">
                      <Copy className="h-4 w-4" />
                    </Button>
                    
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    
                    {!template.isDefault && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteTemplate(template.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notifications Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="h-5 w-5 mr-2" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Email notifications for pending feedback</Label>
              <p className="text-sm text-gray-500">Daily digest of candidates requiring feedback</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Slack notifications</Label>
              <p className="text-sm text-gray-500">Real-time notifications in Slack</p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Weekly analytics report</Label>
              <p className="text-sm text-gray-500">Summary of feedback metrics and trends</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}