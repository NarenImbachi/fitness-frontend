import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { toast } from 'react-toastify';
import type { Recommendation } from '../types';
import { getRecommendationsByUser } from '../api/services/recommendationsService';

const POLLING_INTERVAL = 10000; // 10 segundos

export const useRecommendations = () => {
    const { userProfile, authenticated } = useAuth();
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchRecommendations = useCallback(async () => {
        if (!userProfile?.id) {
            return;
        }

        // No mostramos el spinner en las recargas de polling, solo en la carga inicial.
        // setIsLoading(true); // Descomentar si se prefiere un spinner en cada recarga

        try {
            const data = await getRecommendationsByUser(userProfile.id);
            setRecommendations(data);
            setError(null);
        } catch (err) {
            const errorMessage = 'Error al obtener las recomendaciones. Inténtalo de nuevo más tarde.';
            setError(errorMessage);
            // Solo mostramos el toast una vez, no en cada intento de polling.
            if (recommendations.length === 0) {
                toast.error(errorMessage);
            }
            console.error(err);
        } finally {
            // Nos aseguramos de que el spinner de carga inicial se oculte.
            if (isLoading) {
                setIsLoading(false);
            }
        }
    }, [userProfile?.id, isLoading, recommendations.length]);

    useEffect(() => {
        if (authenticated && userProfile?.id) {
            // 1. Carga inicial de datos
            fetchRecommendations();

            // 2. Configuración del sondeo (polling)
            const intervalId = setInterval(() => {
                fetchRecommendations();
            }, POLLING_INTERVAL);

            // 3. Limpieza al desmontar el componente
            return () => {
                clearInterval(intervalId);
            };
        } else {
            // Si no está autenticado, nos aseguramos de que no haya estado de carga.
            setIsLoading(false);
        }
        // La dependencia de fetchRecommendations asegura que el efecto se reinicie si la función cambia.
    }, [authenticated, userProfile?.id, fetchRecommendations]);

    return { recommendations, isLoading, error };
};