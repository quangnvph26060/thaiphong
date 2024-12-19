<?php

namespace App\Providers;

use App\Models\Category;
use App\Models\News;
use App\Models\Product;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Blade::component('frontend.components.sidebar', 'sidebar');
        Blade::component('frontend.components.breadcrumb', 'breadcrumb');

        View::composer('frontend.components.sidebar', function ($view) {
            $view->with([
                'popularNews' => News::latest('view')->limit(3)->get(),
                'latestProduct' => Product::latest()->first(),
            ]);
        });

        View::composer('*', function ($view) {
            $view->with([
                'setting' => \App\Models\Contact::first(),
                'categoryProduct' => Category::query()->where(['type' => 'products', 'status' => 1])->get()

            ]);
        });

        Paginator::useBootstrapFive();
    }
}
