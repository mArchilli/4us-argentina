<?php

namespace App\Http\Controllers;

use App\Models\DiscountCode;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DiscountCodeController extends Controller
{
    public function index()
    {
        $codes = DiscountCode::latest()->paginate(20);

        return Inertia::render('DiscountCodes/Index', [
            'codes' => $codes,
        ]);
    }

    public function create()
    {
        return Inertia::render('DiscountCodes/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'code'             => 'required|string|max:50|unique:discount_codes,code',
            'type'             => 'required|in:percentage,fixed',
            'value'            => 'required|numeric|min:0.01',
            'min_order_amount' => 'nullable|numeric|min:0',
            'max_uses'         => 'nullable|integer|min:1',
            'is_active'        => 'boolean',
            'valid_from'       => 'nullable|date',
            'valid_until'      => 'nullable|date|after_or_equal:valid_from',
        ]);

        $validated['code'] = strtoupper($validated['code']);

        DiscountCode::create($validated);

        return redirect()->route('discount-codes.index')
            ->with('success', 'Código de descuento creado correctamente.');
    }

    public function edit(DiscountCode $discountCode)
    {
        return Inertia::render('DiscountCodes/Edit', [
            'discountCode' => $discountCode,
        ]);
    }

    public function update(Request $request, DiscountCode $discountCode)
    {
        $validated = $request->validate([
            'code'             => 'required|string|max:50|unique:discount_codes,code,' . $discountCode->id,
            'type'             => 'required|in:percentage,fixed',
            'value'            => 'required|numeric|min:0.01',
            'min_order_amount' => 'nullable|numeric|min:0',
            'max_uses'         => 'nullable|integer|min:1',
            'is_active'        => 'boolean',
            'valid_from'       => 'nullable|date',
            'valid_until'      => 'nullable|date|after_or_equal:valid_from',
        ]);

        $validated['code'] = strtoupper($validated['code']);

        $discountCode->update($validated);

        return redirect()->route('discount-codes.index')
            ->with('success', 'Código de descuento actualizado correctamente.');
    }

    public function destroy(DiscountCode $discountCode)
    {
        $discountCode->delete();

        return redirect()->route('discount-codes.index')
            ->with('success', 'Código de descuento eliminado correctamente.');
    }
}
