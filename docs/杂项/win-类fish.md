# win终端插件安装

[弃用], 使用 Oh My Posh, 详见 Oh My Posh 安装

## 目录
- [win终端插件安装](#win终端插件安装)
  - [目录](#目录)
  - [1. 安装 PSReadLine 插件](#1-安装-psreadline-插件)
    - [step 1. 安装插件](#step-1-安装插件)
    - [step 2. 修改配置文件](#step-2-修改配置文件)
    - [step 3. \[可选\] 别名命令](#step-3-可选-别名命令)
      - [3.1 linux/macos风格别名](#31-linuxmacos风格别名)
    - [step 4. 重启 powershell 生效](#step-4-重启-powershell-生效)

---

## 1. 安装 PSReadLine 插件

*管理员身份启动powershell*

### step 1. 安装插件
```
# update powershell
Install-Module -Name PowerShellGet -Force -AllowClobber
# should be >= 2.2.4, and restart powershell
Get-Module PowerShellGet -ListAvailable | Select-Object Version
# 
```
### step 2. 修改配置文件

```
notepad $PROFILE
```
然后粘贴以下内容:
```
# ---------- 启用类似 Fish shell 的自动补全功能 ----------

# 从历史命令中预测建议（按 → 键接受建议）
Set-PSReadLineOption -PredictionSource History
Set-PSReadLineOption -PredictionViewStyle ListView  # 以列表形式显示建议

# 设置快捷键：
# - 右箭头：接受建议
# - 上/下箭头：搜索历史中以当前输入开头的命令
Set-PSReadLineKeyHandler -Key RightArrow -Function AcceptSuggestion
Set-PSReadLineKeyHandler -Key UpArrow -Function HistorySearchBackward
Set-PSReadLineKeyHandler -Key DownArrow -Function HistorySearchForward

# 其他可选配置：
# Set-PSReadLineOption -ShowToolTips                # 显示命令提示
# Set-PSReadLineOption -HistoryNoDuplicates         # 历史记录不保留重复命令
# Set-PSReadLineOption -HistorySearchCursorMovesToEnd  # 搜索历史时光标移到行尾
```

### step 3. [可选] 别名命令
```notepad $PROFILE```, 按需以下内容*追加*到文件中:

#### 3.1 linux/macos风格别名
```
# 文件和目录操作（使用 -Option AllScope 覆盖内置别名）
Set-Alias -Name ls -Value Get-ChildItem -Option AllScope
Set-Alias -Name ll -Value Get-ChildItem -Option AllScope
Set-Alias -Name la -Value "Get-ChildItem -Force" -Option AllScope
```

### step 4. 重启 powershell 生效
重启 `powershell` 即可

