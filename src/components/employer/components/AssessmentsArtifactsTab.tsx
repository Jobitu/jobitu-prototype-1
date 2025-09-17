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
  MoreHorizontal,
  Eye,
  Star,
  Download
} from "lucide-react";
import { TabProps } from "../types/applicationTypes";
import { getArtifactIcon, getArtifactStatusBadge } from "../utils/applicationsUtils";

export function AssessmentsArtifactsTab({ applications, onViewApplication, formatDate }: TabProps) {
  const allArtifacts = (applications || []).flatMap(app => 
    (app.artifacts || []).map(artifact => ({
      ...artifact,
      candidateName: app.candidateName,
      candidateAvatar: app.candidateAvatar,
      jobTitle: app.jobTitle,
      applicationId: app.id
    }))
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assessments & Artifacts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidate</TableHead>
                <TableHead>Job Title</TableHead>
                <TableHead>Artifact Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allArtifacts.length > 0 ? (
                allArtifacts.map((artifact) => (
                  <TableRow key={`${artifact.applicationId}-${artifact.id}`}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={artifact.candidateAvatar} alt={artifact.candidateName} />
                          <AvatarFallback className="text-xs">
                            {artifact.candidateName?.split(' ').map(n => n[0]).join('') || 'N/A'}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{artifact.candidateName || 'Unknown'}</span>
                      </div>
                    </TableCell>
                    <TableCell>{artifact.jobTitle || '-'}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getArtifactIcon(artifact.type)}
                        <span className="capitalize">{artifact.type?.replace('_', ' ') || 'Unknown'}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getArtifactStatusBadge(artifact.status)}</TableCell>
                    <TableCell>
                      {artifact.score ? (
                        <span className="font-medium">{artifact.score}/100</span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {artifact.submittedDate ? (formatDate ? formatDate(artifact.submittedDate) : artifact.submittedDate) : '-'}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Artifact
                          </DropdownMenuItem>
                          {artifact.status === 'submitted' && (
                            <DropdownMenuItem>
                              <Star className="h-4 w-4 mr-2" />
                              Score Artifact
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    No assessments or artifacts found
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