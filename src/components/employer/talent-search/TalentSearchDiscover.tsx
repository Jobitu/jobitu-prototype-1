import { useEffect, useMemo, useState, useCallback } from "react";
import { Card, CardContent } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Input } from "../../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog";
import { Checkbox } from "../../ui/checkbox";
import {
  Search,
  Heart,
  MessageSquare,
  Eye,
  MapPin,
  Flag,
  SlidersHorizontal,
  Grid3X3,
  List,
  X,
  Save,
  Download,
} from "lucide-react";
import { mockCandidates } from "./mockData";
import { Candidate } from "./types";

interface FilterState {
  locations: string[];
  skills: string[];
  experience: string[];
  remotePreference: string[];
  availability: string[];
  languages: string[];
  certifications: string[];
}

type ViewMode = "grid" | "list";

type SavedSearch = {
  id: string;
  name: string;
  query: string;
  filters: FilterState;
  sortBy: string;
  viewMode: ViewMode;
  createdAt: string;
};

const STORAGE_KEYS = {
  filters: "tsd:filters",
  query: "tsd:query",
  sortBy: "tsd:sortBy",
  viewMode: "tsd:viewMode",
  savedSearches: "tsd:savedSearches",
};

export function TalentSearchDiscover() {
  // ---------- STATE ----------
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortBy, setSortBy] = useState("recent");
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);
  const [showFiltersDialog, setShowFiltersDialog] = useState(false);
  const [showPreviewDialog, setShowPreviewDialog] = useState(false);
  const [previewCandidate, setPreviewCandidate] = useState<Candidate | null>(null);
  const [showSaveSearchDialog, setShowSaveSearchDialog] = useState(false);
  const [savedSearchName, setSavedSearchName] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);

  const [filters, setFilters] = useState<FilterState>({
    locations: [],
    skills: [],
    experience: [],
    remotePreference: [],
    availability: [],
    languages: [],
    certifications: [],
  });

  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);

  // ---------- EFFECTS: PERSISTENCE ----------
  // Load persisted UI state on mount
  useEffect(() => {
    try {
      const persistedFilters = localStorage.getItem(STORAGE_KEYS.filters);
      const persistedQuery = localStorage.getItem(STORAGE_KEYS.query);
      const persistedSort = localStorage.getItem(STORAGE_KEYS.sortBy);
      const persistedView = localStorage.getItem(STORAGE_KEYS.viewMode);
      const persistedSaved = localStorage.getItem(STORAGE_KEYS.savedSearches);

      if (persistedFilters) setFilters(JSON.parse(persistedFilters));
      if (persistedQuery) {
        setSearchQuery(persistedQuery);
        setDebouncedQuery(persistedQuery);
      }
      if (persistedSort) setSortBy(persistedSort);
      if (persistedView === "grid" || persistedView === "list") setViewMode(persistedView);
      if (persistedSaved) setSavedSearches(JSON.parse(persistedSaved));
    } catch {
      // ignore
    }
  }, []);

  // Persist UI state
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.filters, JSON.stringify(filters));
  }, [filters]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.query, searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.sortBy, sortBy);
  }, [sortBy]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.viewMode, viewMode);
  }, [viewMode]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.savedSearches, JSON.stringify(savedSearches));
  }, [savedSearches]);

  // Debounce search query for better UX
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(searchQuery.trim()), 250);
    return () => clearTimeout(t);
  }, [searchQuery]);

  // Reset visible count on query/filters change
  useEffect(() => {
    setVisibleCount(12);
  }, [debouncedQuery, filters, sortBy]);

  // Keyboard shortcuts: "/" focuses search, "f" opens filters
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "/") {
        e.preventDefault();
        const el = document.getElementById("discover-search-input") as HTMLInputElement | null;
        el?.focus();
      }
      if (e.key.toLowerCase() === "f" && !showFiltersDialog) {
        setShowFiltersDialog(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [showFiltersDialog]);

  // ---------- HELPERS ----------
  // Options for filters (derived from dataset)
  const getUniqueValues = (field: keyof Candidate) =>
    Array.from(new Set(candidates.map((c) => c[field]).filter(Boolean))) as string[];

  const getUniqueSkills = () => Array.from(new Set(candidates.flatMap((c) => c.skills || [])));
  const getUniqueLanguages = () => Array.from(new Set(candidates.flatMap((c) => c.languages || [])));
  const getUniqueCertifications = () =>
    Array.from(new Set(candidates.flatMap((c) => c.certifications || [])));

  const handleFilterChange = (filterType: keyof FilterState, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter((item) => item !== value)
        : [...prev[filterType], value],
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      locations: [],
      skills: [],
      experience: [],
      remotePreference: [],
      availability: [],
      languages: [],
      certifications: [],
    });
  };

  const getActiveFiltersCount = () =>
    Object.values(filters).reduce((total, arr) => total + arr.length, 0);

  const applyFilters = (candidate: Candidate): boolean => {
    if (filters.locations.length > 0 && !filters.locations.includes(candidate.location)) return false;
    if (filters.experience.length > 0 && !filters.experience.includes(candidate.experience)) return false;
    if (
      filters.remotePreference.length > 0 &&
      !filters.remotePreference.includes(candidate.remotePreference)
    )
      return false;
    if (filters.availability.length > 0 && !filters.availability.includes(candidate.availability))
      return false;
    if (filters.skills.length > 0 && !filters.skills.some((s) => candidate.skills.includes(s)))
      return false;
    if (
      filters.languages.length > 0 &&
      !filters.languages.some((l) => (candidate.languages || []).includes(l))
    )
      return false;
    if (
      filters.certifications.length > 0 &&
      !filters.certifications.some((c) => (candidate.certifications || []).includes(c))
    )
      return false;
    return true;
  };

  const filteredCandidates = useMemo(() => {
    const q = debouncedQuery.toLowerCase();
    return candidates.filter((candidate) => {
      const matchesSearch =
        q.length === 0 ||
        candidate.name.toLowerCase().includes(q) ||
        candidate.title.toLowerCase().includes(q) ||
        candidate.location.toLowerCase().includes(q) ||
        candidate.skills.some((s) => s.toLowerCase().includes(q));
      return matchesSearch && applyFilters(candidate);
    });
  }, [candidates, debouncedQuery, filters]);

  const parseExperience = (exp: string): number => {
    // best-effort parser for strings like "0-1 years", "2-3 years", "5+ years"
    const m = exp.match(/\d+/g);
    if (!m) return 0;
    return parseInt(m[0]!, 10);
  };

  const sortedCandidates = useMemo(() => {
    const list = [...filteredCandidates];
    switch (sortBy) {
      case "name":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "experience":
        list.sort((a, b) => parseExperience(b.experience) - parseExperience(a.experience));
        break;
      case "recent":
      default:
        list.sort(
          (a, b) =>
            new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
        );
        break;
    }
    return list;
  }, [filteredCandidates, sortBy]);

  const visibleCandidates = useMemo(
    () => sortedCandidates.slice(0, visibleCount),
    [sortedCandidates, visibleCount]
  );

  const openPreview = (candidate: Candidate) => {
    setPreviewCandidate(candidate);
    setShowPreviewDialog(true);
  };

  const toggleBookmark = useCallback(
    (id: string) => {
      setCandidates((prev) =>
        prev.map((c) => (c.id === id ? { ...c, isBookmarked: !c.isBookmarked } : c))
      );
    },
    [setCandidates]
  );

  const clearSearch = () => setSearchQuery("");

  // ---------- SAVED SEARCHES ----------
  const saveCurrentSearch = () => {
    if (!savedSearchName.trim()) return;
    const ss: SavedSearch = {
      id: crypto.randomUUID(),
      name: savedSearchName.trim(),
      query: searchQuery,
      filters,
      sortBy,
      viewMode,
      createdAt: new Date().toISOString(),
    };
    setSavedSearches((prev) => [ss, ...prev].slice(0, 20));
    setSavedSearchName("");
    setShowSaveSearchDialog(false);
  };

  const applySavedSearch = (id: string) => {
    const s = savedSearches.find((x) => x.id === id);
    if (!s) return;
    setSearchQuery(s.query);
    setDebouncedQuery(s.query);
    setFilters(s.filters);
    setSortBy(s.sortBy);
    setViewMode(s.viewMode);
  };

  const deleteSavedSearch = (id: string) => {
    setSavedSearches((prev) => prev.filter((s) => s.id !== id));
  };

  // ---------- EXPORT ----------
  const exportCSV = () => {
    const cols = [
      "Name",
      "Title",
      "Location",
      "Experience",
      "Skills",
      "Languages",
      "Availability",
      "RemotePreference",
      "LastActive",
      "DateAdded",
    ];
    const rows = sortedCandidates.map((c) => [
      c.name,
      c.title,
      c.location,
      c.experience,
      (c.skills || []).join("|"),
      (c.languages || []).join("|"),
      c.availability,
      c.remotePreference,
      c.lastActive,
      c.dateAdded,
    ]);
    const csv =
      [cols.join(","), ...rows.map((r) => r.map((x) => `"${String(x ?? "").replace(/"/g, '""')}"`).join(","))].join(
        "\n"
      );
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `jobitu-candidates-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ---------- COMPONENTS ----------
  const CandidateCard = ({
    candidate,
    variant = "grid",
  }: {
    candidate: Candidate;
    variant?: ViewMode;
  }) => {
    if (variant === "list") {
      return (
        <div
          role="button"
          onClick={() => openPreview(candidate)}
          className="p-4 bg-white border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 flex-1">
              <Avatar className="h-12 w-12">
                <AvatarImage src={candidate.avatar} alt={candidate.name} />
                <AvatarFallback>
                  {candidate.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold truncate">{candidate.name}</h3>
                  {candidate.flagged && <Flag className="h-4 w-4 text-orange-500" />}
                </div>
                <p className="text-sm text-gray-600 truncate">{candidate.title}</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span>{candidate.location}</span>
                  </div>
                  <span>{candidate.experience}</span>
                  <span>Active: {candidate.lastActive}</span>
                </div>
              </div>

              <div className="flex items-center space-x-4 pl-4">
                <div className="text-right">
                  <div className="flex flex-wrap gap-1 mb-2 justify-end">
                    {candidate.skills.slice(0, 4).map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {candidate.skills.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{candidate.skills.length - 4}
                      </Badge>
                    )}
                  </div>
                  <div className="text-xs text-gray-500">
                    {candidate.remotePreference} • {candidate.availability}
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmark(candidate.id);
                    }}
                    aria-label="Save"
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        candidate.isBookmarked ? "text-red-500 fill-current" : ""
                      }`}
                    />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      // message flow here
                    }}
                  >
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      openPreview(candidate);
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // GRID CARD
    return (
      <Card
        role="button"
        onClick={() => openPreview(candidate)}
        className="hover:shadow-md transition-shadow cursor-pointer"
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={candidate.avatar} alt={candidate.name} />
                <AvatarFallback>
                  {candidate.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-semibold">{candidate.name}</h3>
                  {candidate.flagged && <Flag className="h-4 w-4 text-orange-500" />}
                </div>
                <p className="text-gray-600">{candidate.title}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-500">{candidate.location}</span>
                  <span className="text-sm text-gray-500">• {candidate.experience}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleBookmark(candidate.id);
                }}
                aria-label="Save"
              >
                <Heart
                  className={`h-4 w-4 ${
                    candidate.isBookmarked ? "text-red-500 fill-current" : ""
                  }`}
                />
              </Button>
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{candidate.bio}</p>

          <div className="space-y-3">
            <div className="flex flex-wrap gap-1">
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

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Availability:</span> {candidate.availability}
              </div>
              <div>
                <span className="text-gray-500">Remote:</span> {candidate.remotePreference}
              </div>
            </div>

            {(candidate.languages?.length ?? 0) > 0 && (
              <div className="text-sm">
                <span className="text-gray-500">Languages:</span>{" "}
                {candidate.languages?.join(", ")}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>Last active: {candidate.lastActive}</span>
            </div>

            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  // message flow here
                }}
              >
                <MessageSquare className="h-4 w-4 mr-1" />
                Message
              </Button>
              <Button
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  openPreview(candidate);
                }}
              >
                <Eye className="h-4 w-4 mr-1" />
                View Profile
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  // ---------- RENDER ----------
  return (
    <div className="space-y-6">
      {/* Header: Search + Filters + Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            id="discover-search-input"
            placeholder="Search candidates by name, title, skills, or location…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10"
            aria-label="Search candidates"
          />
          {searchQuery && (
            <button
              aria-label="Clear search"
              onClick={clearSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-gray-100"
            >
              <X className="h-4 w-4 text-gray-500" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2 justify-end">
          {/* Filters Modal */}
          <Dialog open={showFiltersDialog} onOpenChange={setShowFiltersDialog}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
                {getActiveFiltersCount() > 0 && (
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {getActiveFiltersCount()}
                  </Badge>
                )}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Filter Candidates</DialogTitle>
                <DialogDescription>
                  Narrow your search to find the most relevant profiles.
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* Location */}
                <div className="space-y-3">
                  <h4 className="font-medium">Location</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                    {getUniqueValues("location").map((location) => (
                      <div key={location} className="flex items-center space-x-2">
                        <Checkbox
                          id={`location-${location}`}
                          checked={filters.locations.includes(location)}
                          onCheckedChange={() => handleFilterChange("locations", location)}
                        />
                        <label htmlFor={`location-${location}`} className="text-sm font-medium">
                          {location}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div className="space-y-3">
                  <h4 className="font-medium">Experience</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                    {getUniqueValues("experience").map((exp) => (
                      <div key={exp} className="flex items-center space-x-2">
                        <Checkbox
                          id={`exp-${exp}`}
                          checked={filters.experience.includes(exp)}
                          onCheckedChange={() => handleFilterChange("experience", exp)}
                        />
                        <label htmlFor={`exp-${exp}`} className="text-sm font-medium">
                          {exp}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Remote Preference */}
                <div className="space-y-3">
                  <h4 className="font-medium">Remote Preference</h4>
                  <div className="space-y-2">
                    {getUniqueValues("remotePreference").map((pref) => (
                      <div key={pref} className="flex items-center space-x-2">
                        <Checkbox
                          id={`remote-${pref}`}
                          checked={filters.remotePreference.includes(pref)}
                          onCheckedChange={() => handleFilterChange("remotePreference", pref)}
                        />
                        <label htmlFor={`remote-${pref}`} className="text-sm font-medium">
                          {pref}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div className="space-y-3">
                  <h4 className="font-medium">Availability</h4>
                  <div className="space-y-2">
                    {getUniqueValues("availability").map((avail) => (
                      <div key={avail} className="flex items-center space-x-2">
                        <Checkbox
                          id={`avail-${avail}`}
                          checked={filters.availability.includes(avail)}
                          onCheckedChange={() => handleFilterChange("availability", avail)}
                        />
                        <label htmlFor={`avail-${avail}`} className="text-sm font-medium">
                          {avail}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div className="space-y-3">
                  <h4 className="font-medium">Skills</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                    {getUniqueSkills().map((skill) => (
                      <div key={skill} className="flex items-center space-x-2">
                        <Checkbox
                          id={`skill-${skill}`}
                          checked={filters.skills.includes(skill)}
                          onCheckedChange={() => handleFilterChange("skills", skill)}
                        />
                        <label htmlFor={`skill-${skill}`} className="text-sm font-medium">
                          {skill}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Languages */}
                <div className="space-y-3">
                  <h4 className="font-medium">Languages</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                    {getUniqueLanguages().map((lang) => (
                      <div key={lang} className="flex items-center space-x-2">
                        <Checkbox
                          id={`lang-${lang}`}
                          checked={filters.languages.includes(lang)}
                          onCheckedChange={() => handleFilterChange("languages", lang)}
                        />
                        <label htmlFor={`lang-${lang}`} className="text-sm font-medium">
                          {lang}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications (if any) */}
                {getUniqueCertifications().length > 0 && (
                  <div className="space-y-3 md:col-span-2">
                    <h4 className="font-medium">Certifications</h4>
                    <div className="flex flex-wrap gap-3">
                      {getUniqueCertifications().map((cert) => (
                        <label key={cert} className="inline-flex items-center gap-2">
                          <Checkbox
                            checked={filters.certifications.includes(cert)}
                            onCheckedChange={() => handleFilterChange("certifications", cert)}
                          />
                          <span className="text-sm">{cert}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-6 border-t">
                <Button variant="outline" onClick={clearAllFilters}>
                  Clear All Filters
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setShowFiltersDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setShowFiltersDialog(false)}>Apply Filters</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Recently Added</SelectItem>
              <SelectItem value="name">Name A–Z</SelectItem>
              <SelectItem value="experience">Experience</SelectItem>
            </SelectContent>
          </Select>

          {/* View toggle */}
          <div className="flex border rounded-md overflow-hidden">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              aria-label="Grid view"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              aria-label="List view"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          {/* Save search */}
          <Dialog open={showSaveSearchDialog} onOpenChange={setShowSaveSearchDialog}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Save className="h-4 w-4 mr-2" />
                Save Search
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Save this search</DialogTitle>
                <DialogDescription>
                  Give your search a name to reuse it later.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-3">
                <Input
                  placeholder="e.g. React · 2+ yrs · Istanbul"
                  value={savedSearchName}
                  onChange={(e) => setSavedSearchName(e.target.value)}
                />
                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="outline" onClick={() => setShowSaveSearchDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={saveCurrentSearch}>Save</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Load saved search */}
          {savedSearches.length > 0 && (
            <Select onValueChange={applySavedSearch}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Load saved search" />
              </SelectTrigger>
              <SelectContent>
                {savedSearches.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {/* Export */}
          <Button variant="outline" onClick={exportCSV}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Results Header + Active Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">
            {sortedCandidates.length} candidates found
          </h2>
          {debouncedQuery && (
            <p className="text-sm text-gray-600">Results for "{debouncedQuery}"</p>
          )}
        </div>

        {/* Active Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          {debouncedQuery && (
            <Badge variant="secondary" className="text-xs">
              Query: {debouncedQuery}
              <button onClick={clearSearch} className="ml-1 hover:bg-gray-200 rounded-full">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}

          {Object.entries(filters).map(([type, values]) =>
            values.map((value) => (
              <Badge key={`${type}-${value}`} variant="secondary" className="text-xs">
                {value}
                <button
                  onClick={() => handleFilterChange(type as keyof FilterState, value)}
                  className="ml-1 hover:bg-gray-200 rounded-full"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))
          )}

          {(debouncedQuery || getActiveFiltersCount() > 0) && (
            <Button variant="ghost" size="sm" onClick={() => { clearSearch(); clearAllFilters(); }}>
              Clear all
            </Button>
          )}
        </div>
      </div>

      {/* Candidates */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {visibleCandidates.map((candidate) => (
            <CandidateCard key={candidate.id} candidate={candidate} variant="grid" />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {visibleCandidates.map((candidate) => (
            <CandidateCard key={candidate.id} candidate={candidate} variant="list" />
          ))}
        </div>
      )}

      {/* Load more */}
      {visibleCount < sortedCandidates.length && (
        <div className="flex justify-center">
          <Button onClick={() => setVisibleCount((v) => v + 12)}>Load more</Button>
        </div>
      )}

      {/* Empty State */}
      {sortedCandidates.length === 0 && (
        <div className="text-center py-12">
          <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No candidates found</h3>
          <p className="text-gray-500 mb-4">
            Try adjusting your search terms or filters
          </p>
          <div className="flex justify-center gap-2">
            <Button variant="outline" onClick={clearAllFilters}>
              Clear filters
            </Button>
            <Button variant="outline" onClick={clearSearch}>
              Clear search
            </Button>
          </div>
        </div>
      )}

      {/* Preview Dialog (read-only) */}
      <Dialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
        <DialogContent className="sm:max-w-3xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Candidate Preview</DialogTitle>
            <DialogDescription>Read-only profile as seen by employers.</DialogDescription>
          </DialogHeader>

          {previewCandidate && (
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={previewCandidate.avatar} alt={previewCandidate.name} />
                  <AvatarFallback>
                    {previewCandidate.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-semibold">{previewCandidate.name}</h3>
                    {previewCandidate.flagged && <Flag className="h-4 w-4 text-orange-500" />}
                  </div>
                  <p className="text-gray-600">{previewCandidate.title}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <MapPin className="h-4 w-4" />
                    <span>{previewCandidate.location}</span>
                    <span>• {previewCandidate.experience}</span>
                    <span>• Last active: {previewCandidate.lastActive}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => toggleBookmark(previewCandidate.id)}
                  >
                    <Heart
                      className={`h-4 w-4 mr-1 ${
                        previewCandidate.isBookmarked ? "text-red-500 fill-current" : ""
                      }`}
                    />
                    Save
                  </Button>
                  <Button variant="outline">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Message
                  </Button>
                </div>
              </div>

              {previewCandidate.bio && (
                <div>
                  <h4 className="font-medium mb-2">About</h4>
                  <p className="text-sm text-gray-700 leading-6">{previewCandidate.bio}</p>
                </div>
              )}

              <div>
                <h4 className="font-medium mb-2">Skills</h4>
                <div className="flex flex-wrap gap-1">
                  {previewCandidate.skills.map((s) => (
                    <Badge key={s} variant="outline" className="text-xs">
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Availability:</span>{" "}
                  {previewCandidate.availability}
                </div>
                <div>
                  <span className="text-gray-500">Remote:</span>{" "}
                  {previewCandidate.remotePreference}
                </div>
                {(previewCandidate.languages?.length ?? 0) > 0 && (
                  <div>
                    <span className="text-gray-500">Languages:</span>{" "}
                    {previewCandidate.languages?.join(", ")}
                  </div>
                )}
              </div>

              {(previewCandidate.certifications?.length ?? 0) > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Certifications</h4>
                  <div className="flex flex-wrap gap-1">
                    {previewCandidate.certifications?.map((c) => (
                      <Badge key={c} variant="secondary" className="text-xs">
                        {c}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Manage Saved Searches (inline list) */}
      {savedSearches.length > 0 && (
        <div className="mt-2">
          <h4 className="text-sm font-medium mb-2">Saved searches</h4>
          <div className="flex flex-wrap gap-2">
            {savedSearches.map((s) => (
              <Badge key={s.id} variant="outline" className="text-xs">
                <button
                  className="mr-2 underline"
                  onClick={() => applySavedSearch(s.id)}
                  title={`Apply "${s.name}"`}
                >
                  {s.name}
                </button>
                <button
                  onClick={() => deleteSavedSearch(s.id)}
                  className="ml-1 hover:bg-gray-200 rounded-full"
                  title="Delete"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
