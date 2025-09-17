import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Card, CardContent } from "../../ui/card";
import { Label } from "../../ui/label";
import { Separator } from "../../ui/separator";
import { 
  Heart,
  MessageSquare,
  Eye,
  MapPin,
  Flag
} from "lucide-react";
import { Candidate } from "../types/talentSearchTypes";

interface CandidateCardProps {
  candidate: Candidate;
  variant?: 'default' | 'compact' | 'mini';
  onSave?: () => void;
  onMessage?: () => void;
  onView?: () => void;
}

export function CandidateCard({ 
  candidate, 
  variant = 'default', 
  onSave, 
  onMessage, 
  onView 
}: CandidateCardProps) {
  const getMatchColor = (match: number) => {
    if (match >= 90) return 'bg-green-500';
    if (match >= 80) return 'bg-blue-500';
    if (match >= 70) return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  const getMatchBadgeVariant = (match: number) => {
    if (match >= 90) return 'default';
    if (match >= 80) return 'secondary';
    if (match >= 70) return 'outline';
    return 'destructive';
  };

  if (variant === 'mini') {
    return (
      <div className="p-3 bg-white border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={candidate.avatar} alt={candidate.name} />
            <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{candidate.name}</p>
            <p className="text-xs text-gray-500 truncate">{candidate.title}</p>
            <div className="flex items-center space-x-2 mt-1">
              <Badge variant={getMatchBadgeVariant(candidate.matchPercentage)} className="text-xs">
                {candidate.matchPercentage}%
              </Badge>
              <Badge variant="outline" className="text-xs">
                {candidate.source}
              </Badge>
            </div>
          </div>
          {candidate.flagged && (
            <Flag className="h-4 w-4 text-orange-500" />
          )}
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="p-4 bg-white border rounded-lg hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={candidate.avatar} alt={candidate.name} />
              <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{candidate.name}</h3>
              <p className="text-sm text-gray-600">{candidate.title}</p>
              <div className="flex items-center space-x-1 mt-1">
                <MapPin className="h-3 w-3 text-gray-400" />
                <span className="text-xs text-gray-500">{candidate.location}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={getMatchBadgeVariant(candidate.matchPercentage)}>
              {candidate.matchPercentage}% match
            </Badge>
            {candidate.isBookmarked && <Heart className="h-4 w-4 text-red-500 fill-current" />}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {candidate.skills.slice(0, 4).map((skill) => (
            <Badge key={skill} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
          {candidate.skills.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{candidate.skills.length - 4} more
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{candidate.experience}</span>
          <span>Last active: {candidate.lastActive}</span>
        </div>

        <div className="flex space-x-2 mt-3">
          <Button size="sm" variant="outline" onClick={onSave}>
            <Heart className="h-4 w-4 mr-1" />
            Save
          </Button>
          <Button size="sm" variant="outline" onClick={onMessage}>
            <MessageSquare className="h-4 w-4 mr-1" />
            Message
          </Button>
          <Button size="sm" onClick={onView}>
            <Eye className="h-4 w-4 mr-1" />
            View Profile
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={candidate.avatar} alt={candidate.name} />
              <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">{candidate.name}</h3>
              <p className="text-gray-600">{candidate.title}</p>
              <div className="flex items-center space-x-2 mt-1">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-500">{candidate.location}</span>
                <Separator orientation="vertical" className="h-4" />
                <span className="text-sm text-gray-500">{candidate.experience}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge variant={getMatchBadgeVariant(candidate.matchPercentage)} className="text-sm">
              {candidate.matchPercentage}% match
            </Badge>
            <Button variant="ghost" size="sm" onClick={onSave}>
              <Heart className={`h-4 w-4 ${candidate.isBookmarked ? 'text-red-500 fill-current' : ''}`} />
            </Button>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{candidate.bio}</p>

        <div className="space-y-3">
          <div>
            <Label className="text-xs text-gray-500">Skills</Label>
            <div className="flex flex-wrap gap-1 mt-1">
              {candidate.skills.slice(0, 6).map((skill) => (
                <Badge key={skill} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {candidate.skills.length > 6 && (
                <Badge variant="outline" className="text-xs">
                  +{candidate.skills.length - 6} more
                </Badge>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <Label className="text-xs text-gray-500">Availability</Label>
              <p>{candidate.availability}</p>
            </div>
            <div>
              <Label className="text-xs text-gray-500">Remote Preference</Label>
              <p>{candidate.remotePreference}</p>
            </div>
          </div>

          <div>
            <Label className="text-xs text-gray-500">Salary Range</Label>
            <p>${candidate.salaryRange.min.toLocaleString()} - ${candidate.salaryRange.max.toLocaleString()} {candidate.salaryRange.currency}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Badge variant="outline" className="text-xs">{candidate.source}</Badge>
            <span>Last active: {candidate.lastActive}</span>
          </div>
          
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" onClick={onMessage}>
              <MessageSquare className="h-4 w-4 mr-1" />
              Message
            </Button>
            <Button size="sm" onClick={onView}>
              <Eye className="h-4 w-4 mr-1" />
              View Profile
            </Button>
          </div>
        </div>

        {candidate.flagged && (
          <div className="mt-3 p-2 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <Flag className="h-4 w-4 text-orange-500" />
              <span className="text-sm text-orange-800">Flagged: {candidate.flagReason}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}