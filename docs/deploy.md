# 部署到 GitHub Pages（含 Giscus）

本文档面向“部署上线”的完整流程。你也可以先看 `docs/quick-start.md`。

## 1. 准备 GitHub 仓库

两种常见方式：
- **用户主页**：仓库名 `yourusername.github.io` → 访问 `https://yourusername.github.io/`
- **项目页**：仓库名任意（如 `myblog`）→ 访问 `https://yourusername.github.io/myblog/`

对应地，你需要在 `hugo.toml` 里配置 `baseURL`：
- 用户主页：`https://yourusername.github.io/`
- 项目页：`https://yourusername.github.io/your-repo/`

## 2. 启用 GitHub Pages（Actions）

进入仓库：
- `Settings -> Pages -> Source` 选择 **GitHub Actions**

项目已经包含 GitHub Actions 工作流（`/.github/workflows/gh-pages.yml`），推送到默认分支后会自动构建并发布。

## 3. 配置 Giscus 评论

Giscus 基于 GitHub Discussions，需要你：

1. 在仓库里启用 Discussions：`Settings -> General -> Features -> Discussions`
2. 访问 `https://giscus.app/` 配置并获取以下值：
   - `repo`（形如 `yourusername/your-repo`）
   - `repoId`
   - `category`
   - `categoryId`
3. 将这些值写入 `hugo.toml` 的：
   - `[params.Comments.giscus]`

## 4. 推送代码触发部署

```bash
git add .
git commit -m "init blog"
git push
```

部署完成后，Pages 页面会给出最终访问地址。

## 常见问题

### 评论不显示
- 是否启用 Discussions
- `hugo.toml` 里的 `repoId/categoryId` 是否填写正确
- 仓库是否允许 Giscus 访问（公开仓库通常最省事）

