import React, { useState } from 'react'
import { NovaDocument, Block } from '../../types'
import { EditableBlock } from './EditableBlock'
import './editor.css'

interface BlockEditorProps {
  document: NovaDocument
  onSave: (document: NovaDocument) => void
  onCancel: () => void
}

export const BlockEditor: React.FC<BlockEditorProps> = ({ document, onSave, onCancel }) => {
  const [blocks, setBlocks] = useState<Block[]>(document.content)
  const [focusedBlockId, setFocusedBlockId] = useState<string | null>(null)

  const updateBlock = (blockId: string, updates: Partial<Block>) => {
    setBlocks(blocks.map(block =>
      block.id === blockId ? { ...block, ...updates } : block
    ))
  }

  const deleteBlock = (blockId: string) => {
    setBlocks(blocks.filter(block => block.id !== blockId))
  }

  const addBlock = (afterBlockId: string | null, newBlock: Block) => {
    if (afterBlockId === null) {
      setBlocks([newBlock, ...blocks])
    } else {
      const index = blocks.findIndex(b => b.id === afterBlockId)
      const newBlocks = [...blocks]
      newBlocks.splice(index + 1, 0, newBlock)
      setBlocks(newBlocks)
    }
  }

  const moveBlock = (blockId: string, direction: 'up' | 'down') => {
    const index = blocks.findIndex(b => b.id === blockId)
    if (index === -1) return
    if (direction === 'up' && index === 0) return
    if (direction === 'down' && index === blocks.length - 1) return

    const newBlocks = [...blocks]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    const [movedBlock] = newBlocks.splice(index, 1)
    newBlocks.splice(targetIndex, 0, movedBlock)
    setBlocks(newBlocks)
  }

  const handleSave = () => {
    const updatedDocument: NovaDocument = {
      ...document,
      content: blocks,
      metadata: {
        ...document.metadata,
        updatedAt: new Date().toISOString()
      }
    }
    onSave(updatedDocument)
  }

  const handleDownload = () => {
    const updatedDocument: NovaDocument = {
      ...document,
      content: blocks,
      metadata: {
        ...document.metadata,
        updatedAt: new Date().toISOString()
      }
    }

    const blob = new Blob([JSON.stringify(updatedDocument, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = window.document.createElement('a')
    a.href = url
    a.download = `${updatedDocument.metadata?.title?.replace(/\s+/g, '-').toLowerCase() || 'document'}.nova`
    window.document.body.appendChild(a)
    a.click()
    window.document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="block-editor">
      {/* Toolbar */}
      <div className="block-editor-toolbar">
        <div className="block-editor-toolbar-left">
          <h2 className="block-editor-title">
            {document.metadata?.title || 'Untitled Document'}
          </h2>
        </div>
        <div className="block-editor-toolbar-right">
          <button
            className="block-editor-button block-editor-button-secondary"
            onClick={handleDownload}
          >
            Download
          </button>
          <button
            className="block-editor-button block-editor-button-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="block-editor-button block-editor-button-primary"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="block-editor-content">
        <div className="block-editor-page">
          {blocks.map((block, index) => (
            <EditableBlock
              key={block.id}
              block={block}
              isFirst={index === 0}
              isLast={index === blocks.length - 1}
              isFocused={focusedBlockId === block.id}
              onUpdate={(updates) => updateBlock(block.id, updates)}
              onDelete={() => deleteBlock(block.id)}
              onAddBlock={(newBlock) => addBlock(block.id, newBlock)}
              onMove={(direction) => moveBlock(block.id, direction)}
              onFocus={() => setFocusedBlockId(block.id)}
              onBlur={() => setFocusedBlockId(null)}
            />
          ))}

          {blocks.length === 0 && (
            <div className="block-editor-empty">
              <p>Start typing to create your first block...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
