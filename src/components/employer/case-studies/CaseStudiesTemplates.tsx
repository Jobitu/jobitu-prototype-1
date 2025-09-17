import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { 
  Search,
  Plus,
  Eye,
  Copy,
  Edit,
  Star,
  Clock,
  Users,
  Award,
  Code,
  Monitor,
  Brain
} from "lucide-react";

interface Template {
  id: string;
  name: string;
  description: string;
  estimatedTime: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  usageCount: number;
  lastUsed: string;
  tags: string[];
  role: string;
  sharing: 'Team' | 'Private';
}

const mockTemplates: Template[] = [
  {
    id: 'TPL-001',
    name: 'Frontend Coding Interview (React)',
    description: 'Build a counter, write accessible component, performance fix',
    estimatedTime: 90,
    difficulty: 'Medium',
    usageCount: 47,
    lastUsed: '2025-07-25',
    tags: ['React', 'Frontend', 'Accessibility'],
    role: 'Frontend Developer',
    sharing: 'Team'
  },
  {
    id: 'TPL-002',
    name: 'Backend API Challenge (Node)',
    description: 'Implement auth, rate-limit, tests',
    estimatedTime: 120,
    difficulty: 'Hard',
    usageCount: 23,
    lastUsed: '2025-07-20',
    tags: ['Node.js', 'Authentication', 'Testing'],
    role: 'Backend Developer',
    sharing: 'Team'
  },
  {
    id: 'TPL-003',
    name: 'Full-Stack E-commerce Challenge',
    description: 'Build complete shopping cart with payment integration',
    estimatedTime: 180,
    difficulty: 'Hard',
    usageCount: 12,
    lastUsed: '2025-07-15',
    tags: ['Full-Stack', 'E-commerce', 'Payment'],
    role: 'Full-Stack Developer',
    sharing: 'Private'
  },
  {
    id: 'TPL-004',
    name: 'DevOps Infrastructure Setup',
    description: 'Configure monitoring, logging, and deployment pipeline',
    estimatedTime: 150,
    difficulty: 'Hard', 
    usageCount: 8,
    lastUsed: '2025-07-10',
    tags: ['DevOps', 'Infrastructure', 'Monitoring'],
    role: 'DevOps Engineer',
    sharing: 'Team'
  }
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Easy': return 'border-green-200 text-green-800';
    case 'Medium': return 'border-yellow-200 text-yellow-800';
    case 'Hard': return 'border-red-200 text-red-800';
    default: return 'border-gray-200 text-gray-800';
  }
};

export function CaseStudiesTemplates() {
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [sharingFilter, setSharingFilter] = useState('all');

  const filteredTemplates = mockTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDifficulty = difficultyFilter === 'all' || template.difficulty.toLowerCase() === difficultyFilter;
    const matchesRole = roleFilter === 'all' || template.role.toLowerCase().includes(roleFilter.toLowerCase());
    const matchesSharing = sharingFilter === 'all' || template.sharing.toLowerCase() === sharingFilter;
    
    return matchesSearch && matchesDifficulty && matchesRole && matchesSharing;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Case Study Templates</h2>
          <p className="text-gray-600">Pre-built templates to jumpstart your case studies</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Template
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>

          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="frontend">Frontend</SelectItem>
              <SelectItem value="backend">Backend</SelectItem>
              <SelectItem value="full-stack">Full-Stack</SelectItem>
              <SelectItem value="devops">DevOps</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sharingFilter} onValueChange={setSharingFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Sharing" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="team">Team</SelectItem>
              <SelectItem value="private">Private</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Templates</p>
                <p className="text-2xl font-bold">{mockTemplates.length}</p>
              </div>
              <Award className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Most Popular</p>
                <p className="text-sm font-medium">Frontend React</p>
              </div>
              <Star className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Usage</p>
                <p className="text-2xl font-bold">
                  {mockTemplates.reduce((acc, t) => acc + t.usageCount, 0)}
                </p>
              </div>
              <Users className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Duration</p>
                <p className="text-xl font-bold">
                  {Math.round(mockTemplates.reduce((acc, t) => acc + t.estimatedTime, 0) / mockTemplates.length)}min
                </p>
              </div>
              <Clock className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className={getDifficultyColor(template.difficulty)}>
                    {template.difficulty}
                  </Badge>
                  <Badge variant={template.sharing === 'Team' ? 'default' : 'secondary'}>
                    {template.sharing}
                  </Badge>
                </div>
                <div className="flex items-center space-x-1">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <h3 className="font-semibold mb-2">{template.name}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{template.description}</p>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Role</span>
                  <span className="font-medium">{template.role}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Est. Time</span>
                  <span className="font-medium">{template.estimatedTime}min</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Usage Count</span>
                  <span className="font-medium">{template.usageCount}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Last Used</span>
                  <span className="font-medium">{template.lastUsed}</span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {template.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {template.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{template.tags.length - 3} more
                    </Badge>
                  )}
                </div>

                <div className="border-t pt-3 flex justify-between">
                  <Button variant="outline" size="sm">
                    Preview
                  </Button>
                  <Button size="sm">
                    Use Template
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <Award className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
          <p className="text-gray-600 mb-4">
            {searchQuery || difficultyFilter !== 'all' || roleFilter !== 'all'
              ? 'Try adjusting your search or filters'
              : 'Create your first template to get started'}
          </p>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Template
          </Button>
        </div>
      )}
    </div>
  );
}