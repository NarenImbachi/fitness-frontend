import { useState } from 'react';
import type { ActivityFormData } from '../types/schemas';
import type { ActivityType } from '../types';
import { FiType, FiClock, FiTrendingUp, FiPlusCircle } from 'react-icons/fi';

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

    const validate = (fieldName?: keyof ActivityFormData): boolean => {
        const newErrors: FormErrors = { ...errors };

        if (fieldName === 'type' || !fieldName) {
            if (!type) newErrors.type = 'Por favor, selecciona un tipo de actividad.';
            else delete newErrors.type;
        }
        if (fieldName === 'duration' || !fieldName) {
            const durationNum = Number(duration);
            if (!duration || isNaN(durationNum) || durationNum <= 0) newErrors.duration = 'La duración debe ser un número positivo.';
            else delete newErrors.duration;
        }
        if (fieldName === 'caloriesBurned' || !fieldName) {
            const caloriesNum = Number(caloriesBurned);
            if (!caloriesBurned || isNaN(caloriesNum) || caloriesNum <= 0) newErrors.caloriesBurned = 'Las calorías deben ser un número positivo.';
            else delete newErrors.caloriesBurned;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validate()) {
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

    const handleBlur = (fieldName: keyof ActivityFormData) => {
        validate(fieldName);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md space-y-6">
            <h2 className="text-2xl font-semibold text-slate-700 mb-4">Añadir Nueva Actividad</h2>

            <div className="relative">
                <FiType className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" />
                <select
                    id="type"
                    value={type}
                    onChange={(e) => setType(e.target.value as ActivityType | '')}
                    onBlur={() => handleBlur('type')}
                    className="pl-10 mt-1 block w-full p-3 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="">Selecciona un tipo</option>
                    {activityTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type}</p>}
            </div>

            <div className="relative">
                <FiClock className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" />
                <input
                    type="number"
                    id="duration"
                    placeholder="Duración (minutos)"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    onBlur={() => handleBlur('duration')}
                    className="pl-10 mt-1 block w-full p-3 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.duration && <p className="text-red-500 text-xs mt-1">{errors.duration}</p>}
            </div>

            <div className="relative">
                <FiTrendingUp className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" />
                <input
                    type="number"
                    id="caloriesBurned"
                    placeholder="Calorías Quemadas"
                    value={caloriesBurned}
                    onChange={(e) => setCaloriesBurned(e.target.value)}
                    onBlur={() => handleBlur('caloriesBurned')}
                    className="pl-10 mt-1 block w-full p-3 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.caloriesBurned && <p className="text-red-500 text-xs mt-1">{errors.caloriesBurned}</p>}
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg disabled:bg-slate-400 transition-all duration-300 transform hover:scale-105">
                <FiPlusCircle className="mr-2" />
                {isSubmitting ? 'Añadiendo...' : 'Añadir Actividad'}
            </button>
        </form>
    );
};

export default ActivityForm;