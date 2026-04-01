import { useEffect, useRef, useState } from 'react';
import { Link, router } from '@inertiajs/react';
import gsap from 'gsap';
import toast from 'react-hot-toast';
import { emitCartChanged } from '@/utils/cartEvents';
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
    const sortedPrices = [...(product.prices ?? [])].sort((a, b) => (a.min_quantity || 1) - (b.min_quantity || 1));
    const initialQuantity = sortedPrices[0]?.min_quantity ?? 1;
    const [quantity, setQuantity] = useState(initialQuantity);

    const getTierForQuantity = (value) => {
        if (!sortedPrices.length) return null;
        return sortedPrices.reduce(
            (selected, price) => (value >= (price.min_quantity || 1) ? price : selected),
            sortedPrices[0]
        );
    };

    const activeTier = getTierForQuantity(quantity);
    const unitPrice = activeTier ? Number(activeTier.price) : 0;
    const baseUnitPrice = sortedPrices[0] ? Number(sortedPrices[0].price) : 0;
    const savingsPerUnit = Math.max(0, baseUnitPrice - unitPrice);
    const savingsTotal = savingsPerUnit * quantity;
    const savingsPercent = baseUnitPrice > 0 ? Math.round((savingsPerUnit / baseUnitPrice) * 100) : 0;

    const handleQuantityChange = (value) => {
        const parsed = Number(value);
        if (Number.isNaN(parsed)) {
            setQuantity(1);
            return;
        }
        setQuantity(Math.max(1, Math.floor(parsed)));
    };

    const handleAddToCart = () => {
        router.post(
            route('cart.add'),
            { product_id: product.id, quantity },
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success(`${quantity} unidad(es) agregadas al carrito.`);
                    emitCartChanged();
                },
                onError: () => toast.error('No se pudo agregar el producto.'),
            }
        );
    };

    return (
        <article className={`group ${className} h-full flex flex-col`}>
            <div className={`relative overflow-hidden rounded-[1.6rem] mb-5 bg-[#131313] ${contentClassName} flex-1`}>
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
                {sortedPrices.length > 0 && (
                    <div className="text-right flex-shrink-0">
                        <p className="text-[#8eff71] text-lg md:text-xl font-bold leading-tight">
                            ${unitPrice.toLocaleString('es-AR')} ARS
                        </p>
                        <p className="text-[#adaaaa] text-xs">x{quantity} u</p>
                        {savingsTotal > 0 && (
                            <p className="text-[#8eff71] text-[10px] font-bold uppercase tracking-wide">
                                Ahorras ${savingsTotal.toLocaleString('es-AR')} ({savingsPercent}%)
                            </p>
                        )}
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
                <p className="text-[#adaaaa] mt-2 text-sm md:text-base line-clamp-2 flex-none">{product.description}</p>
            )}

            {sortedPrices.length > 1 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                    {sortedPrices.map((price) => (
                        <button
                            key={price.id}
                            type="button"
                            onClick={() => setQuantity(price.min_quantity || 1)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide transition-all ${
                                activeTier?.id === price.id
                                    ? 'bg-[#8eff71] text-[#0d6100]'
                                    : 'bg-[#1a1a1a] text-[#adaaaa] border border-[#2a2a2a] hover:border-[#8eff71]/40 hover:text-white'
                            }`}
                        >
                            {price.min_quantity}+ u
                        </button>
                    ))}
                </div>
            )}

            <div className="mt-4 inline-flex items-center bg-[#0e0e0e] border border-[#2a2a2a] rounded-full overflow-hidden w-fit">
                <button
                    type="button"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center text-white hover:bg-[#1f2020] transition-colors"
                    aria-label="Disminuir cantidad"
                >
                    <span className="material-symbols-outlined text-base">remove</span>
                </button>
                <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(e.target.value)}
                    className="w-14 bg-transparent text-center text-white text-sm font-bold outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <button
                    type="button"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-white hover:bg-[#1f2020] transition-colors"
                    aria-label="Aumentar cantidad"
                >
                    <span className="material-symbols-outlined text-base">add</span>
                </button>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                    type="button"
                    onClick={handleAddToCart}
                    className="w-full bg-[#8eff71] text-[#0d6100] py-2.5 rounded-full font-black uppercase tracking-tighter flex items-center justify-center gap-1.5 transition-all duration-300 text-xs hover:shadow-[0_0_20px_rgba(142,255,113,0.35)]"
                >
                    <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
                    Agregar
                </button>
                <Link
                    href={route('catalog.show', product.id)}
                    className="w-full bg-[#8eff71]/10 border border-[#8eff71]/20 text-[#8eff71] py-2.5 rounded-full font-black uppercase tracking-tighter flex items-center justify-center gap-1.5 transition-all duration-300 text-xs hover:bg-[#8eff71] hover:text-[#0d6100]"
                >
                    Ver
                </Link>
            </div>
        </article>
    );
}

export default function FeaturedSection({ products = [] }) {
    const headerRef = useRef(null);
    const carouselRef = useRef(null);
    const touchStartXRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const productCount = products.length;
    const desktopVisibleCount = productCount > 3 ? 4 : productCount;

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
        <section id="catalogo" className="py-20 md:py-22 px-6 md:px-16 min-h-screen flex flex-col justify-center">
            <div ref={headerRef} className="flex justify-between items-end mb-12 md:mb-14">
                <h2 className="text-4xl md:text-7xl font-bold tracking-tight">
                    LANZAMIENTOS <br />
                    <span className="text-[#8eff71]">DESTACADOS.</span>
                </h2>
                <div className="text-[#adaaaa] text-sm tracking-widest uppercase mb-2">
                    Colección 2026
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 xl:gap-10 h-full">
                        {desktopProducts.map(({ product, index }, offset) => (
                            <div
                                key={`${product.id}-${index}-${offset}`}
                                data-featured-item
                                className={`h-full ${offset % 2 !== 0 ? 'xl:mt-14' : ''}`}
                            >
                                <ProductCard
                                    product={product}
                                    className="cursor-pointer h-full"
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="md:hidden flex flex-col gap-6">
                    {products.map((product) => (
                        <div key={product.id} data-featured-item>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
