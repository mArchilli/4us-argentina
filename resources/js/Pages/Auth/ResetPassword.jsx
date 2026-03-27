import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

const inputCls = 'w-full rounded-xl bg-[#0e0e0e] border border-[#2a2a2a] text-white placeholder:text-[#484848] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#8eff71]/40 focus:border-[#8eff71]/60 transition-all';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token,
        email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Nueva contraseña" />

            <h1 className="text-xl font-black text-white mb-1">Nueva contraseña</h1>
            <p className="text-sm text-[#adaaaa] mb-6">Elegí una contraseña segura para tu cuenta.</p>

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label className="block text-xs font-medium text-[#adaaaa] mb-1.5">Email</label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        autoComplete="username"
                        className={inputCls}
                    />
                    {errors.email && <p className="text-[#ff7351] text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                    <label className="block text-xs font-medium text-[#adaaaa] mb-1.5">Nueva contraseña</label>
                    <input
                        type="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        placeholder="••••••••"
                        autoComplete="new-password"
                        autoFocus
                        className={inputCls}
                    />
                    {errors.password && <p className="text-[#ff7351] text-xs mt-1">{errors.password}</p>}
                </div>

                <div>
                    <label className="block text-xs font-medium text-[#adaaaa] mb-1.5">Confirmar contraseña</label>
                    <input
                        type="password"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        placeholder="••••••••"
                        autoComplete="new-password"
                        className={inputCls}
                    />
                    {errors.password_confirmation && (
                        <p className="text-[#ff7351] text-xs mt-1">{errors.password_confirmation}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-[#8eff71] text-[#0d6100] py-2.5 rounded-xl font-bold text-sm hover:shadow-[0_0_20px_rgba(142,255,113,0.25)] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {processing ? 'Guardando...' : 'Restablecer contraseña'}
                </button>
            </form>
        </GuestLayout>
    );
}
