<div class="main-header">
    <div class="main-header-logo">
        <!-- Logo Header -->
        <div class="logo-header" data-background-color="dark">
            <a href="../index.html" class="logo">
                <img src="{{ asset('backend/assets/img/kaiadmin/logo_light.svg') }}" alt="navbar brand"
                    class="navbar-brand" height="20">
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
    <!-- Navbar Header -->
    <nav class="navbar navbar-header navbar-header-transparent navbar-expand-lg border-bottom">
        <div class="container-fluid">
            <ul class="navbar-nav topbar-nav ms-md-auto align-items-center">
                <li class="nav-item dropdown">
                    <a class="profile-pic dropdown-toggle" href="#" id="dropdownToggle">
                        <div class="avatar-sm">
                            <img src="{{ asset('backend/assets/img/chadengle.jpg') }}" alt="image profile"
                                class="avatar-img rounded-circle">
                        </div>
                        <span class="profile-username">
                            <span class="op-7">Hi, {{ auth()->user()->name }}</span>
                            <span class="fw-bold">{{ auth()->user()->email }}</span>
                        </span>
                    </a>
                    <ul class="dropdown-menu" id="dropdownMenu">
                        <li>
                            <div class="user-box">
                                <div class="avatar-lg">
                                    <img src="{{ asset('backend/assets/img/chadengle.jpg') }}" alt="image profile"
                                        class="avatar-img rounded-circle">
                                </div>
                                <div class="u-text">
                                    <h4>{{ auth()->user()->name }}</h4>
                                    <p class="text-muted">{{ auth()->user()->email }}</p>
                                    <a href="{{ route('admin.logout') }}" class="btn btn-xs btn-sm"
                                        style="background: red; color: #fff">Đăng xuất</a>
                                    <form id="logoutForm" action="{{ route('admin.logout') }}" method="POST"
                                        style="display: none;">
                                        @csrf
                                    </form>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>

            </ul>
        </div>
    </nav>
    <!-- End Navbar -->
</div>

