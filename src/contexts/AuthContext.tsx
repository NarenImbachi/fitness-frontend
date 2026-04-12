import React, { createContext, useState, useEffect, useRef } from 'react';
import keycloak from '../api/keycloakClient';
import type { AuthContextType } from '../types';
import type { KeycloakProfile } from 'keycloak-js';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const isRun = useRef(false);
    // Estado inicial con funciones que no hacen nada, pero existen.
    const [auth, setAuth] = useState<AuthContextType>({
        keycloak: null,
        authenticated: false,
        userProfile: null,
        initialized: false,
        login: () => console.error("Login function called before initialized."),
        logout: () => console.error("Logout function called before initialized."),
    });

    useEffect(() => {
        if (isRun.current) return;
        isRun.current = true;

        const initKeycloak = async () => {
            try {
                const authenticated = await keycloak.init({
                    onLoad: 'check-sso',
                    silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
                    pkceMethod: 'S256',
                });

                console.log(`Keycloak initialized. Authenticated: ${authenticated}`);

                let userProfile: KeycloakProfile | null = null;
                if (authenticated) {
                    // Si está autenticado, cargamos el perfil
                    userProfile = await keycloak.loadUserProfile();
                    console.log("User profile:", userProfile);
                }

                // Actualizamos el estado con el cliente y las funciones que llaman directamente a la instancia
                setAuth({
                    keycloak: keycloak,
                    authenticated: authenticated,
                    userProfile: userProfile,
                    initialized: true,
                    login: () => keycloak.login(),
                    logout: () => keycloak.logout({ redirectUri: window.location.origin }),
                });

            } catch (error) {
                console.error('Failed to initialize Keycloak:', error);
                // Incluso si falla, proveemos las funciones para poder intentar el login manualmente
                setAuth({
                    keycloak: keycloak,
                    authenticated: false,
                    userProfile: null,
                    initialized: true,
                    login: () => keycloak.login(),
                    logout: () => keycloak.logout({ redirectUri: window.location.origin }),
                });
            }
        };

        initKeycloak();
    }, []); // El array vacío asegura que esto se ejecute UNA SOLA VEZ.

    // Muestra un estado de carga mientras el objeto keycloak aún no está en el estado.
    // Esto es más fiable que comprobar la instancia directamente.
    if (!auth.keycloak) {
        return <div>Loading Keycloak...</div>;
    }

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;