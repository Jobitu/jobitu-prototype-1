import React, { useMemo, useState } from "react";
import { Card, CardContent } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Progress } from "../../ui/progress";
import { Skeleton } from "../../ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { 
  Search,
  Plus,
  Eye,
  Copy,
  MoreHorizontal,
  BarChart3
} from "lucide-react";
import { mockAssessments, typeIcons, difficultyColors, getStatusBadge } from "./constants.tsx";

interface AllAssessmentsProps {
  onCreateAssessment: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  typeFilter: string;
  setTypeFilter: (type: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  assessmentSubTab: string;
  setAssessmentSubTab: (tab: string) => void;
  isLoading: boolean;
}

export function AllAssessments({ 
  onCreateAssessment,
  searchQuery,
  setSearchQuery,
  typeFilter,
  setTypeFilter,
  statusFilter,
  setStatusFilter,
  assessmentSubTab,
  setAssessmentSubTab,
  isLoading
}: AllAssessmentsProps) {
  const [sortBy, setSortBy] = useState<'relevance' | 'candidates' | 'avgScore'>('relevance');

  const { filteredAssessments, tabCounts, isFilterActive } = useMemo(() => {
    const ongoingStatuses = new Set(['ongoing', 'published']);
    const ongoingCount = mockAssessments.filter(a => ongoingStatuses.has(a.status)).length;
    const completedCount = mockAssessments.filter(a => a.status === 'completed').length;

    const items = mockAssessments
      .filter(assessment => {
        const matchesSearch = assessment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              assessment.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = typeFilter === 'all' || assessment.type === typeFilter;
        const matchesStatus = statusFilter === 'all' || assessment.status === statusFilter;
        const matchesSubTab = assessmentSubTab === 'ongoing'
          ? (ongoingStatuses.has(assessment.status))
          : assessment.status === 'completed';
        return matchesSearch && matchesType && matchesStatus && matchesSubTab;
      });

    return {
      filteredAssessments: items,
      tabCounts: { ongoing: ongoingCount, completed: completedCount },
      isFilterActive: !!(searchQuery || (typeFilter !== 'all') || (statusFilter !== 'all'))
    };
  }, [assessmentSubTab, searchQuery, statusFilter, typeFilter]);

  const sortedAssessments = useMemo(() => {
    const copy = [...filteredAssessments];
    if (sortBy === 'candidates') {
      copy.sort((a, b) => (b.candidatesCompleted || 0) - (a.candidatesCompleted || 0));
    } else if (sortBy === 'avgScore') {
      copy.sort((a, b) => (b.averageScore || 0) - (a.averageScore || 0));
    }
    return copy;
  }, [filteredAssessments, sortBy]);

  return (
    <div className="space-y-6">
      {/* Sub-header */}
      <div className="md:sticky top-0 z-20 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 py-2 border-b">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search assessments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full lg:w-80"
            />
          </div>
          <div className="flex gap-2 items-center">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="coding">Coding</SelectItem>
                <SelectItem value="case-study">Case Study</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="ongoing">Ongoing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={(v) => setSortBy(v as any)}>
              <SelectTrigger className="w-44">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Sort: Relevance</SelectItem>
                <SelectItem value="candidates">Sort: Candidates</SelectItem>
                <SelectItem value="avgScore">Sort: Avg Score</SelectItem>
              </SelectContent>
            </Select>
            {isFilterActive && (
              <Button
                variant="ghost"
                onClick={() => {
                  setSearchQuery('');
                  setTypeFilter('all');
                  setStatusFilter('all');
                }}
              >
                Clear filters
              </Button>
            )}
          </div>
        </div>
        <Button onClick={onCreateAssessment} className="bg-black text-white">
          <Plus className="h-4 w-4 mr-2" />
          Create New
        </Button>
      </div>

      {/* Secondary tabs */}
      <div className="border-b">
        <div className="flex space-x-8">
          {['ongoing', 'completed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setAssessmentSubTab(tab)}
              className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                assessmentSubTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <span className="flex items-center gap-2">
                {tab}
                <span className="inline-flex items-center justify-center text-xs rounded-full bg-gray-100 text-gray-700 px-2 py-0.5">
                  {tab === 'ongoing' ? tabCounts.ongoing : tabCounts.completed}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Assessments Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-6 w-3/4 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3 mb-4" />
                <div className="flex justify-between">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-8 w-16" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredAssessments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedAssessments.map((assessment) => (
            <Card key={assessment.id} className="relative hover:shadow-lg transition-all duration-200 border rounded-lg">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    {typeIcons[assessment.type]}
                    <Badge variant="outline" className={difficultyColors[assessment.difficulty]}>
                      {assessment.difficulty}
                    </Badge>
                  </div>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {assessment.status === 'draft' && (
                  <Badge variant="outline" className="absolute top-3 right-3 bg-yellow-50 border-yellow-200 text-yellow-800">
                    Draft
                  </Badge>
                )}
                
                <h3 className="font-semibold mb-2">{assessment.title}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{assessment.description}</p>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Status</span>
                    {getStatusBadge(assessment.status)}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Duration</span>
                      <p className="font-medium">{assessment.duration}min</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Candidates</span>
                      <p className="font-medium">{assessment.candidatesCompleted}</p>
                    </div>
                  </div>

                  {assessment.candidatesCompleted > 0 && (
                    <div className="text-sm">
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">Avg Score</span>
                        <span className="font-medium">{assessment.averageScore}%</span>
                      </div>
                      <Progress value={assessment.averageScore} className="h-2" />
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-1">
                    {assessment.skillTags.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {assessment.skillTags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{assessment.skillTags.length - 3} more
                      </Badge>
                    )}
                  </div>
                  <div className="pt-4 mt-2 border-t flex items-center justify-between">
                    <Button variant="outline" size="sm">
                      Open
                    </Button>
                    <div className="flex items-center gap-2">
                      {assessment.candidatesCompleted > 0 && (
                        <Button variant="ghost" size="sm">
                          <BarChart3 className="h-4 w-4 mr-1" />
                          Results
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No assessments found</h3>
          <p className="text-gray-600 mb-4">
            {searchQuery || typeFilter !== 'all' || statusFilter !== 'all'
              ? 'Try adjusting your search or filters'
              : 'Get started by creating your first assessment'}
          </p>
          <Button onClick={onCreateAssessment}>
            <Plus className="h-4 w-4 mr-2" />
            Create New Assessment
          </Button>
        </div>
      )}
    </div>
  );
}