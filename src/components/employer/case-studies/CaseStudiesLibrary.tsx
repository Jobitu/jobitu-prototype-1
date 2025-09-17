import { useState } from "react";
import { Card, CardContent } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Checkbox } from "../../ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../../ui/sheet";
import { 
  Search,
  Plus,
  Upload,
  Download,
  Eye,
  Copy,
  Play,
  Edit,
  Trash2,
  MoreHorizontal,
  Code,
  Monitor,
  Users,
  Brain
} from "lucide-react";

interface CaseStudy {
  id: string;
  title: string;
  shortId: string;
  description: string;
  owner: string;
  type: 'Coding' | 'System' | 'Behavioral' | 'Mixed';
  environment: string;
  timeLimit: number;
  avgScore: number;
  attempts: number;
  status: 'Published' | 'Draft' | 'Archived';
  lastRun: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  version: string;
  created: string;
  updated: string;
}

const mockCaseStudies: CaseStudy[] = [
  {
    id: 'CS-101',
    title: 'Frontend React Challenge — Component & State',
    shortId: 'CS-101',
    description: 'Build a dynamic React component with state management and user interactions',
    owner: 'Arda Kara',
    type: 'Coding',
    environment: 'node:18',
    timeLimit: 90,
    avgScore: 81,
    attempts: 142,
    status: 'Published',
    lastRun: '2025-07-28',
    difficulty: 'Medium',
    tags: ['React', 'JavaScript', 'Frontend'],
    version: '1.2',
    created: '2025-01-15',
    updated: '2025-07-20'
  },
  {
    id: 'CS-102',
    title: 'Backend API – Auth & Rate Limiting',
    shortId: 'CS-102',
    description: 'Implement authentication system with rate limiting and security measures',
    owner: 'Sarah Chen',
    type: 'Coding',
    environment: 'node:18-slim',
    timeLimit: 120,
    avgScore: 74,
    attempts: 89,
    status: 'Published',
    lastRun: '2025-07-25',
    difficulty: 'Hard',
    tags: ['Node.js', 'Authentication', 'Backend', 'Security'],
    version: '2.1',
    created: '2025-02-01',
    updated: '2025-07-15'
  },
  {
    id: 'CS-103',
    title: 'System Design – Scalable Chat Service',
    shortId: 'CS-103',
    description: 'Design a distributed chat system handling millions of concurrent users',
    owner: 'Michael Rodriguez',
    type: 'System',
    environment: 'docker-compose',
    timeLimit: 150,
    avgScore: 67,
    attempts: 45,
    status: 'Published',
    lastRun: '2025-07-22',
    difficulty: 'Hard',
    tags: ['System Design', 'Scalability', 'Architecture'],
    version: '1.0',
    created: '2025-03-10',
    updated: '2025-07-18'
  }
];

const typeIcons = {
  'Coding': <Code className="h-4 w-4" />,
  'System': <Monitor className="h-4 w-4" />,
  'Behavioral': <Users className="h-4 w-4" />,
  'Mixed': <Brain className="h-4 w-4" />
};

interface CaseStudiesLibraryProps {
  onCreateCaseStudy?: () => void;
}

