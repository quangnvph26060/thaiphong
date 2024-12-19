<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\PageConfig;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class PageConfigController extends Controller
{
    public function index(Request $request)
    {

        if ($request->ajax()) {
            DB::reconnect();
            return datatables()->of(PageConfig::select(['id', 'name', 'page_description', 'description_seo', 'title_seo', 'keyword_seo'])->get())
                ->addColumn('action', function ($row) {
                    return '
                <div class="btn-group">
                    <button class="btn btn-danger btn-sm delete-page_config-btn" data-url="' . route('admin.pageConfig.delete', $row->id) . '">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            ';
                })
                ->rawColumns(['action'])
                ->addIndexColumn()
                ->make(true);
        }
        return view('backend.page_config.index');
    }

    public function add()
    {
        return view('backend.page_config.add');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|unique:sgo_page_configs,name',
            'page_description' => 'nullable',
            'description_seo' => 'nullable',
            'title_seo' => 'nullable',
            'keyword_seo' => 'nullable',
        ], __('request.messages'), [
            'name' => 'Tên page',
        ]);

        try {
            PageConfig::create($validated);
            toastr()->success('Thêm cấu hình page mới thành công');

            return redirect()->route('admin.pageConfig.index');
        } catch (Exception $e) {
            Log::error('Failed to create new page config: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Tạo cấu hình page mới thất bại', 'error' => $e->getMessage()]);
        }
    }

    public function edit($id)
    {
        $pageConfig = PageConfig::findOrFail($id);
        return view('backend.page_config.add', compact('pageConfig'));
    }

    public function update(Request $request, $id)
    {
        $pageConfig = PageConfig::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|unique:sgo_page_configs,name,' . $id,
            'page_description' => 'nullable',
            'description_seo' => 'nullable',
            'title_seo' => 'nullable',
            'keyword_seo' => 'nullable',
        ], __('request.messages'), [
            'name' => 'Tên page'
        ]);
        try {
            $pageConfig->update($validated);
            toastr()->success('Chỉnh sửa cấu hình page thành công');
            return redirect()->route('admin.pageConfig.index');
        } catch (Exception $e) {
            Log::error('Failed to update this page config: ' . $e->getMessage());
            return redirect()->back();
        }
    }

    public function delete($id)
    {
        try {
            $pageConfig = PageConfig::findOrFail($id);
            $pageConfig->delete();
            return response()->json(['success' => true, 'message' => 'Xóa cấu hình page thành công']);
        } catch (Exception $e) {
            Log::error('Failed to delete this page config: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Xóa cấu hình page thất bại',
            ]);
        }
    }
}
