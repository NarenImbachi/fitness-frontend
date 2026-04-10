import Navbar from './Navbar';
// Outlet es un componente de React Router que renderiza la página hija correspondiente a la ruta actual.
import { Outlet } from 'react-router-dom'; 

const MainLayout = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <main className="container mx-auto p-4">
                {/* Outlet renderizará la página hija que corresponda a la ruta */}
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;