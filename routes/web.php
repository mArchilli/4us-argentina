<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CatalogController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\DiscountCodeController;
use App\Http\Controllers\StoreSettingController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Models\Product;
use App\Models\Category;
use App\Models\DiscountCode;
use App\Models\Order;
use Inertia\Inertia;
use Illuminate\Support\Facades\Cache;

Route::get('/', function () {
    $featured = Cache::remember('home.featured_products', now()->addMinutes(5), function () {
        return Product::with(['primaryMedia', 'prices', 'categories'])
            ->select(['id', 'title', 'description', 'is_featured', 'offer_active', 'offer_price', 'offer_ends_at', 'created_at'])
            ->where('is_featured', true)
            ->latest()
            ->limit(12)
            ->get();
    });

    return Inertia::render('Welcome', [
        'canLogin'         => Route::has('login'),
        'laravelVersion'   => Application::VERSION,
        'phpVersion'       => PHP_VERSION,
        'featuredProducts' => $featured,
    ]);
});

Route::get('/catalogo', [CatalogController::class, 'index'])->name('catalog.index');
Route::get('/catalogo/{product}', [CatalogController::class, 'show'])->name('catalog.show');

Route::get('/carrito', [CartController::class, 'index'])->name('cart.index');
Route::post('/carrito/agregar', [CartController::class, 'add'])->name('cart.add');
Route::patch('/carrito/actualizar', [CartController::class, 'update'])->name('cart.update');
Route::delete('/carrito/eliminar', [CartController::class, 'remove'])->name('cart.remove');
Route::post('/carrito/vaciar', [CartController::class, 'clear'])->name('cart.clear');
Route::get('/carrito/count', [CartController::class, 'count'])->name('cart.count');

Route::post('/carrito/aplicar-descuento', [CartController::class, 'applyDiscount'])->name('cart.applyDiscount');
Route::post('/carrito/quitar-descuento', [CartController::class, 'removeDiscount'])->name('cart.removeDiscount');

Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout.index');
Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store');

        Route::get('/retailer', function () {
            return Inertia::render('retailer');
        });

Route::get('/envios', function () {
    return Inertia::render('Envios');
})->name('envios');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
        'counts' => [
            'products'       => \App\Models\Product::count(),
            'featured'       => \App\Models\Product::where('is_featured', true)->count(),
            'offers'         => \App\Models\Product::where('offer_active', true)->count(),
            'categories'     => \App\Models\Category::count(),
            'discountCodes'  => \App\Models\DiscountCode::count(),
            'activeDiscounts'=> \App\Models\DiscountCode::where('is_active', true)->count(),
            'orders'         => \App\Models\Order::count(),
        ],
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::resource('products', ProductController::class);
    Route::resource('categories', CategoryController::class)->except('show');
    Route::resource('discount-codes', DiscountCodeController::class)->except('show');

    Route::get('/store-settings', [StoreSettingController::class, 'edit'])->name('store-settings.edit');
    Route::put('/store-settings', [StoreSettingController::class, 'update'])->name('store-settings.update');
    Route::post('/store-settings/catalog', [StoreSettingController::class, 'uploadCatalog'])->name('store-settings.catalog');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