export function CaseStudiesLibrary({ onCreateCaseStudy }: CaseStudiesLibraryProps) {
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [selectedCaseStudies, setSelectedCaseStudies] = useState<string[]>([]);
  const [showDetailsDrawer, setShowDetailsDrawer] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [filters, setFilters] = useState({
    status: 'all',
    difficulty: 'all',
    type: 'all',
    owner: 'all'
  });

  const handleRowClick = (caseStudy: CaseStudy) => {
    setSelectedCaseStudy(caseStudy);
    setShowDetailsDrawer(true);
  };

  const filteredCaseStudies = mockCaseStudies.filter(study => {
    return (filters.status === 'all' || study.status.toLowerCase() === filters.status) &&
           (filters.difficulty === 'all' || study.difficulty.toLowerCase() === filters.difficulty) &&
           (filters.type === 'all' || study.type.toLowerCase() === filters.type);
  });

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
        <div className="flex flex-wrap items-center gap-4">
          <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.difficulty} onValueChange={(value) => setFilters(prev => ({ ...prev, difficulty: value }))}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Difficulty</SelectItem>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.type} onValueChange={(value) => setFilters(prev => ({ ...prev, type: value }))}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="coding">Coding</SelectItem>
              <SelectItem value="system">System</SelectItem>
              <SelectItem value="behavioral">Behavioral</SelectItem>
              <SelectItem value="mixed">Mixed</SelectItem>
            </SelectContent>
          </Select>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search case studies..."
              className="pl-10 w-56"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => onCreateCaseStudy?.()}>
            <Plus className="h-4 w-4 mr-2" />
            New Case Study
          </Button>
          <div className="flex border rounded-lg">
            <Button
              variant={viewMode === 'table' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('table')}
              className="rounded-r-none"
            >
              Table
            </Button>
            <Button
              variant={viewMode === 'cards' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('cards')}
              className="rounded-l-none"
            >
              Cards
            </Button>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedCaseStudies.length > 0 && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {selectedCaseStudies.length} case stud{selectedCaseStudies.length > 1 ? 'ies' : 'y'} selected
              </span>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline">Publish</Button>
                <Button size="sm" variant="outline">Clone</Button>
                <Button size="sm" variant="outline">Archive</Button>
                <Button size="sm" variant="outline">Delete</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr>
                    <th className="text-left py-3 px-4">
                      <Checkbox
                        checked={selectedCaseStudies.length === filteredCaseStudies.length}
                        onCheckedChange={(checked) => {
                          setSelectedCaseStudies(checked ? filteredCaseStudies.map(cs => cs.id) : []);
                        }}
                      />
                    </th>
                    <th className="text-left py-3 px-4">Title</th>
                    <th className="text-left py-3 px-4">ID</th>
                    <th className="text-left py-3 px-4">Owner</th>
                    <th className="text-left py-3 px-4">Type</th>
                    <th className="text-left py-3 px-4">Environment</th>
                    <th className="text-right py-3 px-4">Time Limit</th>
                    <th className="text-right py-3 px-4">Avg Score</th>
                    <th className="text-right py-3 px-4">Attempts</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Last Run</th>
                    <th className="text-right py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCaseStudies.map((study) => (
                    <tr 
                      key={study.id} 
                      className="border-b hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleRowClick(study)}
                    >
                      <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={selectedCaseStudies.includes(study.id)}
                          onCheckedChange={(checked) => {
                            setSelectedCaseStudies(prev =>
                              checked
                                ? [...prev, study.id]
                                : prev.filter(id => id !== study.id)
                            );
                          }}
                        />
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium">{study.title}</div>
                          <div className="text-sm text-gray-500">{study.description}</div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {study.tags.slice(0, 2).map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline">{study.shortId}</Badge>
                      </td>
                      <td className="py-3 px-4">{study.owner}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-1">
                          {typeIcons[study.type]}
                          <span>{study.type}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="secondary" className="text-xs">
                          {study.environment}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-right">{study.timeLimit}min</td>
                      <td className="py-3 px-4 text-right">
                        {study.avgScore > 0 ? `${study.avgScore}%` : '-'}
                      </td>
                      <td className="py-3 px-4 text-right">{study.attempts}</td>
                      <td className="py-3 px-4">
                        <Badge 
                          variant={study.status === 'Published' ? 'default' : 
                                   study.status === 'Draft' ? 'secondary' : 'outline'}
                        >
                          {study.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">{study.lastRun}</td>
                      <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end space-x-1">
                          <Button size="sm" variant="ghost">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Play className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Details Drawer */}
      <Sheet open={showDetailsDrawer} onOpenChange={setShowDetailsDrawer}>
        <SheetContent className="min-w-[600px]">
          <SheetHeader>
            <SheetTitle>
              {selectedCaseStudy?.title || 'Case Study Details'}
            </SheetTitle>
          </SheetHeader>
          {selectedCaseStudy && (
            <div className="mt-6 space-y-6">
              <div className="flex items-center space-x-2">
                <Badge variant="outline">{selectedCaseStudy.shortId}</Badge>
                <Badge variant={selectedCaseStudy.status === 'Published' ? 'default' : 'secondary'}>
                  {selectedCaseStudy.status}
                </Badge>
                <Badge variant="outline" className={
                  selectedCaseStudy.difficulty === 'Easy' ? 'border-green-200 text-green-800' :
                  selectedCaseStudy.difficulty === 'Medium' ? 'border-yellow-200 text-yellow-800' :
                  'border-red-200 text-red-800'
                }>
                  {selectedCaseStudy.difficulty}
                </Badge>
              </div>

              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-sm text-gray-600">{selectedCaseStudy.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-1">Owner</h4>
                  <p className="text-sm">{selectedCaseStudy.owner}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Type</h4>
                  <p className="text-sm">{selectedCaseStudy.type}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Environment</h4>
                  <Badge variant="secondary">{selectedCaseStudy.environment}</Badge>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Time Limit</h4>
                  <p className="text-sm">{selectedCaseStudy.timeLimit} minutes</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-1">Average Score</h4>
                  <p className="text-sm">
                    {selectedCaseStudy.avgScore > 0 ? `${selectedCaseStudy.avgScore}%` : 'No data'}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Total Attempts</h4>
                  <p className="text-sm">{selectedCaseStudy.attempts}</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Tags</h4>
                <div className="flex flex-wrap gap-1">
                  {selectedCaseStudy.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2 pt-4 border-t">
                <Button>
                  <Play className="h-4 w-4 mr-2" />
                  Run Test
                </Button>
                <Button variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline">
                  <Copy className="h-4 w-4 mr-2" />
                  Clone
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}