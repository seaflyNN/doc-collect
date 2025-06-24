# ffmpeg+opencv的简易模板
简易封装和使用

```cpp
bool is_valid_image(const uint8_t *input, uint64_t len) {
    if (!g_log_callback_set) {
        av_log_set_callback(log_callback);
        g_log_callback_set = true;
    }
    g_ffmpeg_warnings.clear(); // 清空之前的警告信息
    // raii
    static auto free_avformat = [](AVFormatContext **p) {
        if (*p) {
            if ((*p)->pb) {
                av_free((*p)->pb->buffer);
                avio_context_free(&(*p)->pb);
            }
            avformat_free_context(*p);
        }
    };
    static auto free_avcodec = [](AVCodecContext *p) {
        p && (avcodec_free_context(&p), true);
    };
    static auto free_avframe = [](AVFrame *p) {
        p && (av_frame_free(&p), true);
    };
    static auto free_avpacket = [](AVPacket *p) {
        p && (av_packet_free(&p), true);
    };
    static auto free_avio_ctx = [](AVIOContext *p) {
        p && (avio_context_free(&p), true);
    };
    static auto close_stream = [](AVFormatContext *p) {
        p && (avformat_close_input(&p), true);
    };

    auto fmt_ctx = avformat_alloc_context();
    scope_guard guard_fmt_ctx(free_avformat, &fmt_ctx);

    if (fmt_ctx == nullptr)
        return false;
    constexpr uint64_t avio_buf_len = 1024 * 1024ull;
    struct mem_input {
        const uint8_t *start{nullptr};
        const uint8_t *end{nullptr};
        const uint8_t *cur{nullptr};
    };
    static auto read = [](void *opaque, uint8_t *buf, int buf_size) -> int {
        auto &ctx = *reinterpret_cast<mem_input *>(opaque);
        auto residual = ctx.end - ctx.cur;
        auto sz = std::min<uint64_t>(residual, buf_size);
        if (sz > 0) {
            //   memcpy(buf, ctx.cur, sz);
            std::copy(ctx.cur, ctx.cur + sz, buf);
            ctx.cur += sz;
        }
        return sz == 0 ? AVERROR_EOF : sz;
    };
    static auto seek = [](void *opaque, int64_t offset, int whence) -> int64_t {
        auto &ctx = *reinterpret_cast<mem_input *>(opaque);
        auto len = ctx.end - ctx.start;
        int64_t ret = AVERROR_EOF;
        switch (whence) {
        case AVSEEK_SIZE:
            ret = static_cast<int64_t>(ctx.end - ctx.start);
            break;
        case SEEK_SET:
            if (offset >= 0) {
                if (offset >= len) {
                    ret = AVERROR_EOF;
                } else {
                    ctx.cur = ctx.start + offset;
                    ret = 0;
                }
            }
            break;
        }
        return ret;
    };
    mem_input opaque{input, input + len, input};
    fmt_ctx->pb =
        avio_alloc_context(static_cast<uint8_t *>(av_malloc(avio_buf_len)),
                           avio_buf_len, 0, &opaque, read, nullptr, seek);
    //   scope_guard guard_avio_ctx(free_avio_ctx, fmt_ctx->pb);

    // only video
    if (avformat_open_input(&fmt_ctx, nullptr, nullptr, nullptr) < 0 ||
        avformat_find_stream_info(fmt_ctx, nullptr) < 0)
        return false;
    //
    int vid_idx = -1;
    for (int i = 0; i < fmt_ctx->nb_streams; ++i) {
        if (fmt_ctx->streams[i]->codecpar->codec_type == AVMEDIA_TYPE_VIDEO) {
            vid_idx = i;
            break;
        }
    }
    if (vid_idx < 0) {
        return false;
    }
    AVCodecContext *codec_ctx = nullptr;
    const auto codecpar = fmt_ctx->streams[vid_idx]->codecpar;
    auto codec = avcodec_find_decoder(codecpar->codec_id);
    if (codec != nullptr) {
        codec_ctx = avcodec_alloc_context3(codec);
        if (codec_ctx == nullptr)
            return false;
        if (avcodec_parameters_to_context(codec_ctx, codecpar) < 0)
            return false;
        if (avcodec_open2(codec_ctx, codec, nullptr) < 0)
            return false;
    }
    scope_guard guard_codec_ctx(free_avcodec, codec_ctx);
    int ret = 0;
    auto pkt = av_packet_alloc();
    scope_guard guard_pkt(free_avpacket, pkt);
    AVFrame *frame = av_frame_alloc();
    scope_guard guard_frame(free_avframe, frame);

    auto handle_packet = [](AVCodecContext *codec_ctx, AVFrame *frame,
                            auto &&fn) -> void {
        int ret = 0;
        while (ret >= 0) {
            ret = avcodec_receive_frame(codec_ctx, frame);
            if (ret == AVERROR(EAGAIN) || ret == AVERROR_EOF) {
                av_frame_unref(frame);
                break;
            } else if (ret < 0) {
                av_frame_unref(frame);
                return;
            }
            fn(frame, codec_ctx->frame_number);
            av_frame_unref(frame);
        }
    };

    static auto pgm_save = [](unsigned char *buf, int wrap, int xsize,
                              int ysize, const char *filename) {
        FILE *f;
        int i;

        f = fopen(filename, "wb");
        fprintf(f, "P5\n%d %d\n%d\n", xsize, ysize, 255);
        for (i = 0; i < ysize; i++)
            fwrite(buf + i * wrap, 1, xsize, f);
        fclose(f);
    };

    static auto calc_entropy = [](cv::Mat mat) -> double {
        if (mat.channels() > 1) {
            cv::cvtColor(mat, mat, cv::COLOR_BGR2GRAY);
        }
        assert(mat.channels() == 1);
        cv::Mat grey = mat.clone();
        std::vector<cv::Mat> histChannels;
        cv::Mat hist;
        int histSize = 256;
        float range[] = {0, 256};
        const float *histRange = {range};
        cv::calcHist(&grey, 1, 0, cv::Mat(), hist, 1, &histSize, &histRange);
        hist /= (grey.rows * grey.cols);
        double entropy = 0.0;
        for (int i = 0; i < histSize; i++) {
            float p = hist.at<float>(i);
            if (p > 0) {
                entropy -= p * log(p);
            }
        }
        return entropy;
    };

    static auto calc_edge_ratio = [](cv::Mat mat) {
        assert(mat.channels() == 1);
        cv::Mat gray = mat.clone();
        cv::Canny(gray, gray, 50, 150);
        // cv::imwrite(std::string("D:/zzz/canny.png"), gray);
        return static_cast<double>(cv::countNonZero(gray)) /
               static_cast<double>(gray.rows * gray.cols);
    };

    static auto calc_std_dev = [](cv::Mat mat) -> double {
        assert(mat.channels() == 1);
        cv::Scalar mean, stddev;
        cv::meanStdDev(mat, mean, stddev);
        return stddev[0];
    };

    static auto sobel_edge = [](cv::Mat mat) -> cv::Mat {
        cv::Mat sobel_x, sobel_y;
        cv::Sobel(mat, sobel_x, CV_64F, 1, 0, 3);
        cv::Sobel(mat, sobel_y, CV_64F, 0, 1, 3);
        cv::Mat sobel_xy;
        cv::addWeighted(sobel_x, 0.5, sobel_y, 0.5, 0, sobel_xy);
        return sobel_xy;
    };

    static auto laplacian_edge = [](cv::Mat mat) -> cv::Mat {
        cv::Mat laplacian;
        cv::Laplacian(mat, laplacian, CV_64F, 3);
        return laplacian;
    };

    static auto calc_ratio = [](cv::Mat mat) -> double {
        cv::Mat out;
        cv::threshold(mat, out, 128.0, 255.0, cv::THRESH_BINARY);
        return static_cast<double>(cv::countNonZero(out)) /
               static_cast<double>(out.rows * out.cols);
    };

    static auto is_valid_image = [](cv::Mat mat) -> bool {
        auto entropy = calc_entropy(mat);
        auto edge_ratio = calc_edge_ratio(mat);
        auto std_dev = calc_std_dev(mat);
        return 0.5 <= entropy && entropy <= 7.5 && 0.009 <= edge_ratio &&
               edge_ratio <= 0.15 && 30.0 <= std_dev && std_dev <= 100.0;
    };

    bool flag = false;
    auto img_check_cb = [&](AVFrame *frame, int frame_num) {
        //  std::string filename = std::string("D:/zzz/") +
        //  std::to_string(frame_num) + ".pgm"; pgm_save(frame->data[0],
        //  frame->linesize[0], frame->width, frame->height, filename.c_str());
        // // call opencv and decode
        cv::Mat mat(frame->height, frame->width, CV_8UC1, frame->data[0]);
        if (is_valid_image(mat)) {
            flag = true;
            return;
        }
        // auto sobel_xy = sobel_edge(mat);
        // auto laplacian = laplacian_edge(mat);
        // cv::imwrite(std::string("D:/zzz/sobel-") +
        // std::to_string(frame_num) + ".png", sobel_xy);
        // cv::imwrite(std::string("D:/zzz/laplacian-") +
        // std::to_string(frame_num) + ".png", laplacian); auto sobel_ratio
        // = calc_ratio(sobel_xy); auto laplacian_ratio =
        // calc_ratio(laplacian); std::cout << "sobel: " << sobel_ratio <<
        // "\n"; std::cout << "laplacian: " << laplacian_ratio << "\n";
    };

    while ((ret = av_read_frame(fmt_ctx, pkt)) >= 0) {
        if (pkt->stream_index != vid_idx) {
            av_packet_unref(pkt);
            continue;
        }
        int ret = avcodec_send_packet(codec_ctx, pkt);
        av_packet_unref(pkt);
        if (ret < 0) {
            break;
        }
        if (!g_ffmpeg_warnings.empty()) {
            //
        }
        g_ffmpeg_warnings.clear();

        handle_packet(codec_ctx, frame, img_check_cb);
        av_frame_unref(frame);
    }
    ret = avcodec_send_packet(codec_ctx, nullptr);
    handle_packet(codec_ctx, frame, img_check_cb);
    av_frame_unref(frame);
    if (!g_ffmpeg_warnings.empty()) {
    }
    return flag;
}
```