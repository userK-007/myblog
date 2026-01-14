# 定制指南（样式 / 布局 / 评论）

## 1. 调整三大类的“风格差异”

### 样式文件

编辑：`assets/css/custom.css`

主要看两个类：
- `.article-content.regular-style`：技术/金融文章的排版（正规、清晰）
- `.article-content.madness-style`：狂人日记的排版（狂野、混乱）

### 样式如何被套用

在 `layouts/_default/single.html` 里会根据 `.Section` 判断：
- `.Section == "madness"` → 使用 `madness-style`
- 其它 → 使用 `regular-style`

## 2. 调整页面结构（HTML 布局）

最常改的模板：
- `layouts/_default/single.html`：文章页（标题/元信息/正文/标签/评论的位置）
- `layouts/_default/list.html`：列表页（栏目页、标签页、首页文章列表的展示）

## 3. 面包屑与右侧栏

- 面包屑：`layouts/partials/breadcrumbs.html`
- 右侧栏：`layouts/partials/right-sidebar.html`

如果你未来觉得右侧栏“信息重复”，可以只保留顶部菜单 + 面包屑（更简洁）。

## 4. 评论（Giscus）

模板：`layouts/partials/comments.html`

配置：`hugo.toml` 中的 `[params.Comments.giscus]`

你主要会改：
- `repo` / `repoId`
- `category` / `categoryId`
- `theme`（亮/暗）

