# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Nova is a modern document format designed to replace PDF for the AI age. It combines beautiful rendering (like PDF/Notion), full editability (unlike PDF), semantic structure that AI can parse perfectly, and an open JSON-based format (unlike Notion).

The project consists of:
- **Format specification** (`/schema`) - JSON schema defining the `.nova` document format
- **React renderer** (`/renderer`) - TypeScript library for rendering and editing Nova documents
- **Example documents** (`/renderer/public/examples`) - Sample `.nova` files demonstrating all block types

## Common Commands

### Development
```bash
# Start the development server (runs demo app at localhost:5173)
cd renderer && npm run dev

# Build the renderer library
cd renderer && npm run build:lib

# Build both library and demo app
cd renderer && npm run build

# Preview production build
cd renderer && npm run preview
```

### Installation
```bash
# Install dependencies (from renderer directory)
cd renderer && npm install
```

## Project Architecture

### 1. Document Format

Nova documents are JSON files with three main sections:
- **metadata**: Title, author, timestamps, tags
- **theme**: Typography, colors, spacing (presentation hints)
- **content**: Array of semantic blocks

All TypeScript types are defined in `/renderer/src/types/index.ts`

### 2. Block System

Nova uses a **block-based architecture** (like Notion):
- 11 block types: heading, paragraph, list, table, code, callout, image, quote, divider, layout, embed
- Each block has a unique `id` and `type` discriminator
- Blocks are typed with a union type pattern for type safety
- `BlockRenderer` component (`/renderer/src/components/BlockRenderer.tsx`) dispatches to specific block components

### 3. Renderer Architecture

**Core Components:**
- `NovaRenderer` - Top-level component that renders a complete document
- `BlockRenderer` - Switches on block type and renders appropriate component
- Individual block components (e.g., `Heading`, `Paragraph`, `Code`) in `/renderer/src/components/`
- `ThemeProvider` - React context providing theme values via CSS variables

**Key Pattern:** The renderer separates **presentation** (block components) from **structure** (types). Each block component receives a typed block prop and handles its own rendering logic.

### 4. Editor Architecture

**Location:** `/renderer/src/components/editor/`

**Structure:**
- `BlockEditor` - Main editor container with toolbar, manages block array state
- `EditableBlock` - Wrapper that adds block controls (delete, move up/down, add block)
- Individual editable blocks in `/renderer/src/components/editor/blocks/` (e.g., `EditableParagraph`, `EditableHeading`)

**State Management:** Editor uses local state with `useState` for blocks array. Operations (add, delete, update, move) are handled via callbacks passed down from `BlockEditor`.

### 5. Demo Application

**Location:** `/renderer/src/demo/App.tsx`

The demo app showcases the renderer with:
- **Multiple view modes**: Visual (rendered), Semantic (JSON tree), AI (linearized), Dual (side-by-side)
- **Live editing**: Switch to edit mode to modify documents with the block editor
- **Example documents**: Three sample documents loaded from `/renderer/public/examples/`

**View Modes:**
- `visual` - Standard beautiful rendering
- `semantic` - Hierarchical JSON structure view
- `ai` - Flattened, AI-optimized text representation
- `dual` - Split-pane showing human and AI views simultaneously

### 6. Styling Architecture

**Technologies:** Tailwind CSS + custom CSS + shadcn/ui components

**CSS Organization:**
- `/renderer/src/styles/index.css` - Base styles and theme CSS variables
- `/renderer/src/styles/views.css` - View mode specific styles (dual-pane, etc.)
- `/renderer/src/styles/globals.css` - Tailwind directives and global resets
- `/renderer/src/components/editor/editor.css` - Editor-specific styles
- Individual component CSS in component files (legacy, mostly migrated to Tailwind)

**Theme System:** Uses CSS variables defined by `ThemeProvider` based on document theme. This allows runtime theme switching without rebuilding CSS.

### 7. Build Configuration

**Vite Configuration** (`/renderer/vite.config.ts`):
- Uses `@vitejs/plugin-react` for React support
- Configured for **library mode** with ES modules output
- React and ReactDOM are external dependencies (peer dependencies)
- Path alias: `@/*` maps to `/renderer/src/*`

