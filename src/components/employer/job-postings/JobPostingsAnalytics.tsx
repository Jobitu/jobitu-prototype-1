import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from "recharts";
import { 
  TrendingUp, 
  TrendingDown, 
  Eye, 
  Users, 
  Clock, 
  Target,
  Download,
  Calendar,
  BarChart3,
  PieChart as PieChartIcon,
  Activity
} from "lucide-react";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// Mock analytics data
const performanceData = [
  { month: 'Jan', views: 1200, applications: 145, hires: 12 },
  { month: 'Feb', views: 1350, applications: 168, hires: 15 },
  { month: 'Mar', views: 1580, applications: 192, hires: 18 },
  { month: 'Apr', views: 1420, applications: 178, hires: 14 },
  { month: 'May', views: 1680, applications: 205, hires: 22 },
  { month: 'Jun', views: 1920, applications: 234, hires: 26 }
];

const departmentData = [
  { name: 'Engineering', applications: 156, fill: '#0088FE' },
  { name: 'Product', applications: 89, fill: '#00C49F' },
  { name: 'Design', applications: 67, fill: '#FFBB28' },
  { name: 'Data', applications: 45, fill: '#FF8042' },
  { name: 'Marketing', applications: 34, fill: '#8884d8' }
];

const sourceData = [
  { source: 'Company Site', applications: 142, cost: 0, cpa: 0 },
  { source: 'LinkedIn', applications: 98, cost: 2400, cpa: 24.5 },
  { source: 'Indeed', applications: 76, cost: 1200, cpa: 15.8 },
  { source: 'AngelList', applications: 54, cost: 800, cpa: 14.8 },
  { source: 'Referrals', applications: 45, cost: 450, cpa: 10.0 }
];

const conversionData = [
  { stage: 'Job Views', count: 9500, percentage: 100 },
  { stage: 'Started Application', count: 2850, percentage: 30 },
  { stage: 'Completed Application', count: 1425, percentage: 15 },
  { stage: 'Phone Screen', count: 285, percentage: 3 },
  { stage: 'Final Interview', count: 142, percentage: 1.5 },
  { stage: 'Offer Extended', count: 71, percentage: 0.75 }
];

export function JobPostingsAnalytics() {
  const kpis = [
    { label: 'Total Views', value: '9,847', change: 12, icon: Eye },
    { label: 'Applications', value: '1,425', change: 8, icon: Users },
    { label: 'Avg. Time to Fill', value: '18.5d', change: -5, icon: Clock },
    { label: 'Application Rate', value: '14.5%', change: 3, icon: Target }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Job Posting Analytics</h2>
          <p className="text-gray-600">Track performance and optimize your hiring process</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select defaultValue="6months">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{kpi.label}</p>
                    <p className="text-2xl font-bold">{kpi.value}</p>
                    <div className="flex items-center mt-1">
                      {kpi.change > 0 ? (
                        <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                      )}
                      <span className={`text-xs ${kpi.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {kpi.change > 0 ? '+' : ''}{kpi.change}%
                      </span>
                      <span className="text-xs text-muted-foreground ml-1">vs last period</span>
                    </div>
                  </div>
                  <div className="h-12 w-12 bg-gray-50 rounded-full flex items-center justify-center">
                    <Icon className="h-6 w-6 text-gray-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trend */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Job Posting Performance</span>
            </CardTitle>
            <CardDescription>Views, applications, and hires over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="views" 
                    stackId="1"
                    stroke="#3b82f6" 
                    fill="#3b82f6" 
                    fillOpacity={0.3}
                    name="Views"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="applications" 
                    stackId="2"
                    stroke="#10b981" 
                    fill="#10b981" 
                    fillOpacity={0.6}
                    name="Applications"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="hires" 
                    stackId="3"
                    stroke="#f59e0b" 
                    fill="#f59e0b" 
                    fillOpacity={0.8}
                    name="Hires"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Department Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChartIcon className="h-5 w-5" />
              <span>Applications by Department</span>
            </CardTitle>
            <CardDescription>Distribution of applications across departments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="applications"
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {departmentData.map((dept, index) => (
                <div key={dept.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: dept.fill }}
                    />
                    <span>{dept.name}</span>
                  </div>
                  <span className="font-medium">{dept.applications}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Source Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Source Performance</CardTitle>
            <CardDescription>Applications and cost per acquisition by source</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sourceData.map((source) => (
                <div key={source.source} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{source.source}</span>
                    <span>{source.applications} applications</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Cost: ${source.cost}</span>
                    <span>CPA: ${source.cpa}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(source.applications / 142) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Conversion Funnel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5" />
            <span>Application Conversion Funnel</span>
          </CardTitle>
          <CardDescription>Track candidate progression through your hiring pipeline</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {conversionData.map((stage, index) => (
              <div key={stage.stage} className="relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{stage.stage}</span>
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="font-medium">{stage.count.toLocaleString()}</span>
                    <span className="text-muted-foreground">({stage.percentage}%)</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${stage.percentage}%` }}
                  />
                </div>
                {index < conversionData.length - 1 && (
                  <div className="flex justify-end mt-1">
                    <span className="text-xs text-red-500">
                      -{((conversionData[index].count - conversionData[index + 1].count) / conversionData[index].count * 100).toFixed(1)}% drop-off
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Insights and Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Key Insights</CardTitle>
            <CardDescription>AI-powered insights to improve your job postings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start space-x-3">
                  <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900">Strong Performance in Engineering</h4>
                    <p className="text-sm text-blue-800">
                      Engineering roles show 23% higher application rates than average. Consider expanding engineering postings.
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-900">Optimize Application Process</h4>
                    <p className="text-sm text-yellow-800">
                      High drop-off between started and completed applications (50%). Consider simplifying the process.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
            <CardDescription>Actionable suggestions to improve performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-start space-x-3">
                  <Target className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-900">Increase Company Site Promotion</h4>
                    <p className="text-sm text-green-800">
                      Company site has the lowest cost per application. Promote job postings on your website more.
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-start space-x-3">
                  <Users className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-purple-900">A/B Test Job Descriptions</h4>
                    <p className="text-sm text-purple-800">
                      Try different job description formats to improve view-to-application conversion rates.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}