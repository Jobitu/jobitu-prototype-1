import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import { 
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { CHART_COLORS } from "../constants";
import { BenchmarkData, FeedbackAnalytics } from "../types";

interface BenchmarkChartProps {
  benchmarkData: BenchmarkData;
  analytics: FeedbackAnalytics;
}

export function BenchmarkChart({ benchmarkData, analytics }: BenchmarkChartProps) {
  const chartData = Object.entries(analytics.averageRatings).map(([skill, companyRating]) => ({
    skill: skill.replace(' Skills', ''),
    company: companyRating,
    market: benchmarkData.averageRatings[skill] || 0
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Company vs Market Performance</CardTitle>
        <p className="text-sm text-gray-600">
          Average skill ratings compared to {benchmarkData.industry} industry
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="skill" 
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis domain={[0, 5]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="company" fill={CHART_COLORS.primary} name="Your Company" />
            <Bar dataKey="market" fill={CHART_COLORS.secondary} name="Market Average" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}