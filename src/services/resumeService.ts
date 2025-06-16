import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://localhost:7085';

export interface ResumeModel {
    id: number;
    workerId: number;
    title: string;
    urlCvs: string;
    fileType: string;
    fileSize: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateResumeModel {
    workerId: number;
    title: string;
    urlCvs: string;
    fileType: string;
    fileSize: number;
}

export interface WorkerProfileResponse {
    workerId: number;
    userId: string;
    fullName?: string;
    avatarUrl?: string;
    address?: string;
    phoneNumber?: string;
    skills?: string;
    bio?: string;
    education?: string;
    experience?: string;
}

export class ResumeService {
    private static getAuthHeaders() {
        const token = localStorage.getItem('token') || localStorage.getItem('accessToken');
        return {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };
    }

    static async getWorkerProfile(): Promise<WorkerProfileResponse> {
        const response = await axios.get(`${API_BASE_URL}/api/worker/profile`, this.getAuthHeaders());
        return response.data;
    }

    static async getResumesByWorker(workerId: number): Promise<ResumeModel[]> {
        const response = await axios.get(`${API_BASE_URL}/api/resume/worker/${workerId}`, this.getAuthHeaders());
        return response.data;
    }

    static async createResume(resumeData: CreateResumeModel): Promise<ResumeModel> {
        const response = await axios.post(`${API_BASE_URL}/api/resume`, resumeData, this.getAuthHeaders());
        return response.data;
    }

    static async deleteResume(resumeId: number): Promise<void> {
        await axios.delete(`${API_BASE_URL}/api/resume/${resumeId}`, this.getAuthHeaders());
    }

    static async updateResume(resumeId: number, resumeData: Partial<CreateResumeModel>): Promise<ResumeModel> {
        const response = await axios.put(`${API_BASE_URL}/api/resume/${resumeId}`, resumeData, this.getAuthHeaders());
        return response.data;
    }

    // Helper function to format file size
    static formatFileSize(bytes: number): string {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }

    // Helper function to extract file type from filename
    static getFileTypeFromName(filename: string): string {
        const extension = filename.split('.').pop();
        return extension ? extension.toUpperCase() : 'UNKNOWN';
    }
} 