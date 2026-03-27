import InputError from '@/Components/InputError';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';

const inputClass =
    'mt-1 block w-full rounded-xl bg-[#0e0e0e] border border-[#2a2a2a] text-white placeholder:text-[#adaaaa] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#8eff71]/40 focus:border-[#8eff71]/60 transition-all';

export default function UpdatePasswordForm() {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const { data, setData, errors, put, reset, processing, recentlySuccessful } =
        useForm({
            current_password: '',
            password: '',
            password_confirmation: '',
        });

    const updatePassword = (e) => {
        e.preventDefault();
        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }
                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section>
            <header className="mb-6">
                <h2 className="text-base font-bold text-white">Cambiar contraseña</h2>
                <p className="mt-1 text-sm text-[#adaaaa]">
                    Usá una contraseña larga y aleatoria para mantener tu cuenta segura.
                </p>
            </header>

            <form onSubmit={updatePassword} className="space-y-5">
                <div>
                    <label htmlFor="current_password" className="block text-sm font-medium text-[#adaaaa] mb-1">Contraseña actual</label>
                    <input
                        id="current_password"
                        ref={currentPasswordInput}
                        type="password"
                        className={inputClass}
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        autoComplete="current-password"
                    />
                    <InputError message={errors.current_password} className="mt-1 text-[#ff7351] text-xs" />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-[#adaaaa] mb-1">Nueva contraseña</label>
                    <input
                        id="password"
                        ref={passwordInput}
                        type="password"
                        className={inputClass}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        autoComplete="new-password"
                    />
                    <InputError message={errors.password} className="mt-1 text-[#ff7351] text-xs" />
                </div>

                <div>
                    <label htmlFor="password_confirmation" className="block text-sm font-medium text-[#adaaaa] mb-1">Confirmar contraseña</label>
                    <input
                        id="password_confirmation"
                        type="password"
                        className={inputClass}
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        autoComplete="new-password"
                    />
                    <InputError message={errors.password_confirmation} className="mt-1 text-[#ff7351] text-xs" />
                </div>

                <div className="flex items-center gap-4 pt-2">
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-[#8eff71] text-[#0d6100] px-6 py-2.5 rounded-full font-bold text-sm hover:shadow-[0_0_20px_rgba(142,255,113,0.25)] transition-all active:scale-95 disabled:opacity-50"
                    >
                        Actualizar contraseña
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
