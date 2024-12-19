<table id="basic-datatables" class="display table table-striped table-hover dataTable" role="grid"
    aria-describedby="basic-datatables_info">
    <thead>
        <tr>
            <th>STT</th>
            <th>Tên danh mục</th>
            @if (request('type') == 'products')
                <th>Vị trí hiển thị</th>
                <th>Hiển thị trang chủ</th>
            @endif
            <th style="text-align: center">Hành động</th>
        </tr>
    </thead>
    <tbody>
        @if ($categories && $categories->count() > 0)
            @foreach ($categories as $key => $value)
                <tr>
                    <td>{{ ($categories->currentPage() - 1) * $categories->perPage() + $loop->index + 1 }}</td>
                    <td>{{ $value->name ?? '' }}</td>
                    @if (request('type') == 'products')
                        <td>{{ $value->location ?? 'NaN' }}</td>
                        <td>
                            <label class="switch">
                                <input type="checkbox" class="toggle-status" data-id="{{ $value->id }}"
                                    {{ $value->is_show_home == 1 ? 'checked' : '' }}>
                                <span class="slider round"></span>
                            </label>
                        </td>
                    @endif
                    <td style="text-align:center">
                        {{-- <a href="#" id="{{ $value->id }}" data-bs-toggle="modal" data-bs-target="#editUserModal" class="btn btn-primary editUserIcon"><i
                                class="fas fa-user-edit"></i></a> --}}
                        <a class="btn btn-warning edit-category-btn" href="javascript:void(0)"
                            id="open-edit-category-modal" data-id="{{ $value->id }}">
                            <i class="fas fa-wrench"></i>
                        </a>
                        <a href="javascript:void(0)" id="{{ $value->id }}"
                            data-url="{{ route('admin.category.delete', ['id' => $value->id]) }}"
                            class="btn btn-danger delete-category-btn"><i class="fas fa-trash-alt"></i></a>
                        {{-- <button id="{{ $value->id }}" class="btn btn-danger deleteUserButton"><i class="fas fa-trash-alt"></i></button> --}}
                    </td>
                </tr>
            @endforeach
        @else
            <tr>
                <td class="text-center" colspan="8">
                    <div class="">
                        Chưa có danh mục
                    </div>
                </td>
            </tr>
        @endif
    </tbody>
</table>
