
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
        bg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVY1TA3t5nQWT97kNwX4fl6VZYdW8UMHhMEoDHIUGFvb5ED-cmEm7EINU-NzRhKQINg4-qBrZR-TvKTysUNApAc8a2YWL6bGeQaW-knuO05iD4bpvqSEDe93Eq8MX9D-RFWfdwSj588v68jPXWJUotvOfuq21PRFeUVSaBIzvMQV1GMfmtmhvL5-k8ytpUqGZW_oHZRaXvCcoIrq63Jmy8TMlouulHGeI_RK650w2H8ArxoVjbOqlkwk5yW0pdfQiKCn3YNaGgiPM3',
        highlight: false,
    },
    {
        icon: 'payments',
        title: 'CASHBACK CULTURA',
        description: 'Sumá créditos con cada compra y canjealos por beneficios en eventos de cultura urbana.',
        bg: '',
        highlight: false,
    },
    {
        icon: 'groups',
        title: 'COMUNIDAD VIP',
        description: 'Invitaciones a fiestas privadas, showrooms exclusivos y sorteos mensuales.',
        bg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5VHtnuwihED463p-WHgfaNXFH3CELXp-xdYEkD4AMtPApKpBlBqpCQABD5gk1dDmzuARCaW4o6lSEPyofX_FUkjqc6FIVD3yAbwwi5fgIwfwSsbboqEN7E1So4X5YMsmOYFaYr2oPiAre3v2Tx06EzBJOZdsEGrMhO4tYJszcZRHp8ob6Wv1fyTE6iw86NLEnir1XSO4d2BSXOpIBZXhcizO2SuOLbu_MzWLZTjQJpwoF-PY2J5bQRNhlKct2rK_3zCF3aWNvsw0A',
        highlight: true,
    },
];

export default function CommunityPerks() {
    return (
        <section id="perks" className="relative py-16 md:py-28 bg-background min-h-screen flex flex-col items-center justify-center overflow-x-hidden">
            {/* Headline */}
            <div className="w-full max-w-7xl px-6 md:px-16 text-center mb-10 md:mb-20">
                <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs md:text-sm mb-4 block">MEMBERS ONLY</span>
                <h2 className="font-headline font-black italic uppercase text-3xl sm:text-5xl md:text-7xl lg:text-8xl leading-none tracking-tighter text-on-surface mb-2">
                    BENEFICIOS DE <span className="text-primary">COMUNIDAD</span>
                </h2>
            </div>

            {/* Grid de beneficios */}
            <div className="w-full max-w-7xl px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {perks.map((perk, idx) => (
                    <div
                        key={perk.title}
                        className={`relative overflow-hidden rounded-xl bg-surface-container-low min-h-[220px] flex flex-col justify-end p-6 md:p-8 border border-outline-variant/20 transition-colors duration-300 group ${perk.highlight ? 'lg:col-span-2' : ''}`}
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
                                <span className="material-symbols-outlined text-primary text-3xl md:text-4xl">
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
            <div className="flex justify-center w-full px-6 md:px-0">
                <button className="w-full md:w-auto bg-primary text-on-primary-container px-8 md:px-12 py-4 md:py-6 rounded-full font-headline font-black italic uppercase tracking-widest text-base md:text-lg hover:scale-105 active:opacity-80 transition-all duration-300 shadow-[0_0_20px_rgba(183,252,99,0.2)]">
                    UNIRSE AHORA
                </button>
            </div>

            {/* Fondos decorativos para mobile */}
            <div className="fixed top-1/4 -right-20 w-64 h-64 bg-primary/10 blur-[100px] rounded-full -z-10"></div>
            <div className="fixed bottom-1/4 -left-20 w-64 h-64 bg-primary/5 blur-[80px] rounded-full -z-10"></div>
        </section>
    );
}
