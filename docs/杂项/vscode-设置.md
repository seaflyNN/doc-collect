# vscode设置

## 1. 括号竖线显示
修改`.vscode/settings.json`, 增加
```json
// 开启原生括号着色
"editor.bracketPairColorization.enabled": true,
// 开启active时的代码块边缘导轨线着色（和Bracket Pair Colorizer行为一致）
"editor.guides.bracketPairs": "active"
```

## 2. 显示函数参数名称
`ctrl + ,`打开设置, 搜索`inlayHints`, 然后找到`C++`, 将`parameterNames.enabled`等几个参数打开即可

## 3. 控制错误提示方式
`ctrl + ,`打开设置, 搜索`editor.lightbulb.enabled`
```
editor.lightbulb.enabled
```


