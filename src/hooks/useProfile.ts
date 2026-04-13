import { useState, useEffect } from 'react';
import { getUserProfile } from '../api/services/userService';
import type { UserProfile } from '../types';

export const useProfile = () => {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
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
        };

        fetchProfile();
    }, []);

    return { profile, isLoading, error };
};