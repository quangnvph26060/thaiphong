<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory;

    protected $table = 'sgo_products';
    protected $fillable = [
        'name',
        'images',
        'guarantee',
        'price',
        'sale_price',
        'sub_description',
        'title_seo',
        'description_seo',
        'keyword_seo',
        'status',
        'description',
        'main_image',
        'category_id',
        'file_pdf',
        'file_name',
        'manufacturer',
        'model',
        'origin',
        'is_hot'
    ];

    protected $casts = [
        'images' => 'array',
        'is_hot' => 'boolean',
    ];

    public static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if ($model->isDirty('name')) $model->slug = Str::slug($model->name);
        });

        static::updating(function ($model) {
            if ($model->isDirty('name')) $model->slug = Str::slug($model->name);
        });
    }

    public function country()
    {
        return $this->belongsTo(Country::class, 'country_id');
    }

    public function company()
    {
        return $this->belongsTo(Company::class, 'company_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }
}
