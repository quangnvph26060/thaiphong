@extends('backend.layout.index')
@section('title', 'Danh sách sản phẩm')

@section('content')
    <div class="card">
        <div class="card-header d-flex justify-content-between">
            <h4 class="card-title">Danh sách sản phẩm</h4>
            <div class="card-tools">
                <a href="{{ route('admin.product.add') }}" class="btn btn-primary btn-sm">Thêm mới sản phẩm (+)</a>
            </div>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table id="myTable" class="display" style="width:100%">
                    <thead>
                        <th>STT</th>
                        <th>Tên</th>
                        <th>Danh mục</th>
                        <th>Bảo hành</th>
                        <th>Giá</th>
                        <th>Vị trí hiển thị</th>
                        <th>Ngày tạo</th>
                        <th style="text-align: center">Hành động</th>
                    </thead>


                </table>
            </div>
        </div>
    </div>
@endsection


@push('scripts')
    <script src="https://cdn.datatables.net/2.1.8/js/dataTables.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.14.5/dist/sweetalert2.all.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>

    <script>
        $(document).ready(function() {
            $('#myTable').DataTable({
                // dom: 'Bfrtip',
                // buttons: [
                //     'excel', 'pdf'
                // ],
                processing: true,
                serverSide: true,
                ajax: '{{ route('admin.product.index') }}',
                columns: [{
                        data: 'DT_RowIndex',
                        name: 'DT_RowIndex',
                        orderable: false,
                        searchable: false,
                        width: '5%'
                    },
                    {
                        data: 'name',
                        name: 'name',
                        render: function(data, type, row) {
                            return '<a href="' + '{{ route('admin.product.detail', '__id__') }}'
                                .replace('__id__', row.id) + '">' + data + '</a>';
                        },
                        width: '25%'
                    },
                    {
                        data: 'category_id',
                        name: 'category_id'
                    },
                    {
                        data: 'guarantee',
                        name: 'guarantee',
                        searchable: false
                    },
                    {
                        data: 'price',
                        name: 'price'
                    },
                    {
                        data: 'display_position',
                        name: 'display_position',
                    },
                    {
                        data: 'created_at',
                        name: 'created_at',
                    },
                    {
                        data: 'action',
                        name: 'action',
                        orderable: false
                    },

                ],

                order: [],
            });

            $(document).on('click', '.delete-btn', function() {
                let url = $(this).data('url');

                Swal.fire({
                    title: 'Xác nhận',
                    text: "Bạn có chắc chắn muốn xóa sản phẩm này?",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Có, xóa!',
                    cancelButtonText: 'Không'
                }).then((result) => {
                    if (result.isConfirmed) {
                        $.ajax({
                            url: url,
                            type: 'DELETE',
                            success: function(response) {
                                if (response.status) {
                                    $('#myTable').DataTable().ajax.reload();
                                    const Toast = Swal.mixin({
                                        toast: true,
                                        position: "top-end",
                                        showConfirmButton: false,
                                        timer: 3000,
                                        timerProgressBar: true,
                                        didOpen: (toast) => {
                                            toast.onmouseenter = Swal
                                                .stopTimer;
                                            toast.onmouseleave = Swal
                                                .resumeTimer;
                                        }
                                    });
                                    Toast.fire({
                                        icon: "success",
                                        title: response.message
                                    });
                                } else {
                                    const Toast = Swal.mixin({
                                        toast: true,
                                        position: "top-end",
                                        showConfirmButton: false,
                                        timer: 3000,
                                        timerProgressBar: true,
                                        didOpen: (toast) => {
                                            toast.onmouseenter = Swal
                                                .stopTimer;
                                            toast.onmouseleave = Swal
                                                .resumeTimer;
                                        }
                                    });
                                    Toast.fire({
                                        icon: "error",
                                        title: response.message
                                    });
                                }
                            },
                            error: function(xhr) {
                                const Toast = Swal.mixin({
                                    toast: true,
                                    position: "top-end",
                                    showConfirmButton: false,
                                    timer: 3000,
                                    timerProgressBar: true,
                                    didOpen: (toast) => {
                                        toast.onmouseenter = Swal
                                            .stopTimer;
                                        toast.onmouseleave = Swal
                                            .resumeTimer;
                                    }
                                });
                                Toast.fire({
                                    icon: "error",
                                    title: response.message
                                });
                            }
                        });
                    }
                });
            })

            $(document).on('change', '.update-status', function() {

                function showToast(icon, title) {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    });
                    Toast.fire({
                        icon: icon,
                        title: title
                    });
                }

                const id = $(this).data('id');

                let checkbox = $(this);
                let isChecked = checkbox.is(':checked');

                let newStatus = isChecked ? 1 : 0;

                $.ajax({
                    url: '{{ route('admin.product.change.is-hot') }}',
                    type: 'POST',
                    data: {
                        id: id,
                    },
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    success: function(response) {
                        if (response.status) {
                            // $('#myTable').DataTable().ajax.reload();

                            toastr.success(response.message);

                        } else {
                            checkbox.prop('checked', !isChecked);

                            toastr.success('Có lỗi xảy ra. Vui lòng thử lại!');
                        }
                    },
                    error: function() {
                        toastr.success('Có lỗi xảy ra. Vui lòng thử lại!');
                    }
                });
            });

            $(document).on('click', '.edit-position', function() {
                var id = $(this).data('id');

                // Ẩn icon và span hiển thị, hiển thị input
                $('[data-id="' + id + '"]').hide(); // Ẩn giá trị và icon
                $('[data-id="' + id + '"]').siblings('input').show(); // Hiển thị ô input
            });

            // Khi người dùng thay đổi giá trị và nhấn Enter hoặc blur khỏi input
            $(document).on('blur', '.edit-input', function() {
                var id = $(this).data('id');
                var newValue = $(this).val();

                // Gửi dữ liệu mới về server để cập nhật vào cơ sở dữ liệu
                $.ajax({
                    url: '{{ route('admin.product.updateDisplayPosition') }}', // Đường dẫn bạn sẽ xử lý cập nhật
                    method: 'POST',
                    data: {
                        id: id,
                        display_position: newValue,
                        _token: $('meta[name="csrf-token"]').attr('content') // CSRF token
                    },
                    success: function(response) {
                        if (response.success) {
                            console.log(id);

                            console.log($(`.display-position-value-${id}`));

                            // Cập nhật lại giá trị hiển thị sau khi cập nhật thành công
                            $(`.display-position-value-${id}`).text(newValue)
                                .show(); // Hiển thị lại giá trị mới

                            $('[data-id="' + id + '"]').siblings('button.edit-position')
                                .show(); // Hiển thị lại icon chỉnh sửa

                            $('[data-id="' + id + '"]').siblings('input').hide(); // Ẩn ô input
                        } else {
                            alert('Cập nhật không thành công!');
                        }
                    },
                    error: function() {
                        alert('Có lỗi xảy ra!');
                    }
                });
            });

        })
    </script>
@endpush

@push('styles')
    <link rel="stylesheet" href="https://cdn.datatables.net/2.1.8/css/dataTables.dataTables.css" />
    <link href="https://cdn.jsdelivr.net/npm/sweetalert2@11.14.5/dist/sweetalert2.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css">
    <style>
        table tr td:last-child {
            text-align: center;
        }
    </style>
@endpush
