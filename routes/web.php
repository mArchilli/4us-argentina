<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CatalogController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Models\Product;
use Inertia\Inertia;

Route::get('/', function () {
    $featured = Product::with(['primaryMedia', 'prices', 'categories'])
        ->where('is_featured', true)
        ->latest()
        ->get();

    return Inertia::render('Welcome', [
        'canLogin'         => Route::has('login'),
        'laravelVersion'   => Application::VERSION,
        'phpVersion'       => PHP_VERSION,
        'featuredProducts' => $featured,
    ]);
});

Route::get('/catalogo', [CatalogController::class, 'index'])->name('catalog.index');
Route::get('/catalogo/{product}', [CatalogController::class, 'show'])->name('catalog.show');

        Route::get('/retailer', function () {
            return Inertia::render('retailer');
        });
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::resource('products', ProductController::class);
    Route::resource('categories', CategoryController::class)->except('show');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
