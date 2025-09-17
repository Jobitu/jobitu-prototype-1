import React from 'react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { 
  Search,
  Mail,
  Star,
  Archive,
  Trash2,
  Reply,
  Forward,
  MoreHorizontal,
  Building,
  Calendar,
  FileText,
  Zap,
  CheckCircle,
  AlertTriangle,
  RotateCcw,
  Bell,
  Newspaper,
  X,
  Filter,
  SlidersHorizontal,
  Bookmark,
  ChevronRight
} from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  senderAvatar?: string;
  senderCompany?: string;
  subject: string;
  preview: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  isStarred: boolean;
  type: 'application' | 'interview' | 'rejection' | 'offer' | 'general' | 'ai' | 'system';
  jobTitle?: string;
  category?: 'employers' | 'jobitu';
  isSelected?: boolean;
}

interface NewsItem {
  id: string;
  headline: string;
  preview: string;
  content: string;
  timestamp: string;
  source: string;
  category: string;
  isRead: boolean;
  link?: string;
}

const mockInboxMessages: Message[] = [
  {
    id: '1',
    sender: 'Sarah Wilson',
    senderAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop',
    senderCompany: 'TechFlow Inc.',
    subject: 'Interview Invitation - Senior Frontend Developer',
    preview: 'We would like to invite you for a technical interview...',
    content: `Dear Alex,\n\nThank you for your application for the Senior Frontend Developer position at TechFlow Inc. We were impressed by your background and would like to invite you for a technical interview.\n\nThe interview will consist of:\n• Technical discussion (45 minutes)\n• Coding challenge (60 minutes)\n• Team culture fit (30 minutes)\n\nWe have the following time slots available:\n• Monday, January 22nd at 2:00 PM PST\n• Tuesday, January 23rd at 10:00 AM PST\n• Wednesday, January 24th at 3:00 PM PST\n\nPlease reply with your preferred time slot. The interview will be conducted via Google Meet.\n\nLooking forward to speaking with you!\n\nBest regards,\nSarah Wilson\nSenior Talent Acquisition Partner\nTechFlow Inc.`,
    timestamp: '2 hours ago',
    isRead: false,
    isStarred: true,
    type: 'interview',
    jobTitle: 'Senior Frontend Developer',
    category: 'employers'
  },
  {
    id: '2',
    sender: 'Michael Chen',
    senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    senderCompany: 'StartupX',
    subject: 'Application Update - Product Manager Role',
    preview: 'Thank you for your interest in the Product Manager position...',
    content: `Dear Alex,\n\nThank you for your application for the Product Manager position at StartupX.\n\nAfter careful review of your application, we have decided to move forward with other candidates whose experience more closely aligns with our current needs.\n\nWe were particularly impressed by your technical background and problem-solving approach. We encourage you to apply for future opportunities that may be a better fit for your skill set.\n\nWe have saved your profile and will reach out if similar positions become available.\n\nThank you again for your interest in StartupX.\n\nBest regards,\nMichael Chen\nHead of Product\nStartupX`,
    timestamp: '1 day ago',
    isRead: true,
    isStarred: false,
    type: 'rejection',
    jobTitle: 'Product Manager',
    category: 'employers'
  },
  {
    id: '3',
    sender: 'Jobitu Support',
    subject: 'Profile Optimization Tips',
    preview: 'Boost your profile visibility with these recommendations...',
    content: `Hi Alex!\n\nWe noticed your profile could benefit from some optimizations to increase your visibility to recruiters:\n\n• Add 2-3 more skills to reach the recommended minimum\n• Upload a professional headshot (profiles with photos get 40% more views)\n• Complete your "About Me" section\n• Add at least one work sample or project\n\nThese changes could increase your profile views by up to 60%!\n\nNeed help? Our AI Career Coach can guide you through these optimizations.\n\nBest regards,\nThe Jobitu Team`,
    timestamp: '2 days ago',
    isRead: false,
    isStarred: false,
    type: 'general',
    category: 'jobitu'
  }
];

