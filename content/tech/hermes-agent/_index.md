---
title: "Hermes Agent 源码解读"
description: 为通读过 Hermes Agent 却在源码中信息过载的工程师重建脉络，经人工审核，可信度高。
type: "tech"
---

本系列写给这样一类工程师：你已经通读过 [Hermes Agent](https://github.com/NousResearch/hermes-agent) 的整体框架，但一打开源码就被模块、调用链和细节淹没，理智和记忆一起散架。

这里的文章追求**把源码重新排成一张可走的地图**——哪里是主循环、工具如何注册、记忆落在哪一层——让你从信息爆炸里抽身，找回阅读源码时的方向感。

全部内容**锚定特定版本源码**（v0.20.0，tag `v2026.8.3`），并**经人工对照源码审核**，行号与机制描述以该版本为准，可信度高于泛泛的二手解读。

## 系列目录


| #   | 篇目                                | 主题                         |
| --- | --------------------------------- | -------------------------- |
| 1   | [内部结构与架构总览](01-overview/)         | 三层架构、目录结构、数据流              |
| 2   | [主循环（Agent Loop）](02-agent-loop/) | conversation_loop 解剖       |
| 3   | [工具系统](03-tool-system/)           | 注册、组装、分发与窄腰                |
| 4   | [提示词缓存与上下文压缩](04-prompt-cache/)   | 缓存约束与 compress_context     |
| 5   | [会话与记忆](05-session-memory/)       | SessionDB 与 MemoryProvider |
| 6   | [子代理与委派](06-delegation/)          | delegate_task 机制           |
| 7   | [网关、插件、MCP 与定时任务](07-edges/)      | 窄腰之外的扩展生态                  |


