import axios from 'axios';

// PRIMARY: Deployed API | FALLBACK: Set VITE_API_BASE_URL=http://localhost:7085 for local development
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://103.163.24.72:8080';

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

// Interface for worker profile from API
export interface WorkerProfileFromAPI {
    userId: string;
    skills?: string;
    bio?: string;
    education?: string;
    experience?: string;
    rating: number;
    totalRatings: number;
    verificationStatus: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
    contactLocation?: string;
    dateOfBirth?: string;
    gender?: string;
    maritalStatus?: string;
    nationality?: string;
    personalWebsite?: string;
    fullName?: string;
    email?: string;
    phoneNumber?: string;
    avatarUrl?: string;
    address?: string;
}

// Interface for the worker applications response
export interface WorkerJobApplicationsResponse {
    userName: string;
    applications: {
        id: number;
        jobPostingId: number;
        workerId: number; // Worker ID for rating
        jobPosting: {
            id: number;
            employerId: number;
            companyName: string;
            companyLogoUrl?: string;
            businessTypeId: number;
            businessTypeName: string;
            subscriptionId: number;
            cityId: number;
            cityName: string;
            title: string;
            description: string;
            location: string;
            startTime: string;
            endTime: string;
            hourlyRate: number;
            jobType: string;
            requirements: string;
            postedAt: string;
            expiresAt: string;
            status: string;
            isUrgent: boolean;
            isHighlighted: boolean;
            viewsCount: number;
            applicationsCount: number;
            jobTags: unknown[];
        };
        resumeId: number;
        appliedAt: string;
        status: string;
        coverNote: string;
        jobTitle: string;
        workerName: string;
        resumeTitle: string;
        workerProfile?: WorkerProfileFromAPI;
    }[];
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

    static async cancelJobApplication(id: number): Promise<JobApplicationResponse> {
        const response = await axios.put(`${API_BASE_URL}/api/jobapplication/${id}/cancel`, {}, this.getAuthHeaders());
        return response.data;
    }

    // New method to get worker applications
    static async getWorkerApplications(): Promise<WorkerJobApplicationsResponse> {
        const response = await axios.get(`${API_BASE_URL}/api/jobapplication/worker`, this.getAuthHeaders());
        return response.data;
    }

    // New method to get job applications for employer by job posting ID
    static async getEmployerJobApplications(jobPostingId: number): Promise<WorkerJobApplicationsResponse> {
        const response = await axios.get(`${API_BASE_URL}/api/jobapplication/employer?jobPostingId=${jobPostingId}`, this.getAuthHeaders());
        return response.data;
    }
} 