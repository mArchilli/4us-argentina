import { useRef, useEffect, useCallback, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Logo3D({ src, alt, className = '' }) {
    const containerRef = useRef(null);
    const imgRef = useRef(null);
    const rafRef = useRef(null);
    const autoRotateRef = useRef(null);
    const isHoveringRef = useRef(false);
    const isReturningRef = useRef(false);
    const leaveTweenRef = useRef(null);
    const entranceTlRef = useRef(null);
    const entranceDoneRef = useRef(false);
    const scrollTriggeredRef = useRef(false);
    // currentRef drives the actual rendering — GSAP tweens this during entrance, lerp drives it after
    const currentRef = useRef({ rotateX: 15, rotateY: -90, scale: 0.4, translateY: 0, opacity: 0, blur: 12 });
    const targetRef = useRef({ rotateX: 0, rotateY: 0, scale: 1, translateY: 0 });
    const [loaded, setLoaded] = useState(false);

    const lerp = (start, end, factor) => start + (end - start) * factor;

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

    // --- Single render loop — always active ---
    const updateTransform = useCallback(() => {
        const current = currentRef.current;
        const target = targetRef.current;
        const img = imgRef.current;

        // After entrance completes, lerp current toward target (idle/mouse)
        if (entranceDoneRef.current) {
            const smoothing = isHoveringRef.current ? 0.07 : 0.03;
            current.rotateX = lerp(current.rotateX, target.rotateX, smoothing);
            current.rotateY = lerp(current.rotateY, target.rotateY, smoothing);
            current.scale = lerp(current.scale, target.scale, smoothing);
            current.translateY = lerp(current.translateY, target.translateY, smoothing);
        }

        if (img) {
            const { rotateX, rotateY, scale, translateY, opacity, blur } = current;
            img.style.opacity = opacity;
            img.style.transform = `perspective(1000px) translateY(${translateY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;

            if (blur > 0.1) {
                img.style.filter = `blur(${blur}px)`;
            } else {
                // Sombra más pronunciada cuando no hay hover
                const levitating = !isHoveringRef.current && !isReturningRef.current && entranceDoneRef.current;
                const shadowStrength = levitating ? 0.55 : 0.35;
                const shadowY = levitating ? rotateX * 2.2 + 22 : rotateX * 1.2 + 8;
                const sx = -rotateY * 1.2;
                img.style.filter = `drop-shadow(${sx}px ${shadowY}px 38px rgba(0,0,0,${shadowStrength})) drop-shadow(${sx * 0.3}px ${shadowY * 0.3}px 70px rgba(0,0,0,0.18))`;
            }
        }

        rafRef.current = requestAnimationFrame(updateTransform);
    }, []);

    // --- Organic idle floating ---
    useEffect(() => {
        let startTime = Date.now();

        const autoRotate = () => {
            if (!isHoveringRef.current && !isReturningRef.current && entranceDoneRef.current) {
                const t = (Date.now() - startTime) / 1000;
                // Más amplitud y tilt para levitación más notoria
                targetRef.current.rotateY = Math.sin(t * 0.32) * 13 + Math.sin(t * 0.71 + 1.3) * 5;
                targetRef.current.rotateX = Math.sin(t * 0.23) * 5 + Math.cos(t * 0.51 + 0.7) * 2.5;
                targetRef.current.translateY = Math.sin(t * 0.28) * 18 + Math.sin(t * 0.59 + 2.0) * 7;
                // Pulso de escala sutil
                targetRef.current.scale = 1 + Math.sin(t * 0.25) * 0.018 + Math.sin(t * 0.51) * 0.008;
            }
            autoRotateRef.current = requestAnimationFrame(autoRotate);
        };

        autoRotate();
        return () => {
            if (autoRotateRef.current) cancelAnimationFrame(autoRotateRef.current);
        };
    }, []);

    // Start render loop
    useEffect(() => {
        rafRef.current = requestAnimationFrame(updateTransform);
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [updateTransform]);

    // --- Mouse interaction ---
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (e) => {
            if (!entranceDoneRef.current) return;
            const rect = container.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const normalX = Math.max(-1, Math.min(1, (e.clientX - centerX) / (rect.width / 2)));
            const normalY = Math.max(-1, Math.min(1, (e.clientY - centerY) / (rect.height / 2)));

            targetRef.current.rotateY = normalX * 22;
            targetRef.current.rotateX = -normalY * 14;
            targetRef.current.translateY = normalY * -4;
            targetRef.current.scale = 1.05;
        };

        const handleMouseEnter = () => {
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

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseenter', handleMouseEnter);
        container.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseenter', handleMouseEnter);
            container.removeEventListener('mouseleave', handleMouseLeave);
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
