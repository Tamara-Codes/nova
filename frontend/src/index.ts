// Main exports
export { NovaRenderer } from './components/NovaRenderer'
export { BlockRenderer } from './components/BlockRenderer'

// Component exports
export { Heading } from './components/Heading'
export { Paragraph } from './components/Paragraph'
export { List } from './components/List'
export { Table } from './components/Table'
export { Code } from './components/Code'
export { Callout } from './components/Callout'
export { Image } from './components/Image'
export { Quote } from './components/Quote'
export { Divider } from './components/Divider'
export { Layout } from './components/Layout'
export { Embed } from './components/Embed'
export { RichText } from './components/RichText'

// Utility exports
export { ThemeProvider, useTheme } from './utils/ThemeContext'

// Type exports
export type {
  NovaDocument,
  Metadata,
  Theme,
  Typography,
  Colors,
  Spacing,
  Block,
  HeadingBlock,
  ParagraphBlock,
  ListBlock,
  TableBlock,
  CodeBlock,
  CalloutBlock,
  ImageBlock,
  QuoteBlock,
  DividerBlock,
  LayoutBlock,
  EmbedBlock,
  TextSegment,
  ListItem,
  Column,
} from './types'

// Import styles
import './styles/index.css'
import 'highlight.js/styles/github-dark.css'
