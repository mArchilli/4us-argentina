<?php

namespace App\Http\Controllers;

use App\Models\DiscountCode;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\StoreSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class CheckoutController extends Controller
{
    public function index(): Response|RedirectResponse
    {
        $cart = session()->get('cart', []);

        if (empty($cart)) {
            return redirect()->route('cart.index');
        }

        $items = $this->resolveCartItems($cart);
        $subtotal = collect($items)->sum('line_total');
        $freeShippingThreshold = (float) StoreSetting::get('free_shipping_threshold', 20000);

        // Resolve discount
        $discount = $this->resolveDiscount($subtotal);

        return Inertia::render('Checkout/Index', [
            'items'                 => $items,
            'subtotal'              => $subtotal,
            'freeShippingThreshold' => $freeShippingThreshold,
            'discount'              => $discount,
        ]);
    }

    public function store(Request $request)
    {
        $cart = session()->get('cart', []);

        if (empty($cart)) {
            return redirect()->route('cart.index');
        }

        $rules = [
            'shipping_method'   => 'required|in:domicilio,sucursal',
            'first_name'        => 'required|string|max:255',
            'last_name'         => 'required|string|max:255',
            'email'             => 'required|email|max:255',
            'dni'               => 'required|string|max:20',
            'province'          => 'required|string|max:255',
            'city'              => 'required|string|max:255',
            'postal_code'       => 'required|string|max:20',
            'shipping_company'  => 'required|string|max:255',
            'phone'             => 'required|string|max:30',
        ];

        if ($request->shipping_method === 'domicilio') {
            $rules['address']      = 'required|string|max:500';
            $rules['observations'] = 'nullable|string|max:1000';
        }

        $validated = $request->validate($rules);

        $items = $this->resolveCartItems($cart);
        $subtotal = collect($items)->sum('line_total');

        // Resolve discount
        $discount = $this->resolveDiscount($subtotal);
        $discountAmount = $discount ? $discount['amount'] : 0;
        $total = $subtotal - $discountAmount;

        $order = DB::transaction(function () use ($validated, $items, $subtotal, $discountAmount, $total, $discount) {
            $order = Order::create([
                ...$validated,
                'subtotal'        => $subtotal,
                'discount_code'   => $discount['code'] ?? null,
                'discount_amount' => $discountAmount,
                'total'           => $total,
                'status'          => 'pending',
            ]);

            foreach ($items as $item) {
                OrderItem::create([
                    'order_id'      => $order->id,
                    'product_id'    => $item['product_id'],
                    'product_title' => $item['title'],
                    'quantity'      => $item['quantity'],
                    'unit_price'    => $item['unit_price'],
                    'line_total'    => $item['line_total'],
                ]);
            }

            // Increment discount code usage
            if ($discount) {
                DiscountCode::where('code', $discount['code'])->increment('times_used');
            }

            return $order;
        });

        session()->forget('cart');
        session()->forget('discount_code');

        return Inertia::render('Checkout/Success', [
            'order' => $order->load('items'),
        ]);
    }

    private function resolveDiscount(float $subtotal): ?array
    {
        $code = session()->get('discount_code');

        if (!$code) {
            return null;
        }

        $discountCode = DiscountCode::where('code', $code)->first();

        if (!$discountCode || !$discountCode->isValid($subtotal)) {
            session()->forget('discount_code');
            return null;
        }

        $amount = $discountCode->calculateDiscount($subtotal);

        return [
            'code'   => $discountCode->code,
            'type'   => $discountCode->type,
            'value'  => (float) $discountCode->value,
            'amount' => $amount,
            'total'  => $subtotal - $amount,
        ];
    }

    private function resolveCartItems(array $cart): array
    {
        if (empty($cart)) {
            return [];
        }

        $productIds = collect($cart)->pluck('product_id')->toArray();
        $products = Product::with(['primaryMedia', 'prices'])
            ->whereIn('id', $productIds)
            ->get()
            ->keyBy('id');

        $items = [];

        foreach ($cart as $entry) {
            $product = $products->get($entry['product_id']);
            if (!$product) {
                continue;
            }

            $quantity = (int) $entry['quantity'];
            $prices = $product->prices->sortBy('min_quantity')->values();
            $selectedPrice = $prices
                ->filter(fn ($price) => (int) $price->min_quantity <= $quantity)
                ->last() ?? $prices->first();
            $unitPrice = $selectedPrice ? (float) $selectedPrice->price : 0;

            $items[] = [
                'product_id'  => $product->id,
                'title'       => $product->title,
                'image'       => $product->primaryMedia?->url,
                'unit_price'  => $unitPrice,
                'quantity'    => $quantity,
                'line_total'  => $unitPrice * $quantity,
            ];
        }

        return $items;
    }
}
