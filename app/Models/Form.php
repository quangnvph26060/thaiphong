<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Form extends Model
{
    use HasFactory;

    protected $table = 'sgo_forms';
    protected $fillable = [
        'name',
        'phone',
        'email',
        'message',
        'created_at',
    ];
}
