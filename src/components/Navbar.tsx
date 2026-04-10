import { useAuth } from '../hooks/useAuth';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    const { userProfile, logout } = useAuth();

    return (
        <nav className="bg-gray-800 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">
                    FitnessApp
                </Link>

                {/* Enlaces de navegación */}
                <div className="space-x-4">
                    <NavLink to="/" className={({ isActive }) => isActive ? 'text-blue-400' : 'hover:text-blue-300'}>
                        Home
                    </NavLink>
                    <NavLink to="/activities" className={({ isActive }) => isActive ? 'text-blue-400' : 'hover:text-blue-300'}>
                        Actividades
                    </NavLink>
                </div>

                <div className="flex items-center space-x-4">
                    {userProfile ? (
                        <>
                            <span>Bienvenido, {userProfile.firstName || userProfile.username}</span>
                            <button
                                onClick={logout}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Cerrar sesión
                            </button>
                        </>
                    ) : (
                        <span>Cargando usuario...</span>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;