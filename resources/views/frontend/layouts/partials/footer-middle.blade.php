<div class="container footer-content">
    <div class="row clearfix reset-col-padding">
        <div class="footer-1 col-lg-5 col-md-4">
            <div class="widget widget-text_editor widget-19" data-widget-id="19" data-widget="text_editor">
                <div class="block-wrapper">
                    <div class="">
                        <div class="ck_editor_content widget-content">
                            <h3 style="font-weight: 600">LIÊN HỆ VỚI CHÚNG TÔI</h3>
                            <p>
                                <img src="{{ showImage($setting->logo) }}" alt="{{ $setting->company }}"
                                    data-isrc="{{ showImage($setting->logo) }}" style="height: 80px; width: 204px"
                                     />
                            </p>

                            {{-- <p style="text-align: center">&nbsp;</p> --}}

                            <h3 style="font-weight: 500">
                                <span style="font-size: 16px"><span
                                        style="color: #000000">{{ $setting->company }}</span></span><span
                                    style="font-size: 20px"></span>
                            </h3>


                            <p style="font-size: 14px;"><span style="color: #000000"><i style="margin-right: 5px"
                                        aria-hidden="true" class="fa fa-briefcase">&nbsp;&nbsp;</i><strong>Kinh
                                        doanh:</strong> <span style="color: #cc0000">{{ $setting->phone }}</span></span>
                            </p>

                            <p style="font-size: 14px;"><span style="color: #000000"><i style="margin-right: 5px"
                                        aria-hidden="true" class="fa fa-phone">&nbsp;&nbsp;</i><strong>Hotline:</strong>
                                    <span style="color: #cc0000">{{ $setting->name }}</span> </span>
                            </p>

                            <p style="font-size: 14px; display:flex;">
                                <i style="margin-right: 8px; margin-top:5px" aria-hidden="true"
                                    class="fa fa-map-marker">&nbsp;&nbsp;</i>
                                <span>
                                    <strong>Địa chỉ:</strong>
                                    Số 256/33, Đường Dương Quảng Hàm, Quận Gò Vấp,
                                    Phường 5, TP Hồ Chí Minh
                                </span>
                            </p>

                            <p>
                                <span style="font-size: 14px">
                                    <span style="color: #000000">
                                        <i class="fa fa-envelope" style="margin-right: 8px" aria-hidden="true"></i>
                                        <strong> Email: </strong> {{ $setting->email }}
                                    </span>
                                </span>
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="footer-2 col-lg-3 col-md-4">
            <div class="widget widget-text_editor widget-16" data-widget-id="16" data-widget="text_editor">
                <div class="block-wrapper">
                    <div class="">

                        <h3 style="font-weight: 600">DANH MỤC</h3>

                        <div class="widget-content">
                            <ul style="list-style: none; padding: 0">
                                <li class="nav-item relative default wb-header-menu-item">
                                    <a class="nav-link" style="padding: 0.5rem 0;" href="{{ url('/') }}"
                                        aria-label="TRANG CHỦ">
                                        <i class="fas fa-chevron-right mr-1"></i>
                                        TRANG CHỦ
                                    </a>
                                </li>
                                <li class="nav-item relative default wb-header-menu-item">
                                    <a class="nav-link" style="padding: 0.5rem 0;" href="{{ route('introduce') }}"
                                        aria-label="GIỚI THIỆU ">
                                        <i class="fas fa-chevron-right mr-1"></i>
                                        GIỚI THIỆU
                                    </a>
                                </li>
                                <li class="nav-item relative default wb-header-menu-item">
                                    <a class="nav-link" href="{{ route('product.list') }}" style="padding: 0.5rem 0;"
                                        target='"_blank"' aria-label="Sản phẩm">
                                        <i class="fas fa-chevron-right mr-1"></i>
                                        SẢN PHẨM
                                    </a>
                                </li>
                                <li class="nav-item relative default wb-header-menu-item">
                                    <a class="nav-link" href="{{ route('news.list') }}" style="padding: 0.5rem 0;"
                                        aria-label="TIN TỨC MỚI">
                                        <i class="fas fa-chevron-right mr-1"></i>
                                        TIN TỨC MỚI
                                    </a>
                                </li>
                                <li class="nav-item relative default wb-header-menu-item">
                                    <a class="nav-link" style="padding: 0.5rem 0;" href="{{ route('contact') }}"
                                        aria-label="LIÊN HỆ">
                                        <i class="fas fa-chevron-right mr-1"></i>
                                        LIÊN HỆ
                                    </a>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div class="footer-3 col-lg-4 col-md-4">
            <div class="widget widget-fanpage_fb widget-56" style="margin-left: 60px" data-widget-id="56"
                data-widget="fanpage_fb">
                <div class="widget-fanpage widget-56">
                    <div class="box_heading">
                        <h3 style="font-weight: 600; padding-bottom: 5px">MAP</h3>
                        <div class="svg-wrap">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="125.656px"
                                height="125.655px" viewBox="0 0 125.656 125.655"
                                style="enable-background:new 0 0 125.656 125.655;" xml:space="preserve">
                                <g>
                                    <path
                                        d="M88.947,67.734c0,1.544-1.252,2.802-2.801,2.802H68.989c-1.401,0-2.583-1.028-2.763-2.419l-3.033-21.769l-6.123,56.013    c-0.147,1.319-1.216,2.375-2.561,2.474c-0.079,0.005-0.145,0.013-0.229,0.013c-1.251,0-2.354-0.822-2.685-2.043l-9.126-32.46    l-8.988,17.078c-0.539,1.028-1.667,1.653-2.813,1.479c-1.159-0.139-2.101-0.976-2.388-2.101l-4.375-17.49H2.803    C1.262,69.312,0,68.052,0,66.51c0-1.549,1.262-2.802,2.803-2.802h23.285c1.284,0,2.412,0.875,2.72,2.123l3.124,12.487l8.843-16.789    c0.528-1.023,1.631-1.638,2.764-1.488c1.137,0.121,2.089,0.925,2.412,2.024l7.117,25.319l7.018-64.09    c0.149-1.401,1.321-2.465,2.743-2.487c1.576,0.134,2.617,1.026,2.813,2.426l5.79,41.699h14.719    C87.695,64.933,88.947,66.192,88.947,67.734z M103.771,64.933h-8.862c-1.54,0-2.802,1.26-2.802,2.802    c0,1.544,1.262,2.802,2.802,2.802h8.862c1.537,0,2.802-1.258,2.802-2.802C106.573,66.192,105.308,64.933,103.771,64.933z    M122.854,64.933h-9.431c-1.537,0-2.802,1.26-2.802,2.802c0,1.544,1.265,2.802,2.802,2.802h9.431c1.536,0,2.802-1.258,2.802-2.802    C125.656,66.192,124.39,64.933,122.854,64.933z">
                                    </path>
                                </g>
                            </svg>
                        </div>
                    </div>
                    <div class="widget-content text-center">


                        {!! $setting->map !!}


                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        // Lấy tất cả các iframe trong phần tử có class .widget-content
        var iframes = document.querySelector('.widget-content iframe');
        iframes.setAttribute('title', 'MAP');
    });
</script>
