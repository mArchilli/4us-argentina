import { useState, useEffect } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';

const STORAGE_KEY = 'age_verified';

const bgGlow = {
    background: 'radial-gradient(circle at center, rgba(142,255,113,0.05) 0%, rgba(14,14,14,1) 70%)',
};

const textGlow = {
    textShadow: '0 0 20px rgba(142,255,113,0.3)',
};

const glassCard = {
    background: 'rgba(25,26,26,0.7)',
    backdropFilter: 'blur(20px)',
};

export default function AgeGate({ children }) {
    const [status, setStatus] = useState(() => {
        try {
            return localStorage.getItem(STORAGE_KEY);
        } catch {
            return null;
        }
    });

    const handleAccept = () => {
        localStorage.setItem(STORAGE_KEY, 'yes');
        setStatus('yes');
    };

    const handleReject = () => {
        localStorage.setItem(STORAGE_KEY, 'no');
        setStatus('no');
    };

    const handleRetry = () => {
        localStorage.removeItem(STORAGE_KEY);
        setStatus(null);
    };

    useEffect(() => {
        if (status !== 'yes') {
            document.body.style.overflow = 'hidden';
        }
        return () => { document.body.style.overflow = ''; };
    }, [status]);

    if (status === 'yes') {
        return children;
    }

    if (status === 'no') {
        return (
            <div className="fixed inset-0 z-[9999] h-screen overflow-hidden bg-[#0e0e0e] font-['Space_Grotesk',sans-serif] text-white flex items-center justify-center p-6">
                <div className="fixed inset-0 pointer-events-none" style={bgGlow} />

                <div className="relative z-10 w-full max-w-md flex flex-col items-center text-center" style={glassCard}>
                    <div className="w-full rounded-[2rem] p-10 flex flex-col items-center text-center shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
                        <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-400/30 flex items-center justify-center mb-8">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                            </svg>
                        </div>

                        <h1 className="text-4xl font-black italic tracking-tighter text-[#8eff71] leading-none uppercase mb-6" style={textGlow}>
                            4US ARGENTINA.
                        </h1>

                        <h2 className="text-2xl font-bold tracking-tight mb-3">Acceso restringido</h2>
                        <p className="text-[#adaaaa] text-sm mb-10 leading-relaxed">
                            Debés ser mayor de 18 años para acceder a nuestra tienda de tabaquería premium y growshop. La ley es la ley.
                        </p>

                        <PrimaryButton onClick={handleRetry} className="w-full justify-center">
                            Verificar nuevamente.
                        </PrimaryButton>

                        <div className="mt-8 pt-8 border-t border-[#484848]/20 w-full">
                            <p className="text-[10px] uppercase tracking-widest text-zinc-600 font-medium">
                                Consumo responsable.
                            </p>
                        </div>
                    </div>
                </div>

                <footer className="fixed bottom-0 w-full py-6 flex items-center justify-center pointer-events-none">
                    <p className="text-[10px] tracking-widest uppercase text-zinc-700">
                        © {new Date().getFullYear()} 4us Argentina.
                    </p>
                </footer>
            </div>
        );
    }

    // Prompt (status === null)
    return (
        <div className="fixed inset-0 z-[9999] min-h-screen overflow-y-auto bg-[#0e0e0e] font-['Space_Grotesk',sans-serif] text-white flex items-start md:items-center justify-center p-6">
            <div className="fixed inset-0 pointer-events-none" style={bgGlow} />

            <main className="relative z-10 w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-10 md:py-0">
                {/* Left: Branding */}
                <div className="flex flex-col gap-4 text-center md:text-left order-1">
                    <h1
                        className="text-[clamp(1.8rem,10vw,10rem)] font-black italic tracking-tighter text-[#8eff71] leading-none uppercase"
                        style={textGlow}
                    >
                        4US ARGENTINA.
                    </h1>
                    <p className="text-[#adaaaa] max-w-md text-sm md:text-base leading-relaxed tracking-wide">
                        Tabaquería premium &amp; growshop con productos importados directamente de India.
                        Bandeas metalicas para armado, picadores metalicos, accesorios y cultura del humo para quienes aprecian la diferencia.
                    </p>
                </div>

                {/* Right: Glass Card */}
                <div className="flex justify-center md:justify-end order-2">
                    <div
                        className="w-full max-w-md rounded-[2rem] p-10 flex flex-col items-center text-center shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
                        style={glassCard}
                    >
                        <div className="w-16 h-16 rounded-full bg-[#8eff71]/10 border border-[#8eff71]/20 flex items-center justify-center mb-8">
                            <span className="material-symbols-outlined text-[#8eff71] text-3xl">verified_user</span>
                        </div>

                        <h2 className="text-3xl font-bold tracking-tight mb-4">Verificación de edad</h2>
                        <p className="text-[#adaaaa] text-sm mb-10 leading-relaxed">
                            Al ingresar confirmás tener 18 años o más y acceder a nuestra selección de productos de tabaquería premium y growshop importados de India.
                        </p>

                        <div className="flex flex-col w-full gap-4">
                            <PrimaryButton onClick={handleAccept} className="w-full justify-center">
                                Sí, soy mayor de 18.
                            </PrimaryButton>
                            <button
                                onClick={handleReject}
                                className="w-full inline-flex items-center justify-center rounded-full border-2 border-[#484848] bg-transparent px-8 py-5 text-lg font-black italic uppercase tracking-tight text-[#adaaaa] transition-all duration-300 hover:border-[#8eff71]/40 hover:text-white active:scale-95"
                            >
                                No.
                            </button>
                        </div>

                        <div className="mt-8 pt-8 border-t border-[#484848]/20 w-full">
                            <p className="text-[10px] uppercase tracking-widest text-zinc-600 font-medium">
                                Consumo responsable.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="fixed bottom-0 w-full py-6 flex items-center justify-center pointer-events-none">
                <p className="text-[10px] tracking-widest uppercase text-zinc-700">
                    © {new Date().getFullYear()} 4us Argentina.
                </p>
            </footer>
        </div>
    );
}
