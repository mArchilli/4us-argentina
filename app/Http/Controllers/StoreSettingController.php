<?php

namespace App\Http\Controllers;

use App\Models\StoreSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StoreSettingController extends Controller
{
    public function edit()
    {
        $catalogFile = public_path(config('media.catalog_path') . '/catalogo.pdf');

        return Inertia::render('StoreSettings/Edit', [
            'settings' => [
                'free_shipping_threshold' => StoreSetting::get('free_shipping_threshold', '20000'),
            ],
            'catalog' => [
                'exists' => file_exists($catalogFile),
                'url'    => '/' . config('media.catalog_url_path') . '/catalogo.pdf',
            ],
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'free_shipping_threshold' => 'required|numeric|min:0',
        ]);

        StoreSetting::set('free_shipping_threshold', $validated['free_shipping_threshold']);

        return redirect()->route('store-settings.edit')
            ->with('success', 'Configuración actualizada correctamente.');
    }

    public function uploadCatalog(Request $request)
    {
        $request->validate([
            'catalog' => 'required|file|mimes:pdf|max:20480',
        ]);

        $catalogDir = public_path(config('media.catalog_path'));

        if (!is_dir($catalogDir)) {
            mkdir($catalogDir, 0755, true);
        }

        $request->file('catalog')->move($catalogDir, 'catalogo.pdf');

        return redirect()->route('store-settings.edit')
            ->with('success', 'Catálogo actualizado correctamente.');
    }
}
