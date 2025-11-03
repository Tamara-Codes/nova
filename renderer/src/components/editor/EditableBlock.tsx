import React, { useState } from 'react'
import { Block } from '../../types'
import { EditableHeading } from './blocks/EditableHeading'
import { EditableParagraph } from './blocks/EditableParagraph'
import { EditableList } from './blocks/EditableList'
import { EditableCode } from './blocks/EditableCode'
import { EditableCallout } from './blocks/EditableCallout'
import { EditableQuote } from './blocks/EditableQuote'
import { EditableDivider } from './blocks/EditableDivider'
import { EditableImage } from './blocks/EditableImage'
import { BlockMenu } from './BlockMenu'

interface EditableBlockProps {
  block: Block
  isFirst: boolean
  isLast: boolean
  isFocused: boolean
  onUpdate: (updates: Partial<Block>) => void
  onDelete: () => void
  onAddBlock: (block: Block) => void
  onMove: (direction: 'up' | 'down') => void
  onFocus: () => void
  onBlur: () => void
}

export const EditableBlock: React.FC<EditableBlockProps> = ({
  block,
  isFirst,
  isLast,
  isFocused,
  onUpdate,
  onDelete,
  onAddBlock,
  onMove,
  onFocus,
  onBlur,
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [showBlockMenu, setShowBlockMenu] = useState(false)

  const renderBlockContent = () => {
    switch (block.type) {
      case 'heading':
        return (
          <EditableHeading
            block={block as any}
            onUpdate={onUpdate}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        )
      case 'paragraph':
        return (
          <EditableParagraph
            block={block as any}
            onUpdate={onUpdate}
            onFocus={onFocus}
            onBlur={onBlur}
            onDelete={onDelete}
            onAddBlock={onAddBlock}
          />
        )
      case 'list':
        return (
          <EditableList
            block={block as any}
            onUpdate={onUpdate}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        )
      case 'code':
        return (
          <EditableCode
            block={block as any}
            onUpdate={onUpdate}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        )
      case 'callout':
        return (
          <EditableCallout
            block={block as any}
            onUpdate={onUpdate}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        )
      case 'quote':
        return (
          <EditableQuote
            block={block as any}
            onUpdate={onUpdate}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        )
      case 'divider':
        return (
          <EditableDivider
            block={block as any}
            onUpdate={onUpdate}
          />
        )
      case 'image':
        return (
          <EditableImage
            block={block as any}
            onUpdate={onUpdate}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        )
      default:
        return (
          <div className="block-placeholder">
            Unsupported block type: {block.type}
          </div>
        )
    }
  }

  return (
    <div
      className={`editable-block ${isFocused ? 'focused' : ''} ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Block Controls */}
      <div className="block-controls">
        <button
          className="block-control-button block-drag-handle"
          title="Drag to reorder"
        >
          ⋮⋮
        </button>
        <button
          className="block-control-button block-add-button"
          onClick={() => setShowBlockMenu(!showBlockMenu)}
          title="Add block"
        >
          +
        </button>
      </div>

      {/* Block Content */}
      <div className="block-content">
        {renderBlockContent()}
      </div>

      {/* Block Actions */}
      {isHovered && (
        <div className="block-actions">
          {!isFirst && (
            <button
              className="block-action-button"
              onClick={() => onMove('up')}
              title="Move up"
            >
              ↑
            </button>
          )}
          {!isLast && (
            <button
              className="block-action-button"
              onClick={() => onMove('down')}
              title="Move down"
            >
              ↓
            </button>
          )}
          <button
            className="block-action-button block-delete-button"
            onClick={onDelete}
            title="Delete block"
          >
            🗑
          </button>
        </div>
      )}

      {/* Block Menu */}
      {showBlockMenu && (
        <BlockMenu
          onSelect={(blockType) => {
            const newBlock = createEmptyBlock(blockType)
            onAddBlock(newBlock)
            setShowBlockMenu(false)
          }}
          onClose={() => setShowBlockMenu(false)}
        />
      )}
    </div>
  )
}

// Helper to create empty blocks
function createEmptyBlock(type: string): Block {
  const id = `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

  switch (type) {
    case 'heading':
      return {
        id,
        type: 'heading',
        level: 2,
        content: '',
        style: { align: 'left' }
      }
    case 'paragraph':
      return {
        id,
        type: 'paragraph',
        content: '',
        style: { align: 'left', indent: 0 }
      }
    case 'list':
      return {
        id,
        type: 'list',
        listType: 'unordered',
        items: [{ content: '' }]
      }
    case 'checklist':
      return {
        id,
        type: 'list',
        listType: 'checklist',
        items: [{ content: '', checked: false }]
      }
    case 'code':
      return {
        id,
        type: 'code',
        language: 'javascript',
        code: '',
        showLineNumbers: true,
        highlightLines: []
      }
    case 'callout':
      return {
        id,
        type: 'callout',
        calloutType: 'info',
        icon: '💡',
        title: 'Note',
        content: ''
      }
    case 'quote':
      return {
        id,
        type: 'quote',
        content: '',
        author: '',
        source: ''
      }
    case 'divider':
      return {
        id,
        type: 'divider',
        style: 'solid'
      }
    case 'image':
      return {
        id,
        type: 'image',
        src: '',
        alt: '',
        caption: '',
        width: '100%',
        style: { align: 'center', rounded: false }
      }
    default:
      return {
        id,
        type: 'paragraph',
        content: '',
        style: { align: 'left', indent: 0 }
      }
  }
}
