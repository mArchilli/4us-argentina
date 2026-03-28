import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

// id: scroll target | href: full navigation
const navLinks = [
    { label: 'Inicio', id: 'inicio' },
    { label: 'Nosotros', id: 'nosotros' },
    { label: 'Catálogo', href: '/catalogo' },
    { label: 'Contacto', id: 'contacto' },
];

export default function Navbar({ auth }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('inicio');

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    // IntersectionObserver: highlight active nav link
    useEffect(() => {
        const sections = navLinks
            .map(({ id }) => document.getElementById(id))
            .filter(Boolean);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveSection(entry.target.id);
                });
            },
            { rootMargin: '-40% 0px -55% 0px' }
        );

        sections.forEach((s) => observer.observe(s));
        return () => sections.forEach((s) => observer.unobserve(s));
    }, []);

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setMenuOpen(false);
    };

    return (
        <>
            {/* ── Desktop / Mobile bar ───────────────────────────── */}
            <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-8 py-3 md:py-4 max-w-7xl mx-4 md:mx-auto bg-[#131313]/70 backdrop-blur-xl rounded-full mt-3 md:mt-4 shadow-[0_20px_40px_rgba(0,0,0,0.4)]">

                {/* Logo */}
                <button
                    onClick={() => scrollTo('inicio')}
                    className="text-xl md:text-2xl font-black text-[#8eff71] tracking-tighter font-['Space_Grotesk']"
                >
                    4us Argentina
                </button>

                {/* Desktop links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map(({ label, id, href }) =>
                        href ? (
                            <Link
                                key={label}
                                href={href}
                                className="font-['Space_Grotesk'] font-bold tracking-tight transition-colors pb-1 text-[#adaaaa] hover:text-[#8eff71]"
                            >
                                {label}
                            </Link>
                        ) : (
                            <button
                                key={id}
                                onClick={() => scrollTo(id)}
                                className={`font-['Space_Grotesk'] font-bold tracking-tight transition-colors pb-1 ${
                                    activeSection === id
                                        ? 'text-[#8eff71] border-b-2 border-[#8eff71]'
                                        : 'text-[#adaaaa] hover:text-[#8eff71]'
                                }`}
                            >
                                {label}
                            </button>
                        )
                    )}
                </div>

                {/* Right side */}
                <div className="flex items-center gap-3">
                    {auth?.user ? (
                        <Link
                            href={route('dashboard')}
                            className="bg-[#8eff71] text-[#0d6100] px-5 md:px-6 py-2 rounded-full font-bold text-sm md:text-base hover:scale-105 hover:shadow-[0_0_15px_rgba(142,255,113,0.2)] transition-all active:scale-95 duration-200"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <Link
                            href="/catalogo"
                            className="hidden md:block bg-[#8eff71] text-[#0d6100] px-6 py-2 rounded-full font-bold hover:scale-105 hover:shadow-[0_0_15px_rgba(142,255,113,0.2)] transition-all active:scale-95 duration-200"
                        >
                            Comprar
                        </Link>
                    )}

                    {/* Hamburger — mobile only */}
                    <button
                        onClick={() => setMenuOpen(true)}
                        aria-label="Abrir menú"
                        className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px]"
                    >
                        <span className="w-5 h-[2px] bg-white rounded-full block" />
                        <span className="w-5 h-[2px] bg-white rounded-full block" />
                        <span className="w-3 h-[2px] bg-white rounded-full block self-start" />
                    </button>
                </div>
            </nav>

            {/* ── Mobile fullscreen overlay ──────────────────────── */}
            <div
                className={`fixed inset-0 z-[100] flex flex-col bg-[#0a0a0a] transition-opacity duration-400 ${
                    menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
            >
                {/* Close button */}
                <div className="flex justify-end p-5">
                    <button
                        onClick={() => setMenuOpen(false)}
                        aria-label="Cerrar menú"
                        className="w-12 h-12 rounded-full bg-[#1f1f1f] border border-[#2e2e2e] flex items-center justify-center text-white text-base hover:bg-[#2a2a2a] transition-colors"
                    >
                        ✕
                    </button>
                </div>

                {/* Nav links */}
                <div className="flex flex-col items-center justify-center flex-1 gap-8">
                    {navLinks.map(({ label, id, href }, i) =>
                        href ? (
                            <Link
                                key={label}
                                href={href}
                                onClick={() => setMenuOpen(false)}
                                style={{ transitionDelay: menuOpen ? `${i * 60}ms` : '0ms' }}
                                className={`text-3xl font-medium tracking-wide transition-all duration-300 text-white hover:text-[#8eff71] ${
                                    menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                                }`}
                            >
                                {label}
                            </Link>
                        ) : (
                            <button
                                key={id}
                                onClick={() => scrollTo(id)}
                                style={{ transitionDelay: menuOpen ? `${i * 60}ms` : '0ms' }}
                                className={`text-3xl font-medium tracking-wide transition-all duration-300 ${
                                    menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                                } ${
                                    activeSection === id
                                        ? 'text-[#8eff71]'
                                        : 'text-white hover:text-[#8eff71]'
                                }`}
                            >
                                {label}
                            </button>
                        )
                    )}
                </div>

                {/* Bottom CTA */}
                <div className="flex justify-center pb-14">
                    {auth?.user ? (
                        <Link
                            href={route('dashboard')}
                            className="bg-[#8eff71] text-[#0d6100] px-10 py-4 rounded-full font-bold text-lg hover:shadow-[0_0_20px_rgba(142,255,113,0.3)] transition-all"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <Link
                            href="/catalogo"
                            className="bg-[#8eff71] text-[#0d6100] px-10 py-4 rounded-full font-bold text-lg hover:shadow-[0_0_20px_rgba(142,255,113,0.3)] transition-all active:scale-95"
                        >
                            Comprar ahora
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
}
