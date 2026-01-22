# 关于`subprocess.h`

## 1. tips
+ `windows`下不支持`wchar_t`, 可以手动修改`subprocess.h`的`subprocess_create_ex`, 自己增加`wstring`版本, 或者直接使用当前目录`./`
+ 环境变量需要自己获取`get_system_environment`
+ win无黑框`subprocess_option_no_window`
+ 多语言用`icu`库

## 2. 示例代码
```cpp
#ifdef _WIN32
#define NOMINMAX
#include <Windows.h>
#endif

#include <string>
#include <thread>
#include <vector>

static std::vector<std::string> get_system_environment() {
  std::vector<std::string> env_list;

#ifdef _WIN32
  const char *env_names[] = {"PATH",
                             "SystemRoot",
                             "SystemDrive",
                             "TEMP",
                             "TMP",
                             "windir",
                             "COMSPEC",
                             "PATHEXT",
                             "ProgramData",
                             "ProgramFiles",
                             "ProgramFiles(x86)",
                             "CommonProgramFiles",
                             "CommonProgramFiles(x86)",
                             "LOCALAPPDATA",
                             "APPDATA",
                             nullptr};

  char buffer[32768];
  for (int i = 0; env_names[i] != nullptr; ++i) {
    DWORD len = GetEnvironmentVariableA(env_names[i], buffer, sizeof(buffer));
    if (len > 0 && len < sizeof(buffer)) {
      env_list.push_back(std::string(env_names[i]) + "=" + buffer);
    }
  }
#else
  const char *env_names[] = {"PATH", "HOME",   "TMPDIR",
                             "LANG", "LC_ALL", nullptr};
  for (int i = 0; env_names[i] != nullptr; ++i) {
    const char *val = getenv(env_names[i]);
    if (val) {
      env_list.push_back(std::string(env_names[i]) + "=" + val);
    }
  }
#endif

  return env_list;
}

template <typename T, typename Env, typename Logger>
static inline int exec(const std::string &exec_path, const T task, Env &env,
                       Logger logger) {
  struct subprocess_s subprocess;
  std::vector<const char *> command_line{exec_path.c_str(), "-c",
                                         config_path.c_str(), nullptr};
  auto env_strings = get_system_environment();
  std::vector<const char *> environment;
  for (const auto &e : env_strings) {
    environment.push_back(e.c_str());
  }
  environment.push_back(nullptr);
  int result = subprocess_create_ex(command_line.data(), subprocess_option_no_window, environment.data(), &subprocess);
  if (0 != result)
    return result;

  int process_return;
  result = subprocess_join(&subprocess, &process_return);
  if (0 != result)
    return result;
  if (process_return != 0)
    return process_return;

  return 0;
}
```

# reference
+ [subprocess.h](https://github.com/sheredom/subprocess.h)