export default function AboutSection() {
    return (
        <section id="nosotros" className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-7 bg-[#131313] p-12 rounded-2xl flex flex-col justify-center">
                    <span className="text-[#8eff71] font-bold tracking-widest uppercase mb-4 block text-sm">
                        El Origen
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                        De India a <br /> Buenos Aires.
                    </h2>
                    <p className="text-[#adaaaa] text-lg leading-relaxed">
                        Conectamos el arte global con la cultura local.
                        Importando directamente desde el corazón de la producción en India,
                        4us Argentina garantiza que cada papel, bandeja y accesorio cumpla
                        con los más altos estándares internacionales del movimiento premium.
                    </p>
                </div>

                <div className="md:col-span-5 relative h-[400px] md:h-auto overflow-hidden rounded-2xl">
                    <img
                        className="absolute inset-0 w-full h-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2hanmQz6jNk-iHFpjbtxEOgF1DwOGXNuDt7xddNnn_nG63YvuX5WijmH0oL_Z780fQJyaChL29D-QY7uHuzbTsE4mqG9XpHDkDAX1AeDft8rufWR7EXIyzA3vWtK21o4KYRUukG5ZPZ8U2S8pR5CveZWml6yDPBtAnVi2ZyD6gA_G4WWmng5JYTb7ZnNoQsadaOXbfruTFEqO92Ra_Oizy2zrkCfS6R4xirplAVG1XdIPFfGd8WD8h6EiSCi_Dg7oyTrHj1jE8ZE"
                        alt="Bandejas metálicas premium"
                    />
                    <div className="absolute inset-0 bg-[#8eff71]/10 mix-blend-overlay" />
                </div>
            </div>
        </section>
    );
}
