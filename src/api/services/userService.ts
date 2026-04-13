import type { UpdateUserRequest, UserProfile } from "../../types";
import apiClient, { publicApiClient } from "../apiClient";


export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}


export const registerUser = async (data: RegisterData) => {
  try {
    // Usamos la instancia pública que no tiene el interceptor de token
    const response = await publicApiClient.post('/api/users/register', data);
    return response.data;
  } catch (error) {
    console.error('Error during user registration:', error);
    throw error;
  }
};

export const getUserProfile = async (): Promise<UserProfile> => {
  try {
    // La URL ahora es relativa a la baseURL del apiClient
    const response = await apiClient.get('/api/users/profile');
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (profileData: UpdateUserRequest): Promise<UserProfile> => {
  try {
    const response = await apiClient.put('/api/users/profile', profileData);
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};