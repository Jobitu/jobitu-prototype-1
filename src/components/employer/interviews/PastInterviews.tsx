import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
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
  Video,
  Phone,
  MapPin,
  MoreHorizontal,
  Star,
  Users,
  Eye,
  MessageSquare,
  Download,
  ThumbsUp,
  ThumbsDown,
  FileText,
  BarChart3
} from "lucide-react";
import { Interview } from "./types";
import { mockPastInterviews } from "./mockData";
import { getStatusBadge, getTypeIcon, formatDate, formatTime } from "./utils";

interface PastInterviewsProps {
  onViewDetails?: (interview: Interview) => void;
}

export function PastInterviews({ onViewDetails }: PastInterviewsProps) {
  const [selectedInterviews, setSelectedInterviews] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('All Positions');
  const [selectedOutcome, setSelectedOutcome] = useState('All Outcomes');
  const [dateRange, setDateRange] = useState('All Time');
  const [sortBy, setSortBy] = useState('Most Recent');

  const filteredInterviews = useMemo(() => {
    return mockPastInterviews.filter(interview => {
      const matchesSearch = interview.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           interview.candidateEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           interview.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPosition = selectedPosition === 'All Positions' || interview.jobTitle === selectedPosition;
      const matchesOutcome = selectedOutcome === 'All Outcomes' || interview.outcome === selectedOutcome.toLowerCase();

      return matchesSearch && matchesPosition && matchesOutcome;
    });
  }, [searchQuery, selectedPosition, selectedOutcome]);

  const handleInterviewSelect = (id: string, selected: boolean) => {
    if (selected) {
      setSelectedInterviews(prev => [...prev, id]);
    } else {
      setSelectedInterviews(prev => prev.filter(intId => intId !== id));
    }
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedInterviews(filteredInterviews.map(int => int.id));
    } else {
      setSelectedInterviews([]);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating 
                ? 'text-yellow-500 fill-current' 
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-sm text-muted-foreground ml-1">({rating}/5)</span>
      </div>
    );
  };

  const getOutcomeIcon = (outcome?: string) => {
    switch (outcome) {
      case 'hired':
        return <ThumbsUp className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <ThumbsDown className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Past Interviews</h3>
          <p className="text-sm text-muted-foreground">
            {filteredInterviews.length} completed interview{filteredInterviews.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
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
                <SelectItem value="UX Designer">UX Designer</SelectItem>
                <SelectItem value="Backend Engineer">Backend Engineer</SelectItem>
                <SelectItem value="Product Manager">Product Manager</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedOutcome} onValueChange={setSelectedOutcome}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Outcome" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Outcomes">All Outcomes</SelectItem>
                <SelectItem value="hired">Hired</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Time">All Time</SelectItem>
                <SelectItem value="Last Week">Last Week</SelectItem>
                <SelectItem value="Last Month">Last Month</SelectItem>
                <SelectItem value="Last 3 Months">Last 3 Months</SelectItem>
                <SelectItem value="Last 6 Months">Last 6 Months</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Most Recent">Most Recent</SelectItem>
                <SelectItem value="Oldest First">Oldest First</SelectItem>
                <SelectItem value="Highest Rated">Highest Rated</SelectItem>
                <SelectItem value="Lowest Rated">Lowest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Past Interviews Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={selectedInterviews.length === filteredInterviews.length && filteredInterviews.length > 0}
                  onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
                />
                <span className="text-sm text-muted-foreground">
                  {selectedInterviews.length > 0 ? `${selectedInterviews.length} selected` : 'Select all'}
                </span>
              </div>
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
                <TableHead>Rating</TableHead>
                <TableHead>Outcome</TableHead>
                <TableHead>Interviewer</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInterviews.map((interview) => (
                <TableRow key={interview.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedInterviews.includes(interview.id)}
                      onCheckedChange={(checked) => handleInterviewSelect(interview.id, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={interview.candidateAvatar} alt={interview.candidateName} />
                        <AvatarFallback>
                          {interview.candidateName.split(' ').map(n => n[0]).join('')}
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
                    {interview.feedback?.rating ? renderStars(interview.feedback.rating) : (
                      <span className="text-sm text-muted-foreground">No rating</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getOutcomeIcon(interview.outcome)}
                      {getStatusBadge(interview.status, interview.outcome)}
                    </div>
                  </TableCell>
                  <TableCell>
<div className="flex flex-col">
  {interview.interviewers.map((intv, index) => (
    <span key={index} className="text-xs text-muted-foreground">
      {intv.name} ({intv.role})
    </span>
  ))}
</div>

                  </TableCell>
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
                          <FileText className="h-4 w-4 mr-2" />
                          View Feedback
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Message Candidate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" />
                          Export Interview
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {filteredInterviews.length === 0 && (
        <div className="text-center py-12">
          <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-medium text-lg mb-2">No past interviews found</h3>
          <p className="text-muted-foreground">
            {searchQuery || selectedPosition !== 'All Positions' || selectedOutcome !== 'All Outcomes'
              ? 'No interviews match your current filters.'
              : 'Completed interviews will appear here.'}
          </p>
        </div>
      )}
    </div>
  );
}