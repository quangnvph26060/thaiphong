<div class="header-top " style="background-color: #cccccc">
    <div class="container">
        <div class=" row align-items-center ">
            <div class="col-lg-6">
                <div class="section-infor-topbar relative " style="padding-top: 5px;">
                    {{ $setting->header_top }}
                </div>
            </div>
            <div class=" col-lg-6 ">
                <div class="d-flex align-items-center justify-content-center">
                    <div class="time_header mr-5">
                        <img src="{{ asset('frontend/assets/image/time.jpg') }}"
                            alt="time_header">
                        <span>{{ $setting->working_time }}</span>
                    </div>
                    <div class="social-header d-inline-block relative">
                        <a href="https://www.facebook.com/{{ $setting->fanpage }}" rel="nofollow" aria-label="facebook"
                            class="float-shadow mr-2" target="_blank">
                            <i class="fab fa-facebook-f"></i> Facebook
                        </a>
                        <a href="https://www.youtube.com/channel/{{ $setting->youtube }}" rel="nofollow"
                            aria-label="youtube" class="float-shadow" target="_blank">
                            <i class="fab fa-youtube"></i> Youtube
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    header .mini-cart3 .mini-cart-number {
        background-color: #134f5c !important;
    }

    header .mini-cart3 a {
        color: #134f5c !important;
    }

    header .header-container.fixed-ontop .mb-menu li:hover>a,
    header .header-container.fixed-ontop .mb-menu>li.active>a,
    header .header-finemarket.fixed-ontop .mega-container:hover .mega-menu-title .h3 {
        color: #ffffff !important;
    }

    @media (min-width: 992px) {

        header .header-container.fixed-ontop .main-nav ul>li>a,
        header .header-container.fixed-ontop .main-nav .dropdown-menu .title-mega>a,
        header .header-finemarket.fixed-ontop .mega-container .mega-menu-title .h3 {
            color: #134f5c !important;
        }
    }
</style>

