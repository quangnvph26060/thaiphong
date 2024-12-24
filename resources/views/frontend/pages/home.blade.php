@extends('frontend.layouts.master')


@section('content')
    <div class="page-content" style="padding: 0 0 30px 0 !important;">
        <div class="row">
            <div class="swiper-container banner">
                <div class="swiper-wrapper">
                    @foreach ($items as $key => $item)
                        <div class="swiper-slide">
                            <img src="{{ showImage($item['slider']) }}" alt="Banner 1">
                        </div>
                    @endforeach
                </div>
            </div>

        </div>
        @foreach ($catalogues as $catalog)
            <div class="row">
                <div class="widget widget-product widget-27 col-12 col-md-12" data-widget-id="27" data-widget="product">
                    <div class="widget_product_body style1" style="background-color: #ffffff">
                        <div class="container" data-ajax="#">
                            <div class="content-widget">
                                <div class="d-flex  align-items-center">
                                    <div class="border-end catalogues">
                                        <h2 style="font-size: 1.25rem">
                                            {{ $catalog->name }}
                                        </h2>
                                    </div>
                                    <div class="more">
                                        <a href="{{ route('product.detail', $catalog->slug) }}">
                                            Xem thêm
                                            <i class="fas fa-caret-right"></i>
                                        </a>
                                    </div>
                                </div>
                                <div class="widget-content">
                                    <div class="tab-content product-view">
                                        <div class="tab-pane active loaded" id="tab_style_27_0">
                                            <div class="row product-grid-view item-style">
                                                @foreach ($catalog->product as $product)
                                                    <div class="col-6 col-sm-4 col-md-4 col-lg-3">
                                                        <div class="product-item relative">
                                                            <figure class="photoframe relative">
                                                                <div class="relative img-product"
                                                                    style="width: 100%; aspect-ratio: 4/3">
                                                                    <a href="{{ route('product.detail', $product->slug) }}"
                                                                        class="d-block relative">
                                                                        <img src="{{ showImage($product->main_image) }}"
                                                                            srcset="{{ showImage($product->main_image) }} 480w,
                                                                                {{ showImage($product->main_image) }} 1024w,
                                                                                {{ showImage($product->main_image) }} 1920w"
                                                                            sizes="(max-width: 600px) 480px, (max-width: 1200px) 1024px, 1920px"
                                                                            width="800" height="600" class="lazyload"
                                                                            alt="{{ $product->name }}"
                                                                            aria-label="{{ $product->name }}" />
                                                                    </a>
                                                                </div>
                                                                <figcaption class="infor-product">
                                                                    <h3 class="wrap-two-lines product-title">
                                                                        <a href="{{ route('product.detail', $product->slug) }}"
                                                                            class="two-lines"
                                                                            aria-label="{{ $product->name }}">{{ $product->name }}</a>
                                                                    </h3>
                                                                    <div class="btn-purchased">
                                                                        <a href="{{ route('contact', $product->slug) }}"
                                                                            rel="nofollow"
                                                                            class="btn btn--m btn-primary btn-item"
                                                                            title="{{ $product->name }}">Liên hệ <i
                                                                                class="fa fa-phone-alt ml-2"
                                                                                aria-hidden="true"></i></a>
                                                                    </div>
                                                                </figcaption>
                                                            </figure>
                                                        </div>
                                                    </div>
                                                @endforeach
                                            </div>
                                        </div>
                                        <div class="tab-pane" id="tab_style_27_1"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        @endforeach

        @if ($news->isNotEmpty())
            <div class="row">
                <div class="widget widget-post_category widget-35 col-12 col-md-12" data-widget-id="35"
                    data-widget="post_category">
                    <div class="widget_post_body style5"
                        style="
                    background-image: url({{ asset('frontend/assets/image/bg_blog.jpg') }});
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: cover;
                    ">
                        <div class="container">
                            <div class="content-widget" data-limit="4" data-type="5" data-post-size="post_medium">
                                <div class="text-center">
                                    <div class="box_heading">
                                        <a style="color: #cc0000 !important; font-size: 1.6rem; font-weight: 600"
                                            href="{{ route('news.list') }}">TIN TỨC NỔI
                                            BẬT</a>
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

                                <div class="swiper-container slider" style="margin-top: 50px; overflow-x: hidden">
                                    <div class="swiper-wrapper">
                                        @foreach ($news as $item)
                                            <div class="swiper-slide">
                                                <div class="post-item relative" data-id="{{ $item->id }}">
                                                    <figure class="photoframe relative">
                                                        <div class="relative img-post">
                                                            <a href="{{ route('news.detail', $item->slug) }}"
                                                                class="d-block relative text-center">
                                                                <img src="{{ showImage($item->featured_image) }}"
                                                                    width="100%" height="100%" class="lazyload"
                                                                    alt="{{ $item->subject }}" />
                                                            </a>
                                                        </div>
                                                        <figcaption class="info-post" style="padding: 10px 0">

                                                            <p class="f-size-medium post-view-date">
                                                                <span class="post-date">
                                                                    <i class="fas fa-calendar-alt"></i>
                                                                    {{ \Carbon\Carbon::parse($item->created_at)->format('d/m/Y') }}
                                                                    <span class="d-none-sidebar"> | </span>
                                                                </span>
                                                                <span class="post-item-view">
                                                                    <i class="fas fa-eye"></i> {{ $item->view }} Lượt
                                                                    xem
                                                                </span>
                                                            </p>

                                                            <hr>
                                                            <div class="wrap-two-lines post-title">
                                                                <a href="{{ route('news.detail', $item->slug) }}"
                                                                    class="two-lines" aria-label="{{ $item->subject }}">
                                                                    {{ $item->subject }}.
                                                                </a>
                                                            </div>

                                                            <div class="description">
                                                                {{ \Str::words($item->summary, 10, ' [...]') }}
                                                            </div>

                                                            <div class="read-more">
                                                                <a href="{{ route('news.detail', $item->slug) }}">
                                                                    Xem thêm &rsaquo;&rsaquo;</a>
                                                            </div>
                                                        </figcaption>
                                                    </figure>
                                                </div>
                                            </div>
                                        @endforeach
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        @endif


        <div class="consult-section">
            <div class="container">
                <div class="row consult-container"
                    style="background-image: url({{ asset('frontend/assets/image/pngtree-medical-doctor-science-background-picture-image_968711.jpg') }})">
                    <!-- Hình ảnh bên trái -->
                    <div class="col-lg-4 consult-left"></div>

                    <!-- Form bên phải -->
                    <div class="col-lg-8 d-flex align-items-center">
                        <form class="consult-form w-100 contact-form" action="{{ route('contact') }}" id="contact_form">
                            {{-- <h2 >Bạn đang cần được tư vấn</h2> --}}
                            <p style="font-size: 1.8rem; color: #cc0000 !important; font-weight: 600">
                                Bạn đang cần được tư vấn
                            </p>
                            <p style="font-weight: 500">Chúng tôi sẽ liên hệ với bạn trong ít phút nữa.</p>

                            <div class="row g-3">
                                <div class="col-md-6 mb-3">
                                    <input type="text" name="name" class="form-control" placeholder="Nhập tên*" />
                                </div>
                                <div class="col-md-6 mb-3">
                                    <input type="email" name="email" class="form-control"
                                        placeholder="Nhập E-Mail*" />
                                </div>
                                <div class="col-md-12 mb-3">
                                    <input type="text" name="phone" class="form-control" pattern="^[0-9]*$"
                                        inputmode="numeric" title="Số điện thoại không đúng định dạng"
                                        placeholder="Nhập số điện thoại*" />
                                </div>
                                <div class="col-12 mb-3">
                                    <textarea style="resize: none;" class="form-control" name="message" rows="3"
                                        placeholder="Viết một tin nhắn ngắn..."></textarea>
                                </div>
                                <div class="col-12 text-center">
                                    <button type="submit" class="btn btn-primary w-100">
                                        Gửi
                                    </button>
                                </div>
                            </div>
                            <div class="form-group mt-3">
                                <div class="alert alert-success" style="display: none; padding: 0.5rem 1.25rem;">
                                </div>
                                <div class="alert alert-danger" style="display: none; padding: 0.5rem 1.25rem;"></div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
    <script type="application/ld+json">
    </script>

    <script src="{{ asset('frontend/assets/plugins/swiper/swiper-bundle.min.js') }}" defer></script>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const bannerSlides = document.querySelectorAll('.swiper-container.banner .swiper-slide');
            const swiperBanner = new Swiper('.swiper-container.banner', {
                slidesPerView: 1,
                slidesPerGroup: 1,
                loop: bannerSlides.length > 1 ? true : false,
                autoplay: {
                    delay: 3000, // Tự động chuyển sau 3 giây
                    disableOnInteraction: false, // Không tắt autoplay khi tương tác
                }
            });

            var swiperSlider = new Swiper('.swiper-container.slider', {
                slidesPerView: 1,
                spaceBetween: 30,
                breakpoints: {
                    768: {
                        slidesPerView: 3,
                    },

                    480: {
                        slidesPerView: 2,
                    }
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
            });
        });
    </script>
@endpush


@push('styles')
    <link rel="stylesheet" href="{{ asset('frontend/assets/plugins/swiper/swiper-bundle.min.css') }}" />
    <style>
        .swiper-container.banner {
            width: 100%;
            height: 500px;
        }

        .swiper-slide img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .consult-section {
            padding: 50px 0;
        }

        .consult-container {
            background: #fff;
            border-radius: 15px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        .consult-left {
            background-size: cover;
            background-position: center;
        }

        .consult-form {
            padding: 40px;
        }

        .consult-form h2 {
            font-weight: bold;
            margin-bottom: 15px;
        }

        .form-control {
            border-radius: 5px;
        }

        .form-control:focus {
            box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
        }

        @media (max-width: 768px) {
            .swiper-container.banner {
                height: 150px;
                /* Chiều cao nhỏ hơn trên mobile */
            }
        }
    </style>
@endpush
