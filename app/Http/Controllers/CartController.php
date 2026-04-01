<?php

namespace App\Http\Controllers;

use App\Models\DiscountCode;
use App\Models\Product;
use App\Models\StoreSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CartController extends Controller
{
    public function index(): Response
    {
        $cart = session()->get('cart', []);
        $items = $this->resolveCartItems($cart);
        $subtotal = collect($items)->sum('line_total');
        $freeShippingThreshold = (float) StoreSetting::get('free_shipping_threshold', 20000);

        // Check for applied discount code
        $discountData = $this->resolveDiscount($subtotal);

        return Inertia::render('Cart/Index', [
            'items'                 => $items,
            'subtotal'              => $subtotal,
            'freeShippingThreshold' => $freeShippingThreshold,
            'discount'              => $discountData,
        ]);
    }

    public function add(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity'    => 'required|integer|min:1',
        ]);

        $cart = session()->get('cart', []);
        $productId = (string) $request->product_id;

        if (isset($cart[$productId])) {
            $cart[$productId]['quantity'] += $request->quantity;
        } else {
            $cart[$productId] = [
                'product_id' => $request->product_id,
                'quantity'   => $request->quantity,
            ];
        }

        session()->put('cart', $cart);

        return back()->with('success', 'Producto agregado al carrito.');
    }

    public function update(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity'    => 'required|integer|min:1',
        ]);

        $cart = session()->get('cart', []);
        $productId = (string) $request->product_id;

        if (isset($cart[$productId])) {
            $cart[$productId]['quantity'] = $request->quantity;
            session()->put('cart', $cart);
        }

        return back()->with('success', 'Carrito actualizado.');
    }

    public function remove(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $cart = session()->get('cart', []);
        $productId = (string) $request->product_id;
        unset($cart[$productId]);
        session()->put('cart', $cart);

        return back()->with('success', 'Producto eliminado del carrito.');
    }

    public function count()
    {
        $cart = session()->get('cart', []);
        $items = $this->resolveCartItems($cart);

        return response()->json([
            'count' => collect($items)->sum('quantity'),
        ]);
    }

    public function clear()
    {
        session()->forget('cart');
        session()->forget('discount_code');

        return response()->json([
            'message' => 'Carrito vaciado correctamente.',
        ]);
    }

    public function applyDiscount(Request $request)
    {
        $request->validate([
            'code' => 'required|string|max:50',
        ]);

        $code = strtoupper(trim($request->code));
        $discountCode = DiscountCode::where('code', $code)->first();

        if (!$discountCode) {
            return back()->withErrors(['discount' => 'El código de descuento no existe.']);
        }

        $cart = session()->get('cart', []);
        $items = $this->resolveCartItems($cart);
        $subtotal = collect($items)->sum('line_total');

        if (!$discountCode->isValid($subtotal)) {
            return back()->withErrors(['discount' => 'El código de descuento no es válido o no cumple las condiciones.']);
        }

        session()->put('discount_code', $code);

        return back()->with('success', 'Código de descuento aplicado correctamente.');
    }

    public function removeDiscount()
    {
        session()->forget('discount_code');

        return back()->with('success', 'Código de descuento removido.');
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