const mockArchivedMessages: Message[] = [
  {
    id: 'a1',
    sender: 'Jessica Rodriguez',
    senderAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    senderCompany: 'DesignCorp',
    subject: 'Application Received - UX Designer',
    preview: 'We have received your application and will review it shortly...',
    content: `Hi Alex,\n\nThank you for applying to the UX Designer position at DesignCorp.\n\nWe have received your application and our team is currently reviewing all submissions. We will be in touch within the next 5-7 business days with an update on your application status.\n\nIn the meantime, feel free to connect with us on LinkedIn to stay updated on company news and culture.\n\nBest regards,\nJessica Rodriguez\nTalent Acquisition Specialist\nDesignCorp`,
    timestamp: '2 weeks ago',
    isRead: true,
    isStarred: false,
    type: 'application',
    jobTitle: 'UX Designer',
    category: 'employers'
  }
];

const mockTrashMessages: Message[] = [
  {
    id: 't1',
    sender: 'Spam Company',
    subject: 'Amazing Opportunity - Too Good to Be True!',
    preview: 'Make $5000 a week working from home...',
    content: 'This is clearly spam content...',
    timestamp: '1 week ago',
    isRead: true,
    isStarred: false,
    type: 'general',
    category: 'employers'
  }
];

const mockSystemNotifications: Message[] = [
  {
    id: 's1',
    sender: 'Jobitu System',
    subject: 'New Job Match Alert',
    preview: 'We found 3 new jobs that match your criteria...',
    content: `Hi Alex!\n\n🎯 We found 3 new job matches for you:\n\n1. Senior React Developer at TechCorp (94% match)\n2. Frontend Lead at StartupHub (91% match)\n3. Full Stack Engineer at InnovativeLab (87% match)\n\nThese positions match your skills in React, TypeScript, and Node.js.\n\nView all matches in your dashboard or adjust your job preferences.\n\nHappy job hunting!\nJobitu Matching System`,
    timestamp: '3 hours ago',
    isRead: false,
    isStarred: false,
    type: 'system',
    category: 'jobitu'
  },
  {
    id: 's2',
    sender: 'Jobitu System',
    subject: 'Profile View Milestone',
    preview: 'Congratulations! Your profile reached 100 views this month...',
    content: `Congratulations Alex! 🎉\n\nYour profile has been viewed 100 times this month - that's a 45% increase from last month!\n\nHere's what's driving the interest:\n• Your React and TypeScript skills are in high demand\n• Your recent project updates caught recruiters' attention\n• Your profile completeness score of 85% puts you ahead of 70% of candidates\n\nKeep up the great work!\n\nJobitu Analytics Team`,
    timestamp: '1 day ago',
    isRead: true,
    isStarred: true,
    type: 'system',
    category: 'jobitu'
  }
];

