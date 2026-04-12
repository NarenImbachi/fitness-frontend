import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    const { userProfile, logout } = useAuth();
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsProfileMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className="bg-gray-800 shadow-md">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    
                    {/* Izquierda: Logo */}
                    <div className="shrink-0">
                        <Link to="/activities" className="text-white text-xl font-bold">
                            FitnessApp
                        </Link>
                    </div>

                    {/* Centro: Enlaces de Navegación (Solo en Escritorio) */}
                    <div className="md:flex md:items-center md:space-x-4">
                        <NavLink 
                            to="/" 
                            className={({ isActive }) => isActive ? 'bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium' : 'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'}
                        >
                            Home
                        </NavLink>
                        <NavLink 
                            to="/activities" 
                            className={({ isActive }) => isActive ? 'bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium' : 'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'}
                        >
                            Actividades
                        </NavLink>
                        <NavLink
                            to="/recommendations"
                            className={({ isActive }) => isActive ? 'bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium' : 'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'}
                        >
                            Recomendaciones IA
                        </NavLink>
                    </div>

                    {/* Derecha: Menú de Perfil (Solo en Escritorio) */}
                    <div className="md:flex md:items-center">
                        <div className="relative ml-3" ref={menuRef}>
                            <div>
                                <button
                                    type="button"
                                    className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                                >
                                    <span className="text-gray-300 mr-2">
                                        {userProfile?.firstName || 'Usuario'}
                                    </span>
                                    <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </button>
                            </div>
                            {isProfileMenuOpen && (
                                <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsProfileMenuOpen(false)}>
                                        Mi Perfil
                                    </Link>
                                    <button onClick={() => { logout(); setIsProfileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Cerrar Sesión
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Botón de Menú Móvil (Hamburguesa) */}
                    <div className="hidden md:flex">
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} type="button" className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none">
                            <span className="sr-only">Abrir menú</span>
                            {isMobileMenuOpen ? (
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            ) : (
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m4 6H4" /></svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Panel del Menú Móvil */}
            {isMobileMenuOpen && (
                <div className="flex">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <NavLink to="/activities" className={({ isActive }) => isActive ? 'bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium' : 'text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'} onClick={() => setIsMobileMenuOpen(false)}>
                            Actividades
                        </NavLink>
                        <NavLink to="/recommendations" className={({ isActive }) => isActive ? 'bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium' : 'text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'} onClick={() => setIsMobileMenuOpen(false)}>
                            Recomendaciones IA
                        </NavLink>
                        <Link to="/profile" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                            Mi Perfil
                        </Link>
                        <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="text-gray-300 hover:bg-gray-700 hover:text-white block w-full text-left rounded-md px-3 py-2 text-base font-medium">
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;