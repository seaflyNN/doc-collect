import { defineConfig } from 'vitepress'

export default defineConfig({
  // 站点配置
  title: '我的文档',
  description: '使用 VitePress 构建的文档站点',
  lang: 'zh-CN',
  
  // 清理URL
  cleanUrls: true,
  
  // 基础路径
  base: '/doc-collect/',
  
  // 头部配置
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    // MathJax 支持
    ['script', { 
      src: 'https://polyfill.io/v3/polyfill.min.js?features=es6',
      defer: true
    }],
    ['script', {
      src: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js',
      defer: true
    }],
  ],

  // 主题配置
  themeConfig: {
    // 导航栏
    nav: [
      { text: '首页', link: '/' },
      { text: '文档写作', link: '/tag_markdown用法/markdown入门到入土' },
      { text: '前端', link: '/前端/前端动画库' },
      { text: 'C++', link: '/cpp/cpo' },
      { text: 'Rust', link: '/rust/记录rust滥用lazy_static导致的一个bug' },
      { text: 'QT', link: '/QT/qml笔记' },
      { text: 'OpenCV', link: '/opencv/OpenCV4应用开发入门实践与工程化实践' },
      { text: '杂项', link: '/杂项/本地构建docsify' }
    ],

    // 侧边栏
    sidebar: {
      // 文档写作
      '/tag_markdown用法/': [
        {
          text: '文档写作',
          items: [
            { text: 'Markdown 入门到入土', link: '/tag_markdown用法/markdown入门到入土' }
          ]
        }
      ],

      // 前端
      '/前端/': [
        {
          text: '前端',
          items: [
            { text: '动画库', link: '/前端/前端动画库' },
            {
              text: '错误记录',
              items: [
                { text: 'TailwindCSS错误记录', link: '/前端/错误记录/err-tailwindcss' }
              ]
            }
          ]
        }
      ],

      // C++
      '/cpp/': [
        {
          text: 'C++',
          items: [
            { text: 'CPO', link: '/cpp/cpo' },
            {
              text: '代码片段',
              items: [
                { text: '简单的文件迭代器', link: '/cpp/code_snipate/linux或macos下简易文件迭代器' }
              ]
            },
            {
              text: 'C++20完全指南',
              items: [
                { text: '第一章-比较运算符', link: '/cpp/cpp20完全指南/第1章-比较运算符' },
                { text: '第二章-函数参数的占位符类型', link: '/cpp/cpp20完全指南/第2章-函数参数的占位符类型' },
                { text: '第三章-概念、需求和约束', link: '/cpp/cpp20完全指南/第3章-概念、需求和约束' },
                { text: '第四章-详细介绍概念、需求和约束', link: '/cpp/cpp20完全指南/第4章-详细介绍概念、需求和约束' },
                { text: '第五章-详细介绍标准概念', link: '/cpp/cpp20完全指南/第5章-详细介绍标准概念(std-concept)' },
                { text: '第六章-范围和视图', link: '/cpp/cpp20完全指南/第6章-范围和视图' }
              ]
            },
            {
              text: 'C++杂项',
              items: [
                { text: 'C++20调试内联命名空间', link: '/cpp/cpp杂项/cpp20调试内联命名空间-内联变量-cpo' }
              ]
            }
          ]
        }
      ],

      // Rust
      '/rust/': [
        {
          text: 'Rust',
          items: [
            { text: '记录rust滥用lazy_static导致的一个bug', link: '/rust/记录rust滥用lazy_static导致的一个bug' }
          ]
        }
      ],

      // QT
      '/QT/': [
        {
          text: 'QT',
          items: [
            { text: 'QML笔记', link: '/QT/qml笔记' },
            { text: 'QML Background ContentItem 分离', link: '/QT/qml-background-contentitem-分离' },
            { text: 'QT QML常用组件', link: '/QT/qt-qml常用组件' },
            { text: 'QT入门', link: '/QT/qt入门' },
            { text: 'QT CMake', link: '/QT/qt-cmake' }
          ]
        }
      ],

      // OpenCV
      '/opencv/': [
        {
          text: 'OpenCV',
          items: [
            { text: 'OpenCV4应用开发入门实践与工程化实践', link: '/opencv/OpenCV4应用开发入门实践与工程化实践' },
            { text: 'OpenCV编译WASM', link: '/opencv/wasm-opencv' }
          ]
        }
      ],

      // Python
      '/python/': [
        {
          text: 'Python',
          items: [
            { text: 'pip相关', link: '/python/pip相关' }
          ]
        }
      ],

      // FFmpeg
      '/ffmpeg/': [
        {
          text: 'FFmpeg',
          items: [
            { text: 'FFmpeg WASM', link: '/ffmpeg/ffmpeg-wasm' }
          ]
        }
      ],

      // 关于AI
      '/关于AI/': [
        {
          text: '关于AI',
          items: [
            {
              text: 'B站',
              items: [
                { text: '周鸿祎-AI创业-百大AI应用系列视频博客', link: '/关于AI/b站/周鸿祎-ai创业-百大AI应用系列视频博客' }
              ]
            }
          ]
        }
      ],

      // 杂项
      '/杂项/': [
        {
          text: '杂项',
          items: [
            { text: '本地构建docsify', link: '/杂项/本地构建docsify' },
            { text: '本地构建mkdocs', link: '/杂项/本地构建mkdocs' },
            { text: 'MkDocs配置和优化', link: '/杂项/mkdocs-配置和优化' },
            { text: 'VSCode插件', link: '/杂项/vscode-插件' },
            { text: 'Oh-My-Posh安装', link: '/杂项/Oh-My-Posh安装' },
            { text: 'Win终端插件安装', link: '/杂项/win-类fish' },
            { text: 'Selenium坑-Chrome多用户资料', link: '/杂项/selenium-坑-chrome多用户资料' },
            { text: 'Chrome插件Tutorial', link: '/杂项/chrome-插件-tutorial' },
            { text: '文本对比', link: '/杂项/文本对比' },
            { text: 'WSL2使用主机代理', link: '/杂项/wsl2使用主机代理' },
            { text: 'Ubuntu配置', link: '/杂项/ubuntu-配置' },
            { text: 'Ubuntu安装LLVM', link: '/杂项/ubuntu安装llvm' },
            { text: 'Emscripten SDK配置', link: '/杂项/emscripten-sdk配置' },
            { text: 'Win ntop使用', link: '/杂项/win-ntop-使用' },
            { text: '实用工具汇总', link: '/杂项/实用工具汇总' }
          ]
        }
      ]
    },

    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/seaflyNN/doc-collect' }
    ],

    // 编辑链接
    editLink: {
      pattern: 'https://github.com/seaflyNN/doc-collect/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },

    // 最后更新时间
    lastUpdated: {
      text: '最后更新',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short'
      }
    },

    // 搜索
    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭'
                }
              }
            }
          }
        }
      }
    },

    // 页脚
    footer: {
      message: '基于 VitePress 构建',
      copyright: 'Copyright © 2024 seaflyNN'
    },

    // 导航栏标题
    siteTitle: '我的文档',

    // 大纲配置
    outline: {
      level: [2, 3],
      label: '页面导航'
    },

    // 深色模式切换
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',

    // 返回顶部
    returnToTopLabel: '回到顶部',

    // 侧边栏菜单标签
    sidebarMenuLabel: '菜单',

    // 移动端菜单标签
    docFooter: {
      prev: '上一页',
      next: '下一页'
    }
  },

  // Markdown 配置
  markdown: {
    // 数学公式支持
    math: true,
    // 代码行号
    lineNumbers: true,
    // 代码块配置
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    },
    // 自定义容器
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息'
    }
  },

  // 站点地图
  sitemap: {
    hostname: 'https://seaflynn.github.io/doc-collect'
  }
}) 