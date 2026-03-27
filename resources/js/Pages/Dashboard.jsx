import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

const stats = [
    { label: 'Ventas totales', value: '$0', icon: 'shopping_bag', color: 'text-[#8eff71]', bg: 'bg-[#8eff71]/10' },
    { label: 'Pedidos', value: '0', icon: 'receipt_long', color: 'text-[#88f6ff]', bg: 'bg-[#88f6ff]/10' },
    { label: 'Clientes', value: '0', icon: 'group', color: 'text-[#90f9a3]', bg: 'bg-[#90f9a3]/10' },
    { label: 'Productos', value: '0', icon: 'inventory_2', color: 'text-[#8eff71]', bg: 'bg-[#8eff71]/10' },
];

export default function Dashboard() {
    const { auth } = usePage().props;

    return (
        <AuthenticatedLayout header="Dashboard">
            <Head title="Dashboard" />

            {/* Welcome banner */}
            <div className="mb-8 rounded-2xl bg-gradient-to-r from-[#131313] to-[#1a1a1a] border border-[#2a2a2a] p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 overflow-hidden relative">
                <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-[#8eff71]/5 blur-3xl pointer-events-none" />
                <div>
                    <p className="text-[#adaaaa] text-sm uppercase tracking-widest mb-1">Panel de administración</p>
                    <h1 className="text-2xl md:text-3xl font-black tracking-tight">
                        Bienvenido, <span className="text-[#8eff71]">{auth.user.name}</span>
                    </h1>
                    <p className="text-[#adaaaa] mt-1 text-sm">{auth.user.email}</p>
                </div>
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-[#8eff71]/15 border border-[#8eff71]/20 flex items-center justify-center text-[#8eff71] text-2xl font-black select-none">
                    {auth.user.name.charAt(0).toUpperCase()}
                </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="bg-[#131313] border border-[#2a2a2a] rounded-2xl p-5 flex flex-col gap-3 hover:border-[#3a3a3a] transition-colors"
                    >
                        <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                            <span className={`material-symbols-outlined ${stat.color} text-xl`}>{stat.icon}</span>
                        </div>
                        <div>
                            <p className="text-2xl font-black text-white">{stat.value}</p>
                            <p className="text-xs text-[#adaaaa] mt-0.5">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Content placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Recent activity placeholder */}
                <div className="lg:col-span-2 bg-[#131313] border border-[#2a2a2a] rounded-2xl p-6">
                    <h2 className="text-base font-bold mb-4 text-white">Actividad reciente</h2>
                    <div className="flex flex-col items-center justify-center py-12 gap-3">
                        <span className="material-symbols-outlined text-[#2a2a2a] text-5xl">inbox</span>
                        <p className="text-[#adaaaa] text-sm">Sin actividad por el momento</p>
                    </div>
                </div>

                {/* Quick links */}
                <div className="bg-[#131313] border border-[#2a2a2a] rounded-2xl p-6">
                    <h2 className="text-base font-bold mb-4 text-white">Accesos rápidos</h2>
                    <div className="flex flex-col gap-2">
                        {[
                            { icon: 'add_box', label: 'Nuevo producto', href: route('products.create') },
                            { icon: 'edit_note', label: 'Ver catálogo', href: route('products.index') },
                        ].map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#adaaaa] hover:text-white hover:bg-[#1f2020] transition-all text-sm"
                            >
                                <span className="material-symbols-outlined text-[#8eff71] text-lg">{item.icon}</span>
                                {item.label}
                            </Link>
                        ))}
                        {[
                            { icon: 'person_add', label: 'Nuevo cliente' },
                            { icon: 'bar_chart', label: 'Ver reportes' },
                        ].map((item) => (
                            <button
                                key={item.label}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#adaaaa] hover:text-white hover:bg-[#1f2020] transition-all text-sm text-left"
                            >
                                <span className="material-symbols-outlined text-[#8eff71] text-lg">{item.icon}</span>
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
