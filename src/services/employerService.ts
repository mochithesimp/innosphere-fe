import { getUserIdFromToken, isTokenExpired } from '../utils/auth';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://103.163.24.72';

export interface CreateSocialLinkModel {
    userId: string;
    platform: 'Facebook' | 'Twitter' | 'Instagram' | 'Youtube';
    url: string;
}

export interface EmployerEditModel {
    fullName?: string;
    avatarUrl?: string;
    address?: string;
    phoneNumber?: string;
    companyName: string;
    businessTypeId?: number;
    newBusinessTypeName?: string;
    newBusinessTypeDescription?: string;
    companyAddress?: string;
    taxCode?: string;
    companyDescription?: string;
    socialLinks: CreateSocialLinkModel[];
}

export interface EmployerProfileResponse {
    userId: string;
    fullName?: string;
    avatarUrl?: string;
    address?: string;
    email?: string;
    phoneNumber?: string;
    employerId: number;
    companyName: string;
    businessTypeId: number;
    companyAddress?: string;
    taxCode?: string;
    companyDescription?: string;
    rating: number;
    totalRatings: number;
    isVerified: boolean;
    createdAt: string;
    updatedAt?: string;
    socialLinks: CreateSocialLinkModel[];
}

// Token storage helper
const getTokenFromStorage = (): string | null => {
    return localStorage.getItem('token');
};

// Social Link Interface
export interface SocialLinkModel {
    userId: string;
    platform: 'Facebook' | 'Twitter' | 'Instagram' | 'Youtube' | 'LinkedIn' | 'GitHub' | 'Website';
    url: string;
}

// Employer Profile Interface
export interface EmployerProfileModel {
    fullName: string;
    avatarUrl: string;
    address: string;
    phoneNumber: string;
    companyName: string;
    businessTypeId: number;
    newBusinessTypeName: string;
    newBusinessTypeDescription: string;
    companyAddress: string;
    taxCode: string;
    companyDescription: string;
    socialLinks: SocialLinkModel[];
}

export class EmployerService {
    private static getAuthHeaders() {
        const token = getTokenFromStorage();
        return {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };
    }

    /**
     * Create employer profile
     * @param profileData Employer profile data
     * @returns Promise<EmployerProfileModel | null>
     */
    static async createProfile(profileData: EmployerEditModel): Promise<EmployerProfileModel | null> {
        try {
            console.log('🚀 Starting employer profile creation...');

            const token = getTokenFromStorage();
            console.log('🔑 Service getTokenFromStorage() result:', token ? `Token found (${token.substring(0, 20)}...)` : 'No token');

            if (!token) {
                console.error('❌ No token found by service');
                throw new Error('No valid authentication token found');
            }

            const tokenExpired = isTokenExpired();
            console.log('⏰ Token expired check:', tokenExpired);

            if (tokenExpired) {
                console.error('❌ Token is expired');
                throw new Error('Authentication token has expired');
            }

            console.log('✅ Token found and valid');

            // Get user ID from token and add to social links
            const userId = getUserIdFromToken();
            if (!userId) {
                throw new Error('Could not extract user ID from token');
            }
            console.log('✅ User ID extracted from JWT:', userId);

            // Update social links with correct user ID
            const updatedSocialLinks = profileData.socialLinks.map((link, index) => {
                console.log(`🔗 Processing social link ${index}:`, link);
                const updatedLink = {
                    ...link,
                    userId: userId
                };
                console.log(`✅ Updated social link ${index}:`, updatedLink);
                return updatedLink;
            });

            const updatedProfileData = {
                ...profileData,
                socialLinks: updatedSocialLinks
            };

            console.log('📤 Sending data to API (POST):');
            console.log('URL:', `${API_BASE_URL}/api/employer/profile`);
            console.log('Payload:', JSON.stringify(updatedProfileData, null, 2));

            const response = await axios.post(`${API_BASE_URL}/api/employer/profile`, updatedProfileData, this.getAuthHeaders());

            console.log('📥 API Response:', response.data);
            return response.data;
        } catch (error: unknown) {
            console.error('❌ Error creating employer profile:', error);
            throw error;
        }
    }

