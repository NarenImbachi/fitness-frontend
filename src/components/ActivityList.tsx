import React, { useState } from 'react';
import RecommendationModal from './RecommendationModal';
import { toast } from 'react-toastify';
import type { Activity, Recommendation } from '../types';
import { getRecommendationByActivity } from '../api/services/recommendationsService';

interface ActivityListProps {
    activities: Activity[];
}

const ActivityList: React.FC<ActivityListProps> = ({ activities }) => {
    // 1. Estados para manejar el modal y los datos de la recomendación
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRecommendation, setSelectedRecommendation] = useState<Recommendation | null>(null);
    const [isLoadingRecommendation, setIsLoadingRecommendation] = useState(false);
    const [recommendationError, setRecommendationError] = useState<string | null>(null);

    // 2. Función para manejar el clic en el botón "Ver Recomendación"
    const handleViewRecommendation = async (activityId: string) => {
        setIsModalOpen(true);
        setIsLoadingRecommendation(true);
        setRecommendationError(null);
        setSelectedRecommendation(null);

        try {
            const recommendation = await getRecommendationByActivity(activityId);
            setSelectedRecommendation(recommendation);
        } catch (error: unknown) {
            // Si el error es un 404, significa que no hay recomendación, lo cual no es un error crítico.
            if (error instanceof Error && error.message.includes('404')) {
                setSelectedRecommendation(null); // Nos aseguramos que no haya datos previos
            } else {
                const errorMessage = 'Error al cargar la recomendación.';
                setRecommendationError(errorMessage);
                toast.error(errorMessage);
                console.error('Error fetching recommendation:', error);
            }
        } finally {
            setIsLoadingRecommendation(false);
        }
    };

    // 3. Función para cerrar el modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedRecommendation(null);
        setRecommendationError(null);
    };

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <>
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Mis Actividades Recientes</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duración (min)</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Calorías</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                                {/* 4. Nueva columna para las acciones */}
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Recomendación IA</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {activities.map((activity) => (
                                <tr key={activity.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{activity.type}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{activity.duration}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{activity.caloriesBurned}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(activity.startTime)}</td>
                                    {/* 5. Botón para ver la recomendación */}
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                        <button
                                            onClick={() => handleViewRecommendation(activity.id)}
                                            className="text-indigo-600 hover:text-indigo-900 transition duration-150 ease-in-out"
                                        >
                                            Ver Recomendación
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 6. Renderizar el modal */}
            <RecommendationModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                recommendation={selectedRecommendation}
                isLoading={isLoadingRecommendation}
                error={recommendationError}
            />
        </>
    );
};

export default ActivityList;