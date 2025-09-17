import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Textarea } from "../../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { 
  Sparkles,
  Check,
  X,
  Edit,
  RefreshCw,
  Brain,
  Target,
  TrendingUp,
  Star,
  MessageSquare
} from "lucide-react";
import { mockAISuggestions } from "./mockData";
import { AI_SUGGESTION_STYLES, FEEDBACK_TONES } from "./constants";

interface AISuggestion {
  id: string;
  candidateName: string;
  jobTitle: string;
  suggestionText: string;
  confidence: number;
  skillsAnalyzed: string[];
  suggestedRatings: Record<string, number>;
  evidencePoints: string[];
  generatedAt: string;
  status?: 'pending' | 'accepted' | 'edited' | 'rejected';
}

export function AISuggestions() {
  const [suggestions, setSuggestions] = useState<AISuggestion[]>(
    mockAISuggestions.map(s => ({ ...s, status: 'pending' }))
  );
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [suggestionStyle, setSuggestionStyle] = useState('constructive');
  const [feedbackTone, setFeedbackTone] = useState('professional');

  const handleAcceptSuggestion = (id: string) => {
    setSuggestions(prev => prev.map(s => 
      s.id === id ? { ...s, status: 'accepted' } : s
    ));
  };

  const handleRejectSuggestion = (id: string) => {
    setSuggestions(prev => prev.map(s => 
      s.id === id ? { ...s, status: 'rejected' } : s
    ));
  };

  const handleEditSuggestion = (id: string) => {
    const suggestion = suggestions.find(s => s.id === id);
    if (suggestion) {
      setEditingId(id);
      setEditText(suggestion.suggestionText);
    }
  };

  const handleSaveEdit = (id: string) => {
    setSuggestions(prev => prev.map(s => 
      s.id === id ? { ...s, suggestionText: editText, status: 'edited' } : s
    ));
    setEditingId(null);
    setEditText('');
  };

  const handleRegenerateSuggestion = (id: string) => {
    // Simulate regenerating suggestion
    const newSuggestions = [
      "This updated suggestion provides more specific feedback based on the latest assessment data and considers the candidate's unique background.",
      "The regenerated feedback focuses on constructive growth areas while acknowledging the candidate's demonstrated strengths.",
      "This refined suggestion incorporates a more personalized approach based on the specific role requirements and candidate performance."
    ];
    
    const randomSuggestion = newSuggestions[Math.floor(Math.random() * newSuggestions.length)];
    
    setSuggestions(prev => prev.map(s => 
      s.id === id ? { 
        ...s, 
        suggestionText: randomSuggestion,
        confidence: Math.floor(Math.random() * 20) + 80,
        generatedAt: new Date().toISOString(),
        status: 'pending'
      } : s
    ));
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600 bg-green-100';
    if (confidence >= 75) return 'text-blue-600 bg-blue-100';
    if (confidence >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'Pending Review', color: 'bg-yellow-100 text-yellow-800' },
      accepted: { label: 'Accepted', color: 'bg-green-100 text-green-800' },
      edited: { label: 'Edited', color: 'bg-blue-100 text-blue-800' },
      rejected: { label: 'Rejected', color: 'bg-red-100 text-red-800' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    
    return (
      <Badge variant="outline" className={config.color}>
        {config.label}
      </Badge>
    );
  };

  const pendingSuggestions = suggestions.filter(s => s.status === 'pending');
  const processedSuggestions = suggestions.filter(s => s.status !== 'pending');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">AI Suggestions</h2>
          <p className="text-gray-600">
            AI-generated feedback suggestions to accelerate your review process
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Regenerate All
          </Button>
        </div>
      </div>

      {/* AI Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Brain className="h-5 w-5 mr-2" />
            AI Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Suggestion Style</label>
              <Select value={suggestionStyle} onValueChange={setSuggestionStyle}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(AI_SUGGESTION_STYLES).map(([key, style]) => (
                    <SelectItem key={key} value={key}>
                      {style.label} - {style.description}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Feedback Tone</label>
              <Select value={feedbackTone} onValueChange={setFeedbackTone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(FEEDBACK_TONES).map(([key, tone]) => (
                    <SelectItem key={key} value={key}>
                      {tone.label} - {tone.description}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingSuggestions.length}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Accepted</p>
                <p className="text-2xl font-bold text-green-600">
                  {suggestions.filter(s => s.status === 'accepted').length}
                </p>
              </div>
              <Check className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Edited</p>
                <p className="text-2xl font-bold text-blue-600">
                  {suggestions.filter(s => s.status === 'edited').length}
                </p>
              </div>
              <Edit className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Confidence</p>
                <p className="text-2xl font-bold text-purple-600">
                  {Math.round(suggestions.reduce((acc, s) => acc + s.confidence, 0) / suggestions.length)}%
                </p>
              </div>
              <Target className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Suggestions */}
      {pendingSuggestions.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Pending Review ({pendingSuggestions.length})</h3>
          
          {pendingSuggestions.map((suggestion) => (
            <Card key={suggestion.id} className="border-yellow-200 bg-yellow-50">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop" />
                      <AvatarFallback>{suggestion.candidateName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{suggestion.candidateName}</h4>
                      <p className="text-sm text-gray-600">{suggestion.jobTitle}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Badge className={`${getConfidenceColor(suggestion.confidence)} px-2 py-1`}>
                      <Sparkles className="h-3 w-3 mr-1" />
                      {suggestion.confidence}% confidence
                    </Badge>
                    {getStatusBadge(suggestion.status || 'pending')}
                  </div>
                </div>

                {editingId === suggestion.id ? (
                  <div className="space-y-4">
                    <Textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="min-h-[120px]"
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleSaveEdit(suggestion.id)}>
                        Save Changes
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 border">
                      <p className="text-sm leading-relaxed">{suggestion.suggestionText}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium mb-2 text-sm">Skills Analyzed</h5>
                        <div className="flex flex-wrap gap-1">
                          {suggestion.skillsAnalyzed.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium mb-2 text-sm">Suggested Ratings</h5>
                        <div className="space-y-1">
                          {Object.entries(suggestion.suggestedRatings).map(([skill, rating]) => (
                            <div key={skill} className="flex justify-between text-xs">
                              <span>{skill}</span>
                              <span className="flex items-center">
                                {rating}/5
                                <div className="ml-2 flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star 
                                      key={i} 
                                      className={`h-3 w-3 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                                    />
                                  ))}
                                </div>
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="font-medium mb-2 text-sm">Evidence Points</h5>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {suggestion.evidencePoints.map((point, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t">
                      <div className="text-xs text-gray-500">
                        Generated {new Date(suggestion.generatedAt).toLocaleDateString()}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleRegenerateSuggestion(suggestion.id)}
                        >
                          <RefreshCw className="h-4 w-4 mr-1" />
                          Regenerate
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleEditSuggestion(suggestion.id)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleRejectSuggestion(suggestion.id)}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleAcceptSuggestion(suggestion.id)}
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Accept
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Processed Suggestions */}
      {processedSuggestions.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Recently Processed</h3>
          
          {processedSuggestions.slice(0, 5).map((suggestion) => (
            <Card key={suggestion.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop" />
                      <AvatarFallback>{suggestion.candidateName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-sm">{suggestion.candidateName}</h4>
                      <p className="text-xs text-gray-600">{suggestion.jobTitle}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Badge className={`${getConfidenceColor(suggestion.confidence)} text-xs px-2 py-1`}>
                      {suggestion.confidence}%
                    </Badge>
                    {getStatusBadge(suggestion.status || 'pending')}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {suggestions.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Sparkles className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No AI suggestions available</h3>
            <p className="text-gray-600 mb-4">
              AI suggestions will appear here when candidates are rejected and require feedback.
            </p>
            <Button>
              <RefreshCw className="h-4 w-4 mr-2" />
              Check for New Suggestions
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}