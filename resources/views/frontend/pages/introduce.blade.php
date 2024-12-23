@extends('frontend.layouts.master')

@section('title', $introduction->name)
@section('description', $introduction->description_seo)
@section('keywords', $introduction->keyword_seo)

@section('h1', $introduction->name)
@section('h2', $introduction->name)


@section('og_title', $introduction->title_seo)
@section('og_description', $introduction->description_seo)

@section('content')
    <x-breadcrumb :title="'Giới thiệu'" />


    <div class="page-content">
        <div class="container">
            <div class="row clearfix">
                <!-- left content column-->
                <div class="col-lg-8">
                    <!-- blog post-->
                    <article class="article-detail m-bottom-50">
                        <div class="ck_editor_content">
                            {!! $introduction->page_description !!}

                        </div>
                    </article>
                    <div class="share-container" style="margin-top: 20px">
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
                                    <a href="http://pinterest.com/pin/create/link/?url={{ url()->current() }}&media=https://media.loveitopcdn.com/39908/thumb/may-sieu-am-5d-sonoscape-s55.png"
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
                    <div class="m-bottom-30"></div>
                </div>

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
            "headline": "{{ $introduction->name }}",
            "description": "{{ $introduction->description_seo }}",
            "url": "{{ url()->current() }}",
            "datePublished": "{{ $introduction->created_at }}",
            "dateModified": "{{ $introduction->updated_at }}",
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
                "url": "{{ showImage($introduction->featured_image) }}",
                "width": 800,
                "height": 800
            }
        }
</script>
@endpush
