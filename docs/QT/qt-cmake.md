# qt cmake编译碎碎念

> CMake Warning (dev) at D:/software/Qt/Qt6.9/6.9.0/msvc2022_64/lib/cmake/Qt6Core/Qt6CoreMacros.cmake:3392 (message):
  Qt policy QTP0004 is not set: You need qmldir files for each extra
  directory that contains .qml files for your module.  Check
  https://doc.qt.io/qt-6/qt-cmake-policy-qtp0004.html for policy details.
  Use the qt_policy command to set the policy and suppress this warning.
> Call Stack (most recent call first):
  D:/software/Qt/Qt6.9/6.9.0/msvc2022_64/lib/cmake/Qt6Qml/Qt6QmlMacros.cmake:3503 (__qt_internal_setup_policy)
  D:/software/Qt/Qt6.9/6.9.0/msvc2022_64/lib/cmake/Qt6Qml/Qt6QmlMacros.cmake:916 (qt6_target_qml_sources)
  D:/software/Qt/Qt6.9/6.9.0/msvc2022_64/lib/cmake/Qt6Qml/Qt6QmlMacros.cmake:1252 (qt6_add_qml_module)
  CMakeLists.txt:54 (qt_add_qml_module)
This warning is for project developers.  Use -Wno-dev to suppress it.