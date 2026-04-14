import { Head, Link } from '@inertiajs/react';

const messages = {
    404: {
        code: '404',
        title: 'Se voló el papel.',
        body: 'Se fumó sola. A la pagina la borraron, la movieron, o simplemente nunca existió — el resultado es el mismo: nada. Como ese medio toque que jurás que guardaste y no aparece por ningún lado.',
        tag: 'CRASH_LOG_0021',
    },
    403: {
        code: '403',
        title: 'Zona restringida.',
        body: 'No tenés permiso para entrar acá. Como intentar fumar en la fila del banco — los códigos están claros.',
        tag: 'ACCESS_DENIED',
    },
    500: {
        code: '500',
        title: 'El servidor se prendió fuego.',
        body: 'Algo salió mal de nuestro lado. Le estamos dando una pitada al problema para calmarlo. Volvé en unos minutos.',
        tag: 'SERVER_FAIL',
    },
    505: {
        code: '505',
        title: 'Versión no compatible.',
        body: 'La solicitud llegó con una versión HTTP que no podemos procesar. Probá actualizar el navegador o intentarlo más tarde.',
        tag: 'HTTP_VERSION',
    },
    503: {
        code: '503',
        title: 'Estamos en pausa.',
        body: 'El sitio está en mantenimiento por un momento. Aprovechá para relajarte — nosotros nos encargamos del resto.',
        tag: 'MAINTENANCE',
    },
};

