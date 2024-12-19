<?php

namespace App\Services\Backend;

use App\Models\SupportPolicy;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class SupportPolicyService
{
    protected $supportPolicy;
    public function __construct(SupportPolicy $supportPolicy)
    {
        $this->supportPolicy = $supportPolicy;
    }

    public function getPaginatedSupportPolicy()
    {
        return $this->supportPolicy->orderByDesc('created_at')->paginate(10);
    }

    public function getAllSupportPolicy()
    {
        return $this->supportPolicy->orderByDesc('created_at')->get();
    }

    public function addNewSupportPolicy(array $data)
    {
        try {
            DB::beginTransaction();
            $supportPolicy = $this->supportPolicy->create([
                'name' => $data['name'],
                'description' => $data['description'],
            ]);

            $logo = saveImage(request(), 'logo', 'policy_logo');
            $supportPolicy->update(['logo' => $logo]);
            DB::commit();
            return $supportPolicy;
        } catch (Exception $e) {
            Log::error('Failed to add new supportPolicy: ' . $e->getMessage());
            throw new Exception('Failed to add new supportPolicy ');
        }
    }

    public function updateSupportPolicy(array $data, $id)
    {
        try {
            DB::beginTransaction();
            $supportPolicy = $this->supportPolicy->find($id);
            $supportPolicy->update([
                'name' => $data['name'],
                'description' => $data['description'],
            ]);
            if (request()->hasFile('logo')) {
                deleteImage($supportPolicy->logo);
                $logo = saveImage(request(), 'logo', 'policy_logo');
                $supportPolicy->update([
                    'logo' => $logo,
                ]);
            }
            DB::commit();
            return $supportPolicy;
        } catch (Exception $e) {
            Log::error('Failed to update this supportPolicy: ' . $e->getMessage());
            throw new Exception('Failed to update this supportPolicy');
        }
    }

    public function deleteSupportPolicy($id)
    {
        try {
            DB::beginTransaction();
            $supportPolicy = $this->supportPolicy->findOrFail($id);
            deleteImage($supportPolicy->logo);
            $supportPolicy->delete();
            DB::commit();
            return $supportPolicy;
        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Failed to delete this supportPolicy: ' . $e->getMessage());
            throw new Exception('Failed to delete this supportPolicy');
        }
    }
}
