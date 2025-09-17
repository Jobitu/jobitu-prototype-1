import { useMemo, useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Badge } from "../../ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Tabs, TabsList, TabsTrigger } from "../../ui/tabs";
import { Progress } from "../../ui/progress";
import {
  Search,
  Filter,
  Download,
  Eye,
  MapPin,
  CalendarDays,
  MoreHorizontal,
} from "lucide-react";
import { jobTitles } from "../constants/applicationsConstants";
import type { Application } from "../types/applicationTypes";

// 🚀 Jobitu Employer Pipeline Flow
const stageOrder: Application["status"][] = [
  "applied",
  "qualified",
  "interview",
  "final_review",
  "passed",
];

const stageLabels: Record<string, string> = {
  applied: "Applied",
  qualified: "Qualified",
  interview: "Interview",
  final_review: "Final Review",
  passed: "Passed",
};

const stageClasses: Record<string, string> = {
  applied: "bg-blue-50 text-blue-700 border border-blue-200",
  qualified: "bg-indigo-50 text-indigo-700 border border-indigo-200",
  interview: "bg-purple-50 text-purple-700 border border-purple-200",
  final_review: "bg-yellow-50 text-yellow-700 border border-yellow-200",
  passed: "bg-green-50 text-green-700 border border-green-200",
};

const mockApplications: Application[] = [
  {
    id: "APP-2001",
    candidateName: "Alex Johnson",
    candidateEmail: "alex.johnson@email.com",
    candidateAvatar:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=150&h=150&fit=crop",
    candidateLocation: "San Francisco, CA",
    candidateSkills: ["React", "TypeScript", "Node.js"],
    candidateSummary: "Frontend-focused full-stack engineer.",
    jobTitle: "Senior Frontend Developer",
    jobId: "JOB-001",
    applicationDate: "2025-02-15",
    status: "applied",
    source: "job_board",
    matchScore: 92,
    lastActivity: "2025-02-17",
    artifacts: [],
    interviews: [],
    timeline: [],
  },
  {
    id: "APP-2006",
    candidateName: "Sarah Chen",
    candidateEmail: "sarah.chen@email.com",
    candidateAvatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop",
    candidateLocation: "Remote",
    candidateSkills: ["React", "TypeScript", "CSS"],
    candidateSummary: "Frontend specialist with design background.",
    jobTitle: "Senior Frontend Developer",
    jobId: "JOB-001",
    applicationDate: "2025-02-16",
    status: "qualified",
    source: "direct",
    matchScore: 89,
    lastActivity: "2025-02-18",
    artifacts: [],
    interviews: [],
    timeline: [],
  },
  {
    id: "APP-2002",
    candidateName: "Maria Garcia",
    candidateEmail: "maria.garcia@email.com",
    candidateAvatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
    candidateLocation: "Remote",
    candidateSkills: ["Agile", "Scrum", "JIRA"],
    candidateSummary: "PM with marketplace experience.",
    jobTitle: "Product Manager",
    jobId: "JOB-002",
    applicationDate: "2025-02-12",
    status: "qualified",
    source: "direct",
    matchScore: 84,
    lastActivity: "2025-02-18",
    artifacts: [],
    interviews: [],
    timeline: [],
  },
  {
    id: "APP-2003",
    candidateName: "David Kim",
    candidateEmail: "david.kim@email.com",
    candidateAvatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop",
    candidateLocation: "New York, NY",
    candidateSkills: ["System Design", "Go", "Kubernetes"],
    candidateSummary: "Backend engineer, infra heavy.",
    jobTitle: "Backend Engineer",
    jobId: "JOB-004",
    applicationDate: "2025-02-10",
    status: "interview",
    source: "referral",
    matchScore: 88,
    lastActivity: "2025-02-18",
    artifacts: [],
    interviews: [],
    timeline: [],
  },
  {
    id: "APP-2004",
    candidateName: "Emily Watson",
    candidateEmail: "emily.watson@email.com",
    candidateAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    candidateLocation: "Remote",
    candidateSkills: ["Research", "Figma", "UX"],
    candidateSummary: "Senior UX with strong research background.",
    jobTitle: "UX Designer",
    jobId: "JOB-003",
    applicationDate: "2025-02-11",
    status: "final_review",
    source: "job_board",
    matchScore: 90,
    lastActivity: "2025-02-18",
    artifacts: [],
    interviews: [],
    timeline: [],
  },
  {
    id: "APP-2005",
    candidateName: "Michael Brown",
    candidateEmail: "michael.brown@email.com",
    candidateAvatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    candidateLocation: "Berlin, DE",
    candidateSkills: ["Roadmapping", "Stakeholder mgmt"],
    candidateSummary: "PM for B2B SaaS.",
    jobTitle: "Product Manager",
    jobId: "JOB-002",
    applicationDate: "2025-02-09",
    status: "passed",
    source: "talent_search",
    matchScore: 95,
    lastActivity: "2025-02-18",
    artifacts: [],
    interviews: [],
    timeline: [],
  },
];

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString();
  } catch {
    return iso;
  }
}

interface AllApplicationsTabProps {
  jobFilter?: string;
  onViewApplicationDetail?: (application: Application) => void;
}

