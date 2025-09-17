import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { 
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  Users,
  Grid3X3,
  List as ListIcon
} from "lucide-react";
import { Interview } from "./types";
import { mockUpcomingInterviews } from "./mockData";
import { formatTime, getTypeIcon } from "./utils";

interface InterviewCalendarProps {
  onCreateInterview?: () => void;
  onViewDetails?: (interview: Interview) => void;
}

export function InterviewCalendar({ onCreateInterview, onViewDetails }: InterviewCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [selectedView, setSelectedView] = useState<'calendar' | 'timeline'>('calendar');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const formatDateHeader = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const navigateToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const current = new Date(startDate);
    
    while (current <= lastDay || current.getDay() !== 0) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
      if (days.length > 42) break;
    }
    
    return days;
  };

  const getInterviewsForDate = (date: Date) => {
    return mockUpcomingInterviews.filter(interview => {
      const interviewDate = new Date(interview.date);
      return interviewDate.toDateString() === date.toDateString();
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const renderCalendarView = () => {
    const days = getDaysInMonth(currentDate);
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
      <Card>
        <CardContent className="p-0">
          {/* Calendar Header */}
          <div className="grid grid-cols-7 border-b">
            {dayNames.map((day) => (
              <div key={day} className="p-4 text-center font-medium text-sm text-muted-foreground border-r last:border-r-0">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7">
            {days.map((day, index) => {
              const interviews = getInterviewsForDate(day);
              const isTodayDate = isToday(day);
              const isCurrentMonthDate = isCurrentMonth(day);
              const isSelected = selectedDate && day.toDateString() === selectedDate.toDateString();

              return (
                <div 
                  key={index} 
                  className={`min-h-[120px] p-2 border-r border-b transition-colors cursor-pointer 
                    ${!isCurrentMonthDate ? 'bg-gray-50 text-muted-foreground' : ''}
                    ${isTodayDate ? 'ring-2 ring-blue-500' : ''}
                    ${isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'}
                  `}
                  onClick={() => setSelectedDate(day)}
                >
                  <div className="text-sm font-medium mb-2 flex items-center justify-center">
                    <span className={`${isTodayDate ? 'bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center' : ''}`}>
                      {day.getDate()}
                    </span>
                  </div>
                  
                  <div className="space-y-1">
                    {interviews.slice(0, 3).map((interview) => (
                      <div 
                        key={interview.id}
                        title={`${interview.candidateName} - ${interview.jobTitle}`}
                        className="bg-blue-50 border border-blue-200 rounded p-1 cursor-pointer hover:bg-blue-100 transition-colors"
                        onClick={() => onViewDetails?.(interview)}
                      >
                        <div className="flex items-center space-x-1">
                          {getTypeIcon(interview.type)}
                          <span className="text-xs font-medium truncate">
                            {formatTime(interview.time)}
                          </span>
                        </div>
                        <p className="text-xs truncate">{interview.candidateName}</p>
                        <p className="text-xs text-muted-foreground truncate">{interview.jobTitle}</p>
                      </div>
                    ))}
                    {interviews.length > 3 && (
                      <div 
                        className="text-xs text-blue-600 cursor-pointer hover:underline"
                        onClick={() => setSelectedDate(day)}
                      >
                        +{interviews.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderTimelineView = () => {
    const upcomingInterviews = mockUpcomingInterviews
      .sort((a, b) => new Date(a.date + ' ' + a.time).getTime() - new Date(b.date + ' ' + b.time).getTime())
      .slice(0, 15);

    return (
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Schedule</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {upcomingInterviews.length === 0 && (
            <div className="text-center py-8">
              <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium text-lg mb-2">No upcoming interviews</h3>
              <p className="text-muted-foreground">Your interview schedule is clear.</p>
            </div>
          )}

          {upcomingInterviews.map((interview, idx) => {
            const interviewDate = new Date(interview.date);
            const prevDate = idx > 0 ? new Date(upcomingInterviews[idx - 1].date) : null;
            const showDateSeparator = !prevDate || interviewDate.toDateString() !== prevDate.toDateString();

            return (
              <div key={interview.id}>
                {showDateSeparator && (
                  <div className="text-sm font-semibold text-muted-foreground mb-2">
                    {interviewDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                  </div>
                )}
                <div 
                  className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => onViewDetails?.(interview)}
                >
                  <div className="flex-shrink-0 text-center">
                    <div className="text-xs text-muted-foreground">{formatTime(interview.time)}</div>
                  </div>
                  
                  <div className="flex-shrink-0">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={interview.candidateAvatar} alt={interview.candidateName} />
                      <AvatarFallback>
                        {interview.candidateName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium truncate">{interview.candidateName}</h4>
                      <Badge variant="secondary" className="text-xs">{interview.jobTitle}</Badge>
                    </div>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        {getTypeIcon(interview.type)}
                        <span className="capitalize">{interview.type}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{interview.duration}m</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{interview.interviewers.length}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-shrink-0">
                    <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Interview Calendar</h3>
          <p className="text-sm text-muted-foreground">View and manage your interview schedule</p>
        </div>
        <div className="flex items-center space-x-2">
          {onCreateInterview && (
            <Button onClick={onCreateInterview}>
              <Plus className="h-4 w-4 mr-2" />
              Schedule Interview
            </Button>
          )}
        </div>
      </div>

      {/* Calendar Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <h2 className="text-lg font-semibold min-w-[200px] text-center">
                  {formatDateHeader(currentDate)}
                </h2>
                <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              <Button variant="outline" size="sm" onClick={navigateToToday}>
                Today
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Select value={viewMode} onValueChange={(value: 'month' | 'week' | 'day') => setViewMode(value)}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Month</SelectItem>
                  <SelectItem value="week">Week (soon)</SelectItem>
                  <SelectItem value="day">Day (soon)</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center border rounded">
                <Button 
                  variant={selectedView === 'calendar' ? 'default' : 'ghost'} 
                  size="sm"
                  onClick={() => setSelectedView('calendar')}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button 
                  variant={selectedView === 'timeline' ? 'default' : 'ghost'} 
                  size="sm"
                  onClick={() => setSelectedView('timeline')}
                  className="rounded-l-none"
                >
                  <ListIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar Content */}
      {selectedView === 'calendar' ? renderCalendarView() : renderTimelineView()}
    </div>
  );
}
