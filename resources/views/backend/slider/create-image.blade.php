@extends('backend.layout.index')
@section('title', 'Thêm trình chiếu ảnh')

@section('content')
    <div class="card">
        <div class="card-header d-flex justify-content-between">
            <h4 class="card-title">Thêm Trình Chiếu Ảnh</h4>
            <button class="btn btn-primary btn-sm" id="add-slider">Thêm (+)</button>
        </div>
        <form action="{{ route('admin.slider.store', $type) }}" method="post" enctype="multipart/form-data" id="slider-form">
            @csrf
            <div class="card-body" id="slider-container">
                {{-- @dd($sliders->items) --}}
                <!-- Slider đầu tiên -->
                @foreach ($sliders->items as $index => $item)
                    <div class="row slider-item mb-3 border rounded position-relative" id="slider_{{ $index }}">
                        <button type="button" class="btn-close position-absolute btn z-3 top-0 end-0 m-2 p-0"
                            aria-label="Close" onclick="removeSlider({{ $index }})"></button>
                        <div class="col-md-6">
                            <div class="form-group">
                                <img class="img-fluid img-thumbnail w-100" id="show_slider_{{ $index }}"
                                    style="cursor: pointer; height: 150px;"
                                    src="{{ showImage($item['slider'], 'banner-defaut.jpg') }}" alt=""
                                    onclick="$('#slider_input_{{ $index }}').click();">
                                <input type="file" name="slider[{{ $index }}]"
                                    id="slider_input_{{ $index }}" class="form-control d-none" accept="image/*"
                                    onchange="previewImage(event, 'show_slider_{{ $index }}')">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <input type="text" name="link[{{ $index }}]" class="form-control"
                                    placeholder="Link" value="{{ $item['link'] }}">
                            </div>
                            <div class="form-group">
                                <input type="text" name="alt[{{ $index }}]" class="form-control"
                                    placeholder="Alt" value="{{ $item['alt'] }}">
                            </div>
                            <div class="form-group">
                                <input type="text" name="index[{{ $index }}]" class="form-control"
                                    placeholder="Vị trí" value="{{ $item['index'] }}">
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>

            <div class="card-footer">
                <button type="submit" class="btn btn-primary">Lưu</button>
                <a href="{{ route('admin.slider.index') }}" class="btn btn-secondary"><i
                        class="fas fa-arrow-left me-2"></i>Quay lại</a>
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
        function removeSlider(index) {
            $('#slider_' + index).remove();
        }
        $(document).ready(function() {
            let sliderIndex = "{{ count($sliders->items) }}";

            // Xử lý khi nhấn nút Thêm
            $('#add-slider').on('click', function() {
                console.log('sliderIndex:', sliderIndex);

                const newSlider = `
                    <div class="row slider-item mb-3 border rounded position-relative" id="slider_${sliderIndex}">
                        <button type="button" class="btn-close position-absolute top-0 end-0 m-2 p-0 z-3" aria-label="Close" onclick="removeSlider(${sliderIndex})"></button>
                        <div class="col-md-6">
                            <div class="form-group">
                                <img class="img-fluid img-thumbnail w-100" id="show_slider_${sliderIndex}"
                                    style="cursor: pointer; height: 150px;"
                                    src="{{ showImage('', 'banner-defaut.jpg') }}" alt=""
                                    onclick="$('#slider_input_${sliderIndex}').click();">
                                <input type="file" name="slider[${sliderIndex}]" id="slider_input_${sliderIndex}"
                                    class="form-control d-none" accept="image/*"
                                    onchange="previewImage(event, 'show_slider_${sliderIndex}')">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <input type="text" name="link[${sliderIndex}]" class="form-control" placeholder="Link">
                            </div>
                            <div class="form-group">
                                <input type="text" name="alt[${sliderIndex}]" class="form-control" placeholder="Alt">
                            </div>
                            <div class="form-group">
                                <input type="text" name="index[${sliderIndex}]" class="form-control" placeholder="Vị trí">
                            </div>
                        </div>
                    </div>`;

                $('#slider-container').append(newSlider);
                sliderIndex++;
            });




            $('#slider-form').on('submit', function(e) {
                e.preventDefault();

                $.ajax({
                    url: $(this).attr('action'),
                    type: 'POST',
                    data: new FormData(this),
                    contentType: false,
                    processData: false,
                    success: function(response) {
                        console.log(response);

                        if (response.status) {
                            window.location.reload();
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
                        if (xhr.status === 422) {
                            const errors = xhr.responseJSON.errors;

                            console.log(errors);

                        }
                    }
                });
            })
        });
    </script>
@endpush
