import { Feedback, SkillRating, FeedbackAnalytics, SkillGap } from './types';
import { RATING_SCALE } from './constants';

export const calculateAverageRating = (skillRatings: SkillRating[]): number => {
  if (skillRatings.length === 0) return 0;
  const sum = skillRatings.reduce((acc, rating) => acc + rating.rating, 0);
  return Math.round((sum / skillRatings.length) * 10) / 10;
};

export const getSkillRatingsByCategory = (skillRatings: SkillRating[]) => {
  return skillRatings.reduce((acc, rating) => {
    const category = rating.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(rating);
    return acc;
  }, {} as Record<string, SkillRating[]>);
};

export const getRatingColor = (rating: number): string => {
  const ratingInfo = RATING_SCALE[rating as keyof typeof RATING_SCALE];
  return ratingInfo?.color || 'text-gray-600';
};

export const getRatingLabel = (rating: number): string => {
  const ratingInfo = RATING_SCALE[rating as keyof typeof RATING_SCALE];
  return ratingInfo?.label || 'Unknown';
};

export const formatFeedbackDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) return 'Just now';
  if (diffInHours < 24) return `${diffInHours}h ago`;
  if (diffInHours < 48) return '1 day ago';
  
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
  });
};

export const generateFeedbackSummary = (feedback: Feedback): string => {
  const avgRating = calculateAverageRating(feedback.skillRatings);
  const skillCount = feedback.skillRatings.length;
  const mainSkillGaps = feedback.skillRatings
    .filter(rating => rating.rating <= 2)
    .map(rating => rating.skillName)
    .slice(0, 3);
  
  if (mainSkillGaps.length > 0) {
    return `${skillCount} skills evaluated, avg ${avgRating}/5. Main gaps: ${mainSkillGaps.join(', ')}`;
  }
  
  return `${skillCount} skills evaluated, avg ${avgRating}/5. Generally positive feedback`;
};

export const getSkillGapTrend = (currentPercentage: number, previousPercentage?: number): 'increasing' | 'decreasing' | 'stable' => {
  if (!previousPercentage) return 'stable';
  
  const difference = currentPercentage - previousPercentage;
  if (Math.abs(difference) < 2) return 'stable';
  
  return difference > 0 ? 'increasing' : 'decreasing';
};

export const calculateSkillGapPercentage = (feedbacks: Feedback[], skillName: string): number => {
  const relevantFeedbacks = feedbacks.filter(f => 
    f.skillRatings.some(rating => rating.skillName === skillName)
  );
  
  if (relevantFeedbacks.length === 0) return 0;
  
  const skillGaps = relevantFeedbacks.filter(f =>
    f.skillRatings.some(rating => rating.skillName === skillName && rating.rating <= 2)
  );
  
  return Math.round((skillGaps.length / relevantFeedbacks.length) * 100);
};

export const generateAISuggestion = (
  candidateName: string, 
  jobTitle: string, 
  assessmentData: any
): string => {
  // Simplified AI suggestion generator
  const suggestions = [
    `Based on ${candidateName}'s performance in the ${jobTitle} assessment, consider highlighting their demonstrated strengths while addressing specific skill gaps that emerged during evaluation.`,
    `${candidateName} showed solid foundational knowledge for the ${jobTitle} role, but would benefit from additional experience in key areas identified during the assessment process.`,
    `While ${candidateName} has potential for the ${jobTitle} position, the assessment revealed opportunities for growth in several critical competencies that are essential for success in this role.`
  ];
  
  return suggestions[Math.floor(Math.random() * suggestions.length)];
};

export const exportToGrowthCenter = (feedback: Feedback): { skills: string[]; recommendations: string[] } => {
  const skillGaps = feedback.skillRatings
    .filter(rating => rating.rating <= 2)
    .map(rating => rating.skillName);
  
  const recommendations = skillGaps.map(skill => 
    `Improve ${skill} through targeted learning and practice`
  );
  
  return {
    skills: skillGaps,
    recommendations
  };
};

export const validateFeedbackContent = (content: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (content.length < 50) {
    errors.push('Feedback must be at least 50 characters long');
  }
  
  if (content.length > 2000) {
    errors.push('Feedback must not exceed 2000 characters');
  }
  
  if (!content.includes('Thank you')) {
    errors.push('Consider starting with a thank you message');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const getFeedbackPriority = (
  rejectedAt: string, 
  hasExistingFeedback: boolean,
  assessmentScore?: number
): 'high' | 'medium' | 'low' => {
  const daysSinceRejection = Math.floor(
    (new Date().getTime() - new Date(rejectedAt).getTime()) / (1000 * 60 * 60 * 24)
  );
  
  if (hasExistingFeedback) return 'low';
  
  if (daysSinceRejection > 7) return 'high';
  if (daysSinceRejection > 3) return 'medium';
  
  // High-scoring candidates should get priority feedback
  if (assessmentScore && assessmentScore > 70) return 'high';
  
  return 'medium';
};

export const filterFeedbacks = (feedbacks: Feedback[], filters: any): Feedback[] => {
  return feedbacks.filter(feedback => {
    // Search filter
    if (filters.search && !feedback.candidateName.toLowerCase().includes(filters.search.toLowerCase()) &&
        !feedback.candidateEmail.toLowerCase().includes(filters.search.toLowerCase()) &&
        !feedback.jobTitle.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    
    // Job filter
    if (filters.jobId && filters.jobId !== 'all' && feedback.jobId !== filters.jobId) {
      return false;
    }
    
    // Status filter
    if (filters.status && filters.status !== 'all' && feedback.status !== filters.status) {
      return false;
    }
    
    // Language filter
    if (filters.language && filters.language !== 'all' && feedback.language !== filters.language) {
      return false;
    }
    
    // Owner filter
    if (filters.owner && filters.owner !== 'all' && feedback.owner !== filters.owner) {
      return false;
    }
    
    return true;
  });
};

export const sortFeedbacks = (feedbacks: Feedback[], sortBy: string, sortOrder: 'asc' | 'desc' = 'desc'): Feedback[] => {
  return [...feedbacks].sort((a, b) => {
    let aValue: any = a[sortBy as keyof Feedback];
    let bValue: any = b[sortBy as keyof Feedback];
    
    if (sortBy === 'lastEditedAt' || sortBy === 'createdAt' || sortBy === 'sentAt') {
      aValue = new Date(aValue).getTime();
      bValue = new Date(bValue).getTime();
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
};