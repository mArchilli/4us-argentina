import { useState } from 'react';
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

export default function CartIndex({ auth, items = [], subtotal = 0 }) {
    const [promoCode, setPromoCode] = useState('');

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

    const freeShipping = subtotal >= 20000;
    const freeShippingProgress = Math.min((subtotal / 20000) * 100, 100);

    return (
        <>
            <Head title="Carrito - 4us Argentina" />
            <div className="bg-[#0e0e0e] text-white min-h-screen">
                {/* Decorative ambient blurs */}
                <div className="fixed top-0 right-0 w-[50vw] h-[50vw] bg-[#8eff71]/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
                <div className="fixed bottom-0 left-0 w-[40vw] h-[40vw] bg-[#2ff801]/5 blur-[100px] rounded-full -z-10 pointer-events-none" />

                <Navbar auth={auth} />

                <main className="pt-32 pb-32 px-6 max-w-[1600px] mx-auto">

                    {items.length === 0 ? (
                        <>
                            <div className="mb-12">
                                <h1 className="text-5xl md:text-8xl font-headline font-black italic uppercase leading-none tracking-tighter mb-8">MI <span className="text-[#8eff71]">CARRITO</span>.</h1>
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
                                <h1 className="text-5xl md:text-8xl font-headline font-black italic uppercase leading-none tracking-tighter mb-8">MI <span className="text-[#8eff71]">CARRITO</span>.</h1>
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
                                                        : `Te faltan $${Number(20000 - subtotal).toLocaleString('es-AR')} para envío gratis.`}
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
                                            <div className="flex justify-between items-center text-[#adaaaa]">
                                                <span className="text-sm font-medium uppercase tracking-widest">Envío</span>
                                                <span className={`font-['Space_Grotesk'] font-bold ${freeShipping ? 'text-[#8eff71]' : 'text-[#adaaaa]'}`}>
                                                    {freeShipping ? 'GRATIS' : 'A confirmar'}
                                                </span>
                                            </div>
                                            <div className="h-px bg-[#484848]/20 my-4" />
                                            <div className="flex justify-between items-center">
                                                <span className="text-lg font-bold uppercase tracking-widest">Total</span>
                                                <span className="font-['Space_Grotesk'] text-3xl font-bold text-[#8eff71]">${Number(subtotal).toLocaleString('es-AR')}</span>
                                            </div>
                                        </div>

                                        {/* Promo code */}
                                        <div className="mb-8">
                                            <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-[#adaaaa] mb-3">
                                                CÓDIGO DE DESCUENTO
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    value={promoCode}
                                                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                                                    placeholder="VIBE444"
                                                    className="w-full bg-[#262626] border-none rounded-[1rem] py-4 px-6 text-sm focus:outline-none focus:ring-1 focus:ring-[#8eff71]/40 transition-all placeholder:text-[#484848] uppercase text-white"
                                                />
                                                <button className="absolute right-2 top-2 bottom-2 bg-[#131313] text-[#8eff71] px-4 rounded-[0.75rem] text-[10px] font-bold uppercase tracking-widest hover:bg-[#8eff71] hover:text-[#0d6100] transition-all">
                                                    APLICAR
                                                </button>
                                            </div>
                                        </div>

                                        {/* Checkout CTA */}
                                        <Link
                                            href={route('checkout.index')}
                                            className="w-full bg-gradient-to-br from-[#8eff71] to-[#2ff801] text-[#0d6100] font-bold py-6 px-8 rounded-[1rem] flex justify-between items-center group transition-all shadow-[0_0_20px_rgba(142,255,113,0.15)] hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(142,255,113,0.25)] active:scale-95"
                                        >
                                            <span className="font-['Space_Grotesk'] text-xl tracking-tight uppercase">Ir al Checkout</span>
                                            <span className="material-symbols-outlined transition-transform group-hover:translate-x-2">arrow_forward</span>
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

                <HomeFooter />
            </div>
        </>
    );
}
