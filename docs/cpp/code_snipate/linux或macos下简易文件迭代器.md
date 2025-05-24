# 简单的文件迭代器

简单的文件迭代器


```cpp
#pragma once


/**
 * linux/macos 下使用
 * 一个简单的文件迭代器
 */


#include <string>
#include <queue>


#include <dirent.h>
#include <sys/stat.h>
#include <unistd.h>

// fs
namespace fs {
//
struct FilesIter {

private:
  struct DirState {
    std::string path;
    DIR *dir = nullptr;
    long offset = 0;
    DirState() {}
    ~DirState() {}
    DirState(std::string p, DIR *d, long off)
        : path(std::move(p)), dir(d), offset(off) {}
    DirState(const DirState &rhs) = default;
    DirState &operator=(const DirState &) = default;
  };

  std::queue<DirState> que;

public:
  explicit FilesIter(const std::string &root) {
    que.emplace(DirState(root, nullptr, 0));
  }
  ~FilesIter() {}

  FilesIter(const FilesIter &) = default;
  FilesIter &operator=(const FilesIter &) = default;

  std::optional<std::string> next() { return fetch_next(); }

private:
  std::optional<std::string> fetch_next() {
    while (!que.empty()) {
      auto &cur = que.front();
      if (cur.dir == nullptr) {
        cur.dir = opendir(cur.path.c_str());
        if (cur.dir == nullptr) {
          que.pop();
          continue;
        }
        seekdir(cur.dir, 0);
      }

      dirent *entry = readdir(cur.dir);
      if (entry == nullptr) {
        closedir(cur.dir);
        que.pop();
        continue;
      }

      std::string filename = entry->d_name;
      if (filename == "." || filename == "..") {
        continue;
      }

      std::string fullpath = cur.path + "/" + filename;

      struct stat entry_stat;
      if (stat(fullpath.c_str(), &entry_stat) == 0) {
        if (S_ISDIR(entry_stat.st_mode)) {
          que.emplace(fullpath, nullptr, 0);
        } else if (S_ISREG(entry_stat.st_mode)) {
          cur.offset = telldir(cur.dir);
          return fullpath;
        }
      }
    }
    return {};
  }
};
}; // namespace fs
```