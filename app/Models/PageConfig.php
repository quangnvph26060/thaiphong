<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PageConfig extends Model
{
    use HasFactory;

    protected $table = 'sgo_page_configs';

    protected $fillable = [
        'name',
        'page_description',
        'description_seo',
        'title_seo',
        'keyword_seo',
    ];
}
