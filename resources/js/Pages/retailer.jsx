

import Navbar from '@/Components/Home/Navbar';
import HomeFooter from '@/Components/Home/HomeFooter';

export default function Retailer({ auth }) {
    return (
        <div className="bg-[#0e0e0e] text-white font-body min-h-screen flex flex-col justify-between">
            <Navbar auth={auth} />

            <main className="pt-24 pb-32 flex-1">
                {/* Hero Section */}
                <section className="relative min-h-[700px] flex flex-col justify-center px-6 md:px-12 lg:px-24 mb-20 overflow-hidden">
                    <div className="absolute top-0 right-0 w-2/3 h-full opacity-40 z-0 pointer-events-none select-none">
                        <div className="w-full h-full bg-gradient-to-l from-[#8eff71]/20 to-transparent absolute"></div>
                        <img alt="Mayoristas 4US" className="w-full h-full object-cover grayscale contrast-125" src="/images/retailer-image.png" />
                    </div>
                    <div className="relative z-10 max-w-4xl">
                        <div className="inline-block px-3 py-1 bg-[#8eff71]/10 border border-[#8eff71]/20 rounded-full mb-6">
                            <span className="text-[#8eff71] text-xs font-black tracking-widest uppercase font-label italic">Ecosistema Mayorista</span>
                        </div>
                        <h1 className="text-5xl md:text-8xl font-headline font-black italic uppercase leading-none tracking-tighter mb-8">
                            ¿SOS <span className="text-[#8eff71]">MAYORISTA</span>? <br />
                            TENEMOS PRECIOS <br />
                            PARA VOS
                        </h1>
                        <p className="text-[#adaaaa] text-lg md:text-xl max-w-xl mb-12 font-medium leading-relaxed">
                            Sé parte de la cultura. Llevá 4us a tu zona con descuentos exclusivos para mayoristas y beneficios únicos.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="bg-[#8eff71] text-[#0d6100] font-headline font-black italic px-8 py-5 rounded-full text-lg uppercase tracking-tight hover:shadow-[0_0_30px_rgba(142,255,113,0.3)] transition-all active:scale-95 flex items-center justify-center gap-2">
                                SOLICITAR CATÁLOGO MAYORISTA
                                <span className="material-symbols-outlined font-bold">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                </section>

                {/* Benefits Grid */}
                <section className="px-6 md:px-12 lg:px-24 mb-32">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Benefit 1 */}
                        <div className="bg-[#131313] p-10 rounded-3xl relative overflow-hidden group hover:bg-[#1a1919] transition-colors duration-500">
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#8eff71]/5 rounded-full blur-3xl group-hover:bg-[#8eff71]/20 transition-all"></div>
                            <span className="material-symbols-outlined text-[#8eff71] text-5xl mb-8" style={{ fontVariationSettings: '"FILL" 1' }}>trending_up</span>
                            <h3 className="text-2xl font-headline font-extrabold italic uppercase mb-4">Margen de ganancia alto</h3>
                            <p className="text-[#adaaaa] font-medium">Maximizá tu inversión con precios competitivos diseñados para que tu negocio escale rápido.</p>
                        </div>
                        {/* Benefit 2 */}
                        <div className="bg-[#131313] p-10 rounded-3xl relative overflow-hidden group hover:bg-[#1a1919] transition-colors duration-500">
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#8eff71]/5 rounded-full blur-3xl group-hover:bg-[#8eff71]/20 transition-all"></div>
                            <span className="material-symbols-outlined text-[#8eff71] text-5xl mb-8" style={{ fontVariationSettings: '"FILL" 1' }}>local_shipping</span>
                            <h3 className="text-2xl font-headline font-extrabold italic uppercase mb-4">Envíos a todo el país</h3>
                            <p className="text-[#adaaaa] font-medium">Logística premium. Llegamos a cada rincón de Argentina con tiempos de entrega récord.</p>
                        </div>
                        {/* Benefit 3 */}
                        <div className="bg-[#131313] p-10 rounded-3xl relative overflow-hidden group hover:bg-[#1a1919] transition-colors duration-500">
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#8eff71]/5 rounded-full blur-3xl group-hover:bg-[#8eff71]/20 transition-all"></div>
                            <span className="material-symbols-outlined text-[#8eff71] text-5xl mb-8" style={{ fontVariationSettings: '"FILL" 1' }}>campaign</span>
                            <h3 className="text-2xl font-headline font-extrabold italic uppercase mb-4">Material publicitario gratis</h3>
                            <p className="text-[#adaaaa] font-medium">Te damos las herramientas: fotos HD, piezas gráficas y contenido para tus redes sociales.</p>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="px-6 md:px-12 lg:px-24">
                    <div className="bg-[#8eff71] p-12 md:p-24 rounded-[3rem] text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                        <div className="relative z-10">
                            <h2 className="text-[#0d6100] text-5xl md:text-7xl font-headline font-black italic uppercase mb-8 tracking-tighter">
                                ¿LISTO PARA EMPEZAR?
                            </h2>
                            <p className="text-[#0d6100]/80 text-xl font-bold uppercase tracking-widest mb-12 max-w-2xl mx-auto">
                                EL PRÓXIMO DROP PUEDE SER TU MEJOR VENTA. SUMATE A 4US HOY MISMO.
                            </p>
                            <button className="bg-[#0d6100] text-[#8eff71] font-headline font-black italic px-12 py-6 rounded-full text-2xl uppercase tracking-tight hover:scale-105 transition-all shadow-2xl">
                                SOLICITAR CATÁLOGO
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            {/* BottomNavBar (Mobile Only) */}
            <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-3 bg-[#141414]/90 backdrop-blur-lg rounded-t-2xl z-50 shadow-[0_-8px_30px_rgb(0,0,0,0.5)]">
                <a className="flex flex-col items-center justify-center text-zinc-500 px-4 py-2 hover:text-[#b7fc63] transition-all active:scale-90" href="/">
                    <span className="material-symbols-outlined">grid_view</span>
                    <span className="text-[10px] uppercase font-bold tracking-widest font-label mt-1">Inicio</span>
                </a>
                <a className="flex flex-col items-center justify-center text-zinc-500 px-4 py-2 hover:text-[#b7fc63] transition-all active:scale-90" href="/catalogo">
                    <span className="material-symbols-outlined">payments</span>
                    <span className="text-[10px] uppercase font-bold tracking-widest font-label mt-1">Ventas</span>
                </a>
                <a className="flex flex-col items-center justify-center text-[#b7fc63] bg-[#b7fc63]/10 rounded-xl px-4 py-2 scale-110" href="/retailer">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>group</span>
                    <span className="text-[10px] uppercase font-bold tracking-widest font-label mt-1">Red</span>
                </a>
                <a className="flex flex-col items-center justify-center text-zinc-500 px-4 py-2 hover:text-[#b7fc63] transition-all active:scale-90" href="#">
                    <span className="material-symbols-outlined">person</span>
                    <span className="text-[10px] uppercase font-bold tracking-widest font-label mt-1">Perfil</span>
                </a>
            </nav>
            <HomeFooter />
        </div>
    );
}
