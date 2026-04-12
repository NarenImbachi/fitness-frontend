import axios from 'axios';
import keycloak from './keycloakClient';

// Creamos una instancia de Axios con la URL base de nuestro Gateway
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_GATEWAY_URL,
});

// Creamos una instancia separada para llamadas públicas
const publicApiClient = axios.create({
  baseURL: 'http://localhost:8080',
});

// Aquí está la magia: el interceptor de peticiones
apiClient.interceptors.request.use(
    async (config) => {
        // Antes de cada petición, nos aseguramos de que el token de Keycloak esté fresco
        try {
            // El 'minValidity: 70' significa que si el token va a expirar en los próximos 70 segundos,
            // intentará refrescarlo silenciosamente.
            const refreshed = await keycloak.updateToken(70);
            if (refreshed) {
                console.log('Token was successfully refreshed');
            }
        } catch (error) {
            console.error('Failed to refresh token:', error);
            // Si el refresco falla, es un problema serio. Podríamos forzar un logout.
            // Por ahora, solo lo logueamos.
        }

        // Añadimos la cabecera de autorización a la petición
        if (keycloak.token) {
            config.headers.Authorization = `Bearer ${keycloak.token}`;
        }

        return config;
    },
    (error) => {
        // Manejo de errores en la configuración de la petición
        return Promise.reject(error);
    }
);


export { publicApiClient }; 
export default apiClient;