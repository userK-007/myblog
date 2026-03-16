## 概览

这是一个使用 **Hugo** 与 **PaperMod** 主题构建的个人博客，部署在 **GitHub Pages** 上，用来记录：

- **技术**：云计算、AI、后端等
- **金融**：投资、宏观、金融科技
- **狂人日记**：一些不那么严肃的思考

线上地址：

- `https://userk-007.github.io/myblog/`

---

## 技术栈

- **静态站点生成器**：Hugo
- **主题**：PaperMod（放在 `themes/PaperMod`）
- **样式定制**：`assets/css/custom.css`
- **脚本**：`assets/js/fastsearch.js`、`assets/js/scroll.js`
- **部署目标**：`public/` 目录，推送到 GitHub Pages

---
## 二次开发

下载项目后用claude、codex、cursor、tare、qoder等修改即可
---

## 目录结构（精简版）

- `content/`：文章与页面
  - `_index.md`：首页内容
  - `about/_index.md`：关于我
  - `tech/`：技术类文章
  - `finance/`：金融类文章
  - `madness/`：狂人日记
  - `search/_index.md`：站内搜索页
  - `tags/_index.md`：标签聚合页
- `layouts/`：自定义模板
  - `_default/list.html`：列表页（如分类、标签）
  - `_default/single.html`：文章详情页
  - `partials/home_info.html`：首页右侧个人信息卡片（头像、社交链接、“关于我”按钮）
- `assets/`：自定义前端资源（Hugo Pipes 构建）
  - `css/custom.css`：覆盖/扩展 PaperMod 样式
  - `js/fastsearch.js`、`js/scroll.js`
- `static/`：静态资源原始文件
  - `blogAvatar.png`：头像图片
- `themes/PaperMod/`：PaperMod 主题本体
- `public/`：Hugo 生成的静态站点（部署用输出目录）
- `hugo.toml`：站点配置（语言、菜单、主题、首页信息、评论等）

---

## 本地开发

### 1. 安装 Hugo

请先安装 Hugo（建议扩展版）：

```bash
# macOS（Homebrew）
brew install hugo

# Debian / Ubuntu（示例，建议按 Hugo 官方文档安装最新版）
sudo apt-get install hugo
```

### 2. 启动本地预览

在项目根目录下执行：

```bash
hugo server -D
```

- 默认访问地址：`http://localhost:1313/`
- `-D` 表示包含草稿（`draft: true`）文章

当你修改 `content/`、`layouts/` 或 `assets/css/custom.css` 时，Hugo 会自动热更新。

---

## 写文章

三大主分类分别对应三个目录：

- **技术**：`content/tech/`
- **金融**：`content/finance/`
- **狂人日记**：`content/madness/`

### 1. 使用 Hugo 命令新建

在项目根目录运行：

```bash
hugo new tech/文章标题.md
hugo new finance/文章标题.md
hugo new madness/文章标题.md
```

生成的文件会在对应目录下，例如：

- `content/tech/your-post.md`

### 2. Front Matter 建议

新文章头部建议包含以下字段：

```yaml
---
title: "文章标题"
date: 2026-03-15
description: "一句话简介"
tags: ["标签1", "标签2"]
draft: false
---
```

- `tags` 用于标签聚合页面（`/tags/`）
- 设置 `draft: false` 才会在生产环境构建中出现

---

## 个性化定制

### 1. 个人信息卡片（头像 / 关于我 / 社交链接）

相关代码：

- 模板：`layouts/partials/home_info.html`
- 样式：`assets/css/custom.css`
- 配置：`hugo.toml` 中的 `[params.homeInfoParams]`

关键配置示例：

```toml
[params.homeInfoParams]
title    = "userK-007"
imageUrl = "/blogAvatar.png"   # 对应 static/blogAvatar.png
email    = "you@example.com"
git      = "https://github.com/yourname"
telegram = "https://t.me/yourname"
x        = "https://twitter.com/yourname"
aboutme  = "/about/"
```

模板中，“关于我”链接使用 Hugo 页面对象的相对地址，自动适配本地与 GitHub Pages：

- `content/about/_index.md` → `/about/`

### 2. 样式与布局

- 轻量调整：在 `assets/css/custom.css` 中覆盖主题默认样式（例如首页个人信息卡片布局、按钮样式等）
- 布局修改：在 `layouts/_default/list.html`、`layouts/_default/single.html` 中调整文章列表与详情布局

---

## 构建与部署（GitHub Pages）

### 1. 生成静态文件

在本地运行：

```bash
hugo
```

执行后：

- 完整静态站点生成到 `public/` 目录

### 2. 手动部署到 GitHub Pages（示例流程）

假设当前仓库为 `userK-007/myblog`，并将 **GitHub Pages** 配置为：

- **Branch**：`gh-pages`
- **Folder**：`/`（根目录）

推荐做法（一次性初始化后重复使用）：

```bash
# 1. 构建
hugo

# 2. 进入输出目录
cd public

# 3. 初始化或更新 gh-pages 分支
git init
git remote add origin git@github.com:userK-007/myblog.git  # 首次需要
git checkout -b gh-pages

git add .
git commit -m "Deploy site"
git push -f origin gh-pages
```

然后在 GitHub 仓库的 **Settings → Pages** 中选择：

- Source：`Deploy from a branch`
- Branch：`gh-pages` / 根目录

> 如果你选择的是 `main` 分支下的 `/docs` 目录，也可以把 Hugo 的输出目录改为 `docs/`（在 `hugo.toml` 中设置 `publishDir = "docs"`）。

---

## 常用命令速查

- 本地开发启动：`hugo server -D`
- 生成生产环境静态文件：`hugo`
- 新建文章：
  - 技术：`hugo new tech/xxx.md`
  - 金融：`hugo new finance/xxx.md`
  - 狂人日记：`hugo new madness/xxx.md`

---

## 备注

- 主题相关配置参考 `themes/PaperMod/theme.toml` 与官方文档
- 如果升级主题或修改构建方式，注意同步更新本 README 中的“部署方式”说明
