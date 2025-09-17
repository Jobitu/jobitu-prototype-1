import { Card, CardContent, CardHeader } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Progress } from "../../ui/progress";
import { 
  MapPin,
  Briefcase,
  GraduationCap,
  Clock,
  Star
} from "lucide-react";
import { Application, getStatusBadge } from "../utils/applicationUtils";
import { ApplicationActions } from "./ApplicationActions";

interface ApplicationCardProps {
  application: Application;
  onViewProfile: (application: Application) => void;
  onViewPreview?: (application: Application) => void;
  onStatusChange: (applicationId: string, newStatus: string) => void;
}

export function ApplicationCard({ 
  application, 
  onViewProfile, 
  onViewPreview,
  onStatusChange 
}: ApplicationCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={application.candidateAvatar} alt={application.candidateName} />
              <AvatarFallback>
                {application.candidateName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{application.candidateName}</h3>
              <p className="text-sm text-gray-600">{application.jobTitle}</p>
            </div>
          </div>
          {getStatusBadge(application.status)}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center">
            <MapPin className="h-3 w-3 mr-1 text-gray-400" />
            <span>{application.location}</span>
          </div>
          <div className="flex items-center">
            <Briefcase className="h-3 w-3 mr-1 text-gray-400" />
            <span>{application.experience}</span>
          </div>
          <div className="flex items-center">
            <GraduationCap className="h-3 w-3 mr-1 text-gray-400" />
            <span>{application.education.split(',')[0]}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1 text-gray-400" />
            <span>{application.appliedDate}</span>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Match Score</span>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="font-semibold">{application.matchScore}%</span>
            </div>
          </div>
          <Progress value={application.matchScore} className="mb-2" />
          
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="text-center">
              <div className="font-medium">{application.experienceScore}%</div>
              <div className="text-gray-600">Experience</div>
            </div>
            <div className="text-center">
              <div className="font-medium">{application.talentScore}%</div>
              <div className="text-gray-600">Talent</div>
            </div>
            <div className="text-center">
              <div className="font-medium">{application.testScore}%</div>
              <div className="text-gray-600">Test</div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2">Skills</h4>
          <div className="flex flex-wrap gap-1">
            {application.skills.slice(0, 4).map((skill, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
            {application.skills.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{application.skills.length - 4} more
              </Badge>
            )}
          </div>
        </div>

        <div className="pt-2 border-t">
          <ApplicationActions
            application={application}
            onViewProfile={onViewProfile}
            onViewPreview={onViewPreview}
            compact={false}
          />
        </div>
      </CardContent>
    </Card>
  );
}