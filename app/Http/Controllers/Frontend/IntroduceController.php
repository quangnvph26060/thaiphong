<?php

namespace App\Http\Controllers\Frontend;

use App\Models\PageConfig;
use App\Models\Introduction;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use App\Http\Controllers\Controller;

class IntroduceController extends Controller
{
    public function introduce(){
        // $introduction = Introduction::whereDate('release_date', '<=', Carbon::today())
        // ->orderByDesc('release_date')
        // ->first();
        $introduction = PageConfig::find(1);
        return view('frontend.pages.introduce', compact('introduction'));
    }
}
