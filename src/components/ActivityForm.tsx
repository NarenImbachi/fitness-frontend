import { useState } from 'react'; import type { ActivityFormData } from '../types/schemas';
import type { ActivityType } from '../types';


interface ActivityFormProps {
    onSubmit: (data: ActivityFormData) => void;
    isSubmitting: boolean;
}

const activityTypes: ActivityType[] = ['RUNNING', 'CYCLING', 'SWIMMING', 'WALKING', 'YOGA', 'WEIGHT_TRAINING', 'CARDIO', 'HIIT', 'STRETCHING', 'OTHER'];

// Definimos un tipo para nuestros errores de formulario
type FormErrors = {
    type?: string;
    duration?: string;
    caloriesBurned?: string;
};

const ActivityForm = ({ onSubmit, isSubmitting }: ActivityFormProps) => {
    // 1. Usamos useState para cada campo del formulario
    const [type, setType] = useState<ActivityType | ''>('');
    const [duration, setDuration] = useState('');
    const [caloriesBurned, setCaloriesBurned] = useState('');
    const [errors, setErrors] = useState<FormErrors>({});

    // 2. Función de validación manual
    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!type) {
            newErrors.type = 'Please select an activity type';
        }
        const durationNum = Number(duration);
        if (!duration || isNaN(durationNum) || durationNum <= 0) {
            newErrors.duration = 'Duration must be a positive number';
        }
        const caloriesNum = Number(caloriesBurned);
        if (!caloriesBurned || isNaN(caloriesNum) || caloriesNum <= 0) {
            newErrors.caloriesBurned = 'Calories must be a positive number';
        }

        setErrors(newErrors);
        // El formulario es válido si el objeto de errores está vacío
        return Object.keys(newErrors).length === 0;
    };

    // 3. Manejador del envío del formulario
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevenimos la recarga de la página

        if (validateForm()) {
            // Si la validación es exitosa, llamamos a la función onSubmit del padre
            onSubmit({
                type: type.toUpperCase() as ActivityType, 
                duration: Number(duration),
                caloriesBurned: Number(caloriesBurned),
            });
            // Limpiamos el formulario
            setType('');
            setDuration('');
            setCaloriesBurned('');
            setErrors({});
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
            <h2 className="text-2xl font-bold mb-4">Add New Activity</h2>

            <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">Activity Type</label>
                <select
                    id="type"
                    value={type}
                    onChange={(e) => setType(e.target.value as ActivityType | '')}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                >
                    <option value="">Select a type</option>
                    {activityTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type}</p>}
            </div>

            <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
                <input
                    type="number"
                    id="duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
                {errors.duration && <p className="text-red-500 text-xs mt-1">{errors.duration}</p>}
            </div>

            <div>
                <label htmlFor="caloriesBurned" className="block text-sm font-medium text-gray-700">Calories Burned</label>
                <input
                    type="number"
                    id="caloriesBurned"
                    value={caloriesBurned}
                    onChange={(e) => setCaloriesBurned(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
                {errors.caloriesBurned && <p className="text-red-500 text-xs mt-1">{errors.caloriesBurned}</p>}
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400">
                {isSubmitting ? 'Adding...' : 'Add Activity'}
            </button>
        </form>
    );
};

export default ActivityForm;