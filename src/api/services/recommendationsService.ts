import type { Recommendation } from "../../types";
import apiClient from "../apiClient";


export const getRecommendationsByUser = async (userId: string): Promise<Recommendation[]> => {
    const response = await apiClient.get<Recommendation[]>(`/api/recommendations/user/${userId}`);
    return response.data;
};
