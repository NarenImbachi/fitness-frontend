import React from 'react';
import { useRecommendations } from '../hooks/useRecommendations';
import RecommendationCard from '../components/RecommendationCard';
import { useAuth } from '../hooks/useAuth';

const RecommendationsPage: React.FC = () => {
    const { recommendations, isLoading, error } = useRecommendations();
    const { userProfile } = useAuth();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 bg-red-100 p-4 rounded-lg">
                <p className="font-bold">Ocurrió un error</p>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Recomendaciones de IA para <span className="text-indigo-600">{userProfile?.firstName}</span>
            </h1>
            <p className="text-gray-600 mb-8">
                Aquí tienes tus análisis y sugerencias personalizadas. Se actualizan automáticamente.
            </p>

            {recommendations.length > 0 ? (
                <div>
                    {recommendations.map((rec) => (
                        <RecommendationCard key={rec.id} recommendation={rec} />
                    ))}
                </div>
            ) : (
                <div className="text-center bg-gray-50 p-8 rounded-lg">
                    <h2 className="text-xl font-semibold text-gray-700">Aún no hay recomendaciones</h2>
                    <p className="text-gray-500 mt-2">
                        Completa algunas actividades para que nuestra IA pueda generar sugerencias para ti.
                    </p>
                </div>
            )}
        </div>
    );
};

export default RecommendationsPage;