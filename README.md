# userK-007 的个人博客

基于 [Hugo](https://gohugo.io/) 的静态站点，主题 [PaperMod](https://github.com/adityatelange/hugo-PaperMod)，托管于 [GitHub Pages](https://userk-007.github.io/myblog/)。

## 技术栈

| 项目 | 说明 |
|------|------|
| 生成器 | Hugo（Extended） |
| 主题 | PaperMod（Git 子模块） |
| 评论 | Giscus |
| 部署 | `master` 推送触发 Actions，构建并发布到 Pages |

## 本地运行

```bash
git submodule update --init --recursive   # 首次克隆后拉取主题
hugo server --config hugo.toml
```

浏览器访问终端里给出的地址（含 `/myblog/` 子路径时需一并带上）。

仅生成静态文件：

```bash
hugo --config hugo.toml --minify
```

输出目录：`public/`。

## 写作约定（摘要）

- 文章放在 `content/` 下对应栏目；图片可用 **Leaf Bundle**（与 `index.md` 同目录）
- Markdown 使用标准 `![](路径)`；Obsidian 的 `![[…]]` 不会生效。
- 站点级自定义：`hugo.toml`、`layouts/`、`assets/css/custom.css`

## 许可证

主题与依赖遵循其各自许可证；站点原创内容版权归作者所有。
