@extends('frontend.layouts.master')

@section('title', 'Danh sách sản phẩm')


@section('content')
    <x-breadcrumb :title="'Sản phẩm'" />

    <div class="page-content">
        <div class="container">
            <div class="row clearfix product-list">
                <div class="col-lg-8 product-view">
                    <div class="row clearfix sort_products">
                        {{-- <div class="col-lg-7 col-12 col-sm-8">
                            <p class="d-inline-middle f-size-medium">Sắp xếp:</p>
                            <div class="clearfix d-inline-middle">
                                <div class="wrap-select f-size-medium relative">
                                    <select class="select_products">
                                        <option value="null">Chọn</option>
                                        <option value="sort_price=desc">Giá giảm dần</option>
                                        <option value="sort_price=asc">Giá tăng dần</option>
                                        <option value="sort_date=desc">Từ mới đến cũ</option>
                                        <option value="sort_date=asc">Từ cũ đến mới</option>
                                    </select>
                                </div>
                            </div>
                        </div> --}}
                        <div class="col-lg-5 col-12 col-sm-4 grid-right d-none">
                            <p class="d-inline-middle f-size-medium"></p>
                            <div class="clearfix d-inline-middle">
                                <a href="javascript:void(0);" class="but-style-1 but-style-grid active"><i
                                        class="fa fa-th"></i></a>
                                <a href="javascript:void(0);" class="but-style-1 but-style-list"><i
                                        class="fa fa-th-list"></i></a>
                            </div>
                        </div>
                    </div>
                    {{-- <hr class="divider-2" /> --}}
                    <div class="blog-item product-grid-view" data-wow-delay="0.25s">
                        <div class="row">

                            @forelse ($products as $product)
                                <div class="item col-6 col-sm-6 col-md-6 col-lg-4 pd-style1">
                                    <div class="product-item relative">
                                        <figure class="photoframe relative">
                                            @if ($product->is_hot)
                                                <img style="position: absolute; max-width: 22%; height: auto; z-index: 100; top: 0px; right: -3px;"
                                                    src="{{ asset('frontend/assets/image/pngegg.png') }}" alt="">
                                            @endif
                                            <div class="relative img-product">
                                                <a href="{{ route('product.detail', $product->slug) }}"
                                                    class="d-block relative">
                                                    <img src="{{ showImage($product->main_image) }}" width="100%"
                                                        height="100%" data-isrc="{{ showImage($product->main_image) }}"
                                                        class="lazyload" alt="{{ $product->name }}"
                                                        aria-label="{{ $product->name }}" />
                                                </a>
                                                <a href="{{ route('contact', $product->slug) }}" rel="nofollow"
                                                    class="btn btn--m btn-primary btn-item" title="{{ $product->name }}">
                                                    Liên hệ <i class="fa fa-phone-alt ml-2" aria-hidden="true"></i></a>
                                            </div>
                                            <figcaption class="infor-product">
                                                <h3 class="wrap-two-lines product-title">
                                                    <a href="{{ route('product.detail', $product->slug) }}"
                                                        class="two-lines"
                                                        aria-label="{{ $product->name }}">{{ $product->name }}</a>
                                                </h3>
                                                <div class="btn-purchased">
                                                    <a href="{{ route('contact', $product->slug) }}" rel="nofollow"
                                                        class="btn btn--m btn-primary btn-item"
                                                        title="{{ $product->name }}">
                                                        Liên hệ <i class="fa fa-phone-alt ml-2" aria-hidden="true"></i></a>
                                                </div>
                                            </figcaption>
                                        </figure>
                                    </div>
                                </div>
                            @empty
                                <div class="col-12">
                                    <h3 class="text-center">Không tìm thấy sản phẩm</h3>
                                </div>
                            @endforelse
                        </div>

                        {{ $products->appends(request()->query())->links() }}

                    </div>
                </div>

                <x-sidebar />

            </div>
        </div>
    </div>
@endsection
