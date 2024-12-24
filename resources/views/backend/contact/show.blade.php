@extends('backend.layout.index')

@section('title', 'Cấu hình chung')

@section('content')
    <form action="{{ route('admin.contact.update') }}" method="POST" enctype="multipart/form-data">
        @csrf
        <div class="row">
            <div class="col-lg-9">
                <div class="card">
                    <div class="card-header">
                        <h4>Cấu hình chung</h4>
                    </div>
                    <div class="card-body">

                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Tên công ty</label>
                                    <input type="text" name="company"
                                        class="form-control @error('company') is-invalid @enderror"
                                        value="{{ $data->company }}">
                                    @error('company')
                                        <small class="text-danger">{{ $message }}</small>
                                    @enderror
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Email</label>
                                    <input type="text" name="email"
                                        class="form-control @error('email') is-invalid @enderror"
                                        value="{{ $data->email }}">
                                    @error('email')
                                        <small class="text-danger">{{ $message }}</small>
                                    @enderror
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Kinh doanh</label>
                                    <input type="text" name="phone"
                                        class="form-control @error('phone') is-invalid @enderror"
                                        value="{{ $data->phone }}">
                                    @error('phone')
                                        <small class="text-danger">{{ $message }}</small>
                                    @enderror
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Hotline</label>
                                    <input type="text" name="name"
                                        class="form-control @error('name') is-invalid @enderror"
                                        value="{{ $data->name }}">
                                    @error('name')
                                        <small class="text-danger">{{ $message }}</small>
                                    @enderror
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Địa chỉ</label>
                                    <input type="text" name="address"
                                        class="form-control @error('address') is-invalid @enderror"
                                        value="{{ $data->address }}">
                                    @error('address')
                                        <small class="text-danger">{{ $message }}</small>
                                    @enderror
                                </div>
                            </div>

                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>
                                        Tiêu đề đầu trang</label>
                                    <input type="text" name="header_top"
                                        class="form-control @error('header_top') is-invalid @enderror"
                                        value="{{ $data->header_top }}">
                                    @error('header_top')
                                        <small class="text-danger">{{ $message }}</small>
                                    @enderror
                                </div>
                            </div>

                        </div>

                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Chân trang</label>
                                    <input type="text" name="copyright"
                                        class="form-control @error('copyright') is-invalid @enderror"
                                        value="{{ $data->copyright }}">
                                    @error('copyright')
                                        <small class="text-danger">{{ $message }}</small>
                                    @enderror
                                </div>
                            </div>

                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>
                                        Thời gian làm việc</label>
                                    <input type="text" name="working_time"
                                        class="form-control @error('working_time') is-invalid @enderror"
                                        value="{{ $data->working_time }}">
                                    @error('working_time')
                                        <small class="text-danger">{{ $message }}</small>
                                    @enderror
                                </div>
                            </div>

                        </div>
                    </div>
                </div>


                <div class="card">
                    <div class="card-body">

                        <div class="row">
                            {{-- <div class="col-md-6">
                                <div class="form-group">
                                    <label>Tên Fanpage</label>
                                    <input type="text" name="fanpage"
                                        class="form-control @error('fanpage') is-invalid @enderror"
                                        value="{{ $data->fanpage }}">
                                    @error('fanpage')
                                        <small class="text-danger">{{ $message }}</small>
                                    @enderror
                                </div>
                            </div> --}}
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Link youtube</label>
                                    <input type="text" name="youtube"
                                        class="form-control @error('youtube') is-invalid @enderror"
                                        value="{{ $data->youtube }}">
                                    @error('youtube')
                                        <small class="text-danger">{{ $message }}</small>
                                    @enderror
                                </div>
                            </div>

                        </div>
                        <div class="row">
                            {{-- <div class="col-md-12">
                                <div class="form-group">
                                    <label>Mô tả ngắn</label>
                                    <textarea name="sort_description" class="form-control @error('sort_description') is-invalid @enderror">{{ $data->sort_description }}</textarea>
                                    @error('sort_description')
                                        <small class="text-danger">{{ $message }}</small>
                                    @enderror
                                </div>
                            </div> --}}
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Map</label>
                                    <input type="text" name="map"
                                        class="form-control @error('map') is-invalid @enderror"
                                        value="{{ $data->map }}">
                                    @error('map')
                                        <small class="text-danger">{{ $message }}</small>
                                    @enderror
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-body">

                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Tiêu đề seo</label>
                                    <input type="text" name="seo_title"
                                        class="form-control @error('seo_title') is-invalid @enderror"
                                        value="{{ $data->seo_title }}">
                                    @error('seo_title')
                                        <small class="text-danger">{{ $message }}</small>
                                    @enderror
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Từ khóa seo</label>
                                    <input type="text" name="seo_keywords" id="seo_keywords"
                                        class="form-control @error('seo_keywords') is-invalid @enderror"
                                        value="{{ $data->seo_keywords }}">
                                    @error('seo_keywords')
                                        <small class="text-danger">{{ $message }}</small>
                                    @enderror
                                </div>
                            </div>

                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Mô tả seo</label>
                                    <textarea name="seo_description" class="form-control @error('seo_description') is-invalid @enderror">{{ $data->seo_description }}</textarea>
                                    @error('seo_description')
                                        <small class="text-danger">{{ $message }}</small>
                                    @enderror
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-body">
                        <div class="col-lg-12">
                            <div class="form-group mb-3">
                                <label for="">Tiêu đề</label>
                                <input type="text" name="introduct_title" class="form-control"
                                    value="{{ $data->introduct_title }}">
                            </div>
                        </div>

                        <div id="input-container">

                            @forelse ($data->introduction['phone'] ?? [] as $key => $phone)
                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="form-group mb-3">
                                            <input type="text" name="introduction[phone][]" class="form-control"
                                                value="{{ $phone }}" placeholder="Số điện thoại">
                                        </div>
                                    </div>
                                    <div class="col-lg-5">
                                        <div class="form-group mb-3">
                                            <input type="text" name="introduction[facility][]" class="form-control"
                                                value="{{ $data->introduction['facility'][$key] ?? '' }}"
                                                placeholder="Cơ sở">
                                        </div>
                                    </div>
                                    <div class="col-lg-1">
                                        <div class="form-group mb-3">
                                            @if ($key > 0)
                                                <button type="button" class="btn btn-sm btn-danger remove-row">-</button>
                                            @else
                                                <button type="button" class="btn btn-sm btn-success add-row">+</button>
                                            @endif
                                        </div>
                                    </div>
                                </div>
                            @empty
                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="form-group mb-3">
                                            <input type="text" name="introduction[phone][]" class="form-control"
                                                value="" placeholder="Số điện thoại">
                                        </div>
                                    </div>
                                    <div class="col-lg-5">
                                        <div class="form-group mb-3">
                                            <input type="text" name="introduction[facility][]" class="form-control"
                                                value="" placeholder="Cơ sở">
                                        </div>
                                    </div>
                                    <div class="col-lg-1">
                                        <div class="form-group mb-3">
                                            <button type="button" class="btn btn-sm btn-success add-row">+</button>
                                        </div>
                                    </div>
                                </div>
                            @endforelse
                        </div>
                    </div>
                </div>

            </div>

            <div class="col-lg-3">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">Logo</h4>
                    </div>
                    <div class="card-body">
                        <img class="img-fluid img-thumbnail w-100" id="show_logo" style="cursor: pointer"
                            src="{{ showImage($data->logo) }}" alt=""
                            onclick="document.getElementById('logo').click();">
                        @error('logo')
                            <small class="text-danger">{{ $message }}</small>
                        @enderror
                        <input type="file" name="logo" id="logo" class="form-control d-none"
                            accept="image/*" onchange="previewImage(event, 'show_logo')">
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">Icon</h4>
                    </div>
                    <div class="card-body">
                        <img class="img-fluid img-thumbnail w-100" id="show_icon" style="cursor: pointer"
                            src="{{ showImage($data->icon) }}" alt=""
                            onclick="document.getElementById('icon').click();">
                        @error('icon')
                            <small class="text-danger">{{ $message }}</small>
                        @enderror
                        <input type="file" name="icon" id="icon" class="form-control d-none"
                            accept="image/*" onchange="previewImage(event, 'show_icon')">
                    </div>
                </div>

                {{-- <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">Logo công ty</h4>
                    </div>
                    <div class="card-body">
                        <img class="img-fluid img-thumbnail w-100" id="show_company_logo" style="cursor: pointer"
                            src="{{ showImage($data->company_logo) }}" alt=""
                            onclick="document.getElementById('company_logo').click();">
                        @error('company_logo')
                            <small class="text-danger">{{ $message }}</small>
                        @enderror
                        <input type="file" name="company_logo" id="company_logo" class="form-control d-none"
                            accept="image/*" onchange="previewImage(event, 'show_company_logo')">
                    </div>
                </div> --}}


                <div class="row mb-3 float-right">
                    <div class="col-md-12">
                        <button type="submit" class="btn btn-primary">Lưu cấu hình</button>
                    </div>
                </div>
            </div>

        </div>
    </form>
