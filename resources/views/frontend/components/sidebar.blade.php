<aside class="col-lg-4 col-12 widget-sidebar pl-lg-1">
    <div class="widget wrapper widget-menu" data-widget-id="22" data-widget="menu">
        <div class="widget-menu style2" style="" data-id="0">
            <div class="box_heading">
                <div class="heading" style="color: #000000 !important">
                    Danh mục
                </div>
                <div class="line-hg"><span></span></div>
                <div class="svg-wrap">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px" y="0px" width="125.656px" height="125.655px" viewBox="0 0 125.656 125.655"
                        style="enable-background: new 0 0 125.656 125.655" xml:space="preserve">
                        <g>
                            <path
                                d="M88.947,67.734c0,1.544-1.252,2.802-2.801,2.802H68.989c-1.401,0-2.583-1.028-2.763-2.419l-3.033-21.769l-6.123,56.013    c-0.147,1.319-1.216,2.375-2.561,2.474c-0.079,0.005-0.145,0.013-0.229,0.013c-1.251,0-2.354-0.822-2.685-2.043l-9.126-32.46    l-8.988,17.078c-0.539,1.028-1.667,1.653-2.813,1.479c-1.159-0.139-2.101-0.976-2.388-2.101l-4.375-17.49H2.803    C1.262,69.312,0,68.052,0,66.51c0-1.549,1.262-2.802,2.803-2.802h23.285c1.284,0,2.412,0.875,2.72,2.123l3.124,12.487l8.843-16.789    c0.528-1.023,1.631-1.638,2.764-1.488c1.137,0.121,2.089,0.925,2.412,2.024l7.117,25.319l7.018-64.09    c0.149-1.401,1.321-2.465,2.743-2.487c1.576,0.134,2.617,1.026,2.813,2.426l5.79,41.699h14.719    C87.695,64.933,88.947,66.192,88.947,67.734z M103.771,64.933h-8.862c-1.54,0-2.802,1.26-2.802,2.802    c0,1.544,1.262,2.802,2.802,2.802h8.862c1.537,0,2.802-1.258,2.802-2.802C106.573,66.192,105.308,64.933,103.771,64.933z    M122.854,64.933h-9.431c-1.537,0-2.802,1.26-2.802,2.802c0,1.544,1.265,2.802,2.802,2.802h9.431c1.536,0,2.802-1.258,2.802-2.802    C125.656,66.192,124.39,64.933,122.854,64.933z">
                            </path>
                        </g>
                    </svg>
                </div>
            </div>
            <div class="widget-content">
                <ul class="categories-list navbar-nav mb-menu">
                    @foreach ($categoryProduct as $item)
                        <li class="nav-item relative default wb-header-menu-item">
                            <a class="nav-link" href="{{ url('/') }}" aria-label="TRANG CHỦ">
                                {{ $item->name }}
                            </a>
                        </li>
                    @endforeach
                </ul>
            </div>
        </div>
    </div>
    <div class="widget wrapper widget-post_category" data-widget-id="37" data-widget="post_category">
        <div class="widget_post_body style1 content-color" style="color: #ff0000 !important">
            <div class="content-color">
                <div class="box_heading" style="text-align: left">
                    <div class="heading" style="color: #000000 !important">
                        Tin nổi bật
                    </div>
                    <div class="line-hg"><span></span></div>
                    <div class="svg-wrap">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="125.656px"
                            height="125.655px" viewBox="0 0 125.656 125.655"
                            style="enable-background: new 0 0 125.656 125.655" xml:space="preserve">
                            <g>
                                <path
                                    d="M88.947,67.734c0,1.544-1.252,2.802-2.801,2.802H68.989c-1.401,0-2.583-1.028-2.763-2.419l-3.033-21.769l-6.123,56.013    c-0.147,1.319-1.216,2.375-2.561,2.474c-0.079,0.005-0.145,0.013-0.229,0.013c-1.251,0-2.354-0.822-2.685-2.043l-9.126-32.46    l-8.988,17.078c-0.539,1.028-1.667,1.653-2.813,1.479c-1.159-0.139-2.101-0.976-2.388-2.101l-4.375-17.49H2.803    C1.262,69.312,0,68.052,0,66.51c0-1.549,1.262-2.802,2.803-2.802h23.285c1.284,0,2.412,0.875,2.72,2.123l3.124,12.487l8.843-16.789    c0.528-1.023,1.631-1.638,2.764-1.488c1.137,0.121,2.089,0.925,2.412,2.024l7.117,25.319l7.018-64.09    c0.149-1.401,1.321-2.465,2.743-2.487c1.576,0.134,2.617,1.026,2.813,2.426l5.79,41.699h14.719    C87.695,64.933,88.947,66.192,88.947,67.734z M103.771,64.933h-8.862c-1.54,0-2.802,1.26-2.802,2.802    c0,1.544,1.262,2.802,2.802,2.802h8.862c1.537,0,2.802-1.258,2.802-2.802C106.573,66.192,105.308,64.933,103.771,64.933z    M122.854,64.933h-9.431c-1.537,0-2.802,1.26-2.802,2.802c0,1.544,1.265,2.802,2.802,2.802h9.431c1.536,0,2.802-1.258,2.802-2.802    C125.656,66.192,124.39,64.933,122.854,64.933z">
                                </path>
                            </g>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="widget-content" data-limit="3">
                <div class="tab-content post-view">
                    <div id="tab_style_37_0" class="tab-pane active">
                        <div class="row">
                            @foreach ($popularNews as $item)
                                <div class="col-lg-12 col-md-12 col-sm-12 mb-4">
                                    <div class="d-flex align-items-start popular-news-item">
                                        <!-- Hình ảnh -->
                                        <div class="news-image me-3">
                                            <a href="{{ route('news.detail', $item->slug) }}" class="d-block">
                                                <img src="{{ showImage($item->featured_image) }}"
                                                    alt="{{ $item->subject }}" class="img-fluid" />
                                            </a>
                                        </div>
                                        <!-- Nội dung -->
                                        <div class="news-content">
                                            <h5 class="news-title">
                                                <a
                                                    href="{{ route('news.detail', $item->slug) }}">{{ \Str::words($item->subject, 20, '...') }}</a>
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                            @endforeach
                        </div>

                        <center class="read-more w-100">
                            <a href="{{ route('news.list') }}">Xem thêm
                                &rsaquo;&rsaquo;</a>
                        </center>
                    </div>
                </div>
            </div>
        </div>
    </div>
</aside>
<style>
    .popular-news-item {
        border-bottom: 1px solid #ddd;
        /* Đường kẻ dưới từng bài */
        padding-bottom: 15px;
        display: flex;
    }

    .news-image img {
        width: 150px;
        /* Kích thước hình ảnh */
        height: auto;
        border-radius: 5px;
        /* Bo góc */
    }

    .news-content {
        flex: 1;
    }

    .news-title {
        text-align: left;
        font-size: 16px;
        margin: 0 15px 8px;
        color: #000000;
    }

    .news-title a {
        color: #333;
        text-decoration: none;
    }

    .news-title:hover {
        color: #c6111d;
    }

    .news-title a:hover {
        color: #007bff;
    }

    .news-description {
        font-size: 14px;
        color: #555;
        margin: 0 0 8px;
    }

    .news-meta {
        font-size: 12px;
        color: #777;
    }
</style>
