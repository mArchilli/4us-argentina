import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Index({ products, categories = [], filters = {} }) {
    const { flash } = usePage().props;
    const [deleteModal, setDeleteModal] = useState({ open: false, id: null, title: '' });
    const [search, setSearch] = useState(filters.search ?? '');
    const [sort, setSort] = useState(filters.sort ?? 'az');
    const [categoryId, setCategoryId] = useState(filters.category_id ?? '');
    const [featured, setFeatured] = useState(filters.featured ?? 'all');
    const [offer, setOffer] = useState(filters.offer ?? 'all');
    const selectedCategory = categories.find((category) => String(category.id) === String(categoryId));
    const activeFilterCount = [
        search.trim() !== '',
        sort === 'za',
        categoryId !== '',
        featured === '1',
        offer === '1',
    ].filter(Boolean).length;

    const openDelete = (id, title) => setDeleteModal({ open: true, id, title });
    const closeDelete = () => setDeleteModal({ open: false, id: null, title: '' });

    const applyFilters = (overrides = {}) => {
        const next = {
            search,
            sort,
            category_id: categoryId,
            featured,
            offer,
            ...overrides,
        };

        router.get(
            route('products.index'),
            {
                search: next.search || undefined,
                sort: next.sort || 'az',
                category_id: next.category_id || undefined,
                featured: next.featured !== 'all' ? next.featured : undefined,
                offer: next.offer !== 'all' ? next.offer : undefined,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    const handleResetFilters = () => {
        setSearch('');
        setSort('az');
        setCategoryId('');
        setFeatured('all');
        setOffer('all');
        applyFilters({ search: '', sort: 'az', category_id: '', featured: 'all', offer: 'all' });
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (search === (filters.search ?? '')) return;
            applyFilters({ search });
        }, 350);

        return () => clearTimeout(timeoutId);
    }, [search]);

    const confirmDelete = () => {
        router.delete(route('products.destroy', deleteModal.id));
        closeDelete();
    };

    return (
        <AuthenticatedLayout header="Productos">
            <Head title="Productos | Tabaquería Premium & Growshop — Accesorios Importados de India" />

            {/* Flash */}
            {flash?.success && (
                <div className="mb-6 bg-[#8eff71]/10 border border-[#8eff71]/30 text-[#8eff71] px-4 py-3 rounded-xl text-sm">
                    {flash.success}
                </div>
            )}

            {/* Header row */}
            <div className="flex items-start justify-between mb-6 gap-4">
                <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#6f6f6f] font-bold mb-1">Catálogo de productos</p>
                    <h1 className="text-3xl font-black tracking-tight text-white uppercase italic">Productos</h1>
                    <p className="text-xs text-[#6f6f6f] mt-1">{products.total} producto{products.total !== 1 ? 's' : ''} en total</p>
                </div>
                <Link
                    href={route('products.create')}
                    className="bg-[#8eff71] text-[#0d6100] px-5 py-2.5 rounded-full font-black text-sm uppercase tracking-tight hover:shadow-[0_0_20px_rgba(142,255,113,0.25)] transition-all active:scale-95 flex items-center gap-1.5 whitespace-nowrap"
                >
                    <span className="material-symbols-outlined text-base">add</span>
                    Nuevo producto
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-8 xl:col-span-9 order-2 lg:order-1">
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
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
                </div>

                <aside className="lg:col-span-4 xl:col-span-3 order-1 lg:order-2">
                    <div className="bg-[#131313] border border-[#2a2a2a] rounded-2xl p-4 space-y-4 lg:self-start">
                        <div className="flex items-center justify-between">
                            <p className="text-xs uppercase tracking-[0.2em] text-[#6f6f6f]">Filtros activos</p>
                            <span className="px-2 py-0.5 rounded-full bg-[#1f2020] text-[#8eff71] text-xs font-bold">
                                {activeFilterCount}
                            </span>
                        </div>

                        {activeFilterCount > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                                {search.trim() !== '' && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSearch('');
                                            applyFilters({ search: '' });
                                        }}
                                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#1f2020] border border-[#2a2a2a] text-[#adaaaa] text-[11px] hover:text-white transition-colors"
                                    >
                                        Busqueda
                                        <span className="material-symbols-outlined text-xs">close</span>
                                    </button>
                                )}

                                {sort === 'za' && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSort('az');
                                            applyFilters({ sort: 'az' });
                                        }}
                                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#1f2020] border border-[#2a2a2a] text-[#adaaaa] text-[11px] hover:text-white transition-colors"
                                    >
                                        Orden Z-A
                                        <span className="material-symbols-outlined text-xs">close</span>
                                    </button>
                                )}

                                {categoryId !== '' && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setCategoryId('');
                                            applyFilters({ category_id: '' });
                                        }}
                                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#1f2020] border border-[#2a2a2a] text-[#adaaaa] text-[11px] hover:text-white transition-colors"
                                    >
                                        {selectedCategory ? `Categoria: ${selectedCategory.name}` : 'Categoria'}
                                        <span className="material-symbols-outlined text-xs">close</span>
                                    </button>
                                )}

                                {featured === '1' && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setFeatured('all');
                                            applyFilters({ featured: 'all' });
                                        }}
                                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#1f2020] border border-[#2a2a2a] text-[#adaaaa] text-[11px] hover:text-white transition-colors"
                                    >
                                        Solo destacados
                                        <span className="material-symbols-outlined text-xs">close</span>
                                    </button>
                                )}

                                {offer === '1' && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setOffer('all');
                                            applyFilters({ offer: 'all' });
                                        }}
                                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#1f2020] border border-[#2a2a2a] text-[#adaaaa] text-[11px] hover:text-white transition-colors"
                                    >
                                        Solo en oferta
                                        <span className="material-symbols-outlined text-xs">close</span>
                                    </button>
                                )}
                            </div>
                        )}

                        <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-[#6f6f6f] mb-2">Buscar</p>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Nombre o descripcion..."
                                className="w-full bg-[#1f2020] border border-[#2a2a2a] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-[#6f6f6f] focus:outline-none focus:border-[#8eff71]/50"
                            />
                        </div>

                        <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-[#6f6f6f] mb-2">Orden</p>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSort('az');
                                        applyFilters({ sort: 'az' });
                                    }}
                                    className={`px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                                        sort === 'az'
                                            ? 'bg-[#8eff71] text-[#0d6100]'
                                            : 'bg-[#1f2020] text-[#adaaaa] hover:text-white'
                                    }`}
                                >
                                    A-Z
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSort('za');
                                        applyFilters({ sort: 'za' });
                                    }}
                                    className={`px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                                        sort === 'za'
                                            ? 'bg-[#8eff71] text-[#0d6100]'
                                            : 'bg-[#1f2020] text-[#adaaaa] hover:text-white'
                                    }`}
                                >
                                    Z-A
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs uppercase tracking-[0.2em] text-[#6f6f6f] mb-2">Categoria</label>
                            <select
                                value={categoryId}
                                onChange={(e) => {
                                    setCategoryId(e.target.value);
                                    applyFilters({ category_id: e.target.value });
                                }}
                                className="w-full bg-[#1f2020] border border-[#2a2a2a] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#8eff71]/50"
                            >
                                <option value="">Todas</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-[#6f6f6f] mb-2">Flags</p>
                            <div className="space-y-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        const next = featured === '1' ? 'all' : '1';
                                        setFeatured(next);
                                        applyFilters({ featured: next });
                                    }}
                                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                                        featured === '1'
                                            ? 'bg-[#8eff71]/10 border-[#8eff71]/40 text-[#8eff71]'
                                            : 'bg-[#1f2020] border-[#2a2a2a] text-[#adaaaa] hover:text-white'
                                    }`}
                                >
                                    <span className="font-['Space_Grotesk'] tracking-tight">Solo destacados</span>
                                    <span className={`w-5 h-5 rounded-md border flex items-center justify-center ${featured === '1' ? 'border-[#8eff71] bg-[#8eff71]/20' : 'border-[#5a5a5a]'}`}>
                                        {featured === '1' && <span className="material-symbols-outlined text-sm">check</span>}
                                    </span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        const next = offer === '1' ? 'all' : '1';
                                        setOffer(next);
                                        applyFilters({ offer: next });
                                    }}
                                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                                        offer === '1'
                                            ? 'bg-[#8eff71]/10 border-[#8eff71]/40 text-[#8eff71]'
                                            : 'bg-[#1f2020] border-[#2a2a2a] text-[#adaaaa] hover:text-white'
                                    }`}
                                >
                                    <span className="font-['Space_Grotesk'] tracking-tight">Solo en oferta</span>
                                    <span className={`w-5 h-5 rounded-md border flex items-center justify-center ${offer === '1' ? 'border-[#8eff71] bg-[#8eff71]/20' : 'border-[#5a5a5a]'}`}>
                                        {offer === '1' && <span className="material-symbols-outlined text-sm">check</span>}
                                    </span>
                                </button>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleResetFilters}
                            className="w-full px-3 py-2.5 rounded-xl bg-[#1f2020] text-[#adaaaa] hover:text-white text-sm font-medium transition-all"
                        >
                            Limpiar filtros
                        </button>
                    </div>
                </aside>
            </div>
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
                                <h3 className="font-black text-white text-base uppercase tracking-tight">Eliminar producto</h3>
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
                <h3 className="font-bold text-sm tracking-tight text-white truncate">{product.title}</h3>
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
                {product.categories?.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                        {product.categories.slice(0, 3).map((category) => (
                            <span
                                key={category.id}
                                className="text-[11px] px-2 py-0.5 rounded-full bg-[#8eff71]/10 border border-[#8eff71]/25 text-[#9dff88]"
                            >
                                {category.name}
                            </span>
                        ))}
                        {product.categories.length > 3 && (
                            <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#1f2020] text-[#9b9b9b]">
                                +{product.categories.length - 3}
                            </span>
                        )}
                    </div>
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
                    className="flex-1 text-center py-2 rounded-xl bg-[#1f2020] text-[#adaaaa] hover:text-white text-sm font-semibold transition-all"
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
