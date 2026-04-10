import { useActivities } from '../hooks/useActivities';
import ActivityList from '../components/ActivityList';
import ActivityForm from '../components/ActivityForm'; // 1. Importa el formulario

const ActivitiesPage = () => {
    // 2. Obtiene las nuevas funciones y estados del hook
    const { activities, isLoading, error, addActivity, isSubmitting } = useActivities();

    return (
        <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
                <h1 className="text-3xl font-bold mb-6">My Activities</h1>
                {isLoading && <p>Loading activities...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!isLoading && !error && <ActivityList activities={activities} />}
            </div>
            <div>
                {/* 3. Renderiza el formulario y le pasa las props necesarias */}
                <ActivityForm onSubmit={addActivity} isSubmitting={isSubmitting} />
            </div>
        </div>
    );
};

export default ActivitiesPage;