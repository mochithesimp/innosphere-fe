import axios from 'axios';

const API_BASE_URL = 'https://localhost:7085/api';

export interface CreateSubscriptionModel {
    employerId: number | string; // Allow both number and string to handle GUID/int mismatch
    subscriptionPackageId: number;
    startDate: string;
    endDate: string;
    amountPaid: number;
    paymentStatus: string;
    transactionId: string;
}

export interface SubscriptionResponse {
    id: number;
    employerId: number;
    subscriptionPackageId: number;
    startDate: string;
    endDate: string;
    amountPaid: number;
    paymentStatus: string;
    transactionId: string;
    isActive: boolean;
}

export class SubscriptionService {
    private static getAuthHeaders() {
        const token = localStorage.getItem('token') || localStorage.getItem('accessToken');
        return {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };
    }

    static async getEmployerProfile(): Promise<any> {
        const response = await axios.get(`${API_BASE_URL}/employer/profile`, this.getAuthHeaders());
        return response.data;
    }

    static async purchaseSubscription(subscriptionData: CreateSubscriptionModel): Promise<SubscriptionResponse> {
        const response = await axios.post(`${API_BASE_URL}/subscription/purchase`, subscriptionData, this.getAuthHeaders());
        return response.data;
    }

    static async getSubscriptionsByEmployer(employerId: number): Promise<SubscriptionResponse[]> {
        const response = await axios.get(`${API_BASE_URL}/subscription/employer/${employerId}`, this.getAuthHeaders());
        return response.data;
    }

    static async canPost(employerId: number): Promise<boolean> {
        const response = await axios.get(`${API_BASE_URL}/subscription/employer/${employerId}/canpost`, this.getAuthHeaders());
        return response.data;
    }
} 