import Keycloak from 'keycloak-js';

/**
 * Definimos el tipo para el contexto de autenticación. 
 * Esto nos ayudará a tener autocompletado y a evitar errores de tipo en nuestro código.
 * En este momento, solo incluye el objeto Keycloak y un booleano para saber si el usuario está autenticado,
 * pero podemos expandirlo en el futuro para incluir más información, como el perfil del usuario, roles, etc.
 */

export interface AuthContextType {
    keycloak: Keycloak | null;
    authenticated: boolean;
    login: () => void;
    logout: () => void;
    // Agregaremos más cosas aquí después, como el perfil del usuario
}