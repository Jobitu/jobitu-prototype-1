import { Card, CardContent } from "../../../ui/card";
import { 
  TrendingUp,
  TrendingDown,
  Award,
  Users,
  Target
} from "lucide-react";
import { BenchmarkData, FeedbackAnalytics } from "../types";

interface BenchmarkMetricsProps {
  benchmarkData: BenchmarkData;
  analytics: FeedbackAnalytics;
}

export function BenchmarkMetrics({ benchmarkData, analytics }: BenchmarkMetricsProps) {
  const companyAvgRating = Object.values(analytics.averageRatings).reduce((a, b) => a + b, 0) / Object.values(analytics.averageRatings).length;
  const marketAvgRating = Object.values(benchmarkData.averageRatings).reduce((a, b) => a + b, 0) / Object.values(benchmarkData.averageRatings).length;
  const ratingDifference = companyAvgRating - marketAvgRating;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Feedback Response Rate</p>
              <p className="text-2xl font-bold text-blue-600">
                {benchmarkData.feedbackResponseRate}%
              </p>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +5% above market
              </p>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Overall Rating vs Market</p>
              <p className="text-2xl font-bold">
                {companyAvgRating.toFixed(1)} vs {marketAvgRating.toFixed(1)}
              </p>
              <p className={`text-xs flex items-center mt-1 ${
                ratingDifference >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {ratingDifference >= 0 ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                {ratingDifference >= 0 ? '+' : ''}{ratingDifference.toFixed(1)} vs market
              </p>
            </div>
            <Award className="h-8 w-8 text-yellow-500" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Market Position</p>
              <p className="text-2xl font-bold text-purple-600">
                {ratingDifference >= 0 ? 'Above' : 'Below'}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {benchmarkData.companySize} • {benchmarkData.industry}
              </p>
            </div>
            <Target className="h-8 w-8 text-purple-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}