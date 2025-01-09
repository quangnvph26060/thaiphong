<?php

namespace App\Services\Backend;

use App\Models\Product;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ProductService
{
    protected $product;
    public function __construct(Product $product)
    {
        $this->product = $product;
    }

    public function getPaginatedProduct()
    {
        return $this->product->orderByDesc('created_at')->paginate(10);
    }

    public function getAllProduct()
    {
        return $this->product->orderByDesc('created_at')->get();
    }

    public function addNewProduct($data)
    {
        try {
            DB::beginTransaction();

            $credentials = $data->toArray();

            if ($data->hasFile('file_pdf')) {
                $file = $data->file('file_pdf');
                $fileName = $file->getClientOriginalName();
                $credentials['file_pdf'] = file_get_contents($file->getRealPath());
                $credentials['file_name'] = $fileName;
            }

            if (!$credentials['guarantee']) {
                $credentials['guarantee'] = '12 tháng';
            }

            if (!$credentials['status']) {
                $credentials['status'] = 'Mới 100%';
            }

            if (!$credentials['manufacturer']) {
                $credentials['manufacturer'] = 'Trung Quốc';
            }

            if ($data->hasFile('main_image')) {
                $credentials['main_image'] = saveImage($data, 'main_image', 'product_main_image');
            }

            if ($data->hasFile('images')) {
                $credentials['images'] = saveImagesWithoutResize($data, 'images', 'product_images', true);
            }

            $product = $this->product->create($credentials);

            DB::commit();
            return $product;
        } catch (Exception $e) {
            Log::error('Failed to add new product: ' . $e->getMessage());
            throw new Exception('Failed to add new product ');
        }
    }

    public function updateProduct($data, $id)
    {
        try {
            DB::beginTransaction();

            $credentials = $data->toArray();

            $product = $this->product->find($id);

            $credentials['images'] = [];

            if ($data->old) {
                foreach ($product->images ?? [] as $key => $item) {
                    if (isset($data->old[$key])) {
                        $credentials['images'][] = $item;
                    } else {
                        deleteImage($item);
                    }
                }
            }

            if ($data->hasFile('file_pdf')) {
                $file = $data->file('file_pdf');
                $fileName = $file->getClientOriginalName();
                $data['file_pdf'] = file_get_contents($file->getRealPath());
                $data['file_name'] = $fileName;
            }

            if ($data->hasFile('images')) {
                $newImages = saveImagesWithoutResize($data, 'images', 'product_images', true);
                $credentials['images'] = array_merge($credentials['images'] ?? [], $newImages);
            }

            if ($data->hasFile('main_image')) {
                deleteImage($product->main_image);
                $credentials['main_image'] = saveImage($data, 'main_image', 'product_main_image');
            }

            $product->update($credentials);

            DB::commit();
            return $product;
        } catch (Exception $e) {
            Log::error('Failed to update this product: ' . $e->getMessage());
            throw new Exception('Failed to update this product');
        }
    }

    public function deleteProduct($id)
    {
        try {
            DB::beginTransaction();
            $product = $this->product->findOrFail($id);

            // Kiểm tra xem images có tồn tại và là mảng không
            if (is_array($product->images)) {
                foreach ($product->images as $image) {
                    deleteImage($image);  // Giả sử deleteImage xử lý từng hình ảnh
                }
            }

            if ($product->main_image) {
                deleteImage($product->main_image);
            }

            $product->delete();
            DB::commit();
            return $product;
        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Xóa sản phẩm thất bại: ' . $e->getMessage());
            throw new Exception('Xóa sản phẩm thất bại');
        }
    }
}
