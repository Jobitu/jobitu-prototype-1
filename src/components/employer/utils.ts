export const getStatusColor = (status: string) => {
  switch (status) {
    case "active": return "bg-green-100 text-green-800";
    case "paused": return "bg-yellow-100 text-yellow-800";
    case "draft": return "bg-gray-100 text-gray-800";
    case "closed": return "bg-red-100 text-red-800";
    case "applied": return "bg-blue-100 text-blue-800";
    case "reviewed": return "bg-purple-100 text-purple-800";
    case "interviewed": return "bg-orange-100 text-orange-800";
    case "offered": return "bg-green-100 text-green-800";
    case "hired": return "bg-emerald-100 text-emerald-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

export const calculateStats = (jobs: any[]) => {
  const totalApplicants = jobs.reduce((sum, job) => sum + job.applicants, 0);
  const avgMatchScore = Math.round(jobs.reduce((sum, job) => sum + job.matchScore, 0) / jobs.length);
  const activeJobs = jobs.filter(job => job.status === 'active').length;
  
  return { totalApplicants, avgMatchScore, activeJobs };
};