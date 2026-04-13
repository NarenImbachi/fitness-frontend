import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link, NavLink } from 'react-router-dom';
import { FiUser, FiLogOut, FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
    const { userProfile, logout, initialized } = useAuth();
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Cierra el menú de perfil si se hace clic fuera de él
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsProfileMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // No renderizar el navbar hasta que keycloak esté inicializado
    if (!initialized) {
        return null;
    }

    const getInitials = (firstName?: string, lastName?: string) => {
        if (!firstName) return 'U';
        const firstInitial = firstName.charAt(0).toUpperCase();
        const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : '';
        return `${firstInitial}${lastInitial}`;
    };

    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        `transition-colors px-3 py-2 rounded-md text-sm font-medium ${isActive
            ? 'text-blue-600 font-semibold'
            : 'text-slate-600 hover:text-blue-600'
        }`;

    const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
        `block px-3 py-2 rounded-md text-base font-medium ${isActive
            ? 'bg-blue-100 text-blue-700'
            : 'text-slate-700 hover:bg-slate-100'
        }`;

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-40">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Izquierda: Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-2xl font-bold text-blue-600">
                            FitnessApp
                        </Link>
                    </div>

                    {/* Centro: Enlaces de Navegación (Escritorio) */}
                    {userProfile && (
                        <div className="md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <NavLink to="/" className={navLinkClass}>Dashboard</NavLink>
                                <NavLink to="/activities" className={navLinkClass}>Actividades</NavLink>
                                <NavLink to="/recommendations" className={navLinkClass}>Recomendaciones IA</NavLink>
                            </div>
                        </div>
                    )}

                    {/* Derecha: Menú de Perfil y Botón Móvil */}
                    <div className="flex items-center">
                        {userProfile ? (
                            <>
                                {/* Menú de Perfil (Escritorio) */}
                                <div className="md:block" ref={menuRef}>
                                    <div className="relative ml-3">
                                        <button
                                            type="button"
                                            className="flex items-center max-w-xs rounded-full bg-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                                        >
                                            <span className="sr-only">Abrir menú de usuario</span>
                                            <div className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                                                {getInitials(userProfile.firstName, userProfile.lastName)}
                                            </div>
                                        </button>
                                        {isProfileMenuOpen && (
                                            <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <Link to="/profile" className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-100" onClick={() => setIsProfileMenuOpen(false)}>
                                                    <FiUser className="mr-2" /> Mi Perfil
                                                </Link>
                                                <button onClick={() => { logout(); setIsProfileMenuOpen(false); }} className="flex items-center w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                                                    <FiLogOut className="mr-2" /> Cerrar Sesión
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Botón de Menú Móvil (Hamburguesa) */}
                                <div className="md:hidden">
                                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} type="button" className="inline-flex items-center justify-center rounded-md p-2 text-slate-500 hover:text-blue-600 hover:bg-slate-100 focus:outline-none">
                                        <span className="sr-only">Abrir menú</span>
                                        {isMobileMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
                                    </button>
                                </div>
                            </>
                        ) : (
                            // Botones para Login/Register si no está autenticado
                            <div className="hidden md:block space-x-2">
                                <Link to="/login" className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-blue-600">Iniciar Sesión</Link>
                                <Link to="/register" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">Registrarse</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Panel del Menú Móvil */}
            {isMobileMenuOpen && userProfile && (
                <div className="md:hidden border-t border-slate-200">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <NavLink to="/" className={mobileNavLinkClass} onClick={() => setIsMobileMenuOpen(false)}>Dashboard</NavLink>
                        <NavLink to="/activities" className={mobileNavLinkClass} onClick={() => setIsMobileMenuOpen(false)}>Actividades</NavLink>
                        <NavLink to="/recommendations" className={mobileNavLinkClass} onClick={() => setIsMobileMenuOpen(false)}>Recomendaciones IA</NavLink>
                    </div>
                    <div className="border-t border-slate-200 px-2 pt-3 pb-3 space-y-1">
                        <Link to="/profile" className="flex items-center rounded-md px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-100" onClick={() => setIsMobileMenuOpen(false)}>
                            <FiUser className="mr-3" /> Mi Perfil
                        </Link>
                        <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="flex items-center w-full text-left rounded-md px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-100">
                            <FiLogOut className="mr-3" /> Cerrar Sesión
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;