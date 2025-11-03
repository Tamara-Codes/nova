import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { ScrollArea } from './ui/scroll-area'
import { Separator } from './ui/separator'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from './ui/dropdown-menu'
import {
  FileText,
  Eye,
  Edit,
  Calendar,
  Tag,
  Clock,
  Sparkles,
  LayoutGrid,
  Plus,
  Trash2,
  Upload,
  MoreVertical,
  Copy,
  Download
} from 'lucide-react'
import { NovaDocument } from '../types'

interface DashboardProps {
  documents: Array<{
    name: string
    path: string
    document?: NovaDocument
  }>
  selectedDoc: number
  onSelectDoc: (index: number) => void
  onEditDoc: () => void
  onNewDoc: () => void
  onImportDoc: () => void
  onDeleteDoc: (index: number) => void
  onDuplicateDoc: (index: number) => void
  onExportDoc: (index: number) => void
  onViewModeChange: (mode: string) => void
  viewMode: string
  isEditing: boolean
}

export function Dashboard({
  documents,
  selectedDoc,
  onSelectDoc,
  onEditDoc,
  onNewDoc,
  onImportDoc,
  onDeleteDoc,
  onDuplicateDoc,
  onExportDoc,
  onViewModeChange,
  viewMode,
  isEditing
}: DashboardProps) {
  const currentDoc = documents[selectedDoc]?.document

  return (
    <div className="h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-700 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Nova Editor</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              onClick={onNewDoc}
              disabled={isEditing}
              title="Create new document"
            >
              <Plus className="w-4 h-4 mr-2" />
              New
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={onImportDoc}
              disabled={isEditing}
              title="Import document"
            >
              <Upload className="w-4 h-4 mr-2" />
              Import
            </Button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-81px)]">
        {/* Sidebar */}
        <aside className="w-80 border-r bg-white/60 backdrop-blur-sm">
            <ScrollArea className="h-full">
            <div className="p-6 space-y-6">
              {/* Document List */}
              <div>
                <div className="mb-4">
                  <h2 className="text-sm font-semibold text-gray-900">Documents</h2>
                </div>
                <div className="space-y-2">
                  {documents.map((doc, index) => (
                    <div key={index} className="flex items-center gap-1 group">
                      <Button
                        variant={selectedDoc === index ? "default" : "ghost"}
                        className="flex-1 justify-start h-auto py-3 px-4"
                        onClick={() => onSelectDoc(index)}
                        disabled={isEditing}
                      >
                        <FileText className="w-4 h-4 mr-3 flex-shrink-0" />
                        <span className="truncate text-left">{doc.name}</span>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-9 w-9 p-0 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            disabled={isEditing}
                            title="More options"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem
                            onClick={() => onDuplicateDoc(index)}
                            className="cursor-pointer"
                          >
                            <Copy className="w-4 h-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onExportDoc(index)}
                            className="cursor-pointer"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Export
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => onDeleteDoc(index)}
                            disabled={documents.length === 1}
                            className="cursor-pointer text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* View Modes */}
              {!isEditing && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">View Mode</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { mode: 'visual', label: 'Visual', icon: Eye },
                      { mode: 'semantic', label: 'Semantic', icon: LayoutGrid },
                      { mode: 'ai', label: 'AI View', icon: Sparkles },
                      { mode: 'dual', label: 'Dual', icon: LayoutGrid }
                    ].map(({ mode, label, icon: Icon }) => (
                      <Button
                        key={mode}
                        variant={viewMode === mode ? "default" : "outline"}
                        size="sm"
                        onClick={() => onViewModeChange(mode)}
                      >
                        <Icon className="w-3 h-3 mr-1.5" />
                        {label}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Document Info */}
              {currentDoc && (
                <>
                  <Separator />
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Document Info</h3>
                    <div className="space-y-3 text-sm">
                      {currentDoc.metadata.createdAt && (
                        <div className="flex items-start gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="text-xs text-muted-foreground">Created</p>
                            <p className="text-gray-900">
                              {new Date(currentDoc.metadata.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      )}
                      {currentDoc.metadata.updatedAt && (
                        <div className="flex items-start gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="text-xs text-muted-foreground">Modified</p>
                            <p className="text-gray-900">
                              {new Date(currentDoc.metadata.updatedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      )}
                      {currentDoc.metadata.tags && currentDoc.metadata.tags.length > 0 && (
                        <div className="flex items-start gap-2">
                          <Tag className="w-4 h-4 text-muted-foreground mt-0.5" />
                          <div className="flex-1">
                            <p className="text-xs text-muted-foreground mb-1">Tags</p>
                            <div className="flex flex-wrap gap-1">
                              {currentDoc.metadata.tags.map((tag, i) => (
                                <Badge key={i} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}

              <Separator />

              {/* Actions */}
              {!isEditing && (
                <div className="space-y-2">
                  <Button
                    className="w-full"
                    onClick={onEditDoc}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Document
                  </Button>
                </div>
              )}
            </div>
          </ScrollArea>
        </aside>

        {/* Main Content Area - This will be filled by the parent */}
        <main className="flex-1 overflow-auto">
          {/* Content will be rendered by parent component */}
        </main>
      </div>
    </div>
  )
}
