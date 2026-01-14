# 快速开始

## 1. 本地启动（开发预览）

在项目根目录执行：

```bash
hugo server -D
```

然后访问：`http://localhost:1313/`

说明：
- `-D` 会把 `draft: true` 的草稿也渲染出来，写作时很方便。

## 2. 创建新文章

你的项目有 3 个大类（section），分别对应目录：
- 技术：`content/tech/`
- 金融：`content/finance/`
- 狂人日记：`content/madness/`

创建文章（示例）：

```bash
hugo new tech/文章标题.md
hugo new finance/文章标题.md
hugo new madness/文章标题.md
```

## 3. Front Matter（文章头部）模板

建议统一使用这几个字段：

```yaml
---
title: "文章标题"
date: 2026-01-14
draft: false
categories: ["技术"]     # 三选一：技术/金融/狂人日记
tags: ["git", "后端"]     # 子类/标签都放这里
description: "一句话描述（可选但建议）"
---
```

## 4. 标签（tags）如何生效

只要文章里写了：

```yaml
tags: ["git", "前端"]
```

Hugo 会自动生成：
- 标签汇总页：`/tags/`
- 标签列表页：例如 `/tags/git/`、`/tags/前端/`

