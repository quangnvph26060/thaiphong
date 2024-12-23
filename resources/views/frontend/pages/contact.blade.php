@extends('frontend.layouts.master')

@section('title', 'Liên hệ với chúng tôi')

@section('content')
    <x-breadcrumb :title="'Liên hệ'" />


    <div class="page-content">
        <div class="container contact-style1">
            <div class="row clearfix">
                <section class="col-lg-12">

                    <div class="row clearfix">
                        <div class="col-lg-5 col-md-5 m-bottom-30">
                            <h1 class="heading heading-contact">
                                <strong> {{ $setting->company }}</strong>

                            </h1>
                            <ul class="c-info-list">
                                <li class="m-bottom-10">
                                    <div class="clearfix">
                                        <i class="fa fa-briefcase"></i>
                                        <p class="contact-e">
                                            <strong>Kinh doanh: </strong>
                                            <span>{{ $setting->phone }}</span>
                                        </p>
                                    </div>
                                </li>


                                <li class="m-bottom-10">
                                    <div class="clearfix">
                                        <i class="fas fa-phone"></i>
                                        <p class="contact-e">
                                            <strong>Hotline: </strong>
                                            <a href="tel:{{ $setting->name }}"
                                                aria-label="Liên hệ {{ $setting->company }}">{{ $setting->name }}</a>
                                        </p>
                                    </div>
                                </li>


                                <li class="m-bottom-10">
                                    <div class="clearfix">
                                        <div class="contact-e" style="display: flex">
                                            <i class="fas fa-map-marker f-left"></i>
                                            <p style="padding-left: 10px">
                                                <strong>Địa chỉ:</strong>
                                                <span> {{ $setting->address }}</span>
                                            </p>
                                        </div>
                                    </div>
                                </li>

                                <li class="m-bottom-10">
                                    <div class="clearfix">
                                        <i class="fas fa-envelope"></i>
                                        <p class="contact-e">
                                            <strong>Email: </strong>
                                            <a href="mailto:{{ $setting->email }}" class="contact-e color-base"
                                                aria-label="Liên hệ {{ $setting->company }}">{{ $setting->email }}</a>
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="col-lg-7 col-md-7">
                            <div class="heading">Form liên hệ</div>
                            <form method="POST" action="" id="contact_form" class="contact-form">
                                @csrf
                                <ul>
                                    <li class="clearfix">
                                        <div class="half-column">
                                            <label for="name" class="required d-inline-b">Họ tên</label>
                                            <input type="text" name="name" id="name"
                                                class="width-100 form-control" />
                                        </div>
                                        <div class="half-column">
                                            <label for="email" class="required d-inline-b">Email</label>
                                            <input type="email" name="email" id="email"
                                                class="width-100 form-control" />
                                        </div>
                                    </li>
                                    <li>
                                        <label for="phone" class="required d-inline-b">Số điện thoại</label>
                                        <input type="text" name="phone" id="phone"
                                            class="width-100 form-control" />
                                    </li>
                                    <li>
                                        <label for="message" class="d-inline-b required">Tin nhắn</label>
                                        <textarea name="message" id="message" cols="30" rows="10" class="width-100 form-control">
@if (!is_null($product))
Tên sản phẩm: {{ $product->name }}
@endif
</textarea>
                                    </li>
                                    <li class="clearfix">

                                        <div class="text-right float-right">
                                            <button class="btn btn--l btn-primary btn-item" type="submit">
                                                Gửi
                                            </button>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="alert alert-success" style="display: none"></div>
                                        <div class="alert alert-danger" style="display: none"></div>
                                    </li>
                                </ul>
                            </form>
                        </div>
                    </div>
                    <div class="map-container m-bottom-30">
                        {!! $setting->map !!}
                    </div>
                </section>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
    <script type="application/ld+json">
        {
            "@context": "https://schema.org",
            "@type": "Organization",
            "url": "{{ url()->current() }}",
            "logo": "{{ showImage($setting->logo) }}",
            "contactPoint": [{
                "@type": "ContactPoint",
                "telephone": "{{ $setting->phone }}",
                "contactType": "customer service"
            }]
        }
</script>
@endpush

@push('styles')
    <style>
        .map-container iframe {
            width: 100% !important;
        }
    </style>
@endpush
