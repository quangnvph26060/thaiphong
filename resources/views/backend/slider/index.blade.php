@extends('backend.layout.index')
@section('title', 'Danh sách trình chiếu')

@section('content')
    <div class="card">
        <div class="card-header">
            <h4 class="card-title">Danh sách trình chiếu</h4>

        </div>

        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-hover table-striped table-vcenter text-nowrap mb-0">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Kiểu</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($sliders as $item)
                            <tr>
                                <td>{{ $loop->iteration }}</td>
                                <td>{{ $item->type == 'image' ? 'Trình chiếu hình ảnh' : 'Trình chiếu video' }}</td>
                                <td>
                                    @if ($item->type == 'image')
                                    <a href="{{ route('admin.slider.create', 'image') }}" class="btn btn-primary btn-sm"><i class="fas fa-image me-2"></i>Chỉnh sửa trình chiếu hình ảnh (+)</a>
                                    @else
                                    <a href="{{ route('admin.slider.create', 'video') }}" class="btn btn-primary btn-sm"><i class="fas fa-video me-2"></i>Chỉnh sửa trình chiếu video (+)</a>
                                    @endif
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
@endsection
