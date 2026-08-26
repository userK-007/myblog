---
title: "Hermes Agent 源码解读"
description: "基于 Hermes Agent v0.20.0（tag v2026.8.3）源码的系统解读系列"
type: "tech"
---

基于 [Hermes Agent](https://github.com/NousResearch/hermes-agent) v0.20.0（tag `v2026.8.3`）源码的解读系列，面向想系统了解 Hermes 架构、并有意自己写 agent 框架的软件工程师。

## 系列目录

| # | 篇目 | 主题 |
|---|------|------|
| 1 | [内部结构与架构总览](01-overview/) | 三层架构、目录结构、数据流 |
| 2 | [主循环（Agent Loop）](02-agent-loop/) | conversation_loop 解剖 |
| 3 | [工具系统](03-tool-system/) | 注册、组装、分发与窄腰 |
| 4 | [提示词缓存与上下文压缩](04-prompt-cache/) | 缓存约束与 compress_context |
| 5 | [会话与记忆](05-session-memory/) | SessionDB 与 MemoryProvider |
| 6 | [子代理与委派](06-delegation/) | delegate_task 机制 |
| 7 | [网关、插件、MCP 与定时任务](07-edges/) | 窄腰之外的扩展生态 |

> 版本锚点：tag `v2026.8.3`（commit `3c27eb623`）。文中行号均以该版本为准。
