import { mockCandidates } from '../mockData';
import { Candidate } from '../types';
import { CandidateFocus } from './types';

export const getUniqueSkills = () => Array.from(new Set(mockCandidates.flatMap(c => c.skills)));
export const getUniqueLocations = () => Array.from(new Set(mockCandidates.map(c => c.location)));
export const getUniqueExperience = () => Array.from(new Set(mockCandidates.map(c => c.experience)));
export const getUniqueRemotePreferences = () => Array.from(new Set(mockCandidates.map(c => c.remotePreference)));
export const getUniqueAvailability = () => Array.from(new Set(mockCandidates.map(c => c.availability)));
export const getUniqueLanguages = () => Array.from(new Set(mockCandidates.flatMap(c => c.languages)));

export const getMatchedCandidatesForFocus = (focus: CandidateFocus): Candidate[] => {
  return mockCandidates.filter(candidate => {
    const matchesSkills = focus.criteria.skills.length === 0 || 
      focus.criteria.skills.some(skill => candidate.skills.includes(skill));
    const matchesLocation = focus.criteria.locations.length === 0 || 
      focus.criteria.locations.includes(candidate.location);
    const matchesExperience = focus.criteria.experience.length === 0 || 
      focus.criteria.experience.includes(candidate.experience);
    const matchesRemote = focus.criteria.remotePreference.length === 0 || 
      focus.criteria.remotePreference.includes(candidate.remotePreference);
    const matchesAvailability = focus.criteria.availability.length === 0 || 
      focus.criteria.availability.includes(candidate.availability);
    const matchesLanguages = focus.criteria.languages.length === 0 || 
      focus.criteria.languages.some(lang => candidate.languages.includes(lang));

    return matchesSkills && matchesLocation && matchesExperience && 
           matchesRemote && matchesAvailability && matchesLanguages;
  });
};