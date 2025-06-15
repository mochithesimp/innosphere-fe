import { get, post } from '../utils/request';
import { getUserIdFromToken, isTokenExpired } from '../utils/auth';

// Import the getTokenFromStorage from auth utility to avoid duplication
const getTokenFromStorage = (): string | null => {
    // Try different possible token key names
    const possibleKeys = ['accessToken', 'token', 'authToken', 'jwt', 'bearerToken', 'access_token'];

    for (const key of possibleKeys) {
        const token = localStorage.getItem(key);
        if (token) {
            console.log(`✅ Service found token under key: ${key}`);
            return token;
        }
    }

    console.log('❌ Service could not find token in localStorage');
    console.log('Available localStorage keys:', Object.keys(localStorage));
    return null;
};

// Social Link Interface
export interface SocialLinkModel {
    userId: string;
    platform: 'Facebook' | 'Twitter' | 'Instagram' | 'Youtube';
    url: string;
}

// Worker Profile Interface
export interface WorkerProfileModel {
    fullName: string;
    avatarUrl: string;
    address: string;
    phoneNumber: string;
    skills: string;
    bio: string;
    education: string;
    experience: string;
    socialLinks: SocialLinkModel[];
}

// Worker service class
export class WorkerService {
    private static readonly BASE_URL = '/api/Worker';

    /**
     * Get worker profile
     * @returns Promise<WorkerProfileModel | null>
     */
    static async getWorkerProfile(): Promise<WorkerProfileModel | null> {
        try {
            const token = getTokenFromStorage();
            if (!token || isTokenExpired()) {
                console.warn('No valid token found');
                return null;
            }

            const response = await get(`${this.BASE_URL}/profile`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return response;
        } catch (error) {
            console.error('Error fetching worker profile:', error);
            return null;
        }
    }

    /**
     * Create or update worker profile
     * @param profileData Worker profile data
     * @returns Promise<WorkerProfileModel | null>
     */
    static async createOrUpdateWorkerProfile(profileData: WorkerProfileModel): Promise<WorkerProfileModel | null> {
        try {
            console.log('🚀 Starting worker profile creation/update...');

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
            console.log('✅ User ID type:', typeof userId);

            // Debug original social links
            console.log('📋 Original social links before userId assignment:', profileData.socialLinks);

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

            console.log('📋 Final social links with userId:', updatedSocialLinks);

            console.log('📤 Sending data to API:');
            console.log('URL:', `${this.BASE_URL}/profile`);
            console.log('Headers:', {
                'Authorization': `Bearer ${token.substring(0, 20)}...`,
                'Content-Type': 'application/json'
            });
            console.log('Payload:', JSON.stringify(updatedProfileData, null, 2));

            const response = await post(`${this.BASE_URL}/profile`, updatedProfileData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log('📥 API Response:');
            console.log('Status:', response.status);
            console.log('Data:', response.data);
            console.log('Full response:', response);

            return response.data;
        } catch (error: unknown) {
            console.error('❌ Error creating/updating worker profile:');
            console.error('Error object:', error);

            // Log specific error details
            if (error && typeof error === 'object' && 'response' in error) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const axiosError = error as any;
                console.error('API Error Response:');
                console.error('Status:', axiosError.response?.status);
                console.error('Status Text:', axiosError.response?.statusText);
                console.error('Headers:', axiosError.response?.headers);
                console.error('Data:', axiosError.response?.data);
            } else if (error && typeof error === 'object' && 'request' in error) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const axiosError = error as any;
                console.error('Network Error - No response received:');
                console.error('Request:', axiosError.request);
            } else if (error instanceof Error) {
                console.error('Error message:', error.message);
            }

            throw error;
        }
    }
}

export default WorkerService; 