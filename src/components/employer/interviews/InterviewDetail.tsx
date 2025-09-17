import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Textarea } from "../../ui/textarea";
import { Separator } from "../../ui/separator";
import { 
  ArrowLeft,
  Calendar as CalendarIcon,
  Clock,
  Users,
  Mail,
  Phone,
  MapPin,
  Video,
  ExternalLink,
  MessageCircle,
  Edit,
  X,
  FileText,
  Download,
  Star,
  Send
} from "lucide-react";
import { Interview } from "./types";
import { formatDate, formatTime, getStatusBadge, getTypeIcon } from "./utils";

interface InterviewDetailProps {
  interview: Interview;
  onBack: () => void;
}

export function InterviewDetail({ interview, onBack }: InterviewDetailProps) {
  const [newComment, setNewComment] = useState('');
  const [feedbackRating, setFeedbackRating] = useState(interview.feedback?.rating || 0);
  const [feedbackNotes, setFeedbackNotes] = useState(interview.feedback?.notes || '');

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
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBack}
              className="flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Interviews
            </Button>
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={interview.candidateAvatar} alt={interview.candidateName} />
                <AvatarFallback>
                  {interview.candidateName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-semibold">{interview.candidateName}</h1>
                <p className="text-gray-600">{interview.jobTitle}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {getStatusBadge(interview.status, interview.outcome)}
            <Button variant="outline">
              <MessageCircle className="h-4 w-4 mr-2" />
              Message
            </Button>
            {interview.meetingLink && (
              <Button>
                <ExternalLink className="h-4 w-4 mr-2" />
                Join Meeting
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <div className="grid grid-cols-12 h-full">
          {/* Main Content */}
          <div className="col-span-8 overflow-y-auto p-6">
            <div className="space-y-6">
              {/* Candidate Profile Header */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={interview.candidateAvatar} alt={interview.candidateName} />
                      <AvatarFallback>
                        {interview.candidateName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold">{interview.candidateName}</h2>
                      <p className="text-gray-600">{interview.jobTitle}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Mail className="h-4 w-4" />
                          <span>{interview.candidateEmail}</span>
                        </div>
                        {interview.candidatePhone && (
                          <div className="flex items-center space-x-1">
                            <Phone className="h-4 w-4" />
                            <span>{interview.candidatePhone}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Interview Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Interview Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="h-4 w-4 text-gray-400" />
                      <span>{formatDate(interview.date)} at {formatTime(interview.time)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span>{interview.duration} minutes</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(interview.type)}
                      <span className="capitalize">{interview.type} Interview</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span>{interview.interviewers.length} interviewer(s)</span>
                    </div>
                  </div>
                  
                  {interview.location && (
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span>{interview.location}</span>
                    </div>
                  )}

                  {interview.meetingLink && (
                    <div className="flex items-center space-x-2">
                      <Video className="h-4 w-4 text-gray-400" />
                      <a href={interview.meetingLink} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                        {interview.meetingLink}
                      </a>
                    </div>
                  )}

                  <Separator />

                  <div>
                    <h4 className="font-medium mb-2">Participants</h4>
                    <div className="space-y-2">
                      {interview.interviewers.map((interviewer, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={interviewer.avatar} alt={interviewer.name} />
                            <AvatarFallback>{interviewer.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{interviewer.name}</p>
                            <p className="text-xs text-gray-600">{interviewer.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Preparation Notes */}
              {interview.agenda && (
                <Card>
                  <CardHeader>
                    <CardTitle>Preparation Notes & Agenda</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{interview.agenda}</p>
                    
                    {interview.suggestedQuestions && (
                      <div className="mt-4">
                        <h4 className="font-medium mb-2">Suggested Questions</h4>
                        <ul className="space-y-1">
                          {interview.suggestedQuestions.map((question, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <span className="text-gray-400">•</span>
                              <span className="text-sm text-gray-700">{question}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Uploaded Preparation Documents */}
              {interview.preparationMaterials && interview.preparationMaterials.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Preparation Documents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {interview.preparationMaterials.map((material, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-blue-500" />
                            <div>
                              <p className="font-medium text-sm">{material.name}</p>
                              <p className="text-xs text-gray-600">{material.description}</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Interview Feedback (for completed interviews) */}
              {interview.status === 'completed' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Interview Feedback</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Rating</label>
                      {renderStars(feedbackRating, true, setFeedbackRating)}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Notes</label>
                      <Textarea
                        placeholder="Add your feedback notes..."
                        value={feedbackNotes}
                        onChange={(e) => setFeedbackNotes(e.target.value)}
                        rows={4}
                      />
                    </div>
                    
                    <Button>
                      <Send className="h-4 w-4 mr-2" />
                      Save Feedback
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Comments Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Team Comments</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback>AJ</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Alex Johnson</p>
                        <p className="text-sm text-gray-700">Great candidate, looking forward to the interview. @emily.davis should join if available.</p>
                        <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <Textarea
                      placeholder="Add a comment... Use @mention to notify team members"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      rows={2}
                    />
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-gray-500">Use @mentions to notify team members</p>
                      <Button size="sm" disabled={!newComment.trim()}>Comment</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-span-4 bg-white border-l border-gray-200 p-6 space-y-6">
            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Reschedule
                </Button>
                <Button variant="outline" className="w-full">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
                <Button variant="outline" className="w-full">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Interview
                </Button>
                <Button variant="outline" className="w-full text-red-600 hover:text-red-700">
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            {interview.status === 'completed' && interview.feedback && (
              <Card>
                <CardHeader>
                  <CardTitle>Interview Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Rating</span>
                    {renderStars(interview.feedback.rating)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Recommendation</span>
                    <Badge>{interview.feedback.recommendation}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Outcome</span>
                    {getStatusBadge(interview.status, interview.outcome)}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}