import React from 'react'
import { Block } from '../types'
import { Heading } from './Heading'
import { Paragraph } from './Paragraph'
import { List } from './List'
import { Table } from './Table'
import { Code } from './Code'
import { Callout } from './Callout'
import { Image } from './Image'
import { Quote } from './Quote'
import { Divider } from './Divider'
import { Layout } from './Layout'
import { Embed } from './Embed'

interface BlockRendererProps {
  block: Block
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({ block }) => {
  switch (block.type) {
    case 'heading':
      return <Heading block={block} />
    case 'paragraph':
      return <Paragraph block={block} />
    case 'list':
      return <List block={block} />
    case 'table':
      return <Table block={block} />
    case 'code':
      return <Code block={block} />
    case 'callout':
      return <Callout block={block} />
    case 'image':
      return <Image block={block} />
    case 'quote':
      return <Quote block={block} />
    case 'divider':
      return <Divider block={block} />
    case 'layout':
      return <Layout block={block} />
    case 'embed':
      return <Embed block={block} />
    default:
      console.warn(`Unknown block type: ${(block as any).type}`)
      return null
  }
}
