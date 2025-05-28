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
直方图从 “集中分布” 变为 “均匀分布”，灰度动态范围扩展。
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
### 4.4 直方图比较



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
