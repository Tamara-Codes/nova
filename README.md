# Nova - Modern Document Format for the AI Age

**Version:** 1.0.0
**Status:** Active Development

## Overview

Nova is a modern document format designed to replace PDF for the AI age. It combines the beauty of PDF, the editability of Notion, and the semantic structure that AI can parse perfectly.

This repository contains:
- **Format Specification** (`/schema`) - JSON schema for the Nova document format
- **Frontend** (`/frontend`) - React-based editor and renderer
- **Backend** (`/backend`) - FastAPI REST API with SQLite database

## Quick Start

### Backend Setup

```bash
cd backend
conda create -n nova python=3.11
conda activate nova
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend runs at `http://localhost:8000`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`

### Key Principles

1. **Semantic Structure** - Content is structured with meaning, not just presentation
2. **AI-Ready** - Easy for LLMs and RAG systems to parse and understand
3. **Beautiful by Default** - Presentation hints ensure gorgeous rendering
4. **Open & Extensible** - JSON-based, human-readable, version-controlled
5. **Editor-Friendly** - Block-based structure like modern editors (Notion, etc.)

## Format Structure

A Nova document is a JSON file with three main sections:

```json
{
  "version": "1.0.0",
  "metadata": { ... },
  "theme": { ... },
  "content": [ ... ]
}
```

### 1. Metadata

Essential document information for indexing and organization:

```json
{
  "metadata": {
    "title": "Document Title",
    "description": "Brief description",
    "author": "Author Name",
    "createdAt": "2025-01-15T10:30:00Z",
    "updatedAt": "2025-01-15T14:45:00Z",
    "tags": ["technical", "API", "documentation"],
    "language": "en"
  }
}
```

**Why this matters for AI:**
- Clear title and description for semantic search
- Tags enable categorization in RAG systems
- Timestamps track document freshness

### 2. Theme

Document-wide styling that ensures beautiful rendering:

```json
{
  "theme": {
    "name": "default",
    "typography": {
      "fontFamily": "Inter",
      "headingFontFamily": "Inter",
      "codeFontFamily": "Fira Code",
      "baseFontSize": 16,
      "lineHeight": 1.6
    },
    "colors": {
      "primary": "#0066CC",
      "background": "#FFFFFF",
      "text": "#1A1A1A",
      "accent": "#FF6B6B"
    },
    "spacing": {
      "paragraphSpacing": 1.5,
      "sectionSpacing": 3
    }
  }
}
```

**Design Decision:** Themes are optional but provide consistent, beautiful defaults. Unlike PDF (fixed) or Markdown (no styling), Nova balances beauty with flexibility.

### 3. Content Blocks

Content is an array of semantic blocks. Each block has:
- `id` - Unique identifier
- `type` - Block type (heading, paragraph, etc.)
- Type-specific properties

## Block Types

### Heading

```json
{
  "id": "h1",
  "type": "heading",
  "level": 1,
  "content": "Introduction to Nova",
  "anchor": "introduction",
  "style": {
    "align": "left"
  }
}
```

**Levels:** 1-6 (h1 through h6)
**AI Benefit:** Clear document structure and hierarchy

### Paragraph

```json
{
  "id": "p1",
  "type": "paragraph",
  "content": "Nova is a modern document format...",
  "style": {
    "align": "left",
    "indent": 0
  }
}
```

### Rich Text Formatting

Content can be plain text or an array of formatted segments:

```json
{
  "content": [
    {
      "text": "This is ",
      "bold": false
    },
    {
      "text": "bold",
      "bold": true
    },
    {
      "text": " and ",
      "bold": false
    },
    {
      "text": "italic",
      "italic": true
    },
    {
      "text": " text with a ",
      "bold": false
    },
    {
      "text": "link",
      "link": {
        "href": "https://example.com",
        "title": "Example"
      }
    }
  ]
}
```

**Supported formatting:**
- `bold`, `italic`, `underline`, `strikethrough`
- `code` (inline code)
- `color`, `backgroundColor`
- `link` (with href and title)

### List

```json
{
  "id": "list1",
  "type": "list",
  "listType": "unordered",
  "items": [
    {
      "content": "First item"
    },
    {
      "content": "Second item",
      "children": [
        {
          "type": "list",
          "listType": "unordered",
          "items": [
            { "content": "Nested item" }
          ]
        }
      ]
    }
  ]
}
```

**List Types:**
- `ordered` - Numbered lists
- `unordered` - Bullet lists
- `checklist` - Interactive checkboxes

**Checklist Example:**
```json
{
  "type": "list",
  "listType": "checklist",
  "items": [
    { "content": "Completed task", "checked": true },
    { "content": "Pending task", "checked": false }
  ]
}
```

### Table

```json
{
  "id": "table1",
  "type": "table",
  "caption": "API Endpoints",
  "headers": ["Method", "Endpoint", "Description"],
  "rows": [
    ["GET", "/api/docs", "List all documents"],
    ["POST", "/api/docs", "Create new document"]
  ],
  "style": {
    "headerStyle": "both",
    "stripes": true,
    "borders": "all"
  }
}
```

