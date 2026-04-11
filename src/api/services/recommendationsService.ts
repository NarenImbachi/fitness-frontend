import type { Recommendation } from "../../types";
import apiClient from "../apiClient";


export const getRecommendationsByUser = async (userId: string): Promise<Recommendation[]> => {
    const response = await apiClient.get<Recommendation[]>(`/api/recommendations/user/${userId}`);
    return response.data;
};

export const getRecommendationByActivity = async (activityId: string): Promise<Recommendation> => {
    const response = await apiClient.get<Recommendation>(`/api/recommendations/activity/${activityId}`);
    return response.data;
};
