import { useRef, useEffect } from 'react';

const links = [
    { label: 'Instagram', href: 'https://www.instagram.com/4usargentina/' },
    { label: 'WhatsApp', href: 'https://wa.me/5491169659907' },
    { label: 'Info de envíos', href: '#' },
    { label: 'Política de privacidad', href: '#' },
];


export default function HomeFooter() {
    const footerRef = useRef(null);

    useEffect(() => {
        const el = footerRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add('animate-in');
                    observer.disconnect();
                }
            },
            { threshold: 0.05 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <footer ref={footerRef} className="relative bg-zinc-950 pt-24 pb-10 border-t border-white/5 overflow-hidden min-h-[480px] flex flex-col justify-between opacity-0 translate-y-6 transition-all duration-700 ease-out [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-6 md:px-16 w-full mx-auto relative z-10 flex-grow content-start">
                {/* Branding & descripción */}
                <div className="md:col-span-1 space-y-8">
                    <div className="text-4xl font-black italic tracking-tighter text-[#8eff71]">4US ARGENTINA</div>
                    <p className="text-zinc-500 text-base leading-relaxed max-w-xs">
                        Cultura premium desde Buenos Aires. Editorial, drops y comunidad para todo el país.
                    </p>
                    <div className="flex space-x-4">
                        <a className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-[#8eff71] hover:border-[#8eff71] transition-all duration-300" href="https://www.instagram.com/4usargentina/" target="_blank" rel="noreferrer">
                            <span className="material-symbols-outlined">share</span>
                        </a>
                        <a className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-[#8eff71] hover:border-[#8eff71] transition-all duration-300" href="https://wa.me/5491169659907" target="_blank" rel="noreferrer">
                            <span className="material-symbols-outlined">public</span>
                        </a>
                    </div>
                </div>
                {/* Nav 1: Cultura */}
                <div className="space-y-8">
                    <h5 className="font-headline font-black italic uppercase tracking-tighter text-white text-xl">Cultura</h5>
                    <ul className="space-y-4">
                        <li><a className="text-zinc-500 uppercase text-xs tracking-[0.2em] font-bold hover:text-[#8eff71] hover:italic transition-all duration-300" href="/">Inicio</a></li>
                        <li><a className="text-zinc-500 uppercase text-xs tracking-[0.2em] font-bold hover:text-[#8eff71] hover:italic transition-all duration-300" href="/catalogo">Catálogo</a></li>
                        <li><a className="text-zinc-500 uppercase text-xs tracking-[0.2em] font-bold hover:text-[#8eff71] hover:italic transition-all duration-300" href="/retailer">Mayoristas</a></li>
                    </ul>
                </div>
                {/* Nav 2: Comunidad */}
                <div className="space-y-8 order-3 md:order-none">
                    <h5 className="font-headline font-black italic uppercase tracking-tighter text-white text-xl">Comunidad</h5>
                    <ul className="space-y-4">
                        <li><a className="text-zinc-500 uppercase text-xs tracking-[0.2em] font-bold hover:text-[#8eff71] hover:italic transition-all duration-300" href="https://www.instagram.com/4usargentina/" target="_blank" rel="noreferrer">Instagram</a></li>
                        <li><a className="text-zinc-500 uppercase text-xs tracking-[0.2em] font-bold hover:text-[#8eff71] hover:italic transition-all duration-300" href="https://wa.me/5491169659907" target="_blank" rel="noreferrer">WhatsApp</a></li>
                        <li><a className="text-zinc-500 uppercase text-xs tracking-[0.2em] font-bold hover:text-[#8eff71] hover:italic transition-all duration-300" href="mailto:contacto@4usargentina.com">Contacto</a></li>
                    </ul>
                    <div className="hidden md:block pt-4 border-t border-white/5">
                        <p className="text-[10px] text-zinc-600 uppercase tracking-[0.3em] mb-2 font-bold">Consultas directas</p>
                        <a className="text-[#8eff71] font-headline italic uppercase font-black text-2xl hover:underline underline-offset-8 decoration-2" href="mailto:contacto@4usargentina.com">contacto@4usargentina.com</a>
                    </div>
                </div>
                {/* Nav 3: Legal */}
                <div className="space-y-8 order-4 md:order-none">
                    <h5 className="font-headline font-black italic uppercase tracking-tighter text-white text-xl">Legal</h5>
                    <ul className="space-y-4">
                        <li><a className="text-zinc-500 uppercase text-xs tracking-[0.2em] font-bold hover:text-[#8eff71] hover:italic transition-all duration-300" href="#">Política de privacidad</a></li>
                        <li><a className="text-zinc-500 uppercase text-xs tracking-[0.2em] font-bold hover:text-[#8eff71] hover:italic transition-all duration-300" href="#">Envíos</a></li>
                    </ul>
                </div>
                {/* Mail - mobile only (separate block) */}
                <div className="md:hidden order-5 pt-4 border-t border-white/5">
                    <p className="text-[10px] text-zinc-600 uppercase tracking-[0.3em] mb-2 font-bold">Consultas directas</p>
                    <a className="text-[#8eff71] font-headline italic uppercase font-black text-2xl hover:underline underline-offset-8 decoration-2" href="mailto:contacto@4usargentina.com">contacto@4usargentina.com</a>
                </div>
            </div>

            {/* Massive Background Text Anchor */}
            <div className="w-full mt-auto mb-16 overflow-hidden pointer-events-none select-none">
                <h2 className="text-[14rem] md:text-[24vw] font-black italic leading-none text-zinc-900/40 tracking-tighter whitespace-nowrap text-center translate-y-12">
                    4US ARGENTINA
                </h2>
            </div>

            {/* Copyright Bar */}
            <div className="border-t border-white/5 pt-10 px-6 md:px-16 w-full mx-auto flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
                <p className="text-zinc-600 text-[10px] uppercase tracking-[0.4em] font-bold text-center md:text-left">© {new Date().getFullYear()} 4US ARGENTINA — TODOS LOS DERECHOS RESERVADOS</p>
                <div className="flex gap-2 items-center">
                    <span className="text-zinc-700 text-xs uppercase tracking-[0.2em] font-bold">Powered by</span>
                    <a
                        href="https://archillimatias.dev"
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#8eff71] text-xs uppercase tracking-[0.2em] font-bold hover:underline"
                    >
                        Pampa Labs
                    </a>
                </div>
            </div>
        </footer>
    );
}
