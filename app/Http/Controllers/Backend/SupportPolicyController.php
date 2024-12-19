<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\SupportPolicy;
use App\Services\Backend\SupportPolicyService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class SupportPolicyController extends Controller
{
    protected $supportPolicyService;
    public function __construct(SupportPolicyService $supportPolicyService)
    {
        $this->supportPolicyService = $supportPolicyService;
    }

    public function search(Request $request)
    {
        try {
            $query = $request->query('query');
            $clients = SupportPolicy::where('name', 'LIKE', "%{$query}%")
                ->orWhere('phone', 'LIKE', "%{$query}%")
                ->get();

            return response()->json(['success' => true, 'customers' => $clients]);
        } catch (Exception $e) {
            Log::error("Failed to search clients: " . $e->getMessage());
            return response()->json(['error' => 'Failed to search clients'], 500);
        }
    }

    public function index(Request $request)
    {
        $supportPolicies = $this->supportPolicyService->getPaginatedSupportPolicy();

        if ($request->ajax()) {
            return response()->json([
                'html' => view('backend.support_policy.table', compact('supportPolicies'))->render(),
                'pagination' => $supportPolicies->links('vendor.pagination.custom')->render(),
            ]);
        }

        return view('backend.support_policy.index', compact('supportPolicies'));
    }


    public function update(Request $request, $id)
    {
        try {
            $supportPolicy = $this->supportPolicyService->updateSupportPolicy($request->all(), $id);

            $supportPolicies = $this->supportPolicyService->getPaginatedSupportPolicy();

            $html = view('backend.support_policy.table', compact('supportPolicies'))->render();
            $pagination = $supportPolicies->links('vendor.pagination.custom')->render();
            return response()->json([
                'success' => true,
                'message' => 'Cập nhật chính sách hỗ trợ thành công',
                'html' => $html,
                'pagination' => $pagination
            ]);
        } catch (Exception $e) {
            Log::error("Failed to update this SupportPolicy: " . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Cập nhật chính sách hỗ trợ thất bại']);
        }
    }

    public function store(Request $request)
    {
        try {
            $supportPolicy = $this->supportPolicyService->addNewSupportPolicy($request->all());

            // Lấy lại danh sách công ty để cập nhật bảng
            $supportPolicies = $this->supportPolicyService->getPaginatedSupportPolicy(); // Hàm này sẽ trả về danh sách công ty phân trang

            $html = view('backend.support_policy.table', compact('supportPolicies'))->render();
            $pagination = $supportPolicies->links('vendor.pagination.custom')->render();

            return response()->json([
                'success' => true,
                'message' => 'Thêm chính sách hỗ trợ mới thành công',
                'html' => $html,
                'pagination' => $pagination,
            ]);
        } catch (Exception $e) {
            Log::error('Failed to add new SupportPolicy: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Thêm chính sách hỗ trợ thất bại',
            ]);
        }
    }


    public function delete($id)
    {
        try {
            $this->supportPolicyService->deleteSupportPolicy($id);

            // Lấy danh sách công ty cập nhật sau khi xóa
            $supportPolicies = $this->supportPolicyService->getPaginatedSupportPolicy();

            $html = view('backend.support_policy.table', compact('supportPolicies'))->render();
            $pagination = $supportPolicies->links('vendor.pagination.custom')->render();

            return response()->json([
                'success' => true,
                'message' => 'Xóa chính sách hỗ trợ thành công',
                'html' => $html,
                'pagination' => $pagination,
            ]);
        } catch (Exception $e) {
            Log::error('Failed to delete this SupportPolicy: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Xóa chính sách hỗ trợ thất bại',
            ]);
        }
    }


    public function detail($id)
    {
        try {
            $supportPolicy = SupportPolicy::find($id);
            return response()->json($supportPolicy);
        } catch (Exception $e) {
            Log::error('Failed to find this SupportPolicy: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Tìm chính sách hỗ trợ thất bại']);
        }
    }
}
