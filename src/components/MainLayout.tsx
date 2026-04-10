import Navbar from './Navbar';
// Outlet es un componente de React Router que renderiza la página hija correspondiente a la ruta actual.
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // 1. Importa el contenedor
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <main className="container mx-auto p-4">
                {/* Outlet renderizará la página hija que corresponda a la ruta */}
                <Outlet />
            </main>
            {/* 3. Añade el contenedor de toasts. Se usa para mostrar notificaciones al usuario. Ejemplo: notificaciones de éxito o error */}
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
};

export default MainLayout;