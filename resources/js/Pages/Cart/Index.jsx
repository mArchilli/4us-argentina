import { useState, useRef, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import toast from 'react-hot-toast';
import Navbar from '@/Components/Home/Navbar';
import HomeFooter from '@/Components/Home/HomeFooter';
import { emitCartChanged } from '@/utils/cartEvents';

function CartItem({ item, onUpdate, onRemove }) {
    const decrease = () => {
        if (item.quantity <= 1) return;
        onUpdate(item.product_id, item.quantity - 1, 'decrease');
    };

    const increase = () => {
        onUpdate(item.product_id, item.quantity + 1, 'increase');
    };

    return (
        <div className="bg-[#131313] rounded-[2rem] p-6 flex flex-col md:flex-row items-center gap-6 group relative overflow-hidden">
            {/* Image — grayscale by default, color on hover */}
            <div className="w-full md:w-40 h-40 bg-[#191a1a] rounded-[1rem] overflow-hidden shrink-0">
                {item.image ? (
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-[#2a2a2a] text-5xl">image</span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex-grow w-full">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-white tracking-tight">{item.title}</h3>
                        <p className="text-[#adaaaa] text-xs uppercase tracking-widest mt-1 font-medium">
                            ${Number(item.unit_price).toLocaleString('es-AR')} ARS · unidad
                        </p>
                    </div>
                    <p className="font-['Space_Grotesk'] text-xl font-bold text-[#8eff71] shrink-0 ml-4">
                        ${Number(item.line_total).toLocaleString('es-AR')}
                    </p>
                </div>

                <div className="flex items-center justify-between mt-8">
                    {/* Quantity pill */}
                    <div className="flex items-center bg-[#262626] rounded-full px-4 py-2 gap-4">
                        <button
                            onClick={decrease}
                            disabled={item.quantity <= 1}
                            className="text-[#adaaaa] hover:text-[#8eff71] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <span className="material-symbols-outlined text-sm">remove</span>
                        </button>
                        <span className="font-bold text-sm min-w-[1.5rem] text-center text-white">
                            {String(item.quantity).padStart(2, '0')}
                        </span>
                        <button
                            onClick={increase}
                            className="text-[#adaaaa] hover:text-[#8eff71] transition-colors"
                        >
                            <span className="material-symbols-outlined text-sm">add</span>
                        </button>
                    </div>

                    {/* Remove */}
                    <button
                        onClick={() => onRemove(item.product_id)}
                        className="text-[#ff7351] opacity-40 hover:opacity-100 transition-opacity flex items-center gap-1 text-xs uppercase font-bold tracking-widest"
                    >
                        <span className="material-symbols-outlined text-sm">delete</span>
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function CartIndex({ auth, items = [], subtotal = 0, freeShippingThreshold = 20000, discount = null }) {
    const footerRef = useRef(null);
    const [footerVisible, setFooterVisible] = useState(false);

    useEffect(() => {
        const el = footerRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => setFooterVisible(entry.intersectionRatio >= 0.8),
            { threshold: [0, 0.8] }
        );
        observer.observe(el);
        return () => observer.unobserve(el);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    const [promoCode, setPromoCode] = useState('');
    const [applyingCode, setApplyingCode] = useState(false);

    const handleUpdate = (productId, quantity, action) => {
        router.patch(
            route('cart.update'),
            { product_id: productId, quantity },
            {
                preserveScroll: true,
                onSuccess: () => {
                    if (action === 'increase') toast.success('Cantidad aumentada.');
                    if (action === 'decrease') toast.success('Cantidad reducida.');
                    emitCartChanged();
                },
                onError: () => toast.error('No se pudo actualizar la cantidad.'),
            }
        );
    };

    const handleRemove = (productId) => {
        router.delete(route('cart.remove'), {
            data: { product_id: productId },
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Producto eliminado del carrito.');
                emitCartChanged();
            },
            onError: () => toast.error('No se pudo eliminar el producto.'),
        });
    };

    const handleApplyDiscount = () => {
        if (!promoCode.trim()) return;
        setApplyingCode(true);
        router.post(route('cart.applyDiscount'), { code: promoCode }, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Código de descuento aplicado.');
                setPromoCode('');
                setApplyingCode(false);
            },
            onError: (errors) => {
                toast.error(errors.discount || 'Código inválido.');
                setApplyingCode(false);
            },
        });
    };

    const handleRemoveDiscount = () => {
        router.post(route('cart.removeDiscount'), {}, {
            preserveScroll: true,
            onSuccess: () => toast.success('Código de descuento removido.'),
            onError: () => toast.error('No se pudo remover el código.'),
        });
    };

    const freeShipping = freeShippingThreshold > 0 && subtotal >= freeShippingThreshold;
    const freeShippingProgress = freeShippingThreshold > 0 ? Math.min((subtotal / freeShippingThreshold) * 100, 100) : 0;
    const total = discount ? discount.total : subtotal;

    return (
        <>
            <Head title="Carrito - 4us Argentina" />
            <div className="bg-[#0e0e0e] text-white min-h-screen">
                {/* Decorative ambient blurs */}
                <div className="fixed top-0 right-0 w-[50vw] h-[50vw] bg-[#8eff71]/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
                <div className="fixed bottom-0 left-0 w-[40vw] h-[40vw] bg-[#2ff801]/5 blur-[100px] rounded-full -z-10 pointer-events-none" />

                <Navbar auth={auth} hidden={footerVisible} />

                <main className="pt-32 pb-32 px-6 max-w-[1600px] mx-auto">

                    {items.length === 0 ? (
                        <>
                            <div className="mb-12">
                                <h1 className="text-5xl md:text-8xl font-headline font-black italic uppercase leading-none tracking-tighter mb-8">MI <span className="text-[#8eff71]">CARRITO</span><span className="text-[#8eff71]">.</span></h1>
                                <p className="text-[#adaaaa] font-medium tracking-widest uppercase text-xs">4US Argentina — Carrito vacío</p>
                            </div>
                            <div className="text-center py-24">
                                <span className="material-symbols-outlined text-7xl mb-4 block text-[#262626]">shopping_cart</span>
                                <p className="text-xl font-medium text-[#adaaaa] mb-8">Tu carrito está vacío.</p>
                                <Link
                                    href={route('catalog.index')}
                                    className="inline-flex items-center gap-2 bg-gradient-to-br from-[#8eff71] to-[#2ff801] text-[#0d6100] px-8 py-4 rounded-full font-black uppercase tracking-tight hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(142,255,113,0.15)] transition-all"
                                >
                                    <span className="material-symbols-outlined">storefront</span>
                                    Explorar catálogo
                                </Link>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Headline */}
                            <div className="mb-12">
                                <h1 className="text-5xl md:text-8xl font-headline font-black italic uppercase leading-none tracking-tighter mb-8">MI <span className="text-[#8eff71]">CARRITO</span><span className="text-[#8eff71]">.</span></h1>
                                <p className="text-[#adaaaa] font-medium tracking-widest uppercase text-xs">
                                    4US Argentina — {items.length} {items.length === 1 ? 'producto' : 'productos'}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                                {/* ── Items column (8 cols) ── */}
                                <div className="lg:col-span-8 space-y-6">
                                    {items.map((item) => (
                                        <CartItem
                                            key={item.product_id}
                                            item={item}
                                            onUpdate={handleUpdate}
                                            onRemove={handleRemove}
                                        />
                                    ))}

                                    {/* Bento promo cards */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-[#262626] rounded-[2rem] p-6 flex flex-col justify-between">
                                            <div>
                                                <span className="material-symbols-outlined text-[#8eff71] text-3xl mb-4 block">local_shipping</span>
                                                <h4 className="font-['Space_Grotesk'] text-lg font-bold uppercase">ENVÍO GRATIS</h4>
                                                <p className="text-[#adaaaa] text-xs mt-1">
                                                    {freeShipping
                                                        ? '¡Calificás para envío gratis!'
                                                        : freeShippingThreshold > 0
                                                        ? `Te faltan $${Number(freeShippingThreshold - subtotal).toLocaleString('es-AR')} para envío gratis.`
                                                        : 'Envío gratis no disponible actualmente.'}
                                                </p>
                                            </div>
                                            <div className="mt-4 bg-[#131313] rounded-full h-1.5 w-full overflow-hidden">
                                                <div
                                                    className="bg-[#8eff71] h-full transition-all duration-500"
                                                    style={{ width: `${freeShippingProgress}%` }}
                                                />
                                            </div>
                                        </div>

                                        <div className="bg-[#262626] rounded-[2rem] p-6 flex flex-col justify-between">
                                            <div>
                                                <span className="material-symbols-outlined text-[#88f6ff] text-3xl mb-4 block">loyalty</span>
                                                <h4 className="font-['Space_Grotesk'] text-lg font-bold uppercase">PUNTOS 4US</h4>
                                                <p className="text-[#adaaaa] text-xs mt-1">
                                                    Sumás {Math.floor(subtotal / 50)} puntos con esta compra para tu próximo vibe.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Continue shopping */}
                                    <Link
                                        href={route('catalog.index')}
                                        className="inline-flex items-center gap-2 text-[#adaaaa] hover:text-[#8eff71] transition-colors text-sm font-bold"
                                    >
                                        <span className="material-symbols-outlined text-base">arrow_back</span>
                                        Seguir comprando
                                    </Link>
                                </div>

                                {/* ── Summary column (4 cols) ── */}
                                <div className="lg:col-span-4">
                                    <div className="bg-[#191a1a] rounded-[2rem] p-8 sticky top-24">
                                        <h2 className="font-['Space_Grotesk'] text-2xl font-bold mb-8 uppercase tracking-tight">RESUMEN</h2>

                                        <div className="space-y-4 mb-8">
                                            <div className="flex justify-between items-center text-[#adaaaa]">
                                                <span className="text-sm font-medium uppercase tracking-widest">Subtotal</span>
                                                <span className="font-['Space_Grotesk'] font-bold text-white">${Number(subtotal).toLocaleString('es-AR')}</span>
                                            </div>
                                            {discount && (
                                                <div className="flex justify-between items-center text-[#adaaaa]">
                                                    <span className="text-sm font-medium uppercase tracking-widest flex items-center gap-1">
                                                        Descuento
                                                        <span className="text-[10px] font-mono text-[#8eff71] bg-[#8eff71]/10 px-1.5 py-0.5 rounded">{discount.code}</span>
                                                    </span>
                                                    <span className="font-['Space_Grotesk'] font-bold text-[#8eff71]">-${Number(discount.amount).toLocaleString('es-AR')}</span>
                                                </div>
                                            )}
                                            <div className="flex justify-between items-center text-[#adaaaa]">
                                                <span className="text-sm font-medium uppercase tracking-widest">Envío</span>
                                                <span className={`font-['Space_Grotesk'] font-bold ${freeShipping ? 'text-[#8eff71]' : 'text-[#adaaaa]'}`}>
                                                    {freeShipping ? 'GRATIS' : 'A confirmar'}
                                                </span>
                                            </div>
                                            <div className="h-px bg-[#484848]/20 my-4" />
                                            <div className="flex justify-between items-center">
                                                <span className="text-lg font-bold uppercase tracking-widest">Total</span>
                                                <span className="font-['Space_Grotesk'] text-3xl font-bold text-[#8eff71]">${Number(total).toLocaleString('es-AR')}</span>
                                            </div>
                                        </div>

                                        {/* Promo code */}
                                        <div className="mb-8">
                                            <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-[#adaaaa] mb-3">
                                                CÓDIGO DE DESCUENTO
                                            </label>
                                            {discount ? (
                                                <div className="flex items-center justify-between bg-[#8eff71]/10 border border-[#8eff71]/30 rounded-[1rem] py-3 px-5">
                                                    <div className="flex items-center gap-2">
                                                        <span className="material-symbols-outlined text-[#8eff71] text-lg">check_circle</span>
                                                        <span className="font-mono font-bold text-[#8eff71] text-sm">{discount.code}</span>
                                                        <span className="text-[#adaaaa] text-xs">
                                                            ({discount.type === 'percentage' ? `${discount.value}%` : `$${Number(discount.value).toLocaleString('es-AR')}`})
                                                        </span>
                                                    </div>
                                                    <button
                                                        onClick={handleRemoveDiscount}
                                                        className="text-[#ff7351] hover:text-[#ff5a33] transition-colors"
                                                    >
                                                        <span className="material-symbols-outlined text-lg">close</span>
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        value={promoCode}
                                                        onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                                                        placeholder="VIBE444"
                                                        className="w-full bg-[#262626] border-none rounded-[1rem] py-4 px-6 text-sm focus:outline-none focus:ring-1 focus:ring-[#8eff71]/40 transition-all placeholder:text-[#484848] uppercase text-white"
                                                    />
                                                    <button
                                                        onClick={handleApplyDiscount}
                                                        disabled={applyingCode || !promoCode.trim()}
                                                        className="absolute right-2 top-2 bottom-2 bg-[#131313] text-[#8eff71] px-4 rounded-[0.75rem] text-[10px] font-bold uppercase tracking-widest hover:bg-[#8eff71] hover:text-[#0d6100] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                                                    >
                                                        {applyingCode ? '...' : 'APLICAR'}
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        {/* Checkout CTA */}
                                        <Link
                                            href={route('checkout.index')}
                                            className="w-full bg-[#8eff71] text-[#0d6100] font-headline font-black italic py-5 px-8 rounded-full text-lg uppercase tracking-tight hover:shadow-[0_0_30px_rgba(142,255,113,0.3)] transition-all active:scale-95 flex items-center justify-between gap-2 group"
                                        >
                                            <span>IR AL CHECKOUT</span>
                                            <span className="material-symbols-outlined font-bold transition-transform group-hover:translate-x-2">arrow_forward</span>
                                        </Link>

                                        {/* Payment icons */}
                                        <div className="mt-6 flex justify-center gap-4">
                                            <span className="material-symbols-outlined text-[#adaaaa]/30">credit_card</span>
                                            <span className="material-symbols-outlined text-[#adaaaa]/30">account_balance_wallet</span>
                                            <span className="material-symbols-outlined text-[#adaaaa]/30">qr_code_2</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </>
                    )}
                </main>

                <button
                    onClick={scrollToTop}
                    className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-[#8eff71] text-[#0d6100] px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 text-base font-black uppercase tracking-tight transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-110 hover:shadow-[0_0_20px_rgba(142,255,113,0.4)] ${footerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
                >
                    <span className="material-symbols-outlined text-xl">arrow_upward</span>
                    Volver al inicio
                </button>

                <div ref={footerRef}>
                    <HomeFooter />
                </div>
            </div>
        </>
    );
}
