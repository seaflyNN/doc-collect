# 目录

- [目录](#目录)
- [onnxruntime编译](#onnxruntime编译)
  - [0. 注意](#0-注意)
  - [1. 源码下载](#1-源码下载)
  - [2. 修改编译脚本](#2-修改编译脚本)
  - [3. 编译](#3-编译)

# onnxruntime编译


## 0. 注意
+ 需要下载不少谷歌的三方库，需要提前准备好网络环境
+ 如果有`vcpkg`，可以暂时关闭它，`protobuf`会和`onnxruntime`依赖的有冲突
+ 部分库的`sha1`不一定对的上
	+  `eigen`的库对不上，修改 `cmake/deps.txt`文件即可

## 1. 源码下载
```
git clone --depth 1 --branch v1.22.0 --recursive https://github.com/Microsoft/onnxruntime.git

# 
 ./build.bat --config Release --build_shared_lib --parallel --use_dml --cmake_extra_defines onnxruntime_BUILD_UNIT_TESTS=OFF
```

## 2. 修改编译脚本
```py
# 修改py脚本
# tools/ci_build/build.py
# if not use_dev_mode(args):
    #     cmake_args += ["--compile-no-warning-as-error"]
    cmake_args += ["--compile-no-warning-as-error"]
```

## 3. 编译
```
 ./build.bat --config Release --build_shared_lib --parallel --use_dml --cmake_extra_defines onnxruntime_BUILD_UNIT_TESTS=OFF
```
