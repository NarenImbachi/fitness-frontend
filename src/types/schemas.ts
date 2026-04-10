import { z } from 'zod';

// Este esquema ahora sirve principalmente como una "fuente de verdad" para definir la forma de los datos.
export const activitySchema = z.object({
    type: z.enum(['RUNNING', 'CYCLING', 'SWIMMING', 'WALKING', 'YOGA', 'WEIGHT_TRAINING', 'CARDIO', 'HIIT', 'STRETCHING', 'OTHER']),
    duration: z.number(),
    caloriesBurned: z.number(),
});

/**
 * Este es el tipo que inferimos del esquema. 
 * Lo usamos en nuestro formulario manual para asegurar que los datos que manejamos
 * tienen la estructura correcta: { type: '...', duration: 0, caloriesBurned: 0 }
 */
export type ActivityFormData = z.infer<typeof activitySchema>;