import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { 
  TrendingUp,
  CheckCircle,
  UserPlus,
  Star,
  AlertCircle,
  Brain,
  Zap,
  Target,
  BarChart3,
  Plus,
  Users,
  Calendar,
  Briefcase,
  PieChart
} from "lucide-react";

interface OverviewTabProps {
  onNavigateToMarketplace: () => void;
  onCreateJob?: () => void;
  onViewAnalytics?: () => void;
}

export function OverviewTab({ onNavigateToMarketplace, onCreateJob, onViewAnalytics }: OverviewTabProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">Alex Chen completed technical interview</p>
                <p className="text-xs text-muted-foreground">Senior Frontend Developer • 2 hours ago</p>
              </div>
              <Button size="sm" variant="outline">Review</Button>
            </div>

            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <UserPlus className="h-5 w-5 text-blue-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">3 new applications received</p>
                <p className="text-xs text-muted-foreground">Product Manager position • 1 day ago</p>
              </div>
              <Button size="sm" variant="outline">View</Button>
            </div>

            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
              <Star className="h-5 w-5 text-purple-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">Sarah Johnson rated 5/5 in culture fit</p>
                <p className="text-xs text-muted-foreground">Product Manager • 2 days ago</p>
              </div>
              <Button size="sm" variant="outline">Details</Button>
            </div>

            <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">Interview reminder: Mike Rodriguez</p>
                <p className="text-xs text-muted-foreground">UX Designer • Tomorrow 2:00 PM</p>
              </div>
              <Button size="sm" variant="outline">Reschedule</Button>
            </div>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              AI Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Zap className="h-4 w-4 text-blue-600" />
                Job Post Optimization
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                Your "Senior Frontend" post could attract 30% more candidates with salary transparency.
              </p>
              <Button size="sm" variant="outline" className="w-full">
                Optimize Post
              </Button>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Target className="h-4 w-4 text-green-600" />
                Top Matches Found
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                2 candidates with 90%+ match for your Product Manager role.
              </p>
              <Button size="sm" variant="outline" className="w-full" onClick={onNavigateToMarketplace}>
                View Matches
              </Button>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-purple-600" />
                Hiring Trends
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                React developers are 40% more active this month in your area.
              </p>
              <Button size="sm" variant="outline" className="w-full" onClick={onViewAnalytics}>
                View Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col items-center justify-center gap-2" onClick={onCreateJob}>
              <Plus className="h-6 w-6" />
              <span>Post New Job</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2" onClick={onNavigateToMarketplace}>
              <Users className="h-6 w-6" />
              <span>Browse Talent</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
              <Calendar className="h-6 w-6" />
              <span>Schedule Interview</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2" onClick={onViewAnalytics}>
              <PieChart className="h-6 w-6" />
              <span>View Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}