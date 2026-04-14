import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiUser, FiMail, FiLock, FiUserPlus, FiLoader } from 'react-icons/fi';
import { registerUser } from '../api/services/userService';

const RegisterPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        if (!firstName || !lastName || !email || !password) {
            toast.error('Todos los campos son obligatorios.');
            setIsLoading(false);
            return;
        }
        try {
            await registerUser({ firstName, lastName, email, password });
            toast.success('¡Registro exitoso! Por favor, inicia sesión.');
            navigate('/login');
        } catch (error: unknown) {
            if (error instanceof Error && 'response' in error && (error.response as { status?: number })?.status === 409) {
                toast.error('El correo electrónico ya está en uso.');
            } else {
                toast.error('Ocurrió un error durante el registro.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl mx-auto lg:grid lg:grid-cols-2 rounded-2xl shadow-2xl overflow-hidden">

                {/* Panel Izquierdo - Formulario */}
                <div className="bg-white p-8 sm:p-12">
                    <h2 className="text-3xl font-bold text-slate-800 mb-2">Crear una Cuenta</h2>
                    <p className="text-slate-500 mb-8">Únete a nuestra comunidad y empieza a mejorar.</p>
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <FormInput icon={<FiUser />} name="firstName" type="text" placeholder="Nombre" value={firstName} onChange={setFirstName} />
                            <FormInput icon={<FiUser />} name="lastName" type="text" placeholder="Apellido" value={lastName} onChange={setLastName} />
                        </div>
                        <FormInput icon={<FiMail />} name="email" type="email" placeholder="Correo electrónico" value={email} onChange={setEmail} />
                        <FormInput icon={<FiLock />} name="password" type="password" placeholder="Contraseña" value={password} onChange={setPassword} />

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg disabled:bg-blue-400 transition-transform hover:scale-105"
                            >
                                {isLoading ? <FiLoader className="animate-spin mr-2" /> : <FiUserPlus className="mr-2" />}
                                {isLoading ? 'Registrando...' : 'Crear Cuenta'}
                            </button>
                        </div>
                    </form>
                    <p className="mt-8 text-sm text-center text-slate-600">
                        ¿Ya tienes una cuenta?{' '}
                        <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-500">
                            Inicia sesión
                        </Link>
                    </p>
                </div>

                {/* Panel Derecho - Decorativo */}
                <div className="lg:flex flex-col justify-center items-center p-12 bg-linear-to-br from-blue-600 to-blue-700 text-white">
                    <h1 className="text-4xl font-bold mb-4">FitnessApp</h1>
                    <p className="text-center text-blue-100">El primer paso hacia una vida más activa y saludable.</p>
                </div>
            </div>
        </div>
    );
};

// Componente auxiliar para los inputs del formulario
const FormInput = ({ icon, name, type, placeholder, value, onChange }: { icon: React.ReactNode, name: string, type: string, placeholder: string, value: string, onChange: (value: string) => void }) => (
    <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            {icon}
        </div>
        <input
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            required
            className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
);

export default RegisterPage;