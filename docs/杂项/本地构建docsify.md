# 如何本地构建文档站点

## 目录
- [如何本地构建文档站点](#如何本地构建文档站点)
  - [目录](#目录)
  - [前提条件](#前提条件)
  - [安装 docsify-cli](#安装-docsify-cli)
  - [本地预览文档](#本地预览文档)
  - [常用命令选项](#常用命令选项)
  - [创建新文档（仅首次）](#创建新文档仅首次)
  - [更多资源](#更多资源)

---

## 前提条件

在开始之前，请确保您的系统已安装 [Node.js](https://nodejs.org/)（包含 npm）。

## 安装 docsify-cli

```bash
# 全局安装 docsify-cli
npm install -g docsify-cli

# 或者使用 npx 无需全局安装
# npx 会临时安装并执行该命令
```

## 本地预览文档

```bash
# 在项目根目录下运行
docsify serve

# 或者使用 npx 方式运行
npx docsify-cli serve
```

默认情况下，文档将在 http://localhost:3000 上提供服务。

## 常用命令选项

```bash
# 指定端口号
docsify serve --port 8080

# 指定文档目录（非根目录）
docsify serve ./docs

# 打开浏览器
docsify serve --open

# 指定文档目录并打开浏览器
docsify serve ./docs --open

# 设置基础路径
docsify serve --livereload-port 35729
```

## 创建新文档（仅首次）

如果您是第一次创建文档，可以使用以下命令初始化文档结构：

```bash
# 在当前目录初始化
docsify init .

# 在指定目录初始化
docsify init ./docs
```

这将创建基本的文档结构，包括：
- `index.html` - 入口文件
- `README.md` - 主页内容
- `.nojekyll` - 防止 GitHub Pages 忽略下划线开头的文件

## 更多资源

- [docsify 官方文档](https://docsify.js.org/)
- [docsify-cli GitHub 仓库](https://github.com/docsifyjs/docsify-cli)