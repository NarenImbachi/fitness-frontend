import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const { userProfile, logout } = useAuth();

    return (
        <nav className="bg-gray-800 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">
                    FitnessApp
                </Link>
                <div className="flex items-center space-x-4">
                    {userProfile ? (
                        <>
                            <span>Welcome, {userProfile.firstName || userProfile.username}</span>
                            <button
                                onClick={logout}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <span>Loading user...</span>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;