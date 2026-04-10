import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import type { JSX } from 'react';


// Este componente recibe a sus "hijos" (la página a proteger)
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { authenticated, keycloak } = useAuth();

    // Mientras Keycloak se está inicializando, keycloak será null.
    // En este estado, no sabemos si el usuario está autenticado o no.
    // Podemos mostrar un loader o simplemente no renderizar nada.
    if (!keycloak) {
        return <div>Loading authentication...</div>;
    }

    // Si Keycloak ya inicializó y el usuario NO está autenticado,
    // lo redirigimos a la página de login.
    if (!authenticated) {
        return <Navigate to="/login" />;
    }

    // Si todo está en orden (inicializado y autenticado),
    // renderizamos la página que nos pasaron.
    return children;
};

export default ProtectedRoute;