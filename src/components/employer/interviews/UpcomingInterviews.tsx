import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader } from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { Checkbox } from "../../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../../ui/dropdown-menu";
import {
  Search,
  Filter,
  Calendar as CalendarIcon,
  Clock,
  ExternalLink,
  Plus,
  MoreHorizontal,
  Grid3X3,
  List as ListIcon,
  Users,
  Eye,
  Edit,
  X,
  MessageSquare,
  ArrowUpDown,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight
} from "lucide-react";
import { Interview } from "./types";
import { mockUpcomingInterviews } from "./mockData";
import { getStatusBadge, getTypeIcon, formatDate, formatTime } from "./utils";

interface UpcomingInterviewsProps {
  onCreateInterview?: () => void;
  onViewDetails?: (interview: Interview) => void;
}

export function UpcomingInterviews({ onCreateInterview, onViewDetails }: UpcomingInterviewsProps) {
  const [selectedInterviews, setSelectedInterviews] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("All Positions");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const [selectedType, setSelectedType] = useState("All Types");
  const [dateRange, setDateRange] = useState("All Time");
  const [sortBy, setSortBy] = useState("Soonest First");
  const [viewMode, setViewMode] = useState<"table" | "card">("table");
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  const filteredInterviews = useMemo(() => {
    let data = mockUpcomingInterviews.filter((interview) => {
      const matchesSearch =
        interview.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        interview.candidateEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        interview.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesPosition =
        selectedPosition === "All Positions" || interview.jobTitle === selectedPosition;

      const matchesStatus =
        selectedStatus === "All Statuses" ||
        interview.status.toLowerCase() === selectedStatus.toLowerCase();

      const matchesType =
        selectedType === "All Types" || interview.type.toLowerCase() === selectedType.toLowerCase();

      return matchesSearch && matchesPosition && matchesStatus && matchesType;
    });

    // Sorting
    if (sortBy === "Soonest First") {
      data = [...data].sort(
        (a, b) => new Date(a.date + " " + a.time).getTime() - new Date(b.date + " " + b.time).getTime()
      );
    } else if (sortBy === "Latest First") {
      data = [...data].sort(
        (a, b) => new Date(b.date + " " + b.time).getTime() - new Date(a.date + " " + a.time).getTime()
      );
    }

    return data;
  }, [searchQuery, selectedPosition, selectedStatus, selectedType, sortBy]);

  const totalPages = Math.ceil(filteredInterviews.length / ITEMS_PER_PAGE);
  const paginatedInterviews = filteredInterviews.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleInterviewSelect = (id: string, selected: boolean) => {
    if (selected) {
      setSelectedInterviews((prev) => [...prev, id]);
    } else {
      setSelectedInterviews((prev) => prev.filter((intId) => intId !== id));
    }
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedInterviews(paginatedInterviews.map((int) => int.id));
    } else {
      setSelectedInterviews([]);
    }
  };

  const handleBulkAction = (action: string) => {
    console.log(`Performing bulk action: ${action} on interviews:`, selectedInterviews);
    setShowBulkActions(false);
    setSelectedInterviews([]);
  };

  const renderPagination = () => (
    <div className="flex items-center justify-between mt-4">
      <p className="text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </p>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  const renderTableView = () => (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          {/* Bulk Select */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={
                  selectedInterviews.length === paginatedInterviews.length &&
                  paginatedInterviews.length > 0
                }
                onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
                aria-label="Select all interviews"
              />
              <span className="text-sm text-muted-foreground">
                {selectedInterviews.length > 0
                  ? `${selectedInterviews.length} selected`
                  : "Select all"}
              </span>
            </div>
            {selectedInterviews.length > 0 && (
              <DropdownMenu open={showBulkActions} onOpenChange={setShowBulkActions}>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    Bulk Actions ({selectedInterviews.length})
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handleBulkAction("reschedule")}>
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    Reschedule Selected
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleBulkAction("message")}>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send Message
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleBulkAction("cancel")} className="text-red-600">
                    <X className="h-4 w-4 mr-2" />
                    Cancel Selected
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
          {/* View Switcher */}
          <div className="flex items-center space-x-2">
            <Button variant={viewMode === "table" ? "default" : "outline"} size="sm" onClick={() => setViewMode("table")}>
              <ListIcon className="h-4 w-4" />
            </Button>
            <Button variant={viewMode === "card" ? "default" : "outline"} size="sm" onClick={() => setViewMode("card")}>
              <Grid3X3 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>Candidate</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Interviewers</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedInterviews.map((interview) => (
              <TableRow key={interview.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedInterviews.includes(interview.id)}
                    onCheckedChange={(checked) => handleInterviewSelect(interview.id, checked as boolean)}
                    aria-label={`Select interview with ${interview.candidateName}`}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={interview.candidateAvatar} alt={interview.candidateName} />
                      <AvatarFallback>
                        {interview.candidateName.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{interview.candidateName}</p>
                      <p className="text-sm text-muted-foreground">{interview.candidateEmail}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{interview.jobTitle}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{formatDate(interview.date)}</p>
                    <p className="text-sm text-muted-foreground">{formatTime(interview.time)}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(interview.type)}
                    <span className="capitalize">{interview.type}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{interview.duration}m</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{interview.interviewers.length}</span>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(interview.status, interview.outcome)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onViewDetails?.(interview)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        Reschedule
                      </DropdownMenuItem>
                      {interview.meetingLink && (
                        <DropdownMenuItem asChild>
                          <a href={interview.meetingLink} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Join Meeting
                          </a>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {renderPagination()}
      </CardContent>
    </Card>
  );

  const renderCardView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {paginatedInterviews.map((interview) => (
        <Card
          key={interview.id}
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => onViewDetails?.(interview)}
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={interview.candidateAvatar} alt={interview.candidateName} />
                  <AvatarFallback>
                    {interview.candidateName.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">{interview.candidateName}</h4>
                  <p className="text-sm text-muted-foreground">{interview.jobTitle}</p>
                </div>
              </div>
              {getStatusBadge(interview.status, interview.outcome)}
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <span>
                  {formatDate(interview.date)} at {formatTime(interview.time)}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {getTypeIcon(interview.type)}
                <span className="capitalize">{interview.type} Interview</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{interview.duration} minutes</span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{interview.interviewers.length} interviewer(s)</span>
              </div>
              {interview.meetingLink && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(interview.meetingLink, "_blank");
                  }}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
      {renderPagination()}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Upcoming Interviews</h3>
          <p className="text-sm text-muted-foreground">
            {filteredInterviews.length} scheduled interview
            {filteredInterviews.length !== 1 ? "s" : ""}
          </p>
        </div>
        {onCreateInterview && (
          <Button onClick={onCreateInterview} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Interview
          </Button>
        )}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search candidates or positions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={selectedPosition} onValueChange={setSelectedPosition}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Positions">All Positions</SelectItem>
                <SelectItem value="Senior Frontend Developer">Senior Frontend Developer</SelectItem>
                <SelectItem value="Product Manager">Product Manager</SelectItem>
                <SelectItem value="UX Designer">UX Designer</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Types">All Types</SelectItem>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="phone">Phone</SelectItem>
                <SelectItem value="in-person">In-Person</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Statuses">All Statuses</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="rescheduled">Rescheduled</SelectItem>
                <SelectItem value="canceled">Canceled</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Time">All Time</SelectItem>
                <SelectItem value="Today">Today</SelectItem>
                <SelectItem value="This Week">This Week</SelectItem>
                <SelectItem value="Next Week">Next Week</SelectItem>
                <SelectItem value="This Month">This Month</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Soonest First">Soonest First</SelectItem>
                <SelectItem value="Latest First">Latest First</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Content */}
      {filteredInterviews.length === 0 ? (
        <div className="text-center py-12">
          <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-medium text-lg mb-2">No upcoming interviews</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery ||
            selectedPosition !== "All Positions" ||
            selectedType !== "All Types" ||
            selectedStatus !== "All Statuses"
              ? "No interviews match your current filters."
              : "Schedule your first interview to get started."}
          </p>
          {onCreateInterview && (
            <Button onClick={onCreateInterview}>
              <Plus className="h-4 w-4 mr-2" />
              Create Interview
            </Button>
          )}
        </div>
      ) : viewMode === "table" ? (
        renderTableView()
      ) : (
        renderCardView()
      )}
    </div>
  );
}
