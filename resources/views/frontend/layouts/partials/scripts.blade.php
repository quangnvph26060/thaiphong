<script>
    var exit_popup_url = "";

    var template = "homepage";
</script>

<script src="{{ url('frontend/assets/plugins/jquery-3.3.1/jquery.min.js') }}"></script>

<script src="{{ url('frontend/assets/plugins/jquery-ui/jquery-ui-custom.min.js') }}"></script>

<script src="{{ url('frontend/assets/themes/base/js/plugin.js') }}"></script>

<script src="{{ url('frontend/assets/themes/base/js/common.js') }}"></script>

<script src="{{ url('frontend/assets/themes/base3/js/header.js') }}"></script>

{{-- <script src="{{ url('frontend/assets/themes/base3/js/main.js') }}"></script> --}}

<script src="{{ url('frontend/assets/themes/lovepet/js/main.js') }}"></script>

<script src="{{ url('frontend/assets/plugins/bootstrap-4.3.1/js/bootstrap.min.js') }}"></script>

<script>
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        // Nếu cuộn xuống quá 100px, thêm class sticky vào header
        if (scroll > 100) {
            $('.header-desktop').addClass('sticky');
        } else {
            $('.header-desktop').removeClass('sticky');
        }
    });


    document.addEventListener("DOMContentLoaded", function() {
        // const header = document.getElementById("header-mobile");
        const header = document.querySelector('.header-mobile');
        const offsetTrigger = 100;

        window.addEventListener("scroll", () => {
            if (window.scrollY > offsetTrigger) {
                header.classList.add("fixed-header");
            } else {
                header.classList.remove("fixed-header");
            }
        });
    });
</script>

<script>
    const toggleSubmenu = (element) => {
        const submenu = element.closest('.nav-item').querySelector(
        '.sub-menu'); // Tìm .sub-menu trong .nav-item cha
        if (submenu) {
            if (submenu.style.display === 'block') {
                submenu.style.display = 'none';
                element.classList.remove('active');
            } else {
                submenu.style.display = 'block';
                element.classList.add('active');
            }
        }
    }
</script>

@stack('scripts')
