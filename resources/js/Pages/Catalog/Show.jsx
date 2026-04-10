import { useEffect, useRef, useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import toast from 'react-hot-toast';
import Navbar from '@/Components/Home/Navbar';
import HomeFooter from '@/Components/Home/HomeFooter';
import { emitCartChanged } from '@/utils/cartEvents';
import { sanitizeHtml } from '@/utils/sanitize';

/* ─────────────────────────── Small reusable card ─────────────────────── */
function MiniProductCard({ product }) {
    const image = product.primary_media?.url ?? null;
    const firstPrice = product.prices?.[0];

    return (
        <Link
            href={route('catalog.show', product.id)}
            className="group flex flex-col bg-[#131313] rounded-[1.4rem] overflow-hidden hover:scale-[1.02] transition-all duration-400 shadow-lg"
        >
            <div className="aspect-[4/5] overflow-hidden relative">
                {image ? (
                    <img
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        src={image}
                        alt={product.title}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#1a1a1a]">
                        <span className="material-symbols-outlined text-[#2a2a2a] text-5xl">image</span>
                    </div>
                )}
                {product.offer_active && (
                    <div className="absolute top-3 right-3">
                        <span className="bg-[#ff7351] text-white px-3 py-0.5 rounded-full text-xs font-bold">Oferta</span>
                    </div>
                )}
            </div>
            <div className="p-4">
                <h4 className="font-bold text-white text-sm leading-tight line-clamp-1 mb-1">{product.title}</h4>
                {firstPrice && (
                    <p className="text-[#8eff71] font-black text-sm">
                        ${Number(firstPrice.price).toLocaleString('es-AR')} ARS
                    </p>
                )}
                {product.categories?.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                        {product.categories.slice(0, 2).map((cat) => (
                            <span key={cat.id} className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#8eff71]/10 border border-[#8eff71]/20 text-[#9dff88] uppercase">
                                {cat.name}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </Link>
    );
}

/* ─────────────────────────── Section strip ───────────────────────────── */
function ProductStrip({ title, accent, products }) {
    if (!products?.length) return null;

    return (
        <section className="mt-20">
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-8 uppercase">
                {title} <span style={{ color: accent }}>.</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {products.map((p) => (
                    <MiniProductCard key={p.id} product={p} />
                ))}
            </div>
        </section>
    );
}

/* ─────────────────────────── Main page ───────────────────────────────── */
export default function CatalogShow({ auth, product, featured = [], onOffer = [], related = [] }) {
    const mediaItems = product.media ?? [];
    const [activeImage, setActiveImage] = useState(
        mediaItems.find((m) => m.is_primary) ?? mediaItems[0] ?? null
    );
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [previewIndex, setPreviewIndex] = useState(0);
    const [previewScale, setPreviewScale] = useState(1);
    const [previewOffset, setPreviewOffset] = useState({ x: 0, y: 0 });
    const [isDraggingPreview, setIsDraggingPreview] = useState(false);
    const [dragStartPoint, setDragStartPoint] = useState({ x: 0, y: 0 });
    const pinchDistanceRef = useRef(0);
    const pinchScaleRef = useRef(1);

    const sortedPrices = [...(product.prices ?? [])].sort((a, b) => a.min_quantity - b.min_quantity);
    const firstPrice = sortedPrices[0];
    const hasMultiplePrices = sortedPrices.length > 1;
    const [quantity, setQuantity] = useState(firstPrice?.min_quantity ?? 1);

    const findTierForQuantity = (qty) => {
        for (let i = sortedPrices.length - 1; i >= 0; i--) {
            if ((sortedPrices[i].min_quantity || 1) <= qty) return i;
        }
        return 0;
    };

    const activeTierIndex = findTierForQuantity(quantity);
    const activeTier = sortedPrices[activeTierIndex] ?? sortedPrices[0];
    const unitPrice = activeTier ? Number(activeTier.price) : 0;
    const totalPrice = unitPrice * quantity;

    const handleQuantityChange = (value) => {
        const parsed = Number(value);
        if (Number.isNaN(parsed)) {
            setQuantity(1);
            return;
        }
        const qty = Math.max(1, Math.floor(parsed));
        setQuantity(qty);
    };

    const handleAddToCart = () => {
        router.post(
            route('cart.add'),
            { product_id: product.id, quantity },
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success(`${quantity} unidad(es) agregadas al carrito.`);
                    emitCartChanged();
                },
                onError: () => toast.error('No se pudo agregar el producto.'),
            }
        );
    };

    const resetPreviewTransform = () => {
        setPreviewScale(1);
        setPreviewOffset({ x: 0, y: 0 });
    };

    const openPreview = (index) => {
        setPreviewIndex(index);
        resetPreviewTransform();
        setIsPreviewOpen(true);
    };

    const closePreview = () => {
        setIsPreviewOpen(false);
        setIsDraggingPreview(false);
        resetPreviewTransform();
    };

    const movePreview = (direction) => {
        if (!mediaItems.length) return;
        setPreviewIndex((prev) => (prev + direction + mediaItems.length) % mediaItems.length);
        resetPreviewTransform();
    };

    const zoomPreview = (delta) => {
        setPreviewScale((prev) => {
            const next = Math.min(4, Math.max(1, prev + delta));
            if (next === 1) {
                setPreviewOffset({ x: 0, y: 0 });
            }
            return next;
        });
    };

    const handlePreviewWheel = (e) => {
        e.preventDefault();
        zoomPreview(e.deltaY < 0 ? 0.2 : -0.2);
    };

    const handlePreviewMouseDown = (e) => {
        if (previewScale <= 1) return;
        setIsDraggingPreview(true);
        setDragStartPoint({ x: e.clientX - previewOffset.x, y: e.clientY - previewOffset.y });
    };

    const handlePreviewMouseMove = (e) => {
        if (!isDraggingPreview || previewScale <= 1) return;
        setPreviewOffset({
            x: e.clientX - dragStartPoint.x,
            y: e.clientY - dragStartPoint.y,
        });
    };

    const handlePreviewMouseUp = () => {
        setIsDraggingPreview(false);
    };

    const getTouchDistance = (touchA, touchB) => {
        const dx = touchA.clientX - touchB.clientX;
        const dy = touchA.clientY - touchB.clientY;
        return Math.sqrt(dx * dx + dy * dy);
    };

    const handlePreviewTouchStart = (e) => {
        if (e.touches.length === 2) {
            pinchDistanceRef.current = getTouchDistance(e.touches[0], e.touches[1]);
            pinchScaleRef.current = previewScale;
            setIsDraggingPreview(false);
            return;
        }

        if (e.touches.length === 1 && previewScale > 1) {
            const touch = e.touches[0];
            setIsDraggingPreview(true);
            setDragStartPoint({ x: touch.clientX - previewOffset.x, y: touch.clientY - previewOffset.y });
        }
    };

    const handlePreviewTouchMove = (e) => {
        if (e.touches.length === 2) {
            const distance = getTouchDistance(e.touches[0], e.touches[1]);
            const baseDistance = pinchDistanceRef.current || distance;
            const scaleFromPinch = pinchScaleRef.current * (distance / baseDistance);
            const clampedScale = Math.min(4, Math.max(1, scaleFromPinch));
            setPreviewScale(clampedScale);
            if (clampedScale === 1) {
                setPreviewOffset({ x: 0, y: 0 });
            }
            return;
        }

        if (e.touches.length === 1 && isDraggingPreview && previewScale > 1) {
            const touch = e.touches[0];
            setPreviewOffset({
                x: touch.clientX - dragStartPoint.x,
                y: touch.clientY - dragStartPoint.y,
            });
        }
    };

    const handlePreviewTouchEnd = () => {
        if (previewScale <= 1) {
            setPreviewOffset({ x: 0, y: 0 });
        }
        setIsDraggingPreview(false);
        pinchDistanceRef.current = 0;
    };

    useEffect(() => {
        if (!isPreviewOpen) return;

        const onKeyDown = (event) => {
            if (event.key === 'Escape') closePreview();
            if (event.key === 'ArrowRight') movePreview(1);
            if (event.key === 'ArrowLeft') movePreview(-1);
            if (event.key === '+') zoomPreview(0.2);
            if (event.key === '-') zoomPreview(-0.2);
        };

        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', onKeyDown);

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isPreviewOpen]);

    const previewImage = mediaItems[previewIndex] ?? null;

    return (
        <>
            <Head title={`${product.title} - 4us Argentina`} />
            <div className="bg-[#0e0e0e] text-white min-h-screen">
                <Navbar auth={auth} />

                <main className="pt-28 pb-24 px-6 md:px-10 max-w-7xl mx-auto">

                    {/* Back button */}
                    {(() => {
                        const params = new URLSearchParams(window.location.search);
                        const page = params.get('page');
                        const backUrl = page && page !== '1'
                            ? `${route('catalog.index')}?page=${page}`
                            : route('catalog.index');

                        return (
                            <Link
                                href={backUrl}
                                className="inline-flex items-center gap-2 mb-6 px-5 py-2.5 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] text-[#adaaaa] text-sm font-bold uppercase tracking-wide hover:border-[#8eff71]/40 hover:text-[#8eff71] transition-all duration-300 group"
                            >
                                <span className="material-symbols-outlined text-base transition-transform duration-300 group-hover:-translate-x-1">arrow_back</span>
                                Volver al catálogo
                            </Link>
                        );
                    })()}

                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-[#adaaaa] mb-10">
                        <Link href={route('catalog.index')} className="hover:text-[#8eff71] transition-colors">
                            Catálogo
                        </Link>
                        <span className="material-symbols-outlined text-sm text-[#484848]">chevron_right</span>
                        {product.categories?.[0] && (
                            <>
                                <Link
                                    href={route('catalog.index', { categoria: product.categories[0].slug })}
                                    className="hover:text-[#8eff71] transition-colors"
                                >
                                    {product.categories[0].name}
                                </Link>
                                <span className="material-symbols-outlined text-sm text-[#484848]">chevron_right</span>
                            </>
                        )}
                        <span className="text-white font-medium line-clamp-1">{product.title}</span>
                    </nav>

                    {/* Product detail grid */}
                    <div className="grid md:grid-cols-2 gap-12 lg:gap-20">

                        {/* ── Left: image gallery ── */}
                        <div className="flex flex-col gap-4">
                            {/* Main image */}
                            <div className="aspect-[4/5] rounded-[1.8rem] overflow-hidden bg-[#131313] relative">
                                {activeImage ? (
                                    <img
                                        key={activeImage.id}
                                        src={activeImage.url}
                                        alt={product.title}
                                        className="w-full h-full object-cover cursor-zoom-in"
                                        onClick={() => {
                                            const index = mediaItems.findIndex((item) => item.id === activeImage.id);
                                            openPreview(index >= 0 ? index : 0);
                                        }}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[#2a2a2a] text-8xl">image</span>
                                    </div>
                                )}

                                {product.offer_active && (
                                    <div className="absolute top-5 right-5">
                                        <span className="bg-[#ff7351] text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide">
                                            Oferta
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Thumbnails */}
                            {product.media?.length > 1 && (
                                <div className="flex gap-3 flex-wrap overflow-x-auto pb-1">
                                    {product.media.map((media) => (
                                        <button
                                            key={media.id}
                                            onClick={() => setActiveImage(media)}
                                            className={`flex-shrink-0 w-20 h-20 rounded-[0.8rem] overflow-hidden border-2 transition-all ${
                                                activeImage?.id === media.id
                                                    ? 'border-[#8eff71] opacity-100'
                                                    : 'border-transparent opacity-50 hover:opacity-75'
                                            }`}
                                        >
                                            <img src={media.url} alt="" className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* ── Right: product info ── */}
                        <div className="flex flex-col">
                            {/* Categories */}
                            {product.categories?.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {product.categories.map((cat) => (
                                        <Link
                                            key={cat.id}
                                            href={route('catalog.index', { categoria: cat.slug })}
                                            className="px-3 py-1 rounded-full text-xs font-black bg-[#8eff71] text-[#0d6100] uppercase tracking-widest hover:shadow-[0_0_12px_rgba(142,255,113,0.4)] transition-all"
                                        >
                                            {cat.name}
                                        </Link>
                                    ))}
                                </div>
                            )}

                            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none mb-4">
                                {product.title}
                            </h1>

                            {/* Price block */}
                            {sortedPrices.length > 0 && (
                                <div className="mb-6">
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-xs uppercase tracking-[0.18em] text-[#adaaaa] mb-1">Precio por unidad actual</p>
                                            <span className="text-4xl font-black text-[#8eff71]">
                                                ${unitPrice.toLocaleString('es-AR')} ARS
                                            </span>
                                            <p className="mt-1 text-[#adaaaa] text-sm">
                                                Total: <span className="text-white font-semibold">${totalPrice.toLocaleString('es-AR')} ARS</span>
                                            </p>
                                        </div>

                                        {hasMultiplePrices && (
                                            <div className="flex flex-wrap gap-2">
                                                {sortedPrices.map((price, i) => (
                                                    <button
                                                        key={price.id}
                                                        type="button"
                                                        onClick={() => setQuantity(price.min_quantity || 1)}
                                                        className={`px-3 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all ${
                                                            activeTierIndex === i
                                                                ? 'bg-[#8eff71] text-[#0d6100]'
                                                                : 'bg-[#1a1a1a] text-[#adaaaa] border border-[#2a2a2a] hover:border-[#8eff71]/40 hover:text-white'
                                                        }`}
                                                    >
                                                        {price.label || `${price.min_quantity}+ u`} · ${Number(price.price).toLocaleString('es-AR')} c/u
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {product.offer_active && product.offer_price && (
                                        <div className="mt-2 flex items-center gap-3">
                                            <span className="text-2xl font-black text-[#ff7351]">
                                                ${Number(product.offer_price).toLocaleString('es-AR')} ARS
                                            </span>
                                            <span className="bg-[#ff7351]/15 text-[#ff7351] px-3 py-0.5 rounded-full text-xs font-bold uppercase">
                                                Precio oferta
                                            </span>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Description */}
                            {product.description && (
                                <div
                                    className="product-description mb-8"
                                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(product.description) }}
                                />
                            )}

                            {/* Divider */}
                            <div className="border-t border-[#1f2020] mb-8" />

                            <div className="mb-5">
                                <p className="text-xs uppercase tracking-[0.18em] text-[#adaaaa] mb-2">Cantidad</p>
                                <div className="inline-flex items-center bg-[#131313] border border-[#2a2a2a] rounded-full overflow-hidden">
                                    <button
                                        type="button"
                                        onClick={() => handleQuantityChange(quantity - 1)}
                                        className="w-11 h-11 flex items-center justify-center text-white hover:bg-[#1f2020] transition-colors"
                                        aria-label="Disminuir cantidad"
                                    >
                                        <span className="material-symbols-outlined">remove</span>
                                    </button>
                                    <input
                                        type="number"
                                        min="1"
                                        value={quantity}
                                        onChange={(e) => handleQuantityChange(e.target.value)}
                                        className="w-20 bg-transparent text-center text-white font-bold outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleQuantityChange(quantity + 1)}
                                        className="w-11 h-11 flex items-center justify-center text-white hover:bg-[#1f2020] transition-colors"
                                        aria-label="Aumentar cantidad"
                                    >
                                        <span className="material-symbols-outlined">add</span>
                                    </button>
                                </div>
                            </div>

                            {/* CTA */}
                            <button
                                onClick={handleAddToCart}
                                disabled={!sortedPrices.length}
                                className="flex items-center justify-center gap-3 w-full bg-[#8eff71] text-[#0d6100] py-4 rounded-full font-black uppercase tracking-widest hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(142,255,113,0.4)] transition-all text-base"
                            >
                                <span className="material-symbols-outlined">add_shopping_cart</span>
                                Agregar {quantity} al carrito
                            </button>

                            <a
                                href={`https://wa.me/5491169659907?text=${encodeURIComponent(`Hola! Me interesa el producto: ${product.title}`)}`}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-center gap-3 w-full mt-3 border border-white/15 bg-white/5 text-white py-3.5 rounded-full font-bold uppercase tracking-wider hover:border-white/30 transition-all text-sm"
                            >
                                <span className="material-symbols-outlined text-base">forum</span>
                                Consultar por WhatsApp
                            </a>

                            {/* Offer badge */}
                            {product.offer_active && product.offer_ends_at && (
                                <div className="mt-6 flex items-center gap-2 text-sm text-[#ff7351] bg-[#ff7351]/10 border border-[#ff7351]/20 rounded-xl px-4 py-3">
                                    <span className="material-symbols-outlined text-base">schedule</span>
                                    Oferta válida hasta el{' '}
                                    {new Date(product.offer_ends_at).toLocaleDateString('es-AR', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    })}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Related, Featured, On offer strips */}
                    <ProductStrip title="Productos Relacionados" accent="#8eff71" products={related} />
                    <ProductStrip title="Productos Destacados" accent="#8eff71" products={featured} />
                    <ProductStrip title="En Oferta" accent="#ff7351" products={onOffer} />

                </main>

                <HomeFooter />
            </div>

            {isPreviewOpen && previewImage && (
                <div className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-sm flex flex-col">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                        <p className="text-sm text-[#d6d6d6]">
                            Imagen {previewIndex + 1} de {mediaItems.length}
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => zoomPreview(-0.2)}
                                className="w-9 h-9 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors"
                                aria-label="Alejar"
                            >
                                <span className="material-symbols-outlined text-base">remove</span>
                            </button>
                            <button
                                type="button"
                                onClick={resetPreviewTransform}
                                className="px-3 h-9 rounded-full border border-white/20 text-white text-xs font-bold uppercase tracking-wide hover:bg-white/10 transition-colors"
                            >
                                Reset
                            </button>
                            <button
                                type="button"
                                onClick={() => zoomPreview(0.2)}
                                className="w-9 h-9 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors"
                                aria-label="Acercar"
                            >
                                <span className="material-symbols-outlined text-base">add</span>
                            </button>
                            <button
                                type="button"
                                onClick={closePreview}
                                className="w-9 h-9 rounded-full border border-white/20 text-white hover:bg-[#ff7351] hover:border-[#ff7351] transition-colors"
                                aria-label="Cerrar previsualizacion"
                            >
                                <span className="material-symbols-outlined text-base">close</span>
                            </button>
                        </div>
                    </div>

                    <div
                        className="flex-1 relative overflow-hidden touch-none"
                        onWheel={handlePreviewWheel}
                        onMouseMove={handlePreviewMouseMove}
                        onMouseUp={handlePreviewMouseUp}
                        onMouseLeave={handlePreviewMouseUp}
                        onTouchStart={handlePreviewTouchStart}
                        onTouchMove={handlePreviewTouchMove}
                        onTouchEnd={handlePreviewTouchEnd}
                    >
                        {mediaItems.length > 1 && (
                            <>
                                <button
                                    type="button"
                                    onClick={() => movePreview(-1)}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/55 border border-white/20 text-white hover:bg-black/80 transition-colors"
                                    aria-label="Imagen anterior"
                                >
                                    <span className="material-symbols-outlined">chevron_left</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => movePreview(1)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/55 border border-white/20 text-white hover:bg-black/80 transition-colors"
                                    aria-label="Imagen siguiente"
                                >
                                    <span className="material-symbols-outlined">chevron_right</span>
                                </button>
                            </>
                        )}

                        <div className="w-full h-full flex items-center justify-center px-4">
                            <img
                                src={previewImage.url}
                                alt={product.title}
                                onMouseDown={handlePreviewMouseDown}
                                draggable={false}
                                className={`max-w-full max-h-full select-none ${previewScale > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in'}`}
                                style={{
                                    transform: `translate(${previewOffset.x}px, ${previewOffset.y}px) scale(${previewScale})`,
                                    transformOrigin: 'center center',
                                    transition: isDraggingPreview ? 'none' : 'transform 120ms ease-out',
                                }}
                            />
                        </div>
                    </div>

                    <div className="px-4 py-3 border-t border-white/10 text-xs text-[#adaaaa] text-center">
                        Desktop: rueda para zoom, arrastrar para mover, flechas para navegar. Mobile: pellizcar para zoom y arrastrar para mover.
                    </div>
                </div>
            )}
        </>
    );
}
