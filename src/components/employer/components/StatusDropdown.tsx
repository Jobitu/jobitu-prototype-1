import { Button } from "../../ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { 
  ChevronDown,
  AlertCircle,
  Eye,
  Star,
  Calendar,
  CheckCircle,
  XCircle
} from "lucide-react";
import { getStatusBadge } from "../utils/applicationUtils";

interface StatusDropdownProps {
  currentStatus: string;
  applicationId: string;
  onStatusChange: (applicationId: string, newStatus: string) => void;
}

export function StatusDropdown({ currentStatus, applicationId, onStatusChange }: StatusDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="p-0">
          {getStatusBadge(currentStatus)}
          <ChevronDown className="h-3 w-3 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => onStatusChange(applicationId, 'new')}>
          <AlertCircle className="h-4 w-4 mr-2" />
          Mark as New
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onStatusChange(applicationId, 'reviewed')}>
          <Eye className="h-4 w-4 mr-2" />
          Mark as Reviewed
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onStatusChange(applicationId, 'shortlisted')}>
          <Star className="h-4 w-4 mr-2" />
          Shortlist
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onStatusChange(applicationId, 'interview')}>
          <Calendar className="h-4 w-4 mr-2" />
          Schedule Interview
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onStatusChange(applicationId, 'hired')}>
          <CheckCircle className="h-4 w-4 mr-2" />
          Hire
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onStatusChange(applicationId, 'rejected')}>
          <XCircle className="h-4 w-4 mr-2" />
          Reject
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}