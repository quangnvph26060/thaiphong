<table id="basic-datatables" class="display table table-striped table-hover dataTable" role="grid"
    aria-describedby="basic-datatables_info">
    <thead>
        <tr>
            <th>STT</th>
            <th>Tên công ty</th>
            <th>SĐT</th>
            <th style="text-align: center">Hành động</th>
        </tr>
    </thead>
    <tbody>
        @if ($companies && $companies->count() > 0)
            @foreach ($companies as $key => $value)
                <tr>
                    <td>{{ ($companies->currentPage() - 1) * $companies->perPage() + $loop->index + 1 }}</td>
                    <td>{{ $value->name ?? '' }}</td>
                    <td>{{ $value->phone ?? '' }}</td>
                    <td style="text-align:center">
                        {{-- <a href="#" id="{{ $value->id }}" data-bs-toggle="modal" data-bs-target="#editUserModal" class="btn btn-primary editUserIcon"><i
                                class="fas fa-user-edit"></i></a> --}}
                        <a class="btn btn-warning edit-btn" href="javascript:void(0)" id="open-edit-modal"
                            data-id="{{ $value->id }}">
                            <i class="fas fa-wrench"></i>
                        </a>
                        <a href="javascript:void(0)" id="{{ $value->id }}"
                            data-url="{{ route('admin.company.delete', ['id' => $value->id]) }}"
                            class="btn btn-danger delete-btn"><i class="fas fa-trash-alt"></i></a>
                        {{-- <button id="{{ $value->id }}" class="btn btn-danger deleteUserButton"><i class="fas fa-trash-alt"></i></button> --}}
                    </td>
                </tr>
            @endforeach
        @else
            <tr>
                <td class="text-center" colspan="8">
                    <div class="">
                        Chưa có công ty
                    </div>
                </td>
            </tr>
        @endif
    </tbody>
</table>
