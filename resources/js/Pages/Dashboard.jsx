import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

function StatCard({ icon, label, value, color, bg, href }) {
    const inner = (
        <div className={`relative overflow-hidden bg-[#131313] border border-[#2a2a2a] rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 ${href ? 'hover:border-[#8eff71]/30 hover:scale-[1.02] cursor-pointer' : ''}`}>
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-3xl pointer-events-none opacity-20" style={{ backgroundColor: color }} />
            <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center`}>
                <span className="material-symbols-outlined text-xl" style={{ color }}>{icon}</span>
            </div>
            <div>
                <p className="text-3xl font-black text-white tracking-tight">{value}</p>
                <p className="text-xs text-[#6f6f6f] mt-1 uppercase tracking-widest font-medium">{label}</p>
            </div>
        </div>
    );

    return href ? <Link href={href}>{inner}</Link> : inner;
}

function NavCard({ icon, label, description, href, accent = false }) {
    return (
        <Link
            href={href}
            className={`group relative overflow-hidden rounded-2xl p-6 flex items-center gap-5 transition-all duration-300 hover:scale-[1.01] ${
                accent
                    ? 'bg-gradient-to-br from-[#8eff71] to-[#2ff801] text-[#0d6100] hover:shadow-[0_0_30px_rgba(142,255,113,0.2)]'
                    : 'bg-[#131313] border border-[#2a2a2a] hover:border-[#8eff71]/30'
            }`}
        >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                accent ? 'bg-[#0d6100]/15' : 'bg-[#1f2020]'
            }`}>
                <span className={`material-symbols-outlined text-2xl ${accent ? 'text-[#0d6100]' : 'text-[#8eff71]'}`}>{icon}</span>
            </div>
            <div className="flex-1 min-w-0">
                <h3 className={`font-bold text-base ${accent ? 'text-[#0d6100]' : 'text-white'}`}>{label}</h3>
                <p className={`text-xs mt-0.5 ${accent ? 'text-[#0d6100]/70' : 'text-[#6f6f6f]'}`}>{description}</p>
            </div>
            <span className={`material-symbols-outlined text-xl transition-transform duration-300 group-hover:translate-x-1 ${accent ? 'text-[#0d6100]/60' : 'text-[#484848]'}`}>
                arrow_forward
            </span>
        </Link>
    );
}

export default function Dashboard({ counts = {} }) {
    const { auth } = usePage().props;

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard — 4US Argentina" />

            {/* Hero heading */}
            <div className="relative mb-10 overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#131313] to-[#0e0e0e] border border-[#2a2a2a] p-8 md:p-12">
                {/* Ambient glows */}
                <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#8eff71]/8 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-[#2ff801]/5 blur-[80px] rounded-full pointer-events-none" />

                <div className="relative z-10">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#6f6f6f] font-bold mb-4">Panel de administración</p>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-headline font-black italic uppercase leading-none tracking-tighter">
                        4US <span className="text-[#8eff71]">ARGENTINA</span>.
                    </h1>
                    <div className="flex items-center gap-3 mt-5">
                        <div className="w-8 h-8 rounded-full bg-[#8eff71]/15 border border-[#8eff71]/20 flex items-center justify-center text-[#8eff71] text-sm font-black select-none">
                            {auth.user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white">{auth.user.name}</p>
                            <p className="text-xs text-[#484848]">{auth.user.email}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                <StatCard
                    icon="inventory_2"
                    label="Productos"
                    value={counts.products ?? 0}
                    color="#8eff71"
                    bg="bg-[#8eff71]/10"
                    href={route('products.index')}
                />
                <StatCard
                    icon="star"
                    label="Destacados"
                    value={counts.featured ?? 0}
                    color="#ffd700"
                    bg="bg-[#ffd700]/10"
                    href={route('products.index')}
                />
                <StatCard
                    icon="local_offer"
                    label="En oferta"
                    value={counts.offers ?? 0}
                    color="#ff7351"
                    bg="bg-[#ff7351]/10"
                    href={route('products.index')}
                />
                <StatCard
                    icon="confirmation_number"
                    label="Códigos descuento"
                    value={counts.discountCodes ?? 0}
                    color="#88f6ff"
                    bg="bg-[#88f6ff]/10"
                    href={route('discount-codes.index')}
                />
            </div>

            {/* Secondary stats row */}
            <div className="grid grid-cols-3 gap-4 mb-10">
                <div className="bg-[#131313] border border-[#2a2a2a] rounded-2xl p-5 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#90f9a3]/10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-[#90f9a3] text-xl">category</span>
                    </div>
                    <div>
                        <p className="text-xl font-black text-white">{counts.categories ?? 0}</p>
                        <p className="text-[10px] text-[#6f6f6f] uppercase tracking-widest">Categorías</p>
                    </div>
                </div>
                <div className="bg-[#131313] border border-[#2a2a2a] rounded-2xl p-5 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#88f6ff]/10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-[#88f6ff] text-xl">receipt_long</span>
                    </div>
                    <div>
                        <p className="text-xl font-black text-white">{counts.orders ?? 0}</p>
                        <p className="text-[10px] text-[#6f6f6f] uppercase tracking-widest">Pedidos</p>
                    </div>
                </div>
                <div className="bg-[#131313] border border-[#2a2a2a] rounded-2xl p-5 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#8eff71]/10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-[#8eff71] text-xl">check_circle</span>
                    </div>
                    <div>
                        <p className="text-xl font-black text-white">{counts.activeDiscounts ?? 0}</p>
                        <p className="text-[10px] text-[#6f6f6f] uppercase tracking-widest">Descuentos activos</p>
                    </div>
                </div>
            </div>

            {/* Navigation cards */}
            <div className="mb-6">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#6f6f6f] font-bold mb-4">Accesos rápidos</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <NavCard
                    icon="add_box"
                    label="Nuevo producto"
                    description="Agregá un producto al catálogo"
                    href={route('products.create')}
                    accent
                />
                <NavCard
                    icon="inventory_2"
                    label="Productos"
                    description="Gestionar catálogo completo"
                    href={route('products.index')}
                />
                <NavCard
                    icon="category"
                    label="Categorías"
                    description="Organizar los productos por tipo"
                    href={route('categories.index')}
                />
                <NavCard
                    icon="confirmation_number"
                    label="Códigos de descuento"
                    description="Crear y gestionar promociones"
                    href={route('discount-codes.index')}
                />
                <NavCard
                    icon="settings"
                    label="Configuración"
                    description="Envío gratis y ajustes de tienda"
                    href={route('store-settings.edit')}
                />
                <NavCard
                    icon="person"
                    label="Mi perfil"
                    description="Datos de cuenta y contraseña"
                    href={route('profile.edit')}
                />
            </div>
        </AuthenticatedLayout>
    );
}
