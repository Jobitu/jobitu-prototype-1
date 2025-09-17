import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { 
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { 
  TrendingUp,
  TrendingDown,
  Users,
  MessageSquare,
  Target,
  Award,
  Download,
  Filter,
  Calendar,
  BarChart3,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { mockFeedbackAnalytics } from "./mockData";
import { CHART_COLORS, SKILL_CATEGORIES } from "./constants";
import { formatFeedbackDate } from "./utils";

export function Analytics() {
  const [timeRange, setTimeRange] = useState('30days');
  const [viewType, setViewType] = useState('overview');

  const analytics = mockFeedbackAnalytics;

  // Transform data for charts
  const skillRatingsData = Object.entries(analytics.averageRatings).map(([skill, rating]) => ({
    skill: skill.replace(' Skills', ''),
    rating: rating,
    marketAvg: analytics.benchmarkData?.averageRatings[skill] || 0
  }));

  const trendData = analytics.monthlyTrends.map(trend => ({
    month: trend.month,
    feedbacks: trend.feedbackCount,
    avgRating: trend.averageRating
  }));

  const skillGapData = analytics.commonSkillGaps.map(gap => ({
    skill: gap.skillName,
    percentage: gap.percentage,
    trend: gap.trend
  }));

  const languageData = Object.entries(analytics.languageDistribution).map(([lang, percentage]) => ({
    language: lang,
    percentage: percentage,
    count: Math.round((percentage / 100) * analytics.totalFeedbacks)
  }));

  const feedbackTypeData = [
    { type: 'Detailed', count: (analytics.feedbackDepthRatio.detailed / 100) * analytics.totalFeedbacks },
    { type: 'Quick', count: (analytics.feedbackDepthRatio.quick / 100) * analytics.totalFeedbacks }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing':
        return <TrendingUp className="h-4 w-4 text-red-500" />;
      case 'decreasing':
        return <TrendingDown className="h-4 w-4 text-green-500" />;
      default:
        return <div className="h-4 w-4 rounded-full bg-gray-400" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'increasing':
        return 'text-red-600';
      case 'decreasing':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Feedback Analytics</h2>
          <p className="text-gray-600">
            Insights from {analytics.totalFeedbacks} feedbacks across all positions
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="1year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Feedbacks</p>
                <p className="text-2xl font-bold">{analytics.totalFeedbacks}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-500" />
            </div>
            <p className="text-xs text-gray-500 mt-2">+12% from last period</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold">
                  {(Object.values(analytics.averageRatings).reduce((a, b) => a + b, 0) / Object.values(analytics.averageRatings).length).toFixed(1)}
                </p>
              </div>
              <Award className="h-8 w-8 text-yellow-500" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Across all skills</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Detailed Feedback</p>
                <p className="text-2xl font-bold">{analytics.feedbackDepthRatio.detailed}%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Quality ratio</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Top Skill Gap</p>
                <p className="text-lg font-bold">{analytics.commonSkillGaps[0]?.skillName}</p>
                <p className="text-sm text-gray-600">{analytics.commonSkillGaps[0]?.percentage}% of candidates</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skill Ratings Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Average Skill Ratings</CardTitle>
            <p className="text-sm text-gray-600">Company vs Market Average</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={skillRatingsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="skill" 
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="rating" fill={CHART_COLORS.primary} name="Company Avg" />
                <Bar dataKey="marketAvg" fill={CHART_COLORS.secondary} name="Market Avg" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Feedback Trends</CardTitle>
            <p className="text-sm text-gray-600">Volume and average ratings over time</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" domain={[0, 5]} />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="feedbacks" fill={CHART_COLORS.info} name="Feedback Count" />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="avgRating" 
                  stroke={CHART_COLORS.success} 
                  strokeWidth={3}
                  name="Avg Rating"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Language Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Feedback Language Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={languageData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ language, percentage }) => `${language}: ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="percentage"
                >
                  {languageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? CHART_COLORS.primary : CHART_COLORS.secondary} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Feedback Depth */}
        <Card>
          <CardHeader>
            <CardTitle>Feedback Quality Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={feedbackTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ type, count }) => `${type}: ${Math.round(count)}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {feedbackTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? CHART_COLORS.success : CHART_COLORS.warning} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Skill Gaps Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Common Skill Gaps</CardTitle>
          <p className="text-sm text-gray-600">Most frequently identified areas for improvement</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.commonSkillGaps.map((gap, index) => (
              <div key={gap.skillName} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="text-lg font-bold text-gray-400">#{index + 1}</div>
                  <div>
                    <h4 className="font-medium">{gap.skillName}</h4>
                    <p className="text-sm text-gray-600 capitalize">
                      {gap.category.replace('_', ' ')} • {gap.percentage}% of candidates
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Company: {gap.companyAverage}/5</p>
                    {gap.marketAverage && (
                      <p className="text-sm text-gray-600">Market: {gap.marketAverage}/5</p>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {getTrendIcon(gap.trend)}
                    <span className={`text-sm ${getTrendColor(gap.trend)} capitalize`}>
                      {gap.trend}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Benchmark Comparison */}
      {analytics.benchmarkData && (
        <Card>
          <CardHeader>
            <CardTitle>Market Benchmark Comparison</CardTitle>
            <p className="text-sm text-gray-600">
              Compared to {analytics.benchmarkData.companySize} companies in {analytics.benchmarkData.industry}
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {analytics.benchmarkData.feedbackResponseRate}%
                </div>
                <p className="text-sm text-gray-600">Feedback Response Rate</p>
                <p className="text-xs text-green-600">+5% above market</p>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {Object.values(analytics.benchmarkData.averageRatings).reduce((a, b) => a + b, 0) / Object.values(analytics.benchmarkData.averageRatings).length}
                </div>
                <p className="text-sm text-gray-600">Market Avg Rating</p>
                <p className="text-xs text-gray-500">Across all skills</p>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">
                  {analytics.benchmarkData.commonSkillGaps.length}
                </div>
                <p className="text-sm text-gray-600">Common Skill Gaps</p>
                <p className="text-xs text-gray-500">Industry standard</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Insights & Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Key Insights & Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
              <TrendingUp className="h-5 w-5 text-blue-600 mt-1" />
              <div>
                <h4 className="font-medium text-blue-900">Positive Trend</h4>
                <p className="text-sm text-blue-800">
                  Your feedback quality has improved by 15% this quarter, with more detailed assessments being provided.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-1" />
              <div>
                <h4 className="font-medium text-yellow-900">Area for Improvement</h4>
                <p className="text-sm text-yellow-800">
                  System Design skills show the highest gap (68% of candidates). Consider partnering with Growth Center to create targeted learning paths.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
              <div>
                <h4 className="font-medium text-green-900">Strong Performance</h4>
                <p className="text-sm text-green-800">
                  Your team excels at evaluating Teamwork and Communication skills, rating 0.4 points above market average.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}