import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useTabContent } from "../TabContentProvider";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { 
  CalendarDays, 
  Filter, 
  Download, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Clock, 
  Target,
  CheckCircle,
  BarChart3,
  LineChart,
  PieChart,
  Settings
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Funnel,
  FunnelChart,
  LabelList
} from "recharts";

// Analytics Overview Tab Component
function OverviewTab() {
  const keyMetrics = [
    {
      title: "Time-to-Hire",
      value: "18.5",
      unit: "days",
      change: -12,
      trend: "down",
      sparklineData: [22, 19, 21, 18, 16, 18, 19]
    },
    {
      title: "Applications Received",
      value: "2,847",
      change: 23,
      trend: "up",
      sparklineData: [180, 220, 240, 285, 320, 290, 347]
    },
    {
      title: "Positions Filled",
      value: "42",
      target: 50,
      change: 8,
      trend: "up",
      progress: 84
    },
    {
      title: "Offer Acceptance Rate",
      value: "78%",
      change: 5,
      trend: "up"
    }
  ];

  const pipelineData = [
    { stage: "Applied", count: 2847, dropoff: 0 },
    { stage: "Screening", count: 1423, dropoff: 50 },
    { stage: "Interview", count: 568, dropoff: 60 },
    { stage: "Offer", count: 114, dropoff: 80 },
    { stage: "Hired", count: 89, dropoff: 22 }
  ];

  const matchData = [
    { name: "Excellent", value: 35, color: "#22c55e" },
    { name: "Good", value: 45, color: "#3b82f6" },
    { name: "Poor", value: 20, color: "#ef4444" }
  ];

  const quickStats = [
    { label: "Avg Interview Score", value: "8.2/10" },
    { label: "Screening Pass Rate", value: "65%" },
    { label: "Offers per Hire", value: "1.3" },
    { label: "Candidate Satisfaction", value: "4.6/5" }
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {keyMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">{metric.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">
                    {metric.value} {metric.unit && <span className="text-sm text-gray-500">{metric.unit}</span>}
                  </div>
                  <div className="flex items-center mt-1">
                    {metric.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                      {metric.change > 0 ? "+" : ""}{metric.change}%
                    </span>
                  </div>
                  {metric.progress && (
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${metric.progress}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{metric.progress}% of target</div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pipeline Health */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Pipeline Health</CardTitle>
            <CardDescription>Candidate progression through stages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pipelineData.map((stage, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-600 rounded-full" />
                    <span className="font-medium">{stage.stage}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-lg font-semibold">{stage.count.toLocaleString()}</span>
                    {index > 0 && (
                      <span className="text-sm text-red-600">-{stage.dropoff}%</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Job Match Effectiveness */}
        <Card>
          <CardHeader>
            <CardTitle>Job Match Effectiveness</CardTitle>
            <CardDescription>Match quality distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <RechartsPieChart>
                <Pie
                  data={matchData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  dataKey="value"
                >
                  {matchData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, "Match Quality"]} />
              </RechartsPieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {matchData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-lg font-semibold">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Recruitment Analytics Tab Component
function RecruitmentAnalyticsTab() {
  const funnelData = [
    { stage: "Applied", value: 2847, duration: 0 },
    { stage: "Screening", value: 1423, duration: 3.2 },
    { stage: "Interview", value: 568, duration: 7.8 },
    { stage: "Offer", value: 114, duration: 2.1 },
    { stage: "Hired", value: 89, duration: 5.4 }
  ];

  const timeToHireData = [
    { week: "Week 1", timeToHire: 22 },
    { week: "Week 2", timeToHire: 19 },
    { week: "Week 3", timeToHire: 21 },
    { week: "Week 4", timeToHire: 18 },
    { week: "Week 5", timeToHire: 16 },
    { week: "Week 6", timeToHire: 18 },
    { week: "Week 7", timeToHire: 19 }
  ];

  const dropoffReasons = [
    { reason: "Salary mismatch", percentage: 28 },
    { reason: "Poor culture fit", percentage: 22 },
    { reason: "Location requirements", percentage: 18 },
    { reason: "Better offer elsewhere", percentage: 16 },
    { reason: "Overqualified", percentage: 16 }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Funnel Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Recruitment Funnel</CardTitle>
            <CardDescription>Average days spent in each stage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {funnelData.map((stage, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{stage.stage}</span>
                    <span className="text-sm text-gray-500">
                      {stage.duration > 0 ? `${stage.duration} days` : ""}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-8 flex items-center">
                    <div 
                      className="bg-blue-600 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium transition-all duration-300"
                      style={{ width: `${(stage.value / funnelData[0].value) * 100}%` }}
                    >
                      {stage.value.toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Drop-off Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Top Drop-off Reasons</CardTitle>
            <CardDescription>Why candidates don't proceed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dropoffReasons.map((reason, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm">{reason.reason}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-red-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${reason.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium w-8">{reason.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Time-to-Hire Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Time-to-Hire Trends</CardTitle>
          <CardDescription>Weekly average hiring timeline</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsLineChart data={timeToHireData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value} days`, "Time-to-Hire"]} />
              <Line 
                type="monotone" 
                dataKey="timeToHire" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
              />
            </RechartsLineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Offer & Acceptance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Offers Sent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">114</div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-600 text-sm">+8% vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Offers Accepted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">89</div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-600 text-sm">+12% vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Acceptance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">78%</div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-600 text-sm">+5% vs last month</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Job Posting Analytics Tab Component
function JobPostingAnalyticsTab() {
  const jobListings = [
    { 
      title: "Senior Frontend Developer", 
      views: 4250, 
      ctr: 8.2, 
      applyRate: 4.1, 
      applicants: 167, 
      status: "active" 
    },
    { 
      title: "Product Manager", 
      views: 3890, 
      ctr: 6.8, 
      applyRate: 3.2, 
      applicants: 124, 
      status: "active" 
    },
    { 
      title: "UX Designer", 
      views: 2340, 
      ctr: 9.1, 
      applyRate: 5.2, 
      applicants: 89, 
      status: "closed" 
    },
    { 
      title: "Backend Engineer", 
      views: 1890, 
      ctr: 7.3, 
      applyRate: 3.8, 
      applicants: 72, 
      status: "active" 
    }
  ];

  const channelData = [
    { channel: "LinkedIn", applications: 856, conversionRate: 4.2, costPerHire: 1250 },
    { channel: "Company Website", applications: 523, conversionRate: 6.8, costPerHire: 890 },
    { channel: "Referrals", applications: 342, conversionRate: 12.3, costPerHire: 450 },
    { channel: "Indeed", applications: 287, conversionRate: 3.1, costPerHire: 1580 },
    { channel: "AngelList", applications: 156, conversionRate: 8.7, costPerHire: 720 }
  ];

  return (
    <div className="space-y-6">
      {/* Active Job Listings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Active Job Listings Performance</CardTitle>
          <CardDescription>Click-through and application rates by posting</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2">Job Title</th>
                  <th className="text-right py-3 px-2">Views</th>
                  <th className="text-right py-3 px-2">CTR</th>
                  <th className="text-right py-3 px-2">Apply Rate</th>
                  <th className="text-right py-3 px-2">Applicants</th>
                  <th className="text-right py-3 px-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {jobListings.map((job, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 px-2 font-medium">{job.title}</td>
                    <td className="text-right py-3 px-2">{job.views.toLocaleString()}</td>
                    <td className="text-right py-3 px-2">{job.ctr}%</td>
                    <td className="text-right py-3 px-2">{job.applyRate}%</td>
                    <td className="text-right py-3 px-2">{job.applicants}</td>
                    <td className="text-right py-3 px-2">
                      <Badge variant={job.status === "active" ? "default" : "secondary"}>
                        {job.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Channel Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Channel Performance</CardTitle>
          <CardDescription>Applications and conversion by source</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={channelData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="channel" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="applications" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Channel Details Table */}
      <Card>
        <CardHeader>
          <CardTitle>Channel Details</CardTitle>
          <CardDescription>Detailed metrics by recruitment channel</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2">Channel</th>
                  <th className="text-right py-3 px-2">Applications</th>
                  <th className="text-right py-3 px-2">Conversion Rate</th>
                  <th className="text-right py-3 px-2">Cost per Hire</th>
                </tr>
              </thead>
              <tbody>
                {channelData.map((channel, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 px-2 font-medium">{channel.channel}</td>
                    <td className="text-right py-3 px-2">{channel.applications}</td>
                    <td className="text-right py-3 px-2">{channel.conversionRate}%</td>
                    <td className="text-right py-3 px-2">${channel.costPerHire}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Candidate Analytics Tab Component
function CandidateAnalyticsTab() {
  const sourceQualityData = [
    { source: "Referrals", hireRate: 22, quality: 95 },
    { source: "LinkedIn", hireRate: 8, quality: 78 },
    { source: "Company Site", hireRate: 15, quality: 82 },
    { source: "Indeed", hireRate: 4, quality: 65 },
    { source: "University", hireRate: 18, quality: 88 }
  ];

  const skillGaps = [
    { skill: "React/Frontend", gap: 45, percentage: 68 },
    { skill: "Node.js/Backend", gap: 32, percentage: 48 },
    { skill: "DevOps/Cloud", gap: 28, percentage: 42 },
    { skill: "Product Management", gap: 21, percentage: 32 },
    { skill: "Data Science", gap: 18, percentage: 27 }
  ];

  const candidateBehavior = [
    { stage: "Applied", count: 2847, completion: 100 },
    { stage: "Assessment Started", count: 1890, completion: 66 },
    { stage: "Assessment Completed", count: 1423, completion: 75 },
    { stage: "Interview Scheduled", count: 856, completion: 60 },
    { stage: "Interview Attended", count: 742, completion: 87 }
  ];

  const sentimentData = [
    { sentiment: "Positive", count: 68, color: "#22c55e" },
    { sentiment: "Neutral", count: 22, color: "#64748b" },
    { sentiment: "Negative", count: 10, color: "#ef4444" }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Candidate Source & Quality */}
        <Card>
          <CardHeader>
            <CardTitle>Source Quality vs Hire Rate</CardTitle>
            <CardDescription>Quality score vs hiring success by source</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sourceQualityData.map((source, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{source.source}</span>
                    <span className="text-sm text-gray-500">
                      {source.hireRate}% hire rate
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${source.quality}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500">Quality Score: {source.quality}/100</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Skill Gap Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Skill Gap Analysis</CardTitle>
            <CardDescription>Most common missing skills by role</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {skillGaps.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{skill.skill}</span>
                    <span className="text-sm text-red-600">
                      {skill.gap} candidates lacking
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${skill.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Candidate Behavior Funnel */}
      <Card>
        <CardHeader>
          <CardTitle>Candidate Behavior Journey</CardTitle>
          <CardDescription>Completion rates at each interaction step</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {candidateBehavior.map((stage, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{stage.stage}</span>
                  <span className="text-sm text-gray-500">
                    {stage.completion}% completion
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-6 flex items-center">
                  <div 
                    className="bg-green-600 h-6 rounded-full flex items-center justify-center text-white text-sm font-medium transition-all duration-300"
                    style={{ width: `${(stage.count / candidateBehavior[0].count) * 100}%` }}
                  >
                    {stage.count.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Candidate Feedback Sentiment */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Candidate Feedback Sentiment</CardTitle>
            <CardDescription>Overall candidate experience ratings</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <RechartsPieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  dataKey="count"
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, "Feedback"]} />
              </RechartsPieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {sentimentData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm">{item.sentiment}</span>
                  </div>
                  <span className="text-sm font-medium">{item.count}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Feedback Themes</CardTitle>
            <CardDescription>Common topics in candidate feedback</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="text-sm font-medium text-green-800">Communication</div>
                <div className="text-xs text-green-600">Clear updates and timeline</div>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="text-sm font-medium text-blue-800">Interview Process</div>
                <div className="text-xs text-blue-600">Well-structured and fair</div>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <div className="text-sm font-medium text-yellow-800">Speed of Process</div>
                <div className="text-xs text-yellow-600">Some delays in response</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Custom Reports Tab Component
function CustomReportsTab() {
  const savedReports = [
    {
      name: "Weekly Hiring Report",
      description: "Key metrics and pipeline status",
      lastRun: "2 days ago",
      nextRun: "In 5 days",
      frequency: "Weekly"
    },
    {
      name: "Channel Performance Analysis",
      description: "ROI and effectiveness by source",
      lastRun: "1 week ago",
      nextRun: "In 3 weeks",
      frequency: "Monthly"
    },
    {
      name: "Candidate Experience Survey",
      description: "Feedback and satisfaction metrics",
      lastRun: "3 days ago",
      nextRun: "In 4 days",
      frequency: "Weekly"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Saved Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Saved Reports</CardTitle>
          <CardDescription>Scheduled and on-demand analytics reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {savedReports.map((report, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">{report.name}</div>
                  <div className="text-sm text-gray-500">{report.description}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    Last run: {report.lastRun} • Next: {report.nextRun}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{report.frequency}</Badge>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-1" />
                    Run
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Report Builder */}
      <Card>
        <CardHeader>
          <CardTitle>Create Custom Report</CardTitle>
          <CardDescription>Build a new analytics report with drag-and-drop</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Report Name</Label>
                <input 
                  type="text" 
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter report name"
                />
              </div>
              <div>
                <Label>Schedule</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="on-demand">On-demand only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Metrics to Include</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {[
                  "Time-to-Hire",
                  "Applications",
                  "Conversion Rate",
                  "Source Performance",
                  "Interview Scores",
                  "Offer Acceptance",
                  "Pipeline Health",
                  "Candidate Feedback"
                ].map((metric) => (
                  <label key={metric} className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">{metric}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Export Format</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF Report</SelectItem>
                    <SelectItem value="csv">CSV Data</SelectItem>
                    <SelectItem value="xlsx">Excel File</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Recipients</Label>
                <input 
                  type="email" 
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="email@company.com"
                />
              </div>
            </div>

            <div className="flex space-x-3">
              <Button>Create Report</Button>
              <Button variant="outline">Preview</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Main Analytics & Reports Page Component
export function EmployerAnalyticsReportsPage() {
  const { activeSubTab } = useTabContent();
  const [dateRange, setDateRange] = useState("30days");
  const [compareMode, setCompareMode] = useState(false);

  const renderTabContent = () => {
    switch (activeSubTab) {
      case 'overview':
        return <OverviewTab />;
      case 'recruitment-analytics':
        return <RecruitmentAnalyticsTab />;
      case 'job-posting-analytics':
        return <JobPostingAnalyticsTab />;
      case 'candidate-analytics':
        return <CandidateAnalyticsTab />;
      case 'custom-reports':
        return <CustomReportsTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header Section - Only show in Overview tab */}
      {activeSubTab === 'overview' && (
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
            <p className="text-gray-500">Monitor your hiring performance and recruitment metrics</p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            {/* Date Range Picker */}
            <div className="flex items-center space-x-2">
              <CalendarDays className="h-4 w-4 text-gray-500" />
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 days</SelectItem>
                  <SelectItem value="30days">Last 30 days</SelectItem>
                  <SelectItem value="90days">Last 90 days</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Compare Mode Toggle */}
            <div className="flex items-center space-x-2">
              <Switch
                id="compare-mode"
                checked={compareMode}
                onCheckedChange={setCompareMode}
              />
              <Label htmlFor="compare-mode" className="text-sm">Compare mode</Label>
            </div>

            {/* Filters Button */}
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>

            {/* Export Button */}
            <Button size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      )}

      {/* Tab Content */}
      <div>
        {renderTabContent()}
      </div>
    </div>
  );
}