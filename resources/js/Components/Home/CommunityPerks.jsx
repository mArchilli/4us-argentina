
import PrimaryButton from '../PrimaryButton';
import { router } from '@inertiajs/react';

const perks = [
    {
        icon: 'bolt',
        title: 'ENTREGA FLASH',
        description: 'Recibí tus accesorios de tabaquería premium y growshop en menos de 24hs en zonas seleccionadas de CABA y GBA.',
        bg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUZBEMJrU5v3ZRVnOPvfV9o-RcRU61nFN1_vikkO9lRT3E7whiybebm9eDhXHWci3VIDZnNKkNOSl34SYvyWX2Xf-unbLHP3WKLDf3RponEoByDpZ87r4I-PvsGFrLbIWTsIWZIwdR2Mv91e9OqI9mrT1MNMzhC9Pq7TuYWoS382IrFA9IXkxQCk5RQeGKDDTXIWrAxioKbW_LRRZ3AnuJwqdBcKUTNFPAWYdV48ChD-i8BnC5_4JsiLQor7bnzFRWfc8gz_jeLOlt',
        highlight: true,
    },
    {
        icon: 'new_releases',
        title: 'DROPS EXCLUSIVOS',
        description: 'Acceso anticipado a lanzamientos limitados de productos importados de India y colaboraciones especiales de 4US.',
        bg: '/images/image1-comunidad.jpg',
        highlight: false,
    },
    {
        icon: 'payments',
        title: 'EL MEJOR MARGEN DE GANANCIA',
        description: 'Nuestros precios mayoristas de tabaquería premium y growshop están pensados para que maximices tu margen con productos importados de calidad.',
        bg: '/images/image3-comunidad.jpg',
        highlight: false,
    },
    {
        icon: 'groups',
        title: 'COMUNIDAD VIP',
        description: 'Invitaciones a eventos privados, showrooms exclusivos de productos importados y sorteos mensuales para la comunidad 4US.',
        bg: '/images/image2-comunidad.jpg',
        highlight: true,
    },
];

export default function CommunityPerks() {
    return (
        <section id="perks" className="relative py-12 sm:py-16 md:py-28 bg-background min-h-screen flex flex-col items-center justify-center overflow-x-hidden">
            {/* Headline */}
            <div className="w-full max-w-7xl px-4 sm:px-6 md:px-16 text-center mb-8 sm:mb-10 md:mb-15">
                <h2 className="font-headline font-black italic uppercase text-[clamp(2.4rem,6vw,6rem)] leading-none tracking-tighter text-on-surface mb-2 sm:whitespace-nowrap">
                    BENEFICIOS DE <br className="sm:hidden" /><span className="text-[#8eff71]">COMUNIDAD.</span>
                </h2>
            </div>

            {/* Grid de beneficios */}
            <div className="w-full px-4 sm:px-6 md:px-16 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4">
                {perks.map((perk, idx) => (
                    <div
                        key={perk.title}
                        className={`relative overflow-hidden rounded-xl min-h-[250px] flex flex-col justify-end p-6 md:p-8 group ${perk.highlight ? 'lg:col-span-2' : ''}`}
                    >
                        {/* Imagen de fondo — z-0 */}
                        {perk.bg && (
                            <img
                                src={perk.bg}
                                alt=""
                                className="absolute inset-0 z-0 w-full h-full object-cover"
                                loading="lazy"
                                decoding="async"
                            />
                        )}
                        {/* Gradiente overlay — z-[1] */}
                        <div className="absolute inset-0 z-[1]" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.25) 100%)' }} />
                        {/* Contenido — z-[2] */}
                        <div className="relative z-[2] flex flex-col gap-2">
                            <div className="flex items-center gap-3 sm:gap-4 mb-2">
                                <span className="material-symbols-outlined text-2xl sm:text-3xl md:text-4xl flex-shrink-0" style={{ color: '#8eff71' }}>
                                    {perk.icon}
                                </span>
                                <h3 className="font-headline font-bold md:font-black italic uppercase tracking-tight text-base sm:text-lg md:text-2xl">
                                    {perk.title}
                                </h3>
                            </div>
                            <p className="text-on-surface-variant font-medium text-xs sm:text-sm md:text-base leading-snug">
                                {perk.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Botón CTA */}
            <div className="flex justify-center w-full px-6 md:px-0 mt-6">
                <PrimaryButton
                    className="w-full md:w-auto px-6 md:px-8 py-3 md:py-4 text-sm md:text-base tracking-widest hover:scale-105 active:opacity-80 shadow-[0_0_20px_rgba(183,252,99,0.2)]"
                    onClick={() => router.visit('/retailer')}
                >
                    CONOCER MÁS
                </PrimaryButton>
            </div>

            {/* Fondos decorativos para mobile */}
            <div className="absolute top-1/4 -right-20 w-64 h-64 bg-primary/10 blur-[100px] rounded-full -z-10"></div>
            <div className="absolute bottom-1/4 -left-20 w-64 h-64 bg-primary/5 blur-[80px] rounded-full -z-10"></div>
        </section>
    );
}
