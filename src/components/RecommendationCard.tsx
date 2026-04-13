import React, { useState } from 'react';
import type { Recommendation } from '../types';
import { FiBarChart2, FiCalendar, FiMessageSquare, FiTrendingUp, FiCheckCircle, FiShield, FiChevronDown, FiChevronUp } from 'react-icons/fi';

interface RecommendationCardProps {
    recommendation: Recommendation;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation }) => {
    // 1. Estado para controlar si la tarjeta está expandida o no
    const [isExpanded, setIsExpanded] = useState(false);

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-slate-200 transition-shadow hover:shadow-2xl">
            {/* --- Encabezado Clickeable --- */}
            <div
                className="p-5 border-b border-slate-200 flex justify-between items-center cursor-pointer bg-slate-50 hover:bg-slate-100"
                onClick={() => setIsExpanded(!isExpanded)} // 2. Toggle para expandir/contraer
            >
                <div className="flex items-center">
                    <div className="p-2 bg-purple-100 text-purple-600 rounded-full mr-4">
                        <FiBarChart2 size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-800">
                            Análisis para: <span className="text-purple-600">{recommendation.activityType}</span>
                        </h3>
                        <p className="text-sm text-slate-500 flex items-center"><FiCalendar className="mr-2"/>{formatDate(recommendation.createdAt)}</p>
                    </div>
                </div>
                {/* 3. Icono que indica el estado (flecha arriba/abajo) */}
                <div className="text-purple-600">
                    {isExpanded ? <FiChevronUp size={24} /> : <FiChevronDown size={24} />}
                </div>
            </div>

            {/* --- Contenido Desplegable --- */}
            {/* 4. El contenido solo se muestra si isExpanded es true, con una transición suave */}
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isExpanded ? 'max-h-screen' : 'max-h-0'}`}>
                <div className="p-6 space-y-6">
                    {/* Análisis General */}
                    <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                        <h4 className="font-semibold text-blue-800 flex items-center mb-2"><FiMessageSquare className="mr-2"/>Análisis General de la IA</h4>
                        <p className="text-slate-700">{recommendation.recommendation}</p>
                    </div>

                    {/* Puntos de Mejora */}
                    {recommendation.improvements && recommendation.improvements.length > 0 && (
                        <div>
                            <h4 className="font-semibold text-slate-700 flex items-center mb-3"><FiTrendingUp className="mr-2 text-green-500"/>Puntos de Mejora</h4>
                            <ul className="space-y-2">
                                {recommendation.improvements.map((item, index) => (
                                    <li key={`improvement-${index}`} className="flex items-start">
                                        <FiCheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0"/>
                                        <span className="text-slate-600">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Sugerencias */}
                    {recommendation.suggestions && recommendation.suggestions.length > 0 && (
                         <div>
                            <h4 className="font-semibold text-slate-700 flex items-center mb-3"><FiCheckCircle className="mr-2 text-blue-500"/>Sugerencias Próximas</h4>
                            <ul className="space-y-2">
                                {recommendation.suggestions.map((item, index) => (
                                    <li key={`suggestion-${index}`} className="flex items-start">
                                        <FiCheckCircle className="text-blue-500 mr-3 mt-1 flex-shrink-0"/>
                                        <span className="text-slate-600">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Consejos de Seguridad */}
                    {recommendation.safety && recommendation.safety.length > 0 && (
                        <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                            <h4 className="font-semibold text-red-800 flex items-center mb-2"><FiShield className="mr-2"/>¡Seguridad Primero!</h4>
                            <ul className="space-y-2">
                                {recommendation.safety.map((item, index) => (
                                    <li key={`safety-${index}`} className="flex items-start">
                                        <FiShield className="text-red-500 mr-3 mt-1 flex-shrink-0"/>
                                        <span className="text-red-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RecommendationCard;