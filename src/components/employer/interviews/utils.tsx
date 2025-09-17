import { Badge } from "../../ui/badge";
import { Video, Phone, MapPin, Calendar as CalendarIcon } from "lucide-react";

export const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  });
};

export const formatTime = (timeStr: string) => {
  const [hours, minutes] = timeStr.split(':');
  const date = new Date();
  date.setHours(parseInt(hours), parseInt(minutes));
  return date.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
};

export const getStatusBadge = (status: string, outcome?: string) => {
  if (status === 'completed') {
    if (outcome === 'hired') return <Badge className="bg-green-100 text-green-800">Hired</Badge>;
    if (outcome === 'rejected') return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
    return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
  }
  if (status === 'cancelled') return <Badge className="bg-gray-100 text-gray-800">Cancelled</Badge>;
  return <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>;
};

export const getTypeIcon = (type: string) => {
  switch (type) {
    case 'online': return <Video className="h-4 w-4 text-blue-500" />;
    case 'phone': return <Phone className="h-4 w-4 text-green-500" />;
    case 'in-person': return <MapPin className="h-4 w-4 text-purple-500" />;
    default: return <CalendarIcon className="h-4 w-4" />;
  }
};