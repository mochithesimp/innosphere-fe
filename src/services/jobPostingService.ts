import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://localhost:7085';

export interface CreateJobPostingModel {
    employerId: number;
    subscriptionId: number;
    cityId: number;
    title: string;
    description: string;
    location: string;
    startTime: string;
    endTime: string;
    hourlyRate: number;
    jobType: string;
    requirements: string;
    expiresAt: string;
    isUrgent: boolean;
    isHighlighted: boolean;
    tagIds: number[];
}

export interface JobPostingResponse {
    id: number;
    title: string;
    description: string;
    location: string;
    hourlyRate: number;
    jobType: string;
    isUrgent: boolean;
    isHighlighted: boolean;
    createdAt: string;
}

export class JobPostingService {
    private static getAuthHeaders() {
        const token = localStorage.getItem('token') || localStorage.getItem('accessToken');
        return {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };
    }

    static async createJobPosting(jobData: CreateJobPostingModel): Promise<JobPostingResponse> {
        const response = await axios.post(`${API_BASE_URL}/api/jobposting`, jobData, this.getAuthHeaders());
        return response.data;
    }
} 