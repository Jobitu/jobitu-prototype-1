import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { TrendingUp } from "lucide-react";
import { TabProps, Application } from "../types/applicationTypes";

export function ReportsAnalyticsTab({ applications }: Pick<TabProps, 'applications'>) {
  const safeApplications = applications || [];
  const totalApplications = safeApplications.length;
  const newApplications = safeApplications.filter(app => app.status === 'new').length;
  const inInterviews = safeApplications.filter(app => app.status === 'interview').length;
  const hired = safeApplications.filter(app => app.status === 'hired').length;

  const conversionRates = {
    applicationToScreening: ((totalApplications - newApplications) / totalApplications * 100) || 0,
    screeningToInterview: (inInterviews / totalApplications * 100) || 0,
    interviewToHire: (hired / totalApplications * 100) || 0
  };

  const sourceBreakdown = safeApplications.reduce((acc, app) => {
    acc[app.source] = (acc[app.source] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Handle empty state
  if (totalApplications === 0) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <TrendingUp className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Application Data</h3>
            <p className="text-gray-600">
              Analytics will be available once you start receiving applications.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalApplications}</div>
            <p className="text-xs text-gray-600 mt-1">
              <TrendingUp className="inline h-3 w-3 mr-1 text-green-600" />
              +12% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalApplications - hired - safeApplications.filter(app => app.status === 'rejected').length}</div>
            <p className="text-xs text-gray-600 mt-1">Active candidates</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Interviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inInterviews}</div>
            <p className="text-xs text-gray-600 mt-1">{conversionRates.screeningToInterview.toFixed(1)}% conversion</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Hired</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{hired}</div>
            <p className="text-xs text-gray-600 mt-1">{conversionRates.interviewToHire.toFixed(1)}% success rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Conversion Funnel */}
      <Card>
        <CardHeader>
          <CardTitle>Hiring Funnel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Applications Received</span>
              <span className="font-medium">{totalApplications}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '100%' }}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <span>Moved to Screening</span>
              <span className="font-medium">{totalApplications - newApplications}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${conversionRates.applicationToScreening}%` }}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <span>Interviewed</span>
              <span className="font-medium">{inInterviews}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${conversionRates.screeningToInterview}%` }}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <span>Hired</span>
              <span className="font-medium">{hired}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: `${conversionRates.interviewToHire}%` }}></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Source Effectiveness */}
      <Card>
        <CardHeader>
          <CardTitle>Source Effectiveness</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(sourceBreakdown).length > 0 ? (
              Object.entries(sourceBreakdown).map(([source, count]) => {
                const percentage = (count / totalApplications * 100);
                const sourceLabel = source.replace('_', ' ').split(' ').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                
                return (
                  <div key={source} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span>{sourceLabel}</span>
                        <span className="text-sm font-medium">{count} ({percentage.toFixed(1)}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-4 text-gray-500">
                No source data available
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}