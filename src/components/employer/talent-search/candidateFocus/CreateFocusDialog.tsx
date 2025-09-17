import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../../ui/dialog";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";
import { Checkbox } from "../../../ui/checkbox";
import { NewFocusState } from './types';
import { getUniqueSkills, getUniqueExperience, getUniqueLocations, getUniqueRemotePreferences, getUniqueAvailability, getUniqueLanguages } from './utils';

interface CreateFocusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newFocus: NewFocusState;
  setNewFocus: React.Dispatch<React.SetStateAction<NewFocusState>>;
  onCreateFocus: () => void;
}

export function CreateFocusDialog({ 
  open, 
  onOpenChange, 
  newFocus, 
  setNewFocus, 
  onCreateFocus 
}: CreateFocusDialogProps) {
  
  const handleCriteriaChange = (category: string, value: string) => {
    setNewFocus(prev => ({
      ...prev,
      criteria: {
        ...prev.criteria,
        [category]: prev.criteria[category as keyof typeof prev.criteria].includes(value)
          ? prev.criteria[category as keyof typeof prev.criteria].filter(item => item !== value)
          : [...prev.criteria[category as keyof typeof prev.criteria], value]
      }
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Candidate Focus</DialogTitle>
          <DialogDescription>
            Define specific candidate criteria and we'll continuously track matching professionals for you.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 mt-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="focusName">Focus Name</Label>
              <Input
                id="focusName"
                value={newFocus.name}
                onChange={(e) => setNewFocus(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Senior React Developers"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="focusDescription">Description</Label>
              <Input
                id="focusDescription"
                value={newFocus.description}
                onChange={(e) => setNewFocus(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description of your ideal candidates"
              />
            </div>
          </div>

          {/* Criteria Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Skills */}
            <div className="space-y-3">
              <Label>Skills</Label>
              <div className="space-y-2 max-h-32 overflow-y-auto border rounded-lg p-3">
                {getUniqueSkills().map(skill => (
                  <div key={skill} className="flex items-center space-x-2">
                    <Checkbox
                      id={`skill-${skill}`}
                      checked={newFocus.criteria.skills.includes(skill)}
                      onCheckedChange={() => handleCriteriaChange('skills', skill)}
                    />
                    <Label htmlFor={`skill-${skill}`} className="text-sm">{skill}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="space-y-3">
              <Label>Experience Level</Label>
              <div className="space-y-2">
                {getUniqueExperience().map(exp => (
                  <div key={exp} className="flex items-center space-x-2">
                    <Checkbox
                      id={`exp-${exp}`}
                      checked={newFocus.criteria.experience.includes(exp)}
                      onCheckedChange={() => handleCriteriaChange('experience', exp)}
                    />
                    <Label htmlFor={`exp-${exp}`} className="text-sm">{exp}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Locations */}
            <div className="space-y-3">
              <Label>Locations</Label>
              <div className="space-y-2 max-h-32 overflow-y-auto border rounded-lg p-3">
                {getUniqueLocations().map(location => (
                  <div key={location} className="flex items-center space-x-2">
                    <Checkbox
                      id={`loc-${location}`}
                      checked={newFocus.criteria.locations.includes(location)}
                      onCheckedChange={() => handleCriteriaChange('locations', location)}
                    />
                    <Label htmlFor={`loc-${location}`} className="text-sm">{location}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Remote Preference */}
            <div className="space-y-3">
              <Label>Remote Preference</Label>
              <div className="space-y-2">
                {getUniqueRemotePreferences().map(pref => (
                  <div key={pref} className="flex items-center space-x-2">
                    <Checkbox
                      id={`remote-${pref}`}
                      checked={newFocus.criteria.remotePreference.includes(pref)}
                      onCheckedChange={() => handleCriteriaChange('remotePreference', pref)}
                    />
                    <Label htmlFor={`remote-${pref}`} className="text-sm">{pref}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="space-y-3">
              <Label>Availability</Label>
              <div className="space-y-2">
                {getUniqueAvailability().map(avail => (
                  <div key={avail} className="flex items-center space-x-2">
                    <Checkbox
                      id={`avail-${avail}`}
                      checked={newFocus.criteria.availability.includes(avail)}
                      onCheckedChange={() => handleCriteriaChange('availability', avail)}
                    />
                    <Label htmlFor={`avail-${avail}`} className="text-sm">{avail}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="space-y-3">
              <Label>Languages</Label>
              <div className="space-y-2">
                {getUniqueLanguages().map(lang => (
                  <div key={lang} className="flex items-center space-x-2">
                    <Checkbox
                      id={`lang-${lang}`}
                      checked={newFocus.criteria.languages.includes(lang)}
                      onCheckedChange={() => handleCriteriaChange('languages', lang)}
                    />
                    <Label htmlFor={`lang-${lang}`} className="text-sm">{lang}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button 
              onClick={onCreateFocus}
              disabled={!newFocus.name || !newFocus.description}
            >
              Create Candidate Focus
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}