# ffmpeg wasm编译

```sh
# Ubuntu 版本
sudo apt-get install -y build-essential git cmake ninja-build python3-pip curl
# 下载FFmpeg源码
git clone https://git.ffmpeg.org/ffmpeg.git ffmpeg

# 下载x264源码
git clone https://code.videolan.org/videolan/x264.git

# 下载x265源码
git clone https://bitbucket.org/multicoreware/x265_git.git x265

# 安装64位 sdk
# https://github.com/emscripten-core/emsdk/issues/1545
emsdk install sdk-main-64bit

# 编译 x264
cd x264
emconfigure ./configure \
  --prefix=$PWD/../dist \
  --enable-static \
  --disable-cli \
  --disable-asm
make -j$(nproc)
make install
cd ..
```