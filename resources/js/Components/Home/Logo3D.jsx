import { useRef, useEffect, useCallback, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// drop-shadow es la operación más costosa — recalcular cada N frames
const SHADOW_THROTTLE = 2;

export default function Logo3D({ src, alt, className = '' }) {
    const containerRef = useRef(null);
    const imgRef = useRef(null);
    const rafRef = useRef(null);
    const isHoveringRef = useRef(false);
    const isReturningRef = useRef(false);
    const leaveTweenRef = useRef(null);
    const entranceTlRef = useRef(null);
    const entranceDoneRef = useRef(false);
    const scrollTriggeredRef = useRef(false);
    const isVisibleRef = useRef(true);
    // Cache para evitar getBoundingClientRect en cada mousemove (forced layout)
    const cachedRectRef = useRef(null);
    // Throttle de frames para sombra + cache de último filter aplicado
    const frameCountRef = useRef(0);
    const lastFilterRef = useRef('');
    // currentRef drives the actual rendering — GSAP tweens this during entrance, lerp drives it after
    const currentRef = useRef({ rotateX: 15, rotateY: -90, scale: 0.4, translateY: 0, opacity: 0, blur: 12 });
    const targetRef = useRef({ rotateX: 0, rotateY: 0, scale: 1, translateY: 0 });
    const [loaded, setLoaded] = useState(false);

    // --- Cinematic entrance on scroll into view ---
    useEffect(() => {
        if (!loaded || scrollTriggeredRef.current) return;
        const container = containerRef.current;
        if (!container) return;

        const trigger = ScrollTrigger.create({
            trigger: container,
            start: 'top 85%',
            once: true,
            onEnter: () => {
                scrollTriggeredRef.current = true;

                // Tween currentRef values directly — rAF renders them
                const tl = gsap.timeline({
                    onComplete: () => {
                        entranceDoneRef.current = true;
                        entranceTlRef.current = null;
                    },
                });
                entranceTlRef.current = tl;

                // Phase 1: Spin-in with deceleration
                tl.to(currentRef.current, {
                    opacity: 1,
                    scale: 1.08,
                    rotateY: 8,
                    rotateX: -3,
                    blur: 0,
                    translateY: 0,
                    duration: 1.1,
                    ease: 'expo.out',
                });

                // Phase 2: Elastic settle
                tl.to(currentRef.current, {
                    scale: 1,
                    rotateY: 0,
                    rotateX: 0,
                    duration: 0.8,
                    ease: 'back.out(2.5)',
                });
            },
        });

        return () => {
            trigger.kill();
            if (entranceTlRef.current) entranceTlRef.current.kill();
        };
    }, [loaded]);

    // --- Pausa off-screen: cero CPU cuando el elemento no es visible ---
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                const wasVisible = isVisibleRef.current;
                isVisibleRef.current = entry.isIntersecting;
                // Re-arrancar el loop si vuelve a ser visible
                if (!wasVisible && entry.isIntersecting && !rafRef.current) {
                    rafRef.current = requestAnimationFrame(tick);
                }
            },
            { threshold: 0 },
        );
        observer.observe(container);
        return () => observer.disconnect();
    }, []);

    // --- Loop unificado: idle + lerp + render en un solo rAF callback ---
    const tick = useCallback((timestamp) => {
        // Pausa completa cuando está fuera del viewport
        if (!isVisibleRef.current) {
            rafRef.current = null;
            return;
        }

        const current = currentRef.current;
        const target = targetRef.current;
        const img = imgRef.current;

        // Organic idle floating (antes era un rAF separado)
        if (!isHoveringRef.current && !isReturningRef.current && entranceDoneRef.current) {
            const t = timestamp * 0.001; // ms → s sin Date.now()
            // Más amplitud y tilt para levitación más notoria
            target.rotateY    = Math.sin(t * 0.32) * 13 + Math.sin(t * 0.71 + 1.3) * 5;
            target.rotateX    = Math.sin(t * 0.23) * 5  + Math.cos(t * 0.51 + 0.7) * 2.5;
            target.translateY = Math.sin(t * 0.28) * 18  + Math.sin(t * 0.59 + 2.0) * 7;
            // Pulso de escala sutil
            target.scale      = 1 + Math.sin(t * 0.25) * 0.018 + Math.sin(t * 0.51) * 0.008;
        }

        // Lerp current → target después de la entrance
        if (entranceDoneRef.current) {
            const f = isHoveringRef.current ? 0.07 : 0.03;
            current.rotateX    += (target.rotateX - current.rotateX) * f;
            current.rotateY    += (target.rotateY - current.rotateY) * f;
            current.scale      += (target.scale - current.scale) * f;
            current.translateY += (target.translateY - current.translateY) * f;
        }

        // --- DOM write (batched en un solo frame) ---
        if (img) {
            const { rotateX, rotateY, scale, translateY, opacity, blur } = current;

            // Opacity: solo escribir durante entrance (evita writes redundantes post-entrance)
            if (opacity < 1) {
                img.style.opacity = opacity;
            }

            // Transform: siempre necesario
            img.style.transform = `perspective(1000px) translateY(${translateY.toFixed(2)}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(${scale.toFixed(4)})`;

            // Filter: throttle del cálculo de drop-shadow (operación GPU más costosa)
            if (blur > 0.1) {
                const f = `blur(${blur.toFixed(1)}px)`;
                img.style.filter = f;
                lastFilterRef.current = '';
            } else {
                frameCountRef.current++;
                if (frameCountRef.current % SHADOW_THROTTLE === 0 || lastFilterRef.current === '') {
                    // Sombra más pronunciada cuando no hay hover
                    const levitating = !isHoveringRef.current && !isReturningRef.current && entranceDoneRef.current;
                    const shadowStrength = levitating ? 0.55 : 0.35;
                    const shadowY = levitating ? rotateX * 2.2 + 22 : rotateX * 1.2 + 8;
                    const sx = -rotateY * 1.2;
                    const filter = `drop-shadow(${sx.toFixed(1)}px ${shadowY.toFixed(1)}px 38px rgba(0,0,0,${shadowStrength})) drop-shadow(${(sx * 0.3).toFixed(1)}px ${(shadowY * 0.3).toFixed(1)}px 70px rgba(0,0,0,0.18))`;
                    // Solo escribe al DOM si el string cambió
                    if (filter !== lastFilterRef.current) {
                        img.style.filter = filter;
                        lastFilterRef.current = filter;
                    }
                }
            }
        }

        rafRef.current = requestAnimationFrame(tick);
    }, []);

    // Arrancar render loop
    useEffect(() => {
        rafRef.current = requestAnimationFrame(tick);
        return () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
                rafRef.current = null;
            }
        };
    }, [tick]);

    // --- Mouse interaction ---
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Refrescar rect cacheado (evita forced layout en mousemove)
        const refreshRect = () => {
            cachedRectRef.current = container.getBoundingClientRect();
        };

        const handleMouseMove = (e) => {
            if (!entranceDoneRef.current) return;
            const rect = cachedRectRef.current;
            if (!rect) return;

            const halfW = rect.width * 0.5;
            const halfH = rect.height * 0.5;
            const normalX = Math.max(-1, Math.min(1, (e.clientX - rect.left - halfW) / halfW));
            const normalY = Math.max(-1, Math.min(1, (e.clientY - rect.top - halfH) / halfH));

            targetRef.current.rotateY = normalX * 22;
            targetRef.current.rotateX = -normalY * 14;
            targetRef.current.translateY = normalY * -4;
            targetRef.current.scale = 1.05;
        };

        const handleMouseEnter = () => {
            // Refrescar rect al iniciar hover (cubre resize/scroll previos)
            refreshRect();
            // Kill any ongoing leave tween
            if (leaveTweenRef.current) {
                leaveTweenRef.current.kill();
                leaveTweenRef.current = null;
            }
            // If entrance is still running, interrupt it smoothly
            if (entranceTlRef.current && !entranceDoneRef.current) {
                entranceTlRef.current.kill();
                entranceTlRef.current = null;
                // Snap opacity/blur to final so the logo is visible
                currentRef.current.opacity = 1;
                currentRef.current.blur = 0;
                // 3D values stay wherever they are — lerp will blend them smoothly
                entranceDoneRef.current = true;
            }
            isReturningRef.current = false;
            isHoveringRef.current = true;
        };

        const handleMouseLeave = () => {
            if (!entranceDoneRef.current) return;
            isHoveringRef.current = false;
            isReturningRef.current = true;

            leaveTweenRef.current = gsap.to(targetRef.current, {
                rotateY: 0,
                rotateX: 0,
                translateY: 0,
                scale: 1,
                duration: 1.2,
                ease: 'elastic.out(1, 0.4)',
                onComplete: () => {
                    isReturningRef.current = false;
                    leaveTweenRef.current = null;
                },
            });
        };

        // Passive en mousemove para no bloquear compositing del browser
        container.addEventListener('mousemove', handleMouseMove, { passive: true });
        container.addEventListener('mouseenter', handleMouseEnter);
        container.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('resize', refreshRect, { passive: true });

        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseenter', handleMouseEnter);
            container.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('resize', refreshRect);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className={`relative flex items-center justify-center ${className}`}
            style={{ perspective: '1000px' }}
        >
            <img
                ref={imgRef}
                src={src}
                alt={alt}
                className="max-h-[580px] w-auto object-contain select-none"
                style={{
                    transformStyle: 'preserve-3d',
                    willChange: 'transform, filter',
                    opacity: 0,
                }}
                draggable={false}
                onLoad={() => setLoaded(true)}
            />
        </div>
    );
}
