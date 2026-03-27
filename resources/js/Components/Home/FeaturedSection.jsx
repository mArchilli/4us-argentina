import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedSection({ products = [] }) {
    const headerRef = useRef(null);
    const gridRef = useRef(null);

    useEffect(() => {
        if (!headerRef.current || !gridRef.current) return;
        const ctx = gsap.context(() => {
            gsap.fromTo(headerRef.current,
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
                    scrollTrigger: { trigger: headerRef.current, start: 'top 85%', once: true },
                }
            );
            gsap.fromTo(
                Array.from(gridRef.current.children),
                { y: 60, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
                    stagger: 0.15,
                    scrollTrigger: { trigger: gridRef.current, start: 'top 80%', once: true },
                }
            );
        });
        return () => ctx.revert();
    }, [products]);

    if (products.length === 0) return null;

    return (
        <section id="catalogo" className="py-24 px-6 md:px-16">
            <div ref={headerRef} className="flex justify-between items-end mb-16">
                <h2 className="text-5xl font-bold tracking-tight">
                    LANZAMIENTO <br />
                    <span className="text-[#8eff71]">DESTACADO.</span>
                </h2>
                <div className="text-[#adaaaa] text-sm tracking-widest uppercase mb-2">
                    Colección 2024
                </div>
            </div>

            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {products.map((product, index) => {
                    const image  = product.primary_media?.url ?? null;
                    const isOdd  = index % 2 !== 0;

                    return (
                        <div
                            key={product.id}
                            className={`group cursor-pointer ${isOdd ? 'mt-12 md:mt-24' : ''}`}
                        >
                            <div className="relative overflow-hidden rounded-2xl mb-6 bg-[#131313] aspect-[4/5]">
                                {image ? (
                                    <img
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        src={image}
                                        alt={product.title}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[#2a2a2a] text-6xl">image</span>
                                    </div>
                                )}

                                {product.offer_active && (
                                    <div className="absolute top-6 right-6">
                                        <span className="bg-[#ff7351] text-white px-4 py-1 rounded-full text-sm font-bold">
                                            Oferta
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-between items-start">
                                <h3 className="text-2xl font-bold">{product.title}</h3>
                                {product.prices?.length > 0 && (
                                    <div className="text-right ml-4 flex-shrink-0">
                                        {product.prices.map((p, i) => (
                                            <div key={i} className="flex items-baseline justify-end gap-2">
                                                <p className="text-[#8eff71] text-xl font-bold leading-tight">
                                                    ${Number(p.price).toLocaleString('es-AR')} ARS
                                                </p>
                                                {p.min_quantity > 1 && (
                                                    <span className="text-[#adaaaa] text-xs">×{p.min_quantity}</span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {product.description && (
                                <p className="text-[#adaaaa] mt-2 line-clamp-2">{product.description}</p>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