export function AllApplicationsTab({ 
  jobFilter: externalJobFilter = "",
  onViewApplicationDetail
}: AllApplicationsTabProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [jobFilter, setJobFilter] = useState<string>("All Positions");
  const [activeStage, setActiveStage] =
    useState<"all" | Application["status"]>("all");

  const applications = mockApplications;

  // Update internal job filter when external filter is provided
  useEffect(() => {
    if (externalJobFilter && externalJobFilter.trim() !== "") {
      setJobFilter(externalJobFilter);
    }
  }, [externalJobFilter]);

  const filtered = useMemo(() => {
    return applications.filter((a) => {
      const matchesSearch =
        !searchQuery ||
        a.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesJob =
        jobFilter === "All Positions" || a.jobTitle === jobFilter;
      const matchesStageTab = activeStage === "all" || a.status === activeStage;
      return matchesSearch && matchesJob && matchesStageTab;
    });
  }, [applications, searchQuery, jobFilter, activeStage]);

  const countsByStage = useMemo(() => {
    const base: Record<string, number> = { all: applications.length };
    stageOrder.forEach((s) => (base[s] = 0));
    for (const a of applications) {
      base[a.status] = (base[a.status] ?? 0) + 1;
    }
    return base;
  }, [applications]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">All Applications</h1>
        <p className="text-muted-foreground max-w-xl">
          Manage and review all candidates across the Jobitu pipeline with a
          clean, modern interface.
          {jobFilter && jobFilter !== "All Positions" && (
            <span className="block mt-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Filtered by: {jobFilter}
              </Badge>
            </span>
          )}
        </p>
      </div>

      {/* Stage tabs */}
      <Card className="shadow-md border rounded-2xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <Tabs
              value={activeStage}
              onValueChange={(v) => setActiveStage(v as any)}
            >
              <TabsList className="bg-muted p-1 rounded-xl shadow-inner">
                <TabsTrigger value="all" className="rounded-lg px-4 py-2">
                  All
                  <Badge variant="secondary" className="ml-2">
                    {countsByStage.all}
                  </Badge>
                </TabsTrigger>
                {stageOrder.map((s) => (
                  <TabsTrigger
                    key={s}
                    value={s}
                    className="rounded-lg px-4 py-2"
                  >
                    {stageLabels[s]}
                    <Badge variant="secondary" className="ml-2">
                      {countsByStage[s] ?? 0}
                    </Badge>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            <Button variant="outline" className="rounded-lg">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card className="border rounded-2xl shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-[280px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                className="pl-10 h-11 rounded-lg"
                placeholder="Search candidates or roles…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Select value={jobFilter} onValueChange={setJobFilter}>
              <SelectTrigger className="w-[240px] h-11 rounded-lg">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Job" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Positions">All Positions</SelectItem>
                {jobTitles.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="shadow-lg border rounded-2xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Applications</CardTitle>
          <CardDescription>
            {filtered.length} results shown out of {applications.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-xl border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-[280px]">Candidate</TableHead>
                  <TableHead>Job</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead>Applied</TableHead>
                  <TableHead>Match</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((a) => (
                  <TableRow
                    key={a.id}
                    className="hover:bg-muted/40 transition-colors"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-11 w-11 ring-2 ring-offset-1 ring-muted">
                          <AvatarImage
                            src={a.candidateAvatar}
                            alt={a.candidateName}
                          />
                          <AvatarFallback>
                            {a.candidateName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-base">
                            {a.candidateName}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {a.candidateEmail}
                          </div>
                          {a.candidateLocation && (
                            <div className="text-xs text-muted-foreground flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {a.candidateLocation}
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>{a.jobTitle}</span>
                        <Badge variant="secondary" className="rounded-md">
                          {a.jobId}
                        </Badge>
                      </div>
                    </TableCell>

                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2.5 py-1.5 rounded-md text-xs font-medium shadow-sm ${stageClasses[a.status]}`}
                      >
                        {stageLabels[a.status]}
                      </span>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                        {formatDate(a.applicationDate)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Last: {formatDate(a.lastActivity)}
                      </div>
                    </TableCell>

                    <TableCell className="w-[160px]">
                      {typeof a.matchScore === "number" ? (
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">
                              Match
                            </span>
                            <span className="font-medium">
                              {a.matchScore}%
                            </span>
                          </div>
                          <Progress
                            value={a.matchScore}
                            className="h-2 rounded-full"
                          />
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-sm">—</span>
                      )}
                    </TableCell>

                    <TableCell className="text-right">
                      <div className="inline-flex items-center gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="rounded-md"
                          onClick={() => onViewApplicationDetail?.(a)}
                        >
                          <Eye className="h-4 w-4 mr-1.5" /> View Details
                        </Button>
                        <Button size="sm" variant="ghost" className="rounded-md">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}

                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <div className="py-16 text-center">
                        <div className="mx-auto mb-3 w-14 h-14 rounded-full bg-muted flex items-center justify-center shadow-sm">
                          <Search className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div className="font-medium mb-1">
                          No applications match your filters
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Try adjusting filters or search.
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
