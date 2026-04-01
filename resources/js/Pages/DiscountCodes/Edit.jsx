import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ discountCode }) {
    const { data, setData, put, processing, errors } = useForm({
        code: discountCode.code || '',
        type: discountCode.type || 'percentage',
        value: discountCode.value || '',
        min_order_amount: discountCode.min_order_amount || '',
        max_uses: discountCode.max_uses || '',
        is_active: discountCode.is_active ?? true,
        valid_from: discountCode.valid_from ? discountCode.valid_from.slice(0, 16) : '',
        valid_until: discountCode.valid_until ? discountCode.valid_until.slice(0, 16) : '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('discount-codes.update', discountCode.id));
    };

    return (
        <AuthenticatedLayout header="Editar código de descuento">
            <Head title="Editar código de descuento" />

            <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-6">
                    <Link href={route('discount-codes.index')} className="text-[#adaaaa] hover:text-[#8eff71] transition-colors">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </Link>
                    <h1 className="text-2xl font-black text-white">Editar código</h1>
                    <span className="font-mono text-[#8eff71] text-lg font-bold">{discountCode.code}</span>
                </div>

                <form onSubmit={handleSubmit} className="bg-[#131313] rounded-2xl p-6 space-y-5">
                    {/* Code */}
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-[#adaaaa] mb-1.5 font-medium">Código</label>
                        <input
                            type="text"
                            value={data.code}
                            onChange={(e) => setData('code', e.target.value.toUpperCase())}
                            className="w-full bg-[#262626] border-none rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#8eff71]/40 font-mono uppercase"
                        />
                        {errors.code && <p className="text-[#ff7351] text-xs mt-1">{errors.code}</p>}
                    </div>

                    {/* Type + Value */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-[#adaaaa] mb-1.5 font-medium">Tipo</label>
                            <select
                                value={data.type}
                                onChange={(e) => setData('type', e.target.value)}
                                className="w-full bg-[#262626] border-none rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#8eff71]/40 appearance-none"
                            >
                                <option value="percentage">Porcentaje (%)</option>
                                <option value="fixed">Monto fijo ($)</option>
                            </select>
                            {errors.type && <p className="text-[#ff7351] text-xs mt-1">{errors.type}</p>}
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-[#adaaaa] mb-1.5 font-medium">
                                Valor {data.type === 'percentage' ? '(%)' : '($)'}
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                min="0.01"
                                value={data.value}
                                onChange={(e) => setData('value', e.target.value)}
                                className="w-full bg-[#262626] border-none rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#8eff71]/40"
                            />
                            {errors.value && <p className="text-[#ff7351] text-xs mt-1">{errors.value}</p>}
                        </div>
                    </div>

                    {/* Min order + Max uses */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-[#adaaaa] mb-1.5 font-medium">Monto mínimo de pedido</label>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                value={data.min_order_amount}
                                onChange={(e) => setData('min_order_amount', e.target.value)}
                                placeholder="Sin mínimo"
                                className="w-full bg-[#262626] border-none rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#8eff71]/40 placeholder:text-[#484848]"
                            />
                            {errors.min_order_amount && <p className="text-[#ff7351] text-xs mt-1">{errors.min_order_amount}</p>}
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-[#adaaaa] mb-1.5 font-medium">Usos máximos</label>
                            <input
                                type="number"
                                min="1"
                                value={data.max_uses}
                                onChange={(e) => setData('max_uses', e.target.value)}
                                placeholder="Ilimitado"
                                className="w-full bg-[#262626] border-none rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#8eff71]/40 placeholder:text-[#484848]"
                            />
                            {errors.max_uses && <p className="text-[#ff7351] text-xs mt-1">{errors.max_uses}</p>}
                        </div>
                    </div>

                    {/* Usage info */}
                    <div className="bg-[#262626] rounded-xl p-4">
                        <p className="text-xs text-[#adaaaa] uppercase tracking-widest font-medium mb-1">Usos actuales</p>
                        <p className="text-white font-bold text-lg">
                            {discountCode.times_used}
                            <span className="text-[#adaaaa] font-normal text-sm"> / {discountCode.max_uses ?? '∞'}</span>
                        </p>
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-[#adaaaa] mb-1.5 font-medium">Válido desde</label>
                            <input
                                type="datetime-local"
                                value={data.valid_from}
                                onChange={(e) => setData('valid_from', e.target.value)}
                                className="w-full bg-[#262626] border-none rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#8eff71]/40"
                            />
                            {errors.valid_from && <p className="text-[#ff7351] text-xs mt-1">{errors.valid_from}</p>}
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-[#adaaaa] mb-1.5 font-medium">Válido hasta</label>
                            <input
                                type="datetime-local"
                                value={data.valid_until}
                                onChange={(e) => setData('valid_until', e.target.value)}
                                className="w-full bg-[#262626] border-none rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#8eff71]/40"
                            />
                            {errors.valid_until && <p className="text-[#ff7351] text-xs mt-1">{errors.valid_until}</p>}
                        </div>
                    </div>

                    {/* Active toggle */}
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setData('is_active', !data.is_active)}
                            className={`relative w-11 h-6 rounded-full transition-colors ${data.is_active ? 'bg-[#8eff71]' : 'bg-[#484848]'}`}
                        >
                            <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${data.is_active ? 'translate-x-5' : ''}`} />
                        </button>
                        <span className="text-sm text-[#adaaaa]">{data.is_active ? 'Activo' : 'Inactivo'}</span>
                    </div>

                    {/* Submit */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-[#2a2a2a]">
                        <Link
                            href={route('discount-codes.index')}
                            className="px-5 py-2.5 rounded-full bg-[#262626] text-[#adaaaa] text-sm font-medium hover:bg-[#2a2a2a] transition-colors"
                        >
                            Cancelar
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-5 py-2.5 rounded-full bg-[#8eff71] text-[#0d6100] font-bold text-sm hover:shadow-[0_0_20px_rgba(142,255,113,0.25)] transition-all active:scale-95 disabled:opacity-50"
                        >
                            {processing ? 'Guardando...' : 'Guardar cambios'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
