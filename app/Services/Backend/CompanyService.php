<?php

namespace App\Services\Backend;

use App\Models\Company;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CompanyService
{
    protected $company;
    public function __construct(Company $company)
    {
        $this->company = $company;
    }

    public function getPaginatedCompany()
    {
        return $this->company->orderByDesc('created_at')->paginate(10);
    }

    public function getAllCompanies()
    {
        return $this->company->orderByDesc('created_at')->get();
    }

    public function addNewCompany(array $data)
    {
        try {
            DB::beginTransaction();
            $company = $this->company->create([
                'name' => $data['name'],
                'phone' => $data['phone'],
            ]);

            DB::commit();
            return $company;
        } catch (Exception $e) {
            Log::error('Failed to add new company: ' . $e->getMessage());
            throw new Exception('Failed to add new company ');
        }
    }

    public function updateCompany(array $data, $id)
    {
        try {
            DB::beginTransaction();
            $company = $this->company->find($id);
            $company->update([
                'name' => $data['name'],
                'phone' => $data['phone'],
            ]);
            DB::commit();
            return $company;
        } catch (Exception $e) {
            Log::error('Failed to update this company: ' . $e->getMessage());
            throw new Exception('Failed to update this company');
        }
    }

    public function deleteCompany($id)
    {
        try {
            DB::beginTransaction();
            $company = $this->company->findOrFail($id);
            $company->delete();
            DB::commit();
            return $company;
        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Failed to delete this company: ' . $e->getMessage());
            throw new Exception('Failed to delete this company');
        }
    }
}
