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