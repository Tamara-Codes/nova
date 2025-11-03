# Nova Renderer

Beautiful React component library for rendering Nova documents.

## Features

- 📄 **Beautiful by Default** - Typography and layouts inspired by Medium and Notion
- 🎨 **Themeable** - Custom themes with CSS variables
- 🔍 **Syntax Highlighting** - Code blocks with highlight.js
- 📱 **Responsive** - Mobile-friendly and print-optimized
- ♿ **Accessible** - Semantic HTML with proper ARIA attributes
- ⚡ **Fast** - Optimized React components with minimal re-renders

## Installation

```bash
npm install @nova-format/renderer
```

## Usage

### Basic Example

```tsx
import { NovaRenderer } from '@nova-format/renderer'
import '@nova-format/renderer/styles.css'
import 'highlight.js/styles/github-dark.css'

function App() {
  const document = {
    version: '1.0.0',
    metadata: {
      title: 'Hello Nova',
      author: 'John Doe',
    },
    content: [
      {
        id: 'h1',
        type: 'heading',
        level: 1,
        content: 'Welcome to Nova',
      },
      {
        id: 'p1',
        type: 'paragraph',
        content: 'This is a beautiful Nova document!',
      },
    ],
  }

  return <NovaRenderer document={document} />
}
```

### Loading from JSON

```tsx
import { NovaRenderer } from '@nova-format/renderer'

function App() {
  const [doc, setDoc] = useState(null)

  useEffect(() => {
    fetch('/path/to/document.nova')
      .then(res => res.json())
      .then(setDoc)
  }, [])

  if (!doc) return <div>Loading...</div>

  return <NovaRenderer document={doc} />
}
```

### Custom Theme

```tsx
const document = {
  version: '1.0.0',
  metadata: { title: 'Dark Mode' },
  theme: {
    name: 'dark',
    typography: {
      fontFamily: 'Inter',
      baseFontSize: 18,
    },
    colors: {
      primary: '#60A5FA',
      background: '#1F2937',
      text: '#F9FAFB',
    },
  },
  content: [...],
}

<NovaRenderer document={document} />
```

## Supported Block Types

- **Heading** - H1 through H6 with anchors
- **Paragraph** - Rich text with formatting
- **List** - Ordered, unordered, and checklists
- **Table** - Data tables with styling options
- **Code** - Syntax-highlighted code blocks
- **Callout** - Info, warning, success, error, and note callouts
- **Image** - Images with captions
- **Quote** - Blockquotes with attribution
- **Divider** - Section separators
- **Layout** - Multi-column layouts
- **Embed** - Video and iframe embeds

## Styling

The renderer uses CSS variables for easy customization:

```css
:root {
  --nova-font-family: 'Your Font', sans-serif;
  --nova-color-primary: #your-color;
  --nova-base-font-size: 18px;
  /* ... more variables */
}
```

See `src/styles/index.css` for all available variables.

## Development

```bash
# Install dependencies
npm install

# Run demo app
npm run dev

# Build library
npm run build:lib
```

## License

MIT
