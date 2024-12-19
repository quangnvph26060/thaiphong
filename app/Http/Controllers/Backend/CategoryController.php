<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Services\Backend\CategoryService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CategoryController extends Controller
{
    protected $categoryService;
    public function __construct(CategoryService $categoryService)
    {
        $this->categoryService = $categoryService;
    }

    public function search(Request $request)
    {
        try {
            $query = $request->query('query');
            // $clients = Category::where('name', 'LIKE', "%{$query}%")
            //     ->orWhere('phone', 'LIKE', "%{$query}%")
            //     ->get();
            $categories = Category::where('name', 'LIKE', "%{$query}%")->orderByDesc('created_at')->get();

            return response()->json(['success' => true, 'categories' => $categories]);
        } catch (Exception $e) {
            Log::error("Failed to search clients: " . $e->getMessage());
            return response()->json(['error' => 'Failed to search clients'], 500);
        }
    }

    public function index(Request $request)
    {


        $type = $request->input('type');


        $categories = $this->categoryService->getPaginatedCategory($type);

        if ($request->ajax()) {
            return response()->json([
                'html' => view('backend.category.table', compact('categories'))->render(),
                'pagination' => $categories->links('vendor.pagination.custom')->render(),
            ]);
        }

        return view('backend.category.index', compact('categories'));
    }


    public function update(Request $request, $id)
    {
        $request->validate(
            [
                'name' => 'required|unique:sgo_categories,name,' . $id,
                'title_seo' => 'nullable',
                'keyword_seo' => 'nullable',
                'description_seo' => 'nullable',
                'location' => 'nullable'
            ],
            __('request.messages'),
            [
                'name' => 'Tên danh mục',
                'title_seo' => 'Tiêu đề SEO',
                'description_seo' => 'Mô tả SEO',
                'keyword_seo' => 'Từ khóa SEO',
                'location' => 'Vị trí' . $id . 'Đã tồn tại',
            ]
        );

        try {
            $category = $this->categoryService->updateCategory($request->all(), $id);

            $categories = $this->categoryService->getPaginatedCategory($category->type);

            $html = view('backend.category.table', compact('categories'))->render();
            $pagination = $categories->links('vendor.pagination.custom')->render();
            return response()->json([
                'success' => true,
                'message' => 'Cập nhật danh mục thành công',
                'html' => $html,
                'pagination' => $pagination
            ]);
        } catch (Exception $e) {
            Log::error("Failed to update this Category: " . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Cập nhật danh mục thất bại']);
        }
    }

    public function store(Request $request)
    {
        $request->validate(
            [
                'name' => 'required|unique:sgo_categories,name',
                'title_seo' => 'nullable|max:100',
                'keyword_seo' => 'nullable',
                'description_seo' => 'nullable',
                'status' => 'nullable',
                'location' => 'nullable'
            ],
            __('request.messages'),
            [
                'name' => 'Tên danh mục',
                'title_seo' => 'Tiêu đề SEO',
                'description_seo' => 'Mô tả SEO',
                'keyword_seo' => 'Từ khóa SEO',
                'status' => 'Trạng thái',
                'location' => 'Vị trí hiển thị',
            ]
        );

        try {
            $category = $this->categoryService->addNewCategory($request->all());

            // Lấy lại danh sách danh mục để cập nhật bảng
            $categories = $this->categoryService->getPaginatedCategory($category->type); // Hàm này sẽ trả về danh sách danh mục phân trang

            $html = view('backend.category.table', compact('categories'))->render();
            $pagination = $categories->links('vendor.pagination.custom')->render();

            return response()->json([
                'success' => true,
                'message' => 'Thêm danh mục mới thành công',
                'html' => $html,
                'pagination' => $pagination,
            ]);
        } catch (Exception $e) {
            Log::error('Failed to add new Category: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Thêm danh mục thất bại',
            ]);
        }
    }


    public function delete($id)
    {

        try {

            $cate =  $this->categoryService->deleteCategory($id);
            // Lấy danh sách danh mục cập nhật sau khi xóa
            $categories = $this->categoryService->getPaginatedCategory($cate->type);

            $html = view('backend.category.table', compact('categories'))->render();
            $pagination = $categories->links('vendor.pagination.custom')->render();

            return response()->json([
                'success' => true,
                'message' => 'Xóa danh mục thành công',
                'html' => $html,
                'pagination' => $pagination,
            ]);
        } catch (Exception $e) {
            Log::error('Failed to delete this Category: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Xóa danh mục thất bại',
            ]);
        }
    }


    public function detail($id)
    {
        try {
            $category = Category::find($id);
            return response()->json($category);
        } catch (Exception $e) {
            Log::error('Failed to find this Category: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Tìm danh mục thất bại']);
        }
    }

    public function updateCategoryStatus(Request $request)
    {
        try {
            $category = Category::findOrFail($request->id);
            $category->is_show_home = !$category->is_show_home;

            $category->save();
            return response()->json(['success' => true, 'message' => 'Cập nhật danh mục thành công']);
        } catch (Exception $e) {
            Log::error('Failed to update category status: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Cập nhật danh mục thất bại']);
        }
    }
}
