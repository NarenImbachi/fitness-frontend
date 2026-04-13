import { useState } from 'react';
import { useProfile } from '../hooks/useProfile';
import { toast } from 'react-toastify';
import { updateUserProfile } from '../api/services/userService';
import type { UpdateUserRequest } from '../types';

const ProfilePage = () => {
    const { profile: initialProfile, isLoading, error } = useProfile();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<UpdateUserRequest>(() => {
        if (initialProfile) {
            return {
                firstName: initialProfile.firstName,
                lastName: initialProfile.lastName,
                birthDate: initialProfile.birthDate ? initialProfile.birthDate.split('T')[0] : '',
                height: initialProfile.height,
                weight: initialProfile.weight,
            };
        }
        return {};
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateUserProfile(formData);
            toast.success('Profile updated successfully!');
            setIsEditing(false);
            // Aquí necesitaríamos una forma de recargar los datos.
            // Modificaremos useProfile para devolver una función `refetch`.
        } catch {
            toast.error('Failed to update profile.');
        }
    };

    if (isLoading) return <div className="text-center mt-8">Loading profile...</div>;
    if (error) return <div className="text-center mt-8 text-red-500">Error: {error}</div>;
    if (!initialProfile) return <div className="text-center mt-8">No profile data found.</div>;

    return (
        <div className="container mx-auto p-4 mt-8 max-w-2xl">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-3xl font-bold text-gray-800">Perfil del Usuario</h1>
                        {!isEditing && (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Editar
                            </button>
                        )}
                    </div>

                    {!isEditing ? (
                        // VISTA DE SOLO LECTURA
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                            <div><p className="font-semibold">Nombres:</p><p>{initialProfile.firstName}</p></div>
                            <div><p className="font-semibold">Apellidos:</p><p>{initialProfile.lastName}</p></div>
                            <div className="md:col-span-2"><p className="font-semibold">Email:</p><p>{initialProfile.email}</p></div>
                            <div><p className="font-semibold">Fecha de Nacimiento:</p><p>{initialProfile.birthDate ? new Date(initialProfile.birthDate).toLocaleDateString() : 'Not set'}</p></div>
                            <div><p className="font-semibold">Estatura (cm):</p><p>{initialProfile.height ?? 'Not set'}</p></div>
                            <div><p className="font-semibold">Peso (kg):</p><p>{initialProfile.weight ?? 'Not set'}</p></div>
                            <div><p className="font-semibold">Fecha de creación:</p><p>{initialProfile.createdAt ? new Date(initialProfile.createdAt).toLocaleDateString() : 'Not set'}</p></div>
                        </div>
                    ) : (
                        // FORMULARIO DE EDICIÓN
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 font-semibold">Nombres:</label>
                                    <input type="text" name="firstName" value={formData.firstName || ''} onChange={handleInputChange} className="w-full p-2 border rounded" />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-semibold">Apellidos:</label>
                                    <input type="text" name="lastName" value={formData.lastName || ''} onChange={handleInputChange} className="w-full p-2 border rounded" />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-semibold">Fecha de Nacimiento:</label>
                                    <input type="date" name="birthDate" value={formData.birthDate || ''} onChange={handleInputChange} className="w-full p-2 border rounded" />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-semibold">Estatura (cm):</label>
                                    <input type="number" name="height" value={formData.height || ''} onChange={handleInputChange} className="w-full p-2 border rounded" />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-semibold">Peso (kg):</label>
                                    <input type="number" name="weight" value={formData.weight || ''} onChange={handleInputChange} className="w-full p-2 border rounded" />
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end gap-4">
                                <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                                    Cancel
                                </button>
                                <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                    Save
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;