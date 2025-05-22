
# QML常用组件（80/20原则）

## 基础视觉组件
- **Rectangle** - 最常用的矩形元素，可设置颜色、边框和圆角，是构建UI的基础
- **Image** - 显示图片，支持多种格式和缩放模式
- **Text** - 文本显示，支持富文本、字体设置和文本换行

## 布局组件
- **Item** - 最基本的可视元素，无外观但可包含其他元素
- **RowLayout** - 水平排列子元素
- **ColumnLayout** - 垂直排列子元素
- **GridLayout** - 网格布局

## 控件组件
- **Button** - 按钮控件，处理用户点击动作
- **TextField** - 单行文本输入框
- **TextArea** - 多行文本输入区域
- **ComboBox** - 下拉选择框
- **CheckBox** - 复选框
- **RadioButton** - 单选按钮
- **Slider** - 滑块控件，用于数值范围选择
- **Switch** - 开关控件

## 视图组件
- **ListView** - 列表视图，展示可滚动的垂直或水平列表
- **GridView** - 网格视图，以网格形式展示数据
- **ScrollView** - 可滚动容器

## 容器组件
- **TabBar/TabView** - 选项卡组件
- **StackView** - 页面堆栈管理
- **SwipeView** - 可滑动的页面视图
- **Dialog** - 对话框
- **Popup** - 弹出窗口

## 数据组件
- **Model/View** - 数据模型和视图分离的核心架构
- **ListModel** - 列表数据模型
- **Timer** - 定时器组件
- **Connections** - 信号连接器

## 动画效果
- **PropertyAnimation** - 属性动画基类
- **NumberAnimation** - 数值动画
- **ColorAnimation** - 颜色动画

这些组件能满足大约80%的QML应用开发需求，掌握这些组件可以高效构建大多数界面。
