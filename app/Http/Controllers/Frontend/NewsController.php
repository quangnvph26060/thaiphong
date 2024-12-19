<?php

namespace App\Http\Controllers\Frontend;

use App\Models\News;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class NewsController extends Controller
{
    public function list()
    {
        $news = News::latest()->paginate(3);
        return view('frontend.pages.news.list', compact('news'));
    }

    public function detail($slug)
    {
        $news = News::where('slug', $slug)->firstOrFail();

        $relatedNews = News::where('id', '!=', $news->id)->latest()->limit(5)->get();

        $news->increment('view');

        return view('frontend.pages.news.detail', compact('news', 'relatedNews'));
    }
}
