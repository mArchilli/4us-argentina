import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import RichTextEditor from '@/Components/RichTextEditor';
import CategoryPicker from '@/Components/CategoryPicker';

const inputCls =
    'w-full rounded-xl bg-[#0e0e0e] border border-[#2a2a2a] text-white placeholder:text-[#adaaaa] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#8eff71]/40 focus:border-[#8eff71]/60 transition-all';

export default function Create({ categories = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        is_featured: false,
        offer_active: false,
        offer_price: '',
        offer_ends_at: '',
        category_ids: [],
        prices: [{ label: 'Por unidad', min_quantity: 1, price: '' }],
        media: [],
        primary_media_index: 0,
    });

    const [mediaPreviews, setMediaPreviews] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('products.store'));
    };

    // ── Price handlers ──────────────────────────────────────────
    const addPrice = () =>
        setData('prices', [...data.prices, { label: '', min_quantity: 1, price: '' }]);

    const removePrice = (i) => {
        if (data.prices.length === 1) return;
        const updated = data.prices.filter((_, idx) => idx !== i);
        setData('prices', updated);
        if (data.primary_media_index >= updated.length) {
            setData('primary_media_index', Math.max(0, updated.length - 1));
        }
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

    // ── Media handlers ──────────────────────────────────────────
    const handleMediaAdd = (e) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;

        const previews = files.map((f) => ({
            url: URL.createObjectURL(f),
            type: f.type.startsWith('video') ? 'video' : 'image',
            name: f.name,
        }));

        setMediaPreviews((prev) => [...prev, ...previews]);
        setData('media', [...data.media, ...files]);

        if (data.media.length === 0) {
            setData('primary_media_index', 0);
        }
        // reset input so same file can be re-selected
        e.target.value = '';
    };

    const removeMedia = (i) => {
        const newPreviews = mediaPreviews.filter((_, idx) => idx !== i);
        const newFiles = data.media.filter((_, idx) => idx !== i);
        setMediaPreviews(newPreviews);
        setData('media', newFiles);

        let newPrimary = data.primary_media_index;
        if (newFiles.length === 0) {
            newPrimary = 0;
        } else if (newPrimary === i) {
            newPrimary = 0;
        } else if (newPrimary > i) {
            newPrimary = newPrimary - 1;
        }
        setData('primary_media_index', newPrimary);
    };

    return (
        <AuthenticatedLayout header="Nuevo Producto">
            <Head title="Nuevo Producto | Tabaquería Premium & Growshop — Accesorios Importados de India" />

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
                        Nuevo <span className="text-[#8eff71]">Producto</span>
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

                    {/* Media */}
                    <Card title="Imágenes y videos">
                        <MediaUploader
                            previews={mediaPreviews}
                            primaryIndex={data.primary_media_index}
                            onAdd={handleMediaAdd}
                            onRemove={removeMedia}
                            onSetPrimary={(i) => setData('primary_media_index', i)}
                        />
                        {errors['media'] && (
                            <p className="text-[#ff7351] text-xs mt-2">{errors['media']}</p>
                        )}
                        {errors['media.0'] && (
                            <p className="text-[#ff7351] text-xs mt-2">{errors['media.0']}</p>
                        )}
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
                                            onChange={(e) => setData('offer_ends_at', e.target.value)}
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
                        {processing ? 'Creando...' : 'Crear producto'}
                    </button>
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

function MediaUploader({ previews, primaryIndex, onAdd, onRemove, onSetPrimary }) {
    return (
        <div className="space-y-3">
            {/* Preview grid */}
            {previews.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                    {previews.map((item, i) => (
                        <div
                            key={i}
                            onClick={() => onSetPrimary(i)}
                            className={`relative aspect-square rounded-xl overflow-hidden border-2 cursor-pointer transition-colors ${
                                i === primaryIndex
                                    ? 'border-[#8eff71]'
                                    : 'border-[#2a2a2a] hover:border-[#3a3a3a]'
                            }`}
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
                            {i === primaryIndex && (
                                <span className="absolute top-1 left-1 bg-[#8eff71] text-[#0d6100] text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                                    Principal
                                </span>
                            )}
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onRemove(i);
                                }}
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

            {/* Upload zone */}
            <label className="flex flex-col items-center justify-center gap-2 py-8 border border-dashed border-[#2a2a2a] hover:border-[#8eff71]/40 rounded-xl cursor-pointer transition-colors group">
                <span className="material-symbols-outlined text-[#adaaaa] group-hover:text-[#8eff71] text-3xl transition-colors">
                    cloud_upload
                </span>
                <span className="text-sm text-[#adaaaa] group-hover:text-white transition-colors text-center px-4">
                    Hacé click para subir imágenes o videos
                </span>
                <span className="text-xs text-[#484848]">JPG, PNG, GIF, WEBP, MP4 · Máx. 100 MB</span>
                <input
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    className="hidden"
                    onChange={onAdd}
                />
            </label>

            {previews.length > 0 && (
                <p className="text-xs text-[#484848] text-center">
                    Tocá una imagen para establecerla como principal
                </p>
            )}
        </div>
    );
}
