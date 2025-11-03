import React, { useState } from 'react'
import { NovaDocument } from '../types'

interface SemanticViewProps {
  document: NovaDocument
}

export const SemanticView: React.FC<SemanticViewProps> = ({ document }) => {
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set(['root', 'root.content']))

  const toggleExpand = (path: string) => {
    const newExpanded = new Set(expandedPaths)
    if (newExpanded.has(path)) {
      newExpanded.delete(path)
    } else {
      newExpanded.add(path)
    }
    setExpandedPaths(newExpanded)
  }

  const renderValue = (value: any, path: string, key: string, depth: number): JSX.Element => {
    const indent = depth * 1.5

    if (value === null) {
      return <span className="json-null">null</span>
    }

    if (typeof value === 'string') {
      return <span className="json-string">"{value}"</span>
    }

    if (typeof value === 'number') {
      return <span className="json-number">{value}</span>
    }

    if (typeof value === 'boolean') {
      return <span className="json-boolean">{value.toString()}</span>
    }

    if (Array.isArray(value)) {
      const isExpanded = expandedPaths.has(path)
      const itemCount = value.length

      return (
        <div className="json-array">
          <div className="json-line">
            <button
              className="json-toggle"
              onClick={() => toggleExpand(path)}
              style={{ marginLeft: `${indent}rem` }}
            >
              {isExpanded ? '▼' : '▶'}
            </button>
            <span className="json-key">{key}:</span>
            <span className="json-bracket">[</span>
            <span className="json-count">{itemCount} items</span>
            {!isExpanded && <span className="json-bracket">]</span>}
          </div>
          {isExpanded && (
            <div className="json-expanded">
              {value.map((item, index) => (
                <div key={index} className="json-array-item">
                  {renderValue(item, `${path}[${index}]`, `[${index}]`, depth + 1)}
                </div>
              ))}
              <div className="json-line" style={{ marginLeft: `${indent}rem` }}>
                <span className="json-bracket">]</span>
              </div>
            </div>
          )}
        </div>
      )
    }

    if (typeof value === 'object') {
      const isExpanded = expandedPaths.has(path)
      const keys = Object.keys(value)
      const annotation = getAnnotation(key, value)

      return (
        <div className="json-object">
          <div className="json-line">
            <button
              className="json-toggle"
              onClick={() => toggleExpand(path)}
              style={{ marginLeft: `${indent}rem` }}
            >
              {isExpanded ? '▼' : '▶'}
            </button>
            <span className="json-key">{key}:</span>
            <span className="json-bracket">{'{'}</span>
            {annotation && <span className="json-annotation">{annotation}</span>}
            {!isExpanded && <span className="json-bracket">{'}'}</span>}
          </div>
          {isExpanded && (
            <div className="json-expanded">
              {keys.map((k) => (
                <div key={k} className="json-property">
                  {renderValue(value[k], `${path}.${k}`, k, depth + 1)}
                </div>
              ))}
              <div className="json-line" style={{ marginLeft: `${indent}rem` }}>
                <span className="json-bracket">{'}'}</span>
              </div>
            </div>
          )}
        </div>
      )
    }

    return <span>{String(value)}</span>
  }

  const getAnnotation = (key: string, value: any): string | null => {
    if (key === 'metadata') return '📋 Document Metadata'
    if (key === 'theme') return '🎨 Visual Theme'
    if (key === 'content') return '📄 Document Content Blocks'
    if (value.type === 'heading') return '📌 Heading Block'
    if (value.type === 'paragraph') return '📝 Paragraph Block'
    if (value.type === 'list') return '📋 List Block'
    if (value.type === 'code') return '💻 Code Block'
    if (value.type === 'callout') return '💡 Callout Block'
    if (value.type === 'quote') return '💬 Quote Block'
    if (value.type === 'image') return '🖼️ Image Block'
    if (value.type === 'table') return '📊 Table Block'
    if (value.type === 'divider') return '➖ Divider Block'
    return null
  }

  return (
    <div className="semantic-view">
      <div className="semantic-header">
        <h2>Semantic Structure</h2>
        <p>This is what AI sees - clean, structured, unambiguous data</p>
      </div>
      <div className="semantic-content">
        <div className="json-tree">
          {renderValue(document, 'root', 'document', 0)}
        </div>
      </div>
      <div className="semantic-footer">
        <div className="semantic-insight">
          <strong>💡 AI Insight:</strong> Unlike PDFs where AI must guess structure from pixels,
          Nova provides explicit semantic information in a machine-readable format.
        </div>
      </div>
    </div>
  )
}
