import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";

interface AnalyticsTabProps {
  avgMatchScore: number;
}

export function AnalyticsTab({ avgMatchScore }: AnalyticsTabProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Hiring Funnel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Applications</span>
                <span className="font-bold">54</span>
              </div>
              <Progress value={100} className="h-2" />
              
              <div className="flex items-center justify-between">
                <span>Reviewed</span>
                <span className="font-bold">32</span>
              </div>
              <Progress value={59} className="h-2" />
              
              <div className="flex items-center justify-between">
                <span>Interviewed</span>
                <span className="font-bold">12</span>
              </div>
              <Progress value={22} className="h-2" />
              
              <div className="flex items-center justify-between">
                <span>Offers</span>
                <span className="font-bold">3</span>
              </div>
              <Progress value={6} className="h-2" />
              
              <div className="flex items-center justify-between">
                <span>Hired</span>
                <span className="font-bold">1</span>
              </div>
              <Progress value={2} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Time to Hire</span>
                <span className="font-bold">18 days</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Interview-to-Offer Rate</span>
                <span className="font-bold">25%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Offer Acceptance Rate</span>
                <span className="font-bold">67%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Average Match Score</span>
                <span className="font-bold">{avgMatchScore}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}