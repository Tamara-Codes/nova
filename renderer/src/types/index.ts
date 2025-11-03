// Nova Document Format Types

export interface NovaDocument {
  version: string
  metadata: Metadata
  theme?: Theme
  content: Block[]
}

export interface Metadata {
  title: string
  description?: string
  author?: string
  createdAt?: string
  updatedAt?: string
  tags?: string[]
  language?: string
}

export interface Theme {
  name: string
  typography?: Typography
  colors?: Colors
  spacing?: Spacing
}

export interface Typography {
  fontFamily?: string
  headingFontFamily?: string
  codeFontFamily?: string
  baseFontSize?: number
  lineHeight?: number
}

export interface Colors {
  primary?: string
  background?: string
  text?: string
  accent?: string
}

export interface Spacing {
  paragraphSpacing?: number
  sectionSpacing?: number
}

// Block Types

export type Block =
  | HeadingBlock
  | ParagraphBlock
  | ListBlock
  | TableBlock
  | CodeBlock
  | CalloutBlock
  | ImageBlock
  | QuoteBlock
  | DividerBlock
  | LayoutBlock
  | EmbedBlock

export interface BaseBlock {
  id: string
  type: string
}

export interface HeadingBlock extends BaseBlock {
  type: 'heading'
  level: 1 | 2 | 3 | 4 | 5 | 6
  content: string
  anchor?: string
  style?: {
    align?: 'left' | 'center' | 'right'
  }
}

export interface ParagraphBlock extends BaseBlock {
  type: 'paragraph'
  content: string | TextSegment[]
  style?: {
    align?: 'left' | 'center' | 'right' | 'justify'
    indent?: number
  }
}

export interface TextSegment {
  text: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  code?: boolean
  color?: string
  backgroundColor?: string
  link?: {
    href: string
    title?: string
  }
}

export interface ListBlock extends BaseBlock {
  type: 'list'
  listType: 'ordered' | 'unordered' | 'checklist'
  items: ListItem[]
}

export interface ListItem {
  content: string | TextSegment[]
  checked?: boolean
  children?: Block[]
}

export interface TableBlock extends BaseBlock {
  type: 'table'
  caption?: string
  headers: string[]
  rows: string[][]
  style?: {
    headerStyle?: 'row' | 'column' | 'both' | 'none'
    stripes?: boolean
    borders?: 'all' | 'none' | 'horizontal' | 'vertical'
  }
}

export interface CodeBlock extends BaseBlock {
  type: 'code'
  language: string
  code: string
  caption?: string
  showLineNumbers?: boolean
  highlightLines?: number[]
}

export interface CalloutBlock extends BaseBlock {
  type: 'callout'
  calloutType: 'info' | 'warning' | 'success' | 'error' | 'note'
  title?: string
  icon?: string
  content: string | TextSegment[]
}

export interface ImageBlock extends BaseBlock {
  type: 'image'
  src: string
  alt: string
  caption?: string
  width?: string
  style?: {
    align?: 'left' | 'center' | 'right'
    rounded?: boolean
  }
}

export interface QuoteBlock extends BaseBlock {
  type: 'quote'
  content: string | TextSegment[]
  author?: string
  source?: string
}

export interface DividerBlock extends BaseBlock {
  type: 'divider'
  style?: 'solid' | 'dashed' | 'dotted' | 'thick'
}

export interface LayoutBlock extends BaseBlock {
  type: 'layout'
  columns: Column[]
  gap?: number
}

export interface Column {
  width: string
  content: Block[]
}

export interface EmbedBlock extends BaseBlock {
  type: 'embed'
  url: string
  embedType: 'video' | 'tweet' | 'iframe' | 'audio'
  caption?: string
  aspectRatio?: string
}
