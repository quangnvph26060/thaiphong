<div class="breadcrumbs">
    <div class="container">
        <ul class="horizontal-list clearfix f-size-medium">
            <li>
                <a class="color-base" href="{{ url('/') }}">Trang chủ</a><i>/</i>
            </li>
            @if (isset($name))
                <li>
                    <a href="{{ $route }}" class="color-base">
                        {{ $title }}
                    </a>
                    <i>/</i>
                </li>
                <li>
                    <a class="color-base" href="javascript:void(0);">{{ $name }}</a>
                </li>
            @else
                <li>
                    <a href="javascript:void(0);" class="color-base">
                        {{ $title }}
                    </a>
                </li>
            @endif

        </ul>
    </div>
</div>
