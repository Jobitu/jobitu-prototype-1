import { useState, useCallback, useMemo } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { 
  Bell,
  Calendar,
  MessageSquare,
  FileText,
  User,
  CheckCircle,
  AlertTriangle,
  Clock,
  X,
  Check
} from "lucide-react";

interface Notification {
  id: string;
  type: 'interview' | 'message' | 'application' | 'status' | 'feedback' | 'system';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  avatar?: string;
  actionUrl?: string;
}

interface NotificationsDropdownProps {
  userType: 'candidate' | 'employer';
  onNavigate?: (url: string) => void;
}

const candidateNotifications: Notification[] = [
  {
    id: '1',
    type: 'interview',
    title: 'Interview Scheduled',
    message: 'TechFlow Inc. has scheduled an interview for Senior Frontend Developer position on Jan 25 at 2:00 PM',
    timestamp: '2 hours ago',
    isRead: false,
    avatar: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=150&h=150&fit=crop',
    actionUrl: '/interviews'
  },
  {
    id: '2',
    type: 'message',
    title: 'New Message',
    message: 'Sarah Wilson from TechFlow Inc. sent you a message about your application',
    timestamp: '4 hours ago',
    isRead: false,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop',
    actionUrl: '/inbox'
  },
  {
    id: '3',
    type: 'status',
    title: 'Application Status Updated',
    message: 'Your application for Product Manager at StartupX has been moved to the interview stage',
    timestamp: '1 day ago',
    isRead: true,
    avatar: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop',
    actionUrl: '/applications'
  },
  {
    id: '4',
    type: 'feedback',
    title: 'Feedback Received',
    message: 'You received feedback on your technical assessment from InnovateLab',
    timestamp: '2 days ago',
    isRead: true,
    actionUrl: '/applications'
  }
];

const employerNotifications: Notification[] = [
  {
    id: '1',
    type: 'application',
    title: 'New Application',
    message: 'Sarah Chen applied for Senior Frontend Developer position with 94% match',
    timestamp: '1 hour ago',
    isRead: false,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop',
    actionUrl: '/employer/applications'
  },
  {
    id: '2',
    type: 'application',
    title: 'High-Match Candidate',
    message: 'Michael Rodriguez (89% match) applied for Product Manager role',
    timestamp: '3 hours ago',
    isRead: false,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    actionUrl: '/employer/applications'
  },
  {
    id: '3',
    type: 'interview',
    title: 'Interview Reminder',
    message: 'Interview with Alex Johnson for Senior Frontend Developer in 30 minutes',
    timestamp: '30 minutes ago',
    isRead: false,
    actionUrl: '/employer/interviews'
  },
  {
    id: '4',
    type: 'message',
    title: 'Candidate Message',
    message: 'Emily Davis sent a follow-up message about the UX Designer position',
    timestamp: '2 hours ago',
    isRead: true,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    actionUrl: '/employer/inbox'
  },
  {
    id: '5',
    type: 'system',
    title: 'Job Post Expiring',
    message: 'Your job posting for Full Stack Engineer expires in 3 days',
    timestamp: '1 day ago',
    isRead: true,
    actionUrl: '/employer/jobs'
  }
];

export function NotificationsDropdown({ userType, onNavigate }: NotificationsDropdownProps) {
  const initialNotifications = useMemo(() => 
    userType === 'candidate' ? candidateNotifications : employerNotifications,
    [userType]
  );
  
  const [notifications, setNotifications] = useState(initialNotifications);
  
  const unreadCount = useMemo(() => 
    notifications.filter(n => !n.isRead).length,
    [notifications]
  );

  const getNotificationIcon = useCallback((type: string) => {
    switch (type) {
      case 'interview':
        return <Calendar className="h-4 w-4 text-green-600" />;
      case 'message':
        return <MessageSquare className="h-4 w-4 text-blue-600" />;
      case 'application':
        return <FileText className="h-4 w-4 text-purple-600" />;
      case 'status':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'feedback':
        return <User className="h-4 w-4 text-orange-600" />;
      case 'system':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      default:
        return <Bell className="h-4 w-4 text-gray-600" />;
    }
  }, []);

  const markAsRead = useCallback((notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, isRead: true } : n)
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  }, []);

  const removeNotification = useCallback((notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  }, []);

  const handleNotificationClick = useCallback((notification: Notification) => {
    markAsRead(notification.id);
    if (notification.actionUrl && onNavigate) {
      onNavigate(notification.actionUrl);
    }
  }, [markAsRead, onNavigate]);

  const handleRemoveClick = useCallback((e: React.MouseEvent, notificationId: string) => {
    e.stopPropagation();
    removeNotification(notificationId);
  }, [removeNotification]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white">{unreadCount}</span>
            </div>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-80 p-0">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Notifications</h3>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                <Check className="h-4 w-4 mr-1" />
                Mark all read
              </Button>
            )}
          </div>
          {unreadCount > 0 && (
            <p className="text-sm text-gray-600 mt-1">
              You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* Notifications List */}
        <div className="max-h-96 overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                  !notification.isRead ? 'bg-blue-50/30' : ''
                }`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {notification.avatar ? (
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={notification.avatar} alt="" />
                        <AvatarFallback className="text-xs">
                          {notification.title.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        {getNotificationIcon(notification.type)}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className={`text-sm ${!notification.isRead ? 'font-semibold' : 'font-medium'} text-gray-900`}>
                          {notification.title}
                        </p>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center mt-2 text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          {notification.timestamp}
                        </div>
                      </div>

                      <div className="flex items-center space-x-1 ml-2">
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => handleRemoveClick(e, notification.id)}
                          className="p-1 h-6 w-6 hover:bg-gray-200"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">
              <Bell className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <h3 className="font-medium text-gray-900 mb-1">No notifications</h3>
              <p className="text-sm">You're all caught up!</p>
            </div>
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="p-4 border-t border-gray-200">
            <Button variant="outline" className="w-full" size="sm">
              View All Notifications
            </Button>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}