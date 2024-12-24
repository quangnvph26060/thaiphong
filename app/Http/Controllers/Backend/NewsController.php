<?php

namespace App\Http\Controllers\Backend;

use App\Models\News;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Carbon\Carbon;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (request()->ajax()) {
            return datatables()->of(News::withoutGlobalScope('published')->get())
                ->addIndexColumn() // Thêm số thứ tự
                ->addColumn('status', function ($row) {
                    return '
                    <div class="radio-container">
                        <label class="toggle">
                            <input type="checkbox" class="status-change update-status" data-id="' . $row->id . '" ' . ($row->status == 'published' ? 'checked' : '') . '>
                            <span class="slider"></span>
                        </label>
                    </div>
                ';
                })
                ->addColumn('subject', function ($row) {
                    return '<a href="' . route('admin.news.edit', $row) . '" class="two-lines" aria-label="' . $row->subject . '">' . $row->subject . '</a>';
                })
                ->addColumn('posted_at', function ($row) {
                    return Carbon::parse($row->posted_at)->format('d/m/Y') . ' - ' . Carbon::parse($row->posted_at)->locale('vi')->diffForHumans();
                })
                ->addColumn('created_at', function ($row) {
                    return Carbon::parse($row->created_at)->format('d/m/Y') . ' - ' . Carbon::parse($row->created_at)->locale('vi')->diffForHumans();
                })
                ->addColumn('action', function ($row) {
                    return '
                        <div class="btn-group">
                           <button class="btn btn-danger btn-sm delete-btn" data-url="' . route('admin.news.destroy', $row->id) . '">    <i class="fas fa-trash-alt"></i></button>
                        </div>
                    ';
                })
                ->rawColumns(['status', 'action', 'subject'])
                ->make(true);
        }
        return view('backend.news.index');
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories  = Category::query()->type('posts')->latest()->pluck('name', 'id');
        return view('backend.news.create', compact('categories'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $credentials = $request->validate([
            'subject' => 'required|max:100|unique:sgo_news,subject',
            'summary' => 'nullable',
            'article' => 'nullable',
            'seo_description' => 'nullable',
            'status' => 'nullable|in:published,unpublished',
            'seo_keywords' => 'nullable',
            'featured_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'posted_at' => 'nullable|after:today',
            'seo_title' => 'nullable',
            'tags' => 'nullable',
            'category_id' => 'nullable'
        ], __('request.messages'), [
            'subject' => 'Tiêu đề',
            'summary' => 'Tóm tắt',
            'article' => 'Nội dung',
            'seo_description' => 'Mô tả seo',
            'status' => 'Trạng thái',
            'seo_keywords' => 'Từ khóa seo',
            'featured_image' => 'Ảnh đại diện',
            'posted_at' => 'Ngày đăng',
        ]);

        if (empty($request->posted_at)) $credentials['posted_at'] = Carbon::now();

        if ($request->hasFile('featured_image')) {
            $credentials['featured_image'] = saveImage($request, 'featured_image', 'news');
        }

        News::create($credentials);

        toastr()->success('Thêm bài viết thành công');

        return redirect()->route('admin.news.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(News $news)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $news = News::withoutGlobalScope('published')->findOrFail($id);
        $categories  = Category::query()->where('type', 'posts')->latest()->pluck('name', 'id');
        // dd($categories);

        return view('backend.news.edit', compact('news', 'categories'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $news = News::withoutGlobalScope('published')->findOrFail($id);

        $credentials = $request->validate([
            'subject' => 'required|max:100|unique:sgo_news,subject,' . $id,
            'summary' => 'nullable',
            'article' => 'nullable',
            'seo_description' => 'nullable',
            'status' => 'nullable|in:published,unpublished',
            'seo_keywords' => 'nullable',
            'featured_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'posted_at' => 'nullable',
            'seo_title' => 'nullable',
            'tags' => 'nullable',
            'category_id' => 'nullable|integer|exists:sgo_categories,id',
        ], __('request.messages'), [
            'subject' => 'Tiêu đề',
            'summary' => 'Tóm tắt',
            'article' => 'Nội dung',
            'seo_description' => 'Mô tả seo',
            'status' => 'Trạng thái',
            'seo_keywords' => 'Từ khóa seo',
            'featured_image' => 'Ảnh đại diện',
            'posted_at' => 'Ngày đăng',
            'category_id' => 'Danh mục bài viết'
        ]);

        if ($request->hasFile('featured_image')) {
            $credentials['featured_image'] = saveImage($request, 'featured_image', 'news');
        }

        $news->update($credentials);

        toastr()->success('Chỉnh sửa bài biết thành công.');

        return redirect()->route('admin.news.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $news = News::withoutGlobalScope('published')->findOrFail($id);

        deleteImage($news->featured_image);

        $news->delete();

        return response()->json([
            'status' => true,
            'message' => 'News item deleted successfully'
        ]);
    }

    public function changeStatus(Request $request)
    {
        $news = News::withoutGlobalScope('published')->find($request->id);

        if (!$news) {
            return response()->json([
                'status' => false,
            ]);
        }

        $news->status = 'published' == $news->status ? 'unpublished' : 'published';
        $news->save();

        return response()->json([
            'status' => true
        ]);
    }
}
