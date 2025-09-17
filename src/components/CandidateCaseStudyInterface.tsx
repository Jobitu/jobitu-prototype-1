import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Alert, AlertDescription } from "./ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Upload,
  File,
  FileText,
  Image,
  Download,
  Save,
  Send,
  Shield,
  Monitor,
  Camera,
  Mic,
  Eye,
  EyeOff,
  Lightbulb,
  Target,
  Users,
  TrendingUp
} from "lucide-react";
import { CandidateCaseStudy } from "../data/assessmentMockData";

interface CandidateCaseStudyInterfaceProps {
  caseStudy: CandidateCaseStudy;
  onSubmit: (submission: any) => void;
  onSave: (submission: any) => void;
  onExit: () => void;
}

export function CandidateCaseStudyInterface({ 
  caseStudy, 
  onSubmit, 
  onSave, 
  onExit 
}: CandidateCaseStudyInterfaceProps) {
  const [timeRemaining, setTimeRemaining] = useState(caseStudy.totalTimeAllowed * 60);
  const [submission, setSubmission] = useState({
    executiveSummary: caseStudy.submission?.executiveSummary || '',
    analysis: caseStudy.submission?.analysis || '',
    recommendations: caseStudy.submission?.recommendations || '',
    implementation: caseStudy.submission?.implementation || '',
    attachments: caseStudy.submission?.attachments || []
  });
  const [activeTab, setActiveTab] = useState('brief');
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [monitoringActive, setMonitoringActive] = useState(true);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Timer effect
  useEffect(() => {
    if (timeRemaining > 0 && caseStudy.status === 'in-progress') {
      const timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeRemaining, caseStudy.status]);

  // Monitoring effects (similar to assessment interface)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    const handleVisibilityChange = () => {
      if (document.hidden && monitoringActive) {
        console.log('Tab switch detected');
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      if (monitoringActive) {
        e.preventDefault();
        console.log('Right click attempt detected');
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [monitoringActive]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeColor = () => {
    const percentage = (timeRemaining / (caseStudy.totalTimeAllowed * 60)) * 100;
    if (percentage < 10) return 'text-red-600';
    if (percentage < 25) return 'text-orange-600';
    return 'text-green-600';
  };

  const handleSubmissionChange = (field: string, value: string) => {
    const newSubmission = { ...submission, [field]: value };
    setSubmission(newSubmission);
    onSave(newSubmission);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
    
    const newAttachments = files.map(file => ({
      name: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: new Date().toISOString()
    }));
    
    const newSubmission = {
      ...submission,
      attachments: [...submission.attachments, ...newAttachments]
    };
    setSubmission(newSubmission);
    onSave(newSubmission);
  };

  const enterFullscreen = () => {
    if (containerRef.current) {
      containerRef.current.requestFullscreen();
    }
  };

  const getCompletionPercentage = () => {
    const fields = ['executiveSummary', 'analysis', 'recommendations', 'implementation'];
    const completed = fields.filter(field => submission[field as keyof typeof submission]?.toString().trim().length > 50).length;
    return (completed / fields.length) * 100;
  };

  const renderBrief = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Target className="h-6 w-6 text-blue-600 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Case Study Objective</h3>
            <p className="text-blue-800">{caseStudy.objective}</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Company Background</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{caseStudy.companyBackground}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Key Metrics</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {caseStudy.keyMetrics?.map((metric, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-sm">{metric.label}:</span>
                  <span className="text-sm font-medium">{metric.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Problem Statement</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{caseStudy.problemStatement}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Available Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {caseStudy.resources?.map((resource, index) => (
              <div key={index} className="flex items-center space-x-2 p-3 border rounded-lg">
                <FileText className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-sm font-medium">{resource.name}</p>
                  <p className="text-xs text-muted-foreground">{resource.type}</p>
                </div>
                <Button size="sm" variant="ghost">
                  <Download className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Alert>
        <Lightbulb className="h-4 w-4" />
        <AlertDescription>
          <strong>Tips for Success:</strong> Read all materials thoroughly, structure your analysis clearly, 
          provide data-driven recommendations, and consider implementation challenges.
        </AlertDescription>
      </Alert>
    </div>
  );

  const renderSubmissionForm = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Executive Summary</CardTitle>
          <p className="text-sm text-muted-foreground">
            Provide a high-level overview of your analysis and key recommendations (200-300 words)
          </p>
        </CardHeader>
        <CardContent>
          <Textarea
            value={submission.executiveSummary}
            onChange={(e) => handleSubmissionChange('executiveSummary', e.target.value)}
            placeholder="Summarize your key findings and recommendations..."
            className="min-h-[150px]"
          />
          <div className="text-xs text-muted-foreground mt-2">
            Word count: {submission.executiveSummary.split(' ').filter(Boolean).length}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Detailed Analysis</CardTitle>
          <p className="text-sm text-muted-foreground">
            Present your comprehensive analysis of the situation, including data interpretation and insights
          </p>
        </CardHeader>
        <CardContent>
          <Textarea
            value={submission.analysis}
            onChange={(e) => handleSubmissionChange('analysis', e.target.value)}
            placeholder="Provide your detailed analysis..."
            className="min-h-[300px]"
          />
          <div className="text-xs text-muted-foreground mt-2">
            Word count: {submission.analysis.split(' ').filter(Boolean).length}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recommendations</CardTitle>
          <p className="text-sm text-muted-foreground">
            Outline specific, actionable recommendations with clear rationale
          </p>
        </CardHeader>
        <CardContent>
          <Textarea
            value={submission.recommendations}
            onChange={(e) => handleSubmissionChange('recommendations', e.target.value)}
            placeholder="List your recommendations with supporting rationale..."
            className="min-h-[250px]"
          />
          <div className="text-xs text-muted-foreground mt-2">
            Word count: {submission.recommendations.split(' ').filter(Boolean).length}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Implementation Plan</CardTitle>
          <p className="text-sm text-muted-foreground">
            Describe how your recommendations should be implemented, including timeline and resources
          </p>
        </CardHeader>
        <CardContent>
          <Textarea
            value={submission.implementation}
            onChange={(e) => handleSubmissionChange('implementation', e.target.value)}
            placeholder="Outline your implementation strategy..."
            className="min-h-[200px]"
          />
          <div className="text-xs text-muted-foreground mt-2">
            Word count: {submission.implementation.split(' ').filter(Boolean).length}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Supporting Documents</CardTitle>
          <p className="text-sm text-muted-foreground">
            Upload any charts, models, or additional analysis (optional)
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="w-full"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Files
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.png,.jpg,.jpeg"
              onChange={handleFileUpload}
              className="hidden"
            />
            
            {submission.attachments.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Uploaded Files:</h4>
                {submission.attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                    <div className="flex items-center space-x-2">
                      <File className="h-4 w-4" />
                      <span className="text-sm">{file.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">{caseStudy.jobTitle} - Case Study</h1>
            <p className="text-sm text-muted-foreground">{caseStudy.title}</p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Monitoring Status */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <Monitor className="h-4 w-4 text-green-600" />
                <Camera className="h-4 w-4 text-green-600" />
                <Mic className="h-4 w-4 text-green-600" />
                <Shield className="h-4 w-4 text-green-600" />
              </div>
              <span className="text-xs text-green-600">Secure Mode</span>
            </div>
            
            {/* Timer */}
            <div className={`flex items-center space-x-2 ${getTimeColor()}`}>
              <Clock className="h-4 w-4" />
              <span className="font-mono text-lg font-semibold">{formatTime(timeRemaining)}</span>
            </div>
            
            {/* Fullscreen Toggle */}
            {!isFullscreen && (
              <Button variant="outline" size="sm" onClick={enterFullscreen}>
                <Monitor className="h-4 w-4 mr-2" />
                Fullscreen
              </Button>
            )}
            
            {/* Exit Button */}
            <Button variant="outline" size="sm" onClick={() => setShowExitDialog(true)}>
              Exit
            </Button>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>Completion Progress</span>
            <span>{Math.round(getCompletionPercentage())}% Complete</span>
          </div>
          <Progress value={getCompletionPercentage()} className="h-2" />
        </div>
      </div>

      {/* Security Alert */}
      {!isFullscreen && (
        <Alert className="mx-6 mt-4 border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            For security purposes, please enable fullscreen mode. All activity is monitored.
          </AlertDescription>
        </Alert>
      )}

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="brief">Case Brief & Resources</TabsTrigger>
              <TabsTrigger value="submission">Your Submission</TabsTrigger>
            </TabsList>
            
            <TabsContent value="brief" className="mt-6">
              {renderBrief()}
            </TabsContent>
            
            <TabsContent value="submission" className="mt-6">
              {renderSubmissionForm()}
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t">
            <div className="flex items-center space-x-2">
              <Badge variant="outline">
                Difficulty: {caseStudy.difficulty}
              </Badge>
              <Badge variant="outline">
                Time Limit: {caseStudy.totalTimeAllowed} hours
              </Badge>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={() => onSave(submission)}>
                <Save className="h-4 w-4 mr-2" />
                Save Progress
              </Button>
              
              <Button onClick={() => onSubmit(submission)} className="bg-green-600 hover:bg-green-700">
                <Send className="h-4 w-4 mr-2" />
                Submit Case Study
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Exit Confirmation Dialog */}
      <Dialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Exit Case Study?</DialogTitle>
            <DialogDescription>
              Are you sure you want to exit? Your progress will be saved, but you'll need to restart the case study.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={() => setShowExitDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={onExit}>
              Exit Case Study
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
