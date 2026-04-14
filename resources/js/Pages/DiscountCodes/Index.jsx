import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ codes }) {
    const { flash } = usePage().props;
    const [deleteModal, setDeleteModal] = useState({ open: false, id: null, code: '' });

    const openDelete = (id, code) => setDeleteModal({ open: true, id, code });
    const closeDelete = () => setDeleteModal({ open: false, id: null, code: '' });
    const confirmDelete = () => {
        router.delete(route('discount-codes.destroy', deleteModal.id));
        closeDelete();
    };

    const toggleActive = (code) => {
        router.put(route('discount-codes.update', code.id), {
            ...code,
            is_active: !code.is_active,
        }, { preserveScroll: true });
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return '—';
        return new Date(dateStr).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    return (
        <AuthenticatedLayout header="Códigos de descuento">
            <Head title="Códigos de descuento | Tabaquería Premium & Growshop — Accesorios Importados de India" />

            {flash?.success && (
                <div className="mb-6 bg-[#8eff71]/10 border border-[#8eff71]/30 text-[#8eff71] px-4 py-3 rounded-xl text-sm">
                    {flash.success}
                </div>
            )}

            <div className="flex items-start justify-between mb-6 gap-4">
                <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#6f6f6f] font-bold mb-1">Promociones</p>
                    <h1 className="text-3xl font-black tracking-tight text-white uppercase italic">Descuentos</h1>
                    <p className="text-xs text-[#6f6f6f] mt-1">{codes.total} código{codes.total !== 1 ? 's' : ''} en total</p>
                </div>
                <Link
                    href={route('discount-codes.create')}
                    className="bg-[#8eff71] text-[#0d6100] px-5 py-2.5 rounded-full font-black text-sm uppercase tracking-tight hover:shadow-[0_0_20px_rgba(142,255,113,0.25)] transition-all active:scale-95 flex items-center gap-1.5 whitespace-nowrap"
                >
                    <span className="material-symbols-outlined text-base">add</span>
                    Nuevo código
                </Link>
            </div>

            {codes.data.length === 0 ? (
                <div className="text-center py-20">
                    <span className="material-symbols-outlined text-5xl text-[#262626] block mb-3">confirmation_number</span>
                    <p className="text-[#adaaaa]">No hay códigos de descuento todavía.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {codes.data.map((code) => (
                        <article key={code.id} className="bg-[#131313] border border-[#2a2a2a] rounded-2xl p-5 hover:border-[#8eff71]/25 transition-all">
                            <div className="flex items-start justify-between gap-3 mb-4">
                                <div>
                                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#6f6f6f]">Código</p>
                                    <h3 className="font-mono text-xl font-black text-[#8eff71] mt-1">{code.code}</h3>
                                </div>
                                <button
                                    onClick={() => toggleActive(code)}
                                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                                        code.is_active
                                            ? 'bg-[#8eff71]/10 text-[#8eff71]'
                                            : 'bg-[#ff7351]/10 text-[#ff7351]'
                                    }`}
                                >
                                    {code.is_active ? 'Activo' : 'Inactivo'}
                                </button>
                            </div>

                            <div className="space-y-2 text-sm mb-5">
                                <div className="flex justify-between text-[#adaaaa]">
                                    <span>Tipo</span>
                                    <span className="text-white font-medium">{code.type === 'percentage' ? 'Porcentaje' : 'Monto fijo'}</span>
                                </div>
                                <div className="flex justify-between text-[#adaaaa]">
                                    <span>Valor</span>
                                    <span className="text-white font-bold">
                                        {code.type === 'percentage' ? `${code.value}%` : `$${Number(code.value).toLocaleString('es-AR')}`}
                                    </span>
                                </div>
                                <div className="flex justify-between text-[#adaaaa]">
                                    <span>Mín. pedido</span>
                                    <span>{code.min_order_amount ? `$${Number(code.min_order_amount).toLocaleString('es-AR')}` : '—'}</span>
                                </div>
                                <div className="flex justify-between text-[#adaaaa]">
                                    <span>Usos</span>
                                    <span>{code.times_used}{code.max_uses ? ` / ${code.max_uses}` : ' / ∞'}</span>
                                </div>
                            </div>

                            <div className="rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] px-3 py-2 mb-4">
                                <p className="text-[10px] uppercase tracking-widest text-[#6f6f6f] mb-0.5">Validez</p>
                                <p className="text-xs text-[#adaaaa]">{formatDate(code.valid_from)} — {formatDate(code.valid_until)}</p>
                            </div>

                            <div className="flex items-center justify-end gap-2">
                                <Link
                                    href={route('discount-codes.edit', code.id)}
                                    className="px-3 py-1.5 rounded-lg bg-[#1f2020] text-[#adaaaa] hover:text-white text-sm font-semibold transition-all"
                                >
                                    Editar
                                </Link>
                                <button
                                    onClick={() => openDelete(code.id, code.code)}
                                    className="px-3 py-1.5 rounded-lg bg-[#ff7351]/10 text-[#ff7351] hover:bg-[#ff7351]/20 text-sm transition-all"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            )}

            {/* Pagination */}
            {codes.last_page > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                    {codes.links.map((link, i) => (
                        <Link
                            key={i}
                            href={link.url || '#'}
                            className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                                link.active
                                    ? 'bg-[#8eff71] text-[#0d6100] font-bold'
                                    : link.url
                                    ? 'bg-[#1f2020] text-[#adaaaa] hover:bg-[#2a2a2a]'
                                    : 'bg-[#1f2020] text-[#484848] pointer-events-none'
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            )}

            {/* Delete modal */}
            {deleteModal.open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="bg-[#191a1a] rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl">
                        <h3 className="text-base font-black text-white uppercase tracking-tight mb-2">Eliminar código</h3>
                        <p className="text-sm text-[#adaaaa] mb-6">
                            ¿Estás seguro de eliminar el código <span className="font-mono text-[#ff7351] font-bold">{deleteModal.code}</span>? Esta acción no se puede deshacer.
                        </p>
                        <div className="flex gap-3 justify-end">
                            <button onClick={closeDelete} className="px-4 py-2 rounded-lg bg-[#262626] text-[#adaaaa] text-sm font-medium hover:bg-[#2a2a2a] transition-colors">
                                Cancelar
                            </button>
                            <button onClick={confirmDelete} className="px-4 py-2 rounded-lg bg-[#ff7351] text-white text-sm font-bold hover:bg-[#ff5a33] transition-colors">
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
