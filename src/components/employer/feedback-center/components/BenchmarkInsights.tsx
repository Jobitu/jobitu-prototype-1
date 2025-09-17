import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import { 
  TrendingUp,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { BenchmarkData, FeedbackAnalytics } from "../types";

interface BenchmarkInsightsProps {
  benchmarkData: BenchmarkData;
  analytics: FeedbackAnalytics;
}

export function BenchmarkInsights({ benchmarkData, analytics }: BenchmarkInsightsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Insights & Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
            <div>
              <h4 className="font-medium text-green-900">Above Market Performance</h4>
              <p className="text-sm text-green-800">
                Your feedback response rate of {benchmarkData.feedbackResponseRate}% is 5% above the {benchmarkData.industry} industry average. 
                This demonstrates strong candidate communication practices.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg">
            <AlertCircle className="h-5 w-5 text-yellow-600 mt-1" />
            <div>
              <h4 className="font-medium text-yellow-900">Focus Area</h4>
              <p className="text-sm text-yellow-800">
                Technical Skills ratings are below market average. Consider enhancing assessment criteria 
                or partnering with Growth Center for candidate development recommendations.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
            <TrendingUp className="h-5 w-5 text-blue-600 mt-1" />
            <div>
              <h4 className="font-medium text-blue-900">Growth Opportunity</h4>
              <p className="text-sm text-blue-800">
                Companies in your segment typically see 15% improvement in candidate satisfaction 
                when implementing detailed feedback practices consistently.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}