import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';

export default function Edit({ settings, catalog }) {
    const { flash } = usePage().props;

    const { data, setData, put, processing, errors } = useForm({
        free_shipping_threshold: settings.free_shipping_threshold || '20000',
    });

    const {
        data: catalogData,
        setData: setCatalogData,
        post: postCatalog,
        processing: catalogProcessing,
        errors: catalogErrors,
        reset: resetCatalog,
    } = useForm({ catalog: null });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('store-settings.update'));
    };

    const handleCatalogSubmit = (e) => {
        e.preventDefault();
        postCatalog(route('store-settings.catalog'), {
            onSuccess: () => resetCatalog(),
        });
    };

    return (
        <AuthenticatedLayout header="Configuración de la tienda">
            <Head title="Configuración de la tienda | Tabaquería Premium & Growshop — Accesorios Importados de India" />

            <div className="max-w-2xl">
                {/* Page header */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#131313] to-[#0e0e0e] border border-[#2a2a2a] px-6 py-5 mb-6">
                    <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#8eff71]/8 blur-[60px] rounded-full pointer-events-none" />
                    <div className="relative">
                        <p className="text-[10px] uppercase tracking-[0.3em] text-[#6f6f6f] font-bold mb-1">Tienda</p>
                        <h1 className="text-2xl font-black tracking-tight text-white uppercase italic">
                            <span className="text-[#8eff71]">Configuración</span>
                        </h1>
                    </div>
                </div>

                {flash?.success && (
                    <div className="mb-6 bg-[#8eff71]/10 border border-[#8eff71]/30 text-[#8eff71] px-4 py-3 rounded-xl text-sm">
                        {flash.success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="bg-[#131313] rounded-2xl p-6 space-y-6 mb-6">
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
                            className="px-5 py-2.5 rounded-full bg-[#8eff71] text-[#0d6100] font-black text-sm uppercase tracking-tight hover:shadow-[0_0_20px_rgba(142,255,113,0.25)] transition-all active:scale-95 disabled:opacity-50"
                        >
                            {processing ? 'Guardando...' : 'Guardar configuración'}
                        </button>
                    </div>
                </form>

                {/* Catalog section */}
                <form onSubmit={handleCatalogSubmit} className="bg-[#131313] rounded-2xl p-6 space-y-6">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="material-symbols-outlined text-[#8eff71] text-2xl">picture_as_pdf</span>
                            <h2 className="text-lg font-bold text-white uppercase tracking-tight">Catálogo PDF</h2>
                        </div>
                        <p className="text-sm text-[#adaaaa] mb-4">
                            Subí el catálogo en formato PDF. Este archivo estará disponible para que los clientes lo descarguen desde la tienda.
                        </p>

                        {catalog.exists && (
                            <div className="flex items-center gap-3 mb-4 bg-[#262626] rounded-xl px-4 py-3">
                                <span className="material-symbols-outlined text-[#8eff71] text-xl">check_circle</span>
                                <span className="text-sm text-white flex-1">Catálogo actual disponible</span>
                                <a
                                    href={catalog.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-xs text-[#8eff71] hover:underline flex items-center gap-1"
                                >
                                    <span className="material-symbols-outlined text-sm">open_in_new</span>
                                    Ver
                                </a>
                            </div>
                        )}

                        <div>
                            <label className="block text-xs uppercase tracking-widest text-[#adaaaa] mb-1.5 font-medium">
                                {catalog.exists ? 'Reemplazar catálogo' : 'Subir catálogo'} (PDF, máx. 20 MB)
                            </label>
                            <input
                                type="file"
                                accept=".pdf,application/pdf"
                                onChange={(e) => setCatalogData('catalog', e.target.files[0] ?? null)}
                                className="w-full bg-[#262626] border-none rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#8eff71]/40 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[#8eff71] file:text-[#0d6100] hover:file:opacity-80 cursor-pointer"
                            />
                            {catalogErrors.catalog && (
                                <p className="text-[#ff7351] text-xs mt-1">{catalogErrors.catalog}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-[#2a2a2a]">
                        <button
                            type="submit"
                            disabled={catalogProcessing || !catalogData.catalog}
                            className="px-5 py-2.5 rounded-full bg-[#8eff71] text-[#0d6100] font-black text-sm uppercase tracking-tight hover:shadow-[0_0_20px_rgba(142,255,113,0.25)] transition-all active:scale-95 disabled:opacity-50"
                        >
                            {catalogProcessing ? 'Subiendo...' : catalog.exists ? 'Reemplazar catálogo' : 'Subir catálogo'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
