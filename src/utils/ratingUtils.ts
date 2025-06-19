/**
 * Utility functions for handling rating status
 */

/**
 * Check if a job application has already been rated
 * @param jobApplicationId - The ID of the job application
 * @returns boolean - true if already rated, false otherwise
 */
export const isJobApplicationRated = (jobApplicationId: number): boolean => {
    try {
        const ratedJobs = JSON.parse(localStorage.getItem('ratedJobApplications') || '[]');
        return ratedJobs.includes(jobApplicationId);
    } catch (error) {
        console.error('Error checking rating status:', error);
        return false;
    }
};

/**
 * Mark a job application as rated
 * @param jobApplicationId - The ID of the job application to mark as rated
 */
export const markJobApplicationAsRated = (jobApplicationId: number): void => {
    try {
        const ratedJobs = JSON.parse(localStorage.getItem('ratedJobApplications') || '[]');
        if (!ratedJobs.includes(jobApplicationId)) {
            ratedJobs.push(jobApplicationId);
            localStorage.setItem('ratedJobApplications', JSON.stringify(ratedJobs));
        }
    } catch (error) {
        console.error('Error marking job as rated:', error);
    }
};

/**
 * Clear all rating records (useful for testing or logout)
 */
export const clearRatingRecords = (): void => {
    try {
        localStorage.removeItem('ratedJobApplications');
    } catch (error) {
        console.error('Error clearing rating records:', error);
    }
};

// Employer rating functions for rating workers
/**
 * Check if a worker has already been rated for a job application
 * @param jobApplicationId - The ID of the job application
 * @returns boolean - true if already rated, false otherwise
 */
export const isWorkerRated = (jobApplicationId: number): boolean => {
    try {
        const ratedWorkers = JSON.parse(localStorage.getItem('ratedWorkerJobApplications') || '[]');
        return ratedWorkers.includes(jobApplicationId);
    } catch (error) {
        console.error('Error checking worker rating status:', error);
        return false;
    }
};

/**
 * Mark a worker as rated for a job application
 * @param jobApplicationId - The ID of the job application to mark as rated
 */
export const markWorkerAsRated = (jobApplicationId: number): void => {
    try {
        const ratedWorkers = JSON.parse(localStorage.getItem('ratedWorkerJobApplications') || '[]');
        if (!ratedWorkers.includes(jobApplicationId)) {
            ratedWorkers.push(jobApplicationId);
            localStorage.setItem('ratedWorkerJobApplications', JSON.stringify(ratedWorkers));
        }
    } catch (error) {
        console.error('Error marking worker as rated:', error);
    }
};

/**
 * Clear all worker rating records (useful for testing or logout)
 */
export const clearWorkerRatingRecords = (): void => {
    try {
        localStorage.removeItem('ratedWorkerJobApplications');
    } catch (error) {
        console.error('Error clearing worker rating records:', error);
    }
}; 