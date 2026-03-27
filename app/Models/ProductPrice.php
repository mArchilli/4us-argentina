<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductPrice extends Model
{
    protected $fillable = ['product_id', 'label', 'min_quantity', 'price', 'sort_order'];

    protected $casts = [
        'price'        => 'decimal:2',
        'min_quantity' => 'integer',
        'sort_order'   => 'integer',
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
