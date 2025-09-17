import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { JobPosting } from "./mockData";
import { getStatusColor } from "./utils";
import { Plus, Eye, Settings } from "lucide-react";

interface JobsTabProps {
  jobs: JobPosting[];
  setCurrentPage?: (page: string) => void;
}

export function JobsTab({ jobs, setCurrentPage }: JobsTabProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Job Postings</CardTitle>
          <Button onClick={() => setCurrentPage?.('jobCreation')}>
            <Plus className="h-4 w-4 mr-2" />
            Post New Job
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {jobs.map(job => (
              <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold">{job.title}</h3>
                    <Badge className={getStatusColor(job.status)}>
                      {job.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                    <span>{job.department}</span>
                    <span>{job.location}</span>
                    <span>{job.type}</span>
                    <span>Posted {job.postedDays}d ago</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm mt-2">
                    <span>{job.applicants} applicants</span>
                    <span>{job.views} views</span>
                    <span className="text-blue-600">{job.matchScore}% avg match</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button size="sm" variant="outline">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}