    /**
     * Get employer profile (alias for getEmployerProfile)
     * @returns Promise<EmployerProfileResponse | null>
     */
    static async getProfile(): Promise<EmployerProfileResponse | null> {
        const token = getTokenFromStorage();
        if (!token || isTokenExpired()) {
            console.warn('No valid token found');
            return null;
        }

        try {
            console.log('📞 Making GET request to:', `${API_BASE_URL}/api/employer/profile`);
            const response = await axios.get(`${API_BASE_URL}/api/employer/profile`, this.getAuthHeaders());
            console.log('✅ Successfully retrieved employer profile:', response.data);
            return response.data;
        } catch (error: unknown) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (error && typeof error === 'object' && 'response' in error) {
                const axiosError = error as { response?: { status?: number } };
                console.log('📊 API Error - Status:', axiosError.response?.status);
                if (axiosError.response?.status === 404) {
                    console.log('❌ Employer profile not found (404)');
                    return null;
                }
            }
            console.error('❌ Error fetching employer profile:', error);
            throw error;
        }
    }

    /**
     * Get employer profile
     * @returns Promise<EmployerProfileModel | null>
     */
    static async getEmployerProfile(): Promise<EmployerProfileModel | null> {
        const token = getTokenFromStorage();
        if (!token || isTokenExpired()) {
            console.warn('No valid token found');
            return null;
        }

        try {
            console.log('📞 Making GET request to:', `${API_BASE_URL}/api/employer/profile`);
            const response = await axios.get(`${API_BASE_URL}/api/employer/profile`, this.getAuthHeaders());
            console.log('✅ Successfully retrieved employer profile:', response.data);
            return response.data;
        } catch (error: unknown) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (error && typeof error === 'object' && 'response' in error) {
                const axiosError = error as { response?: { status?: number } };
                console.log('📊 API Error - Status:', axiosError.response?.status);
                if (axiosError.response?.status === 404) {
                    console.log('❌ Employer profile not found (404)');
                    return null;
                }
            }
            console.error('❌ Error fetching employer profile:', error);
            throw error;
        }
    }

    /**
     * Update employer profile
     * @param profileData Employer profile data
     * @returns Promise<EmployerProfileModel | null>
     */
    static async updateEmployerProfile(profileData: EmployerProfileModel): Promise<EmployerProfileModel | null> {
        try {
            console.log('🚀 Starting employer profile update...');

            const token = getTokenFromStorage();
            console.log('🔑 Service getTokenFromStorage() result:', token ? `Token found (${token.substring(0, 20)}...)` : 'No token');

            if (!token) {
                console.error('❌ No token found by service');
                throw new Error('No valid authentication token found');
            }

            const tokenExpired = isTokenExpired();
            console.log('⏰ Token expired check:', tokenExpired);

            if (tokenExpired) {
                console.error('❌ Token is expired');
                throw new Error('Authentication token has expired');
            }

            console.log('✅ Token found and valid');

            // Get user ID from token and add to social links
            const userId = getUserIdFromToken();
            if (!userId) {
                throw new Error('Could not extract user ID from token');
            }
            console.log('✅ User ID extracted from JWT:', userId);

            // Update social links with correct user ID
            const updatedSocialLinks = profileData.socialLinks.map((link, index) => {
                console.log(`🔗 Processing social link ${index}:`, link);
                const updatedLink = {
                    ...link,
                    userId: userId
                };
                console.log(`✅ Updated social link ${index}:`, updatedLink);
                return updatedLink;
            });

            const updatedProfileData = {
                ...profileData,
                socialLinks: updatedSocialLinks
            };

            console.log('📤 Sending data to API (PUT):');
            console.log('URL:', `${API_BASE_URL}/api/employer/profile`);
            console.log('Payload:', JSON.stringify(updatedProfileData, null, 2));

            const response = await axios.put(`${API_BASE_URL}/api/employer/profile`, updatedProfileData, this.getAuthHeaders());

            console.log('📥 API Response:', response.data);
            return response.data;
        } catch (error: unknown) {
            console.error('❌ Error updating employer profile:', error);
            throw error;
        }
    }
} 