@endsection

@push('scripts')
    <!-- Tagify JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/tagify/4.7.0/tagify.min.js"></script>

    <script>
        $('.add-row').click(function() {
            var newRow = `
            <div class="row">
                <div class="col-lg-6">
                    <div class="form-group mb-3">
                        <input type="text" name="introduction[phone][]" class="form-control" value="" placeholder="Số điện thoại">
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="form-group mb-3">
                        <input type="text" name="introduction[facility][]" class="form-control" value="" placeholder="Cơ sở">
                    </div>
                </div>
                <div class="col-lg-1">
                    <div class="form-group mb-3">
                        <button type="button" class="btn btn-sm btn-danger remove-row">-</button>
                    </div>
                </div>
            </div>
        `;
            $('#input-container').append(newRow);
        });

        // Xử lý nút "-" để xóa dòng input
        $(document).on('click', '.remove-row', function() {
            $(this).closest('.row').remove();
        });

        const input = document.querySelector('#seo_keywords');
        const tagify = new Tagify(input, {
            dropdown: {
                maxItems: 10,
                classname: "tags-look",
                enabled: 0,
                closeOnSelect: false
            }
        });

        tagify.on('add', () => {
            adjustTagifyHeight(tagify.DOM.scope);
        });

        function adjustTagifyHeight(scopeElement) {
            if (scopeElement) {
                scopeElement.style.height = "auto"; // Reset chiều cao
                scopeElement.style.height = scopeElement.scrollHeight + "px"; // Điều chỉnh theo nội dung
            }
        }
    </script>
@endpush

@push('styles')
    <!-- Tagify CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tagify/4.7.0/tagify.css">

    <style>
        .tagify__tag {
            margin-top: 3px !important;
        }


        .tags-look .tagify {
            display: block;
            white-space: normal;
            overflow-y: hidden;
            /* Ẩn thanh cuộn dọc */
            max-height: 150px;
            /* Giới hạn chiều cao nếu cần */
        }

        .tagify {
            max-height: 150px;
            /* Giới hạn chiều cao */
            overflow-y: auto;
            /* Thêm thanh cuộn dọc nếu quá dài */
        }

        .tagify__input {
            width: 100%;
            /* Đảm bảo input chiếm hết chiều rộng */
            overflow: hidden;
            /* Ẩn nội dung tràn */
        }
    </style>
@endpush
