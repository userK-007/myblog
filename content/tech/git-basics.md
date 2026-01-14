---
title: "Git基础回顾"
date: 2026-01-11
draft: false
categories: ["技术"]
tags: ["git", "版本控制", "开发工具"]
description: "Git版本控制系统的基础知识和常用命令"
---

# Git基础回顾

Git是目前最流行的分布式版本控制系统，掌握Git的基础操作是每个开发者的必备技能。

## 什么是Git？

Git是一个开源的分布式版本控制系统，用于跟踪计算机文件的变化，并协调多人协作开发项目。

## 基本概念

### 工作区、暂存区和版本库

- **工作区（Working Directory）**：你在电脑上看到的目录
- **暂存区（Stage/Index）**：Git的暂存区，用于临时存放你的改动
- **版本库（Repository）**：工作区中隐藏的`.git`目录，这是Git的版本库

### 基本工作流程

1. 在工作区修改文件
2. 将修改添加到暂存区（`git add`）
3. 将暂存区的内容提交到版本库（`git commit`）

## 常用命令

### 初始化仓库

```bash
git init
```

### 添加文件到暂存区

```bash
git add <file>
git add .  # 添加所有文件
```

### 提交更改

```bash
git commit -m "提交说明"
```

### 查看状态

```bash
git status
```

### 查看提交历史

```bash
git log
git log --oneline  # 简洁模式
```

## 总结

Git是版本控制的基础工具，掌握这些基本命令可以帮助你更好地管理代码版本。
