import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
    const leftRef = useRef(null);
    const rightRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(leftRef.current,
                { x: -50, opacity: 0 },
                {
                    x: 0, opacity: 1, duration: 1, ease: 'power3.out',
                    scrollTrigger: { trigger: leftRef.current, start: 'top 85%', once: true },
                }
            );
            gsap.fromTo(rightRef.current,
                { x: 50, opacity: 0 },
                {
                    x: 0, opacity: 1, duration: 1, ease: 'power3.out',
                    scrollTrigger: { trigger: rightRef.current, start: 'top 85%', once: true },
                }
            );
        });
        return () => ctx.revert();
    }, []);

    return (
        <section id="nosotros" className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div ref={leftRef} className="md:col-span-7 bg-[#131313] p-12 md:p-20 rounded-2xl flex flex-col justify-center">
                    <span className="text-[#8eff71] font-bold tracking-widest uppercase mb-5 block text-sm md:text-base">
                        El Origen
                    </span>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight">
                        De India a <br /> Buenos Aires.
                    </h2>
                    <p className="text-[#adaaaa] text-lg md:text-xl leading-relaxed">
                        Conectamos el arte global con la cultura local.
                        Importando directamente desde el corazón de la producción en India,
                        4us Argentina garantiza que cada papel, bandeja y accesorio cumpla
                        con los más altos estándares internacionales del movimiento premium.
                    </p>
                </div>

                <div ref={rightRef} className="md:col-span-5 relative h-[400px] md:h-auto overflow-hidden rounded-2xl">
                    <img
                        className="absolute inset-0 w-full h-full object-cover"
                        src="/images/logo-4us-nuevo.png"
                        alt="Bandejas metálicas premium"
                    />
                    <div className="absolute inset-0 bg-[#8eff71]/10 mix-blend-overlay" />
                </div>
            </div>
        </section>
    );
}
