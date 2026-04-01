<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    protected $fillable = [
        'shipping_method',
        'first_name',
        'last_name',
        'email',
        'dni',
        'province',
        'city',
        'postal_code',
        'shipping_company',
        'address',
        'phone',
        'observations',
        'subtotal',
        'shipping_cost',
        'total',
        'status',
    ];

    protected $casts = [
        'subtotal'      => 'decimal:2',
        'shipping_cost' => 'decimal:2',
        'total'         => 'decimal:2',
    ];

    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }
}
