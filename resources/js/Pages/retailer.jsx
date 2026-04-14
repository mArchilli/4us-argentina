


import Navbar from '@/Components/Home/Navbar';
import HomeFooter from '@/Components/Home/HomeFooter';

import { useRef, useEffect, useState } from 'react';

export default function Retailer({ auth }) {
    const footerRef = useRef(null);
    const [footerVisible, setFooterVisible] = useState(false);

    useEffect(() => {
        const el = footerRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                const isVisible = entry.isIntersecting && entry.intersectionRatio >= 0.8;
                setFooterVisible((prev) => (prev === isVisible ? prev : isVisible));
            },
            { threshold: 0.8 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="bg-[#0e0e0e] text-white font-body min-h-screen flex flex-col justify-between">
            <Navbar auth={auth} hidden={footerVisible} />

            <main className="flex-1">

                {/* ── HERO ── */}
                <section className="relative min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-16 mb-20 overflow-hidden">
                    <div className="absolute top-0 right-0 w-2/3 h-full opacity-40 z-0 pointer-events-none select-none">
                        <div className="w-full h-full bg-gradient-to-l from-[#8eff71]/20 to-transparent absolute" />
                        <img alt="Mayoristas 4US" className="w-full h-full object-cover grayscale contrast-125" src="/images/retailer-image.png" />
                    </div>
                    <div className="relative z-10 max-w-4xl pt-24">
                        <div className="inline-block px-3 py-1 bg-[#8eff71]/10 border border-[#8eff71]/20 rounded-full mb-6">
                            <span className="text-[#8eff71] text-xs font-black tracking-widest uppercase font-headline italic">Ecosistema Mayorista</span>
                        </div>
                        <h1 className="text-5xl md:text-8xl font-headline font-black italic uppercase leading-none tracking-tighter mb-8">
                            ¿SOS <span className="text-[#8eff71]">MAYORISTA</span>? <br />
                            TENEMOS PRECIOS <br />
                            PARA VOS.
                        </h1>
                        <p className="text-[#adaaaa] text-lg md:text-xl max-w-xl mb-12 font-medium leading-relaxed">
                            Sé parte de la cultura. Llevá 4us a tu zona con descuentos exclusivos para mayoristas y beneficios únicos.
                        </p>
                        <a
                            href="https://wa.me/5491169659907?text=Hola%2C%20quisiera%20obtener%20el%20cat%C3%A1logo%20mayorista%20de%204US%20Argentina."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-[#8eff71] text-[#0d6100] font-headline font-black italic px-8 py-5 rounded-full text-lg uppercase tracking-tight hover:shadow-[0_0_30px_rgba(142,255,113,0.3)] transition-all active:scale-95"
                        >
                            OBTENER CATÁLOGO MAYORISTA
                            <span className="material-symbols-outlined font-bold">chat</span>
                        </a>
                    </div>
                </section>

                {/* ── BENEFICIOS ── */}
                <section className="px-4 sm:px-6 md:px-16 pb-20">
                    {/* Label solo desktop */}
                    <div className="hidden md:block mb-12">
                        <p className="text-[#8eff71] font-headline uppercase italic font-black text-sm tracking-[0.3em] mb-3">WHOLESALE ADVANTAGES</p>
                        <h3 className="text-4xl md:text-5xl font-headline italic font-bold uppercase tracking-tighter">BENEFICIOS EXCLUSIVOS</h3>
                    </div>
                    {/* Mobile: cards con borde izquierdo */}
                    <div className="flex flex-col gap-4 md:hidden">
                        {[
                            { icon: 'trending_up', title: 'Margen de ganancia alto', desc: 'Maximizá tu inversión con precios competitivos diseñados para que tu negocio escale rápido.' },
                            { icon: 'local_shipping', title: 'Envíos a todo el país', desc: 'Logística premium. Llegamos a cada rincón de Argentina con tiempos de entrega récord.' },
                            { icon: 'campaign', title: 'Material publicitario gratis', desc: 'Te damos las herramientas: fotos HD, piezas gráficas y contenido para tus redes sociales.' },
                        ].map((b) => (
                            <div key={b.icon} className="p-6 rounded-xl bg-[#131313] border-l-2 border-[#8eff71]/30 flex items-start gap-5">
                                <div className="p-3 rounded-lg bg-[#262626] text-[#8eff71] flex-shrink-0">
                                    <span className="material-symbols-outlined text-3xl">{b.icon}</span>
                                </div>
                                <div>
                                    <h3 className="font-headline italic font-bold uppercase text-lg text-[#8eff71] tracking-tight">{b.title}</h3>
                                    <p className="text-[#adaaaa] text-sm mt-1 leading-relaxed">{b.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Desktop: bento grid */}
                    <div className="hidden md:grid grid-cols-3 gap-6">
                        {[
                            { icon: 'trending_up', title: 'Margen de ganancia alto', desc: 'Maximizá tu inversión con precios competitivos diseñados para que tu negocio escale rápido.' },
                            { icon: 'local_shipping', title: 'Envíos a todo el país', desc: 'Logística premium. Llegamos a cada rincón de Argentina con tiempos de entrega récord.' },
                            { icon: 'campaign', title: 'Material publicitario gratis', desc: 'Te damos las herramientas: fotos HD, piezas gráficas y contenido para tus redes sociales.' },
                        ].map((b) => (
                            <div key={b.icon} className="bg-[#262626]/40 backdrop-blur-md p-10 rounded-xl border border-[#484847]/10 flex flex-col hover:bg-[#201f1f] transition-all">
                                <span className="material-symbols-outlined text-[#8eff71] text-4xl mb-8">{b.icon}</span>
                                <h4 className="text-2xl font-headline italic font-black uppercase tracking-tighter mb-4">{b.title}</h4>
                                <p className="text-[#adaaaa] leading-relaxed">{b.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── ¿POR QUÉ ELEGIR 4US? ── */}
                <section className="px-4 sm:px-6 md:px-16 py-20 bg-[#0e0e0e] relative overflow-hidden">
                    <div className="absolute -right-20 top-0 w-64 h-64 bg-[#8eff71]/5 blur-[100px] rounded-full" />
                    {/* Mobile */}
                    <div className="relative z-10 md:hidden">
                        <h2 className="font-headline italic font-black uppercase text-3xl mb-8 tracking-tighter">
                            ¿POR QUÉ ELEGIR <span className="text-[#8eff71]"><span className="text-[#8eff71]">4US</span>?</span>
                        </h2>
                        <div className="space-y-6">
                            <p className="text-[#adaaaa] text-lg leading-relaxed border-l-2 border-[#8eff71]/20 pl-6 italic">
                                "No vendemos cualquier cosa. Cada producto que ofrecemos es importado directamente de la India, seleccionado bajo los más altos estándares de calidad internacional."
                            </p>
                            <p className="text-white leading-loose font-medium">
                                Al unirte como revendedor de <span className="text-[#8eff71] font-black">4US</span>, accedés a una línea de productos de primera que ningún otro distribuidor local puede ofrecerte. Calidad de exportación, autenticidad garantizada.
                            </p>
                        </div>
                    </div>
                    {/* Desktop */}
                    <div className="hidden md:grid grid-cols-2 gap-24 items-center relative z-10">
                        <div className="relative">
                            <div className="grid grid-cols-2 gap-4">
                                <img src="/images/mayorista-img-1.png" alt="4US mayoristas" className="rounded-xl w-full aspect-square object-cover grayscale" />
                                <img src="/images/mayorista-img-2.png" alt="4US mayoristas" className="rounded-xl w-full aspect-[3/4] object-cover mt-12 grayscale" />
                            </div>
                            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#8eff71]/10 rounded-full blur-[80px]" />
                        </div>
                        <div>
                            <h3 className="text-5xl xl:text-6xl font-headline italic font-bold uppercase tracking-tighter mb-10 leading-none">¿Por qué elegir <span className="text-[#8eff71]">4US</span>?</h3>
                            <div className="space-y-6 text-[#adaaaa] text-lg">
                                <p>Cada producto que distribuimos es importado directamente desde la India, seleccionado bajo los más altos estándares de calidad internacional. No es moda masiva: es primera línea con identidad propia.</p>
                                <p>Al sumar <span className="text-[#8eff71] font-black">4US</span> a tu local, ofrecés algo que ningún otro distribuidor puede darte: autenticidad certificada, calidad de exportación y una marca que ya tiene presencia en la escena.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── CTA FINAL ── */}
                <section className="px-4 sm:px-6 md:px-16 py-16 md:pb-40">
                    <div className="bg-[#8eff71] p-10 md:p-24 rounded-2xl md:rounded-[2rem] flex flex-col items-center text-center text-[#0d6100] overflow-hidden relative">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
                        <div className="relative z-10 flex flex-col items-center w-full">
                            <h2 className="text-2xl md:text-5xl xl:text-7xl font-headline italic font-black uppercase tracking-tighter mb-6 md:mb-8 leading-tight md:leading-none">
                                ¿LISTO PARA EMPEZAR?
                            </h2>
                            <p className="text-sm md:text-xl font-bold uppercase tracking-widest mb-8 md:mb-12 opacity-80 italic max-w-2xl">
                                EL PRÓXIMO DROP PUEDE SER TU MEJOR VENTA. SUMATE A 4US HOY MISMO.
                            </p>
                            <a
                                href="https://wa.me/5491169659907?text=Hola%2C%20quisiera%20obtener%20el%20cat%C3%A1logo%20mayorista%20de%204US%20Argentina."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-[#0d6100] text-[#8eff71] hover:bg-[#0a4f00] transition-all px-8 md:px-16 py-4 md:py-8 rounded-full font-headline font-black italic text-base md:text-2xl tracking-tighter active:scale-95"
                            >
                                OBTENER CATÁLOGO MAYORISTA
                                <span className="material-symbols-outlined">chat</span>
                            </a>
                        </div>
                    </div>
                </section>

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
    );
}
