import InputError from '@/Components/InputError';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

const inputClass =
    'mt-1 block w-full rounded-xl bg-[#0e0e0e] border border-[#2a2a2a] text-white placeholder:text-[#adaaaa] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#8eff71]/40 focus:border-[#8eff71]/60 transition-all';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <section>
            <header className="mb-6">
                <h2 className="text-base font-bold text-white">Información del perfil</h2>
                <p className="mt-1 text-sm text-[#adaaaa]">
                    Actualizá tu nombre y dirección de correo electrónico.
                </p>
            </header>

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#adaaaa] mb-1">Nombre</label>
                    <input
                        id="name"
                        type="text"
                        className={inputClass}
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        autoFocus
                        autoComplete="name"
                    />
                    <InputError className="mt-1 text-[#ff7351] text-xs" message={errors.name} />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#adaaaa] mb-1">Correo electrónico</label>
                    <input
                        id="email"
                        type="email"
                        className={inputClass}
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />
                    <InputError className="mt-1 text-[#ff7351] text-xs" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="rounded-xl bg-[#8eff71]/5 border border-[#8eff71]/20 px-4 py-3">
                        <p className="text-sm text-[#adaaaa]">
                            Tu dirección de correo no está verificada.{' '}
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="text-[#8eff71] underline hover:text-white transition-colors"
                            >
                                Hacer click aquí para reenviar el email de verificación.
                            </Link>
                        </p>
                        {status === 'verification-link-sent' && (
                            <p className="mt-2 text-sm font-medium text-[#8eff71]">
                                Se envió un nuevo enlace de verificación a tu correo.
                            </p>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4 pt-2">
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-[#8eff71] text-[#0d6100] px-6 py-2.5 rounded-full font-bold text-sm hover:shadow-[0_0_20px_rgba(142,255,113,0.25)] transition-all active:scale-95 disabled:opacity-50"
                    >
                        Guardar cambios
                    </button>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out duration-300"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out duration-300"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-[#8eff71]">Guardado.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
