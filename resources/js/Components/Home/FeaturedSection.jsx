const products = [
    {
        id: 1,
        name: 'Pro-Series Trays',
        price: '$4.500 ARS',
        description: 'Diseñada con precisión para la sesión perfecta.',
        badge: 'Nueva llegada',
        badgeClass: 'bg-[#8eff71] text-[#0d6100]',
        offsetClass: '',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqXmL0Ru3kOo8UonEZSKg-yKueHAHVpuxhhDk6uzcOSE1c1m8yJEy6t6Zkq1sBl8JPo3BSiMv0O9XQD7_1Mdlt6DjoYQh4W8PKCOUuz53pvCNcBRKJANp-xhYIV8C_B-9CPZTVNVCiHmc-ll2lBljTSgL2_7rswMBKTic7r8V-PkAg2y22TUSKjZHtVmivPZjhKsCYYsLTWwI-QO1uAyqKY_WsOB6AoZ24Y3tCO7idyvEfQZoAiagMOBZw9aMzKEoAIqjjaarscMk',
        alt: 'Bandeja Pro-Series',
    },
    {
        id: 2,
        name: '4uspaper Organic',
        price: '$1.200 ARS',
        description: 'Quema lenta. Cero interferencia de sabor. Pura artesanía.',
        badge: 'Más vendido',
        badgeClass: 'bg-[#262626] text-white',
        offsetClass: 'mt-12 md:mt-24',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXJ4u7hgf8FO94Vf7Xjom-1rvhmdifMeVxFqVCtrtTxCqadf7qgaQo_BOf_C4wRx167y47g4QsrATOCL17JPKsZvGIawJk2_uqpq_wee_9sPK0Bhwi8sxXO1k_N8DpVMQYwpbpehgu3RMesYnOSKWoW5HwWqQTuN-TX_OmihgjBWzUFYj_LXISxL_DBiQdYZ8JuOks252RUM1B3JaJKTYn8baf6mte4-AbFS5wJZ9aXbwoogJTpKfszlbhcqE1jjjpDJ2JGZSWwEw',
        alt: 'Papeles orgánicos 4uspaper',
    },
];

export default function FeaturedSection() {
    return (
        <section id="catalogo" className="py-24 px-6 md:px-16">
            <div className="flex justify-between items-end mb-16">
                <h2 className="text-5xl font-bold tracking-tight">
                    LANZAMIENTO <br />
                    <span className="text-[#8eff71]">DESTACADO.</span>
                </h2>
                <div className="text-[#adaaaa] text-sm tracking-widest uppercase mb-2">
                    Colección 2024
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {products.map((product) => (
                    <div key={product.id} className={`group cursor-pointer ${product.offsetClass}`}>
                        <div className="relative overflow-hidden rounded-2xl mb-6 bg-[#131313] aspect-[4/5]">
                            <img
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                src={product.image}
                                alt={product.alt}
                            />
                            <div className="absolute top-6 right-6">
                                <span className={`${product.badgeClass} px-4 py-1 rounded-full text-sm font-bold`}>
                                    {product.badge}
                                </span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <h3 className="text-2xl font-bold">{product.name}</h3>
                            <p className="text-[#8eff71] text-xl font-bold">{product.price}</p>
                        </div>
                        <p className="text-[#adaaaa] mt-2">{product.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
