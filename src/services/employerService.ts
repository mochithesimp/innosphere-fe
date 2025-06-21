import axios from 'axios';

// PRIMARY: Deployed API | FALLBACK: Set VITE_API_BASE_URL=https://localhost:7085 for local development
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://103.163.24.72:8080';

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

export class EmployerService {
    private static getAuthHeaders() {
        const token = localStorage.getItem('token');
        return {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };
    }

    static async getProfile(): Promise<EmployerProfileResponse> {
        const response = await axios.get(`${API_BASE_URL}/api/employer/profile`, this.getAuthHeaders());
        return response.data;
    }

    static async createProfile(profileData: EmployerEditModel): Promise<EmployerProfileResponse> {
        const response = await axios.post(`${API_BASE_URL}/api/employer/profile`, profileData, this.getAuthHeaders());
        return response.data;
    }

    static async updateProfile(profileData: EmployerEditModel): Promise<EmployerProfileResponse> {
        const response = await axios.put(`${API_BASE_URL}/api/employer/profile`, profileData, this.getAuthHeaders());
        return response.data;
    }
} 