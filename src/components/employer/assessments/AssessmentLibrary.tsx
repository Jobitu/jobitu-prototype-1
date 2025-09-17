import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { 
  Search,
  Eye,
  Copy,
  Play,
  Trash2,
  Library,
  ExternalLink
} from "lucide-react";
import { mockLibraryItems } from "./constants";

export function AssessmentLibrary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredItems = mockLibraryItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">My Assessment Library</h2>
          <p className="text-gray-600">Purchased assessments and templates ready to use</p>
        </div>
        <Button variant="outline">
          <ExternalLink className="h-4 w-4 mr-2" />
          Browse Marketplace
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search your library..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="coding">Coding</SelectItem>
            <SelectItem value="case-study">Case Study</SelectItem>
            <SelectItem value="design">Design</SelectItem>
            <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Library Items */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <Badge variant="outline">{item.type}</Badge>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <h3 className="font-semibold mb-2">{item.title}</h3>

                <div className="space-y-3">
                  <div className="flex flex-wrap gap-1">
                    {item.skillTags.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Seller</span>
                      <span className="font-medium">{item.seller.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Purchased</span>
                      <span className="font-medium">{item.purchaseDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Used</span>
                      <span className="font-medium">
                        {item.usageCount}{item.maxUsage ? `/${item.maxUsage}` : ' times'}
                      </span>
                    </div>
                  </div>

                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center">
                      <Badge variant="outline" className="text-xs">
                        {item.licenseInfo}
                      </Badge>
                      <Button size="sm">
                        Use Template
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Library className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Your library is empty</h3>
          <p className="text-gray-600 mb-4">
            {searchQuery || typeFilter !== 'all'
              ? 'No items match your search criteria'
              : 'Purchase assessments from the marketplace to build your library'}
          </p>
          <Button>
            <ExternalLink className="h-4 w-4 mr-2" />
            Browse Marketplace
          </Button>
        </div>
      )}
    </div>
  );
}