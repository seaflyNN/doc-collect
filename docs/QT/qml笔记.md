# QML笔记

## 目录
- [QML笔记](#qml笔记)
  - [目录](#目录)
  - [1. 无边框](#1-无边框)
  - [2. qml如何省略connection](#2-qml如何省略connection)
  - [3. 无边框下如何调整大小](#3-无边框下如何调整大小)
  - [4. qt资源管理](#4-qt资源管理)
  - [5. 圆角矩形](#5-圆角矩形)
  - [6. 常见的组件和语义](#6-常见的组件和语义)

## 1. 无边框
```
    // 设置为无边框窗口
    flags: Qt.FramelessWindowHint | Qt.Window

    // 针对窗口顶部区域实现拖拽、双击放大、恢复原样操作
        // 窗口拖动区域
        MouseArea {
            id: dragArea
            anchors.top: parent.top
            anchors.left: parent.left
            anchors.right: parent.right
            height: 40  // 固定高度40像素，与HelloScreen的topMargin保持一致
            property point clickPos: "0,0"
            
            onPressed: {
                clickPos = Qt.point(mouse.x, mouse.y)
            }
            
            onPositionChanged: {
                if (pressed) {
                    var delta = Qt.point(mouse.x - clickPos.x, mouse.y - clickPos.y)
                    mainWindow.x += delta.x
                    mainWindow.y += delta.y
                }
            }
            
            // 双击顶部区域切换最大化/还原窗口状态
            onDoubleClicked: {
                if (mainWindow.visibility === Window.Maximized) {
                    mainWindow.showNormal()  // 如果当前是最大化状态，则还原窗口
                } else {
                    mainWindow.showMaximized()  // 如果当前不是最大化状态，则最大化窗口
                }
            }
        }

    // 自己实现 最小化, 最大化, 关闭操作, 这里模仿的mac
            // 自定义窗口控制按钮
        Row {
            anchors.top: parent.top
            anchors.right: parent.right
            anchors.margins: 10
            spacing: 10
            
            Rectangle {
                width: 16
                height: 16
                radius: 8
                color: "#FFB71C"
                
                MouseArea {
                    anchors.fill: parent
                    onClicked: {
                        mainWindow.showMinimized()
                    }
                }
            }
            
            Rectangle {
                width: 16
                height: 16
                radius: 8
                color: "#28CA42"
                
                MouseArea {
                    anchors.fill: parent
                    onClicked: {
                        if (mainWindow.visibility === Window.Maximized) {
                            mainWindow.showNormal()
                        } else {
                            mainWindow.showMaximized()
                        }
                    }
                }
            }
            
            Rectangle {
                width: 16
                height: 16
                radius: 8
                color: "#FF5F57"
                
                MouseArea {
                    anchors.fill: parent
                    onClicked: {
                        Qt.quit()
                    }
                }
            }
        }
```

## 2. qml如何省略connection
> 直接定义 onXxxx这样的函数即可, 前提是Xxxx能 emit 出信号, 类似这样

```
            onPressed: {
                clickPos = Qt.point(mouse.x, mouse.y)
            }
```

## 3. 无边框下如何调整大小
qt自带4个角边缘调整大小的功能, 其实就是使用anchor定义为上下左右边缘, 还有左上、右上、右下、左下, 共8个位置
1. 添加了resizeMargin属性，控制调整大小区域的宽度/高度（默认为5像素）
2. 在窗口的四个边缘和四个角添加了MouseArea，用于捕获鼠标事件
3. 使用cursorShape属性在鼠标悬停时显示相应的调整大小光标
4. 使用startSystemResize()方法实现窗口大小调整，这是Qt内置的方法，支持系统级的大小调整行为

```


// 调整大小的区域 - 左边缘
    MouseArea {
        id: leftResize
        width: resizeMargin
        anchors.left: parent.left
        anchors.top: parent.top
        anchors.bottom: parent.bottom
        anchors.topMargin: resizeMargin
        anchors.bottomMargin: resizeMargin
        hoverEnabled: true
        cursorShape: Qt.SizeHorCursor
        
        onPressed: {
            mainWindow.startSystemResize(Qt.LeftEdge)
        }
    }
    
    // 调整大小的区域 - 右边缘
    MouseArea {
        id: rightResize
        width: resizeMargin
        anchors.right: parent.right
        anchors.top: parent.top
        anchors.bottom: parent.bottom
        anchors.topMargin: resizeMargin
        anchors.bottomMargin: resizeMargin
        hoverEnabled: true
        cursorShape: Qt.SizeHorCursor
        
        onPressed: {
            mainWindow.startSystemResize(Qt.RightEdge)
        }
    }
    
    // 调整大小的区域 - 上边缘
    MouseArea {
        id: topResize
        height: resizeMargin
        anchors.top: parent.top
        anchors.left: parent.left
        anchors.right: parent.right
        anchors.leftMargin: resizeMargin
        anchors.rightMargin: resizeMargin
        hoverEnabled: true
        cursorShape: Qt.SizeVerCursor
        
        onPressed: {
            mainWindow.startSystemResize(Qt.TopEdge)
        }
    }
    
    // 调整大小的区域 - 下边缘
    MouseArea {
        id: bottomResize
        height: resizeMargin
        anchors.bottom: parent.bottom
        anchors.left: parent.left
        anchors.right: parent.right
        anchors.leftMargin: resizeMargin
        anchors.rightMargin: resizeMargin
        hoverEnabled: true
        cursorShape: Qt.SizeVerCursor
        
        onPressed: {
            mainWindow.startSystemResize(Qt.BottomEdge)
        }
    }
    
    // 调整大小的区域 - 左上角
    MouseArea {
        id: topLeftResize
        width: resizeMargin
        height: resizeMargin
        anchors.left: parent.left
        anchors.top: parent.top
        hoverEnabled: true
        cursorShape: Qt.SizeFDiagCursor
        
        onPressed: {
            mainWindow.startSystemResize(Qt.TopEdge | Qt.LeftEdge)
        }
    }
    
    // 调整大小的区域 - 右上角
    MouseArea {
        id: topRightResize
        width: resizeMargin
        height: resizeMargin
        anchors.right: parent.right
        anchors.top: parent.top
        hoverEnabled: true
        cursorShape: Qt.SizeBDiagCursor
        
        onPressed: {
            mainWindow.startSystemResize(Qt.TopEdge | Qt.RightEdge)
        }
    }
    
    // 调整大小的区域 - 左下角
    MouseArea {
        id: bottomLeftResize
        width: resizeMargin
        height: resizeMargin
        anchors.left: parent.left
        anchors.bottom: parent.bottom
        hoverEnabled: true
        cursorShape: Qt.SizeBDiagCursor
        
        onPressed: {
            mainWindow.startSystemResize(Qt.BottomEdge | Qt.LeftEdge)
        }
    }
    
    // 调整大小的区域 - 右下角
    MouseArea {
        id: bottomRightResize
        width: resizeMargin
        height: resizeMargin
        anchors.right: parent.right
        anchors.bottom: parent.bottom
        hoverEnabled: true
        cursorShape: Qt.SizeFDiagCursor
        
        onPressed: {
            mainWindow.startSystemResize(Qt.BottomEdge | Qt.RightEdge)
        }
    }
```




## 4. qt资源管理
cmake打包qml文件, 并定义一个虚拟路由
```
# qt资源系统定义了虚拟路由 /HelloQml
# 需要在导入路径 engine.addImportPath(":/HelloQml")
qt_add_qml_module(${CMAKE_PROJECT_NAME}
    URI ${CMAKE_PROJECT_NAME}
    VERSION 1.0
    RESOURCE_PREFIX "/HelloQml"
    NO_PLUGIN
    QML_FILES
        qml/Main.qml
        qml/HelloScreen.qml
    IMPORT_PATH "${CMAKE_SOURCE_DIR}"
)
```

- RESOURCE_PREFIX "/HelloQml" - 这一行定义了资源系统中QML文件的虚拟前缀路径
- 编译时，所有的QML文件被打包进可执行文件，通过这个虚拟路径访问
- engine.addImportPath(":/HelloQml") 告诉QML引擎在这个虚拟路径中查找模块


## 5. 圆角矩形
将窗体设置为无边框窗口, 允许透明背景; 然后将矩形的`radius`属性设置为某个值即可, 通常为8.


```
    color: "transparent"

Rectangle {
        id: windowBackground
        anchors.fill: parent
        color: backgroundColor
        radius: windowRadius
        // ...
}

// 添加边框效果
        border.width: 1
        border.color: Qt.rgba(0, 0, 0, 0.1)

```

## 6. 常见的组件和语义

| 组件 | 语义 | 为什么使用? |
| ------- | ------- | ------- |
| -- | -- | -- |

