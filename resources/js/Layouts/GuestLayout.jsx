import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-[#0e0e0e] flex flex-col items-center justify-center px-4 font-['Space_Grotesk',sans-serif]">
            {/* Logo */}
            <Link href="/" className="mb-8 text-2xl font-black text-[#8eff71] tracking-tighter">
                4us Argentina
            </Link>

            {/* Card */}
            <div className="w-full max-w-sm bg-[#131313] border border-[#2a2a2a] rounded-2xl p-8">
                {children}
            </div>

            {/* Back to site */}
            <Link
                href="/"
                className="mt-6 text-sm text-[#adaaaa] hover:text-white transition-colors flex items-center gap-1.5"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Volver al sitio
            </Link>
        </div>
    );
}
