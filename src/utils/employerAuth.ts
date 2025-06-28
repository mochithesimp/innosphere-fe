import { EmployerService } from '../services/employerService';
import { getRoleFromToken } from './jwtHelper';

/**
 * Check employer profile status and handle redirection
 * @param navigate - React Router navigate function
 * @param token - JWT token
 * @returns Promise<boolean> - true if profile exists, false if redirected to business-info
 */
export const checkEmployerProfileAndRedirect = async (
    navigate: (path: string) => void,
    token: string
): Promise<boolean> => {
    try {
        console.log('🔍 Checking employer profile status...');

        // Verify this is an employer
        const role = getRoleFromToken(token);
        if (role !== 'Employer') {
            console.log('❌ User is not an employer, skipping profile check');
            return true; // Let other logic handle non-employer users
        }

        // Attempt to get employer profile
        console.log('📞 Calling EmployerService.getEmployerProfile()...');
        const profile = await EmployerService.getEmployerProfile();

        if (profile) {
            console.log('✅ Employer profile found, allowing access to dashboard');
            console.log('📋 Profile data:', profile);
            return true; // Profile exists, allow normal flow
        } else {
            console.log('❌ Employer profile returned null, redirecting to business-info');
            // Use longer delay and immediate navigation to prevent race conditions
            console.log('📍 Navigating to /employer/business-info...');
            navigate('/employer/business-info');
            return false; // Profile doesn't exist, redirected
        }
    } catch (error) {
        console.error('❌ Error checking employer profile:', error);

        // Check if it's a 404 error (no profile found)
        if (error && typeof error === 'object' && 'response' in error) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const axiosError = error as any;
            console.log('📊 Error response status:', axiosError.response?.status);
            console.log('📊 Error response data:', axiosError.response?.data);

            if (axiosError.response?.status === 404) {
                console.log('📋 Employer profile not found (404), redirecting to business-info');
                // Immediate navigation on 404
                console.log('📍 Navigating to /employer/business-info...');
                navigate('/employer/business-info');
                return false;
            }
        }

        // For other errors, log but allow normal flow
        console.error('⚠️ Unexpected error during profile check, allowing normal flow');
        return true;
    }
};

/**
 * Handle employer avatar click with profile check
 * @param navigate - React Router navigate function
 * @param token - JWT token
 */
export const handleEmployerAvatarClick = async (
    navigate: (path: string) => void,
    token: string
): Promise<void> => {
    console.log('🖱️ Employer avatar clicked, checking profile...');
    const profileExists = await checkEmployerProfileAndRedirect(navigate, token);

    if (profileExists) {
        // Profile exists, go to dashboard
        console.log('✅ Profile exists, navigating to employer dashboard');
        navigate('/employer/dashboard');
    }
    // If profile doesn't exist, user is already redirected to business-info
};

/**
 * Handle employer login redirect with profile check
 * @param navigate - React Router navigate function
 * @param token - JWT token
 */
export const handleEmployerLoginRedirect = async (
    navigate: (path: string) => void,
    token: string
): Promise<void> => {
    console.log('🚀 Employer login successful, checking profile for redirect...');
    const profileExists = await checkEmployerProfileAndRedirect(navigate, token);

    if (profileExists) {
        // Profile exists, redirect to dashboard
        console.log('✅ Profile found, redirecting to employer dashboard');
        navigate('/employer/dashboard');
    }
    // If profile doesn't exist, user is already redirected to business-info by checkEmployerProfileAndRedirect
}; 