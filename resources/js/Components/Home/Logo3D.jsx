import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Logo3D({ src, alt, className = '' }) {
    const containerRef = useRef(null);
    const imgRef = useRef(null);
    const entranceTlRef = useRef(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded) return;
        const img = imgRef.current;
        if (!img) return;

        // Promover a propia capa GPU antes de animar
        img.style.willChange = 'transform, opacity';

        const trigger = ScrollTrigger.create({
            trigger: containerRef.current,
            start: 'top 85%',
            once: true,
            onEnter: () => {
                const tl = gsap.timeline({
                    onComplete: () => {
                        // Liberar capa GPU al terminar — el elemento queda estático
                        img.style.willChange = 'auto';
                        entranceTlRef.current = null;
                    },
                });
                entranceTlRef.current = tl;

                // Phase 1: Spin-in — blur separado vía CSS filter, transform vía GPU
                tl.fromTo(img,
                    { opacity: 0, scale: 0.4, rotateY: -90, rotateX: 15 },
                    { opacity: 1, scale: 1.08, rotateY: 8, rotateX: -3, duration: 1.1, ease: 'expo.out' },
                );
                // blur aparte: solo anima filter, sin interferir con el transform composite
                tl.fromTo(img,
                    { filter: 'blur(12px)' },
                    { filter: 'blur(0px)', duration: 0.6, ease: 'power2.out' },
                    '<',
                );

                // Phase 2: Elastic settle — solo propiedades de transform (GPU-only)
                tl.to(img, {
                    scale: 1, rotateY: 0, rotateX: 0,
                    duration: 0.8, ease: 'back.out(2.5)',
                });
            },
        });

        return () => {
            trigger.kill();
            if (entranceTlRef.current) entranceTlRef.current.kill();
        };
    }, [loaded]);

    return (
        <div
            ref={containerRef}
            className={`relative flex items-center justify-center group ${className}`}
        >
            {/* Green glow on hover — opacity-only transition (GPU composited) */}
            <div className="absolute inset-0 rounded-full bg-[#8eff71]/15 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <img
                ref={imgRef}
                src={src}
                alt={alt}
                className="relative max-h-[580px] w-auto object-contain select-none"
                style={{ opacity: 0, transform: 'translateZ(0)' }}
                draggable={false}
                onLoad={() => setLoaded(true)}
            />
        </div>
    );
}
