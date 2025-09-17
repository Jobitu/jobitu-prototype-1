import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Plus } from "lucide-react";
import { TabProps } from "../types/applicationTypes";
import { stageOrder } from "../constants/applicationsConstants";

export function PipelineShortlistsTab({ applications, onViewApplication, getStatusBadge, formatDate }: TabProps) {
  return (
    <div className="space-y-6">
      {/* Pipeline View */}
      <Card>
        <CardHeader>
          <CardTitle>Hiring Pipeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-6 gap-4">
            {stageOrder.map(stage => {
              const stageApplications = applications.filter(app => app.status === stage);
              const stageName = stage.charAt(0).toUpperCase() + stage.slice(1);
              
              return (
                <div key={stage} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{stageName}</h3>
                    <Badge variant="secondary">{stageApplications.length}</Badge>
                  </div>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {stageApplications.map(application => (
                      <div
                        key={application.id}
                        className="p-3 border rounded cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => onViewApplication(application)}
                      >
                        <div className="flex items-center space-x-2">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={application.candidateAvatar} alt={application.candidateName} />
                            <AvatarFallback className="text-xs">
                              {application.candidateName.substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{application.candidateName}</p>
                            <p className="text-xs text-gray-600 truncate">{application.jobTitle}</p>
                          </div>
                        </div>
                        {application.matchScore && (
                          <div className="text-xs text-blue-600 mt-1">
                            {application.matchScore}% match
                          </div>
                        )}
                        <div className="text-xs text-gray-500 mt-1">
                          {formatDate ? formatDate(application.lastActivity) : application.lastActivity}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Shortlists */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Shortlists</CardTitle>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Create Shortlist
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Top Frontend Candidates</h3>
                <Badge variant="outline">3</Badge>
              </div>
              <p className="text-sm text-gray-600 mb-3">High-scoring React developers</p>
              <div className="space-y-2">
                {applications.filter(app => app.jobTitle.includes('Frontend')).slice(0, 3).map(app => (
                  <div key={app.id} className="flex items-center space-x-2 text-sm">
                    <Avatar className="w-5 h-5">
                      <AvatarImage src={app.candidateAvatar} alt={app.candidateName} />
                      <AvatarFallback className="text-xs">{app.candidateName.substring(0, 1)}</AvatarFallback>
                    </Avatar>
                    <span className="truncate">{app.candidateName}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}