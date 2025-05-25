# chrome浏览器多用户导致selenium无法启动

## 目录
- [1. 具体实现](#1-具体实现)

如题, 在使用 `selenium` 爬取网站时, 如果本机电脑的`chrome`有多个用户时, 会无法启动; 解决思路: 使用 `tempfile` 创建临时目录, 修改 `chrome_options` 即可

## 1. 具体实现

```py
import tempfile

# ...

# 使用临时用户资料，避免用户选择界面
temp_dir = tempfile.mkdtemp()
chrome_options.add_argument(f'--user-data-dir={temp_dir}')
chrome_options.add_argument('--profile-directory=Default')
print(f"📁 使用临时用户资料: {temp_dir}")

# ...
```