**AI Benefit:** Structured data is preserved, not flattened like in PDF

### Code Block

```json
{
  "id": "code1",
  "type": "code",
  "language": "python",
  "code": "def hello():\n    print('Hello, Nova!')",
  "caption": "example.py",
  "showLineNumbers": true,
  "highlightLines": [2]
}
```

**Features:**
- Syntax highlighting via `language`
- Line numbers
- Line highlighting
- Caption for filename/description

### Callout

```json
{
  "id": "callout1",
  "type": "callout",
  "calloutType": "info",
  "title": "Important Note",
  "icon": "💡",
  "content": "This is an informational callout."
}
```

**Callout Types:**
- `info` - Blue, informational
- `warning` - Yellow, caution
- `success` - Green, positive
- `error` - Red, critical
- `note` - Gray, general note

### Image

```json
{
  "id": "img1",
  "type": "image",
  "src": "https://example.com/image.png",
  "alt": "Descriptive alt text",
  "caption": "Figure 1: System Architecture",
  "width": "100%",
  "style": {
    "align": "center",
    "rounded": false
  }
}
```

**src** can be:
- External URL
- Data URI (base64 embedded)
- Relative path (for bundled assets)

### Quote

```json
{
  "id": "quote1",
  "type": "quote",
  "content": "Design is not just what it looks like. Design is how it works.",
  "author": "Steve Jobs",
  "source": "New York Times, 2003"
}
```

### Divider

```json
{
  "id": "div1",
  "type": "divider",
  "style": "solid"
}
```

**Styles:** `solid`, `dashed`, `dotted`, `thick`

### Layout (Columns)

```json
{
  "id": "layout1",
  "type": "layout",
  "columns": [
    {
      "width": "1fr",
      "content": [
        {
          "id": "p1",
          "type": "paragraph",
          "content": "Left column content"
        }
      ]
    },
    {
      "width": "1fr",
      "content": [
        {
          "id": "p2",
          "type": "paragraph",
          "content": "Right column content"
        }
      ]
    }
  ],
  "gap": 2
}
```

**Column widths:**
- `1fr`, `2fr` - Fractional units (flexible)
- `50%`, `33.33%` - Percentages
- `300px` - Fixed pixels

### Embed

```json
{
  "id": "embed1",
  "type": "embed",
  "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "embedType": "video",
  "caption": "Introduction Video",
  "aspectRatio": "16:9"
}
```

**Embed Types:** `video`, `tweet`, `iframe`, `audio`

## Design Decisions

### Why JSON?

- **Human-readable** - Easy to understand and debug
- **Machine-parseable** - Standard format for all languages
- **Version-controllable** - Works with Git, diffs are meaningful
- **Extensible** - Easy to add new block types without breaking compatibility

### Why Block-Based?

- **Modern UX** - Users expect Notion-like editing
- **Clear Structure** - Each block is self-contained
- **AI-Friendly** - Clear semantic boundaries
- **Flexible** - Easy to reorder, nest, and compose

### Why Presentation Hints?

- **Beautiful by Default** - No CSS fighting
- **Consistent** - Same document looks good everywhere
- **Flexible** - Themes can be overridden per-document
- **Accessible** - Semantic structure + presentation hints = best of both worlds

### Why Not Markdown?

Markdown is great for simple docs, but:
- No standard for complex layouts (columns, callouts, etc.)
- No semantic metadata (title, author, etc.)
- No presentation hints (looks plain without CSS)
- No structured data (tables become ASCII art)

Nova keeps Markdown's simplicity while adding structure and beauty.

### Why Not PDF?

PDF is beautiful but:
- Not editable (frozen)
- Not AI-friendly (text extraction is messy)
- Not version-controllable (binary format)
- Not accessible (structure is lost)

Nova is PDF for the AI age.

## File Extension

Use `.nova` for Nova document files:
```
technical-spec.nova
quarterly-report.nova
api-documentation.nova
```

## MIME Type

Proposed: `application/vnd.nova+json`

## Validation

Validate Nova documents against the JSON schema:

```bash
# Using ajv-cli
ajv validate -s nova-schema.json -d document.nova

# Using Python jsonschema
python -m jsonschema -i document.nova nova-schema.json
```

## Versioning

Format version is specified in the `version` field:

```json
{
  "version": "1.0.0"
}
```

**Version policy:**
- Major: Breaking changes to schema
- Minor: New block types or properties (backward compatible)
- Patch: Documentation updates, clarifications

## Examples

See `/examples/` directory for complete example documents:
- `sample-document.nova` - Comprehensive example showing all block types
- `technical-spec.nova` - Real-world API documentation example
- `article.nova` - Content article with images and quotes

## Next Steps

1. Build Python SDK for creating/parsing Nova files
2. Build React renderer component library
3. Build web-based editor
4. Create conversion tools (Markdown → Nova, HTML → Nova)

## Contributing

The Nova format is open source (MIT). Contributions welcome:
- New block types
- Improved validation rules
- Better documentation
- Example documents

## License

MIT License - See LICENSE file for details
