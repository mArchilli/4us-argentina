import { useState, useEffect, useCallback } from 'react';
import { Link, router } from '@inertiajs/react';

export default function FloatingButtons() {
    const [cartCount, setCartCount] = useState(0);

    const fetchCartCount = useCallback(() => {
        fetch('/carrito/count')
            .then((res) => res.json())
            .then((data) => setCartCount(data.count ?? 0))
            .catch(() => {});
    }, []);

    useEffect(() => {
        fetchCartCount();

        const removeListener = router.on('navigate', () => {
            fetchCartCount();
        });

        return () => removeListener();
    }, [fetchCartCount]);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
            {/* Cart Button */}
            <Link
                href="/carrito"
                className="relative w-14 h-14 md:w-[4.2rem] md:h-[4.2rem] rounded-[1.1rem] bg-[#131313] border border-[#2a2a2a] flex items-center justify-center text-white hover:border-[#8eff71]/40 hover:shadow-[0_0_20px_rgba(142,255,113,0.1)] transition-all duration-300 group"
                aria-label="Carrito"
            >
                <span className="material-symbols-outlined text-[22px] md:text-[26px] text-[#8eff71] group-hover:text-[#8eff71] transition-colors duration-300">
                    shopping_cart
                </span>

                {cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 md:min-w-[22px] md:h-[22px] px-1 flex items-center justify-center rounded-full bg-[#c9a84c] text-white text-[11px] md:text-xs font-bold leading-none shadow-[0_2px_8px_rgba(201,168,76,0.4)]">
                        {cartCount > 99 ? '99+' : cartCount}
                    </span>
                )}
            </Link>

            {/* WhatsApp Button */}
            <a
                href="https://wa.me/5491169659907"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 md:w-[4.2rem] md:h-[4.2rem] rounded-full bg-[#8eff71] flex items-center justify-center hover:bg-[#7ae065] hover:shadow-[0_0_24px_rgba(142,255,113,0.35)] transition-all duration-300 group"
                aria-label="WhatsApp"
            >
                <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6 md:w-7 md:h-7 fill-[#0e0e0e] transition-colors duration-300"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
            </a>
        </div>
    );
}
