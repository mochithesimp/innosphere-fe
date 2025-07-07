// Visitor tracking utility - Frontend only implementation
interface VisitorData {
    visitorId: string;
    firstVisit: string;
    lastVisit: string;
    totalVisits: number;
    isUniqueToday: boolean;
    lastTrackingDate: string;
    totalTimeSpent: number; // Total time in seconds
    sessionStartTime: string;
    isActive: boolean;
}

interface DailyStats {
    date: string;
    uniqueVisitors: number;
    totalPageViews: number;
    visitors: string[]; // Array of visitor IDs
}

/**
 * Generate a unique visitor ID based on browser fingerprinting + session
 */
const generateVisitorId = (): string => {
    try {
        // Create a unique fingerprint based on browser characteristics
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.textBaseline = 'top';
            ctx.font = '14px Arial';
            ctx.fillText('Visitor fingerprint', 2, 2);
        }

        // Check if sessionStorage is available (different in incognito)
        const sessionId = (() => {
            try {
                let sessionId = sessionStorage.getItem('innosphere_session_id');
                if (!sessionId) {
                    sessionId = Math.random().toString(36).substr(2, 15) + Date.now().toString(36);
                    sessionStorage.setItem('innosphere_session_id', sessionId);
                }
                return sessionId;
            } catch {
                return Math.random().toString(36).substr(2, 15);
            }
        })();

        const fingerprint = [
            navigator.userAgent,
            navigator.language,
            navigator.languages?.join(',') || '',
            screen.width + 'x' + screen.height,
            screen.colorDepth,
            new Date().getTimezoneOffset(),
            ctx ? canvas.toDataURL() : 'no-canvas',
            navigator.hardwareConcurrency || 0,
            sessionId, // This will be different for each browser session/incognito
            Math.random().toString(36).substr(2, 8) // Add some randomness
        ].join('|');

        // Create a hash-like ID
        let hash = 0;
        for (let i = 0; i < fingerprint.length; i++) {
            const char = fingerprint.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }

        return 'visitor_' + Math.abs(hash).toString(36) + Date.now().toString(36);
    } catch (error) {
        console.error('Error generating visitor ID:', error);
        // Fallback to random ID
        return 'visitor_' + Math.random().toString(36).substr(2, 15) + Date.now().toString(36);
    }
};

/**
 * Get or create visitor ID
 */
const getOrCreateVisitorId = (): string => {
    // Check if we have a session-specific visitor ID first
    let visitorId = sessionStorage.getItem('innosphere_session_visitor_id');

    if (!visitorId) {
        // Generate a new visitor ID for this session
        visitorId = generateVisitorId();

        // Store in sessionStorage (different for each browser session/incognito)
        try {
            sessionStorage.setItem('innosphere_session_visitor_id', visitorId);
        } catch {
            // If sessionStorage fails, use localStorage as fallback
            visitorId = localStorage.getItem('innosphere_visitor_id') || visitorId;
            localStorage.setItem('innosphere_visitor_id', visitorId);
        }
    }

    return visitorId;
};

/**
 * Get today's date string
 */
const getTodayString = (): string => {
    return new Date().toISOString().split('T')[0];
};

/**
 * Track visitor - only counts unique visitors once per day
 */
