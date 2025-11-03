import React, { useEffect, useRef } from 'react'
import { CodeBlock } from '../types'
import hljs from 'highlight.js'

interface CodeProps {
  block: CodeBlock
}

export const Code: React.FC<CodeProps> = ({ block }) => {
  const { language, code, caption, showLineNumbers = true, highlightLines = [] } = block
  const codeRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current)
    }
  }, [code, language])

  const lines = code.split('\n')
  const highlightSet = new Set(highlightLines)

  return (
    <div className="nova-code-block">
      {caption && <div className="nova-code-caption">{caption}</div>}
      <pre className="nova-code-pre">
        {showLineNumbers ? (
          <div className="nova-code-with-lines">
            <div className="nova-code-line-numbers">
              {lines.map((_, index) => (
                <div
                  key={index}
                  className={`nova-code-line-number ${
                    highlightSet.has(index + 1) ? 'nova-code-line-highlighted' : ''
                  }`}
                >
                  {index + 1}
                </div>
              ))}
            </div>
            <code ref={codeRef} className={`language-${language} nova-code`}>
              {code}
            </code>
          </div>
        ) : (
          <code ref={codeRef} className={`language-${language} nova-code`}>
            {code}
          </code>
        )}
      </pre>
    </div>
  )
}
