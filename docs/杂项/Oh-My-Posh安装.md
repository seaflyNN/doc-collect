# Oh-My-Posh 安装

## 目录
- [Oh-My-Posh 安装](#oh-my-posh-安装)
  - [目录](#目录)
  - [1. 安装指南](#1-安装指南)
    - [1.1 安装 scoop](#11-安装-scoop)
    - [1.2 安装和配置 oh my posh](#12-安装和配置-oh-my-posh)
      - [1.2.1 可选字体如下](#121-可选字体如下)
    - [1.3 修改vscode终端字体](#13-修改vscode终端字体)
      - [步骤一：安装 Nerd Font](#步骤一安装-nerd-font)
      - [步骤二：修改 VSCode 设置字体](#步骤二修改-vscode-设置字体)
        - [方式一：图形界面修改](#方式一图形界面修改)
        - [方式二：直接编辑 settings.json](#方式二直接编辑-settingsjson)
      - [步骤三：重启 VSCode Terminal](#步骤三重启-vscode-terminal)
      - [步骤四: 修改win11终端字体](#步骤四-修改win11终端字体)
      - [效果对比](#效果对比)

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
# 安装 nerd 字体
scoop bucket add nerd-fonts
# 安装 Meslo-NF 字体
scoop install Meslo-NF
```

### 1.2.1 更新`powershell`各项参数
```
 Install-Module -Name PowerShellGet -Force -AllowClobber
Get-Module PowerShellGet -ListAvailable | Select-Object Version
Install-Module -Name PSReadLine -Force -SkipPublisherCheck
# 创建配置文件
New-Item -Path $PROFILE -ItemType File -Force
```

执行`notepad $PROFILE`, 将以下内容粘贴进去即可
```ini
# 导入 Oh My Posh
oh-my-posh init pwsh | Invoke-Expression

# 可选：指定主题（默认主题为 minimal）
$env:POSH_THEMES_PATH = "$(scoop prefix oh-my-posh)\themes"
oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH\jandedobbeleer.omp.json" | Invoke-Expression
```

#### 1.2.1 可选字体如下
| 字体名称 | 描述 | Scoop 安装命令 | 推荐度 |
|----------|------|----------------|--------|
| CascadiaCode-NF | 微软官方字体，与 Windows Terminal 完美兼容 | `scoop install CascadiaCode-NF` | ⭐⭐⭐⭐⭐ |
| FiraCode-NF | 编程专用字体，连字效果优秀 | `scoop install FiraCode-NF` | ⭐⭐⭐⭐⭐ |
| JetBrainsMono-NF | JetBrains 开发的编程字体 | `scoop install JetBrainsMono-NF` | ⭐⭐⭐⭐ |
| Hack-NF | 清晰的等宽字体，适合长时间编程 | `scoop install Hack-NF` | ⭐⭐⭐ |

### 1.3 修改vscode终端字体

要在 **VSCode 中修改字体** 以正确显示 Oh My Posh 的图标（避免出现乱码问号 `�`），你需要将字体改成 **支持 Nerd Font 的字体**（比如 `MesloLGS NF`, `FiraCode Nerd Font`, `Cascadia Code PL` 等）。

---

#### 步骤一：安装 Nerd Font

例如（使用 Scoop 安装）：

```powershell
scoop bucket add nerd-fonts
scoop install Meslo-NF
```

---

#### 步骤二：修改 VSCode 设置字体

Win+R输入`fonts`检查字体是否安装成功, 输入字体文件的完整名字, 如下面的`MesloLGS Nerd Font`.

##### 方式一：图形界面修改

1. 打开 VSCode
2. `Ctrl + ,` 打开设置
3. 搜索：`font family`
4. 找到 `Terminal › Integrated: Font Family`
5. 设置为：

```
MesloLGS Nerd Font
```

> 注意：**名字必须和字体在系统中注册的一致**，可以在 `C:\Windows\Fonts` 中双击查看字体名称。

---

##### 方式二：直接编辑 settings.json

1. 在设置中点右上角小齿轮 → `打开设置 (JSON)`
2. 添加或修改以下字段：

```json
"terminal.integrated.fontFamily": "MesloLGS Nerd Font"
```

你可以只设置 `terminal.integrated.fontFamily`，不影响编辑器显示。

---

#### 步骤三：重启 VSCode Terminal

1. 打开新的终端（`Ctrl + ~`）
2. 运行：

```powershell
oh-my-posh init pwsh | Invoke-Expression
```

---

#### 步骤四: 修改win11终端字体
1. 打开 Windows Terminal。
2. 点击标签栏右侧的下拉箭头 ▼（或者使用快捷键 Ctrl + , 打开设置）。
3. 选择左侧的一个配置文件（如 PowerShell、Command Prompt 或 WSL），进入它的设置页面。
4. 在右侧找到 “外观（Appearance）” 标签页。
5. 找到 “字体面孔（Font face）” 输入框，修改为你想用的字体名称（如 Cascadia Code, Fira Code, JetBrains Mono, Consolas 等）。
6. （可选）调整字体大小、粗细等。
7. 点击右下角 “保存”。

---

#### 效果对比

| 字体不对      | 字体设置正确            |
| --------- | ----------------- |
| `` 问号、乱码 | 🎯 Git 图标、路径图标等正常 |



