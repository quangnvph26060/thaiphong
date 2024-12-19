<?php

namespace App\Http\Controllers\Backend;

use App\Models\Form;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class FormController extends Controller
{
    public function index()
    {
        if (request()->ajax()) {
            return datatables()->of(Form::all())
                ->addColumn('subject', function ($row) {
                    return '<a href="' . route('admin.news.edit', $row) . '" class="two-lines" aria-label="' . $row->subject . '">' . $row->subject . '</a>';
                })
                ->addColumn('created_at', function ($row) {
                    return \Carbon\Carbon::parse($row->created_at)->format('d/m/Y') . ' - ' . \Carbon\Carbon::parse($row->created_at)->locale('vi')->diffForHumans();
                })
                ->addColumn('action', function ($row) {
                    return '
                        <div class="btn-group">
                           <button class="btn btn-danger btn-sm delete-btn" data-url="' . route('admin.form.destroy', $row) . '">    <i class="fas fa-trash-alt"></i></button>
                        </div>
                    ';
                })
                ->rawColumns(['action', 'subject'])
                ->addIndexColumn()
                ->make(true);
        }
        return view('backend.form.index');
    }

    public function updateEmail(Request $request)
    {
        $credentials = Validator::make(
            $request->all(),
            [
                'email' => 'required|email',
            ],
            __('request.messages'),
            [
                'email' => 'Email',
            ]
        );

        if ($credentials->fails()) {
            return response()->json(['status' => false, 'error' => $credentials->errors()->first()]);
        }

        $envFile = base_path('.env');
        $envContent = file_get_contents($envFile);

        $envContent = preg_replace("/^MAIL_TO=.*/m", "MAIL_TO={$credentials->validated()['email']}", $envContent);

        File::put($envFile, $envContent);

        return response()->json(['status' => true, 'message' => 'Cập nhật thành công']);
    }

    public function destroy(Form $form)
    {
        $form->delete();
        return response()->json(['status' => true]);
    }
}
