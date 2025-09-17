import { Badge } from "../../ui/badge";
import { statusColors, statusIcons, statusLabels } from "../constants/applicationConstants";

export interface Application {
  id: string;
  candidateId: string;
  candidateName: string;
  candidateAvatar: string;
  candidateEmail: string;
  candidatePhone: string;
  jobTitle: string;
  appliedDate: string;
  status: 'new' | 'reviewed' | 'shortlisted' | 'interview' | 'rejected' | 'hired';
  matchScore: number;
  experienceScore: number;
  talentScore: number;
  testScore: number;
  location: string;
  experience: string;
  education: string;
  skills: string[];
  resumeUrl: string;
  coverLetter: string;
  salaryExpectation: string;
  availability: string;
}

export const getStatusBadge = (status: string) => {
  const Icon = statusIcons[status as keyof typeof statusIcons];
  return (
    <div className="flex items-center space-x-1">
      <Icon className="h-4 w-4" />
      <Badge className={statusColors[status as keyof typeof statusColors]}>
        {statusLabels[status as keyof typeof statusLabels]}
      </Badge>
    </div>
  );
};

export const filterApplications = (
  applications: Application[],
  searchQuery: string,
  statusFilter: string,
  activeTab: string
) => {
  return applications.filter(application => {
    const matchesSearch = application.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         application.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || application.status === statusFilter;
    const matchesTab = activeTab === 'all' || application.status === activeTab;
    
    return matchesSearch && matchesStatus && matchesTab;
  });
};

export const getTabCount = (applications: Application[], status?: string) => {
  if (!status) return applications.length;
  return applications.filter(app => app.status === status).length;
};