<div class="d-lg-none header-mobile">
    <div class="header-left header-container no-pd-menu-header">
        <div class="wb-nav-header width-menu-mobile">
            <div class="container">
                <div class="row clearfix center-vertical relative align-items-center " id="header-mobile">

                    <div class="col-3">
                        <nav class="main-nav navbar-expand-lg pull-left">
                            <div class="btn-toggle-mobile-menu center-vertical">
                                <span class="nav-icon toggle-mobile-menu">
                                    <span></span>
                                </span>
                                <span class="nav-icon toggle-mobile-menu title-menu">
                                </span>
                            </div>
                            <div class="navbar-menu">
                                <div class="section-header-menu">
                                    <ul class="navbar-nav ml-auto menu-nav mb-menu">
                                        <li class="nav-item mega_menu relative wb-header-menu-item">
                                            <a class="nav-link" href="{{ url('/') }}" aria-label="TRANG CHỦ">
                                                TRANG CHỦ
                                            </a>
                                        </li>

                                        <li class="nav-item mega_menu relative wb-header-menu-item">
                                            <a class="nav-link" href="{{ route('introduce') }}"
                                                aria-label="GIỚI THIỆU ">
                                                GIỚI THIỆU
                                            </a>
                                        </li>

                                        <li class="nav-item mega_menu relative wb-header-menu-item">
                                            <div style="display: flex; color: #fff">
                                                <a class="nav-link" style="color: #fff"
                                                    href="{{ route('product.list') }}"
                                                    aria-label="{{ $setting->company }}">
                                                    SẢN PHẨM

                                                </a>
                                                <span class="toggle-submenu" onclick="toggleSubmenu(this)">+</span>
                                            </div>
                                            <!-- Nút toggle để mở danh mục -->
                                            <ul class="dropdown-menu sub-menu">
                                                @foreach ($categoryProduct as $item)
                                                    <li><a
                                                            href="{{ route('product.detail', $item->slug) }}">{{ $item->name }}</a>
                                                    </li>
                                                @endforeach
                                            </ul>
                                        </li>


                                        <li class="nav-item mega_menu relative wb-header-menu-item">
                                            <a class="nav-link" href="{{ route('news.list') }}"
                                                aria-label="TIN TỨC MỚI">
                                                TIN TỨC MỚI
                                            </a>
                                        </li>

                                        <li class="nav-item mega_menu relative wb-header-menu-item">
                                            <a class="nav-link" href="{{ route('contact') }}" aria-label="LIÊN HỆ">
                                                LIÊN HỆ
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                <div class="textAlign-right">
                                    <div class="social-header d-inline-block relative">
                                        <a href="https://www.facebook.com/{{ $setting->fanpage }}" rel="nofollow"
                                            aria-label="facebook" class="float-shadow" target="_blank">
                                            <i class="fab fa-facebook-f"></i>
                                        </a>
                                        <a href="https://www.youtube.com/channel/{{ $setting->youtube }}"
                                            rel="nofollow" aria-label="youtube" class="float-shadow" target="_blank">
                                            <i class="fab fa-youtube"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>

                    <div class=" col-5 header-logo">
                        <a href="{{ url('/') }}" aria-label="Máy Siêu Âm SonoScape" class="logo d-inline-b">
                            <img src="{{ showImage($setting->logo) }}" alt="{{ $setting->company }}" width="100%"
                                height="100%" />
                        </a>
                    </div>

                    <div class="col-4 contact-header">
                        <!-- Phần liên hệ, sẽ hiển thị trên màn hình desktop -->
                        <div class="phone_header d-flex align-items-center justify-content-end d-none d-md-flex"
                            style="font-size: 1.2rem">
                            <div class="phone_image mr-2">
                                <img width="20px" height="auto"
                                    src="{{ asset('frontend/assets/image/phone_header.jpg') }}"
                                    alt="Giỏ hàng">
                            </div>
                            <div class="phone_content" style="line-height: 20px">
                                <span class="d-block" style="font-size: 13px">Liên hệ ngay</span>
                                <a class="fone fw-bold text-danger" style="font-size: 16px"
                                    href="tel:{{ $setting->phone }}">{{ $setting->phone }}</a>
                            </div>
                        </div>

                        <!-- Phần icon điện thoại, sẽ hiển thị trên màn hình mobile -->
                        <div class="icon-phone-mobile d-md-none" style="text-align: right">
                            <a target="_blank" href="tel:{{ $setting->phone }}" class="btn-contact">
                                <i class="fas fa-phone"></i>
                            </a>
                        </div>
                    </div>
                    <style>
                        @media (max-width: 767px) {
                            .phone_header {
                                display: none !important;
                                /* Ẩn phần phone_header trên màn hình nhỏ */
                            }

                            .icon-phone-mobile {
                                display: block;
                                /* Hiển thị icon điện thoại trên màn hình nhỏ */
                            }

                            .icon-phone-mobile a {
                                border-radius: 5px;
                                padding: 6px 10px !important;
                                background: none;
                                border: 1px solid #d91116;
                                color: rgb(0, 0, 0) !important;
                                font-size: 16px;
                                font-weight: bold;
                                text-transform: uppercase;
                                cursor: pointer;
                                transition: transform 0.3s ease, box-shadow 0.3s ease;
                                font-size: .8rem;
                            }

                            /* Hiệu ứng nổi bật khi hover vào nút */
                            .icon-phone-mobile button:hover {
                                background: #EB0218;
                                color: #fff;
                                transform: translateY(-5px);
                                /* Nút sẽ nổi lên khi hover */
                                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                                /* Thêm bóng cho nút khi hover */
                            }

                            /* Hiệu ứng khi nhấn nút */
                            .icon-phone-mobile button:active {
                                transform: translateY(1px);
                                /* Nút sẽ bị đẩy xuống khi nhấn */
                                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                                /* Giảm bóng khi nhấn */
                            }
                        }

                        @media (min-width: 768px) {
                            .phone_header {
                                display: flex;
                                /* Hiển thị phần phone_header trên màn hình lớn */
                            }

                            .icon-phone-mobile {
                                display: none;
                                /* Ẩn icon điện thoại trên màn hình lớn */
                            }
                        }
                    </style>


                    <div class="col-12 mt-3">

                        <form class="w-100 relative" action="{{ route('product.list') }}" method="GET">
                            {{-- <input placeholder="Nhập từ khóa" value="" data-default-value="Nhập từ khóa"
                                        data-value="Nhập từ khóa" type="text" name="keyword" class="search-box"
                                        autocomplete="off" />
                                    <button type="submit">
                                        <i class="fas fa-search"></i>
                                    </button> --}}
                            <input type="text" class="form-control" value="{{ request()->get('keyword') }}"
                                name="keyword" placeholder="Nhập từ khóa">
                            <button type="submit"
                                style="position: absolute; top: 0; right: 0; height: 100%; width: 50px; border-radius: 0 5px 5px 0; color: #fff; background: #EB0218; border: 0">
                                <i class="fas fa-search"></i>
                            </button>
                        </form>

                    </div>


                </div>
            </div>
        </div>
    </div>
