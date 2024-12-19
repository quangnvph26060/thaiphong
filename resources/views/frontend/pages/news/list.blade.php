@extends('frontend.layouts.master')

@section('title', 'Danh sách tin tức')


@section('content')
    <x-breadcrumb :title="'Tin tức'" />

    <div class="page-content">
        <div class="container">



            @if ($news->isNotEmpty())
                <div class="row clearfix post-list">
                    <div class="col-lg-8 post-view">
                        <div class="blog-item post-list-view" data-wow-delay="0.25s">

                            <div class="item col-12 col-sm-6 col-md-6 col-lg-12">
                                <div class="post-item relative" data-id="224">
                                    <figure class="photoframe relative">
                                        <div class="relative img-post">
                                            <a href="{{ route('news.detail', $news->first()->slug) }}"
                                                class="d-block relative text-center">
                                                <img src="{{ showImage($news->first()->featured_image) }}" width="100%"
                                                    height="100%"
                                                    data-isrc="{{ showImage($news->first()->featured_image) }}"
                                                    class="lazyload" alt="{{ $news->first()->subject }}"
                                                    aria-label="{{ $news->first()->subject }}" />
                                            </a>
                                        </div>
                                    </figure>

                                    <figcaption class="info-post" style="padding: 0 10px 10px 10px">

                                        <p class="f-size-medium post-view-date">
                                            <span class="post-date">
                                                <i class="fas fa-calendar-alt"></i>
                                                {{ \Carbon\Carbon::parse($news->first()->created_at)->format('d/m/Y') }}
                                                <span class="d-none-sidebar"> | </span>
                                            </span>
                                            <span class="post-item-view">
                                                <i class="fas fa-eye"></i> {{ $news->first()->view }} Lượt xem
                                            </span>
                                        </p>

                                        <hr>
                                        <div class="wrap-two-lines post-title">
                                            <a href="{{ route('news.detail', $news->first()->slug) }}" class="two-lines"
                                                aria-label="{{ $news->first()->subject }}">{{ $news->first()->subject }}.</a>
                                        </div>

                                        <div class="description">
                                            {{ \Str::words($news->first()->summary, 35, ' [...]') }}
                                        </div>

                                        <div class="read-more">
                                            <a href="{{ route('news.detail', $news->first()->slug) }}">
                                                Xem thêm &rsaquo;&rsaquo;</a>
                                        </div>
                                    </figcaption>
                                </div>
                            </div>

                            <div class="row">
                                @foreach ($news->skip(1) as $item)
                                    <div class="item col-12 col-sm-6 col-md-6 col-lg-6">
                                        <!-- Cập nhật đây để chỉ chiếm 50% -->
                                        <div class="post-item relative" data-id="224">
                                            <figure class="photoframe relative">
                                                <div class="relative img-post">
                                                    <a href="{{ route('news.detail', $item->slug) }}"
                                                        class="d-block relative text-center">
                                                        <img src="{{ showImage($item->featured_image) }}" width="100%"
                                                            height="100%"
                                                            data-isrc="{{ showImage($item->featured_image) }}"
                                                            class="lazyload" alt="{{ $item->subject }}"
                                                            aria-label="{{ $item->subject }}" />
                                                    </a>
                                                </div>
                                            </figure>

                                            <figcaption class="info-post" style="padding: 0 10px 10px 10px">

                                                <p class="f-size-medium post-view-date">
                                                    <span class="post-date">
                                                        <i class="fas fa-calendar-alt"></i>
                                                        {{ \Carbon\Carbon::parse($item->created_at)->format('d/m/Y') }}
                                                        <span class="d-none-sidebar"> | </span>
                                                    </span>
                                                    <span class="post-item-view">
                                                        <i class="fas fa-eye"></i> {{ $item->view }} Lượt xem
                                                    </span>
                                                </p>

                                                <hr>
                                                <div class="wrap-two-lines post-title">
                                                    <a href="{{ route('news.detail', $item->slug) }}" class="two-lines"
                                                        aria-label="{{ $item->subject }}">
                                                        {{ $item->subject }}.
                                                    </a>
                                                </div>

                                                <div class="description">
                                                    {{ \Str::words($item->summary, 35, ' [...]') }}
                                                </div>

                                                <div class="read-more">
                                                    <a href="{{ route('news.detail', $item->slug) }}">
                                                        Xem thêm &rsaquo;&rsaquo;</a>
                                                </div>
                                            </figcaption>
                                        </div>
                                    </div>
                                @endforeach
                                <hr class="divider-2" />
                            </div>


                            {{ $news->links() }}
                        </div>
                    </div>

                    <x-sidebar />

                </div>
            @endif
        </div>
    </div>
@endsection
