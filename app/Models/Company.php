<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    protected $table = 'sgo_companies';
    protected $fillable = [
        'name',
        'phone'
    ];

    public function product()
    {
        return $this->hasMany(Product::class, 'company_id');
    }
}
