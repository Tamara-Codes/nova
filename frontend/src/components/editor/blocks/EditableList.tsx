import React, { useState } from 'react'
import { Block } from '../../../types'

interface EditableListProps {
  block: Block & { type: 'list' }
  onUpdate: (updates: Partial<Block>) => void
  onFocus: () => void
  onBlur: () => void
}

export const EditableList: React.FC<EditableListProps> = ({
  block,
  onUpdate,
  onFocus,
  onBlur,
}) => {
  const listType = block.listType || 'unordered'
  const items = block.items || []

  const updateItem = (index: number, content: string) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], content }
    onUpdate({ items: newItems })
  }

  const toggleChecked = (index: number) => {
    if (listType !== 'checklist') return
    const newItems = [...items]
    newItems[index] = { ...newItems[index], checked: !newItems[index].checked }
    onUpdate({ items: newItems })
  }

  const addItem = (afterIndex: number) => {
    const newItems = [...items]
    newItems.splice(afterIndex + 1, 0, {
      content: '',
      checked: listType === 'checklist' ? false : undefined
    })
    onUpdate({ items: newItems })
  }

  const deleteItem = (index: number) => {
    if (items.length === 1) return // Keep at least one item
    const newItems = items.filter((_, i) => i !== index)
    onUpdate({ items: newItems })
  }

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addItem(index)
      // Focus next item
      setTimeout(() => {
        const nextInput = e.currentTarget.parentElement?.parentElement?.nextElementSibling?.querySelector('input')
        nextInput?.focus()
      }, 10)
    } else if (e.key === 'Backspace' && (e.target as HTMLInputElement).value === '') {
      e.preventDefault()
      deleteItem(index)
    }
  }

  const changeListType = (newType: 'unordered' | 'ordered' | 'checklist') => {
    const newItems = items.map(item => ({
      ...item,
      checked: newType === 'checklist' ? (item.checked ?? false) : undefined
    }))
    onUpdate({ listType: newType, items: newItems })
  }

  return (
    <div className="editable-list-wrapper">
      <div className="list-type-picker">
        <button
          className={`list-type-button ${listType === 'unordered' ? 'active' : ''}`}
          onClick={() => changeListType('unordered')}
          title="Bulleted list"
        >
          •
        </button>
        <button
          className={`list-type-button ${listType === 'ordered' ? 'active' : ''}`}
          onClick={() => changeListType('ordered')}
          title="Numbered list"
        >
          1.
        </button>
        <button
          className={`list-type-button ${listType === 'checklist' ? 'active' : ''}`}
          onClick={() => changeListType('checklist')}
          title="Checklist"
        >
          ☐
        </button>
      </div>

      <div className={`editable-list editable-list-${listType}`}>
        {items.map((item, index) => (
          <div key={index} className="editable-list-item">
            {listType === 'checklist' && (
              <input
                type="checkbox"
                checked={item.checked || false}
                onChange={() => toggleChecked(index)}
                className="list-item-checkbox"
              />
            )}
            {listType === 'ordered' && (
              <span className="list-item-number">{index + 1}.</span>
            )}
            {listType === 'unordered' && (
              <span className="list-item-bullet">•</span>
            )}
            <input
              type="text"
              value={typeof item.content === 'string' ? item.content : ''}
              onChange={(e) => updateItem(index, e.target.value)}
              onFocus={onFocus}
              onBlur={onBlur}
              onKeyDown={(e) => handleKeyDown(e, index)}
              placeholder="List item"
              className="list-item-input"
            />
          </div>
        ))}
        <button
          className="add-list-item-button"
          onClick={() => addItem(items.length - 1)}
        >
          + Add item
        </button>
      </div>
    </div>
  )
}
