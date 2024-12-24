<?php

namespace App\Http\Controllers\Backend;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\Backend\ContactService;

class ContactController extends Controller
{

    public function __construct(protected ContactService $contactService) {}

    public function show()
    {
        $data = $this->contactService->show();

        return view('backend.contact.show', compact('data'));
    }
    public function update(Request $request)
    {
        // dd($request->all());
        // , 'regex:/^0[0-9]{9}$/'
        $request->validate(
            [
                'name' => 'nullable',
                'email' => 'required|email',
                'phone' => 'required',
                'company' => 'required',
                'address' => 'required',
                'fanpage' => 'nullable',
                'youtube' => 'nullable',
                'sort_description' => 'nullable|max:100',
                'map' => 'nullable',
                'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
                'icon' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
                'company_logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
                'seo_title' => 'nullable|',
                'seo_description' => 'nullable|',
                'seo_keywords' => 'nullable',
                'copyright' => 'nullable',
                'working_time' => 'nullable',
                'header_top' => 'nullable',
                'introduct_title' => 'nullable',
                'introduction' => 'nullable',
            ],
            __('request.messages'),
            [
                'name' => 'Chủ sở hữu',
                'email' => 'Email',
                'phone' => 'Số điện thoại',
                'company' => 'Tên công ty',
                'address' => 'Địa chỉ',
                'fanpage' => 'Fanpage',
                'youtube' => 'Youtube',
                'sort_description' => 'Mô tả ngắn',
                'map' => 'Bản đồ',
                'logo' => 'Logo',
                'icon' => 'Icon',
                'company_logo' => 'Logo công ty',
                'seo_title' => 'Tiêu đề seo',
                'seo_description' => 'Mô tả seo',
                'seo_keywords' => 'Từ khóa seo',
                'copyright' => 'Copyright',
                'working_time' => 'Thời gian làm việc',
                'header_top' => 'Tiều đề đầu trang',
            ]
        );

        $this->contactService->update();

        return back();
    }
}