const mockNews: NewsItem[] = [
  {
    id: 'n1',
    headline: 'Remote Work Trends in 2024: What Job Seekers Need to Know',
    preview: 'Latest survey reveals 78% of companies now offer hybrid or fully remote positions...',
    content: `A comprehensive survey of 2,000 companies reveals that remote work continues to evolve in 2024, with new trends emerging that job seekers should be aware of.\n\nKey findings:\n• 78% of companies offer hybrid or remote positions\n• Remote roles show 23% higher application rates\n• Top remote-friendly industries: Tech, Marketing, Finance\n• Skills in demand: Communication, Self-management, Digital collaboration\n\nExpert advice: Highlight your remote work experience and digital collaboration tools proficiency in your applications.`,
    timestamp: '2 hours ago',
    source: 'Career Insights',
    category: 'Industry Trends',
    isRead: false,
    link: '#'
  },
  {
    id: 'n2',
    headline: 'AI Skills Gap: How to Future-Proof Your Career',
    preview: 'Companies report 67% increase in AI-related job postings, but talent shortage remains...',
    content: `As AI continues to transform industries, the demand for AI-literate professionals has skyrocketed, with a 67% increase in AI-related job postings over the past year.\n\nMost in-demand AI skills:\n• Machine Learning fundamentals\n• Data analysis and interpretation\n• AI ethics and responsible AI\n• Prompt engineering\n• AI tool integration\n\nCareer tip: You don't need to become an AI engineer. Focus on how AI can enhance your existing role and learn to work alongside AI tools effectively.`,
    timestamp: '1 day ago',
    source: 'Tech Career Weekly',
    category: 'Skills Development',
    isRead: false,
    link: '#'
  },
  {
    id: 'n3',
    headline: 'Salary Negotiation Success: Data-Driven Strategies',
    preview: 'New research shows candidates who negotiate earn 18% more on average...',
    content: `Recent research from 10,000 job offers reveals that candidates who negotiate their initial offer earn 18% more on average than those who accept the first offer.\n\nEffective negotiation strategies:\n• Research market rates using multiple sources\n• Negotiate total compensation, not just base salary\n• Time your negotiation after receiving a written offer\n• Focus on value you bring, not personal needs\n• Consider non-salary benefits\n\nRemember: 84% of employers expect candidates to negotiate and often leave room in their initial offers.`,
    timestamp: '3 days ago',
    source: 'Salary Insights',
    category: 'Career Growth',
    isRead: true,
    link: '#'
  }
];

interface CandidateInboxPageProps {
  activeTab?: string;
}

