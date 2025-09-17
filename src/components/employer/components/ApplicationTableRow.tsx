import { TableCell, TableRow } from "../../ui/table";
import { Badge } from "../../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Progress } from "../../ui/progress";
import { 
  MapPin,
  Clock,
  Star
} from "lucide-react";
import { Application } from "../utils/applicationUtils";
import { StatusDropdown } from "./StatusDropdown";
import { ApplicationActions } from "./ApplicationActions";

interface ApplicationTableRowProps {
  application: Application;
  onViewProfile: (application: Application) => void;
  onViewPreview?: (application: Application) => void;
  onStatusChange: (applicationId: string, newStatus: string) => void;
  onViewApplication?: () => void;
}

export function ApplicationTableRow({ 
  application, 
  onViewProfile, 
  onViewPreview,
  onStatusChange,
  onViewApplication
}: ApplicationTableRowProps) {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={application.candidateAvatar} alt={application.candidateName} />
            <AvatarFallback>
              {application.candidateName.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-medium text-gray-900">{application.candidateName}</h4>
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="h-3 w-3 mr-1" />
              {application.location}
            </div>
          </div>
        </div>
      </TableCell>
      
      <TableCell>
        <div>
          <p className="font-medium">{application.jobTitle}</p>
          <div className="flex flex-wrap gap-1 mt-1">
            {application.skills.slice(0, 3).map((skill, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
            {application.skills.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{application.skills.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </TableCell>
      
      <TableCell>
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="h-4 w-4 mr-1" />
          {application.appliedDate}
        </div>
      </TableCell>
      
      <TableCell>
        <StatusDropdown
          currentStatus={application.status}
          applicationId={application.id}
          onStatusChange={onStatusChange}
        />
      </TableCell>
      
      <TableCell>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-500" />
            <span className="font-medium">{application.matchScore}%</span>
          </div>
          <Progress value={application.matchScore} className="w-16 h-2" />
        </div>
      </TableCell>
      
      <TableCell>
        <ApplicationActions
          application={application}
          onViewProfile={onViewProfile}
          onViewPreview={onViewPreview}
          onViewApplication={onViewApplication}
          compact={true}
        />
      </TableCell>
    </TableRow>
  );
}