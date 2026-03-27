<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductMedia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(): Response
    {
        $products = Product::with(['primaryMedia', 'prices'])
            ->latest()
            ->paginate(16);

        return Inertia::render('Products/Index', [
            'products' => $products,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Products/Create');
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

        if ($request->hasFile('media')) {
            $primaryIdx = (int) $request->input('primary_media_index', 0);
            foreach ($request->file('media') as $i => $file) {
                $path = $file->store(config('media.products_images_path'), 'public');
                $product->media()->create([
                    'file_path'  => $path,
                    'file_type'  => str_starts_with($file->getMimeType(), 'video') ? 'video' : 'image',
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
        $product->load(['prices', 'media']);

        return Inertia::render('Products/Edit', [
            'product' => $product,
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

        // Delete marked media files
        if ($request->filled('deleted_media_ids')) {
            $toDelete = ProductMedia::whereIn('id', $request->deleted_media_ids)
                ->where('product_id', $product->id)
                ->get();
            foreach ($toDelete as $media) {
                Storage::disk('public')->delete($media->file_path);
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
            $existingCount = $product->media()->count();
            $hasPrimary    = $product->media()->where('is_primary', true)->exists();
            foreach ($request->file('new_media') as $i => $file) {
                $path = $file->store(config('media.products_images_path'), 'public');
                $product->media()->create([
                    'file_path'  => $path,
                    'file_type'  => str_starts_with($file->getMimeType(), 'video') ? 'video' : 'image',
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
            Storage::disk('public')->delete($media->file_path);
        }
        $product->delete();

        return redirect()->route('products.index')
            ->with('success', 'Producto eliminado exitosamente.');
    }
}
