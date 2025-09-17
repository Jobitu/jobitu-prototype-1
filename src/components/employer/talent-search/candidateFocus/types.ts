export interface CandidateFocus {
  id: string;
  name: string;
  description: string;
  criteria: {
    skills: string[];
    experience: string[];
    locations: string[];
    remotePreference: string[];
    availability: string[];
    languages: string[];
  };
  matchedCandidates: number;
  newCandidates: number;
  lastUpdated: string;
  isActive: boolean;
}

export interface NewFocusState {
  name: string;
  description: string;
  criteria: {
    skills: string[];
    experience: string[];
    locations: string[];
    remotePreference: string[];
    availability: string[];
    languages: string[];
  };
}