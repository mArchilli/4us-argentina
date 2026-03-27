import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import LiquidChrome from './LiquidChrome';

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
        <section id="inicio" className="relative min-h-screen flex items-center px-6 md:px-16 overflow-hidden">
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

            <div ref={contentRef} className="relative z-10 max-w-4xl">
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-6">
                    ELEVÁ LA <br />
                    <span className="text-[#8eff71] italic">CULTURA.</span>
                </h1>
                <p className="text-xl text-[#adaaaa] max-w-xl mb-10 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                    Accesorios premium para fumadores, seleccionados para el conocedor.
                    Importados directamente, auténticos sin concesiones.
                </p>
                <div className="flex flex-wrap gap-4">
                    <button className="bg-gradient-to-br from-[#8eff71] to-[#2ff801] text-[#0d6100] px-10 py-4 rounded-full font-bold text-lg hover:shadow-[0_0_30px_rgba(142,255,113,0.3)] transition-all active:scale-95">
                        Ver Catálogo
                    </button>
                    <button className="border border-[#484848] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-[#262626] transition-all active:scale-95">
                        Nuestra Historia
                    </button>
                </div>
            </div>
        </section>
    );
}
