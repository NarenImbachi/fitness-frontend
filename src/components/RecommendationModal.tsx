import React from 'react';
import RecommendationCard from './RecommendationCard';
import type { Recommendation } from '../types';

interface RecommendationModalProps {
    isOpen: boolean;
    onClose: () => void;
    recommendation: Recommendation | null;
    isLoading: boolean;
    error: string | null;
}

const RecommendationModal: React.FC<RecommendationModalProps> = ({ isOpen, onClose, recommendation, isLoading, error }) => {
    if (!isOpen) {
        return null;
    }

    return (
        // 1. Fondo con desenfoque y opacidad reducida
        <div
            className="fixed inset-0 bg-transparent bg-opacity-25 backdrop-blur-sm z-50 flex justify-center items-center p-4"
            onClick={onClose}
        >
            {/* 2. Contenedor del modal con altura máxima y layout flex para permitir scroll interno */}
            <div
                className="bg-gray-50 rounded-lg shadow-xl w-full max-w-2xl relative flex flex-col max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Encabezado Fijo */}
                <div className="flex-shrink-0 p-6 border-b border-gray-200">
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold z-10"
                        aria-label="Cerrar"
                    >
                        &times;
                    </button>
                    <h2 className="text-2xl font-bold text-gray-800 text-center">Análisis de la Actividad</h2>
                </div>

                {/* 3. Área de contenido desplazable */}
                <div className="flex-grow overflow-y-auto p-6">
                    {isLoading && (
                        <div className="flex justify-center items-center h-48">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-500"></div>
                        </div>
                    )}

                    {error && (
                        <div className="text-center text-red-600 bg-red-100 p-4 rounded-lg">
                            <p className="font-bold">No se pudo cargar la recomendación</p>
                            <p className="text-sm">{error}</p>
                        </div>
                    )}

                    {recommendation && !isLoading && (
                        // Pasamos la RecommendationCard aquí dentro
                        <RecommendationCard recommendation={recommendation} />
                    )}

                    {!recommendation && !isLoading && !error && (
                        <div className="text-center text-gray-500 bg-gray-100 p-6 rounded-lg">
                            <p className="font-semibold">No se encontró una recomendación para esta actividad.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RecommendationModal;