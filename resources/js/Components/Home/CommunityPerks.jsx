
import PrimaryButton from '../PrimaryButton';
import { router } from '@inertiajs/react';

const perks = [
    {
        icon: 'bolt',
        title: 'ENTREGA FLASH',
        description: 'Recibí tus productos en menos de 24hs en zonas seleccionadas de CABA y GBA.',
        bg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUZBEMJrU5v3ZRVnOPvfV9o-RcRU61nFN1_vikkO9lRT3E7whiybebm9eDhXHWci3VIDZnNKkNOSl34SYvyWX2Xf-unbLHP3WKLDf3RponEoByDpZ87r4I-PvsGFrLbIWTsIWZIwdR2Mv91e9OqI9mrT1MNMzhC9Pq7TuYWoS382IrFA9IXkxQCk5RQeGKDDTXIWrAxioKbW_LRRZ3AnuJwqdBcKUTNFPAWYdV48ChD-i8BnC5_4JsiLQor7bnzFRWfc8gz_jeLOlt',
        highlight: true,
    },
    {
        icon: 'new_releases',
        title: 'DROPS EXCLUSIVOS',
        description: 'Acceso anticipado a lanzamientos limitados y colaboraciones especiales de 4US.',
        bg: '/images/image1-comunidad.jpg',
        highlight: false,
    },
    {
        icon: 'payments',
        title: 'EL MEJOR MARGEN GANANCIA',
        description: 'Nuestros precios y ofertas por mayor estan pensandos para que tengas los mejores margenes de ganancia con productos de calidad.',
        bg: '/images/image3-comunidad.jpg',
        highlight: false,
    },
    {
        icon: 'groups',
        title: 'COMUNIDAD VIP',
        description: 'Invitaciones a fiestas privadas, showrooms exclusivos y sorteos mensuales.',
        bg: '/images/image2-comunidad.jpg',
        highlight: true,
    },
];

export default function CommunityPerks() {
    return (
        <section id="perks" className="relative py-16 md:py-28 bg-background min-h-screen flex flex-col items-center justify-center overflow-x-hidden">
            {/* Headline */}
            <div className="w-full max-w-7xl px-6 md:px-16 text-center mb-10 md:mb-15">
                <h2 className="font-headline font-black italic uppercase text-3xl sm:text-5xl md:text-7xl lg:text-8xl leading-none tracking-tighter text-on-surface mb-2">
                    BENEFICIOS DE <span className="text-primary text-[#8eff71]">COMUNIDAD.</span>
                </h2>
            </div>

            {/* Grid de beneficios */}
            <div className="w-full px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
                {perks.map((perk, idx) => (
                    <div
                        key={perk.title}
                        className={`relative overflow-hidden rounded-xl bg-surface-container-low min-h-[250px] flex flex-col justify-end p-6 md:p-8 transition-colors duration-300 group ${perk.highlight ? 'lg:col-span-2' : ''}`}
                    >
                        {/* Imagen de fondo para desktop y highlight */}
                        {perk.bg && (
                            <div className="hidden md:block absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500">
                                <img src={perk.bg} alt="" className="w-full h-full object-cover" loading="lazy" />
                            </div>
                        )}
                        {/* Gradiente overlay */}
                        {perk.bg && (
                            <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/60 to-transparent"></div>
                        )}
                        <div className="relative z-10 flex flex-col gap-2">
                            <div className="flex items-center gap-4 mb-2">
                                <span className="material-symbols-outlined text-3xl md:text-4xl" style={{ color: '#8eff71' }}>
                                    {perk.icon}
                                </span>
                                <h3 className="font-headline font-bold md:font-black italic uppercase tracking-tight text-lg md:text-2xl">
                                    {perk.title}
                                </h3>
                            </div>
                            <p className="text-on-surface-variant font-medium text-sm md:text-base leading-snug">
                                {perk.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Botón CTA */}
            <div className="flex justify-center w-full px-6 md:px-0 mt-6">
                <PrimaryButton
                    className="w-full md:w-auto px-8 md:px-12 py-4 md:py-6 text-base md:text-lg tracking-widest hover:scale-105 active:opacity-80 shadow-[0_0_20px_rgba(183,252,99,0.2)]"
                    onClick={() => router.visit('/retailer')}
                >
                    CONOCER MÁS
                </PrimaryButton>
            </div>

            {/* Fondos decorativos para mobile */}
            <div className="fixed top-1/4 -right-20 w-64 h-64 bg-primary/10 blur-[100px] rounded-full -z-10"></div>
            <div className="fixed bottom-1/4 -left-20 w-64 h-64 bg-primary/5 blur-[80px] rounded-full -z-10"></div>
        </section>
    );
}
