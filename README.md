# Claude Code Docs

<p align="center">
  <strong>Deep-dive documentation into how Claude Code actually works under the hood</strong>
</p>

<p align="center">
  <a href="#">English</a> · <a href="#">简体中文</a> · <a href="#">繁體中文</a>
</p>

> [!IMPORTANT]
> This project is for **study and educational purposes only**. It is an independent analysis of the Claude Code CLI architecture. This repository is **not affiliated with, endorsed by, or maintained by Anthropic**. All trademarks belong to their respective owners.

---

## Backstory

On March 31, 2026, the Claude Code source was briefly exposed — and the developer community went into overdrive trying to understand what makes one of the most capable AI coding agents tick. Instead of just archiving the code, we wanted to do something more useful: **explain it**.

This project is a trilingual (EN / 简体中文 / 繁體中文) interactive documentation site that breaks down the system design, agent architecture, and prompt engineering behind Claude Code. The goal is to help developers, researchers, and AI enthusiasts learn from how a production-grade agent system is actually built.

---

## What's Inside

The site covers six major sections of Claude Code's internals:

| Section | What you'll learn |
|---|---|
| **Architecture** | Entry point, query engine, state management, terminal UI, feature flags |
| **Commands** | 103+ built-in commands, slash commands, custom command system |
| **Tools** | File tools, Bash tool, Agent tool, MCP tool, task tools, permission model |
| **Subsystems** | MCP integration, sessions, skills, plugins, vim mode, bridge, coordinator |
| **Services** | API client, OAuth flow, LSP integration, analytics |
| **Internals** | 87+ React hooks, constants/prompts, Ink rendering engine, keybindings, memory files, utilities |

## Key Findings

Claude Code is not a thin CLI wrapper around the Anthropic API. It is a **local agent runtime with a terminal-native product shell** that includes:

- An agentic loop that streams responses, detects tool calls, executes them, and feeds results back
- 43+ built-in tools with a single-writer/multiple-reader concurrency model
- A multi-layer permission system with multiple modes and a multi-stage decision tree
- Sub-agent spawning with context isolation and prompt cache sharing
- A custom Ink-based terminal rendering engine (not standard Ink)
- 87+ React hooks encapsulating business logic and UI state
- MCP client supporting multiple transport types (stdio, SSE, streamable HTTP)
- 25+ hook events for lifecycle automation

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/smilewilson1999/claude-code-docs.git
cd claude-code-docs

# Install dependencies
cd docs
pnpm install

# Start the dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to browse the site locally.

Built with [Nextra 4](https://nextra.site/) + Next.js 15.

---

## Project Structure

```
docs/
├── src/
│   ├── app/              # Next.js app router + i18n layout
│   ├── components/       # Mermaid diagram renderer
│   └── content/
│       ├── en/           # English documentation
│       ├── zh-CN/        # 简体中文文档
│       └── zh-TW/        # 繁體中文文件
├── package.json
└── next.config.mjs
```

---

## Contributing

This is a community-driven study project — contributions are very welcome.

Here are some ways you can help:

- **Fix inaccuracies** — Spot something wrong or outdated? Open a PR or issue
- **Add new sections** — Areas not yet covered include IDE integrations, desktop app architecture, and the Agent SDK
- **Improve explanations** — Rewrite sections for clarity, add diagrams, or include code examples
- **Translate** — Help improve existing translations or add new languages

To contribute:

1. Fork the repo
2. Create a branch (`git checkout -b my-contribution`)
3. Make your changes
4. Submit a pull request

If you have questions or want to discuss ideas before diving in, feel free to open an issue.

---

## Ownership / Affiliation Disclaimer

- This repository does **not** claim ownership of any original Claude Code source material.
- This repository is **not affiliated with, endorsed by, or maintained by Anthropic**.
- This project exists strictly for educational and research purposes.

## License

MIT
