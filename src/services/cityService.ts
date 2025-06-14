import { get } from '../utils/request';

// Interface for City response
export interface CityApiResponse {
    id: number;
    cityName: string;
    country: string;
}

// City service class
export class CityService {
    private static readonly BASE_URL = '/api/City';

    /**
     * Get all active cities
     * @returns Promise<CityApiResponse[]>
     */
    static async getActiveCities(): Promise<CityApiResponse[]> {
        try {
            const response = await get(`${this.BASE_URL}/active`);
            return response || [];
        } catch (error) {
            console.error('Error fetching cities:', error);
            return [];
        }
    }

    /**
     * Get city by ID
     * @param id City ID
     * @returns Promise<CityApiResponse | null>
     */
    static async getCityById(id: number): Promise<CityApiResponse | null> {
        try {
            const response = await get(`${this.BASE_URL}/${id}`);
            return response;
        } catch (error) {
            console.error('Error fetching city:', error);
            return null;
        }
    }
}

export default CityService; 