<link rel="stylesheet" href="{{ url('frontend/assets/css/main.css') }}" />
{{-- <link rel="preload" href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" as="font" type="font/woff2" crossorigin="anonymous"> --}}
{{-- <link rel="stylesheet" href="{{ url('frontend/assets/fonts/Roboto.css') }}" /> --}}

<link rel="preload" href="{{ url('frontend/assets/css/bootstrap.min.css') }}" as="style"
    onload="this.onload=null;this.rel='stylesheet'" />

<link rel="stylesheet" href="{{ url('frontend/assets/plugins/normalize/normalize.min.css') }}" />

{{-- <link rel="stylesheet" href="{{ url('frontend/assets/plugins/jquery-ui/jquery-ui-custom.min.css') }}" /> --}}

<link rel="stylesheet" href="{{ url('frontend/assets/themes/base/css/plugin.css') }}" media="print"
    onload="this.media='all'" />

{{-- <link rel="stylesheet" href="{{ url('frontend/assets/themes/base/css/common.css') }}" /> --}}

<link rel="stylesheet" href="{{ url('frontend/assets/themes/base3/css/main.css') }}" media="print"
    onload="this.media='all'" />

{{-- <link rel="stylesheet" href="{{ url('frontend/assets/themes/base3/css/widgets.css') }}" /> --}}

<link rel="stylesheet" href="{{ url('frontend/assets/themes/lovepet/css/style.css') }}" />

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css" media="print"
    onload="this.media='all'" />

{{-- <link rel="stylesheet" href="{{ url('frontend/assets/themes/base/css/loading.css') }}" /> --}}

<link rel="stylesheet" href="{{ url('frontend/assets/css/custom.css') }}" />

<link rel="stylesheet" href="{{ url('frontend/assets/themes/base3/css/header_left.css') }}" />

<style>
    img {
        max-width: 100%;
        height: auto;
    }

    /* Mặc định không có vị trí fixed */
    .header-desktop {
        position: relative;
        transition: all 0.3s ease;
    }

    /* Khi có class "sticky", header sẽ có position fixed */
    .header-desktop.sticky {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        /* Đảm bảo header nằm trên các phần tử khác */
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        /* Tạo bóng cho header khi cố định */
    }

    /* Animation khi chuyển đổi */
    .header-desktop.sticky {
        animation: slideDown 0.3s ease-in-out;
    }

    /* Animation slide xuống */
    @keyframes slideDown {
        from {
            transform: translateY(-100%);
        }

        to {
            transform: translateY(0);
        }
    }

    .fixed-header {
        position: fixed !important;
        top: 0;
        left: 0;
        right: 0;
        z-index: 9999;
        background-color: #fff;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        animation: slideDown 0.3s ease-in-out;
    }

    @keyframes slideDown {
        from {
            transform: translateY(-100%);
        }

        to {
            transform: translateY(0);
        }
    }
</style>


@stack('styles')