export function CandidateInboxPage({ activeTab = 'inbox' }: CandidateInboxPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [replyText, setReplyText] = useState('');
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  const [messageFilters, setMessageFilters] = useState({
    employers: true,
    jobitu: true,
    types: {
      application: true,
      interview: true,
      rejection: true,
      offer: true,
      general: true,
      ai: true,
      system: true,
    } as Record<Message['type'], boolean>,
    unreadOnly: false,
    starredOnly: false,
    dateRange: 'any' as 'any' | '24h' | '7d' | '30d',
    sortBy: 'newest' as 'newest' | 'oldest',
  });

  // Combine all messages for search functionality
  const [allMessages] = useState({
    inbox: mockInboxMessages,
    archived: mockArchivedMessages,
    trash: mockTrashMessages,
    system: mockSystemNotifications
  });

  const [allNews] = useState(mockNews);

  const getCurrentMessages = () => {
    switch (activeTab) {
      case 'archived':
        return allMessages.archived;
      case 'trash':
        return allMessages.trash;
      case 'system-notifications':
        return allMessages.system;
      default:
        return allMessages.inbox;
    }
  };

  const getFilteredMessages = () => {
    let messages = getCurrentMessages();
    
    // Apply category filters
    if (activeTab === 'inbox' || activeTab === 'archived') {
      messages = messages.filter(msg => {
        if (!messageFilters.employers && msg.category === 'employers') return false;
        if (!messageFilters.jobitu && msg.category === 'jobitu') return false;
        return true;
      });
    }
    
    // Apply type filters (only when any type is turned off)
    const enabledTypes = Object.entries(messageFilters.types)
      .filter(([, v]) => v)
      .map(([k]) => k) as Message['type'][];
    if (enabledTypes.length > 0 && enabledTypes.length < 7) {
      messages = messages.filter(msg => enabledTypes.includes(msg.type));
    }

    // Unread / Starred quick filters
    if (messageFilters.unreadOnly) {
      messages = messages.filter(msg => !msg.isRead);
    }
    if (messageFilters.starredOnly) {
      messages = messages.filter(msg => msg.isStarred);
    }

    // Date range quick filter (best-effort parsing for mock timestamps like "2 hours ago", "1 day ago", "2 days ago")
    const withinRange = (ts: string) => {
      const hours = (() => {
        const m = ts.toLowerCase();
        if (m.includes('hour')) {
          const n = parseInt(m, 10);
          return isNaN(n) ? 0 : n;
        }
        if (m.includes('day')) {
          const n = parseInt(m, 10);
          return isNaN(n) ? 24 : n * 24;
        }
        if (m.includes('week')) {
          const n = parseInt(m, 10);
          return isNaN(n) ? 24 * 7 : n * 24 * 7;
        }
        return 24 * 365; // treat unknown as old
      })();
      if (messageFilters.dateRange === '24h') return hours <= 24;
      if (messageFilters.dateRange === '7d') return hours <= 24 * 7;
      if (messageFilters.dateRange === '30d') return hours <= 24 * 30;
      return true; // 'any'
    };
    if (messageFilters.dateRange !== 'any') {
      messages = messages.filter(msg => withinRange(msg.timestamp));
    }
    
    // Apply search filter
    if (searchQuery) {
      messages = messages.filter(msg =>
        msg.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.preview.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    const recencyScore = (ts: string) => {
      const m = ts.toLowerCase();
      if (m.includes('hour')) {
        const n = parseInt(m, 10);
        return isNaN(n) ? 0 : n; // smaller is newer
      }
      if (m.includes('day')) {
        const n = parseInt(m, 10);
        return isNaN(n) ? 48 : n * 24;
      }
      if (m.includes('week')) {
        const n = parseInt(m, 10);
        return isNaN(n) ? 24 * 14 : n * 24 * 7;
      }
      return 24 * 365;
    };
    messages = [...messages].sort((a, b) => {
      const da = recencyScore(a.timestamp);
      const db = recencyScore(b.timestamp);
      return messageFilters.sortBy === 'newest' ? da - db : db - da;
    });

    return messages;
  };

  const getFilteredNews = () => {
    if (!searchQuery) return allNews;
    return allNews.filter(news =>
      news.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.preview.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const handleSelectAll = () => {
    const messages = getFilteredMessages();
    if (selectedMessages.length === messages.length) {
      setSelectedMessages([]);
    } else {
      setSelectedMessages(messages.map(msg => msg.id));
    }
  };

  const handleSelectMessage = (messageId: string) => {
    setSelectedMessages(prev =>
      prev.includes(messageId)
        ? prev.filter(id => id !== messageId)
        : [...prev, messageId]
    );
  };

  const handleArchiveSelected = () => {
    console.log('Archiving messages:', selectedMessages);
    setSelectedMessages([]);
  };

  const handleDeleteSelected = () => {
    console.log('Deleting messages:', selectedMessages);
    setSelectedMessages([]);
  };

  const handleMarkAllAsRead = () => {
    console.log('Marking all as read');
  };

  const handleRestoreMessage = (messageId: string) => {
    console.log('Restoring message:', messageId);
  };

  const handlePermanentDelete = (messageId: string) => {
    console.log('Permanently deleting message:', messageId);
  };

  const getMessageIcon = (type: Message['type']) => {
    switch (type) {
      case 'interview':
        return <Calendar className="h-4 w-4 text-green-600" />;
      case 'offer':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'rejection':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'application':
        return <FileText className="h-4 w-4 text-blue-600" />;
      case 'ai':
        return <Zap className="h-4 w-4 text-purple-600" />;
      case 'system':
        return <Bell className="h-4 w-4 text-orange-600" />;
      default:
        return <Mail className="h-4 w-4 text-gray-600" />;
    }
  };

  const renderMessageList = () => {
    const messages = getFilteredMessages();

    if (messages.length === 0) {
      return (
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center text-muted-foreground">
            <Mail className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
            <h3 className="mb-2">No messages found</h3>
            <p className="text-sm">
              {searchQuery ? 'Try adjusting your search terms' : 'No messages in this folder'}
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="flex-1 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            onClick={() => setSelectedMessage(message)}
            className={`p-4 border-b border-border cursor-pointer hover:bg-muted/50 transition-colors ${
              selectedMessage?.id === message.id ? 'bg-accent' : ''
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="flex items-center mt-2">
                <Checkbox
                  checked={selectedMessages.includes(message.id)}
                  onCheckedChange={() => handleSelectMessage(message.id)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              
              <Avatar className="w-10 h-10">
                {message.senderAvatar ? (
                  <AvatarImage src={message.senderAvatar} alt={message.sender} />
                ) : (
                  <AvatarFallback className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
                    {message.sender.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                )}
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <h4 className={`text-sm ${message.isRead ? '' : 'font-semibold'} text-foreground truncate`}>
                      {message.sender}
                    </h4>
                    {message.senderCompany && (
                      <Badge variant="outline" className="text-xs">
                        <Building className="h-3 w-3 mr-1" />
                        {message.senderCompany}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    {message.isStarred && (
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    )}
                    {getMessageIcon(message.type)}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <h5 className={`text-sm ${message.isRead ? 'text-muted-foreground' : 'text-foreground font-medium'} truncate`}>
                    {message.subject}
                  </h5>
                  <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">
                    {message.timestamp}
                  </span>
                </div>

                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                  {message.preview}
                </p>

                <div className="flex items-center justify-between">
                  {message.jobTitle && (
                    <Badge variant="secondary" className="text-xs">
                      {message.jobTitle}
                    </Badge>
                  )}
                  <div className="flex items-center space-x-2">
                    {activeTab === 'trash' && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRestoreMessage(message.id);
                          }}
                        >
                          <RotateCcw className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePermanentDelete(message.id);
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </>
                    )}
                    {(activeTab === 'inbox' || activeTab === 'archived') && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log('Archive message:', message.id);
                          }}
                        >
                          <Archive className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log('Delete message:', message.id);
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                {!message.isRead && (
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 ml-auto" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderNewsList = () => {
    const news = getFilteredNews();

    return (
      <div className="flex-1 overflow-y-auto">
        {news.map((item) => (
          <Card key={item.id} className="m-4 cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedNews(item)}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <Badge variant="outline" className="text-xs">
                  {item.category}
                </Badge>
                <span className="text-xs text-muted-foreground">{item.timestamp}</span>
              </div>
              
              <h3 className={`mb-2 ${!item.isRead ? 'font-semibold' : ''}`}>
                {item.headline}
              </h3>
              
              <p className="text-sm text-muted-foreground mb-3">
                {item.preview}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Source: {item.source}
                </span>
                {!item.isRead && (
                  <div className="w-2 h-2 bg-blue-600 rounded-full" />
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        
        {news.length === 0 && (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center text-muted-foreground">
              <Newspaper className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
              <h3 className="mb-2">No news found</h3>
              <p className="text-sm">Try adjusting your search terms</p>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Message detail view
  const renderMessageDetail = () => {
    if (!selectedMessage) return null;

    return (
      <div className="flex-1 bg-card border-l border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold mb-2">{selectedMessage.subject}</h2>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Avatar className="w-8 h-8">
                    {selectedMessage.senderAvatar ? (
                      <AvatarImage src={selectedMessage.senderAvatar} alt={selectedMessage.sender} />
                    ) : (
                      <AvatarFallback>
                        {selectedMessage.sender.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <p className="font-medium">{selectedMessage.sender}</p>
                    {selectedMessage.senderCompany && (
                      <p className="text-sm text-muted-foreground">{selectedMessage.senderCompany}</p>
                    )}
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">{selectedMessage.timestamp}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Star className={`h-4 w-4 ${selectedMessage.isStarred ? 'text-yellow-500 fill-current' : ''}`} />
              </Button>
              <Button variant="ghost" size="sm">
                <Archive className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Trash2 className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Reply className="h-4 w-4 mr-2" />
                    Reply
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Forward className="h-4 w-4 mr-2" />
                    Forward
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto">
          <div className="prose prose-sm max-w-none">
            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
              {selectedMessage.content}
            </pre>
          </div>
        </div>

        {selectedMessage.type === 'interview' && (
          <div className="p-6 border-t border-border bg-muted/30">
            <div className="space-y-4">
              <h4 className="font-medium">Quick Reply</h4>
              <Textarea
                placeholder="Type your reply..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="min-h-[100px]"
              />
              <div className="flex space-x-2">
                <Button>Send Reply</Button>
                <Button variant="outline">Save Draft</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // News detail view
  const renderNewsDetail = () => {
    if (!selectedNews) return null;

    return (
      <div className="flex-1 bg-card border-l border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <div className="flex items-start justify-between mb-4">
            <div>
              <Badge variant="outline" className="mb-2">{selectedNews.category}</Badge>
              <h2 className="text-xl font-semibold mb-2">{selectedNews.headline}</h2>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>Source: {selectedNews.source}</span>
                <span>{selectedNews.timestamp}</span>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <Bookmark className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto">
          <div className="prose prose-sm max-w-none">
            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
              {selectedNews.content}
            </pre>
          </div>
          {selectedNews.link && (
            <div className="mt-6">
              <Button variant="outline">
                Read Full Article
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 'archived':
        return 'Archived Messages';
      case 'trash':
        return 'Trash';
      case 'news':
        return 'Career News';
      case 'system-notifications':
        return 'System Notifications';
      default:
        return 'Inbox';
    }
  };

  const showNewsView = activeTab === 'news';

  return (
    <div className="flex flex-col h-full">
      <div className="flex">
        {/* Left Panel */}
        <div className="w-1/3 border-r border-border bg-card flex flex-col">
          {/* Search and Actions Header */}
          <div className="p-4 border-b border-border">
            <h2 className="text-lg font-semibold mb-3">{getTabTitle()}</h2>
            <div className="flex items-center space-x-2 mb-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={showNewsView ? "Search news..." : "Search messages..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              {!showNewsView && (activeTab === 'inbox' || activeTab === 'archived') && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <SlidersHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80 p-2">
                    <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">Categories</div>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      <Checkbox
                        id="employers"
                        checked={messageFilters.employers}
                        onCheckedChange={(checked) =>
                          setMessageFilters(prev => ({ ...prev, employers: !!checked }))
                        }
                        className="mr-2"
                      />
                      <label htmlFor="employers" className="text-sm">Employers</label>
                      <Badge variant="secondary" className="ml-auto">
                        {getCurrentMessages().filter(msg => msg.category === 'employers').length}
                      </Badge>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      <Checkbox
                        id="jobitu"
                        checked={messageFilters.jobitu}
                        onCheckedChange={(checked) =>
                          setMessageFilters(prev => ({ ...prev, jobitu: !!checked }))
                        }
                        className="mr-2"
                      />
                      <label htmlFor="jobitu" className="text-sm">Jobitu</label>
                      <Badge variant="secondary" className="ml-auto">
                        {getCurrentMessages().filter(msg => msg.category === 'jobitu').length}
                      </Badge>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />

                    <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">Types</div>
                    {(['application','interview','rejection','offer','general','ai','system'] as Message['type'][]).map((t) => (
                      <DropdownMenuItem key={t} onSelect={(e) => e.preventDefault()}>
                        <Checkbox
                          id={`type-${t}`}
                          checked={messageFilters.types[t]}
                          onCheckedChange={(checked) =>
                            setMessageFilters(prev => ({ ...prev, types: { ...prev.types, [t]: !!checked } }))
                          }
                          className="mr-2"
                        />
                        <label htmlFor={`type-${t}`} className="text-sm capitalize">{t}</label>
                        <Badge variant="secondary" className="ml-auto">
                          {getCurrentMessages().filter(msg => msg.type === t).length}
                        </Badge>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />

                    <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">Quick filters</div>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      <Checkbox
                        id="unreadOnly"
                        checked={messageFilters.unreadOnly}
                        onCheckedChange={(checked) =>
                          setMessageFilters(prev => ({ ...prev, unreadOnly: !!checked }))
                        }
                        className="mr-2"
                      />
                      <label htmlFor="unreadOnly" className="text-sm">Unread only</label>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      <Checkbox
                        id="starredOnly"
                        checked={messageFilters.starredOnly}
                        onCheckedChange={(checked) =>
                          setMessageFilters(prev => ({ ...prev, starredOnly: !!checked }))
                        }
                        className="mr-2"
                      />
                      <label htmlFor="starredOnly" className="text-sm">Starred only</label>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />

                    <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">Date</div>
                    {([
                      { key: 'any', label: 'Any time' },
                      { key: '24h', label: 'Last 24 hours' },
                      { key: '7d', label: 'Last 7 days' },
                      { key: '30d', label: 'Last 30 days' },
                    ] as { key: 'any' | '24h' | '7d' | '30d'; label: string }[]).map(opt => (
                      <DropdownMenuItem
                        key={opt.key}
                        onSelect={(e) => {
                          e.preventDefault();
                          setMessageFilters(prev => ({ ...prev, dateRange: opt.key }));
                        }}
                      >
                        <div className={`h-2 w-2 rounded-full mr-2 ${messageFilters.dateRange === opt.key ? 'bg-primary' : 'border border-muted-foreground/40'}`} />
                        <span className="text-sm">{opt.label}</span>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />

                    <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">Sort</div>
                    {([
                      { key: 'newest', label: 'Newest first' },
                      { key: 'oldest', label: 'Oldest first' },
                    ] as { key: 'newest' | 'oldest'; label: string }[]).map(opt => (
                      <DropdownMenuItem
                        key={opt.key}
                        onSelect={(e) => {
                          e.preventDefault();
                          setMessageFilters(prev => ({ ...prev, sortBy: opt.key }));
                        }}
                      >
                        <div className={`h-2 w-2 rounded-full mr-2 ${messageFilters.sortBy === opt.key ? 'bg-primary' : 'border border-muted-foreground/40'}`} />
                        <span className="text-sm">{opt.label}</span>
                      </DropdownMenuItem>
                    ))}

                    <DropdownMenuSeparator />
                    <div className="flex items-center justify-between px-2 py-1.5">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setMessageFilters({
                          employers: true,
                          jobitu: true,
                          types: { application: true, interview: true, rejection: true, offer: true, general: true, ai: true, system: true },
                          unreadOnly: false,
                          starredOnly: false,
                          dateRange: 'any',
                          sortBy: 'newest',
                        })}
                      >
                        Reset
                      </Button>
                      <Button size="sm" onClick={(e) => e.preventDefault()}>
                        Apply
                      </Button>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            {selectedMessages.length > 0 && !showNewsView && (
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>{selectedMessages.length} selected</span>
                <Button variant="ghost" size="sm" onClick={handleArchiveSelected}>
                  Archive
                </Button>
                <Button variant="ghost" size="sm" onClick={handleDeleteSelected}>
                  Delete
                </Button>
              </div>
            )}

            {activeTab === 'trash' && (
              <div className="mt-3 p-2 bg-orange-50 border border-orange-200 rounded text-xs text-orange-800">
                Messages in Trash will be permanently deleted after 30 days.
              </div>
            )}
          </div>

          {/* Message/News List */}
          {showNewsView ? renderNewsList() : renderMessageList()}
        </div>

        {/* Right Panel - Message/News Detail */}
        {showNewsView ? renderNewsDetail() : renderMessageDetail()}
        
        {/* Default empty state when no message/news selected */}
        {!selectedMessage && !selectedNews && (
          <div className="flex-1 bg-card border-l border-border flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              {showNewsView ? (
                <>
                  <Newspaper className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                  <p>Select a news article to read</p>
                </>
              ) : (
                <>
                  <Mail className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                  <p>Select a message to view</p>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}