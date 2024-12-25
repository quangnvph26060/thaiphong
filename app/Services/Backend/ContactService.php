<?php

namespace App\Services\Backend;

use Exception;
use App\Models\Contact;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ContactService
{
    public function __construct(protected Contact $contact) {}

    public function show()
    {
        return $this->contact->firstOrFail();
    }

    public function update()
    {
        $payload = $this->payload();

        $dataOld = $this->contact->firstOrFail();

        DB::transaction(function () use ($payload, $dataOld) {
            try {
                if (isset($payload['logo'])) {
                    deleteImage($dataOld->logo);
                    $payload['logo'] = saveImage(request(), 'logo', 'logo');
                }

                if (isset($payload['icon'])) {
                    deleteImage($dataOld->icon);
                    $payload['icon'] = saveImage(request(), 'icon', 'icon');
                }

                if (isset($payload['company_logo'])) {
                    deleteImage($dataOld->company_logo);
                    $payload['company_logo'] = saveImage(request(), 'company_logo', 'company_logo');
                }

                if ($dataOld->update($payload)) {
                    Cache::forget('contact_setting');
                    return  toastr()->success('Cập nhật thông tin thành công');
                } else {
                    return toastr()->error('Cập nhật thông tin thất bại');
                }
            } catch (Exception $e) {
                Log::error('Failed to update this contact: ' . $e->getMessage());
                throw new Exception($e->getMessage());
            }
        });
    }

    private function payload()
    {
        return request()->except('_token', '_method');
    }
}
