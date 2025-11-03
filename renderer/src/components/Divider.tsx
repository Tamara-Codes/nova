import React from 'react'
import { DividerBlock } from '../types'

interface DividerProps {
  block: DividerBlock
}

export const Divider: React.FC<DividerProps> = ({ block }) => {
  const { style = 'solid' } = block

  return <hr className={`nova-divider nova-divider-${style}`} />
}
