# pip相关笔记

## 目录

- [pip相关笔记](#pip相关笔记)
  - [目录](#目录)
  - [1. 打印详细信息](#1-打印详细信息)
  - [2. 打印某个包的依赖](#2-打印某个包的依赖)
  - [3. 修改为中科大的源](#3-修改为中科大的源)

## 1. 打印详细信息

```shell
# 打印详细信息
pip install --verbose
# 或者加两个v获取全面信息
pip install --vvv
```

## 2. 打印某个包的依赖

```shell
pip install pipdeptree
pipdeptree -p 包名
```

## 3. 修改为中科大的源
```shell
# 设置中科大源为默认源
pip config set global.index-url https://pypi.mirrors.ustc.edu.cn/simple/

# 查看当前配置
pip config list

# 临时使用中科大源安装包
pip install -i https://pypi.mirrors.ustc.edu.cn/simple/ 包名
```
