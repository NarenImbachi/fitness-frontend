import { useProfile } from '../hooks/useProfile';

const ProfilePage = () => {
    const { profile, isLoading, error } = useProfile();

    if (isLoading) {
        return <div className="text-center mt-8">Loading profile...</div>;
    }

    if (error) {
        return <div className="text-center mt-8 text-red-500">Error: {error}</div>;
    }

    if (!profile) {
        return <div className="text-center mt-8">No profile data found.</div>;
    }

    return (
        <div className="container mx-auto p-4 mt-8 max-w-2xl">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">User Profile</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                        <div>
                            <p className="font-semibold">First Name:</p>
                            <p>{profile.firstName}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Last Name:</p>
                            <p>{profile.lastName}</p>
                        </div>
                        <div className="md:col-span-2">
                            <p className="font-semibold">Email:</p>
                            <p>{profile.email}</p>
                        </div>
                        <div className="md:col-span-2">
                            <p className="font-semibold">Member Since:</p>
                            <p>{new Date(profile.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;