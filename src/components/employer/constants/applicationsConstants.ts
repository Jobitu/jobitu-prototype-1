export const jobTitles = [
  'All Positions', 
  'Senior Frontend Developer', 
  'Product Manager', 
  'UX Designer', 
  'Backend Engineer'
];

export const applicationStatuses = [
  'All Statuses', 
  'New', 
  'Screening', 
  'Assessment', 
  'Interview', 
  'Offer', 
  'Hired', 
  'Rejected', 
  'Withdrawn'
];

export const sourcesFilter = [
  'All Sources', 
  'Job Board', 
  'Direct', 
  'Referral', 
  'Talent Search'
];

export const stageOrder = ['new', 'screening', 'assessment', 'interview', 'offer', 'hired'];

export const statusConfig = {
  new: 'bg-blue-100 text-blue-800',
  screening: 'bg-yellow-100 text-yellow-800',
  assessment: 'bg-purple-100 text-purple-800',
  interview: 'bg-orange-100 text-orange-800',
  offer: 'bg-green-100 text-green-800',
  hired: 'bg-emerald-100 text-emerald-800',
  rejected: 'bg-red-100 text-red-800',
  withdrawn: 'bg-gray-100 text-gray-800'
};

export const sourceConfig = {
  job_board: { label: 'Job Board', class: 'bg-blue-100 text-blue-800' },
  direct: { label: 'Direct', class: 'bg-green-100 text-green-800' },
  referral: { label: 'Referral', class: 'bg-purple-100 text-purple-800' },
  talent_search: { label: 'Talent Search', class: 'bg-orange-100 text-orange-800' }
};

export const artifactStatusConfig = {
  pending: 'bg-yellow-100 text-yellow-800',
  submitted: 'bg-blue-100 text-blue-800',
  scored: 'bg-green-100 text-green-800'
};

export const interviewStatusConfig = {
  scheduled: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800'
};