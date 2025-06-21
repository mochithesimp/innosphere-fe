import axios from 'axios';

// PRIMARY: Deployed API | FALLBACK: Set VITE_API_BASE_URL=https://localhost:7085 for local development
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://103.163.24.72:8080';

export interface SubscriptionData {
    employerId: number;
    subscriptionPackageId: number;
    startDate: string;
    endDate: string;
    amountPaid: number;
    paymentStatus: string;
    transactionId: string;
}

export interface EmployerProfile {
    employerId: number;
    userId: string;
    companyName: string;
    description: string;
    website: string;
    industry: string;
    companySize: string;
    location: string;
    contactEmail: string;
    contactPhone: string;
    isVerified: boolean;
}

export interface Subscription {
    id: number;
    employerId: number;
    subscriptionPackageId: number;
    startDate: string;
    endDate: string;
    isActive: boolean;
    amountPaid: number;
    paymentStatus: string;
    transactionId: string;
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

    static async getEmployerProfile(): Promise<EmployerProfile | null> {
        const response = await axios.get(`${API_BASE_URL}/api/employer/profile`, this.getAuthHeaders());
        return response.data;
    }

    static async purchaseSubscription(subscriptionData: SubscriptionData): Promise<Subscription> {
        const response = await axios.post(`${API_BASE_URL}/api/subscription/purchase`, subscriptionData, this.getAuthHeaders());
        return response.data;
    }

    static async getSubscriptionsByEmployer(employerId: number): Promise<Subscription[]> {
        const response = await axios.get(`${API_BASE_URL}/api/subscription/employer/${employerId}`, this.getAuthHeaders());
        return response.data;
    }

    static async canEmployerPost(employerId: number): Promise<boolean> {
        const response = await axios.get(`${API_BASE_URL}/api/subscription/employer/${employerId}/canpost`, this.getAuthHeaders());
        return response.data;
    }
} 