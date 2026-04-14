import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FiLogIn, FiLoader } from 'react-icons/fi';

const LoginPage = () => {
  const { keycloak, initialized } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (initialized && keycloak?.authenticated) {
      navigate('/');
    }
  }, [initialized, keycloak?.authenticated, navigate]);

  const handleLogin = () => {
    if (keycloak) {
      keycloak.login();
    }
  };

  if (!initialized) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-100">
        <FiLoader className="animate-spin text-blue-600" size={40} />
        <p className="ml-4 text-slate-600">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto lg:grid lg:grid-cols-2 rounded-2xl shadow-2xl overflow-hidden">

        {/* Panel Izquierdo - Decorativo */}
        <div className="lg:flex flex-col justify-center items-center p-12 bg-linear-to-br from-blue-600 to-blue-700 text-white">
          <h1 className="text-4xl font-bold mb-4">FitnessApp</h1>
          <p className="text-center text-blue-100">Tu compañero de fitness personal. Registra, analiza y mejora.</p>
        </div>

        {/* Panel Derecho - Formulario */}
        <div className="bg-white p-8 sm:p-12 flex flex-col justify-center">
          <div className="w-full max-w-sm mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Bienvenido de Nuevo</h2>
            <p className="text-slate-500 mb-8">Por favor, inicia sesión para continuar.</p>

            <button
              onClick={handleLogin}
              className="w-full flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-transform hover:scale-105"
            >
              <FiLogIn className="mr-2" />
              Iniciar Sesión con Keycloak
            </button>

            <p className="mt-8 text-sm text-slate-600">
              ¿No tienes una cuenta?{' '}
              <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-500">
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;