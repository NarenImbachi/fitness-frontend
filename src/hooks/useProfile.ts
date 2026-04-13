import { useState, useEffect, useCallback } from 'react'; // Añadir useCallback
import type { UserProfile } from '../types';
import { getUserProfile } from '../api/services/userService';

export const useProfile = () => {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProfile = useCallback(async () => {
        try {
            setIsLoading(true);
            const userProfile = await getUserProfile();
            setProfile(userProfile);
        } catch (err) {
            setError('Failed to fetch profile');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    return { profile, isLoading, error, refetch: fetchProfile }; // Devolvemos la función para recargar
};