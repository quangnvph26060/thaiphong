<table id="basic-datatables" class="display table table-striped table-hover dataTable" role="grid"
    aria-describedby="basic-datatables_info">
    <thead>
        <tr>
            <th>STT</th>
            <th>Tên</th>
            <th>Bảo hành</th>
            <th>Giá</th>
            <th>Giá khuyến mãi</th>
            <th>Trạng thái</th>
            <th style="text-align: center">Hành động</th>
        </tr>
    </thead>
    <tbody>
        @if ($products && $products->count() > 0)
            @foreach ($products as $key => $value)
                <tr>
                    <td>{{ ($products->currentPage() - 1) * $products->perPage() + $loop->index + 1 }}
                    </td>
                    <td>{{ $value->name ?? '' }}</td>
                    <td>{{ $value->guarantee ?? '' }} tháng</td>
                    <td>{{ number_format($value->price) ?? '' }}</td>
                    <td>{{ number_format($value->sale_price ?? '') }}</td>
                    <td>
                        @if ($value->status == 1)
                            Còn hàng
                        @else
                            Hết hàng
                        @endif
                    </td>
                    <td style="text-align:center">
                        {{-- <a href="#" id="{{ $value->id }}" data-bs-toggle="modal" data-bs-target="#editUserModal" class="btn btn-primary editUserIcon"><i
                                class="fas fa-user-edit"></i></a> --}}
                        <a class="btn btn-warning edit-btn"
                            href="{{ route('admin.product.detail', ['id' => $value->id]) }}">
                            <i class="fas fa-wrench"></i>
                        </a>
                        <a href="javascript:void(0)" id="{{ $value->id }}"
                            data-url="{{ route('admin.product.delete', ['id' => $value->id]) }}"
                            class="btn btn-danger delete-btn"><i class="fas fa-trash-alt"></i></a>
                        {{-- <button id="{{ $value->id }}" class="btn btn-danger deleteUserButton"><i class="fas fa-trash-alt"></i></button> --}}
                    </td>
                </tr>
            @endforeach
        @else
            <tr>
                <td class="text-center" colspan="8">
                    <div class="">
                        Chưa có sản phẩm
                    </div>
                </td>
            </tr>
        @endif
    </tbody>
</table>
