# 个人博客（Hugo + GitHub Pages）

这是一个基于 **Hugo** 与 **PaperMod** 主题的个人博客项目，支持三大类内容与标签聚合，并集成 **Giscus** 评论（GitHub Discussions）。

## 你最常用的 3 件事

- **本地启动预览**：

```bash
hugo server -D
```

- **创建新文章**：

```bash
hugo new tech/文章标题.md
hugo new finance/文章标题.md
hugo new madness/文章标题.md
```

- **部署到 GitHub Pages**：看 `docs/deploy.md`

## 文档导航（建议从这里开始）

- `docs/README.md`：文档索引
- `docs/quick-start.md`：快速开始（本地启动 / 新建文章 / Front Matter）
- `docs/project-structure.md`：项目结构（哪些文件该改、为什么）
- `docs/customization.md`：定制（样式/布局/评论）
- `docs/deploy.md`：部署（GitHub Pages + Giscus）
- `docs/maintenance.md`：维护（清缓存/更新主题/常用命令）

## 三大类约定（写作规则）

- **技术**：`content/tech/`（风格正规、严谨）
- **金融**：`content/finance/`（风格正规、严谨）
- **狂人日记**：`content/madness/`（风格狂野、混乱）

“子类/专题”统一用 `tags` 表达，点击标签可查看聚合页面。
