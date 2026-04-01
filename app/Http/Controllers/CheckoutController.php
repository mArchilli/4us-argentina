<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class CheckoutController extends Controller
{
    public function index(): Response
    {
        $cart = session()->get('cart', []);

        if (empty($cart)) {
            return redirect()->route('cart.index');
        }

        $items = $this->resolveCartItems($cart);
        $subtotal = collect($items)->sum('line_total');

        return Inertia::render('Checkout/Index', [
            'items'    => $items,
            'subtotal' => $subtotal,
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

        $order = DB::transaction(function () use ($validated, $items, $subtotal) {
            $order = Order::create([
                ...$validated,
                'subtotal' => $subtotal,
                'total'    => $subtotal,
                'status'   => 'pending',
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

            return $order;
        });

        session()->forget('cart');

        return Inertia::render('Checkout/Success', [
            'order' => $order->load('items'),
        ]);
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

            $price = $product->prices->sortBy('min_quantity')->first();
            $unitPrice = $price ? (float) $price->price : 0;

            $items[] = [
                'product_id'  => $product->id,
                'title'       => $product->title,
                'image'       => $product->primaryMedia?->url,
                'unit_price'  => $unitPrice,
                'quantity'    => $entry['quantity'],
                'line_total'  => $unitPrice * $entry['quantity'],
            ];
        }

        return $items;
    }
}
