import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { 
  Award,
  Star,
  Target,
  TrendingUp,
  Users,
  Code,
  BookOpen,
  Calendar,
  Trophy,
  Medal,
  Zap,
  Lock,
  CheckCircle,
  Clock
} from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: any;
  category: 'Performance' | 'Engagement' | 'Skills' | 'Milestones';
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  dateEarned: string;
  progress?: number;
  maxProgress?: number;
  unlocked: boolean;
  xpReward: number;
}

const mockAchievements: Achievement[] = [
  {
    id: 'ACH-001',
    title: 'Profile Complete',
    description: 'Complete your full profile with all sections',
    icon: CheckCircle,
    category: 'Milestones',
    rarity: 'Common',
    dateEarned: '2024-01-15',
    unlocked: true,
    xpReward: 100
  },
  {
    id: 'ACH-002',
    title: 'First Interview',
    description: 'Successfully complete your first interview',
    icon: Users,
    category: 'Milestones',
    rarity: 'Common',
    dateEarned: '2024-01-20',
    unlocked: true,
    xpReward: 150
  },
  {
    id: 'ACH-003',
    title: 'Skill Master',
    description: 'Score above 90% on 5 skill assessments',
    icon: Code,
    category: 'Skills',
    rarity: 'Rare',
    dateEarned: '2024-02-01',
    unlocked: true,
    xpReward: 300
  },
  {
    id: 'ACH-004',
    title: 'Profile Views Champion',
    description: 'Reach 1000 profile views',
    icon: TrendingUp,
    category: 'Performance',
    rarity: 'Epic',
    dateEarned: '2024-02-15',
    unlocked: true,
    xpReward: 500
  },
  {
    id: 'ACH-005',
    title: 'Learning Enthusiast',
    description: 'Complete 10 learning modules',
    icon: BookOpen,
    category: 'Engagement',
    rarity: 'Rare',
    dateEarned: '2024-03-01',
    progress: 7,
    maxProgress: 10,
    unlocked: false,
    xpReward: 250
  },
  {
    id: 'ACH-006',
    title: 'Consistency King',
    description: 'Log in for 30 consecutive days',
    icon: Calendar,
    category: 'Engagement',
    rarity: 'Epic',
    dateEarned: '',
    progress: 23,
    maxProgress: 30,
    unlocked: false,
    xpReward: 400
  },
  {
    id: 'ACH-007',
    title: 'Industry Expert',
    description: 'Get endorsed by 20+ professionals',
    icon: Medal,
    category: 'Performance',
    rarity: 'Legendary',
    dateEarned: '',
    progress: 12,
    maxProgress: 20,
    unlocked: false,
    xpReward: 1000
  }
];

const categories = ['All', 'Performance', 'Engagement', 'Skills', 'Milestones'];
const rarityColors = {
  Common: 'bg-gray-100 text-gray-800 border-gray-300',
  Rare: 'bg-blue-100 text-blue-800 border-blue-300',
  Epic: 'bg-purple-100 text-purple-800 border-purple-300',
  Legendary: 'bg-yellow-100 text-yellow-800 border-yellow-300'
};

export function AchievementsBadgesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filter, setFilter] = useState<'all' | 'earned' | 'in-progress'>('all');
  
  const filteredAchievements = mockAchievements.filter(achievement => {
    const categoryMatch = selectedCategory === 'All' || achievement.category === selectedCategory;
    const statusMatch = 
      filter === 'all' ? true :
      filter === 'earned' ? achievement.unlocked :
      filter === 'in-progress' ? !achievement.unlocked : true;
    
    return categoryMatch && statusMatch;
  });

  const earnedCount = mockAchievements.filter(a => a.unlocked).length;
  const totalXP = mockAchievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.xpReward, 0);
  const inProgressCount = mockAchievements.filter(a => !a.unlocked && a.progress).length;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Page Header - now the first element */}
      <div className="mb-6">
        <h1 className="text-2xl mb-2">Achievements & Badges</h1>
        <p className="text-muted-foreground">Track your career progress and unlock rewards</p>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Trophy className="h-5 w-5 text-yellow-600 mr-2" />
              <span className="text-2xl font-bold">{earnedCount}</span>
            </div>
            <div className="text-sm text-muted-foreground">Achievements Earned</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Zap className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-2xl font-bold">{totalXP}</span>
            </div>
            <div className="text-sm text-muted-foreground">Total XP Earned</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="h-5 w-5 text-orange-600 mr-2" />
              <span className="text-2xl font-bold">{inProgressCount}</span>
            </div>
            <div className="text-sm text-muted-foreground">In Progress</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Star className="h-5 w-5 text-purple-600 mr-2" />
              <span className="text-2xl font-bold">{Math.round((earnedCount / mockAchievements.length) * 100)}%</span>
            </div>
            <div className="text-sm text-muted-foreground">Completion Rate</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            variant={filter === 'earned' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('earned')}
          >
            Earned
          </Button>
          <Button
            variant={filter === 'in-progress' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('in-progress')}
          >
            In Progress
          </Button>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAchievements.map((achievement) => {
          const IconComponent = achievement.icon;
          const isLocked = !achievement.unlocked;
          const hasProgress = achievement.progress !== undefined;

          return (
            <Card 
              key={achievement.id} 
              className={`transition-all hover:shadow-md ${
                isLocked ? 'opacity-75 bg-gray-50' : 'bg-white'
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-full ${
                    isLocked ? 'bg-gray-200' : 'bg-primary/10'
                  }`}>
                    {isLocked ? (
                      <Lock className="h-6 w-6 text-gray-400" />
                    ) : (
                      <IconComponent className="h-6 w-6 text-primary" />
                    )}
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${rarityColors[achievement.rarity]}`}
                  >
                    {achievement.rarity}
                  </Badge>
                </div>

                <h3 className={`font-medium mb-2 ${
                  isLocked ? 'text-gray-600' : 'text-foreground'
                }`}>
                  {achievement.title}
                </h3>
                
                <p className={`text-sm mb-4 ${
                  isLocked ? 'text-gray-500' : 'text-muted-foreground'
                }`}>
                  {achievement.description}
                </p>

                {hasProgress && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{achievement.progress}/{achievement.maxProgress}</span>
                    </div>
                    <Progress 
                      value={((achievement.progress || 0) / (achievement.maxProgress || 1)) * 100} 
                      className="h-2"
                    />
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <div className="flex items-center text-xs text-muted-foreground">
                    {achievement.unlocked ? (
                      <>
                        <CheckCircle className="h-3 w-3 mr-1 text-green-600" />
                        Earned {new Date(achievement.dateEarned).toLocaleDateString()}
                      </>
                    ) : (
                      <>
                        <Clock className="h-3 w-3 mr-1" />
                        In Progress
                      </>
                    )}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    +{achievement.xpReward} XP
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredAchievements.length === 0 && (
        <div className="text-center py-12">
          <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-medium mb-2">No achievements found</h3>
          <p className="text-muted-foreground">Try adjusting your filters to see more achievements.</p>
        </div>
      )}
    </div>
  );
}