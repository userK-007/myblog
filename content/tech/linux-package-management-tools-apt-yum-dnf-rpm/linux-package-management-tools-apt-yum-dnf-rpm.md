---
title: "Linux 包管理工具整理（apt、yum、dnf、rpm）"
date: '2026-06-17T01:35:38+08:00'
draft: false
tags: ["Linux", "包管理", "apt"]
description: "整理 Linux 两大生态的包管理工具（apt、yum、dnf、rpm）的层级关系与常用命令对照"
---

之前多次接触但容易混淆，这里做一个统一整理。

省流版：**apt / dnf 负责"管理、依赖与仓库"，dpkg / rpm 负责"实际安装执行"，yum 是 dnf 的旧版本实现。**
## 常用命令对照

|操作|Ubuntu（apt）|CentOS / Fedora（dnf）|
|---|---|---|
|搜索软件|`apt search`|`dnf search`|
|安装软件|`apt install`|`dnf install`|
|升级软件|`apt upgrade`|`dnf upgrade`|
|删除软件|`apt remove`|`dnf remove`|
|更新仓库索引|`apt update`|`dnf check-update`|
|查看软件信息|`apt show`|`dnf info`|
|本地安装包|`dpkg -i xxx.deb`|`rpm -ivh xxx.rpm`|

## 整体结构总结
```text
Debian 生态

apt（高级包管理器）
↓
dpkg（底层安装器）
↓
.deb（软件包格式）


RedHat 生态

dnf（旧 yum，高级包管理器）
↓
rpm（底层安装器）
↓
.rpm（软件包格式）
```


# 到前面还是没法理解就看看下面

apt、yum、dnf、rpm 本质上并不是独立系统，而是 Linux 软件管理体系中不同层级的组件。Linux 的软件分发通常采用"软件包 + 软件仓库 + 包管理器"的模式，而不是像 Windows 那样依赖单一 `.exe` 安装程序。软件首先被打包为标准格式（Debian 系 `.deb` 或 RedHat 系 `.rpm`），再上传到软件仓库，最后由包管理器统一完成安装、升级与管理。

Linux 主要分为 Debian 和 RedHat 两大生态。Debian 系（如 Ubuntu）使用 `.deb` 包，RedHat 系（如 CentOS、RHEL、Fedora）使用 `.rpm` 包。
每个生态都有底层安装工具：Debian 对应 dpkg，RedHat 对应 rpm。这一层工具只负责"安装与卸载文件"，不处理依赖关系，也不管理软件仓库，因此直接使用 rpm 或 dpkg 安装时，常会遇到依赖问题。

为了解决依赖问题，上层引入了高级包管理器。它们的职责是统一管理整个安装流程：访问软件仓库、下载软件包、解析依赖、自动补齐依赖，并最终调用底层安装器完成安装。
对应关系为：Debian 系使用 apt（底层调用 dpkg），RedHat 系使用 dnf（底层调用 rpm），而 yum 是 dnf 的旧版本实现，目前已逐渐被 dnf 替代。

以实际安装为例：Ubuntu 执行 `apt install nginx` 时，apt 会从仓库下载 `.deb` 包，解析依赖后交给 dpkg 安装；CentOS 或 RHEL 执行 `dnf install nginx` 时，dnf 会下载 `.rpm` 包并处理依赖，最终调用 rpm 完成安装。
