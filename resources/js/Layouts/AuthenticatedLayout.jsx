import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

const navItems = [
    {
        label: 'Dashboard',
        route: 'dashboard',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" />
            </svg>
        ),
    },
    {
        label: 'Productos',
        route: 'products.index',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
        ),
    },
    {
        label: 'Categorias',
        route: 'categories.index',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h10M7 12h7m-7 5h5M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
            </svg>
        ),
    },
    {
        label: 'Descuentos',
        route: 'discount-codes.index',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" />
            </svg>
        ),
    },
    {
        label: 'Configuración',
        route: 'store-settings.edit',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
    },
    {
        label: 'Perfil',
        route: 'profile.edit',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
        ),
    },
];

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [collapsed, setCollapsed] = useState(
        () => localStorage.getItem('sidebar-collapsed') === 'true'
    );
    const [mobileOpen, setMobileOpen] = useState(false);

    const toggleCollapsed = () => {
        setCollapsed((c) => {
            localStorage.setItem('sidebar-collapsed', String(!c));
            return !c;
        });
    };

    const sidebarW = collapsed ? 'w-[68px]' : 'w-56';

    const NavItem = ({ item }) => {
        const isActive = route().current(item.route);
        return (
            <Link
                href={route(item.route)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                    isActive
                        ? 'bg-[#8eff71]/10 text-[#8eff71]'
                        : 'text-[#adaaaa] hover:text-white hover:bg-[#1f2020]'
                }`}
            >
                <span className={`flex-shrink-0 ${isActive ? 'text-[#8eff71]' : 'group-hover:text-white'}`}>
                    {item.icon}
                </span>
                {!collapsed && (
                    <span className="text-sm font-medium truncate">{item.label}</span>
                )}
                {isActive && !collapsed && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#8eff71]" />
                )}
            </Link>
        );
    };

    const SidebarContent = ({ closeMobile }) => (
        <div className="flex flex-col h-full">
            <div className={`flex items-center px-3 py-5 ${collapsed ? 'justify-center' : 'justify-between'}`}>
                {!collapsed && (
                    <Link href={route('dashboard')} className="text-lg font-black text-[#8eff71] tracking-tighter font-['Space_Grotesk'] leading-none">
                        4us Argentina
                    </Link>
                )}
                <button
                    onClick={() => { toggleCollapsed(); closeMobile?.(); }}
                    aria-label="Toggle sidebar"
                    className="w-8 h-8 rounded-lg bg-[#1f2020] hover:bg-[#2a2a2a] flex items-center justify-center text-[#adaaaa] hover:text-white transition-colors flex-shrink-0"
                >
                    {collapsed ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                        </svg>
                    )}
                </button>
            </div>

            <div className="mx-3 mb-4 h-px bg-[#2a2a2a]" />

            <nav className="flex-1 px-2 space-y-1 overflow-y-auto">
                {navItems.map((item) => (
                    <NavItem key={item.route} item={item} />
                ))}
            </nav>

            <div className="mx-3 mt-4 mb-3 h-px bg-[#2a2a2a]" />

            <div className={`px-3 pb-5 ${collapsed ? 'flex flex-col items-center gap-2' : ''}`}>
                {!collapsed && (
                    <div className="mb-3 px-1">
                        <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                        <p className="text-xs text-[#adaaaa] truncate">{user.email}</p>
                    </div>
                )}
                <Link
                    href="/"
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[#adaaaa] hover:text-white hover:bg-[#1f2020] transition-all text-sm font-medium w-full mb-1 ${collapsed ? 'justify-center' : ''}`}
                    title="Volver al sitio"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    {!collapsed && <span>Volver al sitio</span>}
                </Link>
                <Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[#adaaaa] hover:text-[#ff7351] hover:bg-[#ff7351]/10 transition-all text-sm font-medium w-full ${collapsed ? 'justify-center' : ''}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
                    </svg>
                    {!collapsed && <span>Cerrar sesion</span>}
                </Link>
            </div>
        </div>
    );

    return (
        <div className="flex min-h-screen bg-[#0e0e0e] text-white font-['Space_Grotesk',sans-serif]">

            <aside
                className={`hidden md:flex flex-col fixed top-0 left-0 h-full bg-[#131313] border-r border-[#1f2020] z-40 transition-all duration-300 ${sidebarW}`}
            >
                <SidebarContent />
            </aside>

            <div
                className={`md:hidden fixed inset-0 z-50 transition-opacity duration-300 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            >
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
                <aside
                    className={`absolute top-0 left-0 h-full w-56 bg-[#131313] border-r border-[#1f2020] transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
                >
                    <SidebarContent closeMobile={() => setMobileOpen(false)} />
                </aside>
            </div>

            <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${collapsed ? 'md:ml-[68px]' : 'md:ml-56'}`}>
                <div className="sticky top-0 z-30 flex items-center gap-4 px-5 py-4 bg-[#0e0e0e]/80 backdrop-blur border-b border-[#1f2020]">
                    <button
                        onClick={() => setMobileOpen(true)}
                        aria-label="Abrir menu"
                        className="md:hidden flex flex-col gap-[5px] justify-center w-8 h-8"
                    >
                        <span className="w-5 h-[2px] bg-white rounded-full" />
                        <span className="w-5 h-[2px] bg-white rounded-full" />
                        <span className="w-3 h-[2px] bg-white rounded-full" />
                    </button>

                    <span className="md:hidden text-lg font-black text-[#8eff71] tracking-tighter font-['Space_Grotesk']">
                        4us Argentina
                    </span>

                    {header && (
                        <div className="hidden md:block text-white font-semibold text-lg">
                            {header}
                        </div>
                    )}

                    <div className="ml-auto flex items-center gap-3">
                        <span className="hidden md:block text-sm text-[#adaaaa]">{user.name}</span>
                        <div className="w-8 h-8 rounded-full bg-[#8eff71]/20 border border-[#8eff71]/30 flex items-center justify-center text-[#8eff71] text-sm font-bold select-none">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                    </div>
                </div>

                <main className="flex-1 p-5 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
