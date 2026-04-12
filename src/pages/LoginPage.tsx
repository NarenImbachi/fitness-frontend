import { useEffect } from 'react'; // Importa useEffect
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate
import { useAuth } from '../hooks/useAuth';

const LoginPage = () => {
  const { keycloak, initialized } = useAuth();
  const navigate = useNavigate(); // Hook para la navegación

  // Este efecto se ejecutará cuando el componente se cargue o cuando cambie el estado de autenticación
  useEffect(() => {
    // Si keycloak está inicializado y el usuario está autenticado...
    if (initialized && keycloak?.authenticated) {
      // ...redirígelo a la página principal.
      navigate('/');
    }
  }, [initialized, keycloak?.authenticated, navigate]);


  const handleLogin = () => {
    if (keycloak) {
      keycloak.login();
    }
  };

  // Muestra un estado de carga mientras Keycloak se inicializa
  if (!initialized) {
    return <div>Cargando...</div>;
  }

  // Si el usuario no está autenticado, muestra el botón de login
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 space-y-6 text-center bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800">Fitness App</h1>
        <p className="text-gray-600">
          Bienvenido. Por favor, inicia sesión para continuar.
        </p>
        <button
          onClick={handleLogin}
          className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Iniciar Sesión
        </button>
        <p className="mt-4 text-sm text-gray-600">
          ¿No tienes una cuenta?{' '}
          <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;