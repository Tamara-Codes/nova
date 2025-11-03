import React, { useState } from 'react'
import { Block } from '../../../types'

interface EditableImageProps {
  block: Block & { type: 'image' }
  onUpdate: (updates: Partial<Block>) => void
  onFocus: () => void
  onBlur: () => void
}

const ALIGN_OPTIONS = [
  { value: 'left', label: 'Left', icon: '⬅' },
  { value: 'center', label: 'Center', icon: '↔' },
  { value: 'right', label: 'Right', icon: '➡' },
]

export const EditableImage: React.FC<EditableImageProps> = ({
  block,
  onUpdate,
  onFocus,
  onBlur,
}) => {
  const [showUrlInput, setShowUrlInput] = useState(!block.src)
  const src = block.src || ''
  const alt = block.alt || ''
  const caption = block.caption || ''
  const align = block.style?.align || 'center'
  const width = block.width || '100%'

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Create a local URL for the uploaded file
      const url = URL.createObjectURL(file)
      onUpdate({ src: url, alt: file.name })
      setShowUrlInput(false)
    }
  }

  return (
    <div className="editable-image-wrapper">
      {!src || showUrlInput ? (
        <div className="image-upload-area">
          <div className="image-upload-options">
            <div className="image-upload-option">
              <label className="image-upload-button">
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
            <div className="image-url-divider">or</div>
            <div className="image-upload-option">
              <input
                type="text"
                value={src}
                onChange={(e) => onUpdate({ src: e.target.value })}
                onFocus={onFocus}
                onBlur={onBlur}
                placeholder="Paste image URL..."
                className="image-url-input"
              />
              {src && (
                <button
                  className="image-url-submit"
                  onClick={() => setShowUrlInput(false)}
                >
                  Add Image
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="editable-image-preview">
          <div className="image-controls">
            <div className="image-align-buttons">
              {ALIGN_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  className={`image-align-button ${align === option.value ? 'active' : ''}`}
                  onClick={() => onUpdate({ style: { ...block.style, align: option.value as any } })}
                  title={option.label}
                >
                  {option.icon}
                </button>
              ))}
            </div>
            <div className="image-width-control">
              <label className="image-width-label">Width:</label>
              <select
                value={width}
                onChange={(e) => onUpdate({ width: e.target.value })}
                className="image-width-select"
              >
                <option value="25%">25%</option>
                <option value="50%">50%</option>
                <option value="75%">75%</option>
                <option value="100%">100%</option>
              </select>
            </div>
            <button
              className="image-change-button"
              onClick={() => setShowUrlInput(true)}
            >
              Change Image
            </button>
          </div>

          <div className={`image-container image-align-${align}`}>
            <img
              src={src}
              alt={alt}
              style={{ width, maxWidth: '100%' }}
              className="editable-image"
            />
          </div>

          <div className="image-metadata">
            <input
              type="text"
              value={caption}
              onChange={(e) => onUpdate({ caption: e.target.value })}
              onFocus={onFocus}
              onBlur={onBlur}
              placeholder="Add a caption..."
              className="image-caption-input"
            />
            <input
              type="text"
              value={alt}
              onChange={(e) => onUpdate({ alt: e.target.value })}
              onFocus={onFocus}
              onBlur={onBlur}
              placeholder="Alt text (for accessibility)"
              className="image-alt-input"
            />
          </div>
        </div>
      )}
    </div>
  )
}
