# `emsdk` 环境配置

## 目录
- [`emsdk` 环境配置](#emsdk-环境配置)
  - [目录](#目录)
  - [1. 环境配置](#1-环境配置)

## 1. 环境配置
```sh
sudo apt install fish
mkdir dev && cd dev
mkdir env && cd env
git clone https://github.com/juj/emsdk.git
cd emsdk
./emsdk install latest
./emsdk activate latest
# 编辑 ~/.config/fish/config.fish
# 假设 sdk 的位置在 ~/dev/env/emsdk
# 如果是 linux
echo 'source ~/dev/env/emsdk/emsdk_env.fish' >> ~/.config/fish/config.fish
# 启动 fish
fish
# 检查 emcc 版本
emcc --version
```
