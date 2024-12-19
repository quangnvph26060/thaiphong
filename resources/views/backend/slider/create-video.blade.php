@extends('backend.layout.index')
@section('title', 'Thêm trình chiếu video')

@section('content')
    <div class="card">
        <div class="card-header">
            <h4 class="card-title">Thêm Trình Chiếu Video</h4>
        </div>
        <form action="{{ route('admin.slider.store', $type) }}" method="post" id="slider-form">
            @csrf
            <div class="card-body" id="slider-container">

                @foreach ($sliders->items['links'] as $item)
                    <div class="row slider-item mb-3">
                        <div class="form-group col-md-11">
                            <input type="text" name="links[]" class="form-control" placeholder="Link video"
                                value="{{ $item }}">
                        </div>
                        <div class="form-group col-md-1 d-flex justify-content-center align-items-center">
                            @if ($loop->first)
                                <button type="button" class="btn btn-primary add-slider">+</button>
                            @else
                                <button type="button" class="btn btn-danger remove-slider">-</button>
                            @endif
                        </div>
                    </div>
                @endforeach
            </div>

            <div class="card-footer">
                <button type="submit" class="btn btn-primary">Lưu</button>
                <a href="{{ route('admin.slider.index') }}" class="btn btn-secondary">
                    <i class="fas fa-arrow-left me-2"></i>Quay lại
                </a>
            </div>
        </form>
    </div>

    <style>
        .form-group {
            padding: 7px !important;
        }
    </style>
@endsection


@push('scripts')
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.14.5/dist/sweetalert2.all.min.js"></script>

    <link href="https://cdn.jsdelivr.net/npm/sweetalert2@11.14.5/dist/sweetalert2.min.css" rel="stylesheet">
    <script>
        $(document).ready(function() {
            let sliderIndex = "{{ count($sliders->items['links']) }}";

            // Xử lý thêm input
            $(document).on('click', '.add-slider', function() {
                const newSlider = `
                    <div class="row slider-item mb-3">
                        <div class="form-group col-md-11">
                            <input type="text" name="links[]" class="form-control" placeholder="Link video">
                        </div>
                        <div class="form-group col-md-1 d-flex justify-content-center align-items-center">
                            <button type="button" class="btn btn-danger remove-slider">-</button>
                        </div>
                    </div>`;
                $('#slider-container').append(newSlider);
                sliderIndex++;
            });

            // Xử lý xóa input
            $(document).on('click', '.remove-slider', function() {
                $(this).closest('.slider-item').remove();
            });

            // Xử lý khi nhán nút Lưu
            $('#slider-form').on('submit', function(e) {
                e.preventDefault();

                $.ajax({
                    url: $(this).attr('action'),
                    type: 'POST',
                    data: $(this).serialize(),
                    success: function(response) {
                        if (response.status) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Thành công',
                                text: response.message,
                            });
                        } else {
                            const Toast = Swal.mixin({
                                toast: true,
                                position: "top-end",
                                showConfirmButton: false,
                                timer: 3000,
                                timerProgressBar: true,
                                didOpen: (toast) => {
                                    toast.onmouseenter = Swal.stopTimer;
                                    toast.onmouseleave = Swal.resumeTimer;
                                }
                            });
                            Toast.fire({
                                icon: "error",
                                title: response.message
                            });
                        }
                    },
                    error: function(xhr) {
                        console.log(xhr.responseText);
                    }
                })
            });
        });
    </script>
@endpush
