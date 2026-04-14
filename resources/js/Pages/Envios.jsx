import Navbar from '@/Components/Home/Navbar';
import HomeFooter from '@/Components/Home/HomeFooter';
import { useRef, useEffect, useState } from 'react';

export default function Envios({ auth }) {
    const footerRef = useRef(null);
    const contentRef = useRef(null);
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

    useEffect(() => {
        const el = contentRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add('animate-in');
                    observer.unobserve(el);
                }
            },
            { threshold: 0.1 }
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

                {/* -- HERO -- */}
                <section className="relative min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-16 mb-20 overflow-hidden">
                    {/* Imagen de fondo (derecha) */}
                    <div className="absolute top-0 right-0 w-2/3 h-full opacity-40 z-0 pointer-events-none select-none">
                        <div className="w-full h-full bg-gradient-to-l from-[#8eff71]/20 to-transparent absolute" />
                        <img
                            alt="Envios 4US"
                            className="w-full h-full object-cover grayscale contrast-125"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAH9JctGcFzNlmcGntx6lt8uib1_WSpayycX3ebwkMbddl-PEv79EnYK-GSrUNCsvECTev1u--I4qGx-Bq2mqyqH_HmZxNbjinQoxQLEp7XOFWbkKY_6Eh39uTSY7P5m2-ek5GvFmHE-926zR-GknUfN2zUV1FpUdIkUvpir95ur1v3RSo-76pCL0WbvFM16Q6tVOL-3DhFrNRa_qCvlX0SbzX5N-1vAyUekwmq0HDvJJA9Qxve6j9d09gHkdnOJghzIY1rXYb0EzWJ"
                        />
                    </div>

                    <div
                        ref={contentRef}
                        className="relative z-10 max-w-4xl pt-24 opacity-0 -translate-x-8 transition-all duration-700 ease-out [&.animate-in]:opacity-100 [&.animate-in]:translate-x-0"
                    >
                        <div className="inline-block px-3 py-1 bg-[#8eff71]/10 border border-[#8eff71]/20 rounded-full mb-6">
                            <span className="text-[#8eff71] text-xs font-black tracking-widest uppercase font-headline italic">Cobertura Nacional</span>
                        </div>
                        <h1 className="text-5xl md:text-8xl font-headline font-black italic uppercase leading-none tracking-tighter mb-8">
                            ENVIOS A<br />
                            TODO EL <span className="text-[#8eff71]">PAIS.</span>
                        </h1>
                        <p className="text-[#adaaaa] text-lg md:text-xl max-w-xl mb-10 font-medium leading-relaxed">
                            Logistica para llegar a donde vos estes. Que tu cultura no tenga limites.
                        </p>

                        <div className="space-y-6 mb-12">
                            <div className="flex gap-4 items-start">
                                <div className="mt-1 flex-shrink-0 w-10 h-10 rounded-lg bg-[#262626] flex items-center justify-center text-[#8eff71]">
                                    <span className="material-symbols-outlined">local_shipping</span>
                                </div>
                                <div className="space-y-1">
                                    <h3 className="font-headline italic font-bold text-lg uppercase tracking-tight">Despacho Inmediato</h3>
                                    <p className="text-[#adaaaa] text-sm leading-relaxed max-w-md">
                                        Una vez confirmada tu compra, nuestro equipo procesa tu pedido y despachamos en menos de 24hs habiles al correo.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start">
                                <div className="mt-1 flex-shrink-0 w-10 h-10 rounded-lg bg-[#262626] flex items-center justify-center text-[#8eff71]">
                                    <span className="material-symbols-outlined">verified_user</span>
                                </div>
                                <div className="space-y-1">
                                    <h3 className="font-headline italic font-bold text-lg uppercase tracking-tight">Aliados Estrategicos</h3>
                                    <p className="text-[#adaaaa] text-sm leading-relaxed max-w-md">
                                        Trabajamos con los lideres en logistica nacional,
                                        <span className="text-white font-medium"> Correo Argentino</span> y
                                        <span className="text-white font-medium"> Andreani</span>, garantizando que tu producto llegue intacto a cualquier punto de Argentina.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <a
                            href="https://wa.me/5491169659907?text=Hola%2C%20necesito%20soporte%20con%20un%20env%C3%ADo%20de%204US%20Argentina."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-[#8eff71] text-[#0d6100] font-headline font-black italic px-8 py-5 rounded-full text-lg uppercase tracking-tight hover:shadow-[0_0_30px_rgba(142,255,113,0.3)] transition-all active:scale-95"
                        >
                            Soporte
                            <span className="material-symbols-outlined font-bold">chat</span>
                        </a>
                    </div>
                </section>

                {/* ── PUNTOS DE ENCUENTRO ── */}
                <section className="px-4 sm:px-6 md:px-16 py-20 md:py-32">
                    <div className="max-w-[1800px] mx-auto">
                        {/* Título centrado */}
                        <h2 className="text-4xl md:text-7xl font-headline font-black italic uppercase tracking-tighter text-center whitespace-nowrap mb-16 leading-none">
                            PUNTOS DE <span className="text-[#8eff71]">ENCUENTRO</span>
                        </h2>

                        {/* Grid: texto izquierda, foto derecha */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
                            {/* Texto */}
                            <div className="space-y-6">
                                <div className="flex gap-4 items-start">
                                    <div className="mt-1 flex-shrink-0 w-10 h-10 rounded-lg bg-[#262626] flex items-center justify-center text-[#8eff71]">
                                        <span className="material-symbols-outlined">location_on</span>
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="font-headline italic font-black text-6xl md:text-7xl uppercase tracking-tighter leading-none">ZONA <span className="text-[#8eff71]">OESTE</span></h3>
                                        <p className="text-[#adaaaa] text-xl md:text-2xl leading-relaxed max-w-lg">
                                            Si sos de zona oeste podemos coordinar un punto de encuentro para que recibas tu pedido de forma más rápida y sin costo de envío. Escribinos y lo arreglamos.
                                        </p>
                                    </div>
                                </div>
                                <a
                                    href="https://wa.me/5491169659907?text=Hola%2C%20soy%20de%20zona%20oeste%20y%20quisiera%20coordinar%20un%20punto%20de%20encuentro."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-[#8eff71] text-[#0d6100] font-headline font-black italic px-7 py-4 rounded-full text-base uppercase tracking-tight hover:shadow-[0_0_30px_rgba(142,255,113,0.3)] transition-all active:scale-95"
                                >
                                    Coordinar encuentro
                                    <span className="material-symbols-outlined font-bold">chat</span>
                                </a>
                            </div>

                            {/* Foto */}
                            <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-[#131313] border border-[#484847]/20 flex items-center justify-center">
                                <img
                                    src="/images/envios-img.png"
                                    alt="Punto de encuentro 4US"
                                    className="w-full h-full object-cover grayscale contrast-125"
                                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                />
                            </div>
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
