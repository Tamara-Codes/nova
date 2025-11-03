import React from 'react'
import { Block } from '../../../types'

interface EditableQuoteProps {
  block: Block & { type: 'quote' }
  onUpdate: (updates: Partial<Block>) => void
  onFocus: () => void
  onBlur: () => void
}

export const EditableQuote: React.FC<EditableQuoteProps> = ({
  block,
  onUpdate,
  onFocus,
  onBlur,
}) => {
  const content = typeof block.content === 'string' ? block.content : ''
  const author = block.author || ''
  const source = block.source || ''

  return (
    <div className="editable-quote">
      <textarea
        value={content}
        onChange={(e) => onUpdate({ content: e.target.value })}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder="Enter quote..."
        className="quote-content-textarea"
        rows={3}
      />
      <div className="quote-attribution">
        <input
          type="text"
          value={author}
          onChange={(e) => onUpdate({ author: e.target.value })}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder="Author (optional)"
          className="quote-author-input"
        />
        <input
          type="text"
          value={source}
          onChange={(e) => onUpdate({ source: e.target.value })}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder="Source (optional)"
          className="quote-source-input"
        />
      </div>
    </div>
  )
}
