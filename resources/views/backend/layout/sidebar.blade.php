<div class="sidebar" data-background-color="dark">
    <div class="e">
        <!-- Logo Header -->
        <div class="logo-header" data-background-color="dark">
            <a href="" class="logo">
                <img src="{{ asset('backend/assets/img/logo-sgo-media-optimized.png') }}" alt="navbar brand"
                    class="navbar-brand img-fluid" height="20" />
            </a>
            <div class="nav-toggle">
                <button class="btn btn-toggle toggle-sidebar">
                    <i class="gg-menu-right"></i>
                </button>
                <button class="btn btn-toggle sidenav-toggler">
                    <i class="gg-menu-left"></i>
                </button>
            </div>
            <button class="topbar-toggler more">
                <i class="gg-more-vertical-alt"></i>
            </button>
        </div>
        <!-- End Logo Header -->
    </div>
    <div class="sidebar-wrapper scrollbar scrollbar-inner">
        <div class="sidebar-content">
            <ul class="nav nav-secondary">
                <li class="nav-item active">
                    <a href="{{ route('admin.index') }}">
                        <i class="fas fa-tachometer-alt"></i>
                        <p>Dashboard</p>
                    </a>
                </li>


                <li class="nav-item">
                    <a data-bs-toggle="collapse" href="#sideb-config">
                        <i class="fas fa-cogs"></i>
                        <p>Cấu hình</p>
                        <span class="caret"></span>
                    </a>
                    <div class="collapse" id="sideb-config">
                        <ul class="nav nav-collapse">
                            <li>
                                <a href="{{ route('admin.contact.show') }}">
                                    <span class="sub-item">Cấu hình chung</span>
                                </a>
                            </li>
                            <li>
                                <a href="{{ route('admin.pageConfig.index') }}">
                                    <span class="sub-item">Cấu hình page</span>
                                </a>
                            </li>
                            <li>
                                <a href="{{ route('admin.supportPolicy.index') }}">
                                    <span class="sub-item">Chính sách hỗ trợ</span>
                                </a>
                            </li>


                        </ul>
                    </div>

                </li>

                <li class="nav-item">
                    <a data-bs-toggle="collapse" href="#sidebarzns">
                        <i class="fas fa-box"></i>
                        <p>Quản lý sản phẩm</p>
                        <span class="caret"></span>
                    </a>
                    <div class="collapse" id="sidebarzns">
                        <ul class="nav nav-collapse">
                            <li>
                                <a href="{{ route('admin.product.index') }}">
                                    <span class="sub-item">Danh sách sản phẩm</span>
                                </a>
                            </li>
                            <li>
                                <a href="{{ route('admin.category.index') }}?type=products">
                                    <span class="sub-item">Danh mục sản phẩm</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </li>

                <li class="nav-item">
                    <a data-bs-toggle="collapse" href="#sidebar-ports">
                        <i class="fas fa-pencil-alt"></i>
                        <p>Quản lý bài viết</p>
                        <span class="caret"></span>
                    </a>
                    <div class="collapse" id="sidebar-ports">
                        <ul class="nav nav-collapse">
                            <li>
                                <a href="{{ route('admin.news.index') }}">
                                    <span class="sub-item">Danh sách bài viết</span>
                                </a>
                            </li>
                            <li>
                                <a href="{{ route('admin.category.index') }}?type=posts">
                                    <span class="sub-item">Danh mục bài viết</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </li>

                <li class="nav-item">
                    <a href="{{ route('admin.company.index') }}">
                        <i class="fas fa-building "></i>
                        <p>Công ty sản xuất</p>
                    </a>
                </li>

                <li class="nav-item">
                    <a href="{{ route('admin.slider.index') }}">
                        <i class="fas fa-image"></i>
                        <p>Quản lý sliders</p>
                    </a>
                </li>


                <li class="nav-item">
                    <a href="{{ route('admin.form.index') }}">
                        <i class="fas fa-question"></i>
                        <p>Yêu cầu liên hệ</p>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</div>
