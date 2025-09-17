import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button"; 
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { 
  Download,
  TrendingUp,
  Award,
  Clock,
  Target,
  BarChart3,
  PieChart
} from "lucide-react";

export function AssessmentReports() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Assessment Analytics</h2>
          <p className="text-gray-600">Performance insights and completion metrics</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="30days">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                <p className="text-2xl font-semibold">87%</p>
              </div>
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">+5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Score</p>
                <p className="text-2xl font-semibold">78.5</p>
              </div>
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Award className="h-4 w-4 text-blue-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">+2.3% improvement</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Median Time</p>
                <p className="text-2xl font-semibold">95min</p>
              </div>
              <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Clock className="h-4 w-4 text-purple-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">-8min from avg</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pass Rate</p>
                <p className="text-2xl font-semibold">73%</p>
              </div>
              <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
                <Target className="h-4 w-4 text-orange-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">+12% this quarter</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Score Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>Chart placeholder</p>
                <p className="text-xs">Score distribution data would appear here</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Assessment Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <PieChart className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>Chart placeholder</p>
                <p className="text-xs">Performance metrics data would appear here</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Assessment Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b">
                <tr>
                  <th className="text-left py-2">Assessment</th>
                  <th className="text-center py-2">Attempts</th>
                  <th className="text-center py-2">Avg Score</th>
                  <th className="text-center py-2">Pass Rate</th>
                  <th className="text-center py-2">Avg Duration</th>
                  <th className="text-center py-2">Last 7 Days</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3">Frontend Developer Assessment</td>
                  <td className="text-center py-3">24</td>
                  <td className="text-center py-3">78%</td>
                  <td className="text-center py-3">83%</td>
                  <td className="text-center py-3">105min</td>
                  <td className="text-center py-3">
                    <span className="text-green-600">+12%</span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">Product Strategy Case Study</td>
                  <td className="text-center py-3">42</td>
                  <td className="text-center py-3">85%</td>
                  <td className="text-center py-3">92%</td>
                  <td className="text-center py-3">156min</td>
                  <td className="text-center py-3">
                    <span className="text-green-600">+8%</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3">UX Design Challenge</td>
                  <td className="text-center py-3">0</td>
                  <td className="text-center py-3">-</td>
                  <td className="text-center py-3">-</td>
                  <td className="text-center py-3">-</td>
                  <td className="text-center py-3">
                    <span className="text-gray-400">No data</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}