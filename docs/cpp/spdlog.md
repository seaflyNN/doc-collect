# 关于`spdlog.h`

## 1. tips
+ 使用`headeronly`链接
  + `target_link_library(my_target PRIVATE spdlog_header_only)`
+ 注意析构和mutex
+ 日志最好是对象, 而非全局变量

## 代码示例
```cpp
// 打印文件和行号
logger->set_pattern("[%Y-%m-%d %H:%M:%S.%e] [%^%l%$] [%s:%#] %v");
SPDLOG_LOGGER_WARN(logger,"test log, {}", 123);
```