export default function Error({ status }) {
    const msg = messages[status] ?? {
        code: String(status),
        title: 'Algo salió mal.',
        body: 'Ocurrió un error inesperado. Intentá volver al inicio.',
        tag: 'UNKNOWN_ERR',
    };

    const isRetryable = [500, 503, 505].includes(status);

    return (
        <>
            <Head title={`${msg.code} · ${msg.title} | Tabaquería Premium & Growshop — Accesorios Importados de India`} />

            <div className="bg-[#0e0e0e] text-white font-body selection:bg-[#8eff71] selection:text-[#0d6100] overflow-hidden h-screen w-screen flex items-center justify-center">

                {/* Grainy texture overlay */}
                <div
                    className="fixed inset-0 pointer-events-none opacity-5 z-0"
                    style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }}
                />

                {/* Vertical watermarks */}
                <div className="fixed left-2 md:left-8 top-1/2 -translate-y-1/2 opacity-5 select-none pointer-events-none z-0">
                    <span className="font-headline text-6xl md:text-8xl font-black italic tracking-widest uppercase" style={{ writingMode: 'vertical-rl' }}>
                        SYSTEM CRITICAL
                    </span>
                </div>
                <div className="fixed right-2 md:right-8 top-1/2 -translate-y-1/2 opacity-5 select-none pointer-events-none z-0">
                    <span className="font-headline text-6xl md:text-8xl font-black italic tracking-widest uppercase rotate-180" style={{ writingMode: 'vertical-rl' }}>
                        SYSTEM CRITICAL
                    </span>
                </div>

                {/* Liquid gradient blobs */}
                <div className="fixed top-1/4 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#8eff71]/10 blur-[100px] md:blur-[150px] rounded-full z-0 opacity-40" />
                <div className="fixed bottom-1/4 right-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-[#73b11d]/10 blur-[80px] md:blur-[120px] rounded-full z-0 opacity-30" />

                {/* Top / bottom light lines */}
                <div className="fixed top-0 left-0 w-full h-px bg-gradient-to-r from-[#8eff71]/0 via-[#8eff71] to-[#8eff71]/0 opacity-20" />
                <div className="fixed bottom-0 left-0 w-full h-px bg-gradient-to-r from-[#8eff71]/0 via-[#8eff71] to-[#8eff71]/0 opacity-20" />

                {/* Main content */}
                <main className="relative z-10 w-full max-w-md md:max-w-7xl px-6 md:px-8 flex flex-col items-center text-center">

                    {/* Massive error code */}
                    <div className="relative">
                        <h1
                            className="font-headline text-[10rem] md:text-[18rem] lg:text-[24rem] font-black italic tracking-tighter leading-none text-[#8eff71] select-none"
                            style={{ textShadow: '0 0 30px rgba(142, 255, 113, 0.4)' }}
                        >
                            {msg.code}
                        </h1>
                        {/* Floating tag */}
                        <div className="absolute -top-2 -right-4 md:-top-4 md:-right-12 bg-[#8eff71] text-[#0d6100] px-2 md:px-3 py-0.5 md:py-1 font-headline font-bold text-[10px] md:text-sm italic tracking-tight rounded-sm rotate-12">
                            {msg.tag}
                        </div>
                    </div>

                    {/* Messaging block */}
                    <div className="max-w-2xl md:max-w-3xl mt-[-1rem] md:mt-[-2rem] space-y-4 md:space-y-6">
                        <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-black italic uppercase tracking-tighter leading-tight">
                            {msg.title}
                        </h2>
                        <p className="text-base md:text-xl text-[#adaaaa] font-medium tracking-wide max-w-[280px] md:max-w-none mx-auto">
                            {msg.body}
                        </p>

                        <div className="pt-8 md:pt-10 flex flex-col items-center gap-6 md:gap-8">
                            {/* Action buttons */}
                            <div className="flex flex-col sm:flex-row items-center gap-3">
                                {isRetryable ? (
                                    <button
                                        onClick={() => window.location.reload()}
                                        className="group relative px-10 md:px-12 py-4 md:py-5 bg-[#8eff71] text-[#0d6100] font-headline font-black italic text-lg md:text-xl uppercase tracking-tighter rounded-full hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_40px_rgba(142,255,113,0.2)]"
                                    >
                                        REINTENTAR
                                        <span className="absolute inset-0 rounded-full border-2 border-[#8eff71] scale-100 group-hover:scale-110 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                                    </button>
                                ) : (
                                    <Link
                                        href="/"
                                        className="group relative inline-flex items-center gap-3 px-10 md:px-12 py-4 md:py-5 bg-[#8eff71] text-[#0d6100] font-headline font-black italic text-lg md:text-xl uppercase tracking-tighter rounded-full hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_40px_rgba(142,255,113,0.2)]"
                                    >
                                        VOLVER AL INICIO
                                        <span className="material-symbols-outlined font-bold group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                        <span className="absolute inset-0 rounded-full border-2 border-[#8eff71] scale-100 group-hover:scale-110 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                                    </Link>
                                )}

                                {isRetryable && (
                                    <Link
                                        href="/"
                                        className="px-6 py-3 rounded-full border border-[#484847] text-[#adaaaa] hover:text-white hover:border-[#8eff71]/45 text-sm font-medium transition-all bg-[#131313]/40"
                                    >
                                        Volver al inicio
                                    </Link>
                                )}
                            </div>

                            {/* Status decor */}
                            <div className="flex items-center gap-3 md:gap-4 py-3 md:py-4 px-5 md:px-6 rounded-xl bg-[#131313] border border-[#484847]/20">
                                <div className="flex gap-1.5">
                                    <div className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-[#8eff71] animate-pulse" />
                                    <div className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-[#8eff71]/40 animate-pulse" style={{ animationDelay: '75ms' }} />
                                    <div className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-[#8eff71]/20 animate-pulse" style={{ animationDelay: '150ms' }} />
                                </div>
                                <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-[#adaaaa]">
                                    SOPORTE TÉCNICO NOTIFICADO
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Editorial footnote */}
                    <div className="mt-16 md:mt-24 opacity-30 flex flex-wrap justify-center items-center gap-4 md:gap-8 font-headline font-black italic text-[10px] md:text-sm uppercase tracking-widest text-[#adaaaa]">
                        <span>4US ARGENTINA</span>
                        <span className="hidden sm:inline w-6 md:w-8 h-px bg-[#adaaaa]" />
                        <span>BUENOS AIRES</span>
                        <span className="hidden sm:inline w-6 md:w-8 h-px bg-[#adaaaa]" />
                        <span>{new Date().getFullYear()}</span>
                    </div>
                </main>
            </div>
        </>
    );
}
