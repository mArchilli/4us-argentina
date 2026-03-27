export default function HeroSection() {
    return (
        <section id="inicio" className="relative min-h-screen flex items-center px-6 md:px-16 overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img
                    className="w-full h-full object-cover opacity-60 grayscale-[40%]"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCILPZC2jmtwR-WIxvXA6kVJaqL3Tk9-VtMop3P7pRc75kbHaiuqmL5HJKVlIvpUIBTCU7eByrn4ean-ndssDaIIgFcmk7jNTh8azTKvDBPRpifdanH9kLRZLJ4pmTv1pZloE03qK5qKAMpsikHZY3oSiHDz8LGCEPTBy0SM1u4Dc-KXkYiXtD4De8uIqw0ULQL_EwXal9IwUXIf1uEgtK0m1PANAjvC2P_tWRn5pclWAwZlSasQJl2uvWvAuPxZdRH5pj7ezxmHWc"
                    alt="Productos premium para fumadores"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0e0e0e] via-[#0e0e0e]/60 to-transparent" />
            </div>

            <div className="relative z-10 max-w-4xl">
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-6">
                    ELEVÁ LA <br />
                    <span className="text-[#8eff71] italic">CULTURA.</span>
                </h1>
                <p className="text-xl text-[#adaaaa] max-w-xl mb-10 leading-relaxed">
                    Accesorios premium para fumadores, seleccionados para el conocedor.
                    Importados directamente, auténticos sin concesiones.
                </p>
                <div className="flex flex-wrap gap-4">
                    <button className="bg-gradient-to-br from-[#8eff71] to-[#2ff801] text-[#0d6100] px-10 py-4 rounded-full font-bold text-lg hover:shadow-[0_0_30px_rgba(142,255,113,0.3)] transition-all active:scale-95">
                        Ver Catálogo
                    </button>
                    <button className="border border-[#484848] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-[#262626] transition-all active:scale-95">
                        Nuestra Historia
                    </button>
                </div>
            </div>
        </section>
    );
}
