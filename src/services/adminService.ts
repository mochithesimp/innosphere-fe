import request from "../utils/request";

// Advertisement Models
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

// JobPosting Models
export interface JobPostingModel {
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
    jobTags: JobTagModel[];
}

export interface JobTagModel {
    id: number;
    tagName: string;
    description?: string;
}

// Subscription Models
export interface SubscriptionModel {
    id: number;
    employerId: number;
    subscriptionPackageId: number;
    startDate: string;
    endDate: string;
    isActive: boolean;
    amountPaid: number;
    paymentStatus: string;
    transactionId: string;
    employerUserName?: string;
    employerFullName?: string;
    packageName?: string;
}

// Combined Package Data for display
export interface PackageDisplayData {
    id: string;
    name: string;
    serviceType: string;
    date: string;
    type: string;
    status: string;
    originalType: 'advertisement' | 'jobposting' | 'subscription';
    originalData: AdvertisementModel | JobPostingModel | SubscriptionModel;
}

export const AdminService = {
    // Get all advertisements for admin
    getAllAdvertisements: async (): Promise<AdvertisementModel[]> => {
        try {
            const response = await request.get('/api/advertisement/admin/all');
            return response.data || response;
        } catch (error) {
            console.error('Error fetching advertisements:', error);
            throw error;
        }
    },

    // Get all job postings for admin
    getAllJobPostings: async (): Promise<JobPostingModel[]> => {
        try {
            const response = await request.get('/api/jobposting/admin/all');
            return response.data || response;
        } catch (error) {
            console.error('Error fetching job postings:', error);
            throw error;
        }
    },

    // Get all subscriptions for admin
    getAllSubscriptions: async (): Promise<SubscriptionModel[]> => {
        try {
            const response = await request.get('/api/subscription/admin/all');
            return response.data || response;
        } catch (error) {
            console.error('Error fetching subscriptions:', error);
            throw error;
        }
    },

    // Update advertisement status
    updateAdvertisementStatus: async (id: number, action: 'approve' | 'reject'): Promise<boolean> => {
        try {
            const endpoint = action === 'approve' ? `/api/advertisement/${id}/approve` : `/api/advertisement/${id}/reject`;
            const response = await request.put(endpoint, {});
            return response !== null;
        } catch (error) {
            console.error('Error updating advertisement status:', error);
            throw error;
        }
    },

    // Update job posting status  
    updateJobPostingStatus: async (id: number, action: 'approve' | 'reject'): Promise<boolean> => {
        try {
            const endpoint = action === 'approve' ? `/api/jobposting/${id}/approve` : `/api/jobposting/${id}/reject`;
            const response = await request.put(endpoint, {});
            return response !== null;
        } catch (error) {
            console.error('Error updating job posting status:', error);
            throw error;
        }
    },

    // Convert raw data to display format
    convertToDisplayData: (
        advertisements: AdvertisementModel[],
        jobPostings: JobPostingModel[],
        subscriptions: SubscriptionModel[]
    ): PackageDisplayData[] => {
        const displayData: PackageDisplayData[] = [];

        // Convert advertisements
        advertisements.forEach(ad => {
            let type = 'Đầu trang';
            if (ad.adPosition === 'Sidebar') type = 'Giữa trang';
            else if (ad.adPosition === 'DetailPage') type = 'Cuối trang';

            let status = 'Đang chờ';
            if (ad.adStatus === 'ACTIVE') status = 'Đồng ý';
            else if (ad.adStatus === 'INACTIVE') status = 'Từ chối';

            displayData.push({
                id: `ad_${ad.id}`,
                name: ad.employerUserName || ad.employerFullName || 'Unknown',
                serviceType: 'Quảng cáo',
                date: new Date(ad.startDate).toLocaleDateString('vi-VN'),
                type: type,
                status: status,
                originalType: 'advertisement',
                originalData: ad
            });
        });

        // Convert job postings
        jobPostings.forEach(jp => {
            let status = 'Đang chờ';
            if (jp.status === 'APPROVED') status = 'Đồng ý';
            else if (jp.status === 'REJECTED') status = 'Từ chối';
            else if (jp.status === 'CLOSED') status = 'Hoàn thành';

            displayData.push({
                id: `jp_${jp.id}`,
                name: jp.companyName || 'Unknown Company',
                serviceType: 'Đăng tin',
                date: new Date(jp.postedAt).toLocaleDateString('vi-VN'),
                type: 'Đăng tin',
                status: status,
                originalType: 'jobposting',
                originalData: jp
            });
        });

        // Convert subscriptions
        subscriptions.forEach(sub => {
            displayData.push({
                id: `sub_${sub.id}`,
                name: sub.employerUserName || sub.employerFullName || 'Unknown',
                serviceType: 'Gói thành viên',
                date: new Date(sub.startDate).toLocaleDateString('vi-VN'),
                type: sub.packageName || 'Unknown Package',
                status: 'Hoàn thành',
                originalType: 'subscription',
                originalData: sub
            });
        });

        // Custom sort: Status priority first, then by date within each status group
        displayData.sort((a, b) => {
            // Define status priority: "Đang chờ" > "Đồng ý"/"Hoàn thành" > "Từ chối"
            const getStatusPriority = (status: string): number => {
                switch (status) {
                    case 'Đang chờ': return 1;
                    case 'Đồng ý': return 2;
                    case 'Hoàn thành': return 2;
                    case 'Từ chối': return 3;
                    default: return 4;
                }
            };

            const priorityA = getStatusPriority(a.status);
            const priorityB = getStatusPriority(b.status);

            // If status priorities are different, sort by priority
            if (priorityA !== priorityB) {
                return priorityA - priorityB;
            }

            // If same status priority, sort by date (newest first)
            const dateA = new Date(a.originalType === 'advertisement' ? (a.originalData as AdvertisementModel).startDate :
                a.originalType === 'jobposting' ? (a.originalData as JobPostingModel).postedAt :
                    (a.originalData as SubscriptionModel).startDate);
            const dateB = new Date(b.originalType === 'advertisement' ? (b.originalData as AdvertisementModel).startDate :
                b.originalType === 'jobposting' ? (b.originalData as JobPostingModel).postedAt :
                    (b.originalData as SubscriptionModel).startDate);

            return dateB.getTime() - dateA.getTime(); // Newest first within same status
        });

        return displayData;
    }
}; 