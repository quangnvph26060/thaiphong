<?php

namespace App\Services\Backend;

use App\Models\Category;
use Exception;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CategoryService
{
    protected $category;
    public function __construct(Category $category)
    {
        $this->category = $category;
    }

    public function getPaginatedCategory($type)
    {

        return $this->category->where('type', $type)->orderByDesc('created_at')->paginate(10);
    }

    public function getAllCompanies()
    {
        return $this->category->orderByDesc('created_at')->get();
    }

    public function addNewCategory(array $data)
    {
        try {
            DB::beginTransaction();
            $category = $this->category->create($data);

            DB::commit();
            return $category;
        } catch (Exception $e) {
            Log::error('Failed to add new category: ' . $e->getMessage());
            throw new Exception('Failed to add new category ');
        }
    }

    public function updateCategory(array $data, $id)
    {
        try {
            DB::beginTransaction();
            $category = $this->category->find($id);
            $category->update([
                'name' => $data['name'],
                'description_seo' => $data['description_seo'],
                'keyword_seo' => $data['keyword_seo'],
                'title_seo' => $data['title_seo'],
                'location' => $data['location'],
            ]);
            Cache::forget('category_product');
            DB::commit();
            return $category;
        } catch (Exception $e) {
            Log::error('Failed to update this category: ' . $e->getMessage());
            throw new Exception('Failed to update this category');
        }
    }

    public function deleteCategory($id)
    {
        try {
            DB::beginTransaction();
            $category = $this->category->findOrFail($id);
            $category->delete();
            DB::commit();
            return $category;
        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Failed to delete this category: ' . $e->getMessage());
            throw new Exception('Failed to delete this category');
        }
    }
}
