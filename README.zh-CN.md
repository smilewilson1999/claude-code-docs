# Claude Code Docs

<p align="center">
  <strong>深入解析 Claude Code 底层运作原理的文档站</strong>
</p>

<p align="center">
  <a href="./README.md">English</a> · <a href="./README.zh-CN.md">简体中文</a> · <a href="./README.zh-TW.md">繁體中文</a>
</p>

> [!NOTE]
> 源码提取自 npm 包 `@anthropic-ai/claude-code` **2.1.88** 版本。发布的包仅包含一个打包后的 `cli.js`（约 12 MB）。本仓库的 `src/` 目录包含从 npm tarball 中提取的未打包 TypeScript 源码。

> [!IMPORTANT]
> 本项目仅用于**学习和教育目的**。这是对 Claude Code CLI 架构的独立分析。本仓库**与 Anthropic 无关，未经其认可或维护**。所有商标归其各自所有者所有。

---

## 背景故事

2026 年 3 月 31 日，Claude Code 的源码曾短暂公开——开发者社区迅速行动，试图理解这个最强大的 AI 编程代理到底是如何运作的。我们没有仅仅归档代码，而是想做一些更有价值的事情：**把它讲清楚**。

本项目是一个三语（EN / 简体中文 / 繁體中文）交互式文档站，拆解了 Claude Code 背后的系统设计、代理架构和提示词工程。目标是帮助开发者、研究者和 AI 爱好者了解一个生产级代理系统到底是怎么构建的。

---

## 文档内容

文档站涵盖 Claude Code 内部的六大模块：

| 模块 | 你将了解到 |
|---|---|
| **架构** | 入口点、查询引擎、状态管理、终端 UI、功能开关 |
| **命令** | 103+ 内置命令、斜杠命令、自定义命令系统 |
| **工具** | 文件工具、Bash 工具、Agent 工具、MCP 工具、任务工具、权限模型 |
| **子系统** | MCP 集成、会话、技能、插件、vim 模式、bridge、协调器 |
| **服务** | API 客户端、OAuth 流程、LSP 集成、分析 |
| **内部机制** | 87+ React hooks、常量/提示词、Ink 渲染引擎、快捷键、记忆文件、实用工具 |

## 核心发现

Claude Code 不是 Anthropic API 的简单 CLI 封装。它是一个**具有终端原生产品外壳的本地代理运行时**，包含：

- 一个流式响应、检测工具调用、执行调用并回传结果的代理循环
- 43+ 内置工具，采用单写者/多读者并发模型
- 多层权限系统，包含多种模式和多阶段决策树
- 支持上下文隔离和提示缓存共享的子代理派生
- 自定义 Ink 终端渲染引擎（非标准 Ink）
- 87+ React hooks 封装业务逻辑和 UI 状态
- MCP 客户端，支持多种传输类型（stdio、SSE、streamable HTTP）
- 25+ 生命周期自动化的 hook 事件

---

## 快速开始

```bash
# 克隆仓库
git clone https://github.com/smilewilson1999/claude-code-docs.git
cd claude-code-docs

# 安装依赖
cd docs
pnpm install

# 启动开发服务器
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000) 在本地浏览文档站。

基于 [Nextra 4](https://nextra.site/) + Next.js 15 构建。

---

## 项目结构

```
docs/
├── src/
│   ├── app/              # Next.js app router + i18n 布局
│   ├── components/       # Mermaid 图表渲染器
│   └── content/
│       ├── en/           # English documentation
│       ├── zh-CN/        # 简体中文文档
│       └── zh-TW/        # 繁體中文文件
├── package.json
└── next.config.mjs
```

---

## 参与贡献

这是一个社区驱动的学习项目——非常欢迎贡献。

以下是你可以参与的方式：

- **修正错误** — 发现不准确或过时的内容？提交 PR 或 issue
- **新增章节** — 尚未覆盖的领域包括 IDE 集成、桌面应用架构和 Agent SDK
- **改进表述** — 重写章节以提高清晰度、添加图表或代码示例
- **翻译** — 帮助改进现有翻译或添加新语言

贡献步骤：

1. Fork 本仓库
2. 创建分支 (`git checkout -b my-contribution`)
3. 进行修改
4. 提交 Pull Request

如有问题或想在开始前讨论想法，欢迎提交 issue。

---

## 所有权 / 关联声明

- 本仓库**不**声称拥有任何 Claude Code 原始源代码材料的所有权。
- 本仓库**与 Anthropic 无关，未经其认可或维护**。
- 本项目严格用于教育和研究目的。

## 许可证

MIT
