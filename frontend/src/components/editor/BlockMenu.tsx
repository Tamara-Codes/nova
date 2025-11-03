import React, { useEffect, useRef } from 'react'

interface BlockMenuProps {
  onSelect: (blockType: string) => void
  onClose: () => void
}

interface BlockType {
  type: string
  icon: string
  label: string
  description: string
}

const BLOCK_TYPES: BlockType[] = [
  { type: 'paragraph', icon: '¶', label: 'Paragraph', description: 'Plain text block' },
  { type: 'heading', icon: 'H', label: 'Heading', description: 'Section heading' },
  { type: 'divider', icon: '—', label: 'Divider', description: 'Visual separator' },
  { type: 'list', icon: '•', label: 'List', description: 'Bulleted list' },
  { type: 'checklist', icon: '☐', label: 'Checklist', description: 'To-do list' },
  { type: 'quote', icon: '"', label: 'Quote', description: 'Block quote' },
  { type: 'code', icon: '<>', label: 'Code', description: 'Code block' },
  { type: 'callout', icon: '💡', label: 'Callout', description: 'Highlighted note' },
  { type: 'table', icon: '⊞', label: 'Table', description: 'Data table' },
  { type: 'image', icon: '🖼', label: 'Image', description: 'Upload or embed' },
]

export const BlockMenu: React.FC<BlockMenuProps> = ({ onSelect, onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])

  return (
    <div className="block-menu" ref={menuRef}>
      <div className="block-menu-header">
        <span>Add a block</span>
      </div>
      <div className="block-menu-list">
        {BLOCK_TYPES.map((blockType) => (
          <button
            key={blockType.type}
            className="block-menu-item"
            onClick={() => onSelect(blockType.type)}
          >
            <span className="block-menu-item-icon">{blockType.icon}</span>
            <div className="block-menu-item-content">
              <div className="block-menu-item-label">{blockType.label}</div>
              <div className="block-menu-item-description">{blockType.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
