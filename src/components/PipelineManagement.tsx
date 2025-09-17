import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { ApplicationCard, ApplicationCardCompact } from "./ApplicationCard";
import { PipelineApplication, ApplicationStage, PipelineStats } from "../types/pipeline";
import { mockPipelineApplications, mockPipelineStats } from "../data/pipelineMockData";
import { 
  Search, 
  Filter, 
  Users, 
  TrendingUp, 
  Clock,
  CheckCircle,
  Eye,
  Trophy,
  AlertTriangle,
  BarChart3,
  Grid3X3,
  List,
  ArrowRight,
  FileText,
  Calendar
} from "lucide-react";

interface PipelineManagementProps {
  onViewApplicationDetail?: (applicationId: string) => void;
  onStageAction?: (applicationId: string, action: string) => void;
}

export function PipelineManagement({ 
  onViewApplicationDetail, 
  onStageAction 
}: PipelineManagementProps) {
  const [applications] = useState<PipelineApplication[]>(mockPipelineApplications);
  const [stats] = useState<PipelineStats>(mockPipelineStats);
  const [selectedStage, setSelectedStage] = useState<ApplicationStage | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'cards' | 'compact'>('cards');
  const [sortBy, setSortBy] = useState<'date' | 'match_score' | 'stage'>('date');

  const stageConfig = {
    applied: { label: 'Applied', icon: FileText, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    qualified: { label: 'Qualified', icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-50' },
    interview: { label: 'Interview', icon: Calendar, color: 'text-purple-600', bgColor: 'bg-purple-50' },
    final_review: { label: 'Final Review', icon: Eye, color: 'text-orange-600', bgColor: 'bg-orange-50' },
    passed: { label: 'Passed', icon: Trophy, color: 'text-yellow-600', bgColor: 'bg-yellow-50' },
    rejected: { label: 'Rejected', icon: AlertTriangle, color: 'text-red-600', bgColor: 'bg-red-50' }
  };

  const filteredApplications = applications
    .filter(app => {
      if (selectedStage !== 'all' && app.stage !== selectedStage) return false;
      if (searchTerm && !app.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'match_score':
          return b.matchScore - a.matchScore;
        case 'stage':
          const stageOrder = ['applied', 'qualified', 'interview', 'final_review', 'passed', 'rejected'];
          return stageOrder.indexOf(a.stage) - stageOrder.indexOf(b.stage);
        default:
          return new Date(b.applicationDate).getTime() - new Date(a.applicationDate).getTime();
      }
    });

  const getStageCount = (stage: ApplicationStage) => {
    return applications.filter(app => app.stage === stage).length;
  };

  const handleStageAction = (applicationId: string, action: string) => {
    // Mock action handler - in real app this would update the application
    console.log(`Action: ${action} for application: ${applicationId}`);
    onStageAction?.(applicationId, action);
  };

  const renderStageStats = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
      {Object.entries(stageConfig).map(([stage, config]) => {
        const count = getStageCount(stage as ApplicationStage);
        const Icon = config.icon;
        
        return (
          <Card 
            key={stage} 
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedStage === stage ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setSelectedStage(stage as ApplicationStage)}
          >
            <CardContent className="p-4 text-center">
              <div className={`${config.bgColor} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2`}>
                <Icon className={`h-6 w-6 ${config.color}`} />
              </div>
              <div className="text-2xl font-bold">{count}</div>
              <div className="text-sm text-gray-600">{config.label}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );

  const renderPipelineOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              Total Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalApplications}</div>
            <div className="text-sm text-gray-600 mt-1">Across all stages</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Conversion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.conversionRates.appliedToQualified}%</div>
            <div className="text-sm text-gray-600 mt-1">Applied → Qualified</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-600" />
              Avg. Time to Hire
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {Object.values(stats.averageTimeInStage).reduce((a, b) => a + b, 0).toFixed(1)}
            </div>
            <div className="text-sm text-gray-600 mt-1">Days total</div>
          </CardContent>
        </Card>
      </div>

      {renderStageStats()}
    </div>
  );

  const renderApplicationsList = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search candidates or jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date Applied</SelectItem>
              <SelectItem value="match_score">Match Score</SelectItem>
              <SelectItem value="stage">Pipeline Stage</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'cards' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('cards')}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'compact' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('compact')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="text-sm text-gray-600 mb-4">
        Showing {filteredApplications.length} of {applications.length} applications
        {selectedStage !== 'all' && ` in ${stageConfig[selectedStage].label} stage`}
      </div>

      <div className={`grid gap-4 ${
        viewMode === 'cards' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'
      }`}>
        {filteredApplications.map((application) => (
          viewMode === 'cards' ? (
            <ApplicationCard
              key={application.id}
              application={application}
              onViewDetails={onViewApplicationDetail}
              onStageAction={handleStageAction}
              viewType="employer"
              showActions={true}
            />
          ) : (
            <ApplicationCardCompact
              key={application.id}
              application={application}
              onViewDetails={onViewApplicationDetail}
              onStageAction={handleStageAction}
            />
          )
        ))}
      </div>

      {filteredApplications.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
          <p className="text-gray-600">
            {selectedStage !== 'all' 
              ? `No applications in ${stageConfig[selectedStage].label} stage`
              : 'Try adjusting your search or filters'
            }
          </p>
        </div>
      )}
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Stage Conversion Rates
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(stats.conversionRates).map(([key, rate]) => {
              const labels = {
                appliedToQualified: 'Applied → Qualified',
                qualifiedToInterview: 'Qualified → Interview',
                interviewToFinalReview: 'Interview → Final Review',
                finalReviewToPassed: 'Final Review → Passed'
              };
              
              return (
                <div key={key} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{labels[key as keyof typeof labels]}</span>
                    <span className="font-medium">{rate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${rate}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Average Time in Each Stage
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(stats.averageTimeInStage).map(([stage, days]) => {
              const config = stageConfig[stage as ApplicationStage];
              
              return (
                <div key={stage} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <config.icon className={`h-4 w-4 ${config.color}`} />
                    <span className="text-sm">{config.label}</span>
                  </div>
                  <span className="font-medium">{days} days</span>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Pipeline Management</h1>
          <p className="text-gray-600 mt-1">Manage candidates through the 5-stage Jobitu process</p>
        </div>
        <Button onClick={() => setSelectedStage('all')} variant="outline">
          <Eye className="h-4 w-4 mr-2" />
          View All Stages
        </Button>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {renderPipelineOverview()}
        </TabsContent>

        <TabsContent value="applications" className="space-y-6">
          {renderApplicationsList()}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {renderAnalytics()}
        </TabsContent>
      </Tabs>
    </div>
  );
}
