# OpenCV4应用开发入门实践与工程化实践 阅读笔记

## 1. 第一章 Opencv简介与安装
## 2. 第二章 Mat与像素操作
## 3. 第三章 色彩空间
## 4. 第四章 图像直方图

### 4.1 均值与方差
#### 4.1.1 均值
```cpp
// mask 为 1 表示生效的区域, 如果为0则表示忽略
// mask: CV_8UC1
cv::Scalar cv::mean(cv::InputArray src, cv::InputArray mask = noArray);
```

#### 4.1.2 同时计算均值与方差
同上
```cpp
void cv::meanStdDev(cv::InputArray src, cv::OutputArray mean, cv::OutputArray stddev, cv::InputArray mask = noArray);
```

### 4.2 直方图
直方图是图像像素数据分布的统计学特征.
```cpp
void cv::calcHist(const cv::Mat *images, int nimages, const int *channels, cv::InputArray mask, cv::OutputArray hist,
                    int dims, const int *histSize, const float **ranges, bool uniform = true, bool accumulate = false);
// images: 输入图像, 一张或者多张, 要求通道与类型一致
// nimages: 图像的数量
// channels: 不同图像的通道索引, 编号从0开始
// mask: 可选参数
// hist: 输出的直方图
// dims: 必须是正整数, 值不能大于 CV_MAX_DIMS
// histSize: 直方图大小, 可以理解为X轴上的直方图的取值范围
// ranges: 表示通道的取值范围, rgb: [0, 256], hsv的H取值范围是: [0, 180]
// uniform: 表示一致性, 对边界数据的处理方式, false 表示不处理
// accumulate: 表示对图像计算累积直方图
```
常见使用例子:

```cpp
int bins = 32;
int histSize[] = {bins};
float rgb_ranges[] = {0, 256};
const float *ranges[] = {rbg_ranges};
int channels[] = {0};
// 加载灰度图计算直方图
Mat hist;
cv::calcHist(&image, 1, channels, Mat(), hist, 1, histSize, ranges, true, false);
```
### 4.3 直方图均衡化
基于 **累积分布函数** 实现, 将灰度的值重新映射以提高对比度

#### 4.3.1 效果与应用场景
##### 效果：
低对比度图像的细节（如暗部或亮部的纹理）变得更清晰；
直方图从 "集中分布" 变为 "均匀分布"，灰度动态范围扩展。
注意：对已具有良好对比度的图像，均衡化可能导致过度增强或噪声放大。
##### 应用场景：
医学影像（如 X 光片）增强病灶对比度；
卫星遥感图像提升地物细节；
扫描文档优化文字清晰度；
数码照片调整曝光不足或过曝问题。
##### 局限性与改进
###### 局限性：
可能过度增强噪声（尤其在低像素区域）；
对直方图有明显峰值的图像，均衡化后可能丢失部分细节；
全局均衡化对局部对比度增强效果有限。
###### 改进方法：
自适应直方图均衡化（CLAHE）：将图像划分为小块，对每个小块分别进行均衡化，避免全局过度增强；
直方图规定化（匹配）：将直方图调整为指定形状（如高斯分布），而非强制均匀化。

#### 4.3.2 实现

##### 4.3.2.1 函数定义
```cpp
// 全局直方图均衡化
void cv::equalizeHist(cv::InputArray src, cv::OutputArray dst);

// 对比度受限的自适应直方图均衡化
auto clahe = cv::createCLAHE()(2.0, cv::Size(8, 8));
Mat dst;
clahe->apply(image, dst);
cv::imshow("clahe-grey", dst);
```

#### 4.3.3 彩色直方图均衡化
使用 `cv::split` 转成 **HSV** 色彩空间, 然后均衡化在合并即可

```cpp
Mat hsv, dst;
std::vector<Mat> mv;
cv::cvtColor(image, hsv, COLOR_BGR2HSV);
cv::split(hsv, mv);
clahe->apply(mv[2], mv[2]);
cv::merge(mv, dst);
cv::cvtColor(dst, dst, COLOR_HSV2BGR);
imshow("equalizeHist-Color", dst);
```
### 4.4 直方图比较(相似性)
定义如下, 其中`method`支持7种直方图相似性比较方法
```cpp
double cv::compareHist(cv::InputArray H1, cv::InputArray H2, int method);
```

