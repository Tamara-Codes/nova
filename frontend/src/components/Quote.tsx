import React from 'react'
import { QuoteBlock } from '../types'
import { RichText } from './RichText'

interface QuoteProps {
  block: QuoteBlock
}

export const Quote: React.FC<QuoteProps> = ({ block }) => {
  const { content, author, source } = block

  return (
    <blockquote className="nova-quote">
      <div className="nova-quote-content">
        {typeof content === 'string' ? (
          content
        ) : (
          <RichText segments={content} />
        )}
      </div>
      {(author || source) && (
        <footer className="nova-quote-footer">
          {author && <cite className="nova-quote-author">{author}</cite>}
          {source && <span className="nova-quote-source">{source}</span>}
        </footer>
      )}
    </blockquote>
  )
}
