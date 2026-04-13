import Keycloak, { type KeycloakProfile } from 'keycloak-js';

/**
 * Definimos el tipo para el contexto de autenticación. 
 * Esto nos ayudará a tener autocompletado y a evitar errores de tipo en nuestro código.
 * En este momento, solo incluye el objeto Keycloak y un booleano para saber si el usuario está autenticado,
 * pero podemos expandirlo en el futuro para incluir más información, como el perfil del usuario, roles, etc.
 */

export interface AuthContextType {
    keycloak: Keycloak | null;
    authenticated: boolean;
    userProfile: KeycloakProfile | null;
    initialized: boolean;
    login: () => void;
    logout: () => void;
    // Agregaremos más cosas aquí después, como el perfil del usuario
}

export type ActivityType = 'RUNNING' | 'CYCLING' | 'SWIMMING' | 'WALKING' | 'YOGA' | 'WEIGHT_TRAINING' | 'CARDIO' | 'HIIT' | 'STRETCHING' | 'OTHER';

export interface Activity {
    id: string;
    userId: string;
    type: ActivityType;
    duration: number;
    caloriesBurned: number;
    startTime: string; // Usamos string para la fecha/hora en formato ISO
    additionalMetrics?: Record<string, unknown>; // Opcional, usando Record<string, any> para el Map
}

// Este es el objeto que enviaremos al backend, coincidiendo con ActivityRequest.java
export interface ActivityRequest {
    type: ActivityType;
    duration: number;
    caloriesBurned: number;
    startTime: string; // Se enviará como string ISO
    additionalMetrics?: Record<string, unknown>;
}

export interface Recommendation {
    id: string;
    activityId: string;
    userId: string;
    activityType: string;
    recommendation: string;
    improvements: string[];
    suggestions: string[];
    safety: string[];
    createdAt: string;
}

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username?: string; // Opcional si no siempre viene
  keycloakId: string;
  createdAt: string;
  updatedAt: string;
  birthDate?: string; // Los hacemos opcionales para manejar usuarios viejos
  height?: number;
  weight?: number;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  height?: number;
  weight?: number;
}