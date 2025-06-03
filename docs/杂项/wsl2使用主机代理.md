# wsl2使用主机代理

## 目录
- [wsl2使用主机代理](#wsl2使用主机代理)
  - [目录](#目录)
  - [1. 获取主机ip](#1-获取主机ip)
  - [2. 设置 代理](#2-设置-代理)
  - [reference](#reference)

## 1. 获取主机ip
```sh
# 获取主机 ip 地址
ip route | grep default | awk '{print $3}'
# 172.25.160.1
```
## 2. 设置 代理
```sh
# 假设主机暴露的端口为 25106
export http_proxy=http://172.25.160.1:25106
export https_proxy=http://172.25.160.1:25106
```

## reference
+ [记一次用wsl2中共享宿主机的代理-v2rayN](https://hlog.cc/archives/210/)