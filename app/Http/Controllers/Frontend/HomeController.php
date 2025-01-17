<?php

namespace App\Http\Controllers\Frontend;

use App\Models\News;
use App\Models\Slider;
use App\Models\Product;
use App\Models\Introduction;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use App\Http\Controllers\Controller;
use App\Models\Category;

class HomeController extends Controller
{
    public function home()
    {
        // $products = Product::orderByDesc('is_hot')
        //     ->orderByDesc('created_at')
        //     ->take(8)
        //     ->get();

        $catalogues = Category::whereHas('product')
            ->orderByRaw('ISNULL(location), location ASC')
            ->where([
                'is_show_home' => 1,
                'type' => 'products',
            ])
            ->with(['product' => function ($query) {
                $query->orderBy('display_position', 'asc')->latest();
            }])
            ->get();

        // Giới hạn mỗi danh mục chỉ chứa 10 sản phẩm
        $catalogues->each(function ($catalogue) {
            $catalogue->setRelation('product', $catalogue->product->take(10));
        });



        // $catalogues = Category::with('product')->orderBy('location')->get();



        // $introduction = Introduction::whereDate('release_date', '<=', Carbon::today())
        //     ->orderByDesc('release_date')
        //     ->first();

        $news = News::latest()->take(8)->get();

        $sliderImage = Slider::where('type', 'image')->first();

        $items = collect($sliderImage->items)
            ->sortBy('index')
            ->values()
            ->all();

        return view('frontend.pages.home', compact('catalogues', 'news', 'items'));
    }
}
