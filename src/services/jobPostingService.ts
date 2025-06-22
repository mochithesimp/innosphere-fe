import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://103.163.24.72';

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
    tagIds?: number[];
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

export interface JobPostingListItem {
    id: number;
    employerId: number;
    companyName?: string;
    companyLogoUrl?: string;
    businessTypeId?: number;
    businessTypeName?: string;
    subscriptionId: number;
    cityId?: number;
    cityName?: string;
    title: string;
    description?: string;
    location: string;
    startTime?: string;
    endTime?: string;
    hourlyRate?: number;
    jobType: string;
    requirements?: string;
    postedAt: string;
    expiresAt?: string;
    status: string;
    isUrgent: boolean;
    isHighlighted: boolean;
    viewsCount: number;
    applicationsCount: number;
    jobTags: Array<{
        id: number;
        name: string;
        description?: string;
    }>;
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

    static async getJobPostingsByEmployer(employerId: number, status?: string): Promise<JobPostingListItem[]> {
        const url = status
            ? `${API_BASE_URL}/api/jobposting/employer/${employerId}?status=${status}`
            : `${API_BASE_URL}/api/jobposting/employer/${employerId}`;

        const response = await axios.get(url, this.getAuthHeaders());
        return response.data;
    }

    static async closeJobPosting(jobId: number): Promise<boolean> {
        try {
            await axios.put(`${API_BASE_URL}/api/jobposting/${jobId}/close`, {}, this.getAuthHeaders());
            return true;
        } catch (error) {
            console.error('Error closing job posting:', error);
            return false;
        }
    }

    static async rejectJobPosting(jobId: number): Promise<boolean> {
        try {
            await axios.put(`${API_BASE_URL}/api/jobposting/${jobId}/reject`, {}, this.getAuthHeaders());
            return true;
        } catch (error) {
            console.error('Error rejecting job posting:', error);
            return false;
        }
    }
} 