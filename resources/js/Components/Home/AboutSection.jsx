import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Logo3D from './Logo3D';

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
        <section id="nosotros" className="py-16 px-6 md:px-16 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6  mx-auto">
                <div ref={leftRef} className="px-0 py-20 md:px-0 md:py-20 rounded-2xl flex flex-col justify-center">
                    <span className="text-[#8eff71] font-bold tracking-widest uppercase mb-6 block text-lg md:text-2xl">
                        El Origen
                    </span>
                    <h2 className="text-6xl md:text-9xl font-bold mb-8 tracking-tight">
                        De <span className="text-[#8eff71] italic">India</span> a <br />
                        <span className="text-[#8eff71] italic">Buenos Aires.</span>
                    </h2>
                    <p className="text-[#adaaaa] text-xl md:text-2xl leading-relaxed md:leading-loose">
                        Conectamos el arte global con la cultura local.
                        Importando directamente desde el corazón de la producción en <span className="text-[#8eff71] italic">India</span>,
                        4us Argentina garantiza que cada papel, bandeja y accesorio cumpla
                        con los más altos estándares internacionales del movimiento premium.
                    </p>
                </div>

                <div ref={rightRef} className="relative flex items-center justify-center p-8 md:p-16">
                    <Logo3D
                        src="/images/logo-4us-nuevo.png"
                        alt="Logo 4us Argentina"
                    />
                </div>
            </div>
        </section>
    );
}
