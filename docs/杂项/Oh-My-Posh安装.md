# Oh-My-Posh 安装

## 目录
- [Oh-My-Posh 安装](#oh-my-posh-安装)
  - [目录](#目录)
  - [1. 安装指南](#1-安装指南)
    - [1.1 安装 scoop](#11-安装-scoop)
    - [1.2 安装和配置 oh my posh](#12-安装和配置-oh-my-posh)

## 1. 安装指南

### 1.1 安装 scoop
```
irm get.scoop.sh | iex
# 设置代理, scoop只支持http代理
scoop config proxy 127.0.0.1:10808
```

### 1.2 安装和配置 oh my posh

```
scoop bucket add extras
scoop install oh-my-posh
```
执行`notepad $PROFILE`, 将以下内容粘贴进去即可
```
# 导入 Oh My Posh
oh-my-posh init pwsh | Invoke-Expression

# 可选：指定主题（默认主题为 minimal）
# $env:POSH_THEMES_PATH = "$(scoop prefix oh-my-posh)\themes"
# oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH\jandedobbeleer.omp.json" | Invoke-Expression
```

