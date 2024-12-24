@extends('frontend.layouts.master')

@section('title', $product->title_seo ?? $product->title)
@section('description', $product->sub_description ?? $product->description_seo)
@section('keywords', $product->keyword_seo)

@section('h1', $product->title)
@section('h2', $product->title)

@section('og_title', $product->title_seo ?? $product->title)
@section('og_description', $product->description_seo ?? $product->sub_description)
@section('og_image', showImage($product->main_image))
{{-- html_entity_decode --}}


@section('content')

    <x-breadcrumb :title="'Sản phẩm'" :name="$product->name" :route="route('product.list')" />

    <div class="page-content">
        <div class="container">
            <div class="row clearfix">
                <section class="col-lg-8">
                    <div class="row product-detail in-stock" data-attributes="[]" data-attributes-data="[]">
                        <div class="col-md-5 col-sm-12 col-xs-12 img-product">
                            <div class="relative d-inline-b qv-preview" data-zoom="1">
                                @php
                                    $allImages = array_merge([$product->main_image], $product->images);
                                @endphp
                                @foreach ($allImages as $item)
                                    <a data-fancybox="gallery" data-number="{{ $loop->index }}"
                                        href="{{ showImage($item) }}" class="img-main-href">
                                        <img class="img-main-detail" src="{{ showImage($item) }}" alt="{{ $product->name }}"
                                            aria-label="{{ $product->name }}" />
                                        <i class="fa fa-expand"></i>
                                    </a>
                                @endforeach
                            </div>

                            <div class="relative qv-carousel-wrap">
                                <div id="product-detail-carousel" class="owl-carousel d-carousel product-detail-carousel"
                                    data-nav="true" data-margin="15" data-responsive-0="4" data-responsive-576="4"
                                    data-responsive-768="4" data-responsive-992="4" onclick="changeImageOnClick(event)">

                                    @foreach ($allImages as $item)
                                        <div>
                                            <a class="d-block text-center"
                                                style="
                                                background-image: url({{ showImage($item) }});
                                            ">
                                                <img class="owl-lazy" data-number="{{ $loop->index }}"
                                                    src="{{ showImage($item) }}" data-src="{{ showImage($item) }}" alt />
                                            </a>
                                        </div>
                                    @endforeach
                                </div>
                            </div>
                        </div>
                        <div class="col-md-7 col-sm-12 col-xs-12 detail-product">
                            <form class="add-to-cart" method="GET" action="#">
                                <input type="hidden" name="is_detail" value="true" />
                                <div class="detail-info">
                                    <div class="product-title">
                                        <h2 class="product-detail-title">
                                            {{ $product->name }}
                                        </h2>
                                    </div>
                                    <input type="hidden" name="product_title" value="{{ $product->name }}" />
                                    <!-- Giá -->
                                    <div class="product-price">
                                        <input type="hidden" name="product_price" value="0" />
                                        <input type="hidden" name="product_sale_price" value="0" />
                                    </div>
                                    <hr class="divider mt-0" />
                                    {{-- @if ($product->sub_description) --}}
                                    {{-- <div class="product-content-des"> --}}
                                    {{-- {!! $product->sub_description !!} --}}
                                    {{-- <p class="mb-1 mt-3">
                                            Nguồn gốc: {{ $product->source }}
                                        </p>
                                        <p class="mb-1">
                                            Danh mục:
                                            {{ !is_null($product->category) ? $product->category->name : 'đang cập nhật...' }}
                                        </p>
                                        <p class="mb-1">
                                            Tình trạng : {{ $product->condition_level }}

                                        </p>

                                        --}}
                                    {{-- </div>
                                        <hr class="divider" />
                                    @endif --}}





                                    <!-- Thuộc tính -->
                                    <div class="product-infor">
                                        <div class=" desc info-extra inventory">
                                            @if ($product->price || $product->sale_price)
                                                <p class="mb-1 d-flex">
                                                    @if ($product->sale_price)
                                                        <span>Giá chỉ từ:</span>
                                                        <span style="color: red; font-weight: bold; margin-left:40px">
                                                            ₫{{ number_format($product->sale_price, 0, '', '.') }}
                                                        </span>
                                                        <span
                                                            style="text-decoration: line-through; color: gray; margin-left: 8px;">
                                                            ₫{{ number_format($product->price, 0, '', '.') }}
                                                        </span>
                                                    @else
                                                        Giá chỉ từ: <span
                                                            style="color: red; font-weight: bold; margin-left: 35px;">
                                                            ₫{{ number_format($product->price, 0, '', '.') }}
                                                        </span>
                                                    @endif
                                                </p>

                                            @endif

                                            @if ($product->model)
                                                <p class="mb-1 d-flex">
                                                    <span> Model:</span>
                                                    <span class=""
                                                        style="margin-left: 60px">{{ $product->model }}</span>
                                                </p>
                                            @endif

                                            @if ($product->manufacturer)
                                                <p class="mb-1 d-flex">
                                                    <span> Thương hiệu:</span>
                                                    <span class=""
                                                        style="margin-left: 20px">{{ $product->manufacturer }}</span>
                                                </p>
                                            @endif

                                            @if ($product->guarantee)
                                                <p class="mb-1 d-flex">
                                                    <span>Bảo hành:</span>
                                                    <span class=""
                                                        style="margin-left: 38px">{{ $product->guarantee }}</span>
                                                </p>
                                            @endif

                                            @if ($product->status)
                                                <p class="mb-1">
                                                    Tình trạng: <span class=""
                                                        style="margin-left: 30px">{{ $product->status }}</span>
                                                </p>
                                            @endif

                                            @if ($product->origin)
                                                <p class="mb-1">
                                                    Xuất xứ: <span class=""
                                                        style="margin-left: 47px">{{ $product->origin }}</span>
                                                </p>
                                            @endif

                                        </div>
                                    </div>
                                    <!-- Nút đặt mua -->
                                    <div class="product-oder row">
                                        <div class="col-sm-6  order-now" style="padding-right: 5px">
                                            <a href="{{ route('contact', $product->slug) }}" rel="nofollow"
                                                class="btn btn--l btn-primary btn-order wb-main-order btn-item buy_now"
                                                title="{{ $product->name }}">Liên hệ <i style="margin-left: 5px"
                                                    class="fa fa-phone-alt" aria-hidden="true"></i></a>
                                        </div>
                                        <div class="col-sm-6 order-now" style="padding-left: 5px">
                                            @if ($product->file_pdf)
                                                <a target="_bank" href="{{ route('file.download', $product->id) }}"
                                                    style="font-weight: bold; border-radius: 3px; color: #fff; background: #009FAB; border:none; padding: 6px; width: 100%; display: block; text-align: center">
                                                    Xem Catalogue <i class="fas fa-download ml-2"></i>
                                                </a>
                                            @endif

                                        </div>
                                    </div>
                                    <hr class="divider" style="margin-top: 1.5rem;" />
                                </div>
                            </form>
                            <div class="share-container" style="margin-top: 20px">
                                <p class="d-inline-middle">Chia sẻ:</p>
                                <div class="d-inline-middle addthis-widget-container">
                                    <ul class="clearfix horizontal-list social-icons">
                                        <li class="relative">

                                            <div class="fb-share-button" data-href="{{ url()->current() }}"
                                                data-layout="" data-size=""><a target="_blank"
                                                    href="https://www.facebook.com/sharer/sharer.php?u={{ url()->current() }}&amp;src=sdkpreparse"
                                                    class="fb-xfbml-parse-ignore">Chia sẻ</a>
                                            </div>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="detail-tabs">
                        <!-- Nav tabs -->
                        <div class="tab-detail">
                            <ul class="nav nav-tabs tab_list">
                                <li>
                                    <a href="#tab-mo-ta" class="title-tab tab-item active" data-toggle="tab"
                                        aria-expanded="true">
                                        <span class="border-style7"></span>
                                        Mô tả
                                    </a>
                                </li>


                            </ul>
                        </div>
                        <!-- Tab panes -->
                        <div class="tab-content col-xs-12">
                            <div class="pro-info-tab tab-pane active show" id="tab-mo-ta">
                                {!! $product->description !!}
                            </div>


                        </div>
                    </div>
                    <div class="box_heading">
                        <h2 class="heading">Sản phẩm liên quan</h2>
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
                    <div class="product-view related-article">
                        <article class="blog-item product-grid-view" data-wow-delay="0.25s">
                            <div class="row">

                                <div class="swiper-container">
                                    <div class="swiper-wrapper">
                                        @foreach ($relatedProducts as $item)
                                            <div class="swiper-slide">
                                                <div class="product-item relative">
                                                    <figure class="photoframe relative">
                                                        <div class="relative img-product">
                                                            <a href="{{ route('product.detail', $item->slug) }}"
                                                                class="d-block relative">
                                                                <img src="{{ showImage($item->main_image) }}"
                                                                    width="100%" height="100%" class="lazyload"
                                                                    alt="{{ $item->name }}" />
                                                            </a>
                                                            <a href="{{ route('contact', $item->slug) }}" rel="nofollow"
                                                                class="btn btn--m btn-primary btn-item"
                                                                title="{{ $item->name }}"><i class="fa fa-phone-alt"
                                                                    aria-hidden="true"></i> Liên hệ</a>
                                                        </div>
                                                        <figcaption class="infor-product">
                                                            <h3 class="wrap-two-lines product-title">
                                                                <a href="{{ route('product.detail', $item->slug) }}"
                                                                    class="two-lines"
                                                                    aria-label="{{ $item->name }}">{{ $item->name }}</a>
                                                            </h3>
                                                            <div class="btn-purchased">
                                                                <a href="{{ route('contact', $item->slug) }}"
                                                                    rel="nofollow" class="btn btn--m btn-primary btn-item"
                                                                    title="{{ $item->name }}">
                                                                    Liên hệ
                                                                    <i class="fa fa-phone-alt ml-2"
                                                                        aria-hidden="true"></i>
                                                                </a>
                                                            </div>
                                                        </figcaption>
                                                    </figure>
                                                </div>
                                            </div>
                                        @endforeach
                                    </div>
                                </div>

                            </div>
                        </article>
                    </div>
                </section>

                <x-sidebar />

            </div>
        </div>
    </div>
