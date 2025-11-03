import React, { useMemo } from 'react'
import { NovaDocument, Block } from '../types'

interface AIViewProps {
  document: NovaDocument
}

interface Chunk {
  id: string
  type: string
  content: string
  tokens: number
  metadata: Record<string, any>
  blockType: string
}

export const AIView: React.FC<AIViewProps> = ({ document }) => {
  const chunks = useMemo(() => {
    return processDocumentForRAG(document)
  }, [document])

  const totalTokens = chunks.reduce((sum, chunk) => sum + chunk.tokens, 0)
  const avgTokensPerChunk = Math.round(totalTokens / chunks.length)

  return (
    <div className="ai-view">
      <div className="ai-header">
        <h2>AI Vision (RAG Processing)</h2>
        <p>How AI systems chunk, embed, and retrieve this document</p>
      </div>

      <div className="ai-stats">
        <div className="ai-stat">
          <div className="ai-stat-value">{chunks.length}</div>
          <div className="ai-stat-label">Chunks</div>
        </div>
        <div className="ai-stat">
          <div className="ai-stat-value">{totalTokens.toLocaleString()}</div>
          <div className="ai-stat-label">Total Tokens</div>
        </div>
        <div className="ai-stat">
          <div className="ai-stat-value">{avgTokensPerChunk}</div>
          <div className="ai-stat-label">Avg Tokens/Chunk</div>
        </div>
      </div>

      <div className="ai-content">
        <div className="ai-chunks">
          {chunks.map((chunk, index) => (
            <div key={chunk.id} className={`ai-chunk ai-chunk-${chunk.blockType}`}>
              <div className="ai-chunk-header">
                <div className="ai-chunk-title">
                  <span className="ai-chunk-number">Chunk {index + 1}</span>
                  <span className="ai-chunk-type">{chunk.type}</span>
                  <span className="ai-chunk-block-type">{chunk.blockType}</span>
                </div>
                <div className="ai-chunk-tokens">{chunk.tokens} tokens</div>
              </div>

              <div className="ai-chunk-content">
                {chunk.content.substring(0, 200)}
                {chunk.content.length > 200 && '...'}
              </div>

              <div className="ai-chunk-metadata">
                <div className="ai-metadata-title">📎 Metadata for Retrieval:</div>
                <div className="ai-metadata-items">
                  {Object.entries(chunk.metadata).map(([key, value]) => (
                    <div key={key} className="ai-metadata-item">
                      <span className="ai-metadata-key">{key}:</span>
                      <span className="ai-metadata-value">{String(value)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="ai-chunk-footer">
                <div className="ai-chunk-embedding">
                  🔢 Vector Embedding: [0.234, -0.891, 0.456, ...] (1536 dimensions)
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="ai-footer">
        <div className="ai-insight">
          <div className="ai-insight-title">💡 Why Nova is RAG-Ready:</div>
          <ul className="ai-insight-list">
            <li><strong>Semantic Chunking:</strong> Content is pre-chunked by meaning, not arbitrary character limits</li>
            <li><strong>Rich Metadata:</strong> Every chunk includes type, context, and hierarchy information</li>
            <li><strong>Perfect Retrieval:</strong> AI can find exactly what it needs without parsing ambiguity</li>
            <li><strong>No Data Loss:</strong> Unlike PDFs, tables, code, and formatting are preserved perfectly</li>
          </ul>
        </div>

        <div className="ai-comparison">
          <div className="ai-comparison-title">📊 Nova vs PDF for RAG:</div>
          <table className="ai-comparison-table">
            <thead>
              <tr>
                <th></th>
                <th>Nova</th>
                <th>PDF</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Structure</td>
                <td className="ai-check">✅ Explicit semantic structure</td>
                <td className="ai-cross">❌ Must guess from layout</td>
              </tr>
              <tr>
                <td>Tables</td>
                <td className="ai-check">✅ Preserved as data</td>
                <td className="ai-cross">❌ Often garbled text</td>
              </tr>
              <tr>
                <td>Chunking</td>
                <td className="ai-check">✅ Natural semantic boundaries</td>
                <td className="ai-cross">❌ Arbitrary splits</td>
              </tr>
              <tr>
                <td>Metadata</td>
                <td className="ai-check">✅ Rich, contextual</td>
                <td className="ai-cross">❌ Limited or none</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// Simulates how a RAG system would process a Nova document
function processDocumentForRAG(document: NovaDocument): Chunk[] {
  const chunks: Chunk[] = []

  // Add metadata chunk
  chunks.push({
    id: 'metadata',
    type: 'Document Metadata',
    content: `Title: ${document.metadata.title}\nAuthor: ${document.metadata.author || 'Unknown'}\nDescription: ${document.metadata.description || 'None'}`,
    tokens: estimateTokens(`${document.metadata.title} ${document.metadata.description}`),
    metadata: {
      type: 'metadata',
      title: document.metadata.title,
      author: document.metadata.author,
      tags: document.metadata.tags?.join(', ') || 'none'
    },
    blockType: 'metadata'
  })

  // Process each content block
  document.content.forEach((block, index) => {
    const chunk = blockToChunk(block, index, document.metadata.title)
    if (chunk) {
      chunks.push(chunk)
    }
  })

  return chunks
}

function blockToChunk(block: Block, index: number, docTitle: string): Chunk | null {
  const baseMetadata = {
    documentTitle: docTitle,
    blockIndex: index,
    blockId: block.id
  }

  switch (block.type) {
    case 'heading':
      return {
        id: block.id,
        type: `Heading Level ${block.level}`,
        content: block.content,
        tokens: estimateTokens(block.content),
        metadata: {
          ...baseMetadata,
          level: block.level,
          anchor: block.anchor
        },
        blockType: 'heading'
      }

    case 'paragraph':
      const paragraphText = typeof block.content === 'string'
        ? block.content
        : block.content.map((seg: any) => seg.text).join('')
      return {
        id: block.id,
        type: 'Paragraph',
        content: paragraphText,
        tokens: estimateTokens(paragraphText),
        metadata: {
          ...baseMetadata,
          hasFormatting: typeof block.content !== 'string'
        },
        blockType: 'paragraph'
      }

    case 'code':
      return {
        id: block.id,
        type: 'Code Block',
        content: `${block.caption || 'Code'}\n\n${block.code}`,
        tokens: estimateTokens(block.code || ''),
        metadata: {
          ...baseMetadata,
          language: block.language,
          caption: block.caption
        },
        blockType: 'code'
      }

    case 'callout':
      const calloutText = typeof block.content === 'string' ? block.content : ''
      return {
        id: block.id,
        type: 'Callout',
        content: `${block.title}: ${calloutText}`,
        tokens: estimateTokens(calloutText),
        metadata: {
          ...baseMetadata,
          calloutType: block.calloutType,
          title: block.title
        },
        blockType: 'callout'
      }

    case 'quote':
      const quoteText = typeof block.content === 'string' ? block.content : ''
      return {
        id: block.id,
        type: 'Quote',
        content: `"${quoteText}" - ${block.author || 'Unknown'}`,
        tokens: estimateTokens(quoteText),
        metadata: {
          ...baseMetadata,
          author: block.author,
          source: block.source
        },
        blockType: 'quote'
      }

    case 'list':
      const listItems = block.items?.map((item: any) => item.content).join('\n') || ''
      return {
        id: block.id,
        type: 'List',
        content: listItems,
        tokens: estimateTokens(listItems),
        metadata: {
          ...baseMetadata,
          listType: block.listType,
          itemCount: block.items?.length || 0
        },
        blockType: 'list'
      }

    case 'table':
      const tableText = `Table: ${block.caption || 'Untitled'}\nHeaders: ${block.headers?.join(', ')}\n${block.rows?.length || 0} rows`
      return {
        id: block.id,
        type: 'Table',
        content: tableText,
        tokens: estimateTokens(tableText),
        metadata: {
          ...baseMetadata,
          caption: block.caption,
          rowCount: block.rows?.length || 0,
          columnCount: block.headers?.length || 0
        },
        blockType: 'table'
      }

    default:
      return null
  }
}

// Rough token estimation (1 token ≈ 4 characters)
function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4)
}
