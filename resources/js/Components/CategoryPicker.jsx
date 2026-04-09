import { useState } from 'react';
import { router } from '@inertiajs/react';

const inputCls =
    'w-full rounded-xl bg-[#0e0e0e] border border-[#2a2a2a] text-white placeholder:text-[#484848] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#8eff71]/40 focus:border-[#8eff71]/60 transition-all';

export default function CategoryPicker({ categories, selectedIds, onChange, errors }) {
    const [search, setSearch] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [creating, setCreating] = useState(false);
    const [createError, setCreateError] = useState('');

    const toggleCategory = (id) => {
        const next = selectedIds.includes(id)
            ? selectedIds.filter((x) => x !== id)
            : [...selectedIds, id];
        onChange(next);
    };

    const filteredCategories = categories.filter((cat) =>
        cat.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleCreateCategory = () => {
        if (!newCategoryName.trim()) return;
        setCreating(true);
        setCreateError('');

        router.post(
            route('categories.store'),
            { name: newCategoryName.trim() },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setNewCategoryName('');
                    setShowCreateModal(false);
                    setCreating(false);
                },
                onError: (errs) => {
                    setCreateError(errs.name || 'Error al crear la categoría.');
                    setCreating(false);
                },
            }
        );
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-2">
                <div>
                    <p className="text-sm font-medium text-white">Categorías</p>
                    <p className="text-xs text-[#adaaaa] mt-0.5">Seleccioná una o varias categorías</p>
                </div>
                <button
                    type="button"
                    onClick={() => setShowCreateModal(true)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#8eff71]/10 border border-[#8eff71]/20 text-[#8eff71] text-xs font-bold hover:bg-[#8eff71]/20 transition-colors"
                >
                    <span className="material-symbols-outlined text-sm">add</span>
                    Nueva
                </button>
            </div>

            {/* Search */}
            {categories.length > 5 && (
                <div className="relative mb-3">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#484848] text-lg pointer-events-none">search</span>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Buscar categoría..."
                        className="w-full bg-[#0e0e0e] border border-[#2a2a2a] rounded-xl pl-9 pr-3 py-2 text-sm text-white placeholder-[#484848] outline-none focus:border-[#8eff71]/40 transition-colors"
                    />
                    {search && (
                        <button
                            type="button"
                            onClick={() => setSearch('')}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#484848] hover:text-white transition-colors"
                        >
                            <span className="material-symbols-outlined text-sm">close</span>
                        </button>
                    )}
                </div>
            )}

            {/* Pills */}
            {categories.length === 0 ? (
                <p className="text-xs text-[#484848] mt-2">No hay categorías creadas todavía.</p>
            ) : filteredCategories.length === 0 ? (
                <p className="text-xs text-[#484848] mt-2">No se encontraron categorías con "{search}".</p>
            ) : (
                <div className="flex flex-wrap gap-2 max-h-48 overflow-auto pr-1 py-1">
                    {filteredCategories.map((category) => {
                        const isSelected = selectedIds.includes(category.id);
                        return (
                            <button
                                key={category.id}
                                type="button"
                                onClick={() => toggleCategory(category.id)}
                                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                                    isSelected
                                        ? 'bg-[#8eff71] text-[#0d6100] shadow-[0_0_10px_rgba(142,255,113,0.2)]'
                                        : 'bg-[#0e0e0e] text-[#adaaaa] border border-[#2a2a2a] hover:border-[#8eff71]/40 hover:text-[#8eff71]'
                                }`}
                            >
                                {isSelected && (
                                    <span className="material-symbols-outlined text-sm">check</span>
                                )}
                                {category.name}
                            </button>
                        );
                    })}
                </div>
            )}

            {selectedIds.length > 0 && (
                <p className="text-xs text-[#484848] mt-2">
                    {selectedIds.length} categoría{selectedIds.length !== 1 ? 's' : ''} seleccionada{selectedIds.length !== 1 ? 's' : ''}
                </p>
            )}

            {errors && (
                <p className="text-[#ff7351] text-xs mt-1">{errors}</p>
            )}

            {/* Create category modal */}
            {showCreateModal && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
                    <div className="bg-[#131313] border border-[#2a2a2a] rounded-2xl p-6 w-full max-w-sm space-y-4 shadow-2xl">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-bold text-white">Nueva categoría</h3>
                            <button
                                type="button"
                                onClick={() => { setShowCreateModal(false); setCreateError(''); setNewCategoryName(''); }}
                                className="text-[#adaaaa] hover:text-white transition-colors"
                            >
                                <span className="material-symbols-outlined text-lg">close</span>
                            </button>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-[#adaaaa] mb-1.5">Nombre</label>
                            <input
                                type="text"
                                value={newCategoryName}
                                onChange={(e) => setNewCategoryName(e.target.value)}
                                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleCreateCategory(); } }}
                                placeholder="Ej: Accesorios"
                                className={inputCls}
                                autoFocus
                            />
                            {createError && (
                                <p className="text-[#ff7351] text-xs mt-1">{createError}</p>
                            )}
                        </div>

                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => { setShowCreateModal(false); setCreateError(''); setNewCategoryName(''); }}
                                className="flex-1 py-2.5 rounded-xl border border-[#2a2a2a] text-[#adaaaa] text-sm font-bold hover:text-white hover:border-[#3a3a3a] transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                onClick={handleCreateCategory}
                                disabled={creating || !newCategoryName.trim()}
                                className="flex-1 py-2.5 rounded-xl bg-[#8eff71] text-[#0d6100] text-sm font-black uppercase tracking-tight hover:shadow-[0_0_15px_rgba(142,255,113,0.25)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {creating ? 'Creando...' : 'Crear'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
