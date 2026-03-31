# /docs — Claude Code Docs

Nextra 4 docs site with i18n (English + Simplified Chinese + Traditional Chinese). Source code architecture documentation for Claude Code.

## Stack

- Nextra 4 (App Router)
- nextra-theme-docs
- pnpm
- i18n: en, zh-CN, zh-TW

## Structure

```
src/
├── app/
│   ├── layout.tsx                    → Root layout (metadata, globals)
│   └── [lang]/
│       ├── layout.tsx                → Themed layout with i18n, navbar, footer
│       └── [[...mdxPath]]/page.tsx   → Catch-all MDX page renderer
├── components/
│   └── mermaid.tsx                   → Mermaid diagram component
├── middleware.ts                     → Nextra locale middleware
└── content/
    ├── en/                           → English MDX pages
    ├── zh-CN/                        → Simplified Chinese MDX pages
    └── zh-TW/                        → Traditional Chinese (Taiwan) MDX pages
```

## Content Sections

| Section | Description |
|---------|-------------|
| architecture/ | Entry point, query engine, state management, terminal UI, feature flags |
| commands/ | Built-in commands, slash commands, custom commands |
| tools/ | File tools, Bash, Agent, MCP, Task tools, permissions |
| subsystems/ | MCP, skills, plugins, vim, bridge, memory, notifications, doctor |
| services/ | OAuth, LSP, analytics, auto-updater, credential manager |
| internals/ | Hooks, constants, keybindings, Ink rendering, utilities, error handling, logging |

## Adding Pages

1. Create `.mdx` file in appropriate `src/content/{locale}/` subdirectory
2. Add entry to the nearest `_meta.ts` file for sidebar ordering
3. Mirror the page in all three locales: `en/`, `zh-CN/`, `zh-TW/`
4. Use standard markdown + MDX components (Mermaid diagrams supported)

## Commands

- `pnpm dev` — Start dev server
- `pnpm build` — Production build
- `pnpm start` — Serve production build

## Conventions

- All content must exist in en/, zh-CN/, and zh-TW/
- Keep docs accurate to the source code in the medan/ sibling directory
- Use Mermaid diagrams for architecture visualization
- Update `_meta.ts` when adding/removing/reordering pages
- Link between pages using relative paths
