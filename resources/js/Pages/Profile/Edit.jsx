import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout header="Mi Perfil">
            <Head title="Perfil" />

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

                <div className="bg-[#131313] border border-[#2a2a2a] rounded-2xl p-6 md:p-8">
                    <DeleteUserForm />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
