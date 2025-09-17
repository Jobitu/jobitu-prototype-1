import { Button } from "../../ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { 
  User,
  MessageSquare,
  MoreVertical,
  Calendar,
  Download,
  FileText,
  Eye
} from "lucide-react";
import { Application } from "../utils/applicationUtils";

interface ApplicationActionsProps {
  application: Application;
  onViewProfile: (application: Application) => void;
  onViewPreview?: (application: Application) => void;
  onViewApplication?: () => void;
  compact?: boolean;
}

export function ApplicationActions({ 
  application, 
  onViewProfile, 
  onViewPreview,
  onViewApplication,
  compact = false 
}: ApplicationActionsProps) {
  if (compact) {
    return (
      <div className="flex items-center space-x-1">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onViewProfile(application)}
          title="View candidate profile with assessments"
        >
          <User className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="ghost">
          <MessageSquare className="h-4 w-4" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="ghost">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {onViewApplication && (
              <DropdownMenuItem onClick={onViewApplication}>
                <Eye className="h-4 w-4 mr-2" />
                View Application
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={() => onViewProfile(application)}>
              <User className="h-4 w-4 mr-2" />
              View Candidate Profile
            </DropdownMenuItem>
            {onViewPreview && (
              <DropdownMenuItem onClick={() => onViewPreview(application)}>
                <FileText className="h-4 w-4 mr-2" />
                View Full Profile
              </DropdownMenuItem>
            )}
            <DropdownMenuItem>
              <MessageSquare className="h-4 w-4 mr-2" />
              Send Message
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Interview
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Download className="h-4 w-4 mr-2" />
              Download Resume
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return (
    <div className="flex space-x-2">
      <Button
        size="sm"
        className="flex-1"
        onClick={() => onViewProfile(application)}
      >
        <User className="h-4 w-4 mr-1" />
        View Profile
      </Button>
      <Button size="sm" variant="outline">
        <MessageSquare className="h-4 w-4" />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm" variant="outline">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {onViewApplication && (
            <DropdownMenuItem onClick={onViewApplication}>
              <Eye className="h-4 w-4 mr-2" />
              View Application
            </DropdownMenuItem>
          )}
          {onViewPreview && (
            <DropdownMenuItem onClick={() => onViewPreview(application)}>
              <FileText className="h-4 w-4 mr-2" />
              View Full Profile
            </DropdownMenuItem>
          )}
          <DropdownMenuItem>
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Interview
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Download className="h-4 w-4 mr-2" />
            Download Resume
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}