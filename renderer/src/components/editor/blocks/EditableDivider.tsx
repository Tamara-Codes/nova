import React from 'react'
import { Block } from '../../../types'

interface EditableDividerProps {
  block: Block & { type: 'divider' }
  onUpdate: (updates: Partial<Block>) => void
}

const DIVIDER_STYLES = [
  { style: 'solid', label: 'Solid', preview: '────────' },
  { style: 'dashed', label: 'Dashed', preview: '─ ─ ─ ─' },
  { style: 'dotted', label: 'Dotted', preview: '· · · · ·' },
  { style: 'thick', label: 'Thick', preview: '━━━━━━━━' },
]

export const EditableDivider: React.FC<EditableDividerProps> = ({
  block,
  onUpdate,
}) => {
  const style = block.style || 'solid'

  return (
    <div className="editable-divider-wrapper">
      <div className="divider-style-picker">
        {DIVIDER_STYLES.map((ds) => (
          <button
            key={ds.style}
            className={`divider-style-button ${ds.style === style ? 'active' : ''}`}
            onClick={() => onUpdate({ style: ds.style })}
            title={ds.label}
          >
            <span className="divider-preview">{ds.preview}</span>
          </button>
        ))}
      </div>
      <hr className={`editable-divider editable-divider-${style}`} />
    </div>
  )
}
