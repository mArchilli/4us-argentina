<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\ProductMedia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(Request $request): Response
    {
        $search = trim((string) $request->string('search'));
        $sort = $request->input('sort', 'az');
        $categoryId = $request->integer('category_id');
        $featured = $request->input('featured', 'all');
        $offer = $request->input('offer', 'all');

        $productsQuery = Product::with(['primaryMedia', 'prices', 'categories']);

        if ($search !== '') {
            $productsQuery->where(function ($query) use ($search) {
                $query->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if ($categoryId > 0) {
            $productsQuery->whereHas('categories', function ($query) use ($categoryId) {
                $query->where('categories.id', $categoryId);
            });
        }

        if ($featured === '1') {
            $productsQuery->where('is_featured', true);
        }

        if ($featured === '0') {
            $productsQuery->where('is_featured', false);
        }

        if ($offer === '1') {
            $productsQuery->where('offer_active', true);
        }

        if ($offer === '0') {
            $productsQuery->where('offer_active', false);
        }

        if ($sort === 'za') {
            $productsQuery->orderBy('title', 'desc');
        } else {
            $sort = 'az';
            $productsQuery->orderBy('title', 'asc');
        }

        $products = $productsQuery
            ->paginate(16)
            ->withQueryString();

        return Inertia::render('Products/Index', [
            'products' => $products,
            'categories' => Category::query()
                ->orderBy('name')
                ->get(['id', 'name']),
            'filters' => [
                'search' => $search,
                'sort' => $sort,
                'category_id' => $categoryId > 0 ? (string) $categoryId : '',
                'featured' => in_array($featured, ['0', '1'], true) ? $featured : 'all',
                'offer' => in_array($offer, ['0', '1'], true) ? $offer : 'all',
            ],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Products/Create', [
            'categories' => Category::query()
                ->orderBy('name')
                ->get(['id', 'name', 'slug']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'title'                  => 'required|string|max:255',
            'description'            => 'nullable|string',
            'is_featured'            => 'boolean',
            'offer_active'           => 'boolean',
            'offer_price'            => 'nullable|numeric|min:0',
            'offer_ends_at'          => 'nullable|date',
            'prices'                 => 'required|array|min:1',
            'prices.*.label'         => 'required|string|max:100',
            'prices.*.min_quantity'  => 'required|integer|min:1',
            'prices.*.price'         => 'required|numeric|min:0',
            'category_ids'           => 'nullable|array',
            'category_ids.*'         => 'integer|exists:categories,id',
            'media.*'                => 'nullable|file|mimes:jpg,jpeg,png,gif,webp,mp4,mov,avi,mkv|max:102400',
            'primary_media_index'    => 'nullable|integer|min:0',
        ]);

        $product = Product::create([
            'title'         => $request->title,
            'description'   => $request->description,
            'is_featured'   => $request->boolean('is_featured'),
            'offer_active'  => $request->boolean('offer_active'),
            'offer_price'   => $request->offer_price,
            'offer_ends_at' => $request->offer_ends_at,
        ]);

        foreach ($request->input('prices', []) as $i => $priceData) {
            $product->prices()->create([
                'label'        => $priceData['label'],
                'min_quantity' => $priceData['min_quantity'],
                'price'        => $priceData['price'],
                'sort_order'   => $i,
            ]);
        }

        $product->categories()->sync($request->input('category_ids', []));

        if ($request->hasFile('media')) {
            $storagePath = config('media.products_images_path');
            $fullDir     = public_path($storagePath);
            File::ensureDirectoryExists($fullDir);

            $primaryIdx = (int) $request->input('primary_media_index', 0);
            foreach ($request->file('media') as $i => $file) {
                $mimeType = $file->getMimeType();
                $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();
                $file->move($fullDir, $filename);
                $product->media()->create([
                    'file_path'  => $storagePath . '/' . $filename,
                    'file_type'  => str_starts_with($mimeType, 'video') ? 'video' : 'image',
                    'is_primary' => ($i === $primaryIdx),
                    'sort_order' => $i,
                ]);
            }
        }

        return redirect()->route('products.index')
            ->with('success', 'Producto creado exitosamente.');
    }

    public function edit(Product $product): Response
    {
        $product->load(['prices', 'media', 'categories']);

        return Inertia::render('Products/Edit', [
            'product' => $product,
            'categories' => Category::query()
                ->orderBy('name')
                ->get(['id', 'name', 'slug']),
        ]);
    }

    public function update(Request $request, Product $product): RedirectResponse
    {
        $request->validate([
            'title'                  => 'required|string|max:255',
            'description'            => 'nullable|string',
            'is_featured'            => 'boolean',
            'offer_active'           => 'boolean',
            'offer_price'            => 'nullable|numeric|min:0',
            'offer_ends_at'          => 'nullable|date',
            'prices'                 => 'required|array|min:1',
            'prices.*.label'         => 'required|string|max:100',
            'prices.*.min_quantity'  => 'required|integer|min:1',
            'prices.*.price'         => 'required|numeric|min:0',
            'category_ids'           => 'nullable|array',
            'category_ids.*'         => 'integer|exists:categories,id',
            'new_media.*'            => 'nullable|file|mimes:jpg,jpeg,png,gif,webp,mp4,mov,avi,mkv|max:102400',
            'deleted_media_ids'      => 'nullable|array',
            'deleted_media_ids.*'    => 'integer',
            'primary_media_id'       => 'nullable|integer',
        ]);

        $product->update([
            'title'         => $request->title,
            'description'   => $request->description,
            'is_featured'   => $request->boolean('is_featured'),
            'offer_active'  => $request->boolean('offer_active'),
            'offer_price'   => $request->offer_price,
            'offer_ends_at' => $request->offer_ends_at,
        ]);

        // Re-sync all prices
        $product->prices()->delete();
        foreach ($request->input('prices', []) as $i => $priceData) {
            $product->prices()->create([
                'label'        => $priceData['label'],
                'min_quantity' => $priceData['min_quantity'],
                'price'        => $priceData['price'],
                'sort_order'   => $i,
            ]);
        }

        $product->categories()->sync($request->input('category_ids', []));

        // Delete marked media files
        if ($request->filled('deleted_media_ids')) {
            $toDelete = ProductMedia::whereIn('id', $request->deleted_media_ids)
                ->where('product_id', $product->id)
                ->get();
            foreach ($toDelete as $media) {
                /** @var ProductMedia $media */
                File::delete(public_path($media->file_path));
                $media->delete();
            }
        }

        // Update primary from existing media
        if ($request->filled('primary_media_id')) {
            $product->media()->update(['is_primary' => false]);
            $product->media()
                ->where('id', $request->primary_media_id)
                ->update(['is_primary' => true]);
        }

        // Upload new media
        if ($request->hasFile('new_media')) {
            $storagePath   = config('media.products_images_path');
            $fullDir       = public_path($storagePath);
            File::ensureDirectoryExists($fullDir);

            $existingCount = $product->media()->count();
            $hasPrimary    = $product->media()->where('is_primary', true)->exists();
            foreach ($request->file('new_media') as $i => $file) {
                $mimeType = $file->getMimeType();
                $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();
                $file->move($fullDir, $filename);
                $product->media()->create([
                    'file_path'  => $storagePath . '/' . $filename,
                    'file_type'  => str_starts_with($mimeType, 'video') ? 'video' : 'image',
                    'is_primary' => !$hasPrimary && $i === 0,
                    'sort_order' => $existingCount + $i,
                ]);
                if (!$hasPrimary && $i === 0) {
                    $hasPrimary = true;
                }
            }
        }

        return redirect()->route('products.index')
            ->with('success', 'Producto actualizado exitosamente.');
    }

    public function destroy(Product $product): RedirectResponse
    {
        foreach ($product->media as $media) {
            File::delete(public_path($media->file_path));
        }
        $product->delete();

        return redirect()->route('products.index')
            ->with('success', 'Producto eliminado exitosamente.');
    }
}
