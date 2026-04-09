<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CatalogController extends Controller
{
    public function index(Request $request): Response
    {
        $categorySlug = $request->query('categoria');
        $search       = trim((string) $request->string('search'));
        $destacados   = $request->query('destacados');
        $ofertas      = $request->query('ofertas');

        $query = Product::with(['primaryMedia', 'prices', 'categories'])
            ->latest();

        if ($categorySlug) {
            $query->whereHas('categories', fn ($q) => $q->where('slug', $categorySlug));
        }

        if ($search !== '') {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if ($destacados === '1') {
            $query->where('is_featured', true);
        }

        if ($ofertas === '1') {
            $query->where('offer_active', true);
        }

        $products   = $query->paginate(12)->withQueryString();
        $categories = Category::withCount('products')->orderBy('name')->get();

        return Inertia::render('Catalog/Index', [
            'products'        => $products,
            'categories'      => $categories,
            'activeCategory'  => $categorySlug,
            'filters'         => [
                'search'     => $search,
                'destacados' => $destacados === '1' ? '1' : '',
                'ofertas'    => $ofertas === '1' ? '1' : '',
            ],
        ]);
    }

    public function show(Product $product): Response
    {
        $product->load(['media', 'prices', 'categories']);

        $featured = Product::with(['primaryMedia', 'prices', 'categories'])
            ->where('is_featured', true)
            ->where('id', '!=', $product->id)
            ->latest()
            ->take(4)
            ->get();

        $onOffer = Product::with(['primaryMedia', 'prices', 'categories'])
            ->where('offer_active', true)
            ->where('id', '!=', $product->id)
            ->latest()
            ->take(4)
            ->get();

        $categoryIds = $product->categories->pluck('id');

        $related = Product::with(['primaryMedia', 'prices', 'categories'])
            ->where('id', '!=', $product->id)
            ->when($categoryIds->isNotEmpty(), function ($q) use ($categoryIds) {
                $q->whereHas('categories', fn ($q2) => $q2->whereIn('categories.id', $categoryIds));
            })
            ->latest()
            ->take(4)
            ->get();

        return Inertia::render('Catalog/Show', [
            'product'  => $product,
            'featured' => $featured,
            'onOffer'  => $onOffer,
            'related'  => $related,
        ]);
    }
}
