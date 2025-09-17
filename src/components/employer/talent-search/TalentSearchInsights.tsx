import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { 
  TrendingUp,
  TrendingDown,
  Users,
  Target,
  Mail,
  Eye,
  Calendar,
  Download,
  Filter,
  BarChart3,
  PieChart,
  Activity
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  FunnelChart,
  Funnel,
  LabelList
} from "recharts";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// Mock data for insights
const performanceData = [
  { month: 'Jan', discovered: 78, contacted: 45, replied: 12 },
  { month: 'Feb', discovered: 92, contacted: 58, replied: 16 },
  { month: 'Mar', discovered: 156, contacted: 89, replied: 28 },
  { month: 'Apr', discovered: 234, contacted: 142, replied: 45 },
  { month: 'May', discovered: 198, contacted: 156, replied: 52 },
  { month: 'Jun', discovered: 267, contacted: 203, replied: 68 }
];

const candidateEngagement = [
  { type: 'Profile Views', value: 2341, change: 15 },
  { type: 'Messages Sent', value: 687, change: 8 },
  { type: 'Responses Received', value: 241, change: -2 },
  { type: 'Interview Requests', value: 98, change: 12 },
  { type: 'Applications', value: 34, change: 5 }
];

const skillDemand = [
  { skill: 'React', demand: 89, supply: 45, gap: 44 },
  { skill: 'Python', demand: 76, supply: 52, gap: 24 },
  { skill: 'Node.js', demand: 68, supply: 38, gap: 30 },
  { skill: 'AWS', demand: 65, supply: 28, gap: 37 },
  { skill: 'TypeScript', demand: 58, supply: 31, gap: 27 }
];

const conversionFunnel = [
  { name: 'Discovered', value: 1247, percentage: 100 },
  { name: 'Contacted', value: 687, percentage: 55 },
  { name: 'Responded', value: 241, percentage: 19 },
  { name: 'Interested', value: 98, percentage: 8 },
  { name: 'Applied', value: 34, percentage: 3 }
];

const timeToHire = [
  { week: 'Week 1', applications: 12, offers: 0 },
  { week: 'Week 2', applications: 18, offers: 2 },
  { week: 'Week 3', applications: 25, offers: 5 },
  { week: 'Week 4', applications: 31, offers: 8 },
  { week: 'Week 5', applications: 28, offers: 12 },
  { week: 'Week 6', applications: 22, offers: 15 }
];

export function TalentSearchInsights() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Talent Search Insights</h2>
          <p className="text-gray-600">Analytics and performance metrics for your talent acquisition</p>
        </div>
        <div className="flex space-x-2">
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

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Candidates</p>
                <p className="text-2xl font-bold">1,247</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +23% from last period
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Contact Rate</p>
                <p className="text-2xl font-bold">55%</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +8% from last period
                </p>
              </div>
              <div className="h-12 w-12 bg-green-50 rounded-full flex items-center justify-center">
                <Target className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Response Rate</p>
                <p className="text-2xl font-bold">24%</p>
                <p className="text-xs text-red-600 flex items-center mt-1">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  -2% from last period
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-50 rounded-full flex items-center justify-center">
                <Mail className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Time to Hire</p>
                <p className="text-2xl font-bold">28d</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  -5d from last period
                </p>
              </div>
              <div className="h-12 w-12 bg-orange-50 rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trend */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Talent Acquisition Performance</CardTitle>
            <CardDescription>Monthly trends of candidate discovery, outreach, and responses</CardDescription>
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
                    dataKey="discovered" 
                    stackId="1"
                    stroke="#3b82f6" 
                    fill="#3b82f6" 
                    fillOpacity={0.3}
                    name="Discovered"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="contacted" 
                    stackId="2"
                    stroke="#10b981" 
                    fill="#10b981" 
                    fillOpacity={0.6}
                    name="Contacted"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="replied" 
                    stackId="3"
                    stroke="#f59e0b" 
                    fill="#f59e0b" 
                    fillOpacity={0.8}
                    name="Replied"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Conversion Funnel */}
        <Card>
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
            <CardDescription>From discovery to application</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <FunnelChart>
                  <Tooltip />
                  <Funnel
                    dataKey="value"
                    data={conversionFunnel}
                    isAnimationActive
                    fill="#3b82f6"
                  >
                    <LabelList position="center" fill="#fff" stroke="none" />
                  </Funnel>
                </FunnelChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Candidate Engagement Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Candidate Engagement</CardTitle>
            <CardDescription>Overview of candidate interaction metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {candidateEngagement.map((metric) => (
                <div key={metric.type} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Activity className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{metric.type}</p>
                      <p className="text-2xl font-bold">{metric.value.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`flex items-center ${metric.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {metric.change >= 0 ? (
                        <TrendingUp className="h-4 w-4 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 mr-1" />
                      )}
                      <span className="text-sm font-medium">{Math.abs(metric.change)}%</span>
                    </div>
                    <p className="text-xs text-gray-500">vs last period</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skill Demand Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Skill Demand vs Supply</CardTitle>
            <CardDescription>Gap analysis for top skills</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {skillDemand.map((skill) => (
                <div key={skill.skill} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{skill.skill}</span>
                    <span className="text-gray-500">Gap: {skill.gap}%</span>
                  </div>
                  <div className="relative">
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-blue-500 rounded-full" 
                        style={{ width: `${skill.demand}%` }}
                      ></div>
                    </div>
                    <div 
                      className="absolute top-0 h-2 bg-green-500 rounded-full opacity-60" 
                      style={{ width: `${skill.supply}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Demand: {skill.demand}%</span>
                    <span>Supply: {skill.supply}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Time to Hire Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Time to Hire Analysis</CardTitle>
            <CardDescription>Applications vs offers over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeToHire}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="applications" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    name="Applications"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="offers" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    name="Offers Made"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Items */}
      <Card>
        <CardHeader>
          <CardTitle>Key Insights & Recommendations</CardTitle>
          <CardDescription>AI-powered insights to optimize your talent search</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start space-x-3">
                <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">Increase Candidate Outreach</h4>
                  <p className="text-sm text-blue-800">
                    Profile view conversion is up 15%. Consider expanding your candidate search criteria to reach more qualified professionals.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-start space-x-3">
                <Activity className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-900">Optimize Message Templates</h4>
                  <p className="text-sm text-yellow-800">
                    Response rates have dropped 2% this month. A/B test different message formats to improve engagement.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-start space-x-3">
                <Target className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-900">Focus on React & AWS Skills</h4>
                  <p className="text-sm text-green-800">
                    These skills show the largest supply-demand gap. Prioritize candidates with these skills.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}