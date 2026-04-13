import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import LiquidChrome from './LiquidChrome';
import PrimaryButton from '../PrimaryButton';

export default function HeroSection() {
    const contentRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                Array.from(contentRef.current.children),
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.9,
                    ease: 'power3.out',
                    stagger: 0.2,
                    delay: 0.3,
                }
            );
        });
        return () => ctx.revert();
    }, []);

    return (
        <section id="inicio" className="relative min-h-screen flex items-center px-4 sm:px-6 md:px-16 overflow-hidden">
            <div className="absolute inset-0 z-0">
                <LiquidChrome
                    baseColor={[0.557, 1.0, 0.443]}
                    speed={0.15}
                    amplitude={0.4}
                    frequencyX={3}
                    frequencyY={2}
                    interactive={true}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0e0e0e]/40 to-[#0e0e0e]" />
            </div>

            <div ref={contentRef} className="relative z-10 max-w-4xl 2xl:max-w-6xl mx-auto sm:mx-0">
                <h1 className="text-[clamp(4.4rem,10vw,10rem)] font-black tracking-tighter leading-none mb-4 sm:mb-6">
                    ELEVÁ LA <br />
                    <span className="text-[#8eff71] italic">CULTURA.</span>
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl 2xl:text-3xl text-[#adaaaa] max-w-xl 2xl:max-w-2xl mb-6 sm:mb-10 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                    Accesorios premium para fumadores, seleccionados para el conocedor.
                    Importados directamente, auténticos sin concesiones.
                </p>
                <div className="flex flex-wrap gap-3 sm:gap-4">
                    <a
                        href="#catalogo"
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="group bg-[#8eff71] text-[#0d6100] font-headline font-black italic px-7 py-4 sm:px-8 sm:py-5 rounded-full text-base sm:text-lg uppercase tracking-tight hover:shadow-[0_0_30px_rgba(142,255,113,0.3)] transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                        VER CATÁLOGO
                        <span className="material-symbols-outlined font-bold transform transition-transform duration-300 group-hover:rotate-90">arrow_forward</span>
                    </a>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('nosotros')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="border border-[#adaaaa] text-white px-8 py-4 sm:px-10 sm:py-4 rounded-full font-headline font-black italic text-base sm:text-lg uppercase tracking-tight hover:bg-[#262626] transition-all active:scale-95"
                    >
                        Nuestra Historia
                    </button>
                </div>
            </div>
        </section>
    );
}
