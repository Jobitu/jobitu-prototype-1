import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../../ui/dialog";
import { Button } from "../../../ui/button";
import { Badge } from "../../../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar";
import { Eye, MapPin } from "lucide-react";
import { CandidateFocus } from './types';
import { getMatchedCandidatesForFocus } from './utils';

interface CandidatesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedFocus: CandidateFocus | null;
}

export function CandidatesDialog({ open, onOpenChange, selectedFocus }: CandidatesDialogProps) {
  if (!selectedFocus) return null;

  const matchedCandidates = getMatchedCandidatesForFocus(selectedFocus);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {selectedFocus.name} - Matched Candidates
          </DialogTitle>
          <DialogDescription>
            Candidates that match your focus criteria
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 mt-6">
          {/* Criteria Display */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">Focus Criteria:</h4>
            <div className="flex flex-wrap gap-1">
              {Object.entries(selectedFocus.criteria).map(([key, values]) =>
                values.map((value: string) => (
                  <Badge key={`${key}-${value}`} variant="outline" className="text-xs">
                    {value}
                  </Badge>
                ))
              )}
            </div>
          </div>

          {/* Matched Candidates */}
          <div className="space-y-3">
            {matchedCandidates.map(candidate => (
              <div key={candidate.id} className="p-4 border rounded-lg hover:shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={candidate.avatar} />
                      <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{candidate.name}</h4>
                      <p className="text-sm text-gray-600">{candidate.title}</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                        <MapPin className="h-3 w-3" />
                        <span>{candidate.location}</span>
                        <span>• {candidate.experience}</span>
                        <span>• {candidate.remotePreference}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm">
                      Contact
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}