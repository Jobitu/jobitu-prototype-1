import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Candidate } from "./mockData";
import { getStatusColor } from "./utils";
import { Filter, Users, MessageCircle, Eye } from "lucide-react";

interface CandidatesTabProps {
  candidates: Candidate[];
  onNavigateToMarketplace: () => void;
}

export function CandidatesTab({ candidates, onNavigateToMarketplace }: CandidatesTabProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Candidates</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button size="sm" onClick={onNavigateToMarketplace}>
              <Users className="h-4 w-4 mr-2" />
              Browse More
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {candidates.map(candidate => (
              <div key={candidate.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={candidate.avatar} />
                    <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{candidate.name}</h3>
                    <p className="text-sm text-muted-foreground">{candidate.title}</p>
                    <p className="text-xs text-muted-foreground">Applied for: {candidate.appliedRole}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{candidate.matchScore}%</div>
                    <div className="text-xs text-muted-foreground">Match</div>
                  </div>
                  <Badge className={getStatusColor(candidate.status)}>
                    {candidate.status}
                  </Badge>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Contact
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}