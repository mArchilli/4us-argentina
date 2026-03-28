import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function getWrappedIndex(index, length) {
    return ((index % length) + length) % length;
}

function ProductCard({
    product,
    className = '',
    imageClassName = '',
    contentClassName = '',
    enableHoverZoom = true,
}) {
    const image = product.primary_media?.url ?? null;

    return (
        <article className={`group ${className}`}>
            <div className={`relative overflow-hidden rounded-[1.6rem] mb-5 bg-[#131313] aspect-[4/5] ${contentClassName}`}>
                {image ? (
                    <img
                        className={`w-full h-full object-cover transition-transform duration-700 ${enableHoverZoom ? 'group-hover:scale-110' : ''} ${imageClassName}`}
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

            <div className="flex justify-between items-start gap-3">
                <h3 className="text-xl md:text-2xl font-bold leading-tight">{product.title}</h3>
                {product.prices?.length > 0 && (
                    <div className="text-right flex-shrink-0">
                        {product.prices.map((price, index) => (
                            <div key={`${product.id}-price-${index}`} className="flex items-baseline justify-end gap-2">
                                <p className="text-[#8eff71] text-lg md:text-xl font-bold leading-tight">
                                    ${Number(price.price).toLocaleString('es-AR')} ARS
                                </p>
                                {price.min_quantity > 1 && (
                                    <span className="text-[#adaaaa] text-xs">×{price.min_quantity}</span>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {product.categories?.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                    {product.categories.slice(0, 3).map((cat) => (
                        <span
                            key={cat.id}
                            className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#8eff71]/10 border border-[#8eff71]/25 text-[#9dff88] uppercase tracking-wide"
                        >
                            {cat.name}
                        </span>
                    ))}
                    {product.categories.length > 3 && (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-[#adaaaa]">
                            +{product.categories.length - 3}
                        </span>
                    )}
                </div>
            )}

            {product.description && (
                <p className="text-[#adaaaa] mt-2 text-sm md:text-base line-clamp-2">{product.description}</p>
            )}
        </article>
    );
}

export default function FeaturedSection({ products = [] }) {
    const headerRef = useRef(null);
    const carouselRef = useRef(null);
    const touchStartXRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const productCount = products.length;
    const desktopVisibleCount = productCount > 1 ? 2 : productCount;

    const goToPrevious = () => {
        setCurrentIndex((prev) => getWrappedIndex(prev - 1, productCount));
    };

    const goToNext = () => {
        setCurrentIndex((prev) => getWrappedIndex(prev + 1, productCount));
    };

    const handleTouchStart = (event) => {
        touchStartXRef.current = event.touches[0]?.clientX ?? null;
    };

    const handleTouchEnd = (event) => {
        if (touchStartXRef.current === null) return;

        const touchEndX = event.changedTouches[0]?.clientX ?? touchStartXRef.current;
        const deltaX = touchEndX - touchStartXRef.current;

        touchStartXRef.current = null;

        if (Math.abs(deltaX) < 45) return;

        if (deltaX > 0) {
            goToPrevious();
            return;
        }

        goToNext();
    };

    const desktopProducts = productCount === 0
        ? []
        : Array.from({ length: desktopVisibleCount }, (_, offset) => {
            const index = getWrappedIndex(currentIndex + offset, productCount);
            return {
                product: products[index],
                index,
            };
        });

    const previousProduct = productCount > 0
        ? products[getWrappedIndex(currentIndex - 1, productCount)]
        : null;
    const currentProduct = productCount > 0 ? products[currentIndex] : null;
    const nextProduct = productCount > 0
        ? products[getWrappedIndex(currentIndex + 1, productCount)]
        : null;

    useEffect(() => {
        if (productCount === 0) {
            setCurrentIndex(0);
            return;
        }

        if (currentIndex >= productCount) {
            setCurrentIndex(0);
        }
    }, [currentIndex, productCount]);

    useEffect(() => {
        if (!headerRef.current || !carouselRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                headerRef.current,
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
                    scrollTrigger: { trigger: headerRef.current, start: 'top 85%', once: true },
                }
            );

            gsap.fromTo(
                Array.from(carouselRef.current.querySelectorAll('[data-featured-item]')),
                { y: 60, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
                    stagger: 0.15,
                    scrollTrigger: { trigger: carouselRef.current, start: 'top 80%', once: true },
                }
            );
        });

        return () => ctx.revert();
    }, [products]);

    if (productCount === 0) return null;

    return (
        <section id="catalogo" className="py-20 md:py-22 px-6 md:px-16">
            <div ref={headerRef} className="flex justify-between items-end mb-12 md:mb-14">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                    LANZAMIENTO <br />
                    <span className="text-[#8eff71]">DESTACADO.</span>
                </h2>
                <div className="text-[#adaaaa] text-sm tracking-widest uppercase mb-2">
                    Colección 2024
                </div>
            </div>

            <div ref={carouselRef}>
                <div className="hidden md:block">
                    <div className="flex items-center justify-between gap-6 mb-6">
                        <div className="text-sm uppercase tracking-[0.35em] text-[#adaaaa]">
                            {String(currentIndex + 1).padStart(2, '0')} / {String(productCount).padStart(2, '0')}
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={goToPrevious}
                                className="h-12 w-12 rounded-full border border-white/15 bg-white/5 text-white transition hover:border-[#8eff71] hover:text-[#8eff71]"
                                aria-label="Producto anterior"
                            >
                                <span className="material-symbols-outlined">arrow_back</span>
                            </button>
                            <button
                                type="button"
                                onClick={goToNext}
                                className="h-12 w-12 rounded-full border border-white/15 bg-white/5 text-white transition hover:border-[#8eff71] hover:text-[#8eff71]"
                                aria-label="Producto siguiente"
                            >
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-10">
                        {desktopProducts.map(({ product, index }, offset) => (
                            <div
                                key={`${product.id}-${index}-${offset}`}
                                data-featured-item
                                className={offset % 2 !== 0 ? 'xl:mt-14' : ''}
                            >
                                <ProductCard
                                    product={product}
                                    className="cursor-pointer"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="md:hidden">
                    <div
                        className="relative mx-auto w-full max-w-[21rem] min-h-[34rem]"
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                        style={{ touchAction: 'pan-y' }}
                    >
                        {productCount > 1 && previousProduct && (
                            <div
                                data-featured-item
                                className="absolute inset-x-0 top-8 z-0 scale-[0.88] -translate-x-7 opacity-40 blur-[1px]"
                                aria-hidden="true"
                            >
                                <ProductCard
                                    product={previousProduct}
                                    className="pointer-events-none"
                                    enableHoverZoom={false}
                                />
                            </div>
                        )}

                        <div data-featured-item className="absolute inset-0 z-20">
                            <ProductCard product={currentProduct} className="cursor-grab active:cursor-grabbing" />
                        </div>

                        {productCount > 1 && nextProduct && (
                            <div
                                data-featured-item
                                className="absolute inset-x-0 top-8 z-10 scale-[0.88] translate-x-7 opacity-40 blur-[1px]"
                                aria-hidden="true"
                            >
                                <ProductCard
                                    product={nextProduct}
                                    className="pointer-events-none"
                                    enableHoverZoom={false}
                                />
                            </div>
                        )}
                    </div>

                    {productCount > 1 && (
                        <div className="flex items-center justify-between gap-4 mt-6">
                            <button
                                type="button"
                                onClick={goToPrevious}
                                className="h-10 w-10 rounded-full border border-white/15 bg-white/5 text-white"
                                aria-label="Producto anterior"
                            >
                                <span className="material-symbols-outlined">arrow_back</span>
                            </button>

                            <div className="text-sm uppercase tracking-[0.35em] text-[#adaaaa]">
                                {String(currentIndex + 1).padStart(2, '0')} / {String(productCount).padStart(2, '0')}
                            </div>

                            <button
                                type="button"
                                onClick={goToNext}
                                className="h-10 w-10 rounded-full border border-white/15 bg-white/5 text-white"
                                aria-label="Producto siguiente"
                            >
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