**TypeScript Configuration** (`/renderer/tsconfig.json`):
- Target: ES2020 with DOM types
- Module resolution: bundler mode
- Strict mode enabled
- Path alias: `@/*` → `./src/*`

## Important Implementation Details

### Rich Text Handling

Content can be either a plain string OR an array of `TextSegment` objects with formatting:
```typescript
content: string | TextSegment[]
```

The `RichText` component (`/renderer/src/components/RichText.tsx`) handles both cases:
- Plain string: renders as-is
- Array: applies inline formatting (bold, italic, links, colors, etc.)

This pattern is used in: paragraphs, list items, callouts, quotes.

### Type Safety Pattern

The codebase uses **discriminated unions** for type safety:
```typescript
export type Block = HeadingBlock | ParagraphBlock | ListBlock | ...

// Each block extends BaseBlock with specific type literal
export interface HeadingBlock extends BaseBlock {
  type: 'heading'  // type literal for discrimination
  level: 1 | 2 | 3 | 4 | 5 | 6
  content: string
}
```

When handling blocks, always check the `type` field first. TypeScript will narrow the type automatically.

### Code Syntax Highlighting

Uses **highlight.js** library:
- Import CSS theme: `highlight.js/styles/github-dark.css`
- Language detection: Pass `language` prop to Code block
- Auto-highlighting: Code component calls `hljs.highlightElement()` on mount

### Nested Blocks

The `LayoutBlock` supports **nested blocks** via columns:
```typescript
{
  type: 'layout',
  columns: [
    { width: '1fr', content: Block[] },  // Nested blocks
    { width: '1fr', content: Block[] }
  ]
}
```

`ListBlock` also supports nesting via `children` in list items. Be careful with recursive rendering - the `BlockRenderer` handles this.

## File Naming Conventions

- React components: PascalCase (e.g., `NovaRenderer.tsx`, `BlockEditor.tsx`)
- Types: `index.ts` for centralized type exports
- Demo/example files: lowercase with hyphens (e.g., `sample-document.nova`)
- Utilities: camelCase (e.g., `ThemeContext.tsx`)

## Key Dependencies

- **React 18** - UI framework (peer dependency)
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **highlight.js** - Code syntax highlighting
- **@radix-ui** - Accessible UI primitives (tabs, separator)
- **lucide-react** - Icon library

## Schema Validation

The format is defined by JSON Schema in `/schema/nova-schema.json`. This schema should be kept in sync with the TypeScript types in `/renderer/src/types/index.ts`.

## Current State (Per PLAN.md)

**Completed (Week 1):**
- ✅ Complete Nova format specification
- ✅ React renderer with all 11 block types
- ✅ Beautiful typography and styling (Inter + Fira Code)
- ✅ Block-based editor with live editing
- ✅ Multiple view modes (visual, semantic, AI, dual)
- ✅ Demo app running locally

**Next Steps (Week 1-2):**
- Python SDK for programmatic document creation
- Markdown → Nova converter
- Public deployment (Vercel)
- Documentation site

## Testing Approach

Currently no automated tests. When adding tests:
- Test block rendering with various content types
- Test rich text formatting edge cases
- Test editor operations (add, delete, move, update blocks)
- Test theme application and CSS variable injection
- Test view mode switching

## Common Pitfalls

1. **Block IDs must be unique** - When creating new blocks, always generate unique IDs (use `crypto.randomUUID()` or similar)
2. **Rich text can be string OR array** - Always handle both cases with RichText component
3. **Theme is optional** - Documents may not have a theme; provide sensible defaults
4. **Recursive rendering** - Layout and List blocks can nest; avoid infinite loops
5. **External vs. peer dependencies** - When building the library, React must be external

## Extending the Format

To add a new block type:
1. Add interface to `/renderer/src/types/index.ts` (extend `BaseBlock`)
2. Add to `Block` union type
3. Create component in `/renderer/src/components/NewBlock.tsx`
4. Add case to `BlockRenderer` switch statement
5. Create editable version in `/renderer/src/components/editor/blocks/EditableNewBlock.tsx`
6. Add case to `EditableBlock` switch statement
7. Update JSON schema in `/schema/nova-schema.json`
8. Export component from `/renderer/src/index.ts`