+ 相关性相似比较(`HISTCMP_CORREL`)
  + 图像检索：用于在图像数据库中查找相似图像
  + 模板匹配：在目标检测中比较模板与候选区域的相似度
  + 视频跟踪：跟踪视频序列中目标对象的运动
+ 卡方相似比较(`HISTCMP_CHISQR`)
  + 纹理分析：比较不同纹理图案的相似度
  + 人脸识别：比较人脸特征直方图的差异
  + 目标分类：在物体分类任务中比较特征分布
+ 交叉相似比较(`HISTCMP_INTERSECT`)
  + 颜色匹配：比较两个图像的颜色分布重叠程度
  + 场景分类：判断场景类型的相似性
  + 图像分割：评估分割区域的相似度
+ 巴氏距离相似比较(`HISTCMP_BHATTACHARYYA`)
  + 目标跟踪：评估目标区域与候选区域的相似度
  + 图像分割：评估不同区域间的差异性
  + 背景建模：比较前景与背景模型的差异
+ 海林格距离相似比较(`HISTCMP_HELLINGER`)
  + 图像检索：在大规模图像库中快速检索相似图像
  + 目标检测：评估检测结果的可靠性
  + 图像匹配：比较两幅图像的整体相似度
+ 可变卡方相似比较(`HISTCMP_CHISQR_ALT`)
  + 医学图像分析：比较病变区域的特征分布
  + 质量控制：检测产品缺陷
  + 文档图像比较：评估文档图像的相似度
+ 基于KL散度相似比较(`HISTCMP_KL_DIV`)
  + 图像分类：评估图像类别的概率分布差异
  + 异常检测：识别异常的图像模式
  + 图像压缩：评估压缩前后的信息损失

### 4.5 直方图反向投影

直方图反向投影是一种用于在图像中定位特定目标的方法。它通过计算每个像素点属于目标模型的概率来创建概率图，其中概率值越高的区域越可能包含目标对象。

#### 4.5.1 主要应用
+ 目标定位：在大图像中查找特定目标（如特定颜色的物体）
+ 目标跟踪：在视频序列中跟踪指定目标
+ 肤色检测：基于肤色直方图模型检测人脸区域
+ 物体分割：辅助图像分割，突出显示特定特征的区域

#### 4.5.2 工作原理
1. 首先建立目标的特征直方图（通常是颜色直方图）作为模板
2. 对于输入图像中的每个像素，计算其特征值在模板直方图中的对应概率
3. 生成概率图，其中像素值表示该位置与目标模型的匹配程度
4. 通常配合其他处理方法（如阈值化、形态学操作等）来得到最终结果

#### 4.5.3 实际示例：在大图中查找目标对象
##### 步骤1：准备工作
```cpp
// 1. 加载图片
Mat source = imread("source.jpg");  // 大图
Mat target = imread("target.jpg");  // 要查找的目标图片

// 2. 转换到HSV空间（对光照更鲁棒）
Mat hsv_source, hsv_target;
cvtColor(source, hsv_source, COLOR_BGR2HSV);
cvtColor(target, hsv_target, COLOR_BGR2HSV);
```

##### 步骤2：计算目标直方图
```cpp
// 1. 设置直方图参数
int h_bins = 32; // H通道的直方图柱数
int s_bins = 32; // S通道的直方图柱数
int histSize[] = { h_bins, s_bins };
float h_ranges[] = { 0, 180 };  // H通道值范围
float s_ranges[] = { 0, 256 };  // S通道值范围
const float* ranges[] = { h_ranges, s_ranges };
int channels[] = { 0, 1 };  // 使用H和S通道

// 2. 计算目标的直方图
Mat hist_target;
calcHist(&hsv_target, 1, channels, Mat(), hist_target, 2, histSize, ranges);

// 3. 归一化直方图
normalize(hist_target, hist_target, 0, 255, NORM_MINMAX);
```

##### 步骤3：执行反向投影
```cpp
// 1. 计算反向投影
Mat backproj;
calcBackProject(&hsv_source, 1, channels, hist_target, backproj, ranges);

// 2. 后处理优化结果
// 使用形态学操作去除噪点
Mat kernel = getStructuringElement(MORPH_ELLIPSE, Size(5, 5));
morphologyEx(backproj, backproj, MORPH_ERODE, kernel);
morphologyEx(backproj, backproj, MORPH_DILATE, kernel);

// 3. 阈值化突出高概率区域
threshold(backproj, backproj, 50, 255, THRESH_BINARY);
```

