<?php

namespace App\Http\Controllers\Frontend;

use App\Models\Form;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use App\Mail\SenMailNotification;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    public function contact($slug = null)
    {

        $product = null;

        if ($slug) {
            $product = Product::where('slug', $slug)->first();
        }

        return view('frontend.pages.contact', compact('product'));
    }

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:3|max:255',
            'email' => 'required|email',
            'phone' => ['required', 'regex:/^(03|05|07|08|09)[0-9]{8}$/'],
            'message' => $request->message ? 'max:150|min:10' : 'nullable',
        ], __('request.messages'), [
            'name' => 'Họ và tên',
            'email' => 'Email',
            'phone' => 'Số điện thoại',
            'message' => 'Tin nhắn'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()->first()
            ]);
        }

        $credentials = $validator->validated();

        $recentContact = Form::where([
            'phone' => $credentials['phone'],
            'email' => $credentials['email'],
        ])
            ->where('created_at', '>=', Carbon::now()->subMinutes(5))
            ->first();

        if ($recentContact) {
            return response()->json([
                'success' => false,
                'message' => 'Bạn đã gửi liên hệ trong vòng 5 phút trước. Vui lòng chờ thêm.',
            ]);
        }

        $credentials['created_at'] = Carbon::now();

        DB::beginTransaction();
        try {
            $contact = Form::updateOrCreate(
                ['phone' => $credentials['phone'], 'email' => $credentials['email']],
                $credentials
            );

            $email = config('mail.to');
            Mail::to($email)->send(new SenMailNotification($contact));

            DB::commit();

            return response()->json(['message' => 'Cám ơn bạn đã gửi thông tin. Chúng tôi sẽ liên hệ bạn sớm nhất!', 'success' => true]);
        } catch (\Exception $e) {
            Log::info($e->getMessage());
            DB::rollBack();
            return response()->json(['message' => 'Đã gửi tin nhắn liên hệ thất bại', 'success' => false]);
        }
    }
}
