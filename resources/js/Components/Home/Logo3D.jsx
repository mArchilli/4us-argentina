import { useRef, useEffect, useCallback } from 'react';

export default function Logo3D({ src, alt, className = '' }) {
    const containerRef = useRef(null);
    const imgRef = useRef(null);
    const glowRef = useRef(null);
    const rafRef = useRef(null);
    const autoRotateRef = useRef(null);
    const isHoveringRef = useRef(false);
    const currentRef = useRef({ rotateX: 0, rotateY: 0, scale: 1 });
    const targetRef = useRef({ rotateX: 0, rotateY: 0, scale: 1 });

    const lerp = (start, end, factor) => start + (end - start) * factor;

    const updateTransform = useCallback(() => {
        const current = currentRef.current;
        const target = targetRef.current;
        const smoothing = isHoveringRef.current ? 0.08 : 0.04;

        current.rotateX = lerp(current.rotateX, target.rotateX, smoothing);
        current.rotateY = lerp(current.rotateY, target.rotateY, smoothing);
        current.scale = lerp(current.scale, target.scale, smoothing);

        const img = imgRef.current;
        const glow = glowRef.current;
        if (!img) return;

        const { rotateX, rotateY, scale } = current;

        img.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;

        // Dynamic shadow based on rotation
        const shadowX = -rotateY * 1.5;
        const shadowY = rotateX * 1.5;
        const shadowBlur = 40 + Math.abs(rotateY) * 2;
        img.style.filter = `drop-shadow(${shadowX}px ${shadowY}px ${shadowBlur}px rgba(142, 255, 113, 0.08))`;

        // Glow follows tilt
        if (glow) {
            const glowX = 50 + rotateY * 2;
            const glowY = 50 - rotateX * 2;
            const glowIntensity = isHoveringRef.current ? 0.06 : 0.03;
            glow.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(142, 255, 113, ${glowIntensity}) 0%, transparent 60%)`;
        }

        rafRef.current = requestAnimationFrame(updateTransform);
    }, []);

    // Auto-rotate animation
    useEffect(() => {
        let startTime = Date.now();

        const autoRotate = () => {
            if (!isHoveringRef.current) {
                const elapsed = (Date.now() - startTime) / 1000;
                // Gentle floating oscillation on Y axis + subtle X breathing
                targetRef.current.rotateY = Math.sin(elapsed * 0.4) * 12;
                targetRef.current.rotateX = Math.sin(elapsed * 0.25) * 3;
                targetRef.current.scale = 1 + Math.sin(elapsed * 0.3) * 0.015;
            }
            autoRotateRef.current = requestAnimationFrame(autoRotate);
        };

        autoRotate();
        return () => {
            if (autoRotateRef.current) cancelAnimationFrame(autoRotateRef.current);
        };
    }, []);

    // Render loop
    useEffect(() => {
        rafRef.current = requestAnimationFrame(updateTransform);
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [updateTransform]);

    // Mouse interaction
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // Normalized -1 to 1
            const normalX = (e.clientX - centerX) / (rect.width / 2);
            const normalY = (e.clientY - centerY) / (rect.height / 2);

            // Clamp
            const clampedX = Math.max(-1, Math.min(1, normalX));
            const clampedY = Math.max(-1, Math.min(1, normalY));

            targetRef.current.rotateY = clampedX * 20;
            targetRef.current.rotateX = -clampedY * 12;
            targetRef.current.scale = 1.06;
        };

        const handleMouseEnter = () => {
            isHoveringRef.current = true;
        };

        const handleMouseLeave = () => {
            isHoveringRef.current = false;
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
            style={{ perspective: '800px' }}
        >
            {/* Ambient glow behind logo */}
            <div
                ref={glowRef}
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(142, 255, 113, 0.03) 0%, transparent 60%)',
                    filter: 'blur(30px)',
                }}
            />

            {/* Logo */}
            <img
                ref={imgRef}
                src={src}
                alt={alt}
                className="max-h-[580px] w-auto object-contain select-none"
                style={{
                    transformStyle: 'preserve-3d',
                    willChange: 'transform, filter',
                    transition: 'none',
                }}
                draggable={false}
            />
        </div>
    );
}
