<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Services\Backend\CompanyService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CompanyController extends Controller
{
    protected $companyService;
    public function __construct(CompanyService $companyService)
    {
        $this->companyService = $companyService;
    }

    public function search(Request $request)
    {
        try {
            $query = $request->query('query');
            // $clients = Company::where('name', 'LIKE', "%{$query}%")
            //     ->orWhere('phone', 'LIKE', "%{$query}%")
            //     ->get();

            $clients = Company::whereAny([
                ['name', 'like', '%' . $query . '%'],
                ['phone', 'like', '%' . $query . '%']
            ]);

            return response()->json(['success' => true, 'customers' => $clients]);
        } catch (Exception $e) {
            Log::error("Failed to search clients: " . $e->getMessage());
            return response()->json(['error' => 'Failed to search clients'], 500);
        }
    }

    public function index(Request $request)
    {
        $companies = $this->companyService->getPaginatedCompany();

        if ($request->ajax()) {
            return response()->json([
                'html' => view('backend.company.table', compact('companies'))->render(),
                'pagination' => $companies->links('vendor.pagination.custom')->render(),
            ]);
        }

        return view('backend.company.index', compact('companies'));
    }


    public function update(Request $request, $id)
    {
        $request->validate(
            [
                'name' => 'required|unique:sgo_companies,name,' . $id,
                'phone' => 'required|unique:sgo_companies,phone,' . $id,
            ],
            __('request.messages'),
            [
                'name' => 'Tìm công ty',
                'phone' => 'Số điện thoại',
            ]
        );

        try {
            $company = $this->companyService->updateCompany($request->all(), $id);

            $companies = $this->companyService->getPaginatedCompany();

            $html = view('backend.company.table', compact('companies'))->render();
            $pagination = $companies->links('vendor.pagination.custom')->render();
            return response()->json([
                'success' => true,
                'message' => 'Cập nhật công ty sản xuất thành công',
                'html' => $html,
                'pagination' => $pagination
            ]);
        } catch (Exception $e) {
            Log::error("Failed to update this Company: " . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Cập nhật công ty sản xuất thất bại']);
        }
    }

    public function store(Request $request)
    {
        $request->validate(
            [
                'name' => 'required|unique:sgo_companies,name',
                'phone' => 'required|unique:sgo_companies,phone',
            ],
            __('request.messages'),
            [
                'name' => 'Tên công ty',
                'phone' => 'Số điện thoại',
            ]
        );

        try {
            $company = $this->companyService->addNewCompany($request->all());

            // Lấy lại danh sách công ty để cập nhật bảng
            $companies = $this->companyService->getPaginatedCompany(); // Hàm này sẽ trả về danh sách công ty phân trang

            $html = view('backend.company.table', compact('companies'))->render();
            $pagination = $companies->links('vendor.pagination.custom')->render();

            return response()->json([
                'success' => true,
                'message' => 'Thêm công ty sản xuất mới thành công',
                'html' => $html,
                'pagination' => $pagination,
            ]);
        } catch (Exception $e) {
            Log::error('Failed to add new Company: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Thêm công ty sản xuất thất bại',
            ]);
        }
    }


    public function delete($id)
    {
        try {
            $this->companyService->deleteCompany($id);

            // Lấy danh sách công ty cập nhật sau khi xóa
            $companies = $this->companyService->getPaginatedCompany();

            $html = view('backend.company.table', compact('companies'))->render();
            $pagination = $companies->links('vendor.pagination.custom')->render();

            return response()->json([
                'success' => true,
                'message' => 'Xóa công ty sản xuất thành công',
                'html' => $html,
                'pagination' => $pagination,
            ]);
        } catch (Exception $e) {
            Log::error('Failed to delete this Company: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Xóa công ty sản xuất thất bại',
            ]);
        }
    }


    public function detail($id)
    {
        try {
            $company = Company::find($id);
            return response()->json($company);
        } catch (Exception $e) {
            Log::error('Failed to find this Company: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Tìm công ty sản xuất thất bại']);
        }
    }
}
