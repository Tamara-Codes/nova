import React, { useState, useEffect } from 'react'
import { NovaDocument } from '../types'
import { NovaRenderer } from './NovaRenderer'

interface NovaEditorProps {
  document: NovaDocument
  onSave: (document: NovaDocument) => void
  onCancel: () => void
}

export const NovaEditor: React.FC<NovaEditorProps> = ({ document, onSave, onCancel }) => {
  const [jsonContent, setJsonContent] = useState('')
  const [previewDocument, setPreviewDocument] = useState<NovaDocument | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showPreview, setShowPreview] = useState(true)

  useEffect(() => {
    // Initialize with formatted JSON
    setJsonContent(JSON.stringify(document, null, 2))
    setPreviewDocument(document)
  }, [document])

  const handleJsonChange = (value: string) => {
    setJsonContent(value)

    // Try to parse and update preview
    try {
      const parsed = JSON.parse(value)
      setPreviewDocument(parsed)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON')
    }
  }

  const handleSave = () => {
    try {
      const parsed = JSON.parse(jsonContent)
      onSave(parsed)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON - cannot save')
    }
  }

  const handleDownload = () => {
    try {
      const parsed = JSON.parse(jsonContent)
      const blob = new Blob([JSON.stringify(parsed, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${parsed.metadata?.title?.replace(/\s+/g, '-').toLowerCase() || 'document'}.nova`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON - cannot download')
    }
  }

  return (
    <div className="nova-editor">
      <div className="nova-editor-toolbar">
        <div className="nova-editor-toolbar-left">
          <h2 className="nova-editor-title">Edit Document</h2>
          {error && <span className="nova-editor-error">{error}</span>}
        </div>
        <div className="nova-editor-toolbar-right">
          <button
            className="nova-editor-button nova-editor-button-secondary"
            onClick={() => setShowPreview(!showPreview)}
          >
            {showPreview ? 'Hide' : 'Show'} Preview
          </button>
          <button
            className="nova-editor-button nova-editor-button-secondary"
            onClick={handleDownload}
            disabled={!!error}
          >
            Download
          </button>
          <button
            className="nova-editor-button nova-editor-button-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="nova-editor-button nova-editor-button-primary"
            onClick={handleSave}
            disabled={!!error}
          >
            Save
          </button>
        </div>
      </div>

      <div className={`nova-editor-content ${showPreview ? 'split-view' : 'single-view'}`}>
        <div className="nova-editor-pane">
          <div className="nova-editor-pane-header">
            <h3>JSON Editor</h3>
            <span className="nova-editor-pane-info">
              Edit the raw JSON structure
            </span>
          </div>
          <textarea
            className="nova-editor-textarea"
            value={jsonContent}
            onChange={(e) => handleJsonChange(e.target.value)}
            spellCheck={false}
          />
        </div>

        {showPreview && (
          <div className="nova-editor-pane nova-editor-preview-pane">
            <div className="nova-editor-pane-header">
              <h3>Live Preview</h3>
              <span className="nova-editor-pane-info">
                See your changes in real-time
              </span>
            </div>
            <div className="nova-editor-preview">
              {previewDocument && !error ? (
                <NovaRenderer document={previewDocument} />
              ) : (
                <div className="nova-editor-preview-error">
                  {error || 'Invalid document structure'}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
