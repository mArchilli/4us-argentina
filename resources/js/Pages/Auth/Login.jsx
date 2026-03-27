import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

const inputCls = 'w-full rounded-xl bg-[#0e0e0e] border border-[#2a2a2a] text-white placeholder:text-[#484848] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#8eff71]/40 focus:border-[#8eff71]/60 transition-all';

export default function Login({ status, canResetPassword }) {
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
        <GuestLayout>
            <Head title="Iniciar sesión" />

            <h1 className="text-xl font-black text-white mb-1">Bienvenido</h1>
            <p className="text-sm text-[#adaaaa] mb-6">Ingresá con tu cuenta</p>

            {status && (
                <div className="mb-4 text-sm text-[#8eff71] bg-[#8eff71]/10 border border-[#8eff71]/20 px-4 py-2.5 rounded-xl">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label className="block text-xs font-medium text-[#adaaaa] mb-1.5">Email</label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="admin@ejemplo.com"
                        autoComplete="username"
                        autoFocus
                        className={inputCls}
                    />
                    {errors.email && <p className="text-[#ff7351] text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                    <label className="block text-xs font-medium text-[#adaaaa] mb-1.5">Contraseña</label>
                    <input
                        type="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        placeholder="••••••••"
                        autoComplete="current-password"
                        className={inputCls}
                    />
                    {errors.password && <p className="text-[#ff7351] text-xs mt-1">{errors.password}</p>}
                </div>

                <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                            type="checkbox"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="w-4 h-4 rounded border-[#2a2a2a] bg-[#0e0e0e] accent-[#8eff71] cursor-pointer"
                        />
                        <span className="text-sm text-[#adaaaa]">Recordarme</span>
                    </label>
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-sm text-[#adaaaa] hover:text-[#8eff71] transition-colors"
                        >
                            ¿Olvidaste tu contraseña?
                        </Link>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-[#8eff71] text-[#0d6100] py-2.5 rounded-xl font-bold text-sm hover:shadow-[0_0_20px_rgba(142,255,113,0.25)] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                >
                    {processing ? 'Ingresando...' : 'Ingresar'}
                </button>
            </form>
        </GuestLayout>
    );
}
