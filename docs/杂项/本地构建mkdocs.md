# MkDocs 文档站点构建指南

## 目录
- [MkDocs 文档站点构建指南](#mkdocs-文档站点构建指南)
  - [目录](#目录)
  - [前提条件](#前提条件)
  - [安装依赖](#安装依赖)
  - [项目结构](#项目结构)
  - [本地预览](#本地预览)
  - [构建静态站点](#构建静态站点)
  - [部署](#部署)
    - [GitHub Pages](#github-pages)
    - [其他服务器](#其他服务器)
  - [常用配置](#常用配置)
    - [主题配置](#主题配置)
    - [Markdown 扩展](#markdown-扩展)
  - [更多资源](#更多资源)

---

## 前提条件

在开始之前，请确保您的系统已安装：
- [Python](https://www.python.org/) (3.8 或更高版本)
- [pip](https://pip.pypa.io/) (Python 包管理器)

## 安装依赖

1. 克隆或下载项目后，在项目根目录下运行：
```bash
pip install -r requirements.txt
```

这将安装以下依赖：
- mkdocs：文档站点生成器
- mkdocs-material：Material 主题
- mkdocs-material-extensions：Material 主题扩展
- pymdown-extensions：Markdown 扩展
- markdown：Markdown 解析器

## 项目结构

```
.
├── docs/                    # 文档源文件目录
│   ├── index.md            # 主页
│   ├── tag_markdown用法/    # Markdown 相关文档
│   ├── 前端/               # 前端相关文档
│   ├── 关于AI/             # AI 相关文档
│   └── 杂项/               # 其他文档
├── mkdocs.yml              # MkDocs 配置文件
└── requirements.txt        # Python 依赖文件
```

## 本地预览

在项目根目录下运行：
```bash
mkdocs serve
```

默认情况下，文档将在 http://127.0.0.1:8000 上提供服务。

## 构建静态站点

要构建静态站点，运行：
```bash
mkdocs build
```

这将在 `site` 目录下生成静态文件。

## 部署

### GitHub Pages

1. 在 `mkdocs.yml` 中添加以下配置：
```yaml
site_url: https://你的用户名.github.io/仓库名/
```

2. 运行以下命令部署到 GitHub Pages：
```bash
mkdocs gh-deploy
```

### 其他服务器

将 `site` 目录下的所有文件复制到您的 Web 服务器即可。

## 常用配置

### 主题配置

在 `mkdocs.yml` 中配置主题：
```yaml
theme:
  name: material
  features:
    - navigation.tabs
    - navigation.sections
    - navigation.expand
    - search.highlight
    - search.share
    - search.suggest
```

### Markdown 扩展

在 `mkdocs.yml` 中配置 Markdown 扩展：
```yaml
markdown_extensions:
  - pymdownx.highlight
  - pymdownx.superfences
  - pymdownx.tabbed
  - admonition
  - footnotes
  - toc:
      permalink: true
```

## 更多资源

- [MkDocs 官方文档](https://www.mkdocs.org/)
- [Material for MkDocs 文档](https://squidfunk.github.io/mkdocs-material/)
- [MkDocs 主题列表](https://github.com/mkdocs/mkdocs/wiki/MkDocs-Themes)