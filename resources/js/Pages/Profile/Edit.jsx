import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout header="Mi Perfil">
            <Head title="Perfil" />

            {/* Page header */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#131313] to-[#0e0e0e] border border-[#2a2a2a] px-6 py-5 mb-6">
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#8eff71]/8 blur-[60px] rounded-full pointer-events-none" />
                <div className="relative">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#6f6f6f] font-bold mb-1">Cuenta</p>
                    <h1 className="text-2xl font-black tracking-tight text-white uppercase italic">
                        Mi <span className="text-[#8eff71]">Perfil</span>
                    </h1>
                </div>
            </div>

            <div className="max-w-7xl space-y-6">
                <div className="bg-[#131313] border border-[#2a2a2a] rounded-2xl p-6 md:p-8">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                    />
                </div>

                <div className="bg-[#131313] border border-[#2a2a2a] rounded-2xl p-6 md:p-8">
                    <UpdatePasswordForm />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
