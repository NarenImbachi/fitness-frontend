import { useActivities } from '../hooks/useActivities';
import ActivityList from '../components/ActivityList';

const ActivitiesPage = () => {
    const { activities, isLoading, error } = useActivities();

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Mis actividades</h1>

            {isLoading && <p>Cargando actividades...</p>}

            {error && <p className="text-red-500">{error}</p>}

            {!isLoading && !error && <ActivityList activities={activities} />}

            {/* Aquí añadiremos el formulario para crear una nueva actividad más adelante */}
        </div>
    );
};

export default ActivitiesPage;