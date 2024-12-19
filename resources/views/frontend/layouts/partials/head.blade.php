<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<link rel="icon" type="image/png" href="{{ showImage($setting->icon) }}">
<meta name="csrf-token" content="{{ csrf_token() }}">

<title>@yield('title', $setting->seo_title ?? env('APP_NAME'))</title>
<meta name="description" content="@yield('description', $setting->seo_description)">
<meta name="keywords" content="@yield('keywords', formatString($setting->seo_keywords) ?? env('APP_NAME'))">

<meta property="fb:app_id" content="1234567890" />
<meta property="og:url" content="{{ url()->current() }}" />
<meta property="og:type" content="website" />
<meta property="og:title" content="@yield('og_title', $setting->seo_title ?? env('APP_NAME'))" />
<meta property="og:description" content="@yield('og_description', $setting->seo_description ?? env('APP_NAME'))" />
<meta property="og:site_name" content="{{ $setting->company }}" />
<meta property="og:image" content="@yield('og_image', showImage($setting->logo))" />

<div id="fb-root"></div>
<script async defer crossorigin="anonymous" src="https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v21.0">
</script>


@include('frontend.layouts.partials.styles')
