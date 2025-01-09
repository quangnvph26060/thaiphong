@extends('backend.layout.index')
@section('title', 'Thêm mới sản phẩm')
@section('filemanager')
    @FilemanagerScript
@endsection

@section('content')
    @if ($errors->any())
        <div class="alert alert-danger">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif
    <div class="card">
        <div class="card-header  d-flex justify-content-between">
            <h4 class="card-title">Tạo sản phẩm</h4>
            <div class="card-tools">
                <a href="{{ route('admin.product.index') }}" class="btn btn-primary btn-sm">Danh sách sản phẩm</a>
            </div>
        </div>
    </div>

    <form action="{{ route('admin.product.store') }}" method="POST" enctype="multipart/form-data">
        @csrf

        <div class="row">
            <div class="col-lg-9">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <!-- Cột bên trái -->

                            <!-- Tên sản phẩm -->
                            <div class="form-group mb-3 col-lg-12">
                                <label for="name" class="form-label">Tên sản phẩm</label>
                                <input value="{{ old('name') }}" type="text" class="form-control" name="name"
                                    id="name" placeholder="Nhập tên sản phẩm">
                            </div>

                            <!-- Giá -->
                            <div class="form-group mb-3 col-lg-6">
                                <label for="price" class="form-label">Giá</label>
                                <input value="{{ old('price') }}" type="number" class="form-control" name="price"
                                    id="price" placeholder="Nhập giá sản phẩm">
                            </div>
                            <div class="form-group mb-3 col-lg-6">
                                <label for="price" class="form-label">Giá khuyến mãi</label>
                                <input value="{{ old('sale_price') }}" type="number" class="form-control" name="sale_price"
                                    id="sale_price" placeholder="Nhập giá khuyến mãi sản phẩm">
                            </div>

                            <div class="form-group mb-3 col-lg-6">
                                <label for="guarantee" class="form-label">Bảo hành </label>
                                <input value="{{ old('guarantee') }}" type="text" class="form-control" name="guarantee"
                                    id="guarantee" placeholder="Nhập thời gian bảo hành">
                            </div>

                            <div class="form-group mb-3 col-lg-6">
                                <label for="status">Tình trạng</label>
                                <input type="text" value="{{ old('status') }}" name="status" id=""
                                    class="form-control" placeholder="Nhập tình trạng">
                            </div>

                            <div class="form-group mb-3 col-lg-6">
                                <label for="model">Model</label>
                                <input type="text" name="model" id="" value="{{ old('model') }}"
                                    class="form-control" placeholder="Nhập model">
                            </div>

                            <div class="form-group mb-3 col-lg-6">
                                <label for="manufacturer">Thương hiệu</label>
                                <input type="text" name="manufacturer" value="{{ old('manufacturer') }}" id=""
                                    class="form-control" placeholder="Nhập Thương hiệu">
                            </div>

                            <div class="form-group mb-3 col-lg-6">
                                <label for="origin">Xuất xứ</label>
                                <input type="text" name="origin" id="" value="{{ old('origin') }}"
                                    class="form-control" placeholder="Nhập xuất xứ">
                            </div>

                            <div class="form-group mb-3 col-lg-6">
                                <label for="main_image" class="form-label">Tải file PDF</label>
                                <input type="file" class="form-control" name="file_pdf" max="1">
                            </div>




                            <!-- Mô tả -->

                            <div class="col-lg-12">
                                <label for="description" class="form-label">Mô tả chi tiết</label>
                                <textarea id="description" class="form-control" name="description" rows="10">{!! old('description') !!}</textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Cấu hình seo</h3>
                    </div>

                    <div class="card-body">
                        <div class="form-group mb-3">
                            <label for="title_seo" class="form-label">Tiêu đề SEO</label>
                            <input value="{{ old('title_seo') }}" type="text" class="form-control" name="title_seo"
                                id="title_seo" placeholder="Nhập tiêu đề SEO">
                        </div>
                        <div class="form-group mb-3">
                            <label for="description_seo" class="form-label">Mô tả SEO</label>
                            <textarea class="form-control" name="description_seo" id="description_seo" cols="30" rows="5"
                                placeholder="Nhập mô tả SEO"></textarea>
                        </div>

                        <div class="form-group mb-3">
                            <label for="keyword_seo" class="form-label">Từ khóa SEO</label>
                            <input value="{{ old('keyword_seo') }}" type="text" class="form-control"
                                name="keyword_seo" id="keyword_seo" placeholder="Nhập từ khóa SEO">
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-3">
                <div class="card">
                    <div class="card-header">
                        <h3>Danh mục</h3>
                    </div>

                    <div class="card-body">
                        <div class="form-group">
                            <select class="form-select" name="category_id" id="category_id">
                                @foreach ($categories as $category)
                                    <option value="{{ $category->id }}" @selected(old('category_id') == $category->id)>
                                        {{ $category->name }}
                                    </option>
                                @endforeach
                            </select>
                        </div>

                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h3>Ảnh đại diện</h3>
                    </div>

                    <div class="card-body">
                        <div class="form-group">
                            <img class="img-fluid img-thumbnail w-100" id="show_main_image" style="cursor: pointer"
                                src="{{ showImage('') }}" alt=""
                                onclick="document.getElementById('main_image').click();">

                            <input type="file" class="form-control d-none" id="main_image" name="main_image"
                                accept="image/*" onchange="previewImage(event, 'show_main_image')">
                        </div>

                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h3>Album ảnh</h3>
                    </div>
                    <div class="form-group mb-3 col-lg-12">
                        <div class="album pb-3"></div>
                    </div>
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-primary">Xác nhận</button>
                </div>
            </div>
        </div>

    </form>

@endsection

@push('scripts')
    <script src="https://cdn.jsdelivr.net/npm/@yaireo/tagify"></script>
    <script src="{{ asset('backend/assets/js/image-uploader.min.js') }}"></script>

    <script src="{{ asset('tinymce/tinymce.min.js') }}"></script>

    <script>
        $(function() {

            $('.album').imageUploader({
                preloaded: [],
                imagesInputName: 'images',
                preloadedInputName: 'old',
                maxSize: 2 * 1024 * 1024,
                maxFiles: 15,
            });

            tinymce.init({
                selector: '#description',
                height: 500,
                plugins: [
                    'advlist anchor autolink autoresize autosave charmap code codesample directionality',
                    'emoticons fullscreen image importcss insertdatetime link lists media nonbreaking',
                    'pagebreak preview print save searchreplace table template visualblocks visualchars wordcount'
                ],
                toolbar: [
                    'undo redo | fontselect fontsizeselect formatselect | bold italic underline strikethrough |',
                    'alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent |',
                    'link image media table | forecolor backcolor emoticons | fullscreen preview code |',
                    'insertdatetime charmap codesample pagebreak template'
                ].join(' '),
                file_browser_callback: filemanager.tinyMceCallback,

                menubar: 'file edit view insert format tools table help',
                branding: false,
                image_advtab: true,
                autosave_ask_before_unload: true,
                automatic_uploads: true,
                toolbar_mode: 'sliding',
                content_style: 'body { font-family:Arial,sans-serif; font-size:14px }',
            });



            const input = document.querySelector('#keyword_seo');
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


        });
    </script>
@endpush

@push('styles')
    <link rel="stylesheet" href="{{ asset('backend/assets/css/image-uploader.min.css') }}">
    <link href="https://cdn.jsdelivr.net/npm/@yaireo/tagify/dist/tagify.css" rel="stylesheet" />
    <style>
        .modal-backdrop.show {
            z-index: 1001 !important;
        }
    </style>
@endpush
