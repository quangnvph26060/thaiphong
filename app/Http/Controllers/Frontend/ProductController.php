<?php

namespace App\Http\Controllers\Frontend;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Redirect;

class ProductController extends Controller
{
    public function list()
    {
        $products = Product::when(request('sort_price'), function ($query) {
            return $query->orderBy('price', request('sort_price'));
        })->when(request('sort_date'), function ($query) {
            return $query->orderBy('created_at', request('sort_date'));
        })->when(request('keyword'), function ($query) {
            return $query->where('name', 'like', '%' . request('keyword') . '%');
        })
            ->paginate(12);


        // $schema = generateListSchema($products, 'Danh sách sản phẩm');

        return view('frontend.pages.product.list', compact('products'));
    }

    public function detail($slug)
    {
        // Tìm sản phẩm theo slug
        $product = Product::where('slug', $slug)->with('category')->first();

        // Nếu không tìm thấy sản phẩm, điều hướng sang trang danh sách sản phẩm của danh mục đó
        if (!$product) {
            // Tìm danh mục tương ứng với slug
            $category = Category::where('slug', $slug)->where('status', 1)->first();

            // Nếu danh mục tồn tại, điều hướng đến trang danh sách sản phẩm của danh mục đó
            if ($category) {
                $products = Product::where('category_id', $category->id)->paginate(12);

                // dd($product);
                return view('frontend.pages.product.list', compact('products', 'category'));
            }

            // Nếu không tìm thấy danh mục tương ứng, điều hướng về trang danh sách sản phẩm mặc định
            return redirect()->route('product.list');
        }

        // Lấy các sản phẩm liên quan cùng danh mục
        $relatedProducts = Product::where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->limit(8)
            ->get();

        return view('frontend.pages.product.detail', compact('product', 'relatedProducts'));
    }

    public function download(string $id)
    {
        $product = Product::findOrFail($id);
        $pdfData = $product->file_pdf;
        $fileName = $product->file_name;

        return response()->stream(function () use ($pdfData) {
            echo $pdfData;
        }, 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'inline; filename="' . $fileName . '"',
        ]);
    }
    // attachment
}
