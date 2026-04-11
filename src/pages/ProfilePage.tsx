import React from 'react';
import { useAuth } from '../hooks/useAuth';

const ProfilePage: React.FC = () => {
    const { userProfile } = useAuth();

    if (!userProfile) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
            </div>
        );
    }

    const profileItems = [
        { label: 'Nombre de Usuario', value: userProfile.username },
        { label: 'Nombre', value: userProfile.firstName },
        { label: 'Apellido', value: userProfile.lastName },
        { label: 'Email', value: userProfile.email },
        { label: 'Email Verificado', value: userProfile.emailVerified ? 'Sí' : 'No', highlight: userProfile.emailVerified },
        { label: 'ID de Usuario', value: userProfile.id, isId: true },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="bg-gray-800 p-6">
                    <h1 className="text-3xl font-bold text-white text-center">
                        Perfil de Usuario
                    </h1>
                </div>
                <div className="p-6">
                    <div className="space-y-4">
                        {profileItems.map((item, index) => (
                            <div key={index} className="flex flex-col sm:flex-row sm:items-center">
                                <p className="w-full sm:w-1/3 text-gray-500 font-semibold">{item.label}:</p>
                                <p
                                    className={`w-full sm:w-2/3 text-gray-800 ${item.isId ? 'text-xs break-all' : ''} ${item.highlight ? 'text-green-600 font-bold' : ''}`}
                                >
                                    {item.value}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;