import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://localhost:7085';

export interface CreateJobApplicationModel {
    jobPostingId: number;
    resumeId: number;
    coverNote: string;
}

export interface JobApplicationResponse {
    id: number;
    jobPostingId: number;
    resumeId: number;
    workerId: number;
    coverNote: string;
    status: string;
    appliedAt: string;
    createdAt?: string;
    updatedAt?: string;
}

export class JobApplicationService {
    private static getAuthHeaders() {
        const token = localStorage.getItem('token') || localStorage.getItem('accessToken');
        return {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };
    }

    static async applyForJob(applicationData: CreateJobApplicationModel): Promise<JobApplicationResponse> {
        const response = await axios.post(`${API_BASE_URL}/api/jobapplication/apply`, applicationData, this.getAuthHeaders());
        return response.data;
    }

    static async getJobApplications(): Promise<JobApplicationResponse[]> {
        const response = await axios.get(`${API_BASE_URL}/api/jobapplication`, this.getAuthHeaders());
        return response.data;
    }

    static async getJobApplicationById(id: number): Promise<JobApplicationResponse> {
        const response = await axios.get(`${API_BASE_URL}/api/jobapplication/${id}`, this.getAuthHeaders());
        return response.data;
    }

    static async updateJobApplicationStatus(id: number, status: string): Promise<JobApplicationResponse> {
        const response = await axios.put(`${API_BASE_URL}/api/jobapplication/${id}/status`, { status }, this.getAuthHeaders());
        return response.data;
    }

    static async deleteJobApplication(id: number): Promise<void> {
        await axios.delete(`${API_BASE_URL}/api/jobapplication/${id}`, this.getAuthHeaders());
    }
} 