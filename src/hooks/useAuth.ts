import { useContext } from 'react';
import type { AuthContextType } from '../types';
import AuthContext from '../contexts/AuthContext';

export const useAuth = (): AuthContextType => {
    // Este hook es una forma conveniente de acceder al contexto de autenticación desde cualquier componente funcional.
    // Llama a useContext con nuestro AuthContext para obtener el valor actual del contexto.
    // Si el contexto es undefined, significa que el componente que llama a useAuth no está envuelto por un AuthProvider, lo cual es un error de configuración. En ese caso, lanzamos un error para alertar al desarrollador.
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};