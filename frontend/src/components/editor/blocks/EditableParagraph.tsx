import React, { useRef, useEffect } from 'react'
import { Block } from '../../../types'

interface EditableParagraphProps {
  block: Block & { type: 'paragraph' }
  onUpdate: (updates: Partial<Block>) => void
  onFocus: () => void
  onBlur: () => void
  onDelete: () => void
  onAddBlock: (block: Block) => void
}

export const EditableParagraph: React.FC<EditableParagraphProps> = ({
  block,
  onUpdate,
  onFocus,
  onBlur,
  onDelete,
  onAddBlock,
}) => {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Set initial content
    if (contentRef.current && typeof block.content === 'string') {
      contentRef.current.textContent = block.content
    }
  }, [])

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const text = e.currentTarget.textContent || ''
    onUpdate({ content: text })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // Enter: Create new paragraph
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      const newBlock: Block = {
        id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type: 'paragraph',
        content: '',
        style: { align: 'left', indent: 0 }
      }
      onAddBlock(newBlock)

      // Focus the new block after a short delay
      setTimeout(() => {
        const nextElement = contentRef.current?.parentElement?.parentElement?.nextElementSibling
        const nextContentEditable = nextElement?.querySelector('[contenteditable="true"]') as HTMLElement
        nextContentEditable?.focus()
      }, 10)
    }

    // Backspace on empty: Delete block
    if (e.key === 'Backspace') {
      const text = contentRef.current?.textContent || ''
      if (text === '') {
        e.preventDefault()
        onDelete()
      }
    }
  }

  return (
    <div
      ref={contentRef}
      className="editable-paragraph"
      contentEditable
      suppressContentEditableWarning
      onInput={handleInput}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={handleKeyDown}
      data-placeholder="Type something or press '/' for commands..."
    />
  )
}
