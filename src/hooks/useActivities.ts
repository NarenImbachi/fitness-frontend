import { useState, useEffect, useCallback } from 'react';
import { getActivities } from '../api/services/activityService';
import type { Activity } from '../types';

export const useActivities = () => {
    // Estado para almacenar las actividades
    const [activities, setActivities] = useState<Activity[]>([]); // Estado para almacenar las actividades
    // Estado para manejar la carga y los errores
    const [isLoading, setIsLoading] = useState<boolean>(true);
    // Estado para manejar errores
    const [error, setError] = useState<string | null>(null);

    // Función para cargar las actividades desde el backend
    const fetchActivities = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await getActivities();
            setActivities(data);
        } catch (err) {
            setError('Failed to fetch activities. Please try again later.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Cargamos las actividades al montar el componente
    useEffect(() => {
        fetchActivities();
    }, [fetchActivities]);

    // Exponemos los datos, el estado de carga, el error y una función para recargar
    return { activities, isLoading, error, refetch: fetchActivities };
};