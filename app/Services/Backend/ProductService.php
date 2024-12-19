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

    public function addNewProduct(array $data)
    {
        try {
            DB::beginTransaction();

            $data['price'] = isset($data['price']) ? preg_replace('/[^\d]/', '', $data['price']) : 0;
            $data['sale_price'] = isset($data['sale_price']) ? preg_replace('/[^\d]/', '', $data['sale_price']) : 0;

            if (request()->hasFile('file_pdf')) {
                $file = request()->file('file_pdf');
                $fileName = $file->getClientOriginalName();
                $data['file_pdf'] = file_get_contents($file->getRealPath());
                $data['file_name'] = $fileName;
            }

            $product = $this->product->create($data);

            if (request()->hasFile('main_image')) { // Kiểm tra xem file có được upload hay không
                $file = request()->file('main_image'); // Lấy tệp từ request
                $mainImageName = $file->getClientOriginalName();
                $main_image = saveImage(request(), 'main_image', 'product_main_image');
            } else {
                $main_image = null; // Xử lý trường hợp không có tệp tải lên
            }

            $images = [];

            if (request()->hasFile('images')) {
                foreach (request()->file('images') as $image) {
                    $imageName = $image->getClientOriginalName();
                    $path = $image->storeAs('product_images', $imageName, 'public');
                    $images[] = $path;
                }
            }

            $product->update([
                'images' => $images,
                'main_image' => $main_image
            ]);

            DB::commit();
            return $product;
        } catch (Exception $e) {
            Log::error('Failed to add new product: ' . $e->getMessage());
            throw new Exception('Failed to add new product ');
        }
    }

    public function updateProduct(array $data, $id)
    {
        // dd($data);
        try {
            DB::beginTransaction();

            $data['price'] = isset($data['price']) ? preg_replace('/[^\d]/', '', $data['price']) : 0;
            $data['sale_price'] = isset($data['sale_price']) ? preg_replace('/[^\d]/', '', $data['sale_price']) : 0;

            $product = $this->product->find($id);

            if (isset($data['deleteAllImage'])) {

                foreach ($product->images as $image) {
                    deleteImage($image);
                }
            }



            if (request()->hasFile('file_pdf')) {
                $file = request()->file('file_pdf');
                $fileName = $file->getClientOriginalName();
                $data['file_pdf'] = file_get_contents($file->getRealPath());
                $data['file_name'] = $fileName;
            }

            // [
            //                 'name' => $data['name'],
            //                 'guarantee' => $data['guarantee'],
            //                 'price' => $price,
            //                 'status' => $data['status'],
            //                 'description' => $data['description'],
            //                 'sub_description' => $data['sub_description'],
            //                 'sale_price' => $salePrice,
            //                 'title_seo' => $data['title_seo'],
            //                 'description_seo' => $data['description_seo'],
            //                 'keyword_seo' => $data['keyword_seo'],
            //                 'category_id' => $data['category_id'],
            //                 'file_pdf' => $fileData,
            //             ]


            $product->update($data);


            $images = $product->images;
            if (request()->hasFile('images')) {
                foreach (request()->file('images') as $image) {
                    $imageName = $image->getClientOriginalName();
                    $path = $image->storeAs('product_images', $imageName, 'public');
                    $images[] = $path;
                }
            } else {
                $images = $product->images; // Giữ lại ảnh cũ nếu không có ảnh mới
            }

            if (request()->hasFile('main_image')) {
                deleteImage($product->main_image);
                $main_image = saveImage(request(), 'main_image', 'product_main_image');
            } else {
                $main_image = $product->main_image; // Giữ lại ảnh đại diện cũ
            }

            $product->update([
                'images' => $images,
                'main_image' => $main_image,
            ]);

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
