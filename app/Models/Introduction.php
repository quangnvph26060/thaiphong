<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Introduction extends Model
{
    use HasFactory;

    protected $table = 'sgo_introductions';
    protected $fillable = [
        'subject',
        'article',
    ];
}
