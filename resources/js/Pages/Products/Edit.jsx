import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import RichTextEditor from '@/Components/RichTextEditor';
import CategoryPicker from '@/Components/CategoryPicker';

const inputCls =
    'w-full rounded-xl bg-[#0e0e0e] border border-[#2a2a2a] text-white placeholder:text-[#adaaaa] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#8eff71]/40 focus:border-[#8eff71]/60 transition-all';

export default function Edit({ product, categories = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        title: product.title,
        description: product.description ?? '',
        is_featured: product.is_featured,
        offer_active: product.offer_active,
        offer_price: product.offer_price ?? '',
        offer_ends_at: product.offer_ends_at ? product.offer_ends_at.substring(0, 10) : '',
        category_ids: product.categories?.map((category) => category.id) ?? [],
        prices: product.prices.map((p) => ({
            label: p.label,
            min_quantity: p.min_quantity,
            price: p.price,
        })),
        new_media: [],
        deleted_media_ids: [],
        primary_media_id: product.media.find((m) => m.is_primary)?.id ?? null,
    });

    const [newMediaPreviews, setNewMediaPreviews] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('products.update', product.id));
    };

    // ── Price handlers ──────────────────────────────────────────
    const addPrice = () =>
        setData('prices', [...data.prices, { label: '', min_quantity: 1, price: '' }]);

    const removePrice = (i) => {
        if (data.prices.length === 1) return;
        setData('prices', data.prices.filter((_, idx) => idx !== i));
    };

    const updatePrice = (i, fieldOrObj, value) => {
        const updated = [...data.prices];
        if (typeof fieldOrObj === 'object') {
            updated[i] = { ...updated[i], ...fieldOrObj };
        } else {
            updated[i] = { ...updated[i], [fieldOrObj]: value };
        }
        setData('prices', updated);
    };

    // ── Existing media handlers ──────────────────────────────────
    const toggleDeleteMedia = (id) => {
        const ids = data.deleted_media_ids.includes(id)
            ? data.deleted_media_ids.filter((x) => x !== id)
            : [...data.deleted_media_ids, id];
        setData('deleted_media_ids', ids);
        // If we're deleting the current primary, reset it
        if (data.primary_media_id === id && !data.deleted_media_ids.includes(id)) {
            setData('primary_media_id', null);
        }
    };

    const setPrimaryExisting = (id) => {
        setData('primary_media_id', id);
    };

    // ── New media handlers ──────────────────────────────────────
    const handleNewMediaAdd = (e) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;
        const previews = files.map((f) => ({
            url: URL.createObjectURL(f),
            type: f.type.startsWith('video') ? 'video' : 'image',
            name: f.name,
        }));
        setNewMediaPreviews((prev) => [...prev, ...previews]);
        setData('new_media', [...data.new_media, ...files]);
        e.target.value = '';
    };

    const removeNewMedia = (i) => {
        setNewMediaPreviews((prev) => prev.filter((_, idx) => idx !== i));
        setData('new_media', data.new_media.filter((_, idx) => idx !== i));
    };

    const existingVisible = product.media.filter(
        (m) => !data.deleted_media_ids.includes(m.id)
    );

    return (
        <AuthenticatedLayout header="Editar Producto">
            <Head title={`Editar · ${product.title} | Tabaquería Premium & Growshop — Accesorios Importados de India`} />

            {/* Back link */}
            <div className="mb-4">
                <Link
                    href={route('products.index')}
                    className="text-[#adaaaa] hover:text-white text-sm flex items-center gap-1.5 transition-colors w-fit"
                >
                    <span className="material-symbols-outlined text-base">arrow_back</span>
                    Volver a productos
                </Link>
            </div>

            {/* Page header */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#131313] to-[#0e0e0e] border border-[#2a2a2a] px-6 py-5 mb-6">
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#8eff71]/8 blur-[60px] rounded-full pointer-events-none" />
                <div className="relative">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#6f6f6f] font-bold mb-1">Catálogo de productos</p>
                    <h1 className="text-2xl font-black tracking-tight text-white uppercase italic">
                        Editar <span className="text-[#8eff71]">{product.title}</span>
                    </h1>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* ── Left column ── */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Basic info */}
                    <Card title="Información básica">
                        <div className="space-y-4">
                            <Field label="Título" error={errors.title} required>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="Nombre del producto"
                                    className={inputCls}
                                />
                            </Field>
                            <Field label="Descripción" error={errors.description}>
                                <RichTextEditor
                                    value={data.description}
                                    onChange={(value) => setData('description', value)}
                                />
                            </Field>
                        </div>
                    </Card>

                    {/* Existing media */}
                    <Card title="Archivos actuales">
                        {product.media.length === 0 ? (
                            <p className="text-sm text-[#484848]">Este producto no tiene archivos todavía.</p>
                        ) : (
                            <>
                                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                                    {product.media.map((m) => {
                                        const isDeleted = data.deleted_media_ids.includes(m.id);
                                        const isPrimary = data.primary_media_id === m.id;
                                        return (
                                            <div
                                                key={m.id}
                                                onClick={() => !isDeleted && setPrimaryExisting(m.id)}
                                                className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-colors ${
                                                    isDeleted
                                                        ? 'border-[#ff7351] opacity-40 cursor-not-allowed'
                                                        : isPrimary
                                                        ? 'border-[#8eff71] cursor-pointer'
                                                        : 'border-[#2a2a2a] hover:border-[#3a3a3a] cursor-pointer'
                                                }`}
                                            >
                                                {m.file_type === 'video' ? (
                                                    <video
                                                        src={m.url}
                                                        className="w-full h-full object-cover"
                                                        muted
                                                    />
                                                ) : (
                                                    <img
                                                        src={m.url}
                                                        alt=""
                                                        className="w-full h-full object-cover"
                                                    />
                                                )}

                                                {isPrimary && !isDeleted && (
                                                    <span className="absolute top-1 left-1 bg-[#8eff71] text-[#0d6100] text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                                                        Principal
                                                    </span>
                                                )}
                                                {isDeleted && (
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <span className="material-symbols-outlined text-[#ff7351] text-3xl">
                                                            delete
                                                        </span>
                                                    </div>
                                                )}

                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleDeleteMedia(m.id);
                                                    }}
                                                    className={`absolute top-1 right-1 w-6 h-6 rounded-full flex items-center justify-center text-white transition-colors ${
                                                        isDeleted
                                                            ? 'bg-[#8eff71]/80 hover:bg-[#8eff71]'
                                                            : 'bg-black/70 hover:bg-[#ff7351]'
                                                    }`}
                                                    title={isDeleted ? 'Restaurar' : 'Eliminar'}
                                                >
                                                    <span className="material-symbols-outlined text-xs leading-none">
                                                        {isDeleted ? 'undo' : 'close'}
                                                    </span>
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                                <p className="text-xs text-[#484848] mt-2">
                                    Tocá una imagen para establecerla como principal · La X la marca para eliminar al guardar
                                </p>
                            </>
                        )}
                    </Card>

                    {/* New media */}
                    <Card title="Agregar nuevos archivos">
                        <div className="space-y-3">
                            {newMediaPreviews.length > 0 && (
                                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                                    {newMediaPreviews.map((item, i) => (
                                        <div
                                            key={i}
                                            className="relative aspect-square rounded-xl overflow-hidden border-2 border-[#2a2a2a]"
                                        >
                                            {item.type === 'video' ? (
                                                <video
                                                    src={item.url}
                                                    className="w-full h-full object-cover"
                                                    muted
                                                />
                                            ) : (
                                                <img
                                                    src={item.url}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            )}
                                            <button
                                                type="button"
                                                onClick={() => removeNewMedia(i)}
                                                className="absolute top-1 right-1 w-6 h-6 bg-black/70 rounded-full flex items-center justify-center text-white hover:bg-[#ff7351] transition-colors"
                                            >
                                                <span className="material-symbols-outlined text-xs leading-none">
                                                    close
                                                </span>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <label className="flex flex-col items-center justify-center gap-2 py-8 border border-dashed border-[#2a2a2a] hover:border-[#8eff71]/40 rounded-xl cursor-pointer transition-colors group">
                                <span className="material-symbols-outlined text-[#adaaaa] group-hover:text-[#8eff71] text-3xl transition-colors">
                                    cloud_upload
                                </span>
                                <span className="text-sm text-[#adaaaa] group-hover:text-white transition-colors text-center px-4">
                                    Subir más imágenes o videos
                                </span>
                                <span className="text-xs text-[#484848]">
                                    JPG, PNG, GIF, WEBP, MP4 · Máx. 100 MB
                                </span>
                                <input
                                    type="file"
                                    accept="image/*,video/*"
                                    multiple
                                    className="hidden"
                                    onChange={handleNewMediaAdd}
                                />
                            </label>
                        </div>
                    </Card>
                </div>

                {/* ── Right column ── */}
                <div className="space-y-6">
                    {/* Prices */}
                    <Card title="Precios">
                        <div className="space-y-3">
                            {data.prices.map((price, i) => (
                                <PriceTier
                                    key={i}
                                    price={price}
                                    index={i}
                                    onChange={updatePrice}
                                    onRemove={() => removePrice(i)}
                                    canRemove={data.prices.length > 1}
                                    errors={errors}
                                />
                            ))}
                            <button
                                type="button"
                                onClick={addPrice}
                                className="w-full py-2.5 rounded-xl border border-dashed border-[#2a2a2a] hover:border-[#8eff71]/40 text-[#adaaaa] hover:text-[#8eff71] text-sm transition-all flex items-center justify-center gap-2"
                            >
                                <span className="material-symbols-outlined text-base">add</span>
                                Agregar precio por cantidad
                            </button>
                        </div>
                        {errors.prices && (
                            <p className="text-[#ff7351] text-xs mt-2">{errors.prices}</p>
                        )}
                    </Card>

                    {/* Offer */}
                    <Card title="Oferta especial">
                        <div className="space-y-4">
                            <Toggle
                                label="Activar oferta"
                                checked={data.offer_active}
                                onChange={(v) => setData('offer_active', v)}
                            />
                            {data.offer_active && (
                                <>
                                    <Field label="Precio de oferta (ARS)" error={errors.offer_price}>
                                        <input
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            value={data.offer_price}
                                            onChange={(e) => setData('offer_price', e.target.value)}
                                            placeholder="0.00"
                                            className={inputCls}
                                        />
                                    </Field>
                                    <Field label="Válida hasta" error={errors.offer_ends_at}>
                                        <input
                                            type="date"
                                            value={data.offer_ends_at}
                                            onChange={(e) =>
                                                setData('offer_ends_at', e.target.value)
                                            }
                                            className={`${inputCls} [color-scheme:dark]`}
                                        />
                                    </Field>
                                </>
                            )}
                        </div>
                    </Card>

                    {/* Settings */}
                    <Card title="Configuración">
                        <div className="space-y-4">
                            <Toggle
                                label="Producto destacado"
                                description="Aparece en la sección destacada del sitio"
                                checked={data.is_featured}
                                onChange={(v) => setData('is_featured', v)}
                            />

                            <CategoryPicker
                                categories={categories}
                                selectedIds={data.category_ids}
                                onChange={(ids) => setData('category_ids', ids)}
                                errors={errors.category_ids}
                            />
                        </div>
                    </Card>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-[#8eff71] text-[#0d6100] py-3 rounded-xl font-black uppercase tracking-tight hover:shadow-[0_0_20px_rgba(142,255,113,0.25)] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {processing ? 'Guardando...' : 'Guardar cambios'}
                    </button>

                    <Link
                        href={route('products.index')}
                        className="block text-center text-sm text-[#adaaaa] hover:text-white transition-colors"
                    >
                        Cancelar
                    </Link>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}

// ── Shared helpers ──────────────────────────────────────────────

function Card({ title, children }) {
    return (
        <div className="bg-[#131313] border border-[#2a2a2a] rounded-2xl p-5">
            <h2 className="text-[10px] uppercase tracking-[0.25em] text-[#6f6f6f] font-bold mb-4">{title}</h2>
            {children}
        </div>
    );
}

function Field({ label, error, required, children }) {
    return (
        <div>
            <label className="block text-xs font-medium text-[#adaaaa] mb-1.5">
                {label}
                {required && <span className="text-[#ff7351] ml-1">*</span>}
            </label>
            {children}
            {error && <p className="text-[#ff7351] text-xs mt-1">{error}</p>}
        </div>
    );
}

function Toggle({ label, description, checked, onChange }) {
    return (
        <div className="flex items-center justify-between gap-3">
            <div>
                <p className="text-sm font-semibold text-white">{label}</p>
                {description && <p className="text-xs text-[#adaaaa] mt-0.5">{description}</p>}
            </div>
            <button
                type="button"
                role="switch"
                aria-checked={checked}
                onClick={() => onChange(!checked)}
                className={`relative flex-shrink-0 w-11 h-6 rounded-full transition-colors duration-200 ${
                    checked ? 'bg-[#8eff71]' : 'bg-[#2a2a2a]'
                }`}
            >
                <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
                        checked ? 'translate-x-5' : 'translate-x-0'
                    }`}
                />
            </button>
        </div>
    );
}

function PriceTier({ price, index, onChange, onRemove, canRemove, errors }) {
    const cls =
        'w-full rounded-xl bg-[#0a0a0a] border border-[#2a2a2a] text-white placeholder:text-[#484848] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8eff71]/40 transition-all';

    const handleQuantityChange = (value) => {
        const qty = Number(value);
        const label = qty === 1 ? 'Por unidad' : qty > 1 ? `x${qty} unidades` : price.label;
        onChange(index, { min_quantity: value, label });
    };

    return (
        <div className="bg-[#0e0e0e] border border-[#2a2a2a] rounded-xl p-3 space-y-2">
            <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#6f6f6f] font-bold">
                    {index === 0 ? 'Precio base' : `Precio ${index + 1}`}
                </span>
                {canRemove && (
                    <button
                        type="button"
                        onClick={onRemove}
                        className="text-[#adaaaa] hover:text-[#ff7351] transition-colors"
                    >
                        <span className="material-symbols-outlined text-sm leading-none">close</span>
                    </button>
                )}
            </div>
            <div className="grid grid-cols-2 gap-2">
                <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#484848] mb-1">Cantidad</label>
                    <input
                        type="number"
                        min="1"
                        value={price.min_quantity}
                        onChange={(e) => handleQuantityChange(e.target.value)}
                        placeholder="1"
                        className={cls}
                    />
                    {errors?.[`prices.${index}.min_quantity`] && (
                        <p className="text-[#ff7351] text-xs mt-1">
                            {errors[`prices.${index}.min_quantity`]}
                        </p>
                    )}
                </div>
                <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#484848] mb-1">Precio (ARS)</label>
                    <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={price.price}
                        onChange={(e) => onChange(index, 'price', e.target.value)}
                        placeholder="0.00"
                        className={cls}
                    />
                    {errors?.[`prices.${index}.price`] && (
                        <p className="text-[#ff7351] text-xs mt-1">
                            {errors[`prices.${index}.price`]}
                        </p>
                    )}
                </div>
            </div>
            <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#484848] mb-1">Etiqueta</label>
                <input
                    type="text"
                    value={price.label}
                    onChange={(e) => onChange(index, 'label', e.target.value)}
                    placeholder="Se genera automáticamente"
                    className={cls}
                />
            </div>
        </div>
    );
}
