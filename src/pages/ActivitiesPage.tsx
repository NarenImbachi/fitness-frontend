import { useActivities } from '../hooks/useActivities';
import ActivityList from '../components/ActivityList';
import ActivityForm from '../components/ActivityForm';
import { FiLoader } from 'react-icons/fi';

const ActivitiesPage = () => {
    const { activities, isLoading, error, addActivity, isSubmitting } = useActivities();

    return (
        <div className="container mx-auto p-4 md:p-8 bg-slate-50 min-h-screen">
            <div className="mb-10">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-800">Registro de Actividad</h1>
                <p className="text-lg text-slate-500 mt-2">Aquí puedes registrar y ver todos tus entrenamientos.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Columna Principal: Lista de Actividades */}
                <div className="lg:col-span-2">
                    {isLoading && (
                        <div className="flex justify-center items-center h-64">
                            <FiLoader className="animate-spin text-blue-600" size={40} />
                            <p className="ml-4 text-slate-600">Cargando actividades...</p>
                        </div>
                    )}
                    {error && <p className="text-red-500 bg-red-100 p-4 rounded-lg">{error}</p>}
                    {!isLoading && !error && <ActivityList activities={activities} />}
                </div>

                {/* Columna Lateral: Formulario para Añadir Actividad */}
                <div className="lg:col-span-1">
                    <ActivityForm onSubmit={addActivity} isSubmitting={isSubmitting} />
                </div>
            </div>
        </div>
    );
};

export default ActivitiesPage;