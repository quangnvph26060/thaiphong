@extends('frontend.layouts.master')

@section('title', $news->subject)
@section('description', $news->seo_description)
@section('keywords', formatString($news->seo_keywords))
@section('og_image', showImage($news->featured_image))

@section('content')
    {{-- @dd($news) --}}
    <x-breadcrumb :title="'Tin tức'" :name="$news->subject" :route="route('news.list')" />

    <div class="page-content">
        <div class="container">
            <div class="row clearfix">
                <section class="col-lg-8">
                    <article class="article-detail m-bottom-30">
                        <div class="clearfix">
                            <h1 class="post-detail-title">
                                {{ $news->subject }}
                            </h1>
                            <div class="post-infor">
                                <div class="post-detail-date d-inline-block">
                                    <label><i class="fas fa-calendar-alt"></i> Ngày đăng:
                                    </label>
                                    {{ \Carbon\Carbon::parse($news->created_at)->format('d/m/Y') }}
                                </div>
                                <div class="post-detail-view d-inline-block relative">
                                    <label> <i class="fas fa-eye"></i> {{ $news->view }} Lượt xem</label>
                                </div>
                            </div>
                        </div>
                        <div class="decription">
                            {!! $news->article !!}
                        </div>
                    </article>
                    <div class="share-container">
                        <p class="d-inline-middle">Chia sẻ:</p>
                        <div class="d-inline-middle addthis-widget-container">
                            <ul class="clearfix horizontal-list social-icons">
                                <li class="relative">
                                    <a href="https://www.facebook.com/sharer/sharer.php?u={{ url()->current() }}"
                                        rel="nofollow" target="_blank" class="f-size-ex-large textAlign-center">
                                        <i class="fab fa-facebook-f"></i>
                                    </a>
                                </li>
                                <li class="relative">
                                    <a href="https://twitter.com/intent/tweet?url={{ url()->current() }}" rel="nofollow"
                                        target="_blank" class="f-size-ex-large textAlign-center">
                                        <i class="fab fa-twitter"></i>
                                    </a>
                                </li>
                                <li class="relative">
                                    <a class="f-size-ex-large textAlign-center" rel="nofollow"
                                        href="https://www.linkedin.com/sharing/share-offsite/?url={{ url()->current() }}"
                                        target="_blank" aria-label="Linkedin">
                                        <i class="fab fa-linkedin-in"></i>
                                    </a>
                                </li>
                                <li class="relative">
                                    <a href="http://pinterest.com/pin/create/link/?url={{ url()->current() }}&media=https://media.loveitopcdn.com/39908/thumb/212222-may-sieu-am-5d-sonoscape-p25-2.jpg"
                                        rel="nofollow" target="_blank" class="f-size-ex-large textAlign-center">
                                        <i class="fab fa-pinterest"></i>
                                    </a>
                                </li>
                                <li class="relative">
                                    <a href="https://www.tumblr.com/share/link?url={{ url()->current() }}" rel="nofollow"
                                        target="_blank" class="f-size-ex-large textAlign-center">
                                        <i class="fab fa-tumblr"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <hr class="divider-3" />
                    <div class="related-article">
                        <div class="f-size-large"><em>(*) Xem thêm</em></div>
                        <ul>


                            @foreach ($relatedNews as $item)
                                <li>
                                    <a href="{{ route('news.detail', $item->slug) }}"
                                        aria-label="{{ $item->subject }}">{{ $item->subject }}</a>
                                </li>
                            @endforeach
                        </ul>
                    </div>
                    <hr class="divider-3" />
                    <div class="m-bottom-30"></div>
                </section>

                <x-sidebar />

            </div>
        </div>
    </div>
@endsection

@push('scripts')
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "headline": "{{ $news->subject }}",
        "description": "{{ $news->seo_description }}",
        "url": "{{ url()->current() }}",
        "datePublished": "{{ $news->created_at }}",
        "dateModified": "{{ $news->updated_at }}",
        "publisher": {
            "@type": "Organization",
            "name": "{{ $setting->company }}",
            "logo": {
                "@type": "ImageObject",
                "url": "{{ showImage($setting->logo) }}"
            }
        },
        "image": {
            "@type": "ImageObject",
            "url": "{{ showImage($news->featured_image) }}",
            "width": 800,
            "height": 800
        }
    }
</script>
@endpush
