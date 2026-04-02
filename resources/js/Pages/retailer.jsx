


import Navbar from '@/Components/Home/Navbar';
import HomeFooter from '@/Components/Home/HomeFooter';



import { useRef, useEffect, useState } from 'react';

export default function Retailer({ auth }) {
    const footerRef = useRef(null);
    const [footerVisible, setFooterVisible] = useState(false);

    useEffect(() => {
        const observer = new window.IntersectionObserver(
            ([entry]) => setFooterVisible(entry.intersectionRatio >= 0.8),
            { threshold: 0.8 }
        );
        if (footerRef.current) {
            observer.observe(footerRef.current);
        }
        return () => {
            if (footerRef.current) observer.unobserve(footerRef.current);
        };
    }, []);

    // El efecto debe aplicarse solo cuando el usuario realmente llega al final (footer completamente visible)
    useEffect(() => {
        const navbar = document.querySelector('nav');
        if (navbar) {
            navbar.style.transition = 'opacity 0.3s';
            navbar.style.opacity = footerVisible ? '0' : '1';
            navbar.style.pointerEvents = footerVisible ? 'none' : '';
        }
    }, [footerVisible]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="bg-[#0e0e0e] text-white font-body min-h-screen flex flex-col justify-between">
            <Navbar auth={auth} />

            <main className="pb-32 flex-1">
                {/* Hero Section */}
                <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 mb-20 overflow-hidden">
                    <div className="absolute top-0 right-0 w-2/3 h-full opacity-40 z-0 pointer-events-none select-none">
                        <div className="w-full h-full bg-gradient-to-l from-[#8eff71]/20 to-transparent absolute"></div>
                        <img alt="Mayoristas 4US" className="w-full h-full object-cover grayscale contrast-125" src="/images/retailer-image.png" />
                    </div>
                    <div className="relative z-10 max-w-4xl pt-24">
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
                            <a
                                href="/files/catalog/catalogo.pdf"
                                download
                                className="bg-[#8eff71] text-[#0d6100] font-headline font-black italic px-8 py-5 rounded-full text-lg uppercase tracking-tight hover:shadow-[0_0_30px_rgba(142,255,113,0.3)] transition-all active:scale-95 flex items-center justify-center gap-2"
                            >
                                OBTENER CATÁLOGO MAYORISTA
                                <span className="material-symbols-outlined font-bold">download</span>
                            </a>
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
                            <a
                                href="/files/catalog/catalogo.pdf"
                                download
                                className="inline-block bg-[#0d6100] text-[#8eff71] font-headline font-black italic px-12 py-6 rounded-full text-2xl uppercase tracking-tight hover:scale-105 transition-all shadow-2xl"
                            >
                                OBTENER CATÁLOGO
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            {/* Botón flotante cuando el footer es visible */}
            {footerVisible && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 z-[100] bg-[#8eff71] text-[#0d6100] px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 text-base font-black uppercase tracking-tight transition-transform duration-300 animate-fadeInUp hover:scale-110 hover:shadow-[0_0_20px_rgba(142,255,113,0.4)]"
                    style={{ animation: 'fadeInUp 0.5s cubic-bezier(0.22,1,0.36,1)' }}
                >
                    <span className="material-symbols-outlined text-xl">arrow_upward</span>
                    Volver al inicio
                </button>
            )}

            {/* Animación keyframes para fadeInUp */}
            <style>{`
                @keyframes fadeInUp {
                    0% { opacity: 0; transform: translateY(40px) scale(0.95); }
                    100% { opacity: 1; transform: translateY(0) scale(1); }
                }
                .animate-fadeInUp {
                    animation: fadeInUp 0.5s cubic-bezier(0.22,1,0.36,1);
                }
            `}</style>

            {/* Footer con ref para IntersectionObserver */}
            <div ref={footerRef}>
                <HomeFooter />
            </div>
        </div>
    );
}
