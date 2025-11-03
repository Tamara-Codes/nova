import React from 'react'
import { ListBlock, ListItem as ListItemType } from '../types'
import { RichText } from './RichText'
import { BlockRenderer } from './BlockRenderer'

interface ListProps {
  block: ListBlock
}

export const List: React.FC<ListProps> = ({ block }) => {
  const { listType, items } = block

  const ListTag = listType === 'ordered' ? 'ol' : 'ul'
  const className = `nova-list nova-list-${listType}`

  return (
    <ListTag className={className}>
      {items.map((item, index) => (
        <ListItem key={index} item={item} listType={listType} />
      ))}
    </ListTag>
  )
}

interface ListItemProps {
  item: ListItemType
  listType: 'ordered' | 'unordered' | 'checklist'
}

const ListItem: React.FC<ListItemProps> = ({ item, listType }) => {
  const { content, checked, children } = item

  return (
    <li className="nova-list-item">
      {listType === 'checklist' && (
        <input
          type="checkbox"
          checked={checked || false}
          readOnly
          className="nova-checkbox"
        />
      )}
      <span className="nova-list-content">
        {typeof content === 'string' ? (
          content
        ) : (
          <RichText segments={content} />
        )}
      </span>
      {children && children.length > 0 && (
        <div className="nova-list-children">
          {children.map((childBlock, index) => (
            <BlockRenderer key={index} block={childBlock} />
          ))}
        </div>
      )}
    </li>
  )
}
