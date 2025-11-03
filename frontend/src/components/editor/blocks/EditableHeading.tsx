import React, { useRef, useEffect, useState } from 'react'
import { Block } from '../../../types'

interface EditableHeadingProps {
  block: Block & { type: 'heading' }
  onUpdate: (updates: Partial<Block>) => void
  onFocus: () => void
  onBlur: () => void
}

export const EditableHeading: React.FC<EditableHeadingProps> = ({
  block,
  onUpdate,
  onFocus,
  onBlur,
}) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const [showLevelPicker, setShowLevelPicker] = useState(false)
  const level = block.level || 1

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

  const handleLevelChange = (newLevel: number) => {
    onUpdate({ level: newLevel })
    setShowLevelPicker(false)
  }

  const getHeadingClass = () => {
    return `editable-heading editable-heading-${level}`
  }

  return (
    <div className="editable-heading-wrapper">
      <div className="heading-level-badge" onClick={() => setShowLevelPicker(!showLevelPicker)}>
        H{level}
      </div>
      <div
        ref={contentRef}
        className={getHeadingClass()}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onFocus={onFocus}
        onBlur={onBlur}
        data-placeholder={`Heading ${level}`}
      />
      {showLevelPicker && (
        <div className="heading-level-picker">
          {[1, 2, 3, 4, 5, 6].map((l) => (
            <button
              key={l}
              className={`heading-level-option ${l === level ? 'active' : ''}`}
              onClick={() => handleLevelChange(l)}
            >
              H{l}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