##### 步骤4：结果解释
+ 输出的反向投影图（backproj）中：
  - 像素值越大（越白）表示该位置与目标的相似度越高
  - 像素值越小（越黑）表示该位置与目标的相似度越低
+ 通过阈值化可以得到最可能包含目标的区域
+ 可以进一步结合轮廓检测等方法定位具体位置

##### 注意事项
1. 选择合适的特征空间
   - HSV空间通常比RGB空间更适合，因为它分离了颜色和亮度信息
   - 可以根据实际需求选择合适的通道组合

2. 直方图参数调优
   - bins的数量会影响精度和计算效率
   - 过多的bins可能导致过拟合
   - 过少的bins可能丢失重要特征

3. 常见优化方法
   - 使用高斯滤波减少噪声
   - 形态学操作优化结果
   - 结合轮廓检测获取精确位置
   - 使用距离变换改善定位精度

4. 适用场景
   - 目标具有明显的颜色特征
   - 背景相对简单
   - 光照条件相对稳定

#### 4.5.4 函数定义
```cpp
void cv::calcBackProject(const cv::Mat *images, int nimages, const int *channels, cv::InputArray hist, cv::OutputArray backProject, const float **ranges, double scale = 1, bool uniform = true);
```

+ images：输入图像，一张或者多张，通道与类型一致。
+ nimages：输入图像的数目。
+ channels：不同图像的通道索引，编号从0开始。
+ hist：输入的模板直方图数据。
+ backProject：表示反向投影之后的输出。
+ ranges：表示通道的取值范围，RGB的取值范围为0～256，HSV中H的取值范围为0～180。
+ scale：表示对输出数据的放缩，1.0表示保持原值。
+ uniform：表示一致性，对边界数据的处理方式，取值为false表示不处理。

#### 4.5.5 使用建议
+ 建议在HSV色彩空间中使用，因为HSV对光照变化更鲁棒
+ 通常需要对反向投影结果进行后处理（如高斯模糊、阈值化等）
+ 在目标跟踪场景中，可以结合CAMShift或MeanShift算法
+ 对于复杂背景，可能需要结合其他特征（如纹理）来提高准确性

#### 4.5.6 与深度学习的结合应用
##### 4.5.6.1 预处理与特征增强
+ 作为深度学习分割模型的预处理步骤
  - 提供初始的区域候选
  - 突出显示特定颜色或纹理特征
  - 降低背景干扰

##### 4.5.6.2 辅助分割任务
+ 与语义分割模型配合
  - 提供颜色分布先验知识
  - 辅助细化分割边界
  - 提高小目标的分割准确度

##### 4.5.6.3 后处理优化
+ 改善深度学习模型的输出
  - 优化分割边界
  - 修正误分类区域
  - 提高分割结果的精细度

##### 4.5.6.4 实际应用场景
+ 医学图像分析
  - 结合深度学习模型进行器官分割
  - 病变区域的精确定位
  - 提供额外的颜色特征信息

+ 工业检测
  - 辅助缺陷检测模型定位异常区域
  - 提供颜色基础的质量控制参考
  - 优化产品表面缺陷识别

+ 遥感图像处理
  - 配合深度学习进行地物分类
  - 提供光谱特征的补充信息
  - 改善复杂地形的分割效果

##### 4.5.6.5 优势互补
+ 传统方法优势
  - 计算效率高
  - 不需要训练数据
  - 可解释性强
  - 适合处理颜色特征明显的目标

+ 深度学习优势
  - 更强的特征表达能力
  - 更好的语义理解能力
  - 更强的泛化能力
  - 可以处理复杂场景

+ 结合效果
  - 降低计算资源需求
  - 提高分割精度
  - 增强鲁棒性
  - 改善边缘细节处理

## 5. 第五章 卷积操作
## 6. 第六章 二值图像
## 7. 第七章 二值分析
## 8. 第八章 形态学分析
## 9. 第九章 特征提取
## 10. 第十章 视频分析
## 11. 第十一章 机器学习
## 12. 第十二章 深度神经网络
## 13. YOLO 5自定义对象检测
## 14. 缺陷检测
## 15. OpenVINO 加速
## 16. CUDA 加速
