import React, { useState } from 'react';
import RecommendationModal from './RecommendationModal';
import { toast } from 'react-toastify';
import type { Activity, Recommendation } from '../types';
import { getRecommendationByActivity } from '../api/services/recommendationsService';
import { FiZap, FiClock, FiBarChart2, FiCalendar, FiAlertCircle } from 'react-icons/fi';

interface ActivityListProps {
    activities: Activity[];
}

const ActivityList: React.FC<ActivityListProps> = ({ activities }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRecommendation, setSelectedRecommendation] = useState<Recommendation | null>(null);
    const [isLoadingRecommendation, setIsLoadingRecommendation] = useState(false);
    const [recommendationError, setRecommendationError] = useState<string | null>(null);

    const handleViewRecommendation = async (activityId: string) => {
        setIsModalOpen(true);
        setIsLoadingRecommendation(true);
        setRecommendationError(null);
        setSelectedRecommendation(null);
        try {
            const recommendation = await getRecommendationByActivity(activityId);
            setSelectedRecommendation(recommendation);
        } catch (error: unknown) {
            if (error instanceof Error && error.message.includes('404')) {
                setSelectedRecommendation(null);
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

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedRecommendation(null);
        setRecommendationError(null);
    };

    return (
        <>
            <div className="bg-white shadow-md rounded-xl p-6">
                <h2 className="text-2xl font-semibold text-slate-700 mb-6">Mis Actividades</h2>
                {activities.length > 0 ? (
                    // --- CAMBIO PRINCIPAL: De lista a Grid ---
                    <div className="grid md:grid-cols-3 grid-cols-2  gap-6">
                        {activities.map((activity) => (
                            <div key={activity.id} className="bg-slate-50 p-5 rounded-lg border border-slate-200 flex flex-col justify-between transition-shadow hover:shadow-lg">
                                <div>
                                    <div className="flex items-center mb-3">
                                        <div className="p-2 bg-blue-100 text-blue-600 rounded-full mr-3">
                                            <FiBarChart2 size={20} />
                                        </div>
                                        <p className="font-bold text-lg text-slate-800">{activity.type}</p>
                                    </div>
                                    <div className="pl-10 space-y-2 text-sm">
                                        <p className="text-slate-600 flex items-center"><FiClock className="mr-2"/> {activity.duration} minutos</p>
                                        <p className="text-slate-600 flex items-center"><FiCalendar className="mr-2"/> {new Date(activity.startTime).toLocaleDateString()}</p>
                                        <p className="font-semibold text-green-600 flex items-center"><FiZap className="mr-2"/> {activity.caloriesBurned} kcal</p>
                                    </div>
                                </div>
                                <div className="mt-5 text-right">
                                    <button
                                        onClick={() => handleViewRecommendation(activity.id)}
                                        className="bg-purple-100 text-purple-700 hover:bg-purple-200 font-semibold py-2 px-4 rounded-lg transition duration-300 text-sm"
                                    >
                                        Ver Recomendación IA
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-slate-50 rounded-lg">
                         <FiAlertCircle className="mx-auto text-slate-400" size={40}/>
                        <p className="mt-4 text-slate-500">No hay actividades registradas todavía.</p>
                    </div>
                )}
            </div>

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