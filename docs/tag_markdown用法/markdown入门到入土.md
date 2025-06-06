<!-- 
created_at: 2025-05-17
updated_at: 2025-05-17
author: SeaflyNN
github: https://github.com/seaflyNN/doc-collect
-->

# markdown语法速查
平常常使用markdown来写文档, 但是语法可能又会经常忘记, 故按照使用场景、以工具的形式记录下来, 当作一个速查笔记.

## 目录
- [markdown语法速查](#markdown语法速查)
  - [目录](#目录)
  - [vscode相关插件](#vscode相关插件)
  - [1. 标题](#1-标题)
  - [2. 段落](#2-段落)
    - [2.1 注意事项](#21-注意事项)
  - [3. 换行](#3-换行)
  - [4. 文本强调](#4-文本强调)
  - [5. 引用](#5-引用)
  - [5. 列表](#5-列表)
    - [5.1 有序列表](#51-有序列表)
    - [5.2 无序列表](#52-无序列表)
  - [6. 代码语法](#6-代码语法)
    - [6.1 反引号转义](#61-反引号转义)
    - [6.2 代码块](#62-代码块)
  - [7. 分隔线语法](#7-分隔线语法)
  - [8. 链接语法](#8-链接语法)
  - [9. 图片语法](#9-图片语法)
    - [9.1 基础用法](#91-基础用法)
    - [9.2 如何给图片增加超链接](#92-如何给图片增加超链接)
  - [10. 提纲和锚点功能](#10-提纲和锚点功能)
    - [10.1 目录生成](#101-目录生成)
    - [10.2 锚点链接](#102-锚点链接)
    - [10.3 不同渲染器的支持情况](#103-不同渲染器的支持情况)
    - [10.4 注意事项](#104-注意事项)
  - [11. markdown 的代码转义](#11-markdown-的代码转义)
  - [12. HTML标签显示](#12-html标签显示)

## vscode相关插件
+ Markdown Preview Enhanced
+ Markdown Preview Mermaid Support
+ Markdown All in One

## 1. 标题
标题是用#号来表示的, 比如: `# 一级标题 ## 二级标题 ## 三级标题`

| 原始代码 | 渲染后 |
| ------- | ------- |
| `# 一级标题` | <h1>一级标题</h1> |
| `## 二级标题` | <h2>二级标题</h2> |
| `### 三级标题` | <h3>三级标题</h3> |

## 2. 段落
段落之间空一行即可创建新段落

| 原始代码 | 渲染后 |
| ------- | ------- |
| `这是第一个段落`<br><br>`这是第二个段落` | 这是第一个段落<br><br>这是第二个段落 |

> **注意**：也可以使用HTML的`<p>`标签来创建段落，但在纯Markdown中通常只需要空一行。

### 2.1 注意事项
| ✅ Do this | ❌ Don't do this |
| --------- | --------------- |
| 不要使用空格和制表符缩进段落 | &nbsp;&nbsp;&nbsp;&nbsp;这可能会导致格式化或者渲染时出现与预期不一致的行为 |
| 确保每一行的文字是左对齐的 | &nbsp;&nbsp;&nbsp;&nbsp;不要在行文字中添加空格或者tab（← 错误示例：这里故意添加了多余空格） |

## 3. 换行
要创建一个换行（`<br>`），可以在行尾添加两个或多个空格，然后按回车键

| 原始代码 | 渲染后 |
| ------- | ------- |
| `第一行末尾加两个空格  `<br>`第二行` | 第一行末尾加两个空格  <br>第二行 |
| `也可以使用HTML的<br>标签` | 也可以使用HTML的<br>标签 |

> **注意**：行尾的两个空格在编辑器中通常不可见，因此有时使用`<br>`标签会更清晰。

## 4. 文本强调
+ 使用两个星号(\*\*)进行加粗, 比如: **加粗**
+ 使用一个星号(\*)变成斜体, 比如: *斜体*

## 5. 引用
又是我们希望引用某些人的某些字句，或者引用自己的某些链接，可以在段落前加一个 <code>></code> 符号

> 这里是引用的话<br>
>
>> 这里是嵌套引用, 能够叠加其他的渲染, 比如 *斜体*

## 5. 列表
### 5.1 有序列表
有序列表, 使用阿拉伯数字然后紧跟一个英文的<code>.</code>即可


| 原始代码 | 渲染后 |
| ------- | ------- |
| `1. 第一项`<br>`2. 第二项`<br>`3. 第三项` | 1. 第一项<br>2. 第二项<br>3. 第三项 |

### 5.2 无序列表
无序列表可以使用星号(*), 加号(+)或减号(-):

| 原始代码 | 渲染后 |
| ------- | ------- |
| `* 项目一`<br>`* 项目二`<br>`  * 子项目` | * 项目一<br>* 项目二<br>* 子项目 |

任务列表可以显示待办事项:

| 原始代码 | 渲染后 |
| ------- | ------- |
| `- [x] 已完成任务`<br>`- [ ] 未完成任务` | - [x] 已完成任务<br>- [ ] 未完成任务 |

文本强调示例:

| 原始代码 | 渲染后 |
| ------- | ------- |
| `**加粗文本**` | **加粗文本** |
| `*斜体文本*` | *斜体文本* |
| `***加粗且斜体***` | ***加粗且斜体*** |
| `~~删除线~~` | ~~删除线~~ |

## 6. 代码语法
要将单词或短语表示为代码，请将其包裹在反引号 (`) 中
| 原始代码 | 渲染后 |
| ------- | ------- |
| `` `代码` `` | `代码` |

### 6.1 反引号转义
在Markdown中显示反引号本身需要特殊处理：

| 原始代码 | 说明 | 渲染后 |
| ------- | ------- | ------- |
| ``` `` `包含反引号的代码` `` ``` | 使用双反引号包裹 | `` `包含反引号的代码` `` |
| ```` ```三个反引号表示代码块``` ```` | 使用更多反引号包裹 | ```三个反引号表示代码块``` |

### 6.2 代码块
使用三个反引号创建代码块，可以指定语言以获得语法高亮：

````
```javascript
function hello() {
  console.log("Hello, world!");
}
```
````

渲染效果：
```javascript
function hello() {
  console.log("Hello, world!");
}
```

## 7. 分隔线语法
要创建分隔线，请在单独一行上使用三个或多个星号 (***)、破折号 (---) 或下划线 (___) ，并且不能包含其他内容。

| 原始代码 | 说明 | 渲染后 |
| ------- | ------- | ------- |
| `***` | 使用三个星号 | <hr> |
| `---` | 使用三个破折号 | <hr> |
| `___` | 使用三个下划线 | <hr> |

> **注意**：在Markdown表格中无法直接显示分隔线效果，上面使用了HTML的`<hr>`标签来模拟效果。实际使用时，分隔线会在文档中显示为一条水平线。

***

这是一个实际的分隔线效果示例（上面的线）。


## 8. 链接语法

| 原始代码 | 说明 | 渲染后 |
| ------- | ------- | ------- |
| `[自定链接名字-这里以百度为例子](https://seaflynn.github.io/doc-collect)` | 链接语法 | [自定链接名字-这里以百度为例子](https://seaflynn.github.io/doc-collect) |
| `[自定链接名字-这里以百度为例子](https://seaflynn.github.io/doc-collect "添加title")` | 链接语法, 增加title | [自定链接名字-这里以百度为例子](https://seaflynn.github.io/doc-collect "自定义添加的title") |

## 9. 图片语法

### 9.1 基础用法

| 原始代码 | 说明 | 渲染后 |
| ------- | ------- | ------- |
| `![兔子警官](imgs/2025-05-17_17-25-44.png)` | 图片引用的例子, 可以渲染成pdf或者其他的 | ![兔子警官](imgs/2025-05-17_17-25-44.png) |

### 9.2 如何给图片增加超链接

| 原始代码 | 说明 | 渲染后 |
| ------- | ------- | ------- |
| `[![兔子警官](imgs/2025-05-17_17-25-44.png "兔子警官")](https://seaflynn.github.io/doc-collect)` | 给图片增加超链接 | [![兔子警官](imgs/2025-05-17_17-25-44.png "兔子警官")](https://seaflynn.github.io/doc-collect) |

## 10. 提纲和锚点功能

### 10.1 目录生成
Markdown支持多种目录生成方式：

1. **手动创建目录**
   ```markdown
   ## 目录
   1. [第一章](#第一章)
   2. [第二章](#第二章)
      - [2.1 小节](#21-小节)
   ```

2. **使用VSCode插件自动生成**
   - Markdown All in One插件支持自动生成目录
   - 使用快捷键 `Ctrl+Shift+P` 输入 `Markdown: Create Table of Contents`

### 10.2 锚点链接
锚点链接的格式为：`[显示文本](#锚点名称)`

| 原始代码 | 说明 | 渲染后 |
| ------- | ------- | ------- |
| `[跳转到标题](#1-标题)` | 基本锚点链接 | [跳转到标题](#1-标题) |
| `[跳转到子标题](#21-注意事项)` | 多级标题锚点 | [跳转到子标题](#21-注意事项) |

锚点名称的生成规则：
1. 转换为小写
2. 空格替换为连字符
3. 特殊字符会被移除
4. 中文标题会被保留

### 10.3 不同渲染器的支持情况

| 渲染器 | 锚点支持 | 目录支持 | 备注 |
| ------- | ------- | ------- | ------- |
| GitHub | ✅ | ✅ | 完全支持标准Markdown锚点 |
| VSCode | ✅ | ✅ | 支持自动生成目录 |
| Docsify | ❌ | ✅ | 不支持标准锚点，但有自己的路由系统 |
| VuePress | ✅ | ✅ | 支持自动生成目录和锚点 |
| GitBook | ✅ | ✅ | 支持自动生成目录和锚点 |

### 10.4 注意事项
1. **锚点名称唯一性**
   - 确保每个锚点名称在文档中唯一
   - 如果出现重复，可以添加数字后缀

2. **中文锚点处理**
   - 中文标题的锚点会被保留
   - 建议使用英文标题或添加英文别名

3. **特殊字符处理**
   - 避免在标题中使用特殊字符
   - 如果必须使用，注意锚点名称的生成规则

4. **目录维护**
   - 定期更新目录以保持同步
   - 使用VSCode插件可以自动更新

5. **渲染器兼容性**
   - 不同渲染器对锚点的支持程度不同
   - 建议在目标平台上测试锚点功能
   - 对于不支持锚点的平台，可以考虑使用其他导航方式

## 11. markdown 的代码转义

| 字符 | 名称 | 转义方式 | 效果 |
| ---- | ---- | -------- | ---- |
| \    | backslash (反斜杠) | `\\` | \ |
| `    | backtick (反引号) | `` \` `` | ` |
| *    | asterisk (星号) | `\*` | * |
| _    | underscore (下划线) | `\_` | _ |
| { }  | curly braces (花括号) | `\{` `\}` | { } |
| [ ]  | brackets (方括号) | `\[` `\]` | [ ] |
| ( )  | parentheses (圆括号) | `\(` `\)` | ( ) |
| #    | pound sign (井号) | `\#` | # |
| +    | plus sign (加号) | `\+` | + |
| -    | minus sign (连字符) | `\-` | - |
| .    | dot (句点) | `\.` | . |
| !    | exclamation mark (感叹号) | `\!` | ! |
| \|   | pipe (竖线) | `\|` | \| |

> **注意**：在Markdown表格中，竖线（|）需要特别注意，因为它是表格的分隔符，必须使用`\|`转义。


## 12. HTML标签显示

在Markdown中显示HTML标签而不被解析的方法：

1. **使用HTML实体编码**：
   - `<` 使用 `&lt;`, 其实就是less than
   - `>` 使用 `&gt;`, 其实就是greater than
   
   例如，要显示 `<br>` 标签：`&lt;br&gt;` → &lt;br&gt;

2. **使用行内代码**：
   ```
   `<br>`
   ```
   显示效果：`<br>`

3. **使用代码块**：
   ```
   <br>
   <p>标签不会被解析</p>
   ```

4. **在表格或其他HTML环境中**：
   使用HTML实体是最可靠的方法：
   ```html
   <td>这是一个 &lt;br&gt; 标签</td>
   ```

5. **转义尖括号**：
   在某些Markdown解析器中，可以使用反斜杠转义：
   ```
   \<br\>
   ```
   但这种方法不通用，推荐使用HTML实体

***
