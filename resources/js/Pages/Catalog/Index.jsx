import { Head, Link, router } from '@inertiajs/react';
import Navbar from '@/Components/Home/Navbar';
import HomeFooter from '@/Components/Home/HomeFooter';

function CategoryBadge({ name }) {
    return (
        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#8eff71]/10 border border-[#8eff71]/25 text-[#9dff88] uppercase tracking-wide">
            {name}
        </span>
    );
}

function ProductCard({ product }) {
    const image = product.primary_media?.url ?? null;
    const firstPrice = product.prices?.[0];

    return (
        <Link
            href={route('catalog.show', product.id)}
            className="group relative flex flex-col bg-[#131313] rounded-[1.6rem] overflow-hidden hover:scale-[1.02] transition-all duration-500 shadow-xl"
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

            <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2 gap-2">
                    <h3 className="text-xl font-bold tracking-tight leading-tight text-white">
                        {product.title}
                    </h3>
                    {firstPrice && (
                        <span className="text-[#8eff71] font-black text-lg flex-shrink-0">
                            ${Number(firstPrice.price).toLocaleString('es-AR')}
                        </span>
                    )}
                </div>

                {product.description && (
                    <p className="text-[#adaaaa] text-sm line-clamp-2 mb-4 leading-relaxed">
                        {product.description}
                    </p>
                )}

                {product.categories?.length > 1 && (
                    <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                        {product.categories.slice(1).map((cat) => (
                            <CategoryBadge key={cat.id} name={cat.name} />
                        ))}
                    </div>
                )}

                <div className="mt-4">
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
    const handleCategory = (slug) => {
        router.get(route('catalog.index'), slug ? { categoria: slug } : {}, { preserveScroll: false });
    };

    return (
        <>
            <Head title="Catálogo - 4us Argentina" />
            <div className="bg-[#0e0e0e] text-white min-h-screen">
                <Navbar auth={auth} />

                <main className="pt-32 pb-24 px-6 md:px-10 max-w-7xl mx-auto">
                    {/* Hero Header */}
                    <header className="mb-14">
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-5 uppercase">
                            Catálogo <span className="text-[#8eff71] italic">Premium</span>
                        </h1>
                        <p className="text-[#adaaaa] text-lg max-w-2xl font-medium">
                            Explorá nuestra selección exclusiva de accesorios diseñados para elevar tu experiencia.
                            Estética, cultura y calidad en cada pieza.
                        </p>
                    </header>

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

                    {/* CTA section */}
                    <section className="mt-28 relative rounded-[2rem] bg-[#131313] overflow-hidden p-10 md:p-20">
                        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
                            <div className="w-full h-full bg-gradient-to-l from-[#8eff71] to-transparent" />
                        </div>
                        <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
                            <div>
                                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 text-white">
                                    ¿Buscás algo <span className="text-[#8eff71]">Específico?</span>
                                </h2>
                                <p className="text-lg text-[#adaaaa] mb-10 font-medium">
                                    Realizamos pedidos personalizados y ventas mayoristas para locales y clubes
                                    de cultivo. Contactanos y armamos tu presupuesto.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a
                                        href="https://wa.me/5491169659907"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="px-8 py-4 bg-[#8eff71] text-[#0d6100] rounded-full font-black uppercase tracking-wider hover:scale-105 transition-all shadow-[0_0_20px_rgba(142,255,113,0.3)] text-center"
                                    >
                                        Venta Mayorista
                                    </a>
                                    <a
                                        href="https://wa.me/5491169659907"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="px-8 py-4 border-2 border-[#8eff71] text-[#8eff71] rounded-full font-black uppercase tracking-wider hover:bg-[#8eff71]/10 transition-all text-center"
                                    >
                                        Contacto Directo
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

                <HomeFooter />
            </div>
        </>
    );
}
