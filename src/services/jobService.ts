import { get } from '../utils/request';

// Interface for API response
export interface JobPostingApiResponse {
    id: number;
    title: string;
    companyName: string;
    companyLogoUrl: string;
    startTime: string;
    endTime: string;
    hourlyRate: number;
    location: string;
    postedAt: string;
    jobType: string;
    description?: string;
    requirements?: string;
    status: string;
    isUrgent: boolean;
    isHighlighted: boolean;
    viewsCount: number;
    applicationsCount: number;
    cityId: number | null;
    cityName: string | null;
}

// Interface for paginated response (matching backend PagedResultModel)
export interface JobPostingPaginatedResponse {
    data: JobPostingApiResponse[];
    totalCount: number;
    page: number;
    pageSize: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}

// Interface for search filters
export interface JobSearchFilters {
    keyword?: string;
    cityId?: number;
    category?: string;
    // Add more filters as needed in the future
}

// Job service class
export class JobService {
    private static readonly BASE_URL = '/api/JobPosting';

    /**
     * Build query string from filters
     * @param filters Search filters object
     * @returns URL query string
     */
    private static buildQueryString(filters: JobSearchFilters): string {
        const params = new URLSearchParams();

        if (filters.keyword) {
            params.append('Keyword', filters.keyword);
        }

        if (filters.cityId) {
            params.append('CityId', filters.cityId.toString());
        }

        return params.toString();
    }

    /**
     * Get job postings with pagination and filters
     * @param page Page number (default: 1)
     * @param pageSize Number of items per page (default: 10)
     * @param filters Search filters
     * @returns Promise<JobPostingPaginatedResponse>
     */
    static async getJobPostings(
        page: number = 1,
        pageSize: number = 10,
        filters: JobSearchFilters = {}
    ): Promise<JobPostingPaginatedResponse> {
        try {
            const queryFilters = this.buildQueryString(filters);
            const paginationParams = `Page=${page}&PageSize=${pageSize}`;
            const fullQuery = queryFilters
                ? `${paginationParams}&${queryFilters}`
                : paginationParams;

            const response = await get(`${this.BASE_URL}?${fullQuery}`);
            return response;
        } catch (error) {
            console.error('Error fetching job postings:', error);
            throw new Error('Failed to fetch job postings');
        }
    }

    /**
     * Get job postings for homepage (first 5 items)
     * @returns Promise<JobPostingApiResponse[]>
     */
    static async getHomepageJobs(): Promise<JobPostingApiResponse[]> {
        try {
            const response = await this.getJobPostings(1, 20); // Fetch more to account for filtering
            // Filter out jobs with REJECTED and PENDING status
            const filteredJobs = (response.data || []).filter(job =>
                job.status !== 'REJECTED' && job.status !== 'PENDING'
            );
            // Return only the first 5 valid jobs
            return filteredJobs.slice(0, 5);
        } catch (error) {
            console.error('Error fetching homepage jobs:', error);
            return [];
        }
    }

    /**
     * Search jobs with keyword
     * @param keyword Search keyword
     * @param page Page number (default: 1)
     * @param pageSize Number of items per page (default: 6)
     * @returns Promise<JobPostingPaginatedResponse>
     */
    static async searchJobs(
        keyword: string,
        page: number = 1,
        pageSize: number = 6
    ): Promise<JobPostingPaginatedResponse> {
        return this.getJobPostings(page, pageSize, { keyword });
    }

    /**
     * Get job posting by ID
     * @param id Job posting ID
     * @returns Promise<JobPostingApiResponse | null>
     */
    static async getJobPostingById(id: number): Promise<JobPostingApiResponse | null> {
        try {
            const response = await get(`${this.BASE_URL}/${id}`);
            return response;
        } catch (error) {
            console.error('Error fetching job posting:', error);
            return null;
        }
    }
}

export default JobService; 