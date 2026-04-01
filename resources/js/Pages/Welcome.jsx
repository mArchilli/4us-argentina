
import { useRef, useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Home/Navbar';
import HeroSection from '@/Components/Home/HeroSection';
import AboutSection from '@/Components/Home/AboutSection';
import FeaturedSection from '@/Components/Home/FeaturedSection';
import CommunityPerks from '@/Components/Home/CommunityPerks';
import ContactSection from '@/Components/Home/ContactSection';
import HomeFooter from '@/Components/Home/HomeFooter';

export default function Welcome({ auth, featuredProducts }) {
    const footerRef = useRef(null);
    const [footerVisible, setFooterVisible] = useState(false);

    useEffect(() => {
        const el = footerRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                const isVisible = entry.isIntersecting && entry.intersectionRatio >= 0.8;
                setFooterVisible((prev) => (prev === isVisible ? prev : isVisible));
            },
            { threshold: 0.8 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const scrollToTop = () => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    };

    return (
        <>
            <Head title="4us Argentina - Premium Smoking Culture" />

            <div className="bg-[#0e0e0e] text-white min-h-screen">
                <Navbar auth={auth} hidden={footerVisible} />

                <main className='flex-1'>
                    <HeroSection />
                    <AboutSection />
                    <FeaturedSection products={featuredProducts} />
                    <CommunityPerks />
                    <ContactSection />
                </main>

                {/* Botón flotante cuando el footer es visible */}
                <button
                    onClick={scrollToTop}
                    className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-[#8eff71] text-[#0d6100] px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 text-base font-black uppercase tracking-tight transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-110 hover:shadow-[0_0_20px_rgba(142,255,113,0.4)] ${footerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
                >
                    <span className="material-symbols-outlined text-xl">arrow_upward</span>
                    Volver al inicio
                </button>

                {/* Footer con ref para IntersectionObserver */}
                <div ref={footerRef}>
                    <HomeFooter />
                </div>
            </div>

            
        </>
    );
}
