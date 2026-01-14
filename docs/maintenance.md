# 日常维护

## 1. 清理缓存 / 重新构建

常见需要清理的目录：
- `public/`（构建输出）
- `resources/_gen/`（Hugo pipeline 缓存）
- `.hugo_build.lock`（构建锁文件）

清理后再启动：

```bash
hugo server -D --disableFastRender --ignoreCache
```

## 2. 更新主题（PaperMod）

主题是子模块，更新方式（在 git 环境下）：

```bash
git submodule update --remote themes/PaperMod
```

如果你是新电脑/新 clone：

```bash
git submodule update --init --recursive
```

## 3. 常用命令

```bash
# 本地预览（含草稿）
hugo server -D

# 构建输出到 public/
hugo
```

