import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { Checkbox } from "../../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import {
  BookOpen,
  Plus,
  Search,
  Filter,
  FileText,
  CheckSquare,
  Download,
  Edit,
  Trash2,
  Copy,
  Eye,
  MoreHorizontal,
  Settings,
  Archive,
  Grid,
  Rows,
  Star,
  StarOff,
  Clock3,
  User2,
  ChevronDown,
} from "lucide-react";
import { PreparationResource } from "./types";
import { mockPreparationResources } from "./mockData";

interface PreparationProps {
  onCreateResource?: () => void;
}

type ViewMode = "grid" | "list";
type SortKey = "newest" | "az" | "type" | "category";

export function Preparation({ onCreateResource }: PreparationProps) {
  // --- UI State ---
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All Categories");
  const [selectedType, setSelectedType] = useState<string>("All Types");
  const [selectedStatus, setSelectedStatus] =
    useState<string>("All Statuses");
  const [sortKey, setSortKey] = useState<SortKey>("newest");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  // dialogs
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showResourceDetail, setShowResourceDetail] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // selections
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // data bindings
  const [selectedResource, setSelectedResource] =
    useState<PreparationResource | null>(null);
  const [pendingDeleteIds, setPendingDeleteIds] = useState<string[]>([]);

  const [newResource, setNewResource] = useState({
    name: "",
    type: "template" as "template" | "checklist" | "guideline",
    description: "",
    content: "",
    category: "",
    // local-only defaults
    status: "published" as "draft" | "published" | "archived",
    pinned: false,
  });

  // ---- Derived options from data (no hardcode) ----
  const allCategories = useMemo(() => {
    const set = new Set<string>();
    mockPreparationResources.forEach((r: any) => {
      if (r.category) set.add(r.category);
    });
    return ["All Categories", ...Array.from(set).sort()];
  }, []);

  const allTypes = ["All Types", "template", "checklist", "guideline"];
  const allStatuses = ["All Statuses", "draft", "published", "archived"];

  // counts by type for header chips
  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = { template: 0, checklist: 0, guideline: 0 };
    mockPreparationResources.forEach((r: any) => {
      if (r.type && counts[r.type] !== undefined) counts[r.type] += 1;
    });
    return counts;
  }, []);

  // ---- Filtering + Sorting ----
  const filteredResources = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const bySearch = (r: any) => {
      if (!q) return true;
      return (
        r.name?.toLowerCase().includes(q) ||
        r.description?.toLowerCase().includes(q) ||
        r.category?.toLowerCase().includes(q) ||
        r.content?.toLowerCase().includes(q)
      );
    };

    const byCategory = (r: any) =>
      selectedCategory === "All Categories" || r.category === selectedCategory;

    const byType = (r: any) =>
      selectedType === "All Types" || r.type === selectedType;

    const byStatus = (r: any) => {
      const status = (r.status as string) ?? "published";
      return selectedStatus === "All Statuses" || status === selectedStatus;
    };

    let list = mockPreparationResources.filter(
      (r) => bySearch(r) && byCategory(r) && byType(r) && byStatus(r)
    );

    // Pinned first, then sort
    list = list.sort((a: any, b: any) => {
      const ap = a.pinned ? 1 : 0;
      const bp = b.pinned ? 1 : 0;
      if (ap !== bp) return bp - ap; // pinned first
      switch (sortKey) {
        case "az":
          return a.name.localeCompare(b.name);
        case "type":
          return a.type.localeCompare(b.type) || a.name.localeCompare(b.name);
        case "category":
          return (
            (a.category || "").localeCompare(b.category || "") ||
            a.name.localeCompare(b.name)
          );
        case "newest":
        default: {
          const aDate = new Date((a.updatedAt as string) || (a.createdAt as string) || 0).getTime();
          const bDate = new Date((b.updatedAt as string) || (b.createdAt as string) || 0).getTime();
          return bDate - aDate;
        }
      }
    });

    return list as PreparationResource[];
  }, [searchQuery, selectedCategory, selectedType, selectedStatus, sortKey]);

  // ---- Helpers ----
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "template":
        return <FileText className="h-5 w-5 text-blue-500" />;
      case "checklist":
        return <CheckSquare className="h-5 w-5 text-green-500" />;
      case "guideline":
        return <BookOpen className="h-5 w-5 text-purple-500" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const badgeClass =
      {
        template: "bg-blue-100 text-blue-800",
        checklist: "bg-green-100 text-green-800",
        guideline: "bg-purple-100 text-purple-800",
      }[type] || "bg-gray-100 text-gray-800";

    return (
      <Badge className={badgeClass}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Badge>
    );
  };

  const getStatusBadge = (status?: string) => {
    const s = status || "published";
    const badgeClass =
      {
        draft: "bg-amber-100 text-amber-800",
        published: "bg-emerald-100 text-emerald-800",
        archived: "bg-gray-100 text-gray-800",
      }[s] || "bg-gray-100 text-gray-800";

    return <Badge className={badgeClass}>{s[0].toUpperCase() + s.slice(1)}</Badge>;
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All Categories");
    setSelectedType("All Types");
    setSelectedStatus("All Statuses");
    setSortKey("newest");
  };

  const toggleSelect = (id: string, checked: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  const selectAllOnPage = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(filteredResources.map((r) => r.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleCreateResource = () => {
    // could POST here; optimistic UX
    console.log("Creating resource:", newResource);
    setShowCreateDialog(false);
    setNewResource({
      name: "",
      type: "template",
      description: "",
      content: "",
      category: "",
      status: "published",
      pinned: false,
    });
  };

  const handleViewResource = (resource: PreparationResource) => {
    setSelectedResource(resource);
    setShowResourceDetail(true);
  };

  const askDelete = (ids: string[]) => {
    setPendingDeleteIds(ids);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = () => {
    console.log("Deleting resource(s):", pendingDeleteIds);
    setShowDeleteConfirm(false);
    setSelectedIds(new Set());
  };

  const handleDuplicate = (resource: PreparationResource) => {
    console.log("Duplicate:", resource.id);
  };

  const handleExport = (resource?: PreparationResource | PreparationResource[]) => {
    // Either export a single or selected
    if (Array.isArray(resource)) {
      console.log("Export multiple:", resource.map((r) => r.id));
    } else if (resource) {
      console.log("Export single:", resource.id);
    } else {
      console.log("Export selected:", Array.from(selectedIds));
    }
  };

  const handleArchive = (ids: string[] | string) => {
    const arr = Array.isArray(ids) ? ids : [ids];
    console.log("Archive:", arr);
  };

  const togglePin = (resource: any) => {
    console.log("Toggle pin:", resource.id);
  };

  // Keyboard shortcuts: "/" focus search, "c" open create
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/" && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        const el = document.getElementById("prep-search");
        (el as HTMLInputElement)?.focus();
      }
      if (e.key.toLowerCase() === "c" && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        onCreateResource?.();
        setShowCreateDialog(true);
      }
      if (e.key === "Escape") {
        setShowCreateDialog(false);
        setShowResourceDetail(false);
        setShowDeleteConfirm(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onCreateResource]);

  // ----- Renders -----
  const ResourceMeta = ({ r }: { r: any }) => {
    const updated =
      r.updatedAt || r.createdAt || new Date().toISOString();
    const owner = r.owner || "You";
    return (
      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mt-2">
        <span className="inline-flex items-center gap-1">
          <Clock3 className="h-3.5 w-3.5" />
          {new Date(updated).toLocaleDateString()}
        </span>
        <span className="inline-flex items-center gap-1">
          <User2 className="h-3.5 w-3.5" />
          {owner}
        </span>
      </div>
    );
  };

  const GridCard = ({ r }: { r: any }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Checkbox
              checked={selectedIds.has(r.id)}
              onCheckedChange={(v: boolean) => toggleSelect(r.id, !!v)}
              aria-label="Select resource"
            />
            {getTypeIcon(r.type)}
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-medium">{r.name}</h4>
                {getStatusBadge((r as any).status)}
              </div>
              <p className="text-sm text-muted-foreground">{r.category}</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => togglePin(r)}
              aria-label={r.pinned ? "Unpin" : "Pin"}
            >
              {r.pinned ? <Star className="h-4 w-4" /> : <StarOff className="h-4 w-4" />}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" aria-label="More actions">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleViewResource(r)}>
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => console.log("Edit:", r.id)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDuplicate(r)}>
                  <Copy className="h-4 w-4 mr-2" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport(r)}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleArchive(r.id)}>
                  <Archive className="h-4 w-4 mr-2" />
                  Archive
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={() => askDelete([r.id])}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground line-clamp-3">
            {r.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {getTypeBadge(r.type)}
            </div>
            <Button size="sm" variant="outline" onClick={() => handleViewResource(r)}>
              <Eye className="h-4 w-4 mr-2" />
              View
            </Button>
          </div>
          <ResourceMeta r={r} />
        </div>
      </CardContent>
    </Card>
  );

  const ListRow = ({ r }: { r: any }) => (
    <div className="grid grid-cols-12 items-center gap-3 p-3 border-b hover:bg-accent/30">
      <div className="col-span-5 flex items-center gap-3">
        <Checkbox
          checked={selectedIds.has(r.id)}
          onCheckedChange={(v: boolean) => toggleSelect(r.id, !!v)}
          aria-label="Select resource"
        />
        {getTypeIcon(r.type)}
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium truncate">{r.name}</span>
            {getStatusBadge((r as any).status)}
          </div>
          <div className="text-xs text-muted-foreground truncate">
            {r.description}
          </div>
        </div>
      </div>
      <div className="col-span-2">
        <Badge variant="secondary">{r.type}</Badge>
      </div>
      <div className="col-span-2">{r.category}</div>
      <div className="col-span-2">
        <ResourceMeta r={r} />
      </div>
      <div className="col-span-1 justify-self-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="More actions">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleViewResource(r)}>
              <Eye className="h-4 w-4 mr-2" />
              View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Edit:", r.id)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDuplicate(r)}>
              <Copy className="h-4 w-4 mr-2" />
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport(r)}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleArchive(r.id)}>
              <Archive className="h-4 w-4 mr-2" />
              Archive
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => askDelete([r.id])}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-lg font-medium">Interview Preparation Resources</h3>
          <p className="text-sm text-muted-foreground">
            Templates, checklists, and guidelines to help conduct effective interviews
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <Badge variant="outline">All ({mockPreparationResources.length})</Badge>
            <Badge className="bg-blue-100 text-blue-800">
              Templates ({typeCounts.template})
            </Badge>
            <Badge className="bg-green-100 text-green-800">
              Checklists ({typeCounts.checklist})
            </Badge>
            <Badge className="bg-purple-100 text-purple-800">
              Guidelines ({typeCounts.guideline})
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => console.log("Manage Categories")}
          >
            <Settings className="h-4 w-4 mr-2" />
            Manage Categories
          </Button>
          <Button
            onClick={() => {
              onCreateResource?.();
              setShowCreateDialog(true);
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Resource
          </Button>
        </div>
      </div>

      {/* Bulk actions bar */}
      {selectedIds.size > 0 && (
        <Card>
          <CardContent className="p-3 flex items-center justify-between">
            <div className="text-sm">
              <span className="font-medium">{selectedIds.size}</span> selected
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleArchive(Array.from(selectedIds))}
              >
                <Archive className="h-4 w-4 mr-2" />
                Archive
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExport()}
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => askDelete(Array.from(selectedIds))}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[220px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="prep-search"
                  placeholder="Search resources…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-[190px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {allCategories.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                {allTypes.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t === "All Types" ? t : t.charAt(0).toUpperCase() + t.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedStatus}
              onValueChange={setSelectedStatus}
            >
              <SelectTrigger className="w-[170px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {allStatuses.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortKey} onValueChange={(v: SortKey) => setSortKey(v)}>
              <SelectTrigger className="w-[170px]">
                <div className="flex items-center gap-2">
                  <ChevronDown className="h-4 w-4" />
                  <SelectValue placeholder="Sort" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="az">A–Z</SelectItem>
                <SelectItem value="type">Type</SelectItem>
                <SelectItem value="category">Category</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center border rounded">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
                aria-label="Grid view"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
                aria-label="List view"
              >
                <Rows className="h-4 w-4" />
              </Button>
            </div>

            <Button variant="outline" size="sm" onClick={clearFilters}>
              <Filter className="h-4 w-4 mr-2" />
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Resources */}
      {filteredResources.length > 0 ? (
        viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((r) => (
              <GridCard key={r.id} r={r as any} />
            ))}
          </div>
        ) : (
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-base">Resources</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid grid-cols-12 gap-3 px-3 pb-2 text-xs text-muted-foreground">
                <div className="col-span-5">Name</div>
                <div className="col-span-2">Type</div>
                <div className="col-span-2">Category</div>
                <div className="col-span-2">Meta</div>
                <div className="col-span-1 justify-self-end">
                  <span className="sr-only">Actions</span>
                </div>
              </div>
              <div>
                <div className="px-3 py-2 border-y">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={selectedIds.size === filteredResources.length}
                      onCheckedChange={(v: boolean) =>
                        selectAllOnPage(!!v)
                      }
                      aria-label="Select all"
                    />
                    <span className="text-sm">
                      Select all ({filteredResources.length})
                    </span>
                  </div>
                </div>
                {filteredResources.map((r) => (
                  <ListRow key={r.id} r={r as any} />
                ))}
              </div>
            </CardContent>
          </Card>
        )
      ) : (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-medium text-lg mb-2">No resources found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery ||
            selectedCategory !== "All Categories" ||
            selectedType !== "All Types" ||
            selectedStatus !== "All Statuses"
              ? "No resources match your current filters."
              : "Create your first preparation resource to get started."}
          </p>
          <div className="flex items-center justify-center gap-2">
            <Button onClick={() => setShowCreateDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Resource
            </Button>
            {(searchQuery ||
              selectedCategory !== "All Categories" ||
              selectedType !== "All Types" ||
              selectedStatus !== "All Statuses") && (
              <Button variant="outline" onClick={clearFilters}>
                <Filter className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Create Resource Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[680px]">
          <DialogHeader>
            <DialogTitle>Create Preparation Resource</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Resource Name</label>
              <Input
                placeholder="Enter resource name"
                value={newResource.name}
                onChange={(e) =>
                  setNewResource({ ...newResource, name: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Type</label>
                <Select
                  value={newResource.type}
                  onValueChange={(value: "template" | "checklist" | "guideline") =>
                    setNewResource({ ...newResource, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="template">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2" />
                        Template
                      </div>
                    </SelectItem>
                    <SelectItem value="checklist">
                      <div className="flex items-center">
                        <CheckSquare className="h-4 w-4 mr-2" />
                        Checklist
                      </div>
                    </SelectItem>
                    <SelectItem value="guideline">
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Guideline
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <Select
                  value={newResource.category}
                  onValueChange={(value) =>
                    setNewResource({ ...newResource, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {allCategories
                      .filter((c) => c !== "All Categories")
                      .map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <Select
                  value={newResource.status}
                  onValueChange={(value: "draft" | "published" | "archived") =>
                    setNewResource({ ...newResource, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <Textarea
                placeholder="Brief description of this resource"
                value={newResource.description}
                onChange={(e) =>
                  setNewResource({ ...newResource, description: e.target.value })
                }
                rows={2}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Content</label>
              <Textarea
                placeholder="Enter the resource content (questions, checklist items, guidelines, etc.)"
                value={newResource.content}
                onChange={(e) =>
                  setNewResource({ ...newResource, content: e.target.value })
                }
                rows={8}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Tip: Use placeholders like {"{{candidate_name}}"}, {"{{role}}"} and {"{{company}}"} in templates.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleCreateResource}
              disabled={!newResource.name || !newResource.description}
            >
              Create Resource
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Resource Detail Dialog */}
      <Dialog open={showResourceDetail} onOpenChange={setShowResourceDetail}>
        <DialogContent className="sm:max-w-[760px]">
          <DialogHeader>
            <div className="flex items-center space-x-3">
              {selectedResource && getTypeIcon(selectedResource.type)}
              <div>
                <DialogTitle>{selectedResource?.name}</DialogTitle>
                <p className="text-sm text-muted-foreground">
                  {selectedResource?.category}
                </p>
              </div>
            </div>
          </DialogHeader>

          {selectedResource && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {getTypeBadge(selectedResource.type)}
                  {getStatusBadge((selectedResource as any).status)}
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={() => console.log("Edit:", selectedResource.id)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDuplicate(selectedResource)}>
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicate
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleExport(selectedResource)}>
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedResource.description}
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Content</h4>
                <div className="bg-muted rounded-lg p-4">
                  <pre className="whitespace-pre-wrap text-sm">
                    {selectedResource.content}
                  </pre>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowResourceDetail(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm Dialog */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent className="sm:max-w-[520px]">
          <DialogHeader>
            <DialogTitle>Delete resource{pendingDeleteIds.length > 1 ? "s" : ""}?</DialogTitle>
          </DialogHeader>
          <div className="text-sm text-muted-foreground">
            This action cannot be undone. This will permanently delete{" "}
            <span className="font-medium">{pendingDeleteIds.length}</span>{" "}
            selected item{pendingDeleteIds.length > 1 ? "s" : ""}.
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
