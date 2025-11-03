import React from 'react'
import { ParagraphBlock, TextSegment } from '../types'
import { RichText } from './RichText'

interface ParagraphProps {
  block: ParagraphBlock
}

export const Paragraph: React.FC<ParagraphProps> = ({ block }) => {
  const { content, style } = block

  const inlineStyle: React.CSSProperties = {
    textAlign: style?.align || 'left',
    paddingLeft: style?.indent ? `${style.indent * 2}rem` : undefined,
  }

  return (
    <p className="nova-paragraph" style={inlineStyle}>
      {typeof content === 'string' ? (
        content
      ) : (
        <RichText segments={content} />
      )}
    </p>
  )
}
