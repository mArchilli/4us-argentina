import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Login({ status, canResetPassword }) {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), { onFinish: () => reset('password') });
    };

    return (
        <div className="relative min-h-screen bg-[#0e0e0e] flex flex-col overflow-hidden font-body">
            <Head title="Iniciar sesión" />

            {/* ── Grain texture ── */}
            <svg className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.03]">
                <filter id="loginGrain"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" /></filter>
                <rect width="100%" height="100%" filter="url(#loginGrain)" />
            </svg>

            {/* ── Gradient blobs ── */}
            <div className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#8eff71]/[0.04] blur-[120px]" />
            <div className="pointer-events-none absolute -bottom-60 -left-40 h-[600px] w-[600px] rounded-full bg-[#8eff71]/[0.03] blur-[150px]" />

            {/* ── Watermark ── */}
            <span className="pointer-events-none fixed right-6 top-1/2 -translate-y-1/2 font-headline text-[10rem] leading-none tracking-tighter text-white/[0.015] [writing-mode:vertical-rl] select-none hidden lg:block">
                4US
            </span>

            {/* ── Header ── */}
            <header className="fixed top-0 inset-x-0 z-40 flex items-center justify-between px-6 py-4 md:px-10 backdrop-blur-md bg-[#0e0e0e]/60 border-b border-white/[0.04]">
                <Link href="/" className="font-headline text-sm md:text-base tracking-[0.2em] text-white uppercase">
                    4us Argentina
                </Link>
                <Link
                    href="/"
                    className="flex items-center gap-1.5 text-xs text-[#adaaaa] hover:text-white transition-colors tracking-wider uppercase"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Volver
                </Link>
            </header>

            {/* ── Main ── */}
            <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pt-24 pb-16">
                {/* Tag */}
                <div className="mb-6 flex items-center gap-2 rounded-full border border-[#8eff71]/20 bg-[#8eff71]/[0.05] px-4 py-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#8eff71] animate-pulse" />
                    <span className="text-[10px] md:text-xs font-medium tracking-[0.15em] uppercase text-[#8eff71]">
                        Acceso seguro
                    </span>
                </div>

                {/* Headline */}
                <h1 className="font-headline text-4xl sm:text-5xl md:text-7xl text-white text-center leading-[0.95] tracking-tighter mb-3">
                    Inicio de<br />sesión
                </h1>
                <p className="text-sm md:text-base text-[#adaaaa] mb-10 text-center max-w-xs">
                    Ingresá a tu cuenta para continuar
                </p>

                {/* Flash status */}
                {status && (
                    <div className="mb-6 w-full max-w-sm text-sm text-[#8eff71] bg-[#8eff71]/10 border border-[#8eff71]/20 px-4 py-2.5 rounded-none">
                        {status}
                    </div>
                )}

                {/* ── Form card ── */}
                <form
                    onSubmit={submit}
                    className="w-full max-w-sm space-y-5"
                >
                    {/* Email */}
                    <div>
                        <label className="block text-[10px] font-medium tracking-[0.15em] uppercase text-[#adaaaa] mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="tu@email.com"
                            autoComplete="username"
                            autoFocus
                            className="w-full rounded-none bg-[#131313] border border-[#484847]/40 text-white placeholder:text-[#484847] px-4 py-3 text-sm focus:outline-none focus:border-[#8eff71]/60 transition-colors"
                        />
                        {errors.email && <p className="text-[#ff7351] text-xs mt-1.5">{errors.email}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-[10px] font-medium tracking-[0.15em] uppercase text-[#adaaaa] mb-2">
                            Contraseña
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="••••••••"
                                autoComplete="current-password"
                                className="w-full rounded-none bg-[#131313] border border-[#484847]/40 text-white placeholder:text-[#484847] px-4 py-3 pr-11 text-sm focus:outline-none focus:border-[#8eff71]/60 transition-colors"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((v) => !v)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#484847] hover:text-[#adaaaa] transition-colors"
                                tabIndex={-1}
                                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                        {errors.password && <p className="text-[#ff7351] text-xs mt-1.5">{errors.password}</p>}
                    </div>

                    {/* Remember + forgot */}
                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="w-3.5 h-3.5 rounded-none border-[#484847]/40 bg-[#131313] accent-[#8eff71] cursor-pointer"
                            />
                            <span className="text-xs text-[#adaaaa]">Recordarme</span>
                        </label>
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-xs text-[#adaaaa] hover:text-[#8eff71] transition-colors"
                            >
                                Olvidé mi clave
                            </Link>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="group relative w-full bg-[#8eff71] text-[#0d6100] py-3.5 rounded-none font-headline text-sm tracking-[0.1em] uppercase hover:shadow-[0_0_30px_rgba(142,255,113,0.2)] transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span className="relative z-10">{processing ? 'Ingresando...' : 'Ingresar'}</span>
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                </form>

                {/* Decorative divider */}
                <div className="mt-12 flex items-center gap-4 w-full max-w-sm">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#484847]/30 to-transparent" />
                    <span className="text-[9px] tracking-[0.3em] uppercase text-[#484847]">Curated</span>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#484847]/30 to-transparent" />
                </div>
            </main>
        </div>
    );
}
