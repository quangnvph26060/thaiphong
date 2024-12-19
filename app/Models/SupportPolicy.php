<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SupportPolicy extends Model
{
    use HasFactory;

    protected $table = 'sgo_support_policies';
    protected $fillable = [
        'name',
        'description',
        'logo',
    ];
}
