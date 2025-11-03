import React from 'react'
import { NovaDocument } from '../types'
import { BlockRenderer } from './BlockRenderer'
import { ThemeProvider } from '../utils/ThemeContext'

interface NovaRendererProps {
  document: NovaDocument
  className?: string
}

export const NovaRenderer: React.FC<NovaRendererProps> = ({ document, className }) => {
  const { metadata, theme, content } = document

  return (
    <ThemeProvider theme={theme}>
      <article className={`nova-document ${className || ''}`}>
        {metadata.title && (
          <header className="nova-document-header">
            <h1 className="nova-document-title">{metadata.title}</h1>
            {metadata.description && (
              <p className="nova-document-description">{metadata.description}</p>
            )}
            {metadata.author && (
              <div className="nova-document-meta">
                <span className="nova-document-author">{metadata.author}</span>
                {metadata.createdAt && (
                  <time className="nova-document-date">
                    {new Date(metadata.createdAt).toLocaleDateString()}
                  </time>
                )}
              </div>
            )}
          </header>
        )}
        <div className="nova-document-content">
          {content.map((block, index) => (
            <BlockRenderer key={block.id || index} block={block} />
          ))}
        </div>
      </article>
    </ThemeProvider>
  )
}
