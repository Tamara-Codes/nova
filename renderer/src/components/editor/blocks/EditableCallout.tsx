import React, { useState } from 'react'
import { Block } from '../../../types'

interface EditableCalloutProps {
  block: Block & { type: 'callout' }
  onUpdate: (updates: Partial<Block>) => void
  onFocus: () => void
  onBlur: () => void
}

const CALLOUT_TYPES = [
  { type: 'info', icon: '💡', label: 'Info' },
  { type: 'success', icon: '✅', label: 'Success' },
  { type: 'warning', icon: '⚠️', label: 'Warning' },
  { type: 'error', icon: '❌', label: 'Error' },
  { type: 'note', icon: '📝', label: 'Note' },
]

export const EditableCallout: React.FC<EditableCalloutProps> = ({
  block,
  onUpdate,
  onFocus,
  onBlur,
}) => {
  const [showTypePicker, setShowTypePicker] = useState(false)
  const calloutType = block.calloutType || 'info'
  const icon = block.icon || '💡'
  const title = block.title || ''
  const content = typeof block.content === 'string' ? block.content : ''

  const handleTypeChange = (type: string, newIcon: string) => {
    onUpdate({ calloutType: type, icon: newIcon })
    setShowTypePicker(false)
  }

  return (
    <div className={`editable-callout editable-callout-${calloutType}`}>
      <div className="callout-header">
        <button
          className="callout-icon-button"
          onClick={() => setShowTypePicker(!showTypePicker)}
          title="Change callout type"
        >
          {icon}
        </button>
        <input
          type="text"
          value={title}
          onChange={(e) => onUpdate({ title: e.target.value })}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder="Callout title"
          className="callout-title-input"
        />
      </div>

      {showTypePicker && (
        <div className="callout-type-picker">
          {CALLOUT_TYPES.map((ct) => (
            <button
              key={ct.type}
              className={`callout-type-option ${ct.type === calloutType ? 'active' : ''}`}
              onClick={() => handleTypeChange(ct.type, ct.icon)}
            >
              <span className="callout-type-icon">{ct.icon}</span>
              <span className="callout-type-label">{ct.label}</span>
            </button>
          ))}
        </div>
      )}

      <textarea
        value={content}
        onChange={(e) => onUpdate({ content: e.target.value })}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder="Callout content..."
        className="callout-content-textarea"
        rows={3}
      />
    </div>
  )
}