</div>

<div class="d-none d-lg-block header-desktop">
    <div class="header-left header-container no-pd-menu-header">
        <div class="wb-main-header">
            <div class="container">
                <div class="row clearfix align-items-center">
                    <div class="col-3 header-logo">
                        <a href="{{ url('/') }}" aria-label="Máy Siêu Âm SonoScape" class="logo d-inline-b">
                            <img src="{{ showImage($setting->logo) }}" alt="Máy siêu âm SonoScape Việt Nam"
                                width="100%" height="100%" />
                        </a>
                    </div>
                    <div class="col-7 form-search">
                        <form class="search-form w-100" action="{{ route('product.list') }}" method="GET">

                            <div class="input-group ">
                                <input type="search" class="form-control" style="height: 3rem" name="keyword"
                                    placeholder="Nhập từ khóa" value="{{ request()->get('keyword') }}">
                                <button type="submit" style="background: #EB0218;">
                                    <i class="fas fa-search"></i>
                                </button>
                            </div>
                        </form>
                    </div>
                    <div class="col-2 contact-header">
                        <div class="phone_header d-flex align-items-center justify-content-end"
                            style="font-size: 1.2rem">
                            <div class="phone_image mr-3">
                                <img src="//bizweb.dktcdn.net/100/411/753/themes/894845/assets/phone_header.png?1676273080247"
                                    alt="Giỏ hàng">
                            </div>
                            <div class="phone_content" style="line-height: 20px">
                                <span class="d-block" style="font-size: 15px">Liên hệ ngay</span>
                                <a class="fone fw-bold text-danger" style="font-size: 18px"
                                    href="tel:{{ $setting->phone }}">{{ $setting->phone }}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="wb-nav-header width-menu-mobile">
            <div class="container">
                <div class="row clearfix">
                    <div
                        class="col-lg-12 col-md-12 col-sm-12 col-12 menu-cart center-vertical-nojustify height-menu-fixed">
                        <nav class="main-nav navbar-expand-lg pull-left">
                            <div class="btn-toggle-mobile-menu center-vertical">
                                <span class="nav-icon toggle-mobile-menu">
                                    <span></span>
                                </span>
                                <span class="nav-icon toggle-mobile-menu title-menu">
                                    <span> MENU </span>
                                </span>
                            </div>

                            <div class="navbar-menu">
                                <div class="section-header-menu">
                                    <ul class="navbar-nav ml-auto menu-nav mb-menu">
                                        <li class="nav-item mega_menu relative wb-header-menu-item  @if (Route::currentRouteName() == 'home') active @endif"
                                            style="margin: 0 20px 0 0 !important">
                                            <a class="nav-link" href="{{ url('/') }}" aria-label="TRANG CHỦ">
                                                TRANG CHỦ
                                            </a>
                                        </li>

                                        <li
                                            class="nav-item mega_menu relative wb-header-menu-item @if (Route::currentRouteName() == 'introduce') active @endif">
                                            <a class="nav-link" href="{{ route('introduce') }}"
                                                aria-label="GIỚI THIỆU">
                                                GIỚI THIỆU
                                            </a>
                                        </li>

                                        <li
                                            class="nav-item mega_menu relative wb-header-menu-item @if (Route::currentRouteName() == 'product.list') active @endif">
                                            <a class="nav-link" href="{{ route('product.list') }}"
                                                aria-label="SẢN PHẨM">
                                                SẢN PHẨM
                                            </a>
                                            <!-- Danh mục hiển thị khi hover -->
                                            <ul class="dropdown-menu sub-menu">
                                                @foreach ($categoryProduct as $item)
                                                    <li><a
                                                            href="{{ route('product.detail', $item->slug) }}">{{ $item->name }}</a>
                                                    </li>
                                                @endforeach
                                            </ul>
                                        </li>



                                        <li
                                            class="nav-item mega_menu relative wb-header-menu-item  @if (Route::currentRouteName() == 'news.list') active @endif">
                                            <a class="nav-link" href="{{ route('news.list') }}"
                                                aria-label="TIN TỨC MỚI">
                                                TIN TỨC MỚI
                                            </a>
                                        </li>

                                        <li
                                            class="nav-item mega_menu relative wb-header-menu-item  @if (Route::currentRouteName() == 'contact') active @endif">
                                            <a class="nav-link" href="{{ route('contact') }}" aria-label="LIÊN HỆ">
                                                LIÊN HỆ
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
