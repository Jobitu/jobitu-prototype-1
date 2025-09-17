import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { 
  TrendingUp,
  TrendingDown,
  Award,
  Building,
  Globe,
  Users,
  Target,
  Crown,
  AlertCircle,
  CheckCircle,
  Star,
  ArrowUp,
  ArrowDown
} from "lucide-react";
import { mockFeedbackAnalytics } from "./mockData";
import { BENCHMARK_INDUSTRIES, COMPANY_SIZES } from "./constants";
import { BenchmarkChart } from "./components/BenchmarkChart";
import { BenchmarkMetrics } from "./components/BenchmarkMetrics";
import { BenchmarkInsights } from "./components/BenchmarkInsights";

export function Benchmarks() {
  const [selectedIndustry, setSelectedIndustry] = useState('Technology');
  const [selectedCompanySize, setSelectedCompanySize] = useState('51-200 employees');
  const [selectedRegion, setSelectedRegion] = useState('Europe');

  const analytics = mockFeedbackAnalytics;
  const benchmarkData = analytics.benchmarkData;

  if (!benchmarkData) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Market Benchmarks</h2>
            <p className="text-gray-600">Premium feature - Compare with industry standards</p>
          </div>
          <Button>
            <Crown className="h-4 w-4 mr-2" />
            Upgrade to Premium
          </Button>
        </div>

        <Card>
          <CardContent className="text-center py-12">
            <Crown className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Premium Feature</h3>
            <p className="text-gray-600 mb-4">
              Unlock industry benchmarks to compare your feedback metrics with market standards
            </p>
            <Button>Upgrade to Premium</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Market Benchmarks</h2>
          <p className="text-gray-600">
            Compare your feedback metrics with industry standards
          </p>
        </div>
        <Badge className="bg-yellow-100 text-yellow-800">
          <Crown className="h-3 w-3 mr-1" />
          Premium
        </Badge>
      </div>

      {/* Benchmark Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Industry</label>
              <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {BENCHMARK_INDUSTRIES.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Company Size</label>
              <Select value={selectedCompanySize} onValueChange={setSelectedCompanySize}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {COMPANY_SIZES.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Region</label>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Europe">Europe</SelectItem>
                  <SelectItem value="North America">North America</SelectItem>
                  <SelectItem value="Asia Pacific">Asia Pacific</SelectItem>
                  <SelectItem value="Global">Global</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <BenchmarkMetrics benchmarkData={benchmarkData} analytics={analytics} />
      <BenchmarkChart benchmarkData={benchmarkData} analytics={analytics} />
      <BenchmarkInsights benchmarkData={benchmarkData} analytics={analytics} />
    </div>
  );
}