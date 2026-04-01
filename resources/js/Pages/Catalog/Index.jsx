import { useRef, useEffect, useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import Navbar from '@/Components/Home/Navbar';
import HomeFooter from '@/Components/Home/HomeFooter';
import SecondaryButton from '@/Components/SecondaryButton';

function CategoryBadge({ name }) {
    return (
        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#8eff71]/10 border border-[#8eff71]/25 text-[#9dff88] uppercase tracking-wide">
            {name}
        </span>
    );
}

function ProductCard({ product }) {
    const image = product.primary_media?.url ?? null;

    return (
        <Link
            href={route('catalog.show', product.id)}
            className="group relative flex flex-col h-full bg-[#131313] rounded-[1.6rem] overflow-hidden hover:scale-[1.02] transition-all duration-500 shadow-xl"
        >
            <div className="aspect-[4/5] overflow-hidden relative">
                {image ? (
                    <img
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        src={image}
                        alt={product.title}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#1a1a1a]">
                        <span className="material-symbols-outlined text-[#2a2a2a] text-6xl">image</span>
                    </div>
                )}

                {product.offer_active && (
                    <div className="absolute top-4 right-4">
                        <span className="bg-[#ff7351] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                            Oferta
                        </span>
                    </div>
                )}

                {product.categories?.length > 0 && (
                    <div className="absolute top-4 left-4">
                        <span className="bg-[#8eff71] text-[#0d6100] px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                            {product.categories[0].name}
                        </span>
                    </div>
                )}
            </div>

            <div className="p-6 flex flex-col justify-between flex-1">
                <div className="flex justify-between items-start mb-2 gap-2">
                    <div className="flex-1 pr-4">
                        <h3 className="text-xl font-bold tracking-tight leading-tight text-white">
                            {product.title}
                        </h3>
                        {product.categories?.length > 1 && (
                            <div className="mt-2 flex flex-wrap gap-2">
                                {product.categories.slice(1).map((cat) => (
                                    <CategoryBadge key={cat.id} name={cat.name} />
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="text-right flex-shrink-0">
                        {product.prices?.length > 0 ? (
                            product.prices
                                .slice()
                                .sort((a, b) => (a.min_quantity || 1) - (b.min_quantity || 1))
                                .map((price, i) => (
                                    <div key={i} className="flex flex-col items-end">
                                        <span className="text-[#8eff71] font-black text-lg md:text-xl">
                                            ${Number(price.price).toLocaleString('es-AR')}
                                        </span>
                                        {price.min_quantity > 1 && (
                                            <span className="text-[#adaaaa] text-xs">x{price.min_quantity}</span>
                                        )}
                                    </div>
                                ))
                        ) : (
                            <div className="text-[#adaaaa] text-sm">Consultar</div>
                        )}
                    </div>
                </div>

                {product.description && (
                    <p className="text-[#adaaaa] text-sm line-clamp-2 mb-4 leading-relaxed">
                        {product.description}
                    </p>
                )}

                {/* secondary categories already shown above, no duplicate needed */}

                <div className="mt-6">
                    <div className="w-full bg-[#8eff71]/10 border border-[#8eff71]/20 text-[#8eff71] py-3 rounded-full font-black uppercase tracking-tighter flex items-center justify-center gap-2 group-hover:bg-[#8eff71] group-hover:text-[#0d6100] transition-all duration-300 text-sm">
                        <span className="material-symbols-outlined text-base">shopping_cart</span>
                        Ver producto
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default function CatalogIndex({ auth, products = [], categories = [], activeCategory = null }) {
    const footerRef = useRef(null);
    const [footerVisible, setFooterVisible] = useState(false);

    useEffect(() => {
        const el = footerRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => setFooterVisible(entry.intersectionRatio >= 0.8),
            { threshold: [0, 0.8] }
        );
        observer.observe(el);
        return () => observer.unobserve(el);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCategory = (slug) => {
        router.get(route('catalog.index'), slug ? { categoria: slug } : {}, { preserveScroll: false });
    };

    return (
        <>
            <Head title="Catálogo - 4us Argentina" />
            <div className="bg-[#0e0e0e] text-white min-h-screen">
                <Navbar auth={auth} hidden={footerVisible} />

                <main className=" pb-32 flex-1">
                    {/* Hero Header (retailer-like, adapted to catálogo) */}
                    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 mb-20 overflow-hidden">
                        <div className="absolute top-0 right-2 h-full opacity-40 z-0 lg:mr-28 lg:pr-28 md:mr-14 md:pr-16">
                            
                            <img alt="Catálogo 4US" className="w-full h-full object-cover grayscale contrast-125 " src="/images/catalog-images.png" />
                        </div>
                        <div className="relative z-10 max-w-4xl pt-24">
                            <div className="inline-block px-3 py-1 bg-[#8eff71]/10 border border-[#8eff71]/20 rounded-full mb-6">
                                <span className="text-[#8eff71] text-xs font-black tracking-widest uppercase font-label italic">Catálogo Oficial</span>
                            </div>
                            <h1 className="text-5xl md:text-8xl font-headline font-black italic uppercase leading-none tracking-tighter mb-8">
                                ¿BUSCÁS <span className="text-[#8eff71]">PREMIUM</span>? <br />
                                ENCONTRÁ LO MEJOR <br />
                                EN NUESTRO CATÁLOGO
                            </h1>
                            <p className="text-[#adaaaa] text-lg md:text-xl max-w-xl mb-12 font-medium leading-relaxed">
                                Explorá nuestra selección curada de accesorios y piezas exclusivas pensadas para identidad, estética y calidad.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a
                                    href="#productos"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="group bg-[#8eff71] text-[#0d6100] font-headline font-black italic px-8 py-5 rounded-full text-lg uppercase tracking-tight hover:shadow-[0_0_30px_rgba(142,255,113,0.3)] transition-all active:scale-95 flex items-center justify-center gap-2"
                                >
                                    EXPLORAR CATÁLOGO
                                    <span className="material-symbols-outlined font-bold transform transition-transform duration-300 group-hover:rotate-90">arrow_forward</span>
                                </a>
                            </div>
                        </div>
                    </section>

                    {/* Category filter pills */}
                    <div className="flex flex-wrap gap-3 mb-12">
                        <button
                            onClick={() => handleCategory(null)}
                            className={`px-7 py-2.5 rounded-full font-bold transition-all text-sm ${
                                !activeCategory
                                    ? 'bg-[#8eff71] text-[#0d6100] shadow-lg'
                                    : 'bg-[#1f2020] text-[#adaaaa] border border-[#484848]/40 hover:bg-[#262626] hover:text-[#8eff71]'
                            }`}
                        >
                            Todos
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => handleCategory(cat.slug)}
                                className={`px-7 py-2.5 rounded-full font-bold transition-all text-sm ${
                                    activeCategory === cat.slug
                                        ? 'bg-[#8eff71] text-[#0d6100] shadow-lg'
                                        : 'bg-[#1f2020] text-[#adaaaa] border border-[#484848]/40 hover:bg-[#262626] hover:text-[#8eff71]'
                                }`}
                            >
                                {cat.name}
                                {cat.products_count > 0 && (
                                    <span className="ml-2 text-xs opacity-60">({cat.products_count})</span>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Product grid */}
                    <div id="productos">
                    {products.length === 0 ? (
                        <div className="text-center py-24 text-[#adaaaa]">
                            <span className="material-symbols-outlined text-6xl mb-4 block text-[#2a2a2a]">inventory_2</span>
                            <p className="text-xl font-medium">No hay productos en esta categoría todavía.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                    </div>

                    {/* CTA section (styled like retailer) */}
                    <section className="px-6 md:px-12 lg:px-24 mt-32">
                        <div className="bg-[#8eff71] p-12 md:p-24 rounded-[3rem] text-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                            <div className="relative z-10">
                                <h2 className="text-[#0d6100] text-5xl md:text-7xl font-headline font-black italic uppercase mb-8 tracking-tighter">
                                    ¿Buscás algo <span className="text-[#0d6100]">Específico?</span>
                                </h2>
                                <p className="text-[#0d6100]/80 text-xl font-bold uppercase tracking-widest mb-12 max-w-2xl mx-auto">
                                    Realizamos pedidos personalizados y ventas mayoristas para locales y clubes de cultivo. Contactanos y armamos tu presupuesto.
                                </p>
                                <SecondaryButton>
                                    Contactate
                                </SecondaryButton>
                            </div>
                        </div>
                    </section>
                </main>

                {/* Botón flotante cuando el footer es visible */}
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
        </>
    );
}
