<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CartController extends Controller
{
    public function index(): Response
    {
        $cart = session()->get('cart', []);
        $items = $this->resolveCartItems($cart);

        return Inertia::render('Cart/Index', [
            'items'    => $items,
            'subtotal' => collect($items)->sum('line_total'),
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

        return response()->json([
            'count' => collect($cart)->sum('quantity'),
        ]);
    }

    public function clear()
    {
        session()->forget('cart');

        return response()->json([
            'message' => 'Carrito vaciado correctamente.',
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
