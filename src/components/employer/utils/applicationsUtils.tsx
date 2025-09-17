import { Badge } from "../../ui/badge";
import { statusConfig, sourceConfig, artifactStatusConfig, interviewStatusConfig } from "../constants/applicationsConstants";
import { 
  FileText, 
  TestTube, 
  Briefcase, 
  Eye, 
  MessageCircle,
  Phone,
  Video,
  MapPin
} from "lucide-react";

export const getStatusBadge = (status: string) => {
  return (
    <Badge className={statusConfig[status as keyof typeof statusConfig] || 'bg-gray-100 text-gray-800'}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

export const getSourceBadge = (source: string) => {
  const config = sourceConfig[source as keyof typeof sourceConfig];
  return config ? (
    <Badge variant="outline" className={config.class}>
      {config.label}
    </Badge>
  ) : null;
};

export const getArtifactStatusBadge = (status: string) => {
  return (
    <Badge className={artifactStatusConfig[status as keyof typeof artifactStatusConfig] || 'bg-gray-100 text-gray-800'}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

export const getInterviewStatusBadge = (status: string) => {
  return (
    <Badge className={interviewStatusConfig[status as keyof typeof interviewStatusConfig] || 'bg-gray-100 text-gray-800'}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

export const getArtifactIcon = (type: string) => {
  switch (type) {
    case 'resume': return <FileText className="h-4 w-4" />;
    case 'test': return <TestTube className="h-4 w-4" />;
    case 'case_study': return <Briefcase className="h-4 w-4" />;
    case 'portfolio': return <Eye className="h-4 w-4" />;
    case 'screening_questions': return <MessageCircle className="h-4 w-4" />;
    default: return <FileText className="h-4 w-4" />;
  }
};

export const getInterviewIcon = (type: string) => {
  switch (type) {
    case 'phone': return <Phone className="h-4 w-4" />;
    case 'video': return <Video className="h-4 w-4" />;
    case 'in_person': return <MapPin className="h-4 w-4" />;
    default: return <Video className="h-4 w-4" />;
  }
};

export const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric'
  });
};