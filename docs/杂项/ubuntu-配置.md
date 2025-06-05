# ubuntu 配置

## 1. 换源

### 1.1 中科大源

```
Types: deb
URIs: https://mirrors.ustc.edu.cn/ubuntu
Suites: noble noble-updates noble-backports
Components: main restricted universe multiverse
Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg

Types: deb
URIs: https://mirrors.ustc.edu.cn/ubuntu
Suites: noble-security
Components: main restricted universe multiverse
Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg
```

+ [24.04-DEB822格式](https://mirrors.ustc.edu.cn/help/ubuntu.html#__tabbed_5_2)

### 1.2 安装常见软件

```sh
sudo apt install -y gcc g++ cmake vim git fish
```
