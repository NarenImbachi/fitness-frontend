import { useState } from 'react';
import type { ActivityFormData } from '../types/schemas';
import type { ActivityType } from '../types';

interface ActivityFormProps {
    onSubmit: (data: ActivityFormData) => void;
    isSubmitting: boolean;
}

const activityTypes: ActivityType[] = ['RUNNING', 'CYCLING', 'SWIMMING', 'WALKING', 'YOGA', 'WEIGHT_TRAINING', 'CARDIO', 'HIIT', 'STRETCHING', 'OTHER'];

type FormErrors = {
    type?: string;
    duration?: string;
    caloriesBurned?: string;
};

const ActivityForm = ({ onSubmit, isSubmitting }: ActivityFormProps) => {
    const [type, setType] = useState<ActivityType | ''>('');
    const [duration, setDuration] = useState('');
    const [caloriesBurned, setCaloriesBurned] = useState('');
    const [errors, setErrors] = useState<FormErrors>({});

    // 1. Función de validación que puede validar todos los campos o uno solo
    const validate = (fieldName?: keyof ActivityFormData): boolean => {
        const newErrors: FormErrors = { ...errors };

        // Validar tipo
        if (fieldName === 'type' || !fieldName) {
            if (!type) newErrors.type = 'Please select an activity type';
            else delete newErrors.type;
        }

        // Validar duración
        if (fieldName === 'duration' || !fieldName) {
            const durationNum = Number(duration);
            if (!duration || isNaN(durationNum) || durationNum <= 0) {
                newErrors.duration = 'Duration must be a positive number';
            } else {
                delete newErrors.duration;
            }
        }

        // Validar calorías
        if (fieldName === 'caloriesBurned' || !fieldName) {
            const caloriesNum = Number(caloriesBurned);
            if (!caloriesBurned || isNaN(caloriesNum) || caloriesNum <= 0) {
                newErrors.caloriesBurned = 'Calories must be a positive number';
            } else {
                delete newErrors.caloriesBurned;
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validate()) { // Llama a la validación para todos los campos
            onSubmit({
                type: type as ActivityType,
                duration: Number(duration),
                caloriesBurned: Number(caloriesBurned),
            });
            setType('');
            setDuration('');
            setCaloriesBurned('');
            setErrors({});
        }
    };

    // 2. Manejador del evento onBlur
    const handleBlur = (fieldName: keyof ActivityFormData) => {
        validate(fieldName); // Llama a la validación solo para el campo que perdió el foco
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
                    onBlur={() => handleBlur('type')} // 3. Añadimos onBlur
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
                    onBlur={() => handleBlur('duration')} // 3. Añadimos onBlur
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
                    onBlur={() => handleBlur('caloriesBurned')} // 3. Añadimos onBlur
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