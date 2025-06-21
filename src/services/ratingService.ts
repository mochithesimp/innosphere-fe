import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://103.163.24.72:8080';

// Interfaces for Rating Criteria
export interface RatingCriteriaModel {
    id: number;
    criteriaName: string;
    description?: string;
    criteriaType: string; // "Employer" or "Worker"
}
export interface CreateEmployerRatingDetailModel {
    ratingCriteriaId: number;
    score: number; // 0-5
}

export interface CreateEmployerRatingModel {
    jobApplicationId: number;
    employerId: number;
    comment?: string;
    details: CreateEmployerRatingDetailModel[];
}

// Interfaces for Rating Response
export interface EmployerRatingModel {
    id: number;
    jobApplicationId: number;
    employerId: number;
    ratingValue: number;
    comment?: string;
    createdAt: string;
}

export interface EmployerRatingCriteriaModel {
    id: number;
    employerRatingId: number;
    ratingCriteriaId: number;
    score: number;
    ratingCriteria: RatingCriteriaModel;
}

// Add worker rating interfaces
export interface CreateWorkerRatingDetailModel {
    ratingCriteriaId: number;
    score: number;
}

export interface CreateWorkerRatingModel {
    jobApplicationId: number;
    workerId: number;
    ratingValue: number;
    comment?: string;
    details: CreateWorkerRatingDetailModel[];
}

export interface WorkerRatingModel {
    id: number;
    jobApplicationId: number;
    workerId: number;
    ratingValue: number;
    comment?: string;
    createdAt: string;
}

export class RatingService {
    private static getAuthHeaders() {
        const token = localStorage.getItem('token') || localStorage.getItem('accessToken');
        return {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };
    }

    // Rating Criteria Methods
    static async getAllRatingCriteria(): Promise<RatingCriteriaModel[]> {
        const response = await axios.get(`${API_BASE_URL}/api/ratingcriteria`, this.getAuthHeaders());
        return response.data;
    }

    static async getEmployerRatingCriteria(): Promise<RatingCriteriaModel[]> {
        const response = await axios.get(`${API_BASE_URL}/api/ratingcriteria/employer`, this.getAuthHeaders());
        return response.data;
    }

    static async getWorkerRatingCriteria(): Promise<RatingCriteriaModel[]> {
        const response = await axios.get(`${API_BASE_URL}/api/ratingcriteria/worker`, this.getAuthHeaders());
        return response.data;
    }

    // Employer Rating Methods (Worker rates Employer)
    static async createEmployerRating(ratingData: CreateEmployerRatingModel): Promise<EmployerRatingModel> {
        console.log('🌟 Creating employer rating:', ratingData);
        const response = await axios.post(`${API_BASE_URL}/api/employerrating`, ratingData, this.getAuthHeaders());
        return response.data;
    }

    static async getEmployerRatings(employerId: number): Promise<EmployerRatingModel[]> {
        const response = await axios.get(`${API_BASE_URL}/api/employerrating/employer/${employerId}`, this.getAuthHeaders());
        return response.data;
    }

    static async getEmployerRatingDetails(ratingId: number): Promise<EmployerRatingCriteriaModel[]> {
        const response = await axios.get(`${API_BASE_URL}/api/employerrating/${ratingId}/details`, this.getAuthHeaders());
        return response.data;
    }

    // New worker rating methods
    static async createWorkerRating(ratingData: CreateWorkerRatingModel): Promise<WorkerRatingModel> {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/workerrating`, ratingData, this.getAuthHeaders());
            return response.data;
        } catch (error) {
            console.error('Error creating worker rating:', error);
            throw error;
        }
    }
}

export default RatingService; 