import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Index({ categories, filters = {} }) {
    const { flash } = usePage().props;
    const [deleteModal, setDeleteModal] = useState({ open: false, id: null, name: '' });
    const [search, setSearch] = useState(filters.search ?? '');
    const [sort, setSort] = useState(filters.sort ?? 'az');

    const openDelete = (id, name) => setDeleteModal({ open: true, id, name });
    const closeDelete = () => setDeleteModal({ open: false, id: null, name: '' });

    const applyFilters = (overrides = {}) => {
        const next = {
            search,
            sort,
            ...overrides,
        };

        router.get(
            route('categories.index'),
            {
                search: next.search || undefined,
                sort: next.sort || 'az',
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (search === (filters.search ?? '')) return;
            applyFilters({ search });
        }, 350);

        return () => clearTimeout(timeoutId);
    }, [search]);

    const confirmDelete = () => {
        router.delete(route('categories.destroy', deleteModal.id));
        closeDelete();
    };

    return (
        <AuthenticatedLayout header="Categorias">
            <Head title="Categorias" />

            {flash?.success && (
                <div className="mb-6 bg-[#8eff71]/10 border border-[#8eff71]/30 text-[#8eff71] px-4 py-3 rounded-xl text-sm">
                    {flash.success}
                </div>
            )}

            <div className="flex items-start justify-between mb-6 gap-4">
                <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#6f6f6f] font-bold mb-1">Catálogo</p>
                    <h1 className="text-3xl font-black tracking-tight text-white uppercase italic">Categorías</h1>
                    <p className="text-xs text-[#6f6f6f] mt-1">
                        {categories.total} categoria{categories.total !== 1 ? 's' : ''} registradas
                    </p>
                </div>
                <Link
                    href={route('categories.create')}
                    className="bg-[#8eff71] text-[#0d6100] px-5 py-2.5 rounded-full font-black text-sm uppercase tracking-tight hover:shadow-[0_0_20px_rgba(142,255,113,0.25)] transition-all active:scale-95 flex items-center gap-1.5 whitespace-nowrap"
                >
                    <span className="material-symbols-outlined text-base">add</span>
                    Nueva categoria
                </Link>
            </div>

            <div className="bg-[#131313] border border-[#2a2a2a] rounded-2xl p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                    <div className="md:col-span-8">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Buscar por nombre o slug..."
                            className="w-full bg-[#1f2020] border border-[#2a2a2a] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-[#6f6f6f] focus:outline-none focus:border-[#8eff71]/50"
                        />
                    </div>
                    <div className="md:col-span-4 flex gap-2">
                        <button
                            type="button"
                            onClick={() => {
                                setSort('az');
                                applyFilters({ sort: 'az' });
                            }}
                            className={`flex-1 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
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
                            className={`flex-1 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                                sort === 'za'
                                    ? 'bg-[#8eff71] text-[#0d6100]'
                                    : 'bg-[#1f2020] text-[#adaaaa] hover:text-white'
                            }`}
                        >
                            Z-A
                        </button>
                    </div>
                </div>
            </div>

            {categories.data.length === 0 ? (
                <div className="bg-[#131313] border border-[#2a2a2a] rounded-2xl p-16 flex flex-col items-center gap-3">
                    <span className="material-symbols-outlined text-[#2a2a2a] text-6xl">category</span>
                    <p className="text-[#adaaaa]">No hay categorias todavia</p>
                    <Link href={route('categories.create')} className="text-[#8eff71] text-sm hover:underline">
                        Crear la primera
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {categories.data.map((category) => (
                        <article key={category.id} className="bg-[#131313] border border-[#2a2a2a] rounded-2xl p-5 hover:border-[#8eff71]/25 transition-all">
                            <div className="mb-4">
                                <p className="text-[10px] uppercase tracking-[0.2em] text-[#6f6f6f] font-bold">Categoría</p>
                                <h3 className="text-white font-black text-xl tracking-tight leading-tight mt-1">{category.name}</h3>
                            </div>

                            <div className="space-y-2 text-sm mb-5">
                                <div className="flex justify-between text-[#adaaaa]">
                                    <span>Slug</span>
                                    <span className="text-white font-mono">{category.slug}</span>
                                </div>
                                <div className="flex justify-between text-[#adaaaa]">
                                    <span>Productos</span>
                                    <span className="text-[#8eff71] font-semibold">{category.products_count}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-2">
                                <Link
                                    href={route('categories.edit', category.id)}
                                    className="px-3 py-1.5 rounded-lg bg-[#1f2020] text-[#adaaaa] hover:text-white text-sm font-semibold transition-all"
                                >
                                    Editar
                                </Link>
                                <button
                                    onClick={() => openDelete(category.id, category.name)}
                                    className="px-3 py-1.5 rounded-lg bg-[#ff7351]/10 text-[#ff7351] hover:bg-[#ff7351]/20 text-sm transition-all"
                                    title="Eliminar categoria"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            )}

            {categories.last_page > 1 && (
                <div className="mt-8 flex flex-wrap justify-center gap-2">
                    {categories.links.map((link, i) => (
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

            {deleteModal.open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeDelete} />
                    <div className="relative bg-[#131313] border border-[#2a2a2a] rounded-2xl p-6 w-full max-w-sm shadow-2xl">
                        <div className="flex items-start gap-4 mb-5">
                            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#ff7351]/10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-[#ff7351] text-xl">delete</span>
                            </div>
                            <div>
                                <h3 className="font-black text-white text-base uppercase tracking-tight">Eliminar categoria</h3>
                                <p className="text-sm text-[#adaaaa] mt-1">
                                    Vas a eliminar <span className="text-white font-medium">&quot;{deleteModal.name}&quot;</span>.
                                    Esta accion no se puede deshacer.
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
