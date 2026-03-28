import { Head, Link } from '@inertiajs/react';
import LiquidChrome from '@/Components/Home/LiquidChrome';

const messages = {
    404: {
        code: '404',
        title: 'Se voló el papel.',
        body: 'La página que buscás se desarmó en el camino. Puede que la hayan movido, eliminado, o simplemente nunca existió — como ese cigarro que jurás que te quedaba uno.',
        icon: '💨',
    },
    403: {
        code: '403',
        title: 'Zona restringida.',
        body: 'No tenés permiso para entrar acá. Como intentar fumar en la fila del banco — los códigos están claros.',
        icon: '🚫',
    },
    500: {
        code: '500',
        title: 'El servidor se prendió fuego.',
        body: 'Algo salió mal de nuestro lado. Le estamos dando una pitada al problema para calmarlo. Volvé en unos minutos.',
        icon: '🔥',
    },
    505: {
        code: '505',
        title: 'Versión no compatible.',
        body: 'La solicitud llegó con una versión HTTP que no podemos procesar. Probá actualizar el navegador o intentarlo más tarde.',
        icon: '🧯',
    },
    503: {
        code: '503',
        title: 'Estamos en pausa.',
        body: 'El sitio está en mantenimiento por un momento. Aprovechá para relajarte — nosotros nos encargamos del resto.',
        icon: '🛠️',
    },
};

export default function Error({ status }) {
    const msg = messages[status] ?? {
        code: status,
        title: 'Algo salió mal.',
        body: 'Ocurrió un error inesperado. Intentá volver al inicio.',
        icon: '🤔',
    };

    return (
        <>
            <Head title={`${msg.code} · ${msg.title}`} />

            <div className="min-h-screen bg-[#0e0e0e] text-white flex flex-col items-center justify-center px-6 font-['Space_Grotesk',sans-serif] relative overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-100 pointer-events-none">
                    <LiquidChrome
                        baseColor={[0.557, 1.0, 0.443]}
                        speed={0.12}
                        amplitude={0.38}
                        frequencyX={3}
                        frequencyY={2}
                        interactive={false}
                    />
                    <div className="absolute inset-0 bg-[#0e0e0e]/84" />
                </div>

                {/* Background glow */}
                <div className="absolute z-[1] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#8eff71]/[0.03] blur-3xl pointer-events-none" />

                {/* Smoke rings decoration */}
                <div className="absolute z-[1] top-12 right-12 opacity-10 hidden md:block">
                    {[80, 56, 36].map((size, i) => (
                        <div
                            key={i}
                            className="border border-[#8eff71] rounded-full absolute"
                            style={{
                                width: size,
                                height: size,
                                top: `${i * 24}px`,
                                left: `${i * 12}px`,
                                opacity: 1 - i * 0.25,
                            }}
                        />
                    ))}
                </div>

                <div className="relative z-10 w-full max-w-2xl">
                    <div className="rounded-[2rem] border border-white/10 bg-[#0d0d0d]/70 backdrop-blur-md px-6 py-10 md:px-10 md:py-12 shadow-[0_25px_80px_rgba(0,0,0,0.55)]">
                        <div className="text-center max-w-lg mx-auto">
                    {/* Emoji */}
                            <div className="text-6xl mb-6 select-none">{msg.icon}</div>

                    {/* Error code */}
                            <p className="text-[120px] md:text-[160px] font-black leading-none text-[#8eff71] opacity-30 select-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 pointer-events-none drop-shadow-[0_0_24px_rgba(142,255,113,0.45)] [text-shadow:0_0_2px_rgba(14,14,14,0.9),0_0_18px_rgba(142,255,113,0.45)] [-webkit-text-stroke:1px_rgba(14,14,14,0.45)]">
                                {msg.code}
                            </p>

                    {/* Title */}
                            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 relative text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.65)]">
                                {msg.title}
                            </h1>

                    {/* Body */}
                            <p className="text-[#c7c7c7] text-base leading-relaxed mb-10 relative">
                                {msg.body}
                            </p>

                    {/* Code badge */}
                            <div className="inline-flex items-center gap-2 bg-[#131313] border border-[#2a2a2a] rounded-full px-4 py-1.5 text-sm text-[#8f8f8f] mb-8 font-mono">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#ff7351]" />
                                Error {msg.code}
                            </div>

                    {/* Actions */}
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                                <Link
                                    href="/"
                                    className="bg-[#8eff71] text-[#0d6100] px-6 py-3 rounded-full font-bold text-sm hover:shadow-[0_0_24px_rgba(142,255,113,0.3)] transition-all active:scale-95"
                                >
                                    Volver al inicio
                                </Link>
                                <button
                                    onClick={() => window.history.back()}
                                    className="px-6 py-3 rounded-full border border-[#3a3a3a] text-[#d0d0d0] hover:text-white hover:border-[#8eff71]/45 text-sm font-medium transition-all bg-[#131313]/40"
                                >
                                    Página anterior
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom brand */}
                <p className="absolute bottom-8 text-xs text-[#2a2a2a] tracking-widest uppercase select-none">
                    4us Argentina
                </p>
            </div>
        </>
    );
}
