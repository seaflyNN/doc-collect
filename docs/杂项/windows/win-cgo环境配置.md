# windows cgo环境搭建

## 1. 下载并安装msys2

```shell
https://github.com/msys2/msys2-installer/releases/download/2025-06-22/msys2-x86_64-20250622.exe
```

## 2. 安装mingw

```shell
sed -i "s#mirror.msys2.org/#mirrors.ustc.edu.cn/msys2/#g" /etc/pacman.d/mirrorlist*
pacman -Syu
# pacman -S mingw-w64-x86_64-gcc mingw-w64-x86_64-make mingw-w64-x86_64-pkg-config base-devel

pacman -S mingw-w64-x86_64-toolchain
```

## 3. 配置环境变量

```shell
# 将 C:/msys64/mingw64/bin 加入 PATH
# 临时有效(CMD)
set PATH=C:\msys64\mingw64\bin;%PATH%
# 临时有效powershell
$env:PATH = "C:\msys64\mingw64\bin;" + $env:PATH
# 永久有效(CMD)管理员运行
setx PATH "C:\msys64\mingw64\bin;%PATH%"
# 永久有效(powershell)
[Environment]::SetEnvironmentVariable(
    "Path",
    "C:\msys64\mingw64\bin;" + [Environment]::GetEnvironmentVariable("Path", "User"),
    "User"
)
```

