@extends('backend.layout.index')
@section('title', 'Thêm mới bài viết')
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
            <h4 class="card-title">Tạo bài viết</h4>
            <div class="card-tools">
                <a href="{{ route('admin.news.index') }}" class="btn btn-primary btn-sm">Danh sách bài viết</a>
            </div>
        </div>
    </div>
    <form action="{{ route('admin.news.store') }}" method="post" enctype="multipart/form-data">
        @csrf
        <div class="row">
            <div class="col-md-9">

                <div class="card">
                    <div class="card-body">

                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="title">Tiêu đề</label>
                                    <input type="text" name="subject" class="form-control" placeholder="Tiêu đề"
                                        value="{{ old('subject') }}">
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="summary">Mô tả ngắn</label>
                                    <textarea name="summary" class="form-control" placeholder="Nội dung ngắn">{{ old('summary') }}</textarea>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="article">Nội dung</label>
                                    <textarea name="article" id="article" class="form-control" placeholder="Nội dung">{!! old('article') !!}</textarea>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="article">Tags</label>
                                    <input type="text" class="form-control" placeholder="Gắn thẻ" id="chose_tag"
                                        name="tags" value="{{ old('tags') }}">
                                </div>
                            </div>
                            {{-- <div class="card-body">
                                <div class="form-group">
                                </div>
                            </div> --}}
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-body">

                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="title">Tiêu đề SEO</label>

                                    <input class="form-control" name="seo_title" type="text"
                                        placeholder="Nhập tiêu đề seo" value="{{ old('seo_title') }}">
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="title">Mô tả SEO</label>
                                    <textarea name="seo_description" id="" cols="30" rows="5" class="form-control"
                                        placeholder="Mô tả seo">{{ old('seo_description') }}</textarea>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="title">Từ khóa SEO</label>
                                    <input type="text" name="seo_keywords" id="seo_keywords"
                                        class="form-control @error('seo_keywords') is-invalid @enderror"
                                        value="{{ old('seo_keywords') }}" placeholder="Nhập từ khóa">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div class="col-md-3">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">Ngày đăng</h4>
                    </div>
                    <div class="card-body">
                        <div class="form-group">

                            <input type='datetime-local' class="form-control" name="posted_at" />

                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">Trạng thái</h4>
                    </div>
                    <div class="card-body">
                        <div class="form-group">
                            <select name="status" class="form-select">
                                <option value="published" @selected(old('status') == 'published')>Xuất bản</option>
                                <option value="unpublished" @selected(old('status') == 'unpublished')>Không xuất bản</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">Danh mục</h4>
                    </div>
                    <div class="card-body">
                        <div class="form-group">
                            <select name="category_id" class="form-select">
                                <option value="" selected>Chọn danh mục</option>
                                @foreach ($categories as $id => $name)
                                    <option value="{{ $id }}" @selected(old('category_id'))>{{ $name }}
                                    </option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Ảnh đại diện</h3>
                    </div>

                    <div class="card-body">
                        <div class="form-group mb-0">
                            <img src="{{ showImage('') }}" alt="" id="image_main" class="img-fluid w-100 mb-3">
                            <a href="#" id="select_main_image" style="text-decoration: underline">Chọn ảnh
                                tiêu biểu</a>

                            <input type="file" name="featured_image" id="featured_image" class="form-control"
                                style="display: none">
                        </div>
                    </div>
                </div>

                <div class="form-group float-right">
                    <button type="submit" class="btn btn-primary ">Lưu</button>
                </div>
            </div>
        </div>
    </form>
@endsection



@push('scripts')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.4/moment.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/tempusdominus-bootstrap-4/build/js/tempusdominus-bootstrap-4.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@yaireo/tagify"></script>
    <script src="{{ asset('tinymce/tinymce.min.js') }}"></script>


    <script>
        $(function() {

            tinymce.init({
                selector: '#article',
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


            $('#select_main_image').click(function(e) {
                e.preventDefault();
                $('#featured_image').click();
            });

            $('#featured_image').change(function() {
                const file = $(this)[0].files[0];
                const reader = new FileReader();
                reader.onload = function(e) {
                    $('#image_main').attr('src', e.target.result);
                };
                reader.readAsDataURL(file);
            });

            const input = document.querySelector('#chose_tag');
            const tagify_1 = new Tagify(input, {
                dropdown: {
                    maxItems: 10,
                    classname: "tags-look",
                    enabled: 0,
                    closeOnSelect: false
                }
            });

            const keyword = document.querySelector('#seo_keywords');
            const tagify_2 = new Tagify(keyword, {
                dropdown: {
                    maxItems: 10,
                    classname: "tags-look",
                    enabled: 0,
                    closeOnSelect: false
                }
            });

            // Lắng nghe sự kiện thêm tag để cập nhật chiều cao riêng cho từng Tagify instance
            tagify_1.on('add', () => {
                adjustTagifyHeight(tagify_1.DOM.scope);
            });

            tagify_2.on('add', () => {
                adjustTagifyHeight(tagify_2.DOM.scope);
            });

            function adjustTagifyHeight(scopeElement) {
                if (scopeElement) {
                    scopeElement.style.height = "auto"; // Reset chiều cao
                    scopeElement.style.height = scopeElement.scrollHeight + "px"; // Điều chỉnh theo nội dung
                }
            }


            $("#file-1").fileinput({
                showPreview: true, // Hiển thị ảnh preview
                allowedFileExtensions: ['jpg', 'jpeg', 'png', 'gif'], // Định dạng file chấp nhận
                maxFileSize: 2000, // Kích thước file tối đa (KB)
                browseLabel: 'Chọn ảnh', // Nhãn cho nút chọn ảnh
                removeLabel: 'Xóa ảnh', // Nhãn cho nút xóa ảnh
                uploadLabel: 'Tải lên', // Nhãn cho nút tải lên
                showRemove: true, // Hiển thị nút xóa
                showUpload: false, // Ẩn nút upload (nếu bạn không cần)
                previewFileType: 'image', // Đảm bảo chỉ hiển thị file ảnh
                browseIcon: '<i class="fas fa-folder-open"></i>', // Icon cho nút chọn file
                removeIcon: '<i class="fas fa-trash"></i>' // Icon cho nút xóa file
            });
        });
    </script>
@endpush

@push('styles')
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-fileinput/css/fileinput.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/@yaireo/tagify/dist/tagify.css" rel="stylesheet" />
    <link rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css" />

    <style>
        .bootstrap-datetimepicker-widget {
            font-size: 0.875rem;
            /* Giảm kích thước font */
            max-width: 300px;
            /* Giới hạn chiều rộng */

            display: block !important;
        }

        .modal-backdrop.show {
            z-index: 1001 !important;
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
