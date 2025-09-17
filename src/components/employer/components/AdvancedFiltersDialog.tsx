import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { Slider } from "../../ui/slider";
import { Checkbox } from "../../ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";

interface AdvancedFiltersDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdvancedFiltersDialog({ isOpen, onClose }: AdvancedFiltersDialogProps) {
  const [filters, setFilters] = useState({
    location: [],
    experience: [0, 10],
    skills: [],
    availability: [],
    salary: [50000, 200000],
    remote: 'all',
    education: [],
    languages: [],
    lastActive: '30'
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Advanced Filters</DialogTitle>
          <DialogDescription>
            Set advanced criteria to find the most relevant candidates for your positions.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label>Location</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sf">San Francisco, CA</SelectItem>
                  <SelectItem value="ny">New York, NY</SelectItem>
                  <SelectItem value="austin">Austin, TX</SelectItem>
                  <SelectItem value="seattle">Seattle, WA</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Experience (years)</Label>
              <div className="px-3 py-2">
                <Slider
                  value={filters.experience}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, experience: value }))}
                  max={15}
                  min={0}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>{filters.experience[0]} years</span>
                  <span>{filters.experience[1]}+ years</span>
                </div>
              </div>
            </div>

            <div>
              <Label>Skills</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {['React', 'TypeScript', 'Node.js', 'Python', 'Java', 'AWS', 'Docker', 'GraphQL'].map((skill) => (
                  <label key={skill} className="flex items-center space-x-2">
                    <Checkbox />
                    <span className="text-sm">{skill}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <Label>Availability</Label>
              <div className="space-y-2 mt-2">
                {['Immediately', 'Within 2 weeks', 'Within a month', 'Not actively looking'].map((availability) => (
                  <label key={availability} className="flex items-center space-x-2">
                    <Checkbox />
                    <span className="text-sm">{availability}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Salary Range (USD)</Label>
              <div className="px-3 py-2">
                <Slider
                  value={filters.salary}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, salary: value }))}
                  max={300000}
                  min={30000}
                  step={5000}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>${filters.salary[0].toLocaleString()}</span>
                  <span>${filters.salary[1].toLocaleString()}+</span>
                </div>
              </div>
            </div>

            <div>
              <Label>Remote Preference</Label>
              <Select value={filters.remote} onValueChange={(value) => setFilters(prev => ({ ...prev, remote: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All preferences</SelectItem>
                  <SelectItem value="remote">Remote only</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                  <SelectItem value="onsite">On-site</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Education Level</Label>
              <div className="space-y-2 mt-2">
                {['High School', 'Bachelor\'s Degree', 'Master\'s Degree', 'PhD', 'Bootcamp', 'Self-taught'].map((education) => (
                  <label key={education} className="flex items-center space-x-2">
                    <Checkbox />
                    <span className="text-sm">{education}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <Label>Languages</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {['English', 'Spanish', 'French', 'German', 'Mandarin', 'Japanese', 'Korean', 'Portuguese'].map((language) => (
                  <label key={language} className="flex items-center space-x-2">
                    <Checkbox />
                    <span className="text-sm">{language}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onClose}>
            Apply Filters
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}