export const trackVisitor = (): void => {
    try {
        const visitorId = getOrCreateVisitorId();
        const today = getTodayString();
        const now = new Date().toISOString();

        // Get existing visitor data for this specific visitor ID
        const visitorDataKey = `innosphere_visitor_data_${visitorId}`;
        const existingData = localStorage.getItem(visitorDataKey);
        let visitorData: VisitorData;

        if (existingData) {
            visitorData = JSON.parse(existingData);
            // Update visitor ID in case it changed
            visitorData.visitorId = visitorId;
        } else {
            // First time visitor or new session
            visitorData = {
                visitorId,
                firstVisit: now,
                lastVisit: now,
                totalVisits: 0,
                isUniqueToday: false,
                lastTrackingDate: '',
                totalTimeSpent: 0,
                sessionStartTime: now,
                isActive: true
            };
        }

        // Check if this visitor has been counted today
        const hasBeenCountedToday = visitorData.lastTrackingDate === today;

        if (!hasBeenCountedToday) {
            // This is a unique visit for today
            visitorData.isUniqueToday = true;
            visitorData.lastTrackingDate = today;

            // Update daily statistics
            updateDailyStats(visitorId, today);
        } else {
            visitorData.isUniqueToday = false;
        }

        // Always update visit data
        visitorData.lastVisit = now;
        visitorData.totalVisits += 1;

        // Save updated visitor data with visitor-specific key
        localStorage.setItem(visitorDataKey, JSON.stringify(visitorData));

        // Also keep a reference to current visitor data
        localStorage.setItem('innosphere_current_visitor_data', JSON.stringify(visitorData));

        console.log('Visitor tracked:', {
            visitorId,
            isUniqueToday: visitorData.isUniqueToday,
            totalVisits: visitorData.totalVisits,
            sessionType: sessionStorage.getItem('innosphere_session_visitor_id') ? 'session' : 'persistent'
        });

    } catch (error) {
        console.error('Error tracking visitor:', error);
    }
};

/**
 * Update daily statistics
 */
const updateDailyStats = (visitorId: string, date: string): void => {
    try {
        const statsKey = 'innosphere_daily_stats';
        const existingStats = localStorage.getItem(statsKey);
        let allStats: DailyStats[] = existingStats ? JSON.parse(existingStats) : [];

        // Find today's stats
        let todayStats = allStats.find(stat => stat.date === date);

        if (!todayStats) {
            // Create new daily stats
            todayStats = {
                date,
                uniqueVisitors: 0,
                totalPageViews: 0,
                visitors: []
            };
            allStats.push(todayStats);
        }

        // Add visitor if not already counted today
        if (!todayStats.visitors.includes(visitorId)) {
            todayStats.visitors.push(visitorId);
            todayStats.uniqueVisitors = todayStats.visitors.length;
        }

        // Always increment page views
        todayStats.totalPageViews += 1;

        // Keep only last 30 days of data
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        allStats = allStats.filter(stat => new Date(stat.date) >= thirtyDaysAgo);

        // Save updated stats
        localStorage.setItem(statsKey, JSON.stringify(allStats));

    } catch (error) {
        console.error('Error updating daily stats:', error);
    }
};

/**
 * Get visitor statistics for admin dashboard
 */
export const getVisitorStats = () => {
    try {
        const statsKey = 'innosphere_daily_stats';
        const existingStats = localStorage.getItem(statsKey);
        const allStats: DailyStats[] = existingStats ? JSON.parse(existingStats) : [];

        const today = getTodayString();
        const todayStats = allStats.find(stat => stat.date === today);

        // Calculate total unique visitors (last 30 days)
        const uniqueVisitorsSet = new Set<string>();
        allStats.forEach(stat => {
            stat.visitors.forEach(visitor => uniqueVisitorsSet.add(visitor));
        });

        return {
            todayUniqueVisitors: todayStats?.uniqueVisitors || 0,
            todayPageViews: todayStats?.totalPageViews || 0,
            totalUniqueVisitors: uniqueVisitorsSet.size,
            last30DaysStats: allStats.slice(-30),
            currentVisitorId: getOrCreateVisitorId(),
            totalTimeSpent: getTotalTimeSpentToday(), // Sum of all visitors today
            totalTimeSpentAllTime: getTotalTimeSpentAllTime() // Sum of all visitors all time
        };

    } catch (error) {
        console.error('Error getting visitor stats:', error);
        return {
            todayUniqueVisitors: 0,
            todayPageViews: 0,
            totalUniqueVisitors: 0,
            last30DaysStats: [],
            currentVisitorId: 'unknown'
        };
    }
};

// Time tracking variables
let timeTrackingInterval: NodeJS.Timeout | null = null;
let totalActiveTime: number = 0;
let isPageVisible: boolean = true;

