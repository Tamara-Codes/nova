import React from 'react'
import { LayoutBlock } from '../types'
import { BlockRenderer } from './BlockRenderer'

interface LayoutProps {
  block: LayoutBlock
}

export const Layout: React.FC<LayoutProps> = ({ block }) => {
  const { columns, gap = 2 } = block

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: columns.map((col) => col.width).join(' '),
    gap: `${gap}rem`,
  }

  return (
    <div className="nova-layout" style={gridStyle}>
      {columns.map((column, columnIndex) => (
        <div key={columnIndex} className="nova-layout-column">
          {column.content.map((childBlock, blockIndex) => (
            <BlockRenderer key={blockIndex} block={childBlock} />
          ))}
        </div>
      ))}
    </div>
  )
}
