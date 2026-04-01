import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Home/Navbar';
import HomeFooter from '@/Components/Home/HomeFooter';

export default function CheckoutSuccess({ auth, order }) {
    return (
        <>
            <Head title="Pedido Confirmado - 4us Argentina" />
            <div className="bg-[#0e0e0e] text-white min-h-screen">
                <Navbar auth={auth} />

                <main className="pt-28 pb-24 px-6 md:px-12 lg:px-24 max-w-3xl mx-auto text-center">
                    <div className="bg-[#131313] rounded-[2rem] p-10 md:p-16">
                        <div className="w-20 h-20 rounded-full bg-[#8eff71]/15 border-2 border-[#8eff71] flex items-center justify-center mx-auto mb-8">
                            <span className="material-symbols-outlined text-[#8eff71] text-4xl">check_circle</span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-4">
                            ¡PEDIDO <span className="text-[#8eff71]">CONFIRMADO</span>!
                        </h1>

                        <p className="text-[#adaaaa] text-lg mb-2">
                            Tu pedido <span className="text-white font-bold">#{order.id}</span> fue registrado correctamente.
                        </p>
                        <p className="text-[#adaaaa] mb-10">
                            Nos comunicaremos con vos a <span className="text-white font-bold">{order.email}</span> para confirmar el envío y el pago.
                        </p>

                        {/* Order items */}
                        <div className="bg-[#0e0e0e] rounded-xl p-6 mb-8 text-left">
                            <h3 className="text-sm font-black uppercase tracking-widest text-[#8eff71] mb-4">Resumen del pedido</h3>
                            <div className="space-y-3">
                                {order.items?.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center text-sm">
                                        <span className="text-white">{item.product_title} <span className="text-[#adaaaa]">× {item.quantity}</span></span>
                                        <span className="text-[#8eff71] font-bold">${Number(item.line_total).toLocaleString('es-AR')} ARS</span>
                                    </div>
                                ))}
                                <div className="border-t border-[#1f2020] pt-3 flex justify-between items-center">
                                    <span className="text-white font-bold">Total</span>
                                    <span className="text-[#8eff71] font-black text-xl">${Number(order.total).toLocaleString('es-AR')} ARS</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href={route('catalog.index')}
                                className="inline-flex items-center justify-center gap-2 bg-[#8eff71] text-[#0d6100] px-8 py-4 rounded-full font-black uppercase tracking-tight hover:shadow-[0_0_30px_rgba(142,255,113,0.3)] transition-all"
                            >
                                <span className="material-symbols-outlined">storefront</span>
                                Seguir comprando
                            </Link>
                            <Link
                                href="/"
                                className="inline-flex items-center justify-center gap-2 border border-white/15 bg-white/5 text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider hover:border-white/30 transition-all text-sm"
                            >
                                Volver al inicio
                            </Link>
                        </div>
                    </div>
                </main>

                <HomeFooter />
            </div>
        </>
    );
}
