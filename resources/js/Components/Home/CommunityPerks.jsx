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
    return (
        <section id="perks" className="py-24 bg-[#000000]">
            <div className="max-w-7xl mx-auto px-6 md:px-16 text-center mb-16">
                <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-4">
                    BENEFICIOS DE COMUNIDAD
                </h2>
                <p className="text-[#adaaaa] max-w-2xl mx-auto">
                    Precios especiales y bundles exclusivos para el círculo íntimo de 4us.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-2 md:grid-cols-4 gap-4">
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
