<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SliderController extends Controller
{

    public function index()
    {
        $sliders = \App\Models\Slider::latest()->get();
        return view('backend.slider.index', compact('sliders'));
    }
    public function create($type)
    {
        $sliders = \App\Models\Slider::where('type', $type)->first();

        if ($type == 'image') {
            return view('backend.slider.create-image', compact('type', 'sliders'));
        }

        return view('backend.slider.create-video', compact('type', 'sliders'));
    }
    public function store(Request $request, $type)
    {
        switch ($type) {
            case 'image':
                return $this->storeImage($request, $type);
            case 'video':
                return $this->storeVideo($request, $type);
        }
    }

    private function storeImage(Request $request, $type)
    {
        $data = Validator::make($request->all(), [
            'slider' => 'nullable|array',
            'slider.*' => 'image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',

            'link' => 'nullable|array',
            'link.*' => 'nullable|url',

            'alt' => 'nullable|array',
            'alt.*' => 'nullable|string',

            'index' => 'required|array',
            'index.*' => 'integer',
        ], __('request.messages'));

        if ($data->fails()) {
            return response()->json([
                'status' => false,
                'message' => $data->errors()->first()
            ]);
        }

        $credentials = $data->validated();

        // dd($credentials);

        // Lấy dữ liệu cũ từ cơ sở dữ liệu
        $existingSlider = \App\Models\Slider::where('type', $type)->first();
        $existingItems = $existingSlider ? $existingSlider->items : [];

        $array = [];
        foreach ($credentials['index'] as $key => $index) {
            $array[$key]['slider'] = isset($credentials['slider'][$key])
                ? $credentials['slider'][$key]->store('slider') // Lưu ảnh mới nếu có
                : ($existingItems[$key]['slider'] ?? null); // Giữ ảnh cũ nếu không có ảnh mới

            $array[$key]['link'] = $credentials['link'][$key];
            $array[$key]['alt'] = $credentials['alt'][$key];
            $array[$key]['index'] = $index;
        }

        \App\Models\Slider::updateOrCreate(
            ['type' => $type],
            ['items' => $array]
        );

        toastr()->success('Lưu thông tin thành công');

        return response()->json([
            'status' => true,
        ]);
    }


    private function storeVideo($request, $type)
    {
        $data = Validator::make($request->all(), [
            'links' => 'required|array',
            'links.*' => 'required',
        ], __('request.messages'));

        if ($data->fails()) {

            return response()->json([
                'status' => false,
                'message' => $data->errors()->first()
            ]);
        }

        $credentials = $data->validated();

        \App\Models\Slider::updateOrCreate([
            'type' => $type,
        ], [
            'items' => $credentials,
        ]);


        return response()->json([
            'status' => true,
            'message' => 'Thêm trình chiếu video thành công'
        ]);
    }
}
