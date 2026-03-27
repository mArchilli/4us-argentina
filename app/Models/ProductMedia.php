<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductMedia extends Model
{
    protected $fillable = ['product_id', 'file_path', 'file_type', 'is_primary', 'sort_order'];

    protected $casts = [
        'is_primary' => 'boolean',
        'sort_order' => 'integer',
    ];

    protected $appends = ['url'];

    public function getUrlAttribute(): string
    {
        $urlPath  = config('media.products_images_url_path');
        $filename = basename($this->file_path);

        return asset($urlPath . '/' . $filename);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
