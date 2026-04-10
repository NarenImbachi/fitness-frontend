import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const LoginPage = () => {
    const { authenticated, login } = useAuth();

    console.log("LoginPage rendered. Authenticated:", authenticated);
    console.log("Login function:", login);

    // Si el usuario ya está autenticado, lo redirigimos a la página de inicio
    if (authenticated) {
        return <Navigate to="/" />;
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Fitness App</h1>
                <p className="text-lg mb-8">Please log in to continue</p>
                <button
                    onClick={login} // ¡Aquí conectamos la función de login!
                    className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-xl"}
                >
                    Login with Keycloak
                </button>
            </div>
        </div>
    );
};

export default LoginPage;