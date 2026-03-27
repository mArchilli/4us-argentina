import InputError from '@/Components/InputError';
import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function DeleteUserForm() {
    const [confirming, setConfirming] = useState(false);
    const passwordInput = useRef();

    const { data, setData, delete: destroy, processing, reset, errors, clearErrors } =
        useForm({ password: '' });

    const deleteUser = (e) => {
        e.preventDefault();
        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirming(false);
        clearErrors();
        reset();
    };

    return (
        <section className="space-y-6">
            <header>
                <h2 className="text-base font-bold text-white">Eliminar cuenta</h2>
                <p className="mt-1 text-sm text-[#adaaaa]">
                    Una vez eliminada tu cuenta, todos los datos serán borrados permanentemente.
                    Antes de eliminarla, descargá cualquier información que quieras conservar.
                </p>
            </header>

            <button
                onClick={() => setConfirming(true)}
                className="bg-[#ff7351]/10 border border-[#ff7351]/30 text-[#ff7351] px-5 py-2.5 rounded-full font-bold text-sm hover:bg-[#ff7351]/20 transition-all active:scale-95"
            >
                Eliminar cuenta
            </button>

            <Modal show={confirming} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6 bg-[#131313] rounded-2xl">
                    <h2 className="text-lg font-bold text-white">
                        ¿Estás seguro que querés eliminar tu cuenta?
                    </h2>
                    <p className="mt-2 text-sm text-[#adaaaa]">
                        Esta acción es permanente e irreversible. Ingresá tu contraseña para confirmar.
                    </p>

                    <div className="mt-6">
                        <label htmlFor="del-password" className="sr-only">Contraseña</label>
                        <input
                            id="del-password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Tu contraseña"
                            autoFocus
                            className="block w-full rounded-xl bg-[#0e0e0e] border border-[#2a2a2a] text-white placeholder:text-[#adaaaa] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff7351]/40 focus:border-[#ff7351]/60 transition-all"
                        />
                        <InputError message={errors.password} className="mt-1 text-[#ff7351] text-xs" />
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="px-5 py-2.5 rounded-full border border-[#2a2a2a] text-[#adaaaa] hover:text-white hover:border-[#3a3a3a] text-sm font-medium transition-all"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-[#ff7351] text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-[#e05a3a] transition-all active:scale-95 disabled:opacity-50"
                        >
                            Eliminar definitivamente
                        </button>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
