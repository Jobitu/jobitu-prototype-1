import { useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Plus, Search, Target } from "lucide-react";
import { CandidateFocus, NewFocusState } from './candidateFocus/types';
import { mockCandidateFocus, initialFocusState } from './candidateFocus/constants';
import { CandidateFocusCard } from './candidateFocus/CandidateFocusCard';
import { CreateFocusDialog } from './candidateFocus/CreateFocusDialog';
import { CandidatesDialog } from './candidateFocus/CandidatesDialog';

export function TalentSearchCandidateFocus() {
  const [candidateFocus, setCandidateFocus] = useState<CandidateFocus[]>(mockCandidateFocus);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedFocus, setSelectedFocus] = useState<CandidateFocus | null>(null);
  const [showCandidatesDialog, setShowCandidatesDialog] = useState(false);
  const [newFocus, setNewFocus] = useState<NewFocusState>(initialFocusState);

  const handleCreateFocus = () => {
    const focus: CandidateFocus = {
      id: `CF-${Date.now()}`,
      name: newFocus.name,
      description: newFocus.description,
      criteria: newFocus.criteria,
      matchedCandidates: Math.floor(Math.random() * 30) + 5,
      newCandidates: Math.floor(Math.random() * 5),
      lastUpdated: 'Just created',
      isActive: true
    };

    setCandidateFocus(prev => [focus, ...prev]);
    setNewFocus(initialFocusState);
    setShowCreateDialog(false);
  };

  const handleToggleActive = (id: string) => {
    setCandidateFocus(prev => 
      prev.map(focus => 
        focus.id === id ? { ...focus, isActive: !focus.isActive } : focus
      )
    );
  };

  const handleViewCandidates = (focus: CandidateFocus) => {
    setSelectedFocus(focus);
    setShowCandidatesDialog(true);
  };

  const filteredFocus = candidateFocus.filter(focus =>
    focus.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    focus.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Candidate Focus</h2>
          <p className="text-gray-600">
            Create and manage candidate profiles to automatically track matching professionals
          </p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Focus
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search candidate focus..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Candidate Focus Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredFocus.map((focus) => (
          <CandidateFocusCard
            key={focus.id}
            focus={focus}
            onToggleActive={handleToggleActive}
            onViewCandidates={handleViewCandidates}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredFocus.length === 0 && (
        <div className="text-center py-12">
          <Target className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No candidate focus found</h3>
          <p className="text-gray-500 mb-4">
            {searchQuery ? 'Try adjusting your search terms' : 'Create your first candidate focus to start tracking ideal candidates'}
          </p>
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Candidate Focus
          </Button>
        </div>
      )}

      {/* Dialogs */}
      <CreateFocusDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        newFocus={newFocus}
        setNewFocus={setNewFocus}
        onCreateFocus={handleCreateFocus}
      />

      <CandidatesDialog
        open={showCandidatesDialog}
        onOpenChange={setShowCandidatesDialog}
        selectedFocus={selectedFocus}
      />
    </div>
  );
}