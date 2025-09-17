import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Input } from "../../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { Progress } from "../../ui/progress";
import { 
  Plus,
  Send,
  Pause,
  Play,
  Edit,
  Trash2,
  Copy,
  Eye,
  Calendar,
  Users,
  Mail,
  MessageSquare,
  Target,
  TrendingUp,
  Clock,
  MoreHorizontal,
  Search,
  Filter,
  BarChart3
} from "lucide-react";
import { mockCampaigns } from './mockData';
import { Campaign } from './types';

export function TalentSearchCampaigns() {
  const [campaigns] = useState<Campaign[]>(mockCampaigns);
  const [showCreateCampaign, setShowCreateCampaign] = useState(false);
  const [showCampaignDetails, setShowCampaignDetails] = useState<Campaign | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [performanceFilter, setPerformanceFilter] = useState("all");

  const getStatusColor = (status: Campaign['status']) => {
    switch (status) {
      case 'Running': return 'bg-green-500';
      case 'Draft': return 'bg-gray-500';
      case 'Paused': return 'bg-yellow-500';
      case 'Completed': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusBadgeVariant = (status: Campaign['status']) => {
    switch (status) {
      case 'Running': return 'default';
      case 'Draft': return 'secondary';
      case 'Paused': return 'outline';
      case 'Completed': return 'outline';
      default: return 'secondary';
    }
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         campaign.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || campaign.status.toLowerCase() === statusFilter;
    const matchesPerformance = performanceFilter === 'all' 
      || (performanceFilter === 'high' && campaign.replyRate >= 30)
      || (performanceFilter === 'low' && campaign.replyRate < 30);
    return matchesSearch && matchesStatus && matchesPerformance;
  });

  const CreateCampaignDialog = () => (
    <Dialog open={showCreateCampaign} onOpenChange={setShowCreateCampaign}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Campaign</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="campaignName">Campaign Name</Label>
              <Input id="campaignName" placeholder="e.g., Backend Engineer Outreach" />
            </div>
            <div>
              <Label htmlFor="targetList">Target Shortlist</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select shortlist" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="list1">Frontend Candidates Q3</SelectItem>
                  <SelectItem value="list2">Senior Backend Pool</SelectItem>
                  <SelectItem value="list3">Remote-First Talent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              placeholder="Brief description of this campaign..."
              rows={2}
            />
          </div>
          <div>
            <Label htmlFor="messageTemplate">Message Template</Label>
            <Textarea 
              id="messageTemplate" 
              placeholder="Hi {{name}}, I came across your profile and was impressed by your {{top_skill}} experience..."
              rows={4}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input id="startDate" type="date" />
            </div>
            <div>
              <Label htmlFor="frequency">Send Frequency</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediate</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowCreateCampaign(false)}>
              Save as Draft
            </Button>
            <Button onClick={() => setShowCreateCampaign(false)}>
              Create & Start Campaign
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  const CampaignDetailsDialog = () => (
    <Dialog open={!!showCampaignDetails} onOpenChange={() => setShowCampaignDetails(null)}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Campaign Details</DialogTitle>
        </DialogHeader>
        {showCampaignDetails && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">{showCampaignDetails.name}</h3>
            <p className="text-gray-600">{showCampaignDetails.description}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-sm">
                <p className="text-muted-foreground">Recipients</p>
                <p className="font-bold">{showCampaignDetails.recipients}</p>
              </div>
              <div className="text-sm">
                <p className="text-muted-foreground">Open Rate</p>
                <p className="font-bold">{showCampaignDetails.openRate}%</p>
              </div>
              <div className="text-sm">
                <p className="text-muted-foreground">Reply Rate</p>
                <p className="font-bold">{showCampaignDetails.replyRate}%</p>
              </div>
              <div className="text-sm">
                <p className="text-muted-foreground">Start Date</p>
                <p className="font-bold">{showCampaignDetails.startDate}</p>
              </div>
            </div>
            <div>
              <Label>Progress</Label>
              <Progress value={showCampaignDetails.openRate} className="h-2 mt-1" />
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Outreach Campaigns</h2>
          <p className="text-gray-600">Manage and track your talent outreach efforts</p>
        </div>
        <Button onClick={() => setShowCreateCampaign(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Campaign
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search campaigns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Campaigns</SelectItem>
            <SelectItem value="running">Running</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="paused">Paused</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={performanceFilter} onValueChange={setPerformanceFilter}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Performance" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Performance</SelectItem>
            <SelectItem value="high">High Performing</SelectItem>
            <SelectItem value="low">Low Performing</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Campaign Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card><CardContent className="p-4 flex justify-between"><div><p className="text-sm text-muted-foreground">Total Campaigns</p><p className="text-2xl font-bold">{campaigns.length}</p></div><Send className="h-8 w-8 text-blue-500" /></CardContent></Card>
        <Card><CardContent className="p-4 flex justify-between"><div><p className="text-sm text-muted-foreground">Active</p><p className="text-2xl font-bold">{campaigns.filter(c => c.status === 'Running').length}</p></div><Play className="h-8 w-8 text-green-500" /></CardContent></Card>
        <Card><CardContent className="p-4 flex justify-between"><div><p className="text-sm text-muted-foreground">Avg. Open Rate</p><p className="text-2xl font-bold">{Math.round(campaigns.reduce((sum, c) => sum + c.openRate, 0) / campaigns.length)}%</p></div><Eye className="h-8 w-8 text-purple-500" /></CardContent></Card>
        <Card><CardContent className="p-4 flex justify-between"><div><p className="text-sm text-muted-foreground">Avg. Reply Rate</p><p className="text-2xl font-bold">{Math.round(campaigns.reduce((sum, c) => sum + c.replyRate, 0) / campaigns.length)}%</p></div><MessageSquare className="h-8 w-8 text-orange-500" /></CardContent></Card>
        <Card><CardContent className="p-4 flex justify-between"><div><p className="text-sm text-muted-foreground">Conversion Rate</p><p className="text-2xl font-bold">42%</p></div><TrendingUp className="h-8 w-8 text-indigo-500" /></CardContent></Card>
      </div>

      {/* Campaigns List */}
      <div className="space-y-4">
        {filteredCampaigns.map((campaign) => (
          <Card key={campaign.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold">{campaign.name}</h3>
                    <Badge variant={getStatusBadgeVariant(campaign.status)}>
                      <div className={`w-2 h-2 rounded-full mr-2 ${getStatusColor(campaign.status)}`}></div>
                      {campaign.status}
                    </Badge>
                  </div>
                  <p className="text-gray-600 mb-3">{campaign.description}</p>
                  
                  {/* Campaign Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center space-x-2"><Users className="h-4 w-4 text-gray-400" /><span className="text-sm">{campaign.recipients} recipients</span></div>
                    <div className="flex items-center space-x-2"><Eye className="h-4 w-4 text-gray-400" /><span className="text-sm">{campaign.openRate}% open rate</span></div>
                    <div className="flex items-center space-x-2"><MessageSquare className="h-4 w-4 text-gray-400" /><span className="text-sm">{campaign.replyRate}% reply rate</span></div>
                    <div className="flex items-center space-x-2"><Calendar className="h-4 w-4 text-gray-400" /><span className="text-sm">Started {campaign.startDate}</span></div>
                  </div>

                  {/* Progress Bar for Running Campaigns */}
                  {campaign.status === 'Running' && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Campaign Progress</span>
                        <span>{Math.round((campaign.openRate / 100) * campaign.recipients)} / {campaign.recipients}</span>
                      </div>
                      <Progress value={(campaign.openRate / 100) * 100} className="h-2" />
                    </div>
                  )}
                </div>

                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                {campaign.status === 'Running' && (
                  <Button size="sm" variant="outline"><Pause className="h-4 w-4 mr-2" />Pause</Button>
                )}
                {campaign.status === 'Paused' && (
                  <Button size="sm" variant="outline"><Play className="h-4 w-4 mr-2" />Resume</Button>
                )}
                {campaign.status === 'Draft' && (
                  <Button size="sm"><Play className="h-4 w-4 mr-2" />Start Campaign</Button>
                )}
                <Button size="sm" variant="outline" onClick={() => setShowCampaignDetails(campaign)}>
                  <Eye className="h-4 w-4 mr-2" /> View Details
                </Button>
                <Button size="sm" variant="outline"><Edit className="h-4 w-4 mr-2" />Edit</Button>
                <Button size="sm" variant="outline"><Copy className="h-4 w-4 mr-2" />Duplicate</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredCampaigns.length === 0 && (
        <div className="text-center py-12">
          <Send className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchQuery ? 'No campaigns found' : 'No campaigns yet'}
          </h3>
          <p className="text-gray-500 mb-4">
            {searchQuery 
              ? 'Try adjusting your search terms or filters'
              : 'Create your first outreach campaign to start connecting with candidates'
            }
          </p>
          <Button onClick={() => setShowCreateCampaign(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create First Campaign
          </Button>
        </div>
      )}

      <CreateCampaignDialog />
      <CampaignDetailsDialog />
    </div>
  );
}
