import type { Activity } from "../types";

// Componente para mostrar la lista de actividades, recibe un array de actividades como prop
interface ActivityListProps {
    activities: Activity[];
}

// Componente funcional que renderiza la lista de actividades
const ActivityList = ({ activities }: ActivityListProps) => {
    if (activities.length === 0) {
        return <p className="text-gray-500">No activities recorded yet. Add your first one!</p>;
    }

    return (
        <div className="space-y-4">
            {activities.map((activity) => (
                <div key={activity.id} className="bg-white p-4 rounded-lg shadow-md">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-bold text-blue-600">{activity.type}</h3>
                        <span className="text-sm text-gray-500">
                            {new Date(activity.startTime).toLocaleDateString()}
                        </span>
                    </div>
                    <div className="mt-2 text-gray-700">
                        <p>Duration: {activity.duration} minutes</p>
                        <p>Calories Burned: {activity.caloriesBurned}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ActivityList;