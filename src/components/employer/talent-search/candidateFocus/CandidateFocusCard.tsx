import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../ui/card";
import { Button } from "../../../ui/button";
import { Badge } from "../../../ui/badge";
import { Clock, Eye, MoreHorizontal } from "lucide-react";
import { CandidateFocus } from './types';

interface CandidateFocusCardProps {
  focus: CandidateFocus;
  onToggleActive: (id: string) => void;
  onViewCandidates: (focus: CandidateFocus) => void;
}

export function CandidateFocusCard({ focus, onToggleActive, onViewCandidates }: CandidateFocusCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <CardTitle className="text-lg leading-tight">{focus.name}</CardTitle>
              <div className="flex items-center space-x-1">
                <div className={`w-2 h-2 rounded-full ${focus.isActive ? 'bg-green-500' : 'bg-gray-400'}`} />
                <span className={`text-xs ${focus.isActive ? 'text-green-600' : 'text-gray-500'}`}>
                  {focus.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
            <CardDescription>{focus.description}</CardDescription>
          </div>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{focus.matchedCandidates}</div>
            <div className="text-sm text-blue-600">Total Matches</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="flex items-center justify-center space-x-1">
              <div className="text-2xl font-bold text-green-600">{focus.newCandidates}</div>
              {focus.newCandidates > 0 && <Badge variant="secondary" className="text-xs">New</Badge>}
            </div>
            <div className="text-sm text-green-600">New This Week</div>
          </div>
        </div>

        {/* Criteria Summary */}
        <div className="space-y-2">
          <div className="text-sm font-medium">Criteria:</div>
          <div className="flex flex-wrap gap-1">
            {focus.criteria.skills.slice(0, 3).map(skill => (
              <Badge key={skill} variant="outline" className="text-xs">{skill}</Badge>
            ))}
            {focus.criteria.experience.slice(0, 2).map(exp => (
              <Badge key={exp} variant="outline" className="text-xs">{exp}</Badge>
            ))}
            {(focus.criteria.skills.length + focus.criteria.experience.length) > 5 && (
              <Badge variant="outline" className="text-xs">
                +{(focus.criteria.skills.length + focus.criteria.experience.length) - 5} more
              </Badge>
            )}
          </div>
        </div>

        {/* Last Updated */}
        <div className="text-sm text-gray-500 flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          Last updated: {focus.lastUpdated}
        </div>

        {/* Actions */}
        <div className="flex space-x-2 pt-2">
          <Button 
            size="sm" 
            variant="outline" 
            className="flex-1"
            onClick={() => onViewCandidates(focus)}
          >
            <Eye className="h-4 w-4 mr-1" />
            View Matches
          </Button>
          <Button
            size="sm"
            variant={focus.isActive ? "secondary" : "default"}
            onClick={() => onToggleActive(focus.id)}
          >
            {focus.isActive ? 'Pause' : 'Activate'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}