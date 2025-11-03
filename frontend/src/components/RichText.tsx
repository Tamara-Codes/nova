import React from 'react'
import { TextSegment } from '../types'

interface RichTextProps {
  segments: TextSegment[]
}

export const RichText: React.FC<RichTextProps> = ({ segments }) => {
  return (
    <>
      {segments.map((segment, index) => {
        const { text, bold, italic, underline, strikethrough, code, color, backgroundColor, link } = segment

        const style: React.CSSProperties = {
          color,
          backgroundColor,
          fontWeight: bold ? 'bold' : undefined,
          fontStyle: italic ? 'italic' : undefined,
          textDecoration: underline ? 'underline' : strikethrough ? 'line-through' : undefined,
        }

        let element: React.ReactNode = text

        if (code) {
          element = (
            <code className="nova-inline-code" style={style}>
              {text}
            </code>
          )
        } else if (link) {
          element = (
            <a
              href={link.href}
              title={link.title}
              className="nova-link"
              style={style}
              target="_blank"
              rel="noopener noreferrer"
            >
              {text}
            </a>
          )
        } else if (Object.keys(style).length > 0 || bold || italic || underline || strikethrough) {
          element = <span style={style}>{text}</span>
        }

        return <React.Fragment key={index}>{element}</React.Fragment>
      })}
    </>
  )
}
