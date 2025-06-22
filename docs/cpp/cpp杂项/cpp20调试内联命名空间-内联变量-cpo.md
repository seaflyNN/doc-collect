# cpp20调试内联命名空间-内联变量-cpo

## 1. cmake 配置语法
gcc加上`-fno-inline`, `-fno-default-inline`, `-fno-inline-functions`,`-fno-elide-constructors`选项即可

+ todo: llvm和msvc


```cmake
find_package(fmt REQUIRED)

set(CHAPTERS
    chapter_1
    chapter_2
    chapter_3
    chapter_4
    chapter_5
    chapter_6
)

foreach(chapter ${CHAPTERS})
    add_executable(${chapter} ${chapter}.cpp)
    target_link_libraries(${chapter} PRIVATE fmt::fmt)
    # 添加调试编译选项，便于调试 ranges::begin 等内联函数对象
    target_compile_options(${chapter} PRIVATE
        -g
        -O0
        -fno-inline
        -fno-default-inline
        -fno-inline-functions
        -fno-elide-constructors
    )
endforeach()
```

