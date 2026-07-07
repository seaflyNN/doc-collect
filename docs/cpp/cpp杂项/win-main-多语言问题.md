# win的`main`函数多语言`代码页`问题

## 方案1: 利用`CommandLineToArgvW`接口获取底层原始`wchar_t`的输入, 而不经过代码页转码

本质上就是`CommandLineToArgvW`拿到原始的`utf16le`的字符串然后解析就行

```cpp
#if _WIN32
#include <windows.h>

#include <shellapi.h>
#pragma comment(lib, "Shell32.lib")
#endif

#include <iostream>
#include <string>
#include <vector>

#if _WIN32
// UTF-16 → UTF-8
inline std::string WToU8(const std::wstring &w) {
  if (w.empty())
    return {};
  int len = WideCharToMultiByte(CP_UTF8, WC_ERR_INVALID_CHARS, w.c_str(), -1,
                                nullptr, 0, nullptr, nullptr);
  if (len == 0)
    return {};
  std::string u8(len - 1, 0);
  WideCharToMultiByte(CP_UTF8, 0, w.c_str(), -1, u8.data(), len, nullptr,
                      nullptr);
  return u8;
}

inline std::vector<std::string> GetUtf8Args() {
  int nArgs = 0;
  LPWSTR *wargs = CommandLineToArgvW(GetCommandLineW(), &nArgs);
  if (!wargs)
    return {};

  std::vector<std::string> result;
  result.reserve(nArgs);
  for (int i = 0; i < nArgs; i++) {
    result.push_back(WToU8(wargs[i]));
  }

  LocalFree(wargs);
  return result;
}
#endif

int main(int argc, char **argv) {
#if _WIN32
  // 控制台输入输出强制UTF8
  SetConsoleOutputCP(CP_UTF8);
  SetConsoleCP(CP_UTF8);
  // 可选：关闭控制台UTF-8写入的字节转换bug
  // SetConsoleMode(GetStdHandle(STD_OUTPUT_HANDLE),
  //                ENABLE_VIRTUAL_TERMINAL_PROCESSING);
  // 全局标准流同步UTF8
  std::ios::sync_with_stdio(false);
  std::cin.tie(nullptr);
#endif
  //
  auto args = GetUtf8Args();
  for (auto &&arg : args) {
    std::cout << arg << std::endl;
  }
  return 0;
}
```

## 方案2: 使用`wmain`
缺点: 可能会有运行环境的问题, 暂时不使用


