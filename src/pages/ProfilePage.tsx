import { useState, useEffect } from 'react';
import { useProfile } from '../hooks/useProfile';
import { toast } from 'react-toastify';
import { FiUser, FiMail, FiCalendar, FiChevronsRight, FiEdit, FiSave, FiXCircle, FiLoader } from 'react-icons/fi';
import type { UpdateUserRequest } from '../types';
import { updateUserProfile } from '../api/services/userService';

const ProfilePage = () => {
    // El hook useProfile ya nos da la función para recargar los datos
    const { profile: initialProfile, isLoading, error, refetch } = useProfile();
    const [isEditing, setIsEditing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<UpdateUserRequest>({});

    useEffect(() => {
        if (initialProfile) {
            setFormData({
                firstName: initialProfile.firstName,
                lastName: initialProfile.lastName,
                birthDate: initialProfile.birthDate ? initialProfile.birthDate.split('T')[0] : '',
                height: initialProfile.height,
                weight: initialProfile.weight,
            });
        }
    }, [initialProfile]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: valueAsNumberOrString(name, value) }));
    };

    // Helper para convertir a número si es necesario
    const valueAsNumberOrString = (name: string, value: string) => {
        if (name === 'height' || name === 'weight') {
            const num = parseFloat(value);
            return isNaN(num) ? '' : num;
        }
        return value;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await updateUserProfile(formData);
            toast.success('¡Perfil actualizado con éxito!');
            setIsEditing(false);
            refetch(); // ¡Llamamos a refetch para actualizar los datos en la UI!
        } catch (err) {
            toast.error('Error al actualizar el perfil.');
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) return <div className="flex justify-center items-center h-screen"><FiLoader className="animate-spin text-blue-600" size={40} /><p className="ml-4 text-slate-600">Cargando perfil...</p></div>;
    if (error) return <div className="text-center mt-8 text-red-500">Error: {error}</div>;
    if (!initialProfile) return <div className="text-center mt-8">No se encontraron datos del perfil.</div>;

    const getInitials = (firstName?: string, lastName?: string) => {
        if (!firstName) return 'U';
        return `${firstName.charAt(0)}${lastName ? lastName.charAt(0) : ''}`.toUpperCase();
    };

    return (
        <div className="bg-slate-50 min-h-screen py-8 px-4">
            <div className="container mx-auto max-w-4xl">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* --- Encabezado con Avatar --- */}
                    <div className="p-8 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                        <div className="h-24 w-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-4xl font-bold ring-4 ring-white ring-offset-2 ring-offset-slate-50">
                            {getInitials(initialProfile.firstName, initialProfile.lastName)}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-slate-800 text-center sm:text-left">{initialProfile.firstName} {initialProfile.lastName}</h1>
                            <p className="text-slate-500 flex items-center justify-center sm:justify-start"><FiMail className="mr-2" />{initialProfile.email}</p>
                        </div>
                        {!isEditing && (
                            <div className="sm:ml-auto">
                                <button onClick={() => setIsEditing(true)} className="flex items-center bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-blue-700 transition-transform hover:scale-105">
                                    <FiEdit className="mr-2" /> Editar Perfil
                                </button>
                            </div>
                        )}
                    </div>

                    {/* --- Contenido Principal --- */}
                    <div className="p-8">
                        {!isEditing ? (
                            // --- VISTA DE SOLO LECTURA ---
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                <InfoItem icon={<FiUser />} label="Nombres" value={initialProfile.firstName} />
                                <InfoItem icon={<FiUser />} label="Apellidos" value={initialProfile.lastName} />
                                <InfoItem icon={<FiCalendar />} label="Fecha de Nacimiento" value={initialProfile.birthDate ? new Date(initialProfile.birthDate).toLocaleDateString() : 'No establecido'} />
                                <InfoItem icon={<FiChevronsRight transform="rotate(90)" />} label="Estatura (cm)" value={initialProfile.height ?? 'No establecido'} />
                                <InfoItem icon={<FiChevronsRight transform="rotate(90)" />} label="Peso (kg)" value={initialProfile.weight ?? 'No establecido'} />
                                <InfoItem icon={<FiCalendar />} label="Miembro desde" value={initialProfile.createdAt ? new Date(initialProfile.createdAt).toLocaleDateString() : 'No establecido'} />
                            </div>
                        ) : (
                            // --- FORMULARIO DE EDICIÓN ---
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormInput label="Nombres" name="firstName" value={formData.firstName} onChange={handleInputChange} />
                                    <FormInput label="Apellidos" name="lastName" value={formData.lastName} onChange={handleInputChange} />
                                    <FormInput label="Fecha de Nacimiento" name="birthDate" type="date" value={formData.birthDate} onChange={handleInputChange} />
                                    <FormInput label="Estatura (cm)" name="height" type="number" value={formData.height} onChange={handleInputChange} />
                                    <FormInput label="Peso (kg)" name="weight" type="number" value={formData.weight} onChange={handleInputChange} />
                                </div>
                                <div className="mt-8 flex justify-end gap-4">
                                    <button type="button" onClick={() => setIsEditing(false)} className="flex items-center bg-slate-200 text-slate-700 font-semibold py-2 px-5 rounded-lg hover:bg-slate-300 transition-colors">
                                        <FiXCircle className="mr-2" /> Cancelar
                                    </button>
                                    <button type="submit" disabled={isSubmitting} className="flex items-center bg-green-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-green-700 transition-colors disabled:bg-slate-400">
                                        {isSubmitting ? <><FiLoader className="animate-spin mr-2" /> Guardando...</> : <><FiSave className="mr-2" /> Guardar Cambios</>}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Componentes Auxiliares para mantener el código limpio ---

const InfoItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | number }) => (
    <div className="bg-slate-50 p-4 rounded-lg">
        <label className="text-sm text-slate-500 flex items-center">{icon}<span className="ml-2">{label}</span></label>
        <p className="text-lg font-semibold text-slate-800">{value}</p>
    </div>
);

const FormInput = ({ label, name, type = 'text', value, onChange }: { label: string, name: string, type?: string, value: unknown, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
        <input
            type={type}
            id={name}
            name={name}
            value={String(value || '')}
            onChange={onChange}
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
    </div>
);

export default ProfilePage;