import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Plus } from "lucide-react";

interface CompanyHeaderProps {
  activeJobs: number;
  totalApplicants: number;
  avgMatchScore: number;
}

export function CompanyHeader({ activeJobs, totalApplicants, avgMatchScore }: CompanyHeaderProps) {
  return (
    <Card className="mb-8 border-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <CardContent className="p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center gap-4 mb-4">
              <Avatar className="w-16 h-16 border-4 border-white/20">
                <AvatarImage src="https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=150&h=150&fit=crop" />
                <AvatarFallback className="text-blue-600 bg-white">TF</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">TechFlow Inc.</h1>
                <p className="text-blue-100">Software Development • San Francisco, CA</p>
              </div>
            </div>
            <p className="text-blue-100">
              {activeJobs} active positions • {totalApplicants} total applicants
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center md:items-end gap-4">
            <div className="text-center md:text-right">
              <div className="text-2xl font-bold">{avgMatchScore}%</div>
              <div className="text-xs text-blue-100">Avg Match Quality</div>
            </div>
            <Button variant="secondary" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Post New Job
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}