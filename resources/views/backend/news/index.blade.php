@extends('backend.layout.index')

@section('title', 'Danh sách bài viết')

@section('content')
    <div class="card">
        <div class="card-header d-flex justify-content-between">
            <h4 class="card-title">Danh sách bài viết</h4>
            <div class="card-tools">
                <a href="{{ route('admin.news.create') }}" class="btn btn-primary btn-sm">Tạo bài viết</a>
            </div>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table id="myTable" class="display" style="width:100%">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Tiêu đề</th>
                            <th>Lượt xem</th>
                            <th>Ngày đăng</th>
                            <th>Trạng thái</th>
                            <th>Ngày tạo</th>
                            <th style="text-align: center">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
    <script src="https://cdn.datatables.net/2.1.8/js/dataTables.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.14.5/dist/sweetalert2.all.min.js"></script>

    <script>
        $(document).ready(function() {
            $('#myTable').DataTable({
                processing: true,
                serverSide: true,
                ajax: '{{ route('admin.news.index') }}',
                columns: [{
                        data: 'DT_RowIndex', // Đây là số thứ tự
                        name: 'DT_RowIndex',
                        orderable: false,
                        searchable: false,
                    },
                    {
                        data: 'subject',
                        name: 'subject'
                    },
                    {
                        data: 'view',
                        name: 'view'
                    },
                    {
                        data: 'posted_at',
                        name: 'posted_at'
                    },
                    {
                        data: 'status',
                        name: 'status',
                        orderable: false,
                    },
                    {
                        data: 'created_at',
                        name: 'created_at'
                    },
                    {
                        data: 'action',
                        name: 'action',
                        orderable: false
                    }
                ],
                columnDefs: [{
                    targets: 6,
                    orderable: false
                }],
                order: [
                    [0, 'desc']
                ],
            });

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

                Swal.fire({
                    title: 'Xác nhận',
                    text: "Bạn có chắc chắn muốn ẩn bài viết này?",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Có, cập nhật!',
                    cancelButtonText: 'Không'
                }).then((result) => {
                    if (result.isConfirmed) {
                        $.ajax({
                            url: '{{ route('admin.news.change-status') }}',
                            type: 'POST',
                            data: {
                                id: id,
                            },
                            headers: {
                                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                            },
                            success: function(response) {
                                if (response.status) {
                                    $('#myTable').DataTable().ajax.reload();

                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Thành công',
                                        text: response.message,
                                    });

                                } else {
                                    checkbox.prop('checked', !isChecked);
                                    Swal.fire('Lỗi!',
                                        'Có lỗi xảy ra. Vui lòng thử lại!',
                                        'error');
                                }
                            },
                            error: function() {
                                Swal.fire('Lỗi!', 'Có lỗi xảy ra. Vui lòng thử lại.',
                                    'error');
                            }
                        });
                    } else {
                        checkbox.prop('checked', !isChecked);
                    }
                });
            });

            $(document).on('click', '.delete-btn', function() {
                let url = $(this).data('url');

                Swal.fire({
                    title: 'Xác nhận',
                    text: "Bạn có chắc chắn muốn xóa bài viết?",
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
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Thành công',
                                        text: response.message,
                                    })
                                } else {
                                    Swal.fire('Lỗi!',
                                        'Có lỗi xảy ra. Vui lòng thử lại sau!',
                                        'error');
                                }
                            },
                            error: function(xhr) {
                                console.log(xhr.responseText);
                            }
                        });
                    }
                });
            })
        })
    </script>
@endpush

@push('styles')
    <link rel="stylesheet" href="https://cdn.datatables.net/2.1.8/css/dataTables.dataTables.css" />
    <link href="https://cdn.jsdelivr.net/npm/sweetalert2@11.14.5/dist/sweetalert2.min.css" rel="stylesheet">

  
@endpush