// Initialize totalActiveTime from saved data when module loads
const initializeTotalActiveTime = (): void => {
    try {
        const visitorId = getOrCreateVisitorId();
        const visitorDataKey = `innosphere_visitor_data_${visitorId}`;
        const existingData = localStorage.getItem(visitorDataKey);

        if (existingData) {
            const visitorData: VisitorData = JSON.parse(existingData);
            totalActiveTime = visitorData.totalTimeSpent || 0;
            console.log('Restored active time from storage:', totalActiveTime);
        }
    } catch (error) {
        console.error('Error initializing active time:', error);
        totalActiveTime = 0;
    }
};

// Initialize when module loads
initializeTotalActiveTime();

/**
 * Start time tracking when user is active on the page
 */
export const startTimeTracking = (): void => {
    isPageVisible = true;

    // Track time every second when page is visible
    if (timeTrackingInterval) {
        clearInterval(timeTrackingInterval);
    }

    timeTrackingInterval = setInterval(() => {
        if (isPageVisible) {
            totalActiveTime += 1; // Add 1 second

            // Update visitor data with current time
            updateVisitorTimeData();
        }
    }, 1000);

    // Listen for page visibility changes
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Listen for window focus/blur
    window.addEventListener('focus', handleWindowFocus);
    window.addEventListener('blur', handleWindowBlur);

    // Listen for mouse movement and keyboard activity
    document.addEventListener('mousemove', handleUserActivity);
    document.addEventListener('keypress', handleUserActivity);
    document.addEventListener('click', handleUserActivity);
    document.addEventListener('scroll', handleUserActivity);
};

/**
 * Stop time tracking
 */
export const stopTimeTracking = (): void => {
    if (timeTrackingInterval) {
        clearInterval(timeTrackingInterval);
        timeTrackingInterval = null;
    }

    // Update final time data
    updateVisitorTimeData();

    // Remove event listeners
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    window.removeEventListener('focus', handleWindowFocus);
    window.removeEventListener('blur', handleWindowBlur);
    document.removeEventListener('mousemove', handleUserActivity);
    document.removeEventListener('keypress', handleUserActivity);
    document.removeEventListener('click', handleUserActivity);
    document.removeEventListener('scroll', handleUserActivity);
};

/**
 * Handle page visibility change
 */
const handleVisibilityChange = (): void => {
    if (document.hidden) {
        isPageVisible = false;
    } else {
        isPageVisible = true;
    }
};

/**
 * Handle window focus
 */
const handleWindowFocus = (): void => {
    isPageVisible = true;
};

/**
 * Handle window blur
 */
const handleWindowBlur = (): void => {
    isPageVisible = false;
};

/**
 * Handle user activity
 */
const handleUserActivity = (): void => {
    if (!isPageVisible) {
        isPageVisible = true;
    }
};

/**
 * Update visitor data with current time spent
 */
const updateVisitorTimeData = (): void => {
    try {
        const visitorId = getOrCreateVisitorId();
        const visitorDataKey = `innosphere_visitor_data_${visitorId}`;
        const existingData = localStorage.getItem(visitorDataKey);

        if (existingData) {
            const visitorData: VisitorData = JSON.parse(existingData);
            visitorData.totalTimeSpent = totalActiveTime;
            visitorData.isActive = isPageVisible;

            localStorage.setItem(visitorDataKey, JSON.stringify(visitorData));
            localStorage.setItem('innosphere_current_visitor_data', JSON.stringify(visitorData));

            // Update global time aggregation
            updateGlobalTimeData(visitorId, totalActiveTime);
        }
    } catch (error) {
        console.error('Error updating visitor time data:', error);
    }
};

/**
 * Update global time data for all visitors
 */
const updateGlobalTimeData = (visitorId: string, currentTime: number): void => {
    try {
        const today = getTodayString();
        const globalTimeKey = `innosphere_global_time_${today}`;
        const existingGlobalData = localStorage.getItem(globalTimeKey);

        let globalTimeData: { [visitorId: string]: number } = {};

        if (existingGlobalData) {
            globalTimeData = JSON.parse(existingGlobalData);
        }

        // Update this visitor's time in the global data
        globalTimeData[visitorId] = currentTime;

        // Save updated global time data
        localStorage.setItem(globalTimeKey, JSON.stringify(globalTimeData));

        // Also maintain a rolling 30-day global time data
        updateRollingGlobalTime(visitorId, currentTime);

    } catch (error) {
        console.error('Error updating global time data:', error);
    }
};

