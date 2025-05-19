<!-- 
created_at: 2025-05-17
updated_at: 2025-05-17
author: SeaflyNN
github: https://github.com/seaflyNN/doc-collect
-->

# 1. 错误背景
package.json版本
```
"tailwindcss": "^4.1.7"
```

## 1.1 执行&报错信息
```shell
npx tailwindcss init -p
# npm error could not determine executable to run
# npm error A complete log of this run can be found in: C:\Users\21075\scoop\persist\nodejs\cache\_logs\2025-05-17T14_08_32_739Z-debug-0.log
````

C:\Users\21075\scoop\persist\nodejs\cache\_logs\2025-05-17T14_08_32_739Z-debug-0.log
执行报错:
> 0 verbose cli C:\Users\21075\scoop\apps\nodejs\current\node.exe C:\Users\21075\scoop\apps\nodejs\23.11.0\node_modules\npm\bin\npm-cli.js <br>
> 1 info using npm@10.9.2<br>
> 2 info using node@v23.11.0<br>
> 3 silly config load:file:C:\Users\21075\scoop\apps\nodejs\23.11.0\node_modules\npm\npmrc<br>
> 4 silly config load:file:D:\code\front_collect\render_markdown.ts\.npmrc<br>
> 5 silly config load:file:C:\Users\21075\.npmrc<br>
> 6 silly config load:file:C:\Users\21075\scoop\persist\nodejs\bin\etc\npmrc<br>
> 7 verbose title npm exec tailwindcss init -p<br>
> 8 verbose argv "exec" "--" "tailwindcss" "init" "-p"<br>
> 9 verbose logfile logs-max:10 dir:C:\Users\21075\scoop\persist\nodejs\cache\_logs\2025-05-17T14_08_32_739Z-<br>
> 10 verbose logfile C:\Users\21075\scoop\persist\nodejs\cache\_logs\2025-05-17T14_08_32_739Z-debug-0.log<br>
> 11 silly logfile start cleaning logs, removing 1 files<br>
> 12 silly logfile done cleaning log files<br>
> 13 silly packumentCache heap:4345298944 maxSize:1086324736 maxEntrySize:543162368<br>
> 14 verbose stack Error: could not determine executable to run<br>
> 14 verbose stack     at getBinFromManifest (C:\Users\21075\scoop\apps\nodejs\23.11.0\node_modules\npm\node_modules\libnpmexec\lib\get-bin-from-manifest.js:17:23)<br>
> 14 verbose stack     at exec (C:\Users\21075\scoop\apps\nodejs\23.11.0\node_modules\npm\node_modules\libnpmexec\lib\index.js:202:15)<br>
> 14 verbose stack     at async Npm.exec (C:\Users\21075\scoop\apps\nodejs\23.11.0\node_modules\npm\lib\npm.js:207:9)<br>
> 14 verbose stack     at async module.exports (C:\Users\21075\scoop\apps\nodejs\23.11.0\node_modules\npm\lib\cli\entry.js:74:5)<br>
> 15 verbose pkgid tailwindcss@4.1.7<br>
> 16 error could not determine executable to run<br>
> 17 verbose cwd D:\code\front_collect\render_markdown.ts<br>
> 18 verbose os Windows_NT 10.0.26100<br>
> 19 verbose node v23.11.0<br>
> 20 verbose npm  v10.9.2<br>
> 21 verbose exit 1<br>
> 22 verbose code 1<br>
> 23 error A complete log of this run can be found in: C:\Users\21075\scoop\persist\nodejs\cache\_logs\2025-05-17T14_08_32_739Z-debug-0.log<br>
```

# 2. 解决方案
tailwind.config.js
```ts
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} 
```

index.css
```ts
@tailwind base;
@tailwind components;
@tailwind utilities;
```

