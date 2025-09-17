import { 
  AlertCircle,
  Eye,
  Star,
  Calendar,
  CheckCircle,
  XCircle
} from "lucide-react";

export const statusColors = {
  new: 'bg-blue-100 text-blue-800',
  reviewed: 'bg-yellow-100 text-yellow-800',
  shortlisted: 'bg-green-100 text-green-800',
  interview: 'bg-purple-100 text-purple-800',
  rejected: 'bg-red-100 text-red-800',
  hired: 'bg-emerald-100 text-emerald-800'
};

export const statusIcons = {
  new: AlertCircle,
  reviewed: Eye,
  shortlisted: Star,
  interview: Calendar,
  rejected: XCircle,
  hired: CheckCircle
};

export const statusLabels = {
  new: 'New',
  reviewed: 'Reviewed',
  shortlisted: 'Shortlisted',
  interview: 'Interview',
  rejected: 'Rejected',
  hired: 'Hired'
};