import React from 'react'
import { HeadingBlock } from '../types'

interface HeadingProps {
  block: HeadingBlock
}

export const Heading: React.FC<HeadingProps> = ({ block }) => {
  const { level, content, anchor, style } = block
  const Tag = `h${level}` as keyof JSX.IntrinsicElements

  const className = `nova-heading nova-h${level}`
  const inlineStyle: React.CSSProperties = {
    textAlign: style?.align || 'left',
  }

  return (
    <Tag
      id={anchor}
      className={className}
      style={inlineStyle}
    >
      {content}
    </Tag>
  )
}
