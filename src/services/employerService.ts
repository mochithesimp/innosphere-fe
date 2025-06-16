import axios from 'axios';

const API_BASE_URL = 'https://localhost:7085/api';

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
    id: string;
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
        const response = await axios.get(`${API_BASE_URL}/employer/profile`, this.getAuthHeaders());
        return response.data;
    }

    static async createProfile(profileData: EmployerEditModel): Promise<EmployerProfileResponse> {
        const response = await axios.post(`${API_BASE_URL}/employer/profile`, profileData, this.getAuthHeaders());
        return response.data;
    }

    static async updateProfile(profileData: EmployerEditModel): Promise<EmployerProfileResponse> {
        const response = await axios.put(`${API_BASE_URL}/employer/profile`, profileData, this.getAuthHeaders());
        return response.data;
    }
} 