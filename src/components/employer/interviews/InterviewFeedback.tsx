import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { Progress } from "../../ui/progress";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../ui/dialog";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { 
  Search,
  Star,
  MessageSquare,
  Eye,
  Edit,
  Download,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Clock,
  ThumbsUp,
  ThumbsDown,
  FileText,
  MoreHorizontal,
  Filter,
  Send,
  X
} from "lucide-react";
import { Interview } from "./types";
import { mockPastInterviews } from "./mockData";
import { formatDate, formatTime, getStatusBadge } from "./utils";

interface InterviewFeedbackProps {
  onViewDetails?: (interview: Interview) => void;
}

export function InterviewFeedback({ onViewDetails }: InterviewFeedbackProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('All Positions');
  const [selectedRating, setSelectedRating] = useState('All Ratings');
  const [selectedRecommendation, setSelectedRecommendation] = useState('All Recommendations');
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedbackNotes, setFeedbackNotes] = useState('');
  const [feedbackRecommendation, setFeedbackRecommendation] = useState('');

  const filteredInterviews = useMemo(() => {
    return mockPastInterviews.filter(interview => {
      const matchesSearch = interview.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           interview.candidateEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           interview.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPosition = selectedPosition === 'All Positions' || interview.jobTitle === selectedPosition;
      const matchesRating = selectedRating === 'All Ratings' || 
                           (interview.feedback?.rating && interview.feedback.rating.toString() === selectedRating);
      const matchesRecommendation = selectedRecommendation === 'All Recommendations' || 
                                   interview.feedback?.recommendation === selectedRecommendation.toLowerCase();

      return matchesSearch && matchesPosition && matchesRating && matchesRecommendation;
    });
  }, [searchQuery, selectedPosition, selectedRating, selectedRecommendation]);

  const feedbackStats = useMemo(() => {
    const totalWithFeedback = mockPastInterviews.filter(i => i.feedback).length;
    const avgRating = mockPastInterviews
      .filter(i => i.feedback?.rating)
      .reduce((sum, i) => sum + (i.feedback?.rating || 0), 0) / totalWithFeedback || 0;
    
    const recommendations = mockPastInterviews.reduce((acc, i) => {
      if (i.feedback?.recommendation) {
        acc[i.feedback.recommendation] = (acc[i.feedback.recommendation] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    return {
      totalWithFeedback,
      avgRating,
      recommendations,
      pendingFeedback: mockPastInterviews.filter(i => !i.feedback).length
    };
  }, []);

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex items-center space-x-1">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating 
                ? 'text-yellow-500 fill-current' 
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={() => interactive && onRatingChange && onRatingChange(i + 1)}
          />
        ))}
        {!interactive && (
          <span className="text-sm text-muted-foreground ml-1">({rating}/5)</span>
        )}
      </div>
    );
  };

  const handleAddFeedback = (interview: Interview) => {
    setSelectedInterview(interview);
    setFeedbackRating(interview.feedback?.rating || 0);
    setFeedbackNotes(interview.feedback?.notes || '');
    setFeedbackRecommendation(interview.feedback?.recommendation || '');
    setShowFeedbackDialog(true);
  };

  const handleSaveFeedback = () => {
    console.log('Saving feedback:', {
      interviewId: selectedInterview?.id,
      rating: feedbackRating,
      notes: feedbackNotes,
      recommendation: feedbackRecommendation
    });
    setShowFeedbackDialog(false);
    setSelectedInterview(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Interview Feedback</h3>
          <p className="text-sm text-muted-foreground">
            Review and manage feedback from completed interviews
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Feedback Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Feedback</p>
                <p className="text-2xl font-semibold">{feedbackStats.totalWithFeedback}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">Average Rating</p>
                <p className="text-2xl font-semibold">{feedbackStats.avgRating.toFixed(1)}/5</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <ThumbsUp className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Hire Recommendations</p>
                <p className="text-2xl font-semibold">{feedbackStats.recommendations.hire || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">Pending Feedback</p>
                <p className="text-2xl font-semibold">{feedbackStats.pendingFeedback}</p>
              </div>
            </div>
          </CardContent>
        </Card>
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

            <Select value={selectedRating} onValueChange={setSelectedRating}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Ratings">All Ratings</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="1">1 Star</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedRecommendation} onValueChange={setSelectedRecommendation}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Recommendation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Recommendations">All Recommendations</SelectItem>
                <SelectItem value="hire">Hire</SelectItem>
                <SelectItem value="reject">Reject</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Feedback Table */}
      <Card>
        <CardHeader>
          <CardTitle>Feedback Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidate</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Interview Date</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Recommendation</TableHead>
                <TableHead>Interviewer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInterviews.map((interview) => (
                <TableRow key={interview.id}>
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
                    {interview.feedback?.rating ? (
                      renderStars(interview.feedback.rating)
                    ) : (
                      <span className="text-sm text-muted-foreground">No rating</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {interview.feedback?.recommendation ? (
                      <Badge className={
                        interview.feedback.recommendation === 'hire' 
                          ? 'bg-green-100 text-green-800'
                          : interview.feedback.recommendation === 'reject'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }>
                        {interview.feedback.recommendation === 'hire' && <ThumbsUp className="h-3 w-3 mr-1" />}
                        {interview.feedback.recommendation === 'reject' && <ThumbsDown className="h-3 w-3 mr-1" />}
                        {interview.feedback.recommendation === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                        {interview.feedback.recommendation.charAt(0).toUpperCase() + interview.feedback.recommendation.slice(1)}
                      </Badge>
                    ) : (
                      <Badge variant="outline">Pending</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{interview.interviewers[0]?.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(interview.status, interview.outcome)}
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
                        <DropdownMenuItem onClick={() => handleAddFeedback(interview)}>
                          <Edit className="h-4 w-4 mr-2" />
                          {interview.feedback ? 'Edit Feedback' : 'Add Feedback'}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Message Candidate
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
          <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-medium text-lg mb-2">No feedback found</h3>
          <p className="text-muted-foreground">
            {searchQuery || selectedPosition !== 'All Positions' 
              ? 'No feedback matches your current filters.'
              : 'Interview feedback will appear here after completion.'}
          </p>
        </div>
      )}

      {/* Feedback Dialog */}
      <Dialog open={showFeedbackDialog} onOpenChange={setShowFeedbackDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {selectedInterview?.feedback ? 'Edit Interview Feedback' : 'Add Interview Feedback'}
            </DialogTitle>
          </DialogHeader>
          
          {selectedInterview && (
            <div className="space-y-6">
              {/* Candidate Info */}
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={selectedInterview.candidateAvatar} alt={selectedInterview.candidateName} />
                  <AvatarFallback>
                    {selectedInterview.candidateName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">{selectedInterview.candidateName}</h4>
                  <p className="text-sm text-muted-foreground">{selectedInterview.jobTitle}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(selectedInterview.date)} at {formatTime(selectedInterview.time)}
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium mb-2">Overall Rating</label>
                {renderStars(feedbackRating, true, setFeedbackRating)}
                <p className="text-sm text-muted-foreground mt-1">
                  Rate the candidate's performance during the interview
                </p>
              </div>

              {/* Recommendation */}
              <div>
                <label className="block text-sm font-medium mb-2">Recommendation</label>
                <Select value={feedbackRecommendation} onValueChange={setFeedbackRecommendation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select recommendation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hire">
                      <div className="flex items-center">
                        <ThumbsUp className="h-4 w-4 mr-2 text-green-500" />
                        Hire
                      </div>
                    </SelectItem>
                    <SelectItem value="reject">
                      <div className="flex items-center">
                        <ThumbsDown className="h-4 w-4 mr-2 text-red-500" />
                        Reject
                      </div>
                    </SelectItem>
                    <SelectItem value="pending">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-yellow-500" />
                        Pending Decision
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Feedback Notes */}
              <div>
                <label className="block text-sm font-medium mb-2">Feedback Notes</label>
                <Textarea
                  placeholder="Provide detailed feedback about the candidate's performance, strengths, areas for improvement, etc."
                  value={feedbackNotes}
                  onChange={(e) => setFeedbackNotes(e.target.value)}
                  rows={6}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  This feedback will be shared with the hiring team
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowFeedbackDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveFeedback} disabled={!feedbackRating || !feedbackRecommendation}>
              <Send className="h-4 w-4 mr-2" />
              Save Feedback
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}