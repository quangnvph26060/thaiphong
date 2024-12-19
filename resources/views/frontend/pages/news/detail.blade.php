@extends('frontend.layouts.master')

@section('title', $news->subject)
@section('description', $news->seo_description)
@section('keywords', formatString($news->seo_keywords))
@section('og_image', showImage($news->featured_image))

@section('content')
{{-- @dd($news) --}}
    <x-breadcrumb :title="'Tin tức'" :name="$news->subject" :route="route('news.list')"/>

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
                    {{-- <div class="wb-comment">
                        <span class="heading">Bình luận</span>
                        <div id="system_comments" data-commentable_type="post" data-commentable_id="224"
                            data-censorship="1">
                            <div class="row">
                                <div id="data-comments">
                                    <ul id="comments-list" class="comments-list col-md-12 comment-container"></ul>
                                    <p
                                        style="
                                width: 100%;
                                text-align: center;
                                margin-bottom: 20px;
                                ">
                                        <a class="more_comment" style="display: none" href="#">Xem thêm</a>
                                    </p>
                                </div>
                                <div class="comment-form comment-main col-md-12">
                                    <form action="/submit-comment" method="POST" class="formcomment width-100">
                                        <ul>
                                            <li class="clearfix">
                                                <div class="half-column">
                                                    <input type="text" required name="name"
                                                        class="form-control width-100" placeholder="Họ tên*"
                                                        value="" />
                                                </div>
                                                <input type="hidden" name="parent_id" value="0" />
                                                <input type="hidden" name="parent_name" value="comment-main" />
                                            </li>
                                            <li>
                                                <div>
                                                    <textarea name="content" required class="form-control width-100" placeholder="Bình luận*"></textarea>
                                                </div>
                                            </li>
                                            <li>
                                                <div style="display: flow-root">

                                                    <div class="text-right float-right">
                                                        <button type="submit" class="btn-item btn btn--l btn-primary">
                                                            Gửi
                                                        </button>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div id="reply-template" style="display: none">
                            <div class="comment-footer comment-reply">
                                <form class="formcomment comment-form width-100">
                                    <ul>
                                        <li class="clearfix"></li>
                                        <li class="clearfix">
                                            <div class="half-column">
                                                <input type="text" required name="name" class="form-control"
                                                    placeholder="Họ tên*" value="" />
                                            </div>
                                            <div class="half-column">
                                                <input type="email" required name="email form-email"
                                                    class="form-control" placeholder="Email*" value="" />
                                            </div>
                                            <input type="hidden" name="parent_id" class="parent_id" />
                                            <input type="hidden" name="parent_name" value="comment-reply" />
                                        </li>

                                        <li>
                                            <div>
                                                <textarea name="content" required class="form-control" placeholder="Bình luận*"></textarea>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="text-right">
                                                <button type="submit" class="btn-item btn btn--l btn-primary">
                                                    Gửi
                                                </button>
                                                <button type="button"
                                                    class="btn-item btn btn--l btn-default comment_reply_close">
                                                    Đóng
                                                </button>
                                            </div>
                                        </li>
                                    </ul>
                                </form>
                            </div>
                        </div>
                        <script>
                            var comment_avatar =
                                "https://static.loveitopcdn.com/themes/base1/images/avatar/avatar.png";
                            var comment_avatar_admin =
                                "https://static.loveitopcdn.com/themes/base1/images/avatar/avatar.png";
                            var trans_reply = "Trả lời";
                        </script>
                    </div> --}}
                </section>

                <x-sidebar />

            </div>
        </div>
    </div>
@endsection
