// JWT Token utilities
interface JWTPayload {
    sub?: string; // Subject (User ID)
    nameid?: string; // Name identifier
    unique_name?: string; // Unique name
    exp?: number; // Expiration time
    iat?: number; // Issued at
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any; // Allow other claims
}

/**
 * Decode JWT token without verification (client-side use only)
 * @param token JWT token string
 * @returns Decoded payload or null if invalid
 */
export const decodeJWT = (token: string): JWTPayload | null => {
    try {
        // JWT has 3 parts separated by dots: header.payload.signature
        const parts = token.split('.');
        if (parts.length !== 3) {
            return null;
        }

        // Decode the payload (second part)
        const payload = parts[1];

        // Add padding if needed (base64url doesn't require padding, but atob might need it)
        const paddedPayload = payload + '='.repeat((4 - payload.length % 4) % 4);

        // Replace base64url characters with base64 characters
        const base64 = paddedPayload.replace(/-/g, '+').replace(/_/g, '/');

        // Decode base64
        const decoded = atob(base64);

        // Parse JSON
        return JSON.parse(decoded);
    } catch (error) {
        console.error('Error decoding JWT token:', error);
        return null;
    }
};

/**
 * Get JWT token from localStorage
 * @returns Token string or null if not found
 */
const getTokenFromStorage = (): string | null => {
    // Try different possible token key names
    const possibleKeys = ['accessToken', 'token', 'authToken', 'jwt', 'bearerToken', 'access_token'];

    for (const key of possibleKeys) {
        const token = localStorage.getItem(key);
        if (token) {
            console.log(`Found token under key: ${key}`);
            return token;
        }
    }

    // Debug: Log all localStorage keys to help identify the token key
    console.log('localStorage keys:', Object.keys(localStorage));
    return null;
};

/**
 * Get user ID from JWT token
 * @returns User ID string or null if not found
 */
export const getUserIdFromToken = (): string | null => {
    try {
        const token = getTokenFromStorage();
        if (!token) {
            console.log('No token found in localStorage');
            return null;
        }

        const payload = decodeJWT(token);
        if (!payload) {
            console.log('Could not decode JWT payload');
            return null;
        }

        console.log('🔍 JWT Payload decoded successfully');
        console.log('🔍 All available claims:', Object.keys(payload));

        // Try different common JWT claim names for user ID
        // Check Microsoft/ASP.NET Core style claims first
        const nameIdentifierClaimKey = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier';
        const nameIdentifierClaim = payload[nameIdentifierClaimKey];

        console.log(`🔍 Checking claim "${nameIdentifierClaimKey}":`, nameIdentifierClaim);

        if (nameIdentifierClaim) {
            console.log('✅ Found user ID in nameidentifier claim:', nameIdentifierClaim);
            return nameIdentifierClaim;
        }

        // Fallback to other common claim names
        const fallbackOptions = {
            sub: payload.sub,
            nameid: payload.nameid,
            unique_name: payload.unique_name,
            userId: payload.userId
        };

        console.log('🔍 Checking fallback claims:', fallbackOptions);

        const fallbackUserId = payload.sub || payload.nameid || payload.unique_name || payload.userId || null;
        if (fallbackUserId) {
            console.log('✅ Found user ID in fallback claims:', fallbackUserId);
        } else {
            console.log('❌ No user ID found in any claims');
        }

        return fallbackUserId;
    } catch (error) {
        console.error('Error getting user ID from token:', error);
        return null;
    }
};

/**
 * Check if token is expired
 * @returns boolean indicating if token is expired
 */
export const isTokenExpired = (): boolean => {
    try {
        const token = getTokenFromStorage();
        if (!token) {
            console.log('🔍 Token expiration check: No token found');
            return true;
        }

        const payload = decodeJWT(token);
        if (!payload || !payload.exp) {
            console.log('🔍 Token expiration check: No payload or exp claim');
            return true;
        }

        const expTimestamp = payload.exp * 1000; // Convert to milliseconds
        const currentTimestamp = Date.now();
        const isExpired = expTimestamp < currentTimestamp;

        console.log('🔍 Token expiration details:');
        console.log('  - Token exp claim:', payload.exp);
        console.log('  - Token exp time:', new Date(expTimestamp).toISOString());
        console.log('  - Current time:', new Date(currentTimestamp).toISOString());
        console.log('  - Time difference (minutes):', (expTimestamp - currentTimestamp) / (1000 * 60));
        console.log('  - Is expired:', isExpired);

        return isExpired;
    } catch (error) {
        console.error('Error checking token expiration:', error);
        return true;
    }
};

/**
 * Debug function to log all claims in the JWT token
 * Use this to identify claim names in your specific token
 */
export const debugTokenClaims = (): void => {
    try {
        const token = getTokenFromStorage();
        if (!token) {
            console.log('No token found in localStorage');
            return;
        }

        const payload = decodeJWT(token);
        if (!payload) {
            console.log('Could not decode token');
            return;
        }

        console.log('JWT Token Claims:');
        Object.keys(payload).forEach(key => {
            console.log(`${key}:`, payload[key]);
        });
    } catch (error) {
        console.error('Error debugging token claims:', error);
    }
}; 