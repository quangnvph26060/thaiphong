<!DOCTYPE html>
<html lang="en">

<head>

    @include('frontend.layouts.partials.head')

</head>

@php
    if (request()->route()->getName() == 'product.detail') {
        $page = 'product_detail';
    } elseif (request()->route()->getName() == 'news.detail') {
        $page = 'post_detail';
    } elseif (request()->route()->getName() == 'introduce' || request()->route()->getName() == 'contact') {
        $page = 'page_detail';
    } elseif (request()->route()->getName() == 'product.list') {
        $page = 'category_product';
    } elseif (request()->route()->getName() == 'product.detail') {
        $page = 'product_detail';
    } elseif (request()->route()->getName() == 'news.list') {
        $page = 'category_post';
    } else {
        $page = 'homepage';
    }
@endphp

<body
    class="{{ $page }} mobile-768 title_heading_style1 product_layout_sale_style1 product_layout_item_style1 buttom_layout_style2 sidebar_right gallery_grid menu_fixed_0 menu_style_mega_menu layout_full tab_style1 menu_mobile_style1 post-layout-item-style1">
    <h1 style="position: fixed; top: -100px">Máy Siêu Âm SonoScape</h1>

    <div class="wrapper clearfix project-layout">
        <footer class="footer">

            <div class="footer-top"></div>

            <div class="footer-middle-part">
                @include('frontend.layouts.partials.footer-middle')
            </div>

            <div class="footer-bottom">
                @include('frontend.layouts.partials.footer-bottom')
            </div>

        </footer>
        
        <header id="header">

            @include('frontend.layouts.partials.header')

        </header>


        @yield('content')




    </div>


    <div class="body_overlay"></div>

    @include('frontend.layouts.partials.exit-popup')

    @include('frontend.layouts.partials.location')

    @include('frontend.layouts.partials.scripts')
</body>

</html>
