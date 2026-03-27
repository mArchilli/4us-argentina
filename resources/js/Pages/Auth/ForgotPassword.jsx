import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

const inputCls = 'w-full rounded-xl bg-[#0e0e0e] border border-[#2a2a2a] text-white placeholder:text-[#484848] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#8eff71]/40 focus:border-[#8eff71]/60 transition-all';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({ email: '' });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Recuperar contraseña" />

            <h1 className="text-xl font-black text-white mb-1">Recuperar contraseña</h1>
            <p className="text-sm text-[#adaaaa] mb-6">
                Ingresá tu email y te enviaremos un link para restablecer tu contraseña.
            </p>

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
                        autoFocus
                        className={inputCls}
                    />
                    {errors.email && <p className="text-[#ff7351] text-xs mt-1">{errors.email}</p>}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-[#8eff71] text-[#0d6100] py-2.5 rounded-xl font-bold text-sm hover:shadow-[0_0_20px_rgba(142,255,113,0.25)] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {processing ? 'Enviando...' : 'Enviar link de recuperación'}
                </button>

                <Link
                    href={route('login')}
                    className="block text-center text-sm text-[#adaaaa] hover:text-white transition-colors"
                >
                    Volver al inicio de sesión
                </Link>
            </form>
        </GuestLayout>
    );
}