@endsection

@push('scripts')
    <script src="{{ asset('frontend/assets/plugins/swiper/swiper-bundle.min.js') }}" defer></script>
    <script src="{{ asset('frontend/assets/plugins/elevatezoom-3.0.8/jquery.elevatezoom.min.js') }}"></script>

    <script>
        $(function() {

            const images = document.querySelectorAll('#tab-mo-ta img');

            images.forEach(img => {
                // Lấy giá trị alt của từng ảnh
                const altText = img.alt;

                // Tạo thẻ div để hiển thị alt
                const altDiv = document.createElement('div');
                altDiv.classList.add('image-alt');
                altDiv.textContent = altText;

                // Thêm thẻ altDiv bên dưới ảnh
                img.parentElement.appendChild(altDiv);
            });
        });

        document.addEventListener('DOMContentLoaded', function() {
            const swiper = new Swiper('.swiper-container', {
                slidesPerView: 2,
                spaceBetween: 10,
                loop: true,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                },
                breakpoints: {
                    640: {
                        slidesPerView: 1
                    },
                    768: {
                        slidesPerView: 3
                    },
                    1024: {
                        slidesPerView: 4
                    },
                },
            });
        });
    </script>

<script type="application/ld+json">

</script>
@endpush

@push('styles')
    <link rel="stylesheet" href="{{ asset('frontend/assets/plugins/swiper/swiper-bundle.min.css') }}" />
    <style>
        .product-content-des ul {
            margin-top: 1rem;
        }

        .tab-content ul {
            padding-left: 40px !important;
            list-style: unset !important;
        }

        .swiper-container {
            width: 100%;
            padding: 0px 5px;
            margin: 0 auto;
            overflow: hidden;
        }

        .swiper-slide {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .image-alt {
            margin-top: 10px;
            font-style: italic;
            color: #555;
            background: rgba(128, 128, 128, .5)
        }
    </style>
@endpush
