import { useProfile } from '../hooks/useProfile';
import { useActivities } from '../hooks/useActivities';
import { Link } from 'react-router-dom';
import { FiUser, FiClipboard, FiZap, FiArrowRight, FiBarChart2 } from 'react-icons/fi';

const DashboardPage = () => {
    const { profile, isLoading: profileLoading } = useProfile();
    const { activities, isLoading: activitiesLoading } = useActivities();

    const recentActivities = activities.slice(0, 3);

    if (profileLoading || activitiesLoading) {
        return <div className="flex justify-center items-center h-screen">Cargando Dashboard...</div>;
    }

    return (
        <div className="bg-slate-50 min-h-screen">
            <div className="container mx-auto p-4 md:p-8">
                {/* --- Cabecera de Bienvenida --- */}
                <div className="mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-800">
                        Bienvenido de nuevo, <span className="text-blue-600">{profile?.firstName || 'User'}</span>!
                    </h1>
                    <p className="text-lg text-slate-500 mt-2">Listo para superar tus límites hoy?</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* --- Columna Principal (Actividades Recientes) --- */}
                    <div className="lg:col-span-2">
                        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
                            <div className="flex justify-between items-center mb-5">
                                <h2 className="text-2xl font-semibold text-slate-700">Actividades Recientes</h2>
                                <Link to="/activities" className="flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors">
                                    Ver todas <FiArrowRight className="ml-2" />
                                </Link>
                            </div>
                            {recentActivities.length > 0 ? (
                                <ul className="space-y-4">
                                    {recentActivities.map(activity => (
                                        <li key={activity.id} className="flex items-center p-4 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors">
                                            <div className="p-3 bg-blue-100 text-blue-600 rounded-full mr-4">
                                                <FiBarChart2 size={24} />
                                            </div>
                                            <div className="flex-grow">
                                                <p className="font-bold text-slate-800">{activity.type}</p>
                                                <p className="text-sm text-slate-500">{activity.duration} min - {new Date(activity.startTime).toLocaleDateString()}</p>
                                            </div>
                                            <span className="text-green-600 font-semibold text-lg">{activity.caloriesBurned} kcal</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="text-center py-10">
                                    <p className="text-slate-500 mb-4">No tienes actividades registradas.</p>
                                    <Link to="/activities/new" className="bg-blue-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-700 transition-transform hover:scale-105">
                                        Agregar Actividad
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* --- Columna Lateral (Accesos Rápidos) --- */}
                    <div className="lg:col-span-1 space-y-8">
                        <QuickAccessCard
                            to="/profile"
                            icon={<FiUser size={28} />}
                            title="Mi Perfil"
                            description="Mira y edita tu información."
                            color="blue"
                        />
                        <QuickAccessCard
                            to="/activities"
                            icon={<FiClipboard size={28} />}
                            title="Registrar Actividad"
                            description="Agrega un nuevo entrenamiento."
                            color="green"
                        />
                        <QuickAccessCard
                            to="/recommendations"
                            icon={<FiZap size={28} />}
                            title="Obtener Recomendaciones"
                            description="Ideas de la IA para tus rutinas."
                            color="purple"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

// Componente auxiliar para las tarjetas de acceso rápido
const QuickAccessCard = ({ to, icon, title, description, color }: { to: string, icon: React.ReactNode, title: string, description: string, color: 'blue' | 'green' | 'purple' }) => {
    const colors = {
        blue: 'from-blue-500 to-blue-600',
        green: 'from-green-500 to-green-600',
        purple: 'from-purple-500 to-purple-600',
    };

    return (
        <Link to={to} className={`block p-6 rounded-xl text-white bg-gradient-to-br ${colors[color]} shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300`}>
            <div className="flex items-center mb-2">
                {icon}
                <h3 className="font-bold text-xl ml-3">{title}</h3>
            </div>
            <p className="text-sm opacity-90">{description}</p>
        </Link>
    );
};

export default DashboardPage;