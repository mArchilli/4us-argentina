import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ products }) {
    const { flash } = usePage().props;
    const [deleteModal, setDeleteModal] = useState({ open: false, id: null, title: '' });

    const openDelete = (id, title) => setDeleteModal({ open: true, id, title });
    const closeDelete = () => setDeleteModal({ open: false, id: null, title: '' });

    const confirmDelete = () => {
        router.delete(route('products.destroy', deleteModal.id));
        closeDelete();
    };

    return (
        <AuthenticatedLayout header="Productos">
            <Head title="Productos" />

            {/* Flash */}
            {flash?.success && (
                <div className="mb-6 bg-[#8eff71]/10 border border-[#8eff71]/30 text-[#8eff71] px-4 py-3 rounded-xl text-sm">
                    {flash.success}
                </div>
            )}

            {/* Header row */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-black text-white">Productos</h1>
                    <p className="text-sm text-[#adaaaa] mt-0.5">{products.total} producto{products.total !== 1 ? 's' : ''} en total</p>
                </div>
                <Link
                    href={route('products.create')}
                    className="bg-[#8eff71] text-[#0d6100] px-5 py-2.5 rounded-full font-bold text-sm hover:shadow-[0_0_20px_rgba(142,255,113,0.25)] transition-all active:scale-95 flex items-center gap-1.5"
                >
                    <span className="material-symbols-outlined text-base">add</span>
                    Nuevo producto
                </Link>
            </div>

            {/* Empty state */}
            {products.data.length === 0 ? (
                <div className="bg-[#131313] border border-[#2a2a2a] rounded-2xl p-16 flex flex-col items-center gap-3">
                    <span className="material-symbols-outlined text-[#2a2a2a] text-6xl">inventory_2</span>
                    <p className="text-[#adaaaa]">No hay productos todavía</p>
                    <Link href={route('products.create')} className="text-[#8eff71] text-sm hover:underline">
                        Crear el primero
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {products.data.map((product) => (
                        <ProductCard key={product.id} product={product} onDelete={openDelete} />
                    ))}
                </div>
            )}

            {/* Pagination */}
            {products.last_page > 1 && (
                <div className="mt-8 flex flex-wrap justify-center gap-2">
                    {products.links.map((link, i) => (
                        <Link
                            key={i}
                            href={link.url || '#'}
                            preserveScroll
                            className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                                link.active
                                    ? 'bg-[#8eff71] text-[#0d6100] font-bold'
                                    : link.url
                                    ? 'bg-[#1f2020] text-[#adaaaa] hover:text-white'
                                    : 'bg-[#131313] text-[#484848] pointer-events-none'
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            )}
            {/* Delete confirmation modal */}
            {deleteModal.open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeDelete} />
                    <div className="relative bg-[#131313] border border-[#2a2a2a] rounded-2xl p-6 w-full max-w-sm shadow-2xl">
                        <div className="flex items-start gap-4 mb-5">
                            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#ff7351]/10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-[#ff7351] text-xl">delete</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-base">Eliminar producto</h3>
                                <p className="text-sm text-[#adaaaa] mt-1">
                                    ¿Estás seguro que querés eliminar{' '}
                                    <span className="text-white font-medium">"{deleteModal.title}"</span>?
                                    Esta acción no se puede deshacer.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={closeDelete}
                                className="flex-1 py-2.5 rounded-xl bg-[#1f2020] text-[#adaaaa] hover:text-white text-sm font-medium transition-all"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="flex-1 py-2.5 rounded-xl bg-[#ff7351] text-white text-sm font-bold hover:bg-[#ff5a35] transition-all"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}

function ProductCard({ product, onDelete }) {
    const primary = product.primary_media;
    const basePrice = product.prices?.[0];

    return (
        <div className="bg-[#131313] border border-[#2a2a2a] rounded-2xl overflow-hidden hover:border-[#3a3a3a] transition-colors group flex flex-col">
            {/* Thumbnail */}
            <div className="relative aspect-square bg-[#0e0e0e] overflow-hidden">
                {primary ? (
                    primary.file_type === 'video' ? (
                        <video src={primary.url} className="w-full h-full object-cover" muted />
                    ) : (
                        <img
                            src={primary.url}
                            alt={product.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    )
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-[#2a2a2a] text-5xl">image</span>
                    </div>
                )}

                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {product.is_featured && (
                        <span className="bg-[#8eff71] text-[#0d6100] text-xs font-bold px-2 py-0.5 rounded-full">
                            Destacado
                        </span>
                    )}
                    {product.offer_active && (
                        <span className="bg-[#ff7351] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                            Oferta
                        </span>
                    )}
                </div>
            </div>

            {/* Info */}
            <div className="p-4 flex-1">
                <h3 className="font-bold text-white truncate">{product.title}</h3>
                {basePrice && (
                    <p className="text-[#8eff71] font-bold mt-1 text-sm">
                        ${Number(basePrice.price).toLocaleString('es-AR')} ARS
                        {basePrice.min_quantity > 1 && (
                            <span className="text-[#adaaaa] font-normal ml-1">c/u × {basePrice.min_quantity}</span>
                        )}
                    </p>
                )}
                {product.offer_active && product.offer_price && (
                    <p className="text-[#ff7351] text-xs mt-0.5">
                        Oferta: ${Number(product.offer_price).toLocaleString('es-AR')} ARS
                    </p>
                )}
                <p className="text-xs text-[#484848] mt-1">
                    {product.prices?.length || 0} precio{product.prices?.length !== 1 ? 's' : ''} ·{' '}
                    {product.media?.length ?? 0} archivo{(product.media?.length ?? 0) !== 1 ? 's' : ''}
                </p>
            </div>

            {/* Actions */}
            <div className="px-4 pb-4 flex gap-2">
                <Link
                    href={route('products.edit', product.id)}
                    className="flex-1 text-center py-2 rounded-xl bg-[#1f2020] text-[#adaaaa] hover:text-white text-sm font-medium transition-all"
                >
                    Editar
                </Link>
                <button
                    onClick={() => onDelete(product.id, product.title)}
                    className="px-3 py-2 rounded-xl bg-[#ff7351]/10 text-[#ff7351] hover:bg-[#ff7351]/20 text-sm transition-all"
                    title="Eliminar producto"
                >
                    <span className="material-symbols-outlined text-base leading-none">delete</span>
                </button>
            </div>
        </div>
    );
}
