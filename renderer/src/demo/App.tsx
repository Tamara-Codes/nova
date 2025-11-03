import React, { useState, useEffect } from 'react'
import { NovaRenderer } from '../components/NovaRenderer'
import { NovaEditor } from '../components/NovaEditor'
import { NovaDocument } from '../types'
import '../styles/index.css'
import 'highlight.js/styles/github-dark.css'

const EXAMPLE_DOCS = [
  { name: 'Sample Document', path: '/examples/sample-document.nova' },
  { name: 'Technical Spec', path: '/examples/technical-spec.nova' },
  { name: 'Article', path: '/examples/article.nova' },
]

function App() {
  const [selectedDoc, setSelectedDoc] = useState(0)
  const [document, setDocument] = useState<NovaDocument | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const loadDocument = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(EXAMPLE_DOCS[selectedDoc].path)
        if (!response.ok) {
          throw new Error(`Failed to load document: ${response.statusText}`)
        }
        const data = await response.json()
        setDocument(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load document')
        console.error('Error loading document:', err)
      } finally {
        setLoading(false)
      }
    }

    loadDocument()
    setIsEditing(false) // Reset edit mode when switching documents
  }, [selectedDoc])

  const handleSave = (updatedDocument: NovaDocument) => {
    setDocument(updatedDocument)
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
  }

  return (
    <div className="demo-app">
      <div className="demo-sidebar">
        <h2 className="demo-sidebar-title">Nova {isEditing ? 'Editor' : 'Renderer'} Demo</h2>
        <p className="demo-sidebar-description">
          {isEditing
            ? 'Edit and save your Nova documents with live preview.'
            : 'Select a document to preview how Nova renders beautiful, AI-ready documents.'}
        </p>
        <nav className="demo-nav">
          {EXAMPLE_DOCS.map((doc, index) => (
            <button
              key={index}
              className={`demo-nav-button ${selectedDoc === index ? 'active' : ''}`}
              onClick={() => setSelectedDoc(index)}
              disabled={isEditing}
            >
              {doc.name}
            </button>
          ))}
        </nav>
        {!isEditing && document && (
          <button
            className="demo-edit-button"
            onClick={() => setIsEditing(true)}
          >
            ✏️ Edit Document
          </button>
        )}
        <div className="demo-info">
          <h3>Features</h3>
          <ul>
            <li>Beautiful typography</li>
            <li>Syntax highlighting</li>
            <li>Responsive design</li>
            <li>Print-friendly</li>
            <li>Dark mode support</li>
            <li>Accessible markup</li>
          </ul>
        </div>
      </div>
      <main className="demo-main">
        {loading && <div className="demo-loading">Loading document...</div>}
        {error && <div className="demo-error">{error}</div>}
        {document && !loading && !error && (
          isEditing ? (
            <NovaEditor
              document={document}
              onSave={handleSave}
              onCancel={handleCancelEdit}
            />
          ) : (
            <NovaRenderer document={document} />
          )
        )}
      </main>
    </div>
  )
}

export default App
