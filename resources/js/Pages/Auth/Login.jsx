import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';

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
        <div className="relative min-h-screen bg-[#1c1c1c] font-body text-white overflow-hidden">
            <Head title="Iniciar sesión" />

            {/*  Background blobs  */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#8eff71]/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#8eff71]/5 rounded-full blur-[150px]" />
                <div
                    className="absolute inset-0"
                    style={{ background: 'radial-gradient(circle at 50% 50%, rgba(142,255,113,0.05) 0%, rgba(28,28,28,0) 70%)' }}
                />
            </div>

            {/*  Header  */}
            <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-8 py-6">
                <span className="text-xl font-bold italic tracking-tighter text-[#8eff71] uppercase">4US Argentina</span>
                <Link
                    href="/"
                    className="text-[#adaaaa] hover:text-[#8eff71] transition-colors text-xs tracking-widest uppercase flex items-center gap-1.5"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Volver
                </Link>
            </header>

            {/*  Main  */}
            <main className="relative z-10 min-h-screen flex flex-col items-center justify-center py-24 px-6">
                <div className="w-full max-w-md flex flex-col items-center">

                    {/* Logo */}
                    <div className="mb-14 relative">
                        <div className="absolute inset-0 bg-[#8eff71]/20 blur-3xl rounded-full scale-150 pointer-events-none" />
                        <img
                            src="/images/logo-4us-nuevo.png"
                            alt="4US Argentina"
                            className="relative h-24 w-auto object-contain"
                        />
                    </div>

                    {/* Headline */}
                    <div className="text-center mb-14">
                        <h1 className="text-[#8eff71] font-bold text-4xl tracking-tighter uppercase mb-3">
                            Bienvenido al Culto
                        </h1>
                        <p className="text-[#adaaaa] text-sm tracking-[0.3em] uppercase opacity-70">
                            Ingreso Exclusivo Miembros
                        </p>
                    </div>

                    {/* Flash status */}
                    {status && (
                        <div className="mb-6 w-full text-sm text-[#8eff71] bg-[#8eff71]/10 border border-[#8eff71]/20 px-4 py-2.5 rounded-xl">
                            {status}
                        </div>
                    )}

                    {/*  Form  */}
                    <form onSubmit={submit} className="w-full space-y-10">
                        <div className="space-y-4">

                            {/* Email */}
                            <div className="space-y-3">
                                <label htmlFor="email" className="block text-[10px] uppercase tracking-[0.2em] text-[#adaaaa] ml-4">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="tu@vibe.com"
                                    autoComplete="username"
                                    autoFocus
                                    className="w-full bg-[#262626]/40 backdrop-blur-md border border-[#484848]/20 text-white rounded-2xl px-6 py-5 focus:ring-2 focus:ring-[#8eff71]/40 focus:bg-[#1f2020]/60 transition-all placeholder:text-[#484848]/60 outline-none text-sm"
                                />
                                {errors.email && <p className="text-[#ff7351] text-xs mt-1 ml-4">{errors.email}</p>}
                            </div>

                            {/* Password */}
                            <div className="space-y-3">
                                <label htmlFor="password" className="block text-[10px] uppercase tracking-[0.2em] text-[#adaaaa] ml-4">
                                    Security Code
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder=""
                                        autoComplete="current-password"
                                        className="w-full bg-[#262626]/40 backdrop-blur-md border border-[#484848]/20 text-white rounded-2xl px-6 py-5 pr-14 focus:ring-2 focus:ring-[#8eff71]/40 focus:bg-[#1f2020]/60 transition-all placeholder:text-[#484848]/60 outline-none text-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((v) => !v)}
                                        className="absolute right-5 top-1/2 -translate-y-1/2 text-[#adaaaa] hover:text-[#8eff71] transition-colors"
                                        tabIndex={-1}
                                        aria-label="toggle password"
                                    >
                                        <span className="material-symbols-outlined text-lg">
                                            {showPassword ? 'visibility_off' : 'visibility'}
                                        </span>
                                    </button>
                                </div>
                                {errors.password && <p className="text-[#ff7351] text-xs mt-1 ml-4">{errors.password}</p>}
                            </div>

                            {/* Remember + forgot */}
                            <div className="flex items-center justify-between px-1">
                                <label className="flex items-center gap-2 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="w-3.5 h-3.5 rounded border-[#484848]/40 bg-[#131313] accent-[#8eff71] cursor-pointer"
                                    />
                                    <span className="text-xs text-[#adaaaa]">Recordarme</span>
                                </label>
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-xs text-[#adaaaa] hover:text-[#8eff71] transition-colors tracking-wide"
                                    >
                                        Olvidaste tu contrasena?
                                    </Link>
                                )}
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="pt-2">
                            <PrimaryButton
                                type="submit"
                                disabled={processing}
                                className="w-full"
                            >
                                {processing ? 'Ingresando...' : 'Iniciar Sesion'}
                                {!processing && (
                                    <span className="material-symbols-outlined text-base">
                                        arrow_forward
                                    </span>
                                )}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </main>

            {/*  Footer  */}
            <footer className="fixed bottom-10 left-0 w-full text-center z-20 pointer-events-none">
                <p className="text-[10px] tracking-[0.6em] text-[#adaaaa]/30 uppercase">
                    Authentic Rituals - Neon Pulse - Digital Spirit
                </p>
            </footer>
        </div>
    );
}
