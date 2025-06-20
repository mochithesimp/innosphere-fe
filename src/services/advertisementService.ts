import request from "../utils/request";

// Advertisement Package Models
export interface AdvertisementPackageModel {
    id: number;
    packageName: string;
    description?: string;
    price: number;
    durationDays: number;
    maxImpressions?: number;
    adPosition: string;
    allowedAdTypes: string;
    isActive?: boolean;
}

// Advertisement Models
export interface CreateAdvertisementModel {
    employerId: number;
    advertisementPackageId: number;
    adTitle: string;
    adDescription: string;
    imageUrl: string;
    adPosition: string;
    startDate: string;
    endDate: string;
    price: number;
    maxImpressions?: number;
    transactionId: string;
}

export interface AdvertisementModel {
    id: number;
    employerId: number;
    advertisementPackageId: number;
    adTitle: string;
    adDescription: string;
    imageUrl: string;
    adPosition: string;
    adStatus: string;
    startDate: string;
    endDate: string;
    price: number;
    maxImpressions?: number;
    currentImpressions: number;
    transactionId: string;
    employerUserName?: string;
    employerFullName?: string;
}

export const AdvertisementService = {
    // Advertisement Package endpoints
    getAllActivePackages: async (): Promise<AdvertisementPackageModel[]> => {
        try {
            const response = await request.get('/api/advertisementpackage/active');
            return response.data || response;
        } catch (error) {
            console.error('Error fetching active advertisement packages:', error);
            throw error;
        }
    },

    getPackageById: async (id: number): Promise<AdvertisementPackageModel> => {
        try {
            const response = await request.get(`/api/advertisementpackage/${id}`);
            return response.data || response;
        } catch (error) {
            console.error('Error fetching advertisement package:', error);
            throw error;
        }
    },

    // Advertisement endpoints
    createAdvertisement: async (data: CreateAdvertisementModel): Promise<AdvertisementModel> => {
        try {
            const response = await request.post('/api/advertisement', data);
            return response.data || response;
        } catch (error) {
            console.error('Error creating advertisement:', error);
            throw error;
        }
    },

    getAdvertisementsByEmployer: async (employerId: number): Promise<AdvertisementModel[]> => {
        try {
            const response = await request.get(`/api/advertisement/employer/${employerId}`);
            return response.data || response;
        } catch (error) {
            console.error('Error fetching advertisements:', error);
            throw error;
        }
    },

    getActiveAdvertisementsByEmployer: async (employerId: number): Promise<AdvertisementModel[]> => {
        try {
            const response = await request.get(`/api/advertisement/employer/${employerId}/active`);
            return response.data || response;
        } catch (error) {
            console.error('Error fetching active advertisements:', error);
            throw error;
        }
    }
}; 