/**
 * Update rolling 30-day global time data
 */
const updateRollingGlobalTime = (visitorId: string, currentTime: number): void => {
    try {
        const globalTimeKey = 'innosphere_all_visitors_time';
        const existingData = localStorage.getItem(globalTimeKey);

        let allVisitorsTime: { [visitorId: string]: number } = {};

        if (existingData) {
            allVisitorsTime = JSON.parse(existingData);
        }

        // Update this visitor's total time
        allVisitorsTime[visitorId] = currentTime;

        // Save updated data
        localStorage.setItem(globalTimeKey, JSON.stringify(allVisitorsTime));

    } catch (error) {
        console.error('Error updating rolling global time:', error);
    }
};

/**
 * Get total time spent by all visitors today (in seconds)
 */
export const getTotalTimeSpentToday = (): number => {
    try {
        const today = getTodayString();
        const globalTimeKey = `innosphere_global_time_${today}`;
        const globalTimeData = localStorage.getItem(globalTimeKey);

        if (globalTimeData) {
            const allVisitorsTime: { [visitorId: string]: number } = JSON.parse(globalTimeData);

            // Sum up all visitors' time for today
            const totalTime = Object.values(allVisitorsTime).reduce((sum, time) => sum + time, 0);
            return totalTime;
        }

        // If no global data exists yet, return current user's time
        return totalActiveTime;
    } catch (error) {
        console.error('Error getting total time spent:', error);
        return 0;
    }
};

/**
 * Get total time spent by all visitors (all time - 30 days)
 */
export const getTotalTimeSpentAllTime = (): number => {
    try {
        const globalTimeKey = 'innosphere_all_visitors_time';
        const allTimeData = localStorage.getItem(globalTimeKey);

        if (allTimeData) {
            const allVisitorsTime: { [visitorId: string]: number } = JSON.parse(allTimeData);

            // Sum up all visitors' time
            const totalTime = Object.values(allVisitorsTime).reduce((sum, time) => sum + time, 0);
            return totalTime;
        }

        return 0;
    } catch (error) {
        console.error('Error getting total time spent all time:', error);
        return 0;
    }
};

/**
 * Format time in seconds to readable format
 */
export const formatTime = (seconds: number): string => {
    if (seconds < 60) {
        return `${seconds}s`;
    } else if (seconds < 3600) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return remainingSeconds > 0 ? `${minutes}m ${remainingSeconds}s` : `${minutes}m`;
    } else {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
    }
};

/**
 * Clear all visitor data (for testing purposes)
 */
export const clearVisitorData = (): void => {
    // Clear localStorage
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('innosphere_')) {
            keysToRemove.push(key);
        }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));

    // Clear sessionStorage
    try {
        sessionStorage.removeItem('innosphere_session_id');
        sessionStorage.removeItem('innosphere_session_visitor_id');
    } catch {
        // Ignore if sessionStorage is not available
    }

    console.log('All visitor data cleared');
};

/**
 * Get current visitor info
 */
export const getCurrentVisitorInfo = () => {
    try {
        const visitorId = getOrCreateVisitorId();

        // Try to get visitor-specific data first
        const visitorDataKey = `innosphere_visitor_data_${visitorId}`;
        let visitorData = localStorage.getItem(visitorDataKey);

        // Fallback to current visitor data
        if (!visitorData) {
            visitorData = localStorage.getItem('innosphere_current_visitor_data');
        }

        if (visitorData) {
            const data: VisitorData = JSON.parse(visitorData);
            return {
                visitorId,
                firstVisit: data.firstVisit,
                lastVisit: data.lastVisit,
                totalVisits: data.totalVisits,
                isUniqueToday: data.isUniqueToday
            };
        }

        return {
            visitorId,
            firstVisit: null,
            lastVisit: null,
            totalVisits: 0,
            isUniqueToday: false
        };

    } catch (error) {
        console.error('Error getting current visitor info:', error);
        return null;
    }
}; 