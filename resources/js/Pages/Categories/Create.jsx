import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

const inputCls =
    'w-full rounded-xl bg-[#0e0e0e] border border-[#2a2a2a] text-white placeholder:text-[#adaaaa] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#8eff71]/40 focus:border-[#8eff71]/60 transition-all';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        slug: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('categories.store'));
    };

    return (
        <AuthenticatedLayout header="Nueva Categoria">
            <Head title="Nueva Categoria" />

            <div className="mb-6">
                <Link
                    href={route('categories.index')}
                    className="text-[#adaaaa] hover:text-white text-sm flex items-center gap-1.5 transition-colors w-fit"
                >
                    <span className="material-symbols-outlined text-base">arrow_back</span>
                    Volver a categorias
                </Link>
            </div>

            <form onSubmit={submit} className="max-w-xl">
                <div className="bg-[#131313] border border-[#2a2a2a] rounded-2xl p-5 space-y-4">
                    <h2 className="text-sm font-bold text-white">Informacion de categoria</h2>

                    <div>
                        <label className="block text-xs font-medium text-[#adaaaa] mb-1.5">
                            Nombre <span className="text-[#ff7351]">*</span>
                        </label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Ej: Papeles"
                            className={inputCls}
                        />
                        {errors.name && <p className="text-[#ff7351] text-xs mt-1">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-[#adaaaa] mb-1.5">
                            Slug (opcional)
                        </label>
                        <input
                            type="text"
                            value={data.slug}
                            onChange={(e) => setData('slug', e.target.value)}
                            placeholder="ej: papeles"
                            className={inputCls}
                        />
                        {errors.slug && <p className="text-[#ff7351] text-xs mt-1">{errors.slug}</p>}
                        <p className="text-xs text-[#484848] mt-1">
                            Si lo dejas vacio, se genera automaticamente desde el nombre.
                        </p>
                    </div>
                </div>

                <div className="mt-5 flex gap-3">
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-[#8eff71] text-[#0d6100] px-5 py-2.5 rounded-xl font-bold text-sm hover:shadow-[0_0_20px_rgba(142,255,113,0.25)] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {processing ? 'Guardando...' : 'Crear categoria'}
                    </button>
                    <Link
                        href={route('categories.index')}
                        className="px-5 py-2.5 rounded-xl bg-[#1f2020] text-[#adaaaa] hover:text-white text-sm font-medium transition-all"
                    >
                        Cancelar
                    </Link>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
