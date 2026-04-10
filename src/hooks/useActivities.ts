import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify'; // 2. Importa toast
import type { Activity, ActivityRequest } from '../types';
import { createActivity, getActivities } from '../api/services/activityService';

export const useActivities = () => {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // 3. Estado para el envío del form
    const [error, setError] = useState<string | null>(null);

    const fetchActivities = useCallback(async () => {
        // ... (código existente sin cambios)
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

    useEffect(() => {
        fetchActivities();
    }, [fetchActivities]);

    // 4. Nueva función para añadir una actividad
    const addActivity = async (activityData: Omit<ActivityRequest, 'startTime'>) => {
        try {
            setIsSubmitting(true);
            const newActivityRequest: ActivityRequest = {
                ...activityData,
                startTime: new Date().toISOString(), // Añade la fecha y hora actual
            };
            await createActivity(newActivityRequest);
            toast.success('Activity created successfully!');
            await fetchActivities(); // Recarga la lista de actividades
        } catch (err) {
            toast.error('Failed to create activity.');
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return { activities, isLoading, error, refetch: fetchActivities, addActivity, isSubmitting }; // 5. Expone las nuevas funciones/estados
};