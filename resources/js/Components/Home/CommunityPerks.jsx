import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const perks = [
    {
        icon: 'local_shipping',
        title: 'Envío gratis',
        description: 'En pedidos mayores a $25k',
    },
    {
        icon: 'percent',
        title: 'Descuento por volumen',
        description: '20% off en cajas completas',
    },
    {
        icon: 'star',
        title: 'Puntos de fidelidad',
        description: 'Acumulás en cada compra',
    },
    {
        icon: 'diversity_3',
        title: 'Mayoreo',
        description: 'Precios exclusivos para locales',
    },
];

export default function CommunityPerks() {
    const titleRef = useRef(null);
    const gridRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(titleRef.current,
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
                    scrollTrigger: { trigger: titleRef.current, start: 'top 85%', once: true },
                }
            );
            gsap.fromTo(
                Array.from(gridRef.current.children),
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
                    stagger: 0.1,
                    scrollTrigger: { trigger: gridRef.current, start: 'top 85%', once: true },
                }
            );
        });
        return () => ctx.revert();
    }, []);

    return (
        <section id="perks" className="py-24 bg-[#000000] min-h-screen flex justify-center flex-col">
            <div ref={titleRef} className="max-w-7xl mx-auto px-6 md:px-16 text-center mb-16">
                <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-4">
                    BENEFICIOS DE COMUNIDAD
                </h2>
                <p className="text-[#adaaaa] max-w-2xl mx-auto">
                    Precios especiales y bundles exclusivos para el círculo íntimo de 4us.
                </p>
            </div>

            <div ref={gridRef} className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-2 md:grid-cols-4 gap-4">
                {perks.map((perk) => (
                    <div
                        key={perk.title}
                        className="bg-[#191a1a] p-8 rounded-2xl border border-[#484848]/10 text-center hover:bg-[#1f2020] transition-all"
                    >
                        <span className="material-symbols-outlined text-[#8eff71] text-4xl mb-4 block">
                            {perk.icon}
                        </span>
                        <h4 className="font-bold text-lg mb-2">{perk.title}</h4>
                        <p className="text-sm text-[#adaaaa]">{perk.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
