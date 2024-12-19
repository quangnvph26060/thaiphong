@extends('backend.layout.index')

@section('title', 'Thông tin liên hệ')


@section('content')
    <div class="card">
        <div class="card-header d-flex justify-content-between">
            <h4 class="card-title">Danh sách khách hàng</h4>
            <div class="card-tools">
                <form action="" method="post" style="width: 300px" id="email-form">
                    <div class="input-group d-flex">
                        <input type="text" name="email" id="email" value="{{ env('MAIL_TO') }}"
                            placeholder="Nhập email nhận thông báo" class="form-control">
                        <button type="submit" class="btn btn-primary btn-sm">Lưu</button>
                    </div>
                </form>
            </div>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table id="myTable" class="display" style="width:100%">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Họ tên</th>
                            <th>Email</th>
                            <th>Số điện thoại</th>
                            <th>Tin nhắn</th>
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
                ajax: '{{ route('admin.form.index') }}',
                columns: [{
                        data: 'DT_RowIndex',
                        name: 'DT_RowIndex',
                        orderable: false,
                        searchable: false,
                    },
                    {
                        data: 'name',
                        name: 'name'
                    },
                    {
                        data: 'email',
                        name: 'email'
                    },
                    {
                        data: 'phone',
                        name: 'phone',
                    },
                    {
                        data: 'message',
                        name: 'message',
                        orderable: false,
                        width: '300px'
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

            $('#email-form').submit(function(e) {
                e.preventDefault();
                var email = $('#email').val();
                $.ajax({
                    url: $(this).attr('action'),
                    type: 'POST',
                    data: {
                        email
                    },
                    success: function(response) {
                        if (response.status) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Thành công',
                                text: response.message,
                            })

                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Thất bại',
                                text: response.error,
                            })
                        }
                    },
                    error: function(error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Thất bại',
                            text: response.message,
                        })
                    }
                })
            });

            $(document).on('click', '.delete-btn', function(e) {
                e.preventDefault();
                let url = $(this).data('url');


                Swal.fire({
                    title: 'Xác nhận',
                    text: " có chắc chắn muốn xóa khách hàng tiềm năng này không?",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Có, xóa!',
                    cancelButtonText: 'Không',
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
                                    });
                                } else {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Thất bại',
                                        text: response.message,
                                    })
                                }

                            },
                            error: function(xhr) {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Thất bại',
                                    text: response.message,
                                })
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
