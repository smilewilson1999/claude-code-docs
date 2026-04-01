# Claude Code Docs

<p align="center">
  <strong>深入解析 Claude Code 底層運作原理的文件站</strong>
</p>

<p align="center">
  <a href="./README.md">English</a> · <a href="./README.zh-CN.md">简体中文</a> · <a href="./README.zh-TW.md">繁體中文</a>
</p>

> [!NOTE]
> 原始碼提取自 npm 套件 `@anthropic-ai/claude-code` **2.1.88** 版本。發佈的套件僅包含一個打包後的 `cli.js`（約 12 MB）。本儲存庫的 `src/` 目錄包含從 npm tarball 中提取的未打包 TypeScript 原始碼。

> [!IMPORTANT]
> 本專案僅用於**學習和教育目的**。這是對 Claude Code CLI 架構的獨立分析。本儲存庫**與 Anthropic 無關，未經其認可或維護**。所有商標歸其各自擁有者所有。

---

## 背景故事

2026 年 3 月 31 日，Claude Code 的原始碼曾短暫公開——開發者社群迅速行動，試圖理解這個最強大的 AI 程式設計代理到底是如何運作的。我們沒有僅僅歸檔程式碼，而是想做一些更有價值的事情：**把它講清楚**。

本專案是一個三語（EN / 简体中文 / 繁體中文）互動式文件站，拆解了 Claude Code 背後的系統設計、代理架構和提示詞工程。目標是幫助開發者、研究者和 AI 愛好者了解一個生產級代理系統到底是怎麼建構的。

---

## 文件內容

文件站涵蓋 Claude Code 內部的六大模組：

| 模組 | 你將了解到 |
|---|---|
| **架構** | 進入點、查詢引擎、狀態管理、終端 UI、功能開關 |
| **命令** | 103+ 內建命令、斜線命令、自訂命令系統 |
| **工具** | 檔案工具、Bash 工具、Agent 工具、MCP 工具、任務工具、權限模型 |
| **子系統** | MCP 整合、工作階段、技能、外掛、vim 模式、bridge、協調器 |
| **服務** | API 用戶端、OAuth 流程、LSP 整合、分析 |
| **內部機制** | 87+ React hooks、常數/提示詞、Ink 渲染引擎、快速鍵、記憶檔案、工具程式 |

## 核心發現

Claude Code 不是 Anthropic API 的簡單 CLI 封裝。它是一個**具有終端原生產品外殼的本地代理執行環境**，包含：

- 一個串流回應、偵測工具呼叫、執行呼叫並回傳結果的代理迴圈
- 43+ 內建工具，採用單寫者/多讀者並行模型
- 多層權限系統，包含多種模式和多階段決策樹
- 支援上下文隔離和提示快取共享的子代理衍生
- 自訂 Ink 終端渲染引擎（非標準 Ink）
- 87+ React hooks 封裝業務邏輯和 UI 狀態
- MCP 用戶端，支援多種傳輸類型（stdio、SSE、streamable HTTP）
- 25+ 生命週期自動化的 hook 事件

---

## 快速開始

```bash
# 複製儲存庫
git clone https://github.com/smilewilson1999/claude-code-docs.git
cd claude-code-docs

# 安裝相依套件
cd docs
pnpm install

# 啟動開發伺服器
pnpm dev
```

開啟 [http://localhost:3000](http://localhost:3000) 在本機瀏覽文件站。

基於 [Nextra 4](https://nextra.site/) + Next.js 15 建構。

---

## 專案結構

```
docs/
├── src/
│   ├── app/              # Next.js app router + i18n 佈局
│   ├── components/       # Mermaid 圖表渲染器
│   └── content/
│       ├── en/           # English documentation
│       ├── zh-CN/        # 简体中文文档
│       └── zh-TW/        # 繁體中文文件
├── package.json
└── next.config.mjs
```

---

## 參與貢獻

這是一個社群驅動的學習專案——非常歡迎貢獻。

以下是你可以參與的方式：

- **修正錯誤** — 發現不準確或過時的內容？提交 PR 或 issue
- **新增章節** — 尚未涵蓋的領域包括 IDE 整合、桌面應用架構和 Agent SDK
- **改進表述** — 重寫章節以提高清晰度、新增圖表或程式碼範例
- **翻譯** — 幫助改進現有翻譯或新增語言

貢獻步驟：

1. Fork 本儲存庫
2. 建立分支 (`git checkout -b my-contribution`)
3. 進行修改
4. 提交 Pull Request

如有問題或想在開始前討論想法，歡迎提交 issue。

---

## 所有權 / 關聯聲明

- 本儲存庫**不**聲稱擁有任何 Claude Code 原始碼材料的所有權。
- 本儲存庫**與 Anthropic 無關，未經其認可或維護**。
- 本專案嚴格用於教育和研究目的。

## 授權條款

MIT
