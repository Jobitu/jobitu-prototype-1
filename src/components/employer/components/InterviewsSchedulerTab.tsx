import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { 
  Plus,
  MoreHorizontal,
  Calendar as CalendarIcon,
  X,
  FileText,
  Eye
} from "lucide-react";
import { TabProps } from "../types/applicationTypes";
import { getInterviewIcon, getInterviewStatusBadge } from "../utils/applicationsUtils";

export function InterviewsSchedulerTab({ applications, onViewApplication, formatDate }: TabProps) {
  const allInterviews = (applications || []).flatMap(app => 
    (app.interviews || []).map(interview => ({
      ...interview,
      candidateName: app.candidateName,
      candidateAvatar: app.candidateAvatar,
      jobTitle: app.jobTitle,
      applicationId: app.id
    }))
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Interviews & Scheduler</CardTitle>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Schedule Interview
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidate</TableHead>
                <TableHead>Job Title</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Interviewer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allInterviews.length > 0 ? (
                allInterviews.map((interview) => (
                  <TableRow key={`${interview.applicationId}-${interview.id}`}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={interview.candidateAvatar} alt={interview.candidateName} />
                          <AvatarFallback className="text-xs">
                            {interview.candidateName?.split(' ').map(n => n[0]).join('') || 'N/A'}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{interview.candidateName || 'Unknown'}</span>
                      </div>
                    </TableCell>
                    <TableCell>{interview.jobTitle || '-'}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{formatDate && interview.date ? formatDate(interview.date) : interview.date || '-'}</p>
                        <p className="text-sm text-gray-600">{interview.time || '-'}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getInterviewIcon(interview.type)}
                        <span className="capitalize">{interview.type?.replace('_', ' ') || 'Unknown'}</span>
                      </div>
                    </TableCell>
                    <TableCell>{interview.interviewer || '-'}</TableCell>
                    <TableCell>{getInterviewStatusBadge(interview.status)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <CalendarIcon className="h-4 w-4 mr-2" />
                            Reschedule
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="h-4 w-4 mr-2" />
                            Interview Kit
                          </DropdownMenuItem>
                          {interview.status === 'completed' && (
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Feedback
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    No interviews scheduled
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}