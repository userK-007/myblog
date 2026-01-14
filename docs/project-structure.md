# 项目结构（你最常会改哪些文件）

## 根目录

- `hugo.toml`：**全站核心配置**（标题、菜单、taxonomies、评论参数、输出格式等）
- `content/`：**文章内容**
- `layouts/`：**你覆盖主题的模板（最重要的自定义代码）**
- `assets/`：**自定义 CSS/JS（会被 Hugo pipeline 处理）**
- `static/`：纯静态资源（图片/字体等，不经过 pipeline）
- `themes/PaperMod/`：主题（一般不直接改，用 `layouts/` 覆盖）
- `public/`：构建产物（自动生成，不建议当源码维护）

## content/（文章与栏目）

你的三大类就是三条目录（section）：
- `content/tech/`：技术
- `content/finance/`：金融
- `content/madness/`：狂人日记

每个目录里的 `_index.md` 是“栏目页”，普通文章是 `*.md`。

## layouts/（模板）

- `layouts/_default/single.html`：文章详情页模板（这里决定“狂人日记的狂野样式”如何套用）
- `layouts/_default/list.html`：列表页（栏目列表、标签列表、分页等）
- `layouts/partials/extend_head.html`：引入自定义 CSS（主题会自动 include）
- `layouts/partials/comments.html`：Giscus 评论注入
- `layouts/partials/breadcrumbs.html`：面包屑导航
- `layouts/partials/right-sidebar.html`：右侧栏（分类导航）

## assets/（样式）

- `assets/css/custom.css`：你新增的核心样式文件
  - `.article-content.regular-style`：技术/金融（正规风格）
  - `.article-content.madness-style`：狂人日记（狂野风格）

