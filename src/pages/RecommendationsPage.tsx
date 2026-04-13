import React from 'react';
import { useRecommendations } from '../hooks/useRecommendations';
import RecommendationCard from '../components/RecommendationCard';
import { useAuth } from '../hooks/useAuth';
import { FiLoader, FiAlertTriangle, FiCpu } from 'react-icons/fi';

const RecommendationsPage: React.FC = () => {
    const { recommendations, isLoading, error } = useRecommendations();
    const { userProfile } = useAuth();

    return (
        <div className="container mx-auto px-4 py-8 bg-slate-50 min-h-screen">
            <div className="mb-10">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-800">
                    Recomendaciones de IA
                </h1>
                <p className="text-lg text-slate-500 mt-2">
                    Análisis y sugerencias para <span className="font-semibold text-purple-600">{userProfile?.firstName}</span>, basados en tus actividades.
                </p>
            </div>

            {isLoading && (
                <div className="flex justify-center items-center h-64">
                    <FiLoader className="animate-spin text-purple-600" size={40} />
                    <p className="ml-4 text-slate-600">Generando análisis...</p>
                </div>
            )}

            {error && (
                <div className="text-center text-red-600 bg-red-100 p-6 rounded-lg">
                    <FiAlertTriangle className="mx-auto mb-2" size={30} />
                    <p className="font-bold">Ocurrió un error</p>
                    <p>{error}</p>
                </div>
            )}

            {!isLoading && !error && (
                <>
                    {recommendations.length > 0 ? (
                        <div className="space-y-8">
                            {recommendations.map((rec) => (
                                <RecommendationCard key={rec.id} recommendation={rec} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center bg-white p-12 rounded-xl shadow-md">
                            <FiCpu className="mx-auto text-slate-400" size={50} />
                            <h2 className="mt-6 text-2xl font-semibold text-slate-700">Aún no hay recomendaciones</h2>
                            <p className="text-slate-500 mt-2 max-w-md mx-auto">
                                Completa algunas actividades para que nuestra IA pueda analizar tu rendimiento y generar sugerencias personalizadas para ti.
                            </p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default RecommendationsPage;