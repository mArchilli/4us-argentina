
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
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const observer = new window.IntersectionObserver(
            ([entry]) => setFooterVisible(entry.intersectionRatio >= 0.8),
            { threshold: 0.8 }
        );
        if (footerRef.current) {
            observer.observe(footerRef.current);
        }
        return () => {
            if (footerRef.current) observer.unobserve(footerRef.current);
        };
    }, []);

    useEffect(() => {
        const navbar = document.querySelector('nav');
        if (navbar) {
            navbar.style.transition = 'opacity 0.3s';
            navbar.style.opacity = footerVisible ? '0' : '1';
            navbar.style.pointerEvents = footerVisible ? 'none' : '';
        }
    }, [footerVisible]);

    useEffect(() => {
        if (footerVisible) {
            setShowButton(true);
        } else if (showButton) {
            const timeout = setTimeout(() => setShowButton(false), 400);
            return () => clearTimeout(timeout);
        }
    }, [footerVisible]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <Head title="4us Argentina - Premium Smoking Culture" />

            <div className="bg-[#0e0e0e] text-white min-h-screen">
                <Navbar auth={auth} />

                <main>
                    <HeroSection />
                    <AboutSection />
                    <FeaturedSection products={featuredProducts} />
                    <CommunityPerks />
                    <ContactSection />
                </main>

                {/* Botón flotante cuando el footer es visible */}
                {showButton && (
                    <button
                        onClick={scrollToTop}
                        className={`fixed bottom-6 right-6 z-[100] bg-[#8eff71] text-[#0d6100] px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 text-base font-black uppercase tracking-tight transition-transform duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(142,255,113,0.4)] ${footerVisible ? 'animate-fadeInUp' : 'animate-fadeOutDown'}`}
                        style={{ animation: `${footerVisible ? 'fadeInUp' : 'fadeOutDown'} 0.5s cubic-bezier(0.22,1,0.36,1)` }}
                    >
                        <span className="material-symbols-outlined text-xl">arrow_upward</span>
                        Volver al inicio
                    </button>
                )}

                {/* Footer con ref para IntersectionObserver */}
                <div ref={footerRef}>
                    <HomeFooter />
                </div>
            </div>

            
        </>
    );
}
