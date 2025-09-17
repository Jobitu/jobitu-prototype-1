import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Input } from "../../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog";
import { 
  Search,
  Filter,
  Download,
  Eye,
  BarChart3,
  Calendar,
  Star,
  MessageSquare,
  ExternalLink,
  TrendingUp,
  TrendingDown,
  Pencil,
  Copy,
  Mail
} from "lucide-react";
import { mockFeedbacks } from "./mockData";
import { FEEDBACK_STATUS, LANGUAGES, REJECTION_REASONS } from "./constants";
import { Feedback, FeedbackFilters } from "./types";
import { formatFeedbackDate, generateFeedbackSummary, filterFeedbacks, sortFeedbacks } from "./utils";

export function AllFeedbacks() {
  const [filters, setFilters] = useState<FeedbackFilters>({
    search: '',
    jobId: 'all',
    status: 'all',
    language: 'all',
    dateRange: {},
    owner: 'all',
    rejectionReason: 'all'
  });
  const [sortBy, setSortBy] = useState('lastEditedAt');
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [showBenchmarks, setShowBenchmarks] = useState(false);

  // Derive select options from data
  const uniqueJobs = Array.from(new Set(mockFeedbacks.map(f => `${f.jobId}::${f.jobTitle}`))).map(v => {
    const [id, title] = v.split('::');
    return { id, title };
  });
  const uniqueOwners = Array.from(new Set(mockFeedbacks.map(f => f.owner)));

  const filteredFeedbacks = filterFeedbacks(mockFeedbacks, filters);
  const sortedFeedbacks = sortFeedbacks(filteredFeedbacks, sortBy);

  const handleFilterChange = (key: keyof FeedbackFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const getStatusBadge = (status: string) => {
    const statusInfo = FEEDBACK_STATUS[status as keyof typeof FEEDBACK_STATUS];
    return (
      <Badge variant="outline" className={statusInfo.color}>
        {statusInfo.label}
      </Badge>
    );
  };

  const getRejectionReasonBadge = (reason: string) => {
    const reasonInfo = REJECTION_REASONS[reason as keyof typeof REJECTION_REASONS];
    return (
      <Badge variant="outline" className={reasonInfo.color}>
        {reasonInfo.label}
      </Badge>
    );
  };

  const calculateBenchmarkComparison = (feedback: Feedback) => {
    // Mock benchmark comparison
    const avgRating = feedback.skillRatings.reduce((sum, rating) => sum + rating.rating, 0) / feedback.skillRatings.length;
    const marketAverage = 3.2; // Mock market average
    const difference = avgRating - marketAverage;
    
    return {
      difference,
      isAboveMarket: difference > 0,
      percentage: Math.abs(difference / marketAverage * 100)
    };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">All Feedbacks</h2>
          <p className="text-gray-600">
            {filteredFeedbacks.length} of {mockFeedbacks.length} feedbacks
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowBenchmarks(!showBenchmarks)}>
            <BarChart3 className="h-4 w-4 mr-2" />
            {showBenchmarks ? 'Hide' : 'Show'} Benchmarks
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4 md:sticky top-0 z-10 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <div className="grid grid-cols-1 md:grid-cols-8 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search candidates, jobs..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {Object.entries(FEEDBACK_STATUS).map(([key, status]) => (
                  <SelectItem key={key} value={key}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filters.language} onValueChange={(value) => handleFilterChange('language', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Languages</SelectItem>
                {Object.entries(LANGUAGES).map(([key, lang]) => (
                  <SelectItem key={key} value={key}>
                    {lang.flag} {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filters.rejectionReason} onValueChange={(value) => handleFilterChange('rejectionReason', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Reasons</SelectItem>
                {Object.entries(REJECTION_REASONS).map(([key, reason]) => (
                  <SelectItem key={key} value={key}>
                    {reason.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lastEditedAt">Last Edited</SelectItem>
                <SelectItem value="createdAt">Created Date</SelectItem>
                <SelectItem value="sentAt">Sent Date</SelectItem>
                <SelectItem value="candidateName">Candidate Name</SelectItem>
              </SelectContent>
            </Select>

            {/* Job filter */}
            <Select value={filters.jobId} onValueChange={(value) => handleFilterChange('jobId', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Job" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Jobs</SelectItem>
                {uniqueJobs.map(job => (
                  <SelectItem key={job.id} value={job.id}>
                    {job.id} — {job.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Owner filter */}
            <Select value={filters.owner} onValueChange={(value) => handleFilterChange('owner', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Owner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Owners</SelectItem>
                {uniqueOwners.map(owner => (
                  <SelectItem key={owner} value={owner}>
                    {owner}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Feedback List */}
      <div className="space-y-4">
        {sortedFeedbacks.map((feedback) => {
          const benchmarkData = showBenchmarks ? calculateBenchmarkComparison(feedback) : null;
          
          return (
            <Card key={feedback.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={`https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop`} />
                      <AvatarFallback>{feedback.candidateName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold truncate">{feedback.candidateName}</h3>
                        {getStatusBadge(feedback.status)}
                        {getRejectionReasonBadge(feedback.rejectionReason)}
                        <Badge variant="outline" className="text-xs">
                          {LANGUAGES[feedback.language].flag} {feedback.language}
                        </Badge>
                        {feedback.aiSuggested && (
                          <Badge variant="outline" className="text-xs">
                            <Star className="h-3 w-3 mr-1" />
                            AI
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-1">{feedback.candidateEmail}</p>
                      <p className="text-sm text-gray-500 mb-2">{feedback.jobTitle}</p>
                      
                      <p className="text-sm text-gray-700 line-clamp-2 mb-3">
                        {generateFeedbackSummary(feedback)}
                      </p>

                      {showBenchmarks && benchmarkData && (
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="flex items-center text-xs">
                            {benchmarkData.isAboveMarket ? (
                              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                            ) : (
                              <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                            )}
                            <span className={benchmarkData.isAboveMarket ? 'text-green-600' : 'text-red-600'}>
                              {benchmarkData.percentage.toFixed(1)}% {benchmarkData.isAboveMarket ? 'above' : 'below'} market avg
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>Owner: {feedback.owner}</span>
                        <span>•</span>
                        <span>{formatFeedbackDate(feedback.lastEditedAt)}</span>
                        {feedback.sentAt && (
                          <>
                            <span>•</span>
                            <span>Sent {formatFeedbackDate(feedback.sentAt)}</span>
                          </>
                        )}
                        {feedback.growthCenterExported && (
                          <>
                            <span>•</span>
                            <span className="text-green-600">Exported to Growth Center</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedFeedback(feedback)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      
                      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Feedback Details</DialogTitle>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span>{selectedFeedback?.candidateName}</span>
                            <span>•</span>
                            <span>{selectedFeedback?.jobTitle}</span>
                            <span>•</span>
                            <span>{selectedFeedback && formatFeedbackDate(selectedFeedback.lastEditedAt)}</span>
                          </div>
                        </DialogHeader>

                        {selectedFeedback && (
                          <div className="space-y-6">
                            <div className="flex flex-wrap gap-2">
                              {getStatusBadge(selectedFeedback.status)}
                              {getRejectionReasonBadge(selectedFeedback.rejectionReason)}
                              <Badge variant="outline">
                                {LANGUAGES[selectedFeedback.language].flag} {selectedFeedback.language}
                              </Badge>
                              {selectedFeedback.aiSuggested && (
                                <Badge variant="outline">
                                  <Star className="h-3 w-3 mr-1" />
                                  AI Assisted
                                </Badge>
                              )}
                            </div>

                            <div>
                              <h4 className="font-medium mb-2">Feedback Content</h4>
                              <div className="bg-gray-50 rounded-lg p-4">
                                <p className="text-sm whitespace-pre-wrap">{selectedFeedback.content}</p>
                              </div>
                            </div>

                            <div>
                              <h4 className="font-medium mb-3">Skill Ratings</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {selectedFeedback.skillRatings.map((rating) => (
                                  <div key={rating.skillId} className="space-y-2">
                                    <div className="flex justify-between">
                                      <span className="text-sm font-medium">{rating.skillName}</span>
                                      <span className="text-sm text-gray-500">{rating.rating}/5</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                      <div 
                                        className="bg-blue-500 h-2 rounded-full" 
                                        style={{ width: `${(rating.rating / 5) * 100}%` }}
                                      />
                                    </div>
                                    {rating.comment && (
                                      <p className="text-xs text-gray-600">{rating.comment}</p>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>

                            {selectedFeedback.notes && (
                              <div>
                                <h4 className="font-medium mb-2">Internal Notes</h4>
                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                                  <p className="text-sm text-yellow-800">{selectedFeedback.notes}</p>
                                </div>
                              </div>
                            )}

                            {selectedFeedback.growthCenterExported && selectedFeedback.exportedSkills && (
                              <div>
                                <h4 className="font-medium mb-2">Growth Center Export</h4>
                                <div className="flex flex-wrap gap-2">
                                  {selectedFeedback.exportedSkills.map((skill, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                      <ExternalLink className="h-3 w-3 mr-1" />
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>

                    {/* Quick actions */}
                    <Button variant="outline" size="sm">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    {feedback.status !== 'sent' && (
                      <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
                        <Mail className="h-4 w-4 mr-1" /> Send
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredFeedbacks.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No feedbacks found</h3>
            <p className="text-gray-600">
              {filters.search || filters.status !== 'all' || filters.language !== 'all'
                ? 'Try adjusting your search filters'
                : 'No feedbacks have been created yet'}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Summary Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Feedback Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{mockFeedbacks.length}</p>
              <p className="text-sm text-gray-600">Total Feedbacks</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {mockFeedbacks.filter(f => f.status === 'sent').length}
              </p>
              <p className="text-sm text-gray-600">Sent</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {mockFeedbacks.filter(f => f.aiSuggested).length}
              </p>
              <p className="text-sm text-gray-600">AI Assisted</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {mockFeedbacks.filter(f => f.growthCenterExported).length}
              </p>
              <p className="text-sm text-gray-600">Exported to Growth</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}