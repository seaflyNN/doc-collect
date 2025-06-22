# ubuntu安装新版本llvm

## 1. 使用llvm官方的源安装

```sh
sudo apt install wget gnupg lsb-release
wget https://apt.llvm.org/llvm.sh
chmod +x llvm.sh
sudo ./llvm.sh 18  # 安装 LLVM 18
```

## 2. 卸载
```
sudo apt remove --purge 'llvm-18*' 'clang-18*' 'libclang-18*' 'liblld-18*' 'liblldb-18*' 'libllvm-18*' lld-18 lldb-18 clang-tidy-18 clangd-18
```

## 3. 直接使用官方的`apt`安装
```
sudo apt install llvm clang lld lldb
```
