import React from 'react';
import type { Recommendation } from '../types';

interface RecommendationCardProps {
    recommendation: Recommendation;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation }) => {

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
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6 border border-gray-200">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                    Recomendación para: <span className="text-indigo-600">{recommendation.activityType}</span>
                </h3>
                <span className="text-sm text-gray-500">{formatDate(recommendation.createdAt)}</span>
            </div>

            <div className="mb-4">
                <p className="text-gray-700">{recommendation.recommendation}</p>
            </div>

            {recommendation.improvements && recommendation.improvements.length > 0 && (
                <div className="mb-4">
                    <h4 className="font-semibold text-gray-700 mb-2">Puntos de Mejora:</h4>
                    <ul className="list-disc list-inside pl-4 text-gray-600 space-y-1">
                        {recommendation.improvements.map((item, index) => (
                            <li key={`improvement-${index}`}>{item}</li>
                        ))}
                    </ul>
                </div>
            )}

            {recommendation.suggestions && recommendation.suggestions.length > 0 && (
                <div className="mb-4">
                    <h4 className="font-semibold text-gray-700 mb-2">Sugerencias:</h4>
                    <ul className="list-disc list-inside pl-4 text-gray-600 space-y-1">
                        {recommendation.suggestions.map((item, index) => (
                            <li key={`suggestion-${index}`}>{item}</li>
                        ))}
                    </ul>
                </div>
            )}

            {recommendation.safety && recommendation.safety.length > 0 && (
                <div>
                    <h4 className="font-semibold text-red-700 mb-2">¡Seguridad Primero!</h4>
                    <ul className="list-disc list-inside pl-4 text-red-600 space-y-1">
                        {recommendation.safety.map((item, index) => (
                            <li key={`safety-${index}`}>{item}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default RecommendationCard;