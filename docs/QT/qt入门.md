<!-- 
created_at: 2025-05-19
updated_at: 2025-05-19
author: SeaflyNN
github: https://github.com/seaflyNN/doc-collect
-->

# Qt入门

本篇文章基于 Qt6.9

## 目录
1. [CMake构建和打包qml工程](#1-cmake构建和打包qml工程)
2. [Qt基础概念](#2-qt基础概念)
   - [信号与槽](#信号与槽)
   - [事件系统](#事件系统)
   - [元对象系统](#元对象系统)
3. [Qt Widgets开发](#3-qt-widgets开发)
   - [常用控件](#常用控件)
   - [布局管理](#布局管理)
   - [样式定制](#样式定制)
4. [Qt Quick/QML开发](#4-qt-quickqml开发)
   - [QML基础语法](#qml基础语法)
   - [常用组件](#常用组件)
   - [动画效果](#动画效果)
5. [数据库操作](#5-数据库操作)
   - [SQLite](#sqlite)
   - [MySQL](#mysql)
6. [网络编程](#6-网络编程)
   - [HTTP请求](#http请求)
   - [WebSocket](#websocket)
7. [多线程编程](#7-多线程编程)
   - [QThread](#qthread)
   - [线程同步](#线程同步)
8. [项目实战](#8-项目实战)
   - [桌面应用开发](#桌面应用开发)
   - [移动应用开发](#移动应用开发)

## 1. CMake构建和打包qml工程
