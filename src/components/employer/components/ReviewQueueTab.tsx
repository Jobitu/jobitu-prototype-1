import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Eye, UserCheck } from "lucide-react";
import { TabProps } from "../types/applicationTypes";

export function ReviewQueueTab({ applications, onViewApplication, getStatusBadge, formatDate }: TabProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Review Queue</CardTitle>
          <Badge variant="outline">{applications.length} candidates awaiting review</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {applications.map((application) => (
            <div 
              key={application.id}
              className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => onViewApplication(application)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={application.candidateAvatar} alt={application.candidateName} />
                    <AvatarFallback>
                      {application.candidateName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-medium">{application.candidateName}</h3>
                    <p className="text-gray-600">{application.jobTitle}</p>
                    <p className="text-sm text-gray-500 mt-1">{application.candidateSummary}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      {getStatusBadge?.(application.status)}
                      <span className="text-sm text-gray-500">
                        Applied {formatDate ? formatDate(application.applicationDate) : application.applicationDate}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  {application.matchScore && (
                    <div className="text-lg font-semibold text-blue-600">
                      {application.matchScore}%
                    </div>
                  )}
                  <div className="flex items-center space-x-2 mt-2">
                    <Button size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Review
                    </Button>
                    <Button size="sm" variant="outline">
                      <UserCheck className="h-4 w-4 mr-2" />
                      Interview
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}