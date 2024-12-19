<?php

namespace App\Http\Controllers\Frontend;

use App\Models\News;
use App\Models\Slider;
use App\Models\Product;
use App\Models\Introduction;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use App\Http\Controllers\Controller;

class HomeController extends Controller
{
    public function home()
    {
        $products = Product::orderByDesc('is_hot')
            ->orderByDesc('created_at')
            ->take(8)
            ->get();


        // $introduction = Introduction::whereDate('release_date', '<=', Carbon::today())
        //     ->orderByDesc('release_date')
        //     ->first();

        $news = News::latest()->take(8)->get();

        $sliderImage = Slider::where('type', 'image')->first();

        $items = collect($sliderImage->items)
            ->sortBy('index')
            ->values()
            ->all();

        $sliderVideo = Slider::where('type', 'video')->first();

        $services = \App\Models\SupportPolicy::latest()->get();

        return view('frontend.pages.home', compact('products', 'news', 'items', 'sliderVideo', 'services'));
    }
}
