import React from 'react'
import { TableBlock } from '../types'

interface TableProps {
  block: TableBlock
}

export const Table: React.FC<TableProps> = ({ block }) => {
  const { caption, headers, rows, style } = block

  const className = [
    'nova-table-wrapper',
    style?.stripes ? 'nova-table-striped' : '',
    style?.borders ? `nova-table-borders-${style.borders}` : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={className}>
      <table className="nova-table">
        {headers && headers.length > 0 && (
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index} className="nova-table-header">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="nova-table-row">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="nova-table-cell">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {caption && <p className="nova-table-caption">{caption}</p>}
    </div>
  )
}
