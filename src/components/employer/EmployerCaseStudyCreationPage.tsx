import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Separator } from "../ui/separator";
import { 
  ArrowLeft,
  Save,
  Upload,
  Plus,
  X,
  FileText,
  Code,
  Users,
  Brain,
  Settings,
  Clock,
  Target,
  Tag
} from "lucide-react";

interface EmployerCaseStudyCreationPageProps {
  onBack: () => void;
  onSave: (caseStudy: any) => void;
}

export function EmployerCaseStudyCreationPage({ onBack, onSave }: EmployerCaseStudyCreationPageProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'Coding',
    difficulty: 'Medium',
    timeLimit: 90,
    environment: 'node:18',
    tags: [] as string[],
    instructions: '',
    passingCriteria: '',
    resources: [] as Array<{ name: string; url: string; type: string }>
  });

  const [newTag, setNewTag] = useState('');
  const [newResource, setNewResource] = useState({ name: '', url: '', type: 'Link' });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({ 
        ...prev, 
        tags: [...prev.tags, newTag.trim()] 
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleAddResource = () => {
    if (newResource.name.trim() && newResource.url.trim()) {
      setFormData(prev => ({
        ...prev,
        resources: [...prev.resources, { ...newResource }]
      }));
      setNewResource({ name: '', url: '', type: 'Link' });
    }
  };

  const handleRemoveResource = (index: number) => {
    setFormData(prev => ({
      ...prev,
      resources: prev.resources.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    // Generate a unique ID for the case study
    const newCaseStudy = {
      id: `CS-${Date.now()}`,
      shortId: `CS-${Date.now()}`,
      ...formData,
      avgScore: 0,
      attempts: 0,
      status: 'Draft' as const,
      lastRun: 'Never',
      version: '1.0',
      created: new Date().toISOString().split('T')[0],
      updated: new Date().toISOString().split('T')[0],
      owner: 'Current User' // This would come from auth context
    };

    onSave(newCaseStudy);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Coding':
        return <Code className="h-4 w-4" />;
      case 'System':
        return <Settings className="h-4 w-4" />;
      case 'Behavioral':
        return <Users className="h-4 w-4" />;
      case 'Mixed':
        return <Brain className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={onBack}
                className="p-2"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-semibold">Create New Case Study</h1>
                <p className="text-gray-600">Design a technical assessment for candidate evaluation</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Import Template
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Case Study
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Case Study Title</Label>
                  <Input
                    placeholder="Enter a descriptive title for your case study"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Provide a clear description of what candidates will be asked to do"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="mt-2 min-h-[100px]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Type</Label>
                    <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Coding">
                          <div className="flex items-center">
                            <Code className="h-4 w-4 mr-2" />
                            Coding Challenge
                          </div>
                        </SelectItem>
                        <SelectItem value="System">
                          <div className="flex items-center">
                            <Settings className="h-4 w-4 mr-2" />
                            System Design
                          </div>
                        </SelectItem>
                        <SelectItem value="Behavioral">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2" />
                            Behavioral Assessment
                          </div>
                        </SelectItem>
                        <SelectItem value="Mixed">
                          <div className="flex items-center">
                            <Brain className="h-4 w-4 mr-2" />
                            Mixed Assessment
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Difficulty Level</Label>
                    <Select value={formData.difficulty} onValueChange={(value) => handleInputChange('difficulty', value)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Easy">Easy</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Time Limit (minutes)</Label>
                    <Input
                      type="number"
                      placeholder="90"
                      value={formData.timeLimit}
                      onChange={(e) => handleInputChange('timeLimit', parseInt(e.target.value) || 90)}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label>Environment</Label>
                    <Select value={formData.environment} onValueChange={(value) => handleInputChange('environment', value)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="node:18">Node.js 18</SelectItem>
                        <SelectItem value="python:3.11">Python 3.11</SelectItem>
                        <SelectItem value="java:17">Java 17</SelectItem>
                        <SelectItem value="react-native">React Native</SelectItem>
                        <SelectItem value="docker-compose">Docker Compose</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Instructions & Criteria */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Instructions & Criteria
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Detailed Instructions</Label>
                  <Textarea
                    placeholder="Provide step-by-step instructions for candidates. Be clear about expectations, deliverables, and any constraints."
                    value={formData.instructions}
                    onChange={(e) => handleInputChange('instructions', e.target.value)}
                    className="mt-2 min-h-[150px]"
                  />
                </div>

                <div>
                  <Label>Passing Criteria</Label>
                  <Textarea
                    placeholder="Define what constitutes a successful completion. Include technical requirements, code quality standards, and any specific metrics."
                    value={formData.passingCriteria}
                    onChange={(e) => handleInputChange('passingCriteria', e.target.value)}
                    className="mt-2 min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Tag className="h-5 w-5 mr-2" />
                  Tags & Skills
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add a tag (e.g., React, Python, Algorithm)"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                    className="flex-1"
                  />
                  <Button onClick={handleAddTag}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center space-x-1">
                      <span>{tag}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveTag(tag)}
                        className="p-0 h-auto"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Resources */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Additional Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  <Input
                    placeholder="Resource name"
                    value={newResource.name}
                    onChange={(e) => setNewResource(prev => ({ ...prev, name: e.target.value }))}
                  />
                  <Input
                    placeholder="URL"
                    value={newResource.url}
                    onChange={(e) => setNewResource(prev => ({ ...prev, url: e.target.value }))}
                  />
                  <div className="flex space-x-2">
                    <Select value={newResource.type} onValueChange={(value) => setNewResource(prev => ({ ...prev, type: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Link">Link</SelectItem>
                        <SelectItem value="Document">Document</SelectItem>
                        <SelectItem value="Video">Video</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button onClick={handleAddResource}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  {formData.resources.map((resource, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{resource.name}</p>
                        <p className="text-sm text-gray-500">{resource.url}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{resource.type}</Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveResource(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Preview & Settings */}
          <div className="space-y-6">
            {/* Preview */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  {getTypeIcon(formData.type)}
                  <Badge variant="outline">{formData.type}</Badge>
                  <Badge variant="outline" className={
                    formData.difficulty === 'Easy' ? 'border-green-200 text-green-800' :
                    formData.difficulty === 'Medium' ? 'border-yellow-200 text-yellow-800' :
                    'border-red-200 text-red-800'
                  }>
                    {formData.difficulty}
                  </Badge>
                </div>

                <div>
                  <h3 className="font-semibold">{formData.title || 'Untitled Case Study'}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {formData.description || 'No description provided'}
                  </p>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {formData.timeLimit}m
                  </div>
                  <div className="flex items-center">
                    <Settings className="h-4 w-4 mr-1" />
                    {formData.environment}
                  </div>
                </div>

                {formData.tags.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2">Skills:</p>
                    <div className="flex flex-wrap gap-1">
                      {formData.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {formData.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{formData.tags.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>💡 Tips for Great Case Studies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p>Keep instructions clear and specific to avoid confusion</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p>Set realistic time limits based on the complexity</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p>Include diverse difficulty levels to assess different skill levels</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p>Test your case study internally before using it</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}