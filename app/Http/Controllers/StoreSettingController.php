<?php

namespace App\Http\Controllers;

use App\Models\StoreSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StoreSettingController extends Controller
{
    public function edit()
    {
        return Inertia::render('StoreSettings/Edit', [
            'settings' => [
                'free_shipping_threshold' => StoreSetting::get('free_shipping_threshold', '20000'),
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
}
