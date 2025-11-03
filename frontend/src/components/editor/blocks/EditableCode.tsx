import React, { useState } from 'react'
import { Block } from '../../../types'

interface EditableCodeProps {
  block: Block & { type: 'code' }
  onUpdate: (updates: Partial<Block>) => void
  onFocus: () => void
  onBlur: () => void
}

const COMMON_LANGUAGES = [
  'javascript', 'typescript', 'python', 'java', 'cpp', 'csharp',
  'go', 'rust', 'php', 'ruby', 'swift', 'kotlin',
  'html', 'css', 'sql', 'bash', 'json', 'yaml', 'markdown'
]

export const EditableCode: React.FC<EditableCodeProps> = ({
  block,
  onUpdate,
  onFocus,
  onBlur,
}) => {
  const [showLanguagePicker, setShowLanguagePicker] = useState(false)
  const language = block.language || 'javascript'
  const code = block.code || ''
  const caption = block.caption || ''

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdate({ code: e.target.value })
  }

  const handleCaptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ caption: e.target.value })
  }

  const handleLanguageChange = (newLanguage: string) => {
    onUpdate({ language: newLanguage })
    setShowLanguagePicker(false)
  }

  return (
    <div className="editable-code-wrapper">
      <div className="code-header">
        <button
          className="code-language-button"
          onClick={() => setShowLanguagePicker(!showLanguagePicker)}
        >
          {language}
        </button>
        <input
          type="text"
          value={caption}
          onChange={handleCaptionChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder="Caption (optional)"
          className="code-caption-input"
        />
      </div>

      {showLanguagePicker && (
        <div className="code-language-picker">
          <div className="language-picker-header">Select Language</div>
          <div className="language-picker-list">
            {COMMON_LANGUAGES.map((lang) => (
              <button
                key={lang}
                className={`language-option ${lang === language ? 'active' : ''}`}
                onClick={() => handleLanguageChange(lang)}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      )}

      <textarea
        value={code}
        onChange={handleCodeChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder="Enter your code..."
        className="editable-code-textarea"
        spellCheck={false}
      />
    </div>
  )
}
