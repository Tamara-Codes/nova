import { useState, useEffect } from 'react'
import { NovaRenderer } from '../components/NovaRenderer'
import { BlockEditor } from '../components/editor/BlockEditor'
import { ViewMode } from '../components/ViewModeToggle'
import { SemanticView } from '../components/SemanticView'
import { AIView } from '../components/AIView'
import { Dashboard } from '../components/Dashboard'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { NovaDocument } from '../types'
import '../styles/index.css'
import '../styles/views.css'
import '../styles/globals.css'
import 'highlight.js/styles/github-dark.css'
import { FileText, Code, Image, List, Table } from 'lucide-react'

const EXAMPLE_DOCS = [
  { name: 'Sample Document', path: '/examples/sample-document.nova' },
  { name: 'Technical Spec', path: '/examples/technical-spec.nova' },
  { name: 'Article', path: '/examples/article.nova' },
]

interface DocumentWithMeta {
  name: string
  path: string
  document?: NovaDocument
}

function App() {
  const [selectedDoc, setSelectedDoc] = useState(0)
  const [documents, setDocuments] = useState<DocumentWithMeta[]>(
    EXAMPLE_DOCS.map(doc => ({ ...doc, document: undefined }))
  )
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>('visual')

  const currentDocument = documents[selectedDoc]?.document

  useEffect(() => {
    const loadDocument = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(documents[selectedDoc].path)
        if (!response.ok) {
          throw new Error(`Failed to load document: ${response.statusText}`)
        }
        const data = await response.json()

        setDocuments(prev => {
          const updated = [...prev]
          updated[selectedDoc] = { ...updated[selectedDoc], document: data }
          return updated
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load document')
        console.error('Error loading document:', err)
      } finally {
        setLoading(false)
      }
    }

    const currentDocMeta = documents[selectedDoc]
    if (!currentDocMeta) {
      return
    }

    // Don't try to load if document already exists or if path is empty (imported/created docs)
    if (!currentDocMeta.document && currentDocMeta.path) {
      loadDocument()
    } else {
      setLoading(false)
    }
    setIsEditing(false) // Reset edit mode when switching documents
  }, [selectedDoc, documents])

  const handleSave = (updatedDocument: NovaDocument) => {
    setDocuments(prev => {
      const updated = [...prev]
      updated[selectedDoc] = {
        ...updated[selectedDoc],
        document: updatedDocument,
        name: updatedDocument.metadata.title || updated[selectedDoc].name
      }
      return updated
    })
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
  }

  const createNewDocument = () => {
    const newDocument: NovaDocument = {
      version: '1.0',
      metadata: {
        title: 'Untitled Document',
        description: 'A new Nova document',
        author: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        tags: [],
        language: 'en'
      },
      theme: {
        name: 'default',
        typography: {
          fontFamily: 'Inter, system-ui, sans-serif',
          headingFontFamily: 'Inter, system-ui, sans-serif',
          codeFontFamily: '"Fira Code", monospace',
          baseFontSize: 16,
          lineHeight: 1.6
        },
        colors: {
          primary: '#eab308',
          background: '#ffffff',
          text: '#1e293b',
          accent: '#f59e0b'
        }
      },
      content: [
        {
          id: crypto.randomUUID(),
          type: 'heading',
          level: 1,
          content: 'Untitled Document'
        },
        {
          id: crypto.randomUUID(),
          type: 'paragraph',
          content: 'Start writing your document here...'
        }
      ]
    }

    const newDocMeta = {
      name: 'Untitled Document',
      path: '',
      document: newDocument
    }

    setDocuments(prev => [...prev, newDocMeta])
    setSelectedDoc(documents.length) // Select the new document
    setIsEditing(true) // Open in edit mode
  }

  const deleteDocument = (index: number) => {
    // Prevent deleting the last document
    if (documents.length === 1) {
      return
    }

    setDocuments(prev => prev.filter((_, i) => i !== index))

    // Adjust selected document index
    if (selectedDoc === index) {
      // If deleting the selected document, select the previous one (or 0 if it was the first)
      setSelectedDoc(Math.max(0, index - 1))
    } else if (selectedDoc > index) {
      // If deleting a document before the selected one, adjust the index
      setSelectedDoc(selectedDoc - 1)
    }
  }

  const duplicateDocument = (index: number) => {
    const docToDuplicate = documents[index]
    if (!docToDuplicate.document) return

    // Create a deep copy of the document
    const duplicatedDoc: NovaDocument = JSON.parse(JSON.stringify(docToDuplicate.document))

    // Update metadata
    duplicatedDoc.metadata.title = `${duplicatedDoc.metadata.title} (Copy)`
    duplicatedDoc.metadata.createdAt = new Date().toISOString()
    duplicatedDoc.metadata.updatedAt = new Date().toISOString()

    // Generate new IDs for all blocks
    duplicatedDoc.content = duplicatedDoc.content.map(block => ({
      ...block,
      id: crypto.randomUUID()
    }))

    const newDocMeta = {
      name: `${docToDuplicate.name} (Copy)`,
      path: '',
      document: duplicatedDoc
    }

    setDocuments(prev => [...prev, newDocMeta])
    setSelectedDoc(documents.length) // Select the duplicated document
  }

  const exportDocument = (index: number) => {
    const docToExport = documents[index]
    if (!docToExport.document) return

    // Create a blob with the JSON content
    const jsonString = JSON.stringify(docToExport.document, null, 2)
    const blob = new Blob([jsonString], { type: 'application/json' })

    // Create a download link
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${docToExport.name.replace(/\s+/g, '-').toLowerCase()}.nova`

    // Trigger download
    document.body.appendChild(link)
    link.click()

    // Cleanup
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const importDocument = () => {
    // Create a file input element
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.nova,.json'

    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return

      try {
        const text = await file.text()
        const doc = JSON.parse(text) as NovaDocument

        // Basic validation
        if (!doc.version || !doc.metadata || !doc.content) {
          throw new Error('Invalid Nova document format')
        }

        const newDocMeta = {
          name: doc.metadata.title || 'Imported Document',
          path: '',
          document: doc
        }

        setDocuments(prev => [...prev, newDocMeta])
        setSelectedDoc(documents.length) // Select the imported document
      } catch (err) {
        console.error('Error importing document:', err)
        alert('Failed to import document. Please ensure it is a valid .nova file.')
      }
    }

    input.click()
  }

  const getDocumentStats = (doc: NovaDocument) => {
    const blockTypeCounts = doc.content.reduce((acc, block) => {
      acc[block.type] = (acc[block.type] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return {
      totalBlocks: doc.content.length,
      blockTypeCounts,
      wordCount: doc.content.reduce((count, block) => {
        if ('content' in block && typeof block.content === 'string') {
          return count + block.content.split(/\s+/).length
        }
        return count
      }, 0)
    }
  }

  const renderViewMode = (doc: NovaDocument, mode: ViewMode) => {
    switch (mode) {
      case 'visual':
        return <NovaRenderer document={doc} />

      case 'semantic':
        return <SemanticView document={doc} />

      case 'ai':
        return <AIView document={doc} />

      case 'dual':
        return (
          <div className="dual-pane-view">
            <div className="dual-pane-left">
              <div className="dual-pane-content">
                <NovaRenderer document={doc} />
              </div>
            </div>
            <div className="dual-pane-right">
              <div className="dual-pane-content">
                <SemanticView document={doc} />
              </div>
            </div>
          </div>
        )

      default:
        return <NovaRenderer document={doc} />
    }
  }

  const stats = currentDocument ? getDocumentStats(currentDocument) : null

  if (loading && !currentDocument) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading document...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Error Loading Document</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">{error}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="h-screen overflow-hidden">
      <Dashboard
        documents={documents}
        selectedDoc={selectedDoc}
        onSelectDoc={setSelectedDoc}
        onEditDoc={() => setIsEditing(true)}
        onNewDoc={createNewDocument}
        onImportDoc={importDocument}
        onDeleteDoc={deleteDocument}
        onDuplicateDoc={duplicateDocument}
        onExportDoc={exportDocument}
        onViewModeChange={setViewMode}
        viewMode={viewMode}
        isEditing={isEditing}
      />
      {/* Content overlay on the main area */}
      <div className="fixed top-[81px] left-80 right-0 bottom-0 overflow-auto bg-gradient-to-br from-yellow-50/50 via-white/50 to-orange-50/50">
        {currentDocument && !isEditing && (
          <div className="p-8">
            {/* Document Stats */}
            {stats && viewMode === 'visual' && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card className="border-yellow-200 bg-white/80 backdrop-blur">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Total Blocks
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-yellow-500" />
                      <span className="text-2xl font-bold">{stats.totalBlocks}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-yellow-200 bg-white/80 backdrop-blur">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Word Count
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-yellow-500" />
                      <span className="text-2xl font-bold">{stats.wordCount}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-yellow-200 bg-white/80 backdrop-blur">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Code Blocks
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <Code className="w-5 h-5 text-yellow-500" />
                      <span className="text-2xl font-bold">
                        {stats.blockTypeCounts.code || 0}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-yellow-200 bg-white/80 backdrop-blur">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Images
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <Image className="w-5 h-5 text-yellow-500" />
                      <span className="text-2xl font-bold">
                        {stats.blockTypeCounts.image || 0}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Document Content */}
            <Card className="border-yellow-200 bg-white/90 backdrop-blur shadow-lg">
              <CardContent className="p-8">
                {renderViewMode(currentDocument, viewMode)}
              </CardContent>
            </Card>
          </div>
        )}

        {currentDocument && isEditing && (
          <div className="h-full bg-white">
            <BlockEditor
              document={currentDocument}
              onSave={handleSave}
              onCancel={handleCancelEdit}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default App
