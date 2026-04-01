import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';

export default function Edit({ settings }) {
    const { flash } = usePage().props;

    const { data, setData, put, processing, errors } = useForm({
        free_shipping_threshold: settings.free_shipping_threshold || '20000',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('store-settings.update'));
    };

    return (
        <AuthenticatedLayout header="Configuración de la tienda">
            <Head title="Configuración de la tienda" />

            <div className="max-w-2xl">
                <h1 className="text-2xl font-black text-white mb-6">Configuración de la tienda</h1>

                {flash?.success && (
                    <div className="mb-6 bg-[#8eff71]/10 border border-[#8eff71]/30 text-[#8eff71] px-4 py-3 rounded-xl text-sm">
                        {flash.success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="bg-[#131313] rounded-2xl p-6 space-y-6">
                    {/* Free shipping section */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="material-symbols-outlined text-[#8eff71] text-2xl">local_shipping</span>
                            <h2 className="text-lg font-bold text-white uppercase tracking-tight">Envío gratis</h2>
                        </div>
                        <p className="text-sm text-[#adaaaa] mb-4">
                            Configurá el monto mínimo de compra para que el cliente obtenga envío gratis. Si el valor es 0, el envío gratis estará deshabilitado.
                        </p>
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-[#adaaaa] mb-1.5 font-medium">
                                Monto mínimo para envío gratis (ARS)
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#adaaaa] text-sm font-bold">$</span>
                                <input
                                    type="number"
                                    step="1"
                                    min="0"
                                    value={data.free_shipping_threshold}
                                    onChange={(e) => setData('free_shipping_threshold', e.target.value)}
                                    className="w-full bg-[#262626] border-none rounded-xl py-3 pl-8 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#8eff71]/40"
                                />
                            </div>
                            {errors.free_shipping_threshold && (
                                <p className="text-[#ff7351] text-xs mt-1">{errors.free_shipping_threshold}</p>
                            )}
                        </div>
                        <p className="text-xs text-[#484848] mt-2">
                            Actualmente: ${Number(settings.free_shipping_threshold).toLocaleString('es-AR')} ARS
                        </p>
                    </div>

                    {/* Submit */}
                    <div className="flex justify-end pt-4 border-t border-[#2a2a2a]">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-5 py-2.5 rounded-full bg-[#8eff71] text-[#0d6100] font-bold text-sm hover:shadow-[0_0_20px_rgba(142,255,113,0.25)] transition-all active:scale-95 disabled:opacity-50"
                        >
                            {processing ? 'Guardando...' : 'Guardar configuración'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
