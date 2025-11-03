# Nova: Beautiful, Editable, AI-Ready Documents

## Vision
Replace PDF with a modern format that looks beautiful by default, is fully editable, and AI can parse perfectly.

**The killer combo no one else has:**
- ✅ Beautiful (like PDF/Notion)
- ✅ Editable (unlike PDF)
- ✅ AI-ready (unlike PDF)
- ✅ Open format (unlike Notion)

## Target Users
1. **Developers** - API docs, technical specs, RAG systems
2. **Companies** - Reports, presentations, internal docs (currently using PDF)
3. **Content creators** - Articles, portfolios, case studies
4. **Anyone** replacing their "write in Docs → export to PDF" workflow

## Phases

### Phase 1: Format + Viewer + Editor (Month 1)
**Goal:** Validate via GitHub stars and real usage

**Week 1: Format + Beautiful Renderer**
- Design .nova JSON schema (semantic structure + presentation hints)
- Format includes: headings, paragraphs, tables, callouts, images, layouts, themes
- Python SDK for creating/parsing .nova files
- **Beautiful web renderer** (React component library)
  - Typography like Medium
  - Layouts like Notion
  - Dark mode, responsive, print-friendly
- Open source everything on GitHub

**Week 2: Editor + Sharing**
- Web-based editor (Notion-like UX, not plain Markdown)
- Create beautiful .nova documents from scratch
- Live preview as you type
- Export to .nova file
- **Shareable links** (view anyone's .nova beautifully)
- Deploy free on Vercel

**Week 3: RAG Integrations**
- LangChain loader
- LlamaIndex reader
- Example integrations with ChromaDB, Pinecone
- Markdown → .nova converter (for migration)
- Show it's trivial to use for AI

**Week 4: Launch**
- Documentation site (written in .nova, of course)
- **Demo**: Same content in PDF vs .nova (side-by-side)
- Show RAG accuracy difference
- HackerNews launch: "Nova - A modern document format to replace PDF"
- GitHub README with gorgeous examples

**Success Metric:** 1,000 GitHub stars + people actually creating docs

---

### Phase 2: PDF Converter (Month 2-3)
**Only if Phase 1 succeeds**

- Vision model integration (Claude/GPT-4V)
- PDF → .nova converter
- Web interface for uploading PDFs
- Pricing: Free tier + paid for volume

## Why This Works

**Clear value proposition:**
- PDF is beautiful but frozen → .nova is beautiful AND editable
- Notion is great but proprietary → .nova is open
- Markdown is AI-friendly but looks plain → .nova is AI-friendly AND gorgeous

**No chicken-and-egg:**
- Create NEW documents (no conversion needed in Phase 1)
- Shareable links work immediately (no reader software needed)
- Beautiful by default (no CSS fighting)

**Fast validation:**
- If people don't create docs in it → pivot quickly
- If GitHub doesn't star it → we know in weeks, not months

**Market timing:**
- Everyone needs RAG-ready docs NOW
- PDF workflow is painful (everyone knows it)
- AI makes this the right moment

## Business Model (Future)

**Open core approach:**
- Format spec: Open source (MIT)
- Renderer library: Open source (React components)
- Editor: Open source + hosted SaaS

**Revenue streams:**
- Free: Create and share .nova files
- Pro ($15/mo): Team collaboration, custom themes, analytics
- Enterprise ($100+/mo): Private hosting, SSO, advanced features
- API ($0.01/page): Conversion service (PDF → .nova)

**Comparables:**
- GitBook (docs platform) - acquired for $40M+
- Notion (documents) - $10B valuation
- We're more focused (documents for AI age) and open

## The Pitch

> **"PDF for the AI age"**
>
> Beautiful documents that are actually editable.
> Share reports, specs, and articles that look professional.
> AI can parse them perfectly for RAG systems.
> Open format, free tools, your data stays yours.

## Progress Tracker

### ✅ Completed (Week 1 - Day 1)

**Format Design:**
- ✅ Designed complete .nova JSON schema (`schema/README.md`)
- ✅ Defined 11 block types (heading, paragraph, list, table, code, callout, image, quote, divider, layout, embed)
- ✅ Rich text formatting with inline styles and links
- ✅ Theme system with typography, colors, and spacing
- ✅ Comprehensive documentation with examples and design decisions

**Example Documents:**
- ✅ `sample-document.nova` - Complete showcase of all block types
- ✅ `technical-spec.nova` - Real API documentation example
- ✅ `article.nova` - Magazine-style content article

**React Renderer (`@nova-format/renderer`):**
- ✅ Full TypeScript implementation with type safety
- ✅ All 11 block type components built
- ✅ Beautiful CSS styling (Medium-inspired typography, Notion-like layouts)
- ✅ Syntax highlighting for code blocks (highlight.js)
- ✅ Theme system with CSS variables
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Print-friendly styles
- ✅ Accessible semantic HTML
- ✅ Demo app with live preview
- ✅ Running at http://localhost:5173/

### 🚧 In Progress (Week 1)

**Python SDK:**
- ⏳ Document creation/parsing library
- ⏳ Block builder classes
- ⏳ Validation against schema
- ⏳ File I/O utilities

**Editor:**
- ⏳ Block-based editing (Week 2)
- ⏳ Live preview
- ⏳ Export to .nova

### 📋 Up Next

1. **Complete Week 1:**
   - Build Python SDK for programmatic document creation
   - Add more renderer polish (animations, dark mode toggle)
   - Create project README with examples

2. **Week 2: Editor + Sharing**
   - Build web-based editor with Notion-like UX
   - Implement live preview
   - Deploy to Vercel with shareable links

3. **Week 3: RAG Integrations**
   - LangChain/LlamaIndex loaders
   - Markdown → Nova converter
   - Example RAG implementations

4. **Week 4: Launch**
   - Documentation site
   - PDF vs Nova comparison demo
   - HackerNews launch

## Next Immediate Steps
1. ~~Design .nova format spec~~ ✅
2. ~~Build beautiful React renderer~~ ✅
3. Build Python SDK for document creation
4. Build web editor
5. Deploy and launch on HN
