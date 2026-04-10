import type { Activity, ActivityRequest } from "../../types";
import apiClient from "../apiClient";


/**
 * Obtiene todas las actividades para el usuario autenticado.
 * El Gateway se encarga de identificar al usuario a partir del token JWT.
 * @returns Una promesa que se resuelve en un array de actividades.
 */
export const getActivities = async (): Promise<Activity[]> => {
    try {
        const response = await apiClient.get<Activity[]>('/api/activities');
        return response.data;
    } catch (error) {
        console.error('Error fetching activities:', error);
        throw error; // Relanzamos el error para que el componente que llama pueda manejarlo
    }
};

/**
 * Obtiene una actividad específica por su ID.
 * @param activityId - El ID de la actividad a obtener.
 * @returns Una promesa que se resuelve en un objeto de actividad.
 */
export const getActivityById = async (activityId: string): Promise<Activity> => {
    try {
        const response = await apiClient.get<Activity>(`/api/activities/${activityId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching activity ${activityId}:`, error);
        throw error;
    }
};

/**
 * Registra una nueva actividad para el usuario autenticado.
 * @param newActivity - El objeto de la nueva actividad a crear.
 * @returns Una promesa que se resuelve en la actividad recién creada.
 */
export const createActivity = async (newActivity: ActivityRequest): Promise<Activity> => {
    try {
        // El endpoint es /api/activities y el método es POST
        const response = await apiClient.post<Activity>('/api/activities', newActivity);
        return response.data;
    } catch (error) {
        console.error('Error creating activity:', error);
        throw error;
    }
};