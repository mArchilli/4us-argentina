<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Product extends Model
{
    protected $fillable = [
        'title',
        'description',
        'is_featured',
        'offer_active',
        'offer_price',
        'offer_ends_at',
    ];

    protected $casts = [
        'is_featured'   => 'boolean',
        'offer_active'  => 'boolean',
        'offer_ends_at' => 'datetime',
        'offer_price'   => 'decimal:2',
    ];

    public function prices(): HasMany
    {
        return $this->hasMany(ProductPrice::class)->orderBy('sort_order');
    }

    public function media(): HasMany
    {
        return $this->hasMany(ProductMedia::class)->orderBy('sort_order');
    }

    public function primaryMedia(): HasOne
    {
        return $this->hasOne(ProductMedia::class)->where('is_primary', true);
    }
}
