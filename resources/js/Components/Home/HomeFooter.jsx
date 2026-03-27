import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const links = [
    { label: 'Instagram', href: 'https://instagram.com/4us.argentina' },
    { label: 'WhatsApp', href: 'https://wa.me/5491112345678' },
    { label: 'Info de envíos', href: '#' },
    { label: 'Política de privacidad', href: '#' },
];

export default function HomeFooter() {
    const footerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(footerRef.current,
                { y: 30, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
                    scrollTrigger: { trigger: footerRef.current, start: 'top 95%', once: true },
                }
            );
        });
        return () => ctx.revert();
    }, []);

    return (
        <footer ref={footerRef} className="w-full px-12 py-16 flex flex-col md:flex-row justify-between items-center gap-8 bg-black rounded-t-[3rem] mt-24">
            <div className="flex flex-col items-center md:items-start">
                <div className="text-xl font-bold text-[#8eff71] mb-2">4us Argentina</div>
                <p className="text-[#adaaaa] text-sm tracking-widest uppercase text-center md:text-left">
                    © {new Date().getFullYear()} 4us Argentina. Cultura Premium.
                </p>
            </div>

            <div className="flex flex-wrap justify-center gap-8">
                {links.map((link) => (
                    <a
                        key={link.label}
                        href={link.href}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                        className="text-[#adaaaa] hover:text-[#8eff71] transition-colors text-sm tracking-widest uppercase"
                    >
                        {link.label}
                    </a>
                ))}
            </div>

            <div className="flex gap-4">
                <span className="material-symbols-outlined text-[#8eff71]">eco</span>
                <span className="material-symbols-outlined text-[#8eff71]">shopping_bag</span>
                <span className="material-symbols-outlined text-[#8eff71]">public</span>
            </div>
        </footer>
    );
}
