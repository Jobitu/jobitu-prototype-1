import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Input } from "../../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Checkbox } from "../../ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { 
  Heart,
  Plus,
  Share2,
  Trash2,
  Edit,
  Eye,
  MessageSquare,
  Archive,
  Download,
  Users,
  Calendar,
  MapPin,
  Flag,
  Search,
  MoreHorizontal,
  FolderPlus
} from "lucide-react";
import { mockCandidates, mockShortlists } from './mockData';
import { Candidate, Shortlist } from './types';

export function TalentSearchSaved() {
  const [selectedTab, setSelectedTab] = useState<'shortlists' | 'saved-candidates'>('shortlists');
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateShortlist, setShowCreateShortlist] = useState(false);
  const [shortlists] = useState<Shortlist[]>(mockShortlists);
  const [savedCandidates] = useState<Candidate[]>(mockCandidates.filter(c => c.isBookmarked));

  const handleSelectCandidate = (candidateId: string) => {
    setSelectedCandidates(prev => 
      prev.includes(candidateId) 
        ? prev.filter(id => id !== candidateId)
        : [...prev, candidateId]
    );
  };

  const handleSelectAll = () => {
    if (selectedCandidates.length === savedCandidates.length) {
      setSelectedCandidates([]);
    } else {
      setSelectedCandidates(savedCandidates.map(c => c.id));
    }
  };

  const CreateShortlistDialog = () => (
    <Dialog open={showCreateShortlist} onOpenChange={setShowCreateShortlist}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Shortlist</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Shortlist Name</Label>
            <Input id="name" placeholder="e.g., Frontend Developers Q3" />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              placeholder="Brief description of this shortlist..."
              rows={3}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="shared" />
            <Label htmlFor="shared">Share with team members</Label>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowCreateShortlist(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowCreateShortlist(false)}>
              Create Shortlist
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="space-y-8">
      {/* Header with Tabs */}
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex space-x-4">
          <Button
            variant={selectedTab === 'shortlists' ? 'default' : 'ghost'}
            onClick={() => setSelectedTab('shortlists')}
          >
            Shortlists ({shortlists.length})
          </Button>
          <Button
            variant={selectedTab === 'saved-candidates' ? 'default' : 'ghost'}
            onClick={() => setSelectedTab('saved-candidates')}
          >
            Saved Candidates ({savedCandidates.length})
          </Button>
        </div>
        <Button onClick={() => setShowCreateShortlist(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Shortlist
        </Button>
      </div>

      {selectedTab === 'shortlists' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shortlists.map((shortlist) => (
            <Card key={shortlist.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{shortlist.name}</CardTitle>
                    <CardDescription className="mt-1">{shortlist.description}</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span>{shortlist.candidateCount} candidates</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>Updated {shortlist.lastUpdated}</span>
                    </div>
                  </div>

                  {/* Owner and Sharing Status */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">By {shortlist.owner}</span>
                    {shortlist.isShared && (
                      <Badge variant="outline" className="text-xs">
                        <Share2 className="h-3 w-3 mr-1" />
                        Shared
                      </Badge>
                    )}
                  </div>

                  {/* Candidate Avatars Preview */}
                  <div className="flex -space-x-2">
                    {mockCandidates
                      .filter(c => shortlist.candidates.includes(c.id))
                      .slice(0, 4)
                      .map((candidate) => (
                        <Avatar key={candidate.id} className="h-8 w-8 border-2 border-white">
                          <AvatarImage src={candidate.avatar} />
                          <AvatarFallback className="text-xs">
                            {candidate.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    {shortlist.candidateCount > 4 && (
                      <div className="h-8 w-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center">
                        <span className="text-xs text-gray-600">+{shortlist.candidateCount - 4}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Create New Shortlist Card */}
          <Card 
            className="border-dashed border-2 hover:border-blue-300 cursor-pointer hover:bg-blue-50/50 transition-colors"
            onClick={() => setShowCreateShortlist(true)}
          >
            <CardContent className="flex items-center justify-center h-full min-h-[200px]">
              <div className="text-center">
                <FolderPlus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-medium text-gray-900 mb-2">Create New Shortlist</h3>
                <p className="text-sm text-gray-500">Organize your saved candidates into collections</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {selectedTab === 'saved-candidates' && (
        <div className="space-y-6">
          {/* Actions Bar */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex-1 relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search saved candidates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            {selectedCandidates.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message ({selectedCandidates.length})
                </Button>
                <Button variant="outline" size="sm">
                  <Archive className="h-4 w-4 mr-2" />
                  Add to Shortlist
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            )}
          </div>

          {/* Select All */}
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={selectedCandidates.length === savedCandidates.length && savedCandidates.length > 0}
              onCheckedChange={handleSelectAll}
            />
            <Label>Select all ({savedCandidates.length} candidates)</Label>
          </div>

          {/* Saved Candidates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {savedCandidates
              .filter(candidate =>
                candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                candidate.title.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((candidate) => (
                <Card key={candidate.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Checkbox
                        checked={selectedCandidates.includes(candidate.id)}
                        onCheckedChange={() => handleSelectCandidate(candidate.id)}
                      />
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={candidate.avatar} alt={candidate.name} />
                        <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold">{candidate.name}</h3>
                          {candidate.flagged && <Flag className="h-4 w-4 text-orange-500" />}
                        </div>
                        <p className="text-gray-600 mb-2">{candidate.title}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{candidate.location}</span>
                          </div>
                          <span>{candidate.experience}</span>
                          <span>Saved on {candidate.dateAdded}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {candidate.skills.slice(0, 5).map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {candidate.skills.length > 5 && (
                            <Badge variant="outline" className="text-xs">
                              +{candidate.skills.length - 5} more
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button size="sm" variant="outline">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>

          {/* Empty State */}
          {savedCandidates.length === 0 && (
            <div className="text-center py-12">
              <Heart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No saved candidates yet</h3>
              <p className="text-gray-500 mb-4">
                Start browsing candidates and save the ones you're interested in
              </p>
              <Button>Browse Candidates</Button>
            </div>
          )}
        </div>
      )}

      <CreateShortlistDialog />
    </div>
  );
}
