import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Textarea } from "../../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Label } from "../../ui/label";
import { Slider } from "../../ui/slider";
import { Checkbox } from "../../ui/checkbox";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../ui/tooltip";
import {
  Clock,
  AlertCircle,
  Send,
  Sparkles,
  Star,
  MessageSquare,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { mockPendingCandidates, mockAISuggestions } from "./mockData";
import { SKILL_CATEGORIES, DEFAULT_SKILLS_BY_CATEGORY, REJECTION_REASONS } from "./constants";
import { PendingCandidate, SkillRating } from "./types";
import { formatFeedbackDate } from "./utils";

export function PendingFeedbacks() {
  const [selectedCandidate, setSelectedCandidate] = useState<PendingCandidate | null>(null);
  const [feedbackMode, setFeedbackMode] = useState<"quick" | "detailed">("quick");
  const [feedbackContent, setFeedbackContent] = useState("");
  const [skillRatings, setSkillRatings] = useState<SkillRating[]>([]);
  const [rejectionReason, setRejectionReason] = useState("");
  const [notes, setNotes] = useState("");
  const [useAISuggestion, setUseAISuggestion] = useState(false);

  const priorityOrder = { high: 3, medium: 2, low: 1 };
  const sortedCandidates = [...mockPendingCandidates].sort(
    (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]
  );

  const handleCreateFeedback = (candidate: PendingCandidate) => {
    setSelectedCandidate(candidate);
    setFeedbackContent("");
    setSkillRatings([]);
    setNotes("");
    setRejectionReason("");
    setUseAISuggestion(false);

    const defaultSkills = [
      ...DEFAULT_SKILLS_BY_CATEGORY.technical.slice(0, 3),
      ...DEFAULT_SKILLS_BY_CATEGORY.communication.slice(0, 2),
      ...DEFAULT_SKILLS_BY_CATEGORY.problem_solving.slice(0, 2),
    ];

    const initialRatings: SkillRating[] = defaultSkills.map((skill, index) => ({
      skillId: `skill-${index}`,
      skillName: skill,
      category: index < 3 ? "technical" : index < 5 ? "communication" : "problem_solving",
      rating: 3,
      comment: "",
      isRequired: true,
    }));

    setSkillRatings(initialRatings);
  };

  const updateSkillRating = (skillId: string, field: keyof SkillRating, value: any) => {
    setSkillRatings((prev) =>
      prev.map((rating) => (rating.skillId === skillId ? { ...rating, [field]: value } : rating))
    );
  };

  const handleSaveFeedback = () => {
    console.log("Saving feedback:", {
      candidate: selectedCandidate,
      mode: feedbackMode,
      content: feedbackContent,
      skillRatings,
      rejectionReason,
      notes,
    });

    setSelectedCandidate(null);
  };

  const generateAISuggestion = () => {
    if (!selectedCandidate) return;

    const suggestion = mockAISuggestions.find((s) =>
      s.jobTitle.toLowerCase().includes(selectedCandidate.jobTitle.toLowerCase())
    );

    if (suggestion) {
      setFeedbackContent(suggestion.suggestionText);
      setUseAISuggestion(true);
    }
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      high: "bg-red-100 text-red-800 border-red-200",
      medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
      low: "bg-green-100 text-green-800 border-green-200",
    };

    return (
      <Badge variant="outline" className={colors[priority as keyof typeof colors]}>
        {priority}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Pending Feedbacks</h2>
          <p className="text-gray-600">
            {sortedCandidates.length} candidates waiting for mandatory feedback
          </p>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">
                <Sparkles className="h-4 w-4 mr-2" />
                Bulk Generate
              </Button>
            </TooltipTrigger>
            <TooltipContent>Generate AI feedback drafts for all pending candidates</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Priority Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {["high", "medium", "low"].map((priority) => {
          const count = sortedCandidates.filter((c) => c.priority === priority).length;
          return (
            <Card key={priority}>
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600 capitalize">{priority} Priority</p>
                  <p className="text-2xl font-bold">{count}</p>
                </div>
                <AlertCircle
                  className={`h-10 w-10 ${
                    priority === "high"
                      ? "text-red-500"
                      : priority === "medium"
                      ? "text-yellow-500"
                      : "text-green-500"
                  }`}
                />
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Candidate Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sortedCandidates.map((candidate) => (
          <Card
            key={candidate.id}
            className={`hover:shadow-md transition-shadow border-l-4 ${
              candidate.priority === "high"
                ? "border-l-red-400"
                : candidate.priority === "medium"
                ? "border-l-yellow-300"
                : "border-l-green-300"
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                {/* Candidate Info */}
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={candidate.avatar} alt={candidate.name} />
                    <AvatarFallback>
                      {candidate.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold">{candidate.name}</h3>
                      {getPriorityBadge(candidate.priority)}
                      {candidate.hasExistingFeedback && <Badge variant="outline">Has Draft</Badge>}
                    </div>
                    <p className="text-sm text-gray-600">{candidate.email}</p>
                    <p className="text-sm text-gray-500">{candidate.jobTitle}</p>
                  </div>
                </div>

                {/* Candidate Actions */}
                <div className="flex items-center space-x-4">
                  <div className="text-right text-sm">
                    <p className="text-gray-600">Rejected {formatFeedbackDate(candidate.rejectedAt)}</p>
                    <p className="text-gray-500">by {candidate.rejectedBy}</p>
                    {candidate.assessmentScore && (
                      <p className="text-sm">Assessment: {candidate.assessmentScore}%</p>
                    )}
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button onClick={() => handleCreateFeedback(candidate)}>
                        <MessageSquare className="h-4 w-4 mr-2" />
                        {candidate.hasExistingFeedback ? "Edit Feedback" : "Create Feedback"}
                      </Button>
                    </DialogTrigger>

                    {/* Feedback Modal */}
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Create Feedback for {selectedCandidate?.name}</DialogTitle>
                        <p className="text-sm text-gray-600">
                          {selectedCandidate?.jobTitle} • Rejected{" "}
                          {selectedCandidate && formatFeedbackDate(selectedCandidate.rejectedAt)}
                        </p>
                      </DialogHeader>

                      <Tabs
                        value={feedbackMode}
                        onValueChange={(value) => setFeedbackMode(value as "quick" | "detailed")}
                      >
                        <TabsList className="w-full">
                          <TabsTrigger value="quick" className="flex-1">
                            <Clock className="h-4 w-4 mr-2" />
                            Quick Feedback
                          </TabsTrigger>
                          <TabsTrigger value="detailed" className="flex-1">
                            <Star className="h-4 w-4 mr-2" />
                            Detailed Feedback
                          </TabsTrigger>
                        </TabsList>

                        {/* Quick Feedback */}
                        <TabsContent value="quick" className="space-y-6 mt-6">
                          <div>
                            <Label>Rejection Reason</Label>
                            <Select value={rejectionReason} onValueChange={setRejectionReason}>
                              <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Select primary reason" />
                              </SelectTrigger>
                              <SelectContent>
                                {Object.entries(REJECTION_REASONS).map(([key, reason]) => (
                                  <SelectItem key={key} value={key}>
                                    {reason.label} - {reason.description}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <Label>Feedback Message (min. 200 characters)</Label>
                              <Button variant="outline" size="sm" onClick={generateAISuggestion}>
                                <Sparkles className="h-4 w-4 mr-1" />
                                AI Suggest
                              </Button>
                            </div>
                            <Textarea
                              value={feedbackContent}
                              onChange={(e) => setFeedbackContent(e.target.value)}
                              placeholder="Write constructive feedback for the candidate..."
                              rows={6}
                              className={`min-h-[150px] ${
                                feedbackContent.length < 200 ? "border-red-300" : ""
                              }`}
                            />
                            <p
                              className={`text-xs mt-1 ${
                                feedbackContent.length < 200 ? "text-red-500" : "text-gray-500"
                              }`}
                            >
                              {feedbackContent.length}/200 characters minimum
                            </p>
                          </div>

                          <div>
                            <Label>Basic Skill Ratings</Label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                              {skillRatings.slice(0, 4).map((rating) => (
                                <div key={rating.skillId} className="space-y-2">
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium">{rating.skillName}</span>
                                    <span className="flex items-center text-sm text-gray-500">
                                      {Array.from({ length: rating.rating }).map((_, i) => (
                                        <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                      ))}
                                    </span>
                                  </div>
                                  <Slider
                                    value={[rating.rating]}
                                    onValueChange={(value) =>
                                      updateSkillRating(rating.skillId, "rating", value[0])
                                    }
                                    max={5}
                                    min={1}
                                    step={1}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        </TabsContent>

                        {/* Detailed Feedback */}
                        <TabsContent value="detailed" className="space-y-6 mt-6">
                          {useAISuggestion && (
                            <Card className="border-blue-200 bg-blue-50">
                              <CardContent className="p-4">
                                <div className="flex items-center space-x-2 mb-2">
                                  <Sparkles className="h-4 w-4 text-blue-600" />
                                  <span className="text-sm font-medium text-blue-800">
                                    AI Generated Suggestion
                                  </span>
                                </div>
                                <p className="text-sm text-blue-700">
                                  This feedback was generated based on assessment data and can be
                                  edited.
                                </p>
                              </CardContent>
                            </Card>
                          )}

                          <div>
                            <Label>Detailed Skill Ratings</Label>
                            <div className="space-y-4 mt-4">
                              {Object.entries(SKILL_CATEGORIES).map(([categoryKey, category]) => {
                                const categorySkills = skillRatings.filter(
                                  (r) => r.category === categoryKey
                                );
                                if (categorySkills.length === 0) return null;

                                return (
                                  <Card key={categoryKey}>
                                    <CardHeader className="pb-3">
                                      <CardTitle className="text-sm flex items-center">
                                        <span className="mr-2">{category.icon}</span>
                                        {category.name}
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                      {categorySkills.map((rating) => (
                                        <div key={rating.skillId} className="space-y-2">
                                          <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium">
                                              {rating.skillName}
                                            </span>
                                            <span className="flex items-center text-sm text-gray-500">
                                              {Array.from({ length: rating.rating }).map((_, i) => (
                                                <Star
                                                  key={i}
                                                  className="h-4 w-4 text-yellow-500 fill-yellow-500"
                                                />
                                              ))}
                                            </span>
                                          </div>
                                          <Slider
                                            value={[rating.rating]}
                                            onValueChange={(value) =>
                                              updateSkillRating(rating.skillId, "rating", value[0])
                                            }
                                            max={5}
                                            min={1}
                                            step={1}
                                          />
                                          <Textarea
                                            value={rating.comment || ""}
                                            onChange={(e) =>
                                              updateSkillRating(rating.skillId, "comment", e.target.value)
                                            }
                                            placeholder="Optional comment for this skill..."
                                            rows={2}
                                            className="text-sm"
                                          />
                                        </div>
                                      ))}
                                    </CardContent>
                                  </Card>
                                );
                              })}
                            </div>
                          </div>

                          <div>
                            <Label>Additional Notes (Internal)</Label>
                            <Textarea
                              value={notes}
                              onChange={(e) => setNotes(e.target.value)}
                              placeholder="Internal notes for future reference..."
                              rows={3}
                              className="mt-1"
                            />
                          </div>

                          <div className="flex items-center space-x-2">
                            <Checkbox id="export-growth" />
                            <Label htmlFor="export-growth" className="text-sm">
                              Export skill gaps to candidate's Growth Center
                            </Label>
                          </div>
                        </TabsContent>

                        {/* Actions */}
                        <div className="flex justify-between pt-6 border-t">
                          <Button variant="outline">Save Draft</Button>
                          <Button
                            onClick={handleSaveFeedback}
                            disabled={feedbackContent.length < 200 || !rejectionReason}
                            className="bg-blue-600 text-white hover:bg-blue-700"
                          >
                            <Send className="h-4 w-4 mr-2" />
                            Save & Send Feedback
                          </Button>
                        </div>
                      </Tabs>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {sortedCandidates.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-400" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">All caught up!</h3>
            <p className="text-gray-600 mb-4">
              No pending feedbacks at the moment. Great job staying on top of candidate
              communication!
            </p>
            <Button>
              Go to Dashboard
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
