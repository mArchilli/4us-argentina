import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Verificar email" />

            <h1 className="text-xl font-black text-white mb-1">Verificá tu email</h1>
            <p className="text-sm text-[#adaaaa] mb-6">
                Te enviamos un link de verificación a tu casilla. Si no lo recibiste, podemos enviarte otro.
            </p>

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-sm text-[#8eff71] bg-[#8eff71]/10 border border-[#8eff71]/20 px-4 py-2.5 rounded-xl">
                    Se envió un nuevo link de verificación a tu email.
                </div>
            )}

            <form onSubmit={submit} className="space-y-3">
                <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-[#8eff71] text-[#0d6100] py-2.5 rounded-xl font-bold text-sm hover:shadow-[0_0_20px_rgba(142,255,113,0.25)] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {processing ? 'Enviando...' : 'Reenviar email de verificación'}
                </button>

                <Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    className="block w-full text-center text-sm text-[#adaaaa] hover:text-[#ff7351] transition-colors py-2"
                >
                    Cerrar sesión
                </Link>
            </form>
        </GuestLayout>
    );
}
