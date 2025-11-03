import React from 'react'
import { CalloutBlock } from '../types'
import { RichText } from './RichText'

interface CalloutProps {
  block: CalloutBlock
}

export const Callout: React.FC<CalloutProps> = ({ block }) => {
  const { calloutType, title, icon, content } = block

  const className = `nova-callout nova-callout-${calloutType}`

  return (
    <div className={className}>
      {(icon || title) && (
        <div className="nova-callout-header">
          {icon && <span className="nova-callout-icon">{icon}</span>}
          {title && <span className="nova-callout-title">{title}</span>}
        </div>
      )}
      <div className="nova-callout-content">
        {typeof content === 'string' ? (
          content
        ) : (
          <RichText segments={content} />
        )}
      </div>
    </div>
